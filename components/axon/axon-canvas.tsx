"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * The Axon wristband — a flattened band, a machined face, and a live
 * ECG trace painted onto the screen through a canvas texture.
 */

function useEcgTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return { canvas, ctx, texture };
  }, []);
}

/** One PQRST complex sampled at phase p (0–1) → vertical offset −1..1 */
function ecgSample(p: number) {
  const spike = (center: number, width: number, height: number) =>
    height * Math.exp(-Math.pow((p - center) / width, 2));
  return (
    spike(0.16, 0.035, 0.18) - // P
    spike(0.3, 0.012, 0.22) + // Q
    spike(0.34, 0.014, 1) - // R
    spike(0.39, 0.016, 0.32) + // S
    spike(0.58, 0.05, 0.3) // T
  );
}

function Wristband() {
  const group = useRef<THREE.Group>(null);
  const rimLight = useRef<THREE.Mesh>(null);
  const dataRing = useRef<THREE.Mesh>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();
  const { ctx, texture } = useEcgTexture();

  const fitScale = Math.min(1, (Math.min(viewport.width, viewport.height) * 0.42) / 1.7);

  // Rising telemetry motes around the band
  const motes = useMemo(() => {
    const items = [];
    for (let i = 0; i < 70; i++) {
      items.push({
        angle: Math.random() * Math.PI * 2,
        radius: 1.5 + Math.random() * 1.4,
        y: (Math.random() - 0.5) * 3,
        speed: 0.14 + Math.random() * 0.3,
        size: 0.012 + Math.random() * 0.022,
      });
    }
    return items;
  }, []);
  const moteGeo = useMemo(() => {
    const positions = new Float32Array(motes.length * 3);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [motes.length]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // —— paint the live ECG screen ——
    const w = 512;
    const h = 256;
    ctx.fillStyle = "#04070d";
    ctx.fillRect(0, 0, w, h);

    // faint measurement grid
    ctx.strokeStyle = "rgba(74,111,165,0.22)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= w; x += 42) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y <= h; y += 42) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // scrolling trace
    const speed = 0.42;
    ctx.lineWidth = 6;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.strokeStyle = "#7dd3fc";
    ctx.shadowColor = "#7dd3fc";
    ctx.shadowBlur = 18;
    ctx.beginPath();
    for (let px = 0; px <= w; px += 2) {
      const phase = ((px / w) * 2 - t * speed) % 1;
      const p = phase < 0 ? phase + 1 : phase;
      const y = h * 0.56 - ecgSample(p) * h * 0.3;
      if (px === 0) ctx.moveTo(px, y);
      else ctx.lineTo(px, y);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // readout
    ctx.fillStyle = "rgba(209,213,219,0.85)";
    ctx.font = "600 30px system-ui, sans-serif";
    ctx.fillText(`${Math.round(68 + Math.sin(t * 0.6) * 3)}`, 20, 44);
    ctx.font = "500 18px system-ui, sans-serif";
    ctx.fillStyle = "rgba(155,164,178,0.7)";
    ctx.fillText("BPM", 62, 44);
    ctx.fillText("SpO₂ 98%", w - 130, 44);
    texture.needsUpdate = true;

    // —— motion ——
    pointer.current.x = THREE.MathUtils.lerp(pointer.current.x, state.pointer.x, 0.045);
    pointer.current.y = THREE.MathUtils.lerp(pointer.current.y, state.pointer.y, 0.045);

    if (group.current) {
      group.current.rotation.y = -0.35 + pointer.current.x * 0.5 + Math.sin(t * 0.25) * 0.12;
      group.current.rotation.x = 0.18 - pointer.current.y * 0.3;
      group.current.position.y = Math.sin(t * 0.7) * 0.09;
    }
    if (rimLight.current) {
      const m = rimLight.current.material as THREE.MeshStandardMaterial;
      m.emissiveIntensity = 1.4 + Math.sin(t * 2.2) * 0.5;
    }
    if (dataRing.current) dataRing.current.rotation.z += delta * 0.35;

    // motes drift upward and recycle
    const pos = moteGeo.attributes.position.array as Float32Array;
    motes.forEach((m, i) => {
      m.y += m.speed * delta;
      if (m.y > 1.7) m.y = -1.7;
      const a = m.angle + t * 0.12;
      pos[i * 3] = Math.cos(a) * m.radius;
      pos[i * 3 + 1] = m.y;
      pos[i * 3 + 2] = Math.sin(a) * m.radius;
    });
    moteGeo.attributes.position.needsUpdate = true;
  });

  return (
    <group ref={group} scale={fitScale} rotation={[0.18, -0.35, 0]}>
      {/* The band — a torus flattened along its axis */}
      <mesh scale={[1, 1, 0.42]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.05, 0.2, 24, 120]} />
        <meshStandardMaterial
          color="#161d2b"
          metalness={0.85}
          roughness={0.38}
        />
      </mesh>

      {/* Inner nordic lining, visible through the band opening */}
      <mesh scale={[1, 1, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.05, 0.15, 20, 100]} />
        <meshStandardMaterial
          color="#2B4162"
          metalness={0.6}
          roughness={0.5}
          emissive="#2B4162"
          emissiveIntensity={0.35}
        />
      </mesh>

      {/* Watch case */}
      <group position={[0, 1.06, 0]}>
        <mesh>
          <boxGeometry args={[1.06, 0.2, 0.86]} />
          <meshStandardMaterial color="#0e1420" metalness={0.9} roughness={0.25} />
        </mesh>

        {/* Glowing rim */}
        <mesh ref={rimLight} position={[0, 0.104, 0]}>
          <boxGeometry args={[1.1, 0.012, 0.9]} />
          <meshStandardMaterial
            color="#4A6FA5"
            emissive="#7dd3fc"
            emissiveIntensity={1.6}
            toneMapped={false}
          />
        </mesh>

        {/* The live screen */}
        <mesh position={[0, 0.113, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.94, 0.74]} />
          <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>

        {/* Side crown */}
        <mesh position={[0.56, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.05, 0.05, 0.1, 24]} />
          <meshStandardMaterial color="#9BA4B2" metalness={1} roughness={0.3} />
        </mesh>
      </group>

      {/* Sensor glow underneath (PPG array) */}
      <mesh position={[0, -1.06, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.2, 32]} />
        <meshBasicMaterial color="#7dd3fc" transparent opacity={0.5} toneMapped={false} />
      </mesh>

      {/* Orbiting data ring */}
      <mesh ref={dataRing} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[1.75, 0.006, 8, 140]} />
        <meshBasicMaterial color="#4A6FA5" transparent opacity={0.55} />
      </mesh>

      {/* Telemetry motes */}
      <points geometry={moteGeo}>
        <pointsMaterial
          color="#7dd3fc"
          size={0.035}
          sizeAttenuation
          transparent
          opacity={0.65}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default function AxonCanvas() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0.1, 5.4], fov: 40 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
    >
      <color attach="background" args={["#020406"]} />
      <ambientLight intensity={0.4} />
      <pointLight position={[4, 5, 5]} intensity={40} color="#7dd3fc" />
      <pointLight position={[-5, -2, 3]} intensity={26} color="#2B4162" />
      <pointLight position={[0, 0, -4]} intensity={16} color="#4A6FA5" />
      <Suspense fallback={null}>
        <Wristband />
      </Suspense>
    </Canvas>
  );
}
