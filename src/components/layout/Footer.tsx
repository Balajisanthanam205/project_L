import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-card/50 border-t border-border/30 overflow-hidden backdrop-blur-sm">
      {/* Subtle decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex flex-col">
                <span className="font-heading font-bold text-xl text-primary tracking-wider">UPAGRAHA'26</span>
                <span className="text-xs text-muted-foreground tracking-widest">ECE SYMPOSIUM</span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm mb-6">
              National Level Technical Symposium organized by the Department of Electronics & Communication Engineering.
            </p>
            <div className="flex gap-3">
              {[Github, Linkedin, Instagram, Twitter].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="glass-card w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4 tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "Events", "Gallery", "Sponsors", "Prizes"].map((item) => (
                <li key={item}>
                  <Link
                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Events */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4 tracking-wider">Events</h4>
            <ul className="space-y-3">
              {[
                "Paper Presentation",
                "Project Expo",
                "Treasure Hunt",
                "Circuit Trade",
                "Hardware Hack",
                "Neural Quiz",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to={`/events/${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-foreground mb-4 tracking-wider">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary/70 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  ECE Department, University Campus, Kanpur - 208024
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary/70 flex-shrink-0" />
                <a
                  href="mailto:upagraha@university.edu"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  upagraha@university.edu
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary/70 flex-shrink-0" />
                <a
                  href="tel:+919876543210"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  +91 98765 43210
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} UPAGRAHA. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
