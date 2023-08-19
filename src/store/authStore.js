import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

const authStore = (set, get) => ({
    allUserData: null, // Use this to store all user data
    loading: false,
    isLoggedIn: false,
    user: () => ({ user_id: get().allUserData?.user_id || null, }),
    setUser: (user) => set({ allUserData: user }),
    setLoading: (loading) => set({ loading }),
    setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
});

const useAuthStore = create(
    devtools(authStore)
);

export default useAuthStore;
