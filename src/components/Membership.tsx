import { Star, Shield, Gem, Crown } from "lucide-react";
import { Link } from "react-router-dom";

export function Membership() {
  const perks = [
    { icon: <Gem size={20} />, title: "Concierge Sourcing", desc: "Vin tracking of limited-run vehicles worldwide." },
    { icon: <Shield size={20} />, title: "Asset Protection", desc: "Private off-site climate-controlled storage." },
    { icon: <Star size={20} />, title: "Private Access", desc: "Closed-room auctions & secret collector portfolios." },
    { icon: <Crown size={20} />, title: "White Glove Logistics", desc: "Enclosed cross-border transit with absolute discretion." }
  ];

  return (
    <section id="membership" className="py-24 bg-luxury-black relative overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-stretch">

          {/* Left Column - Title & 4 Options (2x2 Grid Layout) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-12">
            <div className="space-y-4">
              <span className="text-[9px] uppercase tracking-[0.5em] font-black text-gold block">Exclusive Membership</span>
              <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tighter leading-tight uppercase text-white">
                For Those Who <br />
                <span className="font-serif font-light text-gold/80 italic lowercase">value exclusivity</span>
              </h2>
              <p className="text-white/40 text-[10px] tracking-widest uppercase">
                Strictly reserved for the serious collector.
              </p>
            </div>

            {/* The 4 Options Layout (2x2 Grid) */}
            <div className="md:grid md:grid-cols-2 md:gap-4">
              {/* Mobile Swipe */}
              <div className="md:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 scrollbar-hide">
                {perks.map((perk, i) => (
                  <div
                    key={i}
                    className="snap-center shrink-0 w-[85vw] p-5 border border-white/5 bg-white/[0.01] rounded-sm flex flex-col justify-between min-h-[120px]"
                  >
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gold">
                      {perk.icon}
                    </div>

                    <div className="mt-3">
                      <h4 className="text-[11px] font-display uppercase tracking-widest font-bold text-white/90">
                        {perk.title}
                      </h4>

                      <p className="text-[9px] text-white/30 tracking-wider mt-2 uppercase leading-relaxed">
                        {perk.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Grid */}
              <div className="hidden md:contents">
                {perks.map((perk, i) => (
                  <div
                    key={i}
                    className="p-6 border border-white/5 bg-white/[0.01] hover:border-gold/20 hover:bg-white/[0.02] rounded-sm transition-all duration-500 flex flex-col justify-between min-h-[140px] group"
                  >
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gold group-hover:border-gold/30 transition-colors shrink-0">
                      {perk.icon}
                    </div>

                    <div className="mt-4">
                      <h4 className="text-[11px] font-display uppercase tracking-widest font-bold text-white/90 group-hover:text-gold transition-colors">
                        {perk.title}
                      </h4>

                      <p className="text-[9px] text-white/30 tracking-wider mt-2 uppercase leading-relaxed">
                        {perk.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Apply Banner Card */}
          <div className="lg:col-span-5 flex">
            <div className="w-full p-10 bg-gradient-to-br from-white/[0.02] to-transparent border border-white/5 hover:border-gold/20 transition-all duration-700 rounded-sm flex flex-col justify-between relative overflow-hidden min-h-[350px]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl pointer-events-none" />

              <div className="space-y-6">
                <div className="w-10 h-[1px] bg-gold" />
                <h3 className="text-xl md:text-2xl font-serif leading-relaxed italic text-white/90">
                  "Membership is not just a status, it's a direct line to the world's most sought-after machinery."
                </h3>
                <p className="text-[9px] uppercase tracking-[0.4em] font-black text-gold">
                  Avik Anwar <span className="text-white/30 font-normal">/ Founder</span>
                </p>
              </div>

              <div className="pt-8">
                <Link
                  to="/consultation"
                  className="inline-block w-full text-center px-8 py-5 bg-gold text-black rounded-full font-black uppercase text-[10px] tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 shadow-[0_0_30px_rgba(197,160,40,0.15)]"
                >
                  Apply For Membership
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
