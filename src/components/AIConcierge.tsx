import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, Bot, Sparkles } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { GoogleGenAI } from "@google/genai";
import { useVehicles, useSiteSettings } from "@/hooks/useSupabase";
import type { Vehicle } from "@/lib/supabase";

interface Message {
  role: "user" | "model";
  text: string;
}

function fmtPrice(n: number) {
  return n ? "৳ " + Math.round(n).toLocaleString("en-BD") : "P.O.A";
}

export function AIConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { vehicles } = useVehicles();
  const { get, loading: settingsLoading } = useSiteSettings();

  const welcomeMessage = get(
    "ai_welcome_message",
    "Welcome to the Digital Vault. I am your Intelligence Concierge. Describe your requirements, and I shall unveil the perfect asset from our collection."
  );

  const baseInstruction = get(
    "ai_system_instruction",
    "You are the Digital Concierge for 'Car House Imports', an ultra-luxury automotive sourcing company. Your tone is sophisticated, formal, and authoritative."
  );

  const [messages, setMessages] = useState<Message[]>([]);

  // Set welcome message once settings load
  useEffect(() => {
    if (!settingsLoading && messages.length === 0) {
      setMessages([{ role: "model", text: welcomeMessage }]);
    }
  }, [settingsLoading, welcomeMessage]);

  // Stop Lenis so background page can't scroll behind the chatbot panel
  useEffect(() => {
    const lenis = (window as any).__lenis;
    if (isOpen) {
      lenis?.stop();
    } else {
      lenis?.start();
    }
    return () => {
      lenis?.start();
    };
  }, [isOpen]);

  // Auto scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Build vault context from live Supabase vehicles
  const buildSystemInstruction = () => {
    const vaultContext = vehicles
      .map(v =>
        `- ${v.make} ${v.model} (ID: ${v.id}): ${v.year}, ${v.engine_cc}cc, ${v.transmission}, ${v.fuel_type}, ${v.condition}. Origin: ${v.origin}. Price: ${fmtPrice(v.selling_price)}. Status: ${v.status}.`
      )
      .join("\n");

    return `${baseInstruction}

CURRENT VAULT INVENTORY (${vehicles.length} vehicles):
${vaultContext || "No vehicles currently in inventory."}

INSTRUCTIONS:
1. Help users find cars based on their needs — family, performance, exclusivity, budget.
2. If we have a match, recommend 1-2 specific cars from the inventory above.
3. IMPORTANT: To display a car card, include the tag [CAR_CARD: vehicleId] in your response.
4. If we don't have exactly what they need, mention our 'Global Sourcing' division.
5. Keep responses concise and elegant.
6. Only reference vehicles that exist in the inventory list above.`;
  };

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyC_39ZGYB3O4iTws9YtBAb4iQcGS2Syct0" });
      const prevHistory = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [
          ...prevHistory,
          { role: "user", parts: [{ text: userMessage }] },
        ],
        config: {
          systemInstruction: buildSystemInstruction(),
          temperature: 0.7,
        },
      });

      const aiText = response.text || "I apologize, my connection to the vault was momentarily interrupted.";
      setMessages(prev => [...prev, { role: "model", text: aiText }]);
    } catch (error: any) {
      console.error("AI Error full:", JSON.stringify(error), error?.message, error?.status, error?.statusText);
      setMessages(prev => [...prev, {
        role: "model",
        text: "I apologize, I am unable to access the intelligence network at this moment. Please try again shortly.",
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  // Render message — parse [CAR_CARD: id] tags into real car cards
  const renderMessage = (text: string) => {
    const parts = text.split(/(\[CAR_CARD: [^\]]+\])/);
    return parts.map((part, i) => {
      const match = part.match(/\[CAR_CARD: ([^\]]+)\]/);
      if (match) {
        const carId = match[1].trim();
        const car = vehicles.find(v => v.id === carId);
        if (!car) return null;
        return <CarCard key={i} car={car} onClose={() => setIsOpen(false)} />;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <>
      {/* Trigger button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-[500] w-14 h-14 bg-gold text-black rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(197,160,40,0.3)] group border-2 border-white/20"
      >
        <Bot size={28} className="group-hover:rotate-6 transition-transform" />
        <span className="absolute right-full mr-4 px-4 py-2 bg-black/80 backdrop-blur-md text-gold text-[9px] uppercase tracking-[0.3em] font-black rounded-full border border-white/10 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Digital Concierge
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[498]"
            />

            {/* Chat panel */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-0 bottom-0 md:inset-auto md:bottom-8 md:right-8 z-[500] w-full md:w-[450px] md:h-[700px] max-h-[90vh] md:max-h-[85vh] bg-luxury-black border-l md:border border-white/10 md:rounded-2xl shadow-3xl flex flex-col overflow-hidden backdrop-blur-xl"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/5 bg-white/[0.02] flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center relative shadow-[0_0_15px_rgba(197,160,40,0.2)]">
                    <Bot size={20} className="text-gold" />
                    <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-black" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] font-black text-gold">Concierge AI</p>
                    <p className="text-sm font-serif  text-white/50">
                      {vehicles.length > 0 ? `${vehicles.length} assets indexed` : "Digital Intelligence"}
                    </p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="p-2 text-white/20 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Messages — data-lenis-prevent lets the list scroll natively */}
              <div ref={scrollRef} data-lenis-prevent className="flex-1 min-h-0 overflow-y-auto p-6 space-y-8 scroll-smooth">
                {messages.map((m, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[85%] p-5 rounded-2xl text-[13px] md:text-sm font-medium leading-[1.6] ${m.role === "user"
                      ? "bg-gold text-black rounded-tr-none"
                      : "bg-white/5 text-white/80 border border-white/5 rounded-tl-none shadow-xl shadow-black/20"
                      }`}>
                      {renderMessage(m.text)}
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 p-4 rounded-xl flex gap-1 border border-white/5">
                      <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1 }} className="w-1.5 h-1.5 bg-gold rounded-full" />
                      <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-gold rounded-full" />
                      <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-gold rounded-full" />
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-6 border-t border-white/5 bg-white/[0.01]">
                <div className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSend()}
                    placeholder="Describe your requirement..."
                    className="w-full bg-white/5 border border-white/10 rounded-full py-4 md:py-5 pl-7 md:pl-8 pr-16 text-white text-sm focus:ring-1 focus:ring-gold focus:border-gold outline-none transition-all placeholder:text-white/10"
                  />
                  <button
                    onClick={handleSend}
                    disabled={isTyping}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 md:w-12 h-10 md:h-12 bg-gold text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50"
                  >
                    <Send size={18} />
                  </button>
                </div>
                <p className="text-[7px] md:text-[8px] uppercase tracking-[0.3em] text-white/10 mt-6 text-center">
                  The Intelligence index identifies 400+ assets daily.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Car card shown inside chat ────────────────────────────────────────────────
function CarCard({ car, onClose }: { car: Vehicle; onClose: () => void }) {
  return (
    <Link
      to={`/inventory/${car.id}`}
      onClick={onClose}
      className="block mt-4 group"
    >
      <div className="bg-white/[0.03] border border-white/5 rounded-lg overflow-hidden transition-all duration-500 group-hover:border-gold/30">
        <div className="aspect-[16/10] relative overflow-hidden bg-white/5">
          {car.image_url ? (
            <img
              src={car.image_url}
              alt={`${car.make} ${car.model}`}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-white/10 text-2xl font-display font-black tracking-tighter">
                {car.make}
              </p>
            </div>
          )}
          <div className="absolute top-2 right-2 px-2 py-1 bg-gold text-black text-[8px] font-black uppercase rounded-sm">
            {car.condition}
          </div>
        </div>
        <div className="p-4">
          <p className="text-[8px] uppercase tracking-widest text-gold font-bold mb-1">{car.make}</p>
          <p className="text-sm font-serif  text-white group-hover:text-gold transition-colors">
            {car.model}
          </p>
          <div className="flex justify-between items-center mt-2">
            <p className="text-[10px] text-white/30 font-black uppercase">
              {car.selling_price ? "৳ " + Math.round(car.selling_price).toLocaleString("en-BD") : "P.O.A"}
            </p>
            <Sparkles size={12} className="text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </Link>
  );
}