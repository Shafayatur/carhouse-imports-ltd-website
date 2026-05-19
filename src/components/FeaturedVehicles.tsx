import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useFeaturedVehicles, useSiteSettings } from "@/hooks/useSupabase";

export function FeaturedVehicles() {
  const { vehicles, loading } = useFeaturedVehicles();
  const { get } = useSiteSettings();

  const label = get("featured_label", "Curated Masterpieces");
  const heading = get("featured_heading", "The Modern Collection");
  const btnText = get("featured_btn_text", "View Private Inventory");

  // Format price from number to display string
  const fmtPrice = (v: number) =>
    v ? "৳ " + Math.round(v).toLocaleString("en-BD") : "P.O.A";

  return (
    <section className="py-32 px-6 md:px-12 bg-white text-black">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-[10px] uppercase tracking-[0.6em] font-black text-gold mb-8"
            >
              {label}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-8xl font-serif  font-light text-black leading-[0.85] tracking-tight"
            >
              {heading.includes(" ") ? (
                <>
                  {heading.split(" ").slice(0, -1).join(" ")} <br />
                  <span className=" font-display font-medium text-luxury-black/90 uppercase tracking-tighter">
                    {heading.split(" ").slice(-1)[0]}
                  </span>
                </>
              ) : (
                heading
              )}
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/inventory">
              <button className="px-8 md:px-10 py-4 md:py-5 border border-black rounded-full text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-black hover:bg-black hover:text-white transition-all duration-700">
                {btnText}
              </button>
            </Link>
          </motion.div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[16/10] bg-neutral-200 rounded-2xl mb-6" />
                <div className="h-4 bg-neutral-200 rounded w-1/3 mb-2" />
                <div className="h-6 bg-neutral-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : vehicles.length === 0 ? (
          // Fallback: show inventory link if no featured cars set yet
          <div className="text-center py-16">
            <p className="text-black/40 text-sm mb-4">No featured vehicles selected yet.</p>
            <Link to="/inventory" className="text-[10px] uppercase tracking-widest font-black border-b border-black pb-1">
              Browse Full Inventory
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 md:gap-y-16">
            {vehicles.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <Link to={`/inventory/${car.id}`}>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-6 md:mb-8 bg-neutral-100">
                    <div className="w-full h-full bg-neutral-200 flex items-center justify-center">
                      <span className="text-neutral-400 text-sm uppercase tracking-widest">
                        {car.make} {car.model}
                      </span>
                    </div>
                    <div className="absolute top-4 left-4 md:top-6 md:left-6 px-3 py-1 md:px-4 md:py-2 glass rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-[9px] md:text-[10px] uppercase font-bold tracking-widest text-white">{car.condition}</p>
                    </div>
                    <div className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 bg-white text-black flex items-center justify-center rounded-full scale-0 group-hover:scale-100 transition-transform duration-300">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[9px] md:text-[11px] uppercase tracking-widest text-black/40 font-bold mb-1 md:mb-2">
                        {car.make} • {car.year}
                      </p>
                      <h3 className="text-xl md:text-3xl font-display font-medium group-hover:text-gold transition-colors">
                        {car.model}
                      </h3>
                    </div>
                    <p className="text-base md:text-xl font-display font-medium text-black/60">
                      {fmtPrice(car.selling_price)}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}