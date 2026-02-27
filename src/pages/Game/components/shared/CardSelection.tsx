import type { NullableProps } from "@/common/types";

import { ALL_CARD_RANKS, ALL_CARD_SUITS } from "../../common/types/cards";
import type { CardRank, CardSuit } from "../../common/types/cards";
import type { Card } from "../../common/types/cards";

import Selector, { type SelectorItem } from "./Selector";
import { CARD_ICONS, SUIT_ICONS } from "./constants";
import FloatingInstruction from "../shared/FloatingInstruction";

export type SelectedCard = NullableProps<Card>;

type CardSelectionProps = {
  selection: SelectedCard;
  onChange: (updates: Partial<SelectedCard>) => void;
};

export const SUIT_ITEMS: SelectorItem<CardSuit>[] = ALL_CARD_SUITS.map((suit) => ({
  value: suit,
  label: suit[0].toUpperCase() + suit.slice(1),
  Icon: SUIT_ICONS[suit],
}));

export const RANK_ITEMS_BY_SUIT: Record<CardSuit, SelectorItem<CardRank>[]> =
  Object.fromEntries(
    ALL_CARD_SUITS.map((suit) => [
      suit,
      ALL_CARD_RANKS.map((rank) => ({
        value: rank,
        label: `${rank} of ${suit}`,
        Icon: CARD_ICONS[suit][rank],
      })),
    ]),
  ) as Record<CardSuit, SelectorItem<CardRank>[]>;

export default function CardSelection({
  selection,
  onChange,
}: CardSelectionProps) {
  const { suit, rank } = selection;

  return (
    <div className="flex flex-col">

      <div className="flex flex-col gap-4 relative shrink-0">
        <FloatingInstruction text="👇 Pick a suit to start!" visible={!suit}>
          <Selector<CardSuit>
            label="Start with a suit:"
            items={SUIT_ITEMS}
            value={suit}
            onChange={(suit) => onChange({ suit })}
            columns={4}
          />
        </FloatingInstruction>

        {suit && (
          <FloatingInstruction
            text="👇 Pick a rank to continue!"
            visible={!rank}
          >
            <Selector<CardRank>
              label="Then pick the rank:"
              items={RANK_ITEMS_BY_SUIT[suit]}
              value={rank}
              onChange={(rank) => onChange({ rank })}
              columns={5}
            />
          </FloatingInstruction>
        )}
      </div>
    </div>
  );
}
