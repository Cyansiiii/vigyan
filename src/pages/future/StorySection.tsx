import { motion } from "framer-motion";

const StorySection = ({ id, title, desc, children }) => {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.3, once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="scroll-mt-32 pb-24 group"
        >
            <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                    <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <span className="text-xs font-mono text-blue-500 tracking-widest uppercase">
                        Section::{id}
                    </span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
                    {title}
                </h2>
                {desc && (
                    <p className="text-lg text-gray-400 font-medium max-w-2xl leading-relaxed">
                        {desc}
                    </p>
                )}
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 lg:p-10 backdrop-blur-xl hover:bg-white/[0.04] transition-all duration-500 shadow-2xl overflow-hidden relative">
                {/* Subtle grid background for the card */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

                <div className="relative z-10">
                    {children}
                </div>
            </div>
        </motion.section>
    );
};

export default StorySection;
