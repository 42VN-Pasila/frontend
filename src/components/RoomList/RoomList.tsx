import { DataDisplayGrid } from "@/shared/components/DataDisplayGrid";

type Room = {
    id: string;
    name: string;
};

const rooms: Room[] = [
    { id: "1", name: "Alpha Room" },
    { id: "2", name: "Bravo Room" },
    { id: "3", name: "Charlie Room" },
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
            </DataDisplayGrid.Root>
        </div>
    );
};