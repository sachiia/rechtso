"use client";
import React, { useState, useEffect } from "react";
import { supabase } from '@/lib/supabase';

const GERMAN_CITIES = [
  "Aachen","Augsburg","Berlin","Bielefeld","Bochum","Bonn","Braunschweig","Bremen",
  "Chemnitz","Dortmund","Dresden","Duisburg","Düsseldorf","Erfurt","Essen",
  "Frankfurt am Main","Freiburg im Breisgau","Gelsenkirchen","Hagen","Halle (Saale)",
  "Hamburg","Hamm","Hannover","Heidelberg","Karlsruhe","Kassel","Kiel","Köln",
  "Krefeld","Leipzig","Leverkusen","Lübeck","Ludwigshafen am Rhein","Magdeburg",
  "Mainz","Mannheim","Mönchengladbach","Mülheim an der Ruhr","München","Münster",
  "Nürnberg","Oberhausen","Oldenburg","Osnabrück","Potsdam","Rostock","Saarbrücken",
  "Solingen","Stuttgart","Wiesbaden","Wuppertal","Würzburg"
];

const AVATAR_COLORS = [
  { bg: "bg-teal-500",  hex: "#14B8A6" },
  { bg: "bg-blue-500",  hex: "#3B82F6" },
  { bg: "bg-violet-500",hex: "#8B5CF6" },
  { bg: "bg-rose-500",  hex: "#F43F5E" },
  { bg: "bg-amber-500", hex: "#F59E0B" },
  { bg: "bg-emerald-500",hex:"#10B981" },
];

const Icons = {
  Scale: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="3" x2="12" y2="21"/><path d="M3 6l9-3 9 3"/><path d="M6 15l-3-9 9 3"/><path d="M18 15l3-9-9 3"/><path d="M3 15h6"/><path d="M15 15h6"/>
    </svg>
  ),
  Mail: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  Lock: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
    </svg>
  ),
  User: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  MapPin: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  Briefcase: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
    </svg>
  ),
  Badge: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  VerifiedBadge: ({ size = 16 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="11" fill="#1D9BF0"/>
      <path d="M6.5 11.5L9.5 14.5L15.5 8" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Check: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  LogOut: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
  Chat: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
    </svg>
  ),
  Send: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  ),
  AlertTriangle: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
    </svg>
  ),
  Edit: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
    </svg>
  ),
  Palette: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
    </svg>
  ),
  ChevronDown: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9"/>
    </svg>
  ),
};

type LawyerProfile = {
  id: string;
  handle: string;
  display_name: string;
  rak_number: string;
  law_firm: string | null;
  city: string;
  role: string;
  avatar_color: string | null;
};

type Post = {
  id: string;
  handle: string;
  category: string;
  content: string;
  answers_count: number;
  created_at: string;
};

const categoryColors: Record<string, string> = {
  Mietrecht: "border-l-blue-500",
  Arbeitsrecht: "border-l-purple-500",
  Verkehrsrecht: "border-l-red-500",
  Abmahnung: "border-l-amber-500",
  Vertragsrecht: "border-l-green-500",
  Familienrecht: "border-l-pink-500",
};

const categoryBg: Record<string, string> = {
  Mietrecht: "bg-blue-50 text-blue-700",
  Arbeitsrecht: "bg-purple-50 text-purple-700",
  Verkehrsrecht: "bg-red-50 text-red-700",
  Abmahnung: "bg-amber-50 text-amber-700",
  Vertragsrecht: "bg-green-50 text-green-700",
  Familienrecht: "bg-pink-50 text-pink-700",
};

function timeAgo(dateStr: string) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return 'gerade eben';
  if (diff < 3600) return `vor ${Math.floor(diff / 60)} Min.`;
  if (diff < 86400) return `vor ${Math.floor(diff / 3600)} Std.`;
  return `vor ${Math.floor(diff / 86400)} Tagen`;
}

