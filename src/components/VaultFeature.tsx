import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ALL_CARS } from "@/data/cars";
import { ArrowRight } from "lucide-react";

export function VaultFeature() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const vaultCars = ALL_CARS.filter(car => car.id.startsWith("v"));

  return (
    <section ref={containerRef} className="relative h-[600vh] bg-luxury-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {vaultCars.map((item, index) => {
          const start = index / vaultCars.length;
          const end = (index + 1) / vaultCars.length;
          const range = end - start;
          
          // Custom segments for 3-step interaction within the car's range:
          // 1. Enter and stay dark (0% to 35% of its range)
          // 2. Transition to clear (35% to 65% of its range)
          // 3. Move to next (beyond 70%)
          const landStage = start + range * 0.35;
          const clearStage = start + range * 0.65;
          const exitStage = end - range * 0.1;

          // eslint-disable-next-line react-hooks/rules-of-hooks
          const opacity = useTransform(scrollYProgress, 
            [start, start + range * 0.05, exitStage, end], 
            [0, 1, 1, 0]
          );

          // Brightness logic: Stay dark (0.2) until landStage, then clear to 1.0
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const brightness = useTransform(scrollYProgress, 
            [start, landStage, clearStage], 
            [0.2, 0.2, 1.0]
          );

          // eslint-disable-next-line react-hooks/rules-of-hooks
          const scale = useTransform(scrollYProgress, [start, end], [1.1, 1]);
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const yText = useTransform(scrollYProgress, [start, end], [60, -60]);

          return (
            <motion.div
              key={item.id}
              style={{ opacity }}
              className="absolute inset-0 flex items-center justify-center p-6"
            >
              <div className="absolute inset-0 z-0 overflow-hidden">
                <motion.img 
                  src={item.image} 
                  alt={item.name} 
                  style={{ 
                    scale, 
                    filter: useTransform(brightness, (b) => `brightness(${b})`) 
                  }}
                  className="w-full h-full object-cover transition-all"
                />
                <div className="absolute inset-0 bg-black/40 z-10" />
              </div>

              <div className="relative z-20 text-center w-full max-w-6xl mx-auto">
                 <motion.div style={{ y: yText }}>
                   <p className="text-gold font-serif italic text-3xl md:text-4xl mb-6 tracking-wide drop-shadow-lg">{item.brand}</p>
                   <h2 className="text-[12vw] md:text-[9vw] font-display font-medium text-white uppercase tracking-tighter leading-[0.8] mb-12 drop-shadow-2xl">
                      {item.name}
                   </h2>
                   
                   <div className="flex flex-col md:flex-row justify-center items-center gap-12 mt-16 pt-16 border-t border-white/5">
                      <div className="text-center md:text-left space-y-4">
                        <p className="text-[10px] uppercase tracking-[0.6em] text-gold font-black">Performance Specs</p>
                        <p className="text-lg md:text-xl font-serif italic text-white/80">{item.specs}</p>
                      </div>
                      
                      <Link to={`/inventory/${item.id}`} className="group px-12 py-6 bg-gold text-black rounded-full text-[11px] uppercase tracking-[0.4em] font-black hover:bg-white transition-all duration-700 flex items-center gap-4">
                        View Full Dossier <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                      </Link>

                      <div className="text-center md:text-left space-y-4">
                        <p className="text-[10px] uppercase tracking-[0.6em] text-gold font-black">Configuration</p>
                        <p className="text-lg md:text-xl font-serif italic text-white/80">{item.color}</p>
                      </div>
                   </div>
                 </motion.div>
              </div>

              {/* Progress indicator on side */}
              <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-30">
                 {vaultCars.map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-[2px] h-12 transition-colors duration-500 ${i === index ? 'bg-gold' : 'bg-white/10'}`} 
                    />
                 ))}
              </div>
            </motion.div>
          );
        })}

        <div className="absolute top-12 left-12 z-40">
           <p className="text-[10px] uppercase tracking-[0.5em] font-black text-white/20">The Vault / Feature</p>
        </div>
      </div>
    </section>
  );
}
