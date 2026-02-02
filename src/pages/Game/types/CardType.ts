export interface CardType {
  id: string;
  suit: 'hearts' | 'diamonds' | 'spades' | 'clubs';
  rank: '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K' | 'A';
  position: {
    x: number;
    y: number;
    z: number;
  };
  rotation: {
    x: number;
    y: number;
    z: number;
  };
  owner: 0 | 1 | 2 | 3 | 4;
  inDeck: boolean;
  cardIndex: number;
}

export interface Position {
  x: number;
  y: number;
  z: number;
}
