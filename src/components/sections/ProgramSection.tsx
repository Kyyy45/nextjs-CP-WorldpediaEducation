import React from "react";
import { HoverEffect } from "../ui/card-hover-effect";
import Container from "../global/container";

export const projects = [
  {
        title: "Morning Class",
    description:
      "Kelas bilingual persiapan siswa/i untuk masuk jenjang SD dengan materi pembelajaran yang meliputi Letterland, English, Math, Bahasa Indonesia, Science, Sosial Study, PE, Crafting, dan guru profesional di bidang nya.",
    step: "Paud dan TK",
    link: "#",
    price: "Rp 375.000/bulan",
    registration: `Biaya pendaftaran Rp 3.200.000 sudah termasuk:
- ATK 1 tahun
- Seragam
- Field Trip 4x
- Buku Bahasa Indonesia
- Worksheet`,
  },
  {
    title: "Letterland",
    description:
      "Kelas Persiapan anak belajar Bahasa Inggris dari bunyi huruf yang bertujuan untuk membantu anak belajar membaca kata dan kalimat, meningkatkan kosa kata, dan kemampuan berbicara Bahasa Inggris.",
    step: "Umur 3 - 7 tahun",
    link: "#",
    price: "Rp 350.000/bulan",
    registration: "Biaya pendaftaran Rp 199.000",
  },
  {
    title: "English",
    description:
      "Kelas belajar membantu siswa/i untuk mendapatkan nilai terbaik di sekolah dengan materi yang disampaikan sama dengan materi sekolah",
    step: "SD, SMP, SMA",
    link: "#",
    price: "Rp 300.000/bulan",
    registration: "Biaya pendaftaran Rp 199.000",
  },
  {
    title: "English Mastery",
    description:
      "Kelas belajar Bahasa Inggris dari basic hingga advance yang bertujuan untuk meningkatakn kemampuan berbahasa inggris siswa/i baik secara lisan dan tulisan dan juga membantu meningkatkan kempuan mendengarkan, berbicara, membaca dan menulis dalam Bahasa Inggris",
    step: "Umum",
    link: "#",
    price: "TBA",
    registration: "",
  },
  // {
  //   title: "Mandarin Class",
  //   description:
  //     "Meningkatkan keterampilan komunikasi bahasa Mandarin (mendengarkan, membaca, menulis, berbicara).",
  //   step: "SD, SMP, SMA",
  //   link: "#",
  // },
  // {
  //   title: "Bimbel Class",
  //   description:
  //     "Membantu siswa memahami materi pelajaran sesuai kurikulum sekolah.",
  //   step: "SD",
  //   link: "#",
  // },
];

const ProgramSection = () => {
  return (
    <Container delay={0.5}>
      <section id="program" className="py-10 md:py-32 relative">
        <div className="hidden lg:block absolute z-10 w-72 h-72 bg-[#fde047] rounded-full -left-[24%] blur-[14rem]" />

        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-transparent bg-gradient-to-b from-zinc-200 to-zinc-400 bg-clip-text pb-6">
              Program &amp; Pricelist
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
