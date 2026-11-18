import React from 'react';
import { MapPin, Phone, Clock, MessageCircle, ExternalLink, Calendar, Navigation } from 'lucide-react';
import { SALON_DATA } from '../../data/salonData';

interface LocationContactProps {
  onOpenBooking: () => void;
}

export const LocationContact: React.FC<LocationContactProps> = ({ onOpenBooking }) => {
  // Compute live open/closed status based on salon hours (09:30 AM to 09:00 PM)
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeVal = currentHour * 60 + currentMinute;
  const openTimeVal = 9 * 60 + 30; // 09:30 AM
  const closeTimeVal = 21 * 60;    // 09:00 PM
  const isOpen = currentTimeVal >= openTimeVal && currentTimeVal <= closeTimeVal;

  return (
    <section id="location" className="relative py-28 px-6 md:px-12 bg-[#09090E] border-t border-[#1E1E26]">
      {/* Background Ambience */}
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-12 bg-[#D4AF37]" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
                Sanctuary Address
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#FBF9F5] leading-tight">
              LOCATION, HOURS & <br />
              <span className="italic text-gold-gradient font-normal">
                CONCIERGE ACCESS.
              </span>
            </h2>
          </div>

          {/* Live Open / Closed Status Pill */}
          <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#0D0D14] border border-[#23232E]">
            <span className={`w-2.5 h-2.5 rounded-full ${isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            <span className="text-xs uppercase tracking-wider font-medium text-[#EFECE6]">
              {isOpen ? 'Open Now (Welcoming Guests)' : 'Currently Closed • Opens 09:30 AM'}
            </span>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Contact & Hours Info Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            {/* Address Card */}
            <div className="p-8 rounded-2xl bg-[#0D0D14] border border-[#23232E] hover:border-[#D4AF37]/40 transition-colors">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#14141E] text-[#D4AF37] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] block mb-1">
                    Atelier Location
                  </span>
                  <h3 className="font-serif text-xl text-[#FBF9F5] mb-2">
                    {SALON_DATA.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#EFECE6]/75 font-light leading-relaxed mb-4">
                    {SALON_DATA.address}, {SALON_DATA.city}, {SALON_DATA.state} {SALON_DATA.pincode}, {SALON_DATA.country}
                  </p>
                  <a
                    href={SALON_DATA.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] hover:underline font-medium"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Driving Directions on Google Maps</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="p-8 rounded-2xl bg-[#0D0D14] border border-[#23232E]">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#14141E] text-[#D4AF37] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] block mb-1">
                    Salon Schedule
                  </span>
                  <h3 className="font-serif text-xl text-[#FBF9F5] mb-2">
                    {SALON_DATA.hours.days}
                  </h3>
                  <span className="font-sans text-base text-gold-gradient font-semibold block mb-2">
                    {SALON_DATA.hours.time}
                  </span>
                  <p className="text-xs text-[#EFECE6]/60 font-light">
                    {SALON_DATA.hours.notes}
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Connect Options */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href={`tel:${SALON_DATA.phone}`}
                className="p-5 rounded-2xl bg-[#0D0D14] border border-[#23232E] hover:border-[#D4AF37]/50 transition-colors flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-3">
                  <Phone className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-[10px] uppercase tracking-wider text-[#EFECE6]/50">Call Direct</span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#FBF9F5] block">{SALON_DATA.phoneDisplay}</span>
                  <span className="text-[10px] text-[#D4AF37]">Reception Desk</span>
                </div>
              </a>

              <a
                href={`https://wa.me/${SALON_DATA.whatsappNumber}?text=${encodeURIComponent(SALON_DATA.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-5 rounded-2xl bg-[#0D0D14] border border-emerald-500/20 hover:border-emerald-500/60 transition-colors flex flex-col justify-between bg-emerald-950/10"
              >
                <div className="flex items-center justify-between mb-3">
                  <MessageCircle className="w-5 h-5 text-emerald-400" />
                  <span className="text-[10px] uppercase tracking-wider text-emerald-300/60">WhatsApp</span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#FBF9F5] block">Instant Chat</span>
                  <span className="text-[10px] text-emerald-400">Virtual Concierge</span>
                </div>
              </a>
            </div>

            {/* Reserve Button */}
            <button
              onClick={onOpenBooking}
              className="w-full py-4 rounded-2xl text-xs font-semibold uppercase tracking-[0.2em] text-[#070709] bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#C5A059] hover:brightness-110 shadow-xl shadow-[#D4AF37]/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              <Calendar className="w-4 h-4" />
              <span>Book An Appointment</span>
            </button>
          </div>

          {/* Interactive Map Column */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-[#23232E] relative min-h-[420px] bg-[#0E0E14]">
            {/* Embedded Google Maps View centered on Hyderabad / Jubilee Hills / Gudimalkapur */}
            <iframe
              title="Elegance Saloon Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15228.697410312674!2d78.40104555!3d17.4123487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb972e36bfa585%3A0xa701bdff5a95fbb!2sElegance%20Salon!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '440px', filter: 'invert(90%) hue-rotate(180deg) contrast(100%)' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#070709]/90 backdrop-blur-md border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-[#FBF9F5] block">Valet Parking Available</span>
                <span className="text-[11px] text-[#EFECE6]/60">Complimentary guest parking at salon entrance</span>
              </div>
              <a
                href={SALON_DATA.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-[#D4AF37] text-[#070709] text-xs font-semibold uppercase tracking-wider hover:bg-[#F3E5AB] transition-colors"
              >
                Open Map
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
