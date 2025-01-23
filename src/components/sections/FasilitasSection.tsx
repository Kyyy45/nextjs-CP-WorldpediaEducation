import React from "react";
import Image from "next/image";
import Container from "../global/container";
import MagicCard from "../ui/magic-card";

const facilities = [
  {
    icon: "/images/AC.png",
    title: "Ruangan Kelas Full AC",
    description: "Kelas sejuk dengan AC, menciptakan lingkungan belajar nyaman.",
    iconSize: 75,
  },
  {
    icon: "/images/teacher.png",
    title: "Guru Yang Berkualitas",
    description: "Guru berkompeten dan berpengalaman, siap mendukung keberhasilan siswa.",
    iconSize: 70,
  },
  {
    icon: "/images/desk.png",
    title: "Meja dan Kursi Terstandarisasi",
    description: "Meja dan kursi ergonomis yang mendukung kenyamanan belajar siswa.",
    iconSize: 70,
  },
  {
    icon: "/images/school.png",
    title: "UK's Program dan Adaptasi Sistem Pendidikan Amerika Serikat",
    description: "Program pembelajaran internasional dengan kurikulum dari Inggris dan Amerika Serikat.",
    iconSize: 70,
  },
];

const FasilitasSection = () => {
  return (
    <Container delay={0.4}>
      <section id="facility" className="py-32 relative">
        
        {/* Background Effects */}
        <div className="w-full h-screen dark:bg-black dark:bg-transparent bg-white dark:bg-grid-white/[0.03] bg-grid-black/[0.2] absolute items-center justify-center">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100 bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        </div>
        
        {/* Yellow Circle Effect */}
        <div className="circlePosisition w-[220px] h-[220px] bg-[#FFF05F] rounded-[100%] top-[56%] left-[50%] translate-x-[-50%] translate-y-[-50%] blur-[155px] hidden md:block absolute z-1" />
        
        {/* Content */}
        <div className="relative text-center max-w-4xl mx-auto flex flex-col">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-transparent bg-gradient-to-b from-zinc-200 to-zinc-400 bg-clip-text pb-6">
            Facility
          </h2>
          <p className="text-lg lg:text-xl font-medium text-muted-foreground mb-8 px-4 md:px-16">
            Fasilitas Unggulan Worldpedia Education untuk Meningkatkan Kualitas Pembelajaran.
          </p>

          <div className="absolute md:top-[56.6%] lg:top-[58.5%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:block">
            <Image
              src="/images/logo4.svg"
              alt="logo4"
              width={70}
              height={70}
              className="opacity-80"
            />
          </div>

          {/* Facilities Grid */}
          <div className="flex flex-wrap justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-24 lg:gap-28 mx-auto">
              {facilities.map((facility, index) => (
                <MagicCard key={index} className="group md:py-8">
                  <div className="flex flex-col items-center justify-center">
                    <Image
                      src={facility.icon}
                      alt={facility.title}
                      width={facility.iconSize}
                      height={0}
                      className="mb-6"
                    />
                    <h3 className="font-base text-zinc-200 text-base">
                      {facility.title}
                    </h3>
                    <p className="font-base text-base text-zinc-300 py-2">
                      {facility.description}
                    </p>
                  </div>
                </MagicCard>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default FasilitasSection;