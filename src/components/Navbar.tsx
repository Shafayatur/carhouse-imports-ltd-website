import { motion, useScroll } from "motion/react";
import { Link } from "react-router-dom";
import { Menu, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { FullMenu } from "./FullMenu";
import { SearchOverlay } from "./SearchOverlay";
import { ProfileMenu } from "./ProfileMenu";

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 py-6 md:px-12 transition-all duration-700",
          isScrolled ? "py-4 bg-black/60 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
        )}
      >
        {/* Left — Menu + Nav links */}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-12 flex-1">
          <button
            onClick={() => setIsMenuOpen(true)}
            className="text-white hover:text-gold transition-colors flex items-center gap-2 sm:gap-3 group shrink-0"
          >
            <Menu size={20} className="group-hover:scale-x-125 transition-transform" />
            <span className="hidden md:block text-[10px] uppercase tracking-[0.3em] font-bold">Menu</span>
          </button>
          <nav className="hidden lg:flex items-center gap-8 text-[10px] uppercase tracking-[0.3em] font-bold text-white/50">
            <Link to="/inventory" className="hover:text-white transition-colors classic-underline">Inventory</Link>
            <Link to="/sourcing" className="hover:text-white transition-colors classic-underline">Sourcing</Link>
          </nav>
        </div>

        {/* Centre — Logo (absolute so it's always truly centered) */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
          <span className="font-display text-lg md:text-xl font-bold tracking-[0.3em] text-white whitespace-nowrap uppercase">
            Car House
          </span>
          <span className="text-[8px] uppercase tracking-[0.8em] text-gold mt-1 font-bold">
            Imports Ltd
          </span>
        </Link>

        {/* Right — Search + Profile + Consult */}
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6 flex-1 justify-end">
          {/* Mobile search only */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="md:hidden text-white/40 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-sm"
          >
            <Search size={20} />
          </button>

          {/* Desktop search + profile */}
          <div className="hidden md:flex items-center gap-6 pr-6 border-r border-white/10">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-white/40 hover:text-white transition-colors p-2"
            >
              <Search size={18} />
            </button>
            <button
              onClick={() => setIsProfileOpen(true)}
              className="text-white/40 hover:text-white transition-colors p-2"
            >
              <User size={18} />
            </button>
          </div>

          {/* Consult button — only on lg+ to avoid logo overlap */}
          <Link
            to="/consultation"
            className="hidden lg:flex px-6 md:px-8 py-2 md:py-3 bg-white text-black rounded-full text-[8px] md:text-[9px] uppercase tracking-[0.3em] font-black hover:bg-gold hover:text-black transition-all duration-700 shrink-0"
          >
            Consult
          </Link>
        </div>
      </motion.header>

      <FullMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenProfile={() => {
          setIsMenuOpen(false);
          setIsProfileOpen(true);
        }}
      />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <ProfileMenu isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </>
  );
}
