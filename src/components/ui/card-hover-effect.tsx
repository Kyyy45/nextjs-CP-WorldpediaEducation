"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { buttonVariants } from "./button";
import Link from "next/link";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    step: string;
    price?: string;
    registration?: string;
    link: string;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2",
        className
      )}
    >
    
      {items.map((item, idx) => (
        <div
          key={item.title}
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}      
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-[#FFED00]/[0.6] block  rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardTitle>{item.title}</CardTitle>
            <CardPrice>{item.price}</CardPrice>
            <CardRegistration>{item.registration}</CardRegistration>
            <CardDescription>{item.description}</CardDescription>

            <CardStep>
              <div>
                <span className="mt-8 text-zinc-300 tracking-wide leading-relaxed text-md">
                  Program ini ditujukan untuk:
                </span><br />
                {item.step}
              </div>
            </CardStep>
            {/* button */}
            <div className="mt-4 flex">
              <Link href="/registration" className={buttonVariants({ size: 'lg', variant: 'outline'})}>
                Daftar Sekarang
              </Link>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h3 className={cn("text-zinc-100 font-bold tracking-wide text-xl md:text-2xl", className)}>
      {children}
    </h3>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-4 text-zinc-300 tracking-wide leading-relaxed text-sm md:text-base",
        className
      )}
    >
      {children}
    </p>
  );
};

export const CardStep = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mt-4 text-zinc-400 tracking-wide text-xs md:text-sm",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardPrice = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mt-2 text-yellow-400 font-semibold text-lg md:text-xl",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardRegistration = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mt-2 whitespace-pre-line text-sm md:text-base text-zinc-300",
        className
      )}
    >
      {children}
    </div>
  );
};

