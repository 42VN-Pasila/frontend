import type { Opponent } from "@/components/GameBoard/types";
import type { BookDto, HandDto, MatchDto, SeatDto } from "@/gen/director";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type GameSessionState = {
    matchId: string;
    opponentIds: string[];
    opponents: Opponent[];
    seats: SeatDto[];
    hands: HandDto[];
    books: BookDto[];
    syncMatchState: (match: MatchDto, userId: string) => void;
    resetGameSession: () => void;
};

const initialState = {
    matchId: "",
    opponentIds: [],
    opponents: [],
    seats: [],
    hands: [],
    books: [],
};

export const useGameSessionStore = create<GameSessionState>()(
    persist(
        (set, _get, store) => ({
            ...initialState,
            syncMatchState: (match: MatchDto, userId: string) =>
                set({
                    matchId: match.id,
                    hands: match.hands,
                    books: match.books,
                    opponentIds: match.users.filter((u) => u.id !== userId).map((u) => u.id),
                    seats: match.seats,
                    opponents: match.users.map((u) => ({
                        id: u.id,
                        username: u.id,
                        avatarUrl: u.avatarUrl ?? "",
                        cardCount:
                            match.userHandCounts.find((hc) => hc.userId === u.id)?.handCount ?? 0,
                    })),
                }),
            resetGameSession: () => set(store.getInitialState()),
        }),
        {
            name: "game-session",
            storage: createJSONStorage(() => sessionStorage),
            partialize: (state) => ({
                opponentIds: state.opponentIds,
                matchId: state.matchId,
                seats: state.seats,
                opponents: state.opponents,
                hands: state.hands,
                books: state.books,
            }),
        },
    ),
);