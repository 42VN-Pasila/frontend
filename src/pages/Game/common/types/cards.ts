export const ALL_CARD_SUITS = ['spades', 'hearts', 'diamonds', 'clubs'] as const;

export type CardSuit = (typeof ALL_CARD_SUITS)[number];

export enum CardRank {
  Ace = 'Ace',
  Two = 'Two',
  Three = 'Three',
  Four = 'Four',
  Five = 'Five',
  Six = 'Six',
  Seven = 'Seven',
  Eight = 'Eight',
  Nine = 'Nine',
  Ten = 'Ten',
  Jack = 'Jack',
  Queen = 'Queen',
  King = 'King'
}

export const ALL_CARD_RANKS = [
  CardRank.Ace,
  CardRank.Two,
  CardRank.Three,
  CardRank.Four,
  CardRank.Five,
  CardRank.Six,
  CardRank.Seven,
  CardRank.Eight,
  CardRank.Nine,
  CardRank.Ten,
  CardRank.Jack,
  CardRank.Queen,
  CardRank.King
] as const;

export type Card = {
  suit: CardSuit;
  rank: CardRank;
  position: Position;
  owner: 1 | 2 | 3 | 4;
  cardIndex: number;
};

export interface Position {
  x: number;
  y: number;
  z: number;
}

