import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

interface Car {
  id: string;
  name: string;
  brand: string;
  year: number;
  price: string;
  image: string;
  category: string;
}

const CARS: Car[] = [
  {
    id: "1",
    name: "911 GT3 RS",
    brand: "Porsche",
    year: 2024,
    price: "$275,000",
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=2670&auto=format&fit=crop",
    category: "Supercar"
  },
  {
    id: "2",
    name: "SF90 Stradale",
    brand: "Ferrari",
    year: 2023,
    price: "$524,000",
    image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=2670&auto=format&fit=crop",
    category: "Hybrid"
  },
  {
    id: "3",
    name: "DB11 Volante",
    brand: "Aston Martin",
    year: 2022,
    price: "$232,000",
    image: "https://images.unsplash.com/photo-1603584173870-7f3948ab8923?q=80&w=2670&auto=format&fit=crop",
    category: "Grand Tourer"
  },
  {
    id: "4",
    name: "Revuelto",
    brand: "Lamborghini",
    year: 2024,
    price: "$608,000",
    image: "https://images.unsplash.com/photo-1621135802920-133df287f89c?q=80&w=2670&auto=format&fit=crop",
    category: "V12 Hypercar"
  }
];

export function FeaturedVehicles() {
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
              Curated Masterpieces
            </motion.p>
            <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="text-4xl md:text-8xl font-serif italic font-light text-black leading-[0.85] tracking-tight"
            >
              The Modern <br />
              <span className="not-italic font-display font-medium text-luxury-black/90 uppercase tracking-tighter">Collection</span>
            </motion.h2>
          </div>
          <motion.div
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 0.3 }}
          >
            <button className="px-8 md:px-10 py-4 md:py-5 border border-black rounded-full text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-black hover:bg-black hover:text-white transition-all duration-700">
              View Private Inventory
            </button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 md:gap-y-16">
          {CARS.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl mb-6 md:mb-8 bg-neutral-100">
                <img 
                  src={car.image} 
                  alt={car.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
                <div className="absolute top-4 left-4 md:top-6 md:left-6 px-3 py-1 md:px-4 md:py-2 glass rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <p className="text-[9px] md:text-[10px] uppercase font-bold tracking-widest text-white">{car.category}</p>
                </div>
                <div className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 bg-white text-black flex items-center justify-center rounded-full scale-0 group-hover:scale-100 transition-transform duration-300">
                  <ArrowUpRight size={18} />
                </div>
              </div>
              
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[9px] md:text-[11px] uppercase tracking-widest text-black/40 font-bold mb-1 md:mb-2">{car.brand} • {car.year}</p>
                  <h3 className="text-xl md:text-3xl font-display font-medium group-hover:text-gold transition-colors">{car.name}</h3>
                </div>
                <p className="text-base md:text-xl font-display font-medium text-black/60">{car.price}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
