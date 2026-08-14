import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Sparkles } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/* ---------- easing + timeline helpers ---------- */

const CYCLE = 18; // seconds per full cinematic loop

const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const clamp01 = (t: number) => Math.min(1, Math.max(0, t));

/** progress of a segment [start,end] within the loop */
const seg = (t: number, start: number, end: number) => clamp01((t - start) / (end - start));

/* ---------- petal ---------- */

function Petal({
  angle,
  radius,
  tilt,
  color,
  scale,
  delay,
  progressRef,
}: {
  angle: number;
  radius: number;
  tilt: number;
  color: string;
  scale: number;
  delay: number;
  progressRef: React.MutableRefObject<number>;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.42, 0.2, 0.5, 0.95, 0, 1.6);
    shape.bezierCurveTo(-0.5, 0.95, -0.42, 0.2, 0, 0);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.025,
      bevelEnabled: true,
      bevelSize: 0.035,
      bevelThickness: 0.025,
      bevelSegments: 6,
      curveSegments: 32,
    });
    geo.center();
    return geo;
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    // unfurl: 0 = closed bud, 1 = fully open
    const open = easeOut(clamp01((progressRef.current - delay) / (1 - delay * 0.6)));
    const breathe = Math.sin(state.clock.elapsedTime * 0.9 + delay * 6) * 0.035;
    mesh.current.rotation.x = -0.35 + (tilt + 0.35) * open + breathe;
    mesh.current.position.y = 0.35 - (1 - open) * 0.12;
    mesh.current.position.z = radius * (0.35 + 0.65 * open);
    mesh.current.scale.setScalar(scale * (0.55 + 0.45 * open));
  });

  return (
    <group rotation={[0, angle, 0]}>
      <mesh ref={mesh} geometry={geometry} position={[0, 0.35, radius]} castShadow>
        <meshPhysicalMaterial
          color={color}
          roughness={0.32}
          clearcoat={0.7}
          clearcoatRoughness={0.35}
          sheen={1}
          sheenColor="#fff6e0"
          transmission={0.06}
          thickness={0.4}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

/* ---------- bloom ---------- */

const RINGS = [
  { count: 11, radius: 0.72, tilt: 0.8, scale: 0.95, color: "#ffffff", delay: 0.34 },
  { count: 9, radius: 0.5, tilt: 0.6, scale: 0.78, color: "#fdf8ec", delay: 0.22 },
  { count: 7, radius: 0.32, tilt: 0.35, scale: 0.56, color: "#f7f0dc", delay: 0.12 },
  { count: 5, radius: 0.16, tilt: 0.12, scale: 0.36, color: "#f3ead0", delay: 0.04 },
];

function Bloom({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.16;
      group.current.position.y = -0.25 + Math.sin(t * 0.7) * 0.06;
      group.current.rotation.z = Math.sin(t * 0.45) * 0.03;
    }
    if (core.current) {
      const s = 0.55 + 0.45 * easeOut(progressRef.current);
      core.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={group} position={[0, -0.25, 0]}>
      {RINGS.map((ring, ri) =>
        Array.from({ length: ring.count }).map((_, i) => (
          <Petal
            key={`${ri}-${i}`}
            angle={(i / ring.count) * Math.PI * 2 + ri * 0.5}
            radius={ring.radius}
            tilt={ring.tilt}
            scale={ring.scale}
            color={ring.color}
            delay={ring.delay + (i / ring.count) * 0.06}
            progressRef={progressRef}
          />
        )),
      )}
      <mesh ref={core} position={[0, 0.42, 0]} castShadow>
        <sphereGeometry args={[0.26, 32, 32]} />
        <meshStandardMaterial
          color="#e0b055"
          roughness={0.5}
          emissive="#8a5c12"
          emissiveIntensity={0.35}
        />
      </mesh>
    </group>
  );
}

/* ---------- foliage + vessel ---------- */

function Leaf({ angle, y, scale }: { angle: number; y: number; scale: [number, number, number] }) {
  const mesh = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8 + angle) * 0.09;
    }
  });
  return (
    <group rotation={[0, angle, 0]}>
      <mesh
        ref={mesh}
        position={[0, y, 0.55]}
        rotation={[Math.PI / 2.2, 0, 0]}
        scale={scale}
        castShadow
      >
        <sphereGeometry args={[0.34, 24, 24]} />
        <meshStandardMaterial color="#3f7a4d" roughness={0.55} />
      </mesh>
    </group>
  );
}

