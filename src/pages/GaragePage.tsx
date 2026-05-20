import { Navbar } from "@/components/Navbar";
import { GoBack } from "@/components/GoBack";
import { Contact } from "@/components/Contact";
import { motion } from "motion/react";
import { Car, ArrowRight, Grid, List as ListIcon, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { useVehicles } from "@/hooks/useSupabase";

export default function GaragePage() {
  const { vehicles, loading } = useVehicles();

  // Garage shows available vehicles — in a real implementation this would be
  // tied to a user account. For now shows first 3 available vehicles as demo.
  const savedCars = vehicles.filter(v => v.status === "Available").slice(0, 3);

  return (
    <main className="bg-luxury-black min-h-screen pt-32 selection:bg-gold selection:text-black text-white">
      <Navbar />
      <GoBack />

      <div className="container mx-auto px-6 md:px-12 py-16">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <div className="space-y-6">
            <p className="text-gold text-[10px] uppercase tracking-[1em] font-black">Private Collection</p>
            <h1 className="text-6xl md:text-8xl font-serif  tracking-tighter">
              Digital <span className=" font-display font-medium uppercase text-white/90">Garage</span>
            </h1>
          </div>
          <div className="flex gap-4">
            <button className="w-12 h-12 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors bg-white/5">
              <Grid size={18} />
            </button>
            <button className="w-12 h-12 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors">
              <ListIcon size={18} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="space-y-px">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse bg-white/5 h-48" />
            ))}
          </div>
        ) : savedCars.length > 0 ? (
          <div className="grid grid-cols-1 gap-px bg-white/5 border border-white/5">
            {savedCars.map((car, idx) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-luxury-gray p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 hover:bg-white/[0.03] transition-colors group"
              >
                <div className="w-full md:w-1/3 aspect-video overflow-hidden rounded-sm bg-black/40">
                  {car.image_url ? (
                    <img
                      src={car.image_url}
                      alt={`${car.make} ${car.model}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <p className="text-white/10 text-3xl font-display font-black tracking-tighter">{car.make}</p>
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gold text-[9px] uppercase tracking-widest font-black mb-2">
                        {car.condition} · {car.origin}
                      </p>
                      <h3 className="text-3xl md:text-4xl font-serif  text-white">
                        {car.year} {car.make} {car.model}
                      </h3>
                    </div>
                    <p className="text-xl font-display font-medium text-white/60">
                      {car.selling_price
                        ? "৳ " + Math.round(car.selling_price).toLocaleString("en-BD")
                        : "P.O.A"}
                    </p>
                  </div>

                  <p className="text-white/40 text-sm max-w-xl leading-relaxed uppercase tracking-widest font-medium">
                    {car.engine_cc}cc · {car.transmission} · {car.fuel_type} · {car.mileage?.toLocaleString()} km
                  </p>

                  <div className="flex items-center gap-12 pt-4">
                    <Link
                      to={`/inventory/${car.id}`}
                      className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] text-gold hover:text-white transition-colors group/link"
                    >
                      View Full Dossier
                      <ArrowRight size={14} className="group-hover/link:translate-x-2 transition-transform" />
                    </Link>
                    <div className="flex items-center gap-2 text-white/20">
                      <ShieldAlert size={14} />
                      <span className="text-[8px] uppercase tracking-widest font-black">Insured & Verified</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center space-y-8 bg-white/[0.01] border border-white/5 border-dashed">
            <Car size={64} className="text-white/5 mx-auto" />
            <h3 className="text-2xl font-serif  text-white/40">Your digital garage is currently empty.</h3>
            <Link
              to="/inventory"
              className="inline-block py-6 px-12 bg-white text-black font-black uppercase text-[10px] tracking-[0.4em] hover:bg-gold transition-colors"
            >
              Explore Inventory
            </Link>
          </div>
        )}

        <div className="mt-32 p-12 bg-gold/[0.02] border border-gold/20 rounded-sm">
          <div className="max-w-3xl">
            <h4 className="text-xl font-serif  text-gold mb-6">Concierge Asset Management</h4>
            <p className="text-white/40 leading-relaxed uppercase tracking-widest text-[10px] font-medium">
              The Digital Garage allows you to track vehicles you own or are in the process of acquiring. For full mechanical logs, climate-controlled storage telemetry, and provenance documentation, please contact your private advisor.
            </p>
          </div>
        </div>
      </div>

      <Contact />
    </main>
  );
}