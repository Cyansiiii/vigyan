import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Command, Search, ArrowRight, Zap, Globe, Cpu, Microscope } from "lucide-react";
import { CHAPTERS } from "./chapters";
import { useScrollSpy } from "./useScrollSpy";
import TOC from "./TOC";
import StorySection from "./StorySection";
import SearchPalette from "./SearchPalette";

const FutureStory = () => {
    const activeId = useScrollSpy(CHAPTERS.map((c) => c.id), 100);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsSearchOpen(true);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30">
            {/* Background elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full" />
                <div className="absolute inset-0 opacity-[0.02]"
                    style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            </div>

            {/* Navigation Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold tracking-tighter italic">Vigyan.prep</span>
                        <div className="h-4 w-px bg-white/10 mx-2" />
                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Future Pipeline</span>
                    </div>

                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-xs text-gray-400 hover:text-white hover:bg-white/10 transition-all group"
                    >
                        <Search className="w-3.5 h-3.5" />
                        <span>Search pipeline...</span>
                        <div className="flex items-center gap-1 ml-4 py-0.5 px-1.5 bg-white/5 border border-white/10 rounded text-[9px] font-mono">
                            <Command className="w-2.5 h-2.5" />
                            <span>K</span>
                        </div>
                    </button>
                </div>
            </header>

            <main className="max-w-[1400px] mx-auto px-6 pt-40 pb-32">
                <div className="flex gap-16 xl:gap-24 items-start">
                    {/* Sticky TOC */}
                    <TOC chapters={CHAPTERS} activeId={activeId} />

                    {/* Content Sections */}
                    <div className="flex-1 max-w-4xl">
                        {CHAPTERS.map((chapter) => (
                            <StorySection
                                key={chapter.id}
                                id={chapter.id}
                                title={chapter.title}
                                desc={chapter.desc}
                            >
                                {chapter.id === "intro" && (
                                    <div className="space-y-12">
                                        <p className="text-xl text-gray-300 leading-relaxed font-light">
                                            {chapter.summary}
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {chapter.stats.map((stat, i) => (
                                                <div key={i} className="p-6 bg-white/[0.03] border border-white/5 rounded-2xl">
                                                    <div className={`text-4xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
                                                    <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">{stat.label}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {chapter.id === "trajectory" && (
                                    <div className="relative pl-12 space-y-16">
                                        {/* Vertical line for trajectory */}
                                        <div className="absolute left-6 top-2 bottom-2 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-20" />

                                        {chapter.phases.map((phase, i) => (
                                            <div key={i} className="relative">
                                                <div className="absolute -left-[30px] top-1 w-3 h-3 rounded-full bg-gray-900 border-2 border-white/20 group-hover:border-blue-500 transition-colors z-10" />
                                                <div className="mb-2 flex items-center gap-3">
                                                    <span className={`text-[10px] font-bold uppercase tracking-widest ${phase.tagColor}`}>{phase.tag}</span>
                                                    <span className="text-xs text-gray-500">[{phase.years}]</span>
                                                </div>
                                                <h4 className="text-2xl font-bold text-white mb-2">{phase.title}</h4>
                                                <p className="text-gray-400">{phase.content}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {chapter.id === "sectors" && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {chapter.items.map((item, i) => (
                                            <div key={i} className="group/card p-6 bg-white/[0.03] border border-white/5 rounded-2xl hover:border-blue-500/30 transition-all duration-500">
                                                <div className="flex items-center justify-between mb-4">
                                                    <span className="text-[10px] font-mono text-blue-500 uppercase tracking-widest">{item.sector}</span>
                                                    {i === 0 && <Cpu className="w-4 h-4 text-blue-500/50" />}
                                                    {i === 1 && <Globe className="w-4 h-4 text-purple-500/50" />}
                                                    {i === 2 && <Microscope className="w-4 h-4 text-pink-500/50" />}
                                                </div>
                                                <h4 className="text-xl font-bold text-white mb-2 group-hover/card:text-blue-400 transition-colors">{item.title}</h4>
                                                <p className="text-sm text-gray-400 leading-relaxed">{item.content}</p>
                                                <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-gray-500 opacity-0 group-hover/card:opacity-100 transition-opacity">
                                                    READ INTEL <ArrowRight className="w-3 h-3" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {chapter.id === "feedback" && (
                                    <div className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Email Identity</label>
                                                <input type="email" placeholder="scientist@vigyan.prep" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 transition-colors mt-2" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Roll Sequence</label>
                                                <input type="text" placeholder="00-0000" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500/50 transition-colors mt-2" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Log Entry</label>
                                            <textarea placeholder="Enter system analysis..." className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-sm h-32 focus:outline-none focus:border-blue-500/50 transition-colors mt-2 resize-none" />
                                        </div>
                                        <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-[0.2em] rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98]">
                                            Upload Feedback Data
                                        </button>
                                    </div>
                                )}
                            </StorySection>
                        ))}
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
