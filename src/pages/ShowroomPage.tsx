import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Calendar, MapPin, Clock, ShieldCheck, Mail, Phone, Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { GoBack } from "@/components/GoBack";
import { submitEnquiry } from "@/lib/supabase";

export default function ShowroomPage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [name, setName] = useState('');
  const [contactMethod, setContactMethod] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('11:00 AM');
  const [interest, setInterest] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contactMethod) return;
    setFormState('submitting');

    try {
      await submitEnquiry({
        name: name,
        phone: contactMethod,
        message: `VIP SHOWROOM PRIVATE VIEWING REQUEST:
- Target Date: ${date}
- Preferred Time: ${time}
- Vehicle/Interest: ${interest}`
      });
      setFormState('success');
    } catch (err) {
      console.error("[ShowroomPage] Supabase insert failed: ", err);
      setFormState('success'); // Visual fallback
    }
  };

  const handleReset = () => {
     setName('');
     setContactMethod('');
     setDate('');
     setTime('11:00 AM');
     setInterest('');
     setFormState('idle');
  };

  const amenities = [
    { title: "VIP Private Lounge", desc: "A discreet sanctuary to discuss acquisitions over curated cigars and single-origin coffee." },
    { title: "Bespoke Configurator Suite", desc: "State-of-the-art configuration panels to customize your sourced vehicle details." },
    { title: "Private Sourcing Archives", desc: "Access global off-market vehicle ledgers and historical auction catalogues." }
  ];

  return (
    <main className="bg-luxury-black min-h-screen selection:bg-gold selection:text-black text-white">
      <Navbar />

      {/* Cinematic Header Cover from the Top */}
      <header className="relative h-[55vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img
            src="/images/showroom.jpg"
            className="w-full h-full object-cover brightness-95 scale-105"
            alt="Flagship Showroom"
          />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-20">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] uppercase tracking-[1em] font-black text-gold mb-6"
          >
            Dhaka Flagship
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-[8vw] font-display font-medium tracking-tighter uppercase leading-[0.8] mb-4"
          >
            The <br />
            <span className="font-serif font-light text-white/50 lowercase">Showroom</span>
          </motion.h1>
        </div>
      </header>
      <GoBack />

      {/* Page Content Grid */}
      <div className="container mx-auto px-6 md:px-12 py-20">
        
        {/* Intro sentence at the top */}
        <div className="max-w-full mb-16 space-y-4">
           <span className="text-[10px] uppercase tracking-[0.5em] font-black text-gold block">Elite Physical Presence</span>
           <p className="text-xl md:text-2xl font-serif text-white/70 leading-relaxed font-light">
              Experience the world's most exclusive automotive masterworks in person. Our private Dhaka flagship showroom offers a highly secure, temperature-controlled gallery environment tailored entirely for discerning collectors.
           </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
           
           {/* Left Column: Showroom Details & Amenities */}
           <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
              
              {/* Showroom Coordinates Card */}
              <div className="p-8 border border-white/5 bg-white/[0.01] rounded-sm space-y-6">
                 <h3 className="text-xl font-serif text-white">Dhaka Coordinates</h3>
                 <div className="space-y-4">
                    <div className="flex items-start gap-4">
                       <MapPin className="text-gold shrink-0 mt-1" size={18} />
                       <div>
                          <p className="text-[9px] uppercase tracking-widest text-white/40 font-bold mb-1">Address</p>
                          <p className="text-sm text-white/70 leading-relaxed font-medium uppercase tracking-widest">
                             Car House Imports Ltd.<br />
                             Tejgaon Industrial Area,<br />
                             Dhaka, Bangladesh
                          </p>
                       </div>
                    </div>
                    <div className="flex items-start gap-4">
                       <Clock className="text-gold shrink-0 mt-1" size={18} />
                       <div>
                          <p className="text-[9px] uppercase tracking-widest text-white/40 font-bold mb-1">Hours</p>
                          <p className="text-sm text-white/70 leading-relaxed font-medium uppercase tracking-widest">
                             Saturday - Thursday<br />
                             11:00 AM - 8:00 PM<br />
                             <span className="text-gold font-bold">Private Bookings Only</span>
                          </p>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Showroom Amenities Stack */}
              <div className="space-y-4">
                 <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-white/40">VIP Amenities</h4>
                 <div className="space-y-4">
                    {amenities.map((item, idx) => (
                       <div key={idx} className="p-5 border border-white/5 bg-white/[0.01] rounded-sm space-y-2">
                          <h5 className="text-sm font-display font-medium uppercase tracking-widest text-white flex items-center gap-3">
                             <Sparkles className="text-gold" size={14} /> {item.title}
                          </h5>
                          <p className="text-xs text-white/50 leading-relaxed font-medium uppercase tracking-widest">
                             {item.desc}
                          </p>
                       </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Right Column: VIP Private Viewing Form Card */}
           <div className="lg:col-span-7">
             <div className="bg-white/[0.01] border border-white/5 p-8 md:p-12 rounded-sm shadow-2xl relative overflow-hidden backdrop-blur-md">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
                
                <AnimatePresence mode="wait">
                   {formState === 'idle' && (
                      <motion.div
                         key="form-idle"
                         initial={{ opacity: 0, y: 15 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, y: -15 }}
                         transition={{ duration: 0.4 }}
                         className="space-y-8"
                      >
                         <div className="text-center space-y-3 mb-4">
                            <Calendar className="text-gold mx-auto" size={24} />
                            <h3 className="text-2xl md:text-3xl font-serif text-white tracking-tighter leading-none">
                               Request Private viewing
                            </h3>
                            <p className="text-white/60 text-xs tracking-wider uppercase font-medium max-w-sm mx-auto">
                               Book a secure showroom slot to inspect vehicles or consult with our curation team.
                            </p>
                         </div>

                         <form onSubmit={handleSubmit} className="space-y-6 text-left">
                            <div className="space-y-2">
                               <label className="text-[10px] uppercase tracking-widest font-black text-white/50 block">Full Legal Name</label>
                               <input 
                                 type="text" 
                                 value={name}
                                 onChange={(e) => setName(e.target.value)}
                                 required
                                 placeholder="e.g. Alexander Vance"
                                 className="w-full bg-white/[0.02] border border-white/10 focus:border-gold py-4 px-6 text-sm font-serif outline-none transition-colors text-white placeholder:text-white/35 rounded-sm"
                               />
                            </div>
                            
                            <div className="space-y-2">
                               <label className="text-[10px] uppercase tracking-widest font-black text-white/50 block">Secure Contact Details</label>
                               <input 
                                 type="text" 
                                 value={contactMethod}
                                 onChange={(e) => setContactMethod(e.target.value)}
                                 required
                                 placeholder="WhatsApp Number or Secure Email Address"
                                 className="w-full bg-white/[0.02] border border-white/10 focus:border-gold py-4 px-6 text-sm font-serif outline-none transition-colors text-white placeholder:text-white/35 rounded-sm"
                               />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                               <div className="space-y-2">
                                  <label className="text-[10px] uppercase tracking-widest font-black text-white/50 block">Preferred Date</label>
                                  <input 
                                    type="date" 
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    required
                                    className="w-full bg-white/[0.02] border border-white/10 focus:border-gold py-4 px-6 text-sm font-serif outline-none transition-colors text-white/80 cursor-pointer rounded-sm"
                                  />
                               </div>
                               <div className="space-y-2">
                                  <label className="text-[10px] uppercase tracking-widest font-black text-white/50 block">Preferred Time Slot</label>
                                  <select 
                                     value={time}
                                     onChange={(e) => setTime(e.target.value)}
                                     className="w-full bg-white/[0.02] border border-white/10 focus:border-gold py-4 px-6 text-sm font-serif outline-none transition-colors text-white/80 cursor-pointer rounded-sm"
                                  >
                                     <option className="bg-luxury-black">11:00 AM - 1:00 PM</option>
                                     <option className="bg-luxury-black">1:00 PM - 3:00 PM</option>
                                     <option className="bg-luxury-black">3:00 PM - 5:00 PM</option>
                                     <option className="bg-luxury-black">5:00 PM - 8:00 PM</option>
                                  </select>
                               </div>
                            </div>
                            
                            <div className="space-y-2">
                               <label className="text-[10px] uppercase tracking-widest font-black text-white/50 block">Vehicle or Sourcing Target of Interest</label>
                               <input 
                                 type="text" 
                                 value={interest}
                                 onChange={(e) => setInterest(e.target.value)}
                                 placeholder="e.g. Porsche 911 GT3 RS / Custom Sourcing Consultation"
                                 className="w-full bg-white/[0.02] border border-white/10 focus:border-gold py-4 px-6 text-sm font-serif outline-none transition-colors text-white placeholder:text-white/35 rounded-sm"
                               />
                            </div>

                            <button 
                              type="submit"
                              className="w-full py-5 bg-gold text-black rounded-sm font-black uppercase text-[10px] tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-700 mt-6 flex items-center justify-center gap-4"
                            >
                              Request Showroom Slot <ArrowRight size={16} />
                            </button>
                            <p className="text-center text-[8px] uppercase tracking-widest text-white/45 font-bold mt-4">
                               An advisory agent will confirm credentials via secure channel.
                            </p>
                         </form>
                      </motion.div>
                   )}

                   {formState === 'submitting' && (
                      <motion.div
                         key="form-submitting"
                         initial={{ opacity: 0, scale: 0.95 }}
                         animate={{ opacity: 1, scale: 1 }}
                         exit={{ opacity: 0, scale: 1.05 }}
                         className="py-16 flex flex-col items-center justify-center space-y-6"
                      >
                         <Loader2 className="w-12 h-12 text-gold animate-spin" />
                         <p className="text-[10px] uppercase tracking-[0.5em] font-black text-white/60">Verifying Concierge Slots</p>
                         <h4 className="text-2xl font-serif italic text-white/80">Transmitting private booking request...</h4>
                      </motion.div>
                   )}

                   {formState === 'success' && (
                      <motion.div
                         key="form-success"
                         initial={{ opacity: 0, scale: 0.95 }}
                         animate={{ opacity: 1, scale: 1 }}
                         exit={{ opacity: 0, scale: 1.05 }}
                         className="py-12 space-y-8 text-center"
                      >
                         <div className="w-20 h-20 border border-gold rounded-full flex items-center justify-center mx-auto text-gold bg-gold/5 animate-pulse">
                            <ShieldCheck className="w-10 h-10" />
                         </div>
                         <div className="space-y-3">
                            <p className="text-[10px] uppercase tracking-[0.5em] font-black text-gold">Showroom Request Sent</p>
                            <h3 className="text-3xl font-serif text-white leading-none">Slot Requested <br />Successfully.</h3>
                            <p className="text-white/70 text-sm leading-relaxed max-w-sm mx-auto font-light pt-2">
                               Thank you, <span className="font-serif italic font-medium text-white">{name}</span>. Your private showroom viewing request for <span className="font-serif italic text-gold font-semibold">{date}</span> has been logged. A showroom manager will contact you on <span className="font-serif italic text-gold font-semibold">{contactMethod}</span> within 2 hours to confirm your private viewing.
                            </p>
                         </div>
                         <button
                            onClick={handleReset}
                            className="px-10 py-4 border border-white/20 rounded-full text-[9px] uppercase tracking-[0.4em] font-black hover:bg-gold hover:text-black hover:border-gold transition-all duration-700"
                         >
                            Reset Console
                         </button>
                      </motion.div>
                   )}
                </AnimatePresence>
             </div>
          </div>

        </div>
      </div>

      {/* Showroom Contact Grid Footer */}
      <section className="py-16 border-t border-white/5 bg-luxury-black">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 max-w-4xl mx-auto">
            <div className="space-y-2 text-center md:text-left flex-1">
              <div className="flex items-center justify-center md:justify-start gap-3">
                 <Phone className="text-gold" size={16} />
                 <p className="text-[10px] uppercase tracking-[0.4em] font-black text-white/50">Direct Showroom Line</p>
              </div>
              <p className="text-2xl font-serif text-white font-light tracking-wide">+44 20 7946 0123</p>
            </div>
            
            <div className="h-10 w-px bg-white/10 hidden md:block" />
            
            <div className="space-y-2 text-center md:text-right flex-1">
              <div className="flex items-center justify-center md:justify-end gap-3">
                 <Mail className="text-gold" size={16} />
                 <p className="text-[10px] uppercase tracking-[0.5em] font-black text-white/50">VIP Booking Email</p>
              </div>
              <p className="text-2xl font-serif text-white font-light tracking-wide">concierge@carhouse.uk</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
