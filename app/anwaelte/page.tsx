"use client";
import React, { useState, useEffect } from "react";
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

function Avatar({ lawyer, size = 56 }: { lawyer: Lawyer; size?: number }) {
  const initials = (lawyer.display_name || 'A').slice(0, 2).toUpperCase();
  if (lawyer.avatar_url) {
    return (
      <img src={lawyer.avatar_url} alt={initials}
        className="rounded-xl object-cover flex-shrink-0"
        style={{ width: size, height: size }} />
    );
  }
  return (
    <div className="rounded-xl flex items-center justify-center text-white font-black flex-shrink-0"
      style={{ width: size, height: size, backgroundColor: getAvatarHex(lawyer), fontSize: size * 0.3 }}>
      {initials}
    </div>
  );
}

function VerifiedBadge({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="11" fill="#1D9BF0"/>
      <path d="M6.5 11.5L9.5 14.5L15.5 8" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export default function AnwaeltePage() {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [cityFilter, setCityFilter] = useState("Alle");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchLawyers() {
      const { data } = await supabase
        .from('profiles')
        .select('id, display_name, city, law_firm, rak_number, avatar_color, avatar_url')
        .eq('role', 'lawyer')
        .not('display_name', 'is', null)
        .order('display_name');
      if (data) setLawyers(data);
      setLoading(false);
    }
    fetchLawyers();
  }, []);

  const cities = ["Alle", ...Array.from(new Set(lawyers.map(l => l.city).filter(Boolean))).sort()];

  const filtered = lawyers.filter(l => {
    const matchCity = cityFilter === "Alle" || l.city === cityFilter;
    const matchSearch = !search || l.display_name?.toLowerCase().includes(search.toLowerCase()) ||
      l.law_firm?.toLowerCase().includes(search.toLowerCase());
    return matchCity && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#f0f2f5] font-sans">
      {/* NAV */}
      <nav className="bg-[#0F2444] px-8 py-4 flex items-center gap-5 sticky top-0 z-20 shadow-lg">
        <a href="/" className="font-black text-2xl tracking-tight flex-shrink-0">
          <span className="text-white">Recht</span><span className="text-[#F59E0B]">So</span>
        </a>
        <div className="flex-1 relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input value={search} onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-2.5 text-white text-base placeholder-white/40 outline-none focus:bg-white/20 transition"
            placeholder="Name oder Kanzlei suchen..." />
        </div>
        <a href="/feed" className="text-white/60 text-sm font-medium hover:text-white transition hidden sm:block">Feed</a>
        <a href="/pro" className="bg-[#F59E0B] text-[#0F2444] font-black text-sm px-4 py-2.5 rounded-xl hover:bg-amber-400 transition flex-shrink-0">
          Als Anwalt registrieren
        </a>
      </nav>

      {/* HERO */}
      <div className="bg-[#0F2444] px-8 py-10">
        <h1 className="text-white font-black text-3xl mb-1">Anwaltsverzeichnis</h1>
        <p className="text-white/50 text-base">Verifizierte Rechtsanwälte auf RechtSo · {lawyers.length} Einträge</p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6">
        {/* CITY FILTER */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6">
          {cities.map(city => (
            <button key={city} onClick={() => setCityFilter(city)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap border flex-shrink-0 transition ${cityFilter === city ? "bg-[#0F2444] text-white border-[#0F2444]" : "bg-white text-slate-500 border-slate-200 hover:border-[#0F2444]"}`}>
              {city}
              {city !== "Alle" && (
                <span className="ml-1.5 text-xs opacity-60">
                  ({lawyers.filter(l => l.city === city).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* RESULTS COUNT */}
        <div className="text-sm text-slate-400 font-medium mb-4">
          {filtered.length} {filtered.length === 1 ? 'Anwalt' : 'Anwälte'} gefunden
          {cityFilter !== "Alle" && ` in ${cityFilter}`}
        </div>

        {/* GRID */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 animate-pulse h-44" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center">
            <div className="text-4xl mb-3">⚖️</div>
            <div className="font-bold text-slate-600 text-lg">Keine Anwälte gefunden</div>
            <div className="text-slate-400 text-sm mt-1">Versuche eine andere Stadt oder Suche.</div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(lawyer => (
              <a key={lawyer.id} href={`/anwaelte/${lawyer.id}`}
                className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 group block">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar lawyer={lawyer} size={56} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="font-bold text-[#0F2444] text-base truncate">{lawyer.display_name}</span>
                      <VerifiedBadge size={16} />
                    </div>
                    {lawyer.law_firm && (
                      <div className="text-sm text-slate-500 truncate">{lawyer.law_firm}</div>
                    )}
                    <div className="flex items-center gap-1 mt-1 text-slate-400 text-sm">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                      {lawyer.city}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-teal-600 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-lg">
                    <VerifiedBadge size={12} />RAK verifiziert
                  </span>
                  <span className="text-sm font-bold text-[#0F2444] group-hover:underline">
                    Profil ansehen →
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
