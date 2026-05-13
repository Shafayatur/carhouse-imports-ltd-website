/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import { WishlistProvider } from "@/context/WishlistContext";
import { Navbar } from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import { Hero } from "@/components/Hero";
import { HorizontalCollection } from "@/components/HorizontalCollection";
import { VaultFeature } from "@/components/VaultFeature";
import { GlobalNetwork } from "@/components/GlobalNetwork";
import { InvestmentAdvisory } from "@/components/InvestmentAdvisory";
import { Experience } from "@/components/Experience";
import { RacerSection } from "@/components/RacerSection";
import { Membership } from "@/components/Membership";
import { VideoSection } from "@/components/VideoSection";
import { PartnerLogos } from "@/components/PartnerLogos";
import { FAQ } from "@/components/FAQ";
import { AIConcierge } from "@/components/AIConcierge";
import { Contact } from "@/components/Contact";
import { motion, useScroll, useSpring } from "motion/react";

// Page Imports
import InventoryPage from "@/pages/InventoryPage";
import SourcingPage from "@/pages/SourcingPage";
import CarDetailsPage from "@/pages/CarDetailsPage";
import ConsultationPage from "@/pages/ConsultationPage";
import AdvisoryPage from "@/pages/AdvisoryPage";
import HeritagePage from "@/pages/HeritagePage";
import PhilosophyPage from "@/pages/PhilosophyPage";
import GaragePage from "@/pages/GaragePage";
import WishlistPage from "@/pages/WishlistPage";
import UpdatesPage from "@/pages/UpdatesPage";
import SettingsPage from "@/pages/SettingsPage";

function HomePage() {
  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <Hero />
        
        <div className="relative z-10">
          <HorizontalCollection />
          
          <VideoSection 
            videoUrl="https://videos.pexels.com/video-files/4034444/4034444-uhd_2560_1440_25fps.mp4"
            title="The Pursuit of Rarity"
            subtitle="Curated Discovery"
            quote="We find the vehicles that others don't even know exist. Our network spans the most private collections on the planet."
          />

          <GlobalNetwork />

          <VaultFeature />

          <RacerSection />

          <InvestmentAdvisory />

          <VideoSection 
            videoUrl="https://videos.pexels.com/video-files/6864197/6864197-uhd_2560_1440_25fps.mp4"
            title="Global Movement"
            subtitle="Logistics & Delivery"
            quote="From the port of Nagoya to the hills of Monaco, we bridge the gap between passion and possession."
            reverse
          />

          <Experience />

          <Membership />

          <PartnerLogos />

          <FAQ />
          
          <section className="h-[80vh] bg-luxury-black flex items-center justify-center overflow-hidden relative">
             <motion.div 
               initial={{ opacity: 0, scale: 1.2 }}
               whileInView={{ opacity: 0.4, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 2.5, ease: "easeOut" }}
               className="absolute inset-0 z-0 pointer-events-none"
             >
               <img 
                 src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2670&auto=format&fit=crop" 
                 alt="BG" 
                 className="w-full h-full object-cover grayscale"
               />
             </motion.div>
             <div className="relative z-10 text-center px-6">
                <motion.h3 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5 }}
                  className="text-4xl md:text-7xl font-serif italic mb-8 max-w-5xl mx-auto leading-tight"
                >
                  "Excellence is not an act, it is a habit."
                </motion.h3>
                <div className="w-16 h-[1px] bg-gold mx-auto" />
                <p className="mt-8 text-[10px] uppercase tracking-[0.8em] text-white/40 font-black">Aristotle • Automotive Refined</p>
             </div>
          </section>

          <Contact />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      <WishlistProvider>
        <ScrollToTop />
        <main className="relative selection:bg-gold selection:text-black bg-luxury-black min-h-screen">
          {/* Progress Bar */}
          <motion.div 
            className="fixed top-0 left-0 right-0 h-[2px] bg-gold z-[110] origin-left" 
            style={{ scaleX }} 
          />

          <Navbar />
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/inventory/:id" element={<CarDetailsPage />} />
            <Route path="/sourcing" element={<SourcingPage />} />
            <Route path="/consultation" element={<ConsultationPage />} />
            <Route path="/advisory" element={<AdvisoryPage />} />
            <Route path="/heritage" element={<HeritagePage />} />
            <Route path="/philosophy" element={<PhilosophyPage />} />
            <Route path="/garage" element={<GaragePage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/updates" element={<UpdatesPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>

          <AIConcierge />

          {/* Aesthetic Accents */}
          <div className="fixed bottom-12 right-12 z-50 mix-blend-difference hidden md:block">
            <p className="vertical-text text-[9px] uppercase tracking-[0.5em] font-black text-white/30">
              Car House Imports Ltd • 2026
            </p>
          </div>
        </main>
      </WishlistProvider>
    </BrowserRouter>
  );
}
