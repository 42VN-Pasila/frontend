import type { RoomUserDto } from "@/gen/director";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type RoomState = {
    id: string;
    name: string;
    ownerId: string;
    users: RoomUserDto[];
    connectionCount: number;
    setRoomId: (roomId: string) => void;
    setName: (name: string) => void;
    setOwnerId: (ownerId: string) => void;
    setUsers: (newUsers: RoomUserDto[]) => void;
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
            setUsers: (users: RoomUserDto[]) => set({ users }),
            setConnectionCount: (connectionCount: number) => set({ connectionCount }),
            resetRoom: () => set({
                id: "",
                name: "",
                ownerId: "",
                users: [],
                connectionCount: 0,
            }),
        }),
        {
            name: "room",
            storage: createJSONStorage(() => localStorage), // sessionStorage
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