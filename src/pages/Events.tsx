import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { events } from "@/data/events";
import { FileText, Cpu, Map, Zap, Wrench, Brain, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const iconMap: { [key: string]: any } = {
  FileText,
  Cpu,
  Map,
  Zap,
  Wrench,
  Brain,
};

const Events = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-primary text-sm mb-6"
          >
            <Sparkles size={16} />
            <span>6 Unique Universes</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl font-bold mb-6"
          >
            Choose Your{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Universe
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Each event is a portal to a different dimension with its own unique challenges, aesthetics, and rewards. 
            Select your reality and begin your journey.
          </motion.p>
        </div>
      </section>

      {/* Events Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {events.map((event, index) => {
              const Icon = iconMap[event.icon];

              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link to={`/events/${event.slug}`}>
                    <motion.div
                      whileHover={{ y: -8, scale: 1.01 }}
                      className="glass-card p-8 h-full group overflow-hidden"
                    >
                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-6">
                          <motion.div
                            whileHover={{ rotate: 10, scale: 1.1 }}
                            className="w-16 h-16 rounded-2xl glass-card flex items-center justify-center neon-border-green group-hover:neon-border-purple transition-all"
                          >
                            <Icon className="w-8 h-8 text-primary group-hover:text-secondary transition-colors" />
                          </motion.div>
                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">Universe</div>
                            <div className="font-heading font-bold text-xl text-foreground">{String(index + 1).padStart(2, '0')}</div>
                          </div>
                        </div>

                        <h3 className="font-heading text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-sm font-medium text-primary/70 mb-4">
                          {event.tagline}
                        </p>
                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {event.description}
                        </p>

                        {/* Quick info */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          <span className="px-3 py-1 rounded-full glass-card text-muted-foreground text-xs">
                            {event.rounds.length} Rounds
                          </span>
                          <span className="px-3 py-1 rounded-full glass-card text-muted-foreground text-xs">
                            {event.prizes[0].amount} First Prize
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <Button
                            variant="ghost"
                            className="p-0 h-auto text-primary hover:bg-transparent group-hover:gap-3 transition-all"
                          >
                            Enter Universe
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Events;
