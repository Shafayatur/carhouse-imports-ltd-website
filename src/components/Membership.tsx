import { motion, AnimatePresence } from "motion/react";
import { Star, Shield, Gem, Crown, X } from "lucide-react";
import { useState } from "react";

export function Membership() {
  const [selectedPerk, setSelectedPerk] = useState<null | typeof perks[0]>(null);

  const perks = [
    { icon: <Gem size={28} />, title: "Concierge Sourcing", desc: "Our specialists track individual vin numbers of limited-run vehicles worldwide." },
    { icon: <Shield size={28} />, title: "Asset Protection", desc: "Private off-site climate-controlled storage and weekly mechanical maintainance." },
    { icon: <Star size={28} />, title: "Private Access", desc: "Direct entry to closed-room auctions and secret collector portfolios." },
    { icon: <Crown size={28} />, title: "White Glove Logistics", desc: "Enclosed cross-border transport with absolute discretion and full coverage." }
  ];

  return (
    <section className="py-32 bg-luxury-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-4xl mx-auto mb-24">
          <p className="text-[10px] uppercase tracking-[0.6em] font-black text-gold mb-8">Exclusive Membership</p>
          <h2 className="text-6xl md:text-8xl font-serif  mb-12 leading-tight">
            For Those Who <br />
            <span className=" font-display font-medium text-white uppercase tracking-tighter">Value Exclusivity</span>
          </h2>
          <p className="text-white/40 text-lg md:text-xl font-light leading-relaxed">
            Membership at Car House Imports is reserved for the serious collector.
          </p>
        </div>

        {/* Icons Row - Forced in one row */}
        <div className="flex justify-center items-center gap-4 md:gap-12 flex-nowrap overflow-x-auto pb-8 mask-fade-edges scrollbar-hide">
          {perks.map((perk, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setSelectedPerk(perk)}
              className="relative group outline-none shrink-0"
            >
              <div className="w-16 h-16 md:w-24 md:h-24 bg-white/5 border border-white/5 rounded-full flex flex-col items-center justify-center text-gold group-hover:border-gold/50 transition-all duration-500 shadow-2xl">
                <div className="group-hover:scale-110 transition-transform">{perk.icon}</div>
              </div>
              <div className="absolute -inset-2 bg-gold/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          ))}
        </div>

        {/* Modal Overlay */}
        <AnimatePresence>
          {selectedPerk && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedPerk(null)}
                className="fixed inset-0 bg-black/90 backdrop-blur-md z-[1000] flex items-center justify-center p-6"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-luxury-gray border border-gold/30 p-10 md:p-14 rounded-sm max-w-lg w-full relative overflow-hidden text-center"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                  <button 
                    onClick={() => setSelectedPerk(null)}
                    className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>

                  <div className="w-16 h-16 bg-gold/10 border border-gold/30 rounded-full flex items-center justify-center text-gold mx-auto mb-8">
                    {selectedPerk.icon}
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-display font-bold uppercase tracking-tighter text-white mb-6">
                    {selectedPerk.title}
                  </h3>
                  <p className="text-lg md:text-xl text-white/50 font-serif  leading-relaxed">
                    {selectedPerk.desc}
                  </p>

                  <div className="mt-12 pt-12 border-t border-white/5">
                    <p className="text-[10px] uppercase tracking-[0.5em] text-gold font-black">Reserved Benefit • Tier I</p>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className="mt-32 p-12 md:p-20 bg-gradient-to-br from-luxury-gray to-black border border-gold/20 rounded-md flex flex-col lg:flex-row items-center justify-between gap-12">
           <div className="text-left lg:max-w-2xl">
              <h3 className="text-3xl md:text-4xl font-serif  mb-6">"Membership is not just a status, it's a direct line to the world's most sought-after machinery."</h3>
              <p className="text-[10px] uppercase tracking-[0.4em] font-black text-gold">Shafayat Rahman • Founder</p>
           </div>
           <button className="px-12 py-6 bg-gold text-black rounded-full font-black uppercase text-[11px] tracking-[0.3em] hover:bg-white transition-all duration-500 whitespace-nowrap shadow-[0_0_40px_rgba(197,160,40,0.2)]">
              Apply For Membership
           </button>
        </div>
      </div>
    </section>
  );
}
