import { useTexture } from "@react-three/drei";
import cardBackImage from "../../../assets/game/game-card-back.png";
import { CARD_SIZE, DECK_POSITION } from "../constants/gameConfig";

export const Deck = () => {
  const backCard = useTexture(cardBackImage);
  return (
    <mesh position={[DECK_POSITION.x, DECK_POSITION.y, DECK_POSITION.z]}>
      <boxGeometry
        args={[CARD_SIZE.WIDTH, CARD_SIZE.HEIGHT, CARD_SIZE.DEPTH]}
      />
      <meshStandardMaterial map={backCard} />
    </mesh>
  );
};
