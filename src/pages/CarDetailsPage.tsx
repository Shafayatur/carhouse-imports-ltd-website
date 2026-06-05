import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { GoBack } from "@/components/GoBack";
import { Contact } from "@/components/Contact";
import { motion } from "motion/react";
import {
  ArrowLeft, CarFront, Coins, GitCompareArrows, ShieldCheck, Gauge, Zap, Wind, Activity,
  Check, X, Maximize2, Weight, Users, DoorOpen,
} from "lucide-react";
import { TestDriveModal } from "@/components/TestDriveModal";
import { useCompare } from "@/context/CompareContext";
import { useVehicle } from "@/hooks/useSupabase";

function fmtPrice(n: number) {
  return n ? "BDT " + Math.round(n).toLocaleString("en-BD") : "Price on Request";
}

// ─── Feature icon map (best-effort, falls back to Check) ─────────────────────
const FEATURE_ICONS: Record<string, React.ReactNode> = {
  "Sunroof / Moonroof": <span className="text-lg">⊙</span>,
  "Leather Seats": <span className="text-lg">◈</span>,
  "Apple CarPlay": <span className="text-lg">⌘</span>,
  "Android Auto": <span className="text-lg">⟳</span>,
  "360° Camera": <span className="text-lg">◎</span>,
  "4WD / AWD": <span className="text-lg">✦</span>,
};

