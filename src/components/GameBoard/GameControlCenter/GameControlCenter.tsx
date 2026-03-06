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
    <aside className="border-r-2 border-rave-white/10 bg-rave-black flex flex-col justify-between gap-10 h-full px-6 py-8">
      <CardSelection
        selection={selection}
        onChange={disabled ? () => { } : onChange}
        disabled={!disabled}
      />

      <CardPreview suit={selection.suit} rank={selection.rank} />
      <div className="flex flex-col justify-center items-center gap-2">
        <p className="text-white-400 text-center text-sm">
          Complete selections before time runs out to avoid losing your turn
        </p>
        <Button
          onClick={onSubmit}
          disabled={!isSelectionComplete || disabled}
          color="red"
          variant="primary"
          emphasis="high"
          size="large"
          fullWidth={true}
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
