import { Search, Heart, ShoppingCart, User } from "lucide-react";
import { Link } from "react-router-dom";
import { categories } from "@/data/deals";
import { useState } from "react";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-nav">
        <div className="container flex items-center justify-between gap-6 py-3">
          {/* Logo */}
          <a href="/" className="flex-shrink-0">
            <span className="text-2xl font-display font-extrabold text-nav-foreground">
              Vec<span className="text-accent">Sale</span>
            </span>
          </a>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-xl">
            <div className="flex w-full rounded-lg overflow-hidden bg-card">
              <div className="flex items-center pl-4 text-muted-foreground">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Find local deals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-3 py-2.5 text-sm bg-card text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button className="px-5 py-2.5 text-sm font-semibold bg-accent text-accent-foreground hover:opacity-90 transition-opacity">
                Search
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link to="/my-stuff" className="hidden sm:flex items-center gap-2 text-sm text-nav-foreground/80 hover:text-nav-foreground transition-colors">
              <span>My Stuff</span>
            </Link>
            <Link to="/favourites" className="text-nav-foreground/80 hover:text-nav-foreground transition-colors">
              <Heart className="w-5 h-5" />
            </Link>
            <Link to="/auth" className="flex items-center gap-2 text-sm text-nav-foreground/80 hover:text-nav-foreground transition-colors">
              <User className="w-5 h-5" />
              <span className="hidden sm:inline">Sign In</span>
            </Link>
            <Link to="/cart" className="text-nav-foreground/80 hover:text-nav-foreground transition-colors">
              <ShoppingCart className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Category nav */}
      <div className="bg-card border-b border-border">
        <div className="container">
          <nav className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/category/${encodeURIComponent(cat)}`}
                className="flex-shrink-0 px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors"
              >
                {cat}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
