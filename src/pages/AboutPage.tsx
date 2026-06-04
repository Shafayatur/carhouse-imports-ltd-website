import { Navbar } from "@/components/Navbar";
import { GoBack } from "@/components/GoBack";
import { Contact } from "@/components/Contact";
import { motion } from "motion/react";
import { Award, Globe, Users, Car, Shield, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
    { value: "25+", label: "Years in Business", sub: "Est. 2000, Dhaka" },
    { value: "1,200+", label: "Cars Imported", sub: "Across 6 continents" },
    { value: "940+", label: "Happy Clients", sub: "Lifetime relationships" },
    { value: "18", label: "Partner Nations", sub: "Global sourcing network" },
];

const milestones = [
    { year: "2000", title: "Founded in Dhaka", desc: "Car House Imports Ltd begins operations, importing premium Japanese vehicles for Bangladesh's first private collectors." },
    { year: "2007", title: "European Expansion", desc: "Established sourcing partnerships in Germany, the UK, and the Netherlands — opening the door to rare German engineering." },
    { year: "2013", title: "Dubai & Middle East", desc: "A regional office in Dubai connects the firm to low-mileage Gulf-spec vehicles and ultra-rare hypercar allocations." },
    { year: "2018", title: "The Vault Collection", desc: "Launch of the curated Vault programme — a hand-selected portfolio of investment-grade automobiles maintained for appreciating clients." },
    { year: "2022", title: "Digital Transformation", desc: "A fully digital client experience — real-time inventory, bespoke AI concierge, and global delivery tracking from a single platform." },
    { year: "2026", title: "Present Day", desc: "Over 1,200 vehicles delivered. Trusted by heads of industry, international diplomats, and automotive collectors across South Asia." },
];

