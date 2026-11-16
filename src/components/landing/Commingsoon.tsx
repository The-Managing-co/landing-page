'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

export default function Commingsoon() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Live Countdown Timer
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Target date: Upcoming 1st January (00:00:00)
    const now = new Date();
    const targetYear = now.getFullYear();
    let targetDate = new Date(targetYear, 0, 1, 0, 0, 0);
    if (now.getTime() >= targetDate.getTime()) {
      targetDate = new Date(targetYear + 1, 0, 1, 0, 0, 0);
    }

    const updateCountdown = () => {
      const currentTime = new Date().getTime();
      const distance = targetDate.getTime() - currentTime;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  // 3D Canvas Globe Logic (Matching Hero Section)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const resizeCanvas = () => {
      if (!canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Geographic continents model
    const isContinent = (latRad: number, lonRad: number): boolean => {
      const lat = (latRad * 180) / Math.PI;
      let lon = (lonRad * 180) / Math.PI;
      while (lon > 180) lon -= 360;
      while (lon < -180) lon += 360;

      // North America
      if (lat >= 54 && lat <= 72 && lon >= -168 && lon <= -130) return true;
      if (lat >= 48 && lat <= 72 && lon >= -130 && lon <= -55) return true;
      if (lat >= 25 && lat < 48 && lon >= -125 && lon <= -67) return true;
      if (lat >= 15 && lat < 32 && lon >= -117 && lon <= -86) return true;
      if (lat >= 7 && lat < 18 && lon >= -92 && lon <= -77) return true;

      // South America
      if (lat >= 0 && lat <= 13 && lon >= -80 && lon <= -50) return true;
      if (lat >= -20 && lat < 0 && lon >= -76 && lon <= -35) return true;
      if (lat >= -56 && lat < -20 && lon >= -75 && lon <= -48) return true;

      // Europe
      if (lat >= 50 && lat <= 60 && lon >= -10 && lon <= 2) return true;
      if (lat >= 36 && lat <= 70 && lon >= -10 && lon <= 60) return true;

      // Africa
      if (lat >= -35 && lat <= 37 && lon >= -18 && lon <= 51) return true;

      // Asia
      if (lat >= 8 && lat <= 35 && lon >= 65 && lon <= 92) return true; // India
      if (lat >= 15 && lat <= 55 && lon >= 92 && lon <= 135) return true; // East Asia
      if (lat >= -10 && lat <= 20 && lon >= 95 && lon <= 145) return true; // SE Asia

      // Australia
      if (lat >= -40 && lat <= -11 && lon >= 113 && lon <= 154) return true;

      return false;
    };

    interface GlobeDot {
      lat: number;
      lon: number;
      isLand: boolean;
      twinkle: number;
      isBeacon: boolean;
    }

    const dots: GlobeDot[] = [];
    const latSteps = 70;
    for (let i = 0; i <= latSteps; i++) {
      const lat = (Math.PI * i) / latSteps - Math.PI / 2;
      const radiusAtLat = Math.cos(lat);
      const lonSteps = Math.max(1, Math.round(140 * radiusAtLat));
      for (let j = 0; j < lonSteps; j++) {
        const lon = (2 * Math.PI * j) / lonSteps - Math.PI;
        const land = isContinent(lat, lon);
        const isBeacon = land && Math.random() < 0.015;
        dots.push({
          lat,
          lon,
          isLand: land,
          twinkle: Math.random() * Math.PI * 2,
          isBeacon,
        });
      }
    }

    let rotationAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      rotationAngle += 0.003;
      const globeRadius = Math.min(width * 0.44, height * 0.48, 430);
      const centerX = width / 2;
      const centerY = height * 0.62;

      dots.forEach((dot) => {
        const rotLon = dot.lon + rotationAngle;
        const x3d = globeRadius * Math.cos(dot.lat) * Math.sin(rotLon);
        const y3d = -globeRadius * Math.sin(dot.lat);
        const z3d = globeRadius * Math.cos(dot.lat) * Math.cos(rotLon);

        if (z3d <= 0) return; // back-face culling

        const perspective = 900 / (900 + z3d);
        const screenX = centerX + x3d * perspective;
        const screenY = centerY + y3d * perspective;

        // Bottom Horizon Fade Effect
        const horizonFade = Math.max(0, Math.min(1, (height * 0.95 - screenY) / (height * 0.4)));
        const depthAlpha = (z3d / globeRadius) * horizonFade;

        if (depthAlpha <= 0.01) return;

        ctx.beginPath();
        if (dot.isLand) {
          ctx.arc(screenX, screenY, Math.max(0.8, 1.7 * perspective), 0, Math.PI * 2);
          if (dot.isBeacon) {
            ctx.fillStyle = `rgba(212, 255, 50, ${Math.min(1, depthAlpha * 1.5)})`;
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${depthAlpha * 0.95})`;
          }
        } else {
          ctx.arc(screenX, screenY, Math.max(0.4, 0.9 * perspective), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(56, 189, 248, ${depthAlpha * 0.22})`;
        }
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setMousePos({ x, y });
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen overflow-hidden bg-[#020617] text-white selection:bg-cyan-500 selection:text-black flex flex-col justify-between font-sans"
      style={{ fontFamily: 'var(--font-sans), "Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}
    >
      {/* ================= ATMOSPHERIC COLOR GRADIENTS (MATCHING HERO) ================= */}
      
      {/* 1. Deep Space Cosmic Navy at Top */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 110% 75% at 50% 36%, #004cb8 0%, #012b82 28%, #011448 60%, #01061b 100%)',
        }}
      />

      {/* 2. Vibrant Electric Blue Radiance Core behind Globe */}
      <div
        className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[1100px] h-[750px] pointer-events-none opacity-95 blur-[85px]"
        style={{
          background: 'radial-gradient(circle, rgba(0, 155, 255, 0.95) 0%, rgba(2, 132, 199, 0.65) 42%, rgba(3, 105, 161, 0.3) 68%, transparent 85%)',
          transform: `translate3d(calc(-50% + ${mousePos.x * 0.4}px), ${mousePos.y * 0.4}px, 0)`,
        }}
      />

      {/* 3. Luminous Cyan-Blue Horizon Arc across lower half */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[190%] h-[62%] pointer-events-none opacity-100 blur-[45px]"
        style={{
          background: 'radial-gradient(ellipse 78% 52% at 50% 88%, #00b4d8 0%, #0284c7 42%, rgba(2, 132, 199, 0.3) 78%, transparent 100%)',
        }}
      />

      {/* 4. Atmospheric Sky-to-Bottom Horizon Transition */}
      <div
        className="absolute bottom-0 left-0 right-0 h-72 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(0, 160, 255, 0.15) 25%, rgba(56, 189, 248, 0.45) 55%, rgba(2, 6, 23, 0.9) 100%)',
        }}
      />

      {/* ================= 3D DOTTED GLOBE CANVAS ================= */}
      <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* ================= TOP NAVIGATION / BRAND BAR ================= */}
      <header className="relative z-30  max-w-[1020px] mx-auto px-4 sm:px-6 py-6 flex items-center justify-between">
     
         <img className='contain' src="logo.svg" alt="logo" width={200} height={20} />
      
      </header>

      {/* ================= MAIN COMING SOON CONTENT ================= */}
      <main className="relative z-20 w-full max-w-[1020px] mx-auto px-4 sm:px-6 flex flex-col items-center text-center my-auto py-8 sm:py-12">
        
        {/* Top Announcement Pill */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-md text-xs sm:text-[13px] text-slate-200 mb-6 shadow-sm">
          <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-[#1c2854] border border-white/20 text-white tracking-wide">
            Private Beta
          </span>
          <span className="text-slate-200">
            Next-Gen Autonomous Agent Orchestration
          </span>
          <span className="text-white text-sm leading-none">›</span>
        </div>

        {/* Hero Heading */}
        <h1 className="max-w-3xl text-4xl sm:text-6xl md:text-[68px] font-normal tracking-[-0.015em] text-white leading-[1.1] mb-5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
          Something extraordinary <br />
          <span className="bg-gradient-to-r from-white via-slate-100 to-sky-200 bg-clip-text text-transparent">
            is on the horizon.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-lg text-sm sm:text-base md:text-[17px] text-slate-300 font-normal leading-relaxed mb-8 drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]">
          We&apos;re putting the finishing touches on our intelligent workforce platform. Join the exclusive waitlist for early access and zero-friction onboarding.
        </p>

        {/* ================= LIVE COUNTDOWN TIMER ================= */}
        <div className="flex items-center gap-2 sm:gap-4 mb-9">
          
          {/* Days */}
          <div className="flex flex-col items-center justify-center w-16 sm:w-20 h-16 sm:h-20 rounded-2xl bg-white/[0.08] border border-white/15 backdrop-blur-md shadow-lg">
            <span className="text-xl sm:text-3xl font-bold tracking-tight text-white ">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-white ">
              Days
            </span>
          </div>

          <span className="text-xl sm:text-2xl font-bold text-white/40 pb-3">:</span>

          {/* Hours */}
          <div className="flex flex-col items-center justify-center w-16 sm:w-20 h-16 sm:h-20 rounded-2xl bg-white/[0.08] border border-white/15 backdrop-blur-md shadow-lg">
            <span className="text-xl sm:text-3xl font-bold tracking-tight text-white ">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-white uppercase tracking-wider mt-0.5">
              Hours
            </span>
          </div>

          <span className="text-xl sm:text-2xl font-bold text-white/40 pb-3">:</span>

          {/* Minutes */}
          <div className="flex flex-col items-center justify-center w-16 sm:w-20 h-16 sm:h-20 rounded-2xl bg-white/[0.08] border border-white/15 backdrop-blur-md shadow-lg">
            <span className="text-xl sm:text-3xl font-bold tracking-tight text-white ">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-white uppercase tracking-wider mt-0.5">
              Mins
            </span>
          </div>

          <span className="text-xl sm:text-2xl font-bold text-white/40 pb-3">:</span>

          {/* Seconds */}
          <div className="flex flex-col items-center justify-center w-16 sm:w-20 h-16 sm:h-20 rounded-2xl bg-white/[0.08] border border-white/15 backdrop-blur-md shadow-lg">
            <span className="text-xl sm:text-3xl font-bold tracking-tight text-[#d4ff32] ">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium text-white uppercase tracking-wider mt-0.5">
              Secs
            </span>
          </div>

        </div>



      </main>

   
    </div>
  );
}

