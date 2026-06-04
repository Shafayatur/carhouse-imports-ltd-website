import { ArrowRight, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

export function Contact() {
  return (
    <footer className="bg-gradient-to-b from-luxury-black via-[#0d0d0d] to-[#111111] relative overflow-hidden border-t border-gold/10">

      {/* Luxury glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.04),transparent_65%)] pointer-events-none" />

      {/* Background wordmark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[20vw] font-display font-black uppercase text-white/[0.05] whitespace-nowrap tracking-tighter">
          Car House
        </span>
      </div>

      <div className="relative z-10 container mx-auto px-6 md:px-12">

        {/* Top divider */}
        <div className="flex items-center gap-6 pt-16 pb-14">
          <div className="h-[1px] flex-1 bg-white/10" />
          <span className="text-[8px] uppercase tracking-[0.8em] font-black text-white/40">
            Est. 2000
          </span>
          <div className="h-[1px] flex-1 bg-white/10" />
        </div>

        {/* 🔧 FIXED GRID SPACING (Explore + Contact gap reduced) */}
        <div className="grid lg:grid-cols-4 gap-8 pb-16">

          {/* Brand */}
          <div className="space-y-6">
            <div>
              <span className="font-display text-3xl font-bold tracking-[0.2em] text-white block">
                CAR HOUSE
              </span>
              <span className="text-[9px] uppercase tracking-[0.8em] text-gold font-black block mt-1">
                Imports Ltd
              </span>
            </div>

            <p className="text-white/45 text-[11px] leading-relaxed tracking-widest uppercase">
              The world's most discerning collectors trust us with what matters
              most.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: <Instagram size={14} />, href: "https://instagram.com/carhouseimports" },
                { icon: <Twitter size={14} />, href: "https://twitter.com/carhouseimports" },
                { icon: <Linkedin size={14} />, href: "https://linkedin.com/company/carhouseimports" },
                { icon: <Youtube size={14} />, href: "https://youtube.com/@carhouseimports" },
              ].map(({ icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-gold hover:border-gold/40 transition-all duration-300"
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <p className="text-[8px] uppercase tracking-[0.6em] font-black text-white/40 mb-6">
              Explore
            </p>

            <div className="space-y-4">
              {[
                { label: "Inventory", to: "/inventory" },
                { label: "Sourcing", to: "/sourcing" },
                { label: "Financing", to: "/consultation" },
                { label: "Advisory", to: "/advisory" },
                { label: "Updates", to: "/updates" },
              ].map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className="block text-[11px] uppercase tracking-[0.4em] font-bold text-white/60 hover:text-gold transition-colors duration-300"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[8px] uppercase tracking-[0.6em] font-black text-white/40 mb-6">
              Contact
            </p>

            <div className="space-y-4">
              <a
                href="mailto:concierge@carhouse.uk"
                className="block text-[11px] uppercase tracking-[0.4em] font-bold text-white/60 hover:text-gold transition-colors duration-300"
              >
                concierge@carhouse.uk
              </a>

              <p className="text-[11px] uppercase tracking-[0.4em] font-bold text-white/60">
                Dhaka • London • Dubai
              </p>

              <p className="text-[11px] uppercase tracking-[0.4em] font-bold text-white/60">
                Tokyo • New York
              </p>

              <p className="text-[11px] uppercase tracking-[0.4em] font-bold text-white/60">
                +880 1XXX XXX XXX
              </p>
            </div>
          </div>

          {/* 🔧 FIXED MAP (circle → expands, full color restored) */}
          <div>
            <p className="text-[8px] uppercase tracking-[0.6em] font-black text-white/40 mb-6">
              Showroom
            </p>

            <a
              href="https://www.google.com/maps?q=Tajmahal+Road+Playground+Dhaka"
              target="_blank"
              rel="noopener noreferrer"
              className="
                relative block
                w-24 h-24
                rounded-full
                overflow-hidden
                border border-white/20
                transition-all duration-500
                hover:w-full hover:h-48 hover:rounded-xl
              "
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1182.6922972992618!2d90.36140376934057!3d23.764929715496674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c188ae9e047f%3A0x83620924e5180839!2sTajmahal%20Road%20Playground!5e0!3m2!1sen!2sbd!4v1780570726202!5m2!1sen!2sbd"
                className="w-full h-full"
                style={{ border: 0 }}
                loading="lazy"
              />
            </a>

            <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-white/50">
              Tajmahal Road, Dhaka
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-8 flex flex-col md:flex-row justify-between items-center gap-6">

          <p className="text-white/40 text-[9px] uppercase tracking-[0.5em] font-black">
            © 2026 Car House Imports Ltd.
          </p>

          <button
            onClick={() =>
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            className="group flex items-center gap-3 text-white/50 hover:text-gold transition-colors duration-300"
          >
            <span className="text-[8px] uppercase tracking-[0.5em] font-black">
              Back to Top
            </span>

            <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center group-hover:border-gold/40 transition-colors">
              <ArrowRight className="-rotate-90" size={12} />
            </div>
          </button>

          <div className="flex items-center gap-6">
            <Link
              to="/legal"
              className="text-[9px] uppercase tracking-[0.5em] font-black text-white/50 hover:text-gold transition-colors"
            >
              Privacy
            </Link>

            <span className="text-white/30">·</span>

            <Link
              to="/legal"
              className="text-[9px] uppercase tracking-[0.5em] font-black text-white/50 hover:text-gold transition-colors"
            >
              Legal
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
}