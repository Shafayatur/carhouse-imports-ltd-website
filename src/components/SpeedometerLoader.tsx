import { motion } from "motion/react";

export function SpeedometerLoader() {
    return (
        <div className="flex flex-col items-center justify-center gap-6">
            <svg viewBox="0 0 200 120" className="w-48 h-28">
                {/* Background arc */}
                <path
                    d="M 20 110 A 80 80 0 0 1 180 110"
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="6"
                    strokeLinecap="round"
                />

                {/* Animated fill arc */}
                <motion.path
                    d="M 20 110 A 80 80 0 0 1 180 110"
                    fill="none"
                    stroke="#C9A84C"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="251"
                    animate={{ strokeDashoffset: [251, 0, 251] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Tick marks */}
                {[0, 30, 60, 90, 120, 150, 180].map((angle, i) => {
                    const rad = ((angle - 180) * Math.PI) / 180;
                    const x1 = 100 + 72 * Math.cos(rad);
                    const y1 = 110 + 72 * Math.sin(rad);
                    const x2 = 100 + 62 * Math.cos(rad);
                    const y2 = 110 + 62 * Math.sin(rad);
                    return (
                        <line
                            key={i}
                            x1={x1} y1={y1} x2={x2} y2={y2}
                            stroke="rgba(255,255,255,0.2)"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                    );
                })}

                {/* Needle */}
                <motion.line
                    x1="100" y1="110"
                    animate={{
                        x2: [22, 178, 22],
                        y2: [110, 110, 110],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity={0.9}
                />

                {/* Needle base circle */}
                <circle cx="100" cy="110" r="5" fill="white" opacity="0.9" />
                <circle cx="100" cy="110" r="2.5" fill="#C9A84C" />

                {/* Speed labels */}
                {[
                    { label: "0", x: 18, y: 108 },
                    { label: "60", x: 95, y: 30 },
                    { label: "120", x: 172, y: 108 },
                ].map(({ label, x, y }) => (
                    <text
                        key={label}
                        x={x} y={y}
                        textAnchor="middle"
                        fill="rgba(255,255,255,0.25)"
                        fontSize="9"
                        fontFamily="monospace"
                    >
                        {label}
                    </text>
                ))}
            </svg>

            <motion.p
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="text-[9px] uppercase tracking-[0.5em] text-white/40 font-black"
            >
                Loading
            </motion.p>
        </div>
    );
}