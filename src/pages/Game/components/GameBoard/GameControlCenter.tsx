import { useEffect, useState } from "react";
import Button from "@shared/components/Button";
import CardPreview from "../shared/CardPreview";
import type { SelectedCard } from "../shared/CardSelection";
import CardSelection from "../shared/CardSelection";

type GameControlCenterProps = {
  selection: SelectedCard;
  onChange: (updates: Partial<SelectedCard>) => void;
  onSubmit: () => void;
  isSelectionComplete: boolean;
  isInteractive: boolean;
};

export const GameControlCenter = ({
  selection,
  onChange,
  onSubmit,
  isSelectionComplete,
  isInteractive,
}: GameControlCenterProps) => {

  const [timeLeft, setTimeLeft] = useState(15);

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

  return (
    <aside className="w-full border-r border-slate-800 bg-slate-900 pt-4 p-6 flex flex-col h-full overflow-y-auto">
      <h3 className="text-white uppercase text-xl tracking-widest font-bold mb-4">
        Pick a Card:
      </h3>

      <CardSelection selection={selection} onChange={onChange} />

      <div className="min-h-[20px]" />

      <div className="flex flex-col gap-6 pt-4 shrink-0 flex-grow">
        <div className="flex items-center justify-center h-full">
          <CardPreview suit={selection.suit} rank={selection.rank} />
        </div>
        <p className="text-white-400 mt-1 text-center">
          Select a card and an opponent before time runs out to avoid losing
          your turn.
        </p>
        <Button
          onClick={onSubmit}
          disabled={!isSelectionComplete}
          color="primary"
          size="large"
          className={
            !isSelectionComplete ? "opacity-50 pointer-events-none" : ""
          }
        >
          Request
        </Button>
      </div>
    </aside>
  );
};

export default GameControlCenter;
