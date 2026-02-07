"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Stars, MeshDistortMaterial, PerspectiveCamera, Sphere } from "@react-three/drei";
import * as THREE from "three";

function ProceduralAstronaut() {
    const groupRef = useRef<THREE.Group>(null);
    const helmetRef = useRef<THREE.Mesh>(null);
    const backpackRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.position.y = Math.sin(t * 0.5) * 0.2;
            groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.1;
        }
        if (helmetRef.current) {
            helmetRef.current.rotation.y = Math.sin(t * 0.3) * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                {/* Body / Suit */}
                <mesh position={[0, -0.2, 0]}>
                    <capsuleGeometry args={[0.5, 0.8, 16, 32]} />
                    <MeshDistortMaterial
                        color="#ffffff"
                        distort={0.1}
                        speed={2}
                        roughness={0.2}
                        metalness={0.4}
                    />
                </mesh>

                {/* Helmet */}
                <group position={[0, 0.6, 0]}>
                    <mesh ref={helmetRef}>
                        <sphereGeometry args={[0.4, 32, 32]} />
                        <meshStandardMaterial color="#f8fafc" roughness={0.1} />
                    </mesh>
                    {/* Visor */}
                    <mesh position={[0, 0.05, 0.2]}>
                        <sphereGeometry args={[0.32, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
                        <meshPhysicalMaterial
                            color="#1e293b"
                            metalness={1}
                            roughness={0}
                            emissive="#0ea5e9"
                            emissiveIntensity={0.5}
                            transparent
                            opacity={0.9}
                        />
                    </mesh>
                </group>

                {/* Backpack / Life Support */}
                <mesh position={[0, -0.1, -0.4]} ref={backpackRef}>
                    <boxGeometry args={[0.6, 0.8, 0.4]} />
                    <meshStandardMaterial color="#cbd5e1" metalness={0.6} roughness={0.3} />
                </mesh>

                {/* Limbs (Procedural Tubes) */}
                {/* Left Arm */}
                <mesh position={[-0.6, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
                    <cylinderGeometry args={[0.12, 0.12, 0.6, 16]} />
                    <meshStandardMaterial color="#ffffff" />
                </mesh>
                {/* Right Arm */}
                <mesh position={[0.6, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
                    <cylinderGeometry args={[0.12, 0.12, 0.6, 16]} />
                    <meshStandardMaterial color="#ffffff" />
                </mesh>
                {/* Legs */}
                <mesh position={[-0.25, -1, 0]}>
                    <cylinderGeometry args={[0.15, 0.15, 0.7, 16]} />
                    <meshStandardMaterial color="#ffffff" />
                </mesh>
                <mesh position={[0.25, -1, 0]}>
                    <cylinderGeometry args={[0.15, 0.15, 0.7, 16]} />
                    <meshStandardMaterial color="#ffffff" />
                </mesh>

                {/* Glowing Aura */}
                <Sphere args={[1.5, 32, 32]}>
                    <meshBasicMaterial color="#3b82f6" transparent opacity={0.05} wireframe />
                </Sphere>
            </Float>
        </group>
    );
}

export function AstronautCanvas() {
    return (
        <div className="w-full h-[600px] relative">
            <Canvas shadows className="bg-transparent">
                <PerspectiveCamera makeDefault position={[0, 0, 4]} />
                <ambientLight intensity={0.4} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
                <pointLight position={[-10, -10, -5]} intensity={1} color="#3b82f6" />
                <pointLight position={[5, 5, 5]} intensity={1} color="#f59e0b" />

                <ProceduralAstronaut />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <OrbitControls enableZoom={false} makeDefault />
            </Canvas>
        </div>
    );
}
