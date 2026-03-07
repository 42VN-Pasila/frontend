import type { NullableProps } from "@/common/types";

import { ALL_CARD_RANKS, ALL_CARD_SUITS } from "../types";
import type { CardRank, CardSuit } from "../types";
import type { Card } from "../types";

import Selector, { type SelectorItem } from "./Selector";
import { CARD_ICONS, SUIT_ICONS } from "../constants";

export type SelectedCard = NullableProps<Card>;

type CardSelectorProps = {
  selection: SelectedCard;
  onChange: (updates: Partial<SelectedCard>) => void;
  disabled: boolean;
};

const SUIT_ITEMS: SelectorItem<CardSuit>[] = ALL_CARD_SUITS.map((suit) => ({
  value: suit,
  label: suit[0].toUpperCase() + suit.slice(1),
  Icon: SUIT_ICONS[suit],
}));

const RANK_ITEMS_BY_SUIT: Record<CardSuit, SelectorItem<CardRank>[]> =
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

export default function CardSelector({
  selection,
  onChange,
  disabled,
}: CardSelectorProps) {
  const { suit, rank } = selection;

  return (
    <div className={`flex flex-col gap-8 relative shrink-0 ${disabled ? '' : 'pointer-events-none'}`}>
      <Selector<CardSuit>
        label="Start with a suit:"
        items={SUIT_ITEMS}
        value={suit}
        onChange={(suit) => onChange({ suit })}
        columns={4}
      />

      {suit && (
        <Selector<CardRank>
          label="Then pick the rank:"
          items={RANK_ITEMS_BY_SUIT[suit]}
          value={rank}
          onChange={(rank) => onChange({ rank })}
          columns={5}
        />
      )}
    </div>
  );
}
