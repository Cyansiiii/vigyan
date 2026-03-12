import React, { useState, useMemo } from "react";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Grip, X, Sparkles, Target, Zap } from "lucide-react";

declare global {
  interface Window {
    executePurchase: (id: string, price: number) => void;
  }
}

// --- Data ---
const series = [
  {
    id: "iat",
    name: "IAT SERIES",
    subtitle: "Speed & Accuracy Mastery",
    price: 199,
    category: "IISER Aptitude Test",
    year: "2026 Edition",
    description: "The IAT isn't just a test; it's a high-stakes race of cognitive speed. Our IAT Protocol is meticulously engineered to sharpen your neural responsiveness, transforming complex problem patterns into instinctive reactions. Master the IISER Aptitude Test with the most rigorous speed-training matrix in existence.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80", // Research/Biology
    accent: "from-purple-500/80 via-indigo-500/70 to-blue-400/50",
    tags: ["IISER", "Speed Mastery", "Real Interface"],
    icon: <Sparkles className="w-5 h-5" />,
    color: "var(--iat-purple)"
  },
  {
    id: "nest",
    name: "NEST SERIES",
    subtitle: "Deep Analytical Dive",
    price: 199,
    category: "NISER CEBS",
    year: "2026 Edition",
    description: "NEST demands a profound analytical depth that standard preparation can't reach. Our NISER Protocol dives into the sub-atomic layers of conceptual physics and chemistry, challenging your core reasoning with non-standard, deep-logic problems. Prepare for NISER/CEBS with a curriculum that tests the boundaries of your scientific intellect.",
    image: "https://images.unsplash.com/photo-1544383175-1e8284699564?auto=format&fit=crop&w=1200&q=80", // Chemistry/Physics
    accent: "from-teal-500/80 via-emerald-500/70 to-green-400/50",
    tags: ["NISER", "CEBS", "Deep Concepts"],
    icon: <Target className="w-5 h-5" />,
    color: "var(--nest-teal)"
  },
  {
    id: "isi",
    name: "ISI SERIES",
    subtitle: "Advanced Math Protocol",
    price: 199,
    category: "Math & Analytics",
    year: "2026 Edition",
    description: "For the mathematical elite aiming for ISI and CMI, logic is the only currency. This Advanced Math Protocol focuses on the architecture of proofs and the elegance of complex problem-solving. It's more than a series; it's a rigorous induction into the highest echelons of Indian mathematical excellence.",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80", // Abstract Math/Data
    accent: "from-red-500/80 via-orange-500/70 to-yellow-400/50",
    tags: ["ISI", "CMI", "Pure Math"],
    icon: <Zap className="w-5 h-5" />,
    color: "var(--isi-red)"
  }
];

// --- Sub-components ---

const DraggablePreview = ({ item }: { item: typeof series[0] }) => {
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragElastic={0.12}
      whileDrag={{ scale: 1.05, rotate: -2 }}
      className="group relative aspect-[4/5] w-full max-w-sm cursor-grab overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 shadow-2xl active:cursor-grabbing"
    >
      <img
        src={item.image}
        alt={item.name}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className={`absolute inset-0 bg-gradient-to-br ${item.accent} mix-blend-overlay`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute left-6 right-6 top-6 flex items-center justify-between">
        <div className="rounded-full border border-white/20 bg-black/40 px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-xl">
          Protocol Preview
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-xs text-white/80 backdrop-blur-xl">
          <Grip className="h-4 w-4" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        <p className="mb-2 text-[11px] uppercase tracking-[0.3em] text-white/70">
          {item.category} • ₹{item.price}
        </p>
        <h3 className="text-3xl font-bold leading-none tracking-tight">{item.name}</h3>
      </div>
    </motion.div>
  );
};

// --- Main Component ---

