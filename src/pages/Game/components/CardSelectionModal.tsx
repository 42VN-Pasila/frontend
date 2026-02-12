import { useState, useEffect } from "react";
import { Button } from "@/shared/components";
import Ed from "../../../assets/Ed.png";
import Edd from "../../../assets/Edd.png";
import Eddy from "../../../assets/Eddy.png";
import Plank from "../../../assets/Plank 1.png";
import CenterSelection from "./CenterSelection";
import HourGlass from "../../../assets/hourglass.gif";
import CardPreview from "./CardPreview";
import type { CardSelectionProps, CardRequestPayload } from "./CenterSelection";

interface Opponent {
  id: number;
  username: string;
  avatarUrl: string;
}

const MOCK_OPPONENTS: Opponent[] = [
  { id: 4, username: "Huong", avatarUrl: Ed },
  { id: 2, username: "Tan", avatarUrl: Edd },
  { id: 3, username: "Triet", avatarUrl: Eddy },
  { id: 1, username: "Kha", avatarUrl: Plank },
];

type Positions = {
  left: Opponent;
  top: Opponent;
  right: Opponent;
};

interface OpponentOptionProps {
  username: string;
  avatarUrl: string;
  selected?: boolean;
  onClick?: () => void;
}

const OpponentOption = ({
  username,
  avatarUrl,
  selected = false,
  onClick,
}: OpponentOptionProps) => (
  <button
    type="button"
    onClick={onClick}
    className="flex flex-col items-center gap-2 focus:outline-none"
  >
    <div
      className={`
        w-16 h-16 rounded-full
        overflow-hidden
        bg-slate-700
        transition-all duration-150
        ${
          selected
            ? "border-(--color-primary) ring-4 ring-(--color-primary) scale-[1.1] transition-all duration-200 ease-out"
            : "border-2 border-transparent opacity-50 hover:opacity-80 hover:border-[--color-gold]"
        }
      `}
    >
      {avatarUrl && (
        <img
          src={avatarUrl}
          alt={username}
          className="w-full h-full object-cover object-top"
        />
      )}
    </div>

    <span
      className={`
        text-xs transition-opacity
        ${selected ? "text-slate-200 opacity-100" : "text-slate-400 opacity-60"}
      `}
    >
      {username}
    </span>
  </button>
);

interface CardSelectionModalProps {
  activePlayerId: number | null;
  localPlayerId: number;
  onSelect: (payload: CardRequestPayload) => void;
}

function getPositions(opponents: Opponent[], localId: number): Positions {
  const sorted = [...opponents].sort((a, b) => a.id - b.id);

  if (sorted.length !== 4) {
    throw new Error(`Expected 4 players, got ${sorted.length}`);
  }

  let idx = sorted.findIndex((o) => o.id === localId);
  if (idx === -1) idx = 0;

  const right = sorted[(idx + 3) % 4];
  const top = sorted[(idx + 2) % 4];
  const left = sorted[(idx + 1) % 4];

  return { top, left, right };
}

