import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';

// Easy to change hero images - just update these imports
import heroBack from '@/assets/hero-multiverse.jpg';
import heroFront from '@/assets/event-expo.jpg';

const Hero = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown target date - easy to change
  const targetDate = new Date('2026-03-15T09:00:00');

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Countdown timer
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden cursor-none">
      {/* Background Layer */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ backgroundImage: `url(${heroBack})` }}
      />

      {/* Foreground Layer with Cursor Reveal Effect */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `url(${heroFront})`,
          clipPath: `circle(150px at ${cursorPos.x}px ${cursorPos.y}px)`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-background/60" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />

      {/* Custom Cursor */}
      <motion.div
        className="fixed w-4 h-4 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          background: 'hsl(120 100% 44%)',
          boxShadow: '0 0 20px hsl(120 100% 44% / 0.5)',
        }}
        animate={{
          x: cursorPos.x - 8,
          y: cursorPos.y - 8,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />

      {/* Cursor Ring */}
      <motion.div
        className="fixed w-10 h-10 rounded-full border pointer-events-none z-50"
        style={{
          borderColor: 'hsl(280 96% 38% / 0.5)',
        }}
        animate={{
          x: cursorPos.x - 20,
          y: cursorPos.y - 20,
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <img 
              src={logo} 
              alt="UPAGRAHA'26 Logo" 
              className="w-64 md:w-80 lg:w-96 mx-auto"
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm md:text-base tracking-[0.3em] text-muted-foreground uppercase mb-6"
          >
            Electronics & Communication Engineering
          </motion.p>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-4"
          >
            <span className="text-primary text-glow-green">UPAGRAHA</span>
            <span className="text-secondary">'26</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-lg md:text-xl text-muted-foreground mb-2"
          >
            National Level Technical Symposium
          </motion.p>

          {/* Date & Location */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-sm tracking-wider text-primary/80 mb-10"
          >
            MARCH 2026 • KANPUR, INDIA
          </motion.p>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex justify-center gap-4 md:gap-6 mb-10"
          >
            {[
              { value: timeLeft.days, label: 'Days' },
              { value: timeLeft.hours, label: 'Hours' },
              { value: timeLeft.minutes, label: 'Mins' },
              { value: timeLeft.seconds, label: 'Secs' },
            ].map((item, index) => (
              <div key={item.label} className="text-center">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg bg-card/50 border border-primary/20 flex items-center justify-center backdrop-blur-sm">
                  <span className="font-heading text-xl md:text-2xl font-bold text-primary">
                    {String(item.value).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground mt-1 block">{item.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base font-heading tracking-wider glow-green"
            >
              Register Now
            </Button>
            <Link to="/events">
              <Button
                size="lg"
                variant="outline"
                className="border-secondary text-secondary hover:bg-secondary/10 px-8 py-6 text-base font-heading tracking-wider"
              >
                Explore Events
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <ChevronDown size={20} className="text-primary" />
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Corner Elements */}
      <div className="absolute top-20 left-4 w-20 h-20 border-l border-t border-primary/20" />
      <div className="absolute top-20 right-4 w-20 h-20 border-r border-t border-primary/20" />
      <div className="absolute bottom-20 left-4 w-20 h-20 border-l border-b border-secondary/20" />
      <div className="absolute bottom-20 right-4 w-20 h-20 border-r border-b border-secondary/20" />
    </section>
  );
};

export default Hero;
