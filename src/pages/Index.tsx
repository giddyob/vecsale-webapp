import Header from "@/components/Header";
import HeroBanner from "@/components/HeroBanner";
import TrendingSection from "@/components/TrendingSection";
import DealsGrid from "@/components/DealsGrid";
import CategoryCards from "@/components/CategoryCards";
import Footer from "@/components/Footer";
import { trendingDeals, handpickedDeals, moreDeals } from "@/data/deals";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroBanner />
      <TrendingSection deals={trendingDeals} />
      <DealsGrid title="Handpicked for You" deals={handpickedDeals} columns={2} />
      <DealsGrid title="More Discoveries" deals={moreDeals} columns={3} />
      <CategoryCards />
      <Footer />
    </div>
  );
};

export default Index;
