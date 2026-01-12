import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Starfield from "../effects/Starfield";
import FloatingParticles from "../effects/FloatingParticles";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background relative">
      <Starfield />
      <FloatingParticles />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
