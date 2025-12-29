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

function CinematicLightPool({
  y = -4.8,
  radius = 6.6,
}: {
  y?: number;
  radius?: number;
}) {
  const matRef = useRef<THREE.MeshBasicMaterial | null>(null);

  const texture = React.useMemo(() => {
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");
    if (!ctx) return new THREE.Texture();

    const cx = size / 2;
    const cy = size / 2;

    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, size / 2);
    grad.addColorStop(0.0, "rgba(255, 240, 214, 1.0)");
    grad.addColorStop(0.15, "rgba(255, 240, 214, 0.65)");
    grad.addColorStop(0.35, "rgba(255, 240, 214, 0.22)");
    grad.addColorStop(1.0, "rgba(255, 240, 214, 0.0)");

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = false;
    return tex;
  }, []);

  useFrame(({ clock }) => {
    if (!matRef.current) return;
    const t = clock.getElapsedTime();
    matRef.current.opacity = 0.4 * (0.9 + 0.1 * Math.sin(t * 0.8));
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, y, 0]} renderOrder={-1}>
      <planeGeometry args={[radius * 2, radius * 2]} />
      <meshBasicMaterial
        ref={matRef}
        map={texture}
        transparent
        opacity={0.45}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
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
      angle={0.5}
      distance={80}
      decay={0.3}
      castShadow
      shadow-mapSize-width={2048}
      shadow-mapSize-height={2048}
      shadow-bias={-0.0002}
      color="#fff0d6"
    />
  );
}

const ContactExperience: React.FC = () => {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  useEffect(() => {
    if (!controlsRef.current) return;
    controlsRef.current.target.set(0, 0, 0);
    controlsRef.current.update();
  }, []);

  return (
    <Canvas shadows>
      <PerspectiveCamera makeDefault position={[0, 0, 14.5]} fov={45} />

      <ambientLight intensity={0.05} />
      {/* <directionalLight position={[3, 4, 5]} intensity={2.0} castShadow /> */}
      <CinematicFlickerLight />
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
      <Center>
        <group position={[0, 0, 0]}>
          {" "}
          <AutoRotateCard />
          <CinematicLightPool y={-4.8} radius={5.6} />
        </group>
      </Center>
    </Canvas>
  );
};

export default ContactExperience;
