import { Navbar } from "@/components/Navbar";
import { Contact } from "@/components/Contact";
import { motion } from "motion/react";
import { Trophy, History, Zap, Flag } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSupabase";

export default function HeritagePage() {
  const { get } = useSiteSettings();
  const heritageVideoUrl = get("heritage_video_url", "/videos/heritage.mp4");

  const achievements = [
    { year: "1962", event: "Le Mans 24h", title: "GT Class Victory", icon: <Flag /> },
    { year: "1971", event: "Targa Florio", title: "Overall Winner", icon: <Trophy /> },
    { year: "1984", event: "Group B Era", title: "Pinnacle of Power", icon: <Zap /> },
    { year: "1995", event: "BPR Global GT", title: "Series Dominance", icon: <History /> }
  ];

  return (
    <main className="bg-luxury-black min-h-screen selection:bg-gold selection:text-black text-white">
      <Navbar />

      {/* Cinematic Header — full screen from top, beneath fixed Navbar */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
         <div className="absolute inset-0">
            <video 
               autoPlay 
               loop 
               muted 
               playsInline
               className="w-full h-full object-cover brightness-75"
            >
                <source src={heritageVideoUrl} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-black/30 to-transparent" />
         </div>
         
         <div className="relative z-10 text-center space-y-12 max-w-6xl px-6">
            <motion.p
               initial={{ opacity: 0, letterSpacing: "0.2em" }}
               animate={{ opacity: 1, letterSpacing: "1em" }}
               transition={{ duration: 2 }}
               className="text-[10px] uppercase font-black text-gold"
            >
               Legacy of Speed
            </motion.p>
            <motion.h1 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
               className="text-[15vw] md:text-[12vw] font-display font-medium uppercase tracking-tighter leading-[0.7] text-white/90"
            >
               Racing <br />
               <span className="italic font-serif font-light text-white/20 lowercase">Heritage</span>
            </motion.h1>
         </div>
      </section>

      {/* Historical Timeline */}
      <section className="py-32 container mx-auto px-6 md:px-12">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div className="space-y-16">
               <h2 className="text-4xl md:text-7xl font-serif italic tracking-tighter leading-none">
                  Defining the <br /> <span className="text-white/40 not-italic uppercase font-display font-medium">Limits of Physics.</span>
               </h2>
               <p className="text-white/50 text-xl font-serif italic leading-relaxed border-l border-gold/30 pl-8 max-w-xl">
                  Every vehicle in our collection carries the DNA of legendary victories. From the Mulsanne Straight to the steep curves of the Nürburgring, we preserve the stories that shaped automotive history.
               </p>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {achievements.map((item, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="p-8 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors group"
                    >
                       <div className="text-gold mb-6 opacity-30 group-hover:opacity-100 transition-opacity">
                          {item.icon}
                       </div>
                       <p className="text-xs font-black text-white/20 tracking-[0.3em] mb-2">{item.year} • {item.event}</p>
                       <h4 className="text-xl font-serif italic text-white/80">{item.title}</h4>
                    </motion.div>
                  ))}
               </div>
            </div>

            <div className="relative">
               <div className="aspect-[4/5] rounded-sm overflow-hidden grayscale brightness-50 hover:brightness-100 transition-all duration-[3s]">
                  <img 
                    src="https://images.unsplash.com/photo-1594739502936-e0f0653d9e8b?q=80&w=2670" 
                    alt="Vintage Racing" 
                    className="w-full h-full object-cover"
                  />
               </div>
               <div className="absolute top-12 -right-12 p-8 bg-luxury-black border border-white/5 hidden xl:block w-64">
                  <p className="text-[10px] uppercase tracking-[0.4em] font-black text-gold mb-4">Provenance</p>
                  <p className="text-sm font-serif italic text-white/50 leading-relaxed">
                     Tracing the linage of chassis numbers that stood on the podium of the world's most grueling circuits.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* Featured Brands Horizontal Scroll Placeholder style */}
      <section className="py-24 bg-white text-black overflow-hidden">
         <div className="flex animate-marquee whitespace-nowrap gap-24 items-center">
            {["FERRARI", "PORSCHE", "ASTON MARTIN", "LAMBORGHINI", "MCLAREN", "BUGATTI", "PAGANI", "KOENIGSEGG"].map((brand) => (
               <span key={brand} className="text-6xl md:text-9xl font-display font-black opacity-5 tracking-tighter">{brand}</span>
            ))}
         </div>
      </section>

      <Contact />
    </main>
  );
}
