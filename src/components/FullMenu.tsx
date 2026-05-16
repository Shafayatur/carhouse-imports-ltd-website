import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { X, Instagram, Twitter, Linkedin, ChevronRight } from "lucide-react";
import { useEffect } from "react";

interface FullMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FullMenu({ isOpen, onClose }: FullMenuProps) {
  const menuLinks = [
    { name: "The Collection", path: "/inventory" },
    { name: "The Philosophy", path: "/philosophy" },
    { name: "Global Sourcing", path: "/sourcing" },
    { name: "Private Consultation", path: "/consultation", featured: true },
    { name: "Investment Advisory", path: "/advisory" },
    { name: "Racing Heritage", path: "/heritage" },
    { name: "Brand History", path: "/" },
    { name: "Our Showrooms", path: "/" },
    { name: "Member Login", path: "/" },
    { name: "Legal & Terms", path: "/" },
  ];

  // Properly stop/start Lenis so background page can't scroll behind menu
  useEffect(() => {
    const lenis = (window as any).__lenis;
    if (isOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
    return () => {
      lenis?.start();
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[190] bg-black/40 backdrop-blur-[20px]"
          />

          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 left-0 z-[200] w-full md:w-[30%] lg:w-[25%] h-full bg-luxury-black border-r border-white/5 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-10 py-10 border-b border-white/5 shrink-0">
              <div className="flex flex-col items-start px-2">
                <span className="font-display text-sm font-bold tracking-[0.3em] text-white uppercase">Car House</span>
                <span className="text-[7px] uppercase tracking-[0.8em] text-gold mt-1 font-bold">Imports Ltd</span>
              </div>
              <button
                onClick={onClose}
                className="text-white/40 hover:text-gold transition-colors p-2"
              >
                <X size={24} />
              </button>
            </div>

            {/* Links - Scrollable Area */}
            <div data-lenis-prevent className="flex-1 overflow-y-auto custom-scrollbar px-10 py-12 space-y-10">
              {menuLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + idx * 0.05 }}
                >
                  <Link
                    to={link.path}
                    onClick={onClose}
                    className={`group flex items-center justify-between text-3xl font-serif italic tracking-tighter ${link.featured ? 'text-gold' : 'text-white/70 hover:text-white'} transition-all duration-500`}
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-gold" size={24} />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-10 border-t border-white/5 space-y-8 bg-black/20 shrink-0">
              <div className="space-y-4">
                <p className="text-[9px] uppercase tracking-[0.5em] font-black text-white/20">Enquiries</p>
                <p className="text-sm font-serif italic text-white/60">concierge@carhouse.uk</p>
              </div>
              <div className="flex gap-6">
                <Instagram size={18} className="text-white/20 hover:text-gold transition-colors cursor-pointer" />
                <Twitter size={18} className="text-white/20 hover:text-gold transition-colors cursor-pointer" />
                <Linkedin size={18} className="text-white/20 hover:text-gold transition-colors cursor-pointer" />
              </div>
            </div>

            <div className="absolute top-1/2 left-4 -translate-y-1/2 -rotate-90 origin-left pointer-events-none">
              <p className="text-[8vw] font-display font-bold text-white/[0.01] uppercase tracking-[0.5em] whitespace-nowrap">
                AUTHENTICITY
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
