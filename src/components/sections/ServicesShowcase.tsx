import React, { useState } from 'react';
import { Clock, MessageCircle, Calendar, Check } from 'lucide-react';
import { SALON_DATA } from '../../data/salonData';
import type { SalonService } from '../../data/salonData';

interface ServicesShowcaseProps {
  onSelectServiceForBooking: (service: SalonService) => void;
}

export const ServicesShowcase: React.FC<ServicesShowcaseProps> = ({ onSelectServiceForBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Hair', 'Skin & Spa', 'Grooming', 'Bridal'];

  const filteredServices = selectedCategory === 'All'
    ? SALON_DATA.services
    : SALON_DATA.services.filter(s => s.category === selectedCategory);

  return (
    <section id="services" className="relative py-28 px-6 md:px-12 bg-[#070709] border-t border-[#1E1E26]">
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[1px] w-12 bg-[#D4AF37]" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
                Bespoke Atelier
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#FBF9F5] leading-tight">
              OUR SIGNATURE <br />
              <span className="italic text-gold-gradient font-normal">
                TREATMENTS & RITUALS.
              </span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-[#EFECE6]/70 font-light leading-relaxed">
            Every service is meticulously tailored to your individual anatomy and aesthetic goals. Formulated with certified clean European botanical serums and pigments.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-xs uppercase tracking-[0.18em] transition-all duration-300 whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#C5A059] text-[#070709] font-semibold shadow-lg shadow-[#D4AF37]/20 scale-[1.02]'
                  : 'bg-[#0E0E14] text-[#EFECE6]/70 hover:text-[#D4AF37] border border-[#23232E] hover:border-[#D4AF37]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => {
            const whatsappText = `Hello Elegance Saloon, I would like to book the ${service.name} (${service.price}). Please share available slots.`;
            const whatsappUrl = `https://wa.me/${SALON_DATA.whatsappNumber}?text=${encodeURIComponent(whatsappText)}`;

            return (
              <div
                key={service.id}
                className="group relative rounded-2xl bg-[#0D0D14] border border-[#23232E] hover:border-[#D4AF37]/50 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#D4AF37]/10"
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D14] via-[#0D0D14]/20 to-transparent" />
                  
                  {/* Category Pill */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-[#F3E5AB] bg-[#070709]/80 border border-[#D4AF37]/30 backdrop-blur-md">
                    {service.category}
                  </span>

                  {/* Duration Pill */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] text-[#EFECE6]/80 bg-[#070709]/80 border border-white/10 backdrop-blur-md">
                    <Clock className="w-3 h-3 text-[#D4AF37]" />
                    <span>{service.duration}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Verified Price & Title */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="font-serif text-xl sm:text-2xl text-[#FBF9F5] group-hover:text-[#F3E5AB] transition-colors leading-snug">
                        {service.name}
                      </h3>
                    </div>

                    <div className="inline-block mb-3.5">
                      <span className="text-sm font-semibold text-gold-gradient tracking-wide">
                        {service.price}
                      </span>
                      <span className="text-[10px] text-[#EFECE6]/40 uppercase tracking-widest block">
                        Verified Base Rate
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#EFECE6]/70 font-light leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Service Highlights */}
                    <div className="space-y-1.5 mb-8">
                      {service.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] text-[#EFECE6]/80">
                          <Check className="w-3 h-3 text-[#D4AF37] shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 pt-4 border-t border-[#1E1E26]">
                    <button
                      onClick={() => onSelectServiceForBooking(service)}
                      className="flex-1 py-3 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider text-[#070709] bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#C5A059] hover:brightness-110 transition-all flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Reserve Slot</span>
                    </button>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl border border-emerald-500/30 hover:border-emerald-500 text-emerald-400 hover:bg-emerald-950/30 transition-all"
                      title="Enquire on WhatsApp with prefilled message"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Consultation Banner */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-[#0E0E14] via-[#14141E] to-[#0E0E14] border border-[#D4AF37]/25 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-serif text-2xl text-[#FBF9F5] mb-2">
              Require a Bespoke Aesthetic Consultation?
            </h4>
            <p className="text-xs sm:text-sm text-[#EFECE6]/70 font-light">
              Our salon director and master colorists offer personalized one-on-one evaluations to curate your seasonal look.
            </p>
          </div>

          <a
            href={`https://wa.me/${SALON_DATA.whatsappNumber}?text=${encodeURIComponent('Hello Elegance Saloon, I would like to schedule a private master consultation.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest text-[#070709] bg-[#D4AF37] hover:bg-[#F3E5AB] transition-colors whitespace-nowrap"
          >
            Request Private Consultation
          </a>
        </div>
      </div>
    </section>
  );
};
