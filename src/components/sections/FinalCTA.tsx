import React from 'react';
import { Calendar, MessageCircle, Sparkles } from 'lucide-react';
import { SALON_DATA } from '../../data/salonData';

interface FinalCTAProps {
  onOpenBooking: () => void;
  onOpenAI: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onOpenBooking, onOpenAI }) => {
  return (
    <section className="relative py-32 px-6 md:px-12 bg-[#070709] border-t border-[#1E1E26] overflow-hidden text-center">
      {/* Background Lighting Composition */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-[#D4AF37]/10 via-[#F3E5AB]/10 to-[#C5A059]/10 rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* Monogram Badge */}
        <div className="w-14 h-14 rounded-full border border-[#D4AF37]/40 flex items-center justify-center bg-[#0D0D14] mb-8 shadow-2xl shadow-[#D4AF37]/20">
          <Sparkles className="w-6 h-6 text-[#D4AF37]" />
        </div>

        {/* Section Headline */}
        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#FBF9F5] leading-none tracking-tight mb-6">
          YOUR NEXT LOOK <br />
          <span className="italic text-gold-gradient font-normal">
            STARTS HERE.
          </span>
        </h2>

        {/* Supporting Narrative */}
        <p className="max-w-xl text-base sm:text-lg text-[#EFECE6]/80 font-light leading-relaxed mb-12">
          Step into elegance. Discover your experience. Reserve your private session with our master colorists and dermal aestheticians today.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-10 py-4 rounded-full text-xs font-semibold uppercase tracking-[0.2em] text-[#070709] bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#C5A059] hover:brightness-110 shadow-2xl shadow-[#D4AF37]/30 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Your Appointment</span>
          </button>

          <button
            onClick={onOpenAI}
            className="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-medium uppercase tracking-[0.2em] text-[#EFECE6] bg-[#0E0E14] hover:bg-[#D4AF37]/15 border border-[#D4AF37]/40 hover:border-[#D4AF37] backdrop-blur-md transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] flex items-center justify-center gap-2.5 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
            <span>Consult Elegance AI</span>
          </button>
        </div>

        {/* Phone Concierge */}
        <p className="mt-10 text-xs text-[#EFECE6]/50">
          Prefer personal assistance over the phone? Call our reception at{' '}
          <a href={`tel:${SALON_DATA.phone}`} className="text-[#D4AF37] hover:underline">
            {SALON_DATA.phoneDisplay}
          </a>
        </p>
      </div>
    </section>
  );
};
