import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PageSection from '@/components/ui/custom/page-section';

const PortfolioDetailPage = ({ slug }: { slug: string }) => {
  // Mock data for Phase 2
  const project = {
    title: "Lumina",
    subtitle: "Skincare",
    category: "Branding & Packaging",
    description: "A comprehensive visual identity and packaging system for a clean beauty brand focusing on transparency and botanical ingredients.",
    client: "Lumina Beauty Co.",
    role: "Art Direction, Design",
    year: "2024",
    heroImage: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?q=80&w=2500&auto=format&fit=crop",
    content: [
      {
        type: "text",
        heading: "The Challenge",
        body: "Lumina needed a visual identity that stood out in a saturated clean beauty market. Avoid the generic minimalism while maintaining a sense of purity and transparency."
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2500&auto=format&fit=crop"
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2500&auto=format&fit=crop"
      },
      {
        type: "text",
        heading: "The Solution",
        body: "We developed a warm, inviting visual language built around soft gradients, elegant typography, and tactile packaging materials that invite touch."
      }
    ],
    nextProject: {
      id: "2",
      title: "Aura Architecture"
    }
  };

  return (
    <main className="w-full">
      <PageSection padding="lg" className="pt-32 md:pt-40">
        <div className="max-w-4xl mb-16 animate-in slide-in-from-bottom-8 duration-700">
          <p className="font-sans text-[0.8rem] uppercase tracking-widest text-primary-deep mb-6">
            {project.category}
          </p>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] text-foreground font-light mb-8">
            {project.title} <br/>
            <span className="text-secondary-muted italic">{project.subtitle}</span>
          </h1>
          <p className="text-[1.1rem] md:text-[1.2rem] leading-[1.8] text-muted-foreground w-full md:w-[85%]">
            {project.description}
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-border mb-16 md:mb-24 animate-in fade-in duration-700 delay-150">
          <div>
            <h4 className="font-sans text-[0.75rem] uppercase tracking-widest text-muted-foreground mb-2">Client</h4>
            <p className="text-foreground">{project.client}</p>
          </div>
          <div>
            <h4 className="font-sans text-[0.75rem] uppercase tracking-widest text-muted-foreground mb-2">Role</h4>
            <p className="text-foreground">{project.role}</p>
          </div>
          <div>
            <h4 className="font-sans text-[0.75rem] uppercase tracking-widest text-muted-foreground mb-2">Year</h4>
            <p className="text-foreground">{project.year}</p>
          </div>
          <div className="hidden md:block">
            <h4 className="font-sans text-[0.75rem] uppercase tracking-widest text-muted-foreground mb-2">Share</h4>
            <div className="flex gap-4">
              <a href="#" className="text-foreground hover:text-primary-deep transition-colors">TW</a>
              <a href="#" className="text-foreground hover:text-primary-deep transition-colors">IN</a>
            </div>
          </div>
        </div>
        
        <div className="mb-24 animate-in fade-in duration-1000 delay-300">
          <div className="relative w-full h-[50vh] md:h-[80vh] mb-12 md:mb-24 rounded-sm overflow-hidden bg-muted">
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {project.content.map((block, idx) => (
            <div key={idx} className="mb-12 md:mb-24">
              {block.type === 'text' && (
                <div className="max-w-3xl mx-auto px-4 md:px-0">
                  <h3 className="font-serif text-3xl md:text-4xl text-foreground mb-6">{block.heading}</h3>
                  <p className="text-[1.1rem] leading-[1.8] text-muted-foreground">{block.body}</p>
                </div>
              )}
              {block.type === 'image' && (
                <div className="relative w-full h-[50vh] md:h-[80vh] rounded-sm overflow-hidden bg-muted">
                  <Image
                    src={block.src!}
                    alt={`${project.title} image`}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="flex flex-col items-center justify-center py-16 md:py-24 border-t border-border mt-32">
          <p className="font-sans text-[0.8rem] uppercase tracking-widest text-muted-foreground mb-4">Next Project</p>
          <Link href={`/portfolio/${project.nextProject.id}`} className="group">
            <h2 className="font-serif text-4xl md:text-6xl text-foreground group-hover:text-secondary-muted transition-colors text-center">
              {project.nextProject.title}
            </h2>
          </Link>
        </div>
      </PageSection>
    </main>
  );
};

export default PortfolioDetailPage;
