import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, Users, Trophy, Zap } from "lucide-react";

const stats = [
  { icon: Cpu, value: "6", label: "Unique Events" },
  { icon: Users, value: "500+", label: "Participants" },
  { icon: Trophy, value: "₹1L+", label: "Prize Pool" },
  { icon: Zap, value: "2", label: "Days of Innovation" },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden" id="about">
      {/* Background decoration - subtle */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/3 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary/3 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-primary font-medium text-sm uppercase tracking-widest"
          >
            About the Event
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-3xl md:text-5xl font-bold mt-4 mb-6 tracking-wide"
          >
            Where{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Timelines Converge
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg"
          >
            UPAGRAHA'26 isn't just an event—it's a journey through the multiverse of technology. 
            Each event represents a unique universe with its own challenges, aesthetics, and possibilities. 
            Whether you're presenting groundbreaking research, building innovative projects, or testing your 
            knowledge, there's a universe waiting for you.
          </motion.p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="glass-card p-6 text-center group hover:border-primary/30 transition-all duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center"
              >
                <stat.icon className="w-7 h-7 text-primary" />
              </motion.div>
              <div className="font-heading text-3xl font-bold text-foreground mb-1 tracking-wide">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Feature cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {[
            {
              title: "Innovation Hub",
              description: "Present your research and projects to industry experts and academicians.",
              color: "primary",
            },
            {
              title: "Hands-on Challenges",
              description: "Build circuits, hunt for treasures, and hack solutions in intense competitions.",
              color: "secondary",
            },
            {
              title: "Network & Learn",
              description: "Connect with fellow explorers, attend workshops, and expand your knowledge.",
              color: "primary",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="glass-card p-8 group hover:border-primary/30 transition-all duration-300"
            >
              <div className={`w-full h-0.5 rounded-full bg-${feature.color} mb-6 opacity-50`} />
              <h3 className="font-heading text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors tracking-wide">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
