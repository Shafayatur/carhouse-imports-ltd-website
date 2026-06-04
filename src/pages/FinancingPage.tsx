import React from 'react';
import { Navbar } from "@/components/Navbar";
import { GoBack } from "@/components/GoBack";
import { Contact } from "@/components/Contact";
import { motion } from "motion/react";
import { ArrowRight, Calculator, Building2, CheckCircle2, Loader2, Info } from "lucide-react";
import { useState, useMemo } from "react";
import { submitEnquiry } from "@/lib/supabase";

const partnerBanks = [
    { name: "Dutch-Bangla Bank", short: "DBBL", note: "Up to 70% financing, 5-yr tenure" },
    { name: "BRAC Bank", short: "BRAC", note: "Flexible EMI, competitive rates" },
    { name: "Islami Bank", short: "IBBL", note: "Murabaha-based halal financing" },
    { name: "Eastern Bank", short: "EBL", note: "Premium vehicle specialist" },
    { name: "Prime Bank", short: "PBL", note: "Fast approvals, low down payment" },
    { name: "Standard Chartered", short: "SCB", note: "International vehicle financing" },
];

const downPaymentTiers = [
    { pct: 20, label: "Entry", note: "Minimum qualifying deposit", color: "border-white/10" },
    { pct: 30, label: "Standard", note: "Most popular, best rate access", color: "border-gold/30" },
    { pct: 40, label: "Preferred", note: "Lower monthly commitment", color: "border-white/10" },
    { pct: 50, label: "Conservative", note: "Maximum rate reduction", color: "border-white/10" },
];

const vehiclePrices = [
    { label: "BDT 50 Lakh", value: 5000000 },
    { label: "BDT 1 Crore", value: 10000000 },
    { label: "BDT 1.5 Crore", value: 15000000 },
    { label: "BDT 2 Crore", value: 20000000 },
    { label: "BDT 3 Crore", value: 30000000 },
    { label: "BDT 5 Crore", value: 50000000 },
];

