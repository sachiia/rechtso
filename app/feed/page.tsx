"use client";
import React, { useState, useEffect } from "react";
import { supabase } from '@/lib/supabase';

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
  ArrowRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  ),
  Scale: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="3" x2="12" y2="21"/><path d="M3 6l9-3 9 3"/><path d="M6 15l-3-9 9 3"/><path d="M18 15l3-9-9 3"/><path d="M3 15h6"/><path d="M15 15h6"/>
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
  User: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  LogOut: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
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
  Smile: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
    </svg>
  ),
  ThumbsUp: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"/><path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/>
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

// Detect personal info (RDG compliance)
function detectPersonalInfo(text: string): boolean {
  const patterns = [
    /\b[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}\b/,           // Email address
    /(\+49|0\d{2,4})[\s\-\d]{5,}/,                   // German phone number
    /\b\d{5}\b/,                                       // Postcode (PLZ)
    /\b(mein name ist|ich heiße|ich bin [A-ZÄÖÜ])/i, // Name introduction
    /\b[A-ZÄÖÜ][a-zäöüß]+(straße|str\.|weg|gasse|platz|allee)\b/i, // Street address
  ];
  return patterns.some(p => p.test(text));
}

type Post = {
  id: string;
  handle: string;
  category: string;
  content: string;
  answers_count: number;
  created_at: string;
};

type Comment = {
  id: string;
  content: string;
  created_at: string;
  lawyer_id: string;
  profiles: {
    display_name: string;
    city: string | null;
    law_firm: string | null;
    avatar_url: string | null;
    avatar_color: string | null;
    rak_number: string;
  } | null;
};

type Profile = {
  id: string;
  handle: string;
  role: string;
  questions_this_month: number;
  month_year: string;
};

function timeAgo(dateStr: string) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return 'gerade eben';
  if (diff < 3600) return `vor ${Math.floor(diff / 60)} Min.`;
  if (diff < 86400) return `vor ${Math.floor(diff / 3600)} Std.`;
  return `vor ${Math.floor(diff / 86400)} Tagen`;
}

