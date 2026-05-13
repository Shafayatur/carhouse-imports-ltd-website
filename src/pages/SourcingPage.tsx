import { Navbar } from "@/components/Navbar";
import { Contact } from "@/components/Contact";
import { motion } from "motion/react";
import { Globe, Shield, Truck, FileText, CheckCircle2 } from "lucide-react";

export default function SourcingPage() {
  const steps = [
    { title: "Strategic Search", icon: <Globe />, desc: "Accessing private dealer networks and collector circles in Europe, Japan, and the Americas." },
    { title: "Due Diligence", icon: <Shield />, desc: "Complete historical provenance audit, service records analysis, and certified mechanical inspection." },
    { title: "Acquisition", icon: <FileText />, desc: "Secure multi-currency transactions, legislative compliance, and title validation." },
    { title: "Transport", icon: <Truck />, desc: "Fully insured, climate-controlled enclosed shipping from origin to final destination." }
  ];

  return (
    <main className="bg-luxury-black min-h-screen pt-32 selection:bg-gold selection:text-black text-white">
      <Navbar />

      <header className="relative h-[70vh] flex items-center overflow-hidden">
         <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-black/60 z-10" />
            <img 
               src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2670" 
               className="w-full h-full object-cover grayscale"
               alt="Global"
            />
         </div>
         <div className="container mx-auto px-6 md:px-12 relative z-20">
            <motion.p
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-[10px] uppercase tracking-[1em] font-black text-gold mb-8"
            >
               The Gold Standard
            </motion.p>
            <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="text-6xl md:text-[10vw] font-serif italic leading-[0.8] tracking-tighter"
            >
               Sourcing <br />
               <span className="not-italic font-display font-medium text-white uppercase">Redefined</span>
            </motion.h1>
         </div>
      </header>

      <section className="py-32 container mx-auto px-6 md:px-12">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div className="space-y-12">
               <h2 className="text-4xl md:text-6xl font-serif italic">Global Access, <span className="text-white/40 not-italic uppercase font-display font-medium">Absolute Discretion</span></h2>
               <p className="text-white/50 text-lg leading-relaxed max-w-xl border-l border-gold/30 pl-8">
                  The most desirable vehicles rarely reach public listings. Our 25-year network gives you direct access to off-market inventory and private sales worldwide.
               </p>
               
               <div className="space-y-8 pt-8">
                  <div className="flex gap-8 group">
                     <div className="flex-shrink-0 w-12 h-12 border border-white/10 rounded-full flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all">
                        <CheckCircle2 size={24} />
                     </div>
                     <div>
                        <h4 className="text-xl font-display font-bold uppercase tracking-widest mb-3">VAT & Duty Handling</h4>
                        <p className="text-sm text-white/30 leading-relaxed uppercase tracking-widest">Complete management of import tariffs and local region compliance.</p>
                     </div>
                  </div>
                  <div className="flex gap-8 group">
                     <div className="flex-shrink-0 w-12 h-12 border border-white/10 rounded-full flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all">
                        <CheckCircle2 size={24} />
                     </div>
                     <div>
                        <h4 className="text-xl font-display font-bold uppercase tracking-widest mb-3">Physical Survey</h4>
                        <p className="text-sm text-white/30 leading-relaxed uppercase tracking-widest">In-person inspection by our global team of specialist mechanics.</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
                {steps.map((step, idx) => (
                   <div key={idx} className="bg-luxury-gray p-12 space-y-12 hover:bg-white/5 transition-colors duration-700">
                      <div className="text-gold opacity-50">{step.icon}</div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20 mb-4">Phase 0{idx+1}</p>
                        <h4 className="text-2xl font-serif italic mb-6 text-white">{step.title}</h4>
                        <p className="text-white/30 text-xs leading-relaxed font-medium uppercase tracking-widest">{step.desc}</p>
                      </div>
                   </div>
                ))}
            </div>
         </div>
      </section>

      <section className="py-24 border-y border-white/5 bg-white/[0.01]">
         <div className="container mx-auto px-6 md:px-12">
            <h3 className="text-[10px] uppercase tracking-[0.5em] font-black text-white/30 mb-16 text-center">Global Partner Network</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-24">
               {[
                 { name: "Dutton Garage", region: "Melbourne, AU" },
                 { name: "RM Sotheby’s", region: "London / NY" },
                 { name: "The Little Car Company", region: "Oxfordshire, UK" },
                 { name: "Girardo & Co.", region: "Oxfordshire, UK" },
                 { name: "Joe Macari", region: "London, UK" },
                 { name: "Danzante", region: "Milan, IT" },
                 { name: "Bingo Sports", region: "Tokyo, JP" },
                 { name: "Canepa", region: "California, USA" }
               ].map((partner, idx) => (
                 <motion.div 
                   key={idx}
                   initial={{ opacity: 0 }}
                   whileInView={{ opacity: 1 }}
                   viewport={{ once: true }}
                   transition={{ delay: idx * 0.05 }}
                   className="text-center group"
                 >
                   <p className="text-2xl font-serif italic text-white/40 group-hover:text-gold transition-colors duration-500 mb-2">{partner.name}</p>
                   <p className="text-[8px] uppercase tracking-[0.4em] font-black text-white/10 group-hover:text-white/30 transition-colors uppercase">{partner.region}</p>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      <section className="py-32 bg-white text-black">
         <div className="container mx-auto px-6 md:px-12 text-center">
            <h2 className="text-4xl md:text-7xl font-serif italic mb-16">Ready to initiate a <span className="not-italic font-display font-medium uppercase tracking-tighter">search?</span></h2>
            <div className="max-w-2xl mx-auto space-y-8">
               <input type="text" placeholder="Desired Manufacturer" className="w-full bg-transparent border-b border-black/10 py-6 text-2xl font-serif italic outline-none focus:border-gold transition-colors" />
               <input type="text" placeholder="Specific Model / Generation" className="w-full bg-transparent border-b border-black/10 py-6 text-2xl font-serif italic outline-none focus:border-gold transition-colors" />
               <button className="w-full py-8 bg-black text-white rounded-full font-black uppercase text-[11px] tracking-[0.4em] hover:bg-gold transition-all duration-700 mt-12">
                  Launch Bespoke Pursuit
               </button>
            </div>
         </div>
      </section>

      <Contact />
    </main>
  );
}
