import { Navbar } from "@/components/Navbar";
import { Contact } from "@/components/Contact";
import { motion } from "motion/react";
import { Shield, Globe, Lock } from "lucide-react";

export default function PhilosophyPage() {
  const pillars = [
    { 
      title: "Rarity", 
      icon: <Shield className="text-gold" size={18} />,
      desc: "We prioritize total production numbers and historical significance over transient market trends." 
    },
    { 
      title: "Provenance", 
      icon: <Globe className="text-gold" size={18} />,
      desc: "Every chassis we represent undergoes a rigorous multi-stage verification process to ensure absolute authenticity." 
    },
    { 
      title: "Privacy", 
      icon: <Lock className="text-gold" size={18} />,
      desc: "The majority of our transactions occur off-market, ensuring absolute, ironclad discretion for both parties." 
    }
  ];

  return (
    <main className="bg-luxury-black min-h-screen selection:bg-gold selection:text-black text-white">
      <Navbar />

      {/* Cinematic Header Cover from the Top */}
      <header className="relative h-[60vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/65 z-10" />
          <img
            src="/images/philosophy.jpg"
            className="w-full h-full object-cover brightness-90 scale-105"
            alt="The Philosophy"
          />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-20">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] uppercase tracking-[1em] font-black text-gold mb-6"
          >
            The Ethos
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-[8vw] font-display font-medium tracking-tighter uppercase leading-[0.8] mb-4"
          >
            Defining <br />
            <span className="font-serif font-light text-white/50 lowercase">Automotive</span> <br />
            Curatorship
          </motion.h1>
        </div>
      </header>

      {/* Main Narrative Section */}
      <section className="container mx-auto px-6 md:px-12 py-20">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Full-Color Curated Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-5 aspect-[4/5] rounded-sm overflow-hidden border border-white/5 relative group"
            >
               <img 
                 src="/images/philosophy1.jpg" 
                 alt="Automotive Heritage" 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
               />
            </motion.div>
            
            {/* Right Column: Ethos & Value Pillars */}
            <div className="lg:col-span-7 space-y-16 lg:pl-8">
               <div className="space-y-6">
                  <span className="text-[10px] uppercase tracking-[0.5em] font-black text-gold block">Our Calling</span>
                  <h3 className="text-3xl md:text-5xl font-serif tracking-tight leading-tight text-white">
                     "We do not sell cars. <br />We curate legacies."
                  </h3>
                  <p className="text-base md:text-lg text-white/70 leading-relaxed font-light">
                     At Car House Imports, we believe that a truly exceptional automobile is a confluence of art, engineering, and history. Our role is to act as the bridge between these masterworks and the collectors who understand their gravity.
                  </p>
               </div>

               {/* Value Pillars list (High Legibility text-white/70) */}
               <div className="grid grid-cols-1 gap-10 pt-10 border-t border-white/5">
                  {pillars.map((item, idx) => (
                    <div key={idx} className="flex gap-8 group items-start">
                       <span className="text-gold font-display font-black text-lg opacity-40 group-hover:opacity-100 transition-opacity mt-0.5">
                          0{idx + 1}
                       </span>
                       <div className="space-y-3">
                          <h4 className="text-xs uppercase tracking-[0.4em] font-black text-white flex items-center gap-3">
                             {item.icon} {item.title}
                          </h4>
                          <p className="text-sm text-white/70 leading-relaxed font-medium uppercase tracking-widest">
                             {item.desc}
                          </p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

         </div>
      </section>

      {/* Statement of Intent Section (Sleek Dark Mode - No white boxes!) */}
      <section className="py-32 bg-black/40 text-center relative overflow-hidden border-t border-white/5">
         <div className="container mx-auto px-6 md:px-12 relative z-10 space-y-6">
            <p className="text-[10px] uppercase tracking-[0.8em] font-black text-gold/60 mb-6">A Statement of Intent</p>
            <h2 className="text-4xl md:text-7xl font-serif tracking-tighter leading-tight max-w-4xl mx-auto text-white">
               Exclusivity is not about price. It is about the <br />
               <span className="font-display font-medium uppercase tracking-tighter text-gold">Impossible to Replace.</span>
            </h2>
         </div>
         <div className="absolute inset-0 flex items-center justify-center opacity-[0.01] pointer-events-none">
            <span className="text-[40vw] font-display font-black uppercase text-white">CH</span>
         </div>
      </section>

      <Contact />
    </main>
  );
}
