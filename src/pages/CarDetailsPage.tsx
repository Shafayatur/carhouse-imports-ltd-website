import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Contact } from "@/components/Contact";
import { motion } from "motion/react";
import { ArrowLeft, Heart, ShieldCheck, Gauge, Zap, Wind, Activity } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useVehicle } from "@/hooks/useSupabase";


function fmtPrice(n: number) {
  return n ? "৳ " + Math.round(n).toLocaleString("en-BD") : "Price on Request";
}

export default function CarDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { vehicle: car, loading } = useVehicle(id);
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [activeImage, setActiveImage] = useState(0);

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
        <h1 className="text-4xl font-serif italic">Vehicle not found</h1>
        <Link to="/inventory" className="text-gold uppercase tracking-widest border-b border-gold pb-2">
          Return to Inventory
        </Link>
      </div>
    );
  }

  const allImages = [
    ...(car.image_url ? [car.image_url] : []),
    ...(car.gallery_urls ?? []),
  ];

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
    { label: "Drivetrain", value: "—" },
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



      <Navbar />

      {/* Hero image */}
      <section className="w-full mb-8 -mt-0">
        <div className="relative w-full h-screen overflow-hidden bg-luxury-gray">
          {allImages.length > 0 ? (
            <img
              src={allImages[activeImage]}
              alt={`${car.make} ${car.model}`}
              className="w-full h-full object-cover transition-all duration-700"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-luxury-gray">
              <p className="text-white/10 text-6xl font-display font-black tracking-tighter">
                {car.make}
              </p>
              <p className="text-white/5 text-3xl font-serif italic mt-2">
                {car.model}
              </p>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/90 via-luxury-black/20 to-luxury-black/40" />

          {/* Wishlist */}
          <button
            onClick={() => toggleWishlist(car.id)}
            className={`absolute top-28 right-6 md:right-12 w-12 h-12 rounded-full border backdrop-blur-md flex items-center justify-center transition-all duration-500 ${isInWishlist(car.id)
              ? "bg-gold text-black border-gold"
              : "bg-black/20 text-white/40 border-white/10 hover:text-white"
              }`}
          >
            <Heart size={18} fill={isInWishlist(car.id) ? "currentColor" : "none"} />
          </button>

          {/* Status */}
          {car.status && car.status !== "Available" && (
            <div className="absolute bottom-8 left-6 md:left-12 px-4 py-2 bg-black/60 backdrop-blur-sm">
              <p className="text-[10px] uppercase tracking-widest font-black text-gold">
                {car.status}
              </p>
            </div>
          )}
        </div>

        {/* Gallery thumbnails */}
        {allImages.length > 1 && (
          <div className="container mx-auto px-6 md:px-12">
            <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`shrink-0 w-24 h-16 overflow-hidden rounded-sm border transition-all ${activeImage === i
                    ? "border-gold"
                    : "border-white/10 opacity-50 hover:opacity-100"
                    }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Back nav */}
      <div className="container mx-auto px-6 md:px-12 pt-4 pb-10">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-3 text-white/30 hover:text-white transition-colors group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="text-[10px] uppercase tracking-[0.4em] font-black">
            Go Back
          </span>
        </button>
      </div>

      {/* Content */}
      <section className="container mx-auto px-6 md:px-12 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Left: main info */}
          <div className="lg:col-span-2 space-y-16">
            {/* Title + price */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.6em] font-black text-gold mb-4">
                {car.make} • {car.year} • {car.origin}
              </p>
              <h1 className="text-5xl md:text-7xl font-serif italic leading-tight mb-6">{car.model}</h1>
              <p className="text-3xl font-display font-bold text-gold">{fmtPrice(car.selling_price)}</p>
            </div>

            {/* Quick specs */}
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
                  <p className="text-white font-medium text-sm mb-1">{s.value}</p>
                  <p className="text-[9px] uppercase tracking-widest text-white/30 font-black">{s.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Technical specs table */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.6em] font-black text-white/30 mb-6">Technical Specification</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
                {techDetails.map((d, i) => (
                  <div key={i} className="bg-luxury-black px-6 py-4 flex justify-between items-center">
                    <span className="text-[10px] uppercase tracking-wider text-white/30 font-black">{d.label}</span>
                    <span className="text-sm text-white font-medium">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Acquisition roadmap */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.6em] font-black text-white/30 mb-8">Acquisition Roadmap</p>
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
                      <p className="font-display font-bold uppercase tracking-widest text-white mb-2">{phase.title}</p>
                      <p className="text-white/30 text-sm leading-relaxed">{phase.desc}</p>
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-gold/60 shrink-0 font-black">{phase.duration}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: enquiry sidebar */}
          <div className="space-y-6">
            <div className="bg-white/[0.03] border border-white/8 p-8 sticky top-32">
              <p className="text-[10px] uppercase tracking-[0.4em] font-black text-gold mb-6">Initiate Acquisition</p>
              <div className="space-y-3 mb-8">
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-white/30 mb-1">Vehicle</p>
                  <p className="text-white font-medium">{car.year} {car.make} {car.model}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-white/30 mb-1">Asking Price</p>
                  <p className="text-gold font-bold text-xl">{fmtPrice(car.selling_price)}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-white/30 mb-1">Status</p>
                  <p className="text-white">{car.status}</p>
                </div>
              </div>
              <Link
                to="/consultation"
                className="block w-full py-4 bg-white text-black text-center text-[10px] uppercase tracking-[0.3em] font-black hover:bg-gold transition-colors duration-500"
              >
                Request Consultation
              </Link>
              <Link
                to="/sourcing"
                className="block w-full py-4 border border-white/10 text-center text-[10px] uppercase tracking-[0.3em] font-black text-white/40 hover:text-white hover:border-white/30 transition-colors mt-3"
              >
                Custom Sourcing Enquiry
              </Link>
            </div>

            {/* Key details card */}
            <div className="bg-white/[0.03] border border-white/8 p-6 space-y-4">
              <p className="text-[10px] uppercase tracking-[0.4em] font-black text-white/30">Key Details</p>
              {[
                ["Colour", car.color],
                ["Mileage", car.mileage ? `${car.mileage.toLocaleString()} km` : "—"],
                ["Origin", car.origin],
                ["Port", car.port],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-[10px] uppercase tracking-wider text-white/30 font-black">{label}</span>
                  <span className="text-sm text-white">{value || "—"}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <Contact />
    </main>
  );
}