import * as THREE from 'three';
import gsap from 'gsap';
import type { CardType, Position } from '../types/CardType';
import { createArcPath } from '../utils/cardPositions';
import { DEAL_ANIMATION } from '../constants/gameConfig';
import { MotionPathPlugin } from 'gsap/src/all';

gsap.registerPlugin(MotionPathPlugin);

export interface CardProp{
  cardData: CardType;
  shouldDeal?: boolean;
}

export function DealCard(
  cardMesh: THREE.Mesh,
  startPosition: Position,
  endPosition: Position,
  delay: number
): gsap.core.Timeline {
  const cardFlightPath = createArcPath(startPosition, endPosition, DEAL_ANIMATION.ARC_HEIGHT);

  const timeline = gsap.timeline({ delay });

  timeline.to(cardMesh.position, {
    duration: DEAL_ANIMATION.DEAL_FLIGHT_DUR,
    motionPath: {
      path: cardFlightPath.map((p) => ({ x: p.x, y: p.y, z: p.z })),
      autoRotate: false
    },
    ease: 'power2.inOut'
  });

  return timeline;
}
