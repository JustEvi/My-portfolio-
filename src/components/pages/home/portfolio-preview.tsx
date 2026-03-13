import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PageSection from '@/components/ui/custom/page-section';
import { createClient } from '@/lib/supabase/server';
import { Project } from '@/types';

export default async function PortfolioPreview() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(4);

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
        {projects?.map((project, idx) => (
          <div key={project.id} className={`group cursor-pointer animate-in slide-in-from-bottom-8 duration-700 ${idx % 2 !== 0 ? 'md:mt-24' : ''}`} style={{ animationDelay: `${idx * 150}ms` }}>
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
        {(!projects || projects.length === 0) && (
          <div className="col-span-1 md:col-span-2 text-center py-20 text-muted-foreground font-serif italic text-xl">
             More projects coming soon...
          </div>
        )}
      </div>
    </PageSection>
  );
}
