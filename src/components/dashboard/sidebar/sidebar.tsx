"use client";

import React, { useState } from "react";
import { LayoutDashboard, Users, Package, LogOut, Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SignOutButton } from "@clerk/nextjs";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      href: "/dashboard",
    },
    { icon: <Package size={20} />, label: "Siswa", href: "/dashboard/siswa" },
    { icon: <Users size={20} />, label: "Users", href: "/dashboard/users" },
  ];

  const commonItemStyles = `
    flex items-center px-4 py-2.5 text-neutral-300 rounded-lg mb-2 group relative 
    hover:bg-neutral-800 hover:text-zinc-100 transition-all duration-200 ease-in-out
    before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-yellow-400 
    before:opacity-0 before:transition-all before:duration-200
    hover:before:opacity-100 w-full
  `;

  return (
    <>
      {/* Burger Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 text-zinc-100 bg-neutral-800 rounded-md hover:bg-neutral-700 focus:outline-none transition-colors duration-200"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-neutral-900 w-64 transform transition-transform duration-300 ease-in-out z-50 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Logo Section */}
        <Link
          href="/"
          className="flex items-center px-6 py-4 hover:bg-neutral-800 transition-colors duration-200 cursor-pointer"
        >
          <Image
            src="/images/logo.png"
            alt="logo"
            width={36}
            height={38}
            className="object-contain"
          />
          <h1 className="ml-3 text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#FFED00] to-[#FFF05F]">
            Worldpedia Education
          </h1>
        </Link>

        {/* Navigation Items */}
        <nav className="mt-6 px-4">
          {navigationItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={commonItemStyles}
              onClick={() => console.log("Navigating to:", item.href)}
            >
              <span className="transform transition-transform duration-200 group-hover:scale-110">
                {item.icon}
              </span>
              <span className="ml-3 text-sm font-medium flex-grow transition-colors duration-200">
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-6 px-4 w-full">
          <SignOutButton redirectUrl="/">
            <button className={commonItemStyles}>
              <span className="transform transition-transform duration-200 group-hover:scale-110">
                <LogOut size={20} />
              </span>
              <span className="ml-3 text-sm font-medium">Logout</span>
            </button>
          </SignOutButton>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
