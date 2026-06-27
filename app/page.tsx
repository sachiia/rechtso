export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans">
      {/* NAV */}
      <nav className="bg-[#0F2444] px-6 py-4 flex items-center justify-between">
        <div className="text-white font-bold text-xl tracking-tight">
          <span className="text-white">Recht</span><span className="text-[#F59E0B]">So</span>
        </div>
        <div className="flex gap-3">
          <a href="/feed" className="text-white/70 text-sm font-medium px-4 py-2 rounded-lg hover:text-white transition">
            Anmelden
          </a>
          <a href="/feed" className="bg-[#F59E0B] text-[#0F2444] text-sm font-bold px-4 py-2 rounded-lg hover:bg-amber-400 transition">
            Kostenlos starten
          </a>
        </div>
      </nav>

      {/* DISCLAIMER */}
      <div className="bg-amber-50 border-b border-amber-200 text-center text-xs text-amber-800 font-medium py-2 px-4">
        ⚠️ RechtSo ist keine Rechtsberatung. Alle Inhalte dienen nur zur allgemeinen Information.
      </div>

      {/* HERO */}
      <section className="bg-[#0F2444] px-6 pt-20 pb-28 text-center">
        <div className="inline-block bg-[#F59E0B]/20 text-[#F59E0B] text-xs font-bold px-3 py-1 rounded-full mb-6 tracking-widest uppercase">
          Neu in Deutschland
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight tracking-tight max-w-3xl mx-auto mb-6">
          Rechtsfragen?<br />
          <span className="text-[#F59E0B]">RechtSo.</span>
        </h1>
        <p className="text-white/60 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Stelle deine Rechtsfrage anonym. Echte Anwälte antworten öffentlich — kostenlos. In Minuten.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/feed" className="bg-[#F59E0B] text-[#0F2444] font-black text-lg px-8 py-4 rounded-2xl hover:bg-amber-400 transition shadow-lg">
            Jetzt Frage stellen — kostenlos
          </a>
          <a href="/pro" className="border border-white/20 text-white font-semibold text-lg px-8 py-4 rounded-2xl hover:bg-white/10 transition">
            Für Anwälte →
          </a>
        </div>
        <p className="text-white/30 text-xs mt-6">2 kostenlose Fragen pro Monat · Keine Kreditkarte</p>
      </section>

      {/* STATS */}
      <section className="bg-[#0a1a33] px-6 py-10">
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-black text-[#F59E0B]">100%</div>
            <div className="text-white/50 text-xs mt-1">Anonym</div>
          </div>
          <div>
            <div className="text-3xl font-black text-[#F59E0B]">0€</div>
            <div className="text-white/50 text-xs mt-1">Für Mandanten</div>
          </div>
          <div>
            <div className="text-3xl font-black text-[#F59E0B]">&lt;1h</div>
            <div className="text-white/50 text-xs mt-1">Erste Antwort</div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-20 max-w-3xl mx-auto">
        <h2 className="text-3xl font-black text-[#0F2444] text-center mb-2">So funktioniert es</h2>
        <p className="text-slate-500 text-center mb-14">In drei Schritten zu deiner Antwort</p>
        <div className="grid sm:grid-cols-3 gap-10">
          <div className="text-center">
            <div className="w-14 h-14 bg-[#0F2444] rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">✍️</div>
            <h3 className="font-bold text-[#0F2444] mb-2">Frage tippen</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Beschreibe deine Situation anonym. Kein Name, keine Adresse.</p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 bg-[#0F2444] rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">⚡</div>
            <h3 className="font-bold text-[#0F2444] mb-2">Anwälte antworten</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Zugelassene Rechtsanwälte kommentieren öffentlich und sachlich.</p>
          </div>
          <div className="text-center">
            <div className="w-14 h-14 bg-[#0F2444] rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">🔒</div>
            <h3 className="font-bold text-[#0F2444] mb-2">Privat weiter</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Bei Bedarf direkt privaten Kontakt mit dem Anwalt aufnehmen.</p>
          </div>
        </div>
      </section>

      {/* FOR LAWYERS */}
      <section className="bg-slate-50 px-6 py-20">
        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 border border-slate-200">
            <div className="text-2xl mb-4">👤</div>
            <h3 className="text-xl font-black text-[#0F2444] mb-3">Für Mandanten</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex gap-2"><span className="text-[#F59E0B] font-bold">✓</span> 2 Fragen pro Monat kostenlos</li>
              <li className="flex gap-2"><span className="text-[#F59E0B] font-bold">✓</span> 100% anonym</li>
              <li className="flex gap-2"><span className="text-[#F59E0B] font-bold">✓</span> Antworten von echten Anwälten</li>
              <li className="flex gap-2"><span className="text-[#F59E0B] font-bold">✓</span> Unbegrenzt für €4,99/Monat</li>
            </ul>
            <a href="/feed" className="mt-6 block text-center bg-[#0F2444] text-white font-bold py-3 rounded-xl hover:bg-[#1a3a6b] transition text-sm">
              Kostenlos starten
            </a>
          </div>
          <div className="bg-[#0F2444] rounded-2xl p-8">
            <div className="text-2xl mb-4">⚖️</div>
            <h3 className="text-xl font-black text-white mb-3">Für Anwälte</h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex gap-2"><span className="text-[#F59E0B] font-bold">✓</span> Basis-Listing ab €39/Monat</li>
              <li className="flex gap-2"><span className="text-[#F59E0B] font-bold">✓</span> Live-Mandantenstrom ab €99/Monat</li>
              <li className="flex gap-2"><span className="text-[#F59E0B] font-bold">✓</span> Verifiziertes Anwaltsprofil</li>
              <li className="flex gap-2"><span className="text-[#F59E0B] font-bold">✓</span> Direkter Offline-Kontakt</li>
            </ul>
            <a href="/pro" className="mt-6 block text-center bg-[#F59E0B] text-[#0F2444] font-bold py-3 rounded-xl hover:bg-amber-400 transition text-sm">
              Jetzt als Anwalt registrieren
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0F2444] px-6 py-12 text-center">
        <div className="text-white font-bold text-lg mb-2">
          <span className="text-white">Recht</span><span className="text-[#F59E0B]">So</span>
        </div>
        <p className="text-white/40 text-xs max-w-md mx-auto leading-relaxed mb-6">
          RechtSo ist ein Informationsportal und keine Rechtsanwaltskanzlei. Die Inhalte auf dieser Plattform stellen keine Rechtsberatung im Sinne des RDG dar. Bitte konsultieren Sie für persönliche Rechtsfragen einen zugelassenen Rechtsanwalt.
        </p>
        <div className="flex justify-center gap-6 text-white/40 text-xs">
          <a href="#" className="hover:text-white/70">Impressum</a>
          <a href="#" className="hover:text-white/70">Datenschutz</a>
          <a href="#" className="hover:text-white/70">AGB</a>
        </div>
      </footer>
    </main>
  );
}