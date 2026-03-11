import { motion } from "framer-motion";

interface StorySectionProps {
    id: string;
    title: string;
    desc?: string;
    children: React.ReactNode;
}

const StorySection = ({ id, title, desc, children }: StorySectionProps) => {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.2, once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="scroll-mt-44 pb-44 last:pb-64 group font-sans"
        >
            <div className="mb-14">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-sm" />
                    <span className="text-[10px] font-mono text-cyan-400/60 tracking-[0.2em] uppercase">
                        module::{id}
                    </span>
                    <div className="h-px flex-1 bg-white/10" />
                </div>

                <h2 className="text-5xl font-black text-white mb-8 tracking-tight uppercase leading-none">
                    {title}
                </h2>

                {desc && (
                    <div className="relative pl-6 border-l border-cyan-500/30">
                        <p className="text-md text-white/50 font-medium max-w-[450px] leading-relaxed">
                            {desc}
                        </p>
                    </div>
                )}
            </div>

            <div className="relative">
                {/* Technical Grid Accent */}
                <div className="absolute -left-10 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                    {children}
                </div>
            </div>
        </motion.section>
    );
};

export default StorySection;
