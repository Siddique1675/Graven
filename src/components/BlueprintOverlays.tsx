import React from 'react';

interface BlueprintOverlaysProps {
  showGrid?: boolean;
  showTechnicalHUD?: boolean;
  mousePos?: { x: number; y: number };
  progress: number;
}

export const BlueprintOverlays: React.FC<BlueprintOverlaysProps> = ({
  showGrid = true,
  showTechnicalHUD = true,
  mousePos = { x: 0, y: 0 },
  progress,
}) => {
  return (
    <>
      {/* 1. BLUEPRINT GRID OVERLAY (Z-INDEX 1) */}
      {showGrid && (
        <div 
          className="pointer-events-none absolute inset-0 z-1 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(154, 164, 174, 0.5) 1px, transparent 1px),
              linear-gradient(0deg, rgba(154, 164, 174, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      )}

      {/* 2. COLD SCRIM OVERLAY (Z-INDEX 2) */}
      <div 
        className="pointer-events-none absolute inset-0 z-2 backdrop-blur-[2px]"
        style={{
          maskImage: 'linear-gradient(to top, black 0%, transparent 42%)',
          WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 42%)',
        }}
      />

      {/* 3. GRAIN OVERLAY (Z-INDEX 3) */}
      <div 
        className="pointer-events-none absolute inset-0 z-3 opacity-5 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* TECHNICAL DRAFTING CORNER MARKS & CAD ANNOTATIONS (Z-INDEX 4) */}
      {showTechnicalHUD && (
        <div className="pointer-events-none absolute inset-0 z-4 overflow-hidden select-none">
          {/* Top-Left Sheet Boundary Lines */}
          <div className="absolute top-20 left-6 sm:left-12 flex flex-col gap-1">
            <div className="w-8 h-[1px] bg-[#9aa4ae]/40" />
            <div className="h-8 w-[1px] bg-[#9aa4ae]/40" />
            <span className="font-mono-custom text-[9px] tracking-[0.25em] text-[#9aa4ae]/50">
              ORIGIN [0,0]
            </span>
          </div>

          {/* Top-Right Sheet Boundary Marks */}
          <div className="absolute top-20 right-6 sm:right-12 flex flex-col items-end gap-1">
            <div className="w-8 h-[1px] bg-[#9aa4ae]/40" />
            <div className="h-8 w-[1px] bg-[#9aa4ae]/40" />
            <span className="font-mono-custom text-[9px] tracking-[0.25em] text-[#9aa4ae]/50">
              SCRUB: {(progress * 100).toFixed(1)}%
            </span>
          </div>

          {/* Bottom-Right Title Block Badge */}
          <div className="hidden md:flex absolute bottom-6 right-12 z-10 border border-[#9aa4ae]/20 bg-[#0c0f13]/70 backdrop-blur-sm p-3 font-mono-custom text-[9px] text-[#9aa4ae]/80 flex-col gap-1 rounded">
            <div className="flex justify-between gap-6 border-b border-[#9aa4ae]/15 pb-1">
              <span className="text-[#9aa4ae]">DW-GRAPH-001</span>
              <span>ISO 128-20</span>
            </div>
            <div className="flex justify-between gap-6 pt-0.5 text-white/50">
              <span>POS: X:{mousePos.x} Y:{mousePos.y}</span>
              <span>SCALE: 1:1</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
