"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const leftServices = [
  { title: "BRANDING", desc: "Our Branding Services Are Designed To Create A Strong, Memorable Identity For Your Business." },
  { title: "DIGITAL MARKETING", desc: "We Specialize In SEO, Social Media Marketing, Content Creation, And More, Ensuring Your Business Reaches Its Target Audience Effectively And Drives Meaningful Engagement." },
  { title: "WEBSITE DEVELOPMENT", desc: "We Specialize In Creating Custom Websites That Are Visually Engaging And Functionally Robust." },
];

const rightServices = [
  { title: "PRODUCTION", desc: "A Team Of Dedicated People Focusing On Delivering Top-Quality Service, Ensuring Every Project Is Executed With Precision And Efficiency." },
  { title: "PRINT DESIGN", desc: "We Help Design All Your Marketing Materials, Ensuring A Consistent Look And Feel Across All Print Items." },
  { title: "PACKAGE DESIGN", desc: "We Blend Creativity With Strategic Thinking To Ensure Your Packaging Not Only Stands Out On The Shelf But Also Resonates With Your Target Audience, Driving Sales And Brand Loyalty." },
];

export default function ServicesBento() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Scales from 0.85 when entering to 1 in the middle, then shrinks back to 0.85 when leaving.
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.85, 1, 1, 0.85]);

  useGSAP(() => {
    // Fade in services as they scroll
    const leftItems = leftColRef.current?.children;
    const rightItems = rightColRef.current?.children;

    if (leftItems && rightItems) {
      const allItems = [...Array.from(leftItems), ...Array.from(rightItems)];
      allItems.forEach((item) => {
        gsap.fromTo(item, 
          { opacity: 0.2, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item,
              start: "top 85%",
              end: "top 60%",
              scrub: true,
            }
          }
        );
      });
    }
  }, { scope: containerRef });

  return (
    <section ref={sectionRef} id="services" className="w-full bg-dexiko-white px-4 md:px-8 pb-24 relative flex flex-col items-center overflow-hidden">
      
      {/* Header Section (Outside the dark box) */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="font-outfit font-black text-6xl md:text-8xl tracking-tighter uppercase text-dexiko-black mb-6">
          OUR SERVICES
        </h2>
        <p className="text-base md:text-lg text-dexiko-black/80 font-medium leading-relaxed max-w-3xl mx-auto">
          We provide businesses with an expert team that guides them through establishing online marketing strategy. Our areas of expertise include <span className="font-bold">Digital marketing services in Calicut</span>, branding, production, website development, package design, and printing design.
        </p>
      </div>

      {/* Dark Container */}
      <motion.div 
        ref={containerRef}
        style={{ scale }}
        className="bg-dexiko-black text-dexiko-white w-11/12 overflow-hidden rounded-3xl xl:rounded-[3rem] p-8 sm:p-10 mx-auto grid grid-cols-1 xl:grid-cols-3 gap-5 xl:gap-10 relative origin-center"
      >
          {/* Left Column */}
          <div ref={leftColRef} className="z-20 flex flex-col h-full justify-center gap-3 xl:gap-10 text-center xl:text-right">
            {leftServices.map((srv, i) => (
              <div key={i} className="relative group flex flex-col gap-1 xl:gap-3 uppercase transform transition-all duration-300 hover:scale-105">
                <h3 className="text-xl md:text-3xl xl:text-5xl font-outfit font-black hover:text-dexiko-orange transition-colors cursor-pointer">{srv.title}</h3>
                <p className="text-[10px] sm:text-xs capitalize text-dexiko-white/70 text-center xl:text-right font-light">{srv.desc}</p>
              </div>
            ))}
          </div>

          {/* Center Column - Graphic */}
          <div className="opacity-40 xl:opacity-100 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-10 xl:relative xl:flex justify-center items-center pointer-events-none w-full h-full">
            <div className="h-full w-full xl:aspect-square flex justify-center items-center text-dexiko-orange">
              <svg viewBox="0 0 100 150" width="80%" height="80%" className="max-w-[300px]">
                <circle cx="50" cy="40" r="25" fill="none" stroke="currentColor" strokeWidth="20" />
                <path d="M 15 150 v -20 a 35 35 0 0 1 70 0 v 20" fill="none" stroke="currentColor" strokeWidth="20" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Right Column */}
          <div ref={rightColRef} className="z-20 flex flex-col h-full justify-center gap-3 xl:gap-10 text-center xl:text-left">
            {rightServices.map((srv, i) => (
              <div key={i} className="relative group flex flex-col gap-1 xl:gap-3 uppercase transform transition-all duration-300 hover:scale-105">
                <h3 className="text-xl md:text-3xl xl:text-5xl font-outfit font-black hover:text-dexiko-orange transition-colors cursor-pointer">{srv.title}</h3>
                <p className="text-[10px] sm:text-xs capitalize text-dexiko-white/70 text-center xl:text-left font-light">{srv.desc}</p>
              </div>
            ))}
          </div>

      </motion.div>
    </section>
  );
}
