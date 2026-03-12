import { useState } from "react";

import { directorApi } from "@/shared/api/directorApi";
import { Button } from "@/shared/components";
import { useUserStore } from "@/shared/stores/useUserStore";
import { useRoomStore } from "@/shared/stores/useRoomStore";

import { handleCreateRoomError } from "./errorCreateHandling";
import { MAX_PLAYERS } from "@/common/constants";

export const CreateRoomModal = () => {
    const { userId, setUserId } = useUserStore();
    const { setRoomId, setUsers, setOwnerId, setConnectionCount } = useRoomStore();

    const [roomName, setRoomName] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [createRoom, { isLoading }] = directorApi.useCreateRoomMutation();

    const handleCreateRoom = async () => {
        const normalizedRoomName = roomName.trim();
        if (!userId || !normalizedRoomName) return;

        const { data, error } = await createRoom({
            userId,
            roomName: normalizedRoomName,
        })
        if (data) {
            setRoomId(data.room.id);
            setUserId(userId);
            setUsers(data.room.users);
            setOwnerId(data.room.ownerId);
            setConnectionCount(data.room.connectionCount);
        }
        if (error) {
            const message = handleCreateRoomError(error);
            setErrorMessage(message);
        }
    };

    return (
        <>
            <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-4">
                <h2 className="text-2xl font-bold tracking-widest">NEW ROOM</h2>
                <div className="flex items-center gap-2">
                    <div className="border border-rave-red bg-rave-red/10 px-3 py-2 text-xs tracking-[0.18em]">
                        MAX PLAYERS: {MAX_PLAYERS}
                    </div>
                </div>
            </header>
            {/* TODO: Handle error */}
            {errorMessage && (
                <div className="text-rave-red text-sm border border-rave-red bg-rave-red/10 px-3 py-2 tracking-[0.18em] mb-4">
                    {errorMessage}
                </div>
            )}
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    value={roomName}
                    onChange={(e) => {
                        setRoomName(e.target.value);
                        setErrorMessage(null);
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
                    disabled={isLoading || !roomName.trim() || !userId}
                >
                    {isLoading ? "CREATING..." : "CREATE ROOM"}
                </Button>
            </div>
        </>
    );
};
