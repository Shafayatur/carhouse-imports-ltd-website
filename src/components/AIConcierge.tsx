import { motion, AnimatePresence } from "motion/react";
import { X, Send, Bot, Sparkles } from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { GoogleGenAI } from "@google/genai";
import { useVehicles, useSiteSettings } from "@/hooks/useSupabase";
import type { Vehicle } from "@/lib/supabase";

interface Message {
  role: "user" | "model";
  text: string;
}

function fmtPrice(n: number) {
  return n ? "BDT " + Math.round(n).toLocaleString("en-BD") : "P.O.A";
}

interface AIConciergeProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AIConcierge({ isOpen, onClose }: AIConciergeProps) {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
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

  // ── Welcome message ───────────────────────────────────────────
  useEffect(() => {
    if (!settingsLoading && messages.length === 0) {
      setMessages([{ role: "model", text: welcomeMessage }]);
    }
  }, [settingsLoading, welcomeMessage]);

  // ── Lenis scroll lock ─────────────────────────────────────────
  useEffect(() => {
    const lenis = (window as any).__lenis;
    if (isOpen) { lenis?.stop(); } else { lenis?.start(); }
    return () => { lenis?.start(); };
  }, [isOpen]);

  // ── Auto scroll ───────────────────────────────────────────────
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // ── Build system instruction ONCE when vehicles/settings load ─
  // useMemo prevents rebuilding on every render
  const systemInstruction = useMemo(() => {
    if (!vehicles.length) return baseInstruction;

    // Only send essential fields — reduces token count significantly
    const vaultContext = vehicles.map(v =>
      `ID:${v.id} | ${v.make} ${v.model} ${v.year} | ${v.body_type || "Unknown"} | ${v.engine_cc}cc ${v.transmission} | ${v.fuel_type} | ${v.condition} | ${v.origin} | ${fmtPrice(v.selling_price)} | ${v.status}`
    ).join("\n");

    return `${baseInstruction}

INVENTORY (${vehicles.length} vehicles — columns: ID | Make Model Year | Body Type | Engine Transmission | Fuel | Condition | Origin | Price | Status):
${vaultContext}

RULES:
1. Only recommend cars from the inventory above using their exact ID.
2. Whenever you recommend a specific car, you MUST write: [CAR_CARD: vehicleId] — no exceptions.
3. For seating/family queries, use Body Type: SUV/MPV seats 5–7, Sedan seats 5, Coupe seats 2–4.
4. Keep responses short, elegant, and specific — always name the car make/model.
5. If no inventory match exists, mention our Global Sourcing division.`;
  }, [vehicles, baseInstruction]);

  // ── Send message ──────────────────────────────────────────────
  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setIsTyping(true);

