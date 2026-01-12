import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { sponsors } from "@/data/events";
import { Sparkles, Building2 } from "lucide-react";

const tierColors: { [key: string]: { bg: string; border: string; text: string } } = {
  platinum: {
    bg: "from-gray-200/20 to-gray-400/20",
    border: "border-gray-300/50",
    text: "text-gray-300",
  },
  gold: {
    bg: "from-yellow-500/20 to-amber-500/20",
    border: "border-yellow-500/50",
    text: "text-yellow-500",
  },
  silver: {
    bg: "from-gray-400/20 to-gray-500/20",
    border: "border-gray-400/50",
    text: "text-gray-400",
  },
  bronze: {
    bg: "from-amber-700/20 to-orange-600/20",
    border: "border-amber-700/50",
    text: "text-amber-600",
  },
};

const Sponsors = () => {
  const platinumSponsors = sponsors.filter(s => s.tier === "platinum");
  const goldSponsors = sponsors.filter(s => s.tier === "gold");
  const silverSponsors = sponsors.filter(s => s.tier === "silver");
  const bronzeSponsors = sponsors.filter(s => s.tier === "bronze");

  const SponsorCard = ({ sponsor, size }: { sponsor: typeof sponsors[0]; size: "lg" | "md" | "sm" }) => {
    const colors = tierColors[sponsor.tier];
    const sizeClasses = {
      lg: "p-8 min-h-[180px]",
      md: "p-6 min-h-[140px]",
      sm: "p-4 min-h-[100px]",
    };

    return (
      <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        className={`glass-card ${sizeClasses[size]} bg-gradient-to-br ${colors.bg} border ${colors.border} flex flex-col items-center justify-center text-center group cursor-pointer transition-all duration-300 hover:shadow-lg`}
      >
        <Building2 className={`w-10 h-10 ${colors.text} mb-3 group-hover:scale-110 transition-transform`} />
        <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
          {sponsor.name}
        </h3>
        <span className={`text-xs uppercase tracking-wider mt-2 ${colors.text}`}>
          {sponsor.tier}
        </span>
      </motion.div>
    );
  };

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
            <span>Our Partners</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl font-bold mb-6"
          >
            Powered by{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            We're grateful to our sponsors who make this multiverse journey possible. Their support helps us create unforgettable experiences.
          </motion.p>
        </div>
      </section>

      {/* Sponsors Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Platinum */}
          {platinumSponsors.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-16"
            >
              <h2 className="font-heading text-2xl font-bold text-center mb-8 text-gray-300">
                Platinum Sponsors
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6 max-w-2xl mx-auto">
                {platinumSponsors.map((sponsor) => (
                  <SponsorCard key={sponsor.id} sponsor={sponsor} size="lg" />
                ))}
              </div>
            </motion.div>
          )}

          {/* Gold */}
          {goldSponsors.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-16"
            >
              <h2 className="font-heading text-2xl font-bold text-center mb-8 text-yellow-500">
                Gold Sponsors
              </h2>
              <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {goldSponsors.map((sponsor) => (
                  <SponsorCard key={sponsor.id} sponsor={sponsor} size="md" />
                ))}
              </div>
            </motion.div>
          )}

          {/* Silver */}
          {silverSponsors.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-16"
            >
              <h2 className="font-heading text-2xl font-bold text-center mb-8 text-gray-400">
                Silver Sponsors
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {silverSponsors.map((sponsor) => (
                  <SponsorCard key={sponsor.id} sponsor={sponsor} size="sm" />
                ))}
              </div>
            </motion.div>
          )}

          {/* Bronze */}
          {bronzeSponsors.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="font-heading text-2xl font-bold text-center mb-8 text-amber-600">
                Bronze Sponsors
              </h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                {bronzeSponsors.map((sponsor) => (
                  <SponsorCard key={sponsor.id} sponsor={sponsor} size="sm" />
                ))}
              </div>
            </motion.div>
          )}

          {/* Become a Sponsor CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-20 glass-card p-8 md:p-12 text-center"
          >
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
              Become a Sponsor
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Join us in powering the next generation of tech innovators. Partner with ECE Symposium and connect with brilliant minds across the multiverse.
            </p>
            <a
              href="mailto:sponsors@ecesymposium.edu"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Sponsors;
