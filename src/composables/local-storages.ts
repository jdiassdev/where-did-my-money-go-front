import { ref } from "vue";
import { getCategories } from "@/api/category";
import type { ListCategories } from "@/types/category";

const STORAGE_KEY = "categories-cache";

const CACHE_TTL = 1000 * 60 * 60; // 1h

export function useCategories() {
  const categories = ref<ListCategories[]>([]);
  const loading = ref(false);
  const error = ref<unknown>(null);

  const loadCategories = async () => {
    loading.value = true;
    error.value = null;

    try {
      const cached = localStorage.getItem(STORAGE_KEY);

      if (cached) {
        const { data, timestamp } = JSON.parse(cached);

        if (Date.now() - timestamp < CACHE_TTL) {
          categories.value = data;
          return;
        }
      }

      const data = await getCategories();
      categories.value = data;

      if (!Array.isArray(data) || data.length === 0) {
        clearCache();
        return;
      }
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          data,
          timestamp: Date.now(),
        })
      );
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  const clearCache = () => {
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    categories,
    loading,
    error,
    loadCategories,
    clearCache,
  };
}
