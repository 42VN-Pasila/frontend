import { useState, useEffect } from "react";
import GameControlCenter from "./GameControlCenter";
import GameOpponents from "./GameOpponents";
import GamePlayerCard from "./GamePlayerCard";
import type { CardRank, CardSuit } from '../../common/types/cards';
import type { SelectedCard } from "../CardSelectionModal/CardSelection";

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
        <div className="grid grid-cols-3 h-screen w-screen overflow-hidden bg-slate-950">
          <GameControlCenter
            selection={selection}
            onChange={handleUpdate}
            onSubmit={handleRequest}
            isSelectionComplete={isSelectionComplete}
          />
          <main className="col-span-2 grid grid-rows-3 h-full">
            <GameOpponents className="row-span-2" />
            <GamePlayerCard className="row-span-1" />
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