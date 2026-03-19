"use client";

import { useState, useEffect, useCallback, useRef, type FormEvent } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { Navigation } from "./Navigation";
import { InfoPanel } from "./InfoPanel";
import { PartsListSidebar } from "./PartsListSidebar";
import { ChapterOverlay } from "./ChapterOverlay";
import { IntroSequence } from "./IntroSequence";
import { CarPartProvider, useCarPart } from "@/contexts/CarPartContext";
import { ChapterProvider, useChapter } from "@/contexts/ChapterContext";
import { IntroProvider, useIntro } from "@/contexts/IntroContext";
import { ExplodedViewProvider, useExplodedView } from "@/contexts/ExplodedViewContext";
import { AirflowProvider, useAirflow } from "@/contexts/AirflowContext";
import { DRSProvider, useDRS } from "@/contexts/DRSContext";
import { CarPartTooltip } from "./CarPartTooltip";
import { ToolBar, IconExplode, IconAirflow, IconDRS } from "./ToolBar";
import { ChapterContent } from "./chapters/ChapterContent";
import { LoadingScreen } from "./LoadingScreen";
import { goToChapter, goToOverview } from "@/utils/cameraControls";
import { chapters } from "@/data/chapters";

const Scene = dynamic(
  () => import("./Scene").then((m) => ({ default: m.Scene })),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-[#050505]" /> }
);

const F1_CAR_CHAPTER_ID = "the-f1-car";

function HeroContent() {
  const [storyMode, setStoryMode] = useState(false);
  const { selectedPart, clearSelection, setClickEnabled, setCarVisible } = useCarPart();
  const { currentChapter } = useChapter();
  const { startIntro } = useIntro();
  const { isExploded, toggleExploded } = useExplodedView();
  const { isAirflowMode, toggleAirflow } = useAirflow();
  const { isDRSActive, toggleDRS } = useDRS();

  const isCarTab = currentChapter.id === F1_CAR_CHAPTER_ID;

  useEffect(() => {
    setClickEnabled(storyMode && isCarTab);
  }, [storyMode, isCarTab, setClickEnabled]);

  useEffect(() => {
    setCarVisible(!storyMode || isCarTab);
  }, [storyMode, isCarTab, setCarVisible]);

  const handleStartExperience = () => {
    startIntro(() => {
      setStoryMode(true);
      goToChapter(chapters[0]);
    });
  };

  const handleGoHome = () => {
    setStoryMode(false);
    clearSelection();
    goToOverview();
  };

  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);

  const handleEmailSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    const email = emailValue.trim();
    if (!email) return;

    const stored: string[] = JSON.parse(localStorage.getItem("f1_subscribers") || "[]");
    if (!stored.includes(email)) {
      stored.push(email);
      localStorage.setItem("f1_subscribers", JSON.stringify(stored));
    }
    setEmailSubmitted(true);
    setEmailValue("");
  }, [emailValue]);

  const toolBarItems = [
    {
      id: "explode",
      label: "Exploded View",
      icon: <IconExplode />,
      active: isExploded,
      onClick: toggleExploded,
      activeColor: "#ff1e1e",
    },
    {
      id: "airflow",
      label: "Airflow",
      icon: <IconAirflow />,
      active: isAirflowMode,
      onClick: toggleAirflow,
      activeColor: "#00d4ff",
    },
    {
      id: "drs",
      label: "DRS",
      icon: <IconDRS />,
      active: isDRSActive,
      onClick: toggleDRS,
      activeColor: "#00d4ff",
    },
  ];

  return (
    <>
      <LoadingScreen />
      <Scene />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050505]/80 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#050505]/60 to-transparent" />
      </div>

      {/* All UI layered above the gradient */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Navigation showHome={storyMode} onHomeClick={handleGoHome} />

        {/* Landing hero text */}
        <AnimatePresence mode="wait">
          {!storyMode && (
            <motion.div
              key="hero-landing"
              className="absolute bottom-12 sm:bottom-16 left-4 sm:left-6 md:left-10 max-w-lg pointer-events-auto pb-safe"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight text-white mb-3 sm:mb-4 leading-[0.95]">
                INSIDE<br />
                <span className="text-accent">F1</span>
              </h1>
              <p className="font-body text-xs sm:text-sm md:text-base text-white/60 leading-relaxed mb-6 sm:mb-8 max-w-xs sm:max-w-sm">
                Explore the engineering, drivers, teams and rules behind the fastest sport on earth.
              </p>
              <motion.button
                type="button"
                onClick={handleStartExperience}
                className="group relative flex items-center gap-3 px-5 py-3 sm:px-7 sm:py-3.5 min-h-[44px] font-body text-[11px] sm:text-xs tracking-[0.2em] uppercase text-white rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-sm hover:bg-white/[0.08] active:bg-white/[0.08] hover:border-white/25 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <span>Start Experience</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-accent transition-transform group-hover:translate-x-0.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.button>

              <motion.div
                className="mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                {emailSubmitted ? (
                  <p className="font-body text-xs text-accent tracking-wide">
                    Thanks! We&apos;ll keep you updated.
                  </p>
                ) : (
                  <form onSubmit={handleEmailSubmit} className="flex items-center gap-2">
                    <input
                      ref={emailRef}
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={emailValue}
                      onChange={(e) => setEmailValue(e.target.value)}
                      className="w-44 sm:w-52 px-4 py-2.5 min-h-[44px] rounded-full bg-white/[0.05] border border-white/[0.12] text-white/90 placeholder-white/30 font-body text-xs tracking-wide outline-none focus:border-accent/40 focus:bg-white/[0.08] transition-all duration-300"
                    />
                    <motion.button
                      type="submit"
                      className="px-4 py-2.5 min-h-[44px] min-w-[44px] rounded-full border border-white/[0.12] bg-white/[0.05] text-white/60 hover:text-accent active:text-accent hover:bg-accent/10 active:bg-accent/10 hover:border-accent/30 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                      </svg>
                    </motion.button>
                  </form>
                )}
                <p className="mt-2 font-body text-[10px] text-white/30 tracking-wide">
                  Get notified about updates
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Model attribution */}
        <AnimatePresence>
          {!storyMode && (
            <motion.div
              key="model-note"
              className="absolute bottom-6 sm:bottom-8 right-4 sm:right-6 md:right-10 pb-safe"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <p className="text-[11px] font-body tracking-wider text-white/30">
                3D model based on the Scuderia Ferrari F1-75
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Story mode UI */}
        {storyMode && (
          <>
            {/* Top center: Chapter tabs */}
            <div className="absolute top-12 sm:top-16 inset-x-0 z-20 flex justify-center px-2 sm:px-4 pointer-events-none">
              <div className="pointer-events-auto">
                <ChapterOverlay />
              </div>
            </div>

            {isCarTab ? (
              <>
                {/* Left: Parts list sidebar */}
                <PartsListSidebar />

                {/* Bottom center: hint + toolbar */}
                <div className="absolute bottom-3 sm:bottom-4 inset-x-0 z-20 flex flex-col items-center gap-2 px-4 pointer-events-none pb-safe">
                  <motion.p
                    className="text-xs font-body text-white/40 text-center tracking-wide max-w-md leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.6 }}
                  >
                    Select a part from the list or click directly on the car
                  </motion.p>
                  <div className="pointer-events-auto">
                    <ToolBar items={toolBarItems} />
                  </div>
                </div>

                <CarPartTooltip />
              </>
            ) : (
              <ChapterContent />
            )}
          </>
        )}
      </div>

      {/* Right side info panel */}
      {storyMode && isCarTab && (
        <InfoPanel part={selectedPart} onClose={clearSelection} />
      )}

      <IntroSequence />
    </>
  );
}

export function HeroSection() {
  return (
    <CarPartProvider>
      <ChapterProvider>
        <IntroProvider>
        <ExplodedViewProvider>
        <AirflowProvider>
        <DRSProvider>
        <section className="relative h-screen w-full overflow-hidden bg-[#050505]">
          <HeroContent />
        </section>
        </DRSProvider>
        </AirflowProvider>
        </ExplodedViewProvider>
        </IntroProvider>
      </ChapterProvider>
    </CarPartProvider>
  );
}
