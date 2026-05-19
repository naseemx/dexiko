"use client";

import { motion } from "framer-motion";

const clients = [
  "Acme Corp", "GlobalTech", "Nexus", "Stark Ind.", 
  "Wayne Ent", "Cyberdyne", "Umbrella", "Massive Dynamic"
];

// Duplicate for seamless infinite scrolling
const marqueeItems = [...clients, ...clients, ...clients];

export default function ClientRoster() {
  return (
    <section className="w-full bg-dexiko-white pt-0 pb-24 px-4 md:px-8 flex flex-col items-center">
      <h2 className="font-outfit font-bold text-3xl md:text-5xl uppercase tracking-widest mb-16 text-center">
        Our Clients
      </h2>

      {/* Marquee Container */}
      <div className="w-full max-w-[100vw] overflow-hidden relative flex items-center">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-r from-dexiko-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-64 bg-gradient-to-l from-dexiko-white to-transparent z-10"></div>

        <motion.div 
          className="flex whitespace-nowrap gap-12 md:gap-32 items-center"
          animate={{ x: ["0%", "-33.3333%"] }} // Scroll one full set then jump back
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 25,
          }}
        >
          {marqueeItems.map((client, i) => (
            <div 
              key={i} 
              className="font-outfit text-2xl md:text-4xl font-bold text-dexiko-black/20 hover:text-dexiko-black transition-colors cursor-default"
            >
              {client}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-16">
        <button className="px-8 py-3 rounded-full border border-dexiko-black/20 text-dexiko-black font-semibold uppercase tracking-wider hover:bg-dexiko-black hover:text-dexiko-white transition-all text-sm">
          Load More
        </button>
      </div>
    </section>
  );
}
