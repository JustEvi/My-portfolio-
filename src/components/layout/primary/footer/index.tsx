import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-foreground text-white/50 py-16 px-6 lg:px-16 border-t border-white/5">
      <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 md:gap-8 items-end">
        
        <div>
          <div className="font-serif text-3xl text-white italic font-light mb-3">Evie Adebayo</div>
          <p className="text-[0.8rem] leading-[1.7] max-w-[340px]">
            A graphic designer telling stories through visuals. Based in Ibadan, Nigeria. 
            Available for freelance and collaborative work globally.
          </p>
        </div>

        <div className="flex flex-col gap-2 md:text-right">
          <Link href="/" className="text-[0.75rem] tracking-widest uppercase text-white/40 hover:text-primary transition-colors">Home</Link>
          <Link href="/about" className="text-[0.75rem] tracking-widest uppercase text-white/40 hover:text-primary transition-colors">About</Link>
          <Link href="/portfolio" className="text-[0.75rem] tracking-widest uppercase text-white/40 hover:text-primary transition-colors">Portfolio</Link>
          <Link href="/contact" className="text-[0.75rem] tracking-widest uppercase text-white/40 hover:text-primary transition-colors">Contact</Link>
        </div>
        
      </div>

      <div className="container mx-auto max-w-7xl border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[0.72rem] text-white/25">© 2025 Evie Adebayo. All rights reserved.</p>
        <p className="text-[0.68rem] text-white/20">Built with Next.js &middot; Supabase &middot; shadcn/ui</p>
      </div>
    </footer>
  );
}
