import React, { useState } from 'react';
import { X, Check, Send, Sparkles } from 'lucide-react';
import { InquiryFormData } from '../types';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledProject?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  prefilledProject,
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    email: '',
    company: '',
    projectType: 'Industrial Object',
    medium: 'vellum',
    scale: '1:1',
    budget: '$5,000 - $15,000',
    notes: prefilledProject ? `Request regarding ${prefilledProject}. ` : '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Auto reset after submission feedback
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0c0f13]/85 backdrop-blur-md animate-blur-fade-up">
      <div className="relative w-full max-w-xl bg-[#0c0f13] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
          <div>
            <span className="font-mono-custom text-xs tracking-[0.3em] text-[#9aa4ae] uppercase">
              SHEET INITIATION
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-light text-white mt-1">
              Start a Drawing
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full liquid-glass flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#9aa4ae]/20 text-[#9aa4ae] flex items-center justify-center mx-auto border border-[#9aa4ae]/40 animate-bounce">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="font-display text-2xl font-light text-white">
              Drawing Request Logged
            </h3>
            <p className="font-display text-sm text-white/70 max-w-md mx-auto leading-relaxed">
              Your parameters have been logged into the studio queue (REV. A). We will reach out within 24 hours with an initial sheet envelope proposal.
            </p>
            <div className="pt-6">
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="bg-[#9aa4ae] text-[#0c0f13] px-6 py-2.5 rounded-full font-mono-custom text-xs tracking-wider cursor-pointer font-bold"
              >
                RETURN TO DRAFT
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono-custom text-[10px] tracking-widest text-[#9aa4ae] uppercase mb-1.5">
                  YOUR NAME *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Elena Rostova"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 font-display text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#9aa4ae]"
                />
              </div>
              <div>
                <label className="block font-mono-custom text-[10px] tracking-widest text-[#9aa4ae] uppercase mb-1.5">
                  EMAIL ADDRESS *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. elena@studio.com"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 font-display text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#9aa4ae]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-mono-custom text-[10px] tracking-widest text-[#9aa4ae] uppercase mb-1.5">
                  PROJECT TYPE
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full bg-[#0c0f13] border border-white/10 rounded-lg px-3.5 py-2.5 font-display text-sm text-white focus:outline-none focus:border-[#9aa4ae]"
                >
                  <option value="Industrial Object">Industrial Object</option>
                  <option value="Optomechanical Component">Optomechanical Component</option>
                  <option value="Architectural Detail">Architectural Detail</option>
                  <option value="Custom Enclosure">Custom Enclosure</option>
                  <option value="Full Sheet Set">Full Sheet Set (01–06)</option>
                </select>
              </div>
              <div>
                <label className="block font-mono-custom text-[10px] tracking-widest text-[#9aa4ae] uppercase mb-1.5">
                  DRAFTING MEDIUM
                </label>
                <select
                  value={formData.medium}
                  onChange={(e) => setFormData({ ...formData, medium: e.target.value as any })}
                  className="w-full bg-[#0c0f13] border border-white/10 rounded-lg px-3.5 py-2.5 font-display text-sm text-white focus:outline-none focus:border-[#9aa4ae]"
                >
                  <option value="vellum">Vellum (Classic)</option>
                  <option value="mylar">Mylar Film (High Precision)</option>
                  <option value="digital">Digital Vector (DXF/STEP)</option>
                  <option value="hybrid">Hybrid Hand-Drawn & CAD</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-mono-custom text-[10px] tracking-widest text-[#9aa4ae] uppercase mb-1.5">
                PROJECT NOTES & SPECIFICATIONS
              </label>
              <textarea
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Describe object dimensions, materials, or intended manufacturing process..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 font-display text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#9aa4ae]"
              />
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-mono-custom text-[10px] text-white/40">
                <Sparkles className="w-3 h-3 text-[#9aa4ae]" />
                <span>CONFIDENTIAL DRAWING DISCLOSURE</span>
              </div>
              <button
                type="submit"
                className="bg-[#9aa4ae] text-[#0c0f13] px-6 py-2.5 rounded-full font-mono-custom text-xs tracking-wider font-bold flex items-center gap-2 hover:bg-white transition-colors cursor-pointer"
              >
                <span>TRANSMIT DRAFT SPEC</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
