import React from 'react';
import { BeatData } from '../types';
import { ArrowRight, BookOpen, InspectionPanel as InspectIcon } from 'lucide-react';

interface ScrollBeatCardProps {
  beat: BeatData;
  progress: number;
  onOpenWork: () => void;
  onOpenMethod: () => void;
  onInspectBeat?: (beatId: string) => void;
}

export const ScrollBeatCard: React.FC<ScrollBeatCardProps> = ({
  beat,
  progress,
  onOpenWork,
  onOpenMethod,
  onInspectBeat,
}) => {
  const [start, end] = beat.progressRange;
  const fadeLength = 0.04;

  let opacity = 0;
  if (progress >= start && progress <= end) {
    if (progress < start + fadeLength) {
      // Fade in
      opacity = (progress - start) / fadeLength;
    } else if (progress > end - fadeLength) {
      // Fade out (unless it's beat 4 at progress 1.0)
      opacity = beat.id === 'build' ? 1 : (end - progress) / fadeLength;
    } else {
      opacity = 1;
    }
  }

  // Clamp opacity
  opacity = Math.min(Math.max(opacity, 0), 1);
  const pointerEvents = opacity > 0.1 ? 'auto' : 'none';

  // Alignment classes based on beat.position
  const positionClasses = {
    left: 'justify-end items-start text-left left-4 sm:left-6 md:left-12 max-w-xl',
    right: 'justify-end items-end text-right right-4 sm:right-6 md:right-12 max-w-xl',
    center: 'justify-end items-center text-center inset-x-4 sm:inset-x-12 max-w-2xl mx-auto',
  }[beat.position];

  return (
    <div
      className={`absolute top-0 bottom-20 md:bottom-28 z-10 flex flex-col ${positionClasses} pointer-events-none transition-opacity duration-300`}
      style={{ opacity, pointerEvents }}
    >
      <div className="w-full flex flex-col items-inherit pointer-events-auto bg-[#0c0f13]/40 backdrop-blur-xs p-6 sm:p-8 rounded-2xl border border-white/[0.03]">
        {/* Kicker */}
        <p className="font-mono-custom text-[11px] tracking-[0.32em] uppercase text-[#9aa4ae] mb-2">
          {beat.kicker}
        </p>

        {/* Drawn Rule */}
        <div className="w-full max-w-xs rule mb-5 animate-draw-line" />

        {/* Heading */}
        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light tracking-[-0.03em] text-white leading-[1.05] mb-4">
          {beat.highlightWord ? (
            <>
              {beat.heading.split(beat.highlightWord)[0]}
              <span className="text-[#9aa4ae]">{beat.highlightWord}</span>
              {beat.heading.split(beat.highlightWord)[1]}
            </>
          ) : (
            beat.heading
          )}
        </h2>

        {/* Sub-line */}
        <p className="font-display text-base sm:text-lg text-white/70 max-w-lg mb-8 leading-relaxed">
          {beat.sub}
        </p>

        {/* Spec Row */}
        <div className="w-full border-t border-b border-white/10 py-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-0 items-center divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {beat.specs.map((spec, index) => (
              <div
                key={index}
                className={`flex sm:flex-col justify-between sm:justify-center items-center px-3 py-1 ${
                  index === 0 ? 'sm:pl-0' : ''
                } ${index === beat.specs.length - 1 ? 'sm:pr-0' : ''}`}
              >
                <span className="dim-label text-[10px] uppercase text-[#9aa4ae]">
                  {spec.label}
                </span>
                <span className="font-mono-custom text-sm font-medium text-white tracking-wider mt-0.5">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Beat 4 CTAs or Inspect Trigger */}
        {beat.id === 'build' ? (
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 justify-center w-full">
            <button
              onClick={onOpenWork}
              className="w-full sm:w-auto bg-[#9aa4ae] text-[#0c0f13] rounded-full px-7 py-3 text-sm font-medium flex items-center justify-center gap-2 hover:bg-white transition-colors cursor-pointer group shadow-lg shadow-[#9aa4ae]/10"
            >
              <span>See the work</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onOpenMethod}
              className="w-full sm:w-auto rounded-full liquid-glass px-7 py-3 text-sm text-white flex items-center justify-center gap-2 hover:bg-white/10 transition-colors cursor-pointer group"
            >
              <BookOpen className="w-4 h-4 text-[#9aa4ae]" />
              <span>Read the method</span>
            </button>
          </div>
        ) : (
          onInspectBeat && (
            <button
              onClick={() => onInspectBeat(beat.id)}
              className="self-start text-xs font-mono-custom tracking-[0.2em] text-[#9aa4ae] hover:text-white flex items-center gap-2 cursor-pointer transition-colors group pt-1"
            >
              <InspectIcon className="w-3.5 h-3.5 text-[#9aa4ae] group-hover:scale-110 transition-transform" />
              <span>INSPECT DRAFT SPECIFICATIONS</span>
            </button>
          )
        )}
      </div>
    </div>
  );
};
