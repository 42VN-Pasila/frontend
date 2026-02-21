import { CARD_IMAGES } from "../../common/assets/cards";
import type { Card } from "../../common/types/cards";
import { ALL_CARD_RANKS } from "../../common/types/cards";

interface GamePlayerCardProps {
  cards: Card[];
  className?: string;
}

const GamePlayerCard = ({ cards }: GamePlayerCardProps) => {
  const sortedCards = [...cards].sort((a, b) => {
    return ALL_CARD_RANKS.indexOf(a.rank) - ALL_CARD_RANKS.indexOf(b.rank);
  });

//   console.log("Sorted:", sortedCards);
return (
    <div className="w-full flex justify-center py-6 items-center">
      <div className="flex justify-center items-end w-full max-w-4xl h-48 px-10">
        {sortedCards.map((card, index) => {
          const CardSvg = CARD_IMAGES[card.suit][card.rank];
          
          return (
            <div 
              key={`${card.suit}-${card.rank}-${index}`}
              className="relative transition-all duration-200"
              style={{
                marginLeft: index === 0 ? '0' : `calc(-${Math.min(100, 120 - (3000 / cards.length) / 10)}px)`,
                zIndex: index
              }}
            >
              <div className="w-28 sm:w-36 md:w-40 shrink-0">
                <CardSvg className="w-full h-auto rounded-lg shadow-md" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GamePlayerCard;