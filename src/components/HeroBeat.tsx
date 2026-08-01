import React from 'react';
import { Ruler, PencilRuler, Sparkles, ChevronsDown } from 'lucide-react';

interface HeroBeatProps {
  progress: number;
}

export const HeroBeat: React.FC<HeroBeatProps> = ({ progress }) => {
  // Fade out hero beat as scroll progress advances past 0.05
  const opacity = Math.max(1 - (progress / 0.06), 0);
  const pointerEvents = opacity > 0.05 ? 'auto' : 'none';

  return (
    <div
      className="absolute inset-0 z-10 flex flex-col justify-end items-start text-left pb-20 md:pb-28 px-4 sm:px-6 md:px-12 max-w-3xl pointer-events-none transition-opacity duration-300"
      style={{ opacity, pointerEvents }}
    >
      <div className="w-full flex flex-col items-start pointer-events-auto">
        {/* Metadata Row */}
        <div
          className="font-mono-custom text-[11px] tracking-[0.24em] uppercase text-white/50 flex flex-wrap gap-x-6 gap-y-2 mb-6 animate-blur-fade-up items-center"
          style={{ animationDelay: '300ms' }}
        >
          <div className="flex items-center gap-1.5">
            <Ruler className="w-3.5 h-3.5 text-[#9aa4ae]" />
            <span>SCALE 1:1</span>
          </div>
          <div className="flex items-center gap-1.5 border-l border-white/10 pl-4 sm:pl-6">
            <PencilRuler className="w-3.5 h-3.5 text-[#9aa4ae]" />
            <span>SHEET 01 OF 06</span>
          </div>
          <div className="flex items-center gap-1.5 border-l border-white/10 pl-4 sm:pl-6">
            <Sparkles className="w-3.5 h-3.5 text-[#9aa4ae]" />
            <span>REV. A</span>
          </div>
        </div>

        {/* Drawn Rule (~120px above headline style rule) */}
        <div className="w-full max-w-md rule mb-6 animate-draw-line" />

        {/* Kicker */}
        <p
          className="font-mono-custom text-[11px] tracking-[0.32em] uppercase text-[#9aa4ae] mb-4 animate-blur-fade-up"
          style={{ animationDelay: '380ms' }}
        >
          GRAVEN / DRAFTING WORKS
        </p>

        {/* Headline */}
        <h1
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[90px] xl:text-[100px] font-light tracking-[-0.03em] leading-[0.92] text-white animate-blur-fade-up my-2"
          style={{ animationDelay: '450ms' }}
        >
          <span className="text-[#9aa4ae]">Drawn</span> before it's built.
        </h1>

        {/* Sub-line */}
        <p
          className="font-display text-base sm:text-lg text-white/60 max-w-lg mt-5 leading-relaxed animate-blur-fade-up"
          style={{ animationDelay: '560ms' }}
        >
          Every object begins as a line. Scroll to watch the draft take shape.
        </p>

        {/* Scroll Cue */}
        <div
          className="font-mono-custom text-[11px] tracking-[0.3em] text-white/40 flex items-center gap-2 mt-8 animate-blur-fade-up select-none"
          style={{ animationDelay: '680ms' }}
        >
          <span>SCROLL TO TRACE</span>
          <ChevronsDown className="w-4 h-4 text-[#9aa4ae] animate-bounce" />
        </div>
      </div>
    </div>
  );
};
