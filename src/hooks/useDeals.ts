import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
  };
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
