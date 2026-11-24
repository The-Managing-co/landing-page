'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLightBg, setIsLightBg] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      setMounted(true);
    });

    const checkBackgroundAndScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);

      // Detect background color of the section currently under the navbar
      const sections = document.querySelectorAll('section');
      let lightDetected = false;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const rect = section.getBoundingClientRect();
        // Check if section intersects with navbar height range (top 0px - 90px)
        if (rect.top <= 90 && rect.bottom >= 60) {
          const classes = section.className || '';
          const computedBg = window.getComputedStyle(section).backgroundColor;

          if (
            classes.includes('bg-white') ||
            classes.includes('bg-[#f8fafc]') ||
            classes.includes('bg-[#f1f3f6]') ||
            classes.includes('bg-[#e9edf3]') ||
            computedBg === 'rgb(255, 255, 255)' ||
            computedBg.startsWith('rgba(255, 255, 255') ||
            computedBg === 'rgb(248, 250, 252)'
          ) {
            lightDetected = true;
            break;
          }
        }
      }

      setIsLightBg(lightDetected);
    };

    window.addEventListener('scroll', checkBackgroundAndScroll, { passive: true });
    window.addEventListener('resize', checkBackgroundAndScroll, { passive: true });
    checkBackgroundAndScroll();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', checkBackgroundAndScroll);
      window.removeEventListener('resize', checkBackgroundAndScroll);
    };
  }, []);

  return (
    <header
      data-aos="fade-down"
      data-aos-duration="800"
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 sm:pt-5 px-3 sm:px-6 pointer-events-none transition-all duration-700 ease-out ${
        mounted ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'
      }`}
    >
      <div
        className={`pointer-events-auto w-full max-w-5xl lg:max-w-6xl mx-auto rounded-full transition-all duration-500 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between border ${
          isLightBg
            ? 'bg-white/85 hover:bg-white/95 backdrop-blur-2xl border-slate-200/90 shadow-xl shadow-slate-950/10'
            : isScrolled
            ? 'bg-white/[0.08] hover:bg-white/[0.12] backdrop-blur-xl border-white/20 shadow-xl shadow-black/20'
            : 'bg-white/[0.05] hover:bg-white/[0.1] backdrop-blur-md border-white/15 shadow-lg shadow-black/15'
        }`}
      >
        {/* ================= LEFT: NAV MENU (DESKTOP) ================= */}
        <div className="flex-1 flex items-center justify-start">
          <nav className="hidden md:inline-flex items-center gap-1 p-0.5">
            {navLinks.map((link) => {
              const isActive = activeLink === link.label;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setActiveLink(link.label)}
                  className={`px-3.5 py-1.5 text-xs sm:text-[13px] font-medium rounded-full transition-all duration-200 ${
                    isLightBg
                      ? isActive
                        ? 'bg-slate-900/10 text-slate-950 shadow-sm border border-slate-300 font-semibold'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100/90'
                      : isActive
                      ? 'bg-white/20 text-white shadow-sm border border-white/20 backdrop-blur-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile: Logo on the left for compact phone screens */}
          <Link href="/" className="md:hidden flex items-center gap-2 group">
            <Image
              src="/logo.svg"
              alt="The Managing Co"
              width={200}
              height={45}
              className={`h-8 sm:h-9 w-auto object-contain transition-all duration-300 ${
                isLightBg ? 'invert brightness-0' : 'invert-0'
              }`}
              priority
            />
          </Link>
        </div>

        {/* ================= CENTER: LOGO (DESKTOP) ================= */}
        <div className="hidden md:flex items-center justify-center shrink-0 px-4">
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo.svg"
              alt="The Managing Co"
              width={250}
              height={70}
              className={`h-10 sm:h-11 md:h-12 w-auto max-w-[280px] sm:max-w-[200px] md:max-w-[250px] object-contain transition-all duration-300 group-hover:scale-105 ${
                isLightBg ? 'invert brightness-0' : 'invert-0'
              }`}
              priority
            />
          </Link>
        </div>

        {/* ================= RIGHT: BOOK A DEMO BUTTON ================= */}
        <div className="flex-1 flex items-center justify-end gap-2.5 sm:gap-3">
          <Link
            href="#contact"
            className={`px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-semibold tracking-wide transition-all duration-200 active:scale-95 shadow-sm ${
              isLightBg
                ? 'bg-slate-900 hover:bg-black text-white border border-slate-900 shadow-md shadow-slate-900/10'
                : 'text-white border border-white/25 bg-white/10 hover:bg-white/20 backdrop-blur-md hover:border-white/40'
            }`}
          >
            Book a demo
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-1.5 rounded-full transition-colors cursor-pointer ${
              isLightBg
                ? 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                : 'text-gray-300 hover:text-white hover:bg-white/10'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ================= MOBILE DRAWER MENU ================= */}
      {mobileMenuOpen && (
        <div
          className={`pointer-events-auto absolute top-full left-4 right-4 mt-2 p-4 rounded-2xl shadow-2xl transition-all md:hidden max-w-md mx-auto border animate-in fade-in slide-in-from-top-2 duration-200 ${
            isLightBg
              ? 'bg-white/95 backdrop-blur-2xl border-slate-200 text-slate-900'
              : 'bg-[#020617]/95 backdrop-blur-2xl border-white/20 text-white'
          }`}
        >
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => {
              const isActive = activeLink === link.label;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    setActiveLink(link.label);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-3.5 py-2 text-sm font-medium rounded-xl transition-colors ${
                    isLightBg
                      ? isActive
                        ? 'bg-slate-100 text-slate-950 font-semibold'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50'
                      : isActive
                      ? 'bg-white/20 text-white font-semibold'
                      : 'text-gray-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
