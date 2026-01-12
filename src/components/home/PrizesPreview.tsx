import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { events } from "@/data/events";
import { Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const PrizesPreview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Get first 3 events for preview
  const previewEvents = events.slice(0, 3);

  const colorMap: { [key: string]: string } = {
    "paper-presentation": "from-paper-primary to-paper-secondary",
    "project-expo": "from-expo-primary to-expo-secondary",
    "treasure-hunt": "from-treasure-primary to-treasure-secondary",
  };

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Win Big
          </span>
          <h2 className="font-heading text-3xl md:text-5xl font-bold mt-4 mb-4">
            Prizes Worth Over{" "}
            <span className="bg-gradient-to-r from-neon-orange to-neon-pink bg-clip-text text-transparent">
              ₹1,00,000+
            </span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Compete across universes and claim rewards that transcend reality.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {previewEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="glass-card p-6 relative overflow-hidden group"
            >
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${colorMap[event.slug]}`}
              />

              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorMap[event.slug]} flex items-center justify-center`}
                >
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-heading font-semibold text-foreground">
                  {event.title}
                </h3>
              </div>

              <div className="space-y-3">
                {event.prizes.slice(0, 3).map((prize, i) => (
                  <div
                    key={prize.position}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                  >
                    <span className="text-sm text-muted-foreground">{prize.position}</span>
                    <span className="font-heading font-bold text-foreground">{prize.amount}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link to="/prizes">
            <Button variant="outline" className="border-primary/50 hover:bg-primary/10">
              View All Prizes
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default PrizesPreview;
