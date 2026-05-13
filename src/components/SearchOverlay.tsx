import { motion, AnimatePresence } from "motion/react";
import { X, Search as SearchIcon, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ALL_CARS, Car } from "@/data/cars";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Car[]>([]);

  useEffect(() => {
    if (query.trim() === "") {
      setResults([]);
      return;
    }

    const filtered = ALL_CARS.filter(car => 
      car.name.toLowerCase().includes(query.toLowerCase()) ||
      car.brand.toLowerCase().includes(query.toLowerCase()) ||
      car.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5);

    setResults(filtered);
  }, [query]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] bg-luxury-black flex flex-col pt-20 px-6 md:px-24"
        >
          <div className="flex justify-between items-center mb-12">
             <div className="flex items-center gap-6 w-full max-w-4xl">
                <SearchIcon className="text-gold" size={32} />
                <input 
                  autoFocus
                  type="text"
                  placeholder="SEARCH THE INTELLIGENCE..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full bg-transparent border-none text-4xl md:text-6xl font-display font-medium uppercase tracking-tighter text-white placeholder:text-white/10 focus:ring-0"
                />
             </div>
             <button 
               onClick={onClose}
               className="text-white/40 hover:text-gold transition-colors"
             >
               <X size={32} />
             </button>
          </div>

          <div className="flex-1 overflow-y-auto pb-24">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
                <div className="space-y-12">
                   <p className="text-[10px] uppercase tracking-[0.5em] font-black text-white/20 border-b border-white/5 pb-4">
                     {results.length > 0 ? "Potential Matches" : "Trending Enquiries"}
                   </p>
                   
                   <div className="space-y-8">
                      {(results.length > 0 ? results : ALL_CARS.slice(0, 4)).map((car) => (
                        <Link 
                          key={car.id}
                          to={`/inventory/${car.id}`}
                          onClick={onClose}
                          className="group flex gap-8 items-center"
                        >
                           <div className="w-24 h-16 rounded-sm overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                              <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
                           </div>
                           <div className="flex-1">
                              <p className="text-[9px] uppercase tracking-[0.3em] font-black text-gold mb-1">{car.brand}</p>
                              <p className="text-2xl font-serif italic text-white/70 group-hover:text-white transition-colors">{car.name}</p>
                           </div>
                           <ArrowRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-gold" size={20} />
                        </Link>
                      ))}
                   </div>
                </div>

                <div className="hidden md:block space-y-12">
                   <p className="text-[10px] uppercase tracking-[0.5em] font-black text-white/20 border-b border-white/5 pb-4">
                     Market Categories
                   </p>
                   <div className="flex flex-wrap gap-4">
                      {["Hypercar", "GT", "Heritage", "Off-Road", "Track"].map((cat) => (
                        <button 
                          key={cat}
                          onClick={() => setQuery(cat)}
                          className="px-6 py-3 border border-white/5 bg-white/[0.02] text-white/40 text-[9px] uppercase tracking-[0.3em] font-black hover:border-gold hover:text-gold transition-all duration-700 hover:scale-105"
                        >
                          {cat}
                        </button>
                      ))}
                   </div>

                   <div className="p-12 border border-gold/10 bg-gold/[0.02] rounded-sm">
                      <p className="text-xs font-serif italic text-white/60 leading-relaxed">
                        "The Intelligence search index covers 2,400+ off-market chassis across our global partner network."
                      </p>
                   </div>
                </div>
             </div>
          </div>

          <div className="absolute bottom-12 left-12 md:left-24">
             <p className="text-[8px] uppercase tracking-[0.8em] text-white/5 font-black font-display">
                Car House Imports • Confidential Search
             </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
