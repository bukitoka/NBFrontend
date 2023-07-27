import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'
import apiInstance from './api';

const categoryStore = (set) => ({
    categories: [],
    loading: false,
    error: null,

    fetchCategories: async () => {
        set({ loading: true, error: null });

        try {
            const { data } = await apiInstance.get('category/');
            set({ categories: data.results, loading: false });
        } catch (error) {
            set({ error: 'Error fetching categories', loading: false });
        }
    },
});

const useCategory = create(
    devtools(
        persist(categoryStore, {
            name: 'category-store',
            storage: createJSONStorage(() => localStorage),
        })
    )
);

export default useCategory