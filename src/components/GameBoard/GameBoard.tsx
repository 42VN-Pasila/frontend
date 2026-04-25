import { useCallback, useEffect, useRef, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import {
  disconnectSocket,
  socketAskCardMatch,
  socketExitMatch,
} from "@/shared/api/directorClient";
import { useGetUserByUsernameQuery } from "@/shared/api/directorApi";
import { queryClient } from "@/shared/api/queryClient";
import { useAppLogout } from "@/shared/auth/useAppLogout";
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
  username: string;
  opponentUsernames: string;
  suit: CardSuit;
  rank: CardRank;
};

export const GameBoard = () => {
  const navigate = useNavigate();
  const { logoutAndRedirect } = useAppLogout();
  const { username } = useUserStore();
  const { hands, seats, resetGameSession } = useGameSessionStore();
  const { id: roomId, resetRoom } = useRoomStore();
  const matchId = useParams<{ matchId: string }>().matchId ?? "";
  const currentUsername = username.trim();
  const { data: currentUser } = useGetUserByUsernameQuery(currentUsername, {
    enabled: Boolean(currentUsername),
    refetchInterval: 2000,
    refetchOnWindowFocus: true,
  });
  const previousStatusRef = useRef<string | undefined>(undefined);

  const [isExitingGame, setIsExitingGame] = useState(false);
  const [selectedOpponentUsername, setSelectedOpponentUsername] = useState<
    string | null
  >(null);
  const [selection, setSelection] = useState<SelectedCard>({
    suit: null,
    rank: null,
  });

  const { matchResult, errorMessage, isMatchOver, setErrorMessage, resetTurn } =
    useMatchConnection(matchId, currentUsername);

  useAbandonmentGuard(
    matchId,
    currentUsername,
    isExitingGame,
    isMatchOver,
    setErrorMessage,
  );

  const navigateToDashboard = useCallback(async () => {
    if (roomId) {
      queryClient.removeQueries({ queryKey: ["roomMetadata", roomId] });
      await queryClient.invalidateQueries({ queryKey: ["rooms", roomId] });
    }

    navigate("/dashboard", { replace: true });
  }, [navigate, roomId]);

  useEffect(() => {
    if (!isMatchOver || matchResult) return;
    void navigateToDashboard();
  }, [isMatchOver, matchResult, navigateToDashboard]);

  useEffect(() => {
    const currentStatus = currentUser?.status;
    if (!currentStatus) {
      return;
    }

    const previousStatus = previousStatusRef.current;
    if (previousStatus && previousStatus !== "Offline" && currentStatus === "Offline") {
      void logoutAndRedirect();
    }

    previousStatusRef.current = currentStatus;
  }, [currentUser?.status, logoutAndRedirect]);

  const isMyTurn =
    seats.find((s) => s.username === currentUsername)?.isTurn ?? false;
  const isInteractionDisabled = !isMyTurn || isExitingGame;
  const isSelectionComplete = !!(
    selection.suit &&
    selection.rank &&
    selectedOpponentUsername
  );
  const currentUserCards: Card[] =
    hands.find((h) => h.username === currentUsername)?.cards ?? [];

  const handleUpdate = useCallback((updates: Partial<SelectedCard>) => {
    setSelection((prev) => ({ ...prev, ...updates }));
  }, []);

  const handleRequest = useCallback(async () => {
    if (
      !isSelectionComplete ||
      !currentUsername ||
      !selectedOpponentUsername ||
      !matchId ||
      isExitingGame
    )
      return;

    try {
      await socketAskCardMatch({
        matchId,
        username: currentUsername,
        opponentUsername: selectedOpponentUsername,
        card: { suit: selection.suit!, rank: selection.rank! },
      });
      setErrorMessage(null);
      setSelection({ suit: null, rank: null });
      setSelectedOpponentUsername(null);
    } catch {
      setErrorMessage("Failed to send request");
    }
  }, [
    isSelectionComplete,
    currentUsername,
    selectedOpponentUsername,
    matchId,
    isExitingGame,
    selection,
    setErrorMessage,
  ]);

  const handleExitGame = useCallback(() => {
    if (!matchId || !currentUsername || isExitingGame) return;

    setIsExitingGame(true);
    void socketExitMatch({ matchId, username: currentUsername })
      .catch(() => undefined)
      .finally(() => {
        resetGameSession();
        resetRoom();
        disconnectSocket();
        navigate("/dashboard");
      });
  }, [
    isExitingGame,
    matchId,
    navigate,
    resetGameSession,
    resetRoom,
    currentUsername,
  ]);

  const handleResultClose = useCallback(() => {
    resetGameSession();
    void navigateToDashboard();
  }, [navigateToDashboard, resetGameSession]);

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
              selectedOpponentUsername={selectedOpponentUsername}
              onSelectOpponent={setSelectedOpponentUsername}
              disabled={isInteractionDisabled}
            />
          </div>
          <div className="min-h-0">
            <GamePlayerCard
              cards={currentUserCards}
              disabled={isInteractionDisabled}
            />
          </div>
        </div>
      </main>

      <GameControlPanel
        onExitGame={handleExitGame}
        isExiting={isExitingGame}
        resetTurn={resetTurn}
      />

      {matchResult && (
        <GameResultModal result={matchResult} onClose={handleResultClose} />
      )}
    </div>
  );
};

export default GameBoard;
