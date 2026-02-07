import React from "react";
import Selector from "./Selector"; 
import { suits } from "./selectorData"; 
import type { CardSuit } from "./selectorData";

export default function CenterSelection() {
  const [suit, setSuit] = React.useState<CardSuit | null>(null);

  return (
    <div className="flex-2 flex flex-col gap-4 border-r border-slate-700 px-8">
      <h3 className="text-white uppercase text-sm tracking-widest font-bold">
        Pick a Card:
      </h3>
          <Selector<CardSuit>
            items={suits}
            value={suit}
            onChange={setSuit}
            columns={2}
            className="flex flex-row w-fit h-full"
          />
    </div>
  );
}
