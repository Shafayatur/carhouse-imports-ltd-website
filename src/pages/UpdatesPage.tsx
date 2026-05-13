import { Navbar } from "@/components/Navbar";
import { Contact } from "@/components/Contact";
import { motion } from "motion/react";
import { Bell, ArrowRight, Zap, Globe, Package } from "lucide-react";

export default function UpdatesPage() {
  const notifications = [
    { 
      type: "Market Alert", 
      icon: <Zap size={18} />, 
      title: "Price Shift: 1967 Ferrari 330 P4", 
      desc: "A matching-numbers example has just entered private negotiations in Milan. Valuation estimated at $35M+.",
      time: "2 HOURS AGO",
      urgent: true
    },
    { 
      type: "Logistics", 
      icon: <Package size={18} />, 
      title: "Consignment Secured", 
      desc: "Your source request for the Lancia Delta S4 Group B has been validated in Turin. Transport pending.",
      time: "1 DAY AGO",
      urgent: false
    },
    { 
      type: "Global News", 
      icon: <Globe size={18} />, 
      title: "Japanese Export Regulations", 
      desc: "New emissions compliance updates for vehicles older than 25 years in the UK market. Impact Analysis available.",
      time: "3 DAYS AGO",
      urgent: false
    }
  ];

  return (
    <main className="bg-luxury-black min-h-screen pt-32 selection:bg-gold selection:text-black text-white">
      <Navbar />

      <div className="container mx-auto px-6 md:px-12 py-16">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
          <div className="space-y-6">
            <p className="text-gold text-[10px] uppercase tracking-[1em] font-black">Intelligence</p>
            <h1 className="text-6xl md:text-8xl font-serif italic tracking-tighter">Market <span className="not-italic font-display font-medium uppercase text-white/90">Updates</span></h1>
          </div>
          <button className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20 hover:text-white transition-colors border-b border-white/10 pb-2">
            Clear Intelligence Logs
          </button>
        </div>

        <div className="max-w-4xl space-y-4">
          {notifications.map((notif, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-8 md:p-12 border ${notif.urgent ? 'border-gold/30 bg-gold/[0.03]' : 'border-white/5 bg-white/[0.01]'} rounded-sm hover:border-gold/50 transition-all duration-500 group relative overflow-hidden`}
            >
              {notif.urgent && (
                <div className="absolute top-0 right-0 p-4">
                   <div className="flex items-center gap-2 text-gold text-[8px] font-black tracking-widest animate-pulse">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold" /> URGENT
                   </div>
                </div>
              )}

              <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center border ${notif.urgent ? 'border-gold/20 text-gold' : 'border-white/10 text-white/30'} group-hover:scale-110 transition-transform`}>
                   {notif.icon}
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <p className={`text-[9px] uppercase tracking-[0.4em] font-black ${notif.urgent ? 'text-gold' : 'text-white/20'}`}>{notif.type}</p>
                    <p className="text-[9px] uppercase tracking-[0.4em] font-black text-white/10">{notif.time}</p>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif italic text-white group-hover:text-gold transition-colors">{notif.title}</h3>
                  <p className="text-white/40 leading-relaxed max-w-2xl font-light text-lg">{notif.desc}</p>
                  
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
