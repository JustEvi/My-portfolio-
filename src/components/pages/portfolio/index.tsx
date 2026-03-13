"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PageSection from '@/components/ui/custom/page-section';
import { cn } from '@/lib/utils';

const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = ["All", "Branding", "Web Design", "Digital Art"];

  const projects = [
    {
      id: "1",
      title: "Lumina Skincare",
      category: "Branding",
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
      category: "Branding",
      image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=2500&auto=format&fit=crop"
    },
    {
      id: "4",
      title: "Nova Tech",
      category: "Web Design",
      image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=2500&auto=format&fit=crop"
    },
    {
      id: "5",
      title: "Abstract Forms",
      category: "Digital Art",
      image: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=2500&auto=format&fit=crop"
    },
    {
      id: "6",
      title: "Echo Audio",
      category: "Branding",
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=2500&auto=format&fit=crop"
    }
  ];

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <main className="w-full">
      <PageSection padding="lg" className="pt-32 pb-32">
        <div className="text-center mb-20 animate-in slide-in-from-bottom-8 duration-700">
          <h2 className="font-serif text-5xl md:text-6xl text-foreground mb-4">
            Selected <br/>
            <span className="text-secondary-muted italic">Works</span>
          </h2>
        </div>
        
        <div className="flex justify-center gap-6 md:gap-8 mb-16 flex-wrap animate-in fade-in duration-700 delay-150">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "font-sans text-[0.8rem] uppercase tracking-widest pb-1 transition-all",
                activeFilter === filter 
                  ? "border-b border-foreground text-foreground" 
                  : "border-b border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          {filteredProjects.map((project, idx) => (
            <div 
              key={project.id} 
              className={`group cursor-pointer animate-in fade-in zoom-in-95 duration-700 ${idx % 2 !== 0 ? 'md:mt-24' : ''}`}
              style={{ animationDelay: `${(idx % 4) * 100}ms` }}
            >
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
    </main>
  );
};

export default PortfolioPage;
