import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Crown, Star, Diamond, Users, Gift, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Title Sponsor",
    price: "₹50,000+",
    icon: Crown,
    recommended: true,
    benefits: [
      "Distribute Swags",
      "Social Media Posts",
      "Stage Banner & Branding",
      "Certificates with Logo",
      "Dedicated Stall",
      "Promotional Video Display",
      "7 min Opening Ceremony Speech",
      "Title Name in Event Branding",
    ],
  },
  {
    name: "Co-Sponsor",
    price: "₹30,000 - ₹50,000",
    icon: Star,
    recommended: false,
    benefits: [
      "Distribute Swags",
      "Social Media Posts",
      "Stage Banner",
      "Certificates with Logo",
      "Stall Space",
      "Promotional Video",
      "5 min Opening Ceremony Speech",
    ],
  },
  {
    name: "Associate Sponsor",
    price: "₹15,000 - ₹30,000",
    icon: Diamond,
    recommended: false,
    benefits: [
      "Social Media Posts",
      "Stage Banner",
      "Certificates with Logo",
      "Stall Space",
      "3 min Opening Ceremony Speech",
    ],
  },
  {
    name: "Event Sponsor",
    price: "₹7,000 - ₹15,000",
    icon: Users,
    recommended: false,
    benefits: [
      "Social Media Posts",
      "Event-specific Branding",
      "Mention During Event",
      "Certificate with Logo",
    ],
  },
  {
    name: "Goodies Sponsor",
    price: "Custom",
    icon: Gift,
    recommended: false,
    benefits: [
      "Distribute Branded Goodies",
      "Social Media Shoutout",
      "Brand Name in Event Title",
      "Certificate of Appreciation",
    ],
  },
];

const Sponsors = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-6xl font-bold mb-6"
          >
            Sponsorship{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Tiers
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Partner with UPAGRAHA'26 and gain visibility among 1000+ future engineers
          </motion.p>
        </div>
      </section>

      {/* Tiers Grid */}
      <section className="pb-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {tiers.map((tier, index) => {
              const TierIcon = tier.icon;
              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative rounded-2xl p-6 border-2 ${
                    tier.recommended
                      ? "border-yellow-500 bg-gradient-to-b from-yellow-500/10 to-transparent"
                      : "border-primary/30 bg-card/50"
                  } backdrop-blur-sm hover:border-primary transition-all duration-300`}
                >
                  {tier.recommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="px-4 py-1 rounded-full bg-yellow-500 text-black text-xs font-bold uppercase tracking-wider">
                        Recommended
                      </span>
                    </div>
                  )}

                  {/* Icon */}
                  <div className="flex justify-center mb-4 mt-2">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center ${
                      tier.recommended ? "bg-yellow-500/20" : "bg-primary/20"
                    }`}>
                      <TierIcon className={`w-7 h-7 ${tier.recommended ? "text-yellow-500" : "text-primary"}`} />
                    </div>
                  </div>

                  {/* Name & Price */}
                  <h3 className={`font-heading text-xl font-bold text-center mb-2 ${
                    tier.recommended ? "text-yellow-500" : "text-primary"
                  }`}>
                    {tier.name}
                  </h3>
                  <p className={`text-center font-bold text-lg mb-6 ${
                    tier.recommended ? "text-yellow-400" : "text-primary/80"
                  }`}>
                    {tier.price}
                  </p>

                  {/* Benefits */}
                  <ul className="space-y-3 mb-6">
                    {tier.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          tier.recommended ? "text-yellow-500" : "text-primary"
                        }`} />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    className={`w-full ${
                      tier.recommended
                        ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                        : "bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50"
                    }`}
                    asChild
                  >
                    <a href="mailto:sponsors@ecesymposium.edu">Get Started</a>
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Sponsors;