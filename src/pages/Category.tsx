import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DealCard from "@/components/DealCard";
import { useDealsByCategory } from "@/hooks/useDeals";
import { categories } from "@/data/deals";

const Category = () => {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name || "");
  const { data: deals = [], isLoading } = useDealsByCategory(decodedName);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to home
        </Link>

        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-display font-extrabold text-foreground">{decodedName}</h1>
          <div className="w-12 h-1 bg-accent rounded-full mt-1" />
          <p className="text-sm text-muted-foreground mt-2">{deals.length} deal{deals.length !== 1 ? "s" : ""} available</p>
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-8 pb-1">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/category/${encodeURIComponent(cat)}`}
              className={`flex-shrink-0 px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                cat.toLowerCase() === decodedName.toLowerCase()
                  ? "bg-accent text-accent-foreground"
                  : "bg-card text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>

        {isLoading ? (
          <div className="py-20 text-center text-muted-foreground">Loading deals...</div>
        ) : deals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {deals.map((deal) => <DealCard key={deal.id} deal={deal} />)}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg text-muted-foreground">No deals in this category yet.</p>
            <Link to="/" className="text-accent hover:underline text-sm mt-2 inline-block">Browse all deals</Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Category;
