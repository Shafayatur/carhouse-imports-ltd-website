import { useCompare } from "@/context/CompareContext";
import { useVehicles } from "@/hooks/useSupabase";
import { Contact } from "@/components/Contact";
import { Navbar } from "@/components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { X, Plus, ArrowRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Vehicle } from "@/lib/supabase";
import { TestDriveModal } from "@/components/TestDriveModal";

function fmtPrice(n: number | null) {
    return n ? "BDT " + Math.round(n).toLocaleString("en-BD") : "P.O.A";
}

function fmtMileage(n: number | null) {
    return n ? Math.round(n).toLocaleString("en-BD") + " km" : "—";
}

const ROWS = [
    { label: "Price", key: (c: Vehicle) => fmtPrice(c.selling_price) },
    { label: "Year", key: (c: Vehicle) => String(c.year) },
    { label: "Origin", key: (c: Vehicle) => c.origin },
    { label: "Engine", key: (c: Vehicle) => c.engine_cc ? `${c.engine_cc} cc` : "—" },
    { label: "Transmission", key: (c: Vehicle) => c.transmission || "—" },
    { label: "Fuel Type", key: (c: Vehicle) => c.fuel_type || "—" },
    { label: "Mileage", key: (c: Vehicle) => fmtMileage(c.mileage) },
    { label: "Body Type", key: (c: Vehicle) => c.body_type || "—" },
    { label: "Colour", key: (c: Vehicle) => c.color || "—" },
    { label: "Condition", key: (c: Vehicle) => c.condition || "—" },
    { label: "Status", key: (c: Vehicle) => c.status || "—" },
];

