import React from 'react';
import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
  speed?: number;
}

export const Marquee = ({ items, className, speed = 20 }: MarqueeProps) => {
  const allItems = [...items, ...items, ...items]; // Duplicate for seamless scroll
  
  return (
    <div className={cn("overflow-hidden whitespace-nowrap bg-foreground text-primary py-[0.9rem] flex", className)}>
      <div 
        className="inline-flex min-w-full animate-marquee"
        style={{ animationDuration: `${speed}s` }}
      >
        {allItems.map((item, index) => (
          <span key={index} className="text-[0.72rem] tracking-[0.2em] uppercase mx-2 shrink-0">
            {item} &nbsp;&middot;&nbsp; 
          </span>
        ))}
      </div>
      <div 
        className="inline-flex min-w-full animate-marquee"
        style={{ animationDuration: `${speed}s` }}
        aria-hidden="true"
      >
        {allItems.map((item, index) => (
          <span key={`dup-${index}`} className="text-[0.72rem] tracking-[0.2em] uppercase mx-2 shrink-0">
            {item} &nbsp;&middot;&nbsp; 
          </span>
        ))}
      </div>
    </div>
  );
};
