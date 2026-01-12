import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { events } from "@/data/events";
import { 
  FileText, Cpu, Map, Zap, Wrench, Brain, 
  ArrowLeft, ArrowRight, Clock, MapPin, Trophy, 
  Users, CheckCircle, AlertCircle, Mail, Phone,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useState, useEffect } from "react";

const iconMap: { [key: string]: any } = {
  FileText,
  Cpu,
  Map,
  Zap,
  Wrench,
  Brain,
};

const themeStyles: { [key: string]: { 
  gradient: string; 
  bgPattern: string;
  accentBg: string;
  buttonGradient: string;
  glowColor: string;
}} = {
  "paper-presentation": {
    gradient: "from-paper-primary via-paper-primary/50 to-transparent",
    bgPattern: "",
    accentBg: "bg-paper-primary/10",
    buttonGradient: "from-paper-primary to-paper-secondary",
    glowColor: "shadow-paper-primary/30",
  },
  "project-expo": {
    gradient: "from-expo-primary via-expo-primary/50 to-transparent",
    bgPattern: "",
    accentBg: "bg-expo-primary/10",
    buttonGradient: "from-expo-primary to-expo-secondary",
    glowColor: "shadow-expo-primary/30",
  },
  "treasure-hunt": {
    gradient: "from-treasure-primary via-treasure-primary/50 to-transparent",
    bgPattern: "scanlines",
    accentBg: "bg-treasure-primary/10",
    buttonGradient: "from-treasure-primary to-treasure-secondary",
    glowColor: "shadow-treasure-primary/30",
  },
  "circuit-trade": {
    gradient: "from-circuit-primary via-circuit-primary/50 to-transparent",
    bgPattern: "circuit-lines",
    accentBg: "bg-circuit-primary/10",
    buttonGradient: "from-circuit-primary to-circuit-secondary",
    glowColor: "shadow-circuit-primary/30",
  },
  "hardware-hack-arena": {
    gradient: "from-hack-primary via-hack-primary/50 to-transparent",
    bgPattern: "",
    accentBg: "bg-hack-primary/10",
    buttonGradient: "from-hack-primary to-hack-secondary",
    glowColor: "shadow-hack-primary/30",
  },
  "neural-nexus-quiz": {
    gradient: "from-quiz-primary via-quiz-primary/50 to-transparent",
    bgPattern: "neural-bg",
    accentBg: "bg-quiz-primary/10",
    buttonGradient: "from-quiz-primary to-quiz-secondary",
    glowColor: "shadow-quiz-primary/30",
  },
};

const EventPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [event, setEvent] = useState(events.find(e => e.slug === slug));
  const styles = slug ? themeStyles[slug] : themeStyles["paper-presentation"];
  const Icon = event ? iconMap[event.icon] : FileText;

  useEffect(() => {
    setEvent(events.find(e => e.slug === slug));
  }, [slug]);

  if (!event) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold mb-4">Event Not Found</h1>
            <Link to="/events">
              <Button>Back to Events</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // Get prev/next events
  const currentIndex = events.findIndex(e => e.slug === slug);
  const prevEvent = events[currentIndex - 1];
  const nextEvent = events[currentIndex + 1];

  return (
    <Layout>
      {/* Hero Section */}
      <section className={`relative min-h-[70vh] flex items-center pt-20 overflow-hidden ${styles.bgPattern}`}>
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${styles.gradient} opacity-20`} />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          {slug === "treasure-hunt" && (
            <>
              <motion.div
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-1/4 left-1/4 w-2 h-2 bg-treasure-primary rounded-full"
              />
              <motion.div
                animate={{ opacity: [0.3, 0.1, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute top-1/2 right-1/3 w-1 h-1 bg-treasure-secondary rounded-full"
              />
            </>
          )}
          {slug === "neural-nexus-quiz" && (
            <svg className="absolute inset-0 w-full h-full opacity-10">
              {[...Array(20)].map((_, i) => (
                <motion.circle
                  key={i}
                  cx={`${Math.random() * 100}%`}
                  cy={`${Math.random() * 100}%`}
                  r="3"
                  fill="hsl(150 80% 45%)"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
                />
              ))}
            </svg>
          )}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6"
            >
              <Link
                to="/events"
                className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Events
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`inline-flex items-center gap-3 px-4 py-2 rounded-full ${styles.accentBg} text-foreground text-sm mb-6`}
            >
              <Icon className="w-4 h-4" />
              <span>Universe {String(currentIndex + 1).padStart(2, '0')}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
            >
              {event.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-xl md:text-2xl font-medium bg-gradient-to-r ${styles.buttonGradient} bg-clip-text text-transparent mb-6`}
            >
              {event.tagline}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-muted-foreground max-w-2xl mb-8"
            >
              {event.heroSubtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                size="lg"
                className={`bg-gradient-to-r ${styles.buttonGradient} text-white hover:opacity-90 px-8 py-6 text-lg shadow-lg ${styles.glowColor}`}
              >
                Register Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 mb-12"
            >
              <h2 className="font-heading text-2xl font-bold mb-4">About This Event</h2>
              <p className="text-muted-foreground text-lg">{event.description}</p>
            </motion.div>

            {/* Rounds */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="font-heading text-2xl font-bold mb-6">Event Rounds</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {event.rounds.map((round, index) => (
                  <motion.div
                    key={round.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`glass-card p-6 border-t-4 border-t-transparent bg-gradient-to-br ${styles.gradient.replace('to-transparent', 'to-card')}`}
                    style={{ borderTopColor: `hsl(var(--${event.colors.primary}))` }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${styles.buttonGradient} flex items-center justify-center text-white font-bold text-sm`}>
                        {index + 1}
                      </div>
                      <h3 className="font-heading font-semibold text-foreground">{round.name}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">{round.description}</p>
                    {round.duration && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{round.duration}</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Rules & Eligibility */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-card p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-primary" />
                  <h2 className="font-heading text-xl font-bold">Rules</h2>
                </div>
                <ul className="space-y-3">
                  {event.rules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-3 text-muted-foreground">
                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${styles.buttonGradient} mt-2 flex-shrink-0`} />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="glass-card p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Users className="w-6 h-6 text-primary" />
                  <h2 className="font-heading text-xl font-bold">Eligibility</h2>
                </div>
                <ul className="space-y-3">
                  {event.eligibility.map((item, index) => (
                    <li key={index} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle className="w-5 h-5 text-quiz-primary flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Schedule */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-6 mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-primary" />
                <h2 className="font-heading text-xl font-bold">Schedule</h2>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {event.schedule.map((item, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg ${styles.accentBg} border border-border/50`}
                  >
                    <div className="font-heading font-bold text-foreground">{item.time}</div>
                    <div className="text-muted-foreground text-sm">{item.activity}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Prizes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="w-6 h-6 text-primary" />
                <h2 className="font-heading text-xl font-bold">Prizes</h2>
              </div>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                {event.prizes.map((prize, index) => (
                  <motion.div
                    key={prize.position}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`glass-card p-6 text-center ${index === 0 ? `border-2 ${styles.glowColor} shadow-lg` : ''}`}
                  >
                    <div className="font-heading text-3xl font-bold text-foreground mb-2">
                      {prize.amount}
                    </div>
                    <div className="text-muted-foreground text-sm">{prize.position}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-6 mb-12"
            >
              <h2 className="font-heading text-xl font-bold mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {event.faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left hover:text-primary">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>

            {/* Coordinators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-6 mb-12"
            >
              <h2 className="font-heading text-xl font-bold mb-6">Event Coordinators</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {event.coordinators.map((coord, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${styles.buttonGradient} flex items-center justify-center text-white font-bold text-lg`}>
                      {coord.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-heading font-semibold text-foreground">{coord.name}</div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Phone className="w-3 h-3" />
                        <span>{coord.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Mail className="w-3 h-3" />
                        <a href={`mailto:${coord.email}`} className="hover:text-primary transition-colors">
                          {coord.email}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`rounded-2xl p-8 md:p-12 text-center bg-gradient-to-br ${styles.gradient.replace('to-transparent', 'to-card/50')}`}
            >
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
                Ready to Enter This Universe?
              </h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Don't miss your chance to be part of this incredible experience. Register now and secure your spot!
              </p>
              <Button
                size="lg"
                className={`bg-gradient-to-r ${styles.buttonGradient} text-white hover:opacity-90 px-8 py-6 text-lg shadow-lg ${styles.glowColor}`}
              >
                Register for {event.title}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
              {prevEvent ? (
                <Link to={`/events/${prevEvent.slug}`}>
                  <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {prevEvent.title}
                  </Button>
                </Link>
              ) : (
                <div />
              )}
              {nextEvent && (
                <Link to={`/events/${nextEvent.slug}`}>
                  <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                    {nextEvent.title}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EventPage;
