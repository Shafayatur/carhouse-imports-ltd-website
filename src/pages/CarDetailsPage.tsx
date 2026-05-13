import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ALL_CARS } from "@/data/cars";
import { Navbar } from "@/components/Navbar";
import { Contact } from "@/components/Contact";
import { motion } from "motion/react";
import { ArrowLeft, Share2, Heart, ShieldCheck, Gauge, Zap, Wind, Download, Info, Activity, Settings, Layout } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";

export default function CarDetailsPage() {
  const { id } = useParams();
  const car = ALL_CARS.find((c) => c.id === id);
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!car) {
    return (
      <div className="bg-luxury-black min-h-screen text-white flex flex-col items-center justify-center">
        <h1 className="text-4xl font-serif italic mb-8">Vehicle not found</h1>
        <Link to="/inventory" className="text-gold uppercase tracking-widest border-b border-gold pb-2">Return to Inventory</Link>
      </div>
    );
  }

  const mainSpecs = [
    { icon: <Gauge size={20} />, label: "Performance", value: car.technicalSpecs?.topSpeed || car.specs?.split("•")[0] || "High Performance" },
    { icon: <Zap size={20} />, label: "Acceleration", value: car.technicalSpecs?.acceleration || car.specs?.split("•")[1] || "Class Leading" },
    { icon: <Wind size={20} />, label: "Aero", value: "Active Dynamics" },
    { icon: <ShieldCheck size={20} />, label: "Condition", value: "Pristine" },
  ];

  const techDetails = [
    { label: "Engine", value: car.technicalSpecs?.engine || "Consult Data Sheet" },
    { label: "Transmission", value: car.technicalSpecs?.transmission || "Consult Data Sheet" },
    { label: "Max Power", value: car.technicalSpecs?.power || "Consult Data Sheet" },
    { label: "Max Torque", value: car.technicalSpecs?.torque || "Consult Data Sheet" },
    { label: "Drivetrain", value: car.technicalSpecs?.drivetrain || "Consult Data Sheet" },
    { label: "Dry Weight", value: car.technicalSpecs?.weight || "Consult Data Sheet" },
  ];

  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      // Simulate real download trigger
      const link = document.createElement('a');
      link.href = '#';
      link.setAttribute('download', `${car.name}_technical_spec.pdf`);
      document.body.appendChild(link);
      // alert for user feedback since we can't actually download a real pdf from nowhere
      // but let's just use console log or a toast if I had one
      console.log("Downloading spec sheet for", car.name);
    }, 2000);
  };

  return (
    <main className="bg-luxury-black min-h-screen selection:bg-gold selection:text-black text-white relative">
      <Navbar />

      {/* Floating Back Button */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-[100] group">
        <Link 
          to="/inventory" 
          className="flex items-center gap-4 bg-white/5 hover:bg-gold/90 backdrop-blur-md text-white hover:text-black pl-6 pr-8 py-10 rounded-r-full transition-all duration-700 border-y border-r border-white/10 group-hover:pl-8"
        >
          <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] uppercase tracking-[0.5em] font-black [writing-mode:vertical-lr] rotate-180">Back</span>
        </Link>
      </div>

      {/* Hero Full-width Image */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          src={car.image} 
          alt={car.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent" />
        
        <div className="absolute bottom-12 left-12 md:left-24">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-[11px] uppercase tracking-[1em] font-black text-gold mb-6"
          >
            {car.brand} • {car.year}
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-7xl md:text-[8vw] font-serif italic leading-none tracking-tighter"
          >
            {car.name}
          </motion.h1>
        </div>
      </section>

      <section className="py-24 container mx-auto px-6 md:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
          {/* Details */}
          <div className="lg:col-span-8 space-y-32">
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-white/10">
               {mainSpecs.map((spec, idx) => (
                 <div key={idx} className="space-y-4">
                   <div className="flex items-center gap-4 text-gold opacity-50">
                     {spec.icon}
                     <span className="text-[10px] uppercase tracking-[0.4em] font-black">{spec.label}</span>
                   </div>
                   <p className="text-2xl font-serif italic text-white/90">{spec.value}</p>
                 </div>
               ))}
            </div>

            {/* Narrative Context */}
            <div className="space-y-12">
              <h3 className="text-[11px] uppercase tracking-[0.5em] font-black text-white/30 flex items-center gap-4">
                <Info size={14} className="text-gold" /> The Narrative
              </h3>
              <p className="text-2xl md:text-3xl font-serif italic text-white/60 leading-relaxed max-w-4xl">
                {car.description || "A masterwork of automotive engineering. This specific example has been meticulously maintained and features a bespoke configuration requested by its original owner."}
              </p>
            </div>

            {/* Comprehensive Technical Data */}
            <div className="space-y-16 py-16 border-y border-white/10">
               <div className="flex items-center justify-between">
                  <h3 className="text-[11px] uppercase tracking-[0.5em] font-black text-white/30 flex items-center gap-4">
                    <Activity size={14} className="text-gold" /> Technical Data
                  </h3>
                  <button 
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="flex items-center gap-3 text-[9px] uppercase tracking-widest text-gold hover:text-white transition-colors disabled:opacity-50"
                  >
                    {isDownloading ? (
                      <span className="flex items-center gap-2">
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Activity size={12} />
                        </motion.div>
                        Generating Dossier...
                      </span>
                    ) : (
                      <>
                        <Download size={14} /> Full Spec PDF
                      </>
                    )}
                  </button>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-10">
                  {techDetails.map((detail, idx) => (
                    <div key={idx} className="flex justify-between items-end border-b border-white/5 pb-4 group">
                       <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold group-hover:text-white transition-colors">{detail.label}</span>
                       <span className="font-serif italic text-lg text-white group-hover:text-gold transition-colors">{detail.value}</span>
                    </div>
                  ))}
               </div>
            </div>

            {/* Bespoke Features */}
            {car.features && (
              <div className="space-y-12">
                <h3 className="text-[11px] uppercase tracking-[0.5em] font-black text-white/30 flex items-center gap-4">
                  <Settings size={14} className="text-gold" /> Bespoke Configuration
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {car.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-6 p-6 bg-white/[0.02] border border-white/5 rounded-sm">
                         <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                         <span className="text-[11px] uppercase tracking-[0.2em] text-white/70 font-medium">{feature}</span>
                      </div>
                   ))}
                </div>
              </div>
            )}

            {/* Provenance & History */}
            <div className="space-y-12 p-12 bg-white/[0.01] border border-white/5 rounded-sm">
              <h3 className="text-[11px] uppercase tracking-[0.5em] font-black text-white/30 flex items-center gap-4">
                <Layout size={14} className="text-gold" /> Verified Provenance
              </h3>
              <div className="space-y-8">
                <div className="flex gap-8 group">
                  <div className="text-white/20 group-hover:text-gold transition-colors pt-1">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-serif italic text-white mb-2">Authenticated Documentation</h4>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest leading-relaxed">Complete service history from official manufacturers. Validated mileage and single-owner history where applicable.</p>
                  </div>
                </div>
                <div className="flex gap-8 group">
                  <div className="text-white/20 group-hover:text-gold transition-colors pt-1">
                    <Activity size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-serif italic text-white mb-2">Heritage Certification</h4>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest leading-relaxed">Certified as a matching-numbers example by our in-house heritage experts. Provenance audit includes auction records and private sale history.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Logistics Timeline */}
            <div className="space-y-16">
              <h3 className="text-[11px] uppercase tracking-[0.5em] font-black text-white/30">Acquisition Roadmap</h3>
              <div className="relative space-y-12 pl-8 border-l border-white/5">
                {[
                  { stage: "Phase 01", title: "Inquiry & Verification", time: "Day 1-2" },
                  { stage: "Phase 02", title: "Due Diligence & Title Audit", time: "Day 3-7" },
                  { stage: "Phase 03", title: "Secure Escrow Transaction", time: "Day 8-10" },
                  { stage: "Phase 04", title: "Enclosed Global Transit", time: "Estimated 14 Days" }
                ].map((item, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-10 top-2 w-4 h-4 rounded-full bg-luxury-black border-2 border-white/10 group-hover:border-gold transition-colors" />
                    <div>
                      <p className="text-gold text-[8px] font-black tracking-widest mb-2">{item.stage} • {item.time}</p>
                      <h4 className="text-xl font-serif italic text-white/80 group-hover:text-white transition-colors">{item.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Documentation */}
            <div className="space-y-12">
              <h3 className="text-[11px] uppercase tracking-[0.5em] font-black text-white/30 flex items-center gap-4">
                <Layout size={14} className="text-gold" /> Visual Documentation
              </h3>
              <div className="grid grid-cols-2 gap-8">
                {(car.gallery || [car.image, car.image]).map((img, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="aspect-[16/10] overflow-hidden rounded-sm bg-luxury-gray relative group"
                  >
                    <img src={img} alt={`${car.name} detail ${idx}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Action */}
          <div className="lg:col-span-4 sticky top-32 space-y-12">
            <div className="p-12 border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-sm space-y-10 shadow-2xl">
               <div>
                  <p className="text-[10px] uppercase tracking-[0.4em] font-black text-white/30 mb-4">Investment Value</p>
                  <p className="text-4xl font-display font-medium text-gold">{car.price || "Contact for Pricing"}</p>
               </div>

               <div className="space-y-4">
                 <button className="w-full py-8 bg-gold text-black rounded-full font-black uppercase text-[11px] tracking-[0.4em] hover:bg-white transition-all duration-700 shadow-lg shadow-gold/20">
                    Initiate Inquiry
                 </button>
                 <button 
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="w-full py-8 border border-white/10 text-white rounded-full font-black uppercase text-[11px] tracking-[0.4em] hover:bg-white/5 transition-all duration-700 flex items-center justify-center gap-4 disabled:opacity-50"
                 >
                    {isDownloading ? "Generating..." : "Digital Dossier"} <Download size={16} />
                 </button>
               </div>

               <div className="pt-8 border-t border-white/5 space-y-6">
                  <div className="flex items-center gap-4 opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
                    <Share2 size={16} />
                    <span className="text-[9px] uppercase tracking-widest font-black">Share Configuration</span>
                  </div>
                  <div 
                    onClick={() => car && toggleWishlist(car.id)}
                    className={`flex items-center gap-4 transition-opacity cursor-pointer ${isInWishlist(car?.id || '') ? 'text-gold' : 'opacity-40 hover:opacity-100'}`}
                  >
                    <Heart size={16} fill={isInWishlist(car?.id || '') ? "currentColor" : "none"} />
                    <span className="text-[9px] uppercase tracking-widest font-black">
                      {isInWishlist(car?.id || '') ? 'In Favorites' : 'Add to Favorites'}
                    </span>
                  </div>
               </div>
            </div>

            <div className="px-6 space-y-8">
               <div className="flex items-start gap-6">
                  <ShieldCheck className="text-gold mt-1" size={20} />
                  <p className="text-[9px] uppercase tracking-[0.3em] leading-relaxed text-white/20 font-black">
                     Certified Historical Verification. All documents authenticated by our heritage specialists. Worldwide shipping and VAT handling included.
                  </p>
               </div>
               
               {/* Quick Info */}
               <div className="p-8 border-l border-gold/30 bg-gold/[0.02]">
                  <p className="text-[10px] uppercase tracking-widest text-gold font-black mb-2">Location</p>
                  <p className="text-sm font-serif italic text-white/60">London Private Showroom, UK</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      <Contact />
    </main>
  );
}
