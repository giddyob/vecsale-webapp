import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useDeals } from "@/hooks/useDeals";
import DealCard from "@/components/DealCard";

interface CategoryItem {
  emoji: string;
  title: string;
  description: string;
  category: string;
}

const categoryItems: CategoryItem[] = [
  {
    emoji: "🧖‍♀️",
    title: "Self-Care",
    description: "Relax with premium spa days.",
    category: "Beauty & Spas",
  },
  {
    emoji: "🍣",
    title: "Dining",
    description: "Taste local extraordinary food.",
    category: "Food & Drink",
  },
  {
    emoji: "🚠",
    title: "Adventure",
    description: "Create memories that last.",
    category: "Things To Do",
  },
];

const CategoryCards = () => {
  const { data: allDeals = [] } = useDeals();

  return (
    <section className="py-12">
      <div className="container flex flex-col gap-12">

        {/* ── Row of 3 category cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {categoryItems.map((cat) => {
            const categoryPath = `/category/${encodeURIComponent(cat.category)}`;
            return (
              <div
                key={cat.title}
                className="bg-card rounded-xl p-6 flex flex-col items-start gap-3 hover:shadow-[var(--shadow-card-hover)] transition-shadow cursor-pointer group"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <span className="text-4xl">{cat.emoji}</span>
                <h3 className="text-lg font-display font-bold text-foreground">
                  {cat.title}
                </h3>
                <p className="text-sm text-muted-foreground">{cat.description}</p>
                <Link
                  to={categoryPath}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-accent group-hover:gap-2 transition-all"
                >
                  Explore
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* ── Per-category deal grids ── */}
        {categoryItems.map((cat) => {
          const deals = allDeals
            .filter((d) => d.category === cat.category)
            .slice(0, 3);

          if (deals.length === 0) return null;

          const categoryPath = `/category/${encodeURIComponent(cat.category)}`;

          return (
            <div key={cat.category}>
              {/* Section heading */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="text-xl font-display font-bold text-foreground">
                    {cat.emoji} {cat.title}
                  </h2>
                  <div className="w-10 h-1 bg-accent rounded-full mt-1" />
                </div>
              </div>

              {/* 3-column deal grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {deals.map((deal) => (
                  <DealCard key={deal.id} deal={deal} />
                ))}
              </div>

              {/* Find More */}
              <div className="mt-5 flex justify-end">
                <Link
                  to={categoryPath}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:opacity-80 transition-opacity"
                >
                  Find More {cat.title} Deals
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          );
        })}

      </div>
    </section>
  );
};

export default CategoryCards;
