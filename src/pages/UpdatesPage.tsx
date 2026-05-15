import { Navbar } from "@/components/Navbar";
import { Contact } from "@/components/Contact";
import { motion } from "motion/react";
import { ArrowRight, Zap, Globe, Package, Trophy } from "lucide-react";
import { useMarketUpdates } from "@/hooks/useSupabase";

const TYPE_ICONS: Record<string, React.ReactNode> = {
  "Market Alert": <Zap size={18} />,
  "Logistics": <Package size={18} />,
  "Global News": <Globe size={18} />,
  "Auction Result": <Trophy size={18} />,
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (days > 0) return `${days} DAY${days > 1 ? "S" : ""} AGO`;
  if (hours > 0) return `${hours} HOUR${hours > 1 ? "S" : ""} AGO`;
  return `${mins} MIN AGO`;
}

export default function UpdatesPage() {
  const { updates, loading } = useMarketUpdates();

  return (
    <main className="bg-luxury-black min-h-screen pt-32 selection:bg-gold selection:text-black text-white">
      <Navbar />

      <div className="container mx-auto px-6 md:px-12 py-16">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <div className="space-y-6">
            <p className="text-gold text-[10px] uppercase tracking-[1em] font-black">Intelligence</p>
            <h1 className="text-6xl md:text-8xl font-serif italic tracking-tighter">
              Market <span className="not-italic font-display font-medium uppercase text-white/90">Updates</span>
            </h1>
          </div>
        </div>

        <div className="max-w-4xl space-y-4">
          {loading ? (
            [1, 2, 3].map(i => (
              <div key={i} className="animate-pulse p-8 border border-white/5 rounded-sm">
                <div className="h-4 bg-white/5 rounded w-1/4 mb-4" />
                <div className="h-8 bg-white/5 rounded w-2/3 mb-4" />
                <div className="h-4 bg-white/5 rounded w-full" />
              </div>
            ))
          ) : updates.length === 0 ? (
            <p className="text-white/20 text-sm uppercase tracking-widest">No updates published yet.</p>
          ) : updates.map((notif, idx) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-8 md:p-12 border rounded-sm hover:border-gold/50 transition-all duration-500 group relative overflow-hidden ${notif.urgent ? "border-gold/30 bg-gold/[0.03]" : "border-white/5 bg-white/[0.01]"}`}
            >
              {notif.urgent && (
                <div className="absolute top-0 right-0 p-4">
                  <div className="flex items-center gap-2 text-gold text-[8px] font-black tracking-widest animate-pulse">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold" /> URGENT
                  </div>
                </div>
              )}
              <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center border shrink-0 group-hover:scale-110 transition-transform ${notif.urgent ? "border-gold/20 text-gold" : "border-white/10 text-white/30"}`}>
                  {TYPE_ICONS[notif.type] ?? <Zap size={18} />}
                </div>
                <div className="flex-1 space-y-4">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <p className={`text-[9px] uppercase tracking-[0.4em] font-black ${notif.urgent ? "text-gold" : "text-white/20"}`}>{notif.type}</p>
                    <p className="text-[9px] uppercase tracking-[0.4em] font-black text-white/10">{timeAgo(notif.created_at)}</p>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif italic text-white group-hover:text-gold transition-colors">{notif.title}</h3>
                  <p className="text-white/40 leading-relaxed max-w-2xl font-light text-lg">{notif.description}</p>
                  <button className="flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-black text-white/60 hover:text-white transition-colors pt-4 group/btn">
                    Access Detailed Briefing <ArrowRight size={14} className="group-hover/btn:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-32 p-12 bg-luxury-gray border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-4">
              <h4 className="text-2xl font-serif italic">Curated Subscription</h4>
              <p className="text-white/40 text-xs uppercase tracking-widest leading-relaxed max-w-xl">
                Join our inner circle for exclusive first-access to off-market inventory and global automotive intelligence briefings.
              </p>
            </div>
            <button className="py-6 px-12 bg-white text-black font-black uppercase text-[10px] tracking-[0.4em] hover:bg-gold transition-colors whitespace-nowrap">
              Manage Preferences
            </button>
          </div>
        </div>
      </div>

      <Contact />
    </main>
  );
}