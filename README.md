# ELEGANCE SALOON — Premium 3D Digital Experience & WhatsApp AI System

[![React](https://img.shields.io/badge/React-19-black?style=for-the-badge&logo=react)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Meta WhatsApp Cloud API](https://img.shields.io/badge/Meta_WhatsApp-Cloud_API-25D366?style=for-the-badge&logo=whatsapp)](https://developers.facebook.com/)

> An international-standard, luxury 3D digital experience and intelligent virtual receptionist engineered for **Elegance Saloon** (Hyderabad, India). Designed with high-fashion editorial art direction inspired by Awwwards Site of the Day, Vogue, and Chanel Beauty campaigns.

---

## 🌟 Key Highlights

### 1. 🪐 Cinematic 3D Hero (`HeroCanvas.tsx`)
- Three.js & React Three Fiber dynamic 24K gold crystal centerpiece with triple concentric orbital rings.
- 400+ interactive champagne gold stardust particles that follow mouse coordinates.
- Mobile-adaptive camera distance and GPU throttling for smooth 60fps performance on all devices.
- Atmospheric ambient audio drone generator using the Web Audio API.

### 2. 💎 8 Editorial Website Sections
- **Section A (Brand Philosophy)**: *"MORE THAN A SALON. AN EXPERIENCE."* with oversized typography and verified metrics.
- **Section B (Signature Services)**: Category-filtered catalog (Hair, Skin & Spa, Grooming, Bridal) with verified rate cards and 1-tap WhatsApp booking.
- **Section C (The Experience)**: 4 private treatment suites with full-screen inspection view.
- **Section D (Why Elegance)**: 5 core pillars of salon excellence.
- **Section E (Editorial Gallery)**: Lookbook with masonry layout and interactive zoom lightbox.
- **Section F (Customer Reviews)**: 4.9★ Google Business rating badge and verified client testimonial carousel.
- **Section G (Location & Contact)**: Film Nagar / Jubilee Hills address, interactive Google Maps embed, and live "Open Now / Closed" indicator.
- **Section H (Closing CTA)**: Cinematic closing statement with direct booking triggers.

### 3. 🤖 Elegance AI — Virtual Receptionist Widget
- Multilingual conversational assistant supporting **English, Hindi, and Hinglish**.
- Instant answers for services, prices, directions, hours, and staff connection.
- Ergonomic mobile bottom-sheet layout with safe-area padding.
- Pre-filled WhatsApp direct link generator.

### 4. 📅 Multi-Step Appointment Scheduler
- Interactive 3-step booking flow: Service selection → Date/Time slot → Customer details.
- Fires celebratory confetti upon submission and logs the booking directly to the salon database.
- Generates a 1-tap pre-filled WhatsApp message to salon staff.

### 5. 🛡️ Private Salon Administration Portal (`/admin`)
- PIN-protected staff dashboard (Default PIN: `1234`).
- Real-time counters: Total Requests, Pending Review, Confirmed Slots.
- Desktop data table & Mobile Touch Cards for one-tap booking confirmations.
- Direct **"WhatsApp Confirm"** action to message clients immediately.

### 6. ⚡ Official Meta WhatsApp Cloud API Backend
- Full Node.js & Express server with verified webhook (`GET /api/whatsapp/webhook`).
- Inbound WhatsApp message receiver (`POST /api/whatsapp/webhook`).
- Complete setup documentation in `server/WHATSAPP_INTEGRATION_GUIDE.md`.

---

## 📂 Project Structure

```
elegance-saloon/
├── index.html                       # SEO metadata, Open Graph, Google fonts, LocalBusiness JSON-LD
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   └── HeroCanvas.tsx       # Three.js 3D luxury scene with particles & orbital rings
│   │   ├── layout/
│   │   │   ├── Navbar.tsx           # Frosted glass minimal luxury navbar
│   │   │   ├── Footer.tsx           # High-end editorial footer with LocalBusiness schema
│   │   │   ├── CustomCursor.tsx     # Fluid luxury cursor
│   │   │   └── AmbientAudio.tsx     # Web Audio API ambient harmonic sound toggle
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx      # Cinematic 3D hero with headlines & CTA
│   │   │   ├── BrandIntro.tsx       # "MORE THAN A SALON. AN EXPERIENCE."
│   │   │   ├── ServicesShowcase.tsx # Luxury service catalog with categories & pricing
│   │   │   ├── SalonExperience.tsx  # Immersive visual walkthrough of salon suites
│   │   │   ├── WhyElegance.tsx      # The 5 pillars of excellence
│   │   │   ├── EditorialGallery.tsx # Fashion masonry gallery with lightbox
│   │   │   ├── ReviewsSection.tsx   # Authentic customer reviews slider (4.9 ★)
│   │   │   ├── LocationContact.tsx  # Address, Google Maps embed, hours & booking
│   │   │   └── FinalCTA.tsx         # "YOUR NEXT LOOK STARTS HERE."
│   │   ├── ai/
│   │   │   ├── EleganceAIWidget.tsx # Interactive AI virtual receptionist chat widget
│   │   │   └── BookingModal.tsx     # Multi-step conversational booking flow
│   │   └── admin/
│   │       └── AdminDashboard.tsx   # Private salon management portal
│   ├── data/
│   │   └── salonData.ts             # Master single source of truth for all business details
│   ├── styles/
│   │   └── index.css                # Tailored typography, metallic gradients, safe areas
│   └── App.tsx                      # Master application root
└── server/
    ├── server.js                    # Express app, Meta WhatsApp Cloud API webhook & chat NLP
    ├── package.json
    ├── .env.example                 # Meta WhatsApp API secrets template
    └── WHATSAPP_INTEGRATION_GUIDE.md# End-to-end Meta Cloud API setup manual
```

---

## 🚀 Quick Start Guide

### 1. Run the Frontend Client
```bash
npm install
npm run dev
# Active at http://localhost:3000/
```

### 2. Run the Backend API Server
```bash
cd server
npm install
npm run start
# Active at http://localhost:5000/
```

### 3. Build for Production
```bash
npm run build
```

---

## ⚙️ Configuration & Customization
To customize salon contact numbers, address, prices, or operating hours, simply update `src/data/salonData.ts`. All changes automatically propagate throughout the website, the AI receptionist, the booking flow, and the admin dashboard!

---

## 📄 License
MIT License. Crafted for **Elegance Saloon**.
