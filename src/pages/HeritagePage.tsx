import { Navbar } from "@/components/Navbar";
import { GoBack } from "@/components/GoBack";
import { Contact } from "@/components/Contact";
import { motion } from "motion/react";
import { Trophy, History, Zap, Flag, Timer, Award, MessageSquare } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSupabase";

export default function HeritagePage() {
  const { get } = useSiteSettings();
  const heritageVideoUrl = get("heritage_video_url", "/videos/heritage.mp4");

  const avikTimeline = [
    {
      year: "2014 - 2016",
      event: "Rallycross Championship",
      title: "3x Consecutive Champion",
      description: "Dominating local rallycross, cementing his status as the absolute leader in Bangladeshi motorsport.",
      icon: <Timer />
    },
    {
      year: "2019",
      event: "Volkswagen Ameo Cup",
      title: "First International Victory",
      description: "Made history as the first Bangladeshi racer to win an international motorsport championship in India.",
      icon: <Award />
    },
    {
      year: "2021",
      event: "UAE Pro Car Championship",
      title: "Yas Marina F1 Circuit Win",
      description: "Took Pole Position (P1) and secured the championship win at the legendary Abu Dhabi Formula 1 track.",
      icon: <Trophy />
    },
    {
      year: "Present",
      event: "Car House Imports & Content",
      title: "The Ultimate Curator",
      description: "Utilizing professional track-level diagnostic expertise to select, certify, and import the finest luxury vehicles for Bangladesh.",
      icon: <Zap />
    }
  ];

  const classicAchievements = [
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
               className="w-full h-full object-cover brightness-50"
            >
                <source src={heritageVideoUrl} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-black/40 to-transparent" />
         </div>
         
         <div className="relative z-10 text-center space-y-12 max-w-6xl px-6">
            <motion.p
               initial={{ opacity: 0, letterSpacing: "0.2em" }}
               animate={{ opacity: 1, letterSpacing: "1em" }}
               transition={{ duration: 2 }}
               className="text-[10px] uppercase font-black text-gold"
            >
               A Legacy of Speed
            </motion.p>
            <motion.h1 
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
               className="text-[15vw] md:text-[12vw] font-display font-medium uppercase tracking-tighter leading-[0.7] text-white/90"
            >
               Racing <br />
               <span className="font-serif font-light text-white/20 lowercase">Heritage</span>
            </motion.h1>
         </div>
      </section>
      <GoBack />

      {/* Avik Anwar: The Pioneer Bio Section */}
      <section className="py-32 container mx-auto px-6 md:px-12 border-b border-white/5">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="space-y-12">
               <div className="space-y-6">
                  <p className="text-[10px] uppercase tracking-[0.8em] font-black text-gold">The Pioneer's Narrative</p>
                  <h2 className="text-4xl md:text-7xl font-serif tracking-tighter leading-none">
                     Avik Anwar <br />
                     <span className="text-white/40 uppercase font-display font-medium">Speed as a Standard.</span>
                  </h2>
                  <p className="text-white/50 text-lg leading-relaxed max-w-xl font-light">
                     Before building Bangladesh's premier automotive importing division, Avik Anwar was rewriting motorsport history. Inspired by legendary track figures, he stepped onto the track and quickly became a force of nature, carrying the red and green flag onto the highest podiums of global racing.
                  </p>
               </div>
               
               <div className="p-8 border border-white/5 bg-white/[0.01] rounded-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full blur-3xl group-hover:bg-gold/10 transition-all duration-700 pointer-events-none" />
                  <p className="text-gold uppercase tracking-[0.2em] text-[9px] font-black mb-4">The Sourcing Philosophy</p>
                  <p className="text-xl font-serif text-white/80 leading-relaxed italic">
                     "My track experience isn't just about speed—it is about vehicle limits, weight distribution, and component precision. I scrutiny-test every car we import through the very same lens."
                  </p>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {avikTimeline.map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.8 }}
                    className="p-8 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-500 group rounded-sm"
                  >
                     <div className="text-gold mb-6 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                        {item.icon}
                     </div>
                     <p className="text-xs font-black text-gold/80 tracking-[0.3em] mb-2">{item.year}</p>
                     <h4 className="text-xl font-serif text-white/90 mb-3">{item.event}</h4>
                     <p className="text-xs text-white/40 uppercase tracking-widest font-black mb-4">{item.title}</p>
                     <p className="text-sm text-white/50 leading-relaxed font-light">{item.description}</p>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* Classic Historical Timeline */}
      <section className="py-32 container mx-auto px-6 md:px-12">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            <div className="space-y-16">
               <h2 className="text-4xl md:text-7xl font-serif tracking-tighter leading-none">
                  Defining the <br /> <span className="text-white/40 uppercase font-display font-medium">Limits of Physics.</span>
               </h2>
               <p className="text-white/50 text-xl font-serif leading-relaxed border-l border-gold/30 pl-8 max-w-xl">
                  Every vehicle in our collection carries the DNA of legendary victories. From the Mulsanne Straight to the steep curves of the Nürburgring, we preserve the stories that shaped automotive history.
               </p>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {classicAchievements.map((item, idx) => (
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
                       <h4 className="text-xl font-serif text-white/80">{item.title}</h4>
                    </motion.div>
                  ))}
               </div>
            </div>

            <div className="relative">
               <div className="aspect-[4/5] rounded-sm overflow-hidden border border-white/5 relative group">
                  <img 
                    src="/images/avik-heritage.jpg" 
                    alt="Avik Anwar Racing Legend" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
               </div>
               <div className="absolute top-12 -right-12 p-8 bg-luxury-black border border-white/5 hidden xl:block w-64">
                  <p className="text-[10px] uppercase tracking-[0.4em] font-black text-gold mb-4">Provenance</p>
                  <p className="text-sm font-serif text-white/50 leading-relaxed">
                     Tracing the lineage of chassis numbers that stood on the podium of the world's most grueling circuits.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* Featured Brands Horizontal Scroll */}
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
