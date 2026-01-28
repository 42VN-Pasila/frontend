import { CARD_SIZE, PLAYER_POSITIONS } from '../constants/gameConfig';
import type { Position } from '../types/CardType';

export function calculateHandPositions(playerId: number, cardIndex: number): Position {
  const basePosition = PLAYER_POSITIONS[playerId];

  const cardWidth = CARD_SIZE.WIDTH;
  const gap = 0.1;
  const cardSpacing = cardWidth + gap;
  let offsetIndex = cardIndex - 6;

  if (playerId === 3 || playerId === 4) offsetIndex *= -1;

  if (playerId === 1 || playerId === 3) {
    return {
      x: basePosition.x + offsetIndex * cardSpacing,
      y: basePosition.y,
      z: basePosition.z + cardIndex * 0.01
    };
  }
  return {
    x: basePosition.x,
    y: basePosition.y + offsetIndex * cardSpacing,
    z: basePosition.z + cardIndex * 0.01
  };
}

export function createArcPath(start: Position, end: Position, arcHeight: number): Position[] {
  const peakX = (start.x + end.x) / 2;
  const peakY = (start.y + end.y) / 2;
  const peakZ = Math.max(start.z, end.z) + arcHeight;

  return [start, { x: peakX, y: peakY, z: peakZ }, end];
}
