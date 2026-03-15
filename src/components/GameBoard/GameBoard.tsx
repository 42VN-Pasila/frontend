import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import {
  connectSocket,
  disconnectSocket,
  onMatchState,
  onSocketConnect,
  onSocketDisconnect,
  onSocketMatchMetadata,
  socketAskCardMatch,
  socketJoinMatch,
  socketLeaveMatch,
} from "@/shared/api/directorClient";
import { useGameSessionStore } from "@/shared/stores/useGameSessionStore";
import { useUserStore } from "@/shared/stores/useUserStore";

import CardSelectionPanel from "./CardSelectionPanel/CardSelectionPanel";
import type { SelectedCard } from "./CardSelectionPanel/CardSelector";
import { GameControlPanel } from "./GameControlPanel/GameControlPanel";
import GameOpponentPicker from "./GameOpponentPicker/GameOpponentPicker";
import GamePlayerCard from "./GamePlayerCard/GamePlayerCard";
import type { Card, CardRank, CardSuit } from "./types";
import type { MatchDto, MatchMetaDataDto } from "@/gen/director";

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
    setTurnOrder,
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

    const applyMatchState = (match: MatchDto) => {
      const orderedIds = match.userHandCounts.map((item) => item.userId);
      const filteredTurnOrder = orderedIds.length > 0 ? orderedIds : [userId];
      const opponentIds = filteredTurnOrder.filter((id) => id !== userId);

      setHands(match.hands);
      setBooks(match.books);
      setRoomId(match.roomId);
      setTurnOrder(filteredTurnOrder);
      setOpponentIds(opponentIds);
      const latestOpponents = useGameSessionStore.getState().opponents;
      setOpponents(
        opponentIds.map((id) => {
          const existing = latestOpponents.find((opponent) => opponent.id === id);
          return {
            id,
            username: existing?.username ?? id,
            avatarUrl: existing?.avatarUrl ?? "",
            cardCount:
              match.userHandCounts.find((count) => count.userId === id)?.handCount ?? 0,
          };
        }),
      );
    };

    const applyMatchMetadata = (
      metadata: MatchMetaDataDto,
      handCounts?: MatchDto["userHandCounts"],
    ) => {
      setOpponentIds(metadata.users.map((user) => user.id));
      setOpponents(
        metadata.users.map((user) => ({
          id: user.id,
          username: user.id,
          avatarUrl: user.avatarUrl ?? "",
          cardCount:
            handCounts?.find((count) => count.userId === user.id)?.handCount ?? 0,
        })),
      );
    };

    const joinAndSync = async () => {
      try {
        const { match, metadata } = await socketJoinMatch({ matchId, userId });
        applyMatchState(match);
        applyMatchMetadata(metadata, match.userHandCounts);
        setErrorMessage(null);
      } catch {
        setErrorMessage("Unable to join match");
      }
    };

    connectSocket();
    joinAndSync();

    const unsubscribeMatchState = onMatchState((match) => {
      applyMatchState(match);
    });

    const unsubscribeSocketConnect = onSocketConnect(() => {
      void joinAndSync();
    });

    const unsubscribeSocketDisconnect = onSocketDisconnect((reason) => {
      setErrorMessage(`Socket disconnected: ${reason}`);
    });
    const unsubscribeSocketMatchMetadata = onSocketMatchMetadata((metadata) => {
      applyMatchMetadata(metadata);
    });

    return () => {
      unsubscribeMatchState();
      unsubscribeSocketConnect();
      unsubscribeSocketDisconnect();
      unsubscribeSocketMatchMetadata();
      void socketLeaveMatch({ matchId, userId }).catch(() => undefined);
      disconnectSocket();
    };
  }, [
    matchId,
    userId,
    setMatchId,
    setRoomId,
    setOpponentIds,
    setOpponents,
    setTurnOrder,
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

  // TODO: remove this once we have a proper authentication system
  const disabled = true;

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
        disabled={!disabled}
      />

      <main className="flex-1 min-w-0 h-full flex flex-col">
        <div className="flex-1 min-h-0 grid grid-rows-[7fr_3fr]">
          <div className="border-b-2 border-rave-white/10  h-full">
            <GameOpponentPicker
              selectedOpponentId={selectedOpponentId}
              onSelectOpponent={setSelectedOpponentId}
              disabled={!disabled}
            />
          </div>
          <div className="min-h-0">
            <GamePlayerCard cards={currentUserCards} disabled={disabled} />
          </div>
        </div>
      </main>

      <GameControlPanel />
    </div>
  );
};

export default GameBoard;
