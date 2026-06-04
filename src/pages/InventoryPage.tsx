import { useState, useMemo } from "react";
import { Navbar } from "@/components/Navbar";
import { GoBack } from "@/components/GoBack";
import { Contact } from "@/components/Contact";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Heart, SlidersHorizontal, Search, X } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useVehicles } from "@/hooks/useSupabase";
import type { Vehicle } from "@/lib/supabase";
// hello
const STATUS_COLOURS: Record<string, string> = {
  Available: "text-white-400 border-white-400/20 bg-green-400/10",
  Reserved: "text-white-400 border-white-400/20 bg-yellow-400/10",
  "In Transit": "text-white-400 border-white-400/20 bg-blue-400/10",
  Sold: "text-white-400 border-white-400/20 bg-red-400/10",
};

function fmtPrice(n: number) {
  return n ? "BDT " + Math.round(n).toLocaleString("en-BD") : "P.O.A";
}

interface FilterState {
  brand: string;
  bodyStyle: string;
  status: string;
  origin: string;
  yearFrom: string;
  yearTo: string;
  priceMin: string;
  priceMax: string;
}

const initialFilters: FilterState = {
  brand: "",
  bodyStyle: "",
  status: "",
  origin: "",
  yearFrom: "",
  yearTo: "",
  priceMin: "",
  priceMax: "",
};

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { toggleWishlist, isInWishlist } = useWishlist();
  const { vehicles, loading } = useVehicles();

  // Dynamic filter options
  const filterOptions = useMemo(() => {
    const brands = new Set<string>();
    const bodyStyles = new Set<string>();
    const statuses = new Set<string>();
    const origins = new Set<string>();

    vehicles.forEach(v => {
      if (v.make) brands.add(v.make);
      if (v.body_type) bodyStyles.add(v.body_type);
      if (v.status) statuses.add(v.status);
      if (v.origin) origins.add(v.origin);
    });

    return {
      brands: Array.from(brands).sort(),
      bodyStyles: Array.from(bodyStyles).sort(),
      statuses: Array.from(statuses).sort(),
      origins: Array.from(origins).sort(),
    };
  }, [vehicles]);

  const activeFilterCount = Object.values(filters).filter(v => v !== "").length;

  const filteredVehicles = useMemo(() => {
    return vehicles.filter(v => {
      const matchSearch = `${v.make} ${v.model} ${v.year}`.toLowerCase().includes(search.toLowerCase());
      const matchBrand = !filters.brand || v.make === filters.brand;
      const matchBody = !filters.bodyStyle || v.body_type === filters.bodyStyle;
      const matchStatus = !filters.status || v.status === filters.status;
      const matchOrigin = !filters.origin || v.origin === filters.origin;
      const matchYearFrom = !filters.yearFrom || v.year >= parseInt(filters.yearFrom);
      const matchYearTo = !filters.yearTo || v.year <= parseInt(filters.yearTo);
      const matchPriceMin = !filters.priceMin || v.selling_price >= parseInt(filters.priceMin);
      const matchPriceMax = !filters.priceMax || v.selling_price <= parseInt(filters.priceMax);

      return matchSearch && matchBrand && matchBody && matchStatus && matchOrigin && matchYearFrom && matchYearTo && matchPriceMin && matchPriceMax;
    });
  }, [vehicles, search, filters]);

  const resetFilters = () => setFilters(initialFilters);

  return (
    <main className="bg-luxury-black min-h-screen pt-32 selection:bg-gold selection:text-black text-white">
      <Navbar />
      <GoBack />

      {/* Header */}
      <section className="container mx-auto px-6 md:px-12 pb-8 border-b border-white/5 relative z-20 bg-luxury-black">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] uppercase tracking-[0.8em] font-black text-gold mb-2"
            >
              Active Inventory
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-serif tracking-tighter"
            >
              The Private <span className="font-display font-medium text-white uppercase">Vault</span>
            </motion.h1>
          </div>

          <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4 items-end">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
              <input
                type="text"
                placeholder="Search models, brands..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-gold transition-colors text-white placeholder:text-white/40"
              />
            </div>

            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-full border transition-all whitespace-nowrap w-full sm:w-auto ${isFilterOpen ? 'bg-white text-black border-white' : 'bg-transparent border-white/20 text-white hover:border-gold'}`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="text-xs uppercase tracking-widest font-bold">Filters</span>
              {activeFilterCount > 0 && (
                <span className="ml-2 bg-gold text-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Filter Panel */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-white/5 border-b border-white/5"
          >
            <div className="container mx-auto px-6 md:px-12 py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Brand */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Brand</label>
                  <select
                    value={filters.brand}
                    onChange={e => setFilters({ ...filters, brand: e.target.value })}
                    className="w-full bg-luxury-gray border border-white/10 text-white py-3 px-4 rounded-sm text-sm focus:outline-none focus:border-gold appearance-none"
                  >
                    <option value="">All Brands</option>
                    {filterOptions.brands.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>

                {/* Body Style */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Body Style</label>
                  <select
                    value={filters.bodyStyle}
                    onChange={e => setFilters({ ...filters, bodyStyle: e.target.value })}
                    className="w-full bg-luxury-gray border border-white/10 text-white py-3 px-4 rounded-sm text-sm focus:outline-none focus:border-gold appearance-none"
                  >
                    <option value="">All Styles</option>
                    {filterOptions.bodyStyles.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Status</label>
                  <select
                    value={filters.status}
                    onChange={e => setFilters({ ...filters, status: e.target.value })}
                    className="w-full bg-luxury-gray border border-white/10 text-white py-3 px-4 rounded-sm text-sm focus:outline-none focus:border-gold appearance-none"
                  >
                    <option value="">All Statuses</option>
                    {filterOptions.statuses.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {/* Origin */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Origin</label>
                  <select
                    value={filters.origin}
                    onChange={e => setFilters({ ...filters, origin: e.target.value })}
                    className="w-full bg-luxury-gray border border-white/10 text-white py-3 px-4 rounded-sm text-sm focus:outline-none focus:border-gold appearance-none"
                  >
                    <option value="">All Origins</option>
                    {filterOptions.origins.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>

                {/* Year Range */}
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Year</label>
                  <div className="flex gap-4">
                    <input
                      type="number"
                      placeholder="From"
                      value={filters.yearFrom}
                      onChange={e => setFilters({ ...filters, yearFrom: e.target.value })}
                      className="w-full bg-luxury-gray border border-white/10 text-white py-3 px-4 rounded-sm text-sm focus:outline-none focus:border-gold"
                    />
                    <input
                      type="number"
                      placeholder="To"
                      value={filters.yearTo}
                      onChange={e => setFilters({ ...filters, yearTo: e.target.value })}
                      className="w-full bg-luxury-gray border border-white/10 text-white py-3 px-4 rounded-sm text-sm focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-2 lg:col-span-2">
                  <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Price Range (BDT)</label>
                  <div className="flex gap-4">
                    <input
                      type="number"
                      placeholder="Min Price"
                      value={filters.priceMin}
                      onChange={e => setFilters({ ...filters, priceMin: e.target.value })}
                      className="w-full bg-luxury-gray border border-white/10 text-white py-3 px-4 rounded-sm text-sm focus:outline-none focus:border-gold"
                    />
                    <input
                      type="number"
                      placeholder="Max Price"
                      value={filters.priceMax}
                      onChange={e => setFilters({ ...filters, priceMax: e.target.value })}
                      className="w-full bg-luxury-gray border border-white/10 text-white py-3 px-4 rounded-sm text-sm focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                <div className="flex items-end justify-end">
                  <button
                    onClick={resetFilters}
                    className="flex items-center gap-2 text-white/50 hover:text-white text-xs uppercase tracking-widest py-3 px-4 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="container mx-auto px-6 md:px-12 py-12">
        <div className="mb-8 flex justify-between items-center">
          <p className="text-white/40 text-xs font-mono uppercase tracking-widest">
            Showing {filteredVehicles.length} results
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[16/10] bg-white/5 rounded-sm mb-6" />
                <div className="h-3 bg-white/5 rounded w-1/4 mb-3" />
                <div className="h-6 bg-white/5 rounded w-2/3 mb-4" />
                <div className="h-4 bg-white/5 rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : filteredVehicles.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            <AnimatePresence>
              {filteredVehicles.map((car) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={car.id}
                  className="group relative"
                >
                  <Link to={`/inventory/${car.id}`} className="block">
                    {/* Image */}
                    <div className="relative aspect-[16/10] overflow-hidden rounded-t-sm bg-luxury-gray">
                      {car.image_url && (
                        <img
                          src={car.image_url}
                          alt={`${car.make} ${car.model}`}
                          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                        />
                      )}

                      {/* Status badge — top left */}
                      <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border backdrop-blur-sm ${STATUS_COLOURS[car.status] ?? "text-white/60 border-white/20 bg-white/10"}`}>
                        {car.status}
                      </div>

                      {/* Wishlist — top right */}
                      <button
                        onClick={(e) => { e.preventDefault(); toggleWishlist(car); }}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold/40 transition-all z-20"
                      >
                        <Heart size={14} className={isInWishlist(car.id) ? "fill-gold text-gold" : ""} />
                      </button>

                      {/* Hover arrow */}
                      <div className="absolute bottom-3 right-3 w-9 h-9 bg-white text-black rounded-full flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-300">
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Card info */}
                    <div className="pt-4 pb-4 px-4 bg-white/[0.04] backdrop-blur-sm border border-white/8 border-t-0 rounded-b-sm">

                      {/* Make + Year */}
                      <p className="text-[10px] font-black tracking-[0.25em] uppercase text-white/30 mb-1">
                        {car.make} · {car.year} · {car.origin}
                      </p>

                      {/* Model name */}
                      <h3 className="text-lg font-display font-semibold text-white group-hover:text-gold transition-colors leading-tight tracking-wide mb-3">
                        {car.model}
                      </h3>

                      {/* Key specs row */}
                      <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider text-white/40 font-medium mb-3">
                        {car.engine_cc && <span>{car.engine_cc}cc</span>}
                        {car.engine_cc && car.transmission && <span className="text-white/15">·</span>}
                        {car.transmission && <span>{car.transmission}</span>}
                        {car.fuel_type && <span className="text-white/15">·</span>}
                        {car.fuel_type && <span>{car.fuel_type}</span>}
                        {car.mileage > 0 && <span className="text-white/15">·</span>}
                        {car.mileage > 0 && <span>{car.mileage.toLocaleString()} km</span>}
                      </div>

                      {/* Price */}
                      <p className="text-xl font-display font-bold text-gold tracking-wide">
                        {fmtPrice(car.selling_price)}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="py-24 text-center border border-white/5 rounded-sm bg-white/[0.02]">
            <p className="text-2xl font-serif text-white/40 mb-6">No vehicles found matching your criteria.</p>
            <button
              onClick={() => {
                resetFilters();
                setSearch("");
              }}
              className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-xs rounded-full hover:bg-gold transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </section>

      {/* Partners Strip */}
      <section className="py-16 border-y border-white/5 bg-white/[0.01] overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <p className="text-center text-[10px] uppercase tracking-[0.4em] font-black text-white/20 mb-8">Trusted Global Partners</p>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-40 grayscale">
            {["RM Sotheby's", "Dutton Garage", "Bingo Sports", "Canepa"].map(name => (
              <span key={name} className="text-xl font-serif text-white tracking-tight">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Sourcing CTA */}
      <section className="py-24 bg-luxury-black text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-luxury-black to-luxury-black"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif text-white max-w-2xl mx-auto mb-8">
            Can't find what you're looking for?
          </h2>
          <p className="text-white/40 max-w-xl mx-auto mb-12">
            Our global network gives us access to off-market vehicles worldwide. Let our sourcing team find your perfect specification.
          </p>
          <Link to="/sourcing" className="inline-block px-10 py-5 bg-gold text-black rounded-full font-black uppercase text-xs tracking-[0.3em] hover:bg-white transition-colors">
            Initiate Sourcing Request
          </Link>
        </div>
      </section>

      <Contact />
    </main>
  );
}