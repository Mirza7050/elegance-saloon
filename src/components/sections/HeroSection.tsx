import React from 'react';
import { Sparkles, Star, Calendar, ArrowRight, Compass } from 'lucide-react';
import { HeroCanvas } from '../3d/HeroCanvas';
import { SALON_DATA } from '../../data/salonData';

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden pt-24 sm:pt-28 pb-8 sm:pb-12 bg-[#070709]">
      {/* 3D WebGL Three.js Canvas Layer */}
      <HeroCanvas />

      {/* Atmospheric Background Glows & Vignette */}
      <div className="absolute top-1/4 -left-40 w-[300px] sm:w-[550px] h-[300px] sm:h-[550px] bg-[#D4AF37]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-[300px] sm:w-[550px] h-[300px] sm:h-[550px] bg-[#C5A059]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#070709]/40 to-[#070709] pointer-events-none" />

      {/* Top Editorial Ticker Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full flex items-center justify-between text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#EFECE6]/40 font-mono">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D4AF37] shrink-0" />
          <span className="hidden min-[380px]:inline">LAT 17.4123° N • LON 78.4080° E</span>
          <span className="min-[380px]:hidden">JUBILEE HILLS</span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>JUBILEE HILLS / GUDIMALKAPUR ATELIER</span>
        </div>
        <div>
          <span>EST. HYDERABAD</span>
        </div>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center my-auto py-6 sm:py-0">
        {/* Subtle Luxury Atelier Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#0D0D14]/90 border border-[#D4AF37]/35 mb-6 sm:mb-8 backdrop-blur-md shadow-2xl animate-in fade-in duration-700 max-w-full">
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D4AF37] shrink-0" />
          <span className="text-[9px] min-[380px]:text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.18em] sm:tracking-[0.25em] text-[#F3E5AB] font-medium truncate">
            Haute Coiffure & Spa Sanctuary • Hyderabad
          </span>
        </div>

        {/* Majestic Display Headline */}
        <h1 className="font-serif text-4xl min-[360px]:text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[1.04] text-[#FBF9F5] mb-5 sm:mb-6">
          WHERE BEAUTY <br />
          <span className="italic font-normal text-gold-gradient relative inline-block">
            MEETS ELEGANCE.
            <span className="absolute -bottom-1.5 sm:-bottom-2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
          </span>
        </h1>

        {/* Supporting Narrative */}
        <p className="max-w-2xl text-xs sm:text-base md:text-lg text-[#EFECE6]/80 font-light tracking-wide leading-relaxed mb-8 sm:mb-10 px-2 sm:px-0">
          Experience the art of beauty, grooming and self-expression. A high-fashion sanctuary dedicated to precision hair architecture, cellular dermal therapy, and bespoke royal grooming.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto mb-8 sm:mb-12 px-2 sm:px-0">
          <a
            href="#services"
            className="w-full sm:w-auto px-7 sm:px-9 py-3.5 sm:py-4 rounded-full text-xs font-semibold uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#070709] bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#C5A059] hover:brightness-110 shadow-2xl shadow-[#D4AF37]/25 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Explore Our Services</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
          </a>

          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-7 sm:px-9 py-3.5 sm:py-4 rounded-full text-xs font-medium uppercase tracking-[0.18em] sm:tracking-[0.2em] text-[#EFECE6] bg-[#0E0E14]/90 hover:bg-[#D4AF37]/15 border border-[#D4AF37]/35 hover:border-[#D4AF37] backdrop-blur-md transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37]" />
            <span>Book Your Appointment</span>
          </button>
        </div>

        {/* Verified Google Ratings Pill */}
        <div className="flex items-center gap-3 sm:gap-4 py-2 px-4 sm:px-6 rounded-full bg-[#0D0D14]/85 border border-[#D4AF37]/20 backdrop-blur-md shadow-xl text-xs">
          <div className="flex items-center text-[#D4AF37]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#D4AF37]" />
            ))}
          </div>
          <div className="h-3 w-[1px] bg-white/20" />
          <span className="text-[11px] sm:text-xs text-[#EFECE6]/90 font-medium tracking-wider">
            {SALON_DATA.rating.score} ★ <span className="text-[#EFECE6]/50 font-light">({SALON_DATA.rating.totalReviews}+ Reviews)</span>
          </span>
        </div>
      </div>

      {/* Bottom Editorial Scroll & Schedule Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full flex items-center justify-between text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#EFECE6]/40 font-mono pt-4 sm:pt-6 border-t border-white/5">
        <div className="hidden sm:block">
          <span>MON — SUN: 09:30 — 21:00</span>
        </div>

        {/* Center 3D Scroll Down Indicator */}
        <a href="#services" className="mx-auto sm:mx-0 flex flex-col items-center gap-1 text-[#D4AF37]/80 hover:text-[#D4AF37] transition-colors group">
          <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em]">
            Scroll To Discover
          </span>
          <div className="w-3.5 h-6 rounded-full border border-[#D4AF37]/40 flex items-start justify-center p-1 group-hover:border-[#D4AF37]">
            <div className="w-1 h-1 bg-[#D4AF37] rounded-full animate-bounce" />
          </div>
        </a>

        <div className="hidden sm:block">
          <span>PRIVATE VIP SANCTUARIES</span>
        </div>
      </div>
    </section>
  );
};