function Arrangement({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const root = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (root.current) {
      root.current.position.y = -0.25 + Math.sin(state.clock.elapsedTime * 0.55) * 0.08;
    }
  });

  return (
    <group ref={root} position={[0, -0.25, 0]}>
      <Bloom progressRef={progressRef} />
      {[0, 1, 2, 3, 4].map((i) => (
        <Leaf key={i} angle={(i / 5) * Math.PI * 2} y={-1.05} scale={[1.1, 0.35, 0.6]} />
      ))}
      <mesh position={[0, -1.2, 0]} castShadow>
        <cylinderGeometry args={[0.055, 0.07, 1.5, 16]} />
        <meshStandardMaterial color="#4a7c4f" roughness={0.7} />
      </mesh>
      <mesh position={[0, -1.95, 0]} castShadow receiveShadow>
        <latheGeometry
          args={[
            [
              new THREE.Vector2(0.02, -0.5),
              new THREE.Vector2(0.5, -0.5),
              new THREE.Vector2(0.62, -0.1),
              new THREE.Vector2(0.5, 0.32),
              new THREE.Vector2(0.42, 0.42),
              new THREE.Vector2(0.4, 0.4),
              new THREE.Vector2(0.48, 0.3),
              new THREE.Vector2(0.58, -0.1),
              new THREE.Vector2(0.46, -0.46),
              new THREE.Vector2(0.02, -0.46),
            ],
            48,
          ]}
        />
        <meshPhysicalMaterial
          color="#f4f1e6"
          roughness={0.12}
          metalness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>
      <Sparkles count={40} scale={[4, 4, 4]} size={2.4} speed={0.3} color="#ffe9b8" opacity={0.7} />
      <ContactShadows
        position={[0, -2.6, 0]}
        opacity={0.45}
        scale={9}
        blur={2.6}
        far={5}
        color="#0d2b1c"
      />
    </group>
  );
}

/* ---------- scripted camera "film" ---------- */

function CameraRig({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const { camera } = useThree();
  const target = useMemo(() => new THREE.Vector3(0, -0.35, 0), []);

  useFrame((state) => {
    const t = (state.clock.elapsedTime % CYCLE) / CYCLE;

    // bloom-open progress drives the petals
    progressRef.current = easeInOut(seg(t, 0.02, 0.42));

    // shot 1: slow push-in from a low angle
    // shot 2: rising arc around the bloom
    // shot 3: pull back to the full arrangement
    const push = easeInOut(seg(t, 0, 0.35));
    const arc = easeInOut(seg(t, 0.35, 0.72));
    const pull = easeInOut(seg(t, 0.72, 1));

    const dist = 6.6 - 1.9 * push + 0.25 * arc + 1.6 * pull;
    const height = 0.6 + 1.5 * push + 0.9 * arc - 0.9 * pull;
    const orbit = -0.5 + 0.45 * push + 1.5 * arc + 0.55 * pull;

    const sway = Math.sin(state.clock.elapsedTime * 0.35) * 0.06;

    camera.position.set(
      Math.sin(orbit + sway) * dist,
      height + Math.sin(state.clock.elapsedTime * 0.5) * 0.08,
      Math.cos(orbit + sway) * dist,
    );
    target.set(0, -0.45 + 0.35 * push - 0.2 * pull, 0);
    camera.lookAt(target);
  });

  return null;
}

/* ---------- scene ---------- */

export default function FloralScene() {
  const progressRef = useRef(0);

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 1.9, 6.6], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[4, 6, 4]}
        intensity={2.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-5, 2, -3]} intensity={0.85} color="#ffd89b" />
      <pointLight position={[0, -2, 3]} intensity={12} color="#9ce0b5" distance={9} />
      <Environment preset="studio" environmentIntensity={0.35} />
      <Arrangement progressRef={progressRef} />
      <CameraRig progressRef={progressRef} />
    </Canvas>
  );
}
