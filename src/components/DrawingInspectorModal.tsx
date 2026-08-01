import React, { useState } from 'react';
import { X, Layers, FileText, CheckCircle2, Sliders, ExternalLink } from 'lucide-react';
import { STUDIO_PROJECTS } from '../data';
import { DrawingProject } from '../types';

interface DrawingInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProjectForInquiry?: (projectTitle: string) => void;
}

export const DrawingInspectorModal: React.FC<DrawingInspectorModalProps> = ({
  isOpen,
  onClose,
  onSelectProjectForInquiry,
}) => {
  const [selectedProject, setSelectedProject] = useState<DrawingProject>(STUDIO_PROJECTS[0]);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'details'>('overview');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0c0f13]/80 backdrop-blur-md animate-blur-fade-up">
      <div className="relative w-full max-w-4xl bg-[#0c0f13] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span className="font-mono-custom text-xs tracking-[0.3em] text-[#9aa4ae] uppercase">
              STUDIO ARCHIVE
            </span>
            <span className="text-white/20">/</span>
            <span className="font-display text-base text-white">
              Selected Blueprint Sheets
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full liquid-glass flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
          {/* Project List Sidebar */}
          <div className="md:col-span-4 border-r border-white/10 p-4 space-y-2 overflow-y-auto bg-white/[0.01]">
            <p className="font-mono-custom text-[10px] tracking-[0.25em] text-[#9aa4ae] uppercase px-3 py-1">
              SHEET INDEX
            </p>
            {STUDIO_PROJECTS.map((proj) => {
              const isSelected = proj.id === selectedProject.id;
              return (
                <button
                  key={proj.id}
                  onClick={() => setSelectedProject(proj)}
                  className={`w-full text-left p-3.5 rounded-xl transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-white/5 border-[#9aa4ae]/40 text-white shadow-sm'
                      : 'border-transparent text-white/60 hover:text-white hover:bg-white/[0.02]'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-mono-custom text-[10px] tracking-widest text-[#9aa4ae]">
                      {proj.sheetNo}
                    </span>
                    <span className="font-mono-custom text-[9px] text-white/40">
                      {proj.year}
                    </span>
                  </div>
                  <p className="font-display text-sm font-medium leading-snug">
                    {proj.title}
                  </p>
                  <p className="font-mono-custom text-[10px] text-white/40 mt-1">
                    {proj.category}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Project Detail Stage */}
          <div className="md:col-span-8 p-6 flex flex-col overflow-y-auto">
            {/* Sheet Title Bar */}
            <div className="border-b border-white/10 pb-4 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="font-mono-custom text-xs tracking-[0.25em] text-[#9aa4ae] bg-white/5 px-2.5 py-1 rounded">
                  {selectedProject.sheetNo}
                </span>
                <span className="font-mono-custom text-xs tracking-wider text-white/50">
                  SCALE: {selectedProject.scale} | TOLERANCE: {selectedProject.tolerance}
                </span>
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-light text-white mb-2">
                {selectedProject.title}
              </h3>
              <p className="font-display text-sm text-white/70 leading-relaxed">
                {selectedProject.description}
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center gap-4 border-b border-white/10 mb-6 font-mono-custom text-xs">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'overview'
                    ? 'text-[#9aa4ae] border-b-2 border-[#9aa4ae]'
                    : 'text-white/40 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                OVERVIEW
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'specs'
                    ? 'text-[#9aa4ae] border-b-2 border-[#9aa4ae]'
                    : 'text-white/40 hover:text-white'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                MATERIAL SPECS
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2 transition-colors cursor-pointer flex items-center gap-1.5 ${
                  activeTab === 'details'
                    ? 'text-[#9aa4ae] border-b-2 border-[#9aa4ae]'
                    : 'text-white/40 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                CAD DETAILS
              </button>
            </div>

            {/* Tab Body */}
            <div className="flex-1">
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  {/* Mock Technical Blueprint Card */}
                  <div className="relative aspect-video rounded-xl bg-[#080b0e] border border-white/10 p-6 flex flex-col justify-between overflow-hidden group">
                    {/* Faint blueprint grid */}
                    <div 
                      className="absolute inset-0 opacity-15"
                      style={{
                        backgroundImage: `linear-gradient(90deg, rgba(154,164,174,0.4) 1px, transparent 1px), linear-gradient(0deg, rgba(154,164,174,0.4) 1px, transparent 1px)`,
                        backgroundSize: '20px 20px',
                      }}
                    />

                    {/* Blueprint vector preview mockup */}
                    <div className="relative z-10 flex-1 flex items-center justify-center">
                      <div className="w-48 h-28 border border-[#9aa4ae]/60 rounded-md relative flex items-center justify-center">
                        <div className="absolute inset-2 border border-dashed border-[#9aa4ae]/40" />
                        <div className="w-20 h-20 rounded-full border border-[#9aa4ae]/70 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-[#9aa4ae]" />
                        </div>
                        <span className="absolute -top-3 left-4 font-mono-custom text-[8px] text-[#9aa4ae] bg-[#080b0e] px-1">
                          DIM 120.5mm
                        </span>
                        <span className="absolute -bottom-3 right-4 font-mono-custom text-[8px] text-[#9aa4ae] bg-[#080b0e] px-1">
                          RAD 40.0mm
                        </span>
                      </div>
                    </div>

                    <div className="relative z-10 flex justify-between items-center text-[10px] font-mono-custom text-white/40 border-t border-white/10 pt-2">
                      <span>DRAWN BY GRAVEN WORKSHOP</span>
                      <span>STAMP: APPROVED FOR PRODUCTION</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(selectedProject.specs).map(([key, val]) => (
                    <div key={key} className="bg-white/5 p-4 rounded-xl border border-white/5">
                      <p className="font-mono-custom text-[10px] text-[#9aa4ae] tracking-widest uppercase mb-1">
                        {key}
                      </p>
                      <p className="font-display text-base text-white font-medium">
                        {val}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'details' && (
                <div className="space-y-3">
                  {selectedProject.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-[#9aa4ae] shrink-0 mt-0.5" />
                      <span className="font-display text-sm text-white/90">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Bottom Action */}
            <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="font-mono-custom text-xs text-white/40">
                READY FOR MANUFACTURE
              </span>
              {onSelectProjectForInquiry && (
                <button
                  onClick={() => {
                    onClose();
                    onSelectProjectForInquiry(selectedProject.title);
                  }}
                  className="bg-[#9aa4ae] text-[#0c0f13] px-5 py-2.5 rounded-full text-xs font-mono-custom tracking-wider font-semibold flex items-center gap-2 hover:bg-white transition-colors cursor-pointer"
                >
                  <span>REQUEST SIMILAR DRAWING</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
