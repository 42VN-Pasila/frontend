export interface CardType {
  id: string;
  suit: 'hearts' | 'diamonds' | 'spades' | 'clubs';
  rank: '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';
  position: Position;
  rotation: Position;
  owner: 1 | 2 | 3 | 4;
  screenPosition: 1 | 2 | 3 | 4;
  inDeck: boolean;
  cardIndex: number;
}

export interface Position {
  x: number;
  y: number;
  z: number;
}
