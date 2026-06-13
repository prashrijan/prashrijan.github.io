"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useExperience } from "@/lib/store";

/** Per-chapter mood: where the camera drifts and what colour the dust glows. */
const MOODS: Record<number, { color: string; drift: number; density: number }> = {
  1: { color: "#6c7bff", drift: 0.02, density: 0.9 },
  2: { color: "#ff9a5c", drift: 0.05, density: 1.0 },
  3: { color: "#38e1ff", drift: 0.12, density: 1.2 },
  4: { color: "#7c5cff", drift: 0.08, density: 1.1 },
  5: { color: "#56ffa8", drift: 0.06, density: 1.0 },
  6: { color: "#c08cff", drift: 0.1, density: 1.15 },
  7: { color: "#ffd27c", drift: 0.03, density: 0.95 },
};

function Stars({ count = 5200 }: { count?: number }) {
  const points = useRef<THREE.Points>(null!);
  const mat = useRef<THREE.PointsMaterial>(null!);
  const chapter = useExperience((s) => s.chapter);
  const theme = useExperience((s) => s.theme);
  const target = useRef(new THREE.Color(MOODS[1].color));
  const mouse = useRef({ x: 0, y: 0 });

  const { positions, scales } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Spread points through a deep, slightly flattened sphere shell.
      const r = 6 + Math.random() * 60;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      positions[i * 3 + 2] = r * Math.cos(phi);
      scales[i] = Math.random();
    }
    return { positions, scales };
  }, [count]);

  useEffect(() => {
    const handle = (e: PointerEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", handle);
    return () => window.removeEventListener("pointermove", handle);
  }, []);

  useFrame((state, delta) => {
    const mood = MOODS[chapter] ?? MOODS[1];
    target.current.set(mood.color);
    if (mat.current) {
      mat.current.color.lerp(target.current, delta * 1.5);
      const dayDim = theme === "day" ? 0.35 : 1;
      mat.current.opacity = THREE.MathUtils.lerp(
        mat.current.opacity,
        0.8 * mood.density * dayDim,
        delta * 2
      );
    }
    if (points.current) {
      points.current.rotation.y += delta * (0.01 + mood.drift * 0.4);
      points.current.rotation.x += delta * 0.004;
      // Gentle mouse parallax.
      points.current.position.x = THREE.MathUtils.lerp(
        points.current.position.x,
        mouse.current.x * 1.6,
        delta * 1.2
      );
      points.current.position.y = THREE.MathUtils.lerp(
        points.current.position.y,
        -mouse.current.y * 1.2,
        delta * 1.2
      );
    }
    // Slow camera push tied to chapter for a sense of travel.
    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      24 - chapter * 0.6,
      delta * 0.8
    );
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
      </bufferGeometry>
      <pointsMaterial
        ref={mat}
        transparent
        size={0.14}
        sizeAttenuation
        depthWrite={false}
        opacity={0.8}
        color={MOODS[1].color}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Faint drifting nebula plane for depth behind the stars. */
function Nebula() {
  const mesh = useRef<THREE.Mesh>(null!);
  const chapter = useExperience((s) => s.chapter);
  const target = useRef(new THREE.Color(MOODS[1].color));
  useFrame((_, delta) => {
    const mood = MOODS[chapter] ?? MOODS[1];
    target.current.set(mood.color);
    if (mesh.current) {
      const m = mesh.current.material as THREE.MeshBasicMaterial;
      m.color.lerp(target.current, delta);
      mesh.current.rotation.z += delta * 0.01;
    }
  });
  return (
    <mesh ref={mesh} position={[0, 0, -40]} scale={120}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        color={MOODS[1].color}
        transparent
        opacity={0.06}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function CosmicBackdrop() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Skip WebGL entirely for reduced-motion users; CSS gradient stands in.
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setEnabled(!reduce);
  }, []);

  if (!enabled) {
    return (
      <div
        aria-hidden
        className="fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, #161a3a 0%, #04050a 70%)",
        }}
      />
    );
  }

  return (
    <div className="fixed inset-0 -z-10" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 24], fov: 60 }}
        dpr={[1, 1.8]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop="always"
      >
        <Stars />
        <Nebula />
      </Canvas>
    </div>
  );
}
