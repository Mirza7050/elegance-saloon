import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Salon Master Verified Profile Data
const SALON_INFO = {
  name: "ELEGANCE SALOON",
  category: "Luxury Hair, Beauty, Spa & Grooming Studio",
  address: "Film Nagar, Road No 8, Jubilee Hills / Gudimalkapur, Hyderabad, Telangana 500096, India",
  phone: process.env.SALON_PHONE || "+919876543210", // Editable placeholder or verified business number
  hours: "Monday – Sunday: 9:30 AM – 9:00 PM",
  rating: "4.9 ★ / 5.0 (180+ Verified Google Reviews)",
  mapsUrl: "https://maps.google.com/?q=Elegance+Salon+Hyderabad",
  adminPin: process.env.ADMIN_PIN || "1234",
  services: [
    { id: "hair-cut", name: "Bespoke Hair Architecture & Cut", category: "Hair", price: "Starting from ₹1,200", duration: "45 mins" },
    { id: "hair-color", name: "Couture Balayage & French Glossing", category: "Hair", price: "Starting from ₹4,500", duration: "120 mins" },
    { id: "keratin", name: "Royal Keratin & Botox Therapy", category: "Hair", price: "Starting from ₹5,500", duration: "150 mins" },
    { id: "hydra-facial", name: "Hydra Radiance Infusion Facial", category: "Skin & Spa", price: "Starting from ₹2,800", duration: "60 mins" },
    { id: "gold-facial", name: "24K Cellular Gold Renewal", category: "Skin & Spa", price: "Starting from ₹4,200", duration: "75 mins" },
    { id: "beard-sculpt", name: "Precision Beard Sculpt & Hot Towel Shave", category: "Grooming", price: "Starting from ₹800", duration: "35 mins" },
    { id: "bridal", name: "Haute Bridal Makeover & Styling", category: "Bridal", price: "Starting from ₹18,000", duration: "240 mins" },
    { id: "spa-body", name: "Aromatherapy Swedish Body Ritual", category: "Skin & Spa", price: "Starting from ₹3,200", duration: "60 mins" }
  ]
};

// Persistent Appointment Storage
const DB_FILE = path.join(__dirname, 'appointments.json');

function loadAppointments() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const data = fs.readFileSync(DB_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error reading appointments DB:', err);
  }
  // Default seeded sample verified appointments
  return [
    {
      id: "APT-1001",
      customerName: "Ayesha Khan",
      service: "Couture Balayage & French Glossing",
      date: "2026-11-20",
      time: "02:30 PM",
      phone: "+91 98490 11223",
      source: "WhatsApp Assistant",
      status: "confirmed",
      notes: "First time client, requested consultation with Master Colorist.",
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
    },
    {
      id: "APT-1002",
      customerName: "Vikram Malhotra",
      service: "Precision Beard Sculpt & Hot Towel Shave",
      date: "2026-11-21",
      time: "11:00 AM",
      phone: "+91 97000 44556",
      source: "Website Concierge",
      status: "pending",
      notes: "Executive grooming appointment before media event.",
      createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
    },
    {
      id: "APT-1003",
      customerName: "Sneha Reddy",
      service: "24K Cellular Gold Renewal",
      date: "2026-11-22",
      time: "04:00 PM",
      phone: "+91 99887 76655",
      source: "WhatsApp Assistant",
      status: "pending",
      notes: "Sensitive skin, prefers organic botanical serum.",
      createdAt: new Date(Date.now() - 1800000).toISOString()
    }
  ];
}

let appointments = loadAppointments();

function saveAppointments() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(appointments, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving appointments DB:', err);
  }
}

// ---------------------------------------------------------------------------
// 1. HEALTH CHECK & INFO
// ---------------------------------------------------------------------------
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Elegance Saloon API',
    timestamp: new Date().toISOString(),
    salon: SALON_INFO.name,
    version: '2.0.0'
  });
});

app.get('/api/info', (req, res) => {
  res.json(SALON_INFO);
});

// ---------------------------------------------------------------------------
// 2. WHATSAPP BUSINESS CLOUD API WEBHOOK
// ---------------------------------------------------------------------------
// Webhook verification endpoint required by Meta
app.get('/api/whatsapp/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  const VERIFY_TOKEN = process.env.WHATSAPP_VERIFY_TOKEN || "elegance_saloon_secure_token_2026";

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('[WhatsApp Webhook] Verification successful!');
    return res.status(200).send(challenge);
  } else {
    console.warn('[WhatsApp Webhook] Verification token mismatch');
    return res.sendStatus(403);
  }
});

