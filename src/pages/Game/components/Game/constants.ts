import { CardIconAssets } from '../../common/assets/cards';
import type { CardRank, CardSuit } from '../../common/types/cards';

export const SUIT_ICONS: Record<CardSuit, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  spades: CardIconAssets.SpadeIcon,
  hearts: CardIconAssets.HeartIcon,
  diamonds: CardIconAssets.DiamondIcon,
  clubs: CardIconAssets.ClubIcon
};

export const CARD_ICONS: Record<
  CardSuit,
  Record<CardRank, React.ComponentType<React.SVGProps<SVGSVGElement>>>
> = {
  spades: {
    Ace: CardIconAssets.AceSpadeIcon,
    Two: CardIconAssets.TwoSpadeIcon,
    Three: CardIconAssets.ThreeSpadeIcon,
    Four: CardIconAssets.FourSpadeIcon,
    Five: CardIconAssets.FiveSpadeIcon,
    Six: CardIconAssets.SixSpadeIcon,
    Seven: CardIconAssets.SevenSpadeIcon,
    Eight: CardIconAssets.EightSpadeIcon,
    Nine: CardIconAssets.NineSpadeIcon,
    Ten: CardIconAssets.TenSpadeIcon,
    Jack: CardIconAssets.JackSpadeIcon,
    Queen: CardIconAssets.QueenSpadeIcon,
    King: CardIconAssets.KingSpadeIcon
  },
  hearts: {
    Ace: CardIconAssets.AceHeartIcon,
    Two: CardIconAssets.TwoHeartIcon,
    Three: CardIconAssets.ThreeHeartIcon,
    Four: CardIconAssets.FourHeartIcon,
    Five: CardIconAssets.FiveHeartIcon,
    Six: CardIconAssets.SixHeartIcon,
    Seven: CardIconAssets.SevenHeartIcon,
    Eight: CardIconAssets.EightHeartIcon,
    Nine: CardIconAssets.NineHeartIcon,
    Ten: CardIconAssets.TenHeartIcon,
    Jack: CardIconAssets.JackHeartIcon,
    Queen: CardIconAssets.QueenHeartIcon,
    King: CardIconAssets.KingHeartIcon
  },
  diamonds: {
    Ace: CardIconAssets.AceDiamondIcon,
    Two: CardIconAssets.TwoDiamondIcon,
    Three: CardIconAssets.ThreeDiamondIcon,
    Four: CardIconAssets.FourDiamondIcon,
    Five: CardIconAssets.FiveDiamondIcon,
    Six: CardIconAssets.SixDiamondIcon,
    Seven: CardIconAssets.SevenDiamondIcon,
    Eight: CardIconAssets.EightDiamondIcon,
    Nine: CardIconAssets.NineDiamondIcon,
    Ten: CardIconAssets.TenDiamondIcon,
    Jack: CardIconAssets.JackDiamondIcon,
    Queen: CardIconAssets.QueenDiamondIcon,
    King: CardIconAssets.KingDiamondIcon
  },
  clubs: {
    Ace: CardIconAssets.AceClubIcon,
    Two: CardIconAssets.TwoClubIcon,
    Three: CardIconAssets.ThreeClubIcon,
    Four: CardIconAssets.FourClubIcon,
    Five: CardIconAssets.FiveClubIcon,
    Six: CardIconAssets.SixClubIcon,
    Seven: CardIconAssets.SevenClubIcon,
    Eight: CardIconAssets.EightClubIcon,
    Nine: CardIconAssets.NineClubIcon,
    Ten: CardIconAssets.TenClubIcon,
    Jack: CardIconAssets.JackClubIcon,
    Queen: CardIconAssets.QueenClubIcon,
    King: CardIconAssets.KingClubIcon
  }
};
