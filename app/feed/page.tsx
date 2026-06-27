"use client";
import { useState, useEffect } from "react";
import { supabase } from '@/lib/supabase';

const categories = ["Alle", "Mietrecht", "Arbeitsrecht", "Verkehrsrecht", "Abmahnung", "Vertragsrecht", "Familienrecht"];

const categoryColors: Record<string, string> = {
  Mietrecht: "bg-blue-100 text-blue-800",
  Abmahnung: "bg-amber-100 text-amber-800",
  Arbeitsrecht: "bg-purple-100 text-purple-800",
  Verkehrsrecht: "bg-red-100 text-red-800",
  Vertragsrecht: "bg-green-100 text-green-800",
  Familienrecht: "bg-pink-100 text-pink-800",
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

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    const { data } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setPosts(data);
    setLoading(false);
  }

  async function submitQuestion() {
    if (!questionText.trim() || !selectedCat) return;
    const handles = ['Mieter', 'Nutzer', 'Bürger', 'Arbeitnehmer', 'Fahrer', 'Kunde'];
    const handle = handles[Math.floor(Math.random() * handles.length)] + '_' + Math.floor(1000 + Math.random() * 9000);
    await supabase.from('posts').insert({
      handle,
      category: selectedCat,
      content: questionText,
    });
    setShowModal(false);
    setQuota(q => Math.max(0, q - 1));
    setQuestionText("");
    setSelectedCat("");
    setSubmitted(true);
    fetchPosts();
    setTimeout(() => setSubmitted(false), 4000);
  }

  const filtered = activeCategory === "Alle" ? posts : posts.filter(p => p.category === activeCategory);

  function timeAgo(dateStr: string) {
    const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (diff < 60) return 'gerade eben';
    if (diff < 3600) return `vor ${Math.floor(diff / 60)} Min.`;
    if (diff < 86400) return `vor ${Math.floor(diff / 3600)} Std.`;
    return `vor ${Math.floor(diff / 86400)} Tagen`;
  }

  if (selectedPost) {
    const blurb = blurbs[selectedPost.category];
    return (
      <div className="min-h-screen bg-slate-50 font-sans">
        <nav className="bg-[#0F2444] px-4 py-3 flex items-center justify-between sticky top-0 z-10">
          <span className="text-white font-bold text-lg">RechtSo<span className="text-[#F59E0B]">⚡</span></span>
        </nav>
        <div className="bg-amber-50 border-b border-amber-200 text-center text-xs text-amber-800 font-medium py-2 px-4">
          ⚠️ Dies ist keine Rechtsberatung. Bitte konsultieren Sie einen zugelassenen Rechtsanwalt.
        </div>
        <div className="max-w-2xl mx-auto px-4 py-6 pb-24">
          <button onClick={() => setSelectedPost(null)} className="flex items-center gap-2 text-[#0F2444] font-semibold text-sm mb-4">
            ← Zurück zum Feed
          </button>

          <div className="bg-[#0F2444] rounded-2xl p-4 mb-4 text-white">
            <div className="text-xs text-white/50 font-bold uppercase tracking-widest mb-1">
              RS-{selectedPost.id.slice(0, 8).toUpperCase()}
            </div>
            <div className="font-black text-lg mb-2">{selectedPost.category}</div>
            <span className="bg-white/10 text-white text-xs font-semibold px-2 py-1 rounded-full">{selectedPost.category}</span>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-slate-200 mb-4">
            <div className="text-xs font-bold text-slate-400 uppercase mb-2">📝 Anfrage · {selectedPost.handle}</div>
            <p className="text-slate-700 text-sm leading-relaxed">{selectedPost.content}</p>
          </div>

          {blurb && (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mb-4">
              <div className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-2">ℹ️ Allgemeine Information — Kein Rechtsrat</div>
              <p className="text-blue-900 text-sm leading-relaxed mb-3">{blurb.text}</p>
              <ul className="space-y-1">
                {blurb.checklist.map((item, i) => (
                  <li key={i} className="text-blue-900 text-sm flex gap-2">
                    <span className="text-blue-500 font-bold flex-shrink-0">✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4 text-xs text-amber-800">
            ⚠️ Dies ist keine Rechtsberatung. Die obigen Informationen sind allgemein. Bitte konsultieren Sie einen zugelassenen Rechtsanwalt.
          </div>

          <div className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-3">
            {selectedPost.answers_count} Anwaltsantworten
          </div>

          {selectedPost.answers_count > 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-4">
              <div className="flex gap-3 mb-3">
                <div className="w-11 h-11 bg-[#0F2444] rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0">KM</div>
                <div>
                  <div className="font-bold text-[#0F2444] text-sm">Dr. Katja Müller</div>
                  <div className="text-slate-400 text-xs">Rechtsanwältin · Hamburg</div>
                  <div className="flex gap-2 mt-1 flex-wrap">
                    <span className="bg-teal-50 text-teal-700 border border-teal-200 text-xs font-bold px-2 py-0.5 rounded-md">Registrierung angegeben ✓</span>
                    <span className="bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded-md">{selectedPost.category}</span>
                  </div>
                  <div className="text-xs text-slate-300 mt-1">RAK Hamburg · Reg.-Nr. 04-28811 · <a href="https://www.brak.de" className="text-teal-500" target="_blank">BRAK prüfen ↗</a></div>
                </div>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-3 mb-3">
                Allgemein gilt: Ohne vollständige Akteneinsicht und Prüfung der konkreten Unterlagen lässt sich keine fundierte Einschätzung abgeben. Die gesetzlichen Fristen sind in jedem Fall zu beachten. Eine anwaltliche Erstberatung empfiehlt sich zeitnah.
              </p>
              <button className="bg-[#0D9488] text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-teal-700 transition">
                ✉️ Privates Gespräch anfragen
              </button>
              <p className="text-xs text-slate-300 mt-2">Gespräch findet außerhalb von RechtSo statt.</p>
            </div>
          ) : (
            <div className="text-center py-10 text-slate-400 text-sm">
              <div className="text-3xl mb-2">⏳</div>
              Noch keine Anwaltsantworten. Anwälte werden in Kürze antworten.
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <nav className="bg-[#0F2444] px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
        <span className="text-white font-bold text-lg flex-shrink-0">RechtSo<span className="text-[#F59E0B]">⚡</span></span>
        <input className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-1.5 text-white text-sm placeholder-white/40 outline-none" placeholder="Mietrecht, Abmahnung..." />
      </nav>

      <div className="bg-amber-50 border-b border-amber-200 text-center text-xs text-amber-800 font-medium py-2 px-4">
        ⚠️ Dies ist keine Rechtsberatung. Bitte konsultieren Sie einen zugelassenen Rechtsanwalt.
      </div>

      <div className="max-w-2xl mx-auto px-4 py-4 pb-28">
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition ${activeCategory === cat ? "bg-[#0F2444] text-white border-[#0F2444]" : "bg-white text-slate-500 border-slate-200 hover:border-[#0F2444]"}`}>
              {cat}
            </button>
          ))}
        </div>

        {submitted && (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 text-center mb-4">
            <div className="text-2xl mb-1">⚡</div>
            <div className="font-bold text-green-800 text-sm">Frage anonym veröffentlicht!</div>
            <div className="text-green-600 text-xs mt-1">Anwälte werden in Kürze antworten.</div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-20 text-slate-400 text-sm">Lädt...</div>
        ) : (
          filtered.map(post => (
            <div key={post.id} onClick={() => setSelectedPost(post)}
              className="bg-white rounded-2xl border border-slate-200 p-4 mb-3 cursor-pointer hover:shadow-md transition">
              <div className="flex items-start justify-between mb-3 gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#0F2444] rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {post.handle.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-semibold text-[#0F2444] text-sm">{post.handle}</div>
                    <div className="text-slate-300 text-xs">{timeAgo(post.created_at)}</div>
                  </div>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-lg flex-shrink-0 ${categoryColors[post.category] || "bg-slate-100 text-slate-800"}`}>
                  {post.category}
                </span>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed mb-3 line-clamp-3">{post.content}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg font-medium">
                  💬 {post.answers_count} Anwaltsantworten
                </span>
                {post.answers_count > 0 && (
                  <span className="text-xs text-teal-600 bg-teal-50 border border-teal-200 px-3 py-1.5 rounded-lg font-semibold ml-auto">
                    ✉️ Privat anfragen
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="fixed bottom-6 left-4 right-4 max-w-2xl mx-auto z-20">
        <button onClick={() => setShowModal(true)}
          className="w-full bg-[#0F2444] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl hover:bg-[#1a3a6b] transition text-sm">
          ➕ Frage stellen
          <span className={`text-xs font-black px-2 py-1 rounded-full ${quota === 0 ? "bg-red-500 text-white" : "bg-[#F59E0B] text-[#0F2444]"}`}>
            {quota} verbleibend
          </span>
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-[#0F2444]/60 z-30 flex items-end justify-center">
          <div className="bg-white rounded-t-3xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <div className="w-9 h-1 bg-slate-200 rounded-full mx-auto mb-5" />
            <div className="font-black text-[#0F2444] text-lg mb-1">Rechtsfrage stellen</div>
            <div className="text-slate-400 text-xs mb-4">Noch <strong>{quota}</strong> kostenlose Fragen diesen Monat.</div>

            <p className="text-xs font-bold text-slate-500 mb-2">Rechtsgebiet:</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {["Mietrecht", "Arbeitsrecht", "Verkehrsrecht", "Abmahnung", "Vertragsrecht", "Familienrecht"].map(cat => (
                <button key={cat} onClick={() => setSelectedCat(cat)}
                  className={`py-2.5 rounded-xl text-xs font-bold border-2 transition ${selectedCat === cat ? "bg-[#0F2444] text-white border-[#0F2444]" : "bg-white text-slate-500 border-slate-200 hover:border-[#0F2444]"}`}>
                  {cat}
                </button>
              ))}
            </div>

            <p className="text-xs font-bold text-slate-500 mb-2">Ihre Frage:</p>
            <textarea value={questionText} onChange={e => setQuestionText(e.target.value)}
              className="w-full border-2 border-slate-200 rounded-xl p-3 text-sm font-sans resize-none outline-none min-h-28 text-slate-700 focus:border-[#0F2444]"
              placeholder="Beschreiben Sie Ihre Situation. Keine persönlichen Daten (Name, Adresse, Aktenzeichen) angeben." />

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 my-3 text-xs text-amber-800">
              ⚠️ Ihre Frage wird anonym unter einem zufälligen Handle veröffentlicht. Dies ist keine Rechtsberatung.
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)} className="flex-1 py-3 border-2 border-slate-200 rounded-xl text-slate-500 font-semibold text-sm">
                Abbrechen
              </button>
              <button onClick={submitQuestion} className="flex-[2] py-3 bg-[#0F2444] text-white font-black rounded-xl text-sm hover:bg-[#1a3a6b] transition">
                Anonym veröffentlichen ⚡
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}