import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Users, Trophy, Rocket, Target } from "lucide-react";

const stats = [
  { icon: Users, label: "PARTICIPANTS", value: 2847, suffix: "+" },
  { icon: Trophy, label: "EVENTS HOSTED", value: 48, suffix: "" },
  { icon: Rocket, label: "PROJECTS", value: 156, suffix: "+" },
  { icon: Target, label: "SUCCESS RATE", value: 94, suffix: "%" },
];

// Counter Component for Animated Numbers
const Counter = ({ target, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = target / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden bg-black" id="about">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Mission Text with Honeycomb Background */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-6 relative"
          >
            {/* Honeycomb Pattern Background - Left Half Only */}
            <div className="absolute inset-0 -left-8 opacity-10 overflow-hidden">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="hexagons" width="80" height="70" patternUnits="userSpaceOnUse">
                    <path
                      d="M 40 0 L 60 17.5 L 60 52.5 L 40 70 L 20 52.5 L 20 17.5 Z"
                      fill="none"
                      stroke="rgb(249, 115, 22)"
                      strokeWidth="1"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hexagons)" />
              </svg>
            </div>

            {/* Gradient Overlay for Honeycomb */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/50 to-black pointer-events-none" />

            {/* Content - Relative positioning to appear above honeycomb */}
            <div className="relative z-10">
              {/* Section Label */}
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-orange-500/60" />
                <span className="text-orange-500 font-mono text-sm uppercase tracking-[0.3em]">
                  Electronics Department
                </span>
                <div className="h-px w-8 bg-orange-500/60" />
              </div>

              {/* Main Title */}
              <div className="space-y-2 mt-6">
                <h2 className="font-bold text-4xl md:text-5xl text-white tracking-wide">
                  THE
                </h2>
                <h2 className="font-bold text-4xl md:text-5xl text-orange-500 tracking-wide">
                  CORE
                </h2>
                <h2 className="font-bold text-4xl md:text-5xl text-white tracking-wide">
                  MISSION
                </h2>
              </div>

              {/* Description */}
              <div className="space-y-4 text-gray-400 leading-relaxed mt-6">
                <p>
                  The Electronics Department stands at the forefront of technological innovation, 
                  bridging the gap between theoretical excellence and practical engineering mastery.
                </p>
                <p>
                  Our commitment to{" "}
                  <span className="text-orange-500 font-semibold">hardware excellence</span>{" "}
                  drives every initiative—from precision circuit design to cutting-edge embedded systems. 
                  We cultivate engineers who don't just understand technology; they{" "}
                  <span className="text-orange-500 font-semibold">shape its future</span>.
                </p>
                <p>
                  Through rigorous training, collaborative research, and industry partnerships, 
                  we forge the next generation of innovators ready to tackle global challenges with{" "}
                  <span className="text-orange-500 font-semibold">technical precision</span>{" "}
                  and creative vision.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[500px] flex items-center justify-center"
          >
            {/* Glowing Background Effect */}
            <div className="absolute inset-0 bg-gradient-radial from-orange-500/20 via-transparent to-transparent blur-3xl" />
            
            {/* Video Container */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-orange-500/30 shadow-2xl shadow-orange-500/20">
              {/* Video Element - Add your video source here */}
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              >
                {/* Replace with your video URL */}
                <source src="/roket.mp4" type="video/mp4" />
                <source src="/roket.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>

              {/* Overlay Border Glow Effect */}
              <div className="absolute inset-0 border-2 border-orange-500/50 rounded-2xl pointer-events-none" />
              
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-20 h-20 border-l-4 border-t-4 border-orange-500 rounded-tl-2xl" />
              <div className="absolute top-0 right-0 w-20 h-20 border-r-4 border-t-4 border-orange-500 rounded-tr-2xl" />
              <div className="absolute bottom-0 left-0 w-20 h-20 border-l-4 border-b-4 border-orange-500 rounded-bl-2xl" />
              <div className="absolute bottom-0 right-0 w-20 h-20 border-r-4 border-b-4 border-orange-500 rounded-br-2xl" />
            </div>
          </motion.div>
        </div>

        {/* Statistics Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-32"
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-orange-500/60" />
              <span className="text-orange-500 font-mono text-sm uppercase tracking-[0.3em]">
                2024 ACHIEVEMENTS
              </span>
              <div className="h-px w-12 bg-orange-500/60" />
            </div>
            <h3 className="font-bold text-3xl md:text-4xl text-white">
              BY THE <span className="text-orange-500">NUMBERS</span>
            </h3>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="relative group"
              >
                {/* Card Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent rounded-xl blur-xl group-hover:blur-2xl transition-all" />
                
                {/* Card Content */}
                <div className="relative bg-gray-900/80 backdrop-blur-sm p-8 rounded-xl border border-orange-500/20 hover:border-orange-500/40 transition-all">
                  {/* Icon */}
                  <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors group-hover:scale-110 duration-300">
                    <stat.icon className="w-8 h-8 text-orange-500" />
                  </div>

                  {/* Value with Counter Animation */}
                  <div className="font-bold text-5xl text-orange-500 mb-3 text-center">
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>

                  {/* Label */}
                  <div className="font-mono text-xs text-gray-400 tracking-wider text-center">
                    {stat.label}
                  </div>

                  {/* Hover Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity"
                    whileHover={{ scale: 1.05 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;