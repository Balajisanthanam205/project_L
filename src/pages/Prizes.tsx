import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { events } from "@/data/events";
import { Trophy, Sparkles, Crown, Medal, Award } from "lucide-react";

const colorMap: { [key: string]: string } = {
  "paper-presentation": "from-paper-primary to-paper-secondary",
  "project-expo": "from-expo-primary to-expo-secondary",
  "treasure-hunt": "from-treasure-primary to-treasure-secondary",
  "circuit-trade": "from-circuit-primary to-circuit-secondary",
  "hardware-hack-arena": "from-hack-primary to-hack-secondary",
  "neural-nexus-quiz": "from-quiz-primary to-quiz-secondary",
};

const glowMap: { [key: string]: string } = {
  "paper-presentation": "shadow-paper-primary/30",
  "project-expo": "shadow-expo-primary/30",
  "treasure-hunt": "shadow-treasure-primary/30",
  "circuit-trade": "shadow-circuit-primary/30",
  "hardware-hack-arena": "shadow-hack-primary/30",
  "neural-nexus-quiz": "shadow-quiz-primary/30",
};

const positionIcons: { [key: string]: any } = {
  "1st": Crown,
  "2nd": Medal,
  "3rd": Award,
};

const Prizes = () => {
  const totalPrizePool = events.reduce((total, event) => {
    return total + event.prizes.reduce((eventTotal, prize) => {
      const amount = parseInt(prize.amount.replace(/[₹,]/g, ''));
      return eventTotal + amount;
    }, 0);
  }, 0);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm mb-6"
          >
            <Sparkles size={16} />
            <span>Win Big</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl font-bold mb-6"
          >
            Prizes Worth Over{" "}
            <span className="bg-gradient-to-r from-neon-orange via-neon-pink to-primary bg-clip-text text-transparent">
              ₹{(totalPrizePool / 1000).toFixed(0)}K+
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Compete across six unique universes and claim rewards that transcend reality. Each event offers exciting prizes for the top performers.
          </motion.p>
        </div>
      </section>

      {/* Total Prize Pool Banner */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto glass-card p-8 md:p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
            <div className="relative z-10">
              <Trophy className="w-16 h-16 text-primary mx-auto mb-4 animate-float" />
              <div className="font-heading text-5xl md:text-7xl font-bold bg-gradient-to-r from-neon-orange via-neon-pink to-primary bg-clip-text text-transparent mb-2">
                ₹{totalPrizePool.toLocaleString()}+
              </div>
              <p className="text-muted-foreground text-lg">Total Prize Pool</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Prize Cards by Event */}
      <section className="pb-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {events.map((event, eventIndex) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * eventIndex }}
                className={`glass-card overflow-hidden shadow-lg ${glowMap[event.slug]} hover:shadow-xl transition-all duration-300`}
              >
                {/* Header */}
                <div className={`p-6 bg-gradient-to-r ${colorMap[event.slug]} text-white`}>
                  <h3 className="font-heading text-xl font-bold">{event.title}</h3>
                  <p className="text-white/80 text-sm">{event.tagline}</p>
                </div>

                {/* Prizes */}
                <div className="p-6 space-y-4">
                  {event.prizes.map((prize, prizeIndex) => {
                    const position = prize.position.toLowerCase();
                    const IconComponent = position.includes("1st") 
                      ? Crown 
                      : position.includes("2nd") 
                      ? Medal 
                      : position.includes("3rd") 
                      ? Award 
                      : Trophy;

                    return (
                      <motion.div
                        key={prize.position}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * eventIndex + 0.05 * prizeIndex }}
                        className={`flex items-center justify-between p-4 rounded-xl ${
                          prizeIndex === 0 
                            ? `bg-gradient-to-r ${colorMap[event.slug]}/10 border border-${event.colors.primary}/30` 
                            : 'bg-muted/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full ${
                            prizeIndex === 0 
                              ? `bg-gradient-to-br ${colorMap[event.slug]}` 
                              : 'bg-muted'
                          } flex items-center justify-center`}>
                            <IconComponent className={`w-5 h-5 ${prizeIndex === 0 ? 'text-white' : 'text-muted-foreground'}`} />
                          </div>
                          <span className={`font-medium ${prizeIndex === 0 ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {prize.position}
                          </span>
                        </div>
                        <span className={`font-heading text-xl font-bold ${
                          prizeIndex === 0 ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {prize.amount}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto glass-card p-8 md:p-12 text-center"
          >
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
              Ready to Claim Your Prize?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Register now and compete in your favorite events. The multiverse awaits your talents!
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium text-lg hover:opacity-90 transition-opacity glow-cyan"
            >
              <Trophy className="w-5 h-5" />
              Register Now
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Prizes;
