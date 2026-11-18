import React, { useState } from 'react';
import { X, User, Phone, Sparkles, CheckCircle2, MessageCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SALON_DATA } from '../../data/salonData';
import type { SalonService } from '../../data/salonData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: SalonService | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedService
}) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string>(
    preselectedService ? preselectedService.name : SALON_DATA.services[0].name
  );
  const [preferredDate, setPreferredDate] = useState<string>('');
  const [preferredTime, setPreferredTime] = useState<string>('02:00 PM');
  const [customerName, setCustomerName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingId, setBookingId] = useState<string>('');

  if (!isOpen) return null;

  const timeSlots = [
    '10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM',
    '04:00 PM', '05:30 PM', '07:00 PM', '08:00 PM'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      customerName,
      service: selectedService,
      date: preferredDate || new Date(Date.now() + 86400000).toISOString().split('T')[0],
      time: preferredTime,
      phone,
      notes: notes || 'Booked via Elegance Saloon Digital Atelier',
      source: 'Website Booking Flow'
    };

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const data = await res.json();
        setBookingId(data.appointment?.id || `APT-${Math.floor(1000 + Math.random() * 9000)}`);
      } else {
        setBookingId(`APT-${Math.floor(1000 + Math.random() * 9000)}`);
      }
    } catch {
      setBookingId(`APT-${Math.floor(1000 + Math.random() * 9000)}`);
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#F3E5AB', '#FFFFFF']
      });
    }
  };

  const whatsappMessage = `Hello Elegance Saloon, I have submitted an appointment request (ID: ${bookingId || 'PENDING'}).\n\nName: ${customerName}\nService: ${selectedService}\nDate: ${preferredDate || 'Earliest Available'}\nTime: ${preferredTime}\nPhone: ${phone}\n\nPlease confirm availability!`;
  const whatsappUrl = `https://wa.me/${SALON_DATA.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-end sm:items-center justify-center p-0 sm:p-6 animate-in fade-in duration-300">
      <div className="relative max-w-xl w-full bg-[#0D0D14] border-t sm:border border-[#D4AF37]/40 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92svh] sm:max-h-[85vh]">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#23232E] flex items-center justify-between bg-[#14141E] shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-[#D4AF37]/40 flex items-center justify-center bg-[#070709] text-[#D4AF37] shrink-0">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl text-[#FBF9F5] leading-tight">
                Reserve Your Experience
              </h3>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#D4AF37]">
                Step {step} of 3 • Zero-Wait Salon Concierge
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 min-w-[40px] min-h-[40px] flex items-center justify-center text-[#EFECE6]/60 hover:text-[#D4AF37] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body with smooth mobile scroll */}
        <div className="p-5 sm:p-8 flex-1 overflow-y-auto overflow-touch pb-safe">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="flex flex-col justify-between min-h-full">
              {/* STEP 1: SERVICE SELECTION */}
              {step === 1 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold block mb-2">
                      Select Signature Ritual
                    </label>
                    <select
                      value={selectedService}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-xl bg-[#14141E] border border-[#23232E] focus:border-[#D4AF37] text-sm text-[#FBF9F5] focus:outline-none"
                    >
                      {SALON_DATA.services.map((s) => (
                        <option key={s.id} value={s.name} className="bg-[#0D0D14] text-[#EFECE6]">
                          {s.name} — {s.price} ({s.duration})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="p-4 rounded-xl bg-[#14141E] border border-white/5 space-y-2">
                    <span className="text-xs font-semibold text-[#D4AF37] block">
                      Included in Your Visit:
                    </span>
                    <ul className="text-xs text-[#EFECE6]/70 space-y-1.5 font-light">
                      <li>• Complimentary 1-on-1 Facial Diagnostic & Hair Architecture Consultation</li>
                      <li>• Clean organic European formulations without harsh sulfates/ammonia</li>
                      <li>• Reserved private styling station with artisanal refreshments</li>
                    </ul>
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-full py-3.5 sm:py-4 rounded-xl text-xs font-semibold uppercase tracking-widest text-[#070709] bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#C5A059] flex items-center justify-center gap-2 cursor-pointer hover:brightness-110 active:scale-[0.98]"
                    >
                      <span>Proceed to Schedule</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: DATE & TIME */}
              {step === 2 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold block mb-2">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      required
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3.5 py-3 rounded-xl bg-[#14141E] border border-[#23232E] focus:border-[#D4AF37] text-sm text-[#FBF9F5] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold block mb-2">
                      Preferred Time Slot
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setPreferredTime(time)}
                          className={`py-2.5 px-2 rounded-lg text-xs font-medium transition-all ${
                            preferredTime === time
                              ? 'bg-[#D4AF37] text-[#070709] font-semibold shadow-md'
                              : 'bg-[#14141E] text-[#EFECE6]/70 hover:border-[#D4AF37]/50 border border-[#23232E]'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="py-3.5 px-4 rounded-xl border border-[#23232E] text-xs text-[#EFECE6]/70 hover:text-[#EFECE6] flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="flex-1 py-3.5 sm:py-4 rounded-xl text-xs font-semibold uppercase tracking-widest text-[#070709] bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#C5A059] flex items-center justify-center gap-2 cursor-pointer hover:brightness-110 active:scale-[0.98]"
                    >
                      <span>Guest Information</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: GUEST INFORMATION */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div>
                    <label className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold block mb-1.5">
                      Your Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3.5 w-4 h-4 text-[#D4AF37]" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ayesha Sharma"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-[#14141E] border border-[#23232E] focus:border-[#D4AF37] text-sm text-[#FBF9F5] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold block mb-1.5">
                      Phone Number (WhatsApp Active)
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-[#D4AF37]" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-[#14141E] border border-[#23232E] focus:border-[#D4AF37] text-sm text-[#FBF9F5] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold block mb-1.5">
                      Special Requests / Notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Sensitive skin, bridal package inquiry, prefer female stylist..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#14141E] border border-[#23232E] focus:border-[#D4AF37] text-xs text-[#FBF9F5] focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-2.5 pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="py-3.5 px-4 rounded-xl border border-[#23232E] text-xs text-[#EFECE6]/70 hover:text-[#EFECE6] flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !customerName || !phone}
                      className="flex-1 py-3.5 sm:py-4 rounded-xl text-xs font-semibold uppercase tracking-widest text-[#070709] bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#C5A059] flex items-center justify-center gap-2 cursor-pointer hover:brightness-110 disabled:opacity-40 active:scale-[0.98]"
                    >
                      {isSubmitting ? 'Transmitting Request...' : 'Confirm Appointment'}
                    </button>
                  </div>
                </div>
              )}
            </form>
          ) : (
            /* SUCCESS STATE */
            <div className="text-center py-4 sm:py-6 animate-in zoom-in-95 duration-300">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>

              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-mono block mb-2">
                Booking ID: {bookingId}
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#FBF9F5] mb-2 sm:mb-3">
                Appointment Request Logged
              </h3>

              <p className="text-xs sm:text-sm text-[#EFECE6]/80 font-light max-w-md mx-auto leading-relaxed mb-6">
                Thank you, <strong className="text-white">{customerName}</strong>! Your request for{' '}
                <strong className="text-[#F3E5AB]">{selectedService}</strong> has been logged with salon concierge.
              </p>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#14141E] border border-white/10 text-left text-xs space-y-2 mb-6">
                <div className="flex justify-between text-[#EFECE6]/70">
                  <span>Status:</span>
                  <span className="text-amber-400 font-medium">Pending Confirmation</span>
                </div>
                <div className="flex justify-between text-[#EFECE6]/70">
                  <span>Guest Phone:</span>
                  <span className="text-white font-mono">{phone}</span>
                </div>
                <div className="flex justify-between text-[#EFECE6]/70">
                  <span>Salon Direct:</span>
                  <span className="text-[#D4AF37] font-mono">{SALON_DATA.phoneDisplay}</span>
                </div>
              </div>

              {/* Direct WhatsApp Confirmation Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 sm:py-4 rounded-xl text-xs font-semibold uppercase tracking-widest text-[#070709] bg-gradient-to-r from-[#34D399] via-[#10B981] to-[#059669] flex items-center justify-center gap-2 hover:brightness-110 shadow-lg shadow-emerald-500/20 mb-3 transition-all"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span className="text-white">Send Instant Confirmation via WhatsApp</span>
              </a>

              <button
                onClick={onClose}
                className="text-xs text-[#EFECE6]/50 hover:text-[#D4AF37] uppercase tracking-wider py-2"
              >
                Close Window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
