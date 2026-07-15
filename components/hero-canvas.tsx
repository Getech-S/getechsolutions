"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * "The Core" — a slowly revolving futuristic structure:
 * an outer wireframe icosahedron shell, an inner luminous sphere,
 * a tilted particle halo, and subtle mouse parallax.
 */

function CoreStructure() {
  const group = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Mesh>(null);
  const innerShell = useRef<THREE.Mesh>(null);
  const halo = useRef<THREE.Points>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  // Fit the whole structure (halo radius ≈ 2.15) inside the visible
  // canvas on any screen, capped at the desktop scale.
  const fitScale = Math.min(
    0.78,
    (Math.min(viewport.width, viewport.height) * 0.475) / 2.15
  );

  const haloGeometry = useMemo(() => {
    const count = 900;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.0 + (Math.random() - 0.5) * 0.3;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.12;
      positions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  useFrame((state, delta) => {
    pointer.current.x = THREE.MathUtils.lerp(
      pointer.current.x,
      state.pointer.x,
      0.04
    );
    pointer.current.y = THREE.MathUtils.lerp(
      pointer.current.y,
      state.pointer.y,
      0.04
    );

    if (group.current) {
      // Subtle parallax toward the cursor
      group.current.rotation.y = pointer.current.x * 0.35;
      group.current.rotation.x = -pointer.current.y * 0.25;
      // Gentle breathing float
      group.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.6) * 0.12;
    }
    if (shell.current) {
      shell.current.rotation.y += delta * 0.12;
      shell.current.rotation.z += delta * 0.04;
    }
    if (innerShell.current) {
      innerShell.current.rotation.y -= delta * 0.2;
      innerShell.current.rotation.x += delta * 0.08;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.03;
      innerShell.current.scale.setScalar(pulse);
    }
    if (halo.current) {
      halo.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={group} scale={fitScale}>
      {/* Outer wireframe shell */}
      <mesh ref={shell}>
        <icosahedronGeometry args={[1.9, 1]} />
        <meshStandardMaterial
          color="#2B4162"
          emissive="#2B4162"
          emissiveIntensity={0.6}
          wireframe
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Mid geometric lattice */}
      <mesh ref={innerShell}>
        <icosahedronGeometry args={[1.15, 0]} />
        <meshStandardMaterial
          color="#4a6fa5"
          emissive="#4a6fa5"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.15}
          wireframe
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* The focal core — the singular perfect solution */}
      <mesh>
        <sphereGeometry args={[0.3, 48, 48]} />
        <meshStandardMaterial
          color="#e2e8f0"
          emissive="#93b4d8"
          emissiveIntensity={0.9}
          transparent
          opacity={0.85}
          roughness={0.1}
        />
      </mesh>

      {/* Tilted particle halo — the alignment ring */}
      <points
        ref={halo}
        geometry={haloGeometry}
        rotation={[Math.PI / 3.2, 0, Math.PI / 12]}
      >
        <pointsMaterial
          color="#9BA4B2"
          size={0.02}
          sizeAttenuation
          transparent
          opacity={0.75}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

function AmbientParticles() {
  const points = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const count = 350;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 7;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (points.current) points.current.rotation.y += delta * 0.008;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        color="#2B4162"
        size={0.025}
        sizeAttenuation
        transparent
        opacity={0.6}
        depthWrite={false}
      />
    </points>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
    >
      {/* Opaque obsidian background — avoids transparent-canvas compositing bugs */}
      <color attach="background" args={["#020406"]} />
      <ambientLight intensity={0.25} />
      <pointLight position={[6, 4, 6]} intensity={26} color="#7dd3fc" />
      <pointLight position={[-6, -3, 4]} intensity={18} color="#2B4162" />
      <Suspense fallback={null}>
        <CoreStructure />
        <AmbientParticles />
      </Suspense>
    </Canvas>
  );
}
