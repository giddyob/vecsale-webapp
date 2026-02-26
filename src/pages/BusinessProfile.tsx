import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Clock, Phone, Mail, Navigation } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DealCard from "@/components/DealCard";
import { useBusiness, useDealsByBusiness } from "@/hooks/useDeals";

const BusinessProfile = () => {
  const { id } = useParams();
  const { data: business, isLoading } = useBusiness(id);
  const { data: deals = [] } = useDealsByBusiness(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center text-muted-foreground">Loading...</div>
        <Footer />
      </div>
    );
  }

  if (!business) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-display font-bold text-foreground mb-4">Business not found</h1>
          <Link to="/" className="text-accent hover:underline">Back to home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const mapQuery = encodeURIComponent(business.location || business.name);
  const mapEmbedUrl = `https://maps.google.com/maps?q=${mapQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container py-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        {/* Business Header */}
        <div className="bg-card rounded-xl p-6 mb-6" style={{ boxShadow: "var(--shadow-card)" }}>
          <div className="flex items-start gap-5">
            {business.logo ? (
              <img
                src={business.logo}
                alt={business.name}
                className="w-20 h-20 rounded-xl object-cover flex-shrink-0 border border-border"
              />
            ) : (
              <div className="w-20 h-20 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-display font-bold text-muted-foreground">
                  {business.name.charAt(0)}
                </span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-display font-extrabold text-foreground mb-1">{business.name}</h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                {business.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {business.location}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-accent text-accent" /> {business.rating} ({business.review_count} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map */}
            <div className="bg-card rounded-xl overflow-hidden" style={{ boxShadow: "var(--shadow-card)" }}>
              <iframe
                src={mapEmbedUrl}
                className="w-full h-64 border-0"
                allowFullScreen
                loading="lazy"
                title="Business location"
              />
              <div className="p-4">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-bold bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  <Navigation className="w-4 h-4" /> Get Directions
                </a>
              </div>
            </div>

            {/* About */}
            {business.description && (
              <div className="bg-card rounded-xl p-6" style={{ boxShadow: "var(--shadow-card)" }}>
                <h2 className="text-lg font-display font-bold text-foreground mb-3">About</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{business.description}</p>
              </div>
            )}

            {/* Deals */}
            {deals.length > 0 && (
              <div>
                <h2 className="text-lg font-display font-bold text-foreground mb-1">Deals by {business.name}</h2>
                <div className="w-10 h-1 bg-accent rounded-full mb-4" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {deals.map((d) => <DealCard key={d.id} deal={d} />)}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Info */}
          <div className="space-y-6">
            <div className="bg-card rounded-xl p-6" style={{ boxShadow: "var(--shadow-card)" }}>
              <h2 className="text-lg font-display font-bold text-foreground mb-4">Business Info</h2>
              <div className="space-y-4 text-sm">
                {business.opening_hours && (
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Operating Hours</p>
                      <p className="text-muted-foreground whitespace-pre-line">{business.opening_hours}</p>
                    </div>
                  </div>
                )}
                {business.phone && (
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Phone</p>
                      <a href={`tel:${business.phone}`} className="text-accent hover:underline">{business.phone}</a>
                    </div>
                  </div>
                )}
                {business.email && (
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Email</p>
                      <a href={`mailto:${business.email}`} className="text-accent hover:underline">{business.email}</a>
                    </div>
                  </div>
                )}
                {business.location && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-foreground">Address</p>
                      <p className="text-muted-foreground">{business.location}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BusinessProfile;
