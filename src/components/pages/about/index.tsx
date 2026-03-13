import React from 'react';
import Image from 'next/image';
import PageSection from '@/components/ui/custom/page-section';

const AboutPage = () => {
  return (
    <main className="w-full">
      <PageSection padding="lg" className="pt-32 pb-24 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
          <div className="md:col-span-5 animate-in slide-in-from-bottom-8 duration-700">
            <div className="relative w-full aspect-4/5 rounded-[10px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2564&auto=format&fit=crop"
                alt="Evie Adebayo"
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
            <div className="space-y-6 text-[1.1rem] leading-[1.8] text-muted-foreground w-[90%] md:w-[85%]">
              <p>
                Hi, I'm Evie. I believe that the best design is invisible—it guides you, makes you feel, and leaves a lasting impression without you ever noticing the choices that led you there.
              </p>
              <p>
                With over a decade of experience across branding, digital product design, and creative direction, I've had the privilege of partnering with founders and teams to clarify their vision and turn it into compelling visual stories.
              </p>
              <p>
                When I'm not pushing pixels or auditing brand systems, you'll find me exploring the vibrant art scene in Ibadan, curating mood boards, or obsessing over typography found in old books.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-border">
              <div>
                <div className="font-serif text-4xl text-foreground mb-2">12+</div>
                <div className="font-sans text-[0.7rem] uppercase tracking-widest text-muted-foreground">Years Exp.</div>
              </div>
              <div>
                <div className="font-serif text-4xl text-foreground mb-2">80+</div>
                <div className="font-sans text-[0.7rem] uppercase tracking-widest text-muted-foreground">Projects</div>
              </div>
              <div>
                <div className="font-serif text-4xl text-foreground mb-2">15</div>
                <div className="font-sans text-[0.7rem] uppercase tracking-widest text-muted-foreground">Awards</div>
              </div>
            </div>
          </div>
        </div>
      </PageSection>
    </main>
  );
};

export default AboutPage;
