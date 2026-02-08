import { Canvas } from "@react-three/fiber";
import tableCover from "../../../assets/TableCover.png";
import { Deck } from "./Deck";
import { Card } from "./Card";
import { calculateHandPositions, calculateScreenPosition } from "../utils/calculatePositions";
import { useState } from "react";
import type { CardType } from "../types/CardType";
import { shuffleDeck } from "../utils/shuffleDeck";
import { Button } from "@/shared/components";
import {
  GAME_PHASES,
  type GamePhase,
  PLAYER_ROTATION,
} from "../constants/gameConfig";

export const GameTable = () => {
  const [cardDeck, setCardDeck] = useState<CardType[]>([]);
  const [isDealing, setDealing] = useState(false);
  const [gamePhase, setGamePhase] = useState<GamePhase>(GAME_PHASES.WAITING);

  const handleDeal = () => {
    if (isDealing) return;

    setDealing(true);
    setGamePhase(GAME_PHASES.DEALING);
    const deck = shuffleDeck();

    const fullDeck = deck.map((card, index) => {
      const playerId = ((index % 4) + 1) as 1 | 2 | 3 | 4;
      const cardIndex = Math.floor(index / 4);
      const screenPosition = calculateScreenPosition(1);
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

  const handleDealComplete = () => {
    setGamePhase(GAME_PHASES.PLAYING);
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
      {gamePhase === GAME_PHASES.WAITING && (
        <Button
          onClick={handleDeal}
          variant="primary"
          glow="primary"
          size="medium"
        >
          Deal Test!
        </Button>
      )}
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={-5} />
        <pointLight position={[0, 10, 10]} intensity={0} />
        {gamePhase === GAME_PHASES.DEALING && <Deck />}
        {cardDeck.map((card) => {
          const cardDeckIndex = (card.cardIndex || 0) * 4 + (card.owner - 1);
          const isLastCard = cardDeckIndex === 50;

          return (
            <Card
              key={card.id}
              card={card}
              shouldDeal={gamePhase === GAME_PHASES.DEALING}
              onAnimationComplete={isLastCard ? handleDealComplete : undefined}
            />
          );
        })}
      </Canvas>
    </div>
  );
};
