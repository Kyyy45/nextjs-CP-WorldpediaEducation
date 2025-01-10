import React from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Container from "@/components/global/container";

const FAQSection = () => {
  const faqPreview = [
    {
      question: "Apakah Worldpedia Education cocok untuk semua usia?",
      answer:
        "Ya, kami menyediakan program untuk berbagai kelompok usia, mulai dari anak-anak usia 3 tahun hingga dewasa. Setiap program dirancang khusus sesuai dengan kebutuhan dan tingkat kemampuan peserta.",
      category: "Umum",
    },
    {
      question: "Berapa jumlah siswa dalam satu kelas?",
      answer:
        "Kami membatasi maksimal 8-10 siswa per kelas untuk memastikan setiap siswa mendapat perhatian yang cukup dari pengajar.",
      category: "Kelas dan Pengajaran",
    },
    {
      question: "Bagaimana cara mendaftar di Worldpedia Education?",
      answer:
        "Pendaftaran dapat dilakukan secara online melalui website atau langsung datang ke kantor kami. Diperlukan dokumen identitas dan mengisi formulir pendaftaran.",
      category: "Pendaftaran",
    },
  ];

  return (
    <Container delay={0.7}>
      <section id="faq" className="relative py-32">
        <div className="hidden lg:block absolute z-10 w-72 h-72 bg-[#fde047] rounded-full -right-[50%] blur-[14rem]" />

        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-transparent bg-gradient-to-b from-zinc-200 to-zinc-400 bg-clip-text">
            Frequently Asked Questions
          </h2>
          <p className="sm:text-lg lg:text-xl font-medium text-muted-foreground mt-6 px-4 md:px-16">
            Temukan Jawaban untuk Pertanyaan Umum Seputar Worldpedia Education
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqPreview.map((item, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="text-zinc-200 text-left">
                  <div>
                    <span className="text-base text-[#FFED00] block mb-1">
                      {item.category}
                    </span>
                    {item.question}
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-base text-zinc-400">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="text-center mt-8">
            <Link
              href="/faq"
              className="inline-flex items-center text-yellow-400 hover:text-[#FFF05F] transition-colors"
            >
              Lihat Selengkapnya
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default FAQSection;
