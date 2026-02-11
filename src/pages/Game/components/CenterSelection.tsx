import Selector from "./Selector";
import { suits, ALL_CARD_RANKS, CARD_ICONS } from "./selectorData";
import type { CardSuit, CardRank } from "./selectorData";

export type CardSelectionProps = {
  suit: CardSuit | null;
  rank: CardRank | null;
};

type CenterSelectionProps = {
  selection: CardSelectionProps;
  // onChange: (selection: CardSelection) => void;
  onChange: React.Dispatch<React.SetStateAction<CardSelectionProps>>;
};

export type CardRequestPayload = {
  suit: CardSuit;
  rank: CardRank;
  opponentId: number;
};

const RANK_NAMES: Record<number, string> = {
  1: "Ace",
  11: "Jack",
  12: "Queen",
  13: "King",
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
            onChange((prev) => ({
              ...prev,
              suit,
            }))
          }
          columns={4}
        />

        <h3 className="text-slate-400 text-sm">
          The rank comes next:
        </h3>
        {/* RANK */}
        {suit && (
          <Selector<CardRank>
            items={ALL_CARD_RANKS.map((rank) => ({
              value: rank,
              label: `${RANK_NAMES[rank] ?? rank} of ${suit}`,
              Icon: CARD_ICONS[suit][rank],
              })
            )}
            value={rank}
            onChange={(rank) =>
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

