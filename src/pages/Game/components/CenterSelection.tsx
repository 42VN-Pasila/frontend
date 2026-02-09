import Selector from "./Selector";
import { suits, ALL_CARD_RANKS, CARD_ICONS } from "./selectorData";
import type { CardSuit, CardRank } from "./selectorData";

export type CardSelection = {
  suit: CardSuit | null;
  rank: CardRank | null;
};

type CenterSelectionProps = {
  selection: CardSelection;
  // onChange: (selection: CardSelection) => void;
  onChange: React.Dispatch<React.SetStateAction<CardSelection>>;
};

export type CardRequestPayload = {
  suit: CardSuit;
  rank: CardRank;
  opponentId: number;
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
        <h3 className="text-slate-400 text-sm">
          Start with a suit:
        </h3>

        {/* SUIT */}
        <Selector<CardSuit>
          items={suits}
          value={suit}
          onChange={(suit) =>
            // onChange({ ...selection, suit })
            onChange((prev) => ({
              ...prev,
              suit,
            }))
          }
          columns={2}
        />

        <h3 className="text-slate-400 text-sm">
          The rank comes next:
        </h3>
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
              // onChange({ ...selection, rank })
              onChange((prev) => ({
              ...prev,
              rank,
              }))
            }
            columns={5}
            className="max-w-[260px]"
          />
        )}
      </div>
    </div>
  );
}