function getAvatarColor(profile: LawyerProfile) {
  if (profile.avatar_color) {
    const match = AVATAR_COLORS.find(c => c.hex === profile.avatar_color);
    if (match) return match.bg;
  }
  // derive from name
  const idx = (profile.display_name?.charCodeAt(0) || 0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[idx].bg;
}

export default function Pro() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<LawyerProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("Alle");
  const [commented, setCommented] = useState<Record<string, boolean>>({});
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showPrivatModal, setShowPrivatModal] = useState(false);
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [commentText, setCommentText] = useState("");

  // Profile edit
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [editName, setEditName] = useState('');
  const [editCity, setEditCity] = useState('');
  const [editFirm, setEditFirm] = useState('');
  const [editColor, setEditColor] = useState('');
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  // Auth
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authRak, setAuthRak] = useState('');
  const [authCity, setAuthCity] = useState('');
  const [authFirm, setAuthFirm] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      else { setProfile(null); setPosts([]); }
    });
    return () => subscription.unsubscribe();
  }, []);

  async function fetchProfile(userId: string) {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (data) setProfile(data);
    fetchPosts();
  }

  async function fetchPosts() {
    setLoadingPosts(true);
    const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
    if (data) setPosts(data);
    setLoadingPosts(false);
  }

  function openProfileModal() {
    if (!profile) return;
    setEditName(profile.display_name || '');
    setEditCity(profile.city || '');
    setEditFirm(profile.law_firm || '');
    setEditColor(profile.avatar_color || '');
    setProfileSaved(false);
    setShowProfileModal(true);
  }

  async function saveProfile() {
    if (!user || !editName.trim() || !editCity) return;
    setProfileSaving(true);
    await supabase.from('profiles').update({
      display_name: editName.trim(),
      city: editCity,
      law_firm: editFirm.trim() || null,
      avatar_color: editColor || null,
    }).eq('id', user.id);
    await fetchProfile(user.id);
    setProfileSaving(false);
    setProfileSaved(true);
    setTimeout(() => { setShowProfileModal(false); setProfileSaved(false); }, 800);
  }

  async function handleSignUp() {
    if (!authEmail || !authPassword || !authName || !authRak || !authCity) {
      setAuthError('Bitte alle Pflichtfelder ausfüllen.');
      return;
    }
    if (authPassword.length < 6) { setAuthError('Passwort muss mindestens 6 Zeichen haben.'); return; }
    setAuthLoading(true);
    setAuthError('');
    const { data, error } = await supabase.auth.signUp({ email: authEmail, password: authPassword });
    if (error) { setAuthError(error.message); setAuthLoading(false); return; }
    if (data.user) {
      await new Promise(r => setTimeout(r, 1000));
      await supabase.from('profiles').update({
        role: 'lawyer',
        display_name: authName,
        rak_number: authRak,
        city: authCity,
        law_firm: authFirm || null,
      }).eq('id', data.user.id);
      await fetchProfile(data.user.id);
    }
    setShowAuthModal(false);
    resetAuthForm();
    setAuthLoading(false);
  }

  async function handleLogin() {
    if (!authEmail || !authPassword) { setAuthError('Bitte E-Mail und Passwort eingeben.'); return; }
    setAuthLoading(true);
    setAuthError('');
    const { error } = await supabase.auth.signInWithPassword({ email: authEmail, password: authPassword });
    if (error) { setAuthError('E-Mail oder Passwort falsch.'); setAuthLoading(false); return; }
    setShowAuthModal(false);
    resetAuthForm();
    setAuthLoading(false);
  }

  function resetAuthForm() {
    setAuthEmail(''); setAuthPassword(''); setAuthName('');
    setAuthRak(''); setAuthCity(''); setAuthFirm(''); setAuthError('');
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
  }

  function submitComment() {
    if (!commentText.trim() || !activePost) return;
    setCommented(prev => ({ ...prev, [activePost.id]: true }));
    setShowCommentModal(false);
    setCommentText('');
  }

  const filtered = categoryFilter === "Alle" ? posts : posts.filter(p => p.category === categoryFilter);

  // ── LOGGED-OUT LANDING ──
  if (!user || !profile) {
    return (
      <div className="min-h-screen bg-slate-50 font-sans">
        <nav className="bg-[#0F2444] px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <a href="/" className="font-black text-2xl tracking-tight"><span className="text-white">Recht</span><span className="text-[#F59E0B]">So</span></a>
          <button onClick={() => { setAuthMode('login'); setShowAuthModal(true); }}
            className="text-white/70 text-sm font-medium hover:text-white transition">
            Bereits registriert? Anmelden
          </button>
        </nav>

        <div className="bg-gradient-to-br from-[#0F2444] to-[#1a3a6b] px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-[#F59E0B]/20 text-[#F59E0B] text-xs font-bold px-4 py-2 rounded-full mb-8 tracking-widest uppercase">
            <Icons.VerifiedBadge size={14} />Für Rechtsanwälte
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-6">
            Neue Mandanten.<br /><span className="text-[#F59E0B]">Ohne Kaltakquise.</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Kommentieren Sie anonyme Rechtsfragen öffentlich und gewinnen Sie Vertrauen — bevor ein Mandant überhaupt fragt.
          </p>
          <button onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }}
            className="bg-[#F59E0B] text-[#0F2444] font-black text-lg px-10 py-4 rounded-2xl hover:bg-amber-400 transition shadow-xl">
            Jetzt als Anwalt registrieren — kostenlos
          </button>
          <p className="text-white/30 text-sm mt-4">Kein Abo · Keine Kreditkarte · RAK-Nummer genügt</p>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-20 grid sm:grid-cols-3 gap-8">
          {[
            { icon: "⚡", title: "Live-Mandantenstrom", text: "Sehen Sie Rechtsfragen in Echtzeit, bevor sie woanders landen." },
            { icon: "🔒", title: "BRAO-konform", text: "Öffentliche Kommentare sind sachlich, kein Werbeverbot, kein Risiko." },
            { icon: "✅", title: "Verifiziertes Profil", text: "RAK-Nummer bestätigt Ihre Zulassung. Mandanten sehen das Badge." },
          ].map(f => (
            <div key={f.title} className="text-center">
              <div className="w-14 h-14 bg-[#0F2444] rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4">{f.icon}</div>
              <h3 className="font-bold text-[#0F2444] mb-2">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.text}</p>
            </div>
          ))}
        </div>

        <div className="bg-slate-100 px-6 py-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-black text-[#0F2444] text-center mb-10">Preise</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-8 border border-slate-200">
                <div className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Basis</div>
                <div className="text-4xl font-black text-[#0F2444] mb-1">€39<span className="text-lg font-semibold text-slate-400">/Mo.</span></div>
                <ul className="space-y-3 text-sm text-slate-600 mt-6 mb-8">
                  {["Verifiziertes Profil", "Öffentlich kommentieren", "Sichtbarkeit im Feed"].map(f => (
                    <li key={f} className="flex gap-2 items-center"><span className="text-[#F59E0B]"><Icons.Check /></span>{f}</li>
                  ))}
                </ul>
                <button onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }}
                  className="w-full py-3 border-2 border-[#0F2444] text-[#0F2444] font-bold rounded-xl hover:bg-[#0F2444] hover:text-white transition text-sm">
                  Starten
                </button>
              </div>
              <div className="bg-[#0F2444] rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-[#F59E0B] text-[#0F2444] text-xs font-black px-3 py-1 rounded-full">BELIEBT</div>
                <div className="text-sm font-bold text-white/50 uppercase tracking-widest mb-2">Pro</div>
                <div className="text-4xl font-black text-white mb-1">€99<span className="text-lg font-semibold text-white/40">/Mo.</span></div>
                <ul className="space-y-3 text-sm text-white/70 mt-6 mb-8">
                  {["Alles aus Basis", "Live-Mandantenstrom", "Privatkontakt freischalten", "Priorität im Feed", "Monatsstatistiken"].map(f => (
                    <li key={f} className="flex gap-2 items-center"><span className="text-[#F59E0B]"><Icons.Check /></span>{f}</li>
                  ))}
                </ul>
                <button onClick={() => { setAuthMode('signup'); setShowAuthModal(true); }}
                  className="w-full py-3 bg-[#F59E0B] text-[#0F2444] font-black rounded-xl hover:bg-amber-400 transition text-sm">
                  Jetzt starten
                </button>
              </div>
            </div>
          </div>
        </div>

        {showAuthModal && (
          <div className="fixed inset-0 bg-[#0F2444]/70 z-40 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex bg-slate-100 rounded-2xl p-1 mb-7">
                  <button onClick={() => { setAuthMode('signup'); setAuthError(''); }}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition ${authMode === 'signup' ? 'bg-white text-[#0F2444] shadow-sm' : 'text-slate-400'}`}>
                    Registrieren
                  </button>
                  <button onClick={() => { setAuthMode('login'); setAuthError(''); }}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition ${authMode === 'login' ? 'bg-white text-[#0F2444] shadow-sm' : 'text-slate-400'}`}>
                    Anmelden
                  </button>
                </div>

                {authMode === 'signup' ? (
                  <>
                    <div className="font-black text-[#0F2444] text-2xl mb-1">Anwalt registrieren</div>
                    <p className="text-slate-400 text-sm mb-6">Kostenlos · RAK-Nummer als Nachweis</p>
                    <div className="space-y-3">
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Icons.User /></span>
                        <input type="text" name="fullname" autoComplete="name" value={authName} onChange={e => setAuthName(e.target.value)}
                          className="w-full border-2 border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-base outline-none focus:border-[#0F2444] transition"
                          placeholder="Vollständiger Name *" />
                      </div>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Icons.Mail /></span>
                        <input type="email" name="email" autoComplete="email" value={authEmail} onChange={e => setAuthEmail(e.target.value)}
                          className="w-full border-2 border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-base outline-none focus:border-[#0F2444] transition"
                          placeholder="E-Mail-Adresse *" />
                      </div>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Icons.Lock /></span>
                        <input type="password" name="new-password" autoComplete="new-password" value={authPassword} onChange={e => setAuthPassword(e.target.value)}
                          className="w-full border-2 border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-base outline-none focus:border-[#0F2444] transition"
                          placeholder="Passwort (min. 6 Zeichen) *" />
                      </div>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Icons.Badge /></span>
                        <input type="text" name="rak" autoComplete="off" value={authRak} onChange={e => setAuthRak(e.target.value)}
                          className="w-full border-2 border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-base outline-none focus:border-[#0F2444] transition"
                          placeholder="RAK-Nummer *" />
                      </div>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><Icons.MapPin /></span>
                        <select value={authCity} onChange={e => setAuthCity(e.target.value)}
                          className="w-full border-2 border-slate-200 rounded-xl pl-11 pr-10 py-3.5 text-base outline-none focus:border-[#0F2444] transition appearance-none bg-white text-slate-700">
                          <option value="">Stadt wählen *</option>
                          {GERMAN_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><Icons.ChevronDown /></span>
                      </div>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Icons.Briefcase /></span>
                        <input type="text" name="organization" autoComplete="organization" value={authFirm} onChange={e => setAuthFirm(e.target.value)}
                          className="w-full border-2 border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-base outline-none focus:border-[#0F2444] transition"
                          placeholder="Kanzleiname (optional)" />
                      </div>
                    </div>
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 my-4 text-xs text-amber-800 flex items-start gap-2">
                      <span className="flex-shrink-0 mt-0.5"><Icons.AlertTriangle /></span>
                      BRAO § 43b: Ihre Kommentare müssen sachlich und fachlich korrekt sein.
                    </div>
                  </>
                ) : (
                  <>
                    <div className="font-black text-[#0F2444] text-2xl mb-1">Willkommen zurück</div>
                    <p className="text-slate-400 text-sm mb-6">Melden Sie sich in Ihrem Anwaltskonto an.</p>
                    <div className="space-y-3">
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Icons.Mail /></span>
                        <input type="email" name="email" autoComplete="email" value={authEmail} onChange={e => setAuthEmail(e.target.value)}
                          className="w-full border-2 border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-base outline-none focus:border-[#0F2444] transition"
                          placeholder="E-Mail-Adresse" />
                      </div>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Icons.Lock /></span>
                        <input type="password" name="current-password" autoComplete="current-password" value={authPassword} onChange={e => setAuthPassword(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && handleLogin()}
                          className="w-full border-2 border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-base outline-none focus:border-[#0F2444] transition"
                          placeholder="Passwort" />
                      </div>
                    </div>
                  </>
                )}

                {authError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 mt-3 text-sm text-red-600 flex items-center gap-2">
                    <Icons.AlertTriangle />{authError}
                  </div>
                )}
                <button onClick={authMode === 'signup' ? handleSignUp : handleLogin} disabled={authLoading}
                  className="w-full mt-5 bg-[#0F2444] text-white font-black py-4 rounded-xl text-base hover:bg-[#1a3a6b] transition disabled:opacity-50">
                  {authLoading ? 'Bitte warten...' : authMode === 'signup' ? 'Konto erstellen' : 'Anmelden'}
                </button>
                <button onClick={() => { setShowAuthModal(false); resetAuthForm(); }}
                  className="w-full mt-3 py-3 text-slate-400 text-sm hover:text-slate-600 transition">Abbrechen</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  const avatarColor = getAvatarColor(profile);

  // ── LAWYER DASHBOARD ──
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <nav className="bg-[#0F2444] px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <a href="/" className="font-black text-2xl tracking-tight flex-shrink-0"><span className="text-white">Recht</span><span className="text-[#F59E0B]">So</span></a>
        <div className="flex items-center gap-3">
          {/* Clickable profile pill */}
          <button onClick={openProfileModal}
            className="hidden sm:flex items-center gap-2.5 bg-white/10 hover:bg-white/20 rounded-xl px-3 py-2 transition group">
            <span className={`w-8 h-8 ${avatarColor} rounded-lg flex items-center justify-center text-white text-xs font-black flex-shrink-0`}>
              {(profile.display_name || 'A').slice(0, 2).toUpperCase()}
            </span>
            <div className="leading-tight text-left">
              <div className="text-white text-sm font-bold">{profile.display_name}</div>
              <div className="text-white/40 text-xs">{profile.city}</div>
            </div>
            <span className="flex items-center gap-1.5 ml-1">
              <Icons.VerifiedBadge size={18} />
              <span className="text-teal-300 text-xs font-bold">Verifiziert</span>
            </span>
            <span className="text-white/30 group-hover:text-white/60 transition ml-1"><Icons.Edit /></span>
          </button>
          <button onClick={handleSignOut} className="text-white/40 hover:text-white transition"><Icons.LogOut /></button>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 py-6 pb-10">
        <div className="bg-gradient-to-r from-[#0F2444] to-[#1a3a6b] rounded-2xl p-6 mb-5 flex items-center justify-between">
          <div>
            <div className="font-black text-lg"><span className="text-white">Recht</span><span className="text-[#F59E0B]">So</span><span className="text-white/50"> Pro</span></div>
            <div className="text-white/60 text-sm mt-1">
              {profile.law_firm ? `${profile.law_firm} · ` : ''}{profile.city}
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-teal-300 text-xs font-bold">
              <Icons.VerifiedBadge size={15} />RAK {profile.rak_number} · Verifiziert
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="text-right">
              <div className="text-[#F59E0B] font-black text-3xl">{filtered.length}</div>
              <div className="text-white/40 text-xs">Offene Anfragen</div>
            </div>
            <button onClick={openProfileModal}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white/60 hover:text-white text-xs font-bold px-3 py-1.5 rounded-lg transition">
              <Icons.Edit />Profil bearbeiten
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: "Kommentiert", value: Object.keys(commented).length },
            { label: "Anfragen heute", value: posts.filter(p => new Date(p.created_at).toDateString() === new Date().toDateString()).length },
            { label: "Gesamt", value: posts.length },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-4 text-center">
              <div className="text-2xl font-black text-[#0F2444]">{s.value}</div>
              <div className="text-xs text-slate-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {["Alle", "Mietrecht", "Arbeitsrecht", "Verkehrsrecht", "Abmahnung", "Vertragsrecht", "Familienrecht"].map(cat => (
            <button key={cat} onClick={() => setCategoryFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap border flex-shrink-0 transition ${categoryFilter === cat ? "bg-[#0F2444] text-white border-[#0F2444]" : "bg-white text-slate-500 border-slate-200"}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Live · {filtered.length} Anfragen</span>
        </div>

        {loadingPosts ? (
          <div className="space-y-3">
            {[1,2,3].map(i => <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 animate-pulse h-32" />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-400">
            Noch keine Anfragen in dieser Kategorie.
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(post => {
              const borderColor = categoryColors[post.category] || "border-l-slate-300";
              const badgeStyle = categoryBg[post.category] || "bg-slate-50 text-slate-600";
              const isCommented = commented[post.id];
              return (
                <div key={post.id} className={`bg-white rounded-2xl border border-slate-200 border-l-4 ${borderColor} p-5`}>
                  <div className="flex items-start justify-between mb-2">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${badgeStyle}`}>{post.category}</span>
                    <span className="text-xs text-slate-300">{timeAgo(post.created_at)}</span>
                  </div>
                  <div className="text-xs font-semibold text-slate-400 mb-2">{post.handle}</div>
                  <p className="text-sm text-slate-700 leading-relaxed mb-4">{post.content}</p>
                  <div className="flex gap-2">
                    {isCommented ? (
                      <button className="flex-1 py-2.5 bg-[#0F2444] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5">
                        <Icons.Check />Kommentiert
                      </button>
                    ) : (
                      <button onClick={() => { setActivePost(post); setShowCommentModal(true); }}
                        className="flex-1 py-2.5 border-2 border-[#0F2444] text-[#0F2444] text-xs font-bold rounded-xl hover:bg-[#0F2444] hover:text-white transition flex items-center justify-center gap-1.5">
                        <Icons.Chat />Öffentlich kommentieren
                      </button>
                    )}
                    {isCommented ? (
                      <button onClick={() => { setActivePost(post); setShowPrivatModal(true); }}
                        className="flex-1 py-2.5 bg-teal-50 border-2 border-teal-300 text-teal-700 text-xs font-bold rounded-xl hover:bg-teal-600 hover:text-white transition flex items-center justify-center gap-1.5">
                        <Icons.Send />Privat anfragen
                      </button>
                    ) : (
                      <div className="flex-1 relative group">
                        <button className="w-full py-2.5 bg-slate-50 border-2 border-slate-200 text-slate-300 text-xs font-bold rounded-xl cursor-not-allowed flex items-center justify-center gap-1.5">
                          <Icons.Lock />Privat anfragen
                        </button>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition pointer-events-none z-10">
                          Erst öffentlich kommentieren
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── PROFILE EDIT MODAL ── */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-[#0F2444]/70 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="font-black text-[#0F2444] text-2xl mb-1">Profil bearbeiten</div>
              <p className="text-slate-400 text-sm mb-6">Änderungen sind sofort sichtbar.</p>

              {/* Avatar preview + color picker */}
              <div className="flex flex-col items-center mb-6">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl font-black mb-4 transition-colors`}
                  style={{ backgroundColor: editColor || AVATAR_COLORS[(profile.display_name?.charCodeAt(0) || 0) % AVATAR_COLORS.length].hex }}>
                  {(editName || profile.display_name || 'A').slice(0, 2).toUpperCase()}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium flex items-center gap-1"><Icons.Palette />Farbe:</span>
                  {AVATAR_COLORS.map(c => (
                    <button key={c.hex} onClick={() => setEditColor(c.hex)}
                      className={`w-7 h-7 rounded-full transition-all ${c.bg} ${editColor === c.hex ? 'ring-2 ring-offset-2 ring-slate-400 scale-110' : 'hover:scale-110'}`} />
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Icons.User /></span>
                  <input type="text" value={editName} onChange={e => setEditName(e.target.value)}
                    className="w-full border-2 border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-base outline-none focus:border-[#0F2444] transition"
                    placeholder="Vollständiger Name *" />
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><Icons.MapPin /></span>
                  <select value={editCity} onChange={e => setEditCity(e.target.value)}
                    className="w-full border-2 border-slate-200 rounded-xl pl-11 pr-10 py-3.5 text-base outline-none focus:border-[#0F2444] transition appearance-none bg-white text-slate-700">
                    <option value="">Stadt wählen *</option>
                    {GERMAN_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"><Icons.ChevronDown /></span>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Icons.Briefcase /></span>
                  <input type="text" value={editFirm} onChange={e => setEditFirm(e.target.value)}
                    className="w-full border-2 border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-base outline-none focus:border-[#0F2444] transition"
                    placeholder="Kanzleiname (optional)" />
                </div>
                {/* RAK shown but read-only */}
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Icons.VerifiedBadge size={16} /></span>
                  <input type="text" value={profile.rak_number || ''} readOnly
                    className="w-full border-2 border-slate-100 bg-slate-50 rounded-xl pl-11 pr-4 py-3.5 text-base text-slate-400 cursor-not-allowed"
                    placeholder="RAK-Nummer" />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-300 font-medium">Verifiziert</span>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowProfileModal(false)}
                  className="flex-1 py-3.5 border-2 border-slate-200 rounded-xl text-slate-500 font-semibold text-sm hover:bg-slate-50 transition">
                  Abbrechen
                </button>
                <button onClick={saveProfile} disabled={profileSaving || !editName.trim() || !editCity}
                  className={`flex-[2] py-3.5 font-black rounded-xl text-base transition flex items-center justify-center gap-2 ${profileSaved ? 'bg-green-500 text-white' : 'bg-[#0F2444] text-white hover:bg-[#1a3a6b] disabled:opacity-40'}`}>
                  {profileSaved ? <><Icons.Check />Gespeichert!</> : profileSaving ? 'Speichern...' : 'Speichern'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── COMMENT MODAL ── */}
      {showCommentModal && activePost && (
        <div className="fixed inset-0 bg-[#0F2444]/60 z-30 flex items-end justify-center p-4">
          <div className="bg-white rounded-t-3xl w-full max-w-2xl p-6">
            <div className="w-9 h-1 bg-slate-200 rounded-full mx-auto mb-5" />
            <div className="font-black text-[#0F2444] text-lg mb-1">Öffentlich kommentieren</div>
            <div className="text-slate-400 text-sm mb-4">Als <strong className="text-[#0F2444]">{profile.display_name}</strong> · {profile.city}</div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4 text-xs text-amber-800 flex items-start gap-2">
              <span className="flex-shrink-0"><Icons.AlertTriangle /></span>
              <span><strong>BRAO § 43b:</strong> Nur sachliche, fachlich korrekte Hinweise. Keine Werbung, keine Erfolgsversprechen.</span>
            </div>
            <textarea value={commentText} onChange={e => setCommentText(e.target.value)}
              className="w-full border-2 border-slate-200 rounded-xl p-4 text-sm font-sans resize-none outline-none min-h-28 focus:border-[#0F2444] text-slate-700"
              placeholder="Allgemeinen Rechtshinweis formulieren (kein persönlicher Rechtsrat)..." />
            <div className="flex gap-3 mt-4">
              <button onClick={() => setShowCommentModal(false)} className="flex-1 py-3 border-2 border-slate-200 rounded-xl text-slate-500 font-semibold text-sm">Abbrechen</button>
              <button onClick={submitComment} className="flex-[2] py-3 bg-[#0F2444] text-white font-black rounded-xl text-sm hover:bg-[#1a3a6b] transition">
                Kommentar veröffentlichen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── PRIVAT MODAL ── */}
      {showPrivatModal && (
        <div className="fixed inset-0 bg-[#0F2444]/60 z-30 flex items-end justify-center p-4">
          <div className="bg-white rounded-t-3xl w-full max-w-2xl p-6 text-center">
            <div className="w-9 h-1 bg-slate-200 rounded-full mx-auto mb-5" />
            <div className="text-4xl mb-3">🔒</div>
            <div className="font-black text-[#0F2444] text-lg mb-2">Privatnachricht gesendet</div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Der Mandant wurde benachrichtigt. Die weitere Kommunikation findet <strong>außerhalb von RechtSo</strong> statt.
            </p>
            <button onClick={() => setShowPrivatModal(false)} className="w-full py-3 bg-[#0F2444] text-white font-black rounded-xl hover:bg-[#1a3a6b] transition">
              Verstanden
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
