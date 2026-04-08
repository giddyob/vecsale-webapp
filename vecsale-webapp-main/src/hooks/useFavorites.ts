import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export function useFavorites() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["favorites", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("favorites")
        .select("deal_id")
        .eq("user_id", user!.id);
      if (error) throw error;
      return (data || []).map((f) => f.deal_id).filter(Boolean) as string[];
    },
  });
}

export function useFavoriteDeals() {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["favorite-deals", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("favorites")
        .select("deal_id, deals:deal_id(*, businesses(name, rating, location))")
        .eq("user_id", user!.id);
      if (error) throw error;
      return data || [];
    },
  });
}

export function useToggleFavorite() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ dealId, isFavorited }: { dealId: string; isFavorited: boolean }) => {
      if (!user) throw new Error("Not authenticated");
      if (isFavorited) {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("deal_id", dealId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("favorites")
          .insert({ user_id: user.id, deal_id: dealId });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      queryClient.invalidateQueries({ queryKey: ["favorite-deals"] });
    },
  });
}
