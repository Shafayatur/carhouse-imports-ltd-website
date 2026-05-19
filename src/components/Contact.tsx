import { motion } from "motion/react";
import { Instagram, Twitter, Linkedin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function Contact() {
  return (
    <footer className="bg-luxury-black border-t border-white/5 py-12 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-12">
          <div className="max-w-md">
            <div className="flex flex-col items-start mb-6">
               <span className="font-display text-xl font-bold tracking-[0.3em] text-white">CAR HOUSE</span>
               <span className="text-[8px] uppercase tracking-[0.8em] text-gold mt-1 font-bold">IMPORTS LTD</span>
            </div>
            <p className="text-white/40 text-xs leading-relaxed uppercase tracking-widest font-medium">
               Providing the world's most discerning collectors with access to automotive rarities and heritage classics for over two decades.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-widest font-black text-white/20">Enquiries</p>
              <p className="text-sm font-serif  text-white/60">concierge@carhouse.uk</p>
            </div>
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-widest font-black text-white/20">Locations</p>
              <p className="text-sm font-serif  text-white/60">London • Dubai • Tokyo</p>
            </div>
            <div className="space-y-4 hidden md:block">
              <p className="text-[10px] uppercase tracking-widest font-black text-white/20">Social</p>
              <p className="text-sm font-serif  text-white/60 hover:text-gold cursor-pointer transition-colors">@carhouseimports</p>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-white/10 text-[9px] uppercase tracking-[0.4em] font-black">
              © 2026 Car House Imports. Defined by Exclusivity.
            </p>
            
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex flex-col items-center gap-2 text-gold hover:text-white transition-colors"
            >
              <div className="w-8 h-8 rounded-full border border-gold/20 flex items-center justify-center group-hover:border-gold transition-colors">
                <ArrowRight className="-rotate-90" size={14} />
              </div>
              <span className="text-[7px] uppercase tracking-[0.5em] font-black">Back to Top</span>
            </button>

            <Link to="/legal" className="text-[9px] uppercase tracking-[0.4em] font-black text-gold hover:text-white transition-colors">
              Terms & Legal
            </Link>
        </div>
      </div>
    </footer>
  );
}
