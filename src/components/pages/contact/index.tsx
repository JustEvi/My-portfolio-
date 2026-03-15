"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

const ContactPage = ({ email = "hello@evieadebayo.com", socialLinks = [] }: { email?: string, socialLinks?: SocialLink[] }) => {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate network request
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  return (
    <main className="w-full min-h-screen flex flex-col md:flex-row pt-[80px] md:pt-0">
      <div className="w-full md:w-1/2 bg-foreground text-primary-pale px-8 md:px-16 lg:px-24 py-20 md:py-32 flex flex-col justify-center min-h-[50vh] md:min-h-screen animate-in fade-in duration-700">
        <h2 className="font-serif text-5xl md:text-6xl mb-8 text-primary-pale leading-[1.1]">
          Let's <br/>
          <span className="text-primary-deep italic">talk</span>
        </h2>
        
        <p className="text-[1.1rem] leading-[1.6] mb-16 opacity-80 max-w-[400px]">
          Got a project in mind, or just want to say hi? I'd love to hear from you.
        </p>
        
        <div className="mb-10">
          <h4 className="font-sans text-[0.75rem] uppercase tracking-widest opacity-50 mb-2">Email</h4>
          <a href={`mailto:${email}`} className="text-primary-pale hover:text-primary-deep transition-colors text-[1.2rem]">
            {email}
          </a>
        </div>
        
        <div>
          <h4 className="font-sans text-[0.75rem] uppercase tracking-widest opacity-50 mb-4">Socials</h4>
          <div className="flex gap-6">
            {socialLinks.length > 0 ? (
              socialLinks.map((link) => (
                <a key={link.id} href={link.url} target="_blank" rel="noreferrer" className="font-sans text-[0.85rem] uppercase tracking-wider text-primary-pale hover:text-primary-deep transition-colors">
                  {link.platform}
                </a>
              ))
            ) : (
              <span className="font-sans text-[0.85rem] uppercase tracking-wider text-muted-foreground">None listed</span>
            )}
          </div>
        </div>
      </div>
      
      <div className="w-full md:w-1/2 bg-background px-8 md:px-16 lg:px-24 py-20 md:py-32 flex flex-col justify-center min-h-[50vh] md:min-h-screen animate-in slide-in-from-right-8 duration-700">
        <form onSubmit={handleSubmit} className="w-full max-w-[500px]">
          {status === "success" ? (
            <div className="bg-primary-blush border border-border p-8 rounded-sm animate-in fade-in zoom-in-95 duration-500 text-center">
              <h3 className="font-serif text-2xl text-foreground mb-3">Message Sent</h3>
              <p className="text-muted-foreground">Thank you for reaching out! I'll get back to you as soon as possible.</p>
              <Button 
                type="button" 
                variant="outline" 
                className="mt-6 uppercase tracking-widest text-xs rounded-none border-foreground text-foreground hover:bg-foreground hover:text-primary-pale"
                onClick={() => setStatus("idle")}
              >
                Send Another
              </Button>
            </div>
          ) : (
            <div className="space-y-10 animate-in fade-in duration-500">
              <div className="space-y-3">
                <label htmlFor="name" className="block font-sans text-[0.75rem] uppercase tracking-widest text-muted-foreground">
                  Name
                </label>
                <Input 
                  id="name" 
                  required 
                  className="rounded-none border-0 border-b border-border shadow-none focus-visible:ring-0 focus-visible:border-primary-deep px-0 text-base h-10 bg-transparent"
                />
              </div>
              
              <div className="space-y-3">
                <label htmlFor="email" className="block font-sans text-[0.75rem] uppercase tracking-widest text-muted-foreground">
                  Email
                </label>
                <Input 
                  id="email" 
                  type="email" 
                  required 
                  className="rounded-none border-0 border-b border-border shadow-none focus-visible:ring-0 focus-visible:border-primary-deep px-0 text-base h-10 bg-transparent"
                />
              </div>
              
              <div className="space-y-3">
                <label htmlFor="inquiry" className="block font-sans text-[0.75rem] uppercase tracking-widest text-muted-foreground">
                  Inquiry Type
                </label>
                <select 
                  id="inquiry" 
                  className="w-full rounded-none border-0 border-b border-border shadow-none focus:ring-0 focus:border-primary-deep px-0 text-base h-10 bg-transparent outline-none cursor-pointer text-foreground"
                >
                  <option value="project">New Project</option>
                  <option value="freelance">Freelance Opportunity</option>
                  <option value="hello">Just saying hi</option>
                </select>
              </div>
              
              <div className="space-y-3">
                <label htmlFor="message" className="block font-sans text-[0.75rem] uppercase tracking-widest text-muted-foreground">
                  Message
                </label>
                <Textarea 
                  id="message" 
                  required 
                  className="rounded-none border-0 border-b border-border shadow-none focus-visible:ring-0 focus-visible:border-primary-deep px-0 text-base min-h-[120px] bg-transparent resize-y"
                />
              </div>
              
              <Button 
                type="submit" 
                disabled={status === "submitting"}
                className="w-[180px] bg-foreground text-primary-blush hover:bg-secondary-muted hover:text-white rounded-none uppercase tracking-widest text-[0.85rem] py-6 font-normal mt-4 transition-all"
              >
                {status === "submitting" ? "Sending..." : "Send Message"}
              </Button>
            </div>
          )}
        </form>
      </div>
    </main>
  );
};

export default ContactPage;
