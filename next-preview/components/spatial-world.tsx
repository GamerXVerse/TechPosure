'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Line } from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const points: [number, number, number][] = [
  [-2.3, 1.3, 0.3], [-1.25, 2.1, -0.8], [-0.1, 1.25, 0.8], [1.35, 2.25, -0.5],
  [2.5, 1.2, 0.6], [-2.7, -0.25, -0.6], [-1.35, -0.4, 0.9], [0, 0, 0],
  [1.45, -0.5, 0.8], [2.8, -0.35, -0.8], [-2.1, -1.8, 0.6], [-0.8, -2.1, -0.5],
  [0.9, -1.8, 0.8], [2.25, -1.9, -0.25], [-3.1, 1.7, -1.3], [3.2, 1.9, -1.3],
  [-3.25, -1.6, -1.3], [3.35, -1.55, -1.3],
];
const edges: [number, number][] = [
  [7, 0], [7, 1], [7, 2], [7, 3], [7, 4], [7, 5], [7, 6], [7, 8], [7, 9],
  [7, 10], [7, 11], [7, 12], [7, 13], [0, 1], [1, 2], [2, 3], [3, 4],
  [5, 6], [8, 9], [10, 11], [11, 12], [12, 13], [14, 0], [15, 4], [16, 10], [17, 13],
];
const countyOutline: [number, number][] = [
  [-2.62, 1.72], [2.55, 1.69], [2.55, -1.75], [1.52, -1.74], [1.52, -2.14],
  [-0.62, -2.12], [-0.62, -2.67], [-1.12, -2.67], [-1.12, -3.23], [-2.07, -3.22],
];
const cities = [
  { name: 'Bentonville', point: [-0.05, 0.34, 0.18], color: '#0a8064' },
  { name: 'Rogers', point: [0.65, -0.2, 0.16], color: '#2f63d8' },
  { name: 'Bella Vista', point: [-0.2, 1.38, 0.16], color: '#2f63d8' },
  { name: 'Pea Ridge', point: [1.08, 1.0, 0.16], color: '#2f63d8' },
  { name: 'Siloam Springs', point: [-1.95, -2.12, 0.16], color: '#2f63d8' },
  { name: 'Lowell', point: [0.67, -1.34, 0.16], color: '#2f63d8' },
] as const;

function Network({ progress }: { progress: React.RefObject<{ value: number }> }) {
  const group = useRef<THREE.Group>(null);
  const instanced = useRef<THREE.InstancedMesh>(null);
  const pulseRefs = useRef<(THREE.Mesh | null)[]>([]);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  useEffect(() => {
    if (!instanced.current) return;
    points.forEach((point, index) => {
      dummy.position.set(...point);
      dummy.scale.setScalar(index === 7 ? 1.65 : index > 13 ? 0.45 : 0.7);
      dummy.updateMatrix();
      instanced.current!.setMatrixAt(index, dummy.matrix);
      instanced.current!.setColorAt(index, new THREE.Color(index === 7 ? '#0b8d71' : index % 3 ? '#4483e4' : '#6fcab0'));
    });
    instanced.current.instanceMatrix.needsUpdate = true;
    if (instanced.current.instanceColor) instanced.current.instanceColor.needsUpdate = true;
  }, [dummy]);
  useFrame(({ clock }, delta) => {
    if (!group.current) return;
    const p = progress.current.value;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, p * 1.45 + clock.elapsedTime * 0.035, 1.4, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -0.12 + p * 0.35, 1.4, delta);
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, p < 0.17 ? 1.85 : 2.8, 1.6, delta);
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, p < 0.35 ? 0 : -0.25, 1.6, delta);
    const targetScale = p > 0.48 && p < 0.84 ? 0.001 : p > 0.4 ? 0.72 : 1;
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, targetScale, 1.6, delta));
    pulseRefs.current.forEach((pulse, index) => {
      if (!pulse) return;
      const [a, b] = edges[index];
      const t = (clock.elapsedTime * (0.18 + index % 3 * 0.045) + index * 0.17) % 1;
      pulse.position.lerpVectors(new THREE.Vector3(...points[a]), new THREE.Vector3(...points[b]), t);
    });
  });
  return <group ref={group}>
    <instancedMesh ref={instanced} args={[undefined, undefined, points.length]} frustumCulled={false}>
      <icosahedronGeometry args={[0.12, 1]} /><meshStandardMaterial roughness={0.28} metalness={0.25} />
    </instancedMesh>
    {edges.map(([a, b], index) => <Line key={index} points={[points[a], points[b]]} color={index % 3 ? '#83a9dc' : '#6fc9b0'} transparent opacity={0.47} lineWidth={1.1} />)}
    {edges.slice(0, 15).map((_, index) => <mesh key={index} ref={element => { pulseRefs.current[index] = element; }}>
      <sphereGeometry args={[0.042, 8, 8]} /><meshBasicMaterial color={index % 2 ? '#1873e3' : '#17b98d'} />
    </mesh>)}
    <mesh position={[0, 0, 0]}><sphereGeometry args={[0.28, 20, 20]} /><meshPhysicalMaterial color="#e8fff7" metalness={0.25} roughness={0.16} clearcoat={0.75} transmission={0.35} /></mesh>
  </group>;
}

