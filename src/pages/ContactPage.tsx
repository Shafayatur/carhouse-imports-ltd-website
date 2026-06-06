import React from 'react';
import { Navbar } from "@/components/Navbar";
import { GoBack } from "@/components/GoBack";
import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock, Instagram, Twitter, Linkedin, Youtube, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { submitEnquiry } from "@/lib/supabase";
import { useSiteSettings } from "@/hooks/useSupabase";



const faqs = [
    { q: "Do I need an appointment to visit the showroom?", a: "Walk-ins are welcome during business hours, but we strongly recommend booking ahead for a private consultation to ensure a dedicated advisor is available." },
    { q: "Can I arrange a viewing outside business hours?", a: "Yes. Private after-hours viewings are available for serious buyers. Contact us directly to arrange." },
    { q: "How quickly do you respond to enquiries?", a: "All enquiries submitted via our website receive a response within 2–4 business hours. Urgent matters can be directed to our concierge line." },
];

export default function ContactPage() {
    const { get } = useSiteSettings();

    const offices = [
        {
            city: "Dhaka",
            label: "Headquarters & Showroom",
            address: get("contact_dhaka_address", "Tajmahal Road, Mohammadpur\nDhaka 1207, Bangladesh"),
            phone: get("phone", "+880 1XXX XXX XXX"),
            email: get("email", "dhaka@carhouse.uk"),
            hours: get("business_hours", "Sat–Thu: 10:00 AM – 7:00 PM\nFriday: Closed"),
            mapEmbed: get("contact_map_embed", "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1182.6922972992618!2d90.36140376934057!3d23.764929715496674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c188ae9e047f%3A0x83620924e5180839!5e0!3m2!1sen!2sbd!4v1780570726202!5m2!1sen!2sbd"),
            primary: true,
        },
        {
            city: "London",
            label: "European Liaison Office",
            address: get("contact_london_address", "Mayfair District\nLondon, United Kingdom"),
            phone: get("contact_london_phone", "+44 20 XXXX XXXX"),
            email: get("contact_london_email", "london@carhouse.uk"),
            hours: get("contact_london_hours", "Mon–Fri: 9:00 AM – 6:00 PM\nWeekends: By Appointment"),
            mapEmbed: null,
            primary: false,
        },
        {
            city: "Dubai",
            label: "Middle East Office",
            address: get("contact_dubai_address", "Business Bay\nDubai, UAE"),
            phone: get("contact_dubai_phone", "+971 4 XXX XXXX"),
            email: get("contact_dubai_email", "dubai@carhouse.uk"),
            hours: get("contact_dubai_hours", "Sun–Thu: 9:00 AM – 6:00 PM\nFriday–Saturday: Closed"),
            mapEmbed: null,
            primary: false,
        },
    ];

    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name || !phone) return;
        setFormState('submitting');
        try {
            await submitEnquiry({ name, phone, email: email || undefined, message: message || undefined });
            setFormState('success');
        } catch {
            setFormState('success');
        }
    };

    return (
        <div className="min-h-screen bg-luxury-black text-white">
            <Navbar />
            {/* Hero */}
            <section className="relative h-[60vw] min-h-[320px] md:h-[75vh] lg:h-[85vh] overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/images/contact.jpg"
                        alt="Contact Car House"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/90 via-luxury-black/30 to-luxury-black/40" />
                </div>
                <GoBack className="absolute top-24 left-6 md:left-12 z-20 pt-0 pb-0" />
                <div className="absolute bottom-0 left-0 right-0 z-10 container mx-auto px-6 md:px-12 pb-12">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <p className="text-[9px] uppercase tracking-[0.7em] font-black text-gold mb-6">
                            Get in Touch
                        </p>
                        <h1 className="text-6xl md:text-9xl font-serif leading-none mb-6">
                            Let's Talk
                        </h1>
                        <div className="w-24 h-[1px] bg-gold mb-6" />
                        <p className="text-white/50 text-sm max-w-xl leading-relaxed">
                            Whether you're searching for a specific vehicle, exploring our collection, or simply curious — our team is ready to assist.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Primary Office — Full Detail */}
            <section className="container mx-auto px-6 md:px-12 pb-24">
                <div className="grid lg:grid-cols-2 gap-0 border border-white/8">
                    {/* Map */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="relative min-h-[400px] lg:min-h-[560px] overflow-hidden"
                    >
                        <a
                            href="https://www.google.com/maps?q=Tajmahal+Road+Mohammadpur+Dhaka"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute inset-0"
                        >
                            <img
                                src={`https://maps.geoapify.com/v1/staticmap?style=dark-matter&width=800&height=600&center=lonlat:90.362,23.765&zoom=16&marker=lonlat:90.362,23.765;color:%23C5A028;size:medium&apiKey=a3e0b1c2d4e5f6a7b8c9d0e1f2a3b4c5`}
                                alt="Showroom map"
                                className="w-full h-full object-cover"
                                onError={(e) => { e.currentTarget.src = "https://placehold.co/800x600/0a0a0a/C5A028?text=Tajmahal+Road%0ADhaka+Showroom"; }}
                            />
                        </a>
                        <div className="absolute inset-0 bg-luxury-black/20 pointer-events-none" />
                        <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-sm border border-white/10 px-4 py-3">
                            <p className="text-[8px] uppercase tracking-[0.5em] font-black text-gold">Showroom</p>
                            <p className="text-xs text-white mt-1">Tajmahal Road, Dhaka</p>
                        </div>
                    </motion.div>

                    {/* Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="p-10 md:p-14 bg-[#0a0a0a] flex flex-col justify-center"
                    >
                        <p className="text-[8px] uppercase tracking-[0.6em] font-black text-gold mb-2">{offices[0].label}</p>
                        <h2 className="text-4xl font-serif mb-10">{offices[0].city}</h2>

                        <div className="space-y-7">
                            <div className="flex gap-4">
                                <MapPin size={16} className="text-gold shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.4em] font-black text-white/40 mb-1">Address</p>
                                    <p className="text-sm text-white/70 leading-relaxed whitespace-pre-line">{offices[0].address}</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Phone size={16} className="text-gold shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.4em] font-black text-white/40 mb-1">Phone</p>
                                    <a href={`tel:${offices[0].phone}`} className="text-sm text-white/70 hover:text-gold transition-colors">{offices[0].phone}</a>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Mail size={16} className="text-gold shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.4em] font-black text-white/40 mb-1">Email</p>
                                    <a href={`mailto:${offices[0].email}`} className="text-sm text-white/70 hover:text-gold transition-colors">{offices[0].email}</a>
                                    <br />
                                    <a href="mailto:concierge@carhouse.uk" className="text-sm text-white/70 hover:text-gold transition-colors">concierge@carhouse.uk</a>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Clock size={16} className="text-gold shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.4em] font-black text-white/40 mb-1">Opening Hours</p>
                                    <p className="text-sm text-white/70 leading-relaxed whitespace-pre-line">{offices[0].hours}</p>
                                </div>
                            </div>
                        </div>

                        <a
                            href={`https://www.google.com/maps?q=Tajmahal+Road+Playground+Dhaka`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-10 group flex items-center gap-3 text-[9px] uppercase tracking-[0.4em] font-black text-gold hover:text-white transition-colors"
                        >
                            Get Directions
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* Other Offices */}
            <section className="container mx-auto px-6 md:px-12 pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-10"
                >
                    <p className="text-[9px] uppercase tracking-[0.6em] font-black text-gold mb-3">Global Presence</p>
                    <h2 className="text-4xl md:text-5xl font-serif">Other Offices</h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-6">
                    {offices.slice(1).map((office, i) => (
                        <motion.div
                            key={office.city}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="border border-white/8 p-10 bg-[#0a0a0a] hover:border-gold/20 transition-colors duration-500"
                        >
                            <p className="text-[8px] uppercase tracking-[0.6em] font-black text-gold mb-1">{office.label}</p>
                            <h3 className="text-3xl font-serif mb-7">{office.city}</h3>
                            <div className="space-y-4">
                                <div className="flex gap-3 items-start">
                                    <MapPin size={13} className="text-gold shrink-0 mt-0.5" />
                                    <p className="text-[11px] text-white/60 whitespace-pre-line">{office.address}</p>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <Phone size={13} className="text-gold shrink-0" />
                                    <p className="text-[11px] text-white/60">{office.phone}</p>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <Mail size={13} className="text-gold shrink-0" />
                                    <a href={`mailto:${office.email}`} className="text-[11px] text-white/60 hover:text-gold transition-colors">{office.email}</a>
                                </div>
                                <div className="flex gap-3 items-start">
                                    <Clock size={13} className="text-gold shrink-0 mt-0.5" />
                                    <p className="text-[11px] text-white/60 whitespace-pre-line">{office.hours}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Contact Form */}
            <section className="py-24 border-t border-white/5 bg-[#080808]">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <p className="text-[9px] uppercase tracking-[0.6em] font-black text-gold mb-4">Write to Us</p>
                            <h2 className="text-5xl font-serif leading-none mb-6">Send a Message</h2>
                            <div className="w-12 h-[1px] bg-gold mb-8" />
                            <p className="text-white/50 text-sm leading-relaxed mb-10">
                                For vehicle enquiries, private consultations, or general questions — fill in the form and a dedicated advisor will reach out within a few hours.
                            </p>

                            <div className="space-y-4">
                                {faqs.map((f, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 10 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="border border-white/8 p-6"
                                    >
                                        <p className="text-[11px] font-bold text-white mb-2">{f.q}</p>
                                        <p className="text-[11px] text-white/50 leading-relaxed">{f.a}</p>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="flex gap-4 mt-10">
                                {[
                                    { icon: <Instagram size={16} />, href: "https://instagram.com/carhouseimports" },
                                    { icon: <Twitter size={16} />, href: "https://twitter.com/carhouseimports" },
                                    { icon: <Linkedin size={16} />, href: "https://linkedin.com/company/carhouseimports" },
                                    { icon: <Youtube size={16} />, href: "https://youtube.com/@carhouseimports" },
                                ].map(({ icon, href }, i) => (
                                    <a
                                        key={i}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-gold hover:border-gold/40 transition-all duration-300"
                                    >
                                        {icon}
                                    </a>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            {formState === 'success' ? (
                                <div className="border border-gold/20 p-14 bg-[#0a0a0a] text-center">
                                    <CheckCircle2 size={40} className="text-gold mx-auto mb-6" />
                                    <h3 className="text-3xl font-serif mb-3">Message Received</h3>
                                    <p className="text-white/50 text-sm">A member of our team will contact you within 2–4 business hours.</p>
                                    <button
                                        onClick={() => { setFormState('idle'); setName(''); setPhone(''); setEmail(''); setMessage(''); }}
                                        className="mt-8 text-[9px] uppercase tracking-[0.4em] font-black text-gold hover:text-white transition-colors"
                                    >
                                        Send Another
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="border border-white/8 p-10 bg-[#0a0a0a] space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[8px] uppercase tracking-[0.4em] font-black text-white/40 mb-2">Full Name *</label>
                                            <input
                                                required
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                                className="w-full bg-black border border-white/10 text-white text-sm px-4 py-3 outline-none focus:border-gold/40 placeholder-white/20 transition-colors"
                                                placeholder="Your name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[8px] uppercase tracking-[0.4em] font-black text-white/40 mb-2">Phone *</label>
                                            <input
                                                required
                                                value={phone}
                                                onChange={e => setPhone(e.target.value)}
                                                className="w-full bg-black border border-white/10 text-white text-sm px-4 py-3 outline-none focus:border-gold/40 placeholder-white/20 transition-colors"
                                                placeholder="+880..."
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[8px] uppercase tracking-[0.4em] font-black text-white/40 mb-2">Email</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            className="w-full bg-black border border-white/10 text-white text-sm px-4 py-3 outline-none focus:border-gold/40 placeholder-white/20 transition-colors"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[8px] uppercase tracking-[0.4em] font-black text-white/40 mb-2">Message</label>
                                        <textarea
                                            rows={5}
                                            value={message}
                                            onChange={e => setMessage(e.target.value)}
                                            className="w-full bg-black border border-white/10 text-white text-sm px-4 py-3 outline-none focus:border-gold/40 placeholder-white/20 transition-colors resize-none"
                                            placeholder="Tell us how we can help..."
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={formState === 'submitting'}
                                        className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-white text-black text-[9px] uppercase tracking-[0.4em] font-black hover:bg-gold transition-colors duration-500 disabled:opacity-50"
                                    >
                                        {formState === 'submitting' ? (
                                            <><Loader2 size={14} className="animate-spin" /> Sending...</>
                                        ) : (
                                            <><ArrowRight size={14} /> Send Message</>
                                        )}
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}