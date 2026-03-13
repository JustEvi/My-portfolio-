import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import PageSection from '@/components/ui/custom/page-section';

const Hero = () => {
  return (
    <PageSection 
      padding="none"
      className="pt-32 pb-16 min-h-[90vh]"
      contentClassName="flex flex-col md:flex-row items-center justify-between"
    >
      <div className="w-full md:max-w-[50%] animate-in slide-in-from-bottom-8 duration-700">
        <h1 className="font-serif text-6xl md:text-[5.5rem] leading-[1.1] font-light text-foreground mb-6">
          Crafting visual <br/>
          <span className="text-secondary-muted italic">narratives</span>
        </h1>
        <p className="text-[1.1rem] leading-[1.8] text-muted-foreground w-[90%] mb-12">
          I help passionate brands express their true essence through thoughtful, elegant design. Specializing in branding, web design, and digital art.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/portfolio">
            <Button className="site-btn bg-foreground text-primary-blush hover:bg-secondary-muted hover:text-white rounded-none uppercase tracking-widest text-[0.85rem] px-10 py-6 font-normal">
              View Projects
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" className="site-btn border-foreground text-foreground hover:bg-foreground hover:text-primary-blush rounded-none uppercase tracking-widest text-[0.85rem] px-10 py-6 font-normal">
              Let's Talk
            </Button>
          </Link>
        </div>
      </div>
      <div className="w-full md:w-[45%] h-[500px] md:h-[600px] rounded-t-[200px] overflow-hidden mt-16 md:mt-0 animate-in fade-in duration-1000 delay-300 relative">
        <Image 
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
          alt="Evie Adebayo"
          fill
          className="object-cover"
          priority
        />
      </div>
    </PageSection>
  );
};

export default Hero;