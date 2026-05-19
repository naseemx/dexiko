"use client";

import Link from "next/link";
import SocialFlipButton from "@/components/ui/social-flip-button";

export default function Footer() {
  return (
    <footer className="w-full bg-neutral-100 text-dexiko-black py-16 md:py-24 px-4 md:px-8 border-t border-black/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
        
        {/* Col 1: Brand */}
        <div className="flex flex-col gap-6">
          <Link href="/" className="font-outfit font-bold text-4xl tracking-tighter">
            dexiko<span className="text-dexiko-orange">.</span>
          </Link>
          <p className="text-sm font-medium text-dexiko-black/60 max-w-xs">
            A powerhouse agency engineering high-performance web applications and conversion-driven branding.
          </p>
          <SocialFlipButton className="justify-start" />
        </div>

        {/* Col 2: Pages */}
        <div className="flex flex-col gap-6">
          <h4 className="font-outfit font-bold text-lg uppercase tracking-wider">Pages</h4>
          <div className="flex flex-col gap-3 font-medium text-dexiko-black/70">
            <Link href="#home" className="hover:text-dexiko-orange transition-colors">Home</Link>
            <Link href="#services" className="hover:text-dexiko-orange transition-colors">Services</Link>
            <Link href="#works" className="hover:text-dexiko-orange transition-colors">Works</Link>
            <Link href="#contact" className="hover:text-dexiko-orange transition-colors">Contact</Link>
          </div>
        </div>

        {/* Col 3: Works */}
        <div className="flex flex-col gap-6">
          <h4 className="font-outfit font-bold text-lg uppercase tracking-wider">Our Works</h4>
          <div className="flex flex-col gap-3 font-medium text-dexiko-black/70">
            <Link href="#" className="hover:text-dexiko-orange transition-colors">Fintech Dashboard</Link>
            <Link href="#" className="hover:text-dexiko-orange transition-colors">E-Commerce App</Link>
            <Link href="#" className="hover:text-dexiko-orange transition-colors">SaaS Platform</Link>
            <Link href="#" className="hover:text-dexiko-orange transition-colors">Brand Identity</Link>
          </div>
        </div>

        {/* Col 4: Contact */}
        <div className="flex flex-col gap-6">
          <h4 className="font-outfit font-bold text-lg uppercase tracking-wider">Contact</h4>
          <div className="flex flex-col gap-4 font-medium text-dexiko-black/70">
            <p>
              123 Digital Avenue, Suite 400<br/>
              San Francisco, CA 94103
            </p>
            <p className="flex flex-col">
              <span className="text-dexiko-black font-bold uppercase text-xs mb-1">Support</span>
              <a href="mailto:hello@dexiko.agency" className="hover:text-dexiko-orange transition-colors">hello@dexiko.agency</a>
            </p>
            <p className="flex flex-col">
              <span className="text-dexiko-black font-bold uppercase text-xs mb-1">Phone</span>
              <a href="tel:+1234567890" className="hover:text-dexiko-orange transition-colors">+1 (234) 567-890</a>
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-dexiko-black/50">
        <p>© {new Date().getFullYear()} Dexiko Agency. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-dexiko-black transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-dexiko-black transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