    try {
      // API key must be VITE_ prefixed in .env to be exposed by Vite
      const key = (import.meta.env.VITE_GEMINI_API_KEY || "").trim();

      if (!key) {
        setMessages(prev => [...prev, {
          role: "model",
          text: "The intelligence network is currently offline. Please contact us directly.",
        }]);
        setIsTyping(false);
        return;
      }

      const ai = new GoogleGenAI({ apiKey: key });

      // Build conversation history (skip welcome message to save tokens)
      const history = messages
        .filter((_, i) => i > 0) // skip welcome
        .slice(-6)               // only last 6 messages to limit tokens
        .map(m => ({
          role: m.role,
          parts: [{ text: m.text }],
        }));

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          ...history,
          { role: "user", parts: [{ text: userMessage }] },
        ],
        config: {
          systemInstruction,
          temperature: 0.7,
          maxOutputTokens: 500, // limit response length
        },
      });

      const aiText = response.text ||
        "I apologize, the intelligence network is currently unavailable.";

      setMessages(prev => [...prev, { role: "model", text: aiText }]);
    } catch (error: any) {
      console.error("Gemini error:", error?.status, error?.message);

      const isQuota = error?.status === 429;
      setMessages(prev => [...prev, {
        role: "model",
        text: isQuota
          ? "Our intelligence network is experiencing high demand. Please try again in a moment, or contact us directly."
          : "I apologize, I am unable to access the intelligence network at this moment.",
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  // ── Parse [CAR_CARD: id] tags ─────────────────────────────────
  const renderMessage = (text: string) => {
    const parts = text.split(/(\[CAR_CARD: [^\]]+\])/);
    return parts.map((part, i) => {
      const match = part.match(/\[CAR_CARD: ([^\]]+)\]/);
      if (match) {
        const car = vehicles.find(v => v.id === match[1].trim());
        if (!car) return null;
        return <CarCard key={i} car={car} onClose={() => onClose()} />;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => onClose()}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[498]"
            />

            {/* Chat panel */}
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-0 bottom-0 md:inset-auto md:bottom-8 md:right-8 z-[500] w-full md:w-[450px] md:h-[700px] max-h-[90vh] md:max-h-[85vh] bg-luxury-black border-l md:border border-white/10 md:rounded-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/5 bg-white/[0.02] flex justify-between items-center shrink-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center relative">
                    <Bot size={20} className="text-gold" />
                    <div className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-black" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] font-black text-gold">Concierge AI</p>
                    <p className="text-sm font-serif text-white/50">
                      {vehicles.length > 0 ? `${vehicles.length} assets indexed` : "Digital Intelligence"}
                    </p>
                  </div>
                </div>
                <button onClick={() => onClose()} className="p-2 text-white/20 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Messages */}
              <div ref={scrollRef} data-lenis-prevent className="flex-1 min-h-0 overflow-y-auto p-6 space-y-6">
                {messages.map((m, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`max-w-[85%] p-5 rounded-2xl text-sm font-medium leading-relaxed ${m.role === "user"
                      ? "bg-gold text-black rounded-tr-none"
                      : "bg-white/5 text-white/80 border border-white/5 rounded-tl-none"
                      }`}>
                      {renderMessage(m.text)}
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/5 p-4 rounded-xl flex gap-1 border border-white/5">
                      {[0, 0.2, 0.4].map((delay, i) => (
                        <motion.div key={i}
                          animate={{ opacity: [0, 1, 0] }}
                          transition={{ repeat: Infinity, duration: 1, delay }}
                          className="w-1.5 h-1.5 bg-gold rounded-full"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-6 border-t border-white/5 bg-white/[0.01] shrink-0">
                <div className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleSend()}
                    placeholder="Describe your requirement..."
                    className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-6 pr-16 text-white text-sm focus:ring-1 focus:ring-gold focus:border-gold outline-none placeholder:text-white/20"
                  />
                  <button
                    onClick={handleSend}
                    disabled={isTyping}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-gold text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50"
                  >
                    <Send size={16} />
                  </button>
                </div>
                <p className="text-[8px] uppercase tracking-[0.3em] text-white/10 mt-3 text-center">
                  Intelligence index · {vehicles.length} assets
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Car card ──────────────────────────────────────────────────────────────────
function CarCard({ car, onClose }: { car: Vehicle; onClose: () => void }) {
  return (
    <Link to={`/inventory/${car.id}`} onClick={onClose} className="block mt-4 group">
      <div className="bg-white/[0.03] border border-white/5 rounded-lg overflow-hidden transition-all duration-500 group-hover:border-gold/30">
        <div className="aspect-[16/10] relative overflow-hidden bg-white/5">
          {car.image_url ? (
            <img src={car.image_url} alt={`${car.make} ${car.model}`}
              className="w-full h-full object-cover transition-all duration-700" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-white/10 text-2xl font-black">{car.make}</p>
            </div>
          )}
          <div className="absolute top-2 right-2 px-2 py-1 bg-gold text-black text-[8px] font-black uppercase rounded-sm">
            {car.condition}
          </div>
        </div>
        <div className="p-4">
          <p className="text-[8px] uppercase tracking-widest text-gold font-bold mb-1">{car.make}</p>
          <p className="text-sm font-serif text-white group-hover:text-gold transition-colors">{car.model}</p>
          <div className="flex justify-between items-center mt-2">
            <p className="text-[10px] text-white/30 font-black">
              {car.selling_price ? "BDT " + Math.round(car.selling_price).toLocaleString("en-BD") : "P.O.A"}
            </p>
            <Sparkles size={12} className="text-gold opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </Link>
  );
}