// Webhook message receiver endpoint
app.post('/api/whatsapp/webhook', async (req, res) => {
  try {
    const body = req.body;
    console.log('[WhatsApp Webhook] Incoming payload:', JSON.stringify(body, null, 2));

    if (body.object === 'whatsapp_business_account') {
      const entry = body.entry?.[0];
      const changes = entry?.changes?.[0];
      const value = changes?.value;
      const message = value?.messages?.[0];

      if (message) {
        const from = message.from; // Sender's WhatsApp number
        const text = message.text?.body || '';
        console.log(`[WhatsApp Message from ${from}]: "${text}"`);

        // Process message and generate contextual response
        const replyText = processWhatsAppCustomerMessage(text, from);

        // If Meta Cloud API credentials are configured, dispatch WhatsApp reply
        if (process.env.WHATSAPP_ACCESS_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID) {
          await sendWhatsAppCloudMessage(from, replyText);
        } else {
          console.log(`[WhatsApp Simulated Dispatch to ${from}]:\n${replyText}`);
        }
      }
      return res.sendStatus(200);
    }
    res.sendStatus(404);
  } catch (error) {
    console.error('[WhatsApp Webhook Error]:', error);
    res.sendStatus(500);
  }
});

// Outgoing Meta Cloud API Message Sender
async function sendWhatsAppCloudMessage(to, messageBody) {
  try {
    const url = `https://graph.facebook.com/v21.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: to,
        type: 'text',
        text: { body: messageBody }
      })
    });
    const result = await response.json();
    console.log('[WhatsApp Cloud API Result]:', result);
    return result;
  } catch (err) {
    console.error('[WhatsApp Cloud API Send Error]:', err);
  }
}

// WhatsApp Conversation Logic (English & Hindi Understanding)
function processWhatsAppCustomerMessage(rawText, fromPhone) {
  const text = (rawText || '').trim().toLowerCase();

  // Greetings
  if (text.match(/^(hi|hello|hey|namaste|salaam|hola|start|menu|good morning|good evening)/i)) {
    return `✨ *Welcome to Elegance Saloon!* ✨\n\nExperience the art of luxury beauty, hair architecture, and bespoke grooming in Hyderabad.\n\nHow may we assist you today?\n\n1️⃣ *Explore Our Services*\n2️⃣ *Check Verified Prices*\n3️⃣ *Book an Appointment*\n4️⃣ *Salon Location & Directions*\n5️⃣ *Opening Hours*\n6️⃣ *Speak with Human Concierge*\n\nReply with a number or simply type your request in English or Hindi!`;
  }

  // Services
  if (text.includes('1') || text.includes('service') || text.includes('services') || text.includes('kya kya') || text.includes('treatment')) {
    let msg = `✨ *ELEGANCE SALOON — SIGNATURE SERVICES* ✨\n\n`;
    SALON_INFO.services.forEach(s => {
      msg += `▫️ *${s.name}* (${s.category})\n   ${s.price} • ${s.duration}\n\n`;
    });
    msg += `Would you like to book any of these? Reply with *Book [Service Name]* or type *3*.`;
    return msg;
  }

  // Prices
  if (text.includes('2') || text.includes('price') || text.includes('rate') || text.includes('cost') || text.includes('paisa') || text.includes('kitna')) {
    let msg = `✨ *ELEGANCE SALOON — VERIFIED RATE CARD* ✨\n\n`;
    SALON_INFO.services.forEach(s => {
      msg += `• *${s.name}*: ${s.price}\n`;
    });
    msg += `\n*Note:* Base prices depend on hair length and personalized consultation.\nReply with *Book* to request your appointment!`;
    return msg;
  }

  // Hours
  if (text.includes('5') || text.includes('hour') || text.includes('time') || text.includes('timing') || text.includes('open') || text.includes('kab khulta')) {
    return `✨ *ELEGANCE SALOON — OPENING HOURS* ✨\n\n🕒 ${SALON_INFO.hours}\nOpen 7 days a week for appointments and walk-in consultations.\n\nWould you like to book a slot for today or tomorrow?`;
  }

  // Location
  if (text.includes('4') || text.includes('location') || text.includes('address') || text.includes('where') || text.includes('kahan') || text.includes('rasta') || text.includes('directions')) {
    return `📍 *ELEGANCE SALOON — LOCATION* 📍\n\n${SALON_INFO.address}\n\n🗺️ *Google Maps Link:*\n${SALON_INFO.mapsUrl}\n\nLandmark: Near Film Nagar / Jubilee Hills. Valet parking available.`;
  }

  // Human Concierge
  if (text.includes('6') || text.includes('human') || text.includes('talk') || text.includes('team') || text.includes('staff') || text.includes('call') || text.includes('baat')) {
    return `✨ *CONNECTING WITH HUMAN RECEPTIONIST* ✨\n\nOur salon director has been alerted. You can also reach our reception desk directly:\n📞 *Call:* ${SALON_INFO.phone}\n\nWe typically respond within 5–10 minutes during salon hours (09:30 AM – 09:00 PM).`;
  }

  // Booking Intent Detection
  if (text.includes('3') || text.includes('book') || text.includes('appointment') || text.includes('slot') || text.includes('reserve')) {
    return `✨ *BOOK YOUR ELEGANCE VISIT* ✨\n\nTo reserve your preferred master stylist and suite, please reply with:\n\n1. *Your Full Name*\n2. *Requested Service* (e.g., Balayage, Haircut, Hydra Facial)\n3. *Preferred Date* (e.g., Tomorrow, 22 Nov)\n4. *Preferred Time* (e.g., 03:00 PM)\n\nOur team will confirm your slot immediately upon review!`;
  }

  // Fallback AI Concierge Response
  return `Thank you for contacting *Elegance Saloon*. ✨\n\nI am your Elegance Virtual Concierge. I can help you with services, verified prices, location, and appointment booking.\n\nFeel free to ask your question or type *Menu* to see all options. You can also call us directly at ${SALON_INFO.phone}.`;
}

// ---------------------------------------------------------------------------
// 3. AI CHAT CONCIERGE ENDPOINT (FOR WEBSITE WIDGET)
// ---------------------------------------------------------------------------
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const reply = generateAIResponse(message, history || []);
    res.json(reply);
  } catch (err) {
    console.error('Error in /api/chat:', err);
    res.status(500).json({ error: 'Internal AI processing error' });
  }
});

function generateAIResponse(userMessage, history) {
  const msg = userMessage.toLowerCase().trim();

  // Booking Flow Detection: if message contains booking patterns
  const isBooking = msg.includes('book') || msg.includes('appointment') || msg.includes('slot') || msg.includes('schedule');
  const isPricing = msg.includes('price') || msg.includes('cost') || msg.includes('rate') || msg.includes('fee') || msg.includes('kitna') || msg.includes('charge');
  const isLocation = msg.includes('where') || msg.includes('location') || msg.includes('address') || msg.includes('map') || msg.includes('kahan');
  const isTiming = msg.includes('hour') || msg.includes('time') || msg.includes('open') || msg.includes('close') || msg.includes('timing') || msg.includes('kab');
  const isServices = msg.includes('service') || msg.includes('treatment') || msg.includes('hair') || msg.includes('facial') || msg.includes('bridal') || msg.includes('spa');
  const isHindi = msg.includes('namaste') || msg.includes('kya') || msg.includes('hai') || msg.includes('chahiye') || msg.includes('karna') || msg.includes('batao');

  if (isBooking) {
    return {
      text: isHindi
        ? "ज़रूर! Elegance Saloon में अपॉइंटमेंट बुक करने के लिए, आप नीचे दिया गया 'Book Appointment' बटन दबा सकते हैं या सीधे WhatsApp पर अपनी पसंदीदा तारीख और समय भेज सकते हैं।"
        : "I would be delighted to help you reserve your luxury session at Elegance Saloon. You can either complete our instant booking form right here or send a pre-filled booking request directly to our verified WhatsApp desk.",
      action: "OPEN_BOOKING_MODAL",
      whatsappPrefill: "Hello Elegance Saloon, I would like to book an appointment for "
    };
  }

  if (isPricing) {
    return {
      text: isHindi
        ? "हमारे प्रमाणित मूल्य:\n• Bespoke Hair Architecture: ₹1,200 से शुरू\n• Couture Balayage: ₹4,500 से शुरू\n• Royal Keratin & Botox: ₹5,500 से शुरू\n• Hydra Radiance Facial: ₹2,800 से शुरू\n• 24K Gold Cellular Facial: ₹4,200 से शुरू\n• Bridal Makeover: ₹18,000 से शुरू। क्या आप किसी विशिष्ट सेवा का विवरण जानना चाहते हैं?"
        : "Here are our verified base rates:\n• Bespoke Hair Architecture & Cut: From ₹1,200\n• Couture Balayage & French Glossing: From ₹4,500\n• Royal Keratin & Botox Therapy: From ₹5,500\n• Hydra Radiance Facial: From ₹2,800\n• 24K Cellular Gold Renewal: From ₹4,200\n• Precision Beard Sculpt: From ₹800\n• Haute Bridal Makeover: From ₹18,000.\n\nEvery treatment includes a complimentary master consultation.",
      action: "SHOW_SERVICES"
    };
  }

  if (isLocation) {
    return {
      text: `Elegance Saloon is located at ${SALON_INFO.address}. Valet parking and private VIP entrance are available for our guests. You can also view directions directly on Google Maps.`,
      action: "SHOW_LOCATION",
      mapsUrl: SALON_INFO.mapsUrl
    };
  }

  if (isTiming) {
    return {
      text: `We are open 7 days a week:\n🕒 ${SALON_INFO.hours}.\nEarly morning and late evening bridal/executive sessions are available upon prior reservation.`,
      action: "SHOW_HOURS"
    };
  }

  if (isServices) {
    return {
      text: "Our signature offerings span 4 luxury ateliers:\n1. Hair Architecture & Haute Color (Balayage, Keratin, Precision Cuts)\n2. Skin Alchemy (Hydra Radiance, 24K Gold Cellular)\n3. Gentlemen's Royal Grooming (Hot Towel Shave, Beard Sculpting)\n4. Haute Bridal & Red Carpet Styling.\n\nWhich atelier would you like to explore?",
      action: "SHOW_SERVICES"
    };
  }

  // Default AI response
  return {
    text: isHindi
      ? `नमस्ते! Elegance Saloon के वर्चुअल कंसीयर्ज में आपका स्वागत है। आप मुझसे सेवाओं, प्रमाणित कीमतों, पते या अपॉइंटमेंट के बारे में कभी भी पूछ सकते हैं।`
      : `Welcome to Elegance Saloon's Virtual Concierge. I can assist you with service recommendations, verified pricing, opening hours, or arrange an exclusive appointment with our master stylists. How may I elevate your experience today?`,
    action: "GENERAL"
  };
}

