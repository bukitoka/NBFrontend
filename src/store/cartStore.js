import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import api from "@/tools/api"
import { tokenChecking } from "@/tools/auth"

const cartStore = (set) => ({
  carts: [],
  loading: false,
  error: null,

  fetchCarts: async () => {
    set({ loading: true, error: null })

    try {
      await tokenChecking()
      const { data } = await api.get("api/v1/cart/")
      set({ carts: data, loading: false })
    } catch (error) {
      set({ error: "Error fetching categories", loading: false })
    }
  },
})

const useCartStore = create(
  persist(cartStore, {
    name: "cart-store",
    storage: createJSONStorage(() => localStorage),
  })
)

export default useCartStore
