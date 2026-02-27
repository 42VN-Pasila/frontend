import OpponentDisplay from "../shared/OpponentDisplay";
import type { Opponent } from "../../common/types/players";
import FloatingInstruction from "../shared/FloatingInstruction";
import { useMemo } from "react";

type Positions = {
  left: Opponent;
  top: Opponent;
  right: Opponent;
};

function getPositions(opponents: Opponent[], localId: number): Positions {
  const sorted = [...opponents].sort((a, b) => a.id - b.id);

  let idx = sorted.findIndex((o) => o.id === localId);
  if (idx === -1) idx = 0;

  const right = sorted[(idx + 3) % 4];
  const top = sorted[(idx + 2) % 4];
  const left = sorted[(idx + 1) % 4];

  return { top, left, right };
}

interface GameOpponentPickerProps extends React.ComponentPropsWithoutRef<"section"> {
  opponents: Opponent[];
  localPlayerId: number;
  selectedOpponentId: number | null;
  onSelectOpponent: (id: number) => void;
  isInteractive: boolean;
}

const GameOpponentPicker = ({
  opponents,
  localPlayerId,
  selectedOpponentId,
  onSelectOpponent,
  isInteractive,
  className,
  ...props
}: GameOpponentPickerProps) => {
  
  const sortedPositions = useMemo(() => 
    getPositions(opponents, localPlayerId), 
    [opponents, localPlayerId]
  );

  const isPendingSelection = !selectedOpponentId;

  return (
    <section className={`${className} flex flex-col bg-slate-800/50 pt-2 p-6 border-b border-slate-800 relative`}>
      <h3 className="uppercase text-xl tracking-widest font-bold text-white mb-4">
        Pick an Opponent:
      </h3>

      <div className="flex justify-center relative">
        <FloatingInstruction
          text="🎯 Pick your target!"
          // visible={isPendingSelection && isInteractive}
          visible={isPendingSelection}
        >
          <OpponentDisplay 
            positions={sortedPositions}
            selectedId={selectedOpponentId}
            onSelect={onSelectOpponent}
          />
        </FloatingInstruction>
      </div>
    </section>
  );
};

export default GameOpponentPicker;
