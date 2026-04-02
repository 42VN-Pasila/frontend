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
    syncMatchState: (match: MatchDto, username: string) => void;
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
            syncMatchState: (match: MatchDto, username: string) =>
                set({
                    matchId: match.id,
                    hands: match.hands,
                    books: match.books,
                    opponentIds: match.users.filter((u) => u.username !== username).map((u) => u.username),
                    seats: match.seats,
                    opponents: match.users.filter((u) => u.username !== username).map((u) => ({
                        id: u.username,
                        username: u.username,
                        avatarUrl: u.avatarUrl ?? "",
                        cardCount:
                            match.userHandCounts.find((hc) => hc.username === u.username)?.handCount ?? 0,
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