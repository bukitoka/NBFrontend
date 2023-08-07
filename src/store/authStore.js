import { create } from 'zustand'
import { devtools, persist, createJSONStorage } from 'zustand/middleware'

const authStore = (set, get) => ({
    allUserData: null, // Use this to store all user data
    loading: false,
    user: () => ({
        user_id: get().allUserData?.user_id || null,
        email: get().allUserData?.email || null,
    }),
    setUser: (user) => set({ allUserData: user }),
    setLoading: (loading) => set({ loading }),
    isLoggedIn: () => get().allUserData !== null,
});

const useAuthStore = create(
    devtools(
        persist(authStore, {
            name: 'auth-store',
            storage: createJSONStorage(() => localStorage),
        })
    )
);

export default useAuthStore;