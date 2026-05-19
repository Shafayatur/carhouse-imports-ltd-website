import { motion } from "motion/react";
import { Award, Trophy, Timer, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export function RacerSection() {
   return (
      <section className="py-32 bg-luxury-black relative overflow-hidden">
         {/* Decorative vertical line */}
         <div className="absolute left-1/2 top-0 w-[1px] h-32 bg-gold/30 -translate-x-1/2" />

         <div className="container mx-auto px-6 md:px-12">
            <div className="flex flex-col lg:flex-row items-center gap-24">
               <div className="lg:w-1/2 relative">
                  <motion.div
                     initial={{ opacity: 0, scale: 0.9 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 1.5 }}
                     className="relative aspect-[4/5] rounded-sm overflow-hidden"
                  >
                     <img
                        src="/images/avik-homepage.jpg"
                        alt="Avik Anwar in Racing Suit"
                        className="w-full h-full object-cover brightness-75 transition-all duration-1000"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                     <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
                        <div>
                           <p className="text-gold font-serif text-3xl mb-1">Avik Anwar</p>
                           <p className="text-[10px] uppercase tracking-[0.4em] text-white/50 font-black">Motorsport Pioneer & Founder</p>
                        </div>
                        <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                           <Zap size={20} className="text-gold" />
                        </div>
                     </div>
                  </motion.div>

                  {/* Floating Badge */}
                  <motion.div
                     animate={{ y: [0, -20, 0] }}
                     transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                     className="absolute -top-10 -right-10 glass p-8 rounded-sm hidden md:block border-gold/30"
                  >
                     <Trophy size={32} className="text-gold mb-4" />
                     <p className="text-[10px] uppercase tracking-[0.4em] font-black text-white/40 mb-2">F1 Circuit Victory</p>
                     <p className="text-xl font-display font-bold">NGK Pro Car <br />Champion '21</p>
                  </motion.div>
               </div>

               <div className="lg:w-1/2 space-y-12">
                  <div className="space-y-6">
                     <p className="text-[10px] uppercase tracking-[0.8em] font-black text-gold">The Velocity Profile</p>
                     <h2 className="text-6xl md:text-8xl font-serif leading-[0.85] tracking-tight">
                        Forged on <br />
                        <span className="font-display font-medium text-white uppercase tracking-tighter">The F1 Circuit</span>
                     </h2>
                     <p className="text-xl text-white/40 leading-relaxed font-light max-w-xl">
                        Our founder, Avik Anwar, isn't just an importer—he is a motorsport pioneer. As the first Bangladeshi to win an international racing championship and conquer a Formula 1 circuit, his racing DNA is infused into every vehicle we source.
                     </p>
                  </div>

                  <div className="grid grid-cols-2 gap-12 pt-12 border-t border-white/5">
                     <div className="space-y-4">
                        <div className="flex items-center gap-4 text-gold">
                           <Timer size={20} />
                           <span className="text-[10px] uppercase tracking-[0.4em] font-black">Track Record</span>
                        </div>
                        <p className="text-2xl font-serif text-white/80">"If you want to win, you must push limits. We bring that same track precision to imports."</p>
                     </div>
                     <div className="space-y-4 text-right lg:text-left">
                        <div className="flex items-center gap-4 text-gold lg:justify-start justify-end">
                           <Award size={20} />
                           <span className="text-[10px] uppercase tracking-[0.4em] font-black">Championships</span>
                        </div>
                        <p className="text-white/40 text-sm leading-relaxed uppercase tracking-widest font-black">Volkswagen Ameo Cup • Yas Marina F1 Win • 3x Rallycross Champion</p>
                     </div>
                  </div>

                  <Link to="/heritage" className="inline-block group px-12 py-6 border border-white/20 rounded-full text-[10px] uppercase tracking-[0.4em] font-black text-white hover:bg-gold hover:text-black hover:border-gold transition-all duration-700 relative overflow-hidden">
                     <span className="relative z-10">Explore The Racing Heritage</span>
                  </Link>
               </div>
            </div>
         </div>
      </section>
   );
}
