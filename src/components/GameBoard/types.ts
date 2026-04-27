export const ALL_CARD_SUITS = ['SPADES', 'HEARTS', 'DIAMONDS', 'CLUBS'] as const;

export type CardSuit = (typeof ALL_CARD_SUITS)[number];

export enum CardRank {
  ACE = 'ACE',
  TWO = 'TWO',
  THREE = 'THREE',
  FOUR = 'FOUR',
  FIVE = 'FIVE',
  SIX = 'SIX',
  SEVEN = 'SEVEN',
  EIGHT = 'EIGHT',
  NINE = 'NINE',
  TEN = 'TEN',
  JACK = 'JACK',
  QUEEN = 'QUEEN',
  KING = 'KING'
}

export const ALL_CARD_RANKS = [
  CardRank.ACE,
  CardRank.TWO,
  CardRank.THREE,
  CardRank.FOUR,
  CardRank.FIVE,
  CardRank.SIX,
  CardRank.SEVEN,
  CardRank.EIGHT,
  CardRank.NINE,
  CardRank.TEN,
  CardRank.JACK,
  CardRank.QUEEN,
  CardRank.KING
] as const;

export type Card = {
  suit: CardSuit;
  rank: CardRank;
};

export interface Opponent {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  cardCount: number;
}
