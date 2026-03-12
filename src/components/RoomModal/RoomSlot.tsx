import { useState } from "react";

import { Button } from "@/shared/components";
import Avatar from "@/shared/components/Avatar";
import { useRoomStore } from "@/shared/stores/useRoomStore";
import { useUserStore } from "@/shared/stores/useUserStore";

type SlotStatus = "HOST" | "JOINED" | "EMPTY";
type Slot = {
    id: string;
    username: string;
    status: SlotStatus;
    avatarUrl?: string;
}

export const RoomSlot = () => {
    const { id: roomId, ownerId, users } = useRoomStore();
    const { userId, username, avatarUrl } = useUserStore();
    const [isReady, setIsReady] = useState(false);


    const currentUserName = username || "You";
    const isHost = userId === ownerId;


    const handleStartMatch = async () => {
        if (!userId || !roomId) return;

        if (!isHost) {
            const nextReady = !isReady;
            setIsReady(nextReady);
            console.log(nextReady ? "User is READY" : "User is UNREADY");
            return;
        }

        console.log("Host clicked START");
    };

    const handleExitRoom = async () => {
        if (!userId || !roomId) return;
        console.log("Exiting room");
    };

    const hostUser = users.find((user) => user.id === ownerId);
    const joinedUsers = users.filter((user) => user.id !== ownerId);

    const occupiedSlots: Slot[] = [
        {
            id: hostUser?.id ?? `host-${ownerId || "unknown"}`,
            username: hostUser?.id === userId ? currentUserName : "HOST",
            status: "HOST" as const,
            avatarUrl: hostUser?.id === userId ? avatarUrl : hostUser?.avatarUrl,
        },
        ...joinedUsers.map((user, index) => ({
            id: user.id,
            username: user.id === userId ? currentUserName : `Opponent ${index + 1}`,
            status: "JOINED" as const,
            avatarUrl: user.id === userId ? avatarUrl : user.avatarUrl,
        })),
    ];

    console.log(occupiedSlots);

    const slots: Slot[] = [...occupiedSlots];
    while (slots.length < 4) {
        slots.push({
            id: `empty-${slots.length + 1}`,
            username: "OPEN SLOT",
            status: "EMPTY" as const,
            avatarUrl: undefined,
        });
    }

    const actionButtonLabel = isHost
        ? "START"
        : isReady
            ? "WAITING..."
            : "READY";

    const isActionButtonDisabled = !userId || !roomId;

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
                        onClick={handleExitRoom}
                    >
                        EXIT
                    </Button>
                    <Button
                        variant="primary"
                        emphasis="high"
                        size="small"
                        className="h-10! sm:h-10!"
                        onClick={handleStartMatch}
                        disabled={isActionButtonDisabled}
                    >
                        {actionButtonLabel}
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
                                    <div className="min-w-0 flex flex-col gap-2">
                                        <p className="text-[10px] font-semibold tracking-[0.2em] text-rave-white/60">
                                            {slot.status}
                                        </p>
                                        <Avatar src={slot.avatarUrl} alt={slot.username} className="h-10 w-10" />
                                        <p className="mt-2 truncate text-sm font-semibold tracking-wide text-rave-white">
                                            {slot.username}
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
                                                    ? slot.id === userId && isReady
                                                        ? "bg-emerald-400"
                                                        : "bg-rave-white/70"
                                                    : "bg-rave-white/25",
                                        ].join(" ")}
                                    />
                                    <span>
                                        {isHost
                                            ? slot.id === userId
                                                ? "YOU ARE HOST"
                                                : "HOST"
                                            : isJoined
                                                ? slot.id === userId && !isHost
                                                    ? isReady
                                                        ? "READY"
                                                        : "NOT READY"
                                                    : "NOT READY"
                                                : "WAITING…"}
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