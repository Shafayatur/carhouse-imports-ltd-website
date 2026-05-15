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
    <section className="py-32 bg-white/[0.02] border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto text-center mb-24"
        >
          <div className="inline-block px-4 py-2 bg-gold/10 rounded-full mb-6">
            <p className="text-[10px] uppercase tracking-[0.4em] font-black text-gold">Verified Strategic Network</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif italic text-white tracking-tighter leading-none">
            Our global intelligence spans across the world's{" "}
            <span className="text-white/40">preeminent specialists.</span>
          </h2>
        </motion.div>

        <div className="relative mt-24">
          <div className="absolute inset-y-0 left-0 w-24 md:w-40 bg-gradient-to-r from-luxury-black to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 md:w-40 bg-gradient-to-l from-luxury-black to-transparent z-10 pointer-events-none" />

          <div className="flex overflow-hidden group">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 40, ease: "linear", repeat: Infinity }}
              className="flex gap-4 md:gap-8 whitespace-nowrap py-10"
            >
              {doubled.map((partner, idx) => (
                <div
                  key={`${partner.name}-${idx}`}
                  className="relative w-[180px] md:w-[350px] p-6 md:p-10 border border-white/10 bg-white/[0.02] hover:bg-white/5 hover:border-gold/40 transition-all duration-700 rounded-sm flex flex-col items-center justify-center text-center overflow-hidden shrink-0 group/card"
                >
                  <div className="absolute top-0 right-0 w-6 h-6 md:w-8 md:h-8 border-t border-r border-white/10 group-hover/card:border-gold/50 transition-colors" />
                  <div className="mb-4 md:mb-6 opacity-60 group-hover/card:opacity-100 transition-all duration-700 group-hover/card:scale-105">
                    <span className="text-base md:text-3xl text-white font-bold block drop-shadow-2xl font-display tracking-widest">
                      {partner.name}
                    </span>
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    <div className="h-px w-6 md:w-8 bg-white/20 group-hover/card:bg-gold/40 mx-auto transition-colors" />
                    <p className="text-[7px] md:text-[8px] uppercase tracking-[0.3em] md:tracking-[0.5em] font-black text-white/40 group-hover/card:text-gold transition-colors">
                      {partner.region}
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-gold/0 group-hover/card:bg-gold/[0.02] transition-colors pointer-events-none" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <p className="text-[10px] uppercase tracking-[0.2em] font-black text-white/10">
            The proprietary network enables sourcing of off-market chassis with documented provenance.
          </p>
        </motion.div>
      </div>
    </section>
  );
}