function CategoryIcon({ category }: { category: string }) {
  const map: Record<string, () => React.JSX.Element> = {
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
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // 3-step question form state
  const [modalStep, setModalStep] = useState<1 | 2 | 3>(1);
  const [selectedCat, setSelectedCat] = useState("");
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionBody, setQuestionBody] = useState("");
  const [confirmRdg, setConfirmRdg] = useState(false);
  const [personalInfoWarning, setPersonalInfoWarning] = useState(false);

  // Me Too tracking (local state for MVP)
  const [metoos, setMetoos] = useState<Record<string, boolean>>({});

  // Comments for detail view
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);

  // ── AUTH STATE ──
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [authStep, setAuthStep] = useState<'credentials' | 'handle'>('credentials');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [handleInput, setHandleInput] = useState('');
  const [handleError, setHandleError] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [handleLoading, setHandleLoading] = useState(false);

  const quota = profile ? Math.max(0, 2 - profile.questions_this_month) : 2;
  const isLawyer = profile?.role === 'lawyer';

  useEffect(() => {
    fetchPosts();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchProfile(session.user.id);
      else setProfile(null);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function fetchPosts() {
    setLoading(true);
    const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
    if (data) setPosts(data);
    setLoading(false);
  }

  async function loadComments(postId: string) {
    setCommentsLoading(true);
    const { data } = await supabase
      .from('comments')
      .select('id, content, created_at, lawyer_id, profiles:lawyer_id(display_name, city, law_firm, avatar_url, avatar_color, rak_number)')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });
    if (data) setComments(data as Comment[]);
    setCommentsLoading(false);
  }

  useEffect(() => {
    if (selectedPost) {
      setComments([]);
      loadComments(selectedPost.id);
    }
  }, [selectedPost?.id]);

  async function fetchProfile(userId: string) {
    const { data } = await supabase.from('profiles').select('*').eq('id', userId).single();
    if (data) {
      const currentMonth = new Date().toISOString().slice(0, 7);
      if (data.month_year !== currentMonth) {
        await supabase.from('profiles').update({ questions_this_month: 0, month_year: currentMonth }).eq('id', userId);
        setProfile({ ...data, questions_this_month: 0, month_year: currentMonth });
      } else {
        setProfile(data);
      }
    }
  }

  async function handleSignUp() {
    if (!authEmail || !authPassword) { setAuthError('Bitte E-Mail und Passwort eingeben.'); return; }
    if (authPassword.length < 6) { setAuthError('Passwort muss mindestens 6 Zeichen haben.'); return; }
    setAuthLoading(true);
    setAuthError('');
    const { data, error } = await supabase.auth.signUp({ email: authEmail, password: authPassword });
    if (error) {
      setAuthError(error.message);
      setAuthLoading(false);
      return;
    }
    if (data.user) {
      await fetchProfile(data.user.id);
      setAuthStep('handle');
    }
    setAuthLoading(false);
  }

  async function handleLogin() {
    if (!authEmail || !authPassword) { setAuthError('Bitte E-Mail und Passwort eingeben.'); return; }
    setAuthLoading(true);
    setAuthError('');
    const { error } = await supabase.auth.signInWithPassword({ email: authEmail, password: authPassword });
    if (error) setAuthError('E-Mail oder Passwort falsch.');
    else { setShowAuthModal(false); setAuthEmail(''); setAuthPassword(''); }
    setAuthLoading(false);
  }

  async function saveHandle() {
    const trimmed = handleInput.trim();
    if (trimmed.length < 3) { setHandleError('Mindestens 3 Zeichen.'); return; }
    if (trimmed.length > 24) { setHandleError('Maximal 24 Zeichen.'); return; }
    setHandleLoading(true);
    setHandleError('');
    const { data: existing } = await supabase.from('profiles').select('id').eq('handle', trimmed).maybeSingle();
    if (existing) { setHandleError('Dieser Name ist bereits vergeben. Bitte wähle einen anderen.'); setHandleLoading(false); return; }
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      await supabase.from('profiles').update({ handle: trimmed }).eq('id', session.user.id);
      await fetchProfile(session.user.id);
    }
    setHandleLoading(false);
    setShowAuthModal(false);
    setAuthEmail('');
    setAuthPassword('');
    setHandleInput('');
    setAuthStep('credentials');
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
  }

  function openQuestionModal(cat?: string) {
    if (!user) { setAuthMode('signup'); setAuthStep('credentials'); setShowAuthModal(true); return; }
    if (cat) { setSelectedCat(cat); setModalStep(2); } else { setModalStep(1); }
    setQuestionTitle('');
    setQuestionBody('');
    setConfirmRdg(false);
    setPersonalInfoWarning(false);
    setShowModal(true);
  }

  function handleBodyChange(val: string) {
    setQuestionBody(val);
    setPersonalInfoWarning(detectPersonalInfo(val));
  }

  async function submitQuestion() {
    if (!questionTitle.trim() || !selectedCat || !user || !profile || !confirmRdg) return;
    if (profile.questions_this_month >= 2) return;
    const content = questionTitle.trim() + (questionBody.trim() ? '\n\n' + questionBody.trim() : '');
    await supabase.from('posts').insert({ handle: profile.handle, category: selectedCat, content });
    const currentMonth = new Date().toISOString().slice(0, 7);
    await supabase.from('profiles').update({ questions_this_month: profile.questions_this_month + 1, month_year: currentMonth }).eq('id', user.id);
    setProfile(p => p ? { ...p, questions_this_month: p.questions_this_month + 1 } : null);
    setShowModal(false);
    setQuestionTitle('');
    setQuestionBody('');
    setSelectedCat('');
    setConfirmRdg(false);
    setSubmitted(true);
    fetchPosts();
    setTimeout(() => setSubmitted(false), 4000);
  }

  function toggleMetoo(postId: string) {
    if (!user) { setAuthMode('signup'); setAuthStep('credentials'); setShowAuthModal(true); return; }
    setMetoos(prev => ({ ...prev, [postId]: !prev[postId] }));
  }

  const filtered = activeCategory === "Alle" ? posts : posts.filter(p => p.category === activeCategory);

  // ── CASE DETAIL ──
  if (selectedPost) {
    const blurb = blurbs[selectedPost.category];
    const cfg = categoryConfig[selectedPost.category] || { color: "text-slate-700", border: "border-l-slate-400", bg: "bg-slate-50", text: "text-slate-700" };
    return (
      <div className="min-h-screen bg-[#f0f2f5] font-sans">
        <nav className="bg-[#0F2444] px-8 py-4 flex items-center gap-5 sticky top-0 z-20 shadow-lg">
          <span className="font-black text-2xl tracking-tight"><span className="text-white">IstDas</span><span className="text-[#F59E0B]">Erlaubt</span></span>
        </nav>
        <div className="bg-amber-50 border-b border-amber-200 text-center text-sm text-amber-800 font-medium py-2.5 px-4 flex items-center justify-center gap-2">
          <Icons.AlertTriangle /><span>Dies ist keine Rechtsberatung. Bitte konsultieren Sie einen zugelassenen Rechtsanwalt.</span>
        </div>
        <div className="max-w-3xl mx-auto px-6 py-10 pb-24">
          <button onClick={() => setSelectedPost(null)} className="flex items-center gap-2 text-[#0F2444] font-semibold text-base mb-8 hover:opacity-70 transition">
            <Icons.ArrowLeft /> Zurück zum Feed
          </button>
          <div className="bg-[#0F2444] rounded-2xl p-7 mb-6 text-white">
            <div className="text-xs text-white/40 font-bold uppercase tracking-widest mb-2">IDE-{selectedPost.id.slice(0, 8).toUpperCase()}</div>
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
          <div className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-4">{comments.length} Anwaltsantworten</div>
          {commentsLoading ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-slate-400 animate-pulse">
              Antworten werden geladen...
            </div>
          ) : comments.length > 0 ? (
            <div className="space-y-4">
              {comments.map(comment => {
                const p = comment.profiles;
                const initials = p?.display_name ? p.display_name.slice(0, 2).toUpperCase() : '??';
                // Split disclaimer from main content
                const disclaimerMarker = '\n\n⚖️';
                const markerIdx = comment.content.indexOf(disclaimerMarker);
                const mainContent = markerIdx > -1 ? comment.content.slice(0, markerIdx) : comment.content;
                const disclaimer = markerIdx > -1 ? comment.content.slice(markerIdx + 2) : null;
                return (
                  <div key={comment.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                    <div className="flex gap-4 mb-5">
                      {p?.avatar_url ? (
                        <img src={p.avatar_url} alt={initials} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
                      ) : (
                        <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                          style={{ backgroundColor: p?.avatar_color || '#0F2444' }}>
                          {initials}
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-[#0F2444] text-base">{p?.display_name || 'Rechtsanwalt'}</div>
                        <div className="text-slate-400 text-sm">
                          Rechtsanwalt{p?.city ? ` · ${p.city}` : ''}{p?.law_firm ? ` · ${p.law_firm}` : ''}
                        </div>
                        <div className="flex gap-2 mt-2">
                          <span className="bg-teal-50 text-teal-700 border border-teal-200 text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1.5">
                            <Icons.Check />RAK verifiziert
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-slate-600 text-base leading-relaxed border-t border-slate-100 pt-5 mb-4 whitespace-pre-wrap">
                      {mainContent}
                    </p>
                    {disclaimer && (
                      <p className="text-slate-400 text-xs leading-relaxed border-t border-slate-100 pt-3 italic">
                        {disclaimer}
                      </p>
                    )}
                    {p && (
                      <a href={`/anwalt/${p.display_name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="mt-4 inline-flex bg-[#0D9488] text-white text-sm font-bold px-6 py-3 rounded-xl hover:bg-teal-700 transition items-center gap-2">
                        <Icons.Send />Privates Gespräch anfragen
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 text-slate-400 bg-white rounded-2xl border border-slate-200">
              <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-300"><Icons.Chat /></div>
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
      <nav className="bg-[#0F2444] px-4 sm:px-8 py-3 sm:py-4 flex items-center gap-3 sm:gap-5 sticky top-0 z-20 shadow-lg">
        <span className="font-black text-xl sm:text-2xl tracking-tight flex-shrink-0"><span className="text-white">IstDas</span><span className="text-[#F59E0B]">Erlaubt</span></span>
        {/* Search — desktop only */}
        <div className="flex-1 relative hidden sm:flex">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"><Icons.Search /></span>
          <input className="w-full bg-white/10 border border-white/20 rounded-xl pl-10 pr-4 py-2.5 text-white text-base placeholder-white/40 outline-none focus:bg-white/20 transition" placeholder="Mietrecht, Abmahnung, Kündigung..." />
        </div>
        {/* Spacer on mobile */}
        <div className="flex-1 sm:hidden" />
        {user && profile ? (
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Desktop: full user badge */}
            <div className="hidden sm:flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
              <span className="text-white/50"><Icons.User /></span>
              <span className="text-white text-sm font-bold">{profile.handle}</span>
              <span className={`text-xs font-black px-2 py-0.5 rounded-full ${quota === 0 ? 'bg-red-500 text-white' : 'bg-[#F59E0B] text-[#0F2444]'}`}>{quota}</span>
            </div>
            {/* Mobile: just the quota pill */}
            <span className={`sm:hidden text-xs font-black px-2.5 py-1 rounded-full ${quota === 0 ? 'bg-red-500 text-white' : 'bg-[#F59E0B] text-[#0F2444]'}`}>{quota} übrig</span>
            <button onClick={handleSignOut} className="hidden sm:block text-white/40 hover:text-white transition"><Icons.LogOut /></button>
            <button onClick={() => openQuestionModal()} className="bg-[#F59E0B] text-[#0F2444] font-black text-sm px-4 py-2.5 rounded-xl hover:bg-amber-400 transition hidden sm:flex items-center gap-2">
              <Icons.Plus />Frage stellen
            </button>
            <button onClick={() => setShowMobileMenu(true)} className="sm:hidden text-white/60 hover:text-white transition p-2">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 flex-shrink-0">
            <button onClick={() => { setAuthMode('login'); setAuthStep('credentials'); setShowAuthModal(true); }} className="text-white/70 text-sm font-medium px-4 py-2 rounded-xl hover:text-white hover:bg-white/10 transition hidden sm:block">
              Anmelden
            </button>
            {/* Desktop CTA */}
            <button onClick={() => { setAuthMode('signup'); setAuthStep('credentials'); setShowAuthModal(true); }} className="bg-[#F59E0B] text-[#0F2444] font-black text-sm px-4 py-2.5 rounded-xl hover:bg-amber-400 transition hidden sm:flex items-center gap-2">
              <Icons.Plus />Kostenlos starten
            </button>
            {/* Mobile: hamburger only */}
            <button onClick={() => setShowMobileMenu(true)} className="sm:hidden text-white/60 hover:text-white transition p-2">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>
        )}
      </nav>

      <div className="bg-amber-50 border-b border-amber-200 text-center text-sm text-amber-800 font-medium py-2.5 px-4 flex items-center justify-center gap-2">
        <Icons.AlertTriangle /><span>Dies ist keine Rechtsberatung. Bitte konsultieren Sie einen zugelassenen Rechtsanwalt.</span>
      </div>

      <div className="bg-[#0F2444] px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-white font-black text-3xl">Rechtsfragen der Community</h1>
            <p className="text-white/50 text-base mt-1">Echte Fälle · Echte Anwälte · 100% anonym</p>
          </div>
          <div className="flex gap-8">
            <div className="text-center"><div className="text-[#F59E0B] font-black text-2xl">{posts.length}</div><div className="text-white/40 text-sm">Fragen</div></div>
            <div className="text-center"><div className="text-[#F59E0B] font-black text-2xl">{posts.reduce((a, p) => a + p.answers_count, 0)}</div><div className="text-white/40 text-sm">Antworten</div></div>
            <div className="text-center"><div className="text-[#F59E0B] font-black text-2xl">100%</div><div className="text-white/40 text-sm">Anonym</div></div>
          </div>
        </div>
      </div>

      <div className="w-full px-6 py-6 pb-28 flex gap-6">
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
                      {cfg && <span className={activeCategory === cat ? "text-white/60" : cfg.color}><CategoryIcon category={cat} /></span>}
                      {!cfg && <span className="w-[18px]" />}
                      {cat}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${activeCategory === cat ? "bg-white/20 text-white" : "bg-slate-100 text-slate-400"}`}>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="flex gap-2 overflow-x-auto pb-2 mb-4 lg:hidden">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap border transition ${activeCategory === cat ? "bg-[#0F2444] text-white border-[#0F2444]" : "bg-white text-slate-500 border-slate-200"}`}>
                {cat}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#0F2444] rounded-full flex items-center justify-center text-white flex-shrink-0">
                {user && profile ? <span className="text-sm font-black">{profile.handle.slice(0, 2).toUpperCase()}</span> : <Icons.Scale />}
              </div>
              <button onClick={() => openQuestionModal()}
                className="flex-1 bg-[#f0f2f5] hover:bg-slate-200 border border-transparent rounded-full px-5 py-3 text-left text-slate-400 text-base transition cursor-pointer font-medium">
                {user && profile ? `Was ist Ihre Rechtsfrage, ${profile.handle}?` : 'Haben Sie eine Rechtsfrage? Anonym stellen…'}
              </button>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 flex gap-2 flex-wrap">
              {["Mietrecht", "Abmahnung", "Arbeitsrecht"].map(cat => {
                const cfg = categoryConfig[cat];
                return (
                  <button key={cat} onClick={() => openQuestionModal(cat)}
                    className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl ${cfg.bg} ${cfg.text} hover:opacity-80 transition`}>
                    <CategoryIcon category={cat} />{cat}
                  </button>
                );
              })}
              <button onClick={() => openQuestionModal()} className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition ml-auto">
                Weitere →
              </button>
            </div>
          </div>

          {submitted && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center mb-4">
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
            </select>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1,2,3].map(i => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 animate-pulse">
                  <div className="h-5 bg-slate-100 rounded w-1/3 mb-4" /><div className="h-4 bg-slate-100 rounded w-full mb-2" /><div className="h-4 bg-slate-100 rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filtered.map(post => {
                const cfg = categoryConfig[post.category] || { color: "text-slate-600", border: "border-l-slate-300", bg: "bg-slate-50", text: "text-slate-600" };
                const hasMetoo = metoos[post.id];
                return (
                  <div key={post.id} className={`bg-white rounded-2xl border border-slate-200 border-l-4 ${cfg.border} p-6 group`}>
                    <div className="flex items-start justify-between gap-4 mb-4 cursor-pointer" onClick={() => setSelectedPost(post)}>
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
                    <p onClick={() => setSelectedPost(post)} className="text-slate-600 text-base leading-relaxed mb-4 line-clamp-2 group-hover:text-slate-800 transition-colors cursor-pointer">{post.content}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <button onClick={() => setSelectedPost(post)}
                        className={`text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-2 ${post.answers_count > 0 ? "bg-teal-50 text-teal-700 border border-teal-200" : "bg-slate-50 text-slate-400 border border-slate-200"}`}>
                        <Icons.Chat />{post.answers_count} Anwaltsantworten
                      </button>

                      {/* Role-based interaction */}
                      {isLawyer ? (
                        <a href="/pro"
                          className="text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-2 bg-[#0F2444] text-white hover:bg-[#1a3a6b] transition border border-[#0F2444]">
                          <Icons.Chat />Kommentieren (Pro)
                        </a>
                      ) : (
                        <button onClick={() => toggleMetoo(post.id)}
                          className={`text-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-2 transition border ${hasMetoo ? "bg-[#F59E0B] text-[#0F2444] border-[#F59E0B]" : "bg-white text-slate-500 border-slate-200 hover:border-[#F59E0B] hover:text-[#F59E0B]"}`}>
                          <Icons.ThumbsUp />
                          {hasMetoo ? 'Ich auch! ✓' : 'Ich auch!'}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>

        <aside className="hidden xl:block flex-shrink-0" style={{ width: '320px' }}>
          <div className="space-y-4 sticky top-24">
            <div className="bg-[#0F2444] rounded-2xl p-6 text-white">
              {user && profile ? (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center font-black text-white text-sm">{profile.handle.slice(0,2).toUpperCase()}</div>
                    <div>
                      <div className="font-bold text-white">{profile.handle}</div>
                      <div className="text-white/50 text-xs">Angemeldet</div>
                    </div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-3 mb-4 text-center">
                    <div className={`font-black text-2xl ${quota === 0 ? 'text-red-400' : 'text-[#F59E0B]'}`}>{quota}</div>
                    <div className="text-white/50 text-xs">Fragen verbleibend diesen Monat</div>
                  </div>
                  <button onClick={() => openQuestionModal()} disabled={quota === 0}
                    className={`w-full font-black text-base py-3.5 rounded-xl transition flex items-center justify-center gap-2 ${quota === 0 ? 'bg-white/10 text-white/30 cursor-not-allowed' : 'bg-[#F59E0B] text-[#0F2444] hover:bg-amber-400'}`}>
                    <Icons.Plus />{quota === 0 ? 'Limit erreicht' : 'Frage stellen'}
                  </button>
                </>
              ) : (
                <>
                  <div className="font-black text-xl mb-2">Rechtsfrage?</div>
                  <p className="text-white/60 text-sm leading-relaxed mb-5">Stelle deine Frage anonym. Echte Anwälte antworten — kostenlos.</p>
                  <button onClick={() => { setAuthMode('signup'); setAuthStep('credentials'); setShowAuthModal(true); }} className="w-full bg-[#F59E0B] text-[#0F2444] font-black text-base py-3.5 rounded-xl hover:bg-amber-400 transition flex items-center justify-center gap-2">
                    <Icons.Plus />Kostenlos starten
                  </button>
                  <button onClick={() => { setAuthMode('login'); setAuthStep('credentials'); setShowAuthModal(true); }} className="w-full mt-2 text-white/50 text-sm py-2 hover:text-white transition">
                    Bereits registriert? Anmelden
                  </button>
                </>
              )}
            </div>

            <a href="/anwalt"
              className="block bg-[#0F2444] rounded-2xl p-5 hover:bg-[#1a3a6b] transition group">
              <div className="flex items-center gap-2 mb-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-widest">Anwälte finden</span>
              </div>
              <div className="font-black text-white text-base leading-snug mb-3">Den richtigen Anwalt für Ihr Anliegen</div>
              <div className="w-full bg-[#F59E0B] group-hover:bg-amber-400 text-[#0F2444] font-black text-sm py-2.5 rounded-xl text-center transition">
                Anwaltsverzeichnis →
              </div>
            </a>

            <a href="/pro"
              className="block bg-white border-2 border-slate-200 rounded-2xl p-5 hover:border-[#0F2444] transition group">
              <div className="flex items-center gap-2 mb-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F2444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                </svg>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Für Anwälte</span>
              </div>
              <div className="font-black text-[#0F2444] text-base leading-snug mb-3">Mandanten gewinnen ab €39/Monat</div>
              <div className="w-full bg-[#0F2444] group-hover:bg-[#1a3a6b] text-white font-black text-sm py-2.5 rounded-xl text-center transition">
                Als Anwalt registrieren →
              </div>
            </a>
          </div>
        </aside>
      </div>

      <div className="fixed bottom-6 left-4 right-4 max-w-md mx-auto z-20 sm:hidden">
        <button onClick={() => openQuestionModal()}
          className="w-full bg-[#0F2444] text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl hover:bg-[#1a3a6b] transition">
          <Icons.Plus />Frage stellen
          <span className={`text-sm font-black px-2.5 py-1 rounded-full ${quota === 0 ? "bg-red-500 text-white" : "bg-[#F59E0B] text-[#0F2444]"}`}>{quota} verbleibend</span>
        </button>
      </div>

      {/* ── MOBILE MENU ── */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-50 sm:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileMenu(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 shadow-2xl">
            <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-6" />
            <div className="font-black text-[#0F2444] text-lg mb-5">Menü</div>
            <div className="space-y-3">
              <a href="/anwalt" className="flex items-center gap-4 bg-[#0F2444] rounded-2xl p-4 group">
                <div className="w-11 h-11 bg-[#F59E0B] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0F2444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <div>
                  <div className="font-black text-white text-base">Anwaltsverzeichnis</div>
                  <div className="text-white/50 text-sm">Den richtigen Anwalt finden</div>
                </div>
                <svg className="ml-auto text-white/30" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </a>
              <a href="/pro" className="flex items-center gap-4 bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 group hover:border-[#0F2444] transition">
                <div className="w-11 h-11 bg-[#0F2444] rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div>
                  <div className="font-black text-[#0F2444] text-base">Als Anwalt registrieren</div>
                  <div className="text-slate-400 text-sm">Mandanten gewinnen ab €39/Mo.</div>
                </div>
                <svg className="ml-auto text-slate-300" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
              </a>
              {user && profile ? (
                <button onClick={() => { setShowMobileMenu(false); openQuestionModal(); }}
                  disabled={quota === 0}
                  className={`w-full flex items-center gap-4 rounded-2xl p-4 border-2 ${quota === 0 ? 'bg-slate-50 border-slate-200 opacity-50' : 'bg-[#F59E0B]/10 border-[#F59E0B]'}`}>
                  <div className="w-11 h-11 bg-[#F59E0B] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icons.Plus />
                  </div>
                  <div className="text-left">
                    <div className="font-black text-[#0F2444] text-base">{quota === 0 ? 'Fragelimit erreicht' : 'Frage stellen'}</div>
                    <div className="text-slate-400 text-sm">{quota} von 2 Fragen verbleibend</div>
                  </div>
                </button>
              ) : (
                <>
                  <button onClick={() => { setShowMobileMenu(false); setAuthMode('signup'); setAuthStep('credentials'); setShowAuthModal(true); }}
                    className="w-full flex items-center gap-4 bg-[#F59E0B] rounded-2xl p-4">
                    <div className="w-11 h-11 bg-[#0F2444]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icons.Plus />
                    </div>
                    <div className="text-left">
                      <div className="font-black text-[#0F2444] text-base">Kostenlos starten</div>
                      <div className="text-[#0F2444]/60 text-sm">2 Fragen/Monat · Anonym</div>
                    </div>
                    <svg className="ml-auto text-[#0F2444]/40" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"/></svg>
                  </button>
                  <button onClick={() => { setShowMobileMenu(false); setAuthMode('login'); setAuthStep('credentials'); setShowAuthModal(true); }}
                    className="w-full flex items-center gap-4 bg-slate-50 border-2 border-slate-200 rounded-2xl p-4">
                    <div className="w-11 h-11 bg-slate-200 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icons.User />
                    </div>
                    <div className="text-left">
                      <div className="font-black text-[#0F2444] text-base">Anmelden</div>
                      <div className="text-slate-400 text-sm">Bereits registriert?</div>
                    </div>
                  </button>
                </>
              )}
            </div>
            <button onClick={() => setShowMobileMenu(false)}
              className="w-full mt-4 py-3.5 text-slate-400 font-semibold text-sm">
              Schließen
            </button>
          </div>
        </div>
      )}

      {/* ── AUTH MODAL ── */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-[#0F2444]/70 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden">

            {/* STEP 1: credentials */}
            {authStep === 'credentials' && (
              <div className="p-8">
                <div className="flex bg-slate-100 rounded-2xl p-1 mb-7">
                  <button onClick={() => { setAuthMode('signup'); setAuthError(''); }}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition ${authMode === 'signup' ? 'bg-white text-[#0F2444] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
                    Registrieren
                  </button>
                  <button onClick={() => { setAuthMode('login'); setAuthError(''); }}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition ${authMode === 'login' ? 'bg-white text-[#0F2444] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>
                    Anmelden
                  </button>
                </div>
                <div className="font-black text-[#0F2444] text-2xl mb-1">
                  {authMode === 'signup' ? 'Kostenlos starten' : 'Willkommen zurück'}
                </div>
                <p className="text-slate-400 text-sm mb-6">
                  {authMode === 'signup' ? '2 Fragen pro Monat · Anonym · Kein Abo' : 'Melden Sie sich an, um fortzufahren.'}
                </p>
                <div className="space-y-3 mb-4">
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Icons.Mail /></span>
                    <input type="email" value={authEmail} onChange={e => setAuthEmail(e.target.value)}
                      className="w-full border-2 border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-base outline-none focus:border-[#0F2444] transition text-slate-700"
                      placeholder="E-Mail-Adresse" />
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Icons.Lock /></span>
                    <input type="password" value={authPassword} onChange={e => setAuthPassword(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && (authMode === 'signup' ? handleSignUp() : handleLogin())}
                      className="w-full border-2 border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-base outline-none focus:border-[#0F2444] transition text-slate-700"
                      placeholder={authMode === 'signup' ? 'Passwort (min. 6 Zeichen)' : 'Passwort'} />
                  </div>
                </div>
                {authError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 text-sm text-red-600 flex items-center gap-2">
                    <Icons.AlertTriangle />{authError}
                  </div>
                )}
                <button onClick={authMode === 'signup' ? handleSignUp : handleLogin} disabled={authLoading}
                  className="w-full bg-[#0F2444] text-white font-black py-4 rounded-xl text-base hover:bg-[#1a3a6b] transition disabled:opacity-50 mb-3">
                  {authLoading ? 'Bitte warten...' : authMode === 'signup' ? 'Weiter →' : 'Anmelden'}
                </button>
                <button onClick={() => { setShowAuthModal(false); setAuthError(''); setAuthEmail(''); setAuthPassword(''); }}
                  className="w-full py-3 text-slate-400 text-sm hover:text-slate-600 transition">Abbrechen</button>
              </div>
            )}

            {/* STEP 2: choose handle */}
            {authStep === 'handle' && (
              <div className="p-8">
                <div className="w-16 h-16 bg-[#F59E0B]/10 rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <Icons.Smile />
                </div>
                <div className="font-black text-[#0F2444] text-2xl text-center mb-2">Wähle deinen Namen</div>
                <p className="text-slate-400 text-sm text-center mb-2">Dein anonymer Name auf IstDasErlaubt. Du kannst ihn jederzeit ändern.</p>
                <p className="text-slate-300 text-xs text-center mb-6">Kein Klarname empfohlen — bleib anonym.</p>

                <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 mb-4 text-center">
                  <div className="text-xs text-slate-400 mb-1">Dein zufälliger Name (Vorschlag)</div>
                  <div className="font-black text-[#0F2444] text-lg">{profile?.handle}</div>
                  <button onClick={() => setHandleInput(profile?.handle || '')} className="text-xs text-teal-500 hover:text-teal-700 mt-1 transition">
                    Diesen Namen behalten
                  </button>
                </div>

                <div className="relative mb-2">
                  <input
                    type="text"
                    value={handleInput}
                    onChange={e => { setHandleInput(e.target.value); setHandleError(''); }}
                    onKeyDown={e => e.key === 'Enter' && saveHandle()}
                    className="w-full border-2 border-slate-200 rounded-xl px-4 py-3.5 text-base outline-none focus:border-[#0F2444] transition text-slate-700 text-center font-bold"
                    placeholder="Eigenen Namen eingeben..."
                    maxLength={24}
                  />
                  <div className="text-right text-xs text-slate-300 mt-1">{handleInput.length}/24</div>
                </div>

                {handleError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 text-sm text-red-600 flex items-center gap-2">
                    <Icons.AlertTriangle />{handleError}
                  </div>
                )}

                <button onClick={saveHandle} disabled={handleLoading || handleInput.trim().length < 3}
                  className="w-full bg-[#0F2444] text-white font-black py-4 rounded-xl text-base hover:bg-[#1a3a6b] transition disabled:opacity-40 mt-2">
                  {handleLoading ? 'Speichern...' : 'Los geht\'s →'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── 3-STEP QUESTION MODAL ── */}
      {showModal && (
        <div className="fixed inset-0 bg-[#0F2444]/60 z-30 flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mt-5 sm:hidden" />

            {/* Step indicator */}
            <div className="flex items-center gap-2 px-7 pt-6 pb-4 border-b border-slate-100">
              {[1,2,3].map(s => (
                <React.Fragment key={s}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black transition-all ${
                    modalStep === s ? 'bg-[#0F2444] text-white scale-110' :
                    modalStep > s ? 'bg-teal-500 text-white' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {modalStep > s ? <Icons.Check /> : s}
                  </div>
                  {s < 3 && <div className={`flex-1 h-1 rounded-full transition-all ${modalStep > s ? 'bg-teal-500' : 'bg-slate-100'}`} />}
                </React.Fragment>
              ))}
              <span className="ml-3 text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                {modalStep === 1 ? 'Kategorie' : modalStep === 2 ? 'Ihre Frage' : 'Bestätigung'}
              </span>
            </div>

            <div className="p-7 max-h-[70vh] overflow-y-auto">

              {/* STEP 1: Category */}
              {modalStep === 1 && (
                <>
                  <div className="font-black text-[#0F2444] text-2xl mb-1">Rechtsgebiet wählen</div>
                  <p className="text-slate-400 text-sm mb-6">In welchem Bereich liegt Ihre Frage?</p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {["Mietrecht", "Arbeitsrecht", "Verkehrsrecht", "Abmahnung", "Vertragsrecht", "Familienrecht"].map(cat => {
                      const cfg = categoryConfig[cat];
                      return (
                        <button key={cat} onClick={() => { setSelectedCat(cat); setModalStep(2); }}
                          className={`py-4 rounded-xl text-sm font-bold border-2 transition flex flex-col items-center justify-center gap-2 ${selectedCat === cat ? "bg-[#0F2444] text-white border-[#0F2444]" : "bg-white text-slate-500 border-slate-200 hover:border-[#0F2444]"}`}>
                          <span className={selectedCat === cat ? "text-white/70" : cfg.color}><CategoryIcon category={cat} /></span>
                          {cat}
                        </button>
                      );
                    })}
                  </div>
                  <button onClick={() => setShowModal(false)} className="w-full mt-5 py-3 text-slate-400 text-sm hover:text-slate-600 transition">Abbrechen</button>
                </>
              )}

              {/* STEP 2: Question */}
              {modalStep === 2 && (
                <>
                  <div className="font-black text-[#0F2444] text-2xl mb-1">Ihre Situation</div>
                  <p className="text-slate-400 text-sm mb-5">
                    Als <strong className="text-[#0F2444]">{profile?.handle}</strong> · Kategorie: <span className={`font-bold ${categoryConfig[selectedCat]?.text}`}>{selectedCat}</span>
                  </p>

                  <div className="mb-4">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Kernfrage (max. 100 Zeichen)</label>
                    <input
                      type="text"
                      value={questionTitle}
                      onChange={e => setQuestionTitle(e.target.value.slice(0, 100))}
                      className="w-full border-2 border-slate-200 rounded-xl px-4 py-3.5 text-base outline-none focus:border-[#0F2444] transition text-slate-700 font-semibold"
                      placeholder="Darf mein Vermieter die Miete einfach erhöhen?"
                    />
                    <div className="text-right text-xs text-slate-300 mt-1">{questionTitle.length}/100</div>
                  </div>

                  <div className="mb-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 block">Details (optional)</label>
                    <textarea
                      value={questionBody}
                      onChange={e => handleBodyChange(e.target.value)}
                      className="w-full border-2 border-slate-200 rounded-xl p-4 text-base font-sans resize-none outline-none min-h-32 text-slate-700 focus:border-[#0F2444] transition leading-relaxed"
                      placeholder="Person A hat einen Mietvertrag aus 2019. Der Vermieter fordert jetzt eine Erhöhung um 15%..."
                    />
                  </div>

                  {/* Personal info warning */}
                  {personalInfoWarning && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 text-sm text-red-700 flex items-start gap-2">
                      <span className="flex-shrink-0 mt-0.5"><Icons.AlertTriangle /></span>
                      <span><strong>Persönliche Daten erkannt!</strong> Ihre Frage enthält möglicherweise personenbezogene Daten (E-Mail, Telefon, Name oder Adresse). Bitte formulieren Sie die Situation hypothetisch — z.B. „Person A" statt Ihrem Namen.</span>
                    </div>
                  )}

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-5 text-xs text-amber-800 flex items-start gap-2">
                    <span className="flex-shrink-0 mt-0.5"><Icons.AlertTriangle /></span>
                    <span>Ihre Frage wird anonym veröffentlicht. Keine persönlichen Daten angeben.</span>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setModalStep(1)} className="flex items-center gap-1.5 px-4 py-3.5 border-2 border-slate-200 rounded-xl text-slate-500 font-semibold text-sm hover:bg-slate-50 transition">
                      <Icons.ArrowLeft />Zurück
                    </button>
                    <button onClick={() => setModalStep(3)} disabled={!questionTitle.trim() || personalInfoWarning}
                      className="flex-1 py-3.5 bg-[#0F2444] text-white font-black rounded-xl text-base hover:bg-[#1a3a6b] transition disabled:opacity-40 flex items-center justify-center gap-2">
                      Weiter <Icons.ArrowRight />
                    </button>
                  </div>
                </>
              )}

              {/* STEP 3: Confirm */}
              {modalStep === 3 && (
                <>
                  <div className="font-black text-[#0F2444] text-2xl mb-1">Bestätigung</div>
                  <p className="text-slate-400 text-sm mb-5">Bitte lesen und bestätigen Sie:</p>

                  {/* Summary */}
                  <div className={`border-l-4 ${categoryConfig[selectedCat]?.border || 'border-l-slate-300'} bg-slate-50 rounded-xl p-4 mb-5`}>
                    <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${categoryConfig[selectedCat]?.text}`}>{selectedCat}</div>
                    <div className="font-bold text-[#0F2444] text-sm leading-snug">{questionTitle}</div>
                    {questionBody && <p className="text-slate-500 text-xs mt-1 line-clamp-2">{questionBody}</p>}
                  </div>

                  {/* Mandatory RDG checkbox */}
                  <label className="flex items-start gap-3 cursor-pointer group mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <div className="relative mt-0.5 flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={confirmRdg}
                        onChange={e => setConfirmRdg(e.target.checked)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${confirmRdg ? 'bg-[#0F2444] border-[#0F2444]' : 'border-slate-300 bg-white group-hover:border-[#0F2444]'}`}>
                        {confirmRdg && <Icons.Check />}
                      </div>
                    </div>
                    <span className="text-xs text-blue-900 leading-relaxed">
                      Ich bestätige, dass meine Frage rein hypothetisch formuliert ist und keine personenbezogenen Daten enthält. Ich verstehe, dass dies <strong>keine Rechtsberatung im Sinne des RDG</strong> darstellt und die Antworten keine rechtliche Beratung ersetzen.
                    </span>
                  </label>

                  <div className="flex gap-3">
                    <button onClick={() => setModalStep(2)} className="flex items-center gap-1.5 px-4 py-3.5 border-2 border-slate-200 rounded-xl text-slate-500 font-semibold text-sm hover:bg-slate-50 transition">
                      <Icons.ArrowLeft />Zurück
                    </button>
                    <button onClick={submitQuestion} disabled={!confirmRdg || !questionTitle.trim()}
                      className="flex-1 py-3.5 bg-[#0F2444] text-white font-black rounded-xl text-base hover:bg-[#1a3a6b] transition disabled:opacity-40 flex items-center justify-center gap-2">
                      <Icons.Send />Anonym veröffentlichen
                    </button>
                  </div>
                  <button onClick={() => setShowModal(false)} className="w-full mt-3 py-2 text-slate-400 text-sm hover:text-slate-600 transition">Abbrechen</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
