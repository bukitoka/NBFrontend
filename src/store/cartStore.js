import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'
import api from '../tools/api';

const cartStore = (set) => ({
    carts: [],
    loading: false,
    error: null,

    fetchCarts: async () => {
        set({ loading: true, error: null });

        try {
            const { data } = await api.get('api/v1/cart/');
            set({ carts: data.results, loading: false });
        } catch (error) {
            set({ error: 'Error fetching categories', loading: false });
        }
    },
});

const useCartStore = create(
    devtools(
        persist(cartStore, {
            name: 'cart-store',
            storage: createJSONStorage(() => localStorage),
        })
    )
);

export default useCartStore
