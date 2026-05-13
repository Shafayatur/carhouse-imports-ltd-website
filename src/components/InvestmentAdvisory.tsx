import { motion } from "motion/react";
import { TrendingUp, BarChart3, Landmark } from "lucide-react";

export function InvestmentAdvisory() {
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
              <p className="text-white/40 text-lg leading-relaxed max-w-xl">
                We don't just sell cars; we curate portfolios. In the last decade, rare automotive assets have outperformed traditional indices. Our advisory services help you identify high-growth potential models.
              </p>
              
              <div className="space-y-6 pt-8">
                <div className="flex gap-6 items-start">
                   <div className="w-12 h-12 flex-shrink-0 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                     <TrendingUp size={20} className="text-gold" />
                   </div>
                   <div>
                     <h4 className="text-xl font-display font-bold uppercase tracking-widest">Market Analysis</h4>
                     <p className="text-sm text-white/30 mt-2">Real-time data on auction trends and private sale realizations across global markets.</p>
                   </div>
                </div>
                <div className="flex gap-6 items-start">
                   <div className="w-12 h-12 flex-shrink-0 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                     <Landmark size={20} className="text-gold" />
                   </div>
                   <div>
                     <h4 className="text-xl font-display font-bold uppercase tracking-widest">Off-Market Sourcing</h4>
                     <p className="text-sm text-white/30 mt-2">Access to private collections that never reach the public eye.</p>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:w-1/2 relative">
             <div className="relative aspect-[4/5] rounded-sm overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=2574&auto=format&fit=crop" 
                  alt="Classic Car Engine" 
                  className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent " />
             </div>
             
             {/* Stats Card */}
             <motion.div 
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               className="absolute -bottom-10 -left-10 glass p-8 rounded-sm hidden md:block max-w-[280px]"
             >
                <div className="flex items-center gap-4 mb-4">
                  <BarChart3 size={24} className="text-gold" />
                  <span className="text-[10px] uppercase font-bold tracking-widest">Performance</span>
                </div>
                <p className="text-4xl font-display font-bold text-white mb-2">+142%</p>
                <p className="text-xs text-white/40 leading-relaxed">Average appreciation of our sourced limited-run Porsches over 5 years.</p>
             </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