const values = [
    {
        icon: <Shield size={22} className="text-gold" />,
        title: "Provenance First",
        desc: "Every vehicle we acquire is subjected to a full historical audit. We reject what we cannot verify — regardless of profit margin.",
    },
    {
        icon: <Globe size={22} className="text-gold" />,
        title: "Global Access",
        desc: "Our sourcing network spans 18 countries. When a vehicle exists anywhere in the world, we have a path to it.",
    },
    {
        icon: <Users size={22} className="text-gold" />,
        title: "Lifelong Relationships",
        desc: "Transactions end. Relationships don't. Our clients return, and they send their children.",
    },
    {
        icon: <Award size={22} className="text-gold" />,
        title: "Uncompromising Standards",
        desc: "We operate in a segment where a single dishonest transaction destroys a decade of reputation. We never forget that.",
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-luxury-black text-white">
            <Navbar />
            <GoBack />

            {/* Hero */}
            <section className="relative min-h-[70vh] flex items-end pb-24 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="/images/avik-homepage.jpg"
                        alt="Car House Story"
                        className="w-full h-full object-cover grayscale opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/60 to-transparent" />
                </div>

                {/* Background text */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
                    <span className="text-[22vw] font-serif font-black text-white/[0.03] whitespace-nowrap tracking-tighter uppercase">
                        LEGACY
                    </span>
                </div>

                <div className="relative z-10 container mx-auto px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <p className="text-[9px] uppercase tracking-[0.7em] font-black text-gold mb-6">
                            Est. 2000 • Dhaka, Bangladesh
                        </p>
                        <h1 className="text-6xl md:text-9xl font-serif leading-none mb-6">
                            Our Story
                        </h1>
                        <div className="w-24 h-[1px] bg-gold" />
                    </motion.div>
                </div>
            </section>

            {/* Intro */}
            <section className="container mx-auto px-6 md:px-12 py-24">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                    >
                        <p className="text-[9px] uppercase tracking-[0.6em] font-black text-gold mb-6">
                            Who We Are
                        </p>
                        <h2 className="text-5xl md:text-6xl font-serif leading-none mb-8">
                            Born from a Passion.<br />Built on Trust.
                        </h2>
                        <div className="w-12 h-[1px] bg-gold mb-8" />
                        <p className="text-white/60 text-sm leading-relaxed mb-6">
                            Car House Imports Ltd was founded in 2000 by a small team of automotive
                            obsessives who believed that Bangladeshi collectors deserved access to the
                            same vehicles sought after by connoisseurs in London, Tokyo, and Monaco.
                        </p>
                        <p className="text-white/60 text-sm leading-relaxed mb-6">
                            What began as a modest operation importing Japanese-spec vehicles has grown
                            into one of South Asia's most trusted names in premium automotive importation —
                            with a sourcing network spanning 18 nations and a client list that reads like
                            a who's who of industry leaders.
                        </p>
                        <p className="text-white/60 text-sm leading-relaxed">
                            We do not sell cars. We curate access to machines that define eras, preserve
                            heritage, and — in the right hands — appreciate like no other asset class.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="grid grid-cols-2 gap-4"
                    >
                        {stats.map((s, i) => (
                            <motion.div
                                key={s.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className="border border-white/10 p-8 bg-[#0a0a0a] hover:border-gold/30 transition-colors duration-500"
                            >
                                <p className="text-4xl md:text-5xl font-serif text-gold mb-2">{s.value}</p>
                                <p className="text-[9px] uppercase tracking-[0.4em] font-black text-white mb-1">{s.label}</p>
                                <p className="text-[10px] text-white/30">{s.sub}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-24 border-t border-white/5">
                <div className="container mx-auto px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <p className="text-[9px] uppercase tracking-[0.6em] font-black text-gold mb-4">History</p>
                        <h2 className="text-5xl md:text-6xl font-serif leading-none">Milestones</h2>
                    </motion.div>

                    <div className="relative">
                        {/* vertical line */}
                        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2 hidden md:block" />

                        <div className="space-y-0">
                            {milestones.map((m, i) => (
                                <motion.div
                                    key={m.year}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: i * 0.08 }}
                                    className={`relative grid md:grid-cols-2 gap-8 pb-16 ${i % 2 === 0 ? "" : "md:[&>*:first-child]:order-last md:[&>*:first-child]:text-left md:[&>*:last-child]:text-right"
                                        }`}
                                >
                                    {/* Year side */}
                                    <div className={`flex items-start ${i % 2 === 0 ? "md:justify-end md:text-right md:pr-16" : "md:justify-start md:text-left md:pl-16"}`}>
                                        <div>
                                            <span className="text-7xl font-serif text-white/[0.06] leading-none block">{m.year}</span>
                                            <span className="text-[9px] uppercase tracking-[0.6em] font-black text-gold -mt-2 block">{m.year}</span>
                                        </div>
                                    </div>

                                    {/* Dot */}
                                    <div className="absolute left-0 md:left-1/2 top-3 w-3 h-3 rounded-full bg-gold border-2 border-luxury-black -translate-x-1/2 hidden md:block" />

                                    {/* Content side */}
                                    <div className={`${i % 2 === 0 ? "md:pl-16" : "md:pr-16 md:text-right md:col-start-1 md:row-start-1"}`}>
                                        <h3 className="text-xl font-serif mb-3 text-white">{m.title}</h3>
                                        <p className="text-white/50 text-sm leading-relaxed">{m.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 border-t border-white/5 bg-[#080808]">
                <div className="container mx-auto px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-16"
                    >
                        <p className="text-[9px] uppercase tracking-[0.6em] font-black text-gold mb-4">What Drives Us</p>
                        <h2 className="text-5xl md:text-6xl font-serif leading-none">Our Values</h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((v, i) => (
                            <motion.div
                                key={v.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className="border border-white/8 p-8 hover:border-gold/25 transition-colors duration-500 group"
                            >
                                <div className="mb-6">{v.icon}</div>
                                <h3 className="text-lg font-serif mb-3 group-hover:text-gold transition-colors">{v.title}</h3>
                                <p className="text-white/45 text-[11px] leading-relaxed">{v.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Statement */}
            <section className="py-32 border-t border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,40,0.04),transparent_65%)] pointer-events-none" />
                <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2 }}
                    >
                        <p className="text-[9px] uppercase tracking-[0.7em] font-black text-gold mb-8">Our Mission</p>
                        <blockquote className="text-3xl md:text-5xl lg:text-6xl font-serif leading-tight max-w-5xl mx-auto text-white/90 mb-12">
                            "To connect the world's finest automobiles with the individuals who truly deserve them — with integrity, precision, and no compromise."
                        </blockquote>
                        <div className="w-16 h-[1px] bg-gold mx-auto mb-12" />
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/inventory"
                                className="group flex items-center gap-3 px-8 py-4 bg-white text-black text-[9px] uppercase tracking-[0.4em] font-black hover:bg-gold transition-colors duration-500"
                            >
                                View Collection
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                to="/consultation"
                                className="flex items-center gap-3 px-8 py-4 border border-white/20 text-white text-[9px] uppercase tracking-[0.4em] font-black hover:border-gold/50 hover:text-gold transition-colors duration-500"
                            >
                                Book a Consultation
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Team intro teaser */}
            <section className="py-24 border-t border-white/5 bg-[#060606]">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <p className="text-[9px] uppercase tracking-[0.6em] font-black text-gold mb-4">People</p>
                            <h2 className="text-4xl md:text-5xl font-serif leading-none mb-4">The Team Behind<br />the Collection</h2>
                            <p className="text-white/50 text-sm max-w-md leading-relaxed">
                                A dedicated group of automotive specialists, logistics experts, and client advisors — united by a single obsession.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="flex items-center gap-8"
                        >
                            {[
                                { num: "12", label: "Specialists" },
                                { num: "6", label: "Countries Active" },
                                { num: "24/7", label: "Client Support" },
                            ].map((t) => (
                                <div key={t.label} className="text-center">
                                    <p className="text-4xl font-serif text-gold mb-1">{t.num}</p>
                                    <p className="text-[9px] uppercase tracking-[0.4em] font-black text-white/40">{t.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            <Contact />
        </div>
    );
}