import { Canvas } from "@react-three/fiber";
import tableCover from "../../../assets/TableCover.png";

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
      <Canvas camera={{ position: [0, -8, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 10, 10]} intensity={1} />
      </Canvas>
    </div>
  );
};