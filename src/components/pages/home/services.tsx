import PageSection from '@/components/ui/custom/page-section';

const Services = () => {
  const services = [
    {
      title: "Branding",
      items: ["Visual Identity", "Brand Strategy", "Logo Design", "Brand Guidelines"]
    },
    {
      title: "Digital",
      items: ["Website Design", "UI/UX Architecture", "Prototyping", "Design Systems"]
    },
    {
      title: "Art Direction",
      items: ["Campaign Visuals", "Photography Styling", "Digital Illustration", "Motion Concepts"]
    }
  ];

  return (
    <PageSection 
      id="services"
      padding="lg"
      alignment="left"
      title={<>Selected <br/><span className="text-secondary-muted italic">Expertise</span></>}
      subtitle="A focused approach to creating memorable brand experiences."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
        {services.map((service, idx) => (
          <div key={idx} className="animate-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: `${idx * 150}ms` }}>
            <h3 className="font-serif text-3xl text-foreground mb-6 pb-6 border-b border-border">
              {service.title}
            </h3>
            <ul className="list-none space-y-4">
              {service.items.map((item, i) => (
                <li key={i} className="font-sans text-[0.95rem] text-muted-foreground relative pl-6">
                  <span className="absolute left-0 text-secondary-muted">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </PageSection>
  );
};

export default Services;
