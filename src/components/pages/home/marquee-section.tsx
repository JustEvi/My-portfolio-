import { Marquee } from '@/components/ui/custom/marquee';

const MarqueeSection = () => {
  const items = [
    "BRAND IDENTITY",
    "WEB DESIGN",
    "DIGITAL ART",
    "ART DIRECTION",
    "UI/UX DESIGN",
    "ILLUSTRATION"
  ];

  return (
    <section className="border-y border-border">
      <Marquee items={items} speed={30} />
    </section>
  );
};

export default MarqueeSection;
