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
    for (let i = 0; i < 25; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 3 + 1,
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
            background: `radial-gradient(circle, hsl(136 100% 50% / 0.5) 0%, hsl(136 100% 50% / 0) 70%)`,
            boxShadow: `0 0 ${particle.size * 2}px hsl(136 100% 50% / 0.3)`,
          }}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{
            y: "-10vh",
            opacity: [0, 0.6, 0.6, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      
      {/* Purple particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`purple-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            width: Math.random() * 2 + 1,
            height: Math.random() * 2 + 1,
            background: `radial-gradient(circle, hsl(280 99% 54% / 0.4) 0%, hsl(280 99% 54% / 0) 70%)`,
            boxShadow: `0 0 8px hsl(280 99% 54% / 0.2)`,
          }}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{
            y: "-10vh",
            opacity: [0, 0.5, 0.5, 0],
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
