import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type RoomState = {
    id: string;
    name: string;
    ownerId: string;
    userIds: string[];
    connectionCount: number;
    setRoomId: (roomId: string) => void;
    setName: (name: string) => void;
    setOwnerId: (ownerId: string) => void;
    setUserIds: (userIds: string[]) => void;
    setConnectionCount: (connectionCount: number) => void;
    resetRoom: () => void;
};

export const useRoomStore = create<RoomState>()(
    persist(
        (set) => ({
            id: "",
            name: "",
            ownerId: "",
            userIds: [],
            connectionCount: 0,
            setRoomId: (roomId: string) => set({ id: roomId }),
            setName: (name: string) => set({ name }),
            setOwnerId: (ownerId: string) => set({ ownerId }),
            setUserIds: (userIds: string[]) => set({ userIds }),
            setConnectionCount: (connectionCount: number) => set({ connectionCount }),
            resetRoom: () => set({
                id: "",
                name: "",
                ownerId: "",
                userIds: [],
                connectionCount: 0,
            }),
        }),
        {
            name: "room",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                id: state.id,
                name: state.name,
                ownerId: state.ownerId,
                userIds: state.userIds,
                connectionCount: state.connectionCount,
            }),
        },
    ),
);  