import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { events } from "@/data/events";
import { FileText, Cpu, Map, Zap, Wrench, Brain, ArrowRight } from "lucide-react";

const iconMap: { [key: string]: any } = {
  FileText,
  Cpu,
  Map,
  Zap,
  Wrench,
  Brain,
};

const Timeline = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="timeline" className="py-24 relative overflow-hidden">
      {/* Background - subtle */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-primary/80 font-medium text-sm uppercase tracking-widest">
            Interactive Timeline
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mt-4 mb-4 tracking-wide">
            Navigate the{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Multiverse
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Click on any portal to enter that universe. Each event is a unique dimension with its own challenges and rewards.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Central line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5 }}
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 origin-top hidden md:block"
            style={{
              background: "linear-gradient(180deg, transparent, hsl(120 70% 38% / 0.5), hsl(280 80% 42% / 0.5), transparent)",
            }}
          />

          {/* Events */}
          <div className="space-y-8 md:space-y-0">
            {events.map((event, index) => {
              const Icon = iconMap[event.icon];
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className={`relative md:flex md:items-center ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Card */}
                  <div className={`md:w-[calc(50%-3rem)] ${isLeft ? "md:pr-8" : "md:pl-8"}`}>
                    <Link to={`/events/${event.slug}`}>
                      <motion.div
                        whileHover={{ scale: 1.02, y: -5 }}
                        className="glass-card p-6 group cursor-pointer"
                      >
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl glass-card flex items-center justify-center flex-shrink-0 neon-border-green group-hover:neon-border-purple transition-all">
                            <Icon className="w-6 h-6 text-primary group-hover:text-secondary transition-colors" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-primary transition-colors tracking-wide">
                              {event.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {event.tagline}
                            </p>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {event.description}
                            </p>
                            <div className="mt-3 flex items-center text-primary/80 text-sm font-medium group-hover:gap-2 transition-all">
                              <span>Enter Universe</span>
                              <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  </div>

                  {/* Center node */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      whileHover={{ scale: 1.3 }}
                      className={`w-4 h-4 rounded-full border-2 border-background ${
                        index % 2 === 0 ? 'bg-primary' : 'bg-secondary'
                      }`}
                      style={{
                        boxShadow: index % 2 === 0 
                          ? '0 0 15px hsl(120 70% 38% / 0.4)' 
                          : '0 0 15px hsl(280 80% 42% / 0.4)'
                      }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
