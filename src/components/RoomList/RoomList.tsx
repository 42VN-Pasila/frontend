import { DataDisplayGrid } from "@/shared/components/DataDisplayGrid";
import type { Room as DirectorRoom } from "@/gen/director/models/Room";
import RoomCard from "./RoomCard";
import { directorApi } from "@/shared/api/directorApi";

type Room = {
    id: string;
    name: string;
    players: number;
    status: "OPEN" | "FULL";
};

export const RoomList = () => {
    const { data: rooms = [], isLoading, error } = directorApi.useListRoomsQuery();

    const roomItems: Room[] = rooms.map((room: DirectorRoom) => ({
        id: room.id,
        name: room.name.toUpperCase(),
        players: room.connectionCount ?? room.userIds.length,
        status: (room.connectionCount ?? room.userIds.length) >= 4 ? "FULL" : "OPEN",
    }));

    return (
        <div className="bg-rave-black text-rave-white font-chakraBold min-h-screen p-8">
            <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-4">
                <h1 className="text-4xl sm:text-5xl tracking-tight leading-none">
                    ROOM LIST
                </h1>
                <div className="flex items-center gap-2">
                    <div className="border border-rave-white/15 bg-rave-white/5 px-3 py-2 text-xs tracking-[0.18em]">
                        {roomItems.length} ROOMS
                    </div>
                    <div className="border border-rave-red bg-rave-red/10 px-3 py-2 text-xs tracking-[0.18em]">
                        MAX PLAYERS: 4
                    </div>
                </div>
            </header>

            {isLoading && <p className="text-rave-white/70 text-sm mb-4">Loading rooms...</p>}
            {error && <p className="text-rave-red/90 text-sm mb-4">Failed to load rooms.</p>}

            <DataDisplayGrid.Root<Room> items={roomItems} itemToText={(room) => room.name}>
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