export default function CarDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { vehicle: car, loading } = useVehicle(id);
  const [testDriveOpen, setTestDriveOpen] = useState(false);
  const { addToCompare, removeFromCompare, isInCompare } = useCompare();
  const [galleryExpanded, setGalleryExpanded] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [engineExpanded, setEngineExpanded] = useState(false);

  if (loading) {
    return (
      <div className="bg-luxury-black min-h-screen text-white flex items-center justify-center">
        <div className="w-8 h-8 border border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="bg-luxury-black min-h-screen text-white flex flex-col items-center justify-center gap-8">
        <h1 className="text-4xl font-serif">Vehicle not found</h1>
        <Link to="/inventory" className="text-gold uppercase tracking-widest border-b border-gold pb-2">
          Return to Inventory
        </Link>
      </div>
    );
  }

  const galleryImages = car.gallery_urls ?? [];

  const activeFeatures = car.features
    ? Object.keys(car.features).filter(k => car.features[k])
    : [];

  const dims = car.dimensions ?? {};
  const hasDims = Object.values(dims).some(v => v && v !== "");

  const mainSpecs = [
    { icon: <Gauge size={20} />, label: "Engine", value: `${car.engine_cc}cc` },
    { icon: <Zap size={20} />, label: "Transmission", value: car.transmission || "—" },
    { icon: <Wind size={20} />, label: "Fuel", value: car.fuel_type || "—" },
    { icon: <ShieldCheck size={20} />, label: "Condition", value: car.condition || "—" },
  ];

  const techDetails = [
    { label: "Make", value: car.make },
    { label: "Model", value: car.model },
    { label: "Year", value: String(car.year) },
    { label: "Colour", value: car.color || "—" },
    { label: "Engine", value: `${car.engine_cc}cc` },
    { label: "Transmission", value: car.transmission || "—" },
    { label: "Fuel Type", value: car.fuel_type || "—" },
    { label: "Mileage", value: car.mileage ? `${car.mileage.toLocaleString()} km` : "—" },
    { label: "Drivetrain", value: dims.seats ? `${dims.seats}-seater` : "—" },
    { label: "Origin", value: car.origin || "—" },
    { label: "Chassis No.", value: car.chassis_no || "—" },
    { label: "VIN", value: car.vin || "—" },
  ];

  const roadmap = [
    { phase: "01", title: "Source & Verify", desc: "Vehicle identification, provenance check, and condition report.", duration: "3–5 Days" },
    { phase: "02", title: "Acquisition", desc: "Secure purchase, title audit, and export documentation.", duration: "7–14 Days" },
    { phase: "03", title: "Logistics", desc: "International freight, insurance, and customs clearance.", duration: "21–45 Days" },
    { phase: "04", title: "Delivery", desc: "Local registration, final inspection, and white-glove handover.", duration: "3–7 Days" },
  ];

  return (
    <main className="bg-luxury-black min-h-screen selection:bg-gold selection:text-black text-white">
      <Navbar />

      {/* ══ HERO IMAGE ══════════════════════════════════════════════ */}
      <section className="w-full mb-8 -mt-0">
        <div className="relative w-full h-[55vw] min-h-[320px] md:h-[70vh] lg:h-screen overflow-hidden bg-luxury-gray">
          {car.image_url ? (
            <img
              src={car.image_url}
              alt={`${car.make} ${car.model}`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-luxury-gray">
              <p className="text-white/10 text-6xl font-display font-black tracking-tighter">{car.make}</p>
              <p className="text-white/5 text-3xl font-serif mt-2">{car.model}</p>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/90 via-luxury-black/20 to-luxury-black/40" />

          {/* Status badge */}
          {car.status && car.status !== "Available" && (
            <div className="absolute bottom-8 left-6 md:left-12 px-4 py-2 bg-black/60 backdrop-blur-sm">
              <p className="text-[10px] uppercase tracking-widest font-black text-gold">{car.status}</p>
            </div>
          )}
        </div>
      </section>

      {/* Back nav */}
      <GoBack className="pt-4 pb-10" />

      {/* ══ MAIN CONTENT ════════════════════════════════════════════ */}
      <section className="container mx-auto px-6 md:px-12 pb-32">

        {/* Full-width title + quick specs */}
        <div className="mb-16 space-y-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTestDriveOpen(true)}
                className="flex items-center gap-2 px-6 py-2.5 border border-gold/40 text-gold hover:bg-gold hover:text-black transition-all duration-500 rounded-sm"
              >
                <CarFront size={13} />
                <span className="text-[9px] uppercase tracking-[0.3em] font-black">Test Drive</span>
              </button>
              {car && (
                <button
                  onClick={() => isInCompare(car.id) ? removeFromCompare(car.id) : addToCompare(car)}
                  className={`flex items-center gap-2 px-6 py-2.5 border rounded-sm transition-all duration-500 ${isInCompare(car.id) ? "border-white/40 text-white hover:border-white/20 hover:text-white/50" : "border-white/20 text-white/50 hover:border-white/40 hover:text-white"}`}
                >
                  <GitCompareArrows size={13} />
                  <span className="text-[9px] uppercase tracking-[0.3em] font-black">
                    {isInCompare(car.id) ? "Remove" : "Compare"}
                  </span>
                </button>
              )}
            </div>
            <div className="text-center">
              <p className="text-[10px] uppercase tracking-[0.6em] font-black text-gold mb-4">
                {car.make} • {car.year} • {car.origin}
              </p>
              <h1 className="text-5xl md:text-7xl font-serif leading-tight">{car.model}</h1>
            </div>
            <div className="flex items-center gap-3 px-12 py-2.5 border border-gold/40 text-gold rounded-sm">
              <Coins size={18} />
              <span className="text-[11px] uppercase tracking-[0.4em] font-black">AP: {fmtPrice(car.selling_price)}</span>
            </div>
          </div>

          {/* Quick specs — full width 4 cols */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mainSpecs.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/[0.03] border border-white/8 p-6 text-center"
              >
                <div className="text-gold mx-auto mb-3 flex justify-center">{s.icon}</div>
                <p className="text-white font-medium text-base mb-1">{s.value}</p>
                <p className="text-[10px] uppercase tracking-widest text-white/30 font-black">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* LEFT col */}
          <div className="lg:col-span-2 space-y-20">

            {/* Description */}
            {car.description && (
              <div>
                <p className="text-xs uppercase tracking-[0.4em] font-black text-white/30 mb-4">About This Vehicle</p>
                <p className="text-white/70 leading-relaxed text-lg">{car.description}</p>
              </div>
            )}

            {/* ══ GALLERY SECTION ══ */}
            {galleryImages.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-[0.4em] font-black text-white/30 mb-6">
                  Gallery <span className="text-white/20 normal-case tracking-normal font-normal">({galleryImages.length} images)</span>
                </p>

                {/* Featured large image */}
                <motion.div
                  key={galleryExpanded ?? 0}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="w-full aspect-video overflow-hidden border border-white/8 mb-2 cursor-zoom-in group relative"
                  onClick={() => setLightboxOpen(true)}
                >
                  <img
                    src={galleryImages[galleryExpanded ?? 0]}
                    alt={`${car.make} ${car.model}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-3 right-3 bg-black/60 px-2 py-1">
                    <p className="text-[9px] uppercase tracking-widest text-white/50">{(galleryExpanded ?? 0) + 1} / {galleryImages.length}</p>
                  </div>
                </motion.div>

                {/* Thumbnail strip */}
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {galleryImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setGalleryExpanded(i)}
                      className={`shrink-0 w-20 h-14 overflow-hidden border transition-all ${(galleryExpanded ?? 0) === i ? "border-gold opacity-100" : "border-white/8 opacity-50 hover:opacity-80"
                        }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-white/20 mt-3 uppercase tracking-widest">
                  Click thumbnail to swap · Click main image to enlarge
                </p>

                {/* Lightbox */}
                {lightboxOpen && (
                  <div
                    className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-6"
                    onClick={() => setLightboxOpen(false)}
                  >
                    <button
                      className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
                      onClick={() => setLightboxOpen(false)}
                    >
                      <X size={28} />
                    </button>
                    <img
                      src={galleryImages[galleryExpanded]}
                      alt=""
                      className="max-w-full max-h-[80vh] object-contain"
                      onClick={e => e.stopPropagation()}
                    />
                    <div className="flex gap-6 mt-6">
                      <button
                        onClick={e => { e.stopPropagation(); setGalleryExpanded(i => i > 0 ? i - 1 : galleryImages.length - 1); }}
                        className="text-white/40 hover:text-white text-[10px] uppercase tracking-widest px-4 py-2 border border-white/10 hover:border-white/30 transition-all"
                      >← Prev</button>
                      <span className="text-white/20 text-xs self-center">{galleryExpanded + 1} / {galleryImages.length}</span>
                      <button
                        onClick={e => { e.stopPropagation(); setGalleryExpanded(i => i < galleryImages.length - 1 ? i + 1 : 0); }}
                        className="text-white/40 hover:text-white text-[10px] uppercase tracking-widest px-4 py-2 border border-white/10 hover:border-white/30 transition-all"
                      >Next →</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ══ ENGINE SECTION ══ */}
            {(car.engine_image_url || car.description) && (
              <div>
                <p className="text-xs uppercase tracking-[0.4em] font-black text-white/30 mb-6">Under The Hood</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  {car.engine_image_url && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      className="relative group cursor-pointer"
                      onClick={() => setEngineExpanded(true)}
                    >
                      <img
                        src={car.engine_image_url}
                        alt="Engine bay"
                        className="w-full aspect-[4/3] object-cover border border-white/10 group-hover:border-gold/40 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center">
                        <Maximize2 size={24} className="text-white opacity-0 group-hover:opacity-60 transition-opacity" />
                      </div>
                      <p className="text-[9px] uppercase tracking-widest text-white/20 mt-2">Engine bay — tap to enlarge</p>
                    </motion.div>
                  )}
                  <div className="space-y-4">
                    {[
                      ["Engine", `${car.engine_cc}cc`],
                      ["Fuel Type", car.fuel_type],
                      ["Transmission", car.transmission],
                      ["Condition", car.condition],
                      ["Mileage", car.mileage ? `${car.mileage.toLocaleString()} km` : "—"],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between items-center border-b border-white/5 pb-3">
                        <span className="text-xs uppercase tracking-wider text-white/30 font-black">{label}</span>
                        <span className="text-base text-white font-medium">{value || "—"}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Engine image lightbox */}
            {engineExpanded && car.engine_image_url && (
              <div
                className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-8"
                onClick={() => setEngineExpanded(false)}
              >
                <button className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors">
                  <X size={28} />
                </button>
                <img
                  src={car.engine_image_url}
                  alt="Engine bay full"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            )}

            {/* ══ FEATURES SECTION ══ */}
            {activeFeatures.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-[0.4em] font-black text-white/30 mb-6">Features & Comfort</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {activeFeatures.map((feat, i) => (
                    <motion.div
                      key={feat}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="flex items-center gap-3 bg-white/[0.03] border border-white/8 px-4 py-3 hover:border-gold/20 transition-colors"
                    >
                      <span className="text-gold flex-shrink-0">
                        {FEATURE_ICONS[feat] ?? <Check size={14} />}
                      </span>
                      <span className="text-sm text-white/70">{feat}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* ══ DIMENSIONS SECTION ══ */}
            {hasDims && (
              <div>
                <p className="text-xs uppercase tracking-[0.4em] font-black text-white/30 mb-6">Dimensions</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: <Maximize2 size={18} />, label: "Length", value: dims.length, unit: "mm" },
                    { icon: <Maximize2 size={18} className="rotate-90" />, label: "Width", value: dims.width, unit: "mm" },
                    { icon: <Activity size={18} />, label: "Height", value: dims.height, unit: "mm" },
                    { icon: <Maximize2 size={18} />, label: "Wheelbase", value: dims.wheelbase, unit: "mm" },
                    { icon: <Weight size={18} />, label: "Kerb Weight", value: dims.kerb_weight, unit: "kg" },
                    { icon: <Maximize2 size={18} />, label: "Boot Space", value: dims.boot_space, unit: "L" },
                    { icon: <DoorOpen size={18} />, label: "Doors", value: dims.doors, unit: "" },
                    { icon: <Users size={18} />, label: "Seats", value: dims.seats, unit: "" },
                  ].filter(d => d.value).map((d, i) => (
                    <motion.div
                      key={d.label}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="bg-white/[0.03] border border-white/8 p-5 text-center"
                    >
                      <div className="text-white/30 mx-auto mb-2 flex justify-center">{d.icon}</div>
                      <p className="text-white font-medium text-base">
                        {d.value}{d.unit && <span className="text-white/40 text-sm ml-0.5">{d.unit}</span>}
                      </p>
                      <p className="text-[10px] uppercase tracking-widest text-white/30 font-black mt-1">{d.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Technical specs table */}
            <div>
              <p className="text-xs uppercase tracking-[0.4em] font-black text-white/30 mb-6">Technical Specification</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
                {techDetails.map((d, i) => (
                  <div key={i} className="bg-luxury-black px-6 py-4 flex justify-between items-center">
                    <span className="text-xs uppercase tracking-wider text-white/30 font-black">{d.label}</span>
                    <span className="text-base text-white font-medium">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Acquisition roadmap */}
            <div>
              <p className="text-xs uppercase tracking-[0.4em] font-black text-white/30 mb-8">Acquisition Roadmap</p>
              <div className="space-y-px">
                {roadmap.map((phase, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-8 items-start bg-white/[0.02] border border-white/5 p-6 hover:border-gold/20 transition-colors group"
                  >
                    <span className="text-4xl font-display font-black text-white/10 group-hover:text-gold/20 transition-colors shrink-0">
                      {phase.phase}
                    </span>
                    <div className="flex-1">
                      <p className="font-display font-bold uppercase tracking-widest text-white mb-2 text-lg">{phase.title}</p>
                      <p className="text-white/30 text-base leading-relaxed">{phase.desc}</p>
                    </div>
                    <span className="text-xs uppercase tracking-wider text-gold/60 shrink-0 font-black">{phase.duration}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT col — sidebar */}
          <div className="space-y-6">
            <div className="bg-white/[0.03] border border-white/8 p-8 sticky top-32">
              <p className="text-xs uppercase tracking-[0.4em] font-black text-gold mb-6">Initiate Acquisition</p>
              <div className="space-y-4 mb-8">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-white/30 mb-1">Vehicle</p>
                  <p className="text-white font-medium text-lg">{car.year} {car.make} {car.model}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-white/30 mb-1">Asking Price</p>
                  <p className="text-gold font-bold text-2xl">{fmtPrice(car.selling_price)}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-white/30 mb-1">Status</p>
                  <p className="text-white text-lg">{car.status}</p>
                </div>
              </div>
              <Link
                to="/consultation"
                className="block w-full py-4 bg-white text-black text-center text-xs uppercase tracking-[0.3em] font-black hover:bg-gold transition-colors duration-500"
              >
                Request Consultation
              </Link>
              <Link
                to="/sourcing"
                className="block w-full py-4 border border-white/10 text-center text-xs uppercase tracking-[0.3em] font-black text-white/40 hover:text-white hover:border-white/30 transition-colors mt-3"
              >
                Custom Sourcing Enquiry
              </Link>
            </div>

            {/* Key details */}
            <div className="bg-white/[0.03] border border-white/8 p-6 space-y-4">
              <p className="text-xs uppercase tracking-[0.4em] font-black text-white/30">Key Details</p>
              {[
                ["Colour", car.color],
                ["Mileage", car.mileage ? `${car.mileage.toLocaleString()} km` : "—"],
                ["Origin", car.origin],
                ["Port", car.port],
                ...(dims.doors ? [["Doors", dims.doors]] : []),
                ...(dims.seats ? [["Seats", dims.seats]] : []),
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-xs uppercase tracking-wider text-white/30 font-black">{label}</span>
                  <span className="text-base text-white">{value || "—"}</span>
                </div>
              ))}
            </div>

            {/* Features mini-list in sidebar */}
            {activeFeatures.length > 0 && (
              <div className="bg-white/[0.03] border border-white/8 p-6">
                <p className="text-xs uppercase tracking-[0.4em] font-black text-white/30 mb-4">Highlights</p>
                <div className="space-y-2">
                  {activeFeatures.slice(0, 6).map(feat => (
                    <div key={feat} className="flex items-center gap-3">
                      <Check size={14} className="text-gold flex-shrink-0" />
                      <span className="text-sm text-white/60">{feat}</span>
                    </div>
                  ))}
                  {activeFeatures.length > 6 && (
                    <p className="text-[10px] text-white/30 uppercase tracking-wider mt-2">
                      +{activeFeatures.length - 6} more features below ↓
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      <Contact />
      <TestDriveModal
        isOpen={testDriveOpen}
        onClose={() => setTestDriveOpen(false)}
        vehicleName={car ? `${car.make} ${car.model}` : ""}
        vehicleId={id}
      />
    </main>
  );
}