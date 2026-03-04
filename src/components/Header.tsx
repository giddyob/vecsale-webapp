
import { Search, Heart, ShoppingCart, User, LogOut, Menu, Package, Ticket, Sparkles, UtensilsCrossed, Dumbbell, ShoppingBag, Plane, Car, Gift, Bell } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { categories, categoryIconNames } from "@/data/deals";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import vecsaleLogo from "@/assets/vecsale_Logo__mobile_view.png";

const iconMap: Record<string, React.ComponentType<{ className?: string; }>> = {
  Ticket, Sparkles, UtensilsCrossed, Dumbbell, ShoppingBag, Plane, Car, Gift
};

const getInitials = (email: string) => {
  const parts = email.split("@")[0].split(/[._\-]/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return parts[0].slice(0, 2).toUpperCase();
};

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { user, signOut } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const initials = user?.email ? getInitials(user.email) : "";

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-nav border-b border-border">
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
                  <SheetTitle className="text-left">
                    <img
                      src={vecsaleLogo}
                      alt="VecSale"
                      style={{ height: 32, width: "auto" }}
                    />
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col p-4 gap-1">
                  {user &&
                    <>
                      <Link to="/my-stuff" className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors">
                        <Package className="w-4 h-4" />
                        My Stuff
                      </Link>
                      <Link to="/cart" className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors">
                        <ShoppingCart className="w-4 h-4" />
                        Cart
                        {itemCount > 0 &&
                          <span className="ml-auto bg-accent text-accent-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                            {itemCount}
                          </span>
                        }
                      </Link>
                      <Link to="/favourites" className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors">
                        <Heart className="w-4 h-4" />
                        Favourites
                      </Link>
                      <Link to="/auth" className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors">
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                    </>
                  }

                  {!user &&
                    <Link to="/auth" className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors">
                      <User className="w-4 h-4" />
                      Sign In
                    </Link>
                  }

                  <div className="border-t border-border my-3" />
                  <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Categories</p>
                  {categories.map((cat) => {
                    const IconComp = iconMap[categoryIconNames[cat]];
                    return (
                      <Link
                        key={cat}
                        to={`/category/${encodeURIComponent(cat)}`}
                        className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors">

                        {IconComp && <IconComp className="w-4 h-4" />}
                        {cat}
                      </Link>);

                  })}

                  {user &&
                    <>
                      <div className="border-t border-border my-3" />
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-left text-muted-foreground hover:text-foreground hover:bg-secondary rounded-md transition-colors">

                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </>
                  }
                </nav>
              </SheetContent>
            </Sheet>

            <a href="/" className="flex-shrink-0">
              <img alt="VecSale" className="hidden md:block" style={{ width: 220, height: 40 }} src="/lovable-uploads/ddbe6fa9-d856-4b61-ad3f-45dfefc11ab3.png" />
              <img
                alt="VecSale"
                className="md:hidden"
                style={{ height: 32, width: "auto" }}
                src={vecsaleLogo}
              />
            </a>
          </div>

          {/* Desktop search */}
          <div className="hidden md:flex flex-1 max-w-xl">
            <div className="flex w-full rounded-lg overflow-hidden border border-border">
              <div className="flex items-center pl-4 text-muted-foreground">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Find local deals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-3 py-2.5 text-sm bg-card text-foreground placeholder:text-muted-foreground focus:outline-none" />

              <button className="px-5 py-2.5 text-sm font-semibold bg-accent text-accent-foreground hover:opacity-90 transition-opacity">
                Search
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Notification bell */}
            <button className="relative text-black hover:text-black/70 transition-colors">
              <Bell className="w-6 h-6" />
            </button>

            {/* Favourites */}
            <Link to="/favourites" className="text-black hover:text-black/70 transition-colors">
              <Heart className="w-6 h-6" />
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative text-black hover:text-black/70 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 &&
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {itemCount}
                </span>
              }
            </Link>

            {/* Profile avatar */}
            {user ? (
              <Link
                to="/auth"
                className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold flex-shrink-0 hover:opacity-90 transition-opacity"
              >
                {initials}
              </Link>
            ) : (
              <Link
                to="/auth"
                className="w-8 h-8 rounded-full border-2 border-black flex items-center justify-center flex-shrink-0 hover:bg-black/5 transition-colors"
              >
                <User className="w-4 h-4 text-black" />
              </Link>
            )}
          </div>
        </div>

        {/* Mobile search - second line */}
        <div className="md:hidden px-4 pb-3">
          <div className="flex w-full rounded-lg overflow-hidden border border-border">
            <div className="flex items-center pl-3 text-muted-foreground">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder="Find local deals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-3 py-2 text-sm bg-card text-foreground placeholder:text-muted-foreground focus:outline-none" />

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
            {categories.map((cat) => {
              const IconComp = iconMap[categoryIconNames[cat]];
              return (
                <Link
                  key={cat}
                  to={`/category/${encodeURIComponent(cat)}`}
                  className="flex-shrink-0 flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium hover:bg-secondary rounded-md transition-colors text-neutral-950">

                  {IconComp && <IconComp className="w-4 h-4" />}
                  {cat}
                </Link>);

            })}
          </nav>
        </div>
      </div>
    </header>);

};

export default Header;
