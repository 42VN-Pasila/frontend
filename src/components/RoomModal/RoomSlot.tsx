import { directorApi } from "@/shared/api/directorApi";
import { Button } from "@/shared/components";
import { useGameSessionStore } from "@/shared/stores/useGameSessionStore";
import { useUserStore } from "@/shared/stores/useUserStore";

type SlotStatus = "HOST" | "JOINED" | "EMPTY";
type Slot = {
    id: string;
    label: string;
    status: SlotStatus;
}

export const RoomSlot = () => {
    const roomId = useGameSessionStore((state) => state.roomId);
    const userId = useUserStore((state) => state.userId);
    const opponents = useGameSessionStore((state) => state.opponents);
    const username = useUserStore((state) => state.username);
    const currentPlayerName = username || "You";
    const isHost = userId === opponents[0].id;

    const [connectRoom, { isLoading }] = directorApi.useConnectRoomMutation();

    const handleConnectRoom = async () => {
        if (!userId || !roomId) return;
        const result = await connectRoom({ roomId, userId });
        if ("error" in result) {
            return;
        }
    };

    const occupiedSlots: Slot[] = [
        { id: userId, label: currentPlayerName, status: "HOST" as const },
        ...opponents.slice(0, 3).map((opponent) => ({
            id: opponent.id,
            label: opponent.username,
            status: "JOINED" as const,
        })),
    ];

    const slots: Slot[] = [...occupiedSlots];
    while (slots.length < 4) {
        slots.push({
            id: `empty-${slots.length + 1}`,
            label: "OPEN SLOT",
            status: "EMPTY" as const,
        });
    }

    return (
        <>
            <header className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-extrabold tracking-widest">ROOM</h2>
                    <p className="text-xs tracking-[0.18em] text-rave-white/60">{roomId}</p>
                </div>

                <div className="flex items-stretch gap-2">
                    <div className="inline-flex h-10 items-center border border-rave-red bg-rave-red/10 px-3 text-xs font-semibold tracking-[0.18em] text-rave-white">
                        MAX PLAYERS: 4
                    </div>
                    <Button
                        variant="inverse"
                        emphasis="low"
                        size="small"
                        className="h-10! sm:h-10!"
                        onClick={handleConnectRoom}
                        disabled={isLoading}
                    >
                        EXIT
                    </Button>
                    <Button
                        variant="primary"
                        emphasis="high"
                        size="small"
                        className="h-10! sm:h-10!"
                        onClick={handleConnectRoom}
                        disabled={isLoading}
                    >
                        {isHost ? "READY" : "START"}
                    </Button>
                </div>
            </header >

            {/* Horizontal slots */}
            < div className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" >
                {
                    slots.map((slot) => {
                        const isHost = slot.status === "HOST";
                        const isJoined = slot.status === "JOINED";

                        return (
                            <article
                                key={slot.id}
                                className={[
                                    "group relative min-w-[180px] flex-1",
                                    "rounded-lg border-2 px-4 py-4",
                                    "transition-all duration-300",
                                    "hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-22px_rgba(0,0,0,0.75)]",
                                    isHost
                                        ? "border-rave-red bg-rave-red/10"
                                        : isJoined
                                            ? "border-rave-white/20 bg-rave-white/10 hover:border-rave-red/60"
                                            : "border-rave-white/15 bg-rave-white/5 hover:border-rave-white/25",
                                ].join(" ")}
                            >


                                <div className="relative flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <p className="text-[10px] font-semibold tracking-[0.2em] text-rave-white/60">
                                            {slot.status}
                                        </p>
                                        <p className="mt-2 truncate text-sm font-semibold tracking-wide text-rave-white">
                                            {slot.label}
                                        </p>
                                    </div>
                                </div>

                                {/* status dot */}
                                <div className="relative mt-4 flex items-center gap-2 text-xs tracking-[0.18em] text-rave-white/60">
                                    <span
                                        className={[
                                            "h-2 w-2 rounded-full",
                                            isHost
                                                ? "bg-rave-red"
                                                : isJoined
                                                    ? "bg-rave-white/70"
                                                    : "bg-rave-white/25",
                                        ].join(" ")}
                                    />
                                    <span>
                                        {isHost ? "YOU ARE HOST" : isJoined ? "READY" : "WAITING…"}
                                    </span>
                                </div>

                            </article>
                        );
                    })
                }
            </div >
        </>
    );
};