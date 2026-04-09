import { CardIconAssets } from './assets/cards';
import type { CardRank, CardSuit } from './types';

export const SUIT_ICONS: Record<CardSuit, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  SPADES: CardIconAssets.SpadeIcon,
  HEARTS: CardIconAssets.HeartIcon,
  DIAMONDS: CardIconAssets.DiamondIcon,
  CLUBS: CardIconAssets.ClubIcon
};

export const CARD_ICONS: Record<
  CardSuit,
  Record<CardRank, React.ComponentType<React.SVGProps<SVGSVGElement>>>
> = {
  SPADES: {
    ACE: CardIconAssets.AceSpadeIcon,
    TWO: CardIconAssets.TwoSpadeIcon,
    THREE: CardIconAssets.ThreeSpadeIcon,
    FOUR: CardIconAssets.FourSpadeIcon,
    FIVE: CardIconAssets.FiveSpadeIcon,
    SIX: CardIconAssets.SixSpadeIcon,
    SEVEN: CardIconAssets.SevenSpadeIcon,
    EIGHT: CardIconAssets.EightSpadeIcon,
    NINE: CardIconAssets.NineSpadeIcon,
    TEN: CardIconAssets.TenSpadeIcon,
    JACK: CardIconAssets.JackSpadeIcon,
    QUEEN: CardIconAssets.QueenSpadeIcon,
    KING: CardIconAssets.KingSpadeIcon
  },
  HEARTS: {
    ACE: CardIconAssets.AceHeartIcon,
    TWO: CardIconAssets.TwoHeartIcon,
    THREE: CardIconAssets.ThreeHeartIcon,
    FOUR: CardIconAssets.FourHeartIcon,
    FIVE: CardIconAssets.FiveHeartIcon,
    SIX: CardIconAssets.SixHeartIcon,
    SEVEN: CardIconAssets.SevenHeartIcon,
    EIGHT: CardIconAssets.EightHeartIcon,
    NINE: CardIconAssets.NineHeartIcon,
    TEN: CardIconAssets.TenHeartIcon,
    JACK: CardIconAssets.JackHeartIcon,
    QUEEN: CardIconAssets.QueenHeartIcon,
    KING: CardIconAssets.KingHeartIcon
  },
  DIAMONDS: {
    ACE: CardIconAssets.AceDiamondIcon,
    TWO: CardIconAssets.TwoDiamondIcon,
    THREE: CardIconAssets.ThreeDiamondIcon,
    FOUR: CardIconAssets.FourDiamondIcon,
    FIVE: CardIconAssets.FiveDiamondIcon,
    SIX: CardIconAssets.SixDiamondIcon,
    SEVEN: CardIconAssets.SevenDiamondIcon,
    EIGHT: CardIconAssets.EightDiamondIcon,
    NINE: CardIconAssets.NineDiamondIcon,
    TEN: CardIconAssets.TenDiamondIcon,
    JACK: CardIconAssets.JackDiamondIcon,
    QUEEN: CardIconAssets.QueenDiamondIcon,
    KING: CardIconAssets.KingDiamondIcon
  },
  CLUBS: {
    ACE: CardIconAssets.AceClubIcon,
    TWO: CardIconAssets.TwoClubIcon,
    THREE: CardIconAssets.ThreeClubIcon,
    FOUR: CardIconAssets.FourClubIcon,
    FIVE: CardIconAssets.FiveClubIcon,
    SIX: CardIconAssets.SixClubIcon,
    SEVEN: CardIconAssets.SevenClubIcon,
    EIGHT: CardIconAssets.EightClubIcon,
    NINE: CardIconAssets.NineClubIcon,
    TEN: CardIconAssets.TenClubIcon,
    JACK: CardIconAssets.JackClubIcon,
    QUEEN: CardIconAssets.QueenClubIcon,
    KING: CardIconAssets.KingClubIcon
  }
};
