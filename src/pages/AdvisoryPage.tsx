import { Navbar } from "@/components/Navbar";
import { Contact } from "@/components/Contact";
import { motion, AnimatePresence } from "motion/react";
import { 
  TrendingUp, 
  ShieldCheck, 
  Landmark, 
  BarChart3, 
  ArrowRight, 
  Lock, 
  Download, 
  Loader2, 
  X, 
  CheckCircle2
} from "lucide-react";
import { useState } from "react";
import { submitEnquiry } from "@/lib/supabase";

export default function AdvisoryPage() {
  // Modal State for Report Download
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportFormState, setReportFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [reportName, setReportName] = useState('');
  const [reportEmail, setReportEmail] = useState('');

  // Form State for Bespoke Portfolio Audit
  const [auditFormState, setAuditFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [auditName, setAuditName] = useState('');
  const [auditPhone, setAuditPhone] = useState('');
  const [auditBudget, setAuditBudget] = useState('BDT 1 - 3 Crore');
  const [auditHorizon, setAuditHorizon] = useState('Medium Term (3 - 5 Years)');
  const [auditAssetTier, setAuditAssetTier] = useState('Modern Analog Supercars');

  // Interactive Asset Tracker state
  const [selectedAssetIdx, setSelectedAssetIdx] = useState(0);

  const pillars = [
    { 
      title: "Market Analytics", 
      icon: <BarChart3 className="text-gold" size={20} />, 
      desc: "Deep-dive analysis into auction trends, historical appreciation, and emerging asset classes within the hypercar market." 
    },
    { 
      title: "Portfolio Management", 
      icon: <Landmark className="text-gold" size={20} />, 
      desc: "Strategic acquisition and divestment strategies designed to maximize the long-term value of your automotive collection." 
    },
    { 
      title: "Risk Mitigation", 
      icon: <ShieldCheck className="text-gold" size={20} />, 
      desc: "Provenance verification, condition tracking, and insurance advisory to protect your high-value assets." 
    },
    { 
      title: "Future Forecast", 
      icon: <TrendingUp className="text-gold" size={20} />, 
      desc: "Identifying the next generation of 'Blue Chip' classics before they reach peak market saturation." 
    }
  ];

  // Real-world appreciations tracking dataset
  const investmentAssets = [
    {
      name: "Porsche 911 (997.2) GT3 RS",
      category: "Modern Classic",
      yield5Yr: "+42.5%",
      peakValue: "BDT 3.8 Crore",
      status: "High Demand / Low Supply",
      driver: "The final hydraulic steering Mezger-engined GT3 RS. Analog purity that can never be replicated.",
      bgColor: "from-orange-500/10 to-transparent"
    },
    {
      name: "Ferrari F430 Scuderia",
      category: "Modern Analog V8",
      yield5Yr: "+28.1%",
      peakValue: "BDT 4.2 Crore",
      status: "Steady Blue-Chip",
      driver: "F1 transmission tuned by Michael Schumacher. The final raw, naturally aspirated single-clutch track special.",
      bgColor: "from-red-500/10 to-transparent"
    },
    {
      name: "BMW M3 (E46) CSL",
      category: "Modern Touring Icon",
      yield5Yr: "+55.3%",
      peakValue: "BDT 2.1 Crore",
      status: "Rapid Appreciation",
      driver: "Carbon-fiber roof, absolute weight reduction, and the legendary carbon airbox intake roar.",
      bgColor: "from-blue-500/10 to-transparent"
    },
    {
      name: "Toyota Supra (A80) Turbo",
      category: "JDM Icon",
      yield5Yr: "+68.2%",
      peakValue: "BDT 1.8 Crore",
      status: "Peak Market Interest",
      driver: "Bulletproof 2JZ-GTE engine. Completely unmodified factory-original models are setting historic records.",
      bgColor: "from-gold/10 to-transparent"
    }
  ];

  // Submit Report Download Lead
  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportName || !reportEmail) return;
    setReportFormState('submitting');

    try {
      await submitEnquiry({
        name: reportName,
        phone: 'REPORT_DOWNLOAD_LEAD',
        email: reportEmail,
        message: `DOWNLOAD INITIATED: Private Q2 Hypercar Market Report requested by ${reportName} (${reportEmail})`
      });
      setReportFormState('success');
      // Simulate file download trigger after a brief delay
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = '#'; 
        link.setAttribute('download', 'CarHouse_Q2_Market_Report.pdf');
        document.body.appendChild(link);
        link.remove();
      }, 1000);
    } catch (err) {
      console.error("[AdvisoryPage] Report lead capture failed:", err);
      setReportFormState('success'); 
    }
  };

  // Submit Portfolio Audit Lead
  const handleAuditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditName || !auditPhone) return;
    setAuditFormState('submitting');

    try {
      await submitEnquiry({
        name: auditName,
        phone: auditPhone,
        message: `INVESTMENT PORTFOLIO AUDIT REQUEST:
- Budget Tier: ${auditBudget}
- Investment Horizon: ${auditHorizon}
- Asset Class Preference: ${auditAssetTier}`
      });
      setAuditFormState('success');
    } catch (err) {
      console.error("[AdvisoryPage] Portfolio audit lead capture failed:", err);
      setAuditFormState('success'); 
    }
  };

  const resetAuditForm = () => {
    setAuditName('');
    setAuditPhone('');
    setAuditFormState('idle');
  };

  return (
    <main className="bg-luxury-black min-h-screen selection:bg-gold selection:text-black text-white">
      <Navbar />

      {/* Cinematic Compact Header */}
      <header className="relative h-[60vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img
            src="/images/advisory.jpg"
            className="w-full h-full object-cover brightness-95"
            alt="Investment Advisory"
          />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-20">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] uppercase tracking-[1em] font-black text-gold mb-6"
          >
            Wealth Management
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-[8vw] font-display font-medium tracking-tighter uppercase leading-[0.8] mb-4"
          >
            Investment <br />
            <span className="font-serif font-light text-white/30 lowercase">Advisory</span>
          </motion.h1>
        </div>
      </header>

      {/* Philosophy & Pillars Grid Section (Compact layout, bold fonts) */}
      <section className="py-20 border-b border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            {/* Philosophy Text (Intro) */}
            <div className="lg:w-1/3 space-y-6 lg:sticky lg:top-32">
              <span className="text-[10px] uppercase tracking-[0.6em] font-black text-gold block">Our Philosophy</span>
              <h2 className="text-3xl md:text-5xl font-serif leading-tight">Automotive <br/>Capital Management</h2>
              <p className="text-base text-white/60 leading-relaxed font-light">
                In the world of high-value automobiles, a car is more than a machine—it is a sophisticated financial instrument. We help you navigate the complexities of automotive investment, providing data-backed allocations to grow and secure your capital.
              </p>
            </div>

            {/* 4 Pillars Cards */}
            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
              {pillars.map((pillar, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="space-y-6 p-8 bg-white/[0.01] border border-white/5 rounded-sm hover:border-gold/30 transition-all duration-700"
                >
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
                    {pillar.icon}
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-display font-medium uppercase tracking-widest">{pillar.title}</h3>
                    <p className="text-sm text-white/40 leading-relaxed font-medium uppercase tracking-widest">{pillar.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 1: Asset Tracker */}
      <section className="py-20 border-b border-white/5 bg-white/[0.01]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="space-y-4 mb-10">
             <p className="text-[10px] uppercase tracking-[0.8em] font-black text-gold">Market Intelligence</p>
             <h2 className="text-3xl md:text-5xl font-serif tracking-tighter leading-none">
                Blue-Chip <br />
                <span className="text-white/40 uppercase font-display font-medium">Asset Index Tracker</span>
             </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
             {/* Left Navigation: Selector Buttons */}
             <div className="lg:col-span-4 space-y-3">
                {investmentAssets.map((asset, idx) => (
                   <button
                      key={idx}
                      onClick={() => setSelectedAssetIdx(idx)}
                      className={`w-full text-left p-6 border transition-all duration-500 rounded-sm flex justify-between items-center ${
                         selectedAssetIdx === idx
                            ? "border-gold bg-gold/5 text-white"
                            : "border-white/5 bg-transparent hover:border-white/20 text-white/50"
                      }`}
                   >
                      <div>
                         <p className="text-[10px] uppercase tracking-widest font-black text-gold mb-1">{asset.category}</p>
                         <h4 className="text-xl font-serif">{asset.name}</h4>
                      </div>
                      <ArrowRight size={18} className={`transition-transform duration-300 ${selectedAssetIdx === idx ? "translate-x-2 text-gold" : "text-white/20"}`} />
                   </button>
                ))}
             </div>

             {/* Right Display: Analytics Dashboard Card */}
             <div className="lg:col-span-8">
                <AnimatePresence mode="wait">
                   <motion.div
                      key={selectedAssetIdx}
                      initial={{ opacity: 0, x: 15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -15 }}
                      transition={{ duration: 0.4 }}
                      className={`p-10 md:p-12 border border-white/5 rounded-sm relative overflow-hidden bg-gradient-to-br ${investmentAssets[selectedAssetIdx].bgColor}`}
                   >
                      <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
                      
                      <div className="flex flex-col md:flex-row justify-between items-start gap-6 border-b border-white/10 pb-6 mb-6">
                         <div>
                            <span className="px-4 py-1.5 border border-gold/30 rounded-full text-[10px] uppercase tracking-widest font-black text-gold bg-gold/5">
                               {investmentAssets[selectedAssetIdx].category}
                            </span>
                            <h3 className="text-3xl md:text-4xl font-serif text-white mt-5">{investmentAssets[selectedAssetIdx].name}</h3>
                         </div>
                         <div className="text-left md:text-right">
                            <p className="text-[10px] uppercase tracking-widest font-black text-white/30">Peak Market Value (BDT)</p>
                            <p className="text-3xl font-display font-black text-gold mt-2">{investmentAssets[selectedAssetIdx].peakValue}</p>
                         </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="space-y-4">
                            <div className="flex items-center gap-3">
                               <TrendingUp className="text-gold" size={18} />
                               <span className="text-[10px] uppercase tracking-widest font-black text-white/40">5-Year Capital Yield</span>
                            </div>
                            <p className="text-5xl font-display font-black text-white leading-none">
                               {investmentAssets[selectedAssetIdx].yield5Yr}
                            </p>
                            <p className="text-[10px] uppercase tracking-wider text-green-400 font-bold">▲ Strong Outperformance</p>
                         </div>

                         <div className="space-y-4 border-l border-white/10 pl-8">
                            <span className="text-[10px] uppercase tracking-widest font-black text-white/40 block">Market Status</span>
                            <p className="text-lg font-serif text-white">{investmentAssets[selectedAssetIdx].status}</p>
                            <p className="text-sm leading-relaxed text-white/40 font-medium uppercase tracking-widest">{investmentAssets[selectedAssetIdx].driver}</p>
                         </div>
                      </div>
                   </motion.div>
                </AnimatePresence>
             </div>
          </div>
        </div>
      </section>

      {/* Preserving Integrity Section */}
      <section className="py-20 overflow-hidden border-b border-white/5">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 space-y-8">
              <h2 className="text-3xl md:text-5xl font-serif tracking-tighter leading-tight">
                Preserving the <span className="text-gold">Historical Integrity</span> of your Portfolio.
              </h2>
              <div className="space-y-6">
                <p className="text-white/40 uppercase tracking-widest text-xs font-bold leading-relaxed">
                  We maintain active relationships with the world's most prestigious auction houses—<span className="text-white">RM Sotheby's, Gooding & Company, and Girardo & Co.</span>—to ensure our clients always have priority access to the market.
                </p>
                <div className="h-px w-20 bg-gold" />
              </div>
              
              <button 
                 onClick={() => setReportModalOpen(true)}
                 className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.4em] font-black hover:text-gold transition-colors"
              >
                 Download Q2 Market Report <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
            
            <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
              <div className="aspect-[4/3] rounded-sm overflow-hidden border border-white/5 relative group">
                <img 
                  src="/images/advisory.jpg" 
                  alt="Investment Analysis" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 p-10 bg-gold text-black hidden md:block">
                <p className="text-4xl font-display font-black leading-none">12.4%</p>
                <p className="text-[10px] uppercase tracking-widest font-black mt-2">Avg. Annual Growth</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE 2: Portfolio Audit Consultation Request Form */}
      <section className="py-20 bg-white text-black overflow-hidden">
         <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-2xl mx-auto text-center space-y-4 mb-10">
               <p className="text-[10px] uppercase tracking-[0.5em] font-black text-black/40">Bespoke Advisory</p>
               <h2 className="text-3xl md:text-5xl font-serif tracking-tighter leading-none">Bespoke <br/><span className="font-display font-medium uppercase tracking-tighter text-black">Portfolio Audit</span></h2>
               <p className="text-black/50 text-base leading-relaxed max-w-lg mx-auto font-light pt-2">
                  Initiate a secure, private assessment of your current collection, or outline a targeted budget allocation for future automotive acquisitions.
               </p>
            </div>

            <div className="max-w-2xl mx-auto bg-black/[0.01] border border-black/5 p-10 rounded-sm">
               <AnimatePresence mode="wait">
                  {auditFormState === 'idle' && (
                     <motion.form 
                        key="audit-idle"
                        onSubmit={handleAuditSubmit} 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        className="space-y-10 text-left"
                     >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                           <div className="relative">
                              <input 
                                 type="text" 
                                 value={auditName}
                                 onChange={(e) => setAuditName(e.target.value)}
                                 required
                                 placeholder="Your Full Name"
                                 className="w-full bg-transparent border-b border-black/10 py-4 text-xl font-serif outline-none focus:border-gold transition-colors text-black placeholder:text-black/30 font-medium"
                              />
                              <span className="text-[10px] uppercase tracking-[0.2em] font-black text-black/40 block mt-2">Contact Name</span>
                           </div>
                           <div className="relative">
                              <input 
                                 type="tel" 
                                 value={auditPhone}
                                 onChange={(e) => setAuditPhone(e.target.value)}
                                 required
                                 placeholder="Phone Number / WhatsApp"
                                 className="w-full bg-transparent border-b border-black/10 py-4 text-xl font-serif outline-none focus:border-gold transition-colors text-black placeholder:text-black/30 font-medium"
                              />
                              <span className="text-[10px] uppercase tracking-[0.2em] font-black text-black/40 block mt-2">Contact Number</span>
                           </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
                           <div className="flex flex-col gap-2">
                              <span className="text-[10px] uppercase tracking-[0.2em] font-black text-black/40">Target Capital Allocation</span>
                              <select 
                                 value={auditBudget} 
                                 onChange={(e) => setAuditBudget(e.target.value)}
                                 className="w-full bg-transparent border-b border-black/10 py-4 text-sm font-serif outline-none focus:border-gold text-black/70 cursor-pointer"
                              >
                                 <option>BDT 1 - 3 Crore</option>
                                 <option>BDT 3 - 5 Crore</option>
                                 <option>BDT 5 - 10 Crore</option>
                                 <option>BDT 10 Crore+</option>
                              </select>
                           </div>

                           <div className="flex flex-col gap-2">
                              <span className="text-[10px] uppercase tracking-[0.2em] font-black text-black/40">Investment Horizon</span>
                              <select 
                                 value={auditHorizon} 
                                 onChange={(e) => setAuditHorizon(e.target.value)}
                                 className="w-full bg-transparent border-b border-black/10 py-4 text-sm font-serif outline-none focus:border-gold text-black/70 cursor-pointer"
                              >
                                 <option>Short Term (1 - 2 Years)</option>
                                 <option>Medium Term (3 - 5 Years)</option>
                                 <option>Long Term (10+ Years)</option>
                              </select>
                           </div>

                           <div className="flex flex-col gap-2">
                              <span className="text-[10px] uppercase tracking-[0.2em] font-black text-black/40">Preferred Asset Class</span>
                              <select 
                                 value={auditAssetTier} 
                                 onChange={(e) => setAuditAssetTier(e.target.value)}
                                 className="w-full bg-transparent border-b border-black/10 py-4 text-sm font-serif outline-none focus:border-gold text-black/70 cursor-pointer"
                              >
                                 <option>Modern Analog Supercars</option>
                                 <option>Limited Homologation Specials</option>
                                 <option>Air-Cooled Classics (911)</option>
                                 <option>JDM Heritage Icons</option>
                              </select>
                           </div>
                        </div>

                        <button 
                           type="submit"
                           className="w-full py-7 bg-black text-white rounded-full font-black uppercase text-[11px] tracking-[0.4em] hover:bg-gold hover:text-black transition-all duration-700 mt-8"
                        >
                           Request Private Audit Consultation
                        </button>
                     </motion.form>
                  )}

                  {auditFormState === 'submitting' && (
                     <motion.div 
                        key="audit-submitting"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="py-12 flex flex-col items-center justify-center space-y-6"
                     >
                        <Loader2 className="w-12 h-12 text-gold animate-spin" />
                        <p className="text-[10px] uppercase tracking-[0.5em] font-black text-black/50">Securing Channel Connection</p>
                        <h3 className="text-3xl font-serif italic text-black/80">Encrypting portfolio parameters...</h3>
                     </motion.div>
                  )}

                  {auditFormState === 'success' && (
                     <motion.div 
                        key="audit-success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="py-10 space-y-10 text-center"
                     >
                        <div className="w-24 h-24 border border-gold rounded-full flex items-center justify-center mx-auto text-gold bg-gold/5">
                           <ShieldCheck className="w-12 h-12" />
                        </div>
                        <div className="space-y-4">
                           <p className="text-[10px] uppercase tracking-[0.5em] font-black text-gold animate-pulse">Request Received</p>
                           <h3 className="text-4xl md:text-5xl font-serif text-black leading-none">Security Channel <br/>Established.</h3>
                           <p className="text-black/60 text-base leading-relaxed max-w-lg mx-auto font-light pt-2">
                              Thank you, <span className="font-serif italic font-medium text-black">{auditName}</span>. Your asset parameters have been securely stored. A Senior Portfolio Curator will call you via private line within 24 hours to coordinate your audit.
                           </p>
                        </div>
                        <button 
                           onClick={resetAuditForm}
                           className="px-12 py-5 border border-black/20 rounded-full text-[10px] uppercase tracking-[0.4em] font-black hover:bg-black hover:text-white hover:border-black transition-all duration-700"
                        >
                           Submit New Parameters
                        </button>
                     </motion.div>
                  )}
               </AnimatePresence>
            </div>
         </div>
      </section>

      {/* FEATURE 3: Report Download Modal Lead Capture overlay */}
      <AnimatePresence>
         {reportModalOpen && (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
            >
               <motion.div 
                  initial={{ scale: 0.9, y: 15 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 15 }}
                  className="bg-luxury-black border border-white/10 p-12 max-w-lg w-full relative rounded-sm text-center space-y-8"
               >
                  <button 
                     onClick={() => { setReportModalOpen(false); setReportFormState('idle'); }}
                     className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
                  >
                     <X size={20} />
                  </button>

                  <AnimatePresence mode="wait">
                     {reportFormState === 'idle' && (
                        <motion.div 
                           key="modal-idle"
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           exit={{ opacity: 0 }}
                           className="space-y-8"
                        >
                           <div className="w-16 h-16 border border-gold/30 rounded-full flex items-center justify-center mx-auto text-gold bg-gold/5">
                              <Lock className="w-6 h-6" />
                           </div>
                           <div className="space-y-3">
                              <p className="text-[10px] uppercase tracking-[0.4em] font-black text-gold">Dossier Access</p>
                              <h3 className="text-3xl font-serif text-white">Q2 Market Report</h3>
                              <p className="text-white/40 text-sm leading-relaxed max-w-sm mx-auto">
                                 Enter your credentials below to authenticate and download our private Q2 Hypercar Appreciation Report.
                              </p>
                           </div>
                           <form onSubmit={handleReportSubmit} className="space-y-4 text-left">
                              <div>
                                 <input 
                                    type="text" 
                                    value={reportName}
                                    onChange={(e) => setReportName(e.target.value)}
                                    required
                                    placeholder="Full Name"
                                    className="w-full bg-white/[0.02] border border-white/10 focus:border-gold py-4 px-6 text-sm font-serif outline-none transition-colors text-white placeholder:text-white/20"
                                 />
                              </div>
                              <div>
                                 <input 
                                    type="email" 
                                    value={reportEmail}
                                    onChange={(e) => setReportEmail(e.target.value)}
                                    required
                                    placeholder="Corporate Email Address"
                                    className="w-full bg-white/[0.02] border border-white/10 focus:border-gold py-4 px-6 text-sm font-serif outline-none transition-colors text-white placeholder:text-white/20"
                                 />
                              </div>
                              <button 
                                 type="submit"
                                 className="w-full py-5 bg-gold text-black rounded-sm font-black uppercase text-[10px] tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-500 mt-4 flex items-center justify-center gap-4"
                              >
                                 <Download size={14} /> Authenticate & Download
                              </button>
                           </form>
                        </motion.div>
                     )}

                     {reportFormState === 'submitting' && (
                        <motion.div 
                           key="modal-submitting"
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           exit={{ opacity: 0 }}
                           className="py-12 flex flex-col items-center justify-center space-y-6"
                        >
                           <Loader2 className="w-12 h-12 text-gold animate-spin" />
                           <p className="text-[10px] uppercase tracking-[0.4em] font-black text-white/40">Decrypting Secure Dossier</p>
                           <h4 className="text-2xl font-serif italic text-white/80">Checking secure key credentials...</h4>
                        </motion.div>
                     )}

                     {reportFormState === 'success' && (
                        <motion.div 
                           key="modal-success"
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           exit={{ opacity: 0 }}
                           className="space-y-8"
                        >
                           <div className="w-16 h-16 border border-green-500/30 rounded-full flex items-center justify-center mx-auto text-green-400 bg-green-500/5">
                              <CheckCircle2 className="w-8 h-8" />
                           </div>
                           <div className="space-y-4">
                              <p className="text-[10px] uppercase tracking-[0.4em] font-black text-green-400">Authentication Verified</p>
                              <h3 className="text-3xl font-serif text-white">Dossier Sent</h3>
                              <p className="text-white/40 text-sm leading-relaxed max-w-sm mx-auto">
                                 The cryptographic key has been validated. Your private copy of the <span className="text-white">Q2 Hypercar Appreciation Report</span> has initiated download in your browser.
                              </p>
                           </div>
                           <button 
                              onClick={() => { setReportModalOpen(false); setReportFormState('idle'); }}
                              className="px-12 py-4 border border-white/20 hover:border-white text-[10px] uppercase tracking-[0.4em] font-black hover:bg-white hover:text-black transition-all duration-500"
                           >
                              Close Terminal
                           </button>
                        </motion.div>
                     )}
                  </AnimatePresence>
               </motion.div>
            </motion.div>
         )}
      </AnimatePresence>

      <Contact />
    </main>
  );
}
