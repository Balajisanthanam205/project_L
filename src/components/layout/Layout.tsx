import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Starfield from "../effects/Starfield";
import FloatingParticles from "../effects/FloatingParticles";
import LightningEffect from "../effects/LightningEffect";
import GlobalCursor from "../effects/GlobalCursor";
import SoundManager from "../effects/SoundManager";
import SpaceBackground from "../effects/SpaceBackground";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen bg-background relative cursor-none">
      <GlobalCursor />
      <SoundManager />
      {/* Space background for all non-homepage routes */}
      {!isHomePage && <SpaceBackground />}
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
