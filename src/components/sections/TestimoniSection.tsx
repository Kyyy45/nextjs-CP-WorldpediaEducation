import React from "react";
import { UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { LampContainer } from "../ui/lamp";
import Marquee from "../ui/marquee";
import Container from "../global/container";

const REVIEWS = [
  {
    name: "Jack",
    username: "@jack",
    review:
      "I've never seen anything like this before. It's amazing. I love it.",
  },
  {
    name: "Jill",
    username: "@jill",
    review: "I don't know what to say. I'm speechless. This is amazing.",
  },
  {
    name: "John",
    username: "@john",
    review: "I'm at a loss for words. This is amazing. I love it.",
  },
  {
    name: "Jane",
    username: "@jane",
    review: "I'm at a loss for words. This is amazing. I love it.",
  },
  {
    name: "Jenny",
    username: "@jenny",
    review: "I'm at a loss for words. This is amazing. I love it.",
  },
  {
    name: "James",
    username: "@james",
    review: "I'm at a loss for words. This is amazing. I love it.",
  },
] as const;

const firstRow = REVIEWS.slice(0, 3);
const secondRow = REVIEWS.slice(3);

const TestimonialSection = () => {
  return (
    <Container delay={0.6}>
    <section id="testimoni" className="md:pb-32 relative">
      <div className="w-full flex items-center justify-center ">
        <Container>
          <LampContainer>
            <div className="flex flex-col items-center justify-center text-center -mt-64 md:-mt-72 lg:mt-[-348px] xl:-mt-[394px]">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium text-transparent bg-gradient-to-b from-zinc-200 to-zinc-400 bg-clip-text mx-auto md:max-w-2xl">
                Apa yang Orang Tua dan Siswa Katakan?
              </h2>
              <p className="text-base md:text-xl text-muted-foreground max-w-md mx-auto mt-4">
                Pendapat dan pengalaman nyata dari orang tua dan siswa yang
                telah bergabung bersama kami.
              </p>
            </div>
          </LampContainer>
        </Container>
      </div>

      <Container>
        <div className="w-full -mt-32 lg:-mt-40">
          <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:20s] select-none">
              {firstRow.map((review) => (
                <figure
                  key={review.name}
                  className={cn(
                    "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 mx-2",
                    "border-zinc-50/[.1] bg-background hover:bg-zinc-50/[.15] transition-colors"
                  )}
                >
                  <div className="flex flex-row items-center gap-2">
                    <UserIcon className="w-6 h-6" />
                    <div className="flex flex-col">
                      <figcaption className="text-sm font-medium">
                        {review.name}
                      </figcaption>
                      <p className="text-xs font-medium text-muted-foreground">
                        {review.username}
                      </p>
                    </div>
                  </div>
                  <blockquote className="mt-2 text-sm">
                    {review.review}
                  </blockquote>
                </figure>
              ))}
            </Marquee>

            <Marquee
              reverse
              pauseOnHover
              className="[--duration:20s] select-none mt-2"
            >
              {secondRow.map((review) => (
                <figure
                  key={review.name}
                  className={cn(
                    "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 mx-2",
                    "border-zinc-50/[.1] bg-background hover:bg-zinc-50/[.15] transition-colors"
                  )}
                >
                  <div className="flex flex-row items-center gap-2">
                    <UserIcon className="w-6 h-6" />
                    <div className="flex flex-col">
                      <figcaption className="text-sm font-medium">
                        {review.name}
                      </figcaption>
                      <p className="text-xs font-medium text-muted-foreground">
                        {review.username}
                      </p>
                    </div>
                  </div>
                  <blockquote className="mt-2 text-sm">
                    {review.review}
                  </blockquote>
                </figure>
              ))}
            </Marquee>

            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 md:w-1/2 bg-gradient-to-r from-black"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 nd:w-1/2 bg-gradient-to-l from-black"></div>
          </div>
        </div>
      </Container>
    </section>
    </Container>
  );
};

export default TestimonialSection;
