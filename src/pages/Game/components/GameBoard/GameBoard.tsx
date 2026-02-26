import { useEffect, useState } from "react";

import Ed from "@assets/Ed.png";
import Edd from "@assets/Edd.png";
import Eddy from "@assets/Eddy.png";
import Plank from "@assets/Plank 1.png";
import HourGlass from "@assets/hourglass.gif";

import type { CardRank, CardSuit } from "../../common/types/cards";
import type { Card } from "../../common/types/cards";
import { ALL_CARD_RANKS, ALL_CARD_SUITS } from "../../common/types/cards";
import type { SelectedCard } from "../shared/CardSelection";
import Timer from "../shared/Timer";

import GameControlCenter from "./GameControlCenter";
import GameOpponentPicker from "./GameOpponentPicker";
import GamePlayerCard from "./GamePlayerCard";

export const generateMockHand = (): Card[] => {
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
  { id: 4, username: "Huong", avatarUrl: Ed, cardCount: 7 },
  { id: 2, username: "Tan", avatarUrl: Edd, cardCount: 9 },
  { id: 3, username: "Triet", avatarUrl: Eddy, cardCount: 11 },
  { id: 1, username: "Kha", avatarUrl: Plank, cardCount: 13 },
];

export type GameRequestPayload = {
  requesterId: number;
  suit: CardSuit;
  rank: CardRank;
  targetId: number;
};

interface GameBoardProps {
  activePlayerId: number | null;
  localPlayerId: number;
  onSelect: (payload: GameRequestPayload) => void;
}

export const GameBoard = ({
  activePlayerId,
  localPlayerId,
  onSelect,
}: GameBoardProps) => {
  const [timeLeft, setTimeLeft] = useState(15);

  const [selectedOpponentId, setSelectedOpponentId] = useState<number | null>(
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

  const handleUpdate = (updates: Partial<SelectedCard>) => {
    setSelection((prev) => ({ ...prev, ...updates }));
  };

  const handleRequest = () => {
    if (!isSelectionComplete) return;

    const payload = {
      requesterId: localPlayerId,
      suit: selection.suit!,
      rank: selection.rank!,
      targetId: selectedOpponentId!,
    };

    onSelect(payload); // later: API call
    setSelection({ suit: null, rank: null }); // UI reset
    setSelectedOpponentId(null);
  };

  useEffect(() => {
    if (selection.suit && selection.rank === null) {
      handleUpdate({ rank: null });
    }
  }, [selection.suit, selection.rank]);

  const isInteractive = activePlayerId === localPlayerId;

  if (activePlayerId === null) return null;

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950">
      <div className="w-72 lg:w-80 h-full shrink-0">
        <GameControlCenter
          selection={selection}
          onChange={handleUpdate}
          onSubmit={handleRequest}
          isSelectionComplete={isSelectionComplete}
          isInteractive={isInteractive}
        />
      </div>
      <main className="flex-1 flex flex-col min-w-0 h-full">
        <div className="absolute top-4 right-4 z-20">
          <Timer timeLeft={timeLeft} icon={HourGlass} />
        </div>
        <div className="flex-[3] min-h-0">
          <GameOpponentPicker
            opponents={MOCK_OPPONENTS}
            localPlayerId={localPlayerId}
            selectedOpponentId={selectedOpponentId}
            onSelectOpponent={setSelectedOpponentId}
            isInteractive={isInteractive}
            className="h-full"
          />
        </div>
        <div className="flex-[1] min-h-[200px] border-t border-slate-800">
          <GamePlayerCard
            cards={MOCK_PLAYER_HAND}
            className="h-full"
            isInteractive={isInteractive}
          />
        </div>
      </main>
    </div>
  );
};

export default GameBoard;
