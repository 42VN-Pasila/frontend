import { Canvas } from "@react-three/fiber";
import tableCover from "../../../assets/TableCover.png";
import { Deck } from "./Deck";
import { Card } from "./Card";
import { calculateHandPositions } from "../utils/cardPositions";

export const GameTable = () => {
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'] as const;
  
  const testCards = ranks.map((rank, index) => {
    const position = calculateHandPositions(1, index);
    
    return {
      id: `${rank}-hearts`,
      suit: 'hearts' as const,
      rank: rank,
      position: position,
      rotation: { x: 0, y: 0, z: 0 },
      owner: 1 as const,
      isFlipped: false,
      inDeck: false
    };
  });

  return (
    <div style={{ 
      width: "100vw", 
      height: "100vh",
      position: "fixed",
      top: 0,
      left: 0,
      backgroundImage: `url(${tableCover})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat"
    }}>
      <Canvas camera={{ position: [0, -4, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 10, 10]} intensity={4} />
        
        <Deck />
        
        {testCards.map(card => (
          <Card key={card.id} {...card} />
        ))}
      </Canvas>
    </div>
  );
};