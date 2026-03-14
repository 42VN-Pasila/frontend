import { useState } from "react";

import { useCreateRoomMutation } from "@/shared/api/directorApi";
import { Button } from "@/shared/components";
import { useUserStore } from "@/shared/stores/useUserStore";
import { useRoomStore } from "@/shared/stores/useRoomStore";

import { MAX_PLAYERS } from "@/common/constants";

export const CreateRoomModal = () => {
    const { userId, setUserId } = useUserStore();
    const { setRoomId, setUsers, setOwnerId, setConnectionCount } = useRoomStore();

    const [roomName, setRoomName] = useState("");

    const { mutateAsync: createRoom, isPending: isCreatingRoom, error } = useCreateRoomMutation();

    const handleCreateRoom = async () => {
        const normalizedRoomName = roomName.trim();
        if (!userId || !normalizedRoomName || isCreatingRoom) return;

        const data = await createRoom({
            userId,
            roomName: normalizedRoomName,
        });

        setRoomId(data.room.id);
        setUserId(userId);
        setUsers(data.room.users);
        setOwnerId(data.room.ownerId);
        setConnectionCount(data.room.connectionCount);
    };

    return (
        <>
            <header className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="text-2xl font-bold tracking-widest">NEW ROOM</h2>
                <div className="flex items-center gap-2">
                    <div className="border border-rave-red bg-rave-red/10 px-3 py-2 text-xs tracking-[0.18em]">
                        MAX PLAYERS: {MAX_PLAYERS}
                    </div>
                </div>
            </header>

            {
                error && (
                    <div className="mb-4 border border-rave-red bg-rave-red/10 px-3 py-2 text-sm tracking-[0.18em] text-rave-red">
                        {error.message}
                    </div>
                )}

            <div className="flex items-center gap-2">
                <input
                    type="text"
                    value={roomName}
                    onChange={(e) => {
                        setRoomName(e.target.value);
                    }}
                    placeholder="Room Name"
                    className="h-12 w-full border border-rave-white/20 bg-rave-white/5 px-4 outline-none focus:border-rave-red"
                />
                <Button
                    variant="primary"
                    emphasis="high"
                    size="small"
                    className="min-w-40"
                    onClick={handleCreateRoom}
                    disabled={isCreatingRoom || !roomName.trim() || !userId}
                >
                    {isCreatingRoom ? "CREATING..." : "CREATE ROOM"}
                </Button>
            </div>
        </>
    );
};