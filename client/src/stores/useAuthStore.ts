import { create } from "zustand";
import { User } from "@/utils/types";
import { persist } from "zustand/middleware";
import { logout } from "@/utils/authService";
import { jwtDecode } from "jwt-decode";
import { getUser } from "@/utils/userService";

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
  logOut: () => void;
  initializeUser: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,

      setUser: (user: User | null) => set({ user }),

      logOut: async () => {
        await logout();
        localStorage.removeItem("access_token");
        set({ user: null });
      },

      initializeUser: async () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
          set({ user: null });
          return;
        }
        if (token) {
          try {
            const { sub, username } = jwtDecode<{
              sub: number;
              username: string;
            }>(token);
            const userData = await getUser(sub);

            if (!userData?.user) {
              throw new Error("User data not found");
            }

            set({
              user: {
                id: sub,
                username: userData.user.username,
                createdAt: Date.now().toString(),
              },
            });
          } catch (error) {
            console.error("Failed to initialize user:", error);
            localStorage.removeItem("access_token");
            set({ user: null });
          }
        }
      },
    }),
    { name: "authStore" }
  )
);

export default useAuthStore;
