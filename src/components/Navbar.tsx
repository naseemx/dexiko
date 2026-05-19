"use client";

import Link from "next/link";
import Image from "next/image";
import { MoveRight } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
];

const navLinksRight = [
  { name: "Works", href: "#works" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <nav
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl"
    >
      <div className="flex items-center justify-between px-8 py-4 bg-white/70 backdrop-blur-md border border-black/10 rounded-full shadow-md">
        {/* Left Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-dexiko-black hover:text-dexiko-orange transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-dexiko-orange transition-all group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* Logo */}
        <Link href="/" className="flex items-center justify-center">
          <img
            src="/dexikoblacktrans.png"
            alt="Dexiko Logo"
            className="h-7 w-auto object-contain"
          />
        </Link>

        {/* Right Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinksRight.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-dexiko-black hover:text-dexiko-orange transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-dexiko-orange transition-all group-hover:w-full"></span>
            </Link>
          ))}
          <Link
            href="#contact"
            className="flex items-center gap-2 bg-dexiko-black text-dexiko-white px-4 py-2 rounded-full text-sm font-bold hover:bg-dexiko-orange hover:text-dexiko-white transition-all group"
          >
            Get Started
            <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
