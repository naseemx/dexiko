"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Quote } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function MassiveTestimonial() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (!textRef.current) return;

    // Split text into words
    const words = textRef.current.innerText.split(" ");
    textRef.current.innerHTML = "";

    words.forEach((word) => {
      const span = document.createElement("span");
      span.innerText = word + " ";
      span.className = "opacity-20 text-dexiko-white transition-colors";
      textRef.current?.appendChild(span);
    });

    const spans = textRef.current.querySelectorAll("span");

    gsap.to(spans, {
      opacity: 1,
      stagger: 0.1,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        end: "bottom 80%",
        scrub: true,
      }
    });

  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="w-full bg-dexiko-black py-32 md:py-64 px-4 md:px-8 overflow-hidden relative">
      <div className="max-w-6xl mx-auto relative">
        
        <Quote className="absolute -top-16 -left-8 md:-top-24 md:-left-16 text-dexiko-orange w-16 h-16 md:w-32 md:h-32 rotate-180 opacity-50" />
        
        <p 
          ref={textRef}
          className="font-outfit font-bold text-4xl md:text-6xl lg:text-7xl leading-[1.2] md:leading-[1.1] tracking-tight relative z-10"
        >
          Dexiko is a powerhouse. Engaging with such positive and skilled developers and strategists has completely transformed our sales pipeline and brand presence.
        </p>

        <Quote className="absolute -bottom-16 -right-8 md:-bottom-24 md:-right-16 text-dexiko-orange w-16 h-16 md:w-32 md:h-32 opacity-50" />

        <div className="mt-16 border-t border-dexiko-white/20 pt-8 w-fit">
          <p className="font-outfit text-xl font-bold text-dexiko-white">John Doe</p>
          <p className="text-dexiko-white/60">CEO, GlobalTech</p>
        </div>
      </div>
    </section>
  );
}
