import { motion } from "motion/react";
import { ArrowRight, Calendar, Globe, ShieldCheck, Mail, Phone } from "lucide-react";

export default function ConsultationPage() {
  return (
    <main className="bg-luxury-black min-h-screen pt-32 pb-24 selection:bg-gold selection:text-black text-white">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="max-w-4xl mb-24">
           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-gold text-[10px] uppercase tracking-[0.5em] font-black mb-8"
           >
             Private & Confidential
           </motion.p>
           <motion.h1 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="text-5xl md:text-8xl font-display font-medium tracking-tighter uppercase leading-[0.9] mb-12"
           >
             Bespoke <br />
             <span className=" font-serif font-light text-white/40 lowercase">Consultation</span>
           </motion.h1>
           <motion.p 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.4 }}
             className="text-xl md:text-2xl font-serif  text-white/60 leading-relaxed"
           >
             Our global network and automotive expertise are at your disposal. Whether sourcing a unique specimen or managing an existing collection, we provide the discretion and precision you require.
           </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
           {/* Why Us Section */}
           <div className="space-y-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 {[
                   { icon: <ShieldCheck className="text-gold" />, title: "Discreet Handling", desc: "Every transaction and enquiry is handled with absolute confidentiality." },
                   { icon: <Globe className="text-gold" />, title: "Global Logistics", desc: "Door-to-door delivery and registration services across all continents." },
                   { icon: <Calendar className="text-gold" />, title: "Concierge Support", desc: "Dedicated collection managers available for 24/7 advisory." },
                   { icon: <ShieldCheck className="text-gold" />, title: "Investment Grade", desc: "Expert assessment of future value and historical provenance." }
                 ].map((item, idx) => (
                   <motion.div 
                     key={idx}
                     initial={{ opacity: 0, x: -20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: idx * 0.1 }}
                     className="space-y-4"
                   >
                     <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                        {item.icon}
                     </div>
                     <p className="text-[10px] uppercase tracking-[0.3em] font-black">{item.title}</p>
                     <p className="text-sm text-white/40 leading-relaxed font-medium uppercase tracking-widest">{item.desc}</p>
                   </motion.div>
                 ))}
              </div>

              <div className="p-12 border border-white/5 rounded-2xl bg-white/[0.02]">
                 <h3 className="text-2xl font-serif  mb-8">Direct Channels</h3>
                 <div className="space-y-8">
                    <div className="flex items-center gap-6">
                       <Mail className="text-gold" size={20} />
                       <div>
                          <p className="text-[9px] uppercase tracking-widest text-white/30 font-bold mb-1">Email</p>
                          <p className="text-xl font-display">concierge@carhouse.uk</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-6">
                       <Phone className="text-gold" size={20} />
                       <div>
                          <p className="text-[9px] uppercase tracking-widest text-white/30 font-bold mb-1">Telephone</p>
                          <p className="text-xl font-display">+44 20 7946 0123</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Form Section */}
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="bg-white p-12 md:p-16 rounded-sm text-black"
           >
              <h3 className="text-3xl font-display uppercase tracking-tighter font-medium mb-12">Submit Dossier</h3>
              <form className="space-y-10">
                 <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-black text-black/40">Full Legal Name</label>
                    <input 
                      type="text" 
                      placeholder="Enter Name"
                      className="w-full bg-transparent border-b border-black/10 py-4 focus:border-gold outline-none transition-colors font-display text-lg"
                    />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-black text-black/40">Contact Method</label>
                    <input 
                      type="email" 
                      placeholder="Email or Phone"
                      className="w-full bg-transparent border-b border-black/10 py-4 focus:border-gold outline-none transition-colors font-display text-lg"
                    />
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase tracking-widest font-black text-black/40">Service Required</label>
                       <select className="w-full bg-transparent border-b border-black/10 py-4 focus:border-gold outline-none transition-colors font-display text-lg uppercase tracking-widest">
                          <option>Sourcing</option>
                          <option>Acquisition</option>
                          <option>Collection Mgmt</option>
                          <option>Investment Advisory</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] uppercase tracking-widest font-black text-black/40">Budget Range (USD)</label>
                       <select className="w-full bg-transparent border-b border-black/10 py-4 focus:border-gold outline-none transition-colors font-display text-lg uppercase tracking-widest">
                          <option>$100k - $500k</option>
                          <option>$500k - $2M</option>
                          <option>$2M - $10M</option>
                          <option>$10M+</option>
                       </select>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-black text-black/40">Specifications / Requests</label>
                    <textarea 
                      rows={4}
                      placeholder="Details of your requirements..."
                      className="w-full bg-transparent border-b border-black/10 py-4 focus:border-gold outline-none transition-colors font-display text-lg resize-none"
                    />
                 </div>

                 <button 
                   type="submit"
                   className="group w-full bg-black text-white py-6 rounded-full font-black uppercase text-[11px] tracking-[0.4em] hover:bg-gold hover:text-black transition-all duration-700 flex items-center justify-center gap-4"
                 >
                   Send Dossier <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                 </button>
                 <p className="text-center text-[8px] uppercase tracking-widest text-black/30 font-bold mt-8">
                    Your data is secured with AES-256 encryption.
                 </p>
              </form>
           </motion.div>
        </div>
      </div>
    </main>
  );
}
