import { motion, AnimatePresence } from "motion/react";
import { usePartners } from "@/hooks/useSupabase";
import { useEffect, useState } from "react";

export function PartnerLogos() {
  const { partners, loading } = usePartners();
  const [showLabel, setShowLabel] = useState(false);

  // Cyclic timer: show the beautiful "OUR PARTNERS" card overlay every 12 seconds for 3 seconds
  useEffect(() => {
    // Start cyclic loop
    const interval = setInterval(() => {
      setShowLabel(true);
      
      // Hide card after 3 seconds
      const timeout = setTimeout(() => {
        setShowLabel(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  // Fallback to hardcoded if Supabase empty (safe during migration)
  const fallback = [
    { name: "Dutton Garage", region: "Melbourne" },
    { name: "RM SOTHEBY'S", region: "London / NY" },
    { name: "GIRARDO & CO.", region: "Oxfordshire" },
    { name: "BINGO SPORTS", region: "Tokyo" },
    { name: "CANEPA", region: "California" },
    { name: "JOE MACARI", region: "London" },
    { name: "DANZANTE", region: "Milan" },
    { name: "LITTLE CAR CO", region: "United Kingdom" },
  ];

  const list = (!loading && partners.length > 0) ? partners : fallback;
  const doubled = [...list, ...list]; // for infinite scroll

  return (
    <section id="strategic-network" className="py-12 bg-luxury-black/30 border-y border-white/5 overflow-hidden relative min-h-[140px] flex items-center">
      {/* Subtle background luxury accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-transparent to-luxury-black opacity-90 pointer-events-none z-10" />
      
      <div className="w-full relative">
        {/* Soft edge fade overlays */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-luxury-black to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-luxury-black to-transparent z-20 pointer-events-none" />

        {/* Theatrical Card Overlay: Fades in on top of the blurred scroller */}
        <AnimatePresence>
          {showLabel && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
            >
              <div className="px-8 py-4 bg-luxury-gray/95 border border-gold/30 rounded-sm backdrop-blur-md shadow-2xl flex flex-col items-center justify-center text-center">
                <span className="text-[8px] uppercase tracking-[0.5em] font-black text-gold mb-1">Global Alliance</span>
                <h3 className="text-xs md:text-sm font-display font-bold uppercase tracking-[0.3em] text-white">
                  Our Strategic Partners
                </h3>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Infinite Scrolling Logo Wrapper - Fades and blurs softly when the overlay card appears */}
        <motion.div 
          animate={{ 
            opacity: showLabel ? 0.08 : 1,
            filter: showLabel ? "blur(4px)" : "blur(0px)"
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="flex overflow-hidden group"
        >
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 35, ease: "linear", repeat: Infinity }}
            className="flex gap-4 md:gap-6 whitespace-nowrap"
          >
            {doubled.map((partner, idx) => (
              <div
                key={`${partner.name}-${idx}`}
                className="relative w-[180px] md:w-[280px] p-4 md:p-6 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-gold/30 transition-all duration-500 rounded-sm flex flex-col items-center justify-center text-center overflow-hidden shrink-0 group/card"
              >
                <div className="mb-2 md:mb-3 opacity-40 group-hover/card:opacity-100 transition-all duration-500">
                  <span className="text-sm md:text-xl text-white font-display font-medium tracking-[0.2em] block">
                    {partner.name}
                  </span>
                </div>
                <div className="h-[1px] w-4 bg-white/10 group-hover/card:bg-gold/40 transition-colors my-1 md:my-2" />
                <p className="text-[6px] md:text-[8px] uppercase tracking-[0.3em] font-black text-white/20 group-hover/card:text-gold transition-colors">
                  {partner.region}
                </p>
                <div className="absolute inset-0 bg-gold/0 group-hover/card:bg-gold/[0.01] transition-colors pointer-events-none" />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}