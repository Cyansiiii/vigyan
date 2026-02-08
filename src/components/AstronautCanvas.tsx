"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function AstronautCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Mouse position for subtle parallax effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring physics for smooth movement
    const springConfig = { damping: 30, stiffness: 100 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    // Subtle mouse tracking
    const rotateX = useTransform(y, [-300, 300], [3, -3]);
    const rotateY = useTransform(x, [-300, 300], [-3, 3]);
    const translateX = useTransform(x, [-300, 300], [-8, 8]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                mouseX.set(e.clientX - centerX);
                mouseY.set(e.clientY - centerY);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div
            ref={containerRef}
            className="w-full h-full relative"
            style={{ minHeight: '700px' }}
        >
            {/* Main floating astronaut with prominent up/down animation */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center"
                // Primary floating animation - visible up and down movement
                animate={{
                    y: [0, -25, 0, 15, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                <motion.div
                    style={{
                        rotateX,
                        rotateY,
                        translateX,
                        transformStyle: "preserve-3d",
                    }}
                >
                    <motion.img
                        src="/images/astronaut.png"
                        alt="Astronaut floating in space"
                        className="w-auto h-auto max-w-[95%] max-h-[95%] object-contain select-none pointer-events-none"
                        initial={{ opacity: 0, scale: 0.85, y: 50 }}
                        animate={{
                            opacity: isLoaded ? 1 : 0,
                            scale: isLoaded ? 1 : 0.85,
                            y: isLoaded ? 0 : 50
                        }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        onLoad={() => setIsLoaded(true)}
                        style={{
                            filter: "drop-shadow(0 0 80px rgba(59, 130, 246, 0.2)) drop-shadow(0 20px 40px rgba(0, 0, 0, 0.4))",
                        }}
                    />
                </motion.div>
            </motion.div>

            {/* Secondary slow rotation for depth */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{
                    rotateZ: [0, 1, 0, -1, 0],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Subtle ambient particles for space atmosphere */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-0.5 h-0.5 bg-blue-400/30 rounded-full"
                        style={{
                            left: `${20 + Math.random() * 60}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            opacity: [0, 0.6, 0],
                            y: [0, -80],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 3,
                            repeat: Infinity,
                            delay: Math.random() * 4,
                            ease: "easeOut",
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
