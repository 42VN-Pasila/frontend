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
    1: ASpade,
    2: TwoSpade,
    3: ThreeSpade,
    4: FourSpade,
    5: FiveSpade,
    6: SixSpade,
    7: SevenSpade,
    8: EightSpade,
    9: NineSpade,
    10: TenSpade,
    11: JackSpade,
    12: QueenSpade,
    13: KingSpade,
  },
  hearts: {
    1: AHeart,
    2: TwoHeart,
    3: ThreeHeart,
    4: FourHeart,
    5: FiveHeart,
    6: SixHeart,
    7: SevenHeart,
    8: EightHeart,
    9: NineHeart,
    10: TenHeart,
    11: JackHeart,
    12: QueenHeart,
    13: KingHeart,
  },
  diamonds: {
    1: ADiamond,
    2: TwoDiamond,
    3: ThreeDiamond,
    4: FourDiamond,
    5: FiveDiamond,
    6: SixDiamond,
    7: SevenDiamond,
    8: EightDiamond,
    9: NineDiamond,
    10: TenDiamond,
    11: JackDiamond,
    12: QueenDiamond,
    13: KingDiamond,
  },
  clubs: {
    1: AClub,
    2: TwoClub,
    3: ThreeClub,
    4: FourClub,
    5: FiveClub,
    6: SixClub,
    7: SevenClub,
    8: EightClub,
    9: NineClub,
    10: TenClub,
    11: JackClub,
    12: QueenClub,
    13: KingClub,
  }
};

export default function CardPreview({ suit, rank }: CardSelectionProps) {
  return (
    <div className="px-8">
      {!suit && !rank ? (
        <div
          className="
            w-40 h-[224px]
            rounded-xl
            border-2 border-dashed
            border-[var(--color-primary)]
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

