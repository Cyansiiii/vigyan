const ROMAN_NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

import { Chapter } from "./types";

interface TOCProps {
    chapters: Chapter[];
    activeId: string;
}

const TOC = ({ chapters, activeId }: TOCProps) => {
    const scrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 140;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    return (
        <nav className="w-full font-mono">
            <div className="space-y-1">
                <div className="flex items-center gap-2 mb-8 px-2">
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">
                        Directory // Index
                    </p>
                </div>

                {chapters.map((chapter, index) => (
                    <button
                        key={chapter.id}
                        onClick={() => scrollTo(chapter.id)}
                        className={`w-full text-left px-3 py-2.5 transition-all duration-300 group flex items-center gap-3 border-l-2 ${activeId === chapter.id
                            ? "bg-cyan-500/5 border-cyan-500 text-cyan-400"
                            : "border-transparent text-white/30 hover:text-white/60 hover:bg-white/[0.02]"
                            }`}
                    >
                        <span className={`text-[9px] w-5 transition-colors ${activeId === chapter.id ? "text-cyan-400" : "text-white/20"}`}>
                            {String(index + 1).padStart(2, '0')}
                        </span>

                        <span className={`text-[11px] uppercase tracking-wider transition-all ${activeId === chapter.id ? "translate-x-1" : ""}`}>
                            {chapter.title}
                        </span>

                        {activeId === chapter.id && (
                            <div className="ml-auto w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                        )}
                    </button>
                ))}
            </div>

            {/* Technical Metadata */}
            <div className="mt-20 pt-8 border-t border-white/5 px-3">
                <div className="flex flex-col gap-3 text-[9px] text-white/20 font-mono tracking-widest uppercase">
                    <div className="flex items-center justify-between">
                        <span>Environment</span>
                        <span className="text-cyan-500/50">Production</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span>Latent_Space</span>
                        <span className="text-white/40">Node.77</span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                        <div className="flex gap-1">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className={`w-1 h-3 ${i < 3 ? 'bg-cyan-500/30' : 'bg-white/5'}`} />
                            ))}
                        </div>
                        <span className="text-[8px] opacity-30">v1.2 // STABLE</span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default TOC;
