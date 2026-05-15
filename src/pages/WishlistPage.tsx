import { Navbar } from "@/components/Navbar";
import { Contact } from "@/components/Contact";
import { motion } from "motion/react";
import { Heart, ArrowRight, Share2, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "@/context/WishlistContext";
import { useVehicles } from "@/hooks/useSupabase";

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { vehicles } = useVehicles();

  const favoritedCars = vehicles.filter(v => wishlist.includes(v.id));

  return (
    <main className="bg-luxury-black min-h-screen pt-32 selection:bg-gold selection:text-black text-white">
      <Navbar />

      <div className="container mx-auto px-6 md:px-12 py-16">
        <div className="space-y-6 mb-24">
          <p className="text-gold text-[10px] uppercase tracking-[1em] font-black">Pre-Acquisition</p>
          <h1 className="text-6xl md:text-8xl font-serif italic tracking-tighter">
            The <span className="not-italic font-display font-medium uppercase text-white/90">Wishlist</span>
          </h1>
          <p className="text-white/40 max-w-xl font-light text-lg">
            Monitoring real-time market fluctuations and private auction availability for your target acquisitions.
          </p>
        </div>

        {favoritedCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favoritedCars.map((car, idx) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-white/[0.02] border border-white/5 rounded-sm overflow-hidden hover:border-gold/30 transition-all duration-500"
              >
                <div className="aspect-[4/3] overflow-hidden bg-luxury-gray">
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

                <div className="p-8 space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[9px] uppercase tracking-widest text-gold font-black mb-1">{car.make} · {car.year}</p>
                      <h3 className="text-2xl font-serif italic text-white group-hover:text-gold transition-colors">{car.model}</h3>
                    </div>
                    <button onClick={() => toggleWishlist(car.id)} className="text-white/20 hover:text-red-400 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest text-white/30 font-black">
                    <span className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold" /> Market Watch Active
                    </span>
                  </div>

                  <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                    <Link
                      to={`/inventory/${car.id}`}
                      className="text-[10px] uppercase tracking-[0.3em] font-black text-white hover:text-gold transition-colors flex items-center gap-3"
                    >
                      View Dossier <ArrowRight size={14} />
                    </Link>
                    <button className="text-white/30 hover:text-white transition-colors">
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center space-y-8 border border-white/5 bg-white/[0.01]">
            <Heart size={64} className="text-white/5 mx-auto" />
            <h3 className="text-2xl font-serif italic text-white/40">Your wishlist is currently empty.</h3>
            <Link
              to="/inventory"
              className="inline-block py-6 px-12 bg-white text-black font-black uppercase text-[10px] tracking-[0.4em] hover:bg-gold transition-colors"
            >
              Begin Selection
            </Link>
          </div>
        )}
      </div>

      <Contact />
    </main>
  );
}