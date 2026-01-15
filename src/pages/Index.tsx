import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Timeline from "@/components/home/Timeline";
import EventsPreview from "@/components/home/EventsPreview";
import HexagonalGallery from "@/components/home/HexagonalGallery";
import SponsorsPreview from "@/components/home/SponsorsPreview";
import PrizesPreview from "@/components/home/PrizesPreview";
import Contact from "@/components/home/Contact";


const Index = () => {


  return (
    <Layout>

      <Hero />
      <About />
      <Timeline />
      <EventsPreview />
      <HexagonalGallery />
      <SponsorsPreview />
      <PrizesPreview />
      <Contact />
    </Layout>
  );
};

export default Index;
