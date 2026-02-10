"use client";

import React, { useEffect } from "react";


import { CreepyButton } from "@/components/ui/creepy-button";
import { AstronautCanvas } from "@/components/AstronautCanvas";
import { ZenRain } from "@/components/ui/zen-rain";
import { FolderPreview } from "@/components/ui/folder-preview";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { FlipText } from "@/components/ui/flip-text";
import { FlipFadeText } from "@/components/ui/flip-fade-text";
import AnimatedButton from "@/components/ui/animated-button";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { PerspectiveGrid } from "@/components/ui/perspective-grid";
import InteractiveBook from "@/components/ui/interactive-book";
import { TestimonialsCard } from "@/components/ui/testimonials-card";
import { ArrowRight, Binary, Microscope, Zap, Compass, Atom, ShieldCheck, Target, Trophy, Terminal } from "lucide-react";
import "./AboutPage.css";

const StarField = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {[...Array(150)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-px h-px bg-white rounded-full"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        opacity: [0.1, 0.8, 0.1],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: 2 + Math.random() * 5,
                        repeat: Infinity,
                        delay: Math.random() * 7,
                    }}
                />
            ))}
        </div>
    );
};


export default function AboutPage() {
    // Navigation handlers


    const handleSystemOverview = () => {
        const section = document.getElementById('philosophy-section');
        section?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const cards = document.querySelectorAll('.systematic-card');
            cards.forEach((card: any) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="relative min-h-screen bg-black text-white selection:bg-blue-500/30 overflow-hidden">
            <Navbar />

            {/* Background Architecture */}
            <div className="fixed inset-0 z-0">
                <PerspectiveGrid gridSize={40} className="opacity-5" />
                <ZenRain />
                <StarField />
                {/* Atmospheric Nebulae */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(13,27,59,0.5),transparent_70%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.15),transparent_60%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_70%,rgba(147,51,234,0.08),transparent_60%)]"></div>
                {/* Subtle Grain */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
            </div>


            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center px-6 lg:px-24 z-10 pt-20">
                <div className="max-w-5xl w-full relative z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="mb-14">
                            <h1 className="systematic-heading text-6xl md:text-8xl lg:text-9xl tracking-tighter">
                                <span className="block opacity-30">SYMMETRY OF</span>
                                <span className="block text-blue-500">
                                    <FlipText duration={3} delay={0.5}>ZEN SCIENCE.</FlipText>
                                </span>
                            </h1>
                        </div>

                        <div className="mt-16 mb-20">
                            <AnimatedButton
                                onClick={handleSystemOverview}
                                className="px-10 py-5 text-lg font-bold tracking-widest uppercase rounded-full border-white/20 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300"
                            >
                                <span className="flex items-center gap-3">
                                    SYSTEM OVERVIEW
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </span>
                            </AnimatedButton>
                        </div>
                    </motion.div>
                </div>

                <div className="absolute right-[-10%] md:right-[-5%] top-0 w-full md:w-3/5 h-full pointer-events-none z-0 opacity-40 xl:opacity-100">
                    <AstronautCanvas />
                </div>
            </section>

            {/* Core Philosophy Section - One Frame Design */}
            <section id="philosophy-section" className="relative min-h-screen py-16 px-6 lg:px-24 z-10 bg-gradient-to-b from-transparent via-blue-500/[0.02] to-transparent flex items-center justify-center">
                {/* Animated Background Orbs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Orbital Ring Animation */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 border border-blue-500/10 rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                        className="absolute top-1/2 left-1/2 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 border border-blue-500/5 rounded-full"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
                    />
                    {/* Floating Particles */}
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-blue-500/30 rounded-full blur-sm"
                            style={{
                                left: `${15 + i * 10}%`,
                                top: `${20 + (i % 3) * 25}%`,
                            }}
                            animate={{
                                y: [0, -30, 0],
                                opacity: [0.3, 0.8, 0.3],
                                scale: [1, 1.5, 1],
                            }}
                            transition={{
                                duration: 4 + i * 0.5,
                                repeat: Infinity,
                                delay: i * 0.3,
                            }}
                        />
                    ))}
                    {/* Central Glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl" />
                </div>

                <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="section-label text-center">Logic Framework // Pramana</span>
                        <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight leading-[0.9]">
                            The Science of <br />
                            <span className="gradient-text reveal-underline">
                                <FlipText duration={3} delay={0.2} separator="">Discovery.</FlipText>
                            </span>
                        </h2>
                    </motion.div>

                    <TestimonialsCard
                        items={[
                            {
                                id: "buddha-code",
                                title: "The Buddha Code",
                                description: "\"Do not believe in anything simply because you have heard it... but after observation and analysis... accept it and live up to it.\"",
                                image: "/assets/heritage/buddhist_logic_modern_science_fusion_1770312594808.png"
                            },
                            {
                                id: "conceptual-integrity",
                                title: "Conceptual Integrity",
                                description: "Upholding absolute truth through rigorous counter-questioning and persistent verification. The foundation of scientific inquiry.",
                                image: "/assets/heritage/scientific_logic_visualization_diagram_1770314769518.png"
                            },
                            {
                                id: "focused-discipline",
                                title: "Focused Discipline",
                                description: "A mind stilled by Zen is a mind capable of cracking the most complex quantum equations. Focus is the ultimate weapon.",
                                image: "/assets/heritage/modern_space_atomic_premium_render_1770312628720.png"
                            },
                            {
                                id: "vanguard-legacy",
                                title: "Vanguard Legacy",
                                description: "Restoring India's status as the global epicentre of systematic and verifiable knowledge. Building the next generation of pioneers.",
                                image: "/assets/heritage/modern_science_pioneers_india_1770422667638.png"
                            }
                        ]}
                        width={500}
                        className="w-full"
                        autoPlay={true}
                        autoPlayInterval={5000}
                    />

                    <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light mt-16 max-w-xl text-center">
                        We recognize the <span className="text-white font-medium">Pramana System</span> as the world's most ancient scientific methodology. It demands rigorous proof via direct perception and logical inference.
                    </p>
                </div>
            </section>

            {/* Systematic Units: Pioneers */}
            <section className="relative min-h-screen flex flex-col justify-center py-12 px-6 lg:px-24 bg-blue-500/[0.02] z-10 border-y border-white/5">
                <div className="max-w-7xl mx-auto w-full">
                    <div className="text-center mb-12">
                        <span className="section-label text-center">Architects of the Modern Era</span>
                        <FlipFadeText
                            words={["VANGUARD UNITS.", "PIONEER MINDS.", "LEGACY BUILDERS."]}
                            interval={3000}
                            textClassName="text-5xl md:text-8xl font-black text-white tracking-tighter justify-center"
                            className="min-h-[60px] md:min-h-[100px]"
                        />
                    </div>

                    <TestimonialsCard
                        items={[
                            {
                                id: "kalam",
                                title: "Dr. APJ Abdul Kalam",
                                description: "The 'Missile Man of India' who architected the Integrated Guided Missile Development Programme and served as the 11th President.",
                                image: "/assets/scientists/kalam.jpg"
                            },
                            {
                                id: "bhabha",
                                title: "Dr. Homi J. Bhabha",
                                description: "The father of the Indian nuclear programme, founding director of TIFR, and a visionary in quantum theory and cosmic radiation.",
                                image: "/assets/scientists/bhabha.jpg"
                            },
                            {
                                id: "sarabhai",
                                title: "Dr. Vikram Sarabhai",
                                description: "The father of the Indian Space Programme (ISRO). A physicist and industrialist who initiated space research and helped develop nuclear power in India.",
                                image: "/assets/scientists/sarabhai.jpg"
                            },
                            {
                                id: "raman",
                                title: "C.V. Raman",
                                description: "Nobel Laureate in Physics (1930) for the 'Raman Effect', demonstrating the scattering of light. The first Asian to receive a Nobel Prize in any branch of science.",
                                image: "/assets/scientists/raman.jpg"
                            },
                            {
                                id: "bose-sn",
                                title: "Satyendra Nath Bose",
                                description: "Theoretical physicist best known for his work on quantum mechanics in the early 1920s, providing the foundation for Bose-Einstein statistics and the theory of the Bose-Einstein condensate.",
                                image: "/assets/scientists/bose-sn.jpg"
                            },
                            {
                                id: "ramanujan",
                                title: "Srinivasa Ramanujan",
                                description: "One of the greatest mathematicians of all time. Made substantial contributions to mathematical analysis, number theory, infinite series, and continued fractions.",
                                image: "/assets/scientists/ramanujan.jpg"
                            },
                            {
                                id: "bose-jc",
                                title: "Jagadish Chandra Bose",
                                description: "A polymath, physicist, biologist, biophysicist, botanist and archaeologist, and an early writer of science fiction. He pioneered the investigation of radio and microwave optics.",
                                image: "/assets/scientists/bose-jc.jpg"
                            },
                            {
                                id: "kalpana",
                                title: "Kalpana Chawla",
                                description: "The first woman of Indian origin to go to space. An engineer and astronaut who flew on the Space Shuttle Columbia.",
                                image: "/assets/scientists/kalpana.jpg"
                            },
                            {
                                id: "venki",
                                title: "Venkatraman Ramakrishnan",
                                description: "Nobel Laureate in Chemistry (2009) for studies of the structure and function of the ribosome.",
                                image: "/assets/scientists/venki.jpg"
                            },
                            {
                                id: "chandrasekhar",
                                title: "Subrahmanyan Chandrasekhar",
                                description: "Nobel Laureate in Physics (1983) for his theoretical studies of the physical processes of importance to the structure and evolution of the stars (Chandrasekhar Limit).",
                                image: "/assets/scientists/chandrasekhar.jpg"
                            },
                            {
                                id: "tessy",
                                title: "Tessy Thomas",
                                description: "Known as the 'Missile Woman of India', she is a distinguished scientist who served as the Project Director for Agni-IV missile in DRDO.",
                                image: "/assets/scientists/tessy.png"
                            },
                            {
                                id: "visvesvaraya",
                                title: "M. Visvesvaraya",
                                description: "One of India's greatest civil engineers and statesmen, often regarded as the 'Father of Indian Engineering'.",
                                image: "/assets/scientists/visvesvaraya.jpg"
                            }
                        ]}
                        width={500}
                        className="w-full"
                        autoPlay={true}
                        autoPlayInterval={2000}
                    />
                </div>
            </section>

            {/* The Archive Section */}
            <section className="relative py-32 px-6 flex flex-col items-center justify-center min-h-[80vh] bg-black/40 z-10 border-t border-white/5">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-20 z-10 tracking-tighter">
                    THE <span className="text-purple-500">ARCHIVE</span>
                </h2>
                <div className="relative z-20">
                    <InteractiveBook
                        coverImage="/images/vigyan-codex-premium.png"
                        bookTitle="VIGYAN CODEX"
                        bookAuthor="THE COLLECTIVE"
                        width={350}
                        height={500}
                        pages={[
                            {
                                pageNumber: 1,
                                title: "The Mission",
                                content: (
                                    <div className="flex flex-col gap-4">
                                        <p>To restore the <span className="font-bold">DNA of Excellence</span>.</p>
                                        <p>Vigyan.prep is not just a platform; it is a movement to reclaim the intellectual heritage that once mapped the stars.</p>
                                        <p>Our curriculum is designed to forge critical thinkers, not just test-takers.</p>
                                    </div>
                                )
                            },
                            {
                                pageNumber: 2,
                                title: "Pramana",
                                content: (
                                    <div className="flex flex-col gap-4">
                                        <p>We recognize the Pramana System as the ultimate methodology for truth.</p>
                                        <p>1. <strong>Pratyaksha</strong> (Perception)</p>
                                        <p>2. <strong>Anumana</strong> (Inference)</p>
                                        <p>3. <strong>Shabda</strong> (Testimony)</p>
                                    </div>
                                )
                            },
                            {
                                pageNumber: 3,
                                title: "The Future",
                                content: (
                                    <div className="flex flex-col gap-4">
                                        <p>The future belongs to those who can synthesize ancient wisdom with modern computation.</p>
                                        <p>Join us in this journey of discovery.</p>
                                        <p className="text-center font-bold mt-8">INITIATE TRAJECTORY</p>
                                    </div>
                                )
                            }
                        ]}
                    />
                </div>
            </section>

            {/* Final Terminal Architecture */}
            <footer className="py-24 border-t border-white/5 bg-black/80 backdrop-blur-3xl relative z-10">
                <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-12">
                    <div className="flex flex-col items-center gap-6">
                        <div className="flex items-center gap-3 text-blue-500 font-mono text-[10px] uppercase tracking-[1em] opacity-60">
                            <Terminal className="w-4 h-4" />
                            System Directive: Knowledge.Unlocked
                        </div>
                        <div className="h-px w-80 bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
                    </div>

                    <div className="grid grid-cols-3 gap-24 opacity-10 hover:opacity-30 transition-opacity duration-1000">
                        {["INTEGRITY", "PRECISION", "FUTURE"].map((text) => (
                            <span key={text} className="text-[10px] font-black tracking-[1em] uppercase">{text}</span>
                        ))}
                    </div>

                    <p className="text-slate-600 text-[10px] uppercase tracking-[0.5em] font-medium">
                        © 2027 Vigyan.prep Nexus <span className="mx-6 opacity-30">|</span> Authorized for National Development
                    </p>
                </div>
            </footer>
        </div>
    );
}
