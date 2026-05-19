import { motion } from "motion/react";

export function Experience() {
  return (
    <section className="py-24 bg-luxury-black overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-luxury-gray/50 -z-10" />
      
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative aspect-[3/4] md:aspect-square overflow-hidden rounded-3xl group">
             <img 
               src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2670&auto=format&fit=crop" 
               alt="Classic Detail" 
               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
             <div className="absolute bottom-12 left-12">
                <p className="text-gold font-serif  text-3xl mb-4">Precision Sourcing</p>
                <p className="text-white/60 max-w-xs text-sm leading-relaxed">
                  Every vehicle undergoes a 200-point inspection before it even touches the asphalt of our showroom.
                </p>
             </div>
          </div>

          <div className="space-y-12">
            <div className="relative">
              <span className="absolute -left-12 top-0 h-full w-[2px] bg-gold/30" />
               <motion.p
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-[10px] uppercase tracking-[0.6em] font-bold text-gold mb-8"
              >
                The Import Standard
              </motion.p>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-7xl font-serif  mb-4 leading-[1.1]"
              >
                Seamless <br />
                <span className=" font-display font-medium text-white uppercase tracking-tighter">Global Access</span>
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="space-y-4 p-10 border border-white/5 rounded-sm hover:border-gold/20 transition-all duration-700 bg-white/[0.02]">
                  <p className="text-gold font-serif  text-4xl">01</p>
                  <h4 className="text-sm font-display uppercase tracking-[0.4em] font-bold text-white/90">Curated Hunt</h4>
                  <p className="text-white/30 text-xs leading-relaxed uppercase tracking-widest">Global vehicle scouting across private networks and elite auctions.</p>
               </div>
               <div className="space-y-4 p-10 border border-white/5 rounded-sm hover:border-gold/20 transition-all duration-700 bg-white/[0.02]">
                  <p className="text-gold font-serif  text-4xl">02</p>
                  <h4 className="text-sm font-display uppercase tracking-[0.4em] font-bold text-white/90">Verification</h4>
                  <p className="text-white/30 text-xs leading-relaxed uppercase tracking-widest">Multi-stage technical validation and historical provenance audits.</p>
               </div>
               <div className="space-y-4 p-10 border border-white/5 rounded-sm hover:border-gold/20 transition-all duration-700 bg-white/[0.02]">
                  <p className="text-gold font-serif  text-4xl">03</p>
                  <h4 className="text-sm font-display uppercase tracking-[0.4em] font-bold text-white/90">Acquisition</h4>
                  <p className="text-white/30 text-xs leading-relaxed uppercase tracking-widest">Secure transactional escrow and legislative compliance management.</p>
               </div>
               <div className="space-y-4 p-10 border border-white/5 rounded-sm hover:border-gold/20 transition-all duration-700 bg-white/[0.02]">
                  <p className="text-gold font-serif  text-4xl">04</p>
                  <h4 className="text-sm font-display uppercase tracking-[0.4em] font-bold text-white/90">Delivery</h4>
                  <p className="text-white/30 text-xs leading-relaxed uppercase tracking-widest">GPS-tracked white-glove transit directly to your secure facility.</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
