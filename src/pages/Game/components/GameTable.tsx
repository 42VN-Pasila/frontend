import { Canvas } from "@react-three/fiber";
import tableCover from "../../../assets/TableCover.png";
import { Deck } from "./Deck";

export const GameTable = () => {
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
      <Canvas camera={{ position: [0, -3, 10], fov: 75 }}>
        <ambientLight intensity={1.0} />
        <pointLight position={[0, 0, 10]} intensity={2} />
        <Deck/>
      </Canvas>
    </div>
  );
};