export const CardSelectionModal = ({
  activePlayerId,
  localPlayerId,
  onSelect,
}: CardSelectionModalProps) => {
  const [selectedOpponentId, setSelectedOpponentId] = useState<number | null>(
    null,
  );
  const [timeLeft, setTimeLeft] = useState(10);
  const { top, left, right } = getPositions(MOCK_OPPONENTS, localPlayerId);
  const [selection, setSelection] = useState<CardSelectionProps>({
    suit: null,
    rank: null,
  });

  const handleUpdate = (updates: Partial<CardSelectionProps>) => {
    setSelection(prev => ({ ...prev, ...updates }));
  };
  const handleRequest = () => {
    if (!selection.suit || !selection.rank || !selectedOpponentId) return;

    const payload = {
      //userId: the one who request card.
    suit: selection.suit,
    rank: selection.rank,
    opponentId: selectedOpponentId,
  };

  onSelect(payload); // later: API call
  setSelection({ suit: null, rank: null }); // UI reset
  setSelectedOpponentId(null);
};

const isSelectionComplete: boolean = !!(selection.suit && selection.rank && selectedOpponentId);


  useEffect(() => {
  if (selection.suit && selection.rank === null) {
    // setSelection((prev) => ({
    //   ...prev,
    //   rank: selection.rank,
    // }));
    handleUpdate({ rank: null });
  }
}, [selection.suit, selection.rank]);


  // 2. LOGIC BRANCH: Determine the view type
  const isMyTurn = activePlayerId === localPlayerId;

  useEffect(() => {
    // Only run timer when it's your turn
    if (!isMyTurn) return;

    // Reset timer when modal opens
    setTimeLeft(100);

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isMyTurn]);

  useEffect(() => {
    if (timeLeft <= 0) {
      window.location.reload();
    }
  }, [timeLeft]);

  // 1. EARLY RETURN: If no turn is active, the modal is "turned off"
  if (activePlayerId === null) return null;

  return (
    /* THE OVERLAY (Shared by both views) */
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/10 backdrop-blur-sm">
      {/* THE MODAL CONTAINER */}
      <div className="bg-(--color-dark-gray) border-[5px] border-[var(--color-gold)]-700 p-10 rounded-2xl shadow-2xl max-w-6xl w-[90%] min-h-[400px] flex flex-col justify-between">
        {isMyTurn ? (
          /* --- VIEW A: LOCAL PLAYER TURN --- */
          <div className="flex flex-col items-center gap-6">
            <header className="text-center">
              <h2 className="text-2xl font-bold text-white uppercase tracking-wider">
                Your Turn
              </h2>
              <p className="text-white-400 mt-2">Make your selections below</p>
            </header>

            {/* The Interaction Area Container */}
            <div
              className="w-full bg-slate-900/50 border-2 border-dashed border-slate-600 rounded-lg p-6
                        grid items-start gap-8
                        grid-cols-[320px_minmax(0,1fr)_220px_140px]"
            >
              {/* 1. LEFT: Opponent Selection (Take up 40% width) */}
              <div className="min-w-0 flex flex-col gap-4 border-r border-slate-700 pr-8">
                <h3 className="text-white uppercase text-sm tracking-widest font-bold">
                  Ask Opponent:
                </h3>

                <div className="flex justify-center">
                  <div className="grid grid-cols-3 grid-rows-2 gap-6 place-items-center">
                    <div className="col-start-2">
                      <OpponentOption
                        username={top.username}
                        avatarUrl={top.avatarUrl}
                        selected={selectedOpponentId === top.id}
                        onClick={() => setSelectedOpponentId(top.id)}
                      />
                    </div>

                    <div className="col-start-1 row-start-2">
                      <OpponentOption
                        username={left.username}
                        avatarUrl={left.avatarUrl}
                        selected={selectedOpponentId === left.id}
                        onClick={() => setSelectedOpponentId(left.id)}
                      />
                    </div>

                    <div className="col-start-3 row-start-2">
                      <OpponentOption
                        username={right.username}
                        avatarUrl={right.avatarUrl}
                        selected={selectedOpponentId === right.id}
                        onClick={() => setSelectedOpponentId(right.id)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. CENTER: Card Selection (Stays in the middle) */}
              <div className="min-w-0">
                <CenterSelection
                  selection={selection}
                  // onChange={setSelection}
                  onChange={handleUpdate}
                />
              </div>

              {/* PREVIEW */}
              <div className="min-w-0 min-h-75 flex items-center justify-center align">
                <CardPreview
                  suit={selection.suit}
                  rank={selection.rank}
                />
              </div>
              {/* 3. RIGHT: THE TIMER (Take up 40% width) */}
              <div className="min-w-0 flex flex-col items-center justify-center self-center px-4 border-l border-slate-700">
                <img
                  src={HourGlass}
                  alt=""
                  aria-hidden="true"
                  className="w-30 h-30 mb-2"
                />

                <div className="text-4xl font-mono text-[--color-red] animate-pulse">
                  00:{String(timeLeft).padStart(2, "0")}
                </div>

                <span className="text-[10px] text-slate-500 uppercase mt-1">
                  Time Left
                </span>
              </div>
            </div>
            <p className="text-white-400 mt-1">
              If the selections are not completed within the time. You lost this turn.
            </p>
            <Button
              onClick={handleRequest}
              color="primary"
              disabled={!isSelectionComplete}
              className={!isSelectionComplete ? "opacity-50 disabled:hover disabled:cursor-not-allowed pointer-events-none" : ""}
              >
              REQUEST
            </Button>
          </div>
        ) : (
          /* --- VIEW B: WAITING FOR OPPONENT --- */
          <div className="flex flex-col items-center py-8 gap-6 text-center">
            {/* Visual indicator that things are happening */}
            <div className="relative flex items-center justify-center">
              <div className="absolute animate-ping h-8 w-8 rounded-full bg-amber-500/20"></div>
              <div className="h-4 w-4 rounded-full bg-amber-500"></div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-white">
                Player {activePlayerId} is thinking...
              </h2>
              <p className="text-white-400 mt-2 italic">
                Please wait for the opponent to finish their turn.
              </p>
              <p className="text-white-400 mt-2 italic">
                Refresh page to go back to the UI test
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardSelectionModal;
