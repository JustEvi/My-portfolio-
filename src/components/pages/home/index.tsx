import Hero from "./hero";
import MarqueeSection from "./marquee-section";
import Services from "./services";
import PortfolioPreview from "./portfolio-preview";

export default function Home({ expertiseJson }: { expertiseJson?: string | null }) {
  return (
    <>
      <Hero />
      <MarqueeSection />
      <Services expertiseJson={expertiseJson} />
      <PortfolioPreview />
    </>
  );
}
