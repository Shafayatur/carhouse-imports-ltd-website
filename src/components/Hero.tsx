import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { useSiteSettings } from "@/hooks/useSupabase";
import { SpeedometerLoader } from "@/components/SpeedometerLoader";

// hello 
export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);

  const { get, loading } = useSiteSettings();

  const tagline = get("hero_tagline", "Automotive Excellence Since 1995");
  const headline = get("hero_title", "The Art of Superiority");
  const videoUrl = get("hero_video_url", "/videos/hero.mp4");
  const ctaText = get("hero_cta_text", "Explore Collectionsssss");
  const [videoLoaded, setVideoLoaded] = useState(false);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {loading ? null : (
        <>
          {/* Video Background */}
          <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80 z-10" />

            {/* Loading overlay — fades out once video is ready */}
            <div className={`absolute inset-0 z-20 bg-black flex items-start justify-center pt-50 transition-opacity duration-1000 ${videoLoaded ? "opacity-0 pointer-events-none" : "opacity-100"}`}>              <SpeedometerLoader />
            </div>

            <video
              autoPlay loop muted playsInline
              onCanPlay={() => setVideoLoaded(true)}
              className="w-full h-full object-cover brightness-100"
            >
              <source src={videoUrl} type="video/mp4" />
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
                {tagline}
              </span>
              <h1 className="text-[12vw] md:text-[8vw] font-serif  font-light leading-[0.85] tracking-tight text-white mb-8 md:mb-12">
                {headline.includes(" of ") ? (
                  <>
                    {headline.split(" of ")[0]} of <br />
                    <span className=" font-display font-medium text-gold uppercase tracking-tighter">
                      {headline.split(" of ")[1]}
                    </span>
                  </>
                ) : (
                  <span className=" font-display font-medium text-gold uppercase tracking-tighter">
                    {headline}
                  </span>
                )}
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
                    {ctaText}
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
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
        </>
      )}
    </section>
  );
}