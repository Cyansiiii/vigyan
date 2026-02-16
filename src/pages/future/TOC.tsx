import { motion } from "framer-motion";

const TOC = ({ chapters, activeId }) => {
    const scrollTo = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    return (
        <nav className="sticky top-32 w-64 shrink-0 hidden lg:block">
            <div className="space-y-1">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 px-4">
                    Chapters
                </p>
                {chapters.map((chapter) => (
                    <button
                        key={chapter.id}
                        onClick={() => scrollTo(chapter.id)}
                        className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 group flex items-center gap-3 ${activeId === chapter.id
                                ? "bg-white/5 text-white shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                                : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                            }`}
                    >
                        <div
                            className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${activeId === chapter.id
                                    ? "bg-blue-500 scale-125 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                                    : "bg-gray-700 opacity-0 group-hover:opacity-100"
                                }`}
                        />
                        <span className="text-sm font-medium tracking-tight whitespace-nowrap overflow-hidden text-ellipsis">
                            {chapter.title}
                        </span>
                    </button>
                ))}
            </div>

            {/* Premium HUD decoration */}
            <div className="mt-12 pt-8 border-t border-white/5 px-4">
                <div className="flex items-center gap-2 text-[10px] text-blue-500/50 font-mono tracking-tighter uppercase">
                    <div className="w-2 h-2 rounded-full border border-current animate-pulse" />
                    System Active // v2025.1
                </div>
            </div>
        </nav>
    );
};

export default TOC;
