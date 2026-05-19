"use client";

import { useState, Suspense, lazy } from "react";
import { cn } from "@/lib/utils";

const Dithering = lazy(() =>
  import("@paper-design/shaders-react").then((mod) => ({
    default: mod.Dithering,
  }))
);

interface HeroDitheringCardProps {
  children: React.ReactNode;
  className?: string;
}

export function HeroDitheringCard({ children, className }: HeroDitheringCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={cn("w-full relative", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-[32px] md:rounded-[48px] border border-dexiko-black/10 bg-dexiko-white shadow-2xl min-h-[500px] md:min-h-[600px] flex flex-col items-center justify-center duration-500">
        <Suspense fallback={<div className="absolute inset-0 bg-dexiko-black/5" />}>
          <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-multiply">
            <Dithering
              colorBack="#00000000"
              colorFront="#FF5A00" // dexiko-orange
              shape="warp"
              type="4x4"
              speed={isHovered ? 0.6 : 0.2}
              className="size-full"
              minPixelRatio={1}
            />
          </div>
        </Suspense>

        <div className="relative z-10 px-4 md:px-6 py-12 md:py-16 max-w-4xl mx-auto w-full text-center flex flex-col items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
