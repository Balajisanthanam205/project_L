import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Cpu, ArrowLeft, ArrowRight, Clock, Trophy, Users, CheckCircle, AlertCircle, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const eventData = {
  id: "2",
  slug: "project-expo",
  title: "Project Expo",
  tagline: "Multiverse Labs",
  description: "Showcase your innovative prototypes and working models from parallel realities. Demonstrate the fusion of creativity and technical excellence.",
  heroSubtitle: "Showcase prototypes from parallel realities.",
  rounds: [
    { name: "Project Registration", description: "Submit project abstract and team details", duration: "Before event" },
    { name: "Setup & Display", description: "Set up your project at assigned booth", duration: "1 hour" },
    { name: "Demo & Judging", description: "Demonstrate your project to judges", duration: "20 minutes per team" },
  ],
  rules: [
    "Maximum 4 members per team",
    "Working prototype mandatory",
    "Power requirements must be specified in advance",
    "All components must be team's own",
    "Safety guidelines must be followed",
  ],
  eligibility: [
    "Open to all engineering students",
    "Projects from any domain accepted",
    "Industry collaborations allowed with disclosure",
  ],
  prizes: [
    { position: "1st Place", amount: "₹25,000" },
    { position: "2nd Place", amount: "₹15,000" },
    { position: "3rd Place", amount: "₹10,000" },
    { position: "Best Innovation", amount: "₹5,000" },
  ],
  schedule: [
    { time: "8:00 AM", activity: "Venue Opens for Setup" },
    { time: "10:00 AM", activity: "Expo Inauguration" },
    { time: "10:30 AM", activity: "Judging Round 1" },
    { time: "1:00 PM", activity: "Lunch Break" },
    { time: "2:00 PM", activity: "Public Viewing" },
    { time: "4:00 PM", activity: "Final Judging" },
    { time: "5:30 PM", activity: "Prize Distribution" },
  ],
  faqs: [
    { question: "What categories are judged?", answer: "Innovation, Technical Complexity, Presentation, and Social Impact." },
    { question: "Are simulation-only projects accepted?", answer: "Hardware prototype is preferred, but exceptional simulations may be considered." },
    { question: "Will power supply be provided?", answer: "Standard 230V AC will be available. Specify special requirements in advance." },
  ],
  coordinators: [
    { name: "Prof. Michael Chen", phone: "+91 98765 43211", email: "michael.c@ecesymposium.edu" },
    { name: "Priya Patel", phone: "+91 87654 32108", email: "priya.p@ecesymposium.edu" },
  ],
};

const styles = {
  gradient: "from-expo-primary via-expo-primary/50 to-transparent",
  accentBg: "bg-expo-primary/10",
  buttonGradient: "from-expo-primary to-expo-secondary",
  glowColor: "shadow-expo-primary/30",
};

