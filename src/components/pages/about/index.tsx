import React from 'react';
import Image from 'next/image';
import PageSection from '@/components/ui/custom/page-section';
import { createClient } from '@/lib/supabase/server';

export default async function AboutPage() {
  const supabase = await createClient();
  const { data: contentData } = await supabase
    .from('page_content')
    .select('*')
    .eq('page_slug', 'about');

  const contentMap = contentData?.reduce((acc, curr) => {
    acc[curr.section_name] = curr;
    return acc;
  }, {} as Record<string, any>) || {};

  const bioQuote = contentMap.about_quote?.content || "Design is not just what it looks like and feels like. Design is how it works.";
  const bioText = contentMap.about_bio_text?.content || "Evie is a creative director and visual designer based in New York. With over 8 years of experience, she specializes in creating robust visual identities and digital experiences for lifestyle, tech, and cultural brands.";
  const imageUrl = contentMap.about_image?.image_url || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2564&auto=format&fit=crop';
  
  let statsData = {
    enabled: true,
    stats: [
      { value: "12+", label: "Years Exp." },
      { value: "80+", label: "Projects" },
      { value: "15", label: "Awards" }
    ]
  };

  try {
    if (contentMap.about_stats?.content) {
      statsData = JSON.parse(contentMap.about_stats.content);
    }
  } catch (e) {
    console.error("Failed to parse about stats", e);
  }

  return (
    <main className="w-full">
      <PageSection padding="lg" className="pt-32 pb-24 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
          <div className="md:col-span-5 animate-in slide-in-from-bottom-8 duration-700">
            <div className="relative w-full aspect-4/5 rounded-[10px] overflow-hidden">
              <Image
                src={imageUrl}
                alt="About Image"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          <div className="md:col-span-7 md:pt-8 animate-in slide-in-from-bottom-8 duration-700 delay-150 relative">
            <h2 className="font-serif text-5xl md:text-[3.5rem] leading-[1.1] mb-8 text-foreground">
              A bit about <br/>
              <span className="text-secondary-muted italic">me</span>
            </h2>
            <div className="space-y-6 text-[1.1rem] leading-[1.8] text-muted-foreground w-[90%] md:w-[85%] whitespace-pre-wrap">
              <p className="font-serif italic text-2xl text-foreground mb-4">
                "{bioQuote}"
              </p>
              <p>
                {bioText}
              </p>
            </div>
            
            {statsData.enabled && statsData.stats && statsData.stats.length > 0 && (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 mt-16 pt-16 border-t border-border">
                {statsData.stats.map((stat: any, i: number) => (
                  <div key={i}>
                    <div className="font-serif text-4xl text-foreground mb-2">{stat.value}</div>
                    <div className="font-sans text-[0.7rem] uppercase tracking-widest text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </PageSection>
    </main>
  );
}
