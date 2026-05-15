import { motion } from "motion/react";
import { TrendingUp, BarChart3, Landmark } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSupabase";

export function InvestmentAdvisory() {
  const { get } = useSiteSettings();

  const statValue = get("advisory_stat_value", "+142%");
  const statDesc = get("advisory_stat_desc", "Average appreciation of our sourced limited-run Porsches over 5 years.");
  const body = get("advisory_body", "We don't just sell cars; we curate portfolios. In the last decade, rare automotive assets have outperformed traditional indices. Our advisory services help you identify high-growth potential models.");
  const feat1Title = get("advisory_feature1_title", "Market Analysis");
  const feat1Desc = get("advisory_feature1_desc", "Real-time data on auction trends and private sale realizations across global markets.");
  const feat2Title = get("advisory_feature2_title", "Off-Market Sourcing");
  const feat2Desc = get("advisory_feature2_desc", "Access to private collections that never reach the public eye.");
  const image = get("advisory_image_url", "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=2574&auto=format&fit=crop");

  return (
    <section className="py-24 bg-luxury-gray text-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-gold">Asset Management</span>
              <h2 className="text-5xl md:text-7xl font-display font-medium tracking-tighter leading-tight">
                Cars as <br />
                <span className="italic font-serif font-light text-gold/80">Alternate Capital</span>
              </h2>
              <p className="text-white/40 text-lg leading-relaxed max-w-xl">{body}</p>

              <div className="space-y-6 pt-8">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 flex-shrink-0 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                    <TrendingUp size={20} className="text-gold" />
                  </div>
                  <div>
                    <h4 className="text-xl font-display font-bold uppercase tracking-widest">{feat1Title}</h4>
                    <p className="text-sm text-white/30 mt-2">{feat1Desc}</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 flex-shrink-0 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                    <Landmark size={20} className="text-gold" />
                  </div>
                  <div>
                    <h4 className="text-xl font-display font-bold uppercase tracking-widest">{feat2Title}</h4>
                    <p className="text-sm text-white/30 mt-2">{feat2Desc}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:w-1/2 relative">
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
              <img
                src={image}
                alt="Advisory"
                className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="absolute -bottom-10 -left-10 glass p-8 rounded-sm hidden md:block max-w-[280px]"
            >
              <div className="flex items-center gap-4 mb-4">
                <BarChart3 size={24} className="text-gold" />
                <span className="text-[10px] uppercase font-bold tracking-widest">Performance</span>
              </div>
              <p className="text-4xl font-display font-bold text-white mb-2">{statValue}</p>
              <p className="text-xs text-white/40 leading-relaxed">{statDesc}</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}