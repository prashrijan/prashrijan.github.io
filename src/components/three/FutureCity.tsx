"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, Float } from "@react-three/drei";
import * as THREE from "three";

type Building = {
  x: number;
  z: number;
  w: number;
  d: number;
  h: number;
  color: string;
  done: boolean;
};

const PALETTE = ["#7c5cff", "#38e1ff", "#ff8a5c", "#56ffa8", "#c08cff"];

function useCity(): Building[] {
  return useMemo(() => {
    const items: Building[] = [];
    const grid = 6;
    for (let x = -grid; x <= grid; x += 2) {
      for (let z = -grid; z <= grid; z += 2) {
        if (Math.random() < 0.28) continue; // gaps = streets / unbuilt lots
        const h = 0.6 + Math.random() * 4.4;
        items.push({
          x: x + (Math.random() - 0.5) * 0.4,
          z: z + (Math.random() - 0.5) * 0.4,
          w: 0.7 + Math.random() * 0.6,
          d: 0.7 + Math.random() * 0.6,
          h,
          color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
          done: Math.random() > 0.35, // some towers are still scaffolding
        });
      }
    }
    return items;
  }, []);
}

function Tower({ b, i }: { b: Building; i: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    // Unfinished towers "breathe" — perpetual construction.
    if (!b.done) {
      const t = (Math.sin(state.clock.elapsedTime * 0.6 + i) + 1) / 2;
      ref.current.scale.y = 0.35 + t * 0.65;
    }
  });
  return (
    <mesh ref={ref} position={[b.x, b.h / 2, b.z]}>
      <boxGeometry args={[b.w, b.h, b.d]} />
      <meshBasicMaterial
        color={b.color}
        transparent
        opacity={b.done ? 0.08 : 0.04}
        toneMapped={false}
      />
      <Edges
        threshold={15}
        color={b.color}
        scale={1}
        // dashed-feel via lower opacity on unfinished
      />
    </mesh>
  );
}

function CityContent() {
  const city = useCity();
  const group = useRef<THREE.Group>(null!);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.05;
  });
  return (
    <group ref={group} position={[0, -1.2, 0]}>
      {/* ground grid */}
      <gridHelper args={[28, 28, "#2a2f55", "#161a3a"]} position={[0, 0, 0]} />
      {city.map((b, i) => (
        <Tower key={i} b={b} i={i} />
      ))}
      {/* a couple of cranes hinting at construction */}
      {[-4, 5].map((x, i) => (
        <Float key={i} speed={2} floatIntensity={0.4} rotationIntensity={0.2}>
          <group position={[x, 3.4, i === 0 ? -3 : 4]}>
            <mesh>
              <boxGeometry args={[0.05, 6.8, 0.05]} />
              <meshBasicMaterial color="#ff8a5c" toneMapped={false} />
            </mesh>
            <mesh position={[1, 3.2, 0]}>
              <boxGeometry args={[3, 0.05, 0.05]} />
              <meshBasicMaterial color="#ff8a5c" toneMapped={false} />
            </mesh>
          </group>
        </Float>
      ))}
    </group>
  );
}

export default function FutureCity() {
  return (
    <Canvas
      camera={{ position: [0, 4, 12], fov: 50 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
    >
      <CityContent />
    </Canvas>
  );
}
