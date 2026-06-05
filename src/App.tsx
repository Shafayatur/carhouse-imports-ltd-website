/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import { WishlistProvider } from "@/context/WishlistContext";
import { CompareProvider, useCompare } from "@/context/CompareContext";
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
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import { useNavigate } from "react-router-dom";
import { GitCompareArrows, X } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSupabase";

// Page Imports
import InventoryPage from "@/pages/InventoryPage";
import SourcingPage from "@/pages/SourcingPage";
import CarDetailsPage from "@/pages/CarDetailsPage";
import ConsultationPage from "@/pages/ConsultationPage";
import AdvisoryPage from "@/pages/AdvisoryPage";
import HeritagePage from "@/pages/HeritagePage";
import PhilosophyPage from "@/pages/PhilosophyPage";
import ShowroomPage from "@/pages/ShowroomPage";
import GaragePage from "@/pages/GaragePage";
import WishlistPage from "@/pages/WishlistPage";
import UpdatesPage from "@/pages/UpdatesPage";
import SettingsPage from "@/pages/SettingsPage";
import LegalPage from "@/pages/LegalPage";
import ComparePage from "@/pages/ComparePage";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";
import FinancingPage from "@/pages/FinancingPage";
import TradeInPage from "@/pages/TradeInPage";

function CompareBar() {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const navigate = useNavigate();
  return (
    <AnimatePresence>
      {compareList.length > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-2 right-2 md:left-1/2 md:right-auto md:-translate-x-1/2 md:w-auto z-[150] flex items-center gap-2 md:gap-3 px-3 md:px-5 py-3 bg-[#0a0a0a] border border-white/10 shadow-2xl rounded-sm backdrop-blur-md overflow-hidden"
        >
          <GitCompareArrows size={14} className="text-gold shrink-0" />
          <div className="flex items-center gap-1.5 flex-1 min-w-0 overflow-hidden">
            {compareList.map(car => (
              <div key={car.id} className="flex items-center gap-1 px-2 py-1.5 bg-white/5 border border-white/10 rounded-sm min-w-0 shrink">
                <span className="text-[8px] uppercase tracking-wide font-black text-white/60 truncate max-w-[60px] md:max-w-[100px]">{car.make} {car.model}</span>
                <button onClick={() => removeFromCompare(car.id)} className="text-white/20 hover:text-white transition-colors shrink-0">
                  <X size={9} />
                </button>
              </div>
            ))}
            {compareList.length < 3 && (
              <span className="text-[8px] uppercase tracking-widest font-black text-white/20 px-1 shrink-0">
                +{3 - compareList.length}
              </span>
            )}
          </div>
          <button
            onClick={() => navigate("/compare")}
            className="px-3 md:px-5 py-2 bg-gold text-black text-[8px] uppercase tracking-[0.3em] font-black hover:bg-white transition-colors rounded-sm shrink-0"
          >
            Compare
          </button>
          <button onClick={clearCompare} className="text-white/20 hover:text-white transition-colors shrink-0">
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function HomePage() {
  const { get } = useSiteSettings();
  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <Hero />

        <div className="relative z-10">
          <HorizontalCollection />

          <VideoSection
            videoUrl={get("video1_url", "/videos/video1.mp4")}
            title={get("video1_title", "The Pursuit of Rarity")}
            subtitle={get("video1_subtitle", "Curated Discovery")}
            quote={get("video1_quote", "We find the vehicles that others don't even know exist.")}
            buttonLink="/inventory"
            buttonLabel="Explore Collection"
          />

          <GlobalNetwork />

          <VaultFeature />

          <RacerSection />

          <InvestmentAdvisory />

          <VideoSection
            videoUrl={get("video2_url", "/videos/video2.mp4")}
            title={get("video2_title", "Global Movement")}
            subtitle={get("video2_subtitle", "Logistics & Delivery")}
            quote={get("video2_quote", "From the port of Nagoya to the hills of Monaco, we bridge the gap between passion and possession.")}
            reverse
            buttonLink="/sourcing"
            buttonLabel="Discover Sourcing Process"
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
                src="/images/avik-homepage.jpg"
                alt="Bespoke Collection"
                className="w-full h-full object-cover grayscale"
              />
            </motion.div>
            <div className="relative z-10 text-center px-6">
              <motion.h3
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}
                className="text-4xl md:text-7xl font-serif  mb-8 max-w-5xl mx-auto leading-tight"
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

    // Expose globally so menus/overlays can call lenis.stop() / lenis.start()
    (window as any).__lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      (window as any).__lenis = null;
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      <CompareProvider>
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
              <Route path="/showroom" element={<ShowroomPage />} />
              <Route path="/garage" element={<GaragePage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/updates" element={<UpdatesPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/legal" element={<LegalPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/financing" element={<FinancingPage />} />
              <Route path="/trade-in" element={<TradeInPage />} />
            </Routes>

            <AIConcierge />
            <CompareBar />

            {/* Aesthetic Accents */}
            <div className="fixed bottom-12 right-12 z-50 mix-blend-difference hidden md:block">
              <p className="vertical-text text-[9px] uppercase tracking-[0.5em] font-black text-white/30">
                Car House Imports Ltd • 2026
              </p>
            </div>
          </main>
        </WishlistProvider>
      </CompareProvider>
    </BrowserRouter>
  );
}