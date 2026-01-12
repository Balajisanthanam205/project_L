import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { events } from "@/data/events";
import { FileText, Cpu, Map, Zap, Wrench, Brain, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const iconMap: { [key: string]: any } = {
  FileText, Cpu, Map, Zap, Wrench, Brain,
};

const EventsPreview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-widest">
            Six Unique Universes
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mt-4 mb-4 tracking-wide">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Reality
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Each event is a portal to a different dimension. Pick your universe and begin your journey.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => {
            const Icon = iconMap[event.icon];
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Link to={`/events/${event.slug}`}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="glass-card p-6 h-full transition-all duration-300 group hover:border-primary/30"
                  >
                    <div className="relative z-10">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                          isEven ? 'bg-primary/10 border border-primary/20' : 'bg-secondary/10 border border-secondary/20'
                        }`}
                      >
                        <Icon className={`w-7 h-7 ${isEven ? 'text-primary' : 'text-secondary'}`} />
                      </motion.div>

                      <h3 className="font-heading text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors tracking-wide">
                        {event.title}
                      </h3>
                      <p className="text-sm text-primary/70 mb-3">{event.tagline}</p>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {event.description}
                      </p>

                      <div className="flex items-center text-primary text-sm font-medium">
                        <span>Enter Universe</span>
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link to="/events">
            <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10 font-heading tracking-wider">
              View All Events
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default EventsPreview;
