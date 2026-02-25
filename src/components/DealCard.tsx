import { Heart, Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import type { Deal } from "@/data/deals";

interface DealCardProps {
  deal: Deal;
  variant?: "default" | "large";
}

const DealCard = ({ deal, variant = "default" }: DealCardProps) => {
  const isLarge = variant === "large";

  return (
    <Link
      to={`/deal/${deal.id}`}
      className="group block bg-card rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)]"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      {/* Image */}
      <div className={`relative overflow-hidden ${isLarge ? "h-56" : "h-44"}`}>
        <img
          src={deal.image}
          alt={deal.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <button className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-card/80 backdrop-blur-sm text-muted-foreground hover:text-accent transition-colors">
          <Heart className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center gap-2 text-xs mb-1.5">
          <span className="font-semibold text-accent uppercase tracking-wide truncate">
            {deal.merchant}
          </span>
          <span className="flex items-center gap-0.5 text-muted-foreground">
            <MapPin className="w-3 h-3" />
            {deal.location}
          </span>
          <span className="flex items-center gap-0.5 text-foreground ml-auto">
            <Star className="w-3 h-3 fill-accent text-accent" />
            {deal.rating}
          </span>
        </div>

        <h3 className="font-display font-semibold text-sm text-foreground leading-tight mb-3 line-clamp-2">
          {deal.title}
        </h3>

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-foreground">
            GH₵{deal.currentPrice}
          </span>
          <span className="text-sm text-muted-foreground line-through">
            GH₵{deal.originalPrice}
          </span>
          <span className="ml-auto text-xs font-bold bg-accent text-accent-foreground px-2 py-0.5 rounded-md">
            -{deal.discount}%
          </span>
        </div>
      </div>
    </Link>
  );
};

export default DealCard;
