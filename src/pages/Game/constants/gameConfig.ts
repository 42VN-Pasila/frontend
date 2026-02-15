import type { Position } from '../types/CardType';

export const PLAYER_POSITIONS: Record<number, Position> = {
  1: { x: 0, y: -6, z: 0 },
  2: { x: 12, y: 0, z: 0 },
  3: { x: 0, y: 6, z: 0 },
  4: { x: -12, y: 0, z: 0 }
};

export const DECK_POSITION: Position = { x: 0, y: 0, z: 2 };

export const DEAL_ANIMATION: Record<string, number> = {
  REVEAL_DELAY: 200,
  DEAL_FLIGHT_DUR: 0.6,
  ARC_HEIGHT: 1.0
};

export const CARD_SIZE = {
  WIDTH: 0.85,
  HEIGHT: 1.25,
  DEPTH: 0.52
};

export const PLAYER_ROTATION = {
  1: { x: 0, y: 0, z: 0 },
  2: { x: 0, y: 0, z: Math.PI / 2 },
  3: { x: 0, y: 0, z: 0 },
  4: { x: 0, y: 0, z: -Math.PI / 2 }
};

export const GAME_PHASES = {
  WAITING: 'WAITING',
  DEALING: 'DEALING',
  PLAYING: 'PLAYING',
  FINISHED: 'FINISHED'
} as const;

export type GamePhase = typeof GAME_PHASES[keyof typeof GAME_PHASES];