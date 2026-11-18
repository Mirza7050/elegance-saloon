import React, { useState } from 'react';
import { Eye, X, CheckCircle2, Sparkles } from 'lucide-react';
import { SALON_DATA } from '../../data/salonData';
import type { SalonExperienceSuite } from '../../data/salonData';

export const SalonExperience: React.FC = () => {
  const [selectedSuite, setSelectedSuite] = useState<SalonExperienceSuite | null>(null);

  return (
    <section id="experience" className="relative py-28 px-6 md:px-12 bg-[#09090E] border-t border-[#1E1E26] overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-[1px] w-10 bg-[#D4AF37]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
              The Environment
            </span>
            <div className="h-[1px] w-10 bg-[#D4AF37]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#FBF9F5] leading-tight mb-6">
            ARCHITECTED FOR <br />
            <span className="italic text-gold-gradient font-normal">
              SERENITY & DISCRETION.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-[#EFECE6]/75 font-light leading-relaxed">
            Step beyond the bustling avenues of Hyderabad into an acoustic sanctuary. Our space is divided into 4 specialized suites engineered for supreme sensory calm, natural daylight color fidelity, and absolute privacy.
          </p>
        </div>

        {/* Suites Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {SALON_DATA.suites.map((suite, idx) => (
            <div
              key={suite.id}
              className="group relative rounded-3xl bg-[#0D0D14] border border-[#23232E] hover:border-[#D4AF37]/45 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black"
            >
              {/* Image Preview with Hover Inspection */}
              <div className="relative h-80 sm:h-96 overflow-hidden">
                <img
                  src={suite.image}
                  alt={suite.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 brightness-85 group-hover:brightness-95"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D14] via-[#0D0D14]/30 to-transparent" />

                {/* Inspect Button */}
                <button
                  onClick={() => setSelectedSuite(suite)}
                  className="absolute top-5 right-5 p-3 rounded-full bg-[#070709]/80 border border-white/20 text-[#EFECE6] hover:text-[#D4AF37] hover:border-[#D4AF37] backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                  title="View Fullscreen Suite Experience"
                >
                  <Eye className="w-4 h-4" />
                </button>

                {/* Suite Tag */}
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block mb-1">
                    Suite 0{idx + 1}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#FBF9F5] leading-snug">
                    {suite.title}
                  </h3>
                  <span className="text-xs text-[#F3E5AB]/80 tracking-wide font-light">
                    {suite.subtitle}
                  </span>
                </div>
              </div>

              {/* Suite Details Body */}
              <div className="p-6 sm:p-8">
                <p className="text-xs sm:text-sm text-[#EFECE6]/70 font-light leading-relaxed mb-6">
                  {suite.description}
                </p>

                {/* Features List */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-[#1E1E26]">
                  {suite.features.map((feat, fIdx) => (
                    <span
                      key={fIdx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] text-[#EFECE6]/80 bg-[#14141E] border border-white/5"
                    >
                      <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                      <span>{feat}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Suite Inspection Modal */}
      {selectedSuite && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="relative max-w-4xl w-full bg-[#0D0D14] border border-[#D4AF37]/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
            {/* Close button */}
            <button
              onClick={() => setSelectedSuite(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/70 text-white hover:text-[#D4AF37] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="md:w-1/2 h-72 md:h-auto relative">
              <img
                src={selectedSuite.image}
                alt={selectedSuite.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Modal Content */}
            <div className="md:w-1/2 p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block mb-2">
                  VIP Sanctuary Inspection
                </span>
                <h3 className="font-serif text-3xl text-[#FBF9F5] mb-2 leading-tight">
                  {selectedSuite.title}
                </h3>
                <span className="text-xs text-[#F3E5AB] font-light block mb-4">
                  {selectedSuite.subtitle}
                </span>
                <p className="text-xs sm:text-sm text-[#EFECE6]/75 font-light leading-relaxed mb-6">
                  {selectedSuite.description}
                </p>

                <div className="space-y-2 mb-6">
                  {selectedSuite.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#EFECE6]/85">
                      <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href={`https://wa.me/${SALON_DATA.whatsappNumber}?text=${encodeURIComponent(`Hello Elegance Saloon, I would like to reserve the ${selectedSuite.title} for my appointment.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 rounded-xl text-xs font-semibold uppercase tracking-widest text-[#070709] bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#C5A059] text-center hover:brightness-110 transition-all"
              >
                Reserve This Suite On WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
