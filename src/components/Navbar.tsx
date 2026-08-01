import React, { useState } from 'react';
import { PenLine, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenInquiry: () => void;
  onOpenWork: () => void;
  onOpenMethod: () => void;
  onScrollToBeat: (progress: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenInquiry,
  onOpenWork,
  onOpenMethod,
  onScrollToBeat,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (action: () => void) => {
    setMobileMenuOpen(false);
    action();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-md bg-[#0c0f13]/60 border-b border-white/[0.04]">
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 md:py-6 max-w-7xl mx-auto">
        {/* Left: Brand Logo & Sub-tag */}
        <div 
          onClick={() => onScrollToBeat(0)} 
          className="flex items-center gap-3 cursor-pointer group select-none animate-blur-fade-up"
          style={{ animationDelay: '0ms' }}
        >
          <span className="font-display text-lg md:text-xl tracking-[0.12em] font-light text-white group-hover:text-[#9aa4ae] transition-colors">
            GRAVEN
          </span>
          <span className="hidden sm:inline-block font-mono-custom text-[10px] tracking-[0.3em] text-[#9aa4ae] border-l border-white/10 pl-3 py-0.5">
            / DRAFTING WORKS
          </span>
        </div>

        {/* Center: Links (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8">
          <button
            onClick={() => handleNavClick(onOpenWork)}
            className="font-display text-sm text-white/70 hover:text-white transition-colors animate-blur-fade-up cursor-pointer"
            style={{ animationDelay: '100ms' }}
          >
            Work
          </button>
          <button
            onClick={() => handleNavClick(onOpenMethod)}
            className="font-display text-sm text-white/70 hover:text-white transition-colors animate-blur-fade-up cursor-pointer"
            style={{ animationDelay: '150ms' }}
          >
            Method
          </button>
          <button
            onClick={() => handleNavClick(() => onScrollToBeat(0.1))}
            className="font-display text-sm text-white/70 hover:text-white transition-colors animate-blur-fade-up cursor-pointer"
            style={{ animationDelay: '200ms' }}
          >
            The Studio
          </button>
          <button
            onClick={() => handleNavClick(onOpenInquiry)}
            className="font-display text-sm text-white/70 hover:text-white transition-colors animate-blur-fade-up cursor-pointer"
            style={{ animationDelay: '250ms' }}
          >
            Contact
          </button>
        </nav>

        {/* Right: CTA & Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenInquiry}
            className="liquid-glass rounded-full px-4 sm:px-5 py-2 text-sm text-white flex items-center gap-2 hover:bg-white/[0.05] transition-all group animate-blur-fade-up cursor-pointer"
            style={{ animationDelay: '300ms' }}
          >
            <PenLine className="w-4 h-4 text-[#9aa4ae] group-hover:scale-110 transition-transform" />
            <span className="font-display tracking-wide text-xs sm:text-sm">Start a drawing</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 liquid-glass rounded-full flex items-center justify-center text-white/80 hover:text-white cursor-pointer relative"
            aria-label="Toggle Navigation Menu"
          >
            <div className={`transition-transform duration-500 ${mobileMenuOpen ? 'rotate-180 scale-100' : 'rotate-0 scale-100'}`}>
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#9aa4ae]" /> : <Menu className="w-5 h-5" />}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c0f13]/95 backdrop-blur-xl border-b border-white/10 px-6 py-6 flex flex-col gap-4 animate-blur-fade-up">
          <button
            onClick={() => handleNavClick(onOpenWork)}
            className="text-left font-display text-base text-white/80 hover:text-white py-2 border-b border-white/5 flex items-center justify-between"
          >
            <span>Work</span>
            <span className="font-mono-custom text-xs text-[#9aa4ae]">01</span>
          </button>
          <button
            onClick={() => handleNavClick(onOpenMethod)}
            className="text-left font-display text-base text-white/80 hover:text-white py-2 border-b border-white/5 flex items-center justify-between"
          >
            <span>Method</span>
            <span className="font-mono-custom text-xs text-[#9aa4ae]">02</span>
          </button>
          <button
            onClick={() => handleNavClick(() => onScrollToBeat(0.15))}
            className="text-left font-display text-base text-white/80 hover:text-white py-2 border-b border-white/5 flex items-center justify-between"
          >
            <span>The Studio</span>
            <span className="font-mono-custom text-xs text-[#9aa4ae]">03</span>
          </button>
          <button
            onClick={() => handleNavClick(onOpenInquiry)}
            className="text-left font-display text-base text-white/80 hover:text-white py-2 flex items-center justify-between"
          >
            <span>Contact</span>
            <span className="font-mono-custom text-xs text-[#9aa4ae]">04</span>
          </button>
        </div>
      )}
    </header>
  );
};
