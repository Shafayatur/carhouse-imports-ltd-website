import { motion, AnimatePresence } from "motion/react";
import { Globe, ShieldCheck, Zap, Award, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useSiteSettings } from "@/hooks/useSupabase";

export function GlobalNetwork() {
   const [activeCard, setActiveCard] = useState(0);
   const { get, loading } = useSiteSettings();

   const stats = [
      { icon: <Globe size={24} />, title: get("network_stat1_title", "32 Countries"), desc: get("network_stat1_desc", "Access to private auctions across every major automotive hub.") },
      { icon: <ShieldCheck size={24} />, title: get("network_stat2_title", "200+ Point Check"), desc: get("network_stat2_desc", "Rigorous mechanical and provenance verification by certified experts.") },
      { icon: <Zap size={24} />, title: get("network_stat3_title", "Air & Sea"), desc: get("network_stat3_desc", "Priority white-glove logistics with real-time tracking and full insurance.") },
      { icon: <Award size={24} />, title: get("network_stat4_title", "VAT Compliant"), desc: get("network_stat4_desc", "Complete handling of taxes, duties, and local region compliance.") },
   ];

   const importsCount = get("network_imports_count", "12k+");
   const quote = get("network_philosophy_quote", "Finding the impossible, delivering the incredible.");
   const bgImage = get("network_bg_image_url", "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2670&auto=format&fit=crop");

   useEffect(() => {
      const timer = setInterval(() => setActiveCard(p => (p + 1) % stats.length), 4000);
      return () => clearInterval(timer);
   }, []);

   return (
      <section className="relative h-auto md:h-[250vh] bg-luxury-black text-white" id="global-reach">
         <div className="sticky top-0 h-auto md:h-screen overflow-hidden flex flex-col justify-center py-20 md:py-0">
            <div className="absolute inset-0 opacity-10 pointer-events-none hidden md:block">
               <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gold rounded-full blur-[2px]" />
               <div className="absolute top-1/2 left-1/3 w-1 h-1 bg-white rounded-full" />
               <div className="absolute top-1/3 left-2/3 w-2 h-2 bg-gold rounded-full blur-[2px]" />
               <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-white rounded-full" />
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
               <div className="flex flex-col lg:flex-row gap-24 items-center">
                  <div className="lg:w-1/2">
                     <p className="text-[10px] uppercase tracking-[10px] font-black text-gold mb-8 opacity-70">Infrastructure</p>
                     <h2 className="text-6xl md:text-9xl font-serif italic leading-[0.8] tracking-tighter mb-12">
                        Seamless <br />
                        <span className="not-italic font-display font-medium text-white/90 uppercase">Acquisition</span>
                     </h2>
                     <p className="text-xl text-white/40 leading-relaxed font-light max-w-lg mb-16 border-l border-gold/30 pl-8">
                        Our global logistics network operates behind the scenes to ensure your vehicle arrives in pristine condition.
                     </p>
                     <div className="hidden md:flex gap-16">
                        <div className="group">
                           <p className="text-6xl font-display font-black text-gold tracking-tighter group-hover:scale-110 transition-transform cursor-default">
                              {importsCount}
                           </p>
                           <p className="text-[9px] uppercase tracking-[0.4em] font-black text-white/30 mt-2">Imports Completed</p>
                        </div>
                     </div>
                  </div>

                  <div className="lg:w-1/2 w-full relative">
                     {/* Desktop grid */}
                     <div className="hidden md:grid grid-cols-2 gap-4">
                        {stats.map((stat, idx) => (
                           <motion.div
                              key={idx}
                              whileHover={{ y: -10 }}
                              initial={{ opacity: 0, y: 30 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              viewport={{ once: true }}
                              className="bg-white/5 backdrop-blur-sm p-10 border border-white/10 hover:border-gold/50 transition-all duration-500 group"
                           >
                              <div className="w-12 h-12 mb-8 text-gold group-hover:scale-110 transition-transform">{stat.icon}</div>
                              <h4 className="text-xl font-serif italic mb-4 text-white group-hover:text-gold transition-colors">{stat.title}</h4>
                              <p className="text-white/30 leading-relaxed text-[10px] uppercase tracking-[0.1em] font-medium">{stat.desc}</p>
                           </motion.div>
                        ))}
                     </div>

                     {/* Mobile cycling */}
                     <div className="md:hidden relative h-[400px] w-full mt-12 px-4 flex items-center justify-center">
                        <AnimatePresence mode="popLayout">
                           {stats.map((stat, idx) => {
                              const distance = (idx - activeCard + stats.length) % stats.length;
                              if (distance > 2) return null;
                              return (
                                 <motion.div
                                    key={idx}
                                    style={{ zIndex: stats.length - distance }}
                                    initial={{ opacity: 0, x: 50, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 - distance * 0.05, y: distance * -15, x: 0, filter: `blur(${distance * 1}px)` }}
                                    exit={{ opacity: 0, x: -200, rotate: -10, transition: { duration: 0.5 } }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="absolute inset-0 bg-[#0a0a0a] backdrop-blur-md p-8 border border-white/10 rounded-2xl flex flex-col justify-between shadow-2xl"
                                 >
                                    <div className="w-12 h-12 text-gold mb-6 border-b border-white/10 pb-4">{stat.icon}</div>
                                    <div>
                                       <h4 className="text-2xl font-serif italic mb-3 text-white">{stat.title}</h4>
                                       <p className="text-white/40 text-[10px] leading-relaxed uppercase tracking-widest">{stat.desc}</p>
                                    </div>
                                    <div className="flex justify-between items-center mt-6">
                                       <div className="flex gap-2">
                                          {stats.map((_, dotIdx) => (
                                             <div key={dotIdx} className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${dotIdx === idx ? "bg-gold w-4" : "bg-white/10"}`} />
                                          ))}
                                       </div>
                                       <ChevronRight size={16} className="text-gold animate-pulse" />
                                    </div>
                                 </motion.div>
                              );
                           })}
                        </AnimatePresence>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Philosophy quote section */}
         <div className="relative h-screen w-full overflow-hidden">
            <motion.div
               initial={{ scale: 1.2, opacity: 0 }}
               whileInView={{ scale: 1, opacity: 0.6 }}
               transition={{ duration: 2 }}
               className="absolute inset-0"
            >
               <img src={bgImage} alt="" className="w-full h-full object-cover grayscale brightness-50" />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-transparent to-luxury-black" />
            <div className="absolute inset-0 flex items-center justify-center px-6">
               <div className="text-center max-w-4xl">
                  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                     <p className="text-gold text-[10px] uppercase tracking-[1em] font-black mb-12">The Philosophy</p>
                     <h3 className="text-5xl md:text-8xl font-serif italic text-white leading-tight">
                        "{quote}"
                     </h3>
                  </motion.div>
               </div>
            </div>
         </div>
      </section>
   );
}