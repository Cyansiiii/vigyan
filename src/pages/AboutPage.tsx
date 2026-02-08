"use client";

import React, { useEffect } from "react";
import { LiquidMetalButton } from "@/components/ui/liquid-metal";
import { MaskedAvatars } from "@/components/ui/masked-avatars";
import { PerspectiveGrid } from "@/components/ui/perspective-grid";
import { CreepyButton } from "@/components/ui/creepy-button";
import { AstronautCanvas } from "@/components/AstronautCanvas";
import { ZenRain } from "@/components/ui/zen-rain";
import { FolderPreview } from "@/components/ui/folder-preview";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { ArrowRight, Binary, Microscope, Zap, Compass, Atom, ShieldCheck, Target, Trophy, Terminal } from "lucide-react";
import "./AboutPage.css";

export default function AboutPage() {
    // Navigation handlers
    const handleInitiateTrajectory = () => {
        window.location.href = '/testfirstpage.html';
    };

    const handleSystemOverview = () => {
        const section = document.getElementById('philosophy-section');
        section?.scrollIntoView({ behavior: 'smooth' });
    };

    // Subject discipline icons (using high-quality science imagery)
    const avatars = [
        { avatar: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=100&auto=format&fit=crop", name: "Physics" },
        { avatar: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?q=80&w=100&auto=format&fit=crop", name: "Biology" },
        { avatar: "https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=100&auto=format&fit=crop", name: "Math" },
        { avatar: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?q=80&w=100&auto=format&fit=crop", name: "Chemistry" },
    ];

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
                <PerspectiveGrid gridSize={40} className="opacity-10" />
                <ZenRain />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent_50%)]"></div>
            </div>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center px-6 lg:px-24 z-10 pt-20">
                <div className="max-w-5xl w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="section-label group cursor-default">
                            Institutional Directives <span className="text-white/20 px-2">//</span> <span className="text-white group-hover:text-blue-500 transition-colors duration-500">v2.0 ZEN SCIENCE</span>
                        </span>

                        <div className="mb-14">
                            <h1 className="systematic-heading text-6xl md:text-9xl tracking-tighter">
                                <span className="block opacity-30">SYMMETRY OF</span>
                                <span className="block gradient-text">ZEN SCIENCE.</span>
                            </h1>
                        </div>

                        <p className="hero-subtitle text-xl md:text-3xl max-w-3xl mb-14 font-light leading-relaxed">
                            A confluence of <span className="text-blue-500 italic font-medium">Rational Inquiry</span> and
                            the <span className="text-white font-bold">Scientific Vanguard</span>.
                            Bridging ancient logic with the physics of tomorrow.
                        </p>

                        <div className="flex flex-wrap items-center gap-10">
                            <LiquidMetalButton size="lg" onClick={handleInitiateTrajectory}>
                                <span className="flex items-center gap-3">
                                    Initiate Trajectory
                                    <ArrowRight className="w-5 h-5" />
                                </span>
                            </LiquidMetalButton>

                            <button
                                onClick={handleSystemOverview}
                                className="text-slate-500 hover:text-white transition-all uppercase tracking-[0.4em] text-[9px] font-black flex items-center gap-6 group cursor-pointer bg-transparent border-none"
                            >
                                <span className="w-12 h-px bg-white/10 group-hover:w-20 group-hover:bg-blue-500 transition-all duration-500"></span>
                                <span className="reveal-underline">System Overview</span>
                            </button>
                        </div>

                        <div className="mt-28 flex items-center gap-10">
                            <MaskedAvatars avatars={avatars} />
                            <div className="h-10 w-px bg-white/10"></div>
                            <div className="text-sm font-mono tracking-tighter text-slate-500">
                                <span className="block text-white font-black text-3xl stat-glow">10,000+</span>
                                <span className="uppercase text-[10px] tracking-[0.4em] opacity-40">Neural Nodes Active</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="absolute right-[-5%] top-0 w-3/5 h-full opacity-40 pointer-events-none hidden xl:block">
                    <AstronautCanvas />
                </div>
            </section>

            {/* Core Philosophy Section */}
            <section id="philosophy-section" className="relative py-48 px-6 lg:px-24 z-10 bg-gradient-to-b from-transparent via-blue-500/[0.01] to-transparent">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-40 items-start">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1 }}
                            viewport={{ once: true }}
                        >
                            <span className="section-label">Logic Framework // Pramana</span>
                            <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tight leading-[0.85]">
                                The Science of <br />
                                <span className="gradient-text reveal-underline">Discovery.</span>
                            </h2>

                            <div className="buddhist-quote-container border-blue-500/50 glass-panel p-10">
                                <p className="text-2xl md:text-4xl text-white font-light italic leading-relaxed mb-8">
                                    "Do not believe in anything simply because you have heard it... but after observation and analysis... accept it and live up to it."
                                </p>
                                <span className="text-blue-500 font-mono tracking-[0.5em] text-[10px] uppercase opacity-60">— The Buddha Code</span>
                            </div>

                            <p className="text-slate-400 text-lg leading-relaxed font-light mt-12 max-w-xl">
                                We recognize the <span className="text-white font-medium">Pramana System</span> as the world's most ancient scientific methodology. It demands rigorous proof via direct perception and logical inference.
                            </p>
                        </motion.div>

                        <div className="systematic-grid mt-12 lg:mt-0">
                            {[
                                { icon: <ShieldCheck className="w-6 h-6" />, title: "Conceptual Integrity", desc: "Upholding absolute truth through rigorous counter-questioning and persistent verification." },
                                { icon: <Target className="w-6 h-6" />, title: "Focused Discipline", desc: "A mind stilled by Zen is a mind capable of cracking the most complex quantum equations." },
                                { icon: <Trophy className="w-6 h-6" />, title: "Vanguard Legacy", desc: "Restoring India's status as the global epicentre of systematic and verifiable knowledge." }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1, duration: 0.8 }}
                                    viewport={{ once: true }}
                                    className="systematic-card"
                                >
                                    <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 mb-10 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-xl font-bold text-white mb-4 uppercase tracking-wider">{item.title}</h4>
                                    <p className="text-slate-500 leading-relaxed text-sm font-light">{item.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Systematic Units: Pioneers */}
            <section className="relative py-32 px-6 lg:px-24 bg-blue-500/[0.02] z-10 border-y border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <span className="section-label text-center">Architects of the Modern Era</span>
                        <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4">VANGUARD UNITS.</h3>
                        <p className="text-slate-400 max-w-2xl mx-auto">The neural network of Indian science. 12 distinct nodes of excellence.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {[
                            { name: "C.V. Raman", role: "Physics // Nobel Laureate", img: "/assets/scientists/raman.jpg", sub: "Physics" },
                            { name: "Homi J. Bhabha", role: "Nuclear Physics // Architect", img: "/assets/scientists/bhabha.jpg", sub: "Physics" },
                            { name: "Vikram Sarabhai", role: "Space Research // Visionary", img: "/assets/scientists/sarabhai.jpg", sub: "Space" },
                            { name: "APJ Abdul Kalam", role: "Rocket Systems // Leader", img: "/assets/scientists/kalam.jpg", sub: "Space" },
                            { name: "S. Ramanujan", role: "Mathematics // Infinite", img: "/assets/scientists/ramanujan.jpg", sub: "Mathematics" },
                            { name: "J.C. Bose", role: "Radio Science // Biophysics", img: "/assets/scientists/bose-jc.jpg", sub: "Physics" },
                            { name: "S.N. Bose", role: "Quantum Statistics // Boson", img: "/assets/scientists/bose-sn.jpg", sub: "Physics" },
                            { name: "S. Chandrasekhar", role: "Astrophysics // Nobel Laureate", img: "/assets/scientists/chandrasekhar.jpg", sub: "Physics" },
                            { name: "Kalpana Chawla", role: "Aerospace // Astronaut", img: "/assets/scientists/kalpana.jpg", sub: "Space" },
                            { name: "Tessy Thomas", role: "Missile Systems // Agni", img: "/assets/scientists/tessy.png", sub: "Defense" },
                            { name: "M. Visvesvaraya", role: "Engineering // Builder", img: "/assets/scientists/visvesvaraya.jpg", sub: "Engineering" },
                            { name: "V. Ramakrishnan", role: "Structural Biology // Nobel", img: "/assets/scientists/venki.jpg", sub: "Biology" },
                        ].map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                viewport={{ once: true }}
                                className="group relative overflow-hidden rounded-x border border-white/10 bg-white/5 hover:bg-white/10 transition-colors duration-500"
                            >
                                <div className="aspect-[4/5] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                                    <img src={s.img} alt={s.name} className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700" />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80"></div>
                                <div className="absolute bottom-0 left-0 w-full p-6">
                                    <div className="text-[9px] uppercase tracking-[0.2em] text-blue-500 mb-2 font-mono">{s.sub}</div>
                                    <h4 className="text-xl font-bold text-white leading-tight mb-1">{s.name}</h4>
                                    <p className="text-slate-400 text-xs uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">{s.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Heritage Units */}
            <section className="relative py-48 px-6 lg:px-24 z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                        <div>
                            <span className="section-label">Ancestral Intel</span>
                            <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tight text-white reveal-underline">HERITAGE.</h2>
                            <p className="text-xl text-slate-400 font-light leading-relaxed mb-16 max-w-xl">
                                We are descendants of a culture that mapped stars thousands of years ago. Our mission: restore that <span className="text-white font-bold">DNA of Excellence</span> through analytical precision and institutional rigor.
                            </p>
                            <div className="flex gap-16">
                                {[{ icon: <Binary />, label: "Ancient Logic" }, { icon: <Microscope />, label: "Deep Inquiry" }, { icon: <Compass />, label: "Guided Path" }].map((u, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ y: -5 }}
                                        className="flex flex-col gap-5 group cursor-help"
                                    >
                                        <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-500">
                                            {u.icon}
                                        </div>
                                        <span className="text-white/40 group-hover:text-white font-bold text-[10px] tracking-[0.3em] uppercase transition-colors duration-500">{u.label}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-12 justify-center lg:justify-end">
                            <FolderPreview variant="devi" label="Logic Artifacts" size="lg" images={["/assets/heritage/buddhist_logic_pramana_heritage_1770422630234.png"]} />
                            <FolderPreview variant="ardra" label="Tactical Scroll" size="lg" images={["/assets/heritage/chanakya_strategic_brilliance_1770422646971.png"]} />
                        </div>
                    </div>
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
