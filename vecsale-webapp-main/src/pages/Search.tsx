import { useSearchParams, Link } from "react-router-dom";
import { Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DealCard from "@/components/DealCard";
import { useSearchDeals } from "@/hooks/useDeals";

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const { data: deals = [], isLoading } = useSearchDeals(query);

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <div className="container py-6">
                <div className="mb-8">
                    <h1 className="text-2xl md:text-3xl font-display font-extrabold text-foreground flex items-center gap-2">
                        <Search className="w-6 h-6 text-accent" />
                        {query ? `Results for "${query}"` : "Search Deals"}
                    </h1>
                    <div className="w-12 h-1 bg-accent rounded-full mt-2 mb-2" />
                    {!isLoading && query && (
                        <p className="text-sm text-muted-foreground">
                            {deals.length} deal{deals.length !== 1 ? "s" : ""} found
                        </p>
                    )}
                </div>

                {!query ? (
                    <div className="py-20 text-center">
                        <p className="text-lg text-muted-foreground">Enter a search term above to find deals.</p>
                    </div>
                ) : isLoading ? (
                    <div className="py-20 text-center text-muted-foreground">Searching...</div>
                ) : deals.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {deals.map((deal) => (
                            <DealCard key={deal.id} deal={deal} />
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center">
                        <p className="text-lg text-muted-foreground">No deals found for &ldquo;{query}&rdquo;.</p>
                        <Link to="/" className="text-accent hover:underline text-sm mt-2 inline-block">
                            Browse all deals
                        </Link>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default SearchPage;
