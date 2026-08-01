import React from 'react';
import { Grid, Eye, Sliders, Maximize2 } from 'lucide-react';

interface InteractiveHUDControlsProps {
  showGrid: boolean;
  onToggleGrid: () => void;
  showTechnicalHUD: boolean;
  onToggleHUD: () => void;
  currentTime: number;
  duration: number;
  onOpenWork: () => void;
}

export const InteractiveHUDControls: React.FC<InteractiveHUDControlsProps> = ({
  showGrid,
  onToggleGrid,
  showTechnicalHUD,
  onToggleHUD,
  currentTime,
  duration,
  onOpenWork,
}) => {
  const formattedTime = currentTime.toFixed(2);
  const formattedDuration = isFinite(duration) ? duration.toFixed(2) : '0.00';

  return (
    <div className="absolute bottom-6 left-4 sm:left-6 md:left-12 z-20 flex items-center gap-2 select-none">
      {/* Grid Toggle */}
      <button
        onClick={onToggleGrid}
        className={`liquid-glass px-3 py-1.5 rounded-full text-[10px] font-mono-custom tracking-[0.2em] flex items-center gap-1.5 transition-colors cursor-pointer ${
          showGrid ? 'text-[#9aa4ae] border-[#9aa4ae]/40 bg-white/5' : 'text-white/40 hover:text-white/80'
        }`}
        title="Toggle Blueprint Grid Lines"
      >
        <Grid className="w-3 h-3" />
        <span className="hidden sm:inline">GRID</span>
      </button>

      {/* Technical HUD Overlay Toggle */}
      <button
        onClick={onToggleHUD}
        className={`liquid-glass px-3 py-1.5 rounded-full text-[10px] font-mono-custom tracking-[0.2em] flex items-center gap-1.5 transition-colors cursor-pointer ${
          showTechnicalHUD ? 'text-[#9aa4ae] border-[#9aa4ae]/40 bg-white/5' : 'text-white/40 hover:text-white/80'
        }`}
        title="Toggle Technical Annotations HUD"
      >
        <Eye className="w-3 h-3" />
        <span className="hidden sm:inline">HUD</span>
      </button>

      {/* Blueprint Archive Modal Button */}
      <button
        onClick={onOpenWork}
        className="liquid-glass px-3 py-1.5 rounded-full text-[10px] font-mono-custom tracking-[0.2em] text-white/70 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
        title="Open Blueprint Sheet Index"
      >
        <Maximize2 className="w-3 h-3 text-[#9aa4ae]" />
        <span className="hidden sm:inline">ARCHIVE</span>
      </button>

      {/* Playhead Time Counter */}
      <div className="hidden sm:flex items-center gap-2 border-l border-white/10 pl-3 ml-1 font-mono-custom text-[10px] tracking-[0.2em] text-white/40">
        <Sliders className="w-3 h-3 text-[#9aa4ae]" />
        <span>T: {formattedTime}s / {formattedDuration}s</span>
      </div>
    </div>
  );
};