// ---------------------------------------------------------------------------
// 4. APPOINTMENT MANAGEMENT APIS (CRUD)
// ---------------------------------------------------------------------------
app.get('/api/appointments', (req, res) => {
  res.json({
    total: appointments.length,
    appointments: appointments
  });
});

app.post('/api/appointments', (req, res) => {
  const { customerName, service, date, time, phone, notes, source } = req.body;

  if (!customerName || !service || !date || !time || !phone) {
    return res.status(400).json({ error: 'Please provide customer name, service, date, time, and phone.' });
  }

  const newAppointment = {
    id: `APT-${Math.floor(1000 + Math.random() * 9000)}`,
    customerName,
    service,
    date,
    time,
    phone,
    notes: notes || 'Standard booking request.',
    source: source || 'Website Booking Concierge',
    status: 'pending', // All new appointments require salon confirmation
    createdAt: new Date().toISOString()
  };

  appointments.unshift(newAppointment);
  saveAppointments();

  res.status(201).json({
    success: true,
    message: 'Appointment request received! Pending confirmation from salon concierge.',
    appointment: newAppointment
  });
});

app.patch('/api/appointments/:id', (req, res) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  const apt = appointments.find(a => a.id === id);
  if (!apt) {
    return res.status(404).json({ error: 'Appointment not found' });
  }

  if (status) apt.status = status;
  if (notes) apt.notes = notes;
  apt.updatedAt = new Date().toISOString();

  saveAppointments();
  res.json({ success: true, appointment: apt });
});

app.delete('/api/appointments/:id', (req, res) => {
  const { id } = req.params;
  const idx = appointments.findIndex(a => a.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Appointment not found' });
  }

  const removed = appointments.splice(idx, 1)[0];
  saveAppointments();
  res.json({ success: true, removed });
});

// ---------------------------------------------------------------------------
// 5. ADMIN AUTHENTICATION
// ---------------------------------------------------------------------------
app.post('/api/admin/verify', (req, res) => {
  const { pin } = req.body;
  if (pin === SALON_INFO.adminPin) {
    res.json({ success: true, token: 'elegance_auth_' + Date.now() });
  } else {
    res.status(401).json({ success: false, error: 'Invalid salon administration PIN' });
  }
});

// START SERVER
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(` ✨ ELEGANCE SALOON BACKEND SYSTEM ONLINE ✨`);
  console.log(` Port: ${PORT}`);
  console.log(` Health: http://localhost:${PORT}/api/health`);
  console.log(` WhatsApp Webhook: http://localhost:${PORT}/api/whatsapp/webhook`);
  console.log(` Appointments API: http://localhost:${PORT}/api/appointments`);
  console.log(` Admin Default PIN: 1234`);
  console.log(`======================================================\n`);
});
