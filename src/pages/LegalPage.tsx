import { motion } from "motion/react";
import { ShieldCheck, FileText, Lock, Globe } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Contact } from "@/components/Contact";

export default function LegalPage() {
  const sections = [
     {
        title: "1. Sourcing & Acquisition Protocols",
        icon: <FileText className="text-gold" size={18} />,
        content: "All vehicle sourcing requests initiated via our digital channels or during private consultations are subject to multi-stage verification. Sourcing deposits are secured and held in escrow until the chassis has passed physically verified inspections by certified era-specific experts at our designated global sorting hubs."
     },
     {
        title: "2. Absolute Client Confidentiality",
        icon: <ShieldCheck className="text-gold" size={18} />,
        content: "Discretion is our standard. Under our curatorship protocols, we never disclose client legal names, private coordinates, financial parameters, or purchase histories to third parties without prior explicit authorization. All encrypted dossier submissions are protected under AES-256 standards."
     },
     {
        title: "3. Importation, Duties & Compliance",
        icon: <Globe className="text-gold" size={18} />,
        content: "Car House Imports Ltd operates in full compliance with National Board of Revenue (NBR) regulations in Bangladesh and international export laws. Quoted acquisition fees include breakdown structures for local importation taxes, freight costs, and processing logistics. Custom NBR duty assessments are calculated on a per-chassis basis."
     },
     {
        title: "4. Escrow & Booking Securities",
        icon: <Lock className="text-gold" size={18} />,
        content: "Private viewing appointments booked for our Dhaka flagship showroom require formal confirmation of credentials. Secure vehicle reservation holdings and custom configuration booking fees are governed by individual contractual parameters and are fully refundable should verified physical chassis inspections reveal structural deviations."
     }
  ];

  return (
    <main className="bg-luxury-black min-h-screen selection:bg-gold selection:text-black text-white">
      <Navbar />

      {/* Cinematic Header Cover from the Top */}
      <header className="relative h-[45vh] flex items-center pt-20 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/75 z-10" />
          <img
            src="/images/philosophy.jpg"
            className="w-full h-full object-cover brightness-50"
            alt="Terms and Legal"
          />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-20">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] uppercase tracking-[1em] font-black text-gold mb-6"
          >
            Protocols & Compliance
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-[6vw] font-display font-medium tracking-tighter uppercase leading-[0.8] mb-4"
          >
            Terms & <br />
            <span className="font-serif font-light text-white/50 lowercase">Legal</span>
          </motion.h1>
        </div>
      </header>

      {/* Page Content Layout */}
      <div className="container mx-auto px-6 md:px-12 py-20 max-w-4xl">
         
         <div className="space-y-12">
            
            {/* Introductory statement */}
            <div className="space-y-4 border-b border-white/5 pb-12">
               <span className="text-[9px] uppercase tracking-[0.4em] font-black text-gold">Regulatory Framework</span>
               <h3 className="text-xl md:text-2xl font-serif text-white/95 leading-relaxed font-light">
                  Car House Imports Ltd operates at the highest tier of corporate transparency, absolute confidentiality, and global regulatory compliance. 
               </h3>
               <p className="text-sm text-white/50 leading-relaxed font-light">
                  By utilizing our bespoke sourcing algorithms, digital registry, and elite collection advisories, you agree to comply with the secure transaction protocols, structural validation pipelines, and discretion arrangements detailed below.
               </p>
            </div>

            {/* Legal sections grid */}
            <div className="space-y-8">
               {sections.map((sec, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="p-8 border border-white/5 bg-white/[0.01] rounded-sm space-y-4 hover:border-white/10 transition-colors"
                  >
                     <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                        {sec.icon}
                        <h4 className="text-sm font-display font-bold uppercase tracking-widest text-white">{sec.title}</h4>
                     </div>
                     <p className="text-sm text-white/70 leading-relaxed font-normal">
                        {sec.content}
                     </p>
                  </motion.div>
               ))}
            </div>

            {/* Final Statement */}
            <div className="pt-8 text-center space-y-4">
               <p className="text-[9px] uppercase tracking-[0.4em] font-black text-white/30">
                  Last Updated: May 19, 2026 • Legal Division
               </p>
               <p className="text-xs text-gold font-serif italic">
                  For specific corporate escrow arrangements or customized NDA inquiries, contact our Legal Counsel directly at concierge@carhouse.uk.
               </p>
            </div>

         </div>

      </div>

      <Contact />
    </main>
  );
}
