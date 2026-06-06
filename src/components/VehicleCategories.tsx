import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useCategories } from "@/hooks/useSupabase";

// Fallback categories matching the hardcoded body_type options in admin
const FALLBACK_CATEGORIES = [
    { id: 1, name: "SUV", slug: "SUV", description: "Commanding presence", image_url: null, sort_order: 0, is_active: true },
    { id: 2, name: "Sedan", slug: "Sedan", description: "Refined authority", image_url: null, sort_order: 1, is_active: true },
    { id: 3, name: "Coupe", slug: "Coupe", description: "Sculpted performance", image_url: null, sort_order: 2, is_active: true },
    { id: 4, name: "Hatchback", slug: "Hatchback", description: "Urban precision", image_url: null, sort_order: 3, is_active: true },
    { id: 5, name: "MPV", slug: "MPV", description: "Family excellence", image_url: null, sort_order: 4, is_active: true },
    { id: 6, name: "Convertible", slug: "Convertible", description: "Open-air luxury", image_url: null, sort_order: 5, is_active: true },
    { id: 7, name: "Hybrid", slug: "Hybrid", description: "Efficient excellence", image_url: null, sort_order: 6, is_active: true },
];

// Simple car silhouettes per category
const silhouette = (type: string) => {
    const paths: Record<string, string> = {
        SUV: "M20,55 L20,42 Q22,28 42,22 L75,15 Q100,10 120,10 L148,10 Q168,10 178,22 L186,38 L186,55 Z M38,55 A11,11 0 1,0 60,55 M142,55 A11,11 0 1,0 164,55",
        Sedan: "M15,55 L15,47 L32,33 L68,22 Q90,16 115,16 Q138,16 158,22 L176,33 L186,47 L186,55 Z M35,55 A11,11 0 1,0 57,55 M145,55 A11,11 0 1,0 167,55",
        Coupe: "M18,55 L18,46 L40,30 L80,19 Q105,13 125,13 Q148,13 165,22 L180,36 L186,48 L186,55 Z M38,55 A11,11 0 1,0 60,55 M146,55 A11,11 0 1,0 168,55",
        Hatchback: "M20,55 L20,46 L35,32 L65,22 Q88,16 112,16 Q136,16 158,24 L178,36 L185,48 L185,55 Z M40,55 A11,11 0 1,0 62,55 M145,55 A11,11 0 1,0 167,55",
        MPV: "M22,55 L22,40 Q24,26 42,20 L68,14 Q90,10 115,10 Q140,10 162,16 L178,28 L184,42 L184,55 Z M42,55 A11,11 0 1,0 64,55 M144,55 A11,11 0 1,0 166,55",
        Convertible: "M18,58 L18,46 L38,30 L78,18 Q102,12 122,12 Q146,12 163,20 L180,34 L184,48 L184,58 Z M38,58 A11,11 0 1,0 60,58 M144,58 A11,11 0 1,0 166,58",
        Hybrid: "M18,55 L18,46 Q20,34 38,27 L76,18 Q100,13 120,13 Q142,13 162,20 L178,32 L184,46 L184,55 Z M38,55 A11,11 0 1,0 60,55 M142,55 A11,11 0 1,0 164,55",
        Pickup: "M18,55 L18,42 L28,28 L70,22 Q88,18 108,18 L108,38 L186,38 L186,55 Z M38,55 A11,11 0 1,0 60,55 M148,55 A11,11 0 1,0 170,55",
        Van: "M20,55 L20,36 Q22,22 38,18 L165,18 Q182,18 184,30 L184,55 Z M40,55 A11,11 0 1,0 62,55 M148,55 A11,11 0 1,0 170,55",
    };
    return paths[type] || paths["Sedan"];
};

