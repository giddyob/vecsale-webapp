import { Search, Heart, ShoppingCart, User, LogOut, Menu, Package } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { categories } from "@/data/deals";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user, signOut } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-nav">
        <div className="container flex items-center justify-between gap-4 py-3">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="md:hidden text-nav-foreground/80 hover:text-nav-foreground transition-colors">
                  <Menu className="w-5 h-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <SheetHeader className="p-4 border-b border-border">
                  <SheetTitle className="text-left font-display font-extrabold">
                    Vec<span className="text-accent">Sale</span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col p-4 gap-1">
                  {user && (
                    <>
                      <Link
                        to="/my-stuff"
                        className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors"
                      >
                        <Package className="w-4 h-4" />
                        My Stuff
                      </Link>
                      <Link
                        to="/cart"
                        className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Cart
                        {itemCount > 0 && (
                          <span className="ml-auto bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {itemCount}
                          </span>
                        )}
                      </Link>
                      <Link
                        to="/favourites"
                        className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors"
                      >
                        <Heart className="w-4 h-4" />
                        Favourites
                      </Link>
                      <Link
                        to="/auth"
                        className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                    </>
                  )}

                  {!user && (
                    <Link
                      to="/auth"
                      className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors"
                    >
                      <User className="w-4 h-4" />
                      Sign In
                    </Link>
                  )}

                  <div className="border-t border-border my-3" />
                  <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Categories</p>
                  {categories.map((cat) => (
                    <Link
                      key={cat}
                      to={`/category/${encodeURIComponent(cat)}`}
                      className="px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors"
                    >
                      {cat}
                    </Link>
                  ))}

                  {user && (
                    <>
                      <div className="border-t border-border my-3" />
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-left text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>

            <a href="/" className="flex-shrink-0">
              <span className="text-2xl font-display font-extrabold text-nav-foreground">
                Vec<span className="text-accent">Sale</span>
              </span>
            </a>
          </div>

          {/* Desktop search */}
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

          <div className="flex items-center gap-4">
            {user && (
              <Link to="/my-stuff" className="hidden sm:flex items-center gap-2 text-sm text-nav-foreground/80 hover:text-nav-foreground transition-colors">
                <span>My Stuff</span>
              </Link>
            )}
            <Link to="/favourites" className="text-nav-foreground/80 hover:text-nav-foreground transition-colors">
              <Heart className="w-5 h-5" />
            </Link>
            {user ? (
              <button onClick={handleSignOut} className="hidden sm:flex items-center gap-2 text-sm text-nav-foreground/80 hover:text-nav-foreground transition-colors">
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            ) : (
              <Link to="/auth" className="hidden sm:flex items-center gap-2 text-sm text-nav-foreground/80 hover:text-nav-foreground transition-colors">
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
            )}
            <Link to="/cart" className="relative text-nav-foreground/80 hover:text-nav-foreground transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile search - second line */}
        <div className="md:hidden px-4 pb-3">
          <div className="flex w-full rounded-lg overflow-hidden bg-card">
            <div className="flex items-center pl-3 text-muted-foreground">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Find local deals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-3 py-2 text-sm bg-card text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button className="px-4 py-2 text-sm font-semibold bg-accent text-accent-foreground hover:opacity-90 transition-opacity">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Desktop category nav */}
      <div className="hidden md:block bg-card border-b border-border">
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
