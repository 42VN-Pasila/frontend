import { useState, useEffect } from "react";
import HourGlass from "@assets/hourglass.gif";
import Button from "@shared/components/Button";
import type { NullableProps } from "@/common/types";
import type { Card } from "../../common/types/cards";
import Selector, { type SelectorItem } from "../shared/Selector";
import { ALL_CARD_RANKS, ALL_CARD_SUITS } from "../../common/types/cards";
import type { CardRank, CardSuit } from "../../common/types/cards";
import { CARD_ICONS, SUIT_ICONS } from "../shared/constants";
import CardPreview from "../shared/CardPreview";
import FloatingInstruction from "../shared/FloatingInstruction";

export type SelectedCard = NullableProps<Card>;

type GameControlCenterProps = {
  selection: SelectedCard;
  onChange: (updates: Partial<SelectedCard>) => void;
  onSubmit: () => void;
  isSelectionComplete: boolean;
  isInteractive: boolean;
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

export const GameControlCenter = ({
    selection,
    onChange,
    onSubmit,
    isSelectionComplete,
    isInteractive,
}: GameControlCenterProps) => {
    const { suit, rank } = selection;

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
        <aside className="w-full border-r border-slate-800 bg-slate-900 p-6 flex flex-col h-full overflow-y-auto custom-scrollbar">
            {/* 1. HEADER */}
            <h3 className="text-white uppercase text-xl tracking-widest font-bold mb-4">
                Pick a Card:
            </h3>

            <div className="flex flex-col gap-6 relative shrink-0">
                <FloatingInstruction 
                    text="👇 Pick a suit to start!" 
                    visible={!suit}
                >
                    <Selector<CardSuit>
                        label="Start with a suit:"
                        items={SUIT_ITEMS}
                        value={suit}
                        onChange={(suit) => onChange({ suit })}
                        columns={4}
                    />
                </FloatingInstruction>

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

            <div className="flex-grow min-h-[20px]" />

            {/* 4. LOWER SECTION (Preview + Button) */}
            <div className="flex flex-col gap-6 pt-4 shrink-0 ">
                <div className="flex items-center justify-center">
                    <CardPreview suit={selection.suit} rank={selection.rank} />
                </div>
                <p className="text-white-400 mt-1 text-center">
                    Select a card and an opponent before time runs out to avoid losing your turn.
                </p>
                <Button
                    onClick={onSubmit}
                    disabled={!isSelectionComplete}
                    color="primary"
                    size="large"
                    className={!isSelectionComplete ? "opacity-50 pointer-events-none" : ""}
                >
                    Request
                </Button>
            </div>
        </aside>
    );
};

export default GameControlCenter;