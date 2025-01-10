import React from "react";
import { HoverEffect } from "../ui/card-hover-effect";
import Container from "../global/container";

export const projects = [
  {
    title: "English Class",
    description:
      "Meningkatkan keterampilan komunikasi bahasa Inggris (mendengarkan, membaca, menulis, berbicara).",
    step: "SD, SMP, SMA",
    link: "#",
  },
  {
    title: "Mandarin Class",
    description:
      "Meningkatkan keterampilan komunikasi bahasa Mandarin (mendengarkan, membaca, menulis, berbicara).",
    step: "SD, SMP, SMA",
    link: "#",
  },
  {
    title: "Bimbel Class",
    description:
      "Membantu siswa memahami materi pelajaran sesuai kurikulum sekolah.",
    step: "SD",
    link: "#",
  },
  {
    title: "Letterland",
    description:
      "Meningkatkan kosa kata, pembentukan kata, dan pelafalan dalam Bahasa Inggris untuk anak usia 3-8 tahun.",
    step: "3 hingga 8 tahun",
    link: "#",
  },
  {
    title: "Morning Class",
    description:
      "Persiapan pra sekolah dengan kurikulum formal dan materi Letterland dari UK.",
    step: "3 hingga 6 tahun",
    link: "#",
  },
  {
    title: "English Mastery",
    description:
      "Kelas berlevel untuk memperkuat kemampuan bahasa Inggris, meliputi tenses, part of speech, diskusi, dan lainnya.",
    step: "SD, SMP, SMA, Umum",
    link: "#",
  },
];

const ProgramSection = () => {
  return (
    <Container delay={0.5}>
      <section id="program" className="py-10 md:py-32 relative">
        <div className="hidden lg:block absolute z-10 w-72 h-72 bg-[#fde047] rounded-full -left-[24%] blur-[14rem]" />

        <div className="max-w-[928px] mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-transparent bg-gradient-to-b from-zinc-200 to-zinc-400 bg-clip-text pb-6">
              Product
            </h2>
            <p className="text-lg md:text-xl font-medium text-muted-foreground md:px-16">
              Berbagai Program Pilihan untuk Meningkatkan Potensi Anak Anda.
            </p>
          </div>

          <HoverEffect items={projects} />
        </div>
      </section>
    </Container>
  );
};

export default ProgramSection;
