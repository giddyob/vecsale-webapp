import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Heart, Star, MapPin, ShoppingCart, Share2, Shield } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trendingDeals, handpickedDeals, moreDeals } from "@/data/deals";
import DealCard from "@/components/DealCard";

const allDeals = [...trendingDeals, ...handpickedDeals, ...moreDeals];

const DealDetail = () => {
  const { id } = useParams();
  const deal = allDeals.find((d) => d.id === id);

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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to deals
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image */}
          <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
            <img src={deal.image} alt={deal.title} className="w-full h-full object-cover" />
            <span className="absolute top-4 left-4 text-sm font-bold bg-accent text-accent-foreground px-3 py-1 rounded-lg">
              -{deal.discount}% OFF
            </span>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <span className="font-semibold text-accent uppercase tracking-wide">{deal.merchant}</span>
              <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" />{deal.location}</span>
              <span className="flex items-center gap-0.5 ml-auto"><Star className="w-3 h-3 fill-accent text-accent" />{deal.rating}</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-display font-extrabold text-foreground mb-4">{deal.title}</h1>

            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Enjoy an incredible experience with {deal.merchant}. This exclusive deal gives you {deal.discount}% off the regular price. Available at {deal.location}, rated {deal.rating} stars by our community.
            </p>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-extrabold text-foreground">GH₵{deal.currentPrice}</span>
              <span className="text-lg text-muted-foreground line-through">GH₵{deal.originalPrice}</span>
              <span className="text-sm font-semibold text-accent">Save GH₵{deal.originalPrice - deal.currentPrice}</span>
            </div>

            <div className="flex gap-3 mb-6">
              <Link
                to={`/checkout?deal=${deal.id}`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity"
              >
                <ShoppingCart className="w-4 h-4" /> Buy Now
              </Link>
              <button className="px-4 py-3 rounded-lg border border-border bg-card text-muted-foreground hover:text-accent transition-colors">
                <Heart className="w-5 h-5" />
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

        {/* Related */}
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
