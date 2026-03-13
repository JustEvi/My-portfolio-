import React from 'react';
import Link from 'next/link';

import { SiteSettings } from '@/types';

export default function Footer({ settings }: { settings: SiteSettings | null }) {
  return (
    <footer className="bg-foreground text-white/50 py-16 px-6 lg:px-16 border-t border-white/5">
      <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 md:gap-8 items-end">
        
        <div>
          <div className="font-serif text-3xl text-white italic font-light mb-3">{settings?.full_name || 'Evie Adebayo'}</div>
          <p className="text-[0.8rem] leading-[1.7] max-w-[340px]">
            {settings?.bio || 'A graphic designer telling stories through visuals. Based in Ibadan, Nigeria. Available for freelance and collaborative work globally.'}
          </p>
        </div>

        <div className="flex flex-col gap-2 md:text-right">
          <Link href="/" className="text-[0.75rem] tracking-widest uppercase text-white/40 hover:text-primary transition-colors">Home</Link>
          <Link href="/about" className="text-[0.75rem] tracking-widest uppercase text-white/40 hover:text-primary transition-colors">About</Link>
          <Link href="/portfolio" className="text-[0.75rem] tracking-widest uppercase text-white/40 hover:text-primary transition-colors">Portfolio</Link>
          <Link href="/contact" className="text-[0.75rem] tracking-widest uppercase text-white/40 hover:text-primary transition-colors">Contact</Link>
          
          {settings?.social_links && settings.social_links.length > 0 && (
             <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-2 md:items-end">
                {settings.social_links.map((link, idx) => (
                  <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="text-[0.75rem] tracking-widest uppercase text-white/40 hover:text-primary transition-colors">
                    {link.platform}
                  </a>
                ))}
             </div>
          )}
        </div>
        
      </div>

      <div className="container mx-auto max-w-7xl border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[0.72rem] text-white/25">© {new Date().getFullYear()} {settings?.full_name || 'Evie Adebayo'}. All rights reserved.</p>
        <p className="text-[0.68rem] text-white/20">Built with Next.js &middot; Supabase &middot; shadcn/ui</p>
      </div>
    </footer>
  );
}
