import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
}

const FloatingParticles = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 30; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 15,
      });
    }
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 -z-5 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle, hsl(120 100% 44% / 0.6) 0%, hsl(120 100% 44% / 0) 70%)`,
            boxShadow: `0 0 ${particle.size * 2}px hsl(120 100% 44% / 0.3)`,
          }}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{
            y: "-10vh",
            opacity: [0, 0.5, 0.5, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      
      {/* Subtle purple particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`purple-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            background: `radial-gradient(circle, hsl(280 96% 38% / 0.5) 0%, hsl(280 96% 38% / 0) 70%)`,
            boxShadow: `0 0 10px hsl(280 96% 38% / 0.2)`,
          }}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{
            y: "-10vh",
            opacity: [0, 0.4, 0.4, 0],
          }}
          transition={{
            duration: Math.random() * 25 + 20,
            delay: Math.random() * 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParticles;
