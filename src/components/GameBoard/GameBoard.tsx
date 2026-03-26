import { useCallback, useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import {
  connectSocket,
  disconnectSocket,
  onMatchState,
  onSocketConnect,
  onSocketDisconnect,
  socket,
  socketAskCardMatch,
  socketExitMatch,
  socketJoinMatch,
  socketLeaveMatch,
} from "@/shared/api/directorClient";
import { useGameSessionStore } from "@/shared/stores/useGameSessionStore";
import { useRoomStore } from "@/shared/stores/useRoomStore";
import { useUserStore } from "@/shared/stores/useUserStore";

import CardSelectionPanel from "./CardSelectionPanel/CardSelectionPanel";
import type { SelectedCard } from "./CardSelectionPanel/CardSelector";
import { GameControlPanel } from "./GameControlPanel/GameControlPanel";
import GameOpponentPicker from "./GameOpponentPicker/GameOpponentPicker";
import GamePlayerCard from "./GamePlayerCard/GamePlayerCard";
import type { Card, CardRank, CardSuit } from "./types";
import type { MatchDto } from "@/gen/director";
import BookDisplayModal from "./BookDisplayModal/BookDisplayModal";

export type GameRequestPayload = {
  userId: string;
  opponentId: string;
  suit: CardSuit;
  rank: CardRank;
};

const HIDDEN_TAB_LEAVE_DELAY_MS = 30_000;

export const GameBoard = () => {
  const navigate = useNavigate();
  const userId = useUserStore().userId;
  const {
    hands,
    seats,
    setMatchId,
    setOpponentIds,
    setOpponents,
    setSeats,
    setHands,
    setBooks,
    resetGameSession,
  } = useGameSessionStore();
  const { resetRoom } = useRoomStore();
  const { matchId: matchIdParam } = useParams<{ matchId: string }>();
  const matchId = matchIdParam ?? "";
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isExitingGame, setIsExitingGame] = useState(false);

  const [selectedOpponentId, setSelectedOpponentId] = useState<string | null>(
    null,
  );

  const [selection, setSelection] = useState<SelectedCard>({
    suit: null,
    rank: null,
  });

  const isSelectionComplete: boolean = !!(
    selection.suit &&
    selection.rank &&
    selectedOpponentId
  );
  const currentUserHand = hands.find((hand) => hand.userId === userId);
  const currentUserCards: Card[] = Array.isArray(currentUserHand?.cards)
    ? currentUserHand.cards
    : [];

  const handleUpdate = (updates: Partial<SelectedCard>) => {
    setSelection((prev) => ({ ...prev, ...updates }));
  };

  const applyMatchState = useCallback((match: MatchDto) => {
    if (match.status === "COMPLETED") {
      resetGameSession();
      resetRoom();
      disconnectSocket();
      navigate("/dashboard");
      return;
    }

    setMatchId(match.id);
    setHands(match.hands);
    setBooks(match.books);
    setOpponentIds(match.users.filter((user) => user.id !== userId).map((user) => user.id));
    setSeats(match.seats);
    setOpponents(match.users.map((user) => ({
      id: user.id,
      username: user.id,
      avatarUrl: user.avatarUrl ?? "",
      cardCount: match.userHandCounts.find((handCount) => handCount.userId === user.id)?.handCount ?? 0,
    })));
  }, [
    navigate,
    resetGameSession,
    resetRoom,
    setMatchId,
    setHands,
    setBooks,
    setOpponentIds,
    setSeats,
    setOpponents,
    userId,
  ]);

  useEffect(() => {
    if (!matchId || !userId) return;

    setMatchId(matchId);
    setErrorMessage(null);
    let isEffectActive = true;
    const joinAndSync = async () => {
      try {
        const { match } = await socketJoinMatch({ matchId, userId });
        if (!isEffectActive) return;
        applyMatchState(match);
        setErrorMessage(null);
      } catch {
        if (!isEffectActive) return;
        setErrorMessage("Unable to join match");
      }
    };

    connectSocket();
    if (socket.connected) {
      void joinAndSync();
    }

    const unsubscribeMatchState = onMatchState((match) => {
      applyMatchState(match);
    });

    const unsubscribeSocketConnect = onSocketConnect(() => {
      void joinAndSync();
    });

    const unsubscribeSocketDisconnect = onSocketDisconnect(() => undefined);

    return () => {
      isEffectActive = false;
      unsubscribeMatchState();
      unsubscribeSocketConnect();
      unsubscribeSocketDisconnect();
      disconnectSocket();
    };
  }, [
    matchId,
    userId,
    setMatchId,
    applyMatchState,
  ]);

  useEffect(() => {
    if (!matchId || !userId) return;

    let hiddenLeaveTimeoutId: number | null = null;
    let hasLeftMatch = false;

    const clearHiddenLeaveTimeout = () => {
      if (hiddenLeaveTimeoutId === null) return;
      window.clearTimeout(hiddenLeaveTimeoutId);
      hiddenLeaveTimeoutId = null;
    };

    const leaveMatchForAbandonment = async () => {
      if (hasLeftMatch) return;
      hasLeftMatch = true;
      clearHiddenLeaveTimeout();

      try {
        await socketLeaveMatch({ matchId, userId });
      } finally {
        disconnectSocket();
      }
    };

    const rejoinAfterTemporaryLeave = async () => {
      if (!hasLeftMatch || isExitingGame) return;

      try {
        connectSocket();
        const { match } = await socketJoinMatch({ matchId, userId });
        applyMatchState(match);
        hasLeftMatch = false;
        setErrorMessage(null);
      } catch {
        setErrorMessage("Unable to join match");
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        clearHiddenLeaveTimeout();
        void rejoinAfterTemporaryLeave();
        return;
      }

      clearHiddenLeaveTimeout();
      hiddenLeaveTimeoutId = window.setTimeout(() => {
        void leaveMatchForAbandonment();
      }, HIDDEN_TAB_LEAVE_DELAY_MS);
    };

    const handlePageHide = () => {
      void leaveMatchForAbandonment();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      clearHiddenLeaveTimeout();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
    };
  }, [
    applyMatchState,
    isExitingGame,
    matchId,
    userId,
  ]);
  const isMyTurn = seats.find((seat) => seat.userId === userId)?.isTurn ?? false;
  const isInteractionDisabled = !isMyTurn || isExitingGame;


  const handleRequest = async () => {
    if (!isSelectionComplete || !userId || !selectedOpponentId || !matchId || isExitingGame) return;

    const payload: GameRequestPayload = {
      userId: userId,
      opponentId: selectedOpponentId,
      suit: selection.suit!,
      rank: selection.rank!,
    };
    try {
      await socketAskCardMatch({
        matchId,
        userId: payload.userId,
        opponentId: payload.opponentId,
        card: {
          suit: payload.suit,
          rank: payload.rank,
        },
      });
      setErrorMessage(null);
      setSelection({ suit: null, rank: null });
      setSelectedOpponentId(null);
    } catch {
      setErrorMessage("Failed to send request");
    }
  };

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

  if (!matchId) {
    return <div>Match not found</div>;
  }

  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-rave-black">
      {errorMessage ? (
        <div className="absolute left-1/2 top-4 z-20 -translate-x-1/2 rounded-md border border-red-400/40 bg-red-900/60 px-4 py-2 text-sm text-red-100">
          {errorMessage}
        </div>
      ) : null}
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

      <GameControlPanel onExitGame={handleExitGame} isExiting={isExitingGame} />
    </div>
  );
};

export default GameBoard;
