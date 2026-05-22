"use client";

import { Float, MeshDistortMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group, Mesh } from "three";

function CoreShape() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.18;
    meshRef.current.rotation.y += delta * 0.28;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.55}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.65, 3]} />
        <MeshDistortMaterial
          color="#f7f0df"
          distort={0.18}
          emissive="#36e3b4"
          emissiveIntensity={0.22}
          metalness={0.35}
          roughness={0.38}
        />
      </mesh>
    </Float>
  );
}

function OrbitingSignals() {
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z += delta * 0.18;
    groupRef.current.rotation.y += delta * 0.12;
  });

  const signals = [
    { color: "#50c8ff", position: [2.45, 0.1, 0] },
    { color: "#ff6b78", position: [-2.2, -0.35, 0.2] },
    { color: "#f6c85f", position: [0.35, 2.05, -0.2] },
    { color: "#9df27f", position: [-0.5, -2.05, 0.15] },
  ] as const;

  return (
    <group ref={groupRef}>
      <mesh rotation={[Math.PI / 2.6, 0.35, 0.2]}>
        <torusGeometry args={[2.25, 0.012, 16, 160]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.32} />
      </mesh>
      <mesh rotation={[Math.PI / 2.1, -0.45, 0.55]}>
        <torusGeometry args={[2.78, 0.008, 16, 160]} />
        <meshBasicMaterial color="#36e3b4" transparent opacity={0.25} />
      </mesh>
      {signals.map((signal) => (
        <mesh key={signal.color} position={signal.position}>
          <sphereGeometry args={[0.105, 24, 24]} />
          <meshStandardMaterial color={signal.color} emissive={signal.color} emissiveIntensity={0.65} />
        </mesh>
      ))}
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      aria-hidden="true"
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 4, 5]} intensity={2.2} color="#ffffff" />
      <pointLight position={[-4, -2, 4]} intensity={1.7} color="#50c8ff" />
      <CoreShape />
      <OrbitingSignals />
    </Canvas>
  );
}
