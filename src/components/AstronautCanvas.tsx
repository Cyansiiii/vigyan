"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function AstronautModel() {
    const meshRef = useRef<THREE.Mesh>(null);
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.y = t * 0.3;
            meshRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
        }
        if (groupRef.current) {
            groupRef.current.position.y = Math.sin(t * 0.5) * 0.2;
        }
    });

    return (
        <group ref={groupRef}>
            <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
                <mesh ref={meshRef}>
                    <sphereGeometry args={[1.2, 64, 64]} />
                    <MeshDistortMaterial
                        color="#0ea5e9"
                        attach="material"
                        distort={0.4}
                        speed={2}
                        roughness={0.1}
                        metalness={0.8}
                    />
                </mesh>
                <Sphere args={[1.4, 32, 32]}>
                    <meshBasicMaterial color="#3b82f6" transparent opacity={0.1} wireframe />
                </Sphere>
            </Float>
        </group>
    );
}

export function AstronautCanvas() {
    return (
        <div className="w-full h-full min-h-[500px]">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />
                <AstronautModel />
                <OrbitControls enableZoom={false} />
            </Canvas>
        </div>
    );
}