function CarSlot({ car, onRemove, onAdd, allCars }: {
    car: Vehicle | null;
    onRemove?: () => void;
    onAdd?: (car: Vehicle) => void;
    allCars: Vehicle[];
}) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const filtered = allCars.filter(c =>
        `${c.make} ${c.model}`.toLowerCase().includes(query.toLowerCase())
    );

    if (!car) {
        return (
            <div className="flex-1 min-w-[220px]">
                <div className="relative">
                    <button
                        onClick={() => setOpen(o => !o)}
                        className="w-full h-48 border border-dashed border-white/10 hover:border-gold/40 transition-colors flex flex-col items-center justify-center gap-3 group"
                    >
                        <Plus size={20} className="text-white/40 group-hover:text-gold transition-colors" />
                        <span className="text-[9px] uppercase tracking-[0.4em] font-black text-white/40 group-hover:text-gold transition-colors">Add Car</span>
                    </button>
                    <AnimatePresence>
                        {open && (
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 8 }}
                                className="absolute top-full left-0 right-0 z-50 bg-[#0a0a0a] border border-white/10 shadow-2xl mt-1"
                            >
                                <div className="p-3 border-b border-white/5">
                                    <input
                                        autoFocus
                                        value={query}
                                        onChange={e => setQuery(e.target.value)}
                                        placeholder="Search cars..."
                                        className="w-full bg-white/5 border border-white/10 px-3 py-2 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-gold"
                                    />
                                </div>
                                <div
                                    className="overflow-y-scroll overscroll-contain"
                                    style={{ maxHeight: "220px" }}
                                    data-lenis-prevent
                                >
                                    {filtered.length === 0 && (
                                        <p className="p-4 text-xs text-white/30 text-center">No cars found</p>
                                    )}
                                    {filtered.map(c => (
                                        <button
                                            key={c.id}
                                            onClick={() => { onAdd?.(c); setOpen(false); setQuery(""); }}
                                            className="w-full text-left px-4 py-3 text-xs text-white/50 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                                        >
                                            <span className="font-bold text-white/70">{c.make}</span> {c.model}
                                            <span className="text-white/20 ml-2">• {c.year}</span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <div className="h-[1px] bg-white/5 mt-0" />
            </div>
        );
    }

    return (
        <div className="flex-1 min-w-[220px]">
            {/* Image */}
            <div className="relative h-48 bg-white/5 overflow-hidden flex items-center justify-center">
                {car.image_url ? (
                    <img
                        src={car.image_url}
                        alt={`${car.make} ${car.model}`}
                        className="w-full h-full object-cover"
                        onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                    />
                ) : (
                    <p className="text-[9px] uppercase tracking-[0.3em] font-black text-white/20">No image available</p>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <button
                    onClick={onRemove}
                    className="absolute top-3 right-3 w-7 h-7 bg-black/60 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-black transition-all"
                >
                    <X size={12} />
                </button>
                <div className="absolute bottom-3 left-3">
                    <p className="text-[8px] uppercase tracking-[0.4em] font-black text-gold">{car.make}</p>
                    <p className="text-base font-serif text-white leading-tight">{car.model}</p>
                </div>
            </div>
        </div>
    );
}

export default function ComparePage() {
    const { compareList, addToCompare, removeFromCompare, clearCompare } = useCompare();
    const { vehicles } = useVehicles();
    const [testDriveCar, setTestDriveCar] = useState<{ name: string; id: string } | null>(null);
    const navigate = useNavigate();

    // Fill slots up to 3
    const slots: (Vehicle | null)[] = [
        compareList[0] ?? null,
        compareList[1] ?? null,
        compareList[2] ?? null,
    ];

    const availableCars = vehicles.filter(v => !compareList.find(c => c.id === v.id));

    return (
        <main className="bg-luxury-black min-h-screen text-white">
            <Navbar />

            <div className="pt-32 pb-0 px-6 md:px-12 container mx-auto">

                {/* Header */}
                <div className="mb-12">
                    <p className="text-[9px] uppercase tracking-[0.6em] font-black text-gold mb-3">Side by Side</p>
                    <div className="flex items-end justify-between flex-wrap gap-4">
                        <h1 className="text-5xl md:text-6xl font-serif">Compare Vehicles</h1>
                        {compareList.length > 0 && (
                            <button
                                onClick={clearCompare}
                                className="text-[9px] uppercase tracking-[0.4em] font-black text-white/20 hover:text-white/50 transition-colors flex items-center gap-2"
                            >
                                <X size={11} /> Clear All
                            </button>
                        )}
                    </div>
                    <div className="w-16 h-[1px] bg-gold mt-4" />
                </div>

                {/* Car slots row */}
                <div className="flex gap-px border border-white/5 bg-white/5 overflow-x-auto">
                    {/* Row label col */}
                    <div className="w-24 md:w-36 shrink-0 bg-luxury-black" />
                    {slots.map((car, i) => (
                        <div key={i} className="flex-1 bg-luxury-black">
                            <CarSlot
                                car={car}
                                onRemove={() => car && removeFromCompare(car.id)}
                                onAdd={c => addToCompare(c)}
                                allCars={availableCars}
                            />
                        </div>
                    ))}
                </div>

                {/* Comparison table */}
                {compareList.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border border-white/5 border-t-0"
                    >
                        {ROWS.map((row, ri) => (
                            <div
                                key={row.label}
                                className={`flex ${ri % 2 === 0 ? "bg-white/[0.01]" : "bg-transparent"} border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors`}
                            >
                                {/* Label */}
                                <div className="w-24 md:w-36 shrink-0 px-2 sm:px-3 md:px-5 py-4 flex items-center">
                                    <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.35em] font-black text-white/40">{row.label}</span>
                                </div>
                                {/* Values */}
                                {slots.map((car, ci) => {
                                    const val = car ? row.key(car) : null;
                                    const allVals = slots.filter(Boolean).map(c => row.key(c!));
                                    const isUnique = car && allVals.filter(v => v === val).length === 1 && compareList.length > 1;
                                    return (
                                        <div key={ci} className="flex-1 px-5 py-4 border-l border-white/5 flex items-center">
                                            {car ? (
                                                <span className={`text-xs font-medium tracking-wide ${isUnique ? "text-gold" : "text-white/70"}`}>
                                                    {val}
                                                </span>
                                            ) : (
                                                <span className="text-white/10 text-xs">—</span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}

                        {/* Actions row */}
                        <div className="flex border-t border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-colors">
                            <div className="w-24 md:w-36 shrink-0 px-2 sm:px-3 md:px-5 py-5 flex items-center">
                                <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.35em] font-black text-white/40">Actions</span>
                            </div>
                            {slots.map((car, ci) => (
                                <div key={ci} className="flex-1 px-5 py-5 border-l border-white/5 flex flex-col gap-2">
                                    {car && (
                                        <>
                                            <Link
                                                to={`/inventory/${car.id}`}
                                                className="flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] font-black text-gold hover:text-white transition-colors"
                                            >
                                                View Details <ArrowRight size={10} />
                                            </Link>
                                            <button
                                                onClick={() => setTestDriveCar({ name: `${car.make} ${car.model}`, id: car.id })}
                                                className="flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] font-black text-white/30 hover:text-gold transition-colors"
                                            >
                                                Test Drive <ArrowRight size={10} />
                                            </button>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Empty state */}
                {compareList.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-24"
                    >
                        <p className="text-white/20 text-[11px] uppercase tracking-[0.5em] font-black mb-6">No cars selected</p>
                        <Link
                            to="/inventory"
                            className="inline-flex items-center gap-2 px-8 py-4 border border-gold/40 text-gold text-[9px] uppercase tracking-[0.4em] font-black hover:bg-gold hover:text-black transition-all rounded-sm"
                        >
                            Browse Inventory <ArrowRight size={12} />
                        </Link>
                    </motion.div>
                )}

            </div>

            <div className="mt-24">
                <Contact />
            </div>

            <TestDriveModal
                isOpen={!!testDriveCar}
                onClose={() => setTestDriveCar(null)}
                vehicleName={testDriveCar?.name}
                vehicleId={testDriveCar?.id}
            />
        </main>
    );
}