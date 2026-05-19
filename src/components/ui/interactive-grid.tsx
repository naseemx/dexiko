"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export const InteractiveGrid = ({ className }: { className?: string }) => {
  const [cellCount, setCellCount] = useState(0);

  useEffect(() => {
    const updateCellCount = () => {
      // Match reference: 4rem = 64px cells
      const cellSize = 64;
      const columns = Math.ceil(window.innerWidth / cellSize);
      const rows = Math.ceil(window.innerHeight / cellSize);
      setCellCount(columns * rows);
    };

    updateCellCount();
    window.addEventListener("resize", updateCellCount);
    return () => window.removeEventListener("resize", updateCellCount);
  }, []);

  const colors = [
    "#FF5A00", // Dexiko Orange
    "#000000", // Black
    "#333333", // Dark Grey
    "#E5E5E5", // Light Grey
    "#FF8A4C", // Lighter Orange
  ];

  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  return (
    <div
      className={cn(
        "absolute inset-0 z-0 overflow-hidden pointer-events-auto grid grid-cols-[repeat(auto-fill,minmax(4rem,1fr))] auto-rows-[4rem]",
        className
      )}
    >
      {Array.from({ length: cellCount }).map((_, i) => (
        <GridCell key={i} getRandomColor={getRandomColor} />
      ))}
    </div>
  );
};

const GridCell = ({ getRandomColor }: { getRandomColor: () => string }) => {
  const [color, setColor] = useState("transparent");
  const [duration, setDuration] = useState("1000ms");

  const handleMouseEnter = () => {
    setDuration("0ms");      // Instant color
    setColor(getRandomColor());
  };

  const handleMouseLeave = () => {
    setDuration("1000ms");   // Slow fade out
    setColor("transparent");
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="border-[0.5px] border-black/10 aspect-square"
      style={{
        backgroundColor: color,
        transitionProperty: "background-color",
        transitionDuration: duration,
      }}
    />
  );
};
