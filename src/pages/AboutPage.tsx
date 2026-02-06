"use client";

import React from "react";
import { LiquidMetalButton } from "@/components/ui/liquid-metal";
import { LiquidText } from "@/components/ui/liquid-text";
import { FolderPreview } from "@/components/ui/folder-preview";
import { MaskedAvatars } from "@/components/ui/masked-avatars";
import { PerspectiveGrid } from "@/components/ui/perspective-grid";
import { FlipFadeText } from "@/components/ui/flip-fade-text";
import { CreepyButton } from "@/components/ui/creepy-button";
import { AstronautCanvas } from "@/components/AstronautCanvas";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, Binary, Microscope } from "lucide-react";

export default function AboutPage() {
    const avatars = [
        { avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop", name: "Physics" },
        { avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop", name: "Biology" },
        { avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop", name: "Math" },
        { avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop", name: "Chemistry" },
    ];

    return (
        <div className="relative min-h-screen bg-[#020617] text-white selection:bg-blue-500/30 overflow-hidden">
            {/* Premium Background */}
            <div className="fixed inset-0 z-0">
                <PerspectiveGrid
                    gridSize={40}
                    className="opacity-20"
                />
            </div>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center px-6 lg:px-24 z-10 pt-20">
                <div className="max-w-4xl w-full">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <span className="h-px w-12 bg-blue-500/50"></span>
                            <span className="text-xs uppercase tracking-[0.5em] text-blue-500 font-bold">
                                Science.Identity // v2027.Antimatter
                            </span>
                        </div>

                        <div className="mb-10">
                            <LiquidText
                                text="PIONEERING THE"
                                className="h-24 md:h-32 font-black tracking-tighter leading-none text-white block"
                                fontSize={150}
                            />
                            <div className="flex items-baseline gap-4 mt-2">
                                <span className="font-serif italic text-blue-500 text-6xl md:text-8xl">Test</span>
                                <LiquidText
                                    text="REVOLUTION."
                                    className="h-24 md:h-32 font-black tracking-tighter leading-none text-white flex-1"
                                    fontSize={150}
                                />
                            </div>
                        </div>

                        <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed max-w-2xl mb-12">
                            We don't just build <span className="hero-italic">test series</span>.
                            We build <span className="hero-italic text-white">intellectual impact</span> for India's
                            future researchers.
                        </p>

                        <div className="flex flex-wrap items-center gap-8">
                            <LiquidMetalButton
                                size="lg"
                                metalConfig={{
                                    colorBack: "#1e293b",
                                    colorTint: "#3b82f6",
                                    distortion: 0.2,
                                    speed: 0.4
                                }}
                            >
                                Start a Project
                            </LiquidMetalButton>

                            <CreepyButton className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group">
                                Explore Our Work <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </CreepyButton>
                        </div>

                        <div className="mt-20 flex items-center gap-6">
                            <MaskedAvatars avatars={avatars} />
                            <div className="text-sm border-l border-white/10 pl-6">
                                <span className="block font-bold text-white text-lg">4,500+</span>
                                <span className="text-slate-500 uppercase tracking-widest text-[10px]">Active Researchers</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Cinematic 3D Section */}
                <div className="absolute right-[-10%] top-0 w-3/5 h-full opacity-80 pointer-events-none">
                    <AstronautCanvas />
                </div>
            </section>

            {/* Logic Dossiers Section */}
            <section className="relative py-40 px-6 lg:px-24 bg-black/50 backdrop-blur-3xl border-y border-white/5 z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-24 text-center lg:text-left">
                        <FlipFadeText
                            words={["Neural.ARCHITECTURE", "Pramana.LOGIC", "Vigyan.SYSTEM"]}
                            className="text-blue-500 text-sm font-mono uppercase tracking-[0.4em] mb-4 h-12"
                            textClassName="text-sm tracking-[0.4em]"
                        />
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tight">
                            The DNA <br /> of <span className="text-blue-500">Logic.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
                        <motion.div
                            whileInView={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 50 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="group relative">
                                <FolderPreview
                                    variant="devi"
                                    label="Pramana Methodology"
                                    size="lg"
                                    className="bg-slate-900/50"
                                    images={[
                                        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=200&auto=format&fit=crop",
                                        "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=200&auto=format&fit=crop"
                                    ]}
                                />
                                <div className="mt-6 p-4">
                                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 text-blue-500 font-mono text-xs">01A</div>
                                    <p className="text-slate-400 leading-relaxed">
                                        Built on the laws of deduction, our assessment engine maps your conceptual clarity.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            whileInView={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 50 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="group relative">
                                <FolderPreview
                                    variant="devi"
                                    label="Conceptual Integrity"
                                    size="lg"
                                    className="bg-slate-900/50"
                                    images={[
                                        "https://images.unsplash.com/photo-1544383335-c58bc96b5dae?q=80&w=200&auto=format&fit=crop",
                                        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=200&auto=format&fit=crop"
                                    ]}
                                />
                                <div className="mt-6 p-4">
                                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 text-blue-500 font-mono text-xs">01B</div>
                                    <p className="text-slate-400 leading-relaxed">
                                        Filters for the scientists of tomorrow. We restore the rigour required to pass.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Footer / CTA Meta */}
            <footer className="py-20 text-center text-slate-600 text-xs uppercase tracking-[0.4em]">
                Vigyan.prep System // Authorized Personnel Only
            </footer>
        </div>
    );
}
