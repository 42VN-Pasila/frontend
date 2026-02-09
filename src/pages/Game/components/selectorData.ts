import React from "react";
import SpadeIcon from "../../../assets/game/symbols-svg/Spade-icon.svg?react";
import HeartIcon from "../../../assets/game/symbols-svg/Heart-icon.svg?react";
import DiamondIcon from "../../../assets/game/symbols-svg/Diamond-icon.svg?react";
import ClubIcon from "../../../assets/game/symbols-svg/Club-icon.svg?react";
/* Spade */
import TwoSpadeIcon from "../../../assets/game/symbols-svg/Spade-icons/2-spade-icon.svg?react";
import ThreeSpadeIcon from "../../../assets/game/symbols-svg/Spade-icons/3-spade-icon.svg?react";
import FourSpadeIcon from "../../../assets/game/symbols-svg/Spade-icons/4-spade-icon.svg?react";
import FiveSpadeIcon from "../../../assets/game/symbols-svg/Spade-icons/5-spade-icon.svg?react";
import SixSpadeIcon from "../../../assets/game/symbols-svg/Spade-icons/6-spade-icon.svg?react";
import SevenSpadeIcon from "../../../assets/game/symbols-svg/Spade-icons/7-spade-icon.svg?react";
import EightSpadeIcon from "../../../assets/game/symbols-svg/Spade-icons/8-spade-icon.svg?react";
import NineSpadeIcon from "../../../assets/game/symbols-svg/Spade-icons/9-spade-icon.svg?react";
import TenSpadeIcon from "../../../assets/game/symbols-svg/Spade-icons/10-spade-icon.svg?react";
import JackSpadeIcon from "../../../assets/game/symbols-svg/Spade-icons/J-spade-icon.svg?react";
import QueenSpadeIcon from "../../../assets/game/symbols-svg/Spade-icons/Q-spade-icon.svg?react";
import KingSpadeIcon from "../../../assets/game/symbols-svg/Spade-icons/K-spade-icon.svg?react";
import AceSpadeIcon from "../../../assets/game/symbols-svg/Spade-icons/A-spade-icon.svg?react";
/* Heart */
import TwoHeartIcon from "../../../assets/game/symbols-svg/Heart-icons/2-heart-icon.svg?react";
import ThreeHeartIcon from "../../../assets/game/symbols-svg/Heart-icons/3-heart-icon.svg?react";
import FourHeartIcon from "../../../assets/game/symbols-svg/Heart-icons/4-heart-icon.svg?react";
import FiveHeartIcon from "../../../assets/game/symbols-svg/Heart-icons/5-heart-icon.svg?react";
import SixHeartIcon from "../../../assets/game/symbols-svg/Heart-icons/6-heart-icon.svg?react";
import SevenHeartIcon from "../../../assets/game/symbols-svg/Heart-icons/7-heart-icon.svg?react";
import EightHeartIcon from "../../../assets/game/symbols-svg/Heart-icons/8-heart-icon.svg?react";
import NineHeartIcon from "../../../assets/game/symbols-svg/Heart-icons/9-heart-icon.svg?react";
import TenHeartIcon from "../../../assets/game/symbols-svg/Heart-icons/10-heart-icon.svg?react";
import JackHeartIcon from "../../../assets/game/symbols-svg/Heart-icons/J-heart-icon.svg?react";
import QueenHeartIcon from "../../../assets/game/symbols-svg/Heart-icons/Q-heart-icon.svg?react";
import KingHeartIcon from "../../../assets/game/symbols-svg/Heart-icons/K-heart-icon.svg?react";
import AceHeartIcon from "../../../assets/game/symbols-svg/Heart-icons/A-heart-icon.svg?react";
/* Diamond */
import TwoDiamondIcon from "../../../assets/game/symbols-svg/Diamond-icons/2-diamond-icon.svg?react";
import ThreeDiamondIcon from "../../../assets/game/symbols-svg/Diamond-icons/3-diamond-icon.svg?react";
import FourDiamondIcon from "../../../assets/game/symbols-svg/Diamond-icons/4-diamond-icon.svg?react";
import FiveDiamondIcon from "../../../assets/game/symbols-svg/Diamond-icons/5-diamond-icon.svg?react";
import SixDiamondIcon from "../../../assets/game/symbols-svg/Diamond-icons/6-diamond-icon.svg?react";
import SevenDiamondIcon from "../../../assets/game/symbols-svg/Diamond-icons/7-diamond-icon.svg?react";
import EightDiamondIcon from "../../../assets/game/symbols-svg/Diamond-icons/8-diamond-icon.svg?react";
import NineDiamondIcon from "../../../assets/game/symbols-svg/Diamond-icons/9-diamond-icon.svg?react";
import TenDiamondIcon from "../../../assets/game/symbols-svg/Diamond-icons/10-diamond-icon.svg?react";
import JackDiamondIcon from "../../../assets/game/symbols-svg/Diamond-icons/J-diamond-icon.svg?react";
import QueenDiamondIcon from "../../../assets/game/symbols-svg/Diamond-icons/Q-diamond-icon.svg?react";
import KingDiamondIcon from "../../../assets/game/symbols-svg/Diamond-icons/K-diamond-icon.svg?react";
import AceDiamondIcon from "../../../assets/game/symbols-svg/Diamond-icons/A-diamond-icon.svg?react";
/* Club */
import TwoClubIcon from "../../../assets/game/symbols-svg/Club-icons/2-club-icon.svg?react";
import ThreeClubIcon from "../../../assets/game/symbols-svg/Club-icons/3-club-icon.svg?react";
import FourClubIcon from "../../../assets/game/symbols-svg/Club-icons/4-club-icon.svg?react";
import FiveClubIcon from "../../../assets/game/symbols-svg/Club-icons/5-club-icon.svg?react";
import SixClubIcon from "../../../assets/game/symbols-svg/Club-icons/6-club-icon.svg?react";
import SevenClubIcon from "../../../assets/game/symbols-svg/Club-icons/7-club-icon.svg?react"
import EightClubIcon from "../../../assets/game/symbols-svg/Club-icons/8-club-icon.svg?react";
import NineClubIcon from "../../../assets/game/symbols-svg/Club-icons/9-club-icon.svg?react";
import TenClubIcon from "../../../assets/game/symbols-svg/Club-icons/10-club-icon.svg?react";
import JackClubIcon from "../../../assets/game/symbols-svg/Club-icons/J-club-icon.svg?react";
import QueenClubIcon from "../../../assets/game/symbols-svg/Club-icons/Q-club-icon.svg?react";
import KingClubIcon from "../../../assets/game/symbols-svg/Club-icons/K-club-icon.svg?react";
import AceClubIcon from "../../../assets/game/symbols-svg/Club-icons/A-club-icon.svg?react";

