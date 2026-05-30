import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, OrbitControls, Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type Point3 = [number, number, number];

function PacketStream() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ mouse, clock }) => {
    if (!group.current) {
      return;
    }
    group.current.rotation.y = mouse.x * 0.25 + clock.getElapsedTime() * 0.08;
    group.current.rotation.x = mouse.y * 0.18;
  });

  const particles = useMemo(() => {
    const points = new Float32Array(900);
    for (let index = 0; index < points.length; index += 3) {
      points[index] = (Math.random() - 0.5) * 12;
      points[index + 1] = (Math.random() - 0.5) * 8;
      points[index + 2] = (Math.random() - 0.5) * 8;
    }
    return points;
  }, []);

  const pipelineCurves: Point3[][] = [
    [
      [-3, -1.2, 0],
      [-1.5, -0.3, 0.8],
      [0.2, 0.3, -0.2],
      [2.8, 1.4, 0.9],
    ],
    [
      [-2.6, 1.5, -1.1],
      [-0.8, 0.4, -0.6],
      [1, -0.8, 0.3],
      [3.3, -1.8, 1.1],
    ],
  ];

  return (
    <group ref={group}>
      {pipelineCurves.map((curve, index) => (
        <Line
          key={index}
          points={curve}
          color={index === 0 ? "#6EE7F9" : "#FF8C6B"}
          lineWidth={1.5}
          transparent
          opacity={0.8}
        />
      ))}

      {([
        [-2.8, 1.1, 0.4],
        [-0.8, -0.5, -1.2],
        [1.4, 0.7, 0.9],
        [3, -1.3, -0.3],
      ] as Point3[]).map(
        (position, index) => (
          <Float key={index} speed={1.4 + index * 0.2} rotationIntensity={0.8} floatIntensity={1.2}>
            <mesh position={new THREE.Vector3(...position)}>
              <boxGeometry args={[0.7, 0.7, 0.7]} />
              <meshStandardMaterial
                color={index % 2 === 0 ? "#8A7DFF" : "#6EE7F9"}
                emissive={index % 2 === 0 ? "#2A1E80" : "#0A7485"}
                roughness={0.15}
                metalness={0.6}
              />
            </mesh>
          </Float>
        ),
      )}

      <mesh position={[0, 0.2, -1.5]}>
        <torusKnotGeometry args={[1.2, 0.22, 160, 18]} />
        <meshStandardMaterial color="#D8F570" emissive="#465700" roughness={0.22} />
      </mesh>

      <Points positions={particles} stride={3} frustumCulled>
        <PointMaterial transparent color="#d8e8ff" size={0.035} sizeAttenuation depthWrite={false} />
      </Points>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="h-[420px] w-full overflow-hidden rounded-[32px] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(110,231,249,0.16),_transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] shadow-glow md:h-[520px]">
      <Canvas camera={{ position: [0, 0, 7], fov: 48 }} dpr={[1, 1.8]}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={2} color="#c4fbff" />
        <directionalLight position={[-4, -3, 2]} intensity={1.2} color="#ffbba6" />
        <PacketStream />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.35} />
      </Canvas>
    </div>
  );
}
