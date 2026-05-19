"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const bentoItems = [
  { id: 1, type: "square", color: "bg-gray-100", title: "Brand Identity", colSpan: "col-span-1" },
  { id: 2, type: "tall", color: "bg-dexiko-orange text-dexiko-white", title: "Moving to a digital space?", colSpan: "col-span-1 row-span-2", isCenterpiece: true },
  { id: 3, type: "square", color: "bg-gray-200", title: "Web Platform", colSpan: "col-span-1" },
  { id: 4, type: "square", color: "bg-gray-900 text-dexiko-white", title: "E-Commerce Rebrand", colSpan: "col-span-1" },
  { id: 5, type: "square", color: "bg-gray-300", title: "Analytics Dashboard", colSpan: "col-span-1" },
];

export default function AsymmetricalBento() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="w-full bg-dexiko-white pt-24 md:pt-40 pb-0 px-4 md:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px] md:auto-rows-[350px]">
          {bentoItems.map((item) => (
            <div 
              key={item.id}
              className={`bento-item group relative rounded-3xl overflow-hidden cursor-pointer flex flex-col justify-end p-8 border border-black/5 transition-transform duration-500 hover:scale-[1.02] ${item.color} ${item.colSpan}`}
            >
              {item.isCenterpiece ? (
                <div className="flex flex-col h-full items-center justify-center text-center">
                  <div className="bg-dexiko-black text-dexiko-white text-xs font-bold px-4 py-2 rounded-full mb-8">
                    Let's Talk
                  </div>
                  <h3 className="font-outfit font-bold text-4xl md:text-5xl leading-tight">
                    {item.title}
                  </h3>
                </div>
              ) : (
                <>
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  <div className="relative z-20 flex justify-between items-end w-full">
                    <h4 className="font-outfit font-bold text-2xl">{item.title}</h4>
                    <div className="w-10 h-10 rounded-full bg-dexiko-white/80 backdrop-blur text-dexiko-black flex items-center justify-center group-hover:bg-dexiko-orange group-hover:text-dexiko-white transition-colors">
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
