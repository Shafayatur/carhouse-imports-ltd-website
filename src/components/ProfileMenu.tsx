import { motion, AnimatePresence } from "motion/react";
import { X, User, Settings, Heart, LogOut, Shield, Car, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

interface ProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProfileMenu({ isOpen, onClose }: ProfileMenuProps) {
  const menuItems = [
    { icon: <Car size={18} />, label: "Digital Garage", desc: "View your saved configurations", path: "/garage" },
    { icon: <Heart size={18} />, label: "The Wishlist", desc: "Monitored vehicles & auctions", path: "/wishlist" },
    { icon: <Shield size={18} />, label: "Member Status", desc: "Tier I Access Active", path: "/membership" },
    { icon: <Bell size={18} />, label: "Notifications", desc: "3 new market updates", path: "/updates" },
    { icon: <Settings size={18} />, label: "Bespoke Settings", desc: "Interface & security", path: "/settings" },
  ];

  // Properly stop/start Lenis so background page can't scroll behind panel
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[1001]"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            data-lenis-prevent
            className="fixed top-0 right-0 h-full w-full max-w-md bg-luxury-black border-l border-white/5 z-[1002] p-8 md:p-12 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-16">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center bg-gold/5">
                  <User size={20} className="text-gold" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-gold">Exclusive Member</h4>
                  <p className="text-white font-serif italic text-lg">Guest Collector</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-[9px] uppercase tracking-[0.5em] text-white/20 font-black mb-8">The Registry</p>

              <div className="grid gap-2">
                {menuItems.map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.path}
                    onClick={onClose}
                    className="group p-6 bg-white/[0.02] border border-white/5 rounded-sm hover:border-gold/30 transition-all duration-500 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-6">
                      <div className="text-white/30 group-hover:text-gold transition-colors">
                        {item.icon}
                      </div>
                      <div>
                        <h5 className="text-[11px] uppercase tracking-widest text-white font-bold mb-1">{item.label}</h5>
                        <p className="text-[9px] text-white/30 font-medium">{item.desc}</p>
                      </div>
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-gold transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-24 pt-12 border-t border-white/5 space-y-8">
              <div className="p-8 bg-gold/[0.03] border border-gold/10 rounded-sm">
                <div className="flex items-center gap-3 mb-4 text-gold">
                  <Shield size={16} />
                  <span className="text-[9px] uppercase tracking-[0.3em] font-black">Private Security</span>
                </div>
                <p className="text-[10px] text-white/40 leading-relaxed font-medium">
                  Your session is protected by end-to-end encryption. All inquiries are handled through our private advisory network.
                </p>
              </div>

              <button className="flex items-center gap-4 text-white/30 hover:text-red-400 transition-colors group">
                <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-[10px] uppercase tracking-[0.4em] font-black">End Session</span>
              </button>
            </div>

            <div className="mt-12 text-center overflow-hidden">
              <span className="text-[60px] font-display font-black text-white/[0.02] uppercase whitespace-nowrap">
                ESTABLISHED 2024
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
