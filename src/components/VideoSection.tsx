import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface VideoSectionProps {
  videoUrl: URL | string;
  title: string;
  subtitle: string;
  quote?: string;
  reverse?: boolean;
  buttonLink?: string;
  buttonLabel?: string;
}

export function VideoSection({ videoUrl, title, subtitle, quote, reverse, buttonLink, buttonLabel }: VideoSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const width = useTransform(scrollYProgress, [0, 0.4], ["80%", "100%"]);
  const yText = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={ref} className="relative h-screen bg-luxury-black overflow-hidden flex items-center">
      <motion.div 
        style={{ width, height: "100%" }}
        className="absolute inset-0 mx-auto z-0"
      >
        <div className="absolute inset-0 bg-black/60 z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover brightness-75"
        >
          <source src={videoUrl.toString()} type="video/mp4" />
        </video>
      </motion.div>

      <div className="relative z-20 h-full container mx-auto px-6 md:px-12 flex flex-col justify-center">
        <motion.div 
          style={{ y: yText, opacity }}
          className={cn(
            "max-w-3xl flex flex-col gap-8",
            reverse ? "ml-auto text-right items-end" : "mr-auto text-left items-start"
          )}
        >
          <div>
            <p className="text-[10px] uppercase tracking-[0.8em] font-black text-gold mb-6">{subtitle}</p>
            <h3 className="text-6xl md:text-8xl font-serif  leading-[0.85] tracking-tight">{title}</h3>
          </div>
          
          <div className="h-[2px] w-24 bg-gold" />
          
          {quote && (
            <p className="text-white text-xl md:text-2xl font-light  leading-relaxed opacity-80">
              "{quote}"
            </p>
          )}

          {buttonLink ? (
            <Link 
              to={buttonLink}
              className="inline-block px-12 py-5 border border-white/20 rounded-full text-[10px] uppercase tracking-[0.4em] font-black hover:bg-gold hover:text-black hover:border-gold transition-all duration-700"
            >
              {buttonLabel || "Discover Process"}
            </Link>
          ) : (
            <button className="px-12 py-5 border border-white/20 rounded-full text-[10px] uppercase tracking-[0.4em] font-black hover:bg-gold hover:text-black hover:border-gold transition-all duration-700">
              {buttonLabel || "Discover Process"}
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
