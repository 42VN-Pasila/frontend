import type { Opponent } from "@/pages/Game/common/types/players";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type GameSessionState = {
    roomId: string;
    matchId: string;
    playerId: string;
    opponentIds: string[];
    opponents: Opponent[];
    turnOrder: string[];
    setPlayerId: (playerId: string) => void;
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
            playerId: "",
            opponentIds: [],
            opponents: [],
            turnOrder: [],
            setPlayerId: (playerId: string) => set({ playerId }),
            setOpponentIds: (opponentIds: string[]) => set({ opponentIds }),
            setRoomId: (roomId: string) => set({ roomId }),
            setMatchId: (matchId: string) => set({ matchId }),
            setTurnOrder: (turnOrder: string[]) => set({ turnOrder }),
            setOpponents: (opponents: Opponent[]) => set({ opponents }),
            resetGameSession: () => set({
                roomId: "",
                matchId: "",
                playerId: "",
                opponentIds: [],
                turnOrder: []
            }),
        }),
        {
            name: "game-session",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                playerId: state.playerId,
                opponentIds: state.opponentIds,
                roomId: state.roomId,
                matchId: state.matchId,
                turnOrder: state.turnOrder,
                opponents: state.opponents,
            }),
        },
    ),
);
