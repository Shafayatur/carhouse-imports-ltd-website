import { Navbar } from "@/components/Navbar";
import { Contact } from "@/components/Contact";
import { motion } from "motion/react";
import { Settings, Shield, Eye, Smartphone, Save } from "lucide-react";

export default function SettingsPage() {
  const sections = [
    { 
      title: "Private Identity", 
      icon: <Shield size={20} />, 
      desc: "Manage your collector profile and biometric authentication settings." 
    },
    { 
      title: "Display Preferences", 
      icon: <Eye size={20} />, 
      desc: "Toggle between Minimal and Technical interface variants." 
    },
    { 
      title: "Device Access", 
      icon: <Smartphone size={20} />, 
      desc: "Secondary authentication for mobile dossier access." 
    }
  ];

  return (
    <main className="bg-luxury-black min-h-screen pt-32 selection:bg-gold selection:text-black text-white">
      <Navbar />

      <div className="container mx-auto px-6 md:px-12 py-16">
        <div className="space-y-6 mb-24">
          <p className="text-gold text-[10px] uppercase tracking-[1em] font-black">Configuration</p>
          <h1 className="text-6xl md:text-8xl font-serif italic tracking-tighter">Bespoke <span className="not-italic font-display font-medium uppercase text-white/90">Settings</span></h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
           <div className="lg:col-span-8 space-y-16">
              {sections.map((section, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-10 border border-white/5 bg-white/[0.01] rounded-sm group hover:border-gold/30 transition-all duration-500"
                >
                   <div className="flex gap-12 items-start">
                      <div className="w-12 h-12 flex items-center justify-center text-gold opacity-50 group-hover:opacity-100 transition-opacity">
                         {section.icon}
                      </div>
                      <div className="flex-1 space-y-6">
                         <h3 className="text-2xl font-serif italic text-white">{section.title}</h3>
                         <p className="text-white/30 text-sm uppercase tracking-widest leading-relaxed max-w-xl font-medium">{section.desc}</p>
                         
                         <div className="flex items-center gap-8 pt-4">
                            <button className="text-[10px] uppercase tracking-[0.3em] font-black text-gold hover:text-white transition-colors">Configure</button>
                            <div className="h-[1px] w-8 bg-white/5" />
                            <span className="text-[9px] uppercase tracking-widest text-white/10 italic">Last modified April 2026</span>
                         </div>
                      </div>
                   </div>
                </motion.div>
              ))}

              <div className="pt-12 flex justify-end">
                 <button className="flex items-center gap-6 py-6 px-16 bg-white text-black font-black uppercase text-[10px] tracking-[0.4em] hover:bg-gold transition-all duration-700 shadow-xl shadow-white/5">
                    <Save size={14} /> Synchronize Profile
                 </button>
              </div>
           </div>

           <div className="lg:col-span-4 space-y-12">
              <div className="p-12 border border-white/10 bg-luxury-gray rounded-sm space-y-12">
                 <h4 className="text-[10px] uppercase tracking-[0.5em] font-black text-white/30">Interface Status</h4>
                 <div className="space-y-8">
                    <div className="flex justify-between items-center bg-black/40 p-6 border border-white/5">
                       <span className="text-[9px] uppercase tracking-widest font-black text-white/50">Dark Mode</span>
                       <div className="w-10 h-5 bg-gold rounded-full relative">
                          <div className="absolute right-1 top-1 w-3 h-3 bg-black rounded-full" />
                       </div>
                    </div>
                    <div className="flex justify-between items-center bg-black/40 p-6 border border-white/5 opacity-50">
                       <span className="text-[9px] uppercase tracking-widest font-black text-white/50">Developer HUD</span>
                       <div className="w-10 h-5 bg-white/10 rounded-full relative">
                          <div className="absolute left-1 top-1 w-3 h-3 bg-white/20 rounded-full" />
                       </div>
                    </div>
                 </div>
                 
                 <div className="pt-8 border-t border-white/5">
                    <p className="text-[9px] text-white/20 uppercase tracking-widest leading-relaxed">
                       Version 4.2.1-Gold <br />
                       Infrastructure: AIS-PRE-E43P
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <Contact />
    </main>
  );
}
