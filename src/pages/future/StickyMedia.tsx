import { motion, AnimatePresence } from "framer-motion";

import { Chapter } from "./types";

interface StickyMediaProps {
    chapters: Chapter[];
    activeId: string;
}

const StickyMedia = ({ chapters, activeId }: StickyMediaProps) => {
    const activeChapter = chapters.find((c: Chapter) => c.id === activeId) || chapters[0];

    return (
        <div className="w-full h-full p-2 bg-white/[0.03] border border-white/10 rounded-sm overflow-hidden relative group font-mono">
            {/* Application Chrome Header */}
            <div className="flex items-center justify-between px-3 py-2 bg-white/5 border-b border-white/5 rounded-t-sm">
                <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                    <div className="w-2 h-2 rounded-full bg-white/10" />
                </div>
                <div className="text-[9px] text-white/20 uppercase tracking-widest">
                    Vigyan_Render // {activeId}.view
                </div>
                <div className="w-8" />
            </div>

            <div className="relative aspect-[16/10] overflow-hidden bg-black">
                {/* Modern Technical HUD */}
                <div className="absolute inset-0 z-20 pointer-events-none p-4 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className="px-2 py-0.5 bg-cyan-500 text-black text-[9px] font-bold uppercase">
                            LIVE_DATA
                        </div>
                        <div className="text-right">
                            <div className="text-[8px] text-white/40 uppercase">Lat: 28.6139° N</div>
                            <div className="text-[8px] text-white/40 uppercase">Lon: 77.2090° E</div>
                        </div>
                    </div>

                    <div className="flex justify-between items-end">
                        <div className="flex flex-col gap-1">
                            <div className="w-12 h-0.5 bg-cyan-500/50" />
                            <div className="text-[8px] text-cyan-400 font-bold uppercase">Processing...</div>
                        </div>
                        <div className="text-[8px] text-white/20 uppercase">
                            Stream_ID // {Math.random().toString(16).slice(2, 8)}
                        </div>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeChapter.image}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{
                            duration: 0.8,
                            ease: [0.16, 1, 0.3, 1]
                        }}
                        className="relative w-full h-full"
                    >
                        <img
                            src={activeChapter.image}
                            alt={activeChapter.title}
                            className="w-full h-full object-cover opacity-80"
                        />

                        {/* Digital Scanline Effect */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none" style={{ backgroundSize: '100% 2px, 3px 100%' }} />
                    </motion.div>
                </AnimatePresence>

                {/* Cyber Glow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent pointer-events-none" />
            </div>
        </div>
    );
};

export default StickyMedia;
