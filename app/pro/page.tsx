"use client";
import { useState } from "react";

const leads = [
  {
    id: 1,
    urgency: "DRINGEND",
    urgencyColor: "text-red-600",
    borderColor: "border-l-red-500",
    dot: "🔴",
    category: "Verkehrsrecht",
    handle: "Fahrer_9901",
    city: "München",
    time: "vor 8 Min.",
    text: "Bußgeldbescheid €560 + Fahrverbot 1 Monat + 2 Punkte Flensburg. Geschwindigkeitsmessung mit älterer Anlage — Einspruch sinnvoll?",
  },
  {
    id: 2,
    urgency: "MITTEL",
    urgencyColor: "text-amber-600",
    borderColor: "border-l-amber-400",
    dot: "🟡",
    category: "Abmahnung",
    handle: "Nutzer_7093",
    city: "Berlin",
    time: "vor 1 Std.",
    text: "Frommer Legal Abmahnung wegen Filesharing 2021 — €895 Schadensersatz. Vorwurf: BitTorrent-Download.",
  },
  {
    id: 3,
    urgency: "NORMAL",
    urgencyColor: "text-green-600",
    borderColor: "border-l-green-400",
    dot: "🟢",
    category: "Mietrecht",
    handle: "Mieter_4821",
    city: "Hamburg",
    time: "vor 3 Std.",
    text: "Mieterhöhung um 18% ohne schriftliche Begründung. Vermieter beruft sich auf Mietspiegel ohne Belege.",
  },
  {
    id: 4,
    urgency: "DRINGEND",
    urgencyColor: "text-red-600",
    borderColor: "border-l-red-500",
    dot: "🔴",
    category: "Arbeitsrecht",
    handle: "Arbeitnehmer_2244",
    city: "Frankfurt",
    time: "vor 12 Min.",
    text: "Betriebsratsmitglied, 6 Jahre Betriebszugehörigkeit — ordentliche Kündigung ohne Vorwarnung. Mögliche KSchG-Klage?",
  },
];

