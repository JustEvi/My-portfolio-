import Hero from "./hero";
import MarqueeSection from "./marquee-section";
import Services from "./services";
import PortfolioPreview from "./portfolio-preview";

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeSection />
      <Services />
      <PortfolioPreview />
    </>
  );
}
