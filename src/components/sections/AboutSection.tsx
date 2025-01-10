import React from 'react'
import Container from '../global/container'
import { Typewriter } from "nextjs-simple-typewriter";

const AboutSection = () => {
  return (
    <Container delay={0.3}>
      <section id="about" className="py-10 md:py-32 relative">
        <div className="hidden lg:block absolute z-[9999] w-72 h-72 bg-[#fde047] rounded-full top-1/2 -right-[50%] blur-[14rem]" />
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-transparent bg-gradient-to-b from-zinc-200 to-zinc-400 bg-clip-text text-center pb-6">
            About Us
          </h2>

          <div className="mb-8">
            <div className="text-lg md:text-2xl font-medium text-zinc-300 text-center">
              <Typewriter
                words={[
                  "Kami hadir untuk membantu Anda mencapai kemajuan pesat dalam bahasa Inggris dengan metode yang sesuai kebutuhan Anda.",
                  "Pembelajaran efektif dengan guru berpengalaman, mendukung pencapaian akademik yang optimal.",
                  "Tingkatkan Kemampuan Berbahasa Inggris Anda: mulai dari berbicara, mendengarkan, menulis, hingga membaca.",
                ]}
                loop={Infinity}
                cursor
                cursorStyle="|"
                typeSpeed={60}
                deleteSpeed={80}
              />
            </div>
          </div>

          <p className="text-base md:text-xl text-justify tracking-tight md:tracking-wide break-words hyphens-auto text-zinc-300">
            Worldpedia Education adalah kursus berbahasa untuk siswa/i mulai dari
            tingkat taman kanak-kanak hingga remaja dan dewasa. <span className='text-[#FFED00]'>WE</span> melayani
            siswa/i dengan kemampuan terbaik <span className='text-[#FFED00]'>WE</span> untuk tidak hanya membuat mereka
            tumbuh, tetapi juga mengembangkan kemampuan mereka untuk siap
            menyambut masa depan. <span className='text-[#FFED00]'>WE</span> memberikan jaminan kepada siswa/i untuk
            mendapatkan pendidikan tambahan terbaik ditangan yang tepat.
          </p>
        </div>
      </section>
    </Container>
  )
}

export default AboutSection