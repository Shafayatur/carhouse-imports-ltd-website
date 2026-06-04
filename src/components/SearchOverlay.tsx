import { motion, AnimatePresence } from "motion/react";
import { X, Search as SearchIcon, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim() === "") { setResults([]); return; }
    const q = query.toLowerCase();
    const filtered = vehicles.filter(v =>
      v.make.toLowerCase().includes(q) ||
      v.model.toLowerCase().includes(q) ||
      v.origin?.toLowerCase().includes(q) ||
      String(v.year).includes(q)
    ).slice(0, 6);
    setResults(filtered);
  }, [query, vehicles]);

  useEffect(() => {
    const lenis = (window as any).__lenis;
    if (isOpen) { lenis?.stop(); } else { lenis?.start(); }
    return () => { lenis?.start(); };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter") return;
    if (results.length === 1) {
      // Only one result — go directly to that car
      navigate(`/inventory/${results[0].id}`);
      onClose();
    } else if (query.trim()) {
      // Multiple or no results — go to inventory with search param
      navigate(`/inventory?search=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  const displayList = results.length > 0 ? results : vehicles.slice(0, 6);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[1000] bg-black/95 backdrop-blur-xl flex flex-col"
        >
          {/* ── Search bar ── */}
          <div className="border-b border-white/10 px-6 md:px-16 py-8">
            <div className="flex items-center gap-5 max-w-5xl">
              <SearchIcon className="text-gold shrink-0" size={28} />
              <input
                autoFocus
                type="text"
                placeholder="Search make, model, year, origin..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={handleEnter}
                className="flex-1 bg-transparent border-none text-3xl md:text-4xl font-display font-medium text-white placeholder:text-white/20 focus:ring-0 outline-none tracking-wide"
              />
              {query && (
                <button onClick={() => setQuery("")} className="text-white/30 hover:text-white transition-colors shrink-0 p-1">
                  <X size={20} />
                </button>
              )}
              <button onClick={onClose} className="text-white/30 hover:text-gold transition-colors shrink-0 ml-4 p-1">
                <X size={24} />
              </button>
            </div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-black mt-3 ml-12">
              {query
                ? results.length > 0
                  ? `${results.length} result${results.length !== 1 ? "s" : ""} — press Enter to see all`
                  : "No matches — press Enter to browse inventory"
                : `${vehicles.length} vehicles in inventory`
              }
            </p>
          </div>

          {/* ── Results ── */}
          <div data-lenis-prevent className="flex-1 overflow-y-auto">
            <div className="px-6 md:px-16 py-8 grid grid-cols-1 md:grid-cols-5 gap-10">

              {/* Left — car list (3/5 width) */}
              <div className="md:col-span-3 space-y-1">
                <p className="text-[9px] uppercase tracking-[0.5em] font-black text-white/20 mb-4">
                  {results.length > 0 ? "Matches" : "Recent Inventory"}
                </p>
                {displayList.map(car => (
                  <Link
                    key={car.id}
                    to={`/inventory/${car.id}`}
                    onClick={onClose}
                    className="group flex gap-5 items-center p-3 hover:bg-white/5 transition-colors rounded-sm"
                  >
                    {/* Thumbnail */}
                    <div className="w-24 h-16 rounded-sm overflow-hidden shrink-0 bg-white/5">
                      {car.image_url ? (
                        <img
                          src={car.image_url}
                          alt={`${car.make} ${car.model}`}
                          className="w-full h-full object-cover transition-all duration-500" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-white/20 text-[9px] uppercase tracking-wider font-black">{car.make}</span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.3em] font-black text-gold mb-1">{car.make}</p>
                      <p className="text-xl font-serif text-white group-hover:text-gold transition-colors truncate">
                        {car.model}
                      </p>
                      <p className="text-[10px] text-white/30 uppercase tracking-wider font-black mt-0.5">
                        {car.year} · {car.origin} · {car.status}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="text-right shrink-0">
                      <p className="text-sm font-display font-bold text-white/60 group-hover:text-gold transition-colors">
                        {car.selling_price ? "BDT " + Math.round(car.selling_price).toLocaleString("en-BD") : "P.O.A"}
                      </p>
                    </div>

                    <ArrowRight
                      size={16}
                      className="text-gold opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 shrink-0"
                    />
                  </Link>
                ))}

                {vehicles.length === 0 && (
                  <p className="text-white/20 text-base font-serif py-8 text-center">
                    No vehicles in inventory yet.
                  </p>
                )}

                {/* View all link */}
                {query && results.length > 0 && (
                  <button
                    onClick={() => { navigate(`/inventory?search=${encodeURIComponent(query)}`); onClose(); }}
                    className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] font-black text-gold hover:text-white transition-colors mt-4 p-3"
                  >
                    View all results in inventory <ArrowRight size={14} />
                  </button>
                )}
              </div>

              {/* Right — filters + stats (2/5 width) */}
              <div className="hidden md:flex md:col-span-2 flex-col gap-6">

                {/* Status filters */}
                <div>
                  <p className="text-[9px] uppercase tracking-[0.5em] font-black text-white/20 mb-4">Filter by Status</p>
                  <div className="grid grid-cols-2 gap-2">
                    {["Available", "Reserved", "In Transit", "Sold"].map(s => (
                      <button
                        key={s}
                        onClick={() => setQuery(s)}
                        className={`py-3 px-4 border text-[10px] uppercase tracking-[0.2em] font-black transition-all duration-300 ${query === s
                          ? "border-gold text-gold bg-gold/8"
                          : "border-white/8 text-white/40 hover:border-white/20 hover:text-white/70"
                          }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live stats */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-5 border border-white/8 bg-white/[0.02]">
                    <p className="text-3xl font-serif font-bold text-white">{vehicles.length}</p>
                    <p className="text-[9px] uppercase tracking-widest text-white/20 font-black mt-1">In Inventory</p>
                  </div>
                  <div className="p-5 border border-white/8 bg-white/[0.02]">
                    <p className="text-3xl font-serif font-bold text-green-400">
                      {vehicles.filter(v => v.status === "Available").length}
                    </p>
                    <p className="text-[9px] uppercase tracking-widest text-white/20 font-black mt-1">Available</p>
                  </div>
                </div>

                {/* Quote */}
                <div className="p-6 border border-gold/10 bg-gold/[0.02]">
                  <p className="text-xs font-serif text-white/40 leading-relaxed">
                    "The Intelligence search index covers 2,400+ off-market chassis across our global partner network."
                  </p>
                </div>

                {/* Browse all */}
                <Link
                  to="/inventory"
                  onClick={onClose}
                  className="flex items-center justify-between p-4 border border-white/8 hover:border-gold/30 transition-colors group"
                >
                  <span className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40 group-hover:text-white transition-colors">
                    Browse Full Inventory
                  </span>
                  <ArrowRight size={14} className="text-white/20 group-hover:text-gold transition-colors" />
                </Link>
              </div>
            </div>
          </div>

          {/* ── Footer ── */}
          <div className="border-t border-white/5 px-6 md:px-16 py-3">
            <p className="text-[8px] uppercase tracking-[0.8em] text-white/10 font-black text-center">
              Car House Imports • Confidential Search • Press Esc to close
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}