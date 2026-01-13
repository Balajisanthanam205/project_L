import { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';

// Easy to change hero images - just update these imports
import heroBack from '@/assets/hero-multiverse.jpg';
import heroFront from '@/assets/event-expo.jpg';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorColor, setCursorColor] = useState<'green' | 'purple'>('green');
  const containerRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Raw cursor position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Smooth liquid-like movement with faster response
  const springConfig = { stiffness: 300, damping: 30, mass: 0.5 };
  const blobX = useSpring(mouseX, springConfig);
  const blobY = useSpring(mouseY, springConfig);
  
  // Slower trail for liquid effect
  const trailConfig = { stiffness: 150, damping: 25, mass: 0.8 };
  const trailX = useSpring(mouseX, trailConfig);
  const trailY = useSpring(mouseY, trailConfig);

  // Blob size animation based on movement
  const blobSize = useSpring(180, { stiffness: 200, damping: 20 });

  // Countdown target date
  const targetDate = new Date('2026-03-15T09:00:00');

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      // Pulse blob size on movement
      blobSize.set(200);
      setTimeout(() => blobSize.set(180), 100);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY, blobSize]);

  // Check for interactive elements
  useEffect(() => {
    const checkInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('interactive');
      
      setCursorColor(isInteractive ? 'purple' : 'green');
    };

    window.addEventListener('mouseover', checkInteractive);
    return () => window.removeEventListener('mouseover', checkInteractive);
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

  const cursorStyles = {
    green: {
      bg: 'radial-gradient(circle at 30% 30%, hsl(136 100% 60%), hsl(136 100% 40%))',
      glow: '0 0 30px hsl(136 100% 50% / 0.6)',
      border: 'hsl(136 100% 50% / 0.4)',
    },
    purple: {
      bg: 'radial-gradient(circle at 30% 30%, hsl(280 99% 64%), hsl(280 99% 44%))',
      glow: '0 0 30px hsl(280 99% 54% / 0.6)',
      border: 'hsl(280 99% 54% / 0.4)',
    },
  };

  return (
    <section ref={containerRef} className="relative min-h-screen w-full overflow-hidden cursor-none">
      {/* Background Layer */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ backgroundImage: `url(${heroBack})` }}
      />

      {/* Foreground Layer with Liquid Cursor Reveal Effect */}
      <motion.div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          backgroundImage: `url(${heroFront})`,
          clipPath: `url(#liquid-clip)`,
        }}
      />

      {/* SVG Clip Path for Liquid Effect */}
      <svg className="absolute w-0 h-0">
        <defs>
          <clipPath id="liquid-clip">
            <motion.ellipse
              cx={blobX}
              cy={blobY}
              rx={blobSize}
              ry={useTransform(blobSize, v => v * 0.85)}
              style={{
                filter: 'url(#goo)',
              }}
            />
          </clipPath>
          {/* Goo filter for liquid effect */}
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
              result="goo"
            />
          </filter>
        </defs>
      </svg>

      {/* Liquid Trail Effect */}
      <motion.div
        className="fixed pointer-events-none z-40 mix-blend-screen"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <div 
          className="w-64 h-64 liquid-cursor opacity-15"
          style={{
            background: cursorColor === 'green' 
              ? 'radial-gradient(circle, hsl(136 100% 50% / 0.3), transparent 70%)'
              : 'radial-gradient(circle, hsl(280 99% 54% / 0.3), transparent 70%)',
          }}
        />
      </motion.div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-background/60" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />

      {/* Custom Cursor - Liquid Blob */}
      <motion.div
        className="fixed pointer-events-none z-50"
        style={{
          x: blobX,
          y: blobY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div 
          className="w-5 h-5 liquid-cursor"
          animate={{ scale: cursorColor === 'purple' ? 1.5 : 1 }}
          transition={{ duration: 0.2 }}
          style={{
            background: cursorStyles[cursorColor].bg,
            boxShadow: cursorStyles[cursorColor].glow,
          }}
        />
      </motion.div>

      {/* Cursor Ring - Liquid */}
      <motion.div
        className="fixed pointer-events-none z-50"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div 
          className="w-10 h-10 liquid-cursor border-2"
          animate={{ scale: cursorColor === 'purple' ? 1.3 : 1 }}
          transition={{ duration: 0.2 }}
          style={{
            borderColor: cursorStyles[cursorColor].border,
          }}
        />
      </motion.div>

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
              className="w-64 md:w-80 lg:w-96 mx-auto drop-shadow-2xl"
            />
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-cyber text-xs md:text-sm tracking-[0.3em] text-muted-foreground mb-6"
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
            className="font-cyber text-xs tracking-wider text-primary/70 mb-10"
          >
            MARCH 2026 • KANPUR, INDIA
          </motion.p>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex justify-center gap-3 md:gap-5 mb-10"
          >
            {[
              { value: timeLeft.days, label: 'Days' },
              { value: timeLeft.hours, label: 'Hours' },
              { value: timeLeft.minutes, label: 'Mins' },
              { value: timeLeft.seconds, label: 'Secs' },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="glass-card w-14 h-14 md:w-16 md:h-16 flex items-center justify-center neon-border-green">
                  <span className="font-heading text-xl md:text-2xl font-bold text-primary">
                    {String(item.value).padStart(2, '0')}
                  </span>
                </div>
                <span className="font-cyber text-[10px] text-muted-foreground mt-2 block">{item.label}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center interactive"
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-base font-cyber tracking-wider btn-neon"
            >
              Register Now
            </Button>
            <Link to="/events">
              <Button
                size="lg"
                variant="outline"
                className="border-secondary/50 text-secondary hover:bg-secondary/10 hover:border-secondary px-8 py-6 text-base font-cyber tracking-wider transition-all"
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
            <span className="font-cyber text-[10px] tracking-widest">Scroll</span>
            <ChevronDown size={20} className="text-primary/70" />
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Corner Elements */}
      <div className="absolute top-20 left-4 w-16 h-16 border-l border-t border-primary/20" />
      <div className="absolute top-20 right-4 w-16 h-16 border-r border-t border-primary/20" />
      <div className="absolute bottom-20 left-4 w-16 h-16 border-l border-b border-secondary/20" />
      <div className="absolute bottom-20 right-4 w-16 h-16 border-r border-b border-secondary/20" />
    </section>
  );
};

export default Hero;
