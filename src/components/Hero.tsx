import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowDown, Play } from "lucide-react";
import { useRef } from "react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Video Background */}
      <motion.div 
        style={{ y, scale }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80 z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover grayscale brightness-50"
          poster="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2670"
        >
          <source 
            src="https://videos.pexels.com/video-files/3815048/3815048-uhd_2560_1440_25fps.mp4" 
            type="video/mp4" 
          />
        </video>
      </motion.div>

      {/* Content */}
      <div className="relative z-20 text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <span className="text-[10px] uppercase tracking-[0.6em] font-black text-gold mb-8 opacity-80">
            Automotive Excellence Since 1995
          </span>
          <h1 className="text-[12vw] md:text-[8vw] font-serif italic font-light leading-[0.85] tracking-tight text-white mb-8 md:mb-12">
            The Art of <br />
            <span className="not-italic font-display font-medium text-gold uppercase tracking-tighter">Superiority</span>
          </h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
          >
            <Link to="/inventory" className="group relative px-10 py-4 md:px-12 md:py-5 overflow-hidden rounded-full border border-white/20">
               <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]" />
               <span className="relative z-10 text-[9px] md:text-[10px] uppercase tracking-[0.4em] font-black text-white group-hover:text-black transition-colors duration-500">
                  Explore Collection
               </span>
            </Link>
            <button className="flex items-center gap-4 md:gap-6 text-white/60 hover:text-gold transition-all duration-500 group">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold transition-colors">
                <Play size={16} className="fill-white group-hover:fill-gold transition-colors ml-1" />
              </div>
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-bold">Watch Showreel</span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Hero Scroll indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-gold to-transparent relative overflow-hidden">
           <motion.div 
            animate={{ y: [0, 80] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 w-full h-[30%] bg-white"
           />
        </div>
        <span className="text-[9px] uppercase tracking-[0.5em] font-bold text-white/40">Scroll</span>
      </motion.div>

      {/* Side Accents */}
      <div className="absolute left-12 bottom-12 hidden lg:flex flex-col gap-4 text-[10px] items-start opacity-30 select-none">
         <span className="tracking-[0.4em] uppercase font-bold">01 / Curated</span>
         <span className="tracking-[0.4em] uppercase font-bold">02 / Sourced</span>
         <span className="tracking-[0.4em] uppercase font-bold">03 / Delivered</span>
      </div>
    </section>
  );
}
