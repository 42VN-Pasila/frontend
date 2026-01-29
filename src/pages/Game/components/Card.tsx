import { useTexture } from "@react-three/drei";
import type { CardType } from "../types/CardType";
import { CARD_SIZE } from "../constants/gameConfig";
import { SRGBColorSpace } from "three";

export const Card = (card: CardType) => {
  const cardFront = useTexture(`/src/assets/game/${card.id}.png`);
  const cardBack = useTexture(`/src/assets/game/game-card-back.png`);

  cardFront.colorSpace = SRGBColorSpace;
  cardBack.colorSpace = SRGBColorSpace;

  return (
    <mesh
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
