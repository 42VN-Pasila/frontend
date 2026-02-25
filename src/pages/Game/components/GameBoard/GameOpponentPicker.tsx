import CardBack from "@assets/card-back-2.png";
import type { Opponent, Positions, OpponentOptionProps } from "../../common/types/players";

const OpponentOption = ({
  id,
  username,
  avatarUrl,
  cardCount,
  side,
  selected = false,
  onClick,
}: OpponentOptionProps) => (
  <button
    type="button"
    onClick={onClick}
    className="group flex flex-col items-center gap-2 focus:outline-none"
  >
    {/* Container for Avatar and Card Back */}
    <div className={`flex items-center gap-4 ${side === 'right' ? 'flex-row-reverse' : 'flex-row'}`}>
      
      {/* Avatar Div */}
      <div className={`
        w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden bg-slate-700 transition-all duration-150 border-2
        ${selected
            ? "border-(--color-primary) ring-4 ring-(--color-primary) scale-[1.1] transition-all duration-300 ease-out"
            : "border-transparent opacity-50 group-hover:opacity-100"
        }
      `}>
        {avatarUrl && (
          <img src={avatarUrl} alt={username} className="w-full h-full object-cover object-top" />
        )}
      </div>

      {/* Card Back Div */}
      <div className="relative w-16 h-20 shrink-0 transition-transform duration-200 group-hover:rotate-6 group-hover:scale-105">
        <img src={CardBack} alt="CardBack" className="w-full h-full object-contain" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl flex items-center justify-center border-2 w-9 h-9 rounded-full font-black text-white bg-slate-900/50 backdrop-blur-sm shadow-xl">
            {cardCount}
          </span>
        </div>
      </div>
    </div>

    {/* Name tag */}
    <span
      className={`text-xl transition-all duration-200
        ${selected 
          ? "text-slate-200 opacity-100 font-bold" 
          : "text-slate-400 opacity-60 group-hover:opacity-100 group-hover:text-slate-200"
        }
      `}
    >
      {username}
    </span>
  </button>
);

function getPositions(opponents: Opponent[], localId: number): Positions {
  const sorted = [...opponents].sort((a, b) => a.id - b.id);

  let idx = sorted.findIndex((o) => o.id === localId);
  if (idx === -1) idx = 0;

  const right = sorted[(idx + 3) % 4];
  const top = sorted[(idx + 2) % 4];
  const left = sorted[(idx + 1) % 4];

  return { top, left, right };
}

interface GameOpponentPickerProps {
  opponents: Opponent[];
  localPlayerId: number;
  selectedOpponentId: number | null;
  onSelectOpponent: (id: number) => void;
  isMyTurn: boolean
  className?: string;
}

const GameOpponentPicker = ({ 
  opponents, 
  localPlayerId, 
  selectedOpponentId, 
  onSelectOpponent,
  isMyTurn, 
  className 
}: GameOpponentPickerProps) => {
  const { left, top, right } = getPositions(opponents, localPlayerId);
  const isPendingSelection = !selectedOpponentId;

  return (
    <section className={`${className} min-w-0 flex flex-col bg-slate-800/50 p-6 border-b border-slate-800 gap-10 relative`}>
      <h3 className="uppercase text-xl tracking-widest font-bold transition-colors text-white">
          Pick an Opponent:
      </h3>
      {/* 1. FLOATING BOUNCE INSTRUCTION */}
      {isPendingSelection && (
        <div className="mt-5 absolute left-1/2 -translate-x-1/2 animate-bounce bg-(--color-purple) text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-2">
            🎯 Pick your target!
        </div>
      )}

      <div className="flex justify-center">
        <div className={`grid grid-cols-3 grid-rows-2 gap-x-[10vw] w-full max-w-5xl gap-y-10 place-items-center p-10 rounded-3xl transition-all duration-500 
        ${isPendingSelection 
            ? "border-2 border-[var(--color-primary)] bg-[var(--color-primary)]/5 shadow-[0_0_40px_-10px_var(--color-primary)]" 
            : "border-2 border-transparent"
        }`}>
          
          <div className="col-start-2">
            <OpponentOption
              id={top.id}
              username={top.username}
              avatarUrl={top.avatarUrl}
              cardCount={top.cardCount}
              side="top"
              selected={selectedOpponentId === top.id}
              onClick={() => onSelectOpponent(top.id)}
            />
          </div>
          
          <div className="col-start-1 row-start-2">
            <OpponentOption
              id={left.id}
              username={left.username}
              avatarUrl={left.avatarUrl}
              cardCount={left.cardCount}
              side="left"
              selected={selectedOpponentId === left.id}
              onClick={() => onSelectOpponent(left.id)}
            />
          </div>
          
          <div className="col-start-3 row-start-2">
            <OpponentOption
              id={right.id}
              username={right.username}
              avatarUrl={right.avatarUrl}
              cardCount={right.cardCount}
              side="right"
              selected={selectedOpponentId === right.id}
              onClick={() => onSelectOpponent(right.id)}
            />
          </div>

        </div>
      </div>
    </section>
  );
};

export default GameOpponentPicker;