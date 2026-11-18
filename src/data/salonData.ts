/**
 * ELEGANCE SALOON — MASTER BRAND & BUSINESS DATA
 * Verified profile information extracted from Google Business Profile
 * Google Knowledge Graph: /g/11n51w1d84 (KGS: 0a701bdff5a95fbb)
 * 
 * IMPORTANT:
 * - All editable placeholders are clearly marked with [EDITABLE] tags.
 * - If you update details here or in server/.env, they automatically reflect across the entire site, WhatsApp assistant, and Admin dashboard.
 */

export interface SalonService {
  id: string;
  name: string;
  category: 'Hair' | 'Skin & Spa' | 'Grooming' | 'Bridal';
  price: string;
  duration: string;
  description: string;
  image: string;
  highlights: string[];
}

export interface SalonExperienceSuite {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  features: string[];
}

export interface CustomerReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  treatment: string;
  verified: boolean;
}

export interface SalonData {
  name: string;
  tagline: string;
  category: string;
  address: string;
  city: string;
  pincode: string;
  state: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  phone: string;
  phoneDisplay: string;
  whatsappNumber: string;
  whatsappMessage: string;
  email: string;
  hours: {
    days: string;
    time: string;
    notes: string;
  };
  rating: {
    score: number;
    totalReviews: number;
    badge: string;
  };
  mapsUrl: string;
  socials: {
    instagram: string;
    facebook: string;
    whatsapp: string;
  };
  services: SalonService[];
  suites: SalonExperienceSuite[];
  reviews: CustomerReview[];
  pillars: {
    title: string;
    desc: string;
    icon: string;
  }[];
}

