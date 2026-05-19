"use client";

import { ChevronDown } from "lucide-react";
import { HeroDitheringCard } from "@/components/ui/hero-dithering-card";
import ButtonWithIcon from "@/components/ui/button-with-icon";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function CallToAction() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.85, 1, 1, 0.85]);
  return (
    <section id="contact" className="w-full bg-dexiko-white py-24 md:py-40 px-4 md:px-8 relative overflow-hidden flex flex-col items-center justify-center min-h-[80vh]">
      
      {/* Background Typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none overflow-hidden">
        <h1 className="font-outfit font-black text-[20rem] md:text-[35rem] leading-none text-dexiko-black/[0.03] tracking-tighter mix-blend-multiply">
          DX
        </h1>
      </div>

      <motion.div ref={containerRef} style={{ scale }} className="w-full origin-center relative z-10 max-w-7xl mx-auto">
        <HeroDitheringCard className="w-full h-full">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-dexiko-orange/20 bg-dexiko-orange/10 px-4 py-1.5 text-sm font-medium text-dexiko-orange backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-dexiko-orange opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-dexiko-orange"></span>
          </span>
          Start Your Journey
        </div>

        <h2 className="font-outfit font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6 text-dexiko-black uppercase">
          Ready to work <br />
          <span className="text-dexiko-black/80">with us?</span>
        </h2>
        
        <p className="text-xl md:text-2xl text-dexiko-black/60 font-medium max-w-2xl mb-12">
          Let's build a strategic partnership that elevates your digital presence and drives measurable growth.
        </p>

        {/* Form Container */}
        <div className="w-full max-w-4xl bg-white p-2 pl-4 md:pl-8 rounded-[2rem] md:rounded-full border border-dexiko-black/10 shadow-2xl flex flex-col md:flex-row items-center gap-4 transition-shadow focus-within:shadow-dexiko-orange/20 relative z-20">
          
          {/* Name Input */}
          <div className="flex-1 w-full md:w-auto md:border-r border-dexiko-black/10 py-3 md:pr-4">
            <input 
              type="text" 
              placeholder="Your Name" 
              className="w-full outline-none text-lg font-medium text-dexiko-black placeholder:text-dexiko-black/40 bg-transparent px-4 md:px-0"
            />
          </div>

          {/* Country Code & Mobile Input */}
          <div className="flex-1 w-full md:w-auto flex items-center gap-2 py-3 px-4 md:px-0 md:pl-2">
            <div className="flex items-center gap-1 cursor-pointer text-dexiko-black/60 hover:text-dexiko-black font-medium pr-2 border-r border-dexiko-black/10">
              <span>🇮🇳 +91</span>
              <ChevronDown size={16} />
            </div>
            <input 
              type="tel" 
              placeholder="Mobile Number" 
              className="w-full outline-none text-lg font-medium text-dexiko-black placeholder:text-dexiko-black/40 pl-2 bg-transparent"
            />
          </div>

          {/* Submit Button */}
          <ButtonWithIcon />
        </div>
        </HeroDitheringCard>
      </motion.div>
    </section>
  );
}
