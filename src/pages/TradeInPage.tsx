import React from 'react';
import { Navbar } from "@/components/Navbar";
import { GoBack } from "@/components/GoBack";
import { Contact } from "@/components/Contact";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Car, ClipboardList, BadgeCheck, Loader2, CheckCircle2, ChevronRight } from "lucide-react";
import { useState } from "react";
import { submitEnquiry } from "@/lib/supabase";

const steps = [
    { icon: <ClipboardList size={20} className="text-gold" />, title: "Submit Details", desc: "Tell us about your current vehicle — make, model, year, mileage, and condition." },
    { icon: <Car size={20} className="text-gold" />, title: "We Assess", desc: "Our team reviews your submission and cross-references current market valuations within 24 hours." },
    { icon: <BadgeCheck size={20} className="text-gold" />, title: "Receive Offer", desc: "A transparent, no-obligation offer is presented. Use it as full or partial payment toward your next acquisition." },
];

const conditions = [
    { value: "pristine", label: "Pristine", desc: "Garage kept, no scratches, single owner, full service history" },
    { value: "excellent", label: "Excellent", desc: "Minor wear only, fully serviced, clean title" },
    { value: "good", label: "Good", desc: "Regular use, some cosmetic wear, maintained" },
    { value: "fair", label: "Fair", desc: "Visible wear, may need work, still running" },
];

const makes = ["BMW", "Mercedes-Benz", "Audi", "Porsche", "Toyota", "Lexus", "Land Rover", "Jaguar", "Ferrari", "Lamborghini", "Bentley", "Rolls-Royce", "Other"];

const faqs = [
    { q: "Do I need to bring the car in person?", a: "Not for the initial assessment. We evaluate based on your submission. If we proceed, a physical inspection will be arranged at our showroom or your location." },
    { q: "How long does the offer remain valid?", a: "Our offers are valid for 14 days from the date of issue, subject to vehicle condition not changing." },
    { q: "Can I trade in a financed vehicle?", a: "Yes. If your vehicle has an outstanding loan, we will handle the settlement process. The residual equity is applied to your new purchase." },
    { q: "Do you accept all vehicle types?", a: "We primarily accept premium and luxury vehicles. Standard economy vehicles may not qualify for our programme — contact us to confirm." },
];

type FormStep = 'details' | 'condition' | 'contact' | 'success';

