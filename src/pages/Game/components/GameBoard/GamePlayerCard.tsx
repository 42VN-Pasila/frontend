import { CARD_IMAGES } from "../../common/assets/cards";
import type { Card } from "../../common/types/cards";
import { ALL_CARD_RANKS } from "../../common/types/cards";

interface GamePlayerCardProps {
  cards: Card[];
  className?: string;
  isMyTurn: boolean;
}

const GamePlayerCard = ({
  cards,
  className = "",
  isMyTurn,
}: GamePlayerCardProps) => {
  const sortedCards = [...cards].sort((a, b) => {
    return ALL_CARD_RANKS.indexOf(a.rank) - ALL_CARD_RANKS.indexOf(b.rank);
  });

  return (
    <div className={`${className} w-full h-full flex items-center justify-center p-4 overflow-hidden`}>
      
      <div className="flex items-center justify-center w-full max-w-6xl">
        {sortedCards.map((card, index) => {
          const CardSvg = CARD_IMAGES[card.suit][card.rank];

          return (
            <div 
              key={`${card.suit}-${card.rank}`}
              className="relative transition-transform duration-200 hover:-translate-y-4" // hover for fun
              style={{
                marginLeft: index === 0 ? '0' : `${cards.length > 10 ? '-4rem' : '-2.5rem'}`,
                zIndex: index
              }}
            >
              <div className="h-[15vh] min-h-[120px] max-h-[220px] aspect-[2/3]">
                <CardSvg className="w-full h-full drop-shadow-lg rounded-xl" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GamePlayerCard;