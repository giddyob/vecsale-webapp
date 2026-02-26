import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { createHmac } from "https://deno.land/std@0.168.0/crypto/mod.ts";

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

    if (event.event !== "charge.success") {
      return new Response("OK", { status: 200 });
    }

    const { metadata, reference, amount } = event.data;
    const { deal_id, option_id, user_id } = metadata;

    if (!deal_id || !user_id) {
      console.error("Missing metadata", metadata);
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

    console.log("Payment processed:", { reference, code, deal_id });
    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error("Webhook error:", err);
    return new Response("Server error", { status: 500 });
  }
});
