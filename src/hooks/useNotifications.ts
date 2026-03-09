import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useCallback, useEffect, useState } from "react";

export interface DealNotification {
    id: string;
    dealId: string;
    title: string;
    merchant: string;
    imageUrl: string;
    category: string;
    discountedPrice: number;
    discountPercentage: number;
    createdAt: string;
}

const STORAGE_KEY = "vecsale_dismissed_notifications";
const SEEN_KEY = "vecsale_seen_notifications";

function getDismissed(): string[] {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
        return [];
    }
}

function getSeen(): string[] {
    try {
        return JSON.parse(localStorage.getItem(SEEN_KEY) || "[]");
    } catch {
        return [];
    }
}

export function useNotifications() {
    const [dismissed, setDismissed] = useState<string[]>(getDismissed);
    const [seen, setSeen] = useState<string[]>(getSeen);

    // Fetch latest deals from the past 30 days as notifications
    const { data: rawDeals = [] } = useQuery({
        queryKey: ["notifications-deals"],
        queryFn: async () => {
            const since = new Date();
            since.setDate(since.getDate() - 30);
            const { data, error } = await supabase
                .from("deals")
                .select("id, title, image_url, category, discounted_price, discount_percentage, created_at, businesses(name)")
                .eq("status", "active")
                .gte("created_at", since.toISOString())
                .order("created_at", { ascending: false })
                .limit(30);
            if (error) throw error;
            return data || [];
        },
        refetchInterval: 60_000, // refresh every minute
        staleTime: 30_000,
    });

    const notifications: DealNotification[] = (rawDeals as any[])
        .filter((d) => !dismissed.includes(d.id))
        .map((d) => ({
            id: d.id,
            dealId: d.id,
            title: d.title,
            merchant: d.businesses?.name || "Local Merchant",
            imageUrl: d.image_url || "/placeholder.svg",
            category: d.category || "",
            discountedPrice: Number(d.discounted_price),
            discountPercentage: d.discount_percentage || 0,
            createdAt: d.created_at,
        }));

    const unreadCount = notifications.filter((n) => !seen.includes(n.id)).length;

    const markAllSeen = useCallback(() => {
        const ids = notifications.map((n) => n.id);
        const updated = Array.from(new Set([...getSeen(), ...ids]));
        localStorage.setItem(SEEN_KEY, JSON.stringify(updated));
        setSeen(updated);
    }, [notifications]);

    const dismiss = useCallback((id: string) => {
        const updated = [...getDismissed(), id];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        setDismissed(updated);
        // Also mark as seen
        const updatedSeen = Array.from(new Set([...getSeen(), id]));
        localStorage.setItem(SEEN_KEY, JSON.stringify(updatedSeen));
        setSeen(updatedSeen);
    }, []);

    const dismissAll = useCallback(() => {
        const ids = notifications.map((n) => n.id);
        const updated = Array.from(new Set([...getDismissed(), ...ids]));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        setDismissed(updated);
    }, [notifications]);

    return { notifications, unreadCount, markAllSeen, dismiss, dismissAll };
}
