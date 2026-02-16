import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Command } from 'lucide-react';

const SearchPalette = ({ chapters, isOpen, onClose }) => {
    const [query, setQuery] = useState("");

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                onClose(); // Toggle logic should be in parent, but for now we follow simple open/close
            }
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const filteredChapters = chapters.filter(c =>
        c.title.toLowerCase().includes(query.toLowerCase()) ||
        (c.desc && c.desc.toLowerCase().includes(query.toLowerCase()))
    );

    const scrollTo = (id) => {
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
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[10000]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="fixed left-1/2 top-1/4 -translate-x-1/2 w-full max-w-2xl bg-gray-900 border border-white/10 rounded-2xl shadow-2xl z-[10001] overflow-hidden"
                    >
                        <div className="p-4 border-b border-white/5 flex items-center gap-3">
                            <Search className="w-5 h-5 text-gray-500" />
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search chapters, trajectories, sectors..."
                                className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-gray-600 font-medium"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <div className="flex items-center gap-1.5 px-2 py-1 bg-white/5 rounded-md border border-white/10 text-[10px] text-gray-500 font-mono">
                                <Command className="w-3 h-3" />
                                <span>K / ESC</span>
                            </div>
                        </div>

                        <div className="max-h-[400px] overflow-y-auto p-2">
                            {filteredChapters.length > 0 ? (
                                filteredChapters.map(chapter => (
                                    <button
                                        key={chapter.id}
                                        onClick={() => scrollTo(chapter.id)}
                                        className="w-full text-left p-4 hover:bg-white/5 rounded-xl transition-all flex items-start gap-4 group"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                            <Search className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white mb-0.5">{chapter.title}</h4>
                                            <p className="text-xs text-gray-500 line-clamp-1">{chapter.desc || chapter.summary}</p>
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <div className="p-8 text-center text-gray-500">
                                    No results found for "{query}"
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default SearchPalette;
