"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { InteractiveGrid } from "@/components/ui/interactive-grid";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    // Simple custom text splitting logic for free GSAP
    if (!textRef.current) return;
    
    const words = textRef.current.innerText.split(" ");
    textRef.current.innerHTML = "";
    
    words.forEach((word) => {
      const span = document.createElement("span");
      span.className = "inline-block overflow-hidden pb-2 mr-[0.25em]";
      
      const innerSpan = document.createElement("span");
      innerSpan.className = "inline-block translate-y-[120%]";
      
      if (word === "Digital" || word === "Excellence") {
        innerSpan.classList.add("text-dexiko-orange");
      }
      if (word === "?") {
        innerSpan.classList.add("text-dexiko-black");
      }
      
      innerSpan.innerText = word;
      span.appendChild(innerSpan);
      textRef.current?.appendChild(span);
    });

    // Animation
    const chars = textRef.current.querySelectorAll("span > span");
    gsap.to(chars, {
      y: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: "power4.out",
      delay: 0.2,
    });
    
    gsap.fromTo(containerRef.current, {
      opacity: 0,
      scale: 0.95
    }, {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: "power3.out"
    });

    // Scroll-based shrink animation separated to wrapper to avoid GSAP scale conflict
    gsap.to(scrollWrapperRef.current, {
      scale: 0.85,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} id="home" className="w-full min-h-screen p-4 md:p-8 flex flex-col pt-32">
      <div ref={scrollWrapperRef} className="flex-1 w-full h-full flex flex-col origin-top">
        <div 
          ref={containerRef}
          className="flex-1 bg-[#F4F4F4] text-dexiko-black rounded-[2.5rem] border border-black/5 flex items-center justify-center p-8 relative overflow-hidden"
        >
          {/* Interactive Grid Background */}
          <InteractiveGrid />
        
        <div className="max-w-6xl mx-auto text-center z-10 pointer-events-none">
          <h1 
            ref={textRef}
            className="font-outfit font-bold text-5xl md:text-7xl lg:text-9xl tracking-tighter leading-tight"
          >
            Think Digital Excellence ?
          </h1>
        </div>
      </div>
      </div>
    </section>
  );
}
