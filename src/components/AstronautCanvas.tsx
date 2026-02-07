"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function AstronautCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Mouse position for parallax effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring physics for smooth movement
    const springConfig = { damping: 25, stiffness: 150 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    // Transform mouse position to subtle movement
    const rotateX = useTransform(y, [-300, 300], [5, -5]);
    const rotateY = useTransform(x, [-300, 300], [-5, 5]);
    const translateX = useTransform(x, [-300, 300], [-15, 15]);
    const translateY = useTransform(y, [-300, 300], [-10, 10]);

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
            {/* Floating astronaut image with parallax */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                    rotateX,
                    rotateY,
                    translateX,
                    translateY,
                    transformStyle: "preserve-3d",
                    perspective: 1000,
                }}
            >
                <motion.img
                    src="/images/astronaut.png"
                    alt="Astronaut floating in space"
                    className="w-auto h-auto max-w-[90%] max-h-[90%] object-contain select-none pointer-events-none"
                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                    animate={{
                        opacity: isLoaded ? 1 : 0,
                        scale: isLoaded ? 1 : 0.9,
                        y: isLoaded ? 0 : 30
                    }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    onLoad={() => setIsLoaded(true)}
                    style={{
                        filter: "drop-shadow(0 0 60px rgba(59, 130, 246, 0.15))",
                    }}
                />
            </motion.div>

            {/* Floating animation layer */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                animate={{
                    y: [0, -12, 0, 8, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                {/* Subtle glow effect behind astronaut */}
                <div
                    className="absolute w-[400px] h-[400px] rounded-full opacity-20"
                    style={{
                        background: "radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)",
                        filter: "blur(40px)",
                    }}
                />
            </motion.div>

            {/* Ambient particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white/20 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            opacity: [0, 0.5, 0],
                            scale: [0, 1, 0],
                            y: [0, -50],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
