import { useTexture } from "@react-three/drei";
import type { CardType } from "../types/CardType";
import {
  CARD_SIZE,
  DEAL_ANIMATION,
  DECK_POSITION,
} from "../constants/gameConfig";
import { SRGBColorSpace } from "three";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import { calculateHandPositions } from "../utils/cardPositions";
import { DealCard } from "../animations/dealCard";

interface CardProps {
  card: CardType;
  shouldDeal?: boolean;
}

export const Card = ({ card, shouldDeal = false }: CardProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const cardFront = useTexture(`/src/assets/game/${card.id}.png`);
  const cardBack = useTexture(`/src/assets/game/game-card-back.png`);

  cardFront.colorSpace = SRGBColorSpace;
  cardBack.colorSpace = SRGBColorSpace;

  useEffect(() => {
    if (shouldDeal && meshRef.current) {
      meshRef.current.position.set(
        DECK_POSITION.x,
        DECK_POSITION.y,
        DECK_POSITION.z,
      );

      if (shouldDeal && meshRef.current)
        console.log("Animation starting for:", card.id);

      const targetPosition = calculateHandPositions(
        card.owner,
        card.cardIndex || 0,
      );

      const cardDeckIndex = (card.cardIndex || 0) * 4 + (card.owner - 1);
      const delay = cardDeckIndex * DEAL_ANIMATION.CARD_SPAWN_DELAY;

      DealCard(meshRef.current, DECK_POSITION, targetPosition, delay);
    }
  }, [shouldDeal, card]);

  return (
    <mesh
      ref={meshRef}
      position={[card.position.x, card.position.y, card.position.z]}
      rotation={[card.rotation.x, card.rotation.y, card.rotation.z]}
    >
      <planeGeometry args={[CARD_SIZE.WIDTH, CARD_SIZE.HEIGHT]} />
      <meshBasicMaterial
        map={card.isFlipped ? cardBack : cardFront}
        transparent={true}
        alphaTest={0.5}
        color="#a6a6a6"
      />
    </mesh>
  );
};
