import React from "react";
import Wrapper from "@/components/global/wrapper";
import Navbar from "@/components/navigation/navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import FasilitasSection from "@/components/sections/FasilitasSection";
import ProgramSection from "@/components/sections/ProgramSection";
import TestimoniSection from "@/components/sections/TestimoniSection";
import FAQSection from "@/components/sections/FAQSection";
import Footer from "@/components/navigation/footer";

const Home = () => {
  return (
    <main className="relative bg-black flex justify-center items-center overflow-hidden flex-col mx-auto">
      <div className="max-w-7xl h-full w-full">
        <Wrapper>
          <Navbar />
          <HeroSection />
          <AboutSection />
          <FasilitasSection />
          <ProgramSection />
          <TestimoniSection />
          <FAQSection/>
          <Footer/>
        </Wrapper>
      </div>
    </main>
  );
};

export default Home;