const gradients: Record<string, string> = {
    SUV: "from-[#1a1208]", Sedan: "from-[#0a0e1a]", Coupe: "from-[#0d0a1a]",
    Hatchback: "from-[#0a120d]", MPV: "from-[#12100a]", Convertible: "from-[#1a0e0a]",
    Hybrid: "from-[#0a1a0e]", Pickup: "from-[#0a0f1a]", Van: "from-[#141010]",
};

export function VehicleCategories() {
    const { categories: dbCategories, loading } = useCategories();
    const categories = dbCategories.length > 0 ? dbCategories : (loading ? [] : FALLBACK_CATEGORIES);

    if (loading) return (
        <section className="py-32 bg-[#060606]">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[1, 2, 3, 4, 5, 6, 7].map(i => <div key={i} className="h-40 bg-white/[0.03] animate-pulse" />)}
                </div>
            </div>
        </section>
    );

    return (
        <section className="py-32 bg-[#060606] border-t border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(197,160,40,0.03),transparent_70%)] pointer-events-none" />

            <div className="container mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <p className="text-[9px] uppercase tracking-[0.7em] font-black text-gold mb-4">Browse by Type</p>
                    <h2 className="text-5xl md:text-7xl font-serif leading-none">Categories</h2>
                </motion.div>

                {/* Asymmetric grid — first tile spans 2 cols */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {categories.map((cat, i) => {
                        const isFirst = i === 0;
                        const gradient = gradients[cat.name] || "from-[#0a0e0a]";

                        return (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.06 }}
                                className={isFirst ? "col-span-2" : "col-span-1"}
                            >
                                <Link
                                    to={`/inventory?bodyStyle=${encodeURIComponent(cat.slug)}`}
                                    className={`group relative ${isFirst ? 'h-52' : 'h-40'} flex flex-col justify-end p-6 overflow-hidden bg-gradient-to-br ${gradient} to-[#0a0a0a] border border-white/8 hover:border-gold/30 transition-all duration-500 block`}
                                >
                                    {/* Category image if available */}
                                    {cat.image_url && (
                                        <img
                                            src={cat.image_url}
                                            alt={cat.name}
                                            className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500"
                                        />
                                    )}

                                    {/* SVG silhouette */}
                                    {!cat.image_url && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <svg
                                                viewBox="0 0 200 70"
                                                className={`${isFirst ? 'w-3/4' : 'w-full'} h-full opacity-[0.07] group-hover:opacity-[0.13] transition-opacity duration-500`}
                                                fill="white"
                                            >
                                                <path d={silhouette(cat.name)} />
                                            </svg>
                                        </div>
                                    )}

                                    {/* Watermark text */}
                                    <div className={`absolute ${isFirst ? 'top-4 right-6 text-[52px]' : 'top-3 right-4 text-[32px]'} font-serif font-black text-white/[0.04] leading-none select-none`}>
                                        {cat.name.slice(0, 3).toUpperCase()}
                                    </div>

                                    {/* Dark overlay for gradient bottom */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                    {/* Label */}
                                    <div className="relative z-10">
                                        {cat.description && (
                                            <p className="text-[7px] uppercase tracking-[0.4em] text-white/25 mb-1">{cat.description}</p>
                                        )}
                                        <div className="flex items-end justify-between">
                                            <h3 className={`font-serif text-white group-hover:text-gold transition-colors leading-tight ${isFirst ? 'text-3xl' : 'text-lg'}`}>
                                                {cat.name}
                                            </h3>
                                            <ArrowRight
                                                size={isFirst ? 14 : 11}
                                                className="text-white/20 group-hover:text-gold group-hover:translate-x-0.5 transition-all"
                                            />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-8 flex items-center justify-between border-t border-white/5 pt-6"
                >
                    <p className="text-[9px] uppercase tracking-[0.5em] text-white/25 font-black">
                        {categories.length} categories available
                    </p>
                    <Link to="/inventory" className="group flex items-center gap-2 text-[9px] uppercase tracking-[0.4em] font-black text-white/40 hover:text-gold transition-colors">
                        View All <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}