"use client";

// LensVerse — HeroScene (Three.js)
// Renders floating DSLR camera body, rotating lens ring, dynamic light rays,
// floating image frames, interactive mouse parallax, and particle system
// Loaded via dynamic import with Suspense to keep bundle size low

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Torus, Box, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// ─── useMouse3DParallax ───────────────────────────────────────────────────────
// Returns a ref that tracks normalised mouse position [-1, 1] on both axes
function useMouse3DParallax() {
  const mouse = useRef({ x: 0, y: 0 });

  if (typeof window !== "undefined") {
    window.onmousemove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth)  * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
  }

  return mouse;
}

// ─── CameraBody ───────────────────────────────────────────────────────────────
// Abstract DSLR camera body built from Box geometries
function CameraBody({ mouseRef }: { mouseRef: React.MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    // Subtle mouse parallax rotation
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouseRef.current.x * 0.4,
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -mouseRef.current.y * 0.2,
      0.05
    );
    // Gentle bob
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.08;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Camera body */}
      <mesh castShadow>
        <boxGeometry args={[1.4, 1, 0.7]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Viewfinder hump */}
      <mesh position={[0.2, 0.6, 0]}>
        <boxGeometry args={[0.5, 0.3, 0.65]} />
        <meshStandardMaterial color="#111" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Lens barrel */}
      <mesh position={[0, 0, 0.55]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.35, 0.5, 32]} />
        <meshStandardMaterial color="#222" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Lens glass */}
      <mesh position={[0, 0, 0.82]}>
        <circleGeometry args={[0.25, 32]} />
        <meshStandardMaterial
          color="#7ba8a8"
          metalness={0.1}
          roughness={0}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Gold accent ring around lens */}
      <mesh position={[0, 0, 0.78]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.28, 0.025, 16, 64]} />
        <meshStandardMaterial color="#d4a574" metalness={1} roughness={0.1} />
      </mesh>
    </group>
  );
}

// ─── RotatingLensRing ─────────────────────────────────────────────────────────
// Large slowly rotating torus in gold accent color
function RotatingLensRing() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.z = state.clock.elapsedTime * 0.3;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -0.2]}>
      <torusGeometry args={[1.6, 0.03, 16, 100]} />
      <meshStandardMaterial
        color="#d4a574"
        metalness={1}
        roughness={0.05}
        emissive="#d4a574"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

// ─── FloatingFrame ────────────────────────────────────────────────────────────
// A thin rectangular frame representing a photo — floats at given position
function FloatingFrame({
  position,
  rotation,
  color = "#d4a574",
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  color?: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 0.7 + position[0]) * 0.06;
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <boxGeometry args={[0.6, 0.45, 0.015]} />
      <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
    </mesh>
  );
}

// ─── ParticleField ────────────────────────────────────────────────────────────
// Generates a cloud of small drifting gold particles
function ParticleField() {
  const count = 120;
  const meshRef = useRef<THREE.Points>(null);

  // Generate random particle positions once
  const positions = useMemo(() => {
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      array[i * 3]     = (Math.random() - 0.5) * 8;
      array[i * 3 + 1] = (Math.random() - 0.5) * 6;
      array[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return array;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.04;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#d4a574"
        size={0.025}
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  );
}

// ─── LightRays ────────────────────────────────────────────────────────────────
// Dynamic light sources that shift position over time
function LightRays() {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!lightRef.current) return;
    lightRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 3;
    lightRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.3) * 2;
    lightRef.current.intensity  = 1.5 + Math.sin(state.clock.elapsedTime) * 0.3;
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <pointLight ref={lightRef} color="#d4a574" intensity={1.5} distance={8} />
      <pointLight position={[-3, -2, 2]} color="#7ba8a8" intensity={0.6} distance={6} />
    </>
  );
}

// ─── SceneContents ────────────────────────────────────────────────────────────
// Groups all scene elements — rendered inside Canvas
function SceneContents() {
  const mouseRef = useMouse3DParallax();

  return (
    <>
      <LightRays />
      <ParticleField />

      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
        <CameraBody mouseRef={mouseRef} />
      </Float>

      <RotatingLensRing />

      {/* Floating photo frames scattered around */}
      <FloatingFrame position={[-2.2, 0.8,  -0.5]} rotation={[0.1, 0.3, -0.1]} />
      <FloatingFrame position={[ 2.4, -0.4, -1.0]} rotation={[-0.1, -0.4, 0.05]} color="#7ba8a8" />
      <FloatingFrame position={[-1.8, -1.2, -0.8]} rotation={[0.2, 0.2, 0.15]} color="#888" />
      <FloatingFrame position={[ 1.6, 1.4,  -1.2]} rotation={[-0.15, -0.2, -0.1]} />
    </>
  );
}

// ─── HeroScene ────────────────────────────────────────────────────────────────
// The R3F Canvas wrapper — exported and lazy-loaded from HeroSection
export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 50 }}
      dpr={[1, 2]}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
    >
      <SceneContents />
    </Canvas>
  );
}
