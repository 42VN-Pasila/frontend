import Selector from "./Selector";
import { suits, ALL_CARD_RANKS, CARD_ICONS } from "./selectorData";
import type { CardSuit, CardRank } from "./selectorData";

type CardSelection = {
  suit: CardSuit | null;
  rank: CardRank | null;
};

type CenterSelectionProps = {
  selection: CardSelection;
  onChange: (selection: CardSelection) => void;
};


export default function CenterSelection({
  selection,
  onChange,
}: CenterSelectionProps) {
  const { suit, rank } = selection;

  return (
    <div className="flex flex-col">
      <h3 className="text-white uppercase text-sm tracking-widest font-bold">
        Pick a Card:
      </h3>

      <div className="flex flex-col gap-4 pt-2">
        {/* SUIT */}
        <Selector<CardSuit>
          items={suits}
          value={suit}
          onChange={(suit) =>
            onChange({ ...selection, suit })
          }
          columns={2}
        />

        {/* RANK */}
        {suit && (
          <Selector<CardRank>
            items={ALL_CARD_RANKS.map((rank) => ({
              value: rank,
              Icon: CARD_ICONS[suit][rank],
              })
            )}
            value={rank}
            onChange={(rank) =>
              onChange({ ...selection, rank })
            }
            columns={5}
            className="max-w-[260px]"
          />
        )}
      </div>
    </div>
  );
}

