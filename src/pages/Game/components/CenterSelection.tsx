import Selector from "./Selector";
import { suits } from "./selectorData";
import type { CardSuit } from "./selectorData";

type CenterSelectionProps = {
  suit: CardSuit | null;
  onSuitChange: (suit: CardSuit) => void;
};

export default function CenterSelection({
  suit,
  onSuitChange,
}: CenterSelectionProps) {
  return (
    <div className="flex flex-col ">
      <h3 className="text-white uppercase text-sm tracking-widest font-bold">
        Pick a Card:
      </h3>
      <div className="flex-2 flex flex-col gap-4 pt-2">
        <Selector<CardSuit>
          items={suits}
          value={suit}
          onChange={onSuitChange}
          columns={2}
          className="flex flex-row w-fit h-full"
        />
      </div>
    </div>
  );
}
