import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Events", path: "/events" },
  { name: "Gallery", path: "/gallery" },
  { name: "Sponsors", path: "/sponsors" },
  { name: "Prizes", path: "/prizes" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-400 ${
          isScrolled
            ? "glass-panel py-4 px-6 md:px-12 border-b border-primary"
            : "bg-transparent py-5 px-6 md:px-12"
        }`}
      >
        <div className="flex justify-between items-center max-w-[1400px] mx-auto">
          {/* Logo */}
          <Link 
            to="/" 
            className="font-heading text-2xl text-white font-bold tracking-[2px] hover:text-primary transition-colors"
          >
            UPAGRAHA
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            ))}
            <Button className="ml-4 bg-primary text-primary-foreground hover:bg-primary/90 font-cyber text-xs tracking-wider btn-neon">
              Register
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex flex-col gap-[5px] cursor-pointer"
          >
            <motion.span 
              animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="w-[25px] h-[2px] bg-white transition-all"
            />
            <motion.span 
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-[25px] h-[2px] bg-white transition-all"
            />
            <motion.span 
              animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="w-[25px] h-[2px] bg-white transition-all"
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-[999] md:hidden"
          >
            <div className="absolute inset-0 bg-background/98 backdrop-blur-xl">
              <div className="flex flex-col items-center justify-center h-full gap-8 pt-20">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className={`text-2xl font-heading font-bold tracking-wider transition-colors ${
                        location.pathname === link.path
                          ? "text-primary text-glow-green"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                >
                  <Button className="mt-4 bg-primary text-primary-foreground text-lg px-8 py-6 font-heading tracking-wider btn-neon">
                    Register Now
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
