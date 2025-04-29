
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import StatCounter from "@/components/StatCounter";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";

const Index = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <StatCounter />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
