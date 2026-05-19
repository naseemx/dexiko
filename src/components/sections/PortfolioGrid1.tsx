"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const mockups = [
  { id: 1, title: "Fintech Dashboard", category: "UI/UX Design", image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&q=80&w=800", color: "bg-gray-100" },
  { id: 2, title: "E-Commerce App", category: "Mobile App", image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800", color: "bg-gray-200" },
  { id: 3, title: "SaaS Platform", category: "Web App", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800", color: "bg-gray-300" },
];

export default function PortfolioGrid1() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gridRef.current?.querySelectorAll(".portfolio-card");
    
    // Staggered fade up for grid cards
    if (cards) {
      gsap.fromTo(cards, 
        { y: 100, opacity: 0 }, 
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          }
        }
      );
    }

    // Hero container reveal and internal parallax
    if (heroRef.current) {
      gsap.fromTo(heroRef.current,
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top 85%",
          }
        }
      );

      // Simple parallax on the inner content
      const inner = heroRef.current.querySelector(".parallax-inner");
      if (inner) {
        gsap.to(inner, {
          yPercent: 20,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      }
    }
  }, { scope: sectionRef });

  return (
    <section id="works" ref={sectionRef} className="w-full bg-dexiko-white pb-24 md:pb-40 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8 md:gap-12">
        
        {/* Top 3 Square Cards */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {mockups.map((item) => (
            <div 
              key={item.id} 
              className={`portfolio-card group relative aspect-square rounded-3xl overflow-hidden cursor-pointer ${item.color} flex flex-col justify-end p-8 border border-black/5`}
            >
              <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-700" />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              
              {/* Content */}
              <div className="relative z-20 translate-y-8 group-hover:translate-y-0 transition-transform duration-500 text-dexiko-white flex justify-between items-end opacity-0 group-hover:opacity-100">
                <div>
                  <p className="text-sm font-medium uppercase tracking-wider mb-2 text-dexiko-orange drop-shadow-md">{item.category}</p>
                  <h4 className="text-2xl font-bold font-outfit drop-shadow-lg">{item.title}</h4>
                </div>
                <div className="w-12 h-12 rounded-full bg-dexiko-white text-dexiko-black flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <ArrowUpRight size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Hero Showcase */}
        <div 
          ref={heroRef}
          className="w-full aspect-[21/9] md:aspect-[16/6] bg-dexiko-black rounded-3xl overflow-hidden relative border border-black/10 group cursor-pointer"
        >
          <div className="parallax-inner absolute inset-0 -top-[20%] h-[140%] w-full bg-neutral-900 flex items-center justify-center">
            <img src="https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=1600" alt="Showcase Reel" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity" />
            <div className="relative z-10 text-dexiko-white font-outfit text-4xl md:text-6xl font-bold tracking-widest uppercase drop-shadow-2xl">
              Showcase Reel
            </div>
          </div>
          
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/40 transition-colors duration-500">
             <div className="w-20 h-20 rounded-full bg-dexiko-orange/90 backdrop-blur text-dexiko-white flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-500 shadow-xl">
               <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[14px] border-l-white border-b-8 border-b-transparent ml-1" />
             </div>
          </div>
        </div>

      </div>
    </section>
  );
}
