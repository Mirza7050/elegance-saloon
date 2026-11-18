import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// 3D Luxury Crystal Sculpture with Concentric Orbital Bands
function LuxuryOrb({ isMobile }: { isMobile: boolean }) {
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.x = Math.sin(t * 0.25) * 0.3;
      coreRef.current.rotation.y = t * 0.3;
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.45;
      ring1Ref.current.rotation.y = Math.sin(t * 0.3) * 0.6;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.35;
      ring2Ref.current.rotation.x = Math.cos(t * 0.4) * 0.5;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = -t * 0.25;
      ring3Ref.current.rotation.z = Math.sin(t * 0.2) * 0.4;
    }
  });

  const baseScale = isMobile ? 1.05 : 1.45;

  return (
    <group position={[0, isMobile ? 0.3 : 0, 0]}>
      {/* Central Sculptural Core: Distorted 24K Gold Crystal */}
      <Float speed={2.2} rotationIntensity={0.5} floatIntensity={isMobile ? 0.8 : 1.2}>
        <mesh ref={coreRef} scale={baseScale}>
          <icosahedronGeometry args={[1, isMobile ? 2 : 4]} />
          <MeshDistortMaterial
            color="#E6CA65"
            emissive="#594411"
            roughness={0.12}
            metalness={0.96}
            distort={isMobile ? 0.25 : 0.4}
            speed={1.6}
            clearcoat={1}
            clearcoatRoughness={0.08}
          />
        </mesh>
      </Float>

      {/* Outer Orbital Ring 1: Champagne Gold Ribbon */}
      <mesh ref={ring1Ref} scale={baseScale * 1.7}>
        <torusGeometry args={[1, 0.02, 16, isMobile ? 64 : 120]} />
        <meshStandardMaterial
          color="#F3E5AB"
          metalness={0.98}
          roughness={0.08}
          emissive="#7A6024"
        />
      </mesh>

      {/* Outer Orbital Ring 2: Burnished Bronze */}
      <mesh ref={ring2Ref} scale={baseScale * 2.0}>
        <torusGeometry args={[1, 0.015, 16, isMobile ? 64 : 120]} />
        <meshStandardMaterial
          color="#AA820A"
          metalness={0.94}
          roughness={0.18}
          emissive="#382508"
        />
      </mesh>

      {/* Outer Orbital Ring 3: Fine Metallic Wire */}
      <mesh ref={ring3Ref} scale={baseScale * 2.3}>
        <torusGeometry args={[1, 0.01, 16, isMobile ? 64 : 120]} />
        <meshStandardMaterial
          color="#FFFFFF"
          metalness={0.99}
          roughness={0.05}
          emissive="#333333"
        />
      </mesh>
    </group>
  );
}

// Atmospheric Golden Stardust Field (dynamically capped for mobile battery efficiency)
function ParticleField({ count = 350 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 13;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = t * 0.03;
      pointsRef.current.rotation.x = Math.sin(t * 0.02) * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.055}
        color="#F3E5AB"
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

// Camera Mouse/Touch Parallax
function CameraRig({ children, isMobile }: { children: React.ReactNode; isMobile: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (group.current && !isMobile) {
      const { x, y } = state.pointer;
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x * 0.3, 0.05);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -y * 0.22, 0.05);
    }
  });

  return <group ref={group}>{children}</group>;
}

export const HeroCanvas: React.FC = () => {
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (!hasWebGL) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[600px] h-[90vw] max-h-[600px] rounded-full bg-gradient-to-tr from-[#D4AF37]/20 via-[#F3E5AB]/10 to-transparent blur-3xl animate-pulse" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, isMobile ? 6.2 : 5.2], fov: isMobile ? 50 : 45 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={isMobile ? [1, 1.25] : [1, 1.5]}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[8, 12, 6]} intensity={isMobile ? 2.2 : 3} color="#F3E5AB" />
        <directionalLight position={[-10, -6, -4]} intensity={1.5} color="#C5A059" />
        <pointLight position={[0, 2, 3]} intensity={1.8} color="#D4AF37" />

        <CameraRig isMobile={isMobile}>
          <LuxuryOrb isMobile={isMobile} />
          <ParticleField count={isMobile ? 160 : 400} />
        </CameraRig>
      </Canvas>
    </div>
  );
};
