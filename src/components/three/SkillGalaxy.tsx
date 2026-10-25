"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { skills } from "@/lib/data";

type Skill = (typeof skills)[number];

function placeOnGalaxy(i: number, total: number) {
  // Two loose spiral arms so the cluster reads as a galaxy, not a ring.
  const arm = i % 2 === 0 ? 0 : Math.PI;
  const t = i / total;
  const radius = 1.4 + t * 4.6;
  const angle = arm + t * Math.PI * 3.2;
  const y = (Math.random() - 0.5) * 1.4;
  return new THREE.Vector3(
    Math.cos(angle) * radius,
    y,
    Math.sin(angle) * radius
  );
}

function Star({
  skill,
  position,
  active,
  onHover,
}: {
  skill: Skill;
  position: THREE.Vector3;
  active: boolean;
  onHover: (s: Skill | null) => void;
}) {
  const ref = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!ref.current) return;
    const s = hovered || active ? 1.5 : 1;
    ref.current.scale.lerp(new THREE.Vector3(s, s, s), 0.15);
    ref.current.position.y =
      position.y + Math.sin(state.clock.elapsedTime + position.x) * 0.08;
  });

  return (
    <group ref={ref} position={position}>
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          onHover(skill);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          onHover(null);
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshBasicMaterial color={skill.color} toneMapped={false} />
      </mesh>
      {/* glow */}
      <mesh scale={2.4}>
        <sphereGeometry args={[0.16, 16, 16]} />
        <meshBasicMaterial
          color={skill.color}
          transparent
          opacity={hovered || active ? 0.25 : 0.1}
          toneMapped={false}
        />
      </mesh>
      <Html
        center
        distanceFactor={10}
        position={[0, 0.42, 0]}
        style={{ pointerEvents: "none" }}
      >
        <span
          className="select-none whitespace-nowrap font-sans text-[11px] font-medium tracking-wide"
          style={{
            color: hovered || active ? skill.color : "rgba(244,246,255,0.7)",
            textShadow: "0 1px 8px rgba(0,0,0,0.8)",
          }}
        >
          {skill.name}
        </span>
      </Html>
    </group>
  );
}

function GalaxyContent({ onHover }: { onHover: (s: Skill | null) => void }) {
  const group = useRef<THREE.Group>(null!);
  const placements = useMemo(
    () => skills.map((_, i) => placeOnGalaxy(i, skills.length)),
    []
  );
  const [activeName, setActiveName] = useState<string | null>(null);

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.07;
  });

  return (
    <group ref={group}>
      {skills.map((skill, i) => (
        <Star
          key={skill.name}
          skill={skill}
          position={placements[i]}
          active={activeName === skill.name}
          onHover={(s) => {
            setActiveName(s?.name ?? null);
            onHover(s);
          }}
        />
      ))}
      {/* galactic core */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.9} toneMapped={false} />
      </mesh>
      <mesh scale={2.6}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#7c5cff" transparent opacity={0.18} toneMapped={false} />
      </mesh>
    </group>
  );
}

export default function SkillGalaxy({
  onHover,
}: {
  onHover: (s: Skill | null) => void;
}) {
  return (
    <Canvas
      camera={{ position: [0, 3.5, 9], fov: 55 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
    >
      <GalaxyContent onHover={onHover} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={false}
        rotateSpeed={0.5}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.7}
      />
    </Canvas>
  );
}