export default function TradeInPage() {
    const [step, setStep] = useState<FormStep>('details');

    // Vehicle details
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [mileage, setMileage] = useState('');
    const [condition, setCondition] = useState('');
    const [notes, setNotes] = useState('');

    // Contact
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [formState, setFormState] = useState<'idle' | 'submitting'>('idle');

    const handleDetailsNext = (e: React.FormEvent) => {
        e.preventDefault();
        if (!make || !model || !year) return;
        setStep('condition');
    };

    const handleConditionNext = (e: React.FormEvent) => {
        e.preventDefault();
        if (!condition) return;
        setStep('contact');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name || !phone) return;
        setFormState('submitting');
        try {
            await submitEnquiry({
                name, phone,
                email: email || undefined,
                message: `TRADE-IN: ${year} ${make} ${model} | ${mileage || 'N/A'} km | Condition: ${condition}${notes ? ` | Notes: ${notes}` : ''}`,
            });
        } catch { /* fallthrough */ }
        setStep('success');
    };

    const stepIndex = { details: 0, condition: 1, contact: 2, success: 3 }[step];

    const years = Array.from({ length: 30 }, (_, i) => String(2025 - i));

    return (
        <div className="min-h-screen bg-luxury-black text-white">
            <Navbar />
            {/* Hero */}
            <section className="relative h-[60vw] min-h-[320px] md:h-[75vh] lg:h-[85vh] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/images/trade-in.jpg"
                        alt="Trade-In Programme"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/90 via-luxury-black/30 to-luxury-black/40" />
                </div>
                <GoBack className="absolute top-24 left-6 md:left-12 z-20 pt-0 pb-0" />
                <div className="absolute bottom-0 left-0 right-0 z-10 container mx-auto px-6 md:px-12 pb-12">
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}>
                        <p className="text-[9px] uppercase tracking-[0.7em] font-black text-gold mb-6">Exchange Programme</p>
                        <h1 className="text-6xl md:text-9xl font-serif leading-none mb-6">Exchange<br />Your Car.</h1>
                        <div className="w-24 h-[1px] bg-gold mb-6" />
                        <p className="text-white/50 text-sm max-w-xl leading-relaxed">
                            Your current vehicle has value. Let us assess it fairly and apply it directly toward the acquisition of something exceptional.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* How It Works */}
            <section className="container mx-auto px-6 md:px-12 pb-24">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
                    <p className="text-[9px] uppercase tracking-[0.6em] font-black text-gold mb-3">Process</p>
                    <h2 className="text-4xl md:text-5xl font-serif">How It Works</h2>
                </motion.div>
                <div className="grid md:grid-cols-3 gap-0">
                    {steps.map((s, i) => (
                        <motion.div
                            key={s.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15 }}
                            className="border border-white/8 p-10 bg-[#0a0a0a] relative group hover:border-gold/20 transition-colors duration-500"
                        >
                            <div className="absolute top-8 right-8 text-[60px] font-serif text-white/[0.04] leading-none select-none">
                                {i + 1}
                            </div>
                            <div className="mb-5">{s.icon}</div>
                            <h3 className="text-xl font-serif mb-3">{s.title}</h3>
                            <p className="text-[11px] text-white/45 leading-relaxed">{s.desc}</p>
                            {i < steps.length - 1 && (
                                <ChevronRight size={16} className="absolute -right-2 top-1/2 -translate-y-1/2 text-gold z-10 hidden md:block" />
                            )}
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Multi-Step Form */}
            <section className="py-24 border-t border-white/5 bg-[#080808]">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="max-w-2xl mx-auto">

                        {/* Step Indicator */}
                        {step !== 'success' && (
                            <div className="flex items-center gap-0 mb-14">
                                {['Vehicle Details', 'Condition', 'Your Contact'].map((label, i) => (
                                    <div key={label} className="flex items-center flex-1">
                                        <div className={`flex items-center gap-3 ${i < stepIndex ? 'opacity-100' : i === stepIndex ? 'opacity-100' : 'opacity-30'}`}>
                                            <div className={`w-7 h-7 rounded-full border flex items-center justify-center text-[10px] font-black transition-all duration-300 ${i < stepIndex ? 'bg-gold border-gold text-black' : i === stepIndex ? 'border-gold text-gold' : 'border-white/20 text-white/30'
                                                }`}>
                                                {i < stepIndex ? '✓' : i + 1}
                                            </div>
                                            <span className="text-[9px] uppercase tracking-[0.4em] font-black hidden sm:block">{label}</span>
                                        </div>
                                        {i < 2 && <div className={`flex-1 h-[1px] mx-3 transition-colors duration-300 ${i < stepIndex ? 'bg-gold' : 'bg-white/10'}`} />}
                                    </div>
                                ))}
                            </div>
                        )}

                        <AnimatePresence mode="wait">

                            {/* Step 1 — Vehicle Details */}
                            {step === 'details' && (
                                <motion.form
                                    key="details"
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -30 }}
                                    transition={{ duration: 0.4 }}
                                    onSubmit={handleDetailsNext}
                                    className="border border-white/8 p-10 bg-[#0a0a0a] space-y-6"
                                >
                                    <div>
                                        <p className="text-[9px] uppercase tracking-[0.6em] font-black text-gold mb-1">Step 1 of 3</p>
                                        <h3 className="text-3xl font-serif mb-2">Tell Us About Your Car</h3>
                                        <p className="text-white/40 text-[11px]">Basic details help us provide an accurate initial assessment.</p>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[8px] uppercase tracking-[0.4em] font-black text-white/40 mb-2">Make *</label>
                                            <select required value={make} onChange={e => setMake(e.target.value)}
                                                className="w-full bg-black border border-white/10 text-white text-sm px-4 py-3 outline-none focus:border-gold/40 transition-colors">
                                                <option value="">Select make...</option>
                                                {makes.map(m => <option key={m}>{m}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-[8px] uppercase tracking-[0.4em] font-black text-white/40 mb-2">Model *</label>
                                            <input required value={model} onChange={e => setModel(e.target.value)}
                                                className="w-full bg-black border border-white/10 text-white text-sm px-4 py-3 outline-none focus:border-gold/40 placeholder-white/20 transition-colors"
                                                placeholder="e.g. 3 Series, Civic..." />
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[8px] uppercase tracking-[0.4em] font-black text-white/40 mb-2">Year *</label>
                                            <select required value={year} onChange={e => setYear(e.target.value)}
                                                className="w-full bg-black border border-white/10 text-white text-sm px-4 py-3 outline-none focus:border-gold/40 transition-colors">
                                                <option value="">Select year...</option>
                                                {years.map(y => <option key={y}>{y}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-[8px] uppercase tracking-[0.4em] font-black text-white/40 mb-2">Mileage (km)</label>
                                            <input value={mileage} onChange={e => setMileage(e.target.value)}
                                                className="w-full bg-black border border-white/10 text-white text-sm px-4 py-3 outline-none focus:border-gold/40 placeholder-white/20 transition-colors"
                                                placeholder="e.g. 45,000" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-[8px] uppercase tracking-[0.4em] font-black text-white/40 mb-2">Additional Notes</label>
                                        <textarea rows={3} value={notes} onChange={e => setNotes(e.target.value)}
                                            className="w-full bg-black border border-white/10 text-white text-sm px-4 py-3 outline-none focus:border-gold/40 placeholder-white/20 transition-colors resize-none"
                                            placeholder="Modifications, service history, any known issues..." />
                                    </div>

                                    <button type="submit"
                                        className="w-full group flex items-center justify-center gap-3 px-8 py-4 bg-white text-black text-[9px] uppercase tracking-[0.4em] font-black hover:bg-gold transition-colors duration-500">
                                        Continue <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </motion.form>
                            )}

                            {/* Step 2 — Condition */}
                            {step === 'condition' && (
                                <motion.form
                                    key="condition"
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -30 }}
                                    transition={{ duration: 0.4 }}
                                    onSubmit={handleConditionNext}
                                    className="border border-white/8 p-10 bg-[#0a0a0a] space-y-6"
                                >
                                    <div>
                                        <p className="text-[9px] uppercase tracking-[0.6em] font-black text-gold mb-1">Step 2 of 3</p>
                                        <h3 className="text-3xl font-serif mb-2">Describe the Condition</h3>
                                        <p className="text-white/40 text-[11px]">Be as accurate as possible. Honest descriptions lead to better, faster offers.</p>
                                    </div>

                                    <div className="space-y-3">
                                        {conditions.map(c => (
                                            <button
                                                key={c.value}
                                                type="button"
                                                onClick={() => setCondition(c.value)}
                                                className={`w-full text-left p-5 border transition-all duration-300 ${condition === c.value
                                                    ? 'border-gold bg-gold/5'
                                                    : 'border-white/8 hover:border-white/20'
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="text-sm font-bold text-white mb-1">{c.label}</p>
                                                        <p className="text-[11px] text-white/45">{c.desc}</p>
                                                    </div>
                                                    <div className={`w-5 h-5 rounded-full border-2 shrink-0 ml-4 transition-colors ${condition === c.value ? 'border-gold bg-gold' : 'border-white/20'
                                                        }`} />
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    <div className="flex gap-3">
                                        <button type="button" onClick={() => setStep('details')}
                                            className="flex-1 py-4 border border-white/10 text-white text-[9px] uppercase tracking-[0.4em] font-black hover:border-white/30 transition-colors">
                                            Back
                                        </button>
                                        <button type="submit" disabled={!condition}
                                            className="flex-1 group flex items-center justify-center gap-3 py-4 bg-white text-black text-[9px] uppercase tracking-[0.4em] font-black hover:bg-gold transition-colors duration-500 disabled:opacity-30">
                                            Continue <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </motion.form>
                            )}

                            {/* Step 3 — Contact */}
                            {step === 'contact' && (
                                <motion.form
                                    key="contact"
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -30 }}
                                    transition={{ duration: 0.4 }}
                                    onSubmit={handleSubmit}
                                    className="border border-white/8 p-10 bg-[#0a0a0a] space-y-6"
                                >
                                    <div>
                                        <p className="text-[9px] uppercase tracking-[0.6em] font-black text-gold mb-1">Step 3 of 3</p>
                                        <h3 className="text-3xl font-serif mb-2">Your Contact Details</h3>
                                        <p className="text-white/40 text-[11px]">We'll use these to send your valuation offer within 24 hours.</p>
                                    </div>

                                    {/* Summary */}
                                    <div className="bg-black border border-white/8 p-5 space-y-2">
                                        <p className="text-[8px] uppercase tracking-[0.4em] font-black text-white/30 mb-3">Your Submission Summary</p>
                                        {[
                                            { label: "Vehicle", val: `${year} ${make} ${model}` },
                                            { label: "Mileage", val: mileage ? `${mileage} km` : 'Not specified' },
                                            { label: "Condition", val: conditions.find(c => c.value === condition)?.label || '' },
                                        ].map(row => (
                                            <div key={row.label} className="flex justify-between">
                                                <span className="text-[10px] text-white/30">{row.label}</span>
                                                <span className="text-[10px] text-white/70 font-bold">{row.val}</span>
                                            </div>
                                        ))}
                                    </div>

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

                                    <div className="flex gap-3">
                                        <button type="button" onClick={() => setStep('condition')}
                                            className="flex-1 py-4 border border-white/10 text-white text-[9px] uppercase tracking-[0.4em] font-black hover:border-white/30 transition-colors">
                                            Back
                                        </button>
                                        <button type="submit" disabled={formState === 'submitting'}
                                            className="flex-1 group flex items-center justify-center gap-3 py-4 bg-white text-black text-[9px] uppercase tracking-[0.4em] font-black hover:bg-gold transition-colors duration-500 disabled:opacity-50">
                                            {formState === 'submitting'
                                                ? <><Loader2 size={14} className="animate-spin" /> Submitting...</>
                                                : <><ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" /> Get My Valuation</>}
                                        </button>
                                    </div>
                                </motion.form>
                            )}

                            {/* Success */}
                            {step === 'success' && (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6 }}
                                    className="border border-gold/20 p-14 text-center bg-[#0a0a0a]"
                                >
                                    <CheckCircle2 size={48} className="text-gold mx-auto mb-6" />
                                    <h3 className="text-4xl font-serif mb-3">Submission Received</h3>
                                    <p className="text-white/50 text-sm leading-relaxed max-w-sm mx-auto mb-4">
                                        Our team is reviewing your {year} {make} {model}. You'll receive a valuation offer within <strong className="text-white">24 hours</strong>.
                                    </p>
                                    <p className="text-[9px] uppercase tracking-[0.4em] text-white/30">
                                        Expect contact via phone or email
                                    </p>
                                    <button
                                        onClick={() => { setStep('details'); setMake(''); setModel(''); setYear(''); setMileage(''); setCondition(''); setNotes(''); setName(''); setPhone(''); setEmail(''); setFormState('idle'); }}
                                        className="mt-10 text-[9px] uppercase tracking-[0.4em] font-black text-gold hover:text-white transition-colors"
                                    >
                                        Submit Another Vehicle
                                    </button>
                                </motion.div>
                            )}

                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* FAQs */}
            <section className="py-24 border-t border-white/5">
                <div className="container mx-auto px-6 md:px-12 max-w-3xl">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
                        <p className="text-[9px] uppercase tracking-[0.6em] font-black text-gold mb-3">Common Questions</p>
                        <h2 className="text-4xl md:text-5xl font-serif">Trade-In FAQ</h2>
                    </motion.div>
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                className="border border-white/8 p-8 bg-[#0a0a0a]"
                            >
                                <p className="font-bold text-white mb-2 text-sm">{faq.q}</p>
                                <p className="text-[11px] text-white/50 leading-relaxed">{faq.a}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Contact />
        </div>
    );
}