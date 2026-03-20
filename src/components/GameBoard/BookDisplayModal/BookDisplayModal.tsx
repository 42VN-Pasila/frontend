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
    const { userId } = useUserStore();
    const { books } = useGameSessionStore();

    const collectedRanks = useMemo(() => {
        const ranks = new Set<string>();

        books.forEach((book) => {
            if (book.userId !== userId) return;
            const rank = book.cards[0]?.rank;
            if (rank) {
                ranks.add(rank);
            }
        });

        return ranks;
    }, [books, userId]);

    return (
        <section className="h-fit w-full">
            <div className="flex justify-center items-center gap-1.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {RANK_ORDER.map((rank) => {
                    const isCollected = collectedRanks.has(rank);
                    return (
                        <div
                            key={rank}
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-[10px] font-black leading-none tracking-wide transition-colors ${isCollected
                                ? "border-rave-red bg-rave-red/15 text-rave-red"
                                : "border-rave-white/15 bg-rave-white/5 text-rave-white/50"
                                }`}
                            title={rank}
                        >
                            {RANK_LABEL[rank]}
                        </div>
                    );
                })}
            </div>
        </section >
    );
};

export default BookDisplayModal;
