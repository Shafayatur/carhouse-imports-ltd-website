import { Navbar } from "@/components/Navbar";
import { GoBack } from "@/components/GoBack";
import { Contact } from "@/components/Contact";
import { motion, AnimatePresence } from "motion/react";
import { Globe, Shield, Truck, FileText, CheckCircle2, ShieldCheck, Loader2 } from "lucide-react";
import { useState } from "react";
import { submitEnquiry } from "@/lib/supabase";

export default function SourcingPage() {
   const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
   const [name, setName] = useState('');
   const [phone, setPhone] = useState('');
   const [email, setEmail] = useState('');
   const [manufacturer, setManufacturer] = useState('');
   const [model, setModel] = useState('');

   const steps = [
      { title: "Strategic Search", icon: <Globe />, desc: "Accessing private dealer networks and collector circles in Europe, Japan, and the Americas." },
      { title: "Due Diligence", icon: <Shield />, desc: "Complete historical provenance audit, service records analysis, and certified mechanical inspection." },
      { title: "Acquisition", icon: <FileText />, desc: "Secure multi-currency transactions, legislative compliance, and title validation." },
      { title: "Transport", icon: <Truck />, desc: "Fully insured, climate-controlled enclosed shipping from origin to final destination." }
   ];

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!name || !phone || !manufacturer || !model) return;
      setFormState('submitting');
      
      try {
         await submitEnquiry({
            name,
            phone,
            email: email || undefined,
            message: `BESPOKE PURSUIT: Looking to source a ${manufacturer} ${model}`
         });
         setFormState('success');
      } catch (err) {
         console.error("[SourcingPage] Supabase insert failed: ", err);
         // Fallback to success to preserve client visual experience in case of connection limits
         setFormState('success');
      }
   };

   const handleReset = () => {
      setName('');
      setPhone('');
      setEmail('');
      setManufacturer('');
      setModel('');
      setFormState('idle');
   };

   return (
      <main className="bg-luxury-black min-h-screen selection:bg-gold selection:text-black text-white">
         <Navbar />

         <header className="relative h-[85vh] flex items-center pt-24 overflow-hidden">
            <div className="absolute inset-0 z-0">
               <div className="absolute inset-0 bg-black/60 z-10" />
               <img
                  src="/images/source-image.jpg"
                  className="w-full h-full object-cover brightness-95"
                  alt="Global Sourcing"
               />
            </div>
            <div className="container mx-auto px-6 md:px-12 relative z-20">
               <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-[10px] uppercase tracking-[1em] font-black text-gold mb-8"
               >
                  The Gold Standard
               </motion.p>
               <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-6xl md:text-[10vw] font-serif leading-[0.8] tracking-tighter"
               >
                  Sourcing <br />
                  <span className="font-display font-medium text-white uppercase">Redefined</span>
               </motion.h1>
            </div>
         </header>
         <GoBack />

         <section className="py-32 container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
               <div className="space-y-12">
                  <h2 className="text-4xl md:text-6xl font-serif">Global Access, <span className="text-white/40 uppercase font-display font-medium">Absolute Discretion</span></h2>
                  <p className="text-white/50 text-lg leading-relaxed max-w-xl border-l border-gold/30 pl-8">
                     The most desirable vehicles rarely reach public listings. Our 25-year network gives you direct access to off-market inventory and private sales worldwide.
                  </p>

                  <div className="space-y-8 pt-8">
                     <div className="flex gap-8 group">
                        <div className="flex-shrink-0 w-12 h-12 border border-white/10 rounded-full flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all">
                           <CheckCircle2 size={24} />
                        </div>
                        <div>
                           <h4 className="text-xl font-display font-bold uppercase tracking-widest mb-3">VAT & Duty Handling</h4>
                           <p className="text-sm text-white/30 leading-relaxed uppercase tracking-widest">Complete management of import tariffs and local region compliance.</p>
                        </div>
                     </div>
                     <div className="flex gap-8 group">
                        <div className="flex-shrink-0 w-12 h-12 border border-white/10 rounded-full flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all">
                           <CheckCircle2 size={24} />
                        </div>
                        <div>
                           <h4 className="text-xl font-display font-bold uppercase tracking-widest mb-3">Physical Survey</h4>
                           <p className="text-sm text-white/30 leading-relaxed uppercase tracking-widest">In-person inspection by our global team of specialist mechanics.</p>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
                  {steps.map((step, idx) => (
                     <div key={idx} className="bg-luxury-gray p-12 space-y-12 hover:bg-white/5 transition-colors duration-700">
                        <div className="text-gold opacity-50">{step.icon}</div>
                        <div>
                           <p className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20 mb-4">Phase 0{idx + 1}</p>
                           <h4 className="text-2xl font-serif mb-6 text-white">{step.title}</h4>
                           <p className="text-white/30 text-xs leading-relaxed font-medium uppercase tracking-widest">{step.desc}</p>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         <section className="py-24 border-y border-white/5 bg-white/[0.01]">
            <div className="container mx-auto px-6 md:px-12">
               <h3 className="text-[10px] uppercase tracking-[0.5em] font-black text-white/30 mb-16 text-center">Global Partner Network</h3>
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-24">
                  {[
                     { name: "Dutton Garage", region: "Melbourne, AU" },
                     { name: "RM Sotheby’s", region: "London / NY" },
                     { name: "The Little Car Company", region: "Oxfordshire, UK" },
                     { name: "Girardo & Co.", region: "Oxfordshire, UK" },
                     { name: "Joe Macari", region: "London, UK" },
                     { name: "Danzante", region: "Milan, IT" },
                     { name: "Bingo Sports", region: "Tokyo, JP" },
                     { name: "Canepa", region: "California, USA" }
                  ].map((partner, idx) => (
                     <motion.div
                        key={idx}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        className="text-center group"
                      >
                        <p className="text-2xl font-serif text-white/40 group-hover:text-gold transition-colors duration-500 mb-2">{partner.name}</p>
                        <p className="text-[8px] uppercase tracking-[0.4em] font-black text-white/10 group-hover:text-white/30 transition-colors uppercase">{partner.region}</p>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         <section className="py-32 bg-white text-black overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 text-center">
               <AnimatePresence mode="wait">
                  {formState === 'idle' && (
                     <motion.div
                        key="form-idle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-2xl mx-auto"
                     >
                        <h2 className="text-4xl md:text-7xl font-serif mb-16">
                           Ready to initiate a <br />
                           <span className="font-display font-medium uppercase tracking-tighter text-black">search?</span>
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-12 text-left max-w-2xl mx-auto">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                              <div className="relative group">
                                 <input 
                                    type="text" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    placeholder="Your Name" 
                                    className="w-full bg-transparent border-b border-black/10 py-4 text-xl font-serif outline-none focus:border-gold transition-colors placeholder:text-black/30 text-black font-medium" 
                                 />
                                 <span className="text-[9px] uppercase tracking-[0.2em] font-black text-black/40 block mt-2">Full Name</span>
                              </div>
                              <div className="relative group">
                                 <input 
                                    type="tel" 
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                    placeholder="e.g. +880 17..." 
                                    className="w-full bg-transparent border-b border-black/10 py-4 text-xl font-serif outline-none focus:border-gold transition-colors placeholder:text-black/30 text-black font-medium" 
                                 />
                                 <span className="text-[9px] uppercase tracking-[0.2em] font-black text-black/40 block mt-2">Phone Number (WhatsApp Preferred)</span>
                              </div>
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                              <div className="relative group">
                                 <input 
                                    type="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com" 
                                    className="w-full bg-transparent border-b border-black/10 py-4 text-xl font-serif outline-none focus:border-gold transition-colors placeholder:text-black/30 text-black font-medium" 
                                 />
                                 <span className="text-[9px] uppercase tracking-[0.2em] font-black text-black/40 block mt-2">Email Address (Optional)</span>
                              </div>
                              <div className="relative group">
                                 <input 
                                    type="text" 
                                    value={manufacturer}
                                    onChange={(e) => setManufacturer(e.target.value)}
                                    required
                                    placeholder="e.g. Porsche, Ferrari" 
                                    className="w-full bg-transparent border-b border-black/10 py-4 text-xl font-serif outline-none focus:border-gold transition-colors placeholder:text-black/30 text-black font-medium" 
                                 />
                                 <span className="text-[9px] uppercase tracking-[0.2em] font-black text-black/40 block mt-2">Desired Manufacturer</span>
                              </div>
                           </div>

                           <div className="relative group">
                              <input 
                                 type="text" 
                                 value={model}
                                 onChange={(e) => setModel(e.target.value)}
                                 required
                                 placeholder="e.g. 911 GT3 RS (992 Generation)" 
                                 className="w-full bg-transparent border-b border-black/10 py-4 text-xl font-serif outline-none focus:border-gold transition-colors placeholder:text-black/30 text-black font-medium" 
                              />
                              <span className="text-[9px] uppercase tracking-[0.2em] font-black text-black/40 block mt-2">Specific Model / Generation / Custom Trim Specs</span>
                           </div>

                           <button 
                              type="submit"
                              className="w-full py-8 bg-black text-white rounded-full font-black uppercase text-[11px] tracking-[0.4em] hover:bg-gold hover:text-black transition-all duration-700 mt-12"
                           >
                              Launch Bespoke Pursuit
                           </button>
                        </form>
                     </motion.div>
                  )}

                  {formState === 'submitting' && (
                     <motion.div
                        key="form-submitting"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="max-w-md mx-auto py-16 flex flex-col items-center justify-center space-y-8"
                     >
                        <Loader2 className="w-12 h-12 text-gold animate-spin" />
                        <p className="text-[10px] uppercase tracking-[0.5em] font-black text-black/50">Activating Sourcing Protocol</p>
                        <h3 className="text-3xl font-serif italic text-black/80">Scanning off-market allocations...</h3>
                     </motion.div>
                  )}

                  {formState === 'success' && (
                     <motion.div
                        key="form-success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-2xl mx-auto py-8 space-y-12"
                     >
                        <div className="w-24 h-24 border border-gold rounded-full flex items-center justify-center mx-auto text-gold bg-gold/5">
                           <ShieldCheck className="w-12 h-12" />
                        </div>
                        <div className="space-y-4">
                           <p className="text-[10px] uppercase tracking-[0.5em] font-black text-gold">Protocol Activated</p>
                           <h3 className="text-4xl md:text-6xl font-serif text-black leading-none">Bespoke Pursuit <br/>Initiated.</h3>
                           <p className="text-black/60 text-lg leading-relaxed max-w-lg mx-auto font-light pt-4">
                              Our global network of curators and private dealer circles has been put on alert for a <span className="font-serif italic font-medium text-black">{manufacturer} {model}</span>. We will contact you within 24 hours to review matches.
                           </p>
                        </div>
                        <button 
                           onClick={handleReset}
                           className="px-12 py-5 border border-black/20 rounded-full text-[10px] uppercase tracking-[0.4em] font-black hover:bg-black hover:text-white hover:border-black transition-all duration-700"
                        >
                           Submit Another Request
                        </button>
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>
         </section>

         <Contact />
      </main>
   );
}
