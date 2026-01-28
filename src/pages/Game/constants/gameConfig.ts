import type { Position } from '../types/CardType';

export const PLAYER_POSITIONS: Record<number, Position> = {
  1: { x: 0, y: -4, z: 0 },
  2: { x: 0, y: 4, z: 0 },
  3: { x: 6, y: 0, z: 0 },
  4: { x: -6, y: 0, z: 0 }
};

export const DECK_POSITION: Position = { x: 0, y: 0, z: 2 };

export const DEAL_ANIMATION: Record<string, number> = {
  CARD_SPAWN_DELAY: 0.1,
  DEAL_FLIGHT_DUR: 0.6,
  ARC_HEIGHT: 1.0
};

export const CARD_SIZE = {
  WIDTH: 1.5,
  HEIGHT: 2,
  DEPTH: 0.52
};
