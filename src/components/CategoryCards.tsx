import { ArrowRight } from "lucide-react";

const categoryItems = [
  {
    emoji: "🧖‍♀️",
    title: "Self-Care",
    description: "Relax with premium spa days.",
  },
  {
    emoji: "🍣",
    title: "Dining",
    description: "Taste local extraordinary food.",
  },
  {
    emoji: "🚠",
    title: "Adventure",
    description: "Create memories that last.",
  },
];

const CategoryCards = () => {
  return (
    <section className="py-12">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {categoryItems.map((cat) => (
            <div
              key={cat.title}
              className="bg-card rounded-xl p-6 flex flex-col items-start gap-3 hover:shadow-[var(--shadow-card-hover)] transition-shadow cursor-pointer group"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <span className="text-4xl">{cat.emoji}</span>
              <h3 className="text-lg font-display font-bold text-foreground">
                {cat.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {cat.description}
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent group-hover:gap-2 transition-all">
                Explore
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;
