import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { events } from "@/data/events";
import { FileText, Cpu, Map, Zap, Wrench, Brain } from "lucide-react";

// ========== EASY ADJUSTMENTS ==========
const CONFIG = {
  totalFrames: 80,           // Total number of frames
  framePrefix: "frame_",     // Prefix for frame files (e.g., frame_001.webp)
  framesFolder: "/frames/",  // Folder containing frames in public directory
};
// ======================================

const iconMap: { [key: string]: any } = {
  FileText, Cpu, Map, Zap, Wrench, Brain,
};

const ScrollVideoEvents = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [showButtons, setShowButtons] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Load all frames
  useEffect(() => {
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      
      for (let i = 1; i <= CONFIG.totalFrames; i++) {
        const img = new Image();
        const frameNumber = String(i).padStart(3, '0');
        img.src = `${CONFIG.framesFolder}${CONFIG.framePrefix}${frameNumber}.webp`;
        
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = () => {
            // If frame doesn't exist, use a placeholder or skip
            console.warn(`Frame ${frameNumber} not found`);
            resolve(null);
          };
        });
        
        loadedImages.push(img);
      }
      
      setImages(loadedImages);
      setImagesLoaded(true);
    };

    loadImages();
  }, []);

  // Draw frame based on scroll position
  useEffect(() => {
    if (!imagesLoaded || images.length === 0) return;

    const unsubscribe = scrollYProgress.on("change", (progress) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Calculate current frame (0 to totalFrames-1)
      const frameIndex = Math.min(
        Math.floor(progress * CONFIG.totalFrames),
        CONFIG.totalFrames - 1
      );

      const img = images[frameIndex];
      if (img && img.complete && img.naturalWidth > 0) {
        // Clear and draw
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Maintain aspect ratio
        const scale = Math.max(
          canvas.width / img.naturalWidth,
          canvas.height / img.naturalHeight
        );
        const x = (canvas.width - img.naturalWidth * scale) / 2;
        const y = (canvas.height - img.naturalHeight * scale) / 2;
        
        ctx.drawImage(
          img,
          x, y,
          img.naturalWidth * scale,
          img.naturalHeight * scale
        );
      }

      // Show buttons when near the end
      setShowButtons(progress > 0.85);
    });

    return () => unsubscribe();
  }, [imagesLoaded, images, scrollYProgress]);

  // Set canvas size
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <section id="events" ref={containerRef} className="relative" style={{ height: "400vh" }}>
      {/* Sticky canvas container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Canvas for video frames */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/80" />

        {/* Title - visible at start */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-widest mb-4">
            Six Unique Universes
          </span>
          <h2 className="font-heading text-4xl md:text-6xl font-bold mb-4 tracking-wide">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Reality
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Scroll to explore the multiverse
          </p>
        </motion.div>

        {/* Circular event buttons - visible at end */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showButtons ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="relative w-[500px] h-[500px] md:w-[600px] md:h-[600px]">
            {events.map((event, index) => {
              const Icon = iconMap[event.icon];
              const angle = (index / events.length) * 2 * Math.PI - Math.PI / 2;
              const radius = 200; // Distance from center (md screens)
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={showButtons ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
                  }}
                >
                  <Link to={`/events/${event.slug}`}>
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      className="glass-card p-4 md:p-5 rounded-full neon-border-green hover:neon-border-purple transition-all duration-300 group cursor-pointer"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-secondary/10 transition-colors">
                          <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary group-hover:text-secondary transition-colors" />
                        </div>
                        <span className="text-xs md:text-sm font-cyber text-center text-foreground group-hover:text-primary transition-colors whitespace-nowrap">
                          {event.title.split(' ')[0]}
                        </span>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}

            {/* Center text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={showButtons ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
            >
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-primary text-glow-green">
                ENTER
              </h3>
              <p className="text-sm text-muted-foreground">
                Your Universe
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Fallback if frames not loaded */}
        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-background">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading experience...</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ScrollVideoEvents;
