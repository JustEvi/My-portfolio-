import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageSection from '@/components/ui/custom/page-section';
import { createClient } from '@/lib/supabase/server';
import { generateHTML } from '@tiptap/html';
import StarterKit from '@tiptap/starter-kit';

export default async function PortfolioDetailPage({ slug }: { slug: string }) {
  const supabase = await createClient();
  
  // Fetch current project
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!project) {
    notFound();
  }

  // Fetch next project (just grab the next one published, looping to first if this is the last)
  // Simplified logic: just find any other published project, preferably older or newer
  const { data: nextProjects } = await supabase
    .from('projects')
    .select('slug, name')
    .eq('published', true)
    .neq('id', project.id)
    .limit(1);

  const nextProject = nextProjects?.[0] || null;

  // Convert TipTap JSON to HTML
  let contentHtml = '';
  if (project.writeup && typeof project.writeup === 'object') {
    try {
      contentHtml = generateHTML(project.writeup, [StarterKit]);
    } catch (e) {
      console.error("Failed to parse tiptap json", e);
    }
  }

  const toolsJoined = project.tools && Array.isArray(project.tools) ? project.tools.join(', ') : 'N/A';


  return (
    <main className="w-full">
      <PageSection padding="lg" className="pt-32 md:pt-40">
        <div className="max-w-4xl mb-16 animate-in slide-in-from-bottom-8 duration-700">
          <p className="font-sans text-[0.8rem] uppercase tracking-widest text-primary-deep mb-6">
            {project.category}
          </p>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] text-foreground font-light mb-8">
            {project.name}
          </h1>
          <p className="text-[1.1rem] md:text-[1.2rem] leading-[1.8] text-muted-foreground w-full md:w-[85%] whitespace-pre-wrap">
            {project.short_description}
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-y border-border mb-16 md:mb-24 animate-in fade-in duration-700 delay-150">
          <div>
            <h4 className="font-sans text-[0.75rem] uppercase tracking-widest text-muted-foreground mb-2">Category</h4>
            <p className="text-foreground">{project.category}</p>
          </div>
          <div>
            <h4 className="font-sans text-[0.75rem] uppercase tracking-widest text-muted-foreground mb-2">Tools / Services</h4>
            <p className="text-foreground">{toolsJoined}</p>
          </div>
          <div>
            <h4 className="font-sans text-[0.75rem] uppercase tracking-widest text-muted-foreground mb-2">Year</h4>
            <p className="text-foreground">{project.year || 'N/A'}</p>
          </div>
          <div className="hidden md:block">
            <h4 className="font-sans text-[0.75rem] uppercase tracking-widest text-muted-foreground mb-2">Live Preview</h4>
            <div className="flex gap-4">
              {project.project_link ? (
                <a href={project.project_link} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary-deep transition-colors underline underline-offset-4">Visit Site</a>
              ) : (
                <span className="text-muted-foreground">Unavailable</span>
              )}
            </div>
          </div>
        </div>
        
        <div className="mb-24 animate-in fade-in duration-1000 delay-300">
          {project.cover_image_url && (
            <div className="relative w-full h-[50vh] md:h-[80vh] mb-12 md:mb-24 rounded-sm overflow-hidden bg-muted">
              <Image
                src={project.cover_image_url}
                alt={project.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          
          {contentHtml && (
            <div 
              className="prose prose-lg md:prose-xl max-w-3xl mx-auto px-4 md:px-0 mb-12 md:mb-24 text-muted-foreground prose-headings:font-serif prose-headings:text-foreground prose-a:text-foreground prose-a:underline hover:prose-a:text-secondary-muted transition-colors"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          )}

          {project.screengrabs && project.screengrabs.length > 0 && (
            <div className="grid grid-cols-1 gap-12 md:gap-24">
              {project.screengrabs.map((grab: any, idx: number) => (
                <div key={idx} className="relative w-full h-[50vh] md:h-[80vh] rounded-sm overflow-hidden bg-muted">
                  <Image
                    src={grab.url}
                    alt={grab.caption || `${project.name} screengrab ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                  {grab.caption && (
                    <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs text-foreground font-sans tracking-widest uppercase shadow-lg">
                      {grab.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {nextProject && (
          <div className="flex flex-col items-center justify-center py-16 md:py-24 border-t border-border mt-32">
            <p className="font-sans text-[0.8rem] uppercase tracking-widest text-muted-foreground mb-4">Next Project</p>
            <Link href={`/portfolio/${nextProject.slug}`} className="group">
              <h2 className="font-serif text-4xl md:text-6xl text-foreground group-hover:text-secondary-muted transition-colors text-center">
                {nextProject.name}
              </h2>
            </Link>
          </div>
        )}
      </PageSection>
    </main>
  );
}
