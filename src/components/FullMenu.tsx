import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { X, Instagram, Twitter, Linkedin, Globe, Car, BookOpen, Wrench, Phone, Shield, Info } from "lucide-react";
import { useEffect } from "react";

interface FullMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProfile?: () => void;
}

const menuSections = [
  {
    label: "The Collection",
    items: [
      { icon: <Car size={18} />, name: "Inventory", desc: "Browse available vehicles", path: "/inventory" },
      { icon: <Globe size={18} />, name: "Global Sourcing", desc: "We find it anywhere in the world", path: "/sourcing" },
      { icon: <BookOpen size={18} />, name: "The Showroom", desc: "Visit our Dhaka floor", path: "/showroom" },
    ],
  },
  {
    label: "Services",
    items: [
      { icon: <Shield size={18} />, name: "Investment Advisory", desc: "Portfolio & appreciation strategy", path: "/advisory" },
      { icon: <Wrench size={18} />, name: "Financing & EMI", desc: "Monthly payment plans & banks", path: "/financing" },
      { icon: <Car size={18} />, name: "Trade-In Programme", desc: "Exchange your current vehicle", path: "/trade-in" },
      { icon: <Phone size={18} />, name: "Private Consultation", desc: "Speak with a dedicated advisor", path: "/consultation" },
    ],
  },
  {
    label: "The Brand",
    items: [
      { icon: <Info size={18} />, name: "About Us", desc: "25 years, 1,200+ cars delivered", path: "/about" },
      { icon: <BookOpen size={18} />, name: "The Philosophy", desc: "Our values & approach", path: "/philosophy" },
      { icon: <Globe size={18} />, name: "Racing Heritage", desc: "Motorsport roots", path: "/heritage" },
      { icon: <Phone size={18} />, name: "Contact", desc: "Dhaka, London, Dubai", path: "/contact" },
    ],
  },
];

export function FullMenu({ isOpen, onClose, onOpenProfile }: FullMenuProps) {
  const location = useLocation();

  useEffect(() => {
    const lenis = (window as any).__lenis;
    if (isOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
    return () => { lenis?.start(); };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[190]"
          />

          {/* Panel — slides from LEFT, same width/style as ProfileMenu */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            data-lenis-prevent
            className="fixed top-0 left-0 h-full w-full max-w-md bg-luxury-black border-r border-white/5 z-[200] flex flex-col overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 md:px-12 py-10 shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center bg-gold/5">
                  <span className="text-gold font-serif text-lg font-bold">CH</span>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-gold">Navigation</h4>
                  <p className="text-white font-serif text-lg">Car House Imports</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav Sections */}
            <div className="flex-1 px-8 md:px-12 pb-8 space-y-10">
              {menuSections.map((section, sIdx) => (
                <motion.div
                  key={section.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + sIdx * 0.07 }}
                >
                  <p className="text-[9px] uppercase tracking-[0.5em] text-white/20 font-black mb-4">
                    {section.label}
                  </p>
                  <div className="grid gap-2">
                    {section.items.map((item) => {
                      const isActive = location.pathname === item.path;
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={onClose}
                          className={`group p-5 border rounded-sm flex items-center justify-between transition-all duration-500 ${isActive
                              ? "border-gold/40 bg-gold/5"
                              : "bg-white/[0.02] border-white/5 hover:border-gold/30"
                            }`}
                        >
                          <div className="flex items-center gap-5">
                            <div className={`transition-colors ${isActive ? "text-gold" : "text-white/30 group-hover:text-gold"}`}>
                              {item.icon}
                            </div>
                            <div>
                              <h5 className="text-[11px] uppercase tracking-widest text-white font-bold mb-0.5">
                                {item.name}
                              </h5>
                              <p className="text-[9px] text-white/30 font-medium">{item.desc}</p>
                            </div>
                          </div>
                          <div className={`w-1.5 h-1.5 rounded-full transition-colors ${isActive ? "bg-gold" : "bg-white/10 group-hover:bg-gold"}`} />
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              ))}

              {/* Member Login */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
              >
                <p className="text-[9px] uppercase tracking-[0.5em] text-white/20 font-black mb-4">Account</p>
                <div className="grid gap-2">
                  <button
                    onClick={() => { onClose(); onOpenProfile?.(); }}
                    className="group p-5 bg-gold/[0.03] border border-gold/10 rounded-sm flex items-center justify-between hover:border-gold/40 transition-all duration-500 w-full text-left"
                  >
                    <div className="flex items-center gap-5">
                      <div className="text-gold/50 group-hover:text-gold transition-colors">
                        <Shield size={18} />
                      </div>
                      <div>
                        <h5 className="text-[11px] uppercase tracking-widest text-white font-bold mb-0.5">Member Login</h5>
                        <p className="text-[9px] text-white/30 font-medium">Access your private registry</p>
                      </div>
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-gold/30 group-hover:bg-gold transition-colors" />
                  </button>
                  <Link
                    to="/legal"
                    onClick={onClose}
                    className="group p-5 bg-white/[0.02] border border-white/5 rounded-sm flex items-center justify-between hover:border-gold/30 transition-all duration-500"
                  >
                    <div className="flex items-center gap-5">
                      <div className="text-white/30 group-hover:text-gold transition-colors">
                        <BookOpen size={18} />
                      </div>
                      <div>
                        <h5 className="text-[11px] uppercase tracking-widest text-white font-bold mb-0.5">Legal & Terms</h5>
                        <p className="text-[9px] text-white/30 font-medium">Privacy policy & compliance</p>
                      </div>
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-gold transition-colors" />
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Footer */}
            <div className="px-8 md:px-12 py-10 border-t border-white/5 bg-black/20 shrink-0 space-y-6">
              <div>
                <p className="text-[9px] uppercase tracking-[0.5em] text-white/20 font-black mb-2">Enquiries</p>
                <a href="mailto:concierge@carhouse.uk" className="text-sm font-serif text-white/60 hover:text-gold transition-colors">
                  concierge@carhouse.uk
                </a>
              </div>
              <div className="flex gap-5">
                <Instagram size={16} className="text-white/20 hover:text-gold transition-colors cursor-pointer" />
                <Twitter size={16} className="text-white/20 hover:text-gold transition-colors cursor-pointer" />
                <Linkedin size={16} className="text-white/20 hover:text-gold transition-colors cursor-pointer" />
              </div>
            </div>

            {/* Watermark */}
            <div className="px-8 md:px-12 pb-6 overflow-hidden">
              <span className="text-[48px] font-serif font-black text-white/[0.02] uppercase whitespace-nowrap">
                ESTABLISHED 2000
              </span>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}