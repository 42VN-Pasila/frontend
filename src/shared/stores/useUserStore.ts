import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type UserState = {
  username: string;
  displayName: string;
  avatarUrl?: string;
  setUsername: (username: string) => void;
  setDisplayName: (displayName: string) => void;
  setAvatarUrl: (avatarUrl: string) => void;
  resetUser: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set, _get, store) => ({
      username: '',
      displayName: '',
      setUsername: (username: string) => set({ username }),
      setDisplayName: (displayName: string) => set({ displayName }),
      setAvatarUrl: (avatarUrl: string) => set({ avatarUrl }),
      resetUser: () => set(store.getInitialState())
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        username: state.username,
        displayName: state.displayName,
        avatarUrl: state.avatarUrl
      })
    }
  )
);
