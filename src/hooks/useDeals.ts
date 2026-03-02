import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SubDeal {
  id: string;
  title: string;
  description?: string;
  original_price: number;
  discounted_price: number;
  vouchers_available?: number;
  location?: string;
  expiry_date?: string;
  redemption_rules?: string;
}

export interface DealWithBusiness {
  id: string;
  title: string;
  image: string;
  merchant: string;
  location: string;
  rating: number;
  currentPrice: number;
  originalPrice: number;
  discount: number;
  category: string;
  description: string | null;
  businessId: string | null;
  subDeals: SubDeal[];
  galleryUrls: string[];
}

function parseSubDeals(raw: any): SubDeal[] {
  if (!raw) return [];
  try {
    const arr = typeof raw === "string" ? JSON.parse(raw) : raw;
    if (!Array.isArray(arr)) return [];
    return arr.filter((s: any) => s && s.title);
  } catch { return []; }
}

function parseGalleryUrls(raw: any): string[] {
  if (!raw) return [];
  try {
    const arr = typeof raw === "string" ? JSON.parse(raw) : raw;
    if (!Array.isArray(arr)) return [];
    return arr.filter((u: any) => typeof u === "string" && u.length > 0);
  } catch { return []; }
}

function mapDeal(deal: any): DealWithBusiness {
  return {
    id: deal.id,
    title: deal.title,
    image: deal.image_url || "/placeholder.svg",
    merchant: deal.businesses?.name || "Local Merchant",
    location: deal.location || "",
    rating: deal.businesses?.rating || 4.5,
    currentPrice: Number(deal.discounted_price),
    originalPrice: Number(deal.original_price),
    discount: deal.discount_percentage,
    category: deal.category,
    description: deal.description,
    businessId: deal.business_id,
    subDeals: parseSubDeals(deal.sub_options),
    galleryUrls: parseGalleryUrls(deal.gallery_urls),
  };
}

export interface BusinessProfile {
  id: string;
  name: string;
  description: string | null;
  location: string | null;
  logo: string | null;
  rating: number;
  review_count: number;
  opening_hours: string | null;
  phone: string | null;
  email: string | null;
}

export function useBusiness(id: string | undefined) {
  return useQuery({
    queryKey: ["business", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("businesses")
        .select("*")
        .eq("id", id!)
        .maybeSingle();
      if (error) throw error;
      if (!data) return null;
      return {
        id: data.id,
        name: data.name || "Unknown Business",
        description: data.description,
        location: data.location,
        logo: data.logo,
        rating: data.rating || 0,
        review_count: data.review_count || 0,
        opening_hours: data.opening_hours,
        phone: data.phone,
        email: data.email,
      } as BusinessProfile;
    },
  });
}

export function useDealsByBusiness(businessId: string | undefined) {
  return useQuery({
    queryKey: ["deals", "business", businessId],
    enabled: !!businessId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("deals")
        .select("*, businesses(name, rating, location)")
        .eq("status", "active")
        .eq("business_id", businessId!)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []).map(mapDeal);
    },
  });
}

export function useDeals() {
  return useQuery({
    queryKey: ["deals"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("deals")
        .select("*, businesses(name, rating, location)")
        .eq("status", "active")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []).map(mapDeal);
    },
  });
}

export function useDeal(id: string | undefined) {
  return useQuery({
    queryKey: ["deal", id],
    enabled: !!id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("deals")
        .select("*, businesses(name, rating, location)")
        .eq("id", id!)
        .maybeSingle();
      if (error) throw error;
      return data ? mapDeal(data) : null;
    },
  });
}

export function useDealsByCategory(category: string) {
  return useQuery({
    queryKey: ["deals", "category", category],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("deals")
        .select("*, businesses(name, rating, location)")
        .eq("status", "active")
        .ilike("category", category)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []).map(mapDeal);
    },
  });
}
