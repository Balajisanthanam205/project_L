import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Starfield from "../effects/Starfield";
import FloatingParticles from "../effects/FloatingParticles";
import LightningEffect from "../effects/LightningEffect";
import GlobalCursor from "../effects/GlobalCursor";
import SoundManager from "../effects/SoundManager";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background relative cursor-none">
      <GlobalCursor />
      <SoundManager />
      <Starfield />
      <FloatingParticles />
      <LightningEffect />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
