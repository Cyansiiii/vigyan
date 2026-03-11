import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command, Search, ArrowRight, Zap, Globe, Cpu, Microscope } from "lucide-react";
import { CHAPTERS } from "./chapters";
import { useScrollSpy } from "./useScrollSpy";
import { Chapter, Stat, Phase, SectorItem } from "./types";
import TOC from "./TOC";
import StorySection from "./StorySection";
import SearchPalette from "./SearchPalette";
import StickyMedia from "./StickyMedia";

const FutureStory = () => {
    const activeId = useScrollSpy(CHAPTERS.map((c: Chapter) => c.id), 100);
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsSearchOpen(prev => !prev);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className="min-h-screen bg-[#030712] text-white selection:bg-cyan-500/30 relative overflow-hidden font-sans">
            {/* Hydrogen Grid Overlay */}
            <div
                className="fixed inset-0 pointer-events-none z-[0] opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                                    linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Anamorphic Glows */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
                <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" style={{ animationDuration: '8s' }} />
                <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full animate-pulse" style={{ animationDuration: '12s' }} />
            </div>

            {/* Navigation Header - Hydrogen Style */}
            <header className="fixed top-0 left-0 right-0 z-[60] bg-black/40 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-[1700px] mx-auto px-10 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                            <div className="w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-sm" />
                            <span className="text-lg font-black tracking-tighter uppercase font-sans">Vigyan<span className="text-cyan-400">.</span></span>
                        </div>
                        <div className="h-4 w-px bg-white/10 mx-2" />
                        <div className="flex flex-col">
                            <span className="text-[9px] font-mono text-cyan-400/80 uppercase tracking-[0.2em] leading-none mb-1">Status: Active</span>
                            <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest leading-none">Node // future.pipeline.01</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        <nav className="hidden xl:flex items-center gap-6">
                            {['Hydrogen', 'Open Source', 'Storefront'].map((item) => (
                                <span key={item} className="text-[10px] font-mono text-white/40 uppercase tracking-widest hover:text-cyan-400 cursor-pointer transition-colors">
                                    {item}
                                </span>
                            ))}
                        </nav>

                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-sm text-[11px] font-mono text-gray-400 hover:text-white hover:bg-white/10 hover:border-cyan-500/50 transition-all group"
                        >
                            <span className="text-cyan-500 opacity-50 group-hover:opacity-100">$</span>
                            <span>query_pipeline</span>
                            <div className="flex items-center gap-1 ml-6 py-0.5 px-1.5 bg-white/10 rounded-sm text-[9px] text-white/40">
                                <Command className="w-2.5 h-2.5" />
                                <span>K</span>
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-[1700px] mx-auto px-10 pt-44 pb-32">
                <div className="flex flex-col lg:flex-row gap-8 items-start relative">

                    {/* Column 1: Sticky TOC (Sidebar Gutter) */}
                    <div className="hidden lg:block w-[250px] shrink-0 sticky top-44 h-fit">
                        <TOC chapters={CHAPTERS} activeId={activeId} />
                    </div>

                    {/* Column 2: Content (Scrollable) */}
                    <div className="flex-1 lg:max-w-[450px] xl:max-w-[500px]">
                        {CHAPTERS.map((chapter: Chapter) => (
                            <StorySection
                                key={chapter.id}
                                id={chapter.id}
                                title={chapter.title}
                                desc={chapter.desc}
                            >
                                {chapter.id === "intro" && (
                                    <div className="space-y-12">
                                        <p className="text-xl text-white/70 leading-relaxed font-light font-sans tracking-tight">
                                            {chapter.summary}
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {chapter.stats?.map((stat: Stat, i: number) => (
                                                <div key={i} className="p-6 bg-white/[0.02] border border-white/5 rounded-sm group/stat hover:border-cyan-500/30 transition-all">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{stat.label}</div>
                                                        <Zap className="w-3 h-3 text-cyan-500/50 group-hover/stat:text-cyan-400" />
                                                    </div>
                                                    <div className={`text-4xl font-black tracking-tighter ${stat.color} group-hover/stat:scale-[1.02] transition-transform`}>{stat.value}</div>
                                                    <div className="mt-4 h-1 w-full bg-white/5 overflow-hidden">
                                                        <motion.div
                                                            initial={{ x: "-100%" }}
                                                            whileInView={{ x: "0%" }}
                                                            transition={{ duration: 1, delay: i * 0.1 }}
                                                            className="h-full bg-cyan-500/30 w-[70%]"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {chapter.id === "trajectory" && (
                                    <div className="relative pl-10 space-y-16">
                                        <div className="absolute left-5 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-500 via-blue-600 to-transparent opacity-20" />

                                        {chapter.phases?.map((phase: Phase, i: number) => (
                                            <div key={i} className="relative group/phase">
                                                <div className="absolute -left-[25px] top-1.5 w-2.5 h-2.5 bg-[#030712] border border-cyan-500 group-hover/phase:shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all z-10" />
                                                <div className="mb-4 flex items-center gap-3">
                                                    <span className={`text-[10px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 bg-white/5 border border-white/10 ${phase.tagColor}`}>{phase.tag}</span>
                                                    <span className="text-[10px] font-mono text-white/30">[{phase.years}]</span>
                                                </div>
                                                <h4 className="text-xl font-black text-white mb-3 uppercase tracking-tight">{phase.title}</h4>
                                                <p className="text-sm text-white/40 leading-relaxed font-sans">{phase.content}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {chapter.id === "sectors" && (
                                    <div className="grid grid-cols-1 gap-4">
                                        {chapter.items?.map((item: SectorItem, i: number) => (
                                            <div key={i} className="group/card p-6 bg-white/[0.02] border border-white/5 rounded-sm hover:border-cyan-500/40 hover:bg-cyan-500/[0.02] transition-all duration-300">
                                                <div className="flex items-center justify-between mb-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center">
                                                            {i === 0 && <Cpu className="w-4 h-4 text-cyan-400" />}
                                                            {i === 1 && <Globe className="w-4 h-4 text-cyan-400" />}
                                                            {i === 2 && <Microscope className="w-4 h-4 text-cyan-400" />}
                                                        </div>
                                                        <span className="text-[10px] font-mono text-cyan-500/80 uppercase tracking-widest">{item.sector}</span>
                                                    </div>
                                                    <span className="text-[10px] font-mono text-white/10">0x0{i + 1}</span>
                                                </div>
                                                <h4 className="text-xl font-black text-white mb-2 group-hover/card:text-cyan-400 transition-colors uppercase tracking-tight">{item.title}</h4>
                                                <p className="text-sm text-white/40 leading-relaxed font-sans">{item.content}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {chapter.id === "feedback" && (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 gap-4">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className="w-1 h-1 bg-cyan-500 rounded-full" />
                                                    <label className="text-[9px] font-mono font-bold text-white/30 uppercase tracking-[0.2em]">identity::email</label>
                                                </div>
                                                <input type="email" placeholder="scientist@vigyan.prep" className="w-full bg-white/[0.02] border border-white/10 rounded-sm px-4 py-3 text-sm font-mono focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/[0.02] transition-all text-white placeholder:text-white/10" />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className="w-1 h-1 bg-cyan-500 rounded-full" />
                                                    <label className="text-[9px] font-mono font-bold text-white/30 uppercase tracking-[0.2em]">log::analysis</label>
                                                </div>
                                                <textarea placeholder="Enter system analysis report..." className="w-full bg-white/[0.02] border border-white/10 rounded-sm px-4 py-3 text-sm font-mono h-32 focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/[0.02] transition-all text-white placeholder:text-white/10 resize-none" />
                                            </div>
                                        </div>
                                        <button className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-black font-black text-[11px] uppercase tracking-[0.2em] rounded-sm transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)] active:scale-[0.99] flex items-center justify-center gap-2">
                                            <Zap className="w-3.5 h-3.5" />
                                            Execute_Upload
                                        </button>
                                    </div>
                                )}
                            </StorySection>
                        ))}
                    </div>

                    {/* Column 3: Sticky Media Panel (Right) */}
                    <div className="hidden lg:block flex-1 sticky top-44 min-w-[500px]">
                        <StickyMedia chapters={CHAPTERS} activeId={activeId} />
                    </div>

                </div>
            </main>

            <SearchPalette
                chapters={CHAPTERS}
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
            />

            {/* Footer Decoration */}
            <footer className="py-20 border-t border-white/5">
                <div className="max-w-[1400px] mx-auto px-6 flex flex-col items-center gap-6">
                    <div className="w-12 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                    <p className="text-[10px] font-mono text-gray-600 tracking-widest uppercase">
                        End of Line // Strategic Vanguard v.2025.1
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default FutureStory;
