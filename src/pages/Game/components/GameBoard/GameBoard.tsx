import { useState, useEffect } from "react";
import GameControlCenter from "./GameControlCenter";
import GameOpponents from "./GameOpponents";
import GamePlayerCard from "./GamePlayerCard";
import type { CardRank, CardSuit } from '../../common/types/cards';
import type { SelectedCard } from "../CardSelectionModal/CardSelection";
import Ed from "@assets/Ed.png";
import Edd from "@assets/Edd.png";
import Eddy from "@assets/Eddy.png";
import Plank from "@assets/Plank 1.png";
import type { Card } from "../../common/types/cards";
import { ALL_CARD_SUITS, ALL_CARD_RANKS } from '../../common/types/cards';

export const generateMockHand = (): Card[] => {
  const handSize = Math.floor(Math.random() * 20) + 1;

  const deck: Card[] = ALL_CARD_SUITS.flatMap((suit) =>
    ALL_CARD_RANKS.map((rank) => ({ suit, rank }))
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

export type CardRequestPayload = {
  suit: CardSuit;
  rank: CardRank;
  opponentId: number;
};

interface CardSelectionModalProps {
  activePlayerId: number | null;
  localPlayerId: number;
  onSelect: (payload: CardRequestPayload) => void;
}

export const GameBoard = ({
  activePlayerId,
  localPlayerId,
  onSelect,
}: CardSelectionModalProps) => {
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

  const handleUpdate = (updates: Partial<SelectedCard>) => {
    setSelection((prev) => ({ ...prev, ...updates }));
  };

  const handleRequest = () => {
    if (!isSelectionComplete) return;

    const payload = {
      //userId: the one who request card.
      suit: selection.suit!,
      rank: selection.rank!,
      opponentId: selectedOpponentId!,
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

  const isMyTurn = activePlayerId === localPlayerId;

  if (activePlayerId === null) return null;

    return (
    <>
      {isMyTurn ? (
        <div className="grid grid-cols-8 h-screen w-screen overflow-hidden bg-slate-950">
          <div className="col-span-2">
            <GameControlCenter
              selection={selection}
              onChange={handleUpdate}
              onSubmit={handleRequest}
              isSelectionComplete={isSelectionComplete}
            />
          </div>
          <main className="col-span-6 grid grid-rows-3 h-full">
            <GameOpponents 
              opponents={MOCK_OPPONENTS}
              localPlayerId={localPlayerId}
              selectedOpponentId={selectedOpponentId}
              onSelectOpponent={setSelectedOpponentId}
              className="row-span-2"
            />
            <GamePlayerCard cards={MOCK_PLAYER_HAND} className="row-span-1" />
          </main>
        </div>
      ) : (
        /* The Opponent's view (later) */
        <div className="flex h-screen w-screen items-center justify-center bg-slate-950 text-white">
          <p>Waiting for opponent to make a move...</p>
        </div>
      )}
    </>
  );
};

export default GameBoard;