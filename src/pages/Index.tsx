import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Timeline from "@/components/home/Timeline";
import EventsPreview from "@/components/home/EventsPreview";
import HexagonalGallery from "@/components/home/HexagonalGallery";
import SponsorsPreview from "@/components/home/SponsorsPreview";
import PrizesPreview from "@/components/home/PrizesPreview";
import Contact from "@/components/home/Contact";
import VideoIntro from "@/components/ui/VideoIntro";
import { useGameStore } from "@/store/gameStore";
import { AnimatePresence } from "framer-motion";

const Index = () => {
  const showIntro = useGameStore((state) => state.showIntro);

  return (
    <Layout>
      <AnimatePresence>
        {showIntro && <VideoIntro key="intro" />}
      </AnimatePresence>
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