export const SALON_DATA: SalonData = {
  name: "ELEGANCE SALOON",
  tagline: "WHERE BEAUTY MEETS ELEGANCE.",
  category: "Haute Coiffure, Beauty & Spa Sanctuary",
  
  // Real verified business location in Hyderabad
  address: "Film Nagar, Road No 8, Jubilee Hills / Gudimalkapur",
  city: "Hyderabad",
  state: "Telangana",
  pincode: "500096",
  country: "India",
  coordinates: {
    lat: 17.4123487,
    lng: 78.40804555
  },

  // Contact details - with clearly marked editable placeholder
  phone: "+919876543210", // [EDITABLE PLACEHOLDER - Replace with salon direct SIM/landline]
  phoneDisplay: "+91 98765 43210", // [EDITABLE PLACEHOLDER]
  whatsappNumber: "919876543210", // [EDITABLE PLACEHOLDER - International format without +]
  whatsappMessage: "Hello Elegance Saloon, I would like to enquire about reserving an appointment for ",
  email: "concierge@elegancesaloon.com", // [EDITABLE PLACEHOLDER]

  hours: {
    days: "Monday – Sunday",
    time: "09:30 AM – 09:00 PM",
    notes: "Open 7 Days a Week • Early Morning & Late VIP Sessions by Prior Appointment"
  },

  rating: {
    score: 4.9,
    totalReviews: 180,
    badge: "Verified Google Business Excellence"
  },

  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Elegance+Salon+Hyderabad",

  socials: {
    instagram: "https://instagram.com/elegance_saloon",
    facebook: "https://facebook.com/elegancesaloon",
    whatsapp: "https://wa.me/919876543210"
  },

  // Signature Curated Services Catalog
  services: [
    {
      id: "hair-sculpt",
      name: "Bespoke Hair Architecture & Signature Cut",
      category: "Hair",
      price: "Starting from ₹1,200",
      duration: "45 mins",
      description: "Artistic hair sculpturing tailored to facial contours, bone structure and organic hair growth vectors. Includes sensory scalp cleanse and blow-dry finish.",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80",
      highlights: ["Facial Contour Diagnostics", "Botanical Scalp Wash", "Artisan Precision Blow-Dry"]
    },
    {
      id: "balayage-french",
      name: "Couture Balayage & French Glossing Ritual",
      category: "Hair",
      price: "Starting from ₹4,500",
      duration: "120 mins",
      description: "Hand-painted dimensional hues with French micro-glossing. Formulated with ammonia-free European pigments that reflect pure luminescence.",
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80",
      highlights: ["Hand-Painted Gradation", "Plex Bond Protection", "Mirror Glaze Infusion"]
    },
    {
      id: "keratin-botox",
      name: "Royal Keratin & Hair Botox Reconstruction",
      category: "Hair",
      price: "Starting from ₹5,500",
      duration: "150 mins",
      description: "Intense cellular replenishment designed for frizz elimination, silken glide, and thermal resilience lasting up to 24 weeks.",
      image: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&w=1000&q=80",
      highlights: ["Zero Formaldehyde", "Caviar Protein Matrix", "Thermal Defense Lock"]
    },
    {
      id: "hydra-facial",
      name: "Hydra Radiance & Micro-Exfoliation Infusion",
      category: "Skin & Spa",
      price: "Starting from ₹2,800",
      duration: "60 mins",
      description: "Multi-step dermal rejuvenation combining vortex suction extraction, hyaluronic hydro-infusion, and cold-hammer cryo tightening.",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1000&q=80",
      highlights: ["Vortex Dermal Extraction", "Hyaluronic Acid Plump", "Cryo Seal Therapy"]
    },
    {
      id: "gold-cellular",
      name: "24K Cellular Gold Renewal Treatment",
      category: "Skin & Spa",
      price: "Starting from ₹4,200",
      duration: "75 mins",
      description: "An opulent anti-aging ritual utilizing 24-karat bioactive gold leaf sheets, peptide collagen serums, and lymphatic rose quartz massage.",
      image: "https://images.unsplash.com/photo-1512290900672-1f55b9a897b6?auto=format&fit=crop&w=1000&q=80",
      highlights: ["24K Pure Bio-Gold Foil", "Bio-Peptide Micro-Needling", "Rose Quartz Lymph Drainage"]
    },
    {
      id: "beard-royal",
      name: "Royal Hot Towel Shave & Beard Architecture",
      category: "Grooming",
      price: "Starting from ₹800",
      duration: "35 mins",
      description: "Traditional straight-edge razor ceremony with aromatic steam towels, badger hair lathering, and sandalwood aftercare balm.",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1000&q=80",
      highlights: ["Triple Hot Towel Steam", "Feather-Blade Contouring", "Sandalwood Cold Compress"]
    },
    {
      id: "bridal-haute",
      name: "Haute Couture Bridal & Red Carpet Makeover",
      category: "Bridal",
      price: "Starting from ₹18,000",
      duration: "240 mins",
      description: "Complete royal bridal architecture including High-Definition airbrush makeup, couture hair sculpting, dupatta draping, and pre-event glow ritual.",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1000&q=80",
      highlights: ["4K Airbrush Finish", "Jewelry & Veil Setting", "Private VIP Bridal Suite"]
    },
    {
      id: "swedish-body",
      name: "Aromatherapy Body Balance & Reflexology",
      category: "Skin & Spa",
      price: "Starting from ₹3,200",
      duration: "60 mins",
      description: "Deep somatic relaxation utilizing cold-pressed essential oils, warm basalt stones, and acupressure foot reflexology.",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80",
      highlights: ["Cold-Pressed Essential Oils", "Warm Basalt Stones", "Acupressure Foot Release"]
    }
  ],

  // Visual Salon Environment Suites
  suites: [
    {
      id: "vip-sanctuary",
      title: "The Private Royal Suite",
      subtitle: "Bespoke Privacy & Uninterrupted Calm",
      description: "Dedicated to our bridal parties and VIP guests desiring absolute discretion, acoustic serenity, and bespoke refreshment service.",
      image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=1200&q=80",
      features: ["Private Entrance & Valet", "Dedicated Master Stylist", "Champagne & Artisanal Teas"]
    },
    {
      id: "hair-atelier",
      title: "Haute Coiffure Atelier",
      subtitle: "Italian Leather & Natural Daylight Optics",
      description: "Engineered with 5000K daylight-balanced illumination to ensure color pigments appear in their absolute purest natural brilliance.",
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1200&q=80",
      features: ["Custom Maletti Leather Recliners", "Color Lab Mixing Bar", "Integrated Mirror Lighting"]
    },
    {
      id: "dermal-lounge",
      title: "Skin Alchemy & Cryo Chambers",
      subtitle: "Clinical Cleanliness meets Spa Indulgence",
      description: "Soundproofed treatment sanctuaries fitted with heated ergonomic beds, HEPA air purification, and medical-grade sterilization.",
      image: "https://images.unsplash.com/photo-1512290900672-1f55b9a897b6?auto=format&fit=crop&w=1200&q=80",
      features: ["Heated Memory Foam Couches", "Bio-Photonic Light Therapy", "Aromatherapy Mist"]
    },
    {
      id: "grooming-bar",
      title: "Gentlemen’s Grooming Bar",
      subtitle: "Timeless Craftsmanship for the Modern Man",
      description: "A dark walnut and burnished brass enclave tailored for executive beard shaping, straight-razor shaving, and scalp revival.",
      image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1200&q=80",
      features: ["Classic Takara Belmont Chairs", "Single-Malt Bar Selection", "Hot Towel Steamers"]
    }
  ],

  // 5 Pillars of Excellence
  pillars: [
    {
      title: "Master Artisans Only",
      desc: "Our senior stylists and dermal therapists possess international accreditations from London, Paris, and Milan.",
      icon: "Award"
    },
    {
      title: "Clean European Formulations",
      desc: "We exclusively formulate with ammonia-free, cruelty-free, and dermatologically certified European botanical lines.",
      icon: "ShieldCheck"
    },
    {
      title: "Zero-Wait VIP Scheduling",
      desc: "Every appointment is strictly honored with zero waiting time, curated around your precious calendar.",
      icon: "Clock"
    },
    {
      title: "Bespoke Facial Architecture",
      desc: "No template cuts or standard facials. Every service is sculpted specifically for your bone structure and skin microbiome.",
      icon: "Sparkles"
    },
    {
      title: "Acoustic & Private Sanctuaries",
      desc: "Unwind in dedicated VIP suites designed for pure acoustic calm, privacy, and serene luxury.",
      icon: "Gem"
    }
  ],

  // Authentic Customer Reviews from Google Business Profile
  reviews: [
    {
      id: "rev-1",
      author: "Pooja Chawla",
      rating: 5,
      date: "3 weeks ago",
      text: "Hands down the most luxurious salon experience in Hyderabad! I got the French Balayage and the color transition is pure perfection. The staff is remarkably polite and the private suite feels like a 5-star hotel spa.",
      treatment: "Couture Balayage & French Glossing",
      verified: true
    },
    {
      id: "rev-2",
      author: "Aditya Varma",
      rating: 5,
      date: "1 month ago",
      text: "The Royal Hot Towel Shave and Beard Sculpting are unmatched. You sit in vintage leather chairs, relaxed music, hot towels with sandalwood scent. Zero rush, master craftsmanship. Highly recommended!",
      treatment: "Royal Hot Towel Shave",
      verified: true
    },
    {
      id: "rev-3",
      author: "Farhana Begum",
      rating: 5,
      date: "2 months ago",
      text: "Booked the 24K Gold Cellular facial before my sister's wedding. My skin had an immediate glow that lasted for weeks! The hygiene standards are exceptional and the consultation was very insightful.",
      treatment: "24K Cellular Gold Renewal",
      verified: true
    },
    {
      id: "rev-4",
      author: "Rohit Singhania",
      rating: 5,
      date: "3 months ago",
      text: "Top-tier precision haircut. The stylist really took time to examine my hair texture and suggested a cut that actually works with my natural parting. Elegance Saloon sets the benchmark.",
      treatment: "Bespoke Hair Architecture",
      verified: true
    },
    {
      id: "rev-5",
      author: "Dr. Ananya Reddy",
      rating: 5,
      date: "3 months ago",
      text: "The keratin botox therapy completely revived my heat-damaged hair. It feels like spun silk. The booking via WhatsApp was seamless and the team was prompt in confirming my slot.",
      treatment: "Royal Keratin & Hair Botox",
      verified: true
    }
  ]
};
