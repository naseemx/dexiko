import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import BrandStatement from "@/components/sections/BrandStatement";
import PortfolioGrid1 from "@/components/sections/PortfolioGrid1";
import ServicesBento from "@/components/sections/ServicesBento";
import AsymmetricalBento from "@/components/sections/AsymmetricalBento";
import ClientRoster from "@/components/sections/ClientRoster";
import MassiveTestimonial from "@/components/sections/MassiveTestimonial";
import FAQ from "@/components/sections/FAQ";
import CallToAction from "@/components/sections/CallToAction";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-dexiko-white w-full min-h-screen">
      <Navbar />
      <Hero />
      <BrandStatement />
      <PortfolioGrid1 />
      <ServicesBento />
      <AsymmetricalBento />
      <ClientRoster />
      <MassiveTestimonial />
      <FAQ />
      <CallToAction />
      <Footer />
    </main>
  );
}
