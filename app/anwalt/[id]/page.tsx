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
  phone_number: string | null;
  contact_email: string | null;
  address: string | null;
  specialties: string[] | null;
  bio: string | null;
  slug: string | null;
};

const AVATAR_COLORS = ["#14B8A6","#3B82F6","#8B5CF6","#F43F5E","#F59E0B","#10B981"];

function getAvatarHex(lawyer: Lawyer) {
  if (lawyer.avatar_color) return lawyer.avatar_color;
  return AVATAR_COLORS[(lawyer.display_name?.charCodeAt(0) || 0) % AVATAR_COLORS.length];
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
    const identifier = params?.id;
    if (!identifier) return;
    async function fetchLawyer() {
      // Support both old UUID routes and new slug routes
      const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(identifier);
      const col = isUUID ? 'id' : 'slug';
      const { data } = await supabase
        .from('profiles')
        .select('id, display_name, city, law_firm, rak_number, avatar_color, avatar_url, phone_number, contact_email, address, specialties, bio, slug')
        .eq(col, identifier)
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
  const hasContact = lawyer.phone_number || lawyer.contact_email || lawyer.address;

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

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-4">

        {/* HEADER CARD */}
        <div className="bg-[#0F2444] rounded-3xl p-8 text-white">
          <div className="flex items-center gap-6">
            {lawyer.avatar_url ? (
              <img src={lawyer.avatar_url} alt={initials}
                className="w-24 h-24 rounded-2xl object-cover flex-shrink-0 ring-4 ring-white/10" />
            ) : (
              <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-white text-3xl font-black flex-shrink-0 ring-4 ring-white/10"
                style={{ backgroundColor: getAvatarHex(lawyer) }}>
                {initials}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h1 className="font-black text-2xl text-white leading-tight">{lawyer.display_name}</h1>
                <VerifiedBadge size={22} />
              </div>
              <div className="flex items-center gap-1.5 text-white/60 text-sm mb-3">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                {lawyer.city}
                {lawyer.law_firm && <><span className="text-white/30">·</span><span>{lawyer.law_firm}</span></>}
              </div>
              {/* Specialties */}
              {lawyer.specialties && lawyer.specialties.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {lawyer.specialties.map(s => (
                    <span key={s} className="text-xs font-bold px-2.5 py-1 rounded-lg bg-white/10 text-white/80">
                      {s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CONTACT CARD */}
        {hasContact && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Kontakt</div>
            <div className="space-y-3">
              {lawyer.phone_number && (
                <a href={`tel:${lawyer.phone_number}`}
                  className="flex items-center gap-3 group hover:bg-slate-50 rounded-xl p-2 -mx-2 transition">
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Telefon</div>
                    <div className="font-bold text-[#0F2444] group-hover:underline">{lawyer.phone_number}</div>
                  </div>
                  <svg className="ml-auto text-slate-300 group-hover:text-green-500 transition" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </a>
              )}
              {lawyer.contact_email && (
                <a href={`mailto:${lawyer.contact_email}`}
                  className="flex items-center gap-3 group hover:bg-slate-50 rounded-xl p-2 -mx-2 transition">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-slate-400 font-medium">E-Mail</div>
                    <div className="font-bold text-[#0F2444] truncate group-hover:underline">{lawyer.contact_email}</div>
                  </div>
                  <svg className="ml-auto flex-shrink-0 text-slate-300 group-hover:text-blue-500 transition" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </a>
              )}
              {lawyer.address && (
                <a href={`https://maps.google.com/?q=${encodeURIComponent(lawyer.address + ', ' + lawyer.city)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 group hover:bg-slate-50 rounded-xl p-2 -mx-2 transition">
                  <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Adresse</div>
                    <div className="font-bold text-[#0F2444] group-hover:underline">{lawyer.address}, {lawyer.city}</div>
                  </div>
                  <svg className="ml-auto text-slate-300 group-hover:text-amber-500 transition" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </a>
              )}
            </div>
          </div>
        )}

        {/* BIO */}
        {lawyer.bio && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Über mich</div>
            <p className="text-slate-600 text-sm leading-relaxed">{lawyer.bio}</p>
          </div>
        )}

        {/* PROFESSIONAL DETAILS */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Angaben</div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <VerifiedBadge size={18} />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">RAK-Nummer</div>
                <div className="font-bold text-[#0F2444]">{lawyer.rak_number}</div>
              </div>
              <span className="ml-auto text-xs font-bold text-teal-600 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-lg flex items-center gap-1 flex-shrink-0">
                <VerifiedBadge size={12} />Verifiziert
              </span>
            </div>
            {lawyer.law_firm && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0 text-slate-400">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Kanzlei</div>
                  <div className="font-bold text-[#0F2444]">{lawyer.law_firm}</div>
                </div>
              </div>
            )}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0 text-slate-400">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium">Standort</div>
                <div className="font-bold text-[#0F2444]">{lawyer.city}</div>
              </div>
            </div>
          </div>
        </div>

        {/* DISCLAIMER */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 flex items-start gap-2">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 mt-0.5">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          RechtSo vermittelt keine Rechtsgespräche. Die Kontaktaufnahme findet außerhalb der Plattform statt.
        </div>

        {/* CTA */}
        <button onClick={() => setShowContact(true)}
          className="w-full bg-[#0F2444] text-white font-black text-lg py-4 rounded-2xl hover:bg-[#1a3a6b] transition flex items-center justify-center gap-3 shadow-lg">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
          </svg>
          Kontakt aufnehmen
        </button>

        <a href="/feed" className="block text-center text-slate-400 text-sm hover:text-slate-600 transition pb-4">
          Zurück zum Rechtsfragen-Feed
        </a>
      </div>

      {/* CONTACT MODAL */}
      {showContact && (
        <div className="fixed inset-0 bg-[#0F2444]/70 z-40 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl">
            <div className="font-black text-[#0F2444] text-xl mb-1">Kontakt aufnehmen</div>
            <p className="text-slate-400 text-sm mb-6">Wählen Sie Ihre bevorzugte Kontaktmethode.</p>
            <div className="space-y-3">
              {lawyer.phone_number && (
                <a href={`tel:${lawyer.phone_number}`}
                  className="flex items-center gap-4 bg-green-50 border border-green-200 rounded-2xl p-4 hover:bg-green-100 transition group">
                  <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-green-600 uppercase tracking-widest mb-0.5">Anrufen</div>
                    <div className="font-bold text-[#0F2444]">{lawyer.phone_number}</div>
                  </div>
                </a>
              )}
              {lawyer.contact_email && (
                <a href={`mailto:${lawyer.contact_email}?subject=Kontaktanfrage über RechtSo`}
                  className="flex items-center gap-4 bg-blue-50 border border-blue-200 rounded-2xl p-4 hover:bg-blue-100 transition group">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-0.5">E-Mail schreiben</div>
                    <div className="font-bold text-[#0F2444] truncate">{lawyer.contact_email}</div>
                  </div>
                </a>
              )}
              {!hasContact && (
                <div className="text-center py-6 text-slate-400 text-sm">
                  Dieser Anwalt hat noch keine Kontaktdaten hinterlegt.
                </div>
              )}
            </div>
            <div className="mt-4 bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-700">
              RechtSo ist nur ein Verzeichnis. Rechtsgespräche finden ausschließlich direkt zwischen Ihnen und dem Anwalt statt.
            </div>
            <button onClick={() => setShowContact(false)}
              className="w-full mt-4 py-3.5 border-2 border-slate-200 text-slate-500 font-bold rounded-xl hover:bg-slate-50 transition text-sm">
              Schließen
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
