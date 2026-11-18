import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Menu, X, Shield, MessageCircle } from 'lucide-react';
import { SALON_DATA } from '../../data/salonData';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'The Experience', href: '#experience' },
    { name: 'Why Elegance', href: '#why-us' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Location', href: '#location' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#070709]/90 backdrop-blur-xl py-3 sm:py-4 border-b border-[#D4AF37]/15 shadow-2xl shadow-black/80'
            : 'bg-transparent py-4 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between">
          {/* Logo & Monogram */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3.5 group">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#D4AF37]/40 flex items-center justify-center bg-[#0D0D12] group-hover:border-[#D4AF37] group-hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all duration-300 shrink-0">
              <span className="font-serif text-[#D4AF37] font-semibold text-lg sm:text-xl tracking-wider">E</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-base sm:text-lg tracking-[0.2em] sm:tracking-[0.25em] text-[#FBF9F5] font-medium uppercase group-hover:text-[#F3E5AB] transition-colors leading-tight">
                Elegance
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.3em] sm:tracking-[0.35em] text-[#D4AF37] font-sans uppercase">
                Saloon
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs uppercase tracking-[0.2em] text-[#EFECE6]/75 hover:text-[#D4AF37] transition-colors relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3 md:gap-4">
            {/* Quick Call */}
            <a
              href={`tel:${SALON_DATA.phone}`}
              className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#EFECE6]/80 hover:text-[#D4AF37] px-3 py-2 transition-colors border border-transparent hover:border-[#D4AF37]/30 rounded-full"
              title="Direct Salon Line"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden xl:inline">{SALON_DATA.phoneDisplay}</span>
            </a>

            {/* Admin Portal Link */}
            <button
              onClick={onOpenAdmin}
              className="p-2 text-[#EFECE6]/60 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-full transition-colors cursor-pointer"
              title="Salon Staff Portal"
            >
              <Shield className="w-4 h-4" />
            </button>

            {/* Primary Booking CTA */}
            <button
              onClick={onOpenBooking}
              className="relative inline-flex items-center gap-2 px-5 md:px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-[0.18em] text-[#070709] bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#C5A059] hover:brightness-110 shadow-lg shadow-[#D4AF37]/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Right Bar (Book Button + Menu Toggle) */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenBooking}
              className="px-3 py-1.5 rounded-full text-[10px] min-[380px]:text-xs font-semibold uppercase tracking-wider text-[#070709] bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#C5A059] active:scale-95 shadow-md shadow-[#D4AF37]/20"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#EFECE6] hover:text-[#D4AF37] transition-colors rounded-lg focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#D4AF37]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#070709]/98 backdrop-blur-3xl flex flex-col justify-between p-6 sm:p-8 pt-24 pb-8 overflow-y-auto lg:hidden animate-in fade-in duration-300">
          {/* Top Close Row */}
          <div className="flex items-center justify-between pb-6 border-b border-[#23232E]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border border-[#D4AF37]/40 flex items-center justify-center bg-[#0D0D12]">
                <span className="font-serif text-[#D4AF37] font-semibold text-sm">E</span>
              </div>
              <span className="font-serif text-lg tracking-[0.2em] text-[#FBF9F5] uppercase">
                Elegance Saloon
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-[#EFECE6]/70 hover:text-[#D4AF37]"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-5 my-auto py-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37]">
              Atelier Directory
            </span>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-2xl sm:text-3xl tracking-wider text-[#FBF9F5] active:text-[#D4AF37] hover:text-[#D4AF37] transition-colors py-1 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-xs text-[#D4AF37]/40 font-mono">0{navLinks.indexOf(link) + 1}</span>
              </a>
            ))}
          </div>

          {/* Bottom Actions with Safe-Area padding */}
          <div className="flex flex-col gap-3 pt-6 border-t border-[#23232E] pb-safe">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest text-[#070709] bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#C5A059] shadow-lg shadow-[#D4AF37]/20 active:scale-[0.98]"
            >
              Book Your Appointment
            </button>

            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={`tel:${SALON_DATA.phone}`}
                className="flex items-center justify-center gap-2 py-3 border border-[#D4AF37]/35 rounded-full text-[11px] uppercase tracking-wider text-[#EFECE6] bg-[#0D0D14]"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Call Desk</span>
              </a>

              <a
                href={`https://wa.me/${SALON_DATA.whatsappNumber}?text=${encodeURIComponent(SALON_DATA.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 border border-emerald-500/40 rounded-full text-[11px] uppercase tracking-wider text-emerald-300 bg-emerald-950/20"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="flex items-center justify-center gap-2 text-[11px] text-[#EFECE6]/50 uppercase tracking-widest pt-2 active:text-[#D4AF37]"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Salon Staff Portal</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
