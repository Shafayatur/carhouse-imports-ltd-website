import { Navbar } from "@/components/Navbar";
import { Contact } from "@/components/Contact";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Heart } from "lucide-react";
import { ALL_CARS } from "@/data/cars";
import { useState } from "react";
import { useWishlist } from "@/context/WishlistContext";

export default function InventoryPage() {
  const [filter, setFilter] = useState<string>("All");
  const { toggleWishlist, isInWishlist } = useWishlist();
  
  const categories = ["All", "Hypercar", "GT", "Heritage", "Off-Road", "Track"];
  
  const inventory = filter === "All" 
    ? ALL_CARS 
    : ALL_CARS.filter(car => car.category === filter);

  return (
    <main className="bg-luxury-black min-h-screen pt-32 selection:bg-gold selection:text-black text-white">
      <Navbar />
      
      <header className="container mx-auto px-6 md:px-12 py-12 md:py-20 border-b border-white/5">
         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
            <div className="max-w-3xl">
               <motion.p 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="text-[10px] uppercase tracking-[0.8em] font-black text-gold mb-8"
               >
                 Active Inventory
               </motion.p>
               <motion.h1 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.1 }}
                 className="text-7xl md:text-9xl font-serif italic leading-[0.8] tracking-tighter"
               >
                 The Private <br />
                 <span className="not-italic font-display font-medium text-white uppercase">Vault</span>
               </motion.h1>
            </div>
            
            <div className="flex flex-wrap items-center gap-4 lg:gap-8 pb-4">
               {categories.map((cat) => (
                 <button 
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`text-[9px] uppercase tracking-[0.3em] font-black transition-all duration-500 py-2 px-1 border-b-2 ${
                    filter === cat ? "text-gold border-gold" : "text-white/20 border-transparent hover:text-white/60"
                  }`}
                 >
                   {cat}
                 </button>
               ))}
            </div>
         </div>
      </header>

      <section className="container mx-auto px-6 md:px-12 py-24">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
            <AnimatePresence mode="popLayout">
              {inventory.map((car, idx) => (
                 <motion.div
                   key={car.id}
                   layout
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.9 }}
                   transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                 >
                    <Link to={`/inventory/${car.id}`} className="group cursor-pointer block">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-sm transition-all duration-1000 mb-8 bg-luxury-gray">
                         <img 
                           src={car.image} 
                           alt={car.name} 
                           className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                         />
                         <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
                         
                         <button 
                           onClick={(e) => {
                             e.preventDefault();
                             e.stopPropagation();
                             toggleWishlist(car.id);
                           }}
                           className={`absolute top-6 left-6 w-10 h-10 rounded-full border border-white/10 backdrop-blur-md flex items-center justify-center transition-all duration-500 z-10 ${
                             isInWishlist(car.id) ? 'bg-gold text-black border-gold' : 'bg-black/20 text-white/40 hover:text-white hover:bg-white/10'
                           }`}
                         >
                            <Heart size={16} fill={isInWishlist(car.id) ? "currentColor" : "none"} />
                         </button>

                         <div className="absolute top-6 right-6 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500">
                            <ArrowUpRight size={20} />
                         </div>
                      </div>
                      
                      <div className="flex justify-between items-start">
                         <div>
                            <p className="text-[9px] uppercase tracking-[0.4em] text-white/40 font-black mb-2">{car.brand} • {car.year}</p>
                            <h3 className="text-3xl font-serif italic text-white group-hover:text-gold transition-colors">{car.name}</h3>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-black mt-2">{car.specs}</p>
                         </div>
                         <p className="text-xl font-display font-bold text-gold">{car.price}</p>
                      </div>
                    </Link>
                 </motion.div>
              ))}
            </AnimatePresence>
         </div>
         
         {inventory.length === 0 && (
           <div className="py-48 text-center">
              <p className="text-2xl font-serif italic text-white/20">No matching assets found in the local vault.</p>
           </div>
         )}
         
         <div className="mt-32 text-center py-24 border-t border-white/5 bg-white/[0.01]">
            <p className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20 mb-16">Certified Import & Strategic Partners</p>
            <div className="flex flex-wrap justify-center gap-x-20 gap-y-12 grayscale opacity-30 hover:opacity-100 transition-all duration-[1s]">
               {["Dutton Garage", "RM Sotheby's", "Girardo & Co", "Bingo Sports", "Canepa"].map((name) => (
                 <span key={name} className="text-2xl font-serif italic text-white tracking-tight">{name}</span>
               ))}
            </div>
         </div>
         
         <div className="mt-32 text-center py-24 border-t border-white/5">
            <h2 className="text-4xl md:text-5xl font-serif italic text-white/20 max-w-2xl mx-auto mb-12">
               "Can't find your specific configuration? We specialize in sourcing the exact model you desire."
            </h2>
            <Link 
              to="/sourcing"
              className="inline-block px-12 py-6 bg-gold text-black rounded-full font-black uppercase text-[11px] tracking-[0.3em] hover:bg-white transition-all duration-700"
            >
               Request Custom Sourcing
            </Link>
         </div>
      </section>

      <Contact />
    </main>
  );
}
