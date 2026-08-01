import React from 'react';

interface ScrollProgressRailProps {
  progress: number;
  currentBeatName: string;
  onJumpToBeat: (targetProgress: number) => void;
}

export const ScrollProgressRail: React.FC<ScrollProgressRailProps> = ({
  progress,
  currentBeatName,
  onJumpToBeat,
}) => {
  const milestones = [
    { label: '00 HERO', target: 0 },
    { label: '01 SHEET', target: 0.15 },
    { label: '02 FRAME', target: 0.40 },
    { label: '03 SECTION', target: 0.65 },
    { label: '04 BUILD', target: 0.90 },
  ];

  return (
    <aside className="hidden lg:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-4 select-none">
      {/* Track Container */}
      <div className="relative h-40 w-1 bg-white/10 rounded-full overflow-hidden group cursor-pointer">
        <div 
          className="absolute top-0 left-0 w-full bg-[#9aa4ae] transition-all duration-150 ease-out"
          style={{ height: `${Math.min(Math.max(progress * 100, 0), 100)}%` }}
        />
      </div>

      {/* Interactive Milestones Tooltips on hover */}
      <div className="flex flex-col gap-2">
        {milestones.map((m, idx) => (
          <button
            key={idx}
            onClick={() => onJumpToBeat(m.target)}
            className="w-2 h-2 rounded-full border border-white/20 hover:border-[#9aa4ae] hover:bg-[#9aa4ae] transition-all cursor-pointer group relative"
            title={`Jump to ${m.label}`}
          >
            <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity font-mono-custom text-[9px] tracking-[0.2em] text-[#9aa4ae] whitespace-nowrap bg-[#0c0f13]/90 px-2 py-1 rounded border border-white/10">
              {m.label}
            </span>
          </button>
        ))}
      </div>

      {/* Beat Title Label */}
      <div className="mt-2 text-center max-w-[90px]">
        <p className="font-mono-custom text-[10px] tracking-[0.25em] uppercase text-white/45 truncate">
          {currentBeatName}
        </p>
        <p className="font-mono-custom text-[9px] tracking-[0.2em] text-[#9aa4ae]/80 mt-1">
          {Math.round(progress * 100)}%
        </p>
      </div>
    </aside>
  );
};
