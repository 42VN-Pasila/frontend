import Button from "@shared/components/Button";

import CardPreview from "./CardPreview";
import type { SelectedCard } from "./CardSelection";
import CardSelection from "./CardSelection";

type GameControlCenterProps = {
  selection: SelectedCard;
  onChange: (updates: Partial<SelectedCard>) => void;
  onSubmit: () => void;
  isSelectionComplete: boolean;
  disabled: boolean;
};

export const GameControlCenter = ({
  selection,
  onChange,
  onSubmit,
  isSelectionComplete,
  disabled,
}: GameControlCenterProps) => {
  return (
    <aside className="relative border-r-2 border-rave-red bg-rave-black flex flex-col h-full">
      <CardSelection
        selection={selection}
        onChange={disabled ? () => { } : onChange}
        disabled={!disabled}
      />

      <div className="flex flex-col gap-2 shrink-0 flex-grow m-6">
        <div className="flex items-center justify-center h-full">
          <CardPreview suit={selection.suit} rank={selection.rank} />
        </div>
        <p className="text-white-400 mt-1 text-center text-sm">
          Complete selections before time runs out to avoid losing your turn.
        </p>
        <Button
          onClick={onSubmit}
          disabled={!isSelectionComplete || disabled}
          color="red"
          variant="primary"
          emphasis="high"
          size="large"
          className={
            !isSelectionComplete || disabled ? "pointer-events-none" : ""
          }
        >
          Request
        </Button>
      </div>
    </aside>
  );
};

export default GameControlCenter;
