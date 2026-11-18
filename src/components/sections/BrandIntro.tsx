import React from 'react';
import { Sparkles } from 'lucide-react';

export const BrandIntro: React.FC = () => {
  return (
    <section className="relative py-28 px-6 md:px-12 bg-[#09090D] overflow-hidden border-t border-[#1E1E26]">
      {/* Subtle Background Accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Pre-title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-[1px] w-12 bg-[#D4AF37]" />
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
            Brand Philosophy
          </span>
        </div>

        {/* Section Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          <div className="lg:col-span-7">
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#FBF9F5] leading-[1.12] tracking-tight">
              MORE THAN A SALON. <br />
              <span className="italic text-gold-gradient font-normal">
                AN EXPERIENCE.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-center">
            <p className="text-sm sm:text-base text-[#EFECE6]/80 font-light leading-relaxed mb-6">
              Founded on the conviction that personal aesthetics should be an unhurried luxury, Elegance Saloon brings world-class hair artistry, clinical skin rejuvenation, and bespoke grooming under one opulent roof in Hyderabad.
            </p>
            <p className="text-sm text-[#EFECE6]/60 font-light leading-relaxed">
              Every appointment is treated as an individualized masterwork. We blend precision European technique with high-touch hospitality, zero-wait scheduling, and private VIP treatment suites.
            </p>
          </div>
        </div>

        {/* Editorial Layered Visuals & Stat Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-16">
          {/* Main Editorial Image */}
          <div className="md:col-span-7 relative group overflow-hidden rounded-2xl border border-white/10">
            <img
              src="https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=80"
              alt="Elegance Saloon VIP Sanctuary"
              className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] block mb-1">
                  Private Sanctuary
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#FBF9F5]">
                  Curated Silence & Tailored Luxury
                </h3>
              </div>
            </div>
          </div>

          {/* Secondary Editorial Composition */}
          <div className="md:col-span-5 flex flex-col gap-6">
            <div className="relative group overflow-hidden rounded-2xl border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
                alt="Haute Color Artistry"
                className="w-full h-[220px] object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-transparent opacity-70" />
              <div className="absolute bottom-4 left-4">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] block">
                  Artisanal Formulations
                </span>
                <span className="font-serif text-lg text-[#FBF9F5]">Ammonia-Free European Pigments</span>
              </div>
            </div>

            {/* Quote Card */}
            <div className="p-6 rounded-2xl bg-[#0D0D14] border border-[#D4AF37]/20 flex flex-col justify-between">
              <p className="font-serif italic text-lg sm:text-xl text-[#F3E5AB] leading-snug mb-4">
                "We do not simply alter your hair or skin; we architect the definitive version of your confidence."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#FBF9F5] block">Elegance Artistic Team</span>
                  <span className="text-[10px] text-[#EFECE6]/50 uppercase tracking-widest">Master Colorists & Aestheticians</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Key Metrics Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 rounded-2xl bg-[#0E0E14]/80 border border-[#23232E] backdrop-blur-md">
          <div className="flex flex-col items-center text-center p-3 border-r border-[#23232E] last:border-r-0">
            <span className="font-serif text-3xl sm:text-4xl font-semibold text-gold-gradient mb-1">
              4.9 ★
            </span>
            <span className="text-xs uppercase tracking-wider text-[#EFECE6]/70">
              Google Verified Rating
            </span>
            <span className="text-[11px] text-[#EFECE6]/40 mt-0.5">180+ Client Reviews</span>
          </div>

          <div className="flex flex-col items-center text-center p-3 border-r border-[#23232E] last:border-r-0">
            <span className="font-serif text-3xl sm:text-4xl font-semibold text-gold-gradient mb-1">
              100%
            </span>
            <span className="text-xs uppercase tracking-wider text-[#EFECE6]/70">
              Clean Formulations
            </span>
            <span className="text-[11px] text-[#EFECE6]/40 mt-0.5">Ammonia & Cruelty Free</span>
          </div>

          <div className="flex flex-col items-center text-center p-3 border-r border-[#23232E] last:border-r-0">
            <span className="font-serif text-3xl sm:text-4xl font-semibold text-gold-gradient mb-1">
              4 Suites
            </span>
            <span className="text-xs uppercase tracking-wider text-[#EFECE6]/70">
              Private VIP Sanctuaries
            </span>
            <span className="text-[11px] text-[#EFECE6]/40 mt-0.5">Acoustic Discretion</span>
          </div>

          <div className="flex flex-col items-center text-center p-3">
            <span className="font-serif text-3xl sm:text-4xl font-semibold text-gold-gradient mb-1">
              0 Mins
            </span>
            <span className="text-xs uppercase tracking-wider text-[#EFECE6]/70">
              Zero Wait Guarantee
            </span>
            <span className="text-[11px] text-[#EFECE6]/40 mt-0.5">Strict Appointment Times</span>
          </div>
        </div>
      </div>
    </section>
  );
};