export interface SelectorItem<T extends string | number = string> {
  value: T;
  label?: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export type CardSuit = "spades" | "hearts" | "diamonds" | "clubs";

export const suits: SelectorItem<CardSuit>[] = [
  { value: "spades", label: "Spades", Icon: SpadeIcon },
  { value: "hearts", label: "Hearts", Icon: HeartIcon },
  { value: "diamonds", label: "Diamonds", Icon: DiamondIcon },
  { value: "clubs", label: "Clubs", Icon: ClubIcon },
];

export const ALL_CARD_RANKS = [
  1, 2, 3, 4, 5, 6, 7,
  8, 9, 10, 11, 12, 13,
] as const;

export type CardRank = typeof ALL_CARD_RANKS[number];

// assets
export const CARD_ICONS: Record<
  CardSuit,
  Record<CardRank, React.ComponentType<React.SVGProps<SVGSVGElement>>>
> = {
  spades: {
    1: AceSpadeIcon,
    2: TwoSpadeIcon,
    3: ThreeSpadeIcon,
    4: FourSpadeIcon,
    5: FiveSpadeIcon,
    6: SixSpadeIcon,
    7: SevenSpadeIcon,
    8: EightSpadeIcon,
    9: NineSpadeIcon,
    10: TenSpadeIcon,
    11: JackSpadeIcon,
    12: QueenSpadeIcon,
    13: KingSpadeIcon,
  },
  hearts: {
    1: AceHeartIcon,
    2: TwoHeartIcon,
    3: ThreeHeartIcon,
    4: FourHeartIcon,
    5: FiveHeartIcon,
    6: SixHeartIcon,
    7: SevenHeartIcon,
    8: EightHeartIcon,
    9: NineHeartIcon,
    10: TenHeartIcon,
    11: JackHeartIcon,
    12: QueenHeartIcon,
    13: KingHeartIcon,
  },
  diamonds: {
    1: AceDiamondIcon,
    2: TwoDiamondIcon,
    3: ThreeDiamondIcon,
    4: FourDiamondIcon,
    5: FiveDiamondIcon,
    6: SixDiamondIcon,
    7: SevenDiamondIcon,
    8: EightDiamondIcon,
    9: NineDiamondIcon,
    10: TenDiamondIcon,
    11: JackDiamondIcon,
    12: QueenDiamondIcon,
    13: KingDiamondIcon,
  },
  clubs: {
    1: AceClubIcon,
    2: TwoClubIcon,
    3: ThreeClubIcon,
    4: FourClubIcon,
    5: FiveClubIcon,
    6: SixClubIcon,
    7: SevenClubIcon,
    8: EightClubIcon,
    9: NineClubIcon,
    10: TenClubIcon,
    11: JackClubIcon,
    12: QueenClubIcon,
    13: KingClubIcon,
  },
};
