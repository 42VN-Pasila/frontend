import { CARD_SIZE, PLAYER_HAND_POSITIONS } from '../constants/gameConfig';
import type { Position } from '../types/CardType';

export function calculateHandPositions(cardIndex: number): Position {
  const basePosition = PLAYER_HAND_POSITIONS;

  const cardWidth = CARD_SIZE.WIDTH;
  const gap = 0.025;
  const cardSpacing = cardWidth + gap;
  let offsetIndex = cardIndex - 6;

  return {
    x: basePosition.x + offsetIndex * cardSpacing,
    y: basePosition.y,
    z: basePosition.z + cardIndex * 0.01
  };
}

export function createArcPath(start: Position, end: Position, arcHeight: number): Position[] {
  const peakX = (start.x + end.x) / 2;
  const peakY = (start.y + end.y) / 2;
  const peakZ = Math.max(start.z, end.z) + arcHeight;

  return [start, { x: peakX, y: peakY, z: peakZ }, end];
}

export function calculateScreenPosition(playerRoomPosition: number): (1|2|3|4)[] {
  const result = [0, 0, 0, 0, 0];
  for (let roomPosition = 1; roomPosition <= 4; roomPosition++) {
    const offset = (roomPosition - playerRoomPosition + 4) % 4;
    result[roomPosition] = offset === 0 ? 1 : offset + 1;
  }
  return result as (1|2|3|4)[];
}
