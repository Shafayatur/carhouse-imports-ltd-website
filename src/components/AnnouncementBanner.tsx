import { useState } from "react";
import { X } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSupabase";
import { motion, AnimatePresence } from "motion/react";

export function AnnouncementBanner() {
    const { get, loading } = useSiteSettings();
    const [dismissed, setDismissed] = useState(false);

    if (loading) return null;

    const isActive = get("announcement_active", "false") === "true";
    const text = get("announcement_text", "");

    if (!isActive || !text || dismissed) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full bg-gold text-black z-[300] overflow-hidden"
            >
                <div className="container mx-auto px-4 md:px-12 py-2.5 flex items-center justify-between gap-4">
                    <div className="flex-1" />
                    <p className="text-[10px] uppercase tracking-[0.5em] font-black text-center flex-1">
                        {text}
                    </p>
                    <div className="flex-1 flex justify-end">
                        <button
                            onClick={() => setDismissed(true)}
                            className="text-black/50 hover:text-black transition-colors"
                        >
                            <X size={14} />
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}