import React, { useEffect, useRef, useState, useCallback } from 'react';
import { BEATS_DATA } from './data';
import { Navbar } from './components/Navbar';
import { ScrollProgressRail } from './components/ScrollProgressRail';
import { BlueprintOverlays } from './components/BlueprintOverlays';
import { HeroBeat } from './components/HeroBeat';
import { ScrollBeatCard } from './components/ScrollBeatCard';
import { InteractiveHUDControls } from './components/InteractiveHUDControls';
import { DrawingInspectorModal } from './components/DrawingInspectorModal';
import { MethodologyDrawer } from './components/MethodologyDrawer';
import { InquiryModal } from './components/InquiryModal';
import { Footer } from './components/Footer';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Interactive Overlays state
  const [showGrid, setShowGrid] = useState(true);
  const [showTechnicalHUD, setShowTechnicalHUD] = useState(true);

  // Modals state
  const [workModalOpen, setWorkModalOpen] = useState(false);
  const [methodDrawerOpen, setMethodDrawerOpen] = useState(false);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [prefilledInquiryProject, setPrefilledInquiryProject] = useState<string | undefined>();

  // Damping scrub refs
  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  // Handle Video Metadata Loaded
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const dur = videoRef.current.duration;
      if (isFinite(dur) && dur > 0) {
        setVideoDuration(dur);
        // Force initial frame 0 still frame
        videoRef.current.currentTime = 0;
      }
    }
  };

  // Scroll Progress Calculation & Video Scrubbing Loop
  const updateScrollProgress = useCallback(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalScrollableDistance = rect.height - windowHeight;

    if (totalScrollableDistance <= 0) return;

    const rawProgress = -rect.top / totalScrollableDistance;
    const progress = Math.min(Math.max(rawProgress, 0), 1);

    setScrollProgress(progress);

    if (videoRef.current && isFinite(videoRef.current.duration) && videoRef.current.duration > 0) {
      targetTimeRef.current = progress * videoRef.current.duration;
    }
  }, []);

  // Smooth RequestAnimationFrame Loop for Damped Video Scrubbing
  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const loop = () => {
      const video = videoRef.current;
      if (video && video.readyState >= 2 && isFinite(video.duration) && video.duration > 0) {
        const target = targetTimeRef.current;

        if (isReducedMotion) {
          currentTimeRef.current = target;
          try {
            video.currentTime = target;
          } catch {
            // Ignore potential seeking errors
          }
        } else {
          // Damping factor: 0.1 for smooth hand-drawn feel
          const diff = target - currentTimeRef.current;
          currentTimeRef.current += diff * 0.1;

          if (Math.abs(diff) > 0.001) {
            try {
              video.currentTime = currentTimeRef.current;
            } catch {
              // Ignore potential seeking errors
            }
          }
        }

        setVideoCurrentTime(currentTimeRef.current);
      }

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Listen for Scroll & Resize Events
  useEffect(() => {
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, [updateScrollProgress]);

  // Track Mouse Movement for HUD CAD Coordinates
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: Math.round(e.clientX), y: Math.round(e.clientY) });
  };

  // Jump to specific scroll position / beat
  const handleJumpToBeat = (targetProgress: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const totalScrollableDistance = rect.height - window.innerHeight;
    const targetScrollY = containerTop + targetProgress * totalScrollableDistance;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
  };

  // Determine active beat name for the desktop rail
  const currentBeatName = (() => {
    if (scrollProgress < 0.05) return '00 HERO';
    for (const b of BEATS_DATA) {
      if (scrollProgress >= b.progressRange[0] && scrollProgress <= b.progressRange[1]) {
        return b.kicker.split('·')[1]?.trim() || b.kicker;
      }
    }
    return '04 BUILD';
  })();

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#0c0f13] text-white selection:bg-[#9aa4ae]/30 selection:text-white relative font-['Inter_Tight',sans-serif]"
    >
      {/* 1. FIXED NAVBAR */}
      <Navbar
        onOpenInquiry={() => {
          setPrefilledInquiryProject(undefined);
          setInquiryModalOpen(true);
        }}
        onOpenWork={() => setWorkModalOpen(true)}
        onOpenMethod={() => setMethodDrawerOpen(true)}
        onScrollToBeat={handleJumpToBeat}
      />

      {/* 2. FIXED SCROLL PROGRESS RAIL (DESKTOP) */}
      <ScrollProgressRail
        progress={scrollProgress}
        currentBeatName={currentBeatName}
        onJumpToBeat={handleJumpToBeat}
      />

      {/* 3. HERO & SCROLL STAGE TRACK (500vh container; page opens directly on it) */}
      <section 
        ref={containerRef} 
        className="relative h-[360vh] md:h-[500vh] bg-[#0c0f13]"
      >
        {/* Sticky Viewport Stage (100vh) */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* THE SINGLE STICKY SCUBBED VIDEO (NO autoplay, NO loop, NO controls, frame 0 is initial state) */}
          <video
            ref={videoRef}
            src="https://zxdefgavgwfxastwmmjm.supabase.co/storage/v1/object/public/assets/graven.mp4"
            muted
            playsInline
            preload="auto"
            crossOrigin="anonymous"
            onLoadedMetadata={handleLoadedMetadata}
            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          />

          {/* BLUEPRINT OVERLAYS (Grid, Cold Scrim, Grain, Corner HUD Marks) */}
          <BlueprintOverlays
            showGrid={showGrid}
            showTechnicalHUD={showTechnicalHUD}
            mousePos={mousePos}
            progress={scrollProgress}
          />

          {/* HERO BEAT (Sits directly on the sticky stage at progress 0.00 - 0.05) */}
          <HeroBeat progress={scrollProgress} />

          {/* SCROLL BEATS 1 to 4 (Sequenced directly on the sticky stage according to scroll progress) */}
          {BEATS_DATA.map((beat) => (
            <ScrollBeatCard
              key={beat.id}
              beat={beat}
              progress={scrollProgress}
              onOpenWork={() => setWorkModalOpen(true)}
              onOpenMethod={() => setMethodDrawerOpen(true)}
              onInspectBeat={() => setWorkModalOpen(true)}
            />
          ))}

          {/* FLOATING HUD CONTROLS (Grid, HUD, Archive, Timestamp) */}
          <InteractiveHUDControls
            showGrid={showGrid}
            onToggleGrid={() => setShowGrid(!showGrid)}
            showTechnicalHUD={showTechnicalHUD}
            onToggleHUD={() => setShowTechnicalHUD(!showTechnicalHUD)}
            currentTime={videoCurrentTime}
            duration={videoDuration}
            onOpenWork={() => setWorkModalOpen(true)}
          />
        </div>
      </section>

      {/* 4. SOLID FOOTER SECTION */}
      <Footer
        onOpenWork={() => setWorkModalOpen(true)}
        onOpenMethod={() => setMethodDrawerOpen(true)}
        onOpenInquiry={() => {
          setPrefilledInquiryProject(undefined);
          setInquiryModalOpen(true);
        }}
        onScrollToBeat={handleJumpToBeat}
      />

      {/* 5. INTERACTIVE MODALS & DRAWERS */}
      <DrawingInspectorModal
        isOpen={workModalOpen}
        onClose={() => setWorkModalOpen(false)}
        onSelectProjectForInquiry={(projectTitle) => {
          setPrefilledInquiryProject(projectTitle);
          setInquiryModalOpen(true);
        }}
      />

      <MethodologyDrawer
        isOpen={methodDrawerOpen}
        onClose={() => setMethodDrawerOpen(false)}
        onOpenInquiry={() => {
          setPrefilledInquiryProject(undefined);
          setInquiryModalOpen(true);
        }}
      />

      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        prefilledProject={prefilledInquiryProject}
      />
    </div>
  );
}
