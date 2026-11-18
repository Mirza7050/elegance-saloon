import React from 'react';
import { Shield, ArrowUp } from 'lucide-react';
import { SALON_DATA } from '../../data/salonData';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#050507] border-t border-[#1A1A22] text-[#EFECE6]/70 pt-20 pb-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16 pb-16 border-b border-[#1A1A22]">
          {/* Brand Info */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-10 h-10 rounded-full border border-[#D4AF37]/50 flex items-center justify-center bg-[#0D0D12]">
                  <span className="font-serif text-[#D4AF37] font-semibold text-xl">E</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-xl tracking-[0.25em] text-[#FBF9F5] font-medium uppercase">
                    Elegance
                  </span>
                  <span className="text-[10px] tracking-[0.35em] text-[#D4AF37] font-sans uppercase -mt-0.5">
                    Saloon
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#EFECE6]/60 font-light leading-relaxed max-w-sm mb-6">
                An international-standard haute coiffure and luxury aesthetic sanctuary based in Hyderabad. Dedicated to bespoke hair architecture, cellular skin therapies, and private VIP experiences.
              </p>

              <div className="flex items-center gap-3 text-xs text-[#D4AF37]">
                <span>{SALON_DATA.rating.score} ★ Verified Google Excellence</span>
                <span>•</span>
                <span>{SALON_DATA.rating.totalReviews}+ Client Reviews</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block mb-6">
              Navigation
            </span>
            <ul className="space-y-3 text-xs uppercase tracking-wider">
              <li><a href="#services" className="hover:text-[#D4AF37] transition-colors">Our Services</a></li>
              <li><a href="#experience" className="hover:text-[#D4AF37] transition-colors">The Experience</a></li>
              <li><a href="#why-us" className="hover:text-[#D4AF37] transition-colors">Why Elegance</a></li>
              <li><a href="#gallery" className="hover:text-[#D4AF37] transition-colors">Lookbook Gallery</a></li>
              <li><a href="#reviews" className="hover:text-[#D4AF37] transition-colors">Client Reviews</a></li>
              <li><a href="#location" className="hover:text-[#D4AF37] transition-colors">Location & Hours</a></li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="lg:col-span-4">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block mb-6">
              Contact & Schedule
            </span>
            <p className="text-xs leading-relaxed text-[#EFECE6]/75 mb-3">
              {SALON_DATA.address}, {SALON_DATA.city}, {SALON_DATA.state} {SALON_DATA.pincode}
            </p>
            <p className="text-xs text-[#EFECE6]/75 mb-3">
              Direct Phone: <a href={`tel:${SALON_DATA.phone}`} className="text-[#D4AF37] hover:underline">{SALON_DATA.phoneDisplay}</a>
            </p>
            <p className="text-xs text-[#EFECE6]/75 mb-4">
              Schedule: {SALON_DATA.hours.days} ({SALON_DATA.hours.time})
            </p>

            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#14141E] border border-white/5 hover:border-[#D4AF37]/40 text-[11px] text-[#EFECE6]/60 hover:text-[#D4AF37] transition-colors"
            >
              <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Salon Administration Portal</span>
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#EFECE6]/40">
          <p>© {new Date().getFullYear()} Elegance Saloon. All rights reserved. Designed for World-Class Luxury Experience.</p>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