export default function Pro() {
  const [commented, setCommented] = useState<Record<number, boolean>>({});
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showPrivatModal, setShowPrivatModal] = useState(false);
  const [activeLead, setActiveLead] = useState<number | null>(null);
  const [commentText, setCommentText] = useState("");
  const [radiusFilter, setRadiusFilter] = useState("50 km");
  const [categoryFilter, setCategoryFilter] = useState("Alle Fachgebiete");

  function openComment(id: number) {
    setActiveLead(id);
    setShowCommentModal(true);
  }

  function submitComment() {
    if (!commentText.trim()) return;
    if (activeLead !== null) {
      setCommented(prev => ({ ...prev, [activeLead]: true }));
    }
    setShowCommentModal(false);
    setCommentText("");
  }

  function openPrivat(id: number) {
    setActiveLead(id);
    setShowPrivatModal(true);
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* NAV */}
      <nav className="bg-[#0F2444] px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <span className="font-black text-2xl tracking-tight"><span className="text-white">Recht</span><span className="text-[#F59E0B]">So</span></span>
        <span className="bg-[#F59E0B] text-[#0F2444] text-xs font-black px-3 py-1 rounded-lg">RECHTSO PRO</span>
      </nav>

      <div className="max-w-2xl mx-auto px-4 py-6 pb-10">

        {/* PRO HEADER */}
        <div className="bg-gradient-to-r from-[#0F2444] to-[#1a3a6b] rounded-2xl p-5 mb-5 flex items-center justify-between">
          <div>
            <div className="font-black text-lg"><span className="text-white">Recht</span><span className="text-[#F59E0B]">So</span><span className="text-white/60"> Pro</span></div>
            <div className="text-white/50 text-xs mt-1">Live-Mandantenstrom · 27. Juni 2026</div>
          </div>
          <div className="text-right">
            <div className="text-[#F59E0B] font-black text-2xl">4</div>
            <div className="text-white/40 text-xs">Neue Anfragen</div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-hide">
          <div className="flex items-center gap-2 bg-white border-2 border-[#0F2444] rounded-xl px-3 py-2 flex-shrink-0">
            <span className="text-xs font-bold text-[#0F2444]">📍</span>
            <select value={radiusFilter} onChange={e => setRadiusFilter(e.target.value)}
              className="text-xs font-bold text-[#0F2444] bg-transparent outline-none cursor-pointer">
              <option>50 km</option>
              <option>100 km</option>
              <option>Deutschland</option>
            </select>
          </div>
          <div className="flex items-center gap-2 bg-white border-2 border-[#0F2444] rounded-xl px-3 py-2 flex-shrink-0">
            <span className="text-xs font-bold text-[#0F2444]">⚖️</span>
            <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}
              className="text-xs font-bold text-[#0F2444] bg-transparent outline-none cursor-pointer">
              <option>Alle Fachgebiete</option>
              <option>Mietrecht</option>
              <option>Arbeitsrecht</option>
              <option>Verkehrsrecht</option>
              <option>Abmahnung</option>
            </select>
          </div>
          <div className="bg-red-50 border-2 border-red-200 rounded-xl px-3 py-2 flex-shrink-0">
            <span className="text-xs font-bold text-red-600">🔴 Dringend (2)</span>
          </div>
        </div>

        {/* LIVE LABEL */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Live-Stream — 7 neue Anfragen heute</span>
        </div>

        {/* LEADS */}
        {leads.map(lead => (
          <div key={lead.id} className={`bg-white rounded-2xl border border-slate-200 border-l-4 ${lead.borderColor} p-4 mb-3`}>
            <div className="flex items-start justify-between mb-2">
              <div className={`text-xs font-black ${lead.urgencyColor} flex items-center gap-1`}>
                {lead.dot} {lead.urgency} · {lead.category}
              </div>
              <div className="text-xs text-slate-300">{lead.time}</div>
            </div>
            <div className="text-xs font-semibold text-slate-400 mb-1">{lead.handle} · {lead.city}</div>
            <p className="text-sm text-slate-600 leading-relaxed mb-3">{lead.text}</p>

            <div className="flex gap-2">
              {/* COMMENT BUTTON */}
              {commented[lead.id] ? (
                <button className="flex-1 py-2 bg-[#0F2444] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1">
                  ✍️ Kommentiert ✓
                </button>
              ) : (
                <button onClick={() => openComment(lead.id)}
                  className="flex-1 py-2 border-2 border-[#0F2444] text-[#0F2444] text-xs font-bold rounded-xl hover:bg-[#0F2444] hover:text-white transition flex items-center justify-center gap-1">
                  ✍️ Öffentlich kommentieren
                </button>
              )}

              {/* PITCH BUTTON */}
              {commented[lead.id] ? (
                <button onClick={() => openPrivat(lead.id)}
                  className="flex-1 py-2 bg-teal-50 border-2 border-teal-300 text-teal-700 text-xs font-bold rounded-xl hover:bg-teal-600 hover:text-white transition flex items-center justify-center gap-1">
                  🔓 Privat anfragen
                </button>
              ) : (
                <div className="flex-1 relative group">
                  <button className="w-full py-2 bg-slate-50 border-2 border-slate-200 text-slate-300 text-xs font-bold rounded-xl cursor-not-allowed flex items-center justify-center gap-1">
                    🔒 Privat anfragen
                  </button>
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                    Erst öffentlich kommentieren
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* PERFORMANCE FOOTER */}
        <div className="bg-[#0F2444] rounded-2xl p-5 mt-6 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-[#F59E0B] font-black text-2xl">142</div>
            <div className="text-white/40 text-xs mt-1">Profilaufrufe</div>
          </div>
          <div>
            <div className="text-[#F59E0B] font-black text-2xl">23</div>
            <div className="text-white/40 text-xs mt-1">Offline-Leads</div>
          </div>
          <div>
            <div className="text-[#F59E0B] font-black text-2xl">4.8★</div>
            <div className="text-white/40 text-xs mt-1">Bewertung</div>
          </div>
        </div>
      </div>

      {/* COMMENT MODAL */}
      {showCommentModal && (
        <div className="fixed inset-0 bg-[#0F2444]/60 z-30 flex items-end justify-center">
          <div className="bg-white rounded-t-3xl w-full max-w-2xl p-6">
            <div className="w-9 h-1 bg-slate-200 rounded-full mx-auto mb-5" />
            <div className="font-black text-[#0F2444] text-lg mb-2">Öffentlich kommentieren</div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4 text-xs text-amber-800">
              ⚖️ <strong>BRAO § 43b:</strong> Kommentare müssen sachlich, objektiv und fachlich korrekt sein. Keine Werbung oder Erfolgsversprechen.
            </div>
            <textarea value={commentText} onChange={e => setCommentText(e.target.value)}
              className="w-full border-2 border-slate-200 rounded-xl p-3 text-sm font-sans resize-none outline-none min-h-24 focus:border-[#0F2444] text-slate-700"
              placeholder="Allgemeinen Rechtshinweis formulieren (kein persönlicher Rechtsrat)..." />
            <div className="flex gap-3 mt-4">
              <button onClick={() => setShowCommentModal(false)}
                className="flex-1 py-3 border-2 border-slate-200 rounded-xl text-slate-500 font-semibold text-sm">
                Abbrechen
              </button>
              <button onClick={submitComment}
                className="flex-[2] py-3 bg-[#0F2444] text-white font-black rounded-xl text-sm hover:bg-[#1a3a6b] transition">
                Kommentar veröffentlichen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PRIVAT MODAL */}
      {showPrivatModal && (
        <div className="fixed inset-0 bg-[#0F2444]/60 z-30 flex items-end justify-center">
          <div className="bg-white rounded-t-3xl w-full max-w-2xl p-6 text-center">
            <div className="w-9 h-1 bg-slate-200 rounded-full mx-auto mb-5" />
            <div className="text-4xl mb-3">🔒</div>
            <div className="font-black text-[#0F2444] text-lg mb-2">Privatnachricht gesendet</div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Der Mandant wurde benachrichtigt. Die weitere Kommunikation findet <strong>vollständig außerhalb von RechtSo</strong> statt. RechtSo speichert oder vermittelt keine Rechtsgespräche.
            </p>
            <button onClick={() => setShowPrivatModal(false)}
              className="w-full py-3 bg-[#0F2444] text-white font-black rounded-xl hover:bg-[#1a3a6b] transition">
              Verstanden
            </button>
          </div>
        </div>
      )}
    </div>
  );
}