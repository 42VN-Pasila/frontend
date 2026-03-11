import { useState } from "react";

import type { RoomDto } from "@/gen/director";
import { directorApi } from "@/shared/api/directorApi";
import { Button } from "@/shared/components";
import { DataDisplayGrid } from "@/shared/components/DataDisplayGrid";

import RoomCard from "./RoomCard";

type Room = {
  id: string;
  name: string;
  players: number;
  status: "OPEN" | "FULL";
};


export const RoomList = () => {
  const {
    data: rooms = [],
    isLoading,
    isFetching,
    error,
    refetch,
  } = directorApi.useListRoomsQuery();
  const [roomCardErrorMessage, setRoomCardErrorMessage] = useState("");
  const roomItems: Room[] = [
    ...rooms.map((room: RoomDto) => {
      const playerCount = room.connectionCount ?? room.userIds.length;
      return {
        id: room.id,
        name: room.name.toUpperCase(),
        players: playerCount,
        status: (playerCount >= 4 ? "FULL" : "OPEN") as "OPEN" | "FULL",
      };
    }),
  ];
  const whenCantJoinRoom = (param: string) => {
    setRoomCardErrorMessage(param);
  };

  // export const RoomList = () => {
  //     const { data: rooms = [], isLoading, isFetching, error, refetch } = directorApi.useListRoomsQuery();

  //     const roomItems: Room[] = rooms.map((room: DirectorRoom) => ({
  //         id: room.id,
  //         name: room.name.toUpperCase(),
  //         players: room.connectionCount ?? room.userIds.length,
  //         status: (room.connectionCount ?? room.userIds.length) >= 4 ? "FULL" : "OPEN",
  //     }));

  return (
    <div className="relative border-2 border-rave-white/10 rounded-lg text-rave-white font-chakraBold p-6">
      <div
        className={`
                pointer-events-none absolute inset-x-4 top-2 h-16 rounded-xl
                transition-opacity duration-300
                opacity-90
            `}
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.18) 1px, transparent 1.6px)",
          backgroundSize: "8px 8px",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, transparent 100%)",
        }}
      />
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-4">
        <h2 className="text-2xl font-bold tracking-widest">ROOM LIST</h2>
        <div className="border border-rave-red bg-rave-red/10 px-3 py-2 text-xs tracking-[0.18em]">
          {roomItems.length} ROOMS
        </div>
      </header>

      {isLoading && (
        <p className="text-rave-white/70 text-sm mb-4">Loading rooms...</p>
      )}
      {error && (
        <p className="text-rave-red/90 text-sm mb-4">Failed to load rooms.</p>
      )}
      {roomCardErrorMessage.length !== 0 && (
        <div className="text-rave-red text-sm border border-rave-red bg-rave-red/10 px-3 py-2 tracking-[0.18em] mb-4">
          {roomCardErrorMessage}
        </div>
      )}

      <DataDisplayGrid.Root<Room>
        items={roomItems}
        itemToText={(room) => room.name}
      >
        <div className="flex items-center gap-2 w-full">
          <DataDisplayGrid.Search wrapperClassName="w-full" />
          <Button
            variant="inverse"
            emphasis="low"
            size="small"
            onClick={refetch}
            disabled={isFetching}
          >
            {isFetching ? "REFRESHING..." : "REFRESH"}
          </Button>
        </div>
        <DataDisplayGrid.Content
          columns={1}
          renderItem={(room: Room) => (
            <RoomCard
              room={{
                id: room.id,
                name: room.name,
                players: room.players,
                status: room.status,
                onConnectError: whenCantJoinRoom,
              }}
            />
          )}
        />
      </DataDisplayGrid.Root>
    </div>
  );
};
