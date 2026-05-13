import { Navbar } from "@/components/Navbar";
import { Contact } from "@/components/Contact";
import { motion } from "motion/react";
import { TrendingUp, ShieldCheck, Landmark, BarChart3, ArrowRight } from "lucide-react";

export default function AdvisoryPage() {
  const pillars = [
    { 
      title: "Market Analytics", 
      icon: <BarChart3 className="text-gold" />, 
      desc: "Deep-dive analysis into auction trends, historical appreciation, and emerging asset classes within the hypercar market." 
    },
    { 
      title: "Portfolio Management", 
      icon: <Landmark className="text-gold" />, 
      desc: "Strategic acquisition and divestment strategies designed to maximize the long-term value of your automotive collection." 
    },
    { 
      title: "Risk Mitigation", 
      icon: <ShieldCheck className="text-gold" />, 
      desc: "Provenance verification, condition tracking, and insurance advisory to protect your high-value assets." 
    },
    { 
      title: "Future Forecast", 
      icon: <TrendingUp className="text-gold" />, 
      desc: "Identifying the next generation of 'Blue Chip' classics before they reach peak market saturation." 
    }
  ];

  return (
    <main className="bg-luxury-black min-h-screen pt-32 selection:bg-gold selection:text-black text-white">
      <Navbar />

      <section className="container mx-auto px-6 md:px-12 py-12 md:py-24">
         <div className="max-w-4xl">
            <motion.p
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-[10px] uppercase tracking-[1em] font-black text-gold mb-8"
            >
               Wealth Management
            </motion.p>
            <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="text-5xl md:text-[8vw] font-display font-medium tracking-tighter uppercase leading-[0.9] mb-12"
            >
               Investment <br />
               <span className="italic font-serif font-light text-white/30 lowercase">Advisory</span>
            </motion.h1>
            <motion.p 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="text-xl md:text-3xl font-serif italic text-white/50 leading-relaxed"
            >
               In the world of high-value automobiles, a car is more than a machine—it is a sophisticated financial instrument. We help you navigate the complexities of automotive investment.
            </motion.p>
         </div>
      </section>

      <section className="py-24 border-y border-white/5">
         <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
               {pillars.map((pillar, idx) => (
                 <motion.div 
                   key={idx}
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: idx * 0.1 }}
                   className="space-y-8 p-8 bg-white/[0.02] border border-white/5 rounded-sm hover:border-gold/30 transition-all duration-700"
                 >
                    <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center">
                       {pillar.icon}
                    </div>
                    <div className="space-y-4">
                       <h3 className="text-xl font-display font-medium uppercase tracking-widest">{pillar.title}</h3>
                       <p className="text-sm text-white/40 leading-relaxed font-medium uppercase tracking-widest">{pillar.desc}</p>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      <section className="py-32 overflow-hidden">
         <div className="container mx-auto px-6 md:px-12">
            <div className="flex flex-col lg:flex-row gap-24 items-center">
               <div className="flex-1 space-y-12">
                  <h2 className="text-4xl md:text-6xl font-serif italic tracking-tighter leading-tight">
                    Preserving the <span className="text-gold">Historical Integrity</span> of your Portfolio.
                  </h2>
                  <div className="space-y-8">
                     <p className="text-white/40 uppercase tracking-widest text-xs font-bold leading-relaxed">
                        We maintain active relationships with the world's most prestigious auction houses—<span className="text-white">RM Sotheby's, Gooding & Company, and Girardo & Co.</span>—to ensure our clients always have priority access to the market.
                     </p>
                     <div className="h-px w-24 bg-gold" />
                  </div>
                  <button className="group flex items-center gap-6 text-[10px] uppercase tracking-[0.4em] font-black hover:text-gold transition-colors">
                     Download Q2 Market Report <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </button>
               </div>
               <div className="flex-1 relative">
                  <div className="aspect-[4/5] rounded-sm overflow-hidden grayscale hover:grayscale-0 transition-all duration-[2s]">
                     <img 
                        src="https://images.unsplash.com/photo-1542362567-b055002b91f4?q=80&w=2670" 
                        alt="Investment Analysis" 
                        className="w-full h-full object-cover"
                     />
                  </div>
                  <div className="absolute -bottom-12 -left-12 p-12 bg-gold text-black hidden md:block">
                     <p className="text-4xl font-display font-black leading-none">12.4%</p>
                     <p className="text-[10px] uppercase tracking-widest font-black mt-2">Avg. Annual Growth</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <Contact />
    </main>
  );
}
