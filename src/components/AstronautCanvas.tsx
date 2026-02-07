"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export function AstronautCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    // Mouse position for subtle parallax effect (centered)
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Spring physics for smooth movement
    const springConfig = { damping: 30, stiffness: 100 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    // Subtle mouse tracking for parallax
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
            {/* Main floating astronaut container */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ y: [0, -25, 0, 15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
                <motion.div
                    style={{
                        rotateX, // Keep only vertical tilt
                        transformStyle: "preserve-3d",
                    }}
                    className="relative w-full h-full flex items-center justify-center"
                >
                    {/* Main Astronaut Image - Natural Visibility
                        Brightness 1.05 and Contrast 1.1 to be visible but maintain drama.
                        Subtle drop shadow for depth.
                    */}
                    <motion.img
                        src="/images/hero-astronaut.png"
                        alt="Astronaut floating in space"
                        className="w-auto h-auto max-w-[95%] max-h-[95%] object-contain select-none pointer-events-none brightness-[1.05] contrast-110 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.85 }}
                        transition={{ duration: 1 }}
                        onLoad={() => setIsLoaded(true)}
                    />

                    {/* Glowing Core Effect (Pulsing) - Kept as requested */}
                    <motion.div
                        className="absolute w-4 h-4 bg-blue-500 rounded-full blur-md"
                        style={{
                            top: '45%',
                            left: '52%',
                            filter: 'drop-shadow(0 0 10px #3b82f6)'
                        }}
                        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.2, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    />
                </motion.div>
            </motion.div>

            {/* Subtle ambient particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-0.5 h-0.5 bg-blue-400/30 rounded-full"
                        style={{
                            left: `${20 + Math.random() * 60}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{ opacity: [0, 0.6, 0], y: [0, -80] }}
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
