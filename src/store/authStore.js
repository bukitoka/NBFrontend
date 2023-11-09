import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

const authStore = (set) => ({
  loading: false,
  isLoggedIn: false,
  user: null,
  accessExpiration: null,
  refreshExpiration: null,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  setAccessExpiration: (accessExpiration) => set({ accessExpiration }),
  setRefreshExpiration: (refreshExpiration) => set({ refreshExpiration }),
})

const useAuthStore = create(
  persist(authStore, {
    name: "user-data",
    storage: createJSONStorage(() => localStorage),
  })
)

export default useAuthStore
