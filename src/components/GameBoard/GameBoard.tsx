import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  disconnectSocket,
  socketAskCardMatch,
  socketExitMatch,
} from "@/shared/api/directorClient";
import { useGameSessionStore } from "@/shared/stores/useGameSessionStore";
import { useRoomStore } from "@/shared/stores/useRoomStore";
import { useUserStore } from "@/shared/stores/useUserStore";

import BookDisplayModal from "./BookDisplayModal/BookDisplayModal";
import CardSelectionPanel from "./CardSelectionPanel/CardSelectionPanel";
import type { SelectedCard } from "./CardSelectionPanel/CardSelector";
import { GameControlPanel } from "./GameControlPanel/GameControlPanel";
import GameOpponentPicker from "./GameOpponentPicker/GameOpponentPicker";
import GamePlayerCard from "./GamePlayerCard/GamePlayerCard";
import { GameResultModal } from "./GameResultModal/GameResultModal";
import { useAbandonmentGuard } from "./hooks/useAbandonmentGuard";
import { useMatchConnection } from "./hooks/useMatchConnection";
import type { Card, CardRank, CardSuit } from "./types";

export type GameRequestPayload = {
  userId: string;
  opponentId: string;
  suit: CardSuit;
  rank: CardRank;
};

export const GameBoard = () => {
  const navigate = useNavigate();
  const { userId } = useUserStore();
  const { hands, seats, resetGameSession } = useGameSessionStore();
  const { resetRoom } = useRoomStore();
  const matchId = useParams<{ matchId: string }>().matchId ?? "";

  const [isExitingGame, setIsExitingGame] = useState(false);
  const [selectedOpponentId, setSelectedOpponentId] = useState<string | null>(null);
  const [selection, setSelection] = useState<SelectedCard>({ suit: null, rank: null });

  const { matchResult, isMatchOver, errorMessage, setErrorMessage, resetTurn } =
    useMatchConnection(matchId, userId);

  useAbandonmentGuard(matchId, userId, isExitingGame, setErrorMessage);

  useEffect(() => {
    if (isMatchOver && !matchResult) {
      resetGameSession();
      navigate("/dashboard");
    }
  }, [isMatchOver, matchResult, resetGameSession, navigate]);

  const isMyTurn = seats.find((s) => s.userId === userId)?.isTurn ?? false;
  const isInteractionDisabled = !isMyTurn || isExitingGame;
  const isSelectionComplete = !!(selection.suit && selection.rank && selectedOpponentId);
  const currentUserCards: Card[] = hands.find((h) => h.userId === userId)?.cards ?? [];

  const handleUpdate = useCallback((updates: Partial<SelectedCard>) => {
    setSelection((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleRequest = useCallback(async () => {
    if (!isSelectionComplete || !userId || !selectedOpponentId || !matchId || isExitingGame) return;

    try {
      await socketAskCardMatch({
        matchId,
        userId,
        opponentId: selectedOpponentId,
        card: { suit: selection.suit!, rank: selection.rank! },
      });
      setErrorMessage(null);
      setSelection({ suit: null, rank: null });
      setSelectedOpponentId(null);
    } catch {
      setErrorMessage("Failed to send request");
    }
  }, [isSelectionComplete, userId, selectedOpponentId, matchId, isExitingGame, selection, setErrorMessage]);

  const handleExitGame = useCallback(() => {
    if (!matchId || !userId || isExitingGame) return;

    setIsExitingGame(true);
    void socketExitMatch({ matchId, userId })
      .catch(() => undefined)
      .finally(() => {
        resetGameSession();
        resetRoom();
        disconnectSocket();
        navigate("/dashboard");
      });
  }, [isExitingGame, matchId, navigate, resetGameSession, resetRoom, userId]);

  const handleResultClose = useCallback(() => {
    resetGameSession();
    navigate("/dashboard");
  }, [navigate, resetGameSession]);

  if (!matchId) {
    return <div>Match not found</div>;
  }

  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-rave-black">
      {errorMessage && (
        <div className="absolute left-1/2 top-4 z-20 -translate-x-1/2 rounded-md border border-red-400/40 bg-red-900/60 px-4 py-2 text-sm text-red-100">
          {errorMessage}
        </div>
      )}

      <CardSelectionPanel
        selection={selection}
        onChange={handleUpdate}
        onSubmit={handleRequest}
        isSelectionComplete={isSelectionComplete}
        disabled={isInteractionDisabled}
      />

      <main className="flex-1 min-w-0 h-full flex flex-col p-6">
        <div className="shrink-0">
          <BookDisplayModal />
        </div>
        <div className="flex-1 min-h-0 grid grid-rows-[7fr_3fr]">
          <div className="border-b-2 border-rave-white/10 min-h-0">
            <GameOpponentPicker
              selectedOpponentId={selectedOpponentId}
              onSelectOpponent={setSelectedOpponentId}
              disabled={isInteractionDisabled}
            />
          </div>
          <div className="min-h-0">
            <GamePlayerCard cards={currentUserCards} disabled={isInteractionDisabled} />
          </div>
        </div>
      </main>

      <GameControlPanel onExitGame={handleExitGame} isExiting={isExitingGame} resetTurn={resetTurn} />

      {matchResult && (
        <GameResultModal result={matchResult} onClose={handleResultClose} />
      )}
    </div>
  );
};

export default GameBoard;
