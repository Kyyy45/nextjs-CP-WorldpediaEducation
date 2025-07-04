'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Wrapper from "../global/wrapper";

const socialLinks = [
  { name: 'Instagram', icon: '/images/instagram.svg', href: 'https://instagram.com/worldpedia.ptk' },
  { name: 'Facebook', icon: '/images/facebook.svg', href: '' },
  { name: 'Twitter', icon: '/images/x-twitter.svg', href: '' },
  { name: 'Tiktok', icon: '/images/tiktok.svg', href: '' },
  { name: 'LinkedIn', icon: '/images/linkedin.svg', href: '' },
];

const navigationLinks = [
  { name: 'About', href: '/#about' },
  { name: 'Testimonial', href: '/#testimoni' },
  { name: 'Product', href: '/#program' },
  { name: 'FAQ', href: '/#faq' },
];

const contactInfo = {
  whatsapp: '+62895421277277',
  email: 'Worldpedia.education@gmail.com',
  address: 'Jl. HRA. Rahman, Gang. Ponti Jaya no.03 '
};

const Footer = () => {
  return (
    <footer className="w-full border-t border-border bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] relative">
      {/* Gradient Orbs */}
      <div className="hidden lg:block absolute -top-1/3 -right-1/4 bg-black w-72 h-72 rounded-full -z-10 blur-[14rem]" />
      <div className="hidden lg:block absolute bottom-0 -left-1/4 bg-primary w-72 h-72 rounded-full -z-10 blur-[14rem]" />

      <Wrapper className="pt-14 pb-8 md:pb-0 lg:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand and Address */}
          <div className="flex flex-col items-start justify-start">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/images/logo.png" alt="logo" width={36} height={38} className="object-contain" />
              <span className="text-transparent bg-gradient-to-r from-[#FFED00] to-[#FFF05F] text-base font-semibold bg-clip-text inline-block">
                Worldpedia<br />Education
              </span>
            </Link>
            <Link
              href={`https://www.google.com/maps?q=${encodeURIComponent(contactInfo.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground mt-4 text-sm hover:text-foreground transition-all duration-300"
            >
              <Image src="/images/map.svg" alt="map" width={20} height={20} />
              {contactInfo.address}
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-base font-medium text-zinc-100">Tautan</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="hover:text-foreground transition-all duration-300">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-base font-medium text-zinc-100">Ikuti Kami</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <Link href={social.href} className="flex items-center hover:text-foreground transition-all duration-300 gap-2">
                    <Image src={social.icon} alt={social.name.toLowerCase()} width={20} height={20} />
                    {social.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-base font-medium text-zinc-100">Hubungi Kami</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link 
                  href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g,'')}`} 
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="flex items-center hover:text-foreground transition-all duration-300 gap-2"
                >
                  <Image src="/images/whatsapp.svg" alt="whatsapp" width={20} height={20} />
                  <span className="whitespace-nowrap">{contactInfo.whatsapp}</span>
                </Link>
              </li>
              <li>
                <Link href={`mailto:${contactInfo.email}`} className="flex items-center hover:text-foreground transition-all duration-300 gap-2 overflow-hidden">
                  <Image src="/images/email.svg" alt="email" width={20} height={20} />
                  <span className="truncate">{contactInfo.email}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-border/80 pt-4 md:pt-8 md:flex md:items-center md:justify-between w-full pb-8">
        <p className="text-sm text-muted-foreground mt-8 md:mt-0">
          &copy; {new Date().getFullYear()} Worldpedia Education. All rights
          reserved.
        </p>
      </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;