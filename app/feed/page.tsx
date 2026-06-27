"use client";
import React, { useState, useEffect } from "react";
import { supabase } from '@/lib/supabase';

// ── MODERN SVG ICONS ──
const Icons = {
  Mietrecht: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/><path d="M9 21V12h6v9"/>
    </svg>
  ),
  Arbeitsrecht: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
    </svg>
  ),
  Verkehrsrecht: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17H3v-5l2-5h14l2 5v5h-2"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/><path d="M5 12h14"/>
    </svg>
  ),
  Abmahnung: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  Vertragsrecht: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  ),
  Familienrecht: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
    </svg>
  ),
  Chat: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
    </svg>
  ),
  Plus: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
    </svg>
  ),
  Search: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  ArrowLeft: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
    </svg>
  ),
  Scale: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="3" x2="12" y2="21"/><path d="M3 6l9-3 9 3"/><path d="M6 15l-3-9 9 3"/><path d="M18 15l3-9-9 3"/><path d="M3 15h6"/><path d="M15 15h6"/>
    </svg>
  ),
  TrendingUp: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
  Send: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  ),
  Check: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Info: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
    </svg>
  ),
  AlertTriangle: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
};

const categories = ["Alle", "Mietrecht", "Arbeitsrecht", "Verkehrsrecht", "Abmahnung", "Vertragsrecht", "Familienrecht"];

const categoryConfig: Record<string, { color: string; border: string; bg: string; text: string }> = {
  Mietrecht:     { color: "text-blue-600",   border: "border-l-blue-500",   bg: "bg-blue-50",   text: "text-blue-700"   },
  Abmahnung:     { color: "text-amber-600",  border: "border-l-amber-500",  bg: "bg-amber-50",  text: "text-amber-700"  },
  Arbeitsrecht:  { color: "text-purple-600", border: "border-l-purple-500", bg: "bg-purple-50", text: "text-purple-700" },
  Verkehrsrecht: { color: "text-red-600",    border: "border-l-red-500",    bg: "bg-red-50",    text: "text-red-700"    },
  Vertragsrecht: { color: "text-green-600",  border: "border-l-green-500",  bg: "bg-green-50",  text: "text-green-700"  },
  Familienrecht: { color: "text-pink-600",   border: "border-l-pink-500",   bg: "bg-pink-50",   text: "text-pink-700"   },
};

const blurbs: Record<string, { text: string; checklist: string[] }> = {
  Mietrecht: {
    text: "Mieterhöhungen in Deutschland erfordern eine schriftliche Begründung und müssen sich auf den Mietspiegel, ein Gutachten oder Vergleichswohnungen stützen (§ 558a BGB).",
    checklist: ["Keine sofortige Unterschrift leisten.", "Prüfen ob der Mietspiegel beigefügt wurde.", "Fristen für Zustimmung oder Klage beachten."],
  },
  Abmahnung: {
    text: "Filesharing-Abmahnungen sind in Deutschland ein etabliertes Rechtsgebiet. Empfänger haben das Recht, die Forderung zu bestreiten.",
    checklist: ["Keine vorformulierten Unterlassungserklärungen unterschreiben.", "Keine Zahlung ohne anwaltliche Prüfung leisten.", "Abmahnschreiben und Eingangsdatum aufbewahren."],
  },
  Arbeitsrecht: {
    text: "Betriebsratsmitglieder genießen besonderen Kündigungsschutz (§ 15 KSchG). Eine ordentliche Kündigung ist grundsätzlich unzulässig.",
    checklist: ["Kündigungsschutzklage muss innerhalb von 3 Wochen eingereicht werden.", "Kündigung schriftlich bestreiten.", "Betriebsrat-Status anwaltlich prüfen lassen."],
  },
  Verkehrsrecht: {
    text: "Gegen Bußgeldbescheide kann innerhalb von zwei Wochen nach Zustellung Einspruch eingelegt werden (§ 67 OWiG).",
    checklist: ["Einspruchsfrist von 2 Wochen beachten.", "Akteneinsicht zum Messprotokoll beantragen.", "Keine Zahlung vor Einspruchsprüfung leisten."],
  },
  Vertragsrecht: {
    text: "Verträge können unter bestimmten Voraussetzungen angefochten oder widerrufen werden. Die gesetzlichen Fristen sind dabei entscheidend.",
    checklist: ["Vertragsdokumente sorgfältig aufbewahren.", "Widerrufsfristen beachten (oft 14 Tage).", "Keine weiteren Zahlungen ohne anwaltliche Prüfung."],
  },
  Familienrecht: {
    text: "Familienrechtliche Angelegenheiten wie Scheidung, Unterhalt und Sorgerecht sind komplex und stark einzelfallabhängig.",
    checklist: ["Alle relevanten Dokumente sichern.", "Keine mündlichen Vereinbarungen ohne schriftliche Bestätigung.", "Frühzeitig anwaltlichen Rat einholen."],
  },
};

