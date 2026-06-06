import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight, Zap, Clock } from "lucide-react";
import { useNewArrivals } from "@/hooks/useSupabase";

function formatPrice(price: number) {
    if (price >= 10000000) return `৳${(price / 10000000).toFixed(1)} Cr`;
    if (price >= 100000) return `৳${(price / 100000).toFixed(0)} Lakh`;
    return `৳${price.toLocaleString()}`;
}

function daysAgo(dateStr: string) {
    const days = Math.floor((Date.now() - new Date(dateStr).getTime()) / 86400000);
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)}w ago`;
    return `${Math.floor(days / 30)}mo ago`;
}

function CarCard({ car, single, index }: { car: any; single?: boolean; index: number }) {
    const isNew = car.condition?.toLowerCase() === "new" || car.mileage < 500;
    const isReserved = car.status?.toLowerCase() === "reserved";

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.08 }}
            className="group relative overflow-hidden bg-[#0a0a0a] border border-white/8 hover:border-gold/25 transition-all duration-500 h-full"
        >
            <Link to={`/inventory/${car.id}`} className="flex flex-col h-full">
                {/* Image */}
                <div className={`relative overflow-hidden bg-[#050505] ${single ? 'h-[60vh]' : 'h-64'}`}>
                    {car.image_url ? (
                        <img
                            src={car.image_url}
                            alt={`${car.make} ${car.model}`}
                            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center">
                            <p className={`text-white/[0.05] font-serif font-black ${single ? 'text-8xl' : 'text-5xl'}`}>{car.make}</p>
                            <p className={`text-white/[0.03] font-serif mt-1 ${single ? 'text-4xl' : 'text-2xl'}`}>{car.model}</p>
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {isNew && (
                            <span className="flex items-center gap-1.5 px-2.5 py-1 bg-gold text-black text-[8px] uppercase tracking-[0.4em] font-black">
                                <Zap size={9} fill="black" /> Just Arrived
                            </span>
                        )}
                        {isReserved && (
                            <span className="px-2.5 py-1 bg-white/5 border border-white/15 text-white/50 text-[8px] uppercase tracking-[0.4em] font-black">Reserved</span>
                        )}
                    </div>
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-sm">
                        <Clock size={9} className="text-white/40" />
                        <span className="text-[8px] uppercase tracking-[0.3em] text-white/40 font-black">{daysAgo(car.import_date)}</span>
                    </div>
                </div>

                {/* Info */}
                <div className={`p-6 flex-1 flex flex-col justify-between ${single ? 'p-8' : ''}`}>
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <p className="text-[8px] uppercase tracking-[0.5em] font-black text-white/30 mb-1">
                                {car.year} · {car.body_type || car.condition}
                            </p>
                            <h3 className={`font-serif text-white group-hover:text-gold transition-colors duration-300 ${single ? 'text-4xl' : 'text-xl'}`}>
                                {car.make} {car.model}
                            </h3>
                        </div>
                        <div className="text-right shrink-0">
                            <p className="text-[8px] uppercase tracking-[0.3em] text-white/25 mb-1">Price</p>
                            <p className={`font-black text-white ${single ? 'text-xl' : 'text-sm'}`}>
                                {formatPrice(car.selling_price)}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-5 pt-5 border-t border-white/5">
                        <div className="flex gap-4">
                            <span className="text-[9px] uppercase tracking-[0.3em] text-white/30">
                                {car.mileage > 0 ? `${car.mileage.toLocaleString()} km` : "Brand New"}
                            </span>
                            {car.transmission && (
                                <span className="text-[9px] uppercase tracking-[0.3em] text-white/30">{car.transmission}</span>
                            )}
                        </div>
                        <ArrowRight size={14} className="text-white/20 group-hover:text-gold group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

export function NewArrivals() {
    const { vehicles, loading } = useNewArrivals();
    const count = vehicles.length;

    // Grid class based on count
    const gridClass =
        count === 1 ? "grid-cols-1" :
            count === 2 ? "grid-cols-1 md:grid-cols-2" :
                "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

    return (
        <section className="py-32 bg-luxury-black relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_80%_30%,rgba(197,160,40,0.04),transparent_60%)] pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                            <p className="text-[9px] uppercase tracking-[0.7em] font-black text-gold">Fresh Imports</p>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-serif leading-none">New Arrivals</h2>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <Link to="/inventory" className="group flex items-center gap-3 text-[9px] uppercase tracking-[0.5em] font-black text-white/50 hover:text-gold transition-colors">
                            View All Inventory
                            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="grid md:grid-cols-3 gap-4">
                        {[1, 2, 3].map(i => <div key={i} className="h-72 bg-white/[0.03] animate-pulse" />)}
                    </div>
                ) : count === 0 ? (
                    // Nothing selected yet — show placeholder message
                    <div className="border border-white/5 p-16 text-center">
                        <p className="text-white/20 text-sm uppercase tracking-[0.5em]">No arrivals selected yet</p>
                        <p className="text-white/10 text-xs mt-2 tracking-widest">Manage from Admin → Website CMS → New Arrivals</p>
                    </div>
                ) : (
                    <div className={`grid ${gridClass} gap-4`}>
                        {vehicles.map((car, i) => (
                            <CarCard key={car.id} car={car} single={count === 1} index={i} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}