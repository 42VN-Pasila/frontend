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
  return (
    <aside className="w-full border-r border-slate-800 bg-slate-900 pt-2 p-6 flex flex-col h-full">
      <h3 className="text-white uppercase text-xl tracking-widest font-bold mb-2">
        Pick a Card:
      </h3>

      <CardSelection
        selection={selection}
        onChange={isInteractive ? onChange : () => {}}
        isInteractive={isInteractive}
      />

      <div className="min-h-[10px]" />

      <div className="flex flex-col gap-2 shrink-0 flex-grow">
        <div className="flex items-center justify-center h-full">
          <CardPreview suit={selection.suit} rank={selection.rank} />
        </div>
        <p className="text-white-400 mt-1 text-center text-sm">
          Complete selections before time runs out to avoid losing your turn.
        </p>
        <Button
          onClick={onSubmit}
          disabled={!isSelectionComplete || !isInteractive}
          color="primary"
          size="large"
          className={
            !isSelectionComplete || !isInteractive
              ? "opacity-50 pointer-events-none"
              : ""
          }
        >
          Request
        </Button>
      </div>
    </aside>
  );
};

export default GameControlCenter;
