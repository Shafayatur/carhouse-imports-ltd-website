import { motion } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqData = [
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
    answer: "Our Global Sourcing division specializes in uncovering specific off-market configurations. Through our intelligence network with specialists like RM Sotheby’s and Dutton Garage, we can often locate exact exterior/interior pairings and specific factory options that are not publicly listed."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
            {faqData.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="border-b border-white/10"
              >
                <button 
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full py-6 md:py-10 flex justify-between items-center text-left group"
                >
                  <span className={`text-lg md:text-2xl font-serif italic transition-colors duration-500 ${openIndex === idx ? 'text-gold' : 'text-white/60 group-hover:text-white'}`}>
                    {item.question}
                  </span>
                  <div className="text-gold">
                    {openIndex === idx ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>
                <motion.div 
                  initial={false}
                  animate={{ 
                    height: openIndex === idx ? "auto" : 0,
                    opacity: openIndex === idx ? 1 : 0
                  }}
                  className="overflow-hidden"
                >
                  <p className="pb-6 md:pb-10 text-white/40 text-[10px] md:text-base leading-relaxed max-w-3xl uppercase tracking-widest font-medium">
                    {item.answer}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
