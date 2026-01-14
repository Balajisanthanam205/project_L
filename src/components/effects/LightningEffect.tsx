import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
      const id = Date.now();
      const x = Math.random() * 100;
      const delay = Math.random() * 0.3;
      const scale = 0.8 + Math.random() * 0.6; // Bigger lightning

      setLightnings((prev) => [...prev, { id, x, delay, scale }]);

      // Dispatch custom event for sound
      window.dispatchEvent(new CustomEvent('lightning-strike'));

      // Remove lightning after animation
      setTimeout(() => {
        setLightnings((prev) => prev.filter((l) => l.id !== id));
      }, 2000);
    };

    // Random lightning strikes - more frequent
    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        createLightning();
        // Sometimes double strike
        if (Math.random() > 0.6) {
          setTimeout(createLightning, 150);
        }
      }
    }, 4000);

    // Initial lightning after page load
    setTimeout(createLightning, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <AnimatePresence>
        {lightnings.map((lightning) => (
          <motion.div
            key={lightning.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.7, 1, 0.5, 0] }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.2,
              delay: lightning.delay,
              times: [0, 0.05, 0.1, 0.15, 0.4, 1],
            }}
            className="absolute top-0"
            style={{ 
              left: `${lightning.x}%`,
              transform: `scale(${lightning.scale})`,
              transformOrigin: 'top center'
            }}
          >
            {/* Main lightning bolt - BIGGER */}
            <svg
              width="200"
              height="900"
              viewBox="0 0 200 900"
              className="opacity-90"
            >
              <defs>
                <filter id={`glow-${lightning.id}`} x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                  <feMerge>
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
                  <stop offset="0%" stopColor="hsl(136 100% 70%)" stopOpacity="1" />
                  <stop offset="30%" stopColor="hsl(136 100% 50%)" stopOpacity="1" />
                  <stop offset="70%" stopColor="hsl(136 100% 50%)" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="hsl(136 100% 40%)" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Lightning path - thicker */}
              <motion.path
                d={generateLightningPath()}
                stroke={`url(#lightning-gradient-${lightning.id})`}
                strokeWidth="4"
                fill="none"
                filter={`url(#glow-${lightning.id})`}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.1 }}
              />
              
              {/* Bright core */}
              <motion.path
                d={generateLightningPath()}
                stroke="hsl(136 100% 90%)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.1 }}
              />
            </svg>

            {/* Large glow effect */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-[600px] opacity-40"
              style={{
                background: "radial-gradient(ellipse at top, hsl(136 100% 50% / 0.6) 0%, hsl(136 100% 50% / 0.2) 30%, transparent 70%)",
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Ambient flash effect - more intense */}
      <AnimatePresence>
        {lightnings.map((lightning) => (
          <motion.div
            key={`flash-${lightning.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.15, 0.05, 0.1, 0] }}
            transition={{ duration: 0.5, delay: lightning.delay }}
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at top, hsl(136 100% 50% / 0.15) 0%, transparent 60%)"
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

// Generate random lightning bolt path - bigger and more dramatic
const generateLightningPath = (): string => {
  let path = "M 100 0";
  let x = 100;
  let y = 0;
  const segments = 15 + Math.floor(Math.random() * 10);

  for (let i = 0; i < segments; i++) {
    const newX = x + (Math.random() - 0.5) * 80;
    const newY = y + 40 + Math.random() * 50;
    path += ` L ${Math.max(20, Math.min(180, newX))} ${newY}`;
    x = newX;
    y = newY;

    // More branches
    if (Math.random() > 0.6 && i > 2 && i < segments - 2) {
      const branchX = x + (Math.random() - 0.5) * 100;
      const branchY = y + 50 + Math.random() * 60;
      const branchX2 = branchX + (Math.random() - 0.5) * 50;
      const branchY2 = branchY + 30 + Math.random() * 40;
      path += ` M ${x} ${y} L ${branchX} ${branchY} L ${branchX2} ${branchY2} M ${x} ${y}`;
    }
  }

  return path;
};

export default LightningEffect;
