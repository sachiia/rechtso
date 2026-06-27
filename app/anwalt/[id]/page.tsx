"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { supabase } from '@/lib/supabase';

type Lawyer = {
  id: string;
  display_name: string;
  city: string;
  law_firm: string | null;
  rak_number: string;
  avatar_color: string | null;
  avatar_url: string | null;
};

const AVATAR_COLORS = [
  "#14B8A6","#3B82F6","#8B5CF6","#F43F5E","#F59E0B","#10B981",
];

function getAvatarHex(lawyer: Lawyer) {
  if (lawyer.avatar_color) return lawyer.avatar_color;
  const idx = (lawyer.display_name?.charCodeAt(0) || 0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[idx];
}

function VerifiedBadge({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="11" fill="#1D9BF0"/>
      <path d="M6.5 11.5L9.5 14.5L15.5 8" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function LawyerProfilePage() {
  const params = useParams<{ id: string }>();
  const [lawyer, setLawyer] = useState<Lawyer | null>(null);
  const [loading, setLoading] = useState(true);
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    if (!params?.id) return;
    async function fetchLawyer() {
      const { data } = await supabase
        .from('profiles')
        .select('id, display_name, city, law_firm, rak_number, avatar_color, avatar_url')
        .eq('id', params.id)
        .eq('role', 'lawyer')
        .single();
      if (data) setLawyer(data);
      setLoading(false);
    }
    fetchLawyer();
  }, [params?.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#0F2444] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!lawyer) {
    return (
      <div className="min-h-screen bg-[#f0f2f5] flex flex-col items-center justify-center gap-4">
        <div className="text-4xl">⚖️</div>
        <div className="font-bold text-[#0F2444] text-xl">Anwalt nicht gefunden</div>
        <a href="/anwalt" className="text-[#0F2444] underline text-sm">Zurück zum Verzeichnis</a>
      </div>
    );
  }

  const initials = (lawyer.display_name || 'A').slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-[#f0f2f5] font-sans">
      {/* NAV */}
      <nav className="bg-[#0F2444] px-8 py-4 flex items-center gap-5 sticky top-0 z-20 shadow-lg">
        <a href="/" className="font-black text-2xl tracking-tight flex-shrink-0">
          <span className="text-white">Recht</span><span className="text-[#F59E0B]">So</span>
        </a>
        <a href="/anwalt" className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium transition">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
          </svg>
          Anwaltsverzeichnis
        </a>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-10">
        {/* PROFILE CARD */}
        <div className="bg-[#0F2444] rounded-3xl p-8 mb-6 text-white">
          <div className="flex items-center gap-6">
            {/* Avatar */}
            {lawyer.avatar_url ? (
              <img src={lawyer.avatar_url} alt={initials}
                className="w-24 h-24 rounded-2xl object-cover flex-shrink-0 ring-4 ring-white/10" />
            ) : (
              <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-white text-3xl font-black flex-shrink-0 ring-4 ring-white/10"
                style={{ backgroundColor: getAvatarHex(lawyer) }}>
                {initials}
              </div>
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="font-black text-2xl text-white">{lawyer.display_name}</h1>
                <VerifiedBadge size={22} />
              </div>
              {lawyer.law_firm && (
                <div className="text-white/60 text-base mb-1">{lawyer.law_firm}</div>
              )}
              <div className="flex items-center gap-1.5 text-white/50 text-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                {lawyer.city}
              </div>
            </div>
          </div>
        </div>

        {/* DETAILS */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-4 shadow-sm">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Angaben</div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <VerifiedBadge size={18} />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">RAK-Nummer</div>
                <div className="font-bold text-[#0F2444]">{lawyer.rak_number}</div>
              </div>
              <span className="ml-auto text-xs font-bold text-teal-600 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-lg flex items-center gap-1">
                <VerifiedBadge size={12} />Verifiziert
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0 text-slate-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">Standort</div>
                <div className="font-bold text-[#0F2444]">{lawyer.city}</div>
              </div>
            </div>
            {lawyer.law_firm && (
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0 text-slate-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Kanzlei</div>
                  <div className="font-bold text-[#0F2444]">{lawyer.law_firm}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* DISCLAIMER */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800 flex items-start gap-2">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 mt-0.5">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          RechtSo vermittelt keine Rechtsgespräche. Die Kontaktaufnahme findet außerhalb der Plattform statt.
        </div>

        {/* CONTACT BUTTON */}
        <button onClick={() => setShowContact(true)}
          className="w-full bg-[#0F2444] text-white font-black text-lg py-4 rounded-2xl hover:bg-[#1a3a6b] transition flex items-center justify-center gap-3 shadow-lg">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
          </svg>
          Kontakt anfragen
        </button>

        <a href="/feed" className="block text-center text-slate-400 text-sm mt-4 hover:text-slate-600 transition">
          Zurück zum Rechtsfragen-Feed
        </a>
      </div>

      {/* CONTACT MODAL */}
      {showContact && (
        <div className="fixed inset-0 bg-[#0F2444]/70 z-40 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 text-center shadow-2xl">
            <div className="w-16 h-16 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#14B8A6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
              </svg>
            </div>
            <div className="font-black text-[#0F2444] text-xl mb-2">Kontaktanfrage gesendet</div>
            <p className="text-slate-500 text-sm leading-relaxed mb-2">
              <strong className="text-[#0F2444]">{lawyer.display_name}</strong> wurde benachrichtigt.
            </p>
            <p className="text-slate-400 text-xs leading-relaxed mb-6">
              Die weitere Kommunikation findet vollständig außerhalb von RechtSo statt. RechtSo speichert oder vermittelt keine Rechtsgespräche.
            </p>
            <button onClick={() => setShowContact(false)}
              className="w-full py-3.5 bg-[#0F2444] text-white font-black rounded-xl hover:bg-[#1a3a6b] transition">
              Verstanden
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
