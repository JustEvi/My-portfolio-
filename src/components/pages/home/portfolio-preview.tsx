import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PageSection from '@/components/ui/custom/page-section';

const PortfolioPreview = () => {
  const projects = [
    {
      id: "1",
      title: "Lumina Skincare",
      category: "Branding & Packaging",
      image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=2500&auto=format&fit=crop"
    },
    {
      id: "2",
      title: "Aura Architecture",
      category: "Web Design",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2500&auto=format&fit=crop"
    },
    {
      id: "3",
      title: "The Daily Roast",
      category: "Visual Identity",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2500&auto=format&fit=crop"
    },
    {
      id: "4",
      title: "Nova Tech",
      category: "App Design",
      image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2500&auto=format&fit=crop"
    }
  ];

  return (
    <PageSection padding="lg" className="pb-32">
      <div className="flex justify-between items-end mb-16">
        <h2 className="text-4xl md:text-5xl font-serif leading-tight text-foreground">
          Recent <br/>
          <span className="text-secondary-muted italic">Works</span>
        </h2>
        <Link href="/portfolio" className="font-sans text-[0.8rem] uppercase tracking-widest border-b border-foreground pb-1 hover:text-secondary-muted hover:border-secondary-muted transition-colors text-foreground">
          View All
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        {projects.map((project, idx) => (
          <div key={project.id} className={`group cursor-pointer animate-in slide-in-from-bottom-8 duration-700 ${idx % 2 !== 0 ? 'md:mt-24' : ''}`} style={{ animationDelay: `${idx * 150}ms` }}>
            <Link href={`/portfolio/${project.id}`}>
              <div className="relative h-[400px] md:h-[65vh] w-full mb-6 overflow-hidden bg-muted">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <h3 className="font-serif text-2xl text-foreground mb-2 group-hover:text-secondary-muted transition-colors">
                {project.title}
              </h3>
              <p className="font-sans text-sm text-muted-foreground uppercase tracking-wider">
                {project.category}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </PageSection>
  );
};

export default PortfolioPreview;