type Post = {
  id: string;
  handle: string;
  category: string;
  content: string;
  answers_count: number;
  created_at: string;
};

function timeAgo(dateStr: string) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return 'gerade eben';
  if (diff < 3600) return `vor ${Math.floor(diff / 60)} Min.`;
  if (diff < 86400) return `vor ${Math.floor(diff / 3600)} Std.`;
  return `vor ${Math.floor(diff / 86400)} Tagen`;
}

function CategoryIcon({ category, size = 18 }: { category: string; size?: number }) {
  const map: Record<string, () => JSX.Element> = {
    Mietrecht: Icons.Mietrecht,
    Arbeitsrecht: Icons.Arbeitsrecht,
    Verkehrsrecht: Icons.Verkehrsrecht,
    Abmahnung: Icons.Abmahnung,
    Vertragsrecht: Icons.Vertragsrecht,
    Familienrecht: Icons.Familienrecht,
  };
  const Icon = map[category] || Icons.Scale;
  return <Icon />;
}

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Alle");
  const [quota, setQuota] = useState(2);
  const [showModal, setShowModal] = useState(false);
  const [selectedCat, setSelectedCat] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => { fetchPosts(); }, []);

  async function fetchPosts() {
    setLoading(true);
    const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
    if (data) setPosts(data);
    setLoading(false);
  }

  async function submitQuestion() {
    if (!questionText.trim() || !selectedCat) return;
    const handles = ['Mieter', 'Nutzer', 'Bürger', 'Arbeitnehmer', 'Fahrer', 'Kunde'];
    const handle = handles[Math.floor(Math.random() * handles.length)] + '_' + Math.floor(1000 + Math.random() * 9000);
    await supabase.from('posts').insert({ handle, category: selectedCat, content: questionText });
    setShowModal(false);
    setQuota(q => Math.max(0, q - 1));
    setQuestionText("");
    setSelectedCat("");
    setSubmitted(true);
    fetchPosts();
    setTimeout(() => setSubmitted(false), 4000);
  }

  const filtered = activeCategory === "Alle" ? posts : posts.filter(p => p.category === activeCategory);

  // ── CASE DETAIL ──
  if (selectedPost) {
    const blurb = blurbs[selectedPost.category];
    const cfg = categoryConfig[selectedPost.category] || { color: "text-slate-700", border: "border-l-slate-400", bg: "bg-slate-50", text: "text-slate-700" };
    return (
      <div className="min-h-screen bg-[#f0f2f5] font-sans">
        <nav className="bg-[#0F2444] px-8 py-5 flex items-center gap-4 sticky top-0 z-10 shadow-lg">
          <span className="font-black text-2xl tracking-tight"><span className="text-white">Recht</span><span className="text-[#F59E0B]">So</span></span>
        </nav>
        <div className="bg-amber-50 border-b border-amber-200 text-center text-sm text-amber-800 font-medium py-2.5 px-4 flex items-center justify-center gap-2">
          <Icons.AlertTriangle /><span>Dies ist keine Rechtsberatung. Bitte konsultieren Sie einen zugelassenen Rechtsanwalt.</span>
        </div>
        <div className="max-w-3xl mx-auto px-6 py-10 pb-24">
          <button onClick={() => setSelectedPost(null)} className="flex items-center gap-2 text-[#0F2444] font-semibold text-base mb-8 hover:opacity-70 transition">
            <Icons.ArrowLeft /> Zurück zum Feed
          </button>
          <div className="bg-[#0F2444] rounded-2xl p-7 mb-6 text-white">
            <div className="text-xs text-white/40 font-bold uppercase tracking-widest mb-2">RS-{selectedPost.id.slice(0, 8).toUpperCase()}</div>
            <div className="font-black text-3xl mb-4">{selectedPost.category}</div>
            <span className={`text-sm font-bold px-4 py-1.5 rounded-full inline-flex items-center gap-2 ${cfg.bg} ${cfg.text}`}>
              <CategoryIcon category={selectedPost.category} />{selectedPost.category}
            </span>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-slate-200 mb-6 shadow-sm">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">Anfrage · {selectedPost.handle}</div>
            <p className="text-slate-700 text-base leading-relaxed">{selectedPost.content}</p>
          </div>
          {blurb && (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-2 text-sm font-bold text-blue-600 uppercase tracking-wide mb-3">
                <Icons.Info />Allgemeine Information — Kein Rechtsrat
              </div>
              <p className="text-blue-900 text-base leading-relaxed mb-4">{blurb.text}</p>
              <ul className="space-y-2.5">
                {blurb.checklist.map((item, i) => (
                  <li key={i} className="text-blue-900 text-sm flex gap-2.5 items-start">
                    <span className="text-blue-500 mt-0.5 flex-shrink-0"><Icons.Check /></span>{item}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-sm text-amber-800 flex items-center gap-2">
            <Icons.AlertTriangle />Dies ist keine Rechtsberatung. Bitte konsultieren Sie einen zugelassenen Rechtsanwalt.
          </div>
          <div className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-4">{selectedPost.answers_count} Anwaltsantworten</div>
          {selectedPost.answers_count > 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
              <div className="flex gap-4 mb-5">
                <div className="w-14 h-14 bg-[#0F2444] rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">KM</div>
                <div>
                  <div className="font-bold text-[#0F2444] text-base">Dr. Katja Müller</div>
                  <div className="text-slate-400 text-sm">Rechtsanwältin · Hamburg</div>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <span className="bg-teal-50 text-teal-700 border border-teal-200 text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1.5">
                      <Icons.Check />Registrierung angegeben
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 mt-1.5">RAK Hamburg · Reg.-Nr. 04-28811 · <a href="https://www.brak.de" className="text-teal-500 hover:underline" target="_blank">BRAK prüfen ↗</a></div>
                </div>
              </div>
              <p className="text-slate-600 text-base leading-relaxed border-t border-slate-100 pt-5 mb-5">
                Allgemein gilt: Ohne vollständige Akteneinsicht und Prüfung der konkreten Unterlagen lässt sich keine fundierte Einschätzung abgeben. Die gesetzlichen Fristen sind in jedem Fall zu beachten.
              </p>
              <button className="bg-[#0D9488] text-white text-sm font-bold px-6 py-3 rounded-xl hover:bg-teal-700 transition flex items-center gap-2">
                <Icons.Send />Privates Gespräch anfragen
              </button>
              <p className="text-xs text-slate-300 mt-2">Gespräch findet außerhalb von RechtSo statt.</p>
            </div>
          ) : (
            <div className="text-center py-16 text-slate-400 bg-white rounded-2xl border border-slate-200">
              <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-300">
                <Icons.Chat />
              </div>
              <div className="font-semibold text-base">Noch keine Anwaltsantworten</div>
              <div className="text-sm mt-1">Anwälte werden in Kürze antworten.</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── MAIN FEED ──
  return (
    <div className="min-h-screen bg-[#f0f2f5] font-sans">

      {/* NAV — full width, no max-width */}
      <nav className="bg-[#0F2444] px-8 py-4 flex items-center gap-5 sticky top-0 z-20 shadow-lg">
        <span className="font-black text-2xl tracking-tight flex-shrink-0"><span className="text-white">Recht</span><span className="text-[#F59E0B]">So</span></span>
        <div className="flex-1 relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"><Icons.Search /></span>
          <input className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-2.5 text-white text-base placeholder-white/40 outline-none focus:bg-white/20 transition" placeholder="Mietrecht, Abmahnung, Kündigung..." />
        </div>
        <button onClick={() => setShowModal(true)} className="bg-[#F59E0B] text-[#0F2444] font-black text-sm px-5 py-2.5 rounded-xl hover:bg-amber-400 transition flex-shrink-0 hidden sm:flex items-center gap-2">
          <Icons.Plus />Frage stellen
          <span className="bg-[#0F2444] text-[#F59E0B] text-xs font-black px-2 py-0.5 rounded-full">{quota}</span>
        </button>
      </nav>

      {/* DISCLAIMER */}
      <div className="bg-amber-50 border-b border-amber-200 text-center text-sm text-amber-800 font-medium py-2.5 px-4 flex items-center justify-center gap-2">
        <Icons.AlertTriangle /><span>Dies ist keine Rechtsberatung. Bitte konsultieren Sie einen zugelassenen Rechtsanwalt.</span>
      </div>

      {/* HERO — full width */}
      <div className="bg-[#0F2444] px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-white font-black text-3xl">Rechtsfragen der Community</h1>
            <p className="text-white/50 text-base mt-1">Echte Fälle · Echte Anwälte · 100% anonym</p>
          </div>
          <div className="flex gap-8">
            <div className="text-center">
              <div className="text-[#F59E0B] font-black text-2xl">{posts.length}</div>
              <div className="text-white/40 text-sm">Fragen</div>
            </div>
            <div className="text-center">
              <div className="text-[#F59E0B] font-black text-2xl">{posts.reduce((a, p) => a + p.answers_count, 0)}</div>
              <div className="text-white/40 text-sm">Antworten</div>
            </div>
            <div className="text-center">
              <div className="text-[#F59E0B] font-black text-2xl">100%</div>
              <div className="text-white/40 text-sm">Anonym</div>
            </div>
          </div>
        </div>
      </div>

      {/* THREE COLUMNS — full width, no max-width cap */}
      <div className="w-full px-6 py-6 pb-28 flex gap-6">

        {/* LEFT SIDEBAR — fixed 280px */}
        <aside className="hidden lg:block flex-shrink-0" style={{ width: '280px' }}>
          <div className="bg-white rounded-2xl border border-slate-200 p-5 sticky top-24 shadow-sm">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Kategorien</div>
            <div className="space-y-1">
              {categories.map(cat => {
                const cfg = cat !== "Alle" ? categoryConfig[cat] : null;
                const count = cat === "Alle" ? posts.length : posts.filter(p => p.category === cat).length;
                return (
                  <button key={cat} onClick={() => setActiveCategory(cat)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition ${activeCategory === cat ? "bg-[#0F2444] text-white" : "text-slate-600 hover:bg-slate-50"}`}>
                    <span className="flex items-center gap-3">
                      {cfg && (
                        <span className={activeCategory === cat ? "text-white/60" : cfg.color}>
                          <CategoryIcon category={cat} />
                        </span>
                      )}
                      {!cfg && <span className="w-[18px]" />}
                      {cat}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${activeCategory === cat ? "bg-white/20 text-white" : "bg-slate-100 text-slate-400"}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* MAIN FEED — flex-1, fills remaining space */}
        <main className="flex-1 min-w-0">

          {/* MOBILE CATEGORY SCROLL */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-4 lg:hidden">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap border transition ${activeCategory === cat ? "bg-[#0F2444] text-white border-[#0F2444]" : "bg-white text-slate-500 border-slate-200"}`}>
                {cat}
              </button>
            ))}
          </div>

          {/* ── FACEBOOK-STYLE PROMPT BOX ── */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#0F2444] rounded-full flex items-center justify-center text-white flex-shrink-0">
                <Icons.Scale />
              </div>
              <button onClick={() => setShowModal(true)}
                className="flex-1 bg-[#f0f2f5] hover:bg-slate-200 border border-transparent rounded-full px-5 py-3 text-left text-slate-400 text-base transition cursor-pointer font-medium">
                Haben Sie eine Rechtsfrage? Anonym stellen…
              </button>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2 flex-wrap">
              {["Mietrecht", "Abmahnung", "Arbeitsrecht"].map(cat => {
                const cfg = categoryConfig[cat];
                return (
                  <button key={cat} onClick={() => { setSelectedCat(cat); setShowModal(true); }}
                    className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl ${cfg.bg} ${cfg.text} hover:opacity-80 transition`}>
                    <CategoryIcon category={cat} />{cat}
                  </button>
                );
              })}
              <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition ml-auto">
                Weitere →
              </button>
            </div>
          </div>

          {submitted && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center mb-4 shadow-sm">
              <div className="font-bold text-green-800 flex items-center justify-center gap-2">
                <span className="text-green-500"><Icons.Check /></span>Frage anonym veröffentlicht!
              </div>
              <div className="text-green-600 text-sm mt-1">Anwälte werden in Kürze antworten.</div>
            </div>
          )}

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-slate-400">{filtered.length} Fragen · Live</span>
            </div>
            <select className="text-sm font-semibold text-slate-500 bg-white border border-slate-200 rounded-xl px-4 py-2 outline-none">
              <option>Neueste zuerst</option>
              <option>Meiste Antworten</option>
            </select>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1,2,3].map(i => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 animate-pulse">
                  <div className="h-5 bg-slate-100 rounded w-1/3 mb-4" />
                  <div className="h-4 bg-slate-100 rounded w-full mb-2" />
                  <div className="h-4 bg-slate-100 rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map(post => {
                const cfg = categoryConfig[post.category] || { color: "text-slate-600", border: "border-l-slate-300", bg: "bg-slate-50", text: "text-slate-600" };
                return (
                  <div key={post.id} onClick={() => setSelectedPost(post)}
                    className={`bg-white rounded-2xl border border-slate-200 border-l-4 ${cfg.border} p-6 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-150 group`}>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 bg-[#0F2444] rounded-xl flex items-center justify-center text-white text-sm font-black flex-shrink-0">
                          {post.handle.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-[#0F2444] text-base">{post.handle}</div>
                          <div className="text-slate-400 text-sm">{timeAgo(post.created_at)}</div>
                        </div>
                      </div>
                      <span className={`text-sm font-bold px-3 py-1.5 rounded-xl flex-shrink-0 flex items-center gap-2 ${cfg.bg} ${cfg.text}`}>
                        <CategoryIcon category={post.category} />{post.category}
                      </span>
                    </div>
                    <p className="text-slate-600 text-base leading-relaxed mb-5 line-clamp-2 group-hover:text-slate-800 transition-colors">{post.content}</p>
                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-2 ${post.answers_count > 0 ? "bg-teal-50 text-teal-700 border border-teal-200" : "bg-slate-50 text-slate-400 border border-slate-200"}`}>
                        <Icons.Chat />{post.answers_count} Anwaltsantworten
                      </span>
                      {post.answers_count > 0 && (
                        <span className="text-sm font-bold text-teal-600 ml-auto flex items-center gap-2">
                          <Icons.Send />Privat anfragen →
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>

        {/* RIGHT SIDEBAR — fixed 320px */}
        <aside className="hidden xl:block flex-shrink-0" style={{ width: '320px' }}>
          <div className="space-y-4 sticky top-24">

            {/* CTA CARD */}
            <div className="bg-[#0F2444] rounded-2xl p-6 text-white">
              <div className="font-black text-xl mb-2">Rechtsfrage?</div>
              <p className="text-white/60 text-sm leading-relaxed mb-5">Stelle deine Frage anonym. Echte Anwälte antworten — kostenlos.</p>
              <button onClick={() => setShowModal(true)} className="w-full bg-[#F59E0B] text-[#0F2444] font-black text-base py-3.5 rounded-xl hover:bg-amber-400 transition flex items-center justify-center gap-2">
                <Icons.Plus />Frage stellen
              </button>
              <div className="text-white/30 text-sm text-center mt-3">{quota} kostenlose Fragen verbleibend</div>
            </div>

            {/* TRENDING */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                <Icons.TrendingUp />Trending Themen
              </div>
              <div className="space-y-1">
                {Object.entries(categoryConfig).map(([cat, cfg]) => (
                  <button key={cat} onClick={() => setActiveCategory(cat)}
                    className="w-full flex items-center gap-3 text-left hover:bg-slate-50 rounded-xl px-3 py-3 transition">
                    <span className={cfg.color}><CategoryIcon category={cat} /></span>
                    <span className="text-base font-semibold text-slate-700">{cat}</span>
                    <span className="ml-auto text-sm text-slate-300 font-bold">{posts.filter(p => p.category === cat).length}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* LAWYER CTA */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Für Anwälte</div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">Mandanten warten auf Ihre Expertise. Ab €39/Monat.</p>
              <a href="/pro" className="block text-center bg-white border-2 border-[#0F2444] text-[#0F2444] font-bold text-sm py-3 rounded-xl hover:bg-[#0F2444] hover:text-white transition">
                Jetzt registrieren →
              </a>
            </div>
          </div>
        </aside>
      </div>

      {/* FAB (mobile) */}
      <div className="fixed bottom-6 left-4 right-4 max-w-md mx-auto z-20 sm:hidden">
        <button onClick={() => setShowModal(true)}
          className="w-full bg-[#0F2444] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl hover:bg-[#1a3a6b] transition">
          <Icons.Plus />Frage stellen
          <span className={`text-sm font-black px-2.5 py-1 rounded-full ${quota === 0 ? "bg-red-500 text-white" : "bg-[#F59E0B] text-[#0F2444]"}`}>
            {quota} verbleibend
          </span>
        </button>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-[#0F2444]/60 z-30 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-7 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-6 sm:hidden" />
            <div className="font-black text-[#0F2444] text-2xl mb-1">Rechtsfrage stellen</div>
            <div className="text-slate-400 text-sm mb-6">Noch <strong className="text-[#0F2444]">{quota}</strong> kostenlose Fragen diesen Monat.</div>
            <p className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-widest">Rechtsgebiet wählen:</p>
            <div className="grid grid-cols-2 gap-2.5 mb-6">
              {["Mietrecht", "Arbeitsrecht", "Verkehrsrecht", "Abmahnung", "Vertragsrecht", "Familienrecht"].map(cat => {
                const cfg = categoryConfig[cat];
                return (
                  <button key={cat} onClick={() => setSelectedCat(cat)}
                    className={`py-3.5 rounded-xl text-sm font-bold border-2 transition flex items-center justify-center gap-2 ${selectedCat === cat ? "bg-[#0F2444] text-white border-[#0F2444]" : "bg-white text-slate-500 border-slate-200 hover:border-[#0F2444]"}`}>
                    <span className={selectedCat === cat ? "text-white/70" : cfg.color}><CategoryIcon category={cat} /></span>
                    {cat}
                  </button>
                );
              })}
            </div>
            <p className="text-xs font-bold text-slate-500 mb-3 uppercase tracking-widest">Ihre Situation:</p>
            <textarea value={questionText} onChange={e => setQuestionText(e.target.value)}
              className="w-full border-2 border-slate-200 rounded-xl p-4 text-base font-sans resize-none outline-none min-h-36 text-slate-700 focus:border-[#0F2444] transition leading-relaxed"
              placeholder="Beschreiben Sie Ihre Situation so genau wie möglich. Keine persönlichen Daten (Name, Adresse, Aktenzeichen) angeben." />
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 my-5 text-sm text-amber-800 leading-relaxed flex items-start gap-2">
              <span className="flex-shrink-0 mt-0.5"><Icons.AlertTriangle /></span>
              <span>Ihre Frage wird anonym veröffentlicht. Dies ist keine Rechtsberatung.</span>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 py-3.5 border-2 border-slate-200 rounded-xl text-slate-500 font-semibold text-base hover:bg-slate-50 transition">
                Abbrechen
              </button>
              <button onClick={submitQuestion} className="flex-[2] py-3.5 bg-[#0F2444] text-white font-black rounded-xl text-base hover:bg-[#1a3a6b] transition flex items-center justify-center gap-2">
                <Icons.Send />Anonym veröffentlichen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}