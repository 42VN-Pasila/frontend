import type { CardSuit } from "./selectorData";
import ASpade from "../../../assets/game/A-spade.png";
import AHeart from "../../../assets/game/A-heart.png";
import ADiamond from "../../../assets/game/A-diamond.png";
import AClub from "../../../assets/game/A-club.png";

const aceBySuit: Record<CardSuit, string> = {
  spades: ASpade,
  hearts: AHeart,
  diamonds: ADiamond,
  clubs: AClub,
};

type CardReviewProps = {
  suit: CardSuit | null;
};

export default function CardReview({ suit }: CardReviewProps) {
  if (!suit) {
    return;
  }

  return (
    <div className="px-8">
      <img
        src={aceBySuit[suit]}
        alt={`A of ${suit}`}
        className="w-40 rounded-xl shadow"
      />
    </div>
  );
}
