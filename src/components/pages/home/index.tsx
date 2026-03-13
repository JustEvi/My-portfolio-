import React from 'react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 max-w-5xl mx-auto text-center">
      <div className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider uppercase bg-primary-pale text-primary-deep rounded-full">
        Welcome to Next Gen
      </div>
      <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-8">
        Experience the Future of <span className="text-primary italic">Web Design</span>
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl leading-relaxed">
        Building elegant, high-performance interfaces that delight users and drive engagement. 
        Evie combines premium aesthetics with state-of-the-art technology.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-sm shadow-lg shadow-primary/20 hover:bg-primary-deep hover:scale-[1.02] transition-all transform active:scale-95">
          Get Started
        </button>
        <button className="px-8 py-4 bg-secondary text-secondary-foreground font-bold rounded-sm hover:bg-secondary-light transition-all">
          Learn More
        </button>
      </div>
      
      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {[
          { title: "Fast Performance", desc: "Optimized for speed and efficiency." },
          { title: "Sleek Design", desc: "Modern aesthetics with premium feel." },
          { title: "Expert Support", desc: "Round the clock assistance for you." }
        ].map((feature, i) => (
          <div key={i} className="p-8 text-left border rounded-sm bg-card transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
