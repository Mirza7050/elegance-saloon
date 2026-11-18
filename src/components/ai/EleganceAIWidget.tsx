import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Calendar, MapPin, Clock, Phone, ChevronRight } from 'lucide-react';
import { SALON_DATA } from '../../data/salonData';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  time: string;
  action?: string;
  whatsappPrefill?: string;
}

interface EleganceAIWidgetProps {
  onOpenBooking: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const EleganceAIWidget: React.FC<EleganceAIWidgetProps> = ({
  onOpenBooking,
  isOpen,
  onToggle
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: "Welcome to Elegance Saloon! ✨ I am Elegance AI, your virtual receptionist. How may I elevate your experience today?",
      time: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Lock body scroll on small screens when chat is open
      if (window.innerWidth < 640) {
        document.body.style.overflow = 'hidden';
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [messages, isOpen]);

  const quickOptions = [
    { label: 'Explore Services', action: 'services', icon: <Sparkles className="w-3 h-3 text-[#D4AF37]" /> },
    { label: 'Check Prices', action: 'pricing', icon: <Sparkles className="w-3 h-3 text-[#D4AF37]" /> },
    { label: 'Book Appointment', action: 'book', icon: <Calendar className="w-3 h-3 text-[#D4AF37]" /> },
    { label: 'Opening Hours', action: 'hours', icon: <Clock className="w-3 h-3 text-[#D4AF37]" /> },
    { label: 'Location & Map', action: 'location', icon: <MapPin className="w-3 h-3 text-[#D4AF37]" /> },
    { label: 'Talk to Human Staff', action: 'human', icon: <Phone className="w-3 h-3 text-[#D4AF37]" /> },
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      if (response.ok) {
        const data = await response.json();
        const aiMsg: Message = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: data.text,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          action: data.action,
          whatsappPrefill: data.whatsappPrefill
        };
        setMessages((prev) => [...prev, aiMsg]);
        if (data.action === 'OPEN_BOOKING_MODAL') {
          setTimeout(() => onOpenBooking(), 1200);
        }
      } else {
        throw new Error('API offline');
      }
    } catch {
      setTimeout(() => {
        const fallbackReply = generateClientFallbackReply(text);
        const aiMsg: Message = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: fallbackReply.text,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          action: fallbackReply.action
        };
        setMessages((prev) => [...prev, aiMsg]);
        if (fallbackReply.action === 'OPEN_BOOKING_MODAL') {
          setTimeout(() => onOpenBooking(), 1200);
        }
      }, 500);
    } finally {
      setIsTyping(false);
    }
  };

  const generateClientFallbackReply = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes('book') || lower.includes('appointment') || lower.includes('slot')) {
      return {
        text: "I would be delighted to arrange your visit! Opening our private appointment scheduler for you now...",
        action: 'OPEN_BOOKING_MODAL'
      };
    }
    if (lower.includes('service') || lower.includes('treatment')) {
      return {
        text: "We offer 4 luxury ateliers:\n1. Hair Architecture (Balayage, Keratin, Precision Cuts)\n2. Skin Alchemy (Hydra Radiance, 24K Gold Cellular)\n3. Gentlemen's Royal Grooming (Hot Towel Shave)\n4. Haute Bridal & Makeover.",
        action: 'SERVICES'
      };
    }
    if (lower.includes('price') || lower.includes('cost') || lower.includes('rate')) {
      return {
        text: "Verified base rates:\n• Bespoke Hair Cut: From ₹1,200\n• Couture Balayage: From ₹4,500\n• Royal Keratin & Botox: From ₹5,500\n• Hydra Radiance Facial: From ₹2,800\n• 24K Gold Facial: From ₹4,200\n• Royal Hot Towel Shave: From ₹800\n• Haute Bridal Makeover: From ₹18,000.",
        action: 'PRICING'
      };
    }
    if (lower.includes('hour') || lower.includes('time') || lower.includes('open')) {
      return {
        text: `We are open 7 days a week:\n${SALON_DATA.hours.days}: ${SALON_DATA.hours.time}.\nEarly VIP sessions available by appointment.`,
        action: 'HOURS'
      };
    }
    if (lower.includes('where') || lower.includes('location') || lower.includes('address')) {
      return {
        text: `We are located at ${SALON_DATA.address}, Hyderabad. Valet parking is available for all guests.`,
        action: 'LOCATION'
      };
    }
    return {
      text: "Thank you for reaching out to Elegance Saloon! How can I assist you with services, rates, or booking your appointment today?",
      action: 'GENERAL'
    };
  };

  const handleQuickOptionClick = (action: string) => {
    if (action === 'book') {
      onOpenBooking();
      return;
    }
    if (action === 'services') handleSendMessage('What services do you offer?');
    if (action === 'pricing') handleSendMessage('Can I see the verified prices?');
    if (action === 'hours') handleSendMessage('What are your opening hours?');
    if (action === 'location') handleSendMessage('Where is Elegance Saloon located?');
    if (action === 'human') handleSendMessage('I would like to speak with a human staff member');
  };

  return (
    <>
      {/* Floating Concierge Badge */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center gap-3">
        {!isOpen && (
          <div className="hidden md:flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0D0D14]/90 border border-[#D4AF37]/35 backdrop-blur-md shadow-xl text-xs text-[#FBF9F5] animate-in fade-in slide-in-from-right-4 duration-500">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[#D4AF37] font-medium">Elegance AI:</span>
            <span>Virtual Receptionist Online</span>
          </div>
        )}

        <button
          onClick={onToggle}
          className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#070709] via-[#14141E] to-[#070709] border-2 border-[#D4AF37] shadow-[0_0_25px_rgba(212,175,55,0.35)] flex items-center justify-center text-[#D4AF37] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group"
          aria-label="Toggle Elegance AI Assistant"
        >
          {isOpen ? (
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-[#EFECE6]" />
          ) : (
            <>
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4AF37] group-hover:rotate-12 transition-transform" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#070709]" />
            </>
          )}
        </button>
      </div>

      {/* Interactive Chat Window: Mobile Bottom Sheet & Desktop Card */}
      {isOpen && (
        <div className="fixed inset-x-0 bottom-0 sm:bottom-24 sm:right-6 sm:inset-x-auto z-50 w-full sm:w-[420px] h-[90svh] sm:h-[600px] rounded-t-3xl sm:rounded-3xl bg-[#0D0D14]/98 backdrop-blur-2xl border-t sm:border border-[#D4AF37]/35 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-300">
          {/* Mobile Drag Indicator Bar */}
          <div className="sm:hidden pt-3 pb-1 flex justify-center">
            <div className="w-12 h-1 rounded-full bg-white/20" />
          </div>

          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#23232E] bg-gradient-to-r from-[#14141E] to-[#0D0D14] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#D4AF37]/50 bg-[#070709] flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#070709]" />
              </div>
              <div>
                <h3 className="font-serif text-base sm:text-lg text-[#FBF9F5] leading-none mb-1">
                  Elegance AI
                </h3>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#D4AF37] block">
                  Virtual Concierge • Multilingual
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`https://wa.me/${SALON_DATA.whatsappNumber}?text=${encodeURIComponent(SALON_DATA.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-900/50 transition-colors"
                title="Open WhatsApp Direct"
              >
                <MessageCircle className="w-4 h-4" />
              </a>

              <button
                onClick={onToggle}
                className="sm:hidden p-2 text-[#EFECE6]/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Action Pills with touch scroll */}
          <div className="p-2.5 sm:p-3 bg-[#0A0A0F] border-b border-[#1E1E26] overflow-x-auto flex items-center gap-2 scrollbar-none shrink-0 overflow-touch">
            {quickOptions.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleQuickOptionClick(opt.action)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] bg-[#14141E] hover:bg-[#D4AF37]/20 border border-white/5 hover:border-[#D4AF37]/40 text-[#EFECE6]/80 hover:text-[#F3E5AB] transition-colors whitespace-nowrap cursor-pointer active:scale-95"
              >
                {opt.icon}
                <span>{opt.label}</span>
              </button>
            ))}
          </div>

          {/* Messages Container with Momentum Scrolling */}
          <div className="flex-1 p-4 overflow-y-auto overflow-touch space-y-3.5">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] sm:max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#070709] font-medium rounded-br-xs'
                      : 'bg-[#14141E] text-[#EFECE6] border border-[#23232E] rounded-bl-xs'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[9px] text-[#EFECE6]/40 mt-1 px-1">{msg.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#14141E] border border-[#23232E] w-24">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Direct WhatsApp Callout Banner */}
          <div className="px-4 py-2 bg-[#09090D] border-t border-[#1E1E26] flex items-center justify-between text-[11px] shrink-0">
            <span className="text-[#EFECE6]/60">Prefer WhatsApp directly?</span>
            <a
              href={`https://wa.me/${SALON_DATA.whatsappNumber}?text=${encodeURIComponent(SALON_DATA.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline font-medium flex items-center gap-1"
            >
              <span>Message on WhatsApp</span>
              <ChevronRight className="w-3 h-3" />
            </a>
          </div>

          {/* Input Box with Safe-Area padding for iOS home indicator */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 border-t border-[#23232E] bg-[#0E0E14] flex items-center gap-2 shrink-0 pb-safe"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything in English or Hindi..."
              className="flex-1 px-4 py-2.5 rounded-full bg-[#14141E] border border-[#23232E] focus:border-[#D4AF37] text-base sm:text-xs text-[#EFECE6] focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 sm:p-2.5 min-w-[42px] min-h-[42px] flex items-center justify-center rounded-full bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#C5A059] text-[#070709] disabled:opacity-40 transition-all cursor-pointer active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
