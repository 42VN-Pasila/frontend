import CardDeck2 from "@assets/CardDeck-2.svg";

import type { Card } from "../../common/types/cards";
import { ALL_CARD_RANKS } from "../../common/types/cards";
import Badge from "../shared/Badge";
import CardSvg from "../shared/CardSvg";

interface GamePlayerCardProps extends React.ComponentPropsWithoutRef<"div"> {
  cards: Card[];
  isInteractive: boolean;
}

const GamePlayerCard = ({
  cards,
  className = "",
  isInteractive,
  ...props
}: GamePlayerCardProps) => {
  const sortedCards = [...cards].sort((a, b) => {
    return ALL_CARD_RANKS.indexOf(a.rank) - ALL_CARD_RANKS.indexOf(b.rank);
  });

  return (
    <div
      {...props}
      className={`${className} w-full h-full flex p-4 overflow-hidden`}
    >
      <div className="w-full h-full flex flex-col p-2">
        <h3 className="truncate text-white uppercase text-xl tracking-widest font-bold shrink-0">
          Your hand:
        </h3>

        <div className="flex flex-row items-center gap-3 justify-center">
          <Badge
            variant="deck"
            count={10}
            imageUrl={CardDeck2}
            label="sets collected"
          />
          <div className="flex items-center justify-center w-full overflow-hidden">
            <div className="flex items-center justify-center w-full max-w-6xl">
              {sortedCards.map((card, index) => (
                <div
                  key={`${card.suit}-${card.rank}`}
                  className="relative transition-transform duration-200 hover:-translate-y-4 mt-4"
                  style={{
                    marginLeft:
                      index === 0
                        ? "0"
                        : cards.length > 10
                          ? "-4.1rem"
                          : "-2.5rem",
                    zIndex: index,
                  }}
                >
                  <CardSvg
                    card={card}
                    className="h-[18vh] min-h-[140px] max-h-[220px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePlayerCard;