const ProjectExpo = () => {
  return (
    <Layout>
      <section className="relative min-h-[70vh] flex items-center pt-20 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${styles.gradient} opacity-20`} />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
              <Link to="/events" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
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
              <Cpu className="w-4 h-4" />
              <span>Universe 02</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
              {eventData.title}
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className={`text-xl md:text-2xl font-medium bg-gradient-to-r ${styles.buttonGradient} bg-clip-text text-transparent mb-6`}>
              {eventData.tagline}
            </motion.p>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-lg text-muted-foreground max-w-2xl mb-8">
              {eventData.heroSubtitle}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Button size="lg" className={`bg-gradient-to-r ${styles.buttonGradient} text-white hover:opacity-90 px-8 py-6 text-lg shadow-lg ${styles.glowColor}`}>
                Register Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-8 mb-12">
              <h2 className="font-heading text-2xl font-bold mb-4">About This Event</h2>
              <p className="text-muted-foreground text-lg">{eventData.description}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
              <h2 className="font-heading text-2xl font-bold mb-6">Event Rounds</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {eventData.rounds.map((round, index) => (
                  <motion.div key={round.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="glass-card p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${styles.buttonGradient} flex items-center justify-center text-white font-bold text-sm`}>{index + 1}</div>
                      <h3 className="font-heading font-semibold text-foreground">{round.name}</h3>
                    </div>
                    <p className="text-muted-foreground text-sm mb-2">{round.description}</p>
                    {round.duration && <div className="flex items-center gap-2 text-sm text-muted-foreground"><Clock className="w-4 h-4" /><span>{round.duration}</span></div>}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4"><AlertCircle className="w-6 h-6 text-primary" /><h2 className="font-heading text-xl font-bold">Rules</h2></div>
                <ul className="space-y-3">{eventData.rules.map((rule, index) => (<li key={index} className="flex items-start gap-3 text-muted-foreground"><div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${styles.buttonGradient} mt-2 flex-shrink-0`} /><span>{rule}</span></li>))}</ul>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-card p-6">
                <div className="flex items-center gap-3 mb-4"><Users className="w-6 h-6 text-primary" /><h2 className="font-heading text-xl font-bold">Eligibility</h2></div>
                <ul className="space-y-3">{eventData.eligibility.map((item, index) => (<li key={index} className="flex items-start gap-3 text-muted-foreground"><CheckCircle className="w-5 h-5 text-primary flex-shrink-0" /><span>{item}</span></li>))}</ul>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-6 mb-12">
              <div className="flex items-center gap-3 mb-6"><Clock className="w-6 h-6 text-primary" /><h2 className="font-heading text-xl font-bold">Schedule</h2></div>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">{eventData.schedule.map((item, index) => (<div key={index} className={`p-4 rounded-lg ${styles.accentBg} border border-border/50`}><div className="font-heading font-bold text-foreground">{item.time}</div><div className="text-muted-foreground text-sm">{item.activity}</div></div>))}</div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
              <div className="flex items-center gap-3 mb-6"><Trophy className="w-6 h-6 text-primary" /><h2 className="font-heading text-xl font-bold">Prizes</h2></div>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">{eventData.prizes.map((prize, index) => (<motion.div key={prize.position} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className={`glass-card p-6 text-center ${index === 0 ? `border-2 ${styles.glowColor} shadow-lg` : ''}`}><div className="font-heading text-3xl font-bold text-foreground mb-2">{prize.amount}</div><div className="text-muted-foreground text-sm">{prize.position}</div></motion.div>))}</div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-6 mb-12">
              <h2 className="font-heading text-xl font-bold mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">{eventData.faqs.map((faq, index) => (<AccordionItem key={index} value={`item-${index}`}><AccordionTrigger className="text-left hover:text-primary">{faq.question}</AccordionTrigger><AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent></AccordionItem>))}</Accordion>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-card p-6 mb-12">
              <h2 className="font-heading text-xl font-bold mb-6">Event Coordinators</h2>
              <div className="grid sm:grid-cols-2 gap-6">{eventData.coordinators.map((coord, index) => (<div key={index} className="flex items-center gap-4"><div className={`w-14 h-14 rounded-full bg-gradient-to-br ${styles.buttonGradient} flex items-center justify-center text-white font-bold text-lg`}>{coord.name.charAt(0)}</div><div><div className="font-heading font-semibold text-foreground">{coord.name}</div><div className="flex items-center gap-2 text-muted-foreground text-sm"><Phone className="w-3 h-3" /><span>{coord.phone}</span></div><div className="flex items-center gap-2 text-muted-foreground text-sm"><Mail className="w-3 h-3" /><a href={`mailto:${coord.email}`} className="hover:text-primary transition-colors">{coord.email}</a></div></div></div>))}</div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`rounded-2xl p-8 md:p-12 text-center bg-gradient-to-br ${styles.gradient.replace('to-transparent', 'to-card/50')}`}>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">Ready to Enter This Universe?</h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">Don't miss your chance to be part of this incredible experience. Register now and secure your spot!</p>
              <Button size="lg" className={`bg-gradient-to-r ${styles.buttonGradient} text-white hover:opacity-90 px-8 py-6 text-lg shadow-lg ${styles.glowColor}`}>Register Now<ArrowRight className="ml-2 w-5 h-5" /></Button>
            </motion.div>

            <div className="flex justify-between mt-12">
              <Link to="/events/paper-presentation"><Button variant="outline" className="gap-2"><ArrowLeft className="w-4 h-4" />Paper Presentation</Button></Link>
              <Link to="/events/treasure-hunt"><Button variant="outline" className="gap-2">Treasure Hunt<ArrowRight className="w-4 h-4" /></Button></Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectExpo;