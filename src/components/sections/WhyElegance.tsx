import React from 'react';
import { Award, ShieldCheck, Clock, Sparkles, Gem, ArrowRight } from 'lucide-react';
import { SALON_DATA } from '../../data/salonData';

export const WhyElegance: React.FC = () => {
  const iconMap: Record<string, React.ReactNode> = {
    Award: <Award className="w-6 h-6 text-[#D4AF37]" />,
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />,
    Clock: <Clock className="w-6 h-6 text-[#D4AF37]" />,
    Sparkles: <Sparkles className="w-6 h-6 text-[#D4AF37]" />,
    Gem: <Gem className="w-6 h-6 text-[#D4AF37]" />
  };

  return (
    <section id="why-us" className="relative py-28 px-6 md:px-12 bg-[#070709] border-t border-[#1E1E26]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-12 bg-[#D4AF37]" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
                The Standard
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#FBF9F5] leading-tight">
              WHY DISCERNING CLIENTS <br />
              <span className="italic text-gold-gradient font-normal">
                CHOOSE ELEGANCE SALOON.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-[#EFECE6]/70 font-light leading-relaxed">
            In an industry often dominated by rushed appointments and assembly-line services, Elegance Saloon sets an uncompromising standard for haute beauty.
          </p>
        </div>

        {/* 5 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SALON_DATA.pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-[#0D0D14] border border-[#23232E] hover:border-[#D4AF37]/50 transition-all duration-500 hover:-translate-y-1.5 flex flex-col justify-between group"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#14141E] border border-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-[#D4AF37]/40 transition-all duration-300">
                  {iconMap[pillar.icon] || <Sparkles className="w-6 h-6 text-[#D4AF37]" />}
                </div>

                <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] block mb-2 font-mono">
                  Pillar 0{idx + 1}
                </span>

                <h3 className="font-serif text-2xl text-[#FBF9F5] group-hover:text-[#F3E5AB] transition-colors mb-3">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#EFECE6]/70 font-light leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#1E1E26] flex items-center justify-between text-[11px] text-[#D4AF37] tracking-wider uppercase">
                <span>Verified Protocol</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}

          {/* Highlight Card */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#1E180A] via-[#0E0E14] to-[#070709] border border-[#D4AF37]/40 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#F3E5AB] block mb-2">
                Commitment
              </span>
              <h3 className="font-serif text-2xl text-[#FBF9F5] mb-4">
                The Elegance Satisfaction Promise
              </h3>
              <p className="text-xs sm:text-sm text-[#EFECE6]/80 font-light leading-relaxed">
                If any aspect of your cut, color reflection or facial therapy requires refinement, we invite you back for a complimentary master adjustment within 7 days.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[#D4AF37]/20 flex items-center gap-3">
              <span className="font-serif italic text-lg text-[#F3E5AB]">
                Uncompromising Quality.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
