import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import TrendingSection from "@/components/TrendingSection";
import DealsGrid from "@/components/DealsGrid";
import CategoryCards from "@/components/CategoryCards";
import Footer from "@/components/Footer";
import { useDeals } from "@/hooks/useDeals";

const Index = () => {
  const { data: deals = [], isLoading } = useDeals();

  const trending = deals.slice(0, 7);
  const handpicked = deals.slice(7, 11);
  const more = deals.slice(11);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroBanner />
      {isLoading ? (
        <div className="container py-20 text-center text-muted-foreground">Loading deals...</div>
      ) : (
        <>
          <TrendingSection deals={trending} />
          {handpicked.length > 0 && <DealsGrid title="Handpicked for You" deals={handpicked} columns={2} />}
          {more.length > 0 && <DealsGrid title="More Discoveries" deals={more} columns={3} />}
        </>
      )}
      <CategoryCards />
      <Footer />
    </div>
  );
};

export default Index;
