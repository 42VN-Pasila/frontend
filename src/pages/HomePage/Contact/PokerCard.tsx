import { useLayoutEffect } from "react";
import { useGLTF } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import * as THREE from "three";
import type { GLTF } from "three-stdlib";
import pokerCardUrl from "./pokerCard-transformed.glb?url";

type GLTFResult = GLTF & { scene: THREE.Group };
type GroupProps = ThreeElements["group"];

function getCssVar(name: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
}

function stripHexAlpha(color: string): string {
  if (color.startsWith("#") && color.length === 9) {
    return color.slice(0, 7);
  }
  return color;
}

export function PokerCard(props: GroupProps) {
  const { scene } = useGLTF(pokerCardUrl) as unknown as GLTFResult;

  useLayoutEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.sub(center);
    const elementColor = getCssVar("--color-primary");
    const primaryRgbHex = stripHexAlpha(elementColor);
    scene.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return;
      const materials = Array.isArray(obj.material)
        ? obj.material
        : [obj.material];

      materials.forEach((m) => {
        if (!(m instanceof THREE.MeshStandardMaterial)) return;
        if (m.name === "Regular_1") {
          m.color.set(primaryRgbHex);
        }
        if (m.name === "Regular_0") {
          m.color.set("#ffffff");
        }
        m.roughness = 0.5;
        m.metalness = 0.5;
        m.needsUpdate = true;
      });
    });
  }, [scene]);

  return (
    <group {...props}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload(pokerCardUrl);
