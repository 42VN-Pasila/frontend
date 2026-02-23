import { useState, useEffect } from "react";
import GameControlCenter from "./GameControlCenter";
import GameOpponents from "./GameOpponents";
import GamePlayerCard from "./GamePlayerCard";
import type { CardRank, CardSuit } from '../../common/types/cards';
import type { SelectedCard } from "../CardSelection/CardSelection";
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

  const isMyTurn = activePlayerId === localPlayerId;

  if (activePlayerId === null) return null;

    return (
    <>
      {isMyTurn ? (
        // <div className="grid grid-cols-8 h-screen w-screen overflow-hidden bg-slate-950">
        <div className="flex h-screen w-screen overflow-hidden bg-slate-950">
        {/* <div className="col-span-2"> */}
        <div className="w-72 lg:w-80 h-full shrink-0">
            <GameControlCenter
              selection={selection}
              onChange={handleUpdate}
              onSubmit={handleRequest}
              isSelectionComplete={isSelectionComplete}
            />
          </div>
          {/* <main className="col-span-6 grid grid-rows-3 h-full"> */}
          <main className="flex-1 flex flex-col min-w-0 h-full">
            <div className="flex-[3] min-h-0">
              <GameOpponents 
                opponents={MOCK_OPPONENTS}
                localPlayerId={localPlayerId}
                selectedOpponentId={selectedOpponentId}
                onSelectOpponent={setSelectedOpponentId}
                // className="row-span-2"
                className="h-full"
              />
            </div>
            <div className="flex-[1] min-h-[200px] border-t border-slate-800">
            <GamePlayerCard cards={MOCK_PLAYER_HAND} className="h-full" />
            </div>
          </main>
        </div>
      ) : (
        /* The Opponent's view (later) */
        <div className="grid grid-cols-8 h-screen w-screen overflow-hidden bg-slate-950">
          <div className="col-span-2">
            <p>Waiting for opponent to make a move...</p>
          </div>
          <main className="col-span-6 grid grid-rows-3 h-full">
            <p>Waiting for opponent to make a move...</p>
          </main>
        </div>
      )}
    </>
  );
};

export default GameBoard;