import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Timeline from "@/components/home/Timeline";
import ScrollVideoEvents from "@/components/home/ScrollVideoEvents";
import HexagonalGallery from "@/components/home/HexagonalGallery";
import SponsorsPreview from "@/components/home/SponsorsPreview";
import PrizesPreview from "@/components/home/PrizesPreview";
import Contact from "@/components/home/Contact";
import SpaceBackground from "@/components/effects/SpaceBackground";

const Index = () => {
  return (
    <Layout>
      <Hero />
      {/* Space background starts after hero */}
      <div className="relative">
        <SpaceBackground />
        <About />
        <Timeline />
        <ScrollVideoEvents />
        <div id="gallery">
          <HexagonalGallery />
        </div>
        <div id="sponsors">
          <SponsorsPreview />
        </div>
        <div id="prizes">
          <PrizesPreview />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
