"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import HyperTextParagraph from "@/components/ui/hyper-text-with-decryption";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function BrandStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Rotating Badge
    gsap.to(badgeRef.current, {
      rotation: 360,
      repeat: -1,
      duration: 8,
      ease: "linear",
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="w-full bg-dexiko-white text-dexiko-black pt-4 pb-24 md:pt-8 md:pb-40 overflow-hidden">
      <div className="w-full mx-auto flex flex-col gap-16 md:gap-24">
        
        {/* Massive Marquee Heading */}
        <div className="w-full relative flex whitespace-nowrap overflow-hidden">
          <motion.div 
            className="flex min-w-max gap-8 pr-8 items-center"
            animate={{ x: [0, "-50%"] }}
            transition={{ ease: "linear", duration: 15, repeat: Infinity }}
          >
            <h2 className="font-outfit font-bold text-6xl md:text-8xl lg:text-[10rem] tracking-tighter leading-none">
              Let your brand stand out from the crowd. 
            </h2>
            <h2 className="font-outfit font-bold text-6xl md:text-8xl lg:text-[10rem] tracking-tighter leading-none text-dexiko-black/20">
              *
            </h2>
            <h2 className="font-outfit font-bold text-6xl md:text-8xl lg:text-[10rem] tracking-tighter leading-none">
              Let your brand stand out from the crowd. 
            </h2>
            <h2 className="font-outfit font-bold text-6xl md:text-8xl lg:text-[10rem] tracking-tighter leading-none text-dexiko-black/20">
              *
            </h2>
          </motion.div>
        </div>

        {/* Content Grid */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center px-4 md:px-8">
          <div className="md:col-span-8 flex flex-col gap-6">
            <h3 className="text-3xl md:text-5xl font-outfit font-black tracking-tight uppercase">
              Software & Digital <br/> Marketing Agency
            </h3>
            <HyperTextParagraph
              text="We engineer high-performance software applications and deliver comprehensive digital marketing campaigns. From scalable web platforms to strategic branding and performance marketing, we elevate your digital presence and drive measurable business growth."
              highlightWords={["software", "marketing", "scalable", "branding", "growth."]}
              className="text-lg md:text-xl text-dexiko-black/70 max-w-2xl font-medium leading-relaxed"
            />
          </div>

          <div className="md:col-span-4 flex justify-center md:justify-end">
            <div className="relative flex items-center justify-center w-40 h-40">
              {/* Rotating Badge Text */}
              <div ref={badgeRef} className="absolute inset-0 w-full h-full text-dexiko-orange">
                <svg viewBox="0 0 100 100" width="100%" height="100%">
                  <defs>
                    <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                  </defs>
                  <text fontSize="14" fontWeight="bold" letterSpacing="2" fill="currentColor">
                    <textPath href="#circle">
                      SCROLL TO DISCOVER • DIGITAL EXCELLENCE •
                    </textPath>
                  </text>
                </svg>
              </div>
              {/* Center Arrow */}
              <div className="bg-dexiko-orange rounded-full p-4 text-dexiko-white">
                <ArrowDown size={32} strokeWidth={2.5} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
