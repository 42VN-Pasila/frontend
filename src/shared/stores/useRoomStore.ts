import type { UserDto } from "@/gen/director";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type RoomState = {
    id: string;
    name: string;
    ownerId: string;
    users: UserDto[];
    connectionCount: number;
    setRoomId: (roomId: string) => void;
    setName: (name: string) => void;
    setOwnerId: (ownerId: string) => void;
    setUsers: (newUsers: UserDto[]) => void;
    setConnectionCount: (connectionCount: number) => void;
    resetRoom: () => void;
};

export const useRoomStore = create<RoomState>()(
    persist(
        (set) => ({
            id: "",
            name: "",
            ownerId: "",
            users: [],
            connectionCount: 0,
            setRoomId: (roomId: string) => set({ id: roomId }),
            setName: (name: string) => set({ name }),
            setOwnerId: (ownerId: string) => set({ ownerId }),
            setUsers: (users: UserDto[]) => set({ users }),
            setConnectionCount: (connectionCount: number) => set({ connectionCount }),
            resetRoom: () => {
                set({
                    id: "",
                    name: "",
                    ownerId: "",
                    users: [],
                    connectionCount: 0,
                });
                useRoomStore.persist.clearStorage();
            },
        }),
        {
            name: "room",
            storage: createJSONStorage(() => sessionStorage),
            partialize: (state) => ({
                id: state.id,
                name: state.name,
                ownerId: state.ownerId,
                users: state.users,
                connectionCount: state.connectionCount,
            }),
        },
    ),
);  