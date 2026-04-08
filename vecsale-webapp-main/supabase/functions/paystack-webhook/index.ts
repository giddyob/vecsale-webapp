import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-paystack-signature",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const paystackSecret = Deno.env.get("PAYSTACK_SECRET_KEY")!;
    const body = await req.text();

    // Verify Paystack signature
    const signature = req.headers.get("x-paystack-signature");
    if (!signature) {
      return new Response("No signature", { status: 400 });
    }

    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(paystackSecret),
      { name: "HMAC", hash: "SHA-512" },
      false,
      ["sign"]
    );
    const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
    const hash = Array.from(new Uint8Array(sig))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    if (hash !== signature) {
      console.error("Invalid signature");
      return new Response("Invalid signature", { status: 400 });
    }

    const event = JSON.parse(body);
    console.info("Paystack webhook event:", event.event);

    if (event.event !== "charge.success") {
      return new Response("OK", { status: 200 });
    }

    const { metadata, reference, amount } = event.data;
    console.info("Full metadata received:", JSON.stringify(metadata));

    // Paystack can nest custom metadata in different ways
    // Try direct access first, then check custom_fields array
    let deal_id = metadata?.deal_id;
    let option_id = metadata?.option_id;
    let user_id = metadata?.user_id;

    // If not found directly, check custom_fields array
    if (!deal_id && metadata?.custom_fields) {
      for (const field of metadata.custom_fields) {
        if (field.variable_name === "deal_id") deal_id = field.value;
        if (field.variable_name === "option_id") option_id = field.value;
        if (field.variable_name === "user_id") user_id = field.value;
      }
    }

    if (!deal_id || !user_id) {
      console.error("Missing user_id or deal_id in metadata", JSON.stringify(metadata));
      return new Response("Missing metadata", { status: 400 });
    }

    // Use service role to bypass RLS
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Generate coupon code
    const code = `VS-${reference.slice(-8).toUpperCase()}`;

    // Insert coupon
    const { error: couponError } = await supabase.from("coupons").insert({
      user_id,
      deal_id,
      option_id: option_id || null,
      code,
      status: "UNUSED",
    });

    if (couponError) {
      console.error("Coupon insert error:", couponError);
      return new Response("DB error", { status: 500 });
    }

    // Increment sales count
    await supabase.rpc("increment_deal_sales", { deal_id_param: deal_id });
    if (option_id) {
      await supabase.rpc("increment_option_sales", { option_id_param: option_id });
    }

    // Record transaction
    await supabase.from("transactions").insert({
      user_id,
      type: "purchase",
      amount: amount / 100,
      status: "completed",
      description: `Deal purchase - ${code}`,
    });

    console.log("Payment processed:", { reference, code, deal_id, user_id });
    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("Webhook error:", err);
    return new Response("Server error", { status: 500 });
  }
});
