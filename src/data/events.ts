export interface Event {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  theme: string;
  heroSubtitle: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  icon: string;
  rounds: {
    name: string;
    description: string;
    duration?: string;
  }[];
  rules: string[];
  eligibility: string[];
  prizes: {
    position: string;
    amount: string;
  }[];
  schedule: {
    time: string;
    activity: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  coordinators: {
    name: string;
    phone: string;
    email: string;
  }[];
}

export const events: Event[] = [
  {
    id: "1",
    slug: "paper-presentation",
    title: "Paper Presentation",
    tagline: "Chronicles of Innovation",
    description: "Present your groundbreaking research and ideas to a council of minds across universes. Showcase your technical writing skills and innovative thinking.",
    theme: "galactic",
    heroSubtitle: "Present your ideas to a council of minds across universes.",
    colors: {
      primary: "paper-primary",
      secondary: "paper-secondary",
      accent: "neon-cyan",
    },
    icon: "FileText",
    rounds: [
      { name: "Abstract Submission", description: "Submit your research abstract for initial screening", duration: "Before event" },
      { name: "Paper Presentation", description: "Present your full paper to the panel of judges", duration: "15 minutes" },
      { name: "Q&A Session", description: "Answer questions from judges and audience", duration: "5 minutes" },
    ],
    rules: [
      "Maximum 3 members per team",
      "Paper must be original and not published elsewhere",
      "Follow IEEE format for paper submission",
      "Presentation time limit: 15 minutes",
      "Plagiarism will lead to disqualification",
    ],
    eligibility: [
      "Open to all undergraduate and postgraduate students",
      "Valid college ID required",
      "Cross-department teams allowed",
    ],
    prizes: [
      { position: "1st Place", amount: "₹15,000" },
      { position: "2nd Place", amount: "₹10,000" },
      { position: "3rd Place", amount: "₹5,000" },
    ],
    schedule: [
      { time: "9:00 AM", activity: "Registration & Check-in" },
      { time: "9:30 AM", activity: "Opening Ceremony" },
      { time: "10:00 AM", activity: "Paper Presentations Begin" },
      { time: "1:00 PM", activity: "Lunch Break" },
      { time: "2:00 PM", activity: "Presentations Continue" },
      { time: "4:30 PM", activity: "Results & Prize Distribution" },
    ],
    faqs: [
      { question: "What topics are accepted?", answer: "Any topic related to Electronics, Communication, AI/ML, IoT, or emerging technologies." },
      { question: "Is prior publication required?", answer: "No, we accept original unpublished work." },
      { question: "Can I present virtually?", answer: "No, physical presence is mandatory." },
    ],
    coordinators: [
      { name: "Dr. Sarah Mitchell", phone: "+91 98765 43210", email: "sarah.m@ecesymposium.edu" },
      { name: "Rahul Sharma", phone: "+91 87654 32109", email: "rahul.s@ecesymposium.edu" },
    ],
  },
  {
    id: "2",
    slug: "project-expo",
    title: "Project Expo",
    tagline: "Multiverse Labs",
    description: "Showcase your innovative prototypes and working models from parallel realities. Demonstrate the fusion of creativity and technical excellence.",
    theme: "neon-lab",
    heroSubtitle: "Showcase prototypes from parallel realities.",
    colors: {
      primary: "expo-primary",
      secondary: "expo-secondary",
      accent: "neon-pink",
    },
    icon: "Cpu",
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
  },
  {
    id: "3",
    slug: "treasure-hunt",
    title: "Temporal Rifts Hunt",
    tagline: "Into the Upside-Down",
    description: "Follow cryptic clues across fractured timelines and navigate through the Upside-Down. Solve puzzles that bend reality and race against time.",
    theme: "stranger-things",
    heroSubtitle: "Follow clues across fractured timelines and avoid the Upside-Down.",
    colors: {
      primary: "treasure-primary",
      secondary: "treasure-secondary",
      accent: "neon-red",
    },
    icon: "Map",
    rounds: [
      { name: "The Awakening", description: "Initial puzzle to form teams and get first clue", duration: "15 minutes" },
      { name: "Timeline Traversal", description: "Navigate through campus solving location-based puzzles", duration: "2 hours" },
      { name: "The Upside-Down", description: "Final challenge in the mystery zone", duration: "30 minutes" },
    ],
    rules: [
      "Teams of 4 members only",
      "No electronic devices allowed during hunt",
      "Physical damage to property means disqualification",
      "Clues must not be shared between teams",
      "Stay within designated areas",
    ],
    eligibility: [
      "Open to all college students",
      "Physical fitness required",
      "Team registration mandatory",
    ],
    prizes: [
      { position: "1st Place", amount: "₹12,000" },
      { position: "2nd Place", amount: "₹8,000" },
      { position: "3rd Place", amount: "₹4,000" },
    ],
    schedule: [
      { time: "2:00 PM", activity: "Team Briefing" },
      { time: "2:30 PM", activity: "The Hunt Begins" },
      { time: "4:30 PM", activity: "Hunt Ends" },
      { time: "5:00 PM", activity: "Results Announcement" },
    ],
    faqs: [
      { question: "How difficult are the puzzles?", answer: "Ranging from moderate to challenging. Teamwork is key!" },
      { question: "What should we wear?", answer: "Comfortable clothes and shoes suitable for walking/running." },
      { question: "Is it scary?", answer: "It's themed after Stranger Things but safe for all participants." },
    ],
    coordinators: [
      { name: "Vikram Singh", phone: "+91 98765 43212", email: "vikram.s@ecesymposium.edu" },
      { name: "Ananya Rao", phone: "+91 87654 32107", email: "ananya.r@ecesymposium.edu" },
    ],
  },
  {
    id: "4",
    slug: "circuit-trade",
    title: "Trade to Build",
    tagline: "Quantum Circuit Bazaar",
    description: "Trade components across realities to assemble the perfect circuit. Strategy meets electronics in this unique bazaar experience.",
    theme: "circuit-bazaar",
    heroSubtitle: "Trade components across realities to assemble the perfect circuit.",
    colors: {
      primary: "circuit-primary",
      secondary: "circuit-secondary",
      accent: "neon-green",
    },
    icon: "Zap",
    rounds: [
      { name: "Component Distribution", description: "Teams receive random components", duration: "10 minutes" },
      { name: "Trading Phase", description: "Negotiate and trade with other teams", duration: "45 minutes" },
      { name: "Assembly Phase", description: "Build the assigned circuit", duration: "1 hour" },
    ],
    rules: [
      "Teams of 2-3 members",
      "Only provided components can be used",
      "No external help or internet",
      "Trading is mandatory - no hoarding",
      "Circuit must be functional to qualify",
    ],
    eligibility: [
      "Basic electronics knowledge required",
      "ECE/EEE students preferred",
      "Other branches with electronics background welcome",
    ],
    prizes: [
      { position: "1st Place", amount: "₹10,000" },
      { position: "2nd Place", amount: "₹6,000" },
      { position: "3rd Place", amount: "₹3,000" },
    ],
    schedule: [
      { time: "10:00 AM", activity: "Registration" },
      { time: "10:30 AM", activity: "Component Distribution" },
      { time: "10:45 AM", activity: "Trading Begins" },
      { time: "11:30 AM", activity: "Assembly Phase" },
      { time: "12:30 PM", activity: "Circuit Testing" },
      { time: "1:00 PM", activity: "Results" },
    ],
    faqs: [
      { question: "What circuits will we build?", answer: "Revealed on the day. Practice basic analog and digital circuits." },
      { question: "Can we bring our own tools?", answer: "Basic tools provided. You may bring your own soldering iron." },
      { question: "What if trading fails?", answer: "Strategic trading is part of the challenge. Plan wisely!" },
    ],
    coordinators: [
      { name: "Arjun Mehta", phone: "+91 98765 43213", email: "arjun.m@ecesymposium.edu" },
      { name: "Sneha Gupta", phone: "+91 87654 32106", email: "sneha.g@ecesymposium.edu" },
    ],
  },
  {
    id: "5",
    slug: "hardware-hack-arena",
    title: "Hardware Hack Arena",
    tagline: "Echoes from the Future",
    description: "Build solutions that echo across timelines in this intense on-spot hackathon. Rapid prototyping meets creative problem-solving.",
    theme: "cyberpunk",
    heroSubtitle: "Build solutions that echo across timelines.",
    colors: {
      primary: "hack-primary",
      secondary: "hack-secondary",
      accent: "neon-pink",
    },
    icon: "Wrench",
    rounds: [
      { name: "Problem Statement Reveal", description: "Real-world problem unveiled", duration: "15 minutes" },
      { name: "Ideation", description: "Brainstorm and plan your solution", duration: "30 minutes" },
      { name: "Build Phase", description: "Develop your hardware solution", duration: "4 hours" },
      { name: "Demo", description: "Present your solution to judges", duration: "10 minutes per team" },
    ],
    rules: [
      "Teams of 3-4 members",
      "Use provided components and development boards",
      "Internet for reference only - no copy-paste code",
      "Solution must address the given problem",
      "Presentation is part of scoring",
    ],
    eligibility: [
      "Hardware/embedded systems experience preferred",
      "Cross-functional teams encouraged",
      "All engineering branches welcome",
    ],
    prizes: [
      { position: "1st Place", amount: "₹20,000" },
      { position: "2nd Place", amount: "₹12,000" },
      { position: "3rd Place", amount: "₹8,000" },
      { position: "Best Design", amount: "₹5,000" },
    ],
    schedule: [
      { time: "9:00 AM", activity: "Check-in & Setup" },
      { time: "9:30 AM", activity: "Problem Statement Reveal" },
      { time: "10:00 AM", activity: "Hacking Begins" },
      { time: "1:00 PM", activity: "Lunch (Hacking Continues)" },
      { time: "3:00 PM", activity: "Submission Deadline" },
      { time: "3:30 PM", activity: "Demos Begin" },
      { time: "5:30 PM", activity: "Results & Prizes" },
    ],
    faqs: [
      { question: "What hardware is provided?", answer: "Arduino, ESP32, sensors, actuators, and basic components." },
      { question: "Can we bring our own hardware?", answer: "Yes, but judging is based on solution, not fancy hardware." },
      { question: "Is prior code allowed?", answer: "Libraries yes, pre-written solutions no." },
    ],
    coordinators: [
      { name: "Karthik Nair", phone: "+91 98765 43214", email: "karthik.n@ecesymposium.edu" },
      { name: "Divya Sharma", phone: "+91 87654 32105", email: "divya.s@ecesymposium.edu" },
    ],
  },
  {
    id: "6",
    slug: "neural-nexus-quiz",
    title: "Neural Nexus Quiz",
    tagline: "Tech Quiz Across Timelines",
    description: "Battle through questions from past, present, and future tech. Test your knowledge across the neural network of time.",
    theme: "neural-network",
    heroSubtitle: "Battle through questions from past, present, and future tech.",
    colors: {
      primary: "quiz-primary",
      secondary: "quiz-secondary",
      accent: "neon-green",
    },
    icon: "Brain",
    rounds: [
      { name: "Prelims", description: "Written quiz to shortlist top teams", duration: "30 minutes" },
      { name: "Semifinals", description: "Rapid-fire buzzer round", duration: "45 minutes" },
      { name: "Finals", description: "Ultimate showdown with multimedia questions", duration: "1 hour" },
    ],
    rules: [
      "Teams of 2 members",
      "No electronic devices during quiz",
      "Judge's decision is final",
      "Negative marking in some rounds",
      "Time limits strictly enforced",
    ],
    eligibility: [
      "Open to all college students",
      "Passion for tech and general knowledge",
      "Mixed department teams allowed",
    ],
    prizes: [
      { position: "1st Place", amount: "₹10,000" },
      { position: "2nd Place", amount: "₹6,000" },
      { position: "3rd Place", amount: "₹3,000" },
    ],
    schedule: [
      { time: "10:00 AM", activity: "Registration" },
      { time: "10:30 AM", activity: "Prelims" },
      { time: "11:30 AM", activity: "Results & Semifinals" },
      { time: "12:30 PM", activity: "Lunch Break" },
      { time: "2:00 PM", activity: "Finals" },
      { time: "3:30 PM", activity: "Prize Distribution" },
    ],
    faqs: [
      { question: "What topics are covered?", answer: "Electronics, computers, tech history, current affairs in tech, and sci-fi!" },
      { question: "How many teams qualify for finals?", answer: "Top 4 teams from semifinals." },
      { question: "Is general knowledge included?", answer: "Primarily tech-focused with some GK elements." },
    ],
    coordinators: [
      { name: "Rohan Verma", phone: "+91 98765 43215", email: "rohan.v@ecesymposium.edu" },
      { name: "Meera Krishnan", phone: "+91 87654 32104", email: "meera.k@ecesymposium.edu" },
    ],
  },
];

export const timeline = [
  { id: "1", time: "9:00 AM", title: "Opening Ceremony", description: "Inauguration and keynote" },
  { id: "2", time: "10:00 AM", title: "Events Begin", description: "All parallel events start" },
  { id: "3", time: "1:00 PM", title: "Lunch Break", description: "Networking and refreshments" },
  { id: "4", time: "2:00 PM", title: "Afternoon Sessions", description: "Continued competitions" },
  { id: "5", time: "5:00 PM", title: "Prize Distribution", description: "Awards ceremony" },
  { id: "6", time: "6:00 PM", title: "Closing Ceremony", description: "Farewell and networking" },
];

export const sponsors = [
  { id: "1", name: "TechCorp Industries", tier: "platinum", logo: "/placeholder.svg" },
  { id: "2", name: "Innovation Labs", tier: "gold", logo: "/placeholder.svg" },
  { id: "3", name: "Future Systems", tier: "gold", logo: "/placeholder.svg" },
  { id: "4", name: "Digital Dreams", tier: "silver", logo: "/placeholder.svg" },
  { id: "5", name: "Circuit Masters", tier: "silver", logo: "/placeholder.svg" },
  { id: "6", name: "Neural Networks Inc", tier: "silver", logo: "/placeholder.svg" },
  { id: "7", name: "Quantum Computing Co", tier: "bronze", logo: "/placeholder.svg" },
  { id: "8", name: "Embedded Solutions", tier: "bronze", logo: "/placeholder.svg" },
];

export const galleryImages = [
  { id: "1", src: "/placeholder.svg", alt: "Event highlight 1", category: "events" },
  { id: "2", src: "/placeholder.svg", alt: "Workshop session", category: "workshops" },
  { id: "3", src: "/placeholder.svg", alt: "Prize ceremony", category: "prizes" },
  { id: "4", src: "/placeholder.svg", alt: "Team collaboration", category: "teams" },
  { id: "5", src: "/placeholder.svg", alt: "Project demo", category: "projects" },
  { id: "6", src: "/placeholder.svg", alt: "Keynote speech", category: "events" },
  { id: "7", src: "/placeholder.svg", alt: "Hackathon", category: "events" },
  { id: "8", src: "/placeholder.svg", alt: "Winners", category: "prizes" },
  { id: "9", src: "/placeholder.svg", alt: "Networking", category: "events" },
  { id: "10", src: "/placeholder.svg", alt: "Exhibition", category: "projects" },
  { id: "11", src: "/placeholder.svg", alt: "Quiz finals", category: "events" },
  { id: "12", src: "/placeholder.svg", alt: "Closing ceremony", category: "events" },
];
