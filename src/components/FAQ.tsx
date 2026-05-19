import { motion } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { useFaqItems } from "@/hooks/useSupabase";

const fallbackFaqs = [
  {
    question: "How do you verify the provenance of exotic imports?",
    answer: "Every vehicle we represent undergoes a rigorous multi-stage verification process. This includes physical inspection by era-specific experts, documentation cross-referencing with manufacturer archives, and exhaustive chassis-number history tracking. We only handle assets with clear, documented pedigree."
  },
  {
    question: "Do you handle the entire logistics and registration process?",
    answer: "Yes. Our concierge service provides a true 'door-to-door' experience. We manage high-security transport, customs clearance, environmental compliance testing, and local registration. Your asset arrives fully prepared and road-legal in your jurisdiction."
  },
  {
    question: "Can I request a specific configuration of a vintage model?",
    answer: "Our Global Sourcing division specializes in uncovering specific off-market configurations. Through our intelligence network with specialists like RM Sotheby's and Dutton Garage, we can often locate exact exterior/interior pairings and specific factory options that are not publicly listed."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { faqs, loading } = useFaqItems();

  const list = (!loading && faqs.length > 0) ? faqs : fallbackFaqs;

  return (
    <section className="py-20 bg-luxury-black border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          
          {/* Sleek, Compact Header */}
          <div className="text-center mb-16 space-y-3">
            <p className="text-[9px] uppercase tracking-[0.5em] font-black text-gold">Common Enquiries</p>
            <h2 className="text-3xl md:text-4xl font-serif text-white tracking-tighter uppercase">
              Strategic <span className="font-display font-medium text-white/50">Intelligence</span>
            </h2>
          </div>

          {/* Liquid Smooth Accordion Grid */}
          <div className="space-y-3">
            {list.map((item, idx) => (
              <div
                key={idx}
                className={`border transition-all duration-500 rounded-sm overflow-hidden ${
                  openIndex === idx 
                    ? "border-gold/30 bg-gold/[0.01]" 
                    : "border-white/5 bg-white/[0.005] hover:border-white/15"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 px-6 md:p-6 md:px-8 text-left gap-6 outline-none"
                >
                  <h3 className="text-[11px] md:text-xs font-display uppercase tracking-widest font-bold text-white/90">
                    {item.question}
                  </h3>
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-500 ${
                    openIndex === idx 
                      ? "border-gold text-gold rotate-180" 
                      : "border-white/10 text-white/30"
                  }`}>
                    {openIndex === idx ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>
                
                {/* Liquid Smooth Expansion Container */}
                <motion.div
                  initial={false}
                  animate={{ 
                    height: openIndex === idx ? "auto" : 0,
                    opacity: openIndex === idx ? 1 : 0
                  }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 md:px-8 md:pb-6 border-t border-white/[0.02] pt-4">
                    <p className="text-[10px] md:text-[11px] text-white/40 leading-relaxed font-light uppercase tracking-widest">
                      {item.answer}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}