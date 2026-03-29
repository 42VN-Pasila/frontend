import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserState = {
    userId: string;
    username: string;
    avatarUrl?: string;
    setUserId: (userId: string) => void;
    setUsername: (username: string) => void;
    setAvatarUrl: (avatarUrl: string) => void;
    resetUser: () => void;
};

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            userId: "",
            username: "",
            setUserId: (userId: string) => set({ userId }),
            setUsername: (username: string) => set({ username }),
            setAvatarUrl: (avatarUrl: string) => set({ avatarUrl }),
            resetUser: () => set({ userId: "", username: "", avatarUrl: undefined }),
        }),
        {
            name: "user",
            storage: createJSONStorage(() => localStorage), // sessionStorage
            partialize: (state) => ({
                userId: state.userId,
                username: state.username,
                avatarUrl: state.avatarUrl,
            }),
        },
    ),
);
