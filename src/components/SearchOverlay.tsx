import { motion, AnimatePresence } from "motion/react";
import { X, Search as SearchIcon, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useVehicles } from "@/hooks/useSupabase";
import type { Vehicle } from "@/lib/supabase";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Vehicle[]>([]);
  const { vehicles } = useVehicles();

  useEffect(() => {
    if (query.trim() === "") { setResults([]); return; }
    const q = query.toLowerCase();
    const filtered = vehicles.filter(v =>
      v.make.toLowerCase().includes(q) ||
      v.model.toLowerCase().includes(q) ||
      v.origin?.toLowerCase().includes(q) ||
      String(v.year).includes(q)
    ).slice(0, 5);
    setResults(filtered);
  }, [query, vehicles]);

  // Properly stop/start Lenis so background page can't scroll behind overlay
  useEffect(() => {
    const lenis = (window as any).__lenis;
    if (isOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
    return () => {
      lenis?.start();
    };
  }, [isOpen]);

  const displayList = results.length > 0 ? results : vehicles.slice(0, 4);

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
                onChange={e => setQuery(e.target.value)}
                className="w-full bg-transparent border-none text-4xl md:text-6xl font-display font-medium uppercase tracking-tighter text-white placeholder:text-white/10 focus:ring-0 outline-none"
              />
            </div>
            <button onClick={onClose} className="text-white/40 hover:text-gold transition-colors">
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
                  {displayList.map(car => (
                    <Link
                      key={car.id}
                      to={`/inventory/${car.id}`}
                      onClick={onClose}
                      className="group flex gap-8 items-center"
                    >
                      <div className="w-24 h-16 rounded-sm overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 bg-white/5 shrink-0">
                        {car.image_url ? (
                          <img src={car.image_url} alt={`${car.make} ${car.model}`} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-white/10 text-[8px] uppercase tracking-wider font-black">{car.make}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[9px] uppercase tracking-[0.3em] font-black text-gold mb-1">{car.make}</p>
                        <p className="text-2xl font-serif italic text-white/70 group-hover:text-white transition-colors truncate">{car.model}</p>
                        <p className="text-[9px] text-white/20 uppercase tracking-wider font-black">{car.year} · {car.origin}</p>
                      </div>
                      <ArrowRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-gold shrink-0" size={20} />
                    </Link>
                  ))}
                  {vehicles.length === 0 && (
                    <p className="text-white/20 text-sm font-serif italic">No vehicles in inventory yet.</p>
                  )}
                </div>
              </div>

              <div className="hidden md:block space-y-12">
                <p className="text-[10px] uppercase tracking-[0.5em] font-black text-white/20 border-b border-white/5 pb-4">
                  Filter by Status
                </p>
                <div className="flex flex-wrap gap-4">
                  {["Available", "Reserved", "In Transit", "Sold"].map(s => (
                    <button
                      key={s}
                      onClick={() => setQuery(s)}
                      className="px-6 py-3 border border-white/5 bg-white/[0.02] text-white/40 text-[9px] uppercase tracking-[0.3em] font-black hover:border-gold hover:text-gold transition-all duration-700 hover:scale-105"
                    >
                      {s}
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