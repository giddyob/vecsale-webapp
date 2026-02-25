import DealCard from "./DealCard";
import type { Deal } from "@/data/deals";

interface DealsGridProps {
  title: string;
  deals: Deal[];
  columns?: 2 | 3;
}

const DealsGrid = ({ title, deals, columns = 2 }: DealsGridProps) => {
  return (
    <section className="py-10">
      <div className="container">
        <div className="mb-6">
          <h2 className="text-2xl font-display font-bold text-foreground">
            {title}
          </h2>
          <div className="w-12 h-1 bg-accent rounded-full mt-1" />
        </div>

        <div
          className={`grid gap-5 ${
            columns === 3
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 sm:grid-cols-2"
          }`}
        >
          {deals.map((deal) => (
            <DealCard
              key={deal.id}
              deal={deal}
              variant={columns === 2 ? "large" : "default"}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealsGrid;
