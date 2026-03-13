import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 selection:bg-primary-pale selection:text-primary-deep overflow-hidden relative">
      {/* Decorative ambient blobs */}
      <div 
        className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-primary-pale/30 rounded-full blur-[100px] animate-[floatUp_8s_ease-in-out_infinite]" 
        aria-hidden="true"
      />
      <div 
        className="absolute bottom-[-5%] left-[-5%] w-[350px] h-[350px] bg-primary-blush/40 rounded-full blur-[80px] animate-[floatUp_7s_ease-in-out_infinite_reverse]" 
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl px-6">
        {/* Animated large 404 display */}
        <div className="animate-[rise_1s_ease-out_forwards] mb-4">
          <h1 className="text-[12rem] md:text-[16rem] font-bold leading-none tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-primary-deep via-primary to-[#e8b4b8/20] opacity-10 select-none">
            404
          </h1>
        </div>

        {/* Content Section */}
        <div className="animate-[rise_1s_ease-out_0.2s_both] flex flex-col items-center">
          <span className="text-primary-deep font-medium tracking-widest uppercase text-sm mb-6 inline-block">
            Lost in the details?
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 tracking-tight text-foreground leading-[1.1]">
            This page is still <br className="hidden md:block" />
            <span className="italic font-serif">finding its way.</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-sm leading-relaxed">
            The space you're looking for doesn't seem to exist or has gracefully moved elsewhere.
          </p>

          {/* Action Button */}
          <Link
            href="/"
            className="group relative flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-medium transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl hover:shadow-primary-deep/20 overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-r from-primary-deep to-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            <ArrowLeft className="size-5 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>

      {/* Subtle brand mark */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-[fadeIn_2s_ease-in_delay-1000ms_both]">
         <div className="flex items-center gap-2 text-primary-deep/40 text-xs font-medium tracking-[0.3em] uppercase">
            <span>Evie</span>
            <div className="w-1 h-1 rounded-full bg-primary-deep/30" />
            <span>Creative Studio</span>
         </div>
      </div>
    </div>
  );
}
