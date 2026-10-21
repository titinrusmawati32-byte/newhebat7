import React, { useState } from 'react';

export default function DashboardSiswa({
  currentUser,
  activeTab,
  setActiveTab,
  habitsToday,
  onOpenHabit,
  onLogout,
  showCelebration,
  celebrationData,
  onCloseCelebration,
  showToast
}) {
  const [showPiagam, setShowPiagam] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const name = currentUser?.panggilan || currentUser?.nama?.split(' ')[0] || 'Farhan';
  const fullName = currentUser?.nama || 'Ahmad Farhan';
  const kelas = currentUser?.kelas || 'Kelas 5A';

  const completedCount = Object.keys(habitsToday || {}).length;
  const poinTotal = 120 + (completedCount * 10);
  const lencanaTotal = 3 + (completedCount >= 5 ? 1 : 0);

  const HABITS_LIST = [
    {
      id: 1,
      num: '1',
      name: 'Bangun Pagi',
      title: 'Bangun Pagi Ceria',
      desc: 'Bangun pagi melatih disiplin dan menyegarkan raga.',
      icon: 'fa-sun',
      color: 'amber',
      bgGlow: 'bg-amber-50',
      borderColor: 'border-amber-200',
      badgeColor: 'text-amber-500',
      visualEmoji: '☀️'
    },
    {
      id: 2,
      num: '2',
      name: 'Beribadah',
      title: 'Beribadah Tepat Waktu',
      desc: 'Ibadah dan rasa syukur mendidik hati menjadi tenang dan sabar.',
      icon: 'fa-hands-praying',
      color: 'sky',
      bgGlow: 'bg-sky-50',
      borderColor: 'border-sky-200',
      badgeColor: 'text-sky-500',
      visualEmoji: '🤲'
    },
    {
      id: 3,
      num: '3',
      name: 'Berolahraga',
      title: 'Senam & Olahraga Ceria',
      desc: 'Gerak aktif memperlancar aliran darah dan kebugaran tubuh.',
      icon: 'fa-person-running',
      color: 'emerald',
      bgGlow: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      badgeColor: 'text-emerald-500',
      visualEmoji: '🏃'
    },
    {
      id: 4,
      num: '4',
      name: 'Gemar Belajar',
      title: 'Petualangan Seru Membaca',
      desc: 'Membaca buku membuka wawasan pengetahuan masa depan.',
      icon: 'fa-book-open',
      color: 'indigo',
      bgGlow: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      badgeColor: 'text-indigo-500',
      visualEmoji: '📚'
    },
    {
      id: 5,
      num: '5',
      name: 'Makan Sehat',
      title: 'Isi Piringku Gizi Seimbang',
      desc: 'Sayur dan buah menyediakan vitamin untuk imunitas tubuh.',
      icon: 'fa-apple-whole',
      color: 'orange',
      bgGlow: 'bg-orange-50',
      borderColor: 'border-orange-200',
      badgeColor: 'text-orange-500',
      visualEmoji: '🥗'
    },
    {
      id: 6,
      num: '6',
      name: 'Membantu Ortu',
      title: 'Gotong Royong & Berbakti',
      desc: 'Meringankan beban orang tua melatih rasa tanggung jawab.',
      icon: 'fa-hand-holding-heart',
      color: 'purple',
      bgGlow: 'bg-purple-50',
      borderColor: 'border-purple-200',
      badgeColor: 'text-purple-500',
      visualEmoji: '🤝'
    },
    {
      id: 7,
      num: '7',
      name: 'Tidur Cepat',
      title: 'Rahasia Tidur Nyenyak',
      desc: 'Tidur malam cukup memperbaiki sel otak dan memulihkan stamina.',
      icon: 'fa-moon',
      color: 'blue',
      bgGlow: 'bg-blue-50',
      borderColor: 'border-blue-200',
      badgeColor: 'text-blue-500',
      visualEmoji: '🌙'
    }
  ];

  return (
    <div className="min-h-screen w-full bg-[#EBF4FA] flex justify-center py-2 sm:py-6 select-none font-sans">
      {/* Smartphone Frame Container */}
      <div className="w-full max-w-lg bg-[#F4F9FD] sm:rounded-[44px] shadow-2xl sm:border-[8px] sm:border-slate-800 overflow-hidden flex flex-row relative min-h-screen sm:min-h-[920px]">

        {/* ========================================================================= */}
        {/* LEFT NAVY SIDEBAR RAIL (Pixel-matched with design)                         */}
        {/* ========================================================================= */}
        <aside className="w-16 sm:w-20 bg-[#0C2340] text-white flex flex-col items-center py-5 shrink-0 justify-between select-none relative z-30 shadow-xl">
          {/* Top Navigation Items */}
          <div className="flex flex-col items-center space-y-5 w-full">
            {/* 1. Beranda (Active / Selected) */}
            <button
              type="button"
              onClick={() => setActiveTab('beranda')}
              className={`flex flex-col items-center justify-center transition-all ${
                activeTab === 'beranda'
                  ? 'w-11 h-11 sm:w-12 sm:h-12 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/40 scale-105'
                  : 'text-slate-400 hover:text-white py-1'
              }`}
              title="Beranda"
            >
              <i className="fa-solid fa-house text-lg"></i>
            </button>

            {/* 2. Misi */}
            <button
              type="button"
              onClick={() => setActiveTab('kelas')}
              className={`flex flex-col items-center justify-center transition-all group ${
                activeTab === 'kelas'
                  ? 'w-11 h-11 sm:w-12 sm:h-12 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/40 scale-105'
                  : 'text-slate-400 hover:text-white py-1'
              }`}
              title="Daftar Misi"
            >
              <i className="fa-solid fa-bullseye text-lg mb-1 group-hover:scale-110 transition"></i>
              <span className="text-[10px] font-bold">Misi</span>
            </button>

            {/* 3. Materi (Khusus Video YouTube & Kuis) */}
            <button
              type="button"
              onClick={() => setActiveTab('materi_list')}
              className={`flex flex-col items-center justify-center transition-all group ${
                activeTab === 'materi_list'
                  ? 'w-11 h-11 sm:w-12 sm:h-12 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/40 scale-105'
                  : 'text-slate-400 hover:text-white py-1'
              }`}
              title="Materi Edukasi Video & Kuis"
            >
              <i className="fa-solid fa-book-open text-lg mb-1 group-hover:scale-110 transition"></i>
              <span className="text-[10px] font-bold">Materi</span>
            </button>

            {/* 4. Kuis (Khusus Mengerjakan Kuis) */}
            <button
              type="button"
              onClick={() => setActiveTab('kuis_list')}
              className={`flex flex-col items-center justify-center transition-all group ${
                activeTab === 'kuis_list'
                  ? 'w-11 h-11 sm:w-12 sm:h-12 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-500/40 scale-105'
                  : 'text-slate-400 hover:text-white py-1'
              }`}
              title="Kuis Harian"
            >
              <i className="fa-solid fa-clipboard-check text-lg mb-1 group-hover:scale-110 transition"></i>
              <span className="text-[10px] font-bold">Kuis</span>
            </button>
          </div>

          {/* Middle Decorative Badge: Anak Hebat Indonesia Kuat */}
          <div className="my-auto py-4 flex flex-col items-center text-center">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs mb-1">
              <span className="text-sm">🇮🇩</span>
            </div>
            <div className="text-[8px] font-black uppercase tracking-tight text-sky-200 leading-tight">
              Anak Hebat<br />Indonesia<br />Kuat
            </div>
          </div>

          {/* Bottom Nature Leaf Elements */}
          <div className="w-full flex justify-center pb-2 opacity-80">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm">
              <i className="fa-solid fa-leaf"></i>
            </div>
          </div>
        </aside>

        {/* ========================================================================= */}
        {/* MAIN CONTENT AREA                                                         */}
        {/* ========================================================================= */}
        <div className="flex-1 min-w-0 flex flex-col overflow-y-auto bg-[#F4F9FD]">
          
          {/* ======================================================================= */}
          {/* TOP BAR HEADER                                                          */}
          {/* ======================================================================= */}
          <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-slate-100 shadow-xs">
            {/* Logo Left */}
            <div
              onClick={() => setActiveTab('beranda')}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-sky-500 to-emerald-400 p-0.5 shadow-xs flex items-center justify-center">
                <div className="w-full h-full bg-white rounded-[9px] flex items-center justify-center text-blue-600 text-sm font-black">
                  7
                </div>
              </div>
              <div className="leading-tight">
                <div className="text-xs font-black text-slate-800 tracking-tight flex items-center gap-1">
                  Kebiasaan
                </div>
                <div className="text-[10px] font-extrabold text-blue-600 uppercase tracking-wider">
                  Anak Indonesia Hebat
                </div>
                <div className="text-[8px] font-bold text-emerald-600">
                  Anak Hebat, Indonesia Kuat
                </div>
              </div>
            </div>

            {/* Right: Bell & Avatar Farhan */}
            <div className="flex items-center gap-3">
              {/* Notification Bell */}
              <button
                type="button"
                onClick={() => setActiveTab('notif')}
                className="relative w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-blue-600 transition"
              >
                <i className="fa-solid fa-bell text-base"></i>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-black flex items-center justify-center shadow-xs">
                  3
                </span>
              </button>

              {/* Avatar & Farhan dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                  className="flex items-center gap-1.5 p-1 rounded-full hover:bg-slate-100 transition"
                >
                  <img
                    src="https://illustrations.popertee.com/illustration-png/boy-waking-up-morning.png"
                    onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/3048/3048122.png'; }}
                    alt="Avatar Siswa"
                    className="w-8 h-8 rounded-full object-cover border-2 border-blue-400 shadow-xs"
                  />
                  <div className="hidden sm:flex flex-col text-left leading-none">
                    <span className="text-[10px] text-slate-400 font-bold">Halo,</span>
                    <span className="text-xs font-black text-slate-800">{name}!</span>
                  </div>
                  <i className="fa-solid fa-chevron-down text-slate-400 text-[10px]"></i>
                </button>

                {/* Dropdown Menu */}
                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-scaleUp">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-black text-slate-800">{fullName}</p>
                      <p className="text-[10px] text-emerald-600 font-semibold">{kelas}</p>
                    </div>
                    <button
                      onClick={() => { setActiveTab('profil'); setShowProfileDropdown(false); }}
                      className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-bold"
                    >
                      <i className="fa-solid fa-user text-blue-500"></i> Profil Siswa
                    </button>
                    <button
                      onClick={() => { setShowPiagam(true); setShowProfileDropdown(false); }}
                      className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 font-bold"
                    >
                      <i className="fa-solid fa-award text-amber-500"></i> Piagam Capaian
                    </button>
                    <div className="border-t border-slate-100 mt-1 pt-1">
                      <button
                        onClick={onLogout}
                        className="w-full px-4 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-bold"
                      >
                        <i className="fa-solid fa-arrow-right-from-bracket"></i> Keluar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* ======================================================================= */}
          {/* BODY CONTENT BY TAB                                                     */}
          {/* ======================================================================= */}
          <main className="p-3 sm:p-4 space-y-3.5 pb-16">

            {/* TAB 1: BERANDA                                                         */}
            {activeTab === 'beranda' && (
              <>
                {/* 1. HERO BANNER: "Halo, Farhan!" */}
                <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-sky-500 to-sky-400 rounded-3xl p-5 text-white shadow-lg shadow-blue-500/20 flex items-center justify-between">
                  {/* Left Content */}
                  <div className="relative z-10 max-w-[210px] sm:max-w-xs">
                    <div className="flex items-center gap-1.5 mb-1 text-amber-300 text-lg">
                      <i className="fa-solid fa-sun animate-spin-slow"></i>
                      <span className="text-white text-base sm:text-lg font-black tracking-tight">
                        Halo, {name}!
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-sky-100 font-medium leading-snug">
                      Semangat belajar dan bangun kebiasaan hebatmu hari ini!
                    </p>
                  </div>

                  {/* Right 3D Character & Badge */}
                  <div className="relative z-10 flex flex-col items-center shrink-0">
                    <span className="bg-white/20 backdrop-blur-md border border-white/40 text-white text-[9px] font-black px-2.5 py-0.5 rounded-full shadow-xs mb-1">
                      Anak Hebat Pasti Bisa!
                    </span>
                    <img
                      src="/student-hero-banner.jpg"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://illustrations.popertee.com/illustration-png/boy-waking-up-morning.png';
                      }}
                      alt="Karakter Siswa Farhan"
                      className="w-20 h-20 sm:w-24 sm:h-24 object-contain rounded-2xl drop-shadow-md"
                    />
                  </div>

                  {/* Decorative background glow */}
                  <div className="absolute -right-8 -bottom-8 w-36 h-36 bg-white/15 rounded-full blur-2xl pointer-events-none"></div>
                  <div className="absolute top-0 right-1/3 w-20 h-20 bg-amber-300/20 rounded-full blur-xl pointer-events-none"></div>
                </div>

                {/* 2. CARD: "MISI HARI INI" (Bangun Pagi Ceria, 7/7, Progress Bar) */}
                <div
                  onClick={() => onOpenHabit(1, 'misi')}
                  className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 hover:shadow-md transition cursor-pointer flex items-center justify-between gap-3 group"
                >
                  {/* Left Text & Progress Bar */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-amber-500 mb-1">
                      <span className="text-sm">🔥</span>
                      <span>MISI HARI INI</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-black text-slate-800 tracking-tight">
                      Bangun Pagi Ceria
                    </h3>
                    <p className="text-[11px] text-slate-400 font-medium leading-tight mt-0.5 line-clamp-1">
                      Bangun pagi melatih disiplin dan menyegarkan raga.
                    </p>

                    {/* Progress Bar with Trophy Icon */}
                    <div className="flex items-center gap-2 mt-2.5">
                      <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden p-0.5">
                        <div
                          className="bg-gradient-to-r from-amber-400 to-orange-500 h-full rounded-full transition-all duration-700"
                          style={{ width: `${Math.max(20, Math.round((completedCount / 7) * 100))}%` }}
                        ></div>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xs shrink-0 shadow-xs">
                        <i className="fa-solid fa-trophy"></i>
                      </div>
                    </div>
                  </div>

                  {/* Right Illustration & 7/7 Badge */}
                  <div className="flex flex-col items-end shrink-0 pl-2">
                    <span className="text-xs font-black text-blue-900 bg-blue-50 px-2 py-0.5 rounded-full mb-1 border border-blue-100">
                      {completedCount}/7
                    </span>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-100 to-sky-100 p-1 flex items-center justify-center overflow-hidden shadow-inner group-hover:scale-105 transition">
                      <span className="text-3xl">☀️</span>
                    </div>
                  </div>
                </div>

                {/* 3. THREE QUICK ACTION CARDS: [Materi] [Tugas] [Kuis] */}
                <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
                  {/* Materi (Langsung ke Video YouTube & Kuis, tanpa isian misi) */}
                  <button
                    type="button"
                    onClick={() => onOpenHabit(1, 'materi')}
                    className="bg-white hover:bg-emerald-50/50 rounded-2xl p-3 sm:p-3.5 border border-slate-100 hover:border-emerald-200 shadow-xs transition flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white flex items-center justify-center text-sm shadow-md shadow-emerald-500/25 group-hover:scale-110 transition">
                        <i className="fa-solid fa-play"></i>
                      </div>
                      <span className="text-xs font-bold text-slate-800">Materi</span>
                    </div>
                    <i className="fa-solid fa-chevron-right text-emerald-500 text-xs"></i>
                  </button>

                  {/* Tugas / Misi (Khusus Mengisi Jurnal Misi) */}
                  <button
                    type="button"
                    onClick={() => onOpenHabit(1, 'misi')}
                    className="bg-white hover:bg-blue-50/50 rounded-2xl p-3 sm:p-3.5 border border-slate-100 hover:border-blue-200 shadow-xs transition flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-blue-400 to-sky-500 text-white flex items-center justify-center text-sm shadow-md shadow-blue-500/25 group-hover:scale-110 transition">
                        <i className="fa-solid fa-file-lines"></i>
                      </div>
                      <span className="text-xs font-bold text-slate-800">Tugas</span>
                    </div>
                    <i className="fa-solid fa-chevron-right text-blue-500 text-xs"></i>
                  </button>

                  {/* Kuis (Langsung Mengerjakan Kuis) */}
                  <button
                    type="button"
                    onClick={() => onOpenHabit(1, 'kuis')}
                    className="bg-white hover:bg-purple-50/50 rounded-2xl p-3 sm:p-3.5 border border-slate-100 hover:border-purple-200 shadow-xs transition flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-purple-400 to-indigo-500 text-white flex items-center justify-center text-sm shadow-md shadow-purple-500/25 group-hover:scale-110 transition">
                        <i className="fa-solid fa-square-check"></i>
                      </div>
                      <span className="text-xs font-bold text-slate-800">Kuis</span>
                    </div>
                    <i className="fa-solid fa-chevron-right text-purple-500 text-xs"></i>
                  </button>
                </div>

                {/* 4. FEATURED HABIT BANNER (Orange "Bangun Pagi Ceria") */}
                <div
                  onClick={() => onOpenHabit(1, 'misi')}
                  className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 rounded-3xl p-4 text-white shadow-md shadow-orange-500/20 flex items-center justify-between cursor-pointer hover:opacity-95 transition active:scale-98"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-lg text-white">
                      <i className="fa-solid fa-gear"></i>
                    </div>
                    <div>
                      <h4 className="text-sm font-black tracking-tight">Bangun Pagi Ceria</h4>
                      <p className="text-[11px] text-orange-100 font-medium">Ayo mulai aktivitas hebatmu dari pagi!</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">⏰</span>
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">
                      <i className="fa-solid fa-chevron-right"></i>
                    </div>
                  </div>
                </div>

                {/* 5. QUICK MENU LIST: Nilai & Piagam, Riwayat, Profil */}
                <div className="bg-white rounded-3xl border border-slate-100 shadow-xs divide-y divide-slate-100 overflow-hidden">
                  {/* Nilai & Piagam Capaian */}
                  <div
                    onClick={() => setShowPiagam(true)}
                    className="p-3.5 flex items-center justify-between text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-sm shadow-xs">
                        <i className="fa-solid fa-chart-simple"></i>
                      </div>
                      <span className="font-extrabold text-slate-800">Nilai & Piagam Capaian</span>
                    </div>
                    <i className="fa-solid fa-chevron-right text-slate-400 text-xs"></i>
                  </div>

                  {/* Riwayat Aktivitas & Jurnal */}
                  <div
                    onClick={() => setActiveTab('aktivitas')}
                    className="p-3.5 flex items-center justify-between text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm shadow-xs">
                        <i className="fa-solid fa-calendar-check"></i>
                      </div>
                      <span className="font-extrabold text-slate-800">Riwayat Aktivitas & Jurnal</span>
                    </div>
                    <i className="fa-solid fa-chevron-right text-slate-400 text-xs"></i>
                  </div>

                  {/* Profil Siswa */}
                  <div
                    onClick={() => setActiveTab('profil')}
                    className="p-3.5 flex items-center justify-between text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-sm shadow-xs">
                        <i className="fa-solid fa-user"></i>
                      </div>
                      <span className="font-extrabold text-slate-800">Profil Siswa</span>
                    </div>
                    <i className="fa-solid fa-chevron-right text-slate-400 text-xs"></i>
                  </div>
                </div>

                {/* 6. "7 MISI ANAK HEBAT" GRID (Pixel-matched with design) */}
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-3 px-1">
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm font-black text-slate-900 tracking-tight">
                      <span className="text-amber-500">⭐</span>
                      <span>7 MISI ANAK HEBAT</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('kelas')}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1"
                    >
                      <span>Lihat Semua</span>
                      <i className="fa-solid fa-arrow-right text-[10px]"></i>
                    </button>
                  </div>

                  {/* 3 Columns Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
                    {HABITS_LIST.slice(0, 6).map((h) => {
                      const isDone = habitsToday && habitsToday[h.id];
                      return (
                        <div
                          key={h.id}
                          onClick={() => onOpenHabit(h.id, 'misi')}
                          className="bg-white rounded-2xl p-2.5 sm:p-3 border border-slate-100 hover:border-blue-300 hover:shadow-sm cursor-pointer transition flex flex-col justify-between group"
                        >
                          {/* Visual Illustration Card */}
                          <div className={`w-full aspect-video rounded-xl ${h.bgGlow} flex items-center justify-center text-3xl mb-2 shadow-inner group-hover:scale-102 transition`}>
                            <span>{h.visualEmoji}</span>
                          </div>

                          {/* Title */}
                          <div className="min-w-0 mb-1.5">
                            <span className="text-xs font-black text-slate-800 block truncate">
                              {h.num}. {h.name}
                            </span>
                          </div>

                          {/* Bottom Row: Status Badge & Arrow */}
                          <div className="flex items-center justify-between pt-1 border-t border-slate-50">
                            <span
                              className={`text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 ${
                                isDone
                                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                                  : 'bg-slate-100 text-slate-400'
                              }`}
                            >
                              <i className={`fa-solid ${isDone ? (isDone.fotoBukti ? 'fa-camera' : 'fa-check') : 'fa-circle text-[6px]'}`}></i>
                              <span>{isDone ? 'Selesai' : 'Belum'}</span>
                            </span>
                            <i className="fa-solid fa-chevron-right text-blue-500 text-[10px]"></i>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* 7th Habit (Tidur Cepat) Spanned or Centered */}
                  <div
                    onClick={() => onOpenHabit(7, 'misi')}
                    className="mt-2.5 bg-white rounded-2xl p-3 border border-slate-100 hover:border-blue-300 hover:shadow-sm cursor-pointer transition flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-2xl shrink-0 shadow-inner">
                        <span>🌙</span>
                      </div>
                      <div>
                        <span className="text-xs font-black text-slate-800 block">
                          7. Tidur Cepat
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          Tidur malam maksimal pukul 21.00
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 ${
                          habitsToday && habitsToday[7]
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                            : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        <i className={`fa-solid ${habitsToday && habitsToday[7] ? (habitsToday[7].fotoBukti ? 'fa-camera' : 'fa-check') : 'fa-circle text-[6px]'}`}></i>
                        <span>{habitsToday && habitsToday[7] ? 'Selesai' : 'Belum'}</span>
                      </span>
                      <i className="fa-solid fa-chevron-right text-blue-500 text-[10px]"></i>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* =================================================================== */}
            {/* TAB 2: DAFTAR 7 MISI LENGKAP                                        */}
            {/* =================================================================== */}
            {activeTab === 'kelas' && (
              <div className="space-y-3 animate-fadeIn">
                <div className="flex items-center gap-3 py-2 border-b border-slate-100">
                  <button
                    type="button"
                    onClick={() => setActiveTab('beranda')}
                    className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition"
                  >
                    <i className="fa-solid fa-arrow-left"></i>
                  </button>
                  <h3 className="text-sm font-black text-slate-800">Daftar 7 Misi Kebiasaan</h3>
                </div>

                <div className="space-y-2.5">
                  {HABITS_LIST.map((h) => {
                    const isDone = habitsToday && habitsToday[h.id];
                    return (
                      <div
                        key={h.id}
                        onClick={() => onOpenHabit(h.id, 'misi')}
                        className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 hover:border-blue-400 flex items-center justify-between cursor-pointer transition"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-11 h-11 rounded-2xl ${h.bgGlow} flex items-center justify-center text-2xl shadow-inner shrink-0`}>
                            <span>{h.visualEmoji}</span>
                          </div>
                          <div>
                            <h4 className="text-xs font-black text-slate-800">{h.num}. {h.name}</h4>
                            <p className="text-[10px] text-slate-400 font-medium line-clamp-1">{h.desc}</p>
                          </div>
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${isDone ? 'text-emerald-700 bg-emerald-50 border border-emerald-200' : 'text-slate-400 bg-slate-100'}`}>
                          {isDone ? (
                            <>
                              <i className={`fa-solid ${isDone.fotoBukti ? 'fa-camera text-emerald-600' : 'fa-check'}`}></i>
                              <span>Selesai</span>
                            </>
                          ) : 'Isi Misi >'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* =================================================================== */}
            {/* TAB MATERI EDUKASI (KHUSUS VIDEO YOUTUBE & KUIS PEMAHAMAN)           */}
            {/* =================================================================== */}
            {activeTab === 'materi_list' && (
              <div className="space-y-3 animate-fadeIn">
                <div className="flex items-center gap-3 py-2 border-b border-slate-100">
                  <button
                    type="button"
                    onClick={() => setActiveTab('beranda')}
                    className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition"
                  >
                    <i className="fa-solid fa-arrow-left"></i>
                  </button>
                  <div>
                    <h3 className="text-sm font-black text-slate-800">Materi Edukasi 7 Kebiasaan</h3>
                    <p className="text-[10px] text-slate-400 font-medium">Tonton video YouTube pembelajaran & kuis pemahaman</p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {HABITS_LIST.map((h) => (
                    <div
                      key={h.id}
                      onClick={() => onOpenHabit(h.id, 'materi')}
                      className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 hover:border-red-400 flex items-center justify-between cursor-pointer transition group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center text-xl shadow-xs group-hover:scale-105 transition shrink-0">
                          <i className="fa-brands fa-youtube"></i>
                        </div>
                        <div className="min-w-0">
                          <span className="text-[9px] font-black uppercase text-red-600 bg-red-50 px-2 py-0.5 rounded-md inline-block mb-0.5">
                            Video & Kuis Misi {h.num}
                          </span>
                          <h4 className="text-xs font-black text-slate-800 truncate">{h.title}</h4>
                          <p className="text-[10px] text-slate-400 font-medium line-clamp-1">{h.desc}</p>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
                        <i className="fa-solid fa-play"></i>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* =================================================================== */}
            {/* TAB KUIS PEMAHAMAN (KHUSUS MENGERJAKAN KUIS KARAKTER)                */}
            {/* =================================================================== */}
            {activeTab === 'kuis_list' && (
              <div className="space-y-3 animate-fadeIn">
                <div className="flex items-center gap-3 py-2 border-b border-slate-100">
                  <button
                    type="button"
                    onClick={() => setActiveTab('beranda')}
                    className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition"
                  >
                    <i className="fa-solid fa-arrow-left"></i>
                  </button>
                  <div>
                    <h3 className="text-sm font-black text-slate-800">Kuis Pemahaman 7 Kebiasaan</h3>
                    <p className="text-[10px] text-slate-400 font-medium">Uji pemahaman materi dan raih XP bintang emas</p>
                  </div>
                </div>

                <div className="space-y-2.5">
                  {HABITS_LIST.map((h) => (
                    <div
                      key={h.id}
                      onClick={() => onOpenHabit(h.id, 'kuis')}
                      className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 hover:border-purple-400 flex items-center justify-between cursor-pointer transition group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl shadow-xs group-hover:scale-105 transition shrink-0">
                          <i className="fa-solid fa-clipboard-check"></i>
                        </div>
                        <div className="min-w-0">
                          <span className="text-[10px] font-black uppercase text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md inline-block mb-0.5">
                            Kuis Misi {h.num}
                          </span>
                          <h4 className="text-xs font-black text-slate-800 truncate">Kuis: {h.name}</h4>
                          <p className="text-[10px] text-slate-400 font-medium line-clamp-1">Jawab pertanyaan pemahaman kebiasaan {h.name}</p>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center text-xs font-bold shrink-0 shadow-xs">
                        <i className="fa-solid fa-arrow-right"></i>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* =================================================================== */}
            {/* TAB 3: RIWAYAT AKTIVITAS & JURNAL                                    */}
            {/* =================================================================== */}
            {activeTab === 'aktivitas' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center gap-3 py-2 border-b border-slate-100">
                  <button
                    type="button"
                    onClick={() => setActiveTab('beranda')}
                    className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition"
                  >
                    <i className="fa-solid fa-arrow-left"></i>
                  </button>
                  <h3 className="text-sm font-black text-slate-800">Riwayat Aktivitas & Jurnal</h3>
                </div>

                <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-black">
                      <i className="fa-solid fa-chart-line"></i>
                    </span>
                    <h4 className="text-xs font-black text-slate-800">Catatan Pembiasaan Harian</h4>
                  </div>
                  <p className="text-[11px] text-slate-400 ml-10">Misi kebaikan yang telah kamu jalankan hari ini.</p>
                </div>

                <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 space-y-2.5">
                  {HABITS_LIST.map((h) => {
                    const submission = habitsToday && habitsToday[h.id];
                    return (
                      <div key={h.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-xl ${h.bgGlow} flex items-center justify-center text-lg`}>
                            <span>{h.visualEmoji}</span>
                          </div>
                          <div>
                            <h5 className="text-xs font-bold text-slate-800">{h.name}</h5>
                            <span className="text-[10px] text-slate-400">
                              {submission ? `Status: ${submission.statusVerifikasi || 'Selesai'}` : 'Belum diisi'}
                            </span>
                          </div>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black ${submission ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}>
                          {submission ? 'Selesai ✔' : 'Belum'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* =================================================================== */}
            {/* TAB 4: NOTIFIKASI                                                   */}
            {/* =================================================================== */}
            {activeTab === 'notif' && (
              <div className="space-y-3 animate-fadeIn">
                <div className="flex items-center gap-3 py-2 border-b border-slate-100">
                  <button
                    type="button"
                    onClick={() => setActiveTab('beranda')}
                    className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition"
                  >
                    <i className="fa-solid fa-arrow-left"></i>
                  </button>
                  <h3 className="text-sm font-black text-slate-800">Notifikasi Pembiasaan</h3>
                </div>

                <div className="space-y-2.5">
                  <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-sm shrink-0">
                      <i className="fa-solid fa-sun"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-bold text-slate-800">Misi Baru Tersedia!</h5>
                        <span className="text-[10px] text-slate-400">06:00</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">Bangun Pagi Ceria telah tersedia. Ayo selesaikan misimu hari ini!</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-sm shrink-0">
                      <i className="fa-solid fa-video"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-bold text-slate-800">Video Edukasi Siap Ditonton</h5>
                        <span className="text-[10px] text-slate-400">07:30</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">Tonton video inspiratif untuk memperkuat pembiasaan karaktermu.</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm shrink-0">
                      <i className="fa-solid fa-gift"></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h5 className="text-xs font-bold text-slate-800">Selamat! Lencana Baru</h5>
                        <span className="text-[10px] text-slate-400">Kemarin</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">Kamu mendapatkan lencana penghargaan: Anak Disiplin Tingkat 2!</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* =================================================================== */}
            {/* TAB 5: PROFIL SISWA                                                 */}
            {/* =================================================================== */}
            {activeTab === 'profil' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex items-center gap-3 py-2 border-b border-slate-100">
                  <button
                    type="button"
                    onClick={() => setActiveTab('beranda')}
                    className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition"
                  >
                    <i className="fa-solid fa-arrow-left"></i>
                  </button>
                  <h3 className="text-sm font-black text-slate-800">Profil Saya</h3>
                </div>

                <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 text-center flex flex-col items-center">
                  <div className="relative w-20 h-20 mb-3">
                    <img
                      src="https://illustrations.popertee.com/illustration-png/boy-waking-up-morning.png"
                      onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/3048/3048122.png'; }}
                      alt="Avatar"
                      className="w-full h-full rounded-full object-cover border-4 border-blue-400 shadow-md"
                    />
                    <span className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs shadow-xs">
                      <i className="fa-solid fa-check"></i>
                    </span>
                  </div>
                  <h3 className="text-base font-black text-slate-900">{fullName}</h3>
                  <p className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-0.5 rounded-full mt-1">
                    {kelas} • NISN: {currentUser?.username || '-'}
                  </p>

                  <div className="grid grid-cols-3 gap-2 w-full mt-5 pt-4 border-t border-slate-100">
                    <div className="text-center p-2 rounded-2xl bg-amber-50/60 border border-amber-100">
                      <span className="text-amber-500 text-sm block mb-0.5"><i className="fa-solid fa-star"></i></span>
                      <span className="text-sm font-black text-slate-800 block">{poinTotal}</span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase">Poin</span>
                    </div>
                    <div className="text-center p-2 rounded-2xl bg-blue-50/60 border border-blue-100">
                      <span className="text-blue-500 text-sm block mb-0.5"><i className="fa-solid fa-shield-halved"></i></span>
                      <span className="text-sm font-black text-slate-800 block">Level 2</span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase truncate">Disiplin</span>
                    </div>
                    <div className="text-center p-2 rounded-2xl bg-rose-50/60 border border-rose-100">
                      <span className="text-rose-500 text-sm block mb-0.5"><i className="fa-solid fa-gift"></i></span>
                      <span className="text-sm font-black text-slate-800 block">{lencanaTotal}</span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase">Lencana</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onLogout}
                  className="w-full py-3 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-2xl text-xs font-bold border border-rose-200 transition flex items-center justify-center gap-2"
                >
                  <i className="fa-solid fa-arrow-right-from-bracket"></i>
                  <span>Keluar dari Akun</span>
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* CELEBRATION MODAL                                                     */}
      {/* ===================================================================== */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border-4 border-amber-300 relative text-center animate-scaleUp">
            <div className="text-5xl mb-2">🎉</div>
            <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-black shadow-md uppercase tracking-wider mb-2">
              <i className="fa-solid fa-medal text-amber-100"></i>
              <span>Misi Selesai!</span>
            </div>
            <h3 className="text-lg font-black text-slate-800 mt-1">{celebrationData?.title || 'Misi Selesai'}</h3>
            <p className="text-xs text-slate-500 mt-1 italic">
              "Kamu hebat! Sekarang tubuhmu lebih segar, disiplin, dan siap meraih prestasi tinggi!"
            </p>
            <button
              type="button"
              onClick={onCloseCelebration}
              className="mt-5 w-full py-3 bg-gradient-to-r from-blue-600 to-sky-600 text-white rounded-2xl text-xs font-black shadow-md active:scale-95 transition"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* MODAL PIAGAM PENGHARGAAN                                               */}
      {/* ===================================================================== */}
      {showPiagam && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border-4 border-blue-400 relative text-center">
            <button
              onClick={() => setShowPiagam(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center font-bold"
            >
              &times;
            </button>
            <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 mx-auto flex items-center justify-center text-3xl shadow-inner mb-2">
              <i className="fa-solid fa-award"></i>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Piagam Karakter
            </span>
            <h3 className="text-base font-black text-slate-800 mt-2">PENGHARGAAN ANAK INDONESIA HEBAT</h3>
            <div className="my-3 py-2 bg-blue-50/70 rounded-2xl border border-blue-200/80">
              <h4 className="text-sm font-black text-slate-900">{fullName}</h4>
              <p className="text-xs font-semibold text-emerald-700">{kelas}</p>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed italic">
              "Konsisten menjalankan 7 Kebiasaan Anak Hebat setiap hari."
            </p>
            <div className="mt-4 flex justify-center gap-2">
              <button onClick={() => window.print()} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold shadow-md">
                <i className="fa-solid fa-print"></i> Cetak
              </button>
              <button onClick={() => setShowPiagam(false)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold">
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
