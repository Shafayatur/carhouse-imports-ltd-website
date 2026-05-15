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
    <section className="py-32 bg-luxury-black border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <p className="text-[10px] uppercase tracking-[0.8em] font-black text-gold mb-6">Common Enquiries</p>
            <h2 className="text-4xl md:text-6xl font-serif italic text-white tracking-tighter">Strategic Intelligence</h2>
          </motion.div>

          <div className="space-y-4">
            {list.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className={`border transition-all duration-500 ${openIndex === idx ? "border-gold/30 bg-gold/[0.02]" : "border-white/5 bg-white/[0.01]"}`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-8 text-left gap-8"
                >
                  <h3 className="text-lg md:text-xl font-serif italic text-white">{item.question}</h3>
                  <div className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-colors ${openIndex === idx ? "border-gold text-gold" : "border-white/10 text-white/30"}`}>
                    {openIndex === idx ? <Minus size={16} /> : <Plus size={16} />}
                  </div>
                </button>
                {openIndex === idx && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-8 pb-8"
                  >
                    <p className="text-white/40 leading-relaxed font-light text-lg">{item.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}