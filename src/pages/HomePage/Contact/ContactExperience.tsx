import React, { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Center, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import type { Group } from "three";
import * as THREE from "three";

import { PokerCard } from "@/pages/HomePage/Contact/PokerCard";

function AutoRotateCard() {
  const ref = useRef<Group | null>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.6;
  });

  return (
    <group ref={ref} scale={0.04}>
      <PokerCard />
    </group>
  );
}

function CinematicFlickerLight() {
  const lightRef = useRef<THREE.SpotLight | null>(null);
  const { scene } = useThree();

  useEffect(() => {
    if (!lightRef.current) return;
    scene.add(lightRef.current.target);
    lightRef.current.target.position.set(0, 0, 0);
    lightRef.current.target.updateMatrixWorld();
  }, [scene]);

  useFrame(({ clock }, delta) => {
    if (!lightRef.current) return;
    const t = clock.getElapsedTime();

    const base = 8;
    const flicker = 0.85 + 0.1 * Math.sin(t * 8.0) + 0.05 * Math.sin(t * 17.0);

    const targetIntensity = base * Math.max(0, flicker);

    const k = 6;
    lightRef.current.intensity = THREE.MathUtils.lerp(
      lightRef.current.intensity,
      targetIntensity,
      1 - Math.exp(-k * delta),
    );
  });
  return (
    <spotLight
      ref={lightRef}
      position={[1, 9, 1.5]}
      angle={0.7}
      distance={80}
      decay={0.3}
      castShadow
      shadow-mapSize-width={1024}
      shadow-mapSize-height={1024}
      shadow-bias={-0.0002}
      color="#fff0d6"
    />
  );
}

const ContactExperience: React.FC = () => {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  return (
    <Canvas shadows>
      <PerspectiveCamera makeDefault position={[0, 0, 14.5]} fov={45} />

      <ambientLight intensity={0.05} />
      <CinematicFlickerLight />
      <OrbitControls
        ref={controlsRef}
        enablePan={true}
        enableZoom={false}
        minPolarAngle={Math.PI / 8}
        maxPolarAngle={Math.PI / 2}
      />
      <Center>
        <AutoRotateCard />
      </Center>
    </Canvas>
  );
};

export default ContactExperience;
