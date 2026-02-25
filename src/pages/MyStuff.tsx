import { Link } from "react-router-dom";
import { ArrowLeft, Package, Clock, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trendingDeals } from "@/data/deals";

const mockOrders = trendingDeals.slice(0, 3).map((deal, i) => ({
  ...deal,
  status: i === 0 ? "active" : i === 1 ? "pending" : "completed",
  purchasedAt: `Feb ${15 + i}, 2026`,
}));

const statusConfig = {
  active: { label: "Active", icon: Package, color: "text-accent" },
  pending: { label: "Pending", icon: Clock, color: "text-muted-foreground" },
  completed: { label: "Completed", icon: CheckCircle, color: "text-accent" },
};

const MyStuff = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-6 max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>

        <h1 className="text-2xl font-display font-bold text-foreground mb-1">My Stuff</h1>
        <div className="w-10 h-1 bg-accent rounded-full mb-6" />

        <div className="space-y-4">
          {mockOrders.map((order) => {
            const { label, icon: Icon, color } = statusConfig[order.status as keyof typeof statusConfig];
            return (
              <div key={order.id} className="bg-card rounded-xl p-4 flex gap-4" style={{ boxShadow: "var(--shadow-card)" }}>
                <img src={order.image} alt={order.title} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <Link to={`/deal/${order.id}`} className="text-sm font-semibold text-foreground hover:text-accent transition-colors line-clamp-1">
                    {order.title}
                  </Link>
                  <p className="text-xs text-muted-foreground mt-0.5">{order.merchant} · {order.location}</p>
                  <p className="text-xs text-muted-foreground">Purchased: {order.purchasedAt}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-bold text-foreground">GH₵{order.currentPrice}</span>
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold ${color}`}>
                      <Icon className="w-3 h-3" /> {label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyStuff;
