import { Link } from "react-router-dom";
import { ArrowLeft, Heart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DealCard from "@/components/DealCard";
import { trendingDeals } from "@/data/deals";

const mockFavourites = trendingDeals.slice(0, 4);

const Favourites = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>

        <div className="flex items-center gap-2 mb-1">
          <Heart className="w-5 h-5 text-accent" />
          <h1 className="text-2xl font-display font-bold text-foreground">Favourites</h1>
        </div>
        <div className="w-10 h-1 bg-accent rounded-full mb-6" />

        {mockFavourites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {mockFavourites.map((deal) => <DealCard key={deal.id} deal={deal} />)}
          </div>
        ) : (
          <div className="py-20 text-center">
            <Heart className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">No favourites yet.</p>
            <Link to="/" className="text-accent hover:underline text-sm mt-2 inline-block">Discover deals</Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Favourites;
