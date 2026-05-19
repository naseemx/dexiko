"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

export type TabItem = {
  id: string;
  title: string;
  description: string;
  image: string;
};

interface VerticalTabsProps {
  tabs: TabItem[];
  title?: string;
  subtitle?: string;
  autoPlayDuration?: number;
}

export function VerticalTabs({
  tabs,
  title = "How I can help you",
  subtitle = "SERVICES",
  autoPlayDuration = 5000,
}: VerticalTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % tabs.length);
  }, [tabs.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + tabs.length) % tabs.length);
  }, [tabs.length]);

  const handleTabClick = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    setIsPaused(false);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, autoPlayDuration);

    return () => clearInterval(interval);
  }, [activeIndex, isPaused, handleNext, autoPlayDuration]);

  const variants = {
    enter: (direction: number) => ({
      y: direction > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      y: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <section className="w-full bg-dexiko-white py-12 md:py-16 lg:py-20">
      <div className="w-full max-w-7xl px-4 md:px-8 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative">
          {/* Left Column: Content */}
          <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 pt-4">
            <div className="space-y-1 mb-8">
              <h2 className="font-outfit font-bold text-4xl md:text-5xl lg:text-6xl leading-tight uppercase text-dexiko-black">
                {title}
              </h2>
              {subtitle && (
                <span className="text-[10px] font-medium text-dexiko-black/60 uppercase tracking-[0.3em] block ml-0.5">
                  ({subtitle})
                </span>
              )}
            </div>

            <div className="flex flex-col space-y-0">
              {tabs.map((tab, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(index)}
                    className={cn(
                      "group relative flex items-start gap-4 py-4 md:py-5 text-left transition-all duration-500 border-t border-dexiko-black/10 first:border-0",
                      isActive
                        ? "text-dexiko-black"
                        : "text-dexiko-black/50 hover:text-dexiko-black"
                    )}
                  >
                    <div className="absolute left-[-16px] md:left-[-24px] top-0 bottom-0 w-[2px] bg-dexiko-black/10">
                      {isActive && (
                        <motion.div
                          key={`progress-${index}-${isPaused}`}
                          className="absolute top-0 left-0 w-full bg-dexiko-orange origin-top"
                          initial={{ height: "0%" }}
                          animate={
                            isPaused ? { height: "0%" } : { height: "100%" }
                          }
                          transition={{
                            duration: autoPlayDuration / 1000,
                            ease: "linear",
                          }}
                        />
                      )}
                    </div>

                    <span className="text-[9px] md:text-[10px] font-medium mt-1 tabular-nums opacity-50 font-outfit">
                      /{tab.id}
                    </span>

                    <div className="flex flex-col gap-2 flex-1">
                      <span
                        className={cn(
                          "text-xl md:text-2xl lg:text-3xl font-outfit font-bold tracking-tight transition-colors duration-500",
                          isActive ? "text-dexiko-black" : ""
                        )}
                      >
                        {tab.title}
                      </span>

                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{
                              duration: 0.3,
                              ease: [0.23, 1, 0.32, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <p className="text-dexiko-black/70 text-sm md:text-base font-normal leading-relaxed max-w-sm pb-2">
                              {tab.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="lg:col-span-7 h-full order-1 lg:order-2">
            <div className="flex flex-col lg:sticky lg:top-32">
              <div
                className="relative group/gallery"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div className="relative aspect-[4/3] lg:aspect-[16/10] rounded-3xl md:rounded-[2.5rem] overflow-hidden bg-dexiko-black/5 border border-dexiko-black/10">
                <AnimatePresence
                  initial={false}
                  custom={direction}
                  mode="popLayout"
                >
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      y: { type: "spring", stiffness: 260, damping: 32 },
                      opacity: { duration: 0.4 },
                    }}
                    className="absolute inset-0 w-full h-full cursor-pointer"
                    onClick={handleNext}
                  >
                    <img
                      src={tabs[activeIndex].image}
                      alt={tabs[activeIndex].title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 m-0 p-0 block"
                    />

                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60" />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 flex gap-2 md:gap-3 z-20">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-dexiko-white/80 backdrop-blur-md border border-dexiko-black/10 flex items-center justify-center text-dexiko-black hover:bg-dexiko-white transition-all active:scale-90"
                    aria-label="Previous"
                  >
                    <ArrowLeft size={20} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-dexiko-white/80 backdrop-blur-md border border-dexiko-black/10 flex items-center justify-center text-dexiko-black hover:bg-dexiko-white transition-all active:scale-90"
                    aria-label="Next"
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

export default VerticalTabs;
