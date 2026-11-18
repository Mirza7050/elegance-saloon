import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, ExternalLink } from 'lucide-react';
import { SALON_DATA } from '../../data/salonData';

export const ReviewsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevReview = () => {
    setCurrentIndex((prev) => (prev === 0 ? SALON_DATA.reviews.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentIndex((prev) => (prev === SALON_DATA.reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="reviews" className="relative py-28 px-6 md:px-12 bg-[#070709] border-t border-[#1E1E26] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-12 bg-[#D4AF37]" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
                Client Voices
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#FBF9F5] leading-tight">
              VERIFIED EXPERIENCES & <br />
              <span className="italic text-gold-gradient font-normal">
                GOOGLE REVIEWS.
              </span>
            </h2>
          </div>

          {/* Google Verified Rating Badge */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0D0D14] border border-[#D4AF37]/30 self-start md:self-end">
            <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#14141E] border border-white/5">
              <span className="font-serif text-3xl font-bold text-gold-gradient leading-none">
                {SALON_DATA.rating.score}
              </span>
              <span className="text-[10px] text-[#EFECE6]/50 uppercase tracking-widest mt-1">out of 5</span>
            </div>
            <div>
              <div className="flex items-center text-[#D4AF37] mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                ))}
              </div>
              <span className="text-xs font-semibold text-[#FBF9F5] block">
                {SALON_DATA.rating.badge}
              </span>
              <a
                href={SALON_DATA.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[#D4AF37] hover:underline flex items-center gap-1 mt-0.5"
              >
                <span>Based on {SALON_DATA.rating.totalReviews}+ reviews on Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Main Active Testimonial Card */}
          <div className="p-8 sm:p-12 md:p-16 rounded-3xl bg-[#0E0E14] border border-[#23232E] relative overflow-hidden transition-all duration-500">
            {/* Watermark Quote Icon */}
            <div className="absolute top-6 right-8 font-serif text-8xl text-white/5 select-none pointer-events-none">
              “
            </div>

            <div className="relative z-10 max-w-4xl">
              {/* Stars & Treatment Tag */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center text-[#D4AF37]">
                  {[...Array(SALON_DATA.reviews[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                  ))}
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-[#14141E] border border-[#D4AF37]/20 text-[#F3E5AB]">
                  Treatment: {SALON_DATA.reviews[currentIndex].treatment}
                </span>
                <span className="text-xs text-[#EFECE6]/40">
                  {SALON_DATA.reviews[currentIndex].date}
                </span>
              </div>

              {/* Review Text */}
              <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#FBF9F5] leading-relaxed mb-8">
                "{SALON_DATA.reviews[currentIndex].text}"
              </p>

              {/* Author & Verification */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#D4AF37]/30 to-[#F3E5AB]/20 flex items-center justify-center border border-[#D4AF37]/40 text-[#D4AF37] font-serif text-xl font-bold">
                  {SALON_DATA.reviews[currentIndex].author.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-sm sm:text-base text-[#FBF9F5]">
                      {SALON_DATA.reviews[currentIndex].author}
                    </h4>
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified Google Review</span>
                    </span>
                  </div>
                  <span className="text-xs text-[#EFECE6]/50">Elegance Saloon Client</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-2">
              {SALON_DATA.reviews.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentIndex === idx ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-[#23232E]'
                  }`}
                  aria-label={`Jump to review ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={prevReview}
                className="p-3 rounded-full bg-[#0D0D14] border border-[#23232E] hover:border-[#D4AF37] text-[#EFECE6] hover:text-[#D4AF37] transition-colors"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextReview}
                className="p-3 rounded-full bg-[#0D0D14] border border-[#23232E] hover:border-[#D4AF37] text-[#EFECE6] hover:text-[#D4AF37] transition-colors"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
