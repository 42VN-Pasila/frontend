import { DataDisplayGrid } from "@/shared/components/DataDisplayGrid";
import RoomCard from "./RoomCard";

type Room = {
    id: string;
    name: string;
    players: number;
    status: "OPEN" | "FULL";
};

const rooms: Room[] = [
    { id: "r_001", name: "RAVEN-07", players: 2, status: "OPEN" },
    { id: "r_002", name: "ANTE-13", players: 4, status: "FULL" },
    { id: "r_003", name: "LIAR-02", players: 3, status: "OPEN" },
    { id: "r_004", name: "JOKER-99", players: 2, status: "OPEN" },
    { id: "r_005", name: "QUEEN-01", players: 2, status: "OPEN" },
    { id: "r_006", name: "KING-01", players: 2, status: "OPEN" },
    { id: "r_007", name: "ACE-01", players: 2, status: "OPEN" },
];

export const RoomList = () => {
    return (
        <div className="bg-rave-black text-rave-white font-chakraBold min-h-screen p-8">
            <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-4">
                <h1 className="text-4xl sm:text-5xl tracking-tight leading-none">
                    ROOM LIST
                </h1>
                <div className="flex items-center gap-2">
                    <div className="border border-rave-white/15 bg-rave-white/5 px-3 py-2 text-xs tracking-[0.18em]">
                        {rooms.length} ROOMS
                    </div>
                    <div className="border border-rave-red bg-rave-red/10 px-3 py-2 text-xs tracking-[0.18em]">
                        MAX PLAYERS: 4
                    </div>
                </div>
            </header>
            <DataDisplayGrid.Root<Room> items={rooms} itemToText={(room) => room.name}>
                <DataDisplayGrid.Search />
                <DataDisplayGrid.Content
                    renderItem={(room: Room) => (
                        <RoomCard room={{ id: room.id, code: room.name, players: room.players, status: room.status }} />
                    )}
                />
            </DataDisplayGrid.Root>
        </div>
    );
};