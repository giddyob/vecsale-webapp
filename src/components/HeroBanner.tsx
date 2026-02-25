import heroBanner from "@/assets/hero-banner.jpg";

const HeroBanner = () => {
  return (
    <section className="relative h-48 md:h-56 overflow-hidden">
      <img
        src={heroBanner}
        alt="Lifestyle banner"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-primary/70" />
      <div className="relative container h-full flex flex-col justify-center">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-foreground bg-accent/20 border border-accent/30 rounded-full px-3 py-1 w-fit mb-3">
          ✨ Exclusives
        </span>
        <h1 className="text-3xl md:text-4xl font-display font-extrabold text-primary-foreground leading-tight">
          Unlock the{" "}
          <span className="text-gradient-accent">Extraordinary.</span>
        </h1>
        <a
          href="#deals"
          className="mt-4 inline-flex items-center px-5 py-2 text-sm font-semibold bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity w-fit"
        >
          Hot Deals
        </a>
      </div>
    </section>
  );
};

export default HeroBanner;
