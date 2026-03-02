export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      businesses: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          email: string | null
          id: string
          latitude: number | null
          location: string | null
          logo: string | null
          longitude: number | null
          name: string | null
          opening_hours: string | null
          owner_id: string | null
          payout_details: Json | null
          phone: string | null
          rating: number | null
          region: string | null
          review_count: number | null
          social_links: Json | null
          updated_at: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          id: string
          latitude?: number | null
          location?: string | null
          logo?: string | null
          longitude?: number | null
          name?: string | null
          opening_hours?: string | null
          owner_id?: string | null
          payout_details?: Json | null
          phone?: string | null
          rating?: number | null
          region?: string | null
          review_count?: number | null
          social_links?: Json | null
          updated_at?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          email?: string | null
          id?: string
          latitude?: number | null
          location?: string | null
          logo?: string | null
          longitude?: number | null
          name?: string | null
          opening_hours?: string | null
          owner_id?: string | null
          payout_details?: Json | null
          phone?: string | null
          rating?: number | null
          region?: string | null
          review_count?: number | null
          social_links?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      coupons: {
        Row: {
          code: string
          deal_id: string | null
          id: string
          option_id: string | null
          purchase_date: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          code: string
          deal_id?: string | null
          id?: string
          option_id?: string | null
          purchase_date?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          code?: string
          deal_id?: string | null
          id?: string
          option_id?: string | null
          purchase_date?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "coupons_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "coupons_option_id_fkey"
            columns: ["option_id"]
            isOneToOne: false
            referencedRelation: "deal_options"
            referencedColumns: ["id"]
          },
        ]
      }
      deal_options: {
        Row: {
          deal_id: string | null
          discount_percentage: number | null
          id: string
          original_price: number | null
          price: number | null
          title: string
        }
        Insert: {
          deal_id?: string | null
          discount_percentage?: number | null
          id?: string
          original_price?: number | null
          price?: number | null
          title: string
        }
        Update: {
          deal_id?: string | null
          discount_percentage?: number | null
          id?: string
          original_price?: number | null
          price?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "deal_options_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
        ]
      }
      deals: {
        Row: {
          business_id: string | null
          category: string
          created_at: string
          description: string | null
          discount_percentage: number
          discounted_price: number
          expiry_date: string | null
          gallery_urls: string | null
          id: string
          image_url: string | null
          location: string | null
          options: Json | null
          original_price: number
          redemption_rules: string | null
          sold_count: number | null
          status: string | null
          sub_options: string | null
          tags: string[] | null
          title: string
          user_id: string
          vouchers_available: number | null
          vouchers_sold: number | null
        }
        Insert: {
          business_id?: string | null
          category: string
          created_at?: string
          description?: string | null
          discount_percentage: number
          discounted_price: number
          expiry_date?: string | null
          gallery_urls?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          options?: Json | null
          original_price: number
          redemption_rules?: string | null
          sold_count?: number | null
          status?: string | null
          sub_options?: string | null
          tags?: string[] | null
          title: string
          user_id: string
          vouchers_available?: number | null
          vouchers_sold?: number | null
        }
        Update: {
          business_id?: string | null
          category?: string
          created_at?: string
          description?: string | null
          discount_percentage?: number
          discounted_price?: number
          expiry_date?: string | null
          gallery_urls?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          options?: Json | null
          original_price?: number
          redemption_rules?: string | null
          sold_count?: number | null
          status?: string | null
          sub_options?: string | null
          tags?: string[] | null
          title?: string
          user_id?: string
          vouchers_available?: number | null
          vouchers_sold?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "deals_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      favorites: {
        Row: {
          deal_id: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          deal_id?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          deal_id?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "favorites_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          id: string
          role: string | null
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          id: string
          role?: string | null
        }
        Update: {
          created_at?: string
          full_name?: string | null
          id?: string
          role?: string | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          amount: number
          created_at: string | null
          date: string
          description: string | null
          id: string
          status: string
          type: string
          user_id: string
        }
        Insert: {
          amount?: number
          created_at?: string | null
          date?: string
          description?: string | null
          id?: string
          status?: string
          type: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          date?: string
          description?: string | null
          id?: string
          status?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_deal_sales: {
        Args: { deal_id_param: string }
        Returns: undefined
      }
      increment_option_sales: {
        Args: { option_id_param: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
