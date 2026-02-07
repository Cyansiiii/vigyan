"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import {
    Float,
    Stars,
    PerspectiveCamera,
    Environment,
    useGLTF,
    MeshReflectorMaterial,
    Sphere
} from "@react-three/drei";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

// High-quality procedural astronaut with realistic materials
function RealisticAstronaut() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (groupRef.current) {
            // Smooth floating motion
            groupRef.current.position.y = Math.sin(t * 0.4) * 0.15;
            groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.08;
            groupRef.current.rotation.z = Math.sin(t * 0.2) * 0.03;
            groupRef.current.rotation.x = Math.sin(t * 0.25) * 0.02;
        }
    });

    // Dark monochromatic materials like the reference
    const suitMaterial = (
        <meshStandardMaterial
            color="#1a1a2e"
            roughness={0.4}
            metalness={0.6}
            envMapIntensity={1.2}
        />
    );

    const accentMaterial = (
        <meshStandardMaterial
            color="#2d2d44"
            roughness={0.3}
            metalness={0.7}
            envMapIntensity={1.5}
        />
    );

    const visorMaterial = (
        <meshPhysicalMaterial
            color="#0a0a14"
            metalness={0.95}
            roughness={0.05}
            clearcoat={1}
            clearcoatRoughness={0.1}
            reflectivity={1}
            envMapIntensity={2}
        />
    );

    return (
        <group ref={groupRef} scale={1.2} position={[0.5, -0.3, 0]} rotation={[0.1, -0.4, 0.05]}>
            <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
                {/* Torso - Main Body */}
                <mesh position={[0, 0, 0]}>
                    <capsuleGeometry args={[0.45, 0.7, 32, 64]} />
                    {suitMaterial}
                </mesh>

                {/* Helmet */}
                <group position={[0, 0.8, 0]}>
                    {/* Helmet Shell */}
                    <mesh>
                        <sphereGeometry args={[0.38, 64, 64]} />
                        {accentMaterial}
                    </mesh>
                    {/* Visor - Reflective */}
                    <mesh position={[0, 0.02, 0.15]} rotation={[-0.1, 0, 0]}>
                        <sphereGeometry args={[0.32, 64, 64, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
                        {visorMaterial}
                    </mesh>
                    {/* Helmet Ring */}
                    <mesh position={[0, -0.25, 0]}>
                        <torusGeometry args={[0.35, 0.05, 16, 48]} />
                        {accentMaterial}
                    </mesh>
                </group>

                {/* Backpack / Life Support Unit */}
                <mesh position={[0, 0.1, -0.45]}>
                    <boxGeometry args={[0.55, 0.75, 0.35]} />
                    {accentMaterial}
                </mesh>
                {/* Backpack Details */}
                <mesh position={[0, 0.3, -0.55]}>
                    <cylinderGeometry args={[0.08, 0.08, 0.4, 16]} />
                    {suitMaterial}
                </mesh>
                <mesh position={[0.15, 0.3, -0.55]}>
                    <cylinderGeometry args={[0.06, 0.06, 0.35, 16]} />
                    {suitMaterial}
                </mesh>
                <mesh position={[-0.15, 0.3, -0.55]}>
                    <cylinderGeometry args={[0.06, 0.06, 0.35, 16]} />
                    {suitMaterial}
                </mesh>

                {/* Left Arm */}
                <group position={[-0.55, 0.15, 0]}>
                    {/* Upper Arm */}
                    <mesh rotation={[0, 0, 0.6]} position={[-0.15, -0.1, 0]}>
                        <capsuleGeometry args={[0.12, 0.35, 16, 32]} />
                        {suitMaterial}
                    </mesh>
                    {/* Forearm - reaching out like reference */}
                    <mesh rotation={[0.3, 0.2, 0.8]} position={[-0.4, -0.25, 0.15]}>
                        <capsuleGeometry args={[0.1, 0.35, 16, 32]} />
                        {suitMaterial}
                    </mesh>
                    {/* Glove */}
                    <mesh position={[-0.6, -0.35, 0.35]}>
                        <sphereGeometry args={[0.1, 32, 32]} />
                        {accentMaterial}
                    </mesh>
                </group>

                {/* Right Arm */}
                <group position={[0.55, 0.15, 0]}>
                    {/* Upper Arm */}
                    <mesh rotation={[0, 0, -0.4]} position={[0.1, -0.15, 0]}>
                        <capsuleGeometry args={[0.12, 0.35, 16, 32]} />
                        {suitMaterial}
                    </mesh>
                    {/* Forearm */}
                    <mesh rotation={[-0.2, -0.1, -0.5]} position={[0.25, -0.4, 0.05]}>
                        <capsuleGeometry args={[0.1, 0.35, 16, 32]} />
                        {suitMaterial}
                    </mesh>
                    {/* Glove */}
                    <mesh position={[0.35, -0.65, 0.15]}>
                        <sphereGeometry args={[0.1, 32, 32]} />
                        {accentMaterial}
                    </mesh>
                </group>

                {/* Left Leg */}
                <group position={[-0.2, -0.7, 0]}>
                    {/* Upper Leg */}
                    <mesh rotation={[0.2, 0, 0.1]} position={[0, -0.2, 0.05]}>
                        <capsuleGeometry args={[0.14, 0.4, 16, 32]} />
                        {suitMaterial}
                    </mesh>
                    {/* Lower Leg */}
                    <mesh rotation={[-0.3, 0, 0.05]} position={[-0.05, -0.6, 0.15]}>
                        <capsuleGeometry args={[0.12, 0.4, 16, 32]} />
                        {suitMaterial}
                    </mesh>
                    {/* Boot */}
                    <mesh position={[-0.08, -0.95, 0.25]}>
                        <boxGeometry args={[0.18, 0.12, 0.28]} />
                        {accentMaterial}
                    </mesh>
                </group>

                {/* Right Leg */}
                <group position={[0.2, -0.7, 0]}>
                    {/* Upper Leg */}
                    <mesh rotation={[-0.15, 0, -0.08]} position={[0, -0.2, -0.02]}>
                        <capsuleGeometry args={[0.14, 0.4, 16, 32]} />
                        {suitMaterial}
                    </mesh>
                    {/* Lower Leg */}
                    <mesh rotation={[0.2, 0, -0.05]} position={[0.05, -0.6, -0.1]}>
                        <capsuleGeometry args={[0.12, 0.4, 16, 32]} />
                        {suitMaterial}
                    </mesh>
                    {/* Boot */}
                    <mesh position={[0.08, -0.95, -0.18]}>
                        <boxGeometry args={[0.18, 0.12, 0.28]} />
                        {accentMaterial}
                    </mesh>
                </group>

                {/* Tether / Cable - like in the reference */}
                <mesh position={[0.3, -1.2, -0.2]} rotation={[0.5, 0.2, 0.1]}>
                    <tubeGeometry args={[
                        new THREE.CatmullRomCurve3([
                            new THREE.Vector3(0, 0, 0),
                            new THREE.Vector3(0.3, -0.5, 0.2),
                            new THREE.Vector3(0.1, -1.2, 0.5),
                            new THREE.Vector3(-0.2, -2, 0.3),
                            new THREE.Vector3(-0.5, -3, 0),
                        ]),
                        64,
                        0.02,
                        8,
                        false
                    ]} />
                    <meshStandardMaterial color="#1a1a2e" roughness={0.5} metalness={0.4} />
                </mesh>

                {/* Subtle rim lighting effect */}
                <Sphere args={[1.8, 32, 32]} position={[0, 0, 0]}>
                    <meshBasicMaterial
                        color="#3b82f6"
                        transparent
                        opacity={0.02}
                        side={THREE.BackSide}
                    />
                </Sphere>
            </Float>
        </group>
    );
}

// Lighting setup for dramatic effect
function SceneLighting() {
    return (
        <>
            {/* Ambient fill */}
            <ambientLight intensity={0.15} />

            {/* Key light - main illumination from top-right */}
            <spotLight
                position={[5, 8, 5]}
                angle={0.4}
                penumbra={0.8}
                intensity={3}
                color="#ffffff"
                castShadow
            />

            {/* Rim light - back lighting for silhouette */}
            <pointLight position={[-5, 3, -5]} intensity={1.5} color="#4a5568" />

            {/* Fill light - subtle blue accent */}
            <pointLight position={[3, -2, 3]} intensity={0.8} color="#3b82f6" />

            {/* Bottom accent */}
            <pointLight position={[0, -5, 2]} intensity={0.4} color="#1e3a5f" />
        </>
    );
}

export function AstronautCanvas() {
    return (
        <div className="w-full h-full relative" style={{ minHeight: '600px' }}>
            <Canvas
                shadows
                className="bg-transparent"
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance"
                }}
            >
                <PerspectiveCamera makeDefault position={[0, 0, 4.5]} fov={50} />

                <Suspense fallback={null}>
                    <SceneLighting />
                    <RealisticAstronaut />
                    <Environment preset="night" />
                    <Stars
                        radius={80}
                        depth={60}
                        count={3000}
                        factor={3}
                        saturation={0}
                        fade
                        speed={0.5}
                    />
                </Suspense>
            </Canvas>
        </div>
    );
}
