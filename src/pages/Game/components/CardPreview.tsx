import type { CardSuit, CardRank } from "./selectorData";
import type { CardSelectionProps } from "./CenterSelection";

import ASpade from "../../../assets/game/A-spade.png";
import TwoSpade from "../../../assets/game/2-spade.png";
import ThreeSpade from "../../../assets/game/3-spade.png";
import FourSpade from "../../../assets/game/4-spade.png";
import FiveSpade from "../../../assets/game/5-spade.png";
import SixSpade from "../../../assets/game/6-spade.png";
import SevenSpade from "../../../assets/game/7-spade.png";
import EightSpade from "../../../assets/game/8-spade.png";
import NineSpade from "../../../assets/game/9-spade.png";
import TenSpade from "../../../assets/game/10-spade.png";
import JackSpade from "../../../assets/game/J-spade.png";
import QueenSpade from "../../../assets/game/Q-spade.png";
import KingSpade from "../../../assets/game/K-spade.png";

import AHeart from "../../../assets/game/A-heart.png";
import TwoHeart from "../../../assets/game/2-heart.png";
import ThreeHeart from "../../../assets/game/3-heart.png";
import FourHeart from "../../../assets/game/4-heart.png";
import FiveHeart from "../../../assets/game/5-heart.png";
import SixHeart from "../../../assets/game/6-heart.png";
import SevenHeart from "../../../assets/game/7-heart.png";
import EightHeart from "../../../assets/game/8-heart.png";
import NineHeart from "../../../assets/game/9-heart.png";
import TenHeart from "../../../assets/game/10-heart.png";
import JackHeart from "../../../assets/game/J-heart.png";
import QueenHeart from "../../../assets/game/Q-heart.png";
import KingHeart from "../../../assets/game/K-heart.png";

import ADiamond from "../../../assets/game/A-diamond.png";
import TwoDiamond from "../../../assets/game/2-diamond.png";
import ThreeDiamond from "../../../assets/game/3-diamond.png";
import FourDiamond from "../../../assets/game/4-diamond.png";
import FiveDiamond from "../../../assets/game/5-diamond.png";
import SixDiamond from "../../../assets/game/6-diamond.png";
import SevenDiamond from "../../../assets/game/7-diamond.png";
import EightDiamond from "../../../assets/game/8-diamond.png";
import NineDiamond from "../../../assets/game/9-diamond.png";
import TenDiamond from "../../../assets/game/10-diamond.png";
import JackDiamond from "../../../assets/game/J-diamond.png";
import QueenDiamond from "../../../assets/game/Q-diamond.png";
import KingDiamond from "../../../assets/game/K-diamond.png";

import AClub from "../../../assets/game/A-club.png";
import TwoClub from "../../../assets/game/2-club.png";
import ThreeClub from "../../../assets/game/3-club.png";
import FourClub from "../../../assets/game/4-club.png";
import FiveClub from "../../../assets/game/5-club.png";
import SixClub from "../../../assets/game/6-club.png";
import SevenClub from "../../../assets/game/7-club.png";
import EightClub from "../../../assets/game/8-club.png";
import NineClub from "../../../assets/game/9-club.png";
import TenClub from "../../../assets/game/10-club.png";
import JackClub from "../../../assets/game/J-club.png";
import QueenClub from "../../../assets/game/Q-club.png";
import KingClub from "../../../assets/game/K-club.png";

const CARD_IMAGES: Record<CardSuit, Record<CardRank, string>> = {
  spades: {
    'Ace': ASpade,
    'Two': TwoSpade,
    'Three': ThreeSpade,
    'Four': FourSpade,
    'Five': FiveSpade,
    'Six': SixSpade,
    'Seven': SevenSpade,
    'Eight': EightSpade,
    'Nine': NineSpade,
    'Ten': TenSpade,
    'Jack': JackSpade,
    'Queen': QueenSpade,
    'King': KingSpade,
  },
  hearts: {
    'Ace': AHeart,
    'Two': TwoHeart,
    'Three': ThreeHeart,
    'Four': FourHeart,
    'Five': FiveHeart,
    'Six': SixHeart,
    'Seven': SevenHeart,
    'Eight': EightHeart,
    'Nine': NineHeart,
    'Ten': TenHeart,
    'Jack': JackHeart,
    'Queen': QueenHeart,
    'King': KingHeart,
  },
  diamonds: {
    'Ace': ADiamond,
    'Two': TwoDiamond,
    'Three': ThreeDiamond,
    'Four': FourDiamond,
    'Five': FiveDiamond,
    'Six': SixDiamond,
    'Seven': SevenDiamond,
    'Eight': EightDiamond,
    'Nine': NineDiamond,
    'Ten': TenDiamond,
    'Jack': JackDiamond,
    'Queen': QueenDiamond,
    'King': KingDiamond,
  },
  clubs: {
    'Ace': AClub,
    'Two': TwoClub,
    'Three': ThreeClub,
    'Four': FourClub,
    'Five': FiveClub,
    'Six': SixClub,
    'Seven': SevenClub,
    'Eight': EightClub,
    'Nine': NineClub,
    'Ten': TenClub,
    'Jack': JackClub,
    'Queen': QueenClub,
    'King': KingClub,
  }
};

export default function CardPreview({ suit, rank }: CardSelectionProps) {
  return (
    <div className="px-8">
      {!suit || !rank ? (
        <div
          className="
            w-40 h-56
            rounded-xl
            border-2 border-dashed
            border-(--color-primary)
            bg-slate-700/40
            flex items-center justify-center
            text-slate-400 text-sm
          "
        >
          Select a suit
        </div>
      ) : (
        <img
          src={CARD_IMAGES[suit!][rank!]}
          alt={`${rank} of ${suit}`}
          className="w-40 rounded-xl shadow"
        />
      )}
    </div>
  );
}

