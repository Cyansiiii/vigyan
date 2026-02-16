import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const StickyMedia = ({ chapters, activeId }) => {
    const activeChapter = chapters.find((c) => c.id === activeId) || chapters[0];

    const coordSet = useMemo(() =>
        Math.random().toString(36).substring(7).toUpperCase(),
        []);

    return (
        <div className="sticky top-32 w-full aspect-[16/10] overflow-hidden rounded-3xl border border-white/5 bg-white/[0.02] shadow-2xl">
            {/* Subtle HUD Overlay */}
            <div className="absolute inset-0 z-20 pointer-events-none border-4 border-transparent">
                <div className="absolute top-4 left-4 flex gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    <div className="text-[8px] font-mono text-white/40 uppercase tracking-[0.2em]">
                        Live_Feed // {activeId}
                    </div>
                </div>
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                    <div className="text-[10px] font-mono text-white/20 uppercase">
                        Coord_Set::{coordSet}
                    </div>
                </div>
            </div>

            {/* Background Grid Pattern */}
            <div className="absolute inset-0 z-10 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeChapter.image}
                    initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full h-full"
                >
                    <img
                        src={activeChapter.image}
                        alt={activeChapter.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />

                    {/* Subtle vignette/gradient over image to make HUD pop */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default StickyMedia;
