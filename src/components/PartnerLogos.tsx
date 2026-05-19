import { motion } from "motion/react";
import { usePartners } from "@/hooks/useSupabase";

export function PartnerLogos() {
  const { partners, loading } = usePartners();

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
    <section id="strategic-network" className="py-20 bg-luxury-black border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* Sleek, Tight Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto text-center mb-12 space-y-4"
        >
          <span className="text-[9px] uppercase tracking-[0.5em] font-black text-gold block">Verified Strategic Network</span>
          <h2 className="text-3xl md:text-4xl font-serif text-white tracking-tighter leading-tight">
            Our global intelligence spans across the world's{" "}
            <span className="text-white/40">preeminent specialists.</span>
          </h2>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative mt-12">
          {/* Edge Fades */}
          <div className="absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-luxury-black to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-luxury-black to-transparent z-10 pointer-events-none" />

          <div className="flex overflow-hidden group">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, ease: "linear", repeat: Infinity }}
              className="flex gap-4 md:gap-6 whitespace-nowrap py-6"
            >
              {doubled.map((partner, idx) => (
                <div
                  key={`${partner.name}-${idx}`}
                  className="relative w-[150px] md:w-[260px] p-5 md:p-6 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] hover:border-gold/30 transition-all duration-500 rounded-sm flex flex-col items-center justify-center text-center overflow-hidden shrink-0 group/card"
                >
                  {/* Subtle Tech Corner Accent */}
                  <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/5 group-hover/card:border-gold/30 transition-colors" />
                  
                  {/* High-End Refined Badge Name */}
                  <div className="mb-4 opacity-70 group-hover/card:opacity-100 transition-all duration-500 group-hover/card:scale-105">
                    <span className="text-xs md:text-sm text-white font-bold block drop-shadow-md font-display tracking-[0.2em] uppercase">
                      {partner.name}
                    </span>
                  </div>
                  
                  <div className="space-y-3 w-full">
                    <div className="h-[1px] w-6 bg-white/10 group-hover/card:bg-gold/30 mx-auto transition-colors" />
                    <p className="text-[7px] md:text-[8px] uppercase tracking-[0.3em] font-black text-white/30 group-hover/card:text-gold transition-colors">
                      {partner.region}
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-gold/0 group-hover/card:bg-gold/[0.01] transition-colors pointer-events-none" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Footer Subtext */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-[9px] uppercase tracking-[0.3em] font-black text-white/20 max-w-xl mx-auto leading-relaxed">
            This proprietary network enables bespoke sourcing of off-market chassis with fully documented provenance.
          </p>
        </motion.div>
      </div>
    </section>
  );
}