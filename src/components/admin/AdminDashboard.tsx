import React, { useState, useEffect } from 'react';
import { X, Shield, Lock, CheckCircle2, Clock, XCircle, Search, RefreshCw, MessageCircle, Trash2 } from 'lucide-react';

interface Appointment {
  id: string;
  customerName: string;
  service: string;
  date: string;
  time: string;
  phone: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
  source?: string;
  createdAt?: string;
}

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && isAuthenticated) {
      fetchAppointments();
    }
  }, [isOpen, isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234') {
      setIsAuthenticated(true);
      setPinError(false);
      fetchAppointments();
    } else {
      setPinError(true);
    }
  };

  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/appointments');
      if (res.ok) {
        const data = await res.json();
        setAppointments(data.appointments || []);
      } else {
        throw new Error('API offline');
      }
    } catch {
      // Seeded fallback list
      setAppointments([
        {
          id: "APT-1001",
          customerName: "Ayesha Khan",
          service: "Couture Balayage & French Glossing",
          date: "2026-11-20",
          time: "02:30 PM",
          phone: "+91 98490 11223",
          source: "WhatsApp Assistant",
          status: "confirmed",
          notes: "First time client, requested consultation with Master Colorist."
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
          notes: "Executive grooming appointment before media event."
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
          notes: "Sensitive skin, prefers organic botanical serum."
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: 'pending' | 'confirmed' | 'cancelled') => {
    try {
      await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch {
      // optimistic update
    }
    setAppointments(prev =>
      prev.map(apt => (apt.id === id ? { ...apt, status: newStatus } : apt))
    );
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this appointment?')) return;
    try {
      await fetch(`/api/appointments/${id}`, { method: 'DELETE' });
    } catch {
      // optimistic update
    }
    setAppointments(prev => prev.filter(apt => apt.id !== id));
  };

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch =
      apt.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.phone.includes(searchQuery) ||
      apt.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCount = appointments.length;
  const pendingCount = appointments.filter(a => a.status === 'pending').length;
  const confirmedCount = appointments.filter(a => a.status === 'confirmed').length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-end sm:items-center justify-center p-0 sm:p-6 animate-in fade-in duration-300">
      <div className="relative max-w-5xl w-full bg-[#0D0D14] border-t sm:border border-[#D4AF37]/40 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[94svh] sm:h-auto sm:max-h-[90vh]">
        {/* Top Bar */}
        <div className="p-4 sm:p-6 border-b border-[#23232E] bg-[#14141E] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#D4AF37]/50 flex items-center justify-center bg-[#070709] text-[#D4AF37] shrink-0">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-2xl text-[#FBF9F5] leading-none mb-1">
                Elegance Saloon Staff Portal
              </h3>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-[#D4AF37]">
                Live Appointment & WhatsApp Concierge
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full bg-white/5 text-[#EFECE6]/70 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Gate */}
        {!isAuthenticated ? (
          <div className="p-6 sm:p-12 max-w-md mx-auto text-center flex flex-col items-center my-auto pb-safe">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#14141E] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] mb-5 sm:mb-6">
              <Lock className="w-7 h-7 sm:w-8 sm:h-8" />
            </div>
            <h4 className="font-serif text-xl sm:text-2xl text-[#FBF9F5] mb-2">
              Salon Staff Authentication
            </h4>
            <p className="text-xs text-[#EFECE6]/60 leading-relaxed mb-6">
              Enter authorized salon administration PIN to view incoming customer requests and WhatsApp logs.
            </p>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <input
                type="password"
                maxLength={8}
                placeholder="Staff PIN (Default: 1234)"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full px-4 py-3 text-center text-lg tracking-widest rounded-xl bg-[#14141E] border border-[#23232E] focus:border-[#D4AF37] text-white focus:outline-none"
              />

              {pinError && (
                <span className="text-xs text-rose-400 block">
                  Invalid PIN. Please try again.
                </span>
              )}

              <button
                type="submit"
                className="w-full py-3.5 sm:py-4 rounded-xl text-xs font-semibold uppercase tracking-widest text-[#070709] bg-gradient-to-r from-[#F3E5AB] via-[#D4AF37] to-[#C5A059] hover:brightness-110 cursor-pointer transition-all active:scale-[0.98]"
              >
                Access Concierge Desk
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard View */
          <div className="flex-1 overflow-y-auto overflow-touch p-4 sm:p-8 flex flex-col pb-safe">
            {/* Metric Counters */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 mb-5 sm:mb-6 shrink-0">
              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#14141E] border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div>
                  <span className="text-[8px] sm:text-[10px] uppercase tracking-wider text-[#EFECE6]/50 block">Total</span>
                  <span className="font-serif text-xl sm:text-3xl font-bold text-white">{totalCount}</span>
                </div>
                <div className="hidden sm:block p-3 rounded-xl bg-white/5 text-[#D4AF37]">
                  <Clock className="w-5 h-5" />
                </div>
              </div>

              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#14141E] border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div>
                  <span className="text-[8px] sm:text-[10px] uppercase tracking-wider text-amber-400/70 block">Pending</span>
                  <span className="font-serif text-xl sm:text-3xl font-bold text-amber-400">{pendingCount}</span>
                </div>
                <div className="hidden sm:block p-3 rounded-xl bg-amber-500/10 text-amber-400">
                  <Clock className="w-5 h-5" />
                </div>
              </div>

              <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#14141E] border border-emerald-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div>
                  <span className="text-[8px] sm:text-[10px] uppercase tracking-wider text-emerald-400/70 block">Confirmed</span>
                  <span className="font-serif text-xl sm:text-3xl font-bold text-emerald-400">{confirmedCount}</span>
                </div>
                <div className="hidden sm:block p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-5 shrink-0">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#D4AF37]" />
                <input
                  type="text"
                  placeholder="Search guest or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#14141E] border border-[#23232E] focus:border-[#D4AF37] text-base sm:text-xs text-white focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {['all', 'pending', 'confirmed', 'cancelled'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setStatusFilter(tab)}
                    className={`px-3 py-1.5 rounded-lg text-xs uppercase tracking-wider capitalize whitespace-nowrap transition-colors ${
                      statusFilter === tab
                        ? 'bg-[#D4AF37] text-[#070709] font-semibold'
                        : 'bg-[#14141E] text-[#EFECE6]/60 hover:text-white'
                    }`}
                  >
                    {tab}
                  </button>
                ))}

                <button
                  onClick={fetchAppointments}
                  className="p-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg bg-[#14141E] text-[#EFECE6]/70 hover:text-[#D4AF37] transition-colors shrink-0"
                  title="Refresh Appointments"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Mobile View: Luxury Touch Cards */}
            <div className="md:hidden space-y-3 flex-1 overflow-y-auto">
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((apt) => {
                  const customerConfirmText = `Hello ${apt.customerName}, Greetings from Elegance Saloon! Your appointment for ${apt.service} on ${apt.date} at ${apt.time} is CONFIRMED. We look forward to welcoming you!`;
                  const customerWhatsAppUrl = `https://wa.me/${apt.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(customerConfirmText)}`;

                  return (
                    <div
                      key={apt.id}
                      className="p-4 rounded-2xl bg-[#101018] border border-[#23232E] flex flex-col justify-between gap-3"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono text-xs font-semibold text-[#D4AF37]">{apt.id}</span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[9px] uppercase font-bold tracking-wider ${
                                apt.status === 'confirmed'
                                  ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-500/30'
                                  : apt.status === 'pending'
                                  ? 'bg-amber-950/70 text-amber-400 border border-amber-500/30'
                                  : 'bg-rose-950/70 text-rose-400 border border-rose-500/30'
                              }`}
                            >
                              {apt.status}
                            </span>
                          </div>
                          <h4 className="font-semibold text-white text-sm">{apt.customerName}</h4>
                          <span className="text-xs text-[#EFECE6]/50 font-mono">{apt.phone}</span>
                        </div>

                        <div className="text-right">
                          <span className="text-xs text-[#F3E5AB] font-medium block">{apt.date}</span>
                          <span className="text-[11px] text-[#D4AF37] block">{apt.time}</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/5">
                        <span className="text-xs text-[#EFECE6]/90 block mb-1">{apt.service}</span>
                        {apt.notes && (
                          <span className="text-[11px] text-[#EFECE6]/50 italic block mb-2">{apt.notes}</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <a
                          href={customerWhatsAppUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 px-3 rounded-xl bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 flex items-center justify-center gap-1.5 text-xs font-medium"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                          <span>WhatsApp Confirm</span>
                        </a>

                        <div className="flex items-center gap-1">
                          {apt.status !== 'confirmed' && (
                            <button
                              onClick={() => handleUpdateStatus(apt.id, 'confirmed')}
                              className="p-2 rounded-xl bg-emerald-950/50 text-emerald-400"
                              title="Mark Confirmed"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                          )}
                          {apt.status !== 'cancelled' && (
                            <button
                              onClick={() => handleUpdateStatus(apt.id, 'cancelled')}
                              className="p-2 rounded-xl bg-rose-950/50 text-rose-400"
                              title="Mark Cancelled"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(apt.id)}
                            className="p-2 rounded-xl bg-white/5 text-[#EFECE6]/40 hover:text-rose-400"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center text-[#EFECE6]/40 text-xs">
                  No appointments found.
                </div>
              )}
            </div>

            {/* Desktop View: Full Table */}
            <div className="hidden md:block flex-1 border border-[#23232E] rounded-2xl overflow-x-auto bg-[#101018]">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#14141E] text-[#D4AF37] uppercase tracking-widest text-[10px] border-b border-[#23232E]">
                  <tr>
                    <th className="p-4">ID & Guest</th>
                    <th className="p-4">Service</th>
                    <th className="p-4">Date & Time</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">WhatsApp Contact</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E1E26]">
                  {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((apt) => {
                      const customerConfirmText = `Hello ${apt.customerName}, Greetings from Elegance Saloon! Your appointment for ${apt.service} on ${apt.date} at ${apt.time} is CONFIRMED. We look forward to welcoming you!`;
                      const customerWhatsAppUrl = `https://wa.me/${apt.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(customerConfirmText)}`;

                      return (
                        <tr key={apt.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="p-4">
                            <span className="font-mono text-[#D4AF37] block font-semibold">{apt.id}</span>
                            <span className="text-white font-medium block">{apt.customerName}</span>
                            <span className="text-[10px] text-[#EFECE6]/40 block">{apt.phone}</span>
                          </td>
                          <td className="p-4">
                            <span className="text-[#F3E5AB] block font-medium">{apt.service}</span>
                            {apt.notes && (
                              <span className="text-[10px] text-[#EFECE6]/60 line-clamp-1 italic">{apt.notes}</span>
                            )}
                          </td>
                          <td className="p-4">
                            <span className="text-white block font-medium">{apt.date}</span>
                            <span className="text-[10px] text-[#D4AF37] block">{apt.time}</span>
                          </td>
                          <td className="p-4">
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] uppercase font-semibold tracking-wider ${
                                apt.status === 'confirmed'
                                  ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                                  : apt.status === 'pending'
                                  ? 'bg-amber-950/60 text-amber-400 border border-amber-500/30'
                                  : 'bg-rose-950/60 text-rose-400 border border-rose-500/30'
                              }`}
                            >
                              {apt.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <a
                              href={customerWhatsAppUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/60 transition-colors text-[11px]"
                            >
                              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                              <span>WhatsApp Confirm</span>
                            </a>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              {apt.status !== 'confirmed' && (
                                <button
                                  onClick={() => handleUpdateStatus(apt.id, 'confirmed')}
                                  className="p-1.5 rounded-md bg-emerald-950/40 text-emerald-400 hover:bg-emerald-900/60"
                                  title="Mark Confirmed"
                                >
                                  <CheckCircle2 className="w-4 h-4" />
                                </button>
                              )}
                              {apt.status !== 'cancelled' && (
                                <button
                                  onClick={() => handleUpdateStatus(apt.id, 'cancelled')}
                                  className="p-1.5 rounded-md bg-rose-950/40 text-rose-400 hover:bg-rose-900/60"
                                  title="Mark Cancelled"
                                >
                                  <XCircle className="w-4 h-4" />
                                </button>
                              )}
                              <button
                                onClick={() => handleDelete(apt.id)}
                                className="p-1.5 rounded-md bg-white/5 text-[#EFECE6]/40 hover:text-rose-400"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-[#EFECE6]/40">
                        No appointments found matching this criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
