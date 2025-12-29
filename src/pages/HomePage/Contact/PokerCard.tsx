import React, { useLayoutEffect } from "react";
import { useGLTF } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import * as THREE from "three";
import type { GLTF } from "three-stdlib";

import pokerCardUrl from "./pokerCard-transformed.glb?url";

type GLTFResult = GLTF & { scene: THREE.Group };
type GroupProps = ThreeElements["group"];

export function PokerCard(props: GroupProps) {
  const { scene } = useGLTF(pokerCardUrl) as unknown as GLTFResult;

  useLayoutEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.sub(center);
  }, [scene]);

  return (
    <group {...props}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(pokerCardUrl);
