export interface Opponent {
  id: number;
  username: string;
  avatarUrl: string;
  cardCount: number;
}

export type Positions = {
  left: Opponent;
  top: Opponent;
  right: Opponent;
};

export interface OpponentOptionProps extends Opponent {
  selected?: boolean;
  side: 'left' | 'right' | 'top';
  onClick?: () => void;
}