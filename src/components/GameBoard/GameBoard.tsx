import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import {
  connectSocket,
  disconnectSocket,
  onMatchState,
  onSocketConnect,
  onSocketDisconnect,
  socket,
  socketAskCardMatch,
  socketJoinMatch,
} from "@/shared/api/directorClient";
import { useGameSessionStore } from "@/shared/stores/useGameSessionStore";
import { useUserStore } from "@/shared/stores/useUserStore";

import CardSelectionPanel from "./CardSelectionPanel/CardSelectionPanel";
import type { SelectedCard } from "./CardSelectionPanel/CardSelector";
import { GameControlPanel } from "./GameControlPanel/GameControlPanel";
import GameOpponentPicker from "./GameOpponentPicker/GameOpponentPicker";
import GamePlayerCard from "./GamePlayerCard/GamePlayerCard";
import type { Card, CardRank, CardSuit } from "./types";
import type { MatchDto } from "@/gen/director";

export type GameRequestPayload = {
  userId: string;
  opponentId: string;
  suit: CardSuit;
  rank: CardRank;
};

export const GameBoard = () => {
  const userId = useUserStore().userId;
  const {
    hands,
    setMatchId,
    setRoomId,
    setOpponentIds,
    setOpponents,
    setSeats,
    setHands,
    setBooks,
  } = useGameSessionStore();
  const { matchId: matchIdParam } = useParams<{ matchId: string }>();
  const matchId = matchIdParam ?? "";
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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


  useEffect(() => {
    if (!matchId || !userId) return;

    setMatchId(matchId);
    setErrorMessage(null);
    let isEffectActive = true;

    const applyMatchState = (match: MatchDto) => {
      if (!isEffectActive) return;
      setRoomId(match.roomId);
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
    };


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

    const unsubscribeSocketDisconnect = onSocketDisconnect((reason) => {
      setErrorMessage(`Socket disconnected: ${reason}`);
    });

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
    setRoomId,
    setOpponentIds,
    setOpponents,
    setSeats,
    setHands,
    setBooks,
  ]);

  const handleRequest = async () => {
    if (!isSelectionComplete || !userId || !selectedOpponentId || !matchId) return;

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
      setSelection({ suit: null, rank: null }); // UI reset
      setSelectedOpponentId(null);
    } catch {
      setErrorMessage("Failed to send request");
    }
  };

  const isMyTurn = useGameSessionStore().seats.find((seat) => seat.userId === userId)?.isActive ?? false;

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
        disabled={!isMyTurn}
      />

      <main className="flex-1 min-w-0 h-full flex flex-col">
        <div className="flex-1 min-h-0 grid grid-rows-[7fr_3fr]">
          <div className="border-b-2 border-rave-white/10  h-full">
            <GameOpponentPicker
              selectedOpponentId={selectedOpponentId}
              onSelectOpponent={setSelectedOpponentId}
              disabled={!isMyTurn}
            />
          </div>
          <div className="min-h-0">
            <GamePlayerCard cards={currentUserCards} disabled={!isMyTurn} />
          </div>
        </div>
      </main>

      <GameControlPanel />
    </div>
  );
};

export default GameBoard;
