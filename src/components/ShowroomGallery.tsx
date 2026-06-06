import { motion } from "motion/react";
import { useGalleryImages } from "@/hooks/useSupabase";

// Fallback images using existing public assets
const FALLBACK = [
    { id: 1, image_url: "/images/showroom.jpg", alt: "Showroom floor", span: "2x2" as const, sort_order: 0, is_active: true, position: 1 },
    { id: 2, image_url: "/images/avik-homepage.jpg", alt: "Featured vehicle", span: "1x1" as const, sort_order: 1, is_active: true, position: 2 },
    { id: 3, image_url: "/images/advisory.jpg", alt: "Collection detail", span: "1x1" as const, sort_order: 2, is_active: true, position: 3 },
    { id: 4, image_url: "/images/import.jpg", alt: "Delivery moment", span: "1x2" as const, sort_order: 3, is_active: true, position: 4 },
    { id: 5, image_url: "/images/source-image.jpg", alt: "Global sourcing", span: "2x1" as const, sort_order: 4, is_active: true, position: 5 },
    { id: 6, image_url: "/images/avik-heritage.jpg", alt: "Heritage", span: "1x1" as const, sort_order: 5, is_active: true, position: 6 },
    { id: 7, image_url: "/images/consultation.jpg", alt: "Consultation", span: "1x1" as const, sort_order: 6, is_active: true, position: 7 },
    { id: 8, image_url: "/images/philosophy.jpg", alt: "Philosophy", span: "1x1" as const, sort_order: 7, is_active: true, position: 8 },
];

const spanClass: Record<string, string> = {
    "1x1": "col-span-1 row-span-1",
    "2x1": "col-span-2 row-span-1",
    "1x2": "col-span-1 row-span-2",
    "2x2": "col-span-2 row-span-2",
};

export function ShowroomGallery() {
    const { images: dbImages, loading } = useGalleryImages();
    const images = dbImages.length > 0 ? dbImages : (loading ? [] : FALLBACK);

    return (
        <section className="pt-8 pb-16 bg-luxury-black border-t border-white/5 overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4"
                >
                    <div>
                        <p className="text-[9px] uppercase tracking-[0.7em] font-black text-gold mb-4">The Space</p>
                        <h2 className="text-5xl md:text-7xl font-serif leading-none">Showroom</h2>
                    </div>
                    <p className="text-white/30 text-[11px] leading-relaxed max-w-xs">
                        Where extraordinary vehicles meet discerning eyes. Dhaka's premier luxury automotive space.
                    </p>
                </motion.div>
            </div>

            {/* Desktop collage */}
            {loading ? (
                <div className="hidden md:grid grid-cols-4 gap-2 px-2 h-[85vh]">
                    {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="bg-white/[0.03] animate-pulse" />)}
                </div>
            ) : (
                <div className="hidden md:grid grid-cols-4 auto-rows-[200px] gap-2 px-2">
                    {images.map((img, i) => (
                        <motion.div
                            key={img.id}
                            initial={{ opacity: 0, scale: 0.97 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.8, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                            className={`${spanClass[img.span] || "col-span-1 row-span-1"} relative overflow-hidden bg-[#111]`}
                        >
                            <img
                                src={img.image_url}
                                alt={img.alt || ""}
                                className="w-full h-full object-cover transition-all duration-[1.5s] hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30 pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Mobile grid */}
            <div className="md:hidden grid grid-cols-2 gap-2 px-2">
                {images.slice(0, 6).map((img, i) => (
                    <motion.div
                        key={img.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: i * 0.07 }}
                        className={`relative overflow-hidden bg-[#111] ${img.span === '2x2' || img.span === '2x1' ? 'col-span-2 h-52' : 'h-40'}`}
                    >
                        <img
                            src={img.image_url}
                            alt={img.alt || ""}
                            className="w-full h-full object-cover transition-all duration-[1.5s]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30 pointer-events-none" />
                    </motion.div>
                ))}
            </div>

            {/* Caption */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="container mx-auto px-6 md:px-12 mt-8"
            >
                <div className="flex items-center gap-6 border-t border-white/5 pt-6">
                    <div className="h-[1px] flex-1 bg-white/5" />
                    <p className="text-[8px] uppercase tracking-[0.8em] font-black text-white/20">
                        Tajmahal Road · Mohammadpur · Dhaka
                    </p>
                    <div className="h-[1px] flex-1 bg-white/5" />
                </div>
            </motion.div>
        </section>
    );
}