import { Canvas } from "@react-three/fiber";
import tableCover from "../../../assets/TableCover.png";
import { Deck } from "./Deck";
import { Card } from "./Card";
import { calculateHandPositions } from "../utils/cardPositions";
import { useState } from "react";
import type { CardType } from "../types/CardType";
import { shuffleDeck } from "../utils/shuffleDeck";
import { Button } from "@/shared/components";
import { PLAYER_ROTATION } from "../constants/gameConfig";

export const GameTable = () => {
  const [cardDeck, setCardDeck] = useState<CardType[]>([]);
  const [isDealing, setDealing] = useState(false);

  const handleDeal = () => {
    if (isDealing) return;

    setDealing(true);
    const deck = shuffleDeck();

    const fullDeck = deck.map((card, index) => {
      const playerId = ((index % 4) + 1) as  1 | 2 | 3 | 4;
      const cardIndex = Math.floor(index / 4);
      const position = calculateHandPositions(playerId, cardIndex);

      return {
        ...card,
        owner: playerId,
        cardIndex: cardIndex,
        position: position,
        rotation: PLAYER_ROTATION[playerId],
        inDeck: true,
      };
    });

    setCardDeck(fullDeck);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundImage: `url(${tableCover})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {!isDealing && (
        <Button
          onClick={handleDeal}
          variant="primary"
          glow="primary"
          size="medium"
        >
          Deal Test!
          {isDealing ? "Dealing..." : "DealCards"}
        </Button>
      )}
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={-5} />
        <pointLight position={[0, 10, 10]} intensity={0} />
        {isDealing && <Deck />}
        {cardDeck.map((card) => (
          <Card key={card.id} card={card} shouldDeal={isDealing} />
        ))}
      </Canvas>
    </div>
  );
};
