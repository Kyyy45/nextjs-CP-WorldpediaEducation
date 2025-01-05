'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { useAuth, SignOutButton, useUser } from '@clerk/nextjs';
import { Skeleton } from '../ui/skeleton';
import { Menu, X, Info, MessageSquare, Package, HelpCircle } from 'lucide-react';
import Wrapper from '../global/wrapper';

const navLinks = [
  { name: 'Tentang', href: '/#about', icon: <Info size={20} /> },
  { name: 'Testimoni', href: '/#testimoni', icon: <MessageSquare size={20} /> },
  { name: 'Produk', href: '/#program', icon: <Package size={20} /> },
  { name: 'FAQ', href: '/#faq', icon: <HelpCircle size={20} /> },
];

const Navbar = () => {  
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === 'admin';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 right-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/80 lg:backdrop-blur-md' : 'bg-transparent'
    }`}>
      <Wrapper>
        <nav className='flex h-16 items-center justify-between'>
          <div className='flex items-center gap-4'>
            <Link href='/' className='flex items-center gap-2 overflow-hidden'>
              <Image  
                src='/images/logo.png' 
                alt='logo' 
                width={36} 
                height={38}
                className='object-contain'
              />
              <span className='text-transparent bg-gradient-to-r from-[#FFED00] to-[#FFF05F] text-base font-semibold bg-clip-text inline-block'>
                Worldpedia<br />Education
              </span>
            </Link>

            <div className='hidden lg:flex items-center gap-8 ml-8'>
              {navLinks.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className='text-sm hover:text-primary transition-colors'
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className='hidden lg:flex items-center gap-4'>
            {isLoaded ? (
              <>
                {isSignedIn ? (
                  <div className='flex items-center gap-4'>
                    {isAdmin && (
                      <Link 
                        href='/dashboard' 
                        className={buttonVariants({ size: 'sm' })}
                      >
                        Dashboard
                      </Link>
                    )}
                    <SignOutButton>
                      <Link 
                        href='/' 
                        className={buttonVariants({ size: 'sm', variant: 'ghost' })}
                      >
                        Keluar
                      </Link>
                    </SignOutButton>
                  </div>
                ) : (
                  <Link 
                    href='/sign-in' 
                    className={buttonVariants({ size: 'sm', variant: 'ghost' })}
                  >
                    Masuk
                  </Link>
                )}
              </>
            ) : (
              <Skeleton className='w-20 h-8' />
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className='lg:hidden p-2 hover:bg-neutral-900 rounded-md transition-colors'
            aria-label='Toggle menu'
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </Wrapper>

      <div 
        className={`fixed inset-0 bg-black     transition-transform duration-300 lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ zIndex: 40 }}
      >
        <Wrapper className="h-full">
          <div className='flex flex-col h-full'>
            <div className='flex items-center justify-between py-4 border-b border-white/10'>
              <Link href='/' className='flex items-center gap-2' onClick={() => setIsOpen(false)}>
                <Image 
                  src='/images/logo.png' 
                  alt='logo' 
                  width={36} 
                  height={38}
                  className='object-contain'
                />
                <span className='text-transparent bg-gradient-to-r from-[#FFED00] to-[#FFF05F] text-base font-semibold bg-clip-text inline-block'>
                  Worldpedia<br />Education
                </span>
              </Link>
              <button
                onClick={() => setIsOpen(false)}
                className='p-2 hover:bg-white/10 rounded-md transition-colors'
              >
                <X size={24} />
              </button>
            </div>

            <div className='flex-1 py-8'>
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className='flex items-center gap-4 text-base hover:text-primary transition-colors py-4'
                >
                  <span className="text-primary">
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              ))}
            </div>
            
            <div className='py-6 space-y-4 border-t border-white/10'>
              {isLoaded && (
                <>
                  {isSignedIn ? (
                    <>
                      {isAdmin && (
                        <Link
                          href='/dashboard'
                          onClick={() => setIsOpen(false)}
                          className={buttonVariants({ className: 'w-full' })}
                        >
                          Dashboard
                        </Link>
                      )}
                      <SignOutButton>
                        <Link
                          href='/'
                          className={buttonVariants({ 
                            variant: 'outline',
                            className: 'w-full border-white/20 hover:bg-white/10'
                          })}
                        >
                          Keluar
                        </Link>
                      </SignOutButton>
                    </>
                  ) : (
                    <Link
                      href='/sign-in'
                      onClick={() => setIsOpen(false)}
                      className={buttonVariants({ 
                        variant: 'outline',
                        className: 'w-full border-white/20 hover:bg-white/10'
                      })}
                    >
                      Masuk
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>
        </Wrapper>
      </div>
    </header>
  );
};

export default Navbar;