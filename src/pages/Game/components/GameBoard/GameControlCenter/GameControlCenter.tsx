import { useEffect, useState } from "react";

import Button from "@shared/components/Button";

import CardPreview from "../GameControlCenter/CardPreview";
import type { SelectedCard } from "../GameControlCenter/CardSelection";
import CardSelection from "../GameControlCenter/CardSelection";

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
    <aside className="relative border-r border-slate-800 bg-[#3c303e]/70 flex flex-col h-full">
      {!isInteractive && (
        <div className={`absolute bg-transparent z-100 w-full h-full`} />
      )}

      <CardSelection
        selection={selection}
        onChange={isInteractive ? onChange : () => {}}
        isInteractive={isInteractive}
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
          disabled={!isSelectionComplete || !isInteractive}
          color="primary"
          variant="primary"
          emphasis="high"
          size="large"
          className={
            !isSelectionComplete || !isInteractive ? "pointer-events-none" : ""
          }
        >
          Request
        </Button>
      </div>
    </aside>
  );
};

export default GameControlCenter;
