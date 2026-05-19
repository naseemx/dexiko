"use client";

import { VerticalTabs, TabItem } from "@/components/ui/vertical-tabs";

const faqTabs: TabItem[] = [
  {
    id: "01",
    title: "What tech stacks do you use?",
    description:
      "We specialize in modern web technologies, primarily utilizing Next.js, React, Node.js, and specialized animation libraries like GSAP and Framer Motion for high-end experiences.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200",
  },
  {
    id: "02",
    title: "How do you integrate branding?",
    description:
      "Our approach ensures that your software's UI/UX is deeply intertwined with your core brand identity. We establish a comprehensive design system first, ensuring every component, micro-interaction, and layout aligns perfectly with your strategic messaging.",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200",
  },
  {
    id: "03",
    title: "What is your development timeline?",
    description:
      "Timelines vary based on scope, but a typical high-fidelity landing page takes 2-4 weeks, while comprehensive web applications and enterprise software can take anywhere from 2-6 months.",
    image:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1200",
  },
  {
    id: "04",
    title: "Do you provide post-launch support?",
    description:
      "Absolutely. We offer ongoing maintenance, performance optimization, and feature scaling to ensure your digital presence remains cutting-edge.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200",
  },
];

export default function FAQ() {
  return (
    <VerticalTabs 
      tabs={faqTabs} 
      title="Frequently Asked Questions" 
      subtitle="FAQ" 
      autoPlayDuration={5000} 
    />
  );
}