export default function TestSeriesExplorer() {
  const [activeId, setActiveId] = useState<string>(series[0].id);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const activeItem = useMemo(
    () => series.find((s) => s.id === activeId) ?? series[0],
    [activeId]
  );

  const expandedItem = useMemo(
    () => series.find((s) => s.id === expandedId) ?? null,
    [expandedId]
  );

  const handlePurchase = (id: string, price: number) => {
    // Call the global function defined in testfirstpage.html
    if (window.executePurchase) {
      window.executePurchase(id, price);
    }
  };

  return (
    <div className="w-full text-white">
      <LayoutGroup>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 min-h-[700px]">
          {/* Section 1: Interactive Preview Canvas */}
          <section className="flex flex-col rounded-[3rem] border border-[#EBDCCB] bg-[#FDF8F3] p-8 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 grayscale pointer-events-none">
                <img 
                    src="/assets/botanical_science_illustrations_lineart_1773316021515.png" 
                    alt="" 
                    className="w-full h-full object-cover scale-150 rotate-12"
                />
            </div>
            
            <div className="relative z-10 mb-10">
              <p className="mb-4 text-[12px] uppercase tracking-[0.4em] text-[#8B7E74] font-black">
                Botanical Science // Admissions Protocol
              </p>
              <h1 className="max-w-xl text-5xl font-['Cormorant_Garamond'] italic font-bold tracking-tight text-[#2C2C2C] sm:text-6xl lg:text-7xl leading-[0.85] mb-4">
                Choose Your <br />
                <span className="text-[#8B7E74]">Admissions Path.</span>
              </h1>
            </div>

            <div className="relative z-10 flex-1 group">
              <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] border border-[#EBDCCB] bg-white/40 shadow-inner">
                <motion.div
                  layoutId={`preview-container-${activeItem.id}`}
                  className="absolute inset-0 flex items-center justify-center p-8"
                >
                  <DraggablePreview item={activeItem} />
                </motion.div>
              </div>
            </div>
          </section>

          {/* Section 2: Interactive List */}
          <section className="flex flex-col gap-4">
             <div className="mb-4">
                <p className="text-[11px] uppercase tracking-[0.34em] text-white/40 font-bold">Available Series</p>
                <p className="mt-2 text-sm text-white/50">Hover to visualize, click to deep dive into clinical importance.</p>
             </div>

             <div className="space-y-4 flex-1">
                {series.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <motion.div
                      key={item.id}
                      layoutId={`item-card-${item.id}`}
                      onMouseEnter={() => setActiveId(item.id)}
                      onClick={() => {
                        setActiveId(item.id);
                        setExpandedId(item.id);
                      }}
                      className={`group relative flex w-full items-center justify-between overflow-hidden rounded-[2rem] border-2 px-8 py-8 cursor-pointer transition-all duration-500 ${
                        isActive 
                          ? "border-[#8B7E74] bg-white shadow-lg scale-[1.02]" 
                          : "border-[#EBDCCB] bg-[#FDF8F3] hover:border-[#8B7E74] hover:bg-white"
                      }`}
                    >
                      <div className="relative z-10 flex items-center gap-8">
                        <div 
                          className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl grayscale contrast-125"
                          style={{ background: item.color }}
                        >
                          {item.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] text-[#8B7E74] font-black mb-2 opacity-60">
                            <span>{item.category}</span>
                            <span>•</span>
                            <span>₹{item.price}</span>
                          </div>
                          <h2 className="text-3xl font-['Cormorant_Garamond'] italic font-bold text-[#2C2C2C] tracking-tight">{item.name}</h2>
                        </div>
                      </div>

                      <div className="relative z-10 flex flex-col items-end gap-2">
                         <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#EBDCCB] bg-white text-[#8B7E74] transition-all group-hover:bg-black group-hover:text-white group-hover:border-black">
                            <ArrowUpRight className="h-6 w-6" />
                         </div>
                      </div>

                      {isActive && (
                        <motion.div
                          layoutId="active-highlight"
                          className="absolute inset-0 bg-gradient-to-r from-[#8B7E74]/[0.05] to-transparent pointer-events-none"
                        />
                      )}
                    </motion.div>
                  );
                })}
             </div>

             {/* Simple Legend/Footer */}
             <div className="p-8 rounded-[2rem] border border-[#EBDCCB] bg-[#FDF8F3] text-[10px] font-black uppercase tracking-[0.3em] text-[#8B7E74]/40 flex items-center justify-between">
                <span>VIGYAN.PREP // ADMISSIONS v3.0</span>
                <span>SECURE PAYMENT ENCRYPTED</span>
             </div>
          </section>
        </div>

        {/* --- Immersive Expanded Detail View --- */}
        <AnimatePresence>
          {expandedItem && (
            <motion.div
              className="fixed inset-0 z-[110] flex items-center justify-center bg-white/60 p-4 sm:p-8 backdrop-blur-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpandedId(null)}
            >
              <motion.div
                layoutId={`item-card-${expandedId}`}
                className="relative flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-[4rem] border border-[#EBDCCB] bg-[#FDF8F3] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)]"
                initial={{ y: 50, scale: 0.95 }}
                animate={{ y: 0, scale: 1 }}
                exit={{ y: 50, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={() => setExpandedId(null)}
                  className="absolute right-8 top-8 z-20 flex h-14 w-14 items-center justify-center rounded-full border border-[#EBDCCB] bg-white text-[#2C2C2C] hover:bg-black hover:text-white transition-all shadow-xl"
                >
                  <X className="h-8 w-8" />
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 h-full overflow-hidden">
                  {/* Visual Side */}
                  <div className="relative min-h-[400px] lg:min-h-0 overflow-hidden bg-[#F5EEDC]">
                    <img
                      src={expandedItem.image}
                      alt={expandedItem.name}
                      className="h-full w-full object-cover opacity-20 grayscale brightness-125"
                    />
                    <div className="absolute inset-0 flex items-center justify-center p-20 grayscale opacity-20 transform scale-150">
                       <img 
                        src="/assets/botanical_science_illustrations_lineart_1773316021515.png" 
                        alt="" 
                        className="w-full h-full object-contain"
                       />
                    </div>
                    
                    <div className="absolute inset-0 p-16 flex flex-col justify-end">
                      <p className="mb-6 text-[12px] uppercase tracking-[0.4em] text-[#8B7E74] font-black">
                        {expandedItem.category} // {expandedItem.year}
                      </p>
                      <h2 className="font-['Cormorant_Garamond'] italic text-7xl font-bold leading-[0.8] mb-8 tracking-tighter">
                        {expandedItem.name}
                      </h2>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className="flex flex-col h-full overflow-y-auto p-16 sm:p-24">
                    <div className="mb-12">
                      <h4 className="text-[11px] uppercase tracking-[0.3em] text-[#8B7E74] font-black mb-8 border-b border-[#EBDCCB] pb-4">
                        Scientific Purpose
                      </h4>
                      <p className="text-3xl font-['Cormorant_Garamond'] leading-snug text-[#2C2C2C] italic mb-10">
                        {expandedItem.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
                      <div className="p-8 rounded-[2.5rem] bg-white border border-[#EBDCCB] shadow-sm">
                        <h5 className="text-[10px] uppercase font-black tracking-[0.2em] text-[#8B7E74] mb-4">Focus</h5>
                        <p className="text-sm text-[#4A4A4A] leading-relaxed">High-yield analytical problem solving and pattern recognition protocols.</p>
                      </div>
                      <div className="p-8 rounded-[2.5rem] bg-white border border-[#EBDCCB] shadow-sm">
                        <h5 className="text-[10px] uppercase font-black tracking-[0.2em] text-[#8B7E74] mb-4">Structure</h5>
                        <p className="text-sm text-[#4A4A4A] leading-relaxed">Simulated computerized interface mirroring the exact exam environment.</p>
                      </div>
                    </div>

                    <button 
                       onClick={() => {
                          handlePurchase(expandedItem.id, expandedItem.price);
                          setExpandedId(null);
                       }}
                       className="w-full py-8 rounded-[3rem] bg-black text-white font-black uppercase tracking-[0.3em] text-lg hover:scale-[1.02] transform transition-all active:scale-[0.98] shadow-2xl"
                    >
                       Activate Access • ₹{expandedItem.price}
                    </button>
                    
                    <p className="mt-8 text-center text-[10px] text-[#8B7E74] font-bold tracking-[0.2em]">
                      SECURE DIGITAL PURCHASE // VIGYAN.PREP
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
}