function County({ progress }: { progress: React.RefObject<{ value: number }> }) {
  const group = useRef<THREE.Group>(null);
  const signalRefs = useRef<(THREE.Mesh | null)[]>([]);
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(...countyOutline[0]);
    countyOutline.slice(1).forEach(([x, y]) => s.lineTo(x, y));
    s.closePath();
    return s;
  }, []);
  useFrame(({ clock }, delta) => {
    if (!group.current) return;
    const p = progress.current.value;
    const visible = THREE.MathUtils.smoothstep(p, 0.48, 0.66) * (1 - THREE.MathUtils.smoothstep(p, 0.81, 0.96));
    group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, Math.max(0.001, visible * 0.84), 2.2, delta));
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -0.28 + visible * 0.13, 2, delta);
    group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, -0.09 + visible * 0.09, 2, delta);
    signalRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const origin = new THREE.Vector3(...cities[0].point);
      const target = new THREE.Vector3(...cities[i + 1].point);
      const t = (clock.elapsedTime * 0.2 + i * 0.18) % 1;
      mesh.position.lerpVectors(origin, target, t);
      mesh.position.z += Math.sin(t * Math.PI) * 0.34;
    });
  });
  return <group ref={group} position={[1.5, 1.25, 1]} scale={0.001}>
    <mesh position={[0, 0, -0.08]}>
      <extrudeGeometry args={[shape, { depth: 0.1, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.035, bevelSegments: 2 }]} />
      <meshPhysicalMaterial color="#e8f4eb" roughness={0.5} metalness={0.08} transparent opacity={0.95} />
    </mesh>
    <Line points={[...countyOutline, countyOutline[0]].map(([x, y]) => [x, y, 0.12])} color="#0b8065" lineWidth={2} />
    {cities.slice(1).map((city, i) => <Line key={city.name} points={[cities[0].point, city.point]} color="#3d79d8" transparent opacity={0.7} lineWidth={1.4} />)}
    {cities.map(city => <group key={city.name} position={[...city.point]}>
      <mesh><sphereGeometry args={[city.name === 'Bentonville' ? 0.1 : 0.065, 12, 12]} /><meshStandardMaterial color={city.color} emissive={city.color} emissiveIntensity={0.25} /></mesh>
    </group>)}
    {cities.slice(1).map((city, i) => <mesh key={city.name} ref={element => { signalRefs.current[i] = element; }}><sphereGeometry args={[0.05, 8, 8]} /><meshBasicMaterial color="#1978f0" /></mesh>)}
  </group>;
}

function WorldScene() {
  const progress = useRef({ value: 0 });
  const { camera } = useThree();
  useEffect(() => {
    const tween = gsap.to(progress.current, {
      value: 1,
      ease: 'none',
      scrollTrigger: { trigger: '#main', start: 'top top', end: 'bottom bottom', scrub: true },
    });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);
  useFrame((_, delta) => {
    const p = progress.current.value;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, -0.25 + p * 0.55, 1.5, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, p > 0.55 ? -0.2 : 0.15, 1.5, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, 9.4 - p * 1.1, 1.5, delta);
    camera.lookAt(0, 0, 0);
  });
  return <>
    <ambientLight intensity={1.8} /><directionalLight position={[4, 6, 7]} intensity={2.5} color="#e9f8ff" />
    <Float speed={0.8} rotationIntensity={0.08} floatIntensity={0.14}><Network progress={progress} /></Float>
    <County progress={progress} />
  </>;
}

export default function SpatialWorld() {
  return <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }} camera={{ position: [0, 0, 9.4], fov: 42 }}>
    <WorldScene />
  </Canvas>;
}
