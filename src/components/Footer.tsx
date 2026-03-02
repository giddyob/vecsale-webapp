const Footer = () => {
  return (
    <footer className="bg-nav py-10 mt-8">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <img alt="VecSale" style={{ width: 220, height: 40 }} src="/lovable-uploads/ddbe6fa9-d856-4b61-ad3f-45dfefc11ab3.png" />
            <p className="mt-3 text-sm text-nav-foreground/60 leading-relaxed">
              Discover the best local deals and experiences in Ghana.
            </p>
          </div>
          <div>
            <h4 className="font-display font-bold text-nav-foreground mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-nav-foreground/60">
              <li><a href="#" className="hover:text-nav-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-nav-foreground transition-colors">How It Works</a></li>
              <li><a href="/merchant" className="hover:text-nav-foreground transition-colors">Sell on VecSale</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-nav-foreground mb-3">
              Support
            </h4>
            <ul className="space-y-2 text-sm text-nav-foreground/60">
              <li><a href="#" className="hover:text-nav-foreground transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-nav-foreground transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-nav-foreground transition-colors">Terms & Privacy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-nav-foreground/10 text-center text-xs text-nav-foreground/40">
          © 2026 VecSale. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
