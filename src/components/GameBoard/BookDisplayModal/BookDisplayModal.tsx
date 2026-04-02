import { useMemo } from "react";

import { useGameSessionStore } from "@/shared/stores/useGameSessionStore";
import { useUserStore } from "@/shared/stores/useUserStore";

const RANK_ORDER = [
    "ACE",
    "TWO",
    "THREE",
    "FOUR",
    "FIVE",
    "SIX",
    "SEVEN",
    "EIGHT",
    "NINE",
    "TEN",
    "JACK",
    "QUEEN",
    "KING",
] as const;

const RANK_LABEL: Record<(typeof RANK_ORDER)[number], string> = {
    ACE: "A",
    TWO: "2",
    THREE: "3",
    FOUR: "4",
    FIVE: "5",
    SIX: "6",
    SEVEN: "7",
    EIGHT: "8",
    NINE: "9",
    TEN: "10",
    JACK: "J",
    QUEEN: "Q",
    KING: "K",
};

export const BookDisplayModal = () => {
    const { username } = useUserStore();
    const { books } = useGameSessionStore();
    const currentUsername = username.trim();

    const { userRanks, otherRanks } = useMemo(() => {
        const user = new Set<string>();
        const other = new Set<string>();

        for (const book of books) {
            const rank = book.cards[0]?.rank;
            if (!rank) continue;

            if (book.username === currentUsername) {
                user.add(rank);
            } else {
                other.add(rank);
            }
        }

        return { userRanks: user, otherRanks: other };
    }, [books, currentUsername]);

    return (
        <section className="h-fit w-full">
            <div className="flex justify-center items-center gap-1.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {RANK_ORDER.map((rank) => {
                    const isUser = userRanks.has(rank);
                    const isOther = otherRanks.has(rank);

                    return (
                        <div key={rank} className="relative flex flex-col items-center">
                            <div
                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-[10px] font-black leading-none tracking-wide transition-colors ${
                                    isUser
                                        ? "border-rave-red bg-rave-red/15 text-rave-red"
                                        : isOther
                                            ? "border-rave-white/30 bg-rave-white/10 text-rave-white/70"
                                            : "border-rave-white/15 bg-rave-white/5 text-rave-white/50"
                                }`}
                                title={rank}
                            >
                                {RANK_LABEL[rank]}
                            </div>
                            {isUser && (
                                <div className="mt-1 h-1 w-1 rounded-full bg-rave-red" />
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default BookDisplayModal;
