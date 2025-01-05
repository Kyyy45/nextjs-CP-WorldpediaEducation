import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Container from "@/components/global/container";
import Wrapper from "@/components/global/wrapper";

const FAQ = () => {
  const faqData = [
    {
      category: "Pertanyaan Umum",
      items: [
        {
          question: "Apakah Worldpedia Education cocok untuk semua usia?",
          answer: "Ya, kami menyediakan program untuk berbagai kelompok usia, mulai dari anak-anak usia 3 tahun hingga dewasa. Setiap program dirancang khusus sesuai dengan kebutuhan dan tingkat kemampuan peserta."
        },
        {
          question: "Dimana lokasi Worldpedia Education?",
          answer: "Worldpedia Education berlokasi di Jalan Ahmad Yani No. 123, Malang. Lokasi kami strategis dan mudah diakses dengan transportasi umum."
        },
        {
          question: "Apakah ada program trial sebelum mendaftar?",
          answer: "Ya, kami menyediakan kelas trial gratis untuk calon siswa. Ini membantu menentukan level yang sesuai dan memberikan gambaran tentang metode pembelajaran kami."
        }
      ]
    },
    {
      category: "Kelas dan Pengajaran",
      items: [
        {
          question: "Berapa jumlah siswa dalam satu kelas?",
          answer: "Kami membatasi maksimal 8-10 siswa per kelas untuk memastikan setiap siswa mendapat perhatian yang cukup dari pengajar."
        },
        {
          question: "Berapa lama durasi setiap pertemuan?",
          answer: "Durasi kelas bervariasi tergantung program, umumnya 60-90 menit per pertemuan, dengan frekuensi 1-3 kali per minggu."
        },
        {
          question: "Apakah pengajar memiliki sertifikasi khusus?",
          answer: "Ya, semua pengajar kami memiliki sertifikasi TEFL/TESOL dan minimal 3 tahun pengalaman mengajar."
        }
      ]
    },
    {
      category: "Pendaftaran",
      items: [
        {
          question: "Bagaimana cara mendaftar di Worldpedia Education?",
          answer: "Pendaftaran dapat dilakukan secara online melalui website atau langsung datang ke kantor kami. Diperlukan dokumen identitas dan mengisi formulir pendaftaran."
        },
        {
          question: "Apakah ada biaya pendaftaran?",
          answer: "Ya, ada biaya pendaftaran one-time yang mencakup materi pembelajaran dan perlengkapan belajar selama program berlangsung."
        },
        {
          question: "Kapan periode pendaftaran dibuka?",
          answer: "Pendaftaran dibuka sepanjang tahun, dengan periode masuk kelas setiap awal bulan. Pembayaran dapat dilakukan secara tunai atau transfer bank."
        }
      ]
    }
  ];

  return (
    <Container>
      <Wrapper>
        <div className="min-h-screen py-20">
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-transparent bg-gradient-to-b from-zinc-200 to-zinc-400 bg-clip-text">
              Frequently Asked Questions
            </h1>
            <p className="text-zinc-300 mt-4">
              Temukan semua informasi yang Anda butuhkan tentang Worldpedia Education
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {faqData.map((section, sectionIndex) => (
              <div key={sectionIndex} className="space-y-4">
                <h2 className="text-2xl font-medium text-zinc-200 mb-6">
                  {section.category}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {section.items.map((item, itemIndex) => (
                    <AccordionItem key={itemIndex} value={`${sectionIndex}-${itemIndex}`}>
                      <AccordionTrigger className="text-zinc-200 text-left">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-zinc-400">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </Wrapper>
    </Container>
  );
};

export default FAQ;