import { ArrowRight, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

export function Contact() {
  const exploreLinks = [
    { label: "Inventory", to: "/inventory" },
    { label: "Sourcing", to: "/sourcing" },
    { label: "Advisory", to: "/advisory" },
    { label: "Financing", to: "/financing" },
    { label: "Trade-In", to: "/trade-in" },
    { label: "Updates", to: "/updates" },
    { label: "About Us", to: "/about" },
    { label: "Contact", to: "/contact" },
    { label: "Showroom", to: "/showroom" },
    { label: "Legal", to: "/legal" },
  ];

  const half = Math.ceil(exploreLinks.length / 2);
  const col1 = exploreLinks.slice(0, half);
  const col2 = exploreLinks.slice(half);

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
              The world's most discerning collectors trust us with what matters most.
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

          {/* Explore — 2 columns */}
          <div>
            <p className="text-[8px] uppercase tracking-[0.6em] font-black text-white/40 mb-6">
              Explore
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
              {col1.map(({ label, to }) => (
                <Link
                  key={to}
                  to={to}
                  className="block text-[11px] uppercase tracking-[0.4em] font-bold text-white/60 hover:text-gold transition-colors duration-300"
                >
                  {label}
                </Link>
              ))}
              {col2.map(({ label, to }) => (
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

          {/* Showroom — static map image link, no iframe */}
          <div>
            <p className="text-[8px] uppercase tracking-[0.6em] font-black text-white/40 mb-6">
              Showroom
            </p>

            <a
              href="https://www.google.com/maps?q=Tajmahal+Road+Mohammadpur+Dhaka"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block w-full h-36 overflow-hidden border border-white/10 hover:border-gold/30 transition-colors duration-500"
            >
              {/* 3x3 OSM tile grid — zoom 15, centered on Mohammadpur Dhaka */}
              {/* z=15 x=24608 y=14156 is center tile */}
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 grayscale opacity-60 group-hover:opacity-90 group-hover:grayscale-0 transition-all duration-500 scale-105 pointer-events-none">
                {[
                  [24607, 14155], [24608, 14155], [24609, 14155],
                  [24607, 14156], [24608, 14156], [24609, 14156],
                  [24607, 14157], [24608, 14157], [24609, 14157],
                ].map(([x, y]) => (
                  <img
                    key={`${x}-${y}`}
                    src={`https://tile.openstreetmap.org/15/${x}/${y}.png`}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ))}
              </div>
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500" />
              {/* Hover label */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-[9px] uppercase tracking-[0.4em] font-black text-gold bg-black/60 px-3 py-1.5 backdrop-blur-sm">Open in Maps ↗</span>
              </div>
              {/* Pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none">
                <div className="w-3 h-3 bg-gold rounded-full border-2 border-white shadow-lg" />
                <div className="w-[1px] h-3 bg-gold mx-auto" />
              </div>
              {/* Label */}
              <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm px-2 py-1 border border-white/10">
                <span className="text-[8px] uppercase tracking-[0.3em] text-white/60">Tajmahal Road, Dhaka</span>
              </div>
            </a>

            <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-white/50">
              Mohammadpur, Dhaka 1207
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-8 flex flex-col md:flex-row justify-between items-center gap-6">

          <p className="text-white/40 text-[9px] uppercase tracking-[0.5em] font-black">
            © 2026 Car House Imports Ltd.
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
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