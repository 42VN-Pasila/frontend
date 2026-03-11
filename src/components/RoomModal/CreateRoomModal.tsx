import { directorApi } from "@/shared/api/directorApi";
import { Button } from "@/shared/components";
import { useGameSessionStore } from "@/shared/stores/useGameSessionStore";
import { useUserStore } from "@/shared/stores/useUserStore";
import { useState } from "react";

export const CreateRoomModal = () => {
    const userId = useUserStore((state) => state.userId);
    const setRoomId = useGameSessionStore((state) => state.setRoomId);
    const setUserId = useUserStore((state) => state.setUserId);

    const [roomName, setRoomName] = useState("");
    const [createRoom, { isLoading, error }] = directorApi.useCreateRoomMutation();


    const handleCreateRoom = async () => {
        const normalizedRoomName = roomName.trim();
        if (!userId || !normalizedRoomName) return;


        const response = await createRoom({ userId, roomName: normalizedRoomName }).unwrap();
        if (response.roomId) {
            setRoomId(response.roomId);
            setUserId(userId);
        }
    };

    return (
        <>
            <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-4">
                <h2 className="text-2xl font-bold tracking-widest">
                    NEW ROOM
                </h2>
                <div className="flex items-center gap-2">
                    <div className="border border-rave-red bg-rave-red/10 px-3 py-2 text-xs tracking-[0.18em]">
                        MAX PLAYERS: 4
                    </div>
                </div>
            </header>
            {/* TODO: Handle error */}
            {error && (
                <div className="text-rave-red text-sm border border-rave-red bg-rave-red/10 px-3 py-2  tracking-[0.18em] mb-4">
                    {"Unable to create room"}
                </div>
            )}
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
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