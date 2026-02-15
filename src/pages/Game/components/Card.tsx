import { useTexture } from "@react-three/drei";
import type { CardType } from "../types/CardType";
import {
  CARD_SIZE,
  DEAL_ANIMATION,
  DECK_POSITION,
} from "../constants/gameConfig";
import { SRGBColorSpace } from "three";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { calculateHandPositions } from "../utils/calculatePositions";
import { DealCard } from "../animations/dealCard";
import { soundManager } from "@/shared/utils/soundManager";

interface CardProps {
  card: CardType;
  shouldDeal?: boolean;
  onAnimationComplete?: () => void;
}

export const Card = ({
  card,
  shouldDeal = false,
  onAnimationComplete,
}: CardProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const cardFront = useTexture(`/src/assets/game/${card.id}.png`);
  const cardBack = useTexture(`/src/assets/game/game-card-back.png`);

  cardFront.colorSpace = SRGBColorSpace;
  cardBack.colorSpace = SRGBColorSpace;

  useEffect(() => {
    if (shouldDeal && meshRef.current) {
      const cardDeckIndex = (card.cardIndex || 0) * 4 + (card.owner - 1);
      const delay = cardDeckIndex * DEAL_ANIMATION.CARD_SPAWN_DELAY;

      setTimeout(() => {
        soundManager.play("/src/assets/sounds/deal-card-sound.mp3", 0.1);
      }, delay * 1000);
      if (cardDeckIndex === 50 && onAnimationComplete) {
        onAnimationComplete();
      }
    }
  }, [shouldDeal, card, onAnimationComplete]);

  if (!shouldDeal) return null;
  if (card.screenPosition != 1) return null;

  return (
    <mesh
      ref={meshRef}
      position={[card.position.x, card.position.y, card.position.z]}
      rotation={[0, 0, 0]}
    >
      <planeGeometry args={[CARD_SIZE.WIDTH, CARD_SIZE.HEIGHT]} />
      <meshBasicMaterial
        map={!isFlipped ? cardBack : cardFront}
        transparent={true}
        alphaTest={0.5}
        color="#a6a6a6"
      />
    </mesh>
  );
};
