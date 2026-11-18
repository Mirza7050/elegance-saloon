import { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { BrandIntro } from './components/sections/BrandIntro';
import { ServicesShowcase } from './components/sections/ServicesShowcase';
import { SalonExperience } from './components/sections/SalonExperience';
import { WhyElegance } from './components/sections/WhyElegance';
import { EditorialGallery } from './components/sections/EditorialGallery';
import { ReviewsSection } from './components/sections/ReviewsSection';
import { LocationContact } from './components/sections/LocationContact';
import { FinalCTA } from './components/sections/FinalCTA';
import { Footer } from './components/layout/Footer';
import { EleganceAIWidget } from './components/ai/EleganceAIWidget';
import { BookingModal } from './components/ai/BookingModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CustomCursor } from './components/layout/CustomCursor';
import { AmbientAudio } from './components/layout/AmbientAudio';
import type { SalonService } from './data/salonData';

export function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [aiWidgetOpen, setAiWidgetOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<SalonService | null>(null);

  const handleOpenBooking = (service?: SalonService) => {
    if (service) {
      setPreselectedService(service);
    } else {
      setPreselectedService(null);
    }
    setBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#070709] text-[#EFECE6] relative selection:bg-[#D4AF37]/30 selection:text-[#F3E5AB]">
      {/* Luxury Fluid Desktop Cursor */}
      <CustomCursor />

      {/* Atmospheric Ambient Sound Toggle */}
      <AmbientAudio />

      {/* Top Luxury Navigation */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={() => setAdminModalOpen(true)}
      />

      {/* Main Content Flow */}
      <main>
        {/* 3D Cinematic Hero */}
        <HeroSection onOpenBooking={() => handleOpenBooking()} />

        {/* Section A: Brand Philosophy & Story */}
        <BrandIntro />

        {/* Section B: Signature Services Showcase */}
        <ServicesShowcase onSelectServiceForBooking={(service) => handleOpenBooking(service)} />

        {/* Section C: The Environment & VIP Suites */}
        <SalonExperience />

        {/* Section D: Why Elegance? Core Pillars */}
        <WhyElegance />

        {/* Section E: Editorial Portfolio Lookbook */}
        <EditorialGallery />

        {/* Section F: Verified Google Reviews & Testimonials */}
        <ReviewsSection />

        {/* Section G: Location, Schedule & Directions */}
        <LocationContact onOpenBooking={() => handleOpenBooking()} />

        {/* Section H: Closing Cinematic CTA */}
        <FinalCTA
          onOpenBooking={() => handleOpenBooking()}
          onOpenAI={() => setAiWidgetOpen(true)}
        />
      </main>

      {/* Luxury Footer */}
      <Footer onOpenAdmin={() => setAdminModalOpen(true)} />

      {/* Floating AI Receptionist Widget (Elegance AI) */}
      <EleganceAIWidget
        isOpen={aiWidgetOpen}
        onToggle={() => setAiWidgetOpen(!aiWidgetOpen)}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Multi-Step Appointment Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedService={preselectedService}
      />

      {/* Salon Administration Portal */}
      <AdminDashboard
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
      />
    </div>
  );
}

export default App;
