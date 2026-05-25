"use client";

import { Float, MeshDistortMaterial, Trail } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import { useMemo, useRef } from "react";
import type { Group, Mesh, Points } from "three";

function seededSpread(index: number, salt: number) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function CoreShape() {
  const meshRef = useRef<Mesh>(null);
  const reducedMotion = useReducedMotion();

  useFrame((state, delta) => {
    if (!meshRef.current || reducedMotion) return;
    meshRef.current.rotation.x += delta * 0.18;
    meshRef.current.rotation.y += delta * 0.28;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
  });

  return (
    <Float speed={reducedMotion ? 0 : 1.4} rotationIntensity={0.35} floatIntensity={0.55}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.65, 4]} />
        <MeshDistortMaterial
          color="#f7f0df"
          distort={reducedMotion ? 0.06 : 0.2}
          emissive="#36e3b4"
          emissiveIntensity={0.24}
          metalness={0.42}
          roughness={0.34}
        />
      </mesh>
    </Float>
  );
}

function OrbitingSignals() {
  const groupRef = useRef<Group>(null);
  const reducedMotion = useReducedMotion();

  useFrame((_, delta) => {
    if (!groupRef.current || reducedMotion) return;
    groupRef.current.rotation.z += delta * 0.2;
    groupRef.current.rotation.y += delta * 0.14;
  });

  const signals = [
    { color: "#50c8ff", position: [2.45, 0.1, 0] },
    { color: "#ff6b78", position: [-2.2, -0.35, 0.2] },
    { color: "#f6c85f", position: [0.35, 2.05, -0.2] },
    { color: "#9df27f", position: [-0.5, -2.05, 0.15] },
    { color: "#ffffff", position: [1.65, -1.35, 0.25] },
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
      <mesh rotation={[Math.PI / 1.85, 0.65, -0.25]}>
        <torusGeometry args={[3.18, 0.006, 16, 180]} />
        <meshBasicMaterial color="#f6c85f" transparent opacity={0.18} />
      </mesh>
      {signals.map((signal) => (
        <Trail attenuation={(width) => width * width} color={signal.color} key={signal.color} length={reducedMotion ? 0 : 4} width={0.08}>
          <mesh position={signal.position}>
            <sphereGeometry args={[0.105, 24, 24]} />
            <meshStandardMaterial color={signal.color} emissive={signal.color} emissiveIntensity={0.7} />
          </mesh>
        </Trail>
      ))}
    </group>
  );
}

function SignalField() {
  const pointsRef = useRef<Points>(null);
  const reducedMotion = useReducedMotion();
  const positions = useMemo(() => {
    const values = new Float32Array(72);
    for (let index = 0; index < values.length; index += 3) {
      values[index] = (seededSpread(index, 1) - 0.5) * 7;
      values[index + 1] = (seededSpread(index, 2) - 0.5) * 4.8;
      values[index + 2] = (seededSpread(index, 3) - 0.5) * 2.8;
    }
    return values;
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current || reducedMotion) return;
    pointsRef.current.rotation.y += delta * 0.035;
    pointsRef.current.rotation.x += delta * 0.015;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.035} sizeAttenuation transparent opacity={0.58} />
    </points>
  );
}

function SceneRig() {
  const groupRef = useRef<Group>(null);
  const reducedMotion = useReducedMotion();

  useFrame((state) => {
    if (!groupRef.current || reducedMotion) return;
    groupRef.current.rotation.x += (state.pointer.y * 0.12 - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.y += (state.pointer.x * 0.18 - groupRef.current.rotation.y) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <SignalField />
      <CoreShape />
      <OrbitingSignals />
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      aria-hidden="true"
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.72} />
      <directionalLight position={[4, 4, 5]} intensity={2.3} color="#ffffff" />
      <pointLight position={[-4, -2, 4]} intensity={1.8} color="#50c8ff" />
      <pointLight position={[3, -3, 3]} intensity={1.1} color="#f6c85f" />
      <SceneRig />
    </Canvas>
  );
}
