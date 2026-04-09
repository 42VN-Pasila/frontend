import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { UserDto } from '@/gen/director';

export type RoomState = {
  id: string;
  name: string;
  ownerUsername: string;
  users: UserDto[];
  connectionCount: number;
  setRoomId: (roomId: string) => void;
  setName: (name: string) => void;
  setOwnerUsername: (ownerUsername: string) => void;
  setUsers: (newUsers: UserDto[]) => void;
  setConnectionCount: (connectionCount: number) => void;
  resetRoom: () => void;
};

export const useRoomStore = create<RoomState>()(
  persist(
    (set, _get, store) => ({
      id: '',
      name: '',
      ownerUsername: '',
      users: [],
      connectionCount: 0,
      setRoomId: (roomId: string) => set({ id: roomId }),
      setName: (name: string) => set({ name }),
      setOwnerUsername: (ownerUsername: string) => set({ ownerUsername }),
      setUsers: (users: UserDto[]) => set({ users }),
      setConnectionCount: (connectionCount: number) => set({ connectionCount }),
      resetRoom: () => set(store.getInitialState())
    }),
    {
      name: 'room',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        id: state.id,
        name: state.name,
        ownerUsername: state.ownerUsername,
        users: state.users,
        connectionCount: state.connectionCount
      })
    }
  )
);
