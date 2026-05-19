import { Navbar } from "@/components/Navbar";
import { Contact } from "@/components/Contact";
import { motion } from "motion/react";

export default function PhilosophyPage() {
  return (
    <main className="bg-luxury-black min-h-screen pt-32 selection:bg-gold selection:text-black text-white">
      <Navbar />

      <section className="container mx-auto px-6 md:px-12 py-24">
         <div className="max-w-5xl">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] uppercase tracking-[1em] font-black text-gold mb-12"
            >
              The Ethos
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-[8vw] font-display font-medium uppercase tracking-tighter leading-[0.85] mb-24"
            >
              Defining <br />
              <span className=" font-serif font-light text-white/20 lowercase">Autmotive</span> <br />
              Curatorship
            </motion.h1>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="aspect-[4/5] rounded-sm overflow-hidden grayscale brightness-50"
            >
               <img src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=2670" alt="Philosophy" className="w-full h-full object-cover" />
            </motion.div>
            
            <div className="space-y-16 py-12">
               <div className="space-y-8">
                  <h3 className="text-4xl font-serif  tracking-tight">"We do not sell cars. We curate legacies."</h3>
                  <p className="text-xl text-white/50 leading-relaxed font-light">
                     At Car House Imports, we believe that a truly exceptional automobile is a confluence of art, engineering, and history. Our role is to act as the bridge between these masterworks and the collectors who understand their gravity.
                  </p>
               </div>

               <div className="grid grid-cols-1 gap-12 pt-12 border-t border-white/5">
                  {[
                    { title: "Rarity", desc: "We prioritize total production numbers and historical significance over market trends." },
                    { title: "Provenance", desc: "Every chassis we represent undergoes a rigorous multi-stage verification process." },
                    { title: "Privacy", desc: "The majority of our transactions occur off-market, ensuring absolute discretion for both parties." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-8 group">
                       <span className="text-gold font-display font-bold text-lg opacity-20 group-hover:opacity-100 transition-opacity">0{idx + 1}</span>
                       <div className="space-y-4">
                          <h4 className="text-xs uppercase tracking-[0.4em] font-black text-white">{item.title}</h4>
                          <p className="text-sm text-white/30 leading-relaxed uppercase tracking-widest">{item.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      <section className="py-48 bg-white text-black text-center relative overflow-hidden">
         <div className="container mx-auto px-6 md:px-12 relative z-10">
            <p className="text-[10px] uppercase tracking-[0.8em] font-black mb-12 opacity-30">A Statement of Intent</p>
            <h2 className="text-5xl md:text-8xl font-serif  tracking-tighter leading-none max-w-5xl mx-auto">
               Exclusivity is not about price. It is about the <span className=" font-display font-medium uppercase tracking-tighter">Impossible to Replace.</span>
            </h2>
         </div>
         <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
            <span className="text-[40vw] font-display font-black uppercase">CH</span>
         </div>
      </section>

      <Contact />
    </main>
  );
}
