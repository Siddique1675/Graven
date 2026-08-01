import React from 'react';
import { X, PenTool, Compass, Scissors, Hammer } from 'lucide-react';

interface MethodologyDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiry: () => void;
}

export const MethodologyDrawer: React.FC<MethodologyDrawerProps> = ({
  isOpen,
  onClose,
  onOpenInquiry,
}) => {
  if (!isOpen) return null;

  const steps = [
    {
      no: '01',
      title: 'THE SHEET',
      icon: PenTool,
      desc: 'Establishing the ground. We define boundary envelopes, scale factors, units, and geometric constraints on vellum or digital drafting planes before drawing a single line.',
    },
    {
      no: '02',
      title: 'THE FRAME',
      icon: Compass,
      desc: 'Skeletal geometry. Construction axes, datum points, and primary pitch lines are traced to lock spatial tolerances within ±0.1mm.',
    },
    {
      no: '03',
      title: 'THE SECTION',
      icon: Scissors,
      desc: 'Internal architecture. Section cuts reveal wall thicknesses, thread engagements, thermal channels, and assembly clearances.',
    },
    {
      no: '04',
      title: 'THE BUILD',
      icon: Hammer,
      desc: 'Final release. Complete GD&T dimensioning, title block signoff, and file package formatting for CNC milling, additive printing, or manual craft.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#0c0f13]/80 backdrop-blur-md animate-blur-fade-up">
      <div className="relative w-full max-w-xl h-full bg-[#0c0f13] border-l border-white/10 p-6 md:p-10 flex flex-col overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
          <div>
            <span className="font-mono-custom text-xs tracking-[0.3em] text-[#9aa4ae] uppercase">
              STUDIO MANIFESTO
            </span>
            <h2 className="font-display text-2xl md:text-3xl font-light text-white mt-1">
              The 4-Stage Method
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full liquid-glass flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Introduction */}
        <p className="font-display text-base text-white/70 leading-relaxed mb-8">
          GRAVEN works under the principle that physical objects achieve permanence only when their geometric relationships are completely understood on the drafting table first.
        </p>

        {/* Steps */}
        <div className="space-y-6 flex-1 mb-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.no} className="p-5 rounded-xl border border-white/10 bg-white/[0.02] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono-custom text-xs tracking-widest text-[#9aa4ae]">
                    PHASE {step.no}
                  </span>
                  <Icon className="w-4 h-4 text-[#9aa4ae]" />
                </div>
                <h3 className="font-display text-xl text-white font-light">
                  {step.title}
                </h3>
                <p className="font-display text-sm text-white/60 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
          <button
            onClick={() => {
              onClose();
              onOpenInquiry();
            }}
            className="w-full bg-[#9aa4ae] text-[#0c0f13] py-3.5 rounded-full font-mono-custom text-xs tracking-[0.2em] font-bold text-center hover:bg-white transition-colors cursor-pointer"
          >
            COMMISSION A DRAFTING SET
          </button>
          <p className="font-mono-custom text-[10px] text-white/40 text-center">
            PROJECTION: FIRST ANGLE / THIRD ANGLE ISO STANDARD
          </p>
        </div>
      </div>
    </div>
  );
};
