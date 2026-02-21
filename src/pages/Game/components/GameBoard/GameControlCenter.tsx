import { useState, useEffect } from "react";
import HourGlass from "@assets/hourglass.gif";
import Button from "@shared/components/Button";
import type { NullableProps } from "@/common/types";
import type { Card } from "../../common/types/cards";
import Selector, { type SelectorItem } from "../CardSelectionModal/Selector";
import { ALL_CARD_RANKS, ALL_CARD_SUITS } from "../../common/types/cards";
import type { CardRank, CardSuit } from "../../common/types/cards";
import { CARD_ICONS, SUIT_ICONS } from "../CardSelectionModal/constants";
import CardPreview from "../CardSelectionModal/CardPreview";

export type SelectedCard = NullableProps<Card>;

type GameControlCenterProps = {
  selection: SelectedCard;
  onChange: (updates: Partial<SelectedCard>) => void;
  onSubmit: () => void;
  isSelectionComplete: boolean;
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
            console.log("Time is up!");
            // window.location.reload(); // comment out for testing UI
        }
    }, [timeLeft]);

    return (
        <aside className="w-full border-r border-slate-800 bg-slate-900 p-6 flex flex-col h-full">
            {/* 1. HEADER */}
            {/* <div className="p-4 bg-slate-800 rounded-md border-l-4 border-(--color-primary) mb-3"> */}
                {/* <p className="text-lg font-semibold text-white opacity">Your Turn</p> */}
                <h3 className="text-white uppercase text-xl tracking-widest font-bold mb-8">
                    Pick a Card:
                </h3>
            {/* </div> */}

            {/* 2. TIMER ROW */}
            <div className="flex items-center justify-between bg-slate-800 rounded-md px-4 py-3 mb-8">
                <div className="flex items-center gap-3">
                    <img 
                        src={HourGlass} 
                        alt="" 
                        className="w-16 h-16 object-contain" 
                    />
                    <span className="text-sm text-slate-400 uppercase font-bold">
                        Time Remaining
                    </span>
                </div>
                
                <div className={`text-4xl font-mono leading-none ${
                    timeLeft < 5 ? 'text-red-500 animate-pulse' : 'text-white'
                }`}>
                    00:{String(timeLeft).padStart(2, "0")}
                </div>
            </div>

            {/* 2. SELECTORS */}
            <div className="flex flex-col gap-4">
                <h3 className="text-slate-400 text-xl">Start with a suit:</h3>
                <Selector<CardSuit>
                    items={SUIT_ITEMS}
                    value={suit}
                    onChange={(suit) => onChange({ suit })}
                    columns={4}
                />

                <h3 className="text-slate-400 text-xl">The rank comes next:</h3>
                {suit && (
                    <Selector<CardRank>
                        items={RANK_ITEMS_BY_SUIT[suit]}
                        value={rank}
                        onChange={(rank) => onChange({ rank })}
                        columns={5}
                    />
                )}
            </div>

            <div className="flex-grow" />

            {/* 3. LOWER SECTION (Preview + Button) */}
            <div className="flex flex-col gap-6 pt-4">
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