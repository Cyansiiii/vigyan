"use client";

import React, { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
    Float,
    Stars,
    PerspectiveCamera,
    Environment,
    Sphere,
    useTexture
} from "@react-three/drei";
import * as THREE from "three";

// Ultra-detailed procedural astronaut with realistic proportions
function DetailedAstronaut() {
    const groupRef = useRef<THREE.Group>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    // Mouse tracking effect
    const { viewport } = useThree();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (groupRef.current) {
            // Smooth floating motion
            groupRef.current.position.y = Math.sin(t * 0.35) * 0.12 + 0.2;
            groupRef.current.rotation.y = -0.5 + Math.sin(t * 0.12) * 0.05;
            groupRef.current.rotation.z = 0.05 + Math.sin(t * 0.18) * 0.02;
            groupRef.current.rotation.x = Math.sin(t * 0.2) * 0.015;
        }
    });

    // Materials matching the antimatter.ai dark aesthetic
    const suitMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x1a1a1a),
        roughness: 0.6,
        metalness: 0.3,
        envMapIntensity: 0.8,
    }), []);

    const suitDetailMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x2a2a2a),
        roughness: 0.4,
        metalness: 0.5,
        envMapIntensity: 1.0,
    }), []);

    const helmetMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x252525),
        roughness: 0.2,
        metalness: 0.7,
        envMapIntensity: 1.5,
    }), []);

    const visorMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(0x050505),
        metalness: 1,
        roughness: 0.05,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        reflectivity: 1,
        envMapIntensity: 3,
    }), []);

    const jointMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x1f1f1f),
        roughness: 0.5,
        metalness: 0.4,
    }), []);

    return (
        <group
            ref={groupRef}
            scale={1.1}
            position={[0.8, -0.2, 0]}
            rotation={[0.08, -0.6, 0.05]}
        >
            <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.15}>

                {/* === TORSO === */}
                <group position={[0, 0, 0]}>
                    {/* Main body */}
                    <mesh material={suitMaterial}>
                        <capsuleGeometry args={[0.38, 0.55, 32, 64]} />
                    </mesh>
                    {/* Chest plate */}
                    <mesh position={[0, 0.15, 0.25]} material={suitDetailMaterial}>
                        <boxGeometry args={[0.5, 0.35, 0.12]} />
                    </mesh>
                    {/* Lower torso */}
                    <mesh position={[0, -0.4, 0]} material={suitMaterial}>
                        <capsuleGeometry args={[0.32, 0.2, 32, 64]} />
                    </mesh>
                </group>

                {/* === HELMET === */}
                <group position={[0, 0.72, 0]}>
                    {/* Helmet shell */}
                    <mesh material={helmetMaterial}>
                        <sphereGeometry args={[0.34, 64, 64]} />
                    </mesh>
                    {/* Visor - curved reflective surface */}
                    <mesh position={[0, 0.02, 0.12]} rotation={[-0.15, 0, 0]} material={visorMaterial}>
                        <sphereGeometry args={[0.29, 64, 64, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
                    </mesh>
                    {/* Helmet rim */}
                    <mesh position={[0, -0.22, 0]} material={jointMaterial}>
                        <torusGeometry args={[0.32, 0.045, 16, 48]} />
                    </mesh>
                    {/* Side lights */}
                    <mesh position={[0.28, 0.05, 0.1]} material={suitDetailMaterial}>
                        <boxGeometry args={[0.08, 0.12, 0.08]} />
                    </mesh>
                    <mesh position={[-0.28, 0.05, 0.1]} material={suitDetailMaterial}>
                        <boxGeometry args={[0.08, 0.12, 0.08]} />
                    </mesh>
                </group>

                {/* === BACKPACK / LIFE SUPPORT === */}
                <group position={[0, 0.05, -0.42]}>
                    <mesh material={suitDetailMaterial}>
                        <boxGeometry args={[0.52, 0.7, 0.28]} />
                    </mesh>
                    {/* Oxygen tanks */}
                    <mesh position={[0.12, 0.2, -0.12]} material={jointMaterial}>
                        <cylinderGeometry args={[0.06, 0.06, 0.35, 16]} />
                    </mesh>
                    <mesh position={[-0.12, 0.2, -0.12]} material={jointMaterial}>
                        <cylinderGeometry args={[0.06, 0.06, 0.35, 16]} />
                    </mesh>
                    {/* Control panel */}
                    <mesh position={[0, -0.1, 0.15]} material={helmetMaterial}>
                        <boxGeometry args={[0.35, 0.25, 0.05]} />
                    </mesh>
                </group>

                {/* === LEFT ARM (REACHING OUT - like reference) === */}
                <group position={[-0.48, 0.1, 0]}>
                    {/* Shoulder joint */}
                    <mesh material={jointMaterial}>
                        <sphereGeometry args={[0.1, 32, 32]} />
                    </mesh>
                    {/* Upper arm */}
                    <mesh
                        position={[-0.18, -0.08, 0.1]}
                        rotation={[0.4, 0.2, 0.7]}
                        material={suitMaterial}
                    >
                        <capsuleGeometry args={[0.08, 0.28, 16, 32]} />
                    </mesh>
                    {/* Elbow joint */}
                    <mesh position={[-0.35, -0.18, 0.22]} material={jointMaterial}>
                        <sphereGeometry args={[0.07, 32, 32]} />
                    </mesh>
                    {/* Forearm - extended outward */}
                    <mesh
                        position={[-0.52, -0.22, 0.38]}
                        rotation={[0.5, 0.3, 0.9]}
                        material={suitMaterial}
                    >
                        <capsuleGeometry args={[0.07, 0.3, 16, 32]} />
                    </mesh>
                    {/* Glove */}
                    <mesh position={[-0.72, -0.28, 0.55]} material={suitDetailMaterial}>
                        <sphereGeometry args={[0.08, 32, 32]} />
                    </mesh>
                </group>

                {/* === RIGHT ARM === */}
                <group position={[0.48, 0.1, 0]}>
                    {/* Shoulder joint */}
                    <mesh material={jointMaterial}>
                        <sphereGeometry args={[0.1, 32, 32]} />
                    </mesh>
                    {/* Upper arm */}
                    <mesh
                        position={[0.12, -0.15, 0]}
                        rotation={[0, 0, -0.35]}
                        material={suitMaterial}
                    >
                        <capsuleGeometry args={[0.08, 0.28, 16, 32]} />
                    </mesh>
                    {/* Elbow joint */}
                    <mesh position={[0.22, -0.38, 0]} material={jointMaterial}>
                        <sphereGeometry args={[0.07, 32, 32]} />
                    </mesh>
                    {/* Forearm */}
                    <mesh
                        position={[0.28, -0.58, 0.05]}
                        rotation={[-0.15, 0, -0.25]}
                        material={suitMaterial}
                    >
                        <capsuleGeometry args={[0.07, 0.28, 16, 32]} />
                    </mesh>
                    {/* Glove */}
                    <mesh position={[0.32, -0.82, 0.1]} material={suitDetailMaterial}>
                        <sphereGeometry args={[0.08, 32, 32]} />
                    </mesh>
                </group>

                {/* === LEFT LEG === */}
                <group position={[-0.18, -0.6, 0]}>
                    {/* Hip joint */}
                    <mesh material={jointMaterial}>
                        <sphereGeometry args={[0.1, 32, 32]} />
                    </mesh>
                    {/* Upper leg */}
                    <mesh
                        position={[-0.02, -0.22, 0.08]}
                        rotation={[0.25, 0, 0.08]}
                        material={suitMaterial}
                    >
                        <capsuleGeometry args={[0.1, 0.32, 16, 32]} />
                    </mesh>
                    {/* Knee joint */}
                    <mesh position={[-0.04, -0.5, 0.15]} material={jointMaterial}>
                        <sphereGeometry args={[0.08, 32, 32]} />
                    </mesh>
                    {/* Lower leg */}
                    <mesh
                        position={[-0.06, -0.78, 0.22]}
                        rotation={[-0.2, 0, 0.05]}
                        material={suitMaterial}
                    >
                        <capsuleGeometry args={[0.085, 0.32, 16, 32]} />
                    </mesh>
                    {/* Boot */}
                    <mesh position={[-0.08, -1.08, 0.28]} material={suitDetailMaterial}>
                        <boxGeometry args={[0.14, 0.1, 0.22]} />
                    </mesh>
                </group>

                {/* === RIGHT LEG === */}
                <group position={[0.18, -0.6, 0]}>
                    {/* Hip joint */}
                    <mesh material={jointMaterial}>
                        <sphereGeometry args={[0.1, 32, 32]} />
                    </mesh>
                    {/* Upper leg */}
                    <mesh
                        position={[0.02, -0.22, -0.05]}
                        rotation={[-0.15, 0, -0.06]}
                        material={suitMaterial}
                    >
                        <capsuleGeometry args={[0.1, 0.32, 16, 32]} />
                    </mesh>
                    {/* Knee joint */}
                    <mesh position={[0.04, -0.5, -0.1]} material={jointMaterial}>
                        <sphereGeometry args={[0.08, 32, 32]} />
                    </mesh>
                    {/* Lower leg */}
                    <mesh
                        position={[0.06, -0.78, -0.15]}
                        rotation={[0.15, 0, -0.05]}
                        material={suitMaterial}
                    >
                        <capsuleGeometry args={[0.085, 0.32, 16, 32]} />
                    </mesh>
                    {/* Boot */}
                    <mesh position={[0.08, -1.08, -0.18]} material={suitDetailMaterial}>
                        <boxGeometry args={[0.14, 0.1, 0.22]} />
                    </mesh>
                </group>

                {/* === TETHER / CABLE === */}
                <mesh position={[0.25, -1.2, -0.15]} rotation={[0.4, 0.15, 0.08]}>
                    <tubeGeometry args={[
                        new THREE.CatmullRomCurve3([
                            new THREE.Vector3(0, 0, 0),
                            new THREE.Vector3(0.2, -0.4, 0.15),
                            new THREE.Vector3(0.05, -1, 0.4),
                            new THREE.Vector3(-0.15, -1.8, 0.25),
                            new THREE.Vector3(-0.4, -2.8, 0.1),
                        ]),
                        64,
                        0.018,
                        8,
                        false
                    ]} />
                    <meshStandardMaterial color="#1a1a1a" roughness={0.6} metalness={0.3} />
                </mesh>

            </Float>
        </group>
    );
}

