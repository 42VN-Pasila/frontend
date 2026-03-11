import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserState = {
    userId: string;
    username: string;
    imageUrl?: string;
    setUserId: (userId: string) => void;
    setUsername: (username: string) => void;
    setImageUrl: (imageUrl: string) => void;
};

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            userId: "",
            username: "",
            setUserId: (userId: string) => set({ userId }),
            setUsername: (username: string) => set({ username }),
            setImageUrl: (imageUrl: string) => set({ imageUrl }),
        }),
        {
            name: "user",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                userId: state.userId,
                username: state.username,
                imageUrl: state.imageUrl,
            }),
        },
    ),
);
