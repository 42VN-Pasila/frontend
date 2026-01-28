import { useTexture } from "@react-three/drei";
import type { CardType } from "../types/CardType";
import { CARD_SIZE } from "../constants/gameConfig";

export const Card = (card: CardType) => {
  const cardFront = useTexture(`/src/assets/game/${card.id}.png`);
  const cardBack = useTexture(`/src/assets/game/game-card-back.png`);

  return (
    <mesh
      position={[card.position.x, card.position.y, card.position.z]}
      rotation={[card.rotation.x, card.rotation.y, card.rotation.z]}
    >
      <planeGeometry args={[CARD_SIZE.WIDTH, CARD_SIZE.HEIGHT]} />
      <meshStandardMaterial map={card.isFlipped ? cardBack : cardFront} />
    </mesh>
  );
};
