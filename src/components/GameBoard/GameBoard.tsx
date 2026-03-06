import { useEffect, useState } from "react";
import Ed from "@assets/Ed.png";
import Edd from "@assets/Edd.png";
import Eddy from "@assets/Eddy.png";

import type { SelectedCard } from "./CardSelectionPanel/CardSelector";
import type { CardRank, CardSuit } from "./types";
import type { Card } from "./types";
import { ALL_CARD_RANKS, ALL_CARD_SUITS } from "./types";
import { useGameSessionStore } from "@shared/stores/useGameSessionStore";

import GameOpponentPicker from "./GameOpponentPicker/GameOpponentPicker";
import GamePlayerCard from "./GamePlayerCard/GamePlayerCard";
import { GameControlPanel } from "./GameControlPanel/GameControlPanel";
import CardSelectionPanel from "./CardSelectionPanel/CardSelectionPanel";

const generateMockHand = (): Card[] => {
  const handSize = Math.floor(Math.random() * 20) + 1;

  const deck: Card[] = ALL_CARD_SUITS.flatMap((suit) =>
    ALL_CARD_RANKS.map((rank) => ({ suit, rank })),
  );

  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  return deck.slice(0, handSize);
};

const MOCK_PLAYER_HAND = generateMockHand();

const MOCK_OPPONENTS = [
  { id: "opponent-1", username: "Huong", avatarUrl: Ed, cardCount: 7 },
  { id: "opponent-2", username: "Tan", avatarUrl: Edd, cardCount: 9 },
  { id: "opponent-3", username: "Triet", avatarUrl: Eddy, cardCount: 11 },
];

export type GameRequestPayload = {
  userId: string;
  opponentId: string;
  suit: CardSuit;
  rank: CardRank;
};

export const GameBoard = () => {
  const playerId = useGameSessionStore().playerId;
  const roomId = useGameSessionStore().roomId;
  const opponents = useGameSessionStore().opponents;
  const turnOrder = useGameSessionStore().turnOrder;
  const setPlayerId = useGameSessionStore().setPlayerId;
  const setRoomId = useGameSessionStore().setRoomId;
  const setMatchId = useGameSessionStore().setMatchId;
  const setOpponentIds = useGameSessionStore().setOpponentIds;
  const setOpponents = useGameSessionStore().setOpponents;
  const setTurnOrder = useGameSessionStore().setTurnOrder;

  const [timeLeft, setTimeLeft] = useState(15);

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

  useEffect(() => {
    setTimeLeft(15);
    const intervalId = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      // window.location.reload(); // comment out for testing UI
    }
  }, [timeLeft]);

  useEffect(() => {
    if (!playerId) {
      setPlayerId("player-local");
    }

    if (!roomId) {
      setRoomId("mock-room-001");
      setMatchId("mock-match-001");
    }

    if (opponents.length === 0) {
      setOpponents(MOCK_OPPONENTS);
      setOpponentIds(MOCK_OPPONENTS.map((opponent) => opponent.id));
    }

    if (turnOrder.length === 0) {
      setTurnOrder(["player-local", ...MOCK_OPPONENTS.map((opponent) => opponent.id)]);
    }
  }, [
    playerId,
    roomId,
    opponents.length,
    turnOrder.length,
    setPlayerId,
    setRoomId,
    setMatchId,
    setOpponents,
    setOpponentIds,
    setTurnOrder,
  ]);

  const handleUpdate = (updates: Partial<SelectedCard>) => {
    setSelection((prev) => ({ ...prev, ...updates }));
  };

  const handleRequest = () => {
    if (!isSelectionComplete || !playerId || !selectedOpponentId) return;

    const payload: GameRequestPayload = {
      userId: playerId,
      opponentId: selectedOpponentId,
      suit: selection.suit!,
      rank: selection.rank!,
    };
    console.log("Mock game request payload", payload);

    setSelection({ suit: null, rank: null }); // UI reset
    setSelectedOpponentId(null);
  };

  // TODO: remove this once we have a proper authentication system
  const disabled = true;

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
