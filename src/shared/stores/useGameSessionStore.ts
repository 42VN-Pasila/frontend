import type { Opponent } from "@/components/GameBoard/types"
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type GameSessionState = {
    roomId: string;
    matchId: string;
    opponentIds: string[];
    opponents: Opponent[];
    turnOrder: string[];
    setOpponentIds: (opponentIds: string[]) => void;
    setRoomId: (roomId: string) => void;
    setMatchId: (matchId: string) => void;
    setOpponents: (opponents: Opponent[]) => void;
    setTurnOrder: (turnOrder: string[]) => void;
    resetGameSession: () => void;
};

export const useGameSessionStore = create<GameSessionState>()(
    persist(
        (set) => ({
            roomId: "",
            matchId: "",
            opponentIds: [],
            opponents: [],
            turnOrder: [],
            setOpponentIds: (opponentIds: string[]) => set({ opponentIds }),
            setRoomId: (roomId: string) => set({ roomId }),
            setMatchId: (matchId: string) => set({ matchId }),
            setTurnOrder: (turnOrder: string[]) => set({ turnOrder }),
            setOpponents: (opponents: Opponent[]) => set({ opponents }),
            resetGameSession: () => set({
                roomId: "",
                matchId: "",
                opponentIds: [],
                turnOrder: []
            }),
        }),
        {
            name: "game-session",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                opponentIds: state.opponentIds,
                roomId: state.roomId,
                matchId: state.matchId,
                turnOrder: state.turnOrder,
                opponents: state.opponents,
            }),
        },
    ),
);
