import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabaseClient";

export interface Item {
  id: number;
  name: string;
  description: string;
  price: number | null;
  type: "product" | "service";
  image?: string;
  icon?: string;
  features?: string[];
}

interface UseItemsOptions {
  type?: "product" | "service";
  // Можно добавить другие фильтры при необходимости
}

export function useItems(options: UseItemsOptions = {}) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.from("items").select("*");
      if (error) throw error;
      let filtered = data as Item[];
      if (options.type) {
        filtered = filtered.filter((item) => item.type === options.type);
      }
      setItems(filtered);
    } catch (e: any) {
      setError(e.message || "Ошибка загрузки данных");
    } finally {
      setLoading(false);
    }
  }, [options.type]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  return { items, loading, error, refetch: fetchItems };
} 