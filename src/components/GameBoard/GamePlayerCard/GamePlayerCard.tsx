
import type { Card } from "../types";
import { ALL_CARD_RANKS } from "../types";
import CardSvg from "../CardSvg";

interface GamePlayerCardProps extends React.ComponentPropsWithoutRef<"div"> {
  cards: Card[];
  disabled: boolean;
}

const GamePlayerCard = ({
  cards,
  className = "",
  ...props
}: GamePlayerCardProps) => {
  const sortedCards = [...cards].sort((a, b) => {
    return ALL_CARD_RANKS.indexOf(a.rank) - ALL_CARD_RANKS.indexOf(b.rank);
  });

  return (
    <div
      {...props}
      className={`${className} relative w-full h-full flex items-center justify-center bg-rave-black`}
    >
      {sortedCards.map((card, index) => (
        <div
          key={`${card.suit}-${card.rank}`}
          className="relative transition-transform duration-200 hover:-translate-y-4 hover:z-50 "
          style={{
            marginLeft:
              index === 0 ? "0" : cards.length >= 13 ? "-4rem" : "-2rem",
            zIndex: index,
          }}
        >
          <CardSvg
            card={card}
            className="h-[16vh] min-h-[140px] max-h-[220px]"
          />
        </div>
      ))}
    </div >
  );
};

export default GamePlayerCard;
