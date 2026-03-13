"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import PageSection from '@/components/ui/custom/page-section';
import { cn } from '@/lib/utils';
import { createClient } from '@/lib/supabase/client';

const PortfolioPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [dynamicCategories, setDynamicCategories] = useState<string[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      
      const [categoriesRes, projectsRes] = await Promise.all([
        supabase.from('categories').select('name').order('name'),
        supabase.from('projects')
          .select('*')
          .eq('published', true)
          .order('display_order', { ascending: true })
          .order('created_at', { ascending: false })
      ]);

      if (categoriesRes.data) {
        setDynamicCategories(categoriesRes.data.map(c => c.name));
      }
      
      if (projectsRes.data) {
        setProjects(projectsRes.data);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const filters = ["All", ...dynamicCategories];



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
        
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
             <div className="w-8 h-8 rounded-full border-2 border-foreground border-t-transparent animate-spin"></div>
             <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground">Loading projects...</p>
          </div>
        ) : (
          <>
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
              <Link href={`/portfolio/${project.slug}`}>
                <div className="relative h-[400px] md:h-[65vh] w-full mb-6 overflow-hidden bg-muted">
                  {project.cover_image_url ? (
                    <Image
                      src={project.cover_image_url}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                       <span className="text-muted-foreground uppercase text-xs tracking-widest">No Image</span>
                    </div>
                  )}
                </div>
                <h3 className="font-serif text-2xl text-foreground mb-2 group-hover:text-secondary-muted transition-colors">
                  {project.name}
                </h3>
                <p className="font-sans text-sm text-muted-foreground uppercase tracking-wider">
                  {project.category}
                </p>
              </Link>
            </div>
          ))}

          {!loading && filteredProjects.length === 0 && (
            <div className="col-span-1 md:col-span-2 text-center py-20 text-muted-foreground font-serif italic text-xl">
               No projects found in this category.
            </div>
          )}
        </div>
          </>
        )}
      </PageSection>
    </main>
  );
};

export default PortfolioPage;
