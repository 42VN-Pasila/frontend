import type { Card } from "../../common/types/cards";
import { ALL_CARD_RANKS } from "../../common/types/cards";
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
        <h3 className="truncate text-white uppercase text-xl tracking-widest font-bold mb-4 shrink-0">
          Your hand:
        </h3>

        <div className="flex flex-row items-center justify-center p-2">
          <div className="flex flex-col items-center shrink-0 mr-10 group">
            <div className="relative w-14 h-14 flex items-center justify-center">
              <div className="absolute inset-0 bg-yellow-500/20 border-2 border-(--color-gold) rotate-45 rounded-lg group-hover:scale-110 transition-transform" />
              <span className="relative text-2xl font-black text-(--color-gold)">
                13
              </span>
            </div>
            <span className="text-[10px] text-(--color-gold) font-bold uppercase mt-3">
              Sets collected
            </span>
          </div>
          <div className="flex items-center justify-center w-full pb-2 overflow-hidden">
            <div className="flex items-center justify-center w-full max-w-6xl">
              {sortedCards.map((card, index) => (
                <div
                  key={`${card.suit}-${card.rank}`}
                  className="relative transition-transform duration-200 hover:-translate-y-4"
                  style={{
                    marginLeft:
                      index === 0
                        ? "0"
                        : cards.length > 10
                          ? "-4rem"
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
