import { useEffect, useRef, useState } from "react";

import { useParams } from "react-router-dom";

import {
  connectSocket,
  disconnectSocket,
  onMatchState,
  onSocketConnect,
  socketAskCardMatch,
  socketJoinMatch,
  socketLeaveMatch,
  socketPingMatch,
} from "@/shared/api/directorClient";
import { useGameSessionStore } from "@/shared/stores/useGameSessionStore";
import { useUserStore } from "@/shared/stores/useUserStore";

import CardSelectionPanel from "./CardSelectionPanel/CardSelectionPanel";
import type { SelectedCard } from "./CardSelectionPanel/CardSelector";
import { GameControlPanel } from "./GameControlPanel/GameControlPanel";
import GameOpponentPicker from "./GameOpponentPicker/GameOpponentPicker";
import GamePlayerCard from "./GamePlayerCard/GamePlayerCard";
import type { CardRank, CardSuit } from "./types";
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
  const pingIntervalRef = useRef<number | null>(null);

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

  const handleUpdate = (updates: Partial<SelectedCard>) => {
    setSelection((prev) => ({ ...prev, ...updates }));
  };

  useEffect(() => {
    if (!matchId || !userId) return;

    setMatchId(matchId);

    const applyMatchState = (match: MatchDto) => {
      const orderedIds = match.userHandCounts.map((item) => item.userId);
      const filteredTurnOrder = orderedIds.length > 0 ? orderedIds : [userId];
      const opponentIds = filteredTurnOrder.filter((id) => id !== userId);

      setHands(match.hands);
      setBooks(match.books);
      setRoomId(match.roomId);
      setTurnOrder(filteredTurnOrder);
      setOpponentIds(opponentIds);
      setOpponents(
        opponentIds.map((id, index) => ({
          id,
          username: `Opponent ${index + 1}`,
          avatarUrl: "",
          cardCount:
            match.userHandCounts.find((count) => count.userId === id)?.handCount ?? 0,
        })),
      );
    };

    const joinAndSync = async () => {
      const match = await socketJoinMatch({ matchId, userId });
      applyMatchState(match);
    };

    connectSocket();
    joinAndSync();

    const unsubscribeMatchState = onMatchState((match) => {
      applyMatchState(match);
    });

    const unsubscribeSocketConnect = onSocketConnect(() => {
      void joinAndSync();
    });

    pingIntervalRef.current = window.setInterval(() => {
      void socketPingMatch({ matchId, userId });
    }, 10_000);

    return () => {
      if (pingIntervalRef.current !== null) {
        window.clearInterval(pingIntervalRef.current);
        pingIntervalRef.current = null;
      }
      unsubscribeMatchState();
      unsubscribeSocketConnect();
      void socketLeaveMatch({ matchId, userId });
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
    await socketAskCardMatch({
      matchId,
      userId: payload.userId,
      opponentId: payload.opponentId,
      card: {
        suit: payload.suit,
        rank: payload.rank,
      },
    });

    setSelection({ suit: null, rank: null }); // UI reset
    setSelectedOpponentId(null);
  };

  // TODO: remove this once we have a proper authentication system
  const disabled = true;

  if (!matchId) {
    return <div>Match not found</div>;
  }

  return (
    <div className="relative flex h-screen w-screen overflow-hidden bg-rave-black">
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
            <GamePlayerCard cards={MOCK_PLAYER_HAND} disabled={disabled} />
          </div>
        </div>
      </main>

      <GameControlPanel />
    </div>
  );
};

export default GameBoard;
