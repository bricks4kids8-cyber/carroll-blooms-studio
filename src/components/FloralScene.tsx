import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows, OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Petal({
  angle,
  radius,
  tilt,
  color,
  scale,
}: {
  angle: number;
  radius: number;
  tilt: number;
  color: string;
  scale: number;
}) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.55, 0.15, 0.75, 0.85, 0, 1.5);
    shape.bezierCurveTo(-0.75, 0.85, -0.55, 0.15, 0, 0);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.06,
      bevelEnabled: true,
      bevelSize: 0.06,
      bevelThickness: 0.06,
      bevelSegments: 6,
      curveSegments: 24,
    });
    geo.center();
    return geo;
  }, []);

  return (
    <group rotation={[0, angle, 0]}>
      <mesh
        geometry={geometry}
        position={[0, 0.35, radius]}
        rotation={[tilt, 0, 0]}
        scale={scale}
        castShadow
      >
        <meshPhysicalMaterial
          color={color}
          roughness={0.35}
          clearcoat={0.6}
          clearcoatRoughness={0.4}
          sheen={1}
          sheenColor="#fff6e0"
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function Bloom() {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.elapsedTime * 0.25;
    }
  });

  const rings = [
    { count: 11, radius: 0.72, tilt: 1.15, scale: 0.95, color: "#ffffff" },
    { count: 9, radius: 0.5, tilt: 0.85, scale: 0.78, color: "#fdf8ec" },
    { count: 7, radius: 0.32, tilt: 0.5, scale: 0.56, color: "#f7f0dc" },
    { count: 5, radius: 0.16, tilt: 0.2, scale: 0.36, color: "#f3ead0" },
  ];

  return (
    <group ref={group} position={[0, 0.15, 0]}>
      {rings.map((ring, ri) =>
        Array.from({ length: ring.count }).map((_, i) => (
          <Petal
            key={`${ri}-${i}`}
            angle={(i / ring.count) * Math.PI * 2 + ri * 0.5}
            radius={ring.radius}
            tilt={ring.tilt}
            scale={ring.scale}
            color={ring.color}
          />
        )),
      )}
      <mesh position={[0, 0.42, 0]} castShadow>
        <sphereGeometry args={[0.26, 32, 32]} />
        <meshStandardMaterial color="#e0b055" roughness={0.6} />
      </mesh>
    </group>
  );
}

function Leaf({
  angle,
  y,
  scale,
}: {
  angle: number;
  y: number;
  scale: [number, number, number];
}) {
  return (
    <group rotation={[0, angle, 0]}>
      <mesh position={[0, y, 0.55]} rotation={[Math.PI / 2.2, 0, 0]} scale={scale}>
        <sphereGeometry args={[0.34, 24, 24]} />
        <meshStandardMaterial color="#3f7a4d" roughness={0.55} />
      </mesh>
    </group>
  );
}

function Arrangement() {
  return (
    <group position={[0, -0.6, 0]}>
      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.7}>
        <Bloom />
        {[0, 1, 2, 3, 4].map((i) => (
          <Leaf
            key={i}
            angle={(i / 5) * Math.PI * 2}
            y={-0.5}
            scale={[1.1, 0.35, 0.6]}
          />
        ))}
        <mesh position={[0, -1.15, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.06, 1.2, 16]} />
          <meshStandardMaterial color="#4a7c4f" roughness={0.7} />
        </mesh>
        <mesh position={[0, -2, 0]} castShadow receiveShadow>
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
      </Float>
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

export default function FloralScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 1.1, 5.2], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[4, 6, 4]}
        intensity={2.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-5, 2, -3]} intensity={0.8} color="#ffd89b" />
      <pointLight position={[0, -2, 3]} intensity={12} color="#9ce0b5" distance={9} />
      <Arrangement />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.6}
        minPolarAngle={Math.PI / 3.2}
        maxPolarAngle={Math.PI / 1.9}
      />
    </Canvas>
  );
}
