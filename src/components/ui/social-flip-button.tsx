"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  FaXTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaDribbble,
} from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { IoLogoWhatsapp } from "react-icons/io5";

export interface SocialItem {
  letter: string;
  icon: React.ReactNode;
  label: string;
  href?: string;
  onClick?: () => void;
}

interface SocialFlipButtonProps {
  items?: SocialItem[];
  className?: string;
  itemClassName?: string;
  frontClassName?: string;
  backClassName?: string;
  /** Duration in ms to stay flipped before flipping back (default: 2500) */
  autoFlipDuration?: number;
  /** Interval in ms between auto-flip cycles (default: 4000) */
  autoFlipInterval?: number;
}

const defaultItems: SocialItem[] = [
  { letter: "C", icon: <FaXTwitter />, label: "Twitter / X", href: "#" },
  { letter: "O", icon: <FaInstagram />, label: "Instagram", href: "#" },
  { letter: "N", icon: <FaLinkedinIn />, label: "LinkedIn", href: "#" },
  { letter: "T", icon: <FaDribbble />, label: "Dribbble", href: "#" },
  { letter: "A", icon: <HiOutlineMail />, label: "Email", href: "mailto:hello@dexiko.agency" },
  { letter: "C", icon: <IoLogoWhatsapp />, label: "WhatsApp", href: "#" },
  { letter: "T", icon: <FaXTwitter />, label: "Twitter / X", href: "#" },
];

const SocialFlipNode = ({
  item,
  index,
  isFlipped,
  setTooltipIndex,
  tooltipIndex,
  itemClassName,
  frontClassName,
  backClassName,
}: {
  item: SocialItem;
  index: number;
  isFlipped: boolean;
  setTooltipIndex: (val: number | null) => void;
  tooltipIndex: number | null;
  itemClassName?: string;
  frontClassName?: string;
  backClassName?: string;
}) => {
  const content = (
    <>
      <AnimatePresence>
        {isFlipped && tooltipIndex === index && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
            animate={{ opacity: 1, y: -50, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: 10, scale: 0.8, x: "-50%" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-1/2 z-50 whitespace-nowrap rounded-lg bg-dexiko-black px-3 py-1.5 text-xs font-semibold text-white shadow-xl"
          >
            {item.label}
            {/* Arrow */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 bg-dexiko-black" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="relative h-full w-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 120,
          damping: 15,
          delay: index * 0.08,
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front - Letter */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center rounded-md bg-white text-sm font-outfit font-bold text-dexiko-black shadow-sm border border-black/5", frontClassName
          )}
          style={{ backfaceVisibility: "hidden" }}
        >
          {item.letter}
        </div>

        {/* Back - Icon */}
        <div
          className={cn(
            "absolute inset-0 flex items-center justify-center rounded-md bg-dexiko-orange text-sm text-white", backClassName
          )}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {item.icon}
        </div>
      </motion.div>
    </>
  );

  const commonProps = {
    className: cn("relative h-8 w-8 cursor-pointer", itemClassName),
    style: { perspective: "1000px" },
    onMouseEnter: () => setTooltipIndex(index),
    onMouseLeave: () => setTooltipIndex(null),
  };

  if (item.href) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        {...commonProps}
      >
        {content}
      </a>
    );
  }

  return (
    <div
      onClick={item.onClick}
      {...commonProps}
    >
      {content}
    </div>
  );
};

export default function SocialFlipButton({
  items = defaultItems,
  className,
  itemClassName,
  frontClassName,
  backClassName,
  autoFlipDuration = 2500,
  autoFlipInterval = 4000,
}: SocialFlipButtonProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [tooltipIndex, setTooltipIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const autoTimerRef = useRef<NodeJS.Timeout | null>(null);
  const flipBackTimerRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimers = useCallback(() => {
    if (autoTimerRef.current) {
      clearTimeout(autoTimerRef.current);
      autoTimerRef.current = null;
    }
    if (flipBackTimerRef.current) {
      clearTimeout(flipBackTimerRef.current);
      flipBackTimerRef.current = null;
    }
  }, []);

  // Auto-flip cycle: flip → hold → unflip → wait → repeat
  const startAutoFlipCycle = useCallback(() => {
    clearTimers();

    const runCycle = () => {
      // Flip to icons
      setIsFlipped(true);

      // After autoFlipDuration, flip back to letters
      flipBackTimerRef.current = setTimeout(() => {
        setIsFlipped(false);

        // After autoFlipInterval, start next cycle
        autoTimerRef.current = setTimeout(runCycle, autoFlipInterval);
      }, autoFlipDuration);
    };

    // Start the first cycle after a short initial delay
    autoTimerRef.current = setTimeout(runCycle, autoFlipInterval);
  }, [autoFlipDuration, autoFlipInterval, clearTimers]);

  useEffect(() => {
    if (!isHovered) {
      startAutoFlipCycle();
    }
    return clearTimers;
  }, [isHovered, startAutoFlipCycle, clearTimers]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    clearTimers();
    setIsFlipped(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsFlipped(false);
    setTooltipIndex(null);
    // Auto-flip cycle restarts via the useEffect above
  };

  return (
    <div className={cn("flex items-center justify-center gap-4", className)}>
      <div
        className="group relative flex items-center justify-center gap-1.5 rounded-xl border border-black/10 bg-neutral-100 p-2 shadow-sm"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Border Lines Container - Clipped */}
        <div className="absolute -inset-[1px] overflow-hidden rounded-2xl pointer-events-none">
          {/* Animated Top Border Line */}
          <motion.div
            className="absolute top-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-dexiko-orange/60 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Animated Bottom Border Line */}
          <motion.div
            className="absolute bottom-0 left-0 h-[1px] w-full bg-gradient-to-r from-transparent via-dexiko-orange/60 to-transparent"
            animate={{ x: ["100%", "-100%"] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        {items.map((item, index) => (
          <SocialFlipNode
            key={index}
            item={item}
            index={index}
            isFlipped={isFlipped}
            setTooltipIndex={setTooltipIndex}
            tooltipIndex={tooltipIndex}
            itemClassName={itemClassName}
            frontClassName={frontClassName}
            backClassName={backClassName}
          />
        ))}
      </div>
    </div>
  );
}