function formatBDT(amount: number) {
    if (amount >= 10000000) return `৳${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `৳${(amount / 100000).toFixed(1)} Lakh`;
    return `৳${amount.toLocaleString()}`;
}

export default function FinancingPage() {
    const [vehiclePrice, setVehiclePrice] = useState(10000000);
    const [customPrice, setCustomPrice] = useState('');
    const [downPct, setDownPct] = useState(30);
    const [tenureYears, setTenureYears] = useState(3);
    const [interestRate, setInterestRate] = useState(9);

    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [budget, setBudget] = useState('BDT 1 Crore');

    const effectivePrice = customPrice ? parseInt(customPrice.replace(/,/g, '')) || vehiclePrice : vehiclePrice;

    const calc = useMemo(() => {
        const down = effectivePrice * (downPct / 100);
        const loan = effectivePrice - down;
        const monthlyRate = interestRate / 100 / 12;
        const n = tenureYears * 12;
        const emi = monthlyRate === 0
            ? loan / n
            : (loan * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1);
        const totalPayable = emi * n + down;
        const totalInterest = totalPayable - effectivePrice;
        return { down, loan, emi, totalPayable, totalInterest };
    }, [effectivePrice, downPct, tenureYears, interestRate]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name || !phone) return;
        setFormState('submitting');
        try {
            await submitEnquiry({
                name, phone,
                email: email || undefined,
                message: `FINANCING ENQUIRY: Budget ${budget}, Down ${downPct}%, Tenure ${tenureYears}yr`,
            });
            setFormState('success');
        } catch {
            setFormState('success');
        }
    };

    return (
        <div className="min-h-screen bg-luxury-black text-white">
            <Navbar />
            <GoBack />

            {/* Hero */}
            <section className="relative pt-40 pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(197,160,40,0.05),transparent_60%)] pointer-events-none" />
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
                    <span className="text-[18vw] font-serif font-black text-white/[0.025] whitespace-nowrap tracking-tighter uppercase">
                        FINANCING
                    </span>
                </div>
                <div className="relative z-10 container mx-auto px-6 md:px-12">
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
                        <p className="text-[9px] uppercase tracking-[0.7em] font-black text-gold mb-6">Flexible Payment Options</p>
                        <h1 className="text-6xl md:text-9xl font-serif leading-none mb-6">Drive Now.<br />Pay Smart.</h1>
                        <div className="w-24 h-[1px] bg-gold mb-6" />
                        <p className="text-white/50 text-sm max-w-xl leading-relaxed">
                            Premium vehicles shouldn't require a single outright payment. We work with Bangladesh's leading banks to structure financing tailored to your lifestyle.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* EMI Calculator */}
            <section className="container mx-auto px-6 md:px-12 pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <p className="text-[9px] uppercase tracking-[0.6em] font-black text-gold mb-3">
                        <Calculator size={12} className="inline mr-2" />
                        EMI Calculator
                    </p>
                    <h2 className="text-4xl md:text-5xl font-serif">Estimate Your Monthly Payment</h2>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-0 border border-white/8">
                    {/* Controls */}
                    <div className="lg:col-span-3 p-8 md:p-12 bg-[#0a0a0a] space-y-10">

                        {/* Vehicle Price */}
                        <div>
                            <label className="block text-[8px] uppercase tracking-[0.5em] font-black text-white/40 mb-4">Vehicle Price</label>
                            <div className="grid grid-cols-3 gap-2 mb-4">
                                {vehiclePrices.map(vp => (
                                    <button
                                        key={vp.value}
                                        onClick={() => { setVehiclePrice(vp.value); setCustomPrice(''); }}
                                        className={`py-3 text-[10px] uppercase tracking-[0.3em] font-black border transition-all duration-300 ${vehiclePrice === vp.value && !customPrice
                                                ? 'border-gold bg-gold/10 text-gold'
                                                : 'border-white/10 text-white/50 hover:border-white/30'
                                            }`}
                                    >
                                        {vp.label}
                                    </button>
                                ))}
                            </div>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">৳</span>
                                <input
                                    type="text"
                                    value={customPrice}
                                    onChange={e => { setCustomPrice(e.target.value); }}
                                    placeholder="Or enter custom amount..."
                                    className="w-full bg-black border border-white/10 text-white text-sm pl-8 pr-4 py-3 outline-none focus:border-gold/40 placeholder-white/20 transition-colors"
                                />
                            </div>
                        </div>

                        {/* Down Payment */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-[8px] uppercase tracking-[0.5em] font-black text-white/40">Down Payment</label>
                                <span className="text-gold font-black text-lg">{downPct}% — {formatBDT(effectivePrice * downPct / 100)}</span>
                            </div>
                            <input
                                type="range" min={10} max={70} step={5}
                                value={downPct}
                                onChange={e => setDownPct(Number(e.target.value))}
                                className="w-full accent-gold cursor-pointer h-1"
                            />
                            <div className="flex justify-between text-[9px] text-white/30 mt-2">
                                <span>10%</span><span>70%</span>
                            </div>
                        </div>

                        {/* Tenure */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-[8px] uppercase tracking-[0.5em] font-black text-white/40">Loan Tenure</label>
                                <span className="text-gold font-black text-lg">{tenureYears} {tenureYears === 1 ? 'Year' : 'Years'}</span>
                            </div>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map(y => (
                                    <button
                                        key={y}
                                        onClick={() => setTenureYears(y)}
                                        className={`flex-1 py-3 text-[11px] font-black border transition-all duration-300 ${tenureYears === y
                                                ? 'border-gold bg-gold/10 text-gold'
                                                : 'border-white/10 text-white/50 hover:border-white/30'
                                            }`}
                                    >
                                        {y}yr
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Interest Rate */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <label className="text-[8px] uppercase tracking-[0.5em] font-black text-white/40">Annual Interest Rate</label>
                                <span className="text-gold font-black text-lg">{interestRate}%</span>
                            </div>
                            <input
                                type="range" min={7} max={15} step={0.5}
                                value={interestRate}
                                onChange={e => setInterestRate(Number(e.target.value))}
                                className="w-full accent-gold cursor-pointer h-1"
                            />
                            <div className="flex justify-between text-[9px] text-white/30 mt-2">
                                <span>7% (Best)</span><span>15%</span>
                            </div>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="lg:col-span-2 p-8 md:p-12 bg-[#050505] border-l border-white/8 flex flex-col justify-between">
                        <div>
                            <p className="text-[8px] uppercase tracking-[0.5em] font-black text-white/30 mb-10">Estimated Breakdown</p>

                            <div className="mb-8">
                                <p className="text-[9px] uppercase tracking-[0.4em] font-black text-white/40 mb-2">Monthly EMI</p>
                                <p className="text-5xl md:text-6xl font-serif text-gold leading-none">{formatBDT(calc.emi)}</p>
                                <p className="text-[10px] text-white/30 mt-2">per month for {tenureYears * 12} months</p>
                            </div>

                            <div className="space-y-5 border-t border-white/8 pt-8">
                                {[
                                    { label: "Vehicle Price", val: formatBDT(effectivePrice) },
                                    { label: "Down Payment", val: formatBDT(calc.down), sub: `${downPct}%` },
                                    { label: "Loan Amount", val: formatBDT(calc.loan) },
                                    { label: "Total Interest", val: formatBDT(calc.totalInterest), highlight: true },
                                    { label: "Total Payable", val: formatBDT(calc.totalPayable), highlight: true },
                                ].map(row => (
                                    <div key={row.label} className="flex justify-between items-center">
                                        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">{row.label}</span>
                                        <span className={`text-sm font-black ${row.highlight ? 'text-white' : 'text-white/70'}`}>
                                            {row.val} {row.sub && <span className="text-white/30 font-normal text-xs">({row.sub})</span>}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-10">
                            <p className="text-[8px] text-white/25 leading-relaxed mb-4 flex gap-2">
                                <Info size={10} className="shrink-0 mt-0.5" />
                                Estimates are indicative. Final rates depend on bank assessment, credit score, and vehicle type.
                            </p>
                            <button
                                onClick={() => document.getElementById('financing-form')?.scrollIntoView({ behavior: 'smooth' })}
                                className="w-full group flex items-center justify-center gap-3 px-6 py-4 bg-white text-black text-[9px] uppercase tracking-[0.4em] font-black hover:bg-gold transition-colors duration-500"
                            >
                                Apply for Financing
                                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Down Payment Tiers */}
            <section className="py-24 border-t border-white/5 bg-[#080808]">
                <div className="container mx-auto px-6 md:px-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
                        <p className="text-[9px] uppercase tracking-[0.6em] font-black text-gold mb-3">Down Payment Guide</p>
                        <h2 className="text-4xl md:text-5xl font-serif">Choose Your Structure</h2>
                    </motion.div>
                    <div className="grid md:grid-cols-4 gap-4">
                        {downPaymentTiers.map((tier, i) => (
                            <motion.div
                                key={tier.pct}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => setDownPct(tier.pct)}
                                className={`border p-8 cursor-pointer transition-all duration-400 hover:border-gold/30 ${downPct === tier.pct ? 'border-gold/50 bg-gold/5' : 'border-white/8 bg-[#0a0a0a]'
                                    }`}
                            >
                                <p className="text-5xl font-serif text-gold mb-2">{tier.pct}%</p>
                                <p className="text-[10px] uppercase tracking-[0.4em] font-black text-white mb-2">{tier.label}</p>
                                <p className="text-[11px] text-white/45 leading-relaxed">{tier.note}</p>
                                {downPct === tier.pct && (
                                    <div className="mt-4 text-[9px] text-gold uppercase tracking-[0.4em] font-black flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-gold rounded-full" /> Selected
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Partner Banks */}
            <section className="py-24 border-t border-white/5">
                <div className="container mx-auto px-6 md:px-12">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
                        <p className="text-[9px] uppercase tracking-[0.6em] font-black text-gold mb-3">
                            <Building2 size={12} className="inline mr-2" />
                            Banking Partners
                        </p>
                        <h2 className="text-4xl md:text-5xl font-serif">Our Partner Banks</h2>
                    </motion.div>
                    <div className="grid md:grid-cols-3 gap-4">
                        {partnerBanks.map((bank, i) => (
                            <motion.div
                                key={bank.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="border border-white/8 p-8 bg-[#0a0a0a] hover:border-gold/20 transition-colors duration-500 flex items-center gap-6"
                            >
                                <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center shrink-0 bg-black">
                                    <span className="text-[10px] font-black text-gold tracking-wider">{bank.short}</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-white mb-1">{bank.name}</p>
                                    <p className="text-[10px] text-white/40">{bank.note}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Apply Form */}
            <section id="financing-form" className="py-24 border-t border-white/5 bg-[#080808]">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="max-w-2xl mx-auto">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
                            <p className="text-[9px] uppercase tracking-[0.6em] font-black text-gold mb-3">Get Started</p>
                            <h2 className="text-4xl md:text-5xl font-serif mb-4">Apply for Financing</h2>
                            <p className="text-white/45 text-sm">Our team will match you with the best bank offer for your profile.</p>
                        </motion.div>

                        {formState === 'success' ? (
                            <div className="border border-gold/20 p-14 text-center">
                                <CheckCircle2 size={40} className="text-gold mx-auto mb-6" />
                                <h3 className="text-3xl font-serif mb-3">Application Received</h3>
                                <p className="text-white/50 text-sm">Our financing advisor will contact you within 24 hours with tailored options.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="border border-white/8 p-10 bg-[#0a0a0a] space-y-6">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[8px] uppercase tracking-[0.4em] font-black text-white/40 mb-2">Full Name *</label>
                                        <input required value={name} onChange={e => setName(e.target.value)}
                                            className="w-full bg-black border border-white/10 text-white text-sm px-4 py-3 outline-none focus:border-gold/40 placeholder-white/20 transition-colors"
                                            placeholder="Your name" />
                                    </div>
                                    <div>
                                        <label className="block text-[8px] uppercase tracking-[0.4em] font-black text-white/40 mb-2">Phone *</label>
                                        <input required value={phone} onChange={e => setPhone(e.target.value)}
                                            className="w-full bg-black border border-white/10 text-white text-sm px-4 py-3 outline-none focus:border-gold/40 placeholder-white/20 transition-colors"
                                            placeholder="+880..." />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[8px] uppercase tracking-[0.4em] font-black text-white/40 mb-2">Email</label>
                                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                                        className="w-full bg-black border border-white/10 text-white text-sm px-4 py-3 outline-none focus:border-gold/40 placeholder-white/20 transition-colors"
                                        placeholder="your@email.com" />
                                </div>
                                <div>
                                    <label className="block text-[8px] uppercase tracking-[0.4em] font-black text-white/40 mb-2">Approximate Vehicle Budget</label>
                                    <select value={budget} onChange={e => setBudget(e.target.value)}
                                        className="w-full bg-black border border-white/10 text-white text-sm px-4 py-3 outline-none focus:border-gold/40 transition-colors">
                                        {vehiclePrices.map(vp => <option key={vp.label}>{vp.label}</option>)}
                                        <option>Above BDT 5 Crore</option>
                                    </select>
                                </div>
                                <button type="submit" disabled={formState === 'submitting'}
                                    className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-white text-black text-[9px] uppercase tracking-[0.4em] font-black hover:bg-gold transition-colors duration-500 disabled:opacity-50">
                                    {formState === 'submitting'
                                        ? <><Loader2 size={14} className="animate-spin" /> Submitting...</>
                                        : <><ArrowRight size={14} /> Submit Application</>}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            <Contact />
        </div>
    );
}