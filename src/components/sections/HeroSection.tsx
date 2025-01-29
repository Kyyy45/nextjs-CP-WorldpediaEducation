import React from "react";
import Link from "next/link";
import Container from "../global/container";
import { Spotlight } from "../ui/spotlight";
import { buttonVariants } from "../ui/button";

const HeroSection = () => {
  return (
    <Container delay={0.2}>
      <section id="home" className="relative">
        {/* Spotlights */}
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="white"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="#FFF8C9"
        />
        <Spotlight
          className="left-72 top-28 h-[70vh] w-[50vw]"
          fill="#FFF05F"
        />

        {/* Grid Background */}
        <div className="absolute inset-0 w-full h-full dark:bg-black bg-white dark:bg-grid-white/[0.04] bg-grid-black/[0.3]">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        </div>

        {/* Content */}
        <div className="min-h-screen flex flex-col items-center justify-center w-full text-center">
          <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <h1 className="text-zinc-200 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-tight">
              Broaden Your Horizon With{" "}
              <span className="text-transparent bg-gradient-to-r from-[#FFED00] to-[#FFF05F] bg-clip-text">
                Worldpedia Education
              </span>
            </h1>

            <p className="mt-6 text-zinc-300 text-lg md:text-xl max-w-xl mx-auto">
              Bersama Worldpedia Education, wujudkan potensi terbaik dengan
              bimbingan terpercaya & materi pembelajaran terlengkap.
            </p>

            <div className="mt-6 flex flex-col md:flex-row justify-center gap-2 md:gap-6 px-4 md:px-0">
              <Link
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className: "w-full md:w-auto px-6 py-3"
                })}
              >
                Hubungi Kami
              </Link>
              <Link
                href="/registration"
                className={buttonVariants({
                  variant: "default",
                  className: "w-full md:w-auto px-6 py-3"
                })}
              >
                Daftar Sekarang
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default HeroSection;