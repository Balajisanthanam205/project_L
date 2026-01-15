import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ========== EASY ADJUSTMENTS ==========
export const LIGHTNING_CONFIG = {
  intervalMs: 2000,           // Time between lightning checks (lower = more frequent)
  strikeChance: 0.6,          // Probability of strike (0-1, higher = more strikes)
  doubleStrikeChance: 0.5,    // Probability of double strike when striking
  doubleStrikeDelayMs: 150,   // Delay between double strikes
  initialDelayMs: 800,        // Delay before first lightning after page load
  minScale: 0.9,              // Minimum lightning size
  maxScale: 1.5,              // Maximum lightning size
};
// ======================================

interface Lightning {
  id: number;
  x: number;
  delay: number;
  scale: number;
}

const LightningEffect = () => {
  const [lightnings, setLightnings] = useState<Lightning[]>([]);

  useEffect(() => {
    const createLightning = () => {
      const id = Date.now() + Math.random();
      const x = Math.random() * 100;
      const delay = Math.random() * 0.2;
      const scale = LIGHTNING_CONFIG.minScale + Math.random() * (LIGHTNING_CONFIG.maxScale - LIGHTNING_CONFIG.minScale);

      setLightnings((prev) => [...prev, { id, x, delay, scale }]);

      // Dispatch custom event for thunder sound
      window.dispatchEvent(new CustomEvent('lightning-strike'));

      // Remove lightning after animation
      setTimeout(() => {
        setLightnings((prev) => prev.filter((l) => l.id !== id));
      }, 2000);
    };

    // Lightning strikes based on config
    const interval = setInterval(() => {
      if (Math.random() < LIGHTNING_CONFIG.strikeChance) {
        createLightning();
        // Sometimes double strike
        if (Math.random() < LIGHTNING_CONFIG.doubleStrikeChance) {
          setTimeout(createLightning, LIGHTNING_CONFIG.doubleStrikeDelayMs);
        }
      }
    }, LIGHTNING_CONFIG.intervalMs);

    // Initial lightning after page load
    setTimeout(createLightning, LIGHTNING_CONFIG.initialDelayMs);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence>
        {lightnings.map((lightning) => (
          <motion.div
            key={lightning.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.8, 1, 0.6, 0] }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.0,
              delay: lightning.delay,
              times: [0, 0.03, 0.08, 0.12, 0.3, 1],
            }}
            className="absolute top-0"
            style={{ 
              left: `${lightning.x}%`,
              transform: `scale(${lightning.scale})`,
              transformOrigin: 'top center'
            }}
          >
            {/* Main lightning bolt */}
            <svg
              width="250"
              height="1000"
              viewBox="0 0 250 1000"
              className="opacity-95"
            >
              <defs>
                <filter id={`glow-${lightning.id}`} x="-100%" y="-50%" width="300%" height="200%">
                  <feGaussianBlur stdDeviation="12" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient
                  id={`lightning-gradient-${lightning.id}`}
                  x1="0%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="hsl(136 100% 80%)" stopOpacity="1" />
                  <stop offset="20%" stopColor="hsl(136 100% 60%)" stopOpacity="1" />
                  <stop offset="60%" stopColor="hsl(136 100% 50%)" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="hsl(136 100% 40%)" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Outer glow path */}
              <motion.path
                d={generateLightningPath()}
                stroke={`url(#lightning-gradient-${lightning.id})`}
                strokeWidth="6"
                fill="none"
                filter={`url(#glow-${lightning.id})`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.08 }}
              />
              
              {/* Bright core */}
              <motion.path
                d={generateLightningPath()}
                stroke="hsl(136 100% 95%)"
                strokeWidth="3"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.08 }}
              />
            </svg>

            {/* Large glow effect */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-[700px] opacity-50"
              style={{
                background: "radial-gradient(ellipse at top, hsl(136 100% 50% / 0.7) 0%, hsl(136 100% 50% / 0.3) 25%, transparent 60%)",
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Ambient flash effect */}
      <AnimatePresence>
        {lightnings.map((lightning) => (
          <motion.div
            key={`flash-${lightning.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0.08, 0.15, 0] }}
            transition={{ duration: 0.4, delay: lightning.delay }}
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at top, hsl(136 100% 50% / 0.2) 0%, transparent 50%)"
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

// Generate random lightning bolt path - dramatic and branching
const generateLightningPath = (): string => {
  let path = "M 125 0";
  let x = 125;
  let y = 0;
  const segments = 18 + Math.floor(Math.random() * 8);

  for (let i = 0; i < segments; i++) {
    const newX = x + (Math.random() - 0.5) * 100;
    const newY = y + 35 + Math.random() * 45;
    path += ` L ${Math.max(30, Math.min(220, newX))} ${newY}`;
    x = newX;
    y = newY;

    // Add branches
    if (Math.random() > 0.55 && i > 1 && i < segments - 2) {
      const branchX = x + (Math.random() - 0.5) * 120;
      const branchY = y + 40 + Math.random() * 50;
      const branchX2 = branchX + (Math.random() - 0.5) * 60;
      const branchY2 = branchY + 25 + Math.random() * 35;
      path += ` M ${x} ${y} L ${branchX} ${branchY} L ${branchX2} ${branchY2} M ${x} ${y}`;
    }
  }

  return path;
};

export default LightningEffect;
