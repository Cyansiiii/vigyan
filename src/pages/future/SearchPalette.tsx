import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Command, ArrowRight } from 'lucide-react';
import { Chapter } from "./types";

interface SearchPaletteProps {
    chapters: Chapter[];
    isOpen: boolean;
    onClose: () => void;
}

const SearchPalette = ({ chapters, isOpen, onClose }: SearchPaletteProps) => {
    const [query, setQuery] = useState("");

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const filteredChapters = chapters.filter((c: Chapter) =>
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        (c.desc && c.desc.toLowerCase().includes(query.toLowerCase())) ||
        (c.summary && c.summary.toLowerCase().includes(query.toLowerCase()))
    );

    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
        onClose();
        setQuery("");
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-[#030712]/80 backdrop-blur-md z-[10000]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: -10 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed left-1/2 top-1/4 -translate-x-1/2 w-full max-w-2xl bg-[#030712] border border-cyan-500/20 rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.5)] z-[10001] overflow-hidden font-mono"
                    >
                        {/* Technical Grid Overlay */}
                        <div className="absolute inset-0 pointer-events-none opacity-[0.05]"
                            style={{
                                backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                                                linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                                backgroundSize: '20px 20px'
                            }}
                        />

                        <div className="relative p-6 border-b border-white/5 flex items-center gap-4 bg-white/5">
                            <span className="text-cyan-500 font-bold">$</span>
                            <input
                                autoFocus
                                type="text"
                                placeholder="execute query_pipeline..."
                                className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/20 text-md"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-sm text-[9px] text-white/40 tracking-widest">
                                <Command className="w-3 h-3" />
                                <span>K / ESC</span>
                            </div>
                        </div>

                        <div className="relative max-h-[450px] overflow-y-auto p-4 custom-scrollbar">
                            {filteredChapters.length > 0 ? (
                                <div className="space-y-1">
                                    {filteredChapters.map((chapter, index) => (
                                        <button
                                            key={chapter.id}
                                            onClick={() => scrollTo(chapter.id)}
                                            className="w-full text-left p-4 hover:bg-cyan-500/5 rounded-sm transition-all flex items-start gap-6 group relative border border-transparent hover:border-cyan-500/20"
                                        >
                                            <div className="text-[10px] text-cyan-500/30 pt-1 w-6">
                                                {String(index + 1).padStart(2, '0')}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-white mb-1 tracking-tight group-hover:text-cyan-400 transition-colors uppercase text-xs">
                                                    {chapter.title}
                                                </h4>
                                                <p className="text-[10px] text-white/30 leading-relaxed font-mono truncate">
                                                    {chapter.desc || chapter.summary}
                                                </p>
                                            </div>
                                            <ArrowRight className="w-4 h-4 text-white/10 group-hover:text-cyan-400 transition-all group-hover:translate-x-1" />
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-12 text-center text-white/20 font-mono text-xs italic">
                                    No records found for trace: "{query}"
                                </div>
                            )}
                        </div>

                        {/* Status Bar */}
                        <div className="px-4 py-2 bg-white/5 border-t border-white/5 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
                                <span className="text-[8px] text-white/30 uppercase tracking-widest">System::Ready</span>
                            </div>
                            <span className="text-[8px] text-white/20 uppercase">Hydrogen_Search_v1.0</span>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default SearchPalette;
