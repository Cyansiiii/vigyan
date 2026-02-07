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
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, Binary, Microscope, Globe, Zap, Compass, Cpu } from "lucide-react";

export default function AboutPage() {
    const avatars = [
        { avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop", name: "Physics" },
        { avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop", name: "Biology" },
        { avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop", name: "Math" },
        { avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop", name: "Chemistry" },
    ];

    return (
        <div className="relative min-h-screen bg-[#020617] text-white selection:bg-blue-500/30 overflow-hidden">
            {/* Navbar Restoration */}
            <Navbar />

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
                                text="ARCHITECTURE OF"
                                className="font-black tracking-tighter leading-none text-white block"
                                fontSize={300}
                                style={{ height: "180px" }}
                            />
                            <div className="flex items-baseline gap-4 mt-2">
                                <span className="logo-vigyan text-6xl md:text-8xl" style={{ textShadow: "0 0 40px rgba(251, 191, 36, 0.4)" }}>Vigyan</span>
                                <LiquidText
                                    text="VANGUARD."
                                    className="font-black tracking-tighter leading-none text-white flex-1"
                                    fontSize={300}
                                    style={{ height: "180px" }}
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

            {/* Heritage Section: Ancient Logic & Strategy */}
            <section className="relative py-40 px-6 lg:px-24 bg-black/50 backdrop-blur-3xl border-y border-white/5 z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-24 text-center lg:text-left">
                        <FlipFadeText
                            words={["Ancient.WISDOM", "Strategic.BRILLIANCE", "Pramana.LOGIC"]}
                            className="text-blue-500 text-sm font-mono uppercase tracking-[0.4em] mb-4 h-12"
                            textClassName="text-sm tracking-[0.4em]"
                        />
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tight">
                            The Heritage <br /> of <span className="text-blue-500">Genius.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 mb-32">
                        <motion.div
                            whileInView={{ opacity: 1, y: 0 }}
                            initial={{ opacity: 0, y: 50 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="group relative">
                                <FolderPreview
                                    variant="devi"
                                    label="Pramana Protocol"
                                    size="lg"
                                    className="bg-slate-900/50"
                                    images={[
                                        "file:///Users/harshanand/.gemini/antigravity/brain/80c3d338-128b-4c95-98cb-c8199d497e34/buddhist_logic_pramana_heritage_1770422630234.png"
                                    ]}
                                />
                                <div className="mt-6 p-4">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                                            <Binary className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-xl font-bold">Buddhist Logic</h3>
                                    </div>
                                    <p className="text-slate-400 leading-relaxed italic">
                                        "Valid means of knowledge — perception and inference. Our engine restores the rigorous rational inquiry of the ancient Pramana masters."
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
                                    label="Aanvikshiki Insight"
                                    size="lg"
                                    className="bg-slate-900/50"
                                    images={[
                                        "file:///Users/harshanand/.gemini/antigravity/brain/80c3d338-128b-4c95-98cb-c8199d497e34/chanakya_strategic_brilliance_1770422646971.png"
                                    ]}
                                />
                                <div className="mt-6 p-4">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                                            <Compass className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-xl font-bold">Chanakya Strategy</h3>
                                    </div>
                                    <p className="text-slate-400 leading-relaxed italic">
                                        "Strategy blended with analytical discipline. We cultivate the strategic smartness of the Arthashastra into every researcher we mentor."
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Modern Era Section */}
                    <div className="mt-40 border-t border-white/5 pt-40">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                            <div>
                                <h2 className="text-5xl md:text-6xl font-bold mb-8 italic font-serif text-blue-500">The Modern Era Pioneers</h2>
                                <p className="text-xl text-slate-400 leading-relaxed mb-8">
                                    From the missile vision of <span className="text-white font-bold">Dr. APJ Abdul Kalam</span> to the space foundations of <span className="text-white font-bold">Vikram Sarabhai</span> and the nuclear pioneering of <span className="text-white font-bold">Homi J. Bhabha</span>.
                                </p>
                                <div className="space-y-6">
                                    {[
                                        { title: "National Vanguard", desc: "Building a knowledge superpower via innovation." },
                                        { title: "Institution Builder", desc: "Strategic application of science for societal benefit." },
                                        { title: "Atomic Architect", desc: "Mastering the fundamental forces of our reality." }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="mt-1"><Zap className="w-5 h-5 text-blue-500" /></div>
                                            <div>
                                                <h4 className="font-bold text-white mb-1 uppercase tracking-wider text-sm">{item.title}</h4>
                                                <p className="text-slate-500 text-sm">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="relative group">
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="rounded-3xl overflow-hidden border border-white/10"
                                >
                                    <img
                                        src="file:///Users/harshanand/.gemini/antigravity/brain/80c3d338-128b-4c95-98cb-c8199d497e34/modern_science_pioneers_india_1770422667638.png"
                                        alt="Modern Science Frontiers"
                                        className="w-full h-auto"
                                    />
                                </motion.div>
                            </div>
                        </div>
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
