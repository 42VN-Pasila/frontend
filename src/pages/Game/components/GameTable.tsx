import { Canvas } from "@react-three/fiber";

export const GameTable = () => {
  return (
    <main style={{ width: "100vw", height: "100vh" }}>
      <Canvas camera={{ position: [0, -8, 10], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 10, 10]} intensity={1} />

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -0.1]}>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#0B5E3A" />
        </mesh>
      </Canvas>
    </main>
  );
};
