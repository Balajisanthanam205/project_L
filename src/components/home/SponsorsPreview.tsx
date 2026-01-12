import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { sponsors } from "@/data/events";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const SponsorsPreview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Our Partners
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mt-4 mb-4">
            Powered by{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </h2>
        </motion.div>

        {/* Animated sponsor logos */}
        <div className="relative overflow-hidden py-8">
          <motion.div
            animate={{ x: [0, -50 * sponsors.length] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="flex gap-12"
          >
            {[...sponsors, ...sponsors].map((sponsor, index) => (
              <motion.div
                key={`${sponsor.id}-${index}`}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.1 * (index % sponsors.length) }}
                className="flex-shrink-0 glass-card px-8 py-6 flex items-center justify-center min-w-[180px] hover:glow-cyan transition-all duration-300"
              >
                <span className="font-heading text-lg text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
                  {sponsor.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <Link to="/sponsors">
            <Button variant="outline" className="border-primary/50 hover:bg-primary/10">
              View All Sponsors
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default SponsorsPreview;
