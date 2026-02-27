import { Link } from "react-router-dom";
import { ArrowLeft, Package, Clock, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const statusConfig = {
  UNUSED: { label: "Active", icon: Package, color: "text-accent" },
  USED: { label: "Completed", icon: CheckCircle, color: "text-muted-foreground" },
  EXPIRED: { label: "Expired", icon: Clock, color: "text-muted-foreground" },
};

const MyStuff = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: coupons = [], isLoading } = useQuery({
    queryKey: ["my-coupons", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("coupons")
        .select("*, deals:deal_id(title, image_url, discounted_price, location, businesses(name))")
        .eq("user_id", user!.id)
        .order("purchase_date", { ascending: false });
      if (error) throw error;
      return data || [];
    },
  });

  const toggleStatus = useMutation({
    mutationFn: async ({ id, newStatus }: { id: string; newStatus: string }) => {
      const { error } = await supabase
        .from("coupons")
        .update({ status: newStatus })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-coupons"] });
      toast.success("Coupon status updated");
    },
    onError: () => toast.error("Failed to update status"),
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-6 max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>

        <h1 className="text-2xl font-display font-bold text-foreground mb-1">My Stuff</h1>
        <div className="w-10 h-1 bg-accent rounded-full mb-6" />

        {!user ? (
          <div className="py-20 text-center">
            <Package className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">Sign in to see your purchases.</p>
            <Link to="/auth" className="text-accent hover:underline text-sm mt-2 inline-block">Sign In</Link>
          </div>
        ) : isLoading ? (
          <div className="py-20 text-center text-muted-foreground">Loading...</div>
        ) : coupons.length === 0 ? (
          <div className="py-20 text-center">
            <Package className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">No purchases yet.</p>
            <Link to="/" className="text-accent hover:underline text-sm mt-2 inline-block">Browse deals</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {coupons.map((coupon: any) => {
              const deal = coupon.deals;
              const st = (coupon.status || "UNUSED") as keyof typeof statusConfig;
              const { label, icon: Icon, color } = statusConfig[st] || statusConfig.UNUSED;
              const nextStatus = st === "UNUSED" ? "USED" : "UNUSED";
              return (
                <Link key={coupon.id} to={`/voucher/${coupon.id}`} className="block bg-card rounded-xl p-4 flex gap-4 hover:ring-2 hover:ring-accent/30 transition-all" style={{ boxShadow: "var(--shadow-card)" }}>
                  <img src={deal?.image_url || "/placeholder.svg"} alt={deal?.title} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-semibold text-foreground line-clamp-1">
                      {deal?.title || "Deal"}
                    </span>
                    <p className="text-xs text-muted-foreground mt-0.5">{deal?.businesses?.name} · {deal?.location}</p>
                    <p className="text-xs text-muted-foreground">Code: {coupon.code}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-bold text-foreground">GH₵{deal?.discounted_price}</span>
                      <Button
                        size="sm"
                        variant={st === "UNUSED" ? "default" : "outline"}
                        className="h-7 text-xs gap-1"
                        disabled={toggleStatus.isPending}
                        onClick={() => toggleStatus.mutate({ id: coupon.id, newStatus: nextStatus })}
                      >
                        <Icon className="w-3 h-3" /> {label}
                      </Button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyStuff;
