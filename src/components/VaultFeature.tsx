import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
  MotionValue,
} from "motion/react";
import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useVaultFeatureVehicles } from "@/hooks/useSupabase";

function VaultSlide({
  item,
  index,
  total,
  scrollYProgress,
}: {
  item: any;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const sliceSize = 1 / total;
  const start = index * sliceSize;
  const end = (index + 1) * sliceSize;

  const scale = useTransform(scrollYProgress, [start, end], [1.12, 1.0]);
  const yText = useTransform(scrollYProgress, [start, end], [60, -60]);

  const filter = useTransform(
    scrollYProgress,
    [start, start + sliceSize * 0.45, start + sliceSize * 0.65],
    ["brightness(0.25)", "brightness(0.25)", "brightness(1)"]
  );

  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="absolute inset-0 flex items-center justify-center bg-luxury-black"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-luxury-black">
        {item.image_url ? (
          <motion.img
            src={item.image_url}
            alt={`${item.make} ${item.model}`}
            style={{ scale, filter }}
            className="w-full h-full object-cover"
          />
        ) : (
          <motion.div
            style={{ scale }}
            className="w-full h-full bg-white/[0.02] flex items-center justify-center"
          >
            <p className="text-white/5 text-[20vw] font-display font-black tracking-tighter">
              {item.make}
            </p>
          </motion.div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-transparent to-luxury-black/40" />
      </div>

      {/* Text */}
      <motion.div
        style={{ y: yText }}
        className="relative z-10 text-center max-w-4xl px-6"
      >
        <p className="text-[10px] uppercase tracking-[0.8em] font-black text-gold mb-6 opacity-80">
          {item.make} · {item.year}
        </p>

        <h2 className="text-6xl md:text-9xl font-serif  text-white leading-[0.85] tracking-tighter mb-8">
          {item.model}
        </h2>

        <p className="text-white/30 text-sm uppercase tracking-[0.3em] font-black mb-12">
          {item.engine_cc}cc · {item.transmission} · {item.fuel_type}
        </p>

        <Link
          to={`/inventory/${item.id}`}
          className="inline-flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-black text-white/60 hover:text-gold transition-colors group"
        >
          Access Full Dossier
          <ArrowRight
            size={14}
            className="group-hover:translate-x-2 transition-transform"
          />
        </Link>
      </motion.div>

      {/* Price */}
      {item.selling_price > 0 && (
        <div className="absolute bottom-12 right-12 text-right z-10">
          <p className="text-[9px] uppercase tracking-widest text-white/20 font-black mb-1">
            Acquisition Price
          </p>

          <p className="text-2xl font-display font-bold text-gold">
            BDT {Math.round(item.selling_price).toLocaleString("en-BD")}
          </p>
        </div>
      )}

      {/* Counter */}
      <div className="absolute bottom-12 left-12 z-10">
        <p className="text-[9px] uppercase tracking-[0.4em] font-black text-white/20">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </p>
      </div>

      {/* Dot nav */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`w-1 rounded-full transition-all duration-300 ${i === index ? "h-6 bg-gold" : "h-1.5 bg-white/20"
              }`}
          />
        ))}
      </div>
    </motion.div>
  );
}

function VaultInner({ vaultCars }: { vaultCars: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let id1: number;
    let id2: number;

    id1 = requestAnimationFrame(() => {
      id2 = requestAnimationFrame(() => setReady(true));
    });

    return () => {
      cancelAnimationFrame(id1);
      cancelAnimationFrame(id2);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: ready ? containerRef : undefined,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const nextIndex = Math.min(
      vaultCars.length - 1,
      Math.floor(latest * vaultCars.length)
    );

    setActiveIndex(nextIndex);
  });

  const scrollPerCar = 220;
  const totalHeight = 100 + vaultCars.length * scrollPerCar;

  const activeCar = vaultCars[activeIndex];

  return (
    <section
      ref={containerRef}
      className="relative bg-luxury-black"
      style={{ height: `${totalHeight}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-luxury-black">
        {ready && activeCar && (
          <AnimatePresence mode="wait">
            <VaultSlide
              key={activeCar.id}
              item={activeCar}
              index={activeIndex}
              total={vaultCars.length}
              scrollYProgress={scrollYProgress}
            />
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}

export function VaultFeature() {
  const { vehicles: vaultCars, loading } = useVaultFeatureVehicles();

  if (loading) {
    return (
      <section className="h-screen bg-luxury-black flex items-center justify-center">
        <div className="w-8 h-8 border border-white/20 border-t-white rounded-full animate-spin" />
      </section>
    );
  }

  if (vaultCars.length === 0) return null;

  return <VaultInner vaultCars={vaultCars} />;
}