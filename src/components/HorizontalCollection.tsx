import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useHorizontalVehicles } from "@/hooks/useSupabase";

export function HorizontalCollection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  const { vehicles, loading } = useHorizontalVehicles();

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  // Show placeholder cards while loading or if none selected yet
  const showPlaceholder = !loading && vehicles.length === 0;

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-luxury-black">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        {loading ? (
          <div className="flex gap-12 px-12 md:px-24">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-[85vw] md:w-[46vw] h-[72vh] flex-shrink-0 bg-white/5 animate-pulse rounded-sm" />
            ))}
          </div>
        ) : (
          <motion.div style={{ x }} className="flex gap-12 px-12 md:px-24">
            {vehicles.map((car) => (
              <div key={car.id} className="group relative w-[85vw] md:w-[46vw] h-[72vh] flex-shrink-0">
                <Link to={`/inventory/${car.id}`} className="block h-full">
                  <div className="relative w-full h-full overflow-hidden rounded-sm transition-all duration-1000">
                    {car.image_url ? (
                      <img
                        src={car.image_url}
                        alt={`${car.make} ${car.model}`}
                        className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-white/[0.03] flex flex-col items-center justify-center">
                        <p className="text-white/10 text-6xl font-display font-black tracking-tighter">{car.make}</p>
                        <p className="text-white/5 text-3xl font-serif  mt-2">{car.model}</p>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-1000" />

                    <div className="absolute top-12 left-12 text-white">
                      <p className="text-[10px] uppercase tracking-[0.5em] font-black text-gold mb-3">{car.make}</p>
                      <h3 className="text-4xl md:text-5xl font-serif ">{car.model}</h3>
                    </div>

                    <div className="absolute bottom-12 right-12 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700">
                      <div className="w-16 h-16 rounded-full bg-gold text-black flex items-center justify-center hover:bg-white transition-colors">
                        <ArrowUpRight size={24} />
                      </div>
                    </div>
                  </div>
                </Link>

                <div className="mt-8 flex justify-between items-center border-t border-white/10 pt-6">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-white/30 font-black">{car.year} Bespoke Portfolio</p>
                  <p className="text-[10px] uppercase tracking-[0.4em] font-black text-white/50">Details • Sourcing • Logistics</p>
                </div>
              </div>
            ))}

            {/* CTA card at end */}
            <div className="w-[40vw] flex-shrink-0 flex items-center justify-center border-l border-white/10 ml-12">
              <div className="text-center space-y-8">
                <h3 className="text-4xl md:text-6xl font-display font-light uppercase tracking-tighter">
                  Seek <br /><span className=" font-serif text-gold">Something Else?</span>
                </h3>
                <Link to="/sourcing">
                  <button className="px-12 py-5 bg-white text-black rounded-full font-bold uppercase text-[12px] tracking-widest hover:bg-gold transition-colors">
                    Source Custom Model
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}