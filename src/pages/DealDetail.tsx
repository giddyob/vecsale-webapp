import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Star, MapPin, ShoppingCart, Share2, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DealCard from "@/components/DealCard";
import { useDeal, useDeals } from "@/hooks/useDeals";
import type { SubDeal } from "@/hooks/useDeals";
import { useFavorites, useToggleFavorite } from "@/hooks/useFavorites";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const DealDetail = () => {
  const { id } = useParams();
  const { data: deal, isLoading } = useDeal(id);
  const { data: allDeals = [] } = useDeals();
  const { data: favIds = [] } = useFavorites();
  const toggleFav = useToggleFavorite();
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedSub, setSelectedSub] = useState<string | null>(null);

  const isFav = deal ? favIds.includes(deal.id) : false;

  const handleFav = () => {
    if (!user) { toast({ title: "Sign in to save favourites", variant: "destructive" }); return; }
    if (deal) toggleFav.mutate({ dealId: deal.id, isFavorited: isFav });
  };

  if (isLoading) {
    return <div className="min-h-screen bg-background"><Header /><div className="container py-20 text-center text-muted-foreground">Loading...</div><Footer /></div>;
  }

  if (!deal) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-display font-bold text-foreground mb-4">Deal not found</h1>
          <Link to="/" className="text-accent hover:underline">Back to home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const related = allDeals.filter((d) => d.category === deal.category && d.id !== deal.id).slice(0, 3);
  const activeSub = deal.subDeals.find((s) => s.id === selectedSub) || null;
  const displayPrice = activeSub ? activeSub.discounted_price : deal.currentPrice;
  const displayOriginal = activeSub ? activeSub.original_price : deal.originalPrice;
  const displayDiscount = activeSub
    ? Math.round(((activeSub.original_price - activeSub.discounted_price) / activeSub.original_price) * 100)
    : deal.discount;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to deals
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
            <img src={deal.image} alt={deal.title} className="w-full h-full object-cover" />
            <span className="absolute top-4 left-4 text-sm font-bold bg-accent text-accent-foreground px-3 py-1 rounded-lg">
              -{displayDiscount}% OFF
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              {deal.businessId ? (
                <Link to={`/business/${deal.businessId}`} className="font-semibold text-accent uppercase tracking-wide hover:underline">
                  {deal.merchant}
                </Link>
              ) : (
                <span className="font-semibold text-accent uppercase tracking-wide">{deal.merchant}</span>
              )}
              <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" />{deal.location}</span>
              <span className="flex items-center gap-0.5 ml-auto"><Star className="w-3 h-3 fill-accent text-accent" />{deal.rating}</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-display font-extrabold text-foreground mb-4">
              {activeSub ? activeSub.title : deal.title}
            </h1>

            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              {activeSub?.description || deal.description || `Enjoy an incredible experience with ${deal.merchant}. This exclusive deal gives you ${displayDiscount}% off the regular price.`}
            </p>

            {/* Sub-deals */}
            {deal.subDeals.length > 0 && (
              <div className="mb-6">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Options</p>
                <div className="space-y-2">
                  {deal.subDeals.map((sub: SubDeal) => (
                    <button
                      key={sub.id}
                      onClick={() => setSelectedSub(selectedSub === sub.id ? null : sub.id)}
                      className={`w-full text-left rounded-lg border p-3 transition-colors ${
                        selectedSub === sub.id
                          ? "border-accent bg-accent/5"
                          : "border-border bg-card hover:border-accent/50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-foreground">{sub.title}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground line-through">GH₵{sub.original_price}</span>
                          <span className="text-sm font-bold text-foreground">GH₵{sub.discounted_price}</span>
                        </div>
                      </div>
                      {sub.description && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{sub.description}</p>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-extrabold text-foreground">GH₵{displayPrice}</span>
              <span className="text-lg text-muted-foreground line-through">GH₵{displayOriginal}</span>
              <span className="text-sm font-semibold text-accent">Save GH₵{displayOriginal - displayPrice}</span>
            </div>

            <div className="flex gap-3 mb-6">
              <Link
                to={`/checkout?deal=${deal.id}${activeSub ? `&sub=${activeSub.id}` : ""}`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                <ShoppingCart className="w-4 h-4" /> Buy Now
              </Link>
              <button onClick={handleFav} className={`px-4 py-3 rounded-lg border border-border bg-card transition-colors ${isFav ? "text-accent" : "text-muted-foreground hover:text-accent"}`}>
                <Heart className={`w-5 h-5 ${isFav ? "fill-accent" : ""}`} />
              </button>
              <button className="px-4 py-3 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-secondary rounded-lg p-4 flex items-start gap-3">
              <Shield className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-foreground">VecSale Guarantee</p>
                <p className="text-xs text-muted-foreground">Full refund if you're not satisfied. No questions asked.</p>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-14">
            <h2 className="text-xl font-display font-bold text-foreground mb-1">You Might Also Like</h2>
            <div className="w-10 h-1 bg-accent rounded-full mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((d) => <DealCard key={d.id} deal={d} />)}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default DealDetail;
