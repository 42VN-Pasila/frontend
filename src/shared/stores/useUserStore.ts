import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type UserState = {
  username: string;
  avatarUrl?: string;
  setUsername: (username: string) => void;
  setAvatarUrl: (avatarUrl: string) => void;
  resetUser: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set, _get, store) => ({
      username: '',
      setUsername: (username: string) => set({ username }),
      setAvatarUrl: (avatarUrl: string) => set({ avatarUrl }),
      resetUser: () => set(store.getInitialState())
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        username: state.username,
        avatarUrl: state.avatarUrl
      })
    }
  )
);