// Professional lighting setup
function SceneLighting() {
    return (
        <>
            {/* Ambient base */}
            <ambientLight intensity={0.08} color="#ffffff" />

            {/* Key light - main illumination from top-right */}
            <spotLight
                position={[6, 8, 4]}
                angle={0.35}
                penumbra={0.9}
                intensity={2.5}
                color="#ffffff"
                castShadow
            />

            {/* Strong rim light for silhouette */}
            <pointLight position={[-4, 2, -6]} intensity={1.8} color="#666666" />

            {/* Subtle blue accent from below */}
            <pointLight position={[2, -3, 3]} intensity={0.5} color="#2563eb" />

            {/* Fill from front-left */}
            <pointLight position={[-3, 1, 4]} intensity={0.6} color="#404040" />
        </>
    );
}

export function AstronautCanvas() {
    return (
        <div className="w-full h-full relative" style={{ minHeight: '700px' }}>
            <Canvas
                shadows
                className="bg-transparent"
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                    toneMapping: THREE.ACESFilmicToneMapping,
                    toneMappingExposure: 1.2
                }}
            >
                <PerspectiveCamera makeDefault position={[0, 0.3, 4.2]} fov={45} />

                <Suspense fallback={null}>
                    <SceneLighting />
                    <DetailedAstronaut />
                    <Environment preset="night" />
                    <Stars
                        radius={100}
                        depth={50}
                        count={2000}
                        factor={2.5}
                        saturation={0}
                        fade
                        speed={0.3}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}
