import { Heart, Star, MapPin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import type { DealWithBusiness } from "@/hooks/useDeals";
import { useFavorites, useToggleFavorite } from "@/hooks/useFavorites";
import { useAuth } from "@/contexts/AuthContext";

interface DealCardProps {
  deal: DealWithBusiness;
  variant?: "default" | "large";
}

const DealCard = ({ deal, variant = "default" }: DealCardProps) => {
  const isLarge = variant === "large";
  const { user } = useAuth();
  const { data: favIds = [] } = useFavorites();
  const toggleFav = useToggleFavorite();
  const isFav = favIds.includes(deal.id);

  const handleFav = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    toggleFav.mutate({ dealId: deal.id, isFavorited: isFav });
  };

  return (
    <Link
      to={`/deal/${deal.id}`}
      className="group block bg-card rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)]"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className={`relative overflow-hidden ${isLarge ? "h-56" : "h-44"}`}>
        <img
          src={deal.image}
          alt={deal.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <button
          onClick={handleFav}
          className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-card/80 backdrop-blur-sm transition-colors ${isFav ? "text-accent" : "text-muted-foreground hover:text-accent"}`}
        >
          <Heart className={`w-4 h-4 ${isFav ? "fill-accent" : ""}`} />
        </button>
      </div>

      <div className="p-4 flex flex-col gap-1">
        {/* Business Name */}
        {deal.businessId ? (
          <span
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.location.href = `/business/${deal.businessId}`; }}
            className="text-sm text-muted-foreground truncate cursor-pointer hover:underline"
          >
            {deal.merchant}
          </span>
        ) : (
          <span className="text-sm text-muted-foreground truncate">
            {deal.merchant}
          </span>
        )}

        {/* Deal Title */}
        <h3 className="font-display font-semibold text-base text-foreground leading-tight line-clamp-2">
          {deal.title}
        </h3>

        {/* Location */}
        <span className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          {deal.location}
        </span>

        {/* Rating */}
        <span className="flex items-center gap-1 text-sm text-foreground">
          <Star className="w-3.5 h-3.5 fill-accent text-accent shrink-0" />
          {deal.rating}
        </span>

        {/* Prices */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-sm text-muted-foreground line-through">
            GH₵{deal.originalPrice}
          </span>
          <span className="text-xl font-bold" style={{ color: "#2AA72A" }}>
            GH₵{deal.currentPrice}
          </span>
          <span className="ml-auto text-xs font-bold text-white px-2 py-0.5 rounded-md" style={{ backgroundColor: "#22c55b" }}>
            -{deal.discount}%
          </span>
        </div>
      </div>
    </Link>
  );
};

export default DealCard;
