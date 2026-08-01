import React from 'react';

interface FooterProps {
  onOpenWork: () => void;
  onOpenMethod: () => void;
  onOpenInquiry: () => void;
  onScrollToBeat: (progress: number) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenWork,
  onOpenMethod,
  onOpenInquiry,
  onScrollToBeat,
}) => {
  return (
    <footer className="w-full bg-[#0c0f13] z-20 relative select-none">
      {/* Full-width drawn rule */}
      <div className="w-full rule" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-white/40 font-mono-custom">
        {/* Left */}
        <div className="flex items-center gap-3">
          <span className="text-white font-display text-base tracking-widest font-light">
            GRAVEN
          </span>
          <span className="text-[#9aa4ae] tracking-[0.2em]">
            — DRAFTING WORKS · SHEET SET 0001
          </span>
        </div>

        {/* Right Links */}
        <div className="flex items-center gap-6">
          <button
            onClick={onOpenWork}
            className="hover:text-white transition-colors cursor-pointer tracking-[0.2em]"
          >
            Work
          </button>
          <span className="text-white/20">·</span>
          <button
            onClick={onOpenMethod}
            className="hover:text-white transition-colors cursor-pointer tracking-[0.2em]"
          >
            Method
          </button>
          <span className="text-white/20">·</span>
          <button
            onClick={() => onScrollToBeat(0)}
            className="hover:text-white transition-colors cursor-pointer tracking-[0.2em]"
          >
            Studio
          </button>
          <span className="text-white/20">·</span>
          <button
            onClick={onOpenInquiry}
            className="hover:text-white transition-colors cursor-pointer tracking-[0.2em]"
          >
            Contact
          </button>
        </div>
      </div>
    </footer>
  );
};
