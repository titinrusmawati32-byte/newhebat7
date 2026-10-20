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
  const name = currentUser?.panggilan || currentUser?.nama || 'Siswa';
  const kelas = currentUser?.kelas || 'Kelas 5A';

  const completedCount = Object.keys(habitsToday || {}).length;
  const poinTotal = 120 + (completedCount * 10);
  const lencanaTotal = 3 + (completedCount >= 5 ? 1 : 0);

  const HABITS_LIST = [
    { id: 1, title: '1. Bangun Pagi', icon: 'fa-sun', color: 'amber', sub: 'Pilih jam bangun, tonton video & kuis' },
    { id: 2, title: '2. Beribadah', icon: 'fa-hands-praying', color: 'teal', sub: 'Ibadah tepat waktu & rasa syukur' },
    { id: 3, title: '3. Berolahraga', icon: 'fa-person-running', color: 'sky', sub: 'Gerak aktif menjaga kebugaran tubuh' },
    { id: 4, title: '4. Gemar Belajar', icon: 'fa-book-open', color: 'indigo', sub: 'Membaca buku literasi & ulangi pelajaran' },
    { id: 5, title: '5. Makan Sehat', icon: 'fa-apple-whole', color: 'rose', sub: 'Pola gizi seimbang Isi Piringku' },
    { id: 6, title: '6. Membantu Ortu', icon: 'fa-hand-holding-heart', color: 'purple', sub: 'Bakti dan tolong menolong di rumah' },
    { id: 7, title: '7. Tidur Tepat', icon: 'fa-moon', color: 'cyan', sub: 'Tidur malam cukup untuk kecerdasan otak' }
  ];

  return (
    <div className="w-full max-w-md mx-auto pb-24 select-none">
      {/* =================================================================== */}
      {/* SCREEN 1: MENU UTAMA (BERANDA)                                       */}
      {/* =================================================================== */}
      {activeTab === 'beranda' && (
        <div className="space-y-4 animate-fadeIn">
          {/* Top Bar: Logo LMS EDUCERIA + Bell '3' + Avatar */}
          <div className="flex items-center justify-between px-2 pt-2 pb-1">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('beranda')}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-400 via-emerald-400 to-sky-400 p-0.5 shadow-xs flex items-center justify-center">
                <div className="w-full h-full bg-[#111827] rounded-[9px] flex items-center justify-center text-emerald-400 text-sm">
                  <i className="fa-solid fa-book-open-reader"></i>
                </div>
              </div>
              <div>
                <div className="text-[9px] font-black tracking-widest text-emerald-600 uppercase leading-none">LMS</div>
                <div className="text-sm font-black text-slate-800 tracking-tight leading-none">EDUCERIA</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setActiveTab('notif')}
                className="relative w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition"
              >
                <i className="fa-regular fa-bell text-base"></i>
                <span className="absolute top-0 right-0 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-black flex items-center justify-center shadow-xs">
                  3
                </span>
              </button>

              <div onClick={() => setActiveTab('profil')} className="cursor-pointer">
                <img
                  src="https://illustrations.popertee.com/illustration-png/boy-waking-up-morning.png"
                  onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/3048/3048122.png'; }}
                  alt="Avatar"
                  className="w-9 h-9 rounded-full object-cover border-2 border-amber-300 shadow-xs"
                />
              </div>
            </div>
          </div>

          {/* Hero Greeting Card */}
          <div className="relative overflow-hidden bg-gradient-to-br from-sky-400 via-sky-500 to-indigo-500 rounded-3xl p-5 text-white shadow-md flex items-center justify-between">
            <div className="relative z-10 max-w-[210px]">
              <h2 className="text-xl font-black tracking-tight leading-tight">
                Halo, <span>{name}</span>!
              </h2>
              <p className="text-xs text-sky-100 font-medium mt-1 leading-snug">
                Semangat belajar dan bangun kebiasaan hebatmu hari ini!
              </p>
            </div>
            <div className="relative z-10 w-24 h-24 shrink-0">
              <img
                src="https://illustrations.popertee.com/illustration-png/boy-waking-up-morning.png"
                onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/3048/3048122.png'; }}
                alt="Siswa"
                className="w-full h-full object-contain drop-shadow-md scale-110"
              />
            </div>
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/15 rounded-full blur-xl pointer-events-none"></div>
          </div>

          {/* Card: Misi Hari Ini (Bangun Pagi Ceria, 1/3, Progress Bar) */}
          <div
            onClick={() => onOpenHabit(1)}
            className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 cursor-pointer hover:shadow-md transition"
          >
            <div className="flex items-start justify-between mb-1.5">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-500 flex items-center gap-1">
                  <i className="fa-solid fa-sparkles"></i> Misi Hari Ini
                </span>
                <h3 className="text-sm font-black text-slate-800 mt-0.5">Bangun Pagi Ceria</h3>
                <p className="text-[11px] text-slate-400 leading-tight mt-0.5 line-clamp-1">
                  Bangun pagi melatih disiplin dan menyegarkan raga.
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs font-black text-slate-500">{completedCount}/7</span>
              </div>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 mt-2.5 overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.max(15, Math.round((completedCount / 7) * 100))}%` }}
              ></div>
            </div>
          </div>

          {/* 3 Quick Action Buttons: [Materi] [Tugas] [Kuis] */}
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => onOpenHabit(1, 2)}
              className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs hover:border-emerald-300 hover:shadow-sm active:scale-95 transition flex flex-col items-center justify-center gap-2 group"
            >
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg group-hover:scale-110 transition">
                <i className="fa-solid fa-circle-play"></i>
              </div>
              <span className="text-xs font-bold text-slate-700">Materi</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenHabit(1, 1)}
              className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs hover:border-sky-300 hover:shadow-sm active:scale-95 transition flex flex-col items-center justify-center gap-2 group"
            >
              <div className="w-11 h-11 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center text-lg group-hover:scale-110 transition">
                <i className="fa-solid fa-file-lines"></i>
              </div>
              <span className="text-xs font-bold text-slate-700">Tugas</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenHabit(1, 3)}
              className="bg-white rounded-2xl p-3.5 border border-slate-100 shadow-xs hover:border-purple-300 hover:shadow-sm active:scale-95 transition flex flex-col items-center justify-center gap-2 group"
            >
              <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-lg group-hover:scale-110 transition">
                <i className="fa-solid fa-square-check"></i>
              </div>
              <span className="text-xs font-bold text-slate-700">Kuis</span>
            </button>
          </div>

          {/* Active Habit Banner Card */}
          <div
            onClick={() => onOpenHabit(1)}
            className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-4 text-white font-black text-sm flex items-center justify-between shadow-md shadow-orange-500/20 cursor-pointer active:scale-98 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-base">
                <i className="fa-solid fa-sun"></i>
              </div>
              <span>Bangun Pagi Ceria</span>
            </div>
            <i className="fa-solid fa-chevron-right text-xs"></i>
          </div>

          {/* Menu List: Nilai, Kehadiran, Profil */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-xs divide-y divide-slate-100 overflow-hidden">
            <div
              onClick={() => setShowPiagam(true)}
              className="p-3.5 flex items-center justify-between text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center text-sm">
                  <i className="fa-solid fa-chart-column"></i>
                </div>
                <span>Nilai & Piagam Capaian</span>
              </div>
              <i className="fa-solid fa-chevron-right text-slate-400 text-xs"></i>
            </div>

            <div
              onClick={() => setActiveTab('aktivitas')}
              className="p-3.5 flex items-center justify-between text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm">
                  <i className="fa-solid fa-calendar-check"></i>
                </div>
                <span>Riwayat Aktivitas & Jurnal</span>
              </div>
              <i className="fa-solid fa-chevron-right text-slate-400 text-xs"></i>
            </div>

            <div
              onClick={() => setActiveTab('profil')}
              className="p-3.5 flex items-center justify-between text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center text-sm">
                  <i className="fa-solid fa-user"></i>
                </div>
                <span>Profil Siswa</span>
              </div>
              <i className="fa-solid fa-chevron-right text-slate-400 text-xs"></i>
            </div>
          </div>

          {/* 7 Misi Grid */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2 px-1">
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">7 Misi Anak Hebat</h4>
              <button
                type="button"
                onClick={() => setActiveTab('kelas')}
                className="text-[11px] font-bold text-amber-600 hover:underline"
              >
                Lihat Semua
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {HABITS_LIST.slice(0, 6).map((h) => {
                const isDone = habitsToday && habitsToday[h.id];
                return (
                  <div
                    key={h.id}
                    onClick={() => onOpenHabit(h.id)}
                    className="p-3 rounded-2xl bg-white border border-slate-100 hover:border-amber-400 cursor-pointer transition flex items-center gap-2.5"
                  >
                    <span className="w-7 h-7 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xs font-black">
                      <i className={`fa-solid ${h.icon}`}></i>
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="text-[11px] font-bold text-slate-800 block truncate">{h.title}</span>
                      <span className={`text-[9px] font-bold ${isDone ? 'text-emerald-600' : 'text-slate-400'}`}>
                        {isDone ? 'Selesai ✔' : 'Belum'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* SCREEN 2: KELAS (DAFTAR 7 MISI LENGKAP)                               */}
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
                  onClick={() => onOpenHabit(h.id)}
                  className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-100 hover:border-amber-400 flex items-center justify-between cursor-pointer transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-lg">
                      <i className={`fa-solid ${h.icon}`}></i>
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-800">Misi {h.id}: {h.title.split('. ')[1]}</h4>
                      <p className="text-[10px] text-slate-400">{h.sub}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${isDone ? 'text-emerald-700 bg-emerald-50' : 'text-slate-400 bg-slate-50'}`}>
                    {isDone ? 'Selesai ✔' : 'Buka >'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* SCREEN 6: AKTIVITAS SAYA                                             */}
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
            <h3 className="text-sm font-black text-slate-800">Aktivitas Saya</h3>
          </div>

          <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-7 h-7 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center text-xs font-black">
                <i className="fa-solid fa-chart-line"></i>
              </span>
              <h4 className="text-xs font-black text-slate-800">Riwayat Pembiasaan Harian</h4>
            </div>
            <p className="text-[11px] text-slate-400 ml-9">Lihat catatan misi kebaikan yang telah kamu jalankan.</p>

            <div className="flex items-center gap-2 mt-4">
              <button type="button" className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-amber-500 text-white shadow-xs">
                Hari Ini
              </button>
              <button type="button" className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                7 Hari
              </button>
              <button type="button" className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                30 Hari
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 space-y-2.5">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs">
                  <i className="fa-solid fa-sun"></i>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-800">Bangun Pagi: 05:30 WIB</h5>
                  <span className="text-[10px] text-slate-400">Waktu bangun pagi ceria</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-700">
                Selesai ✔
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center text-xs">
                  <i className="fa-solid fa-circle-play"></i>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-800">Menonton Video Materi</h5>
                  <span className="text-[10px] text-slate-400">Manfaat Bangun Pagi</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-700">
                Selesai ✔
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xs">
                  <i className="fa-solid fa-square-check"></i>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-800">Kuis Singkat Misi</h5>
                  <span className="text-[10px] text-slate-400">Skor: 100% Benar</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-700">
                Selesai ✔
              </span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-3xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-400 text-white flex items-center justify-center text-lg shadow-xs">
                <i className="fa-solid fa-star"></i>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Poin Didapat Hari Ini</span>
                <span className="text-base font-black text-amber-700">+{completedCount * 10 || 10} Poin</span>
              </div>
            </div>
            <span className="text-2xl">🎉</span>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* SCREEN 7: NOTIFIKASI                                                 */}
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
            <h3 className="text-sm font-black text-slate-800">Notifikasi</h3>
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
              <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm shrink-0">
                <i className="fa-solid fa-file-pen"></i>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold text-slate-800">Kuis Siap Dikerjakan</h5>
                  <span className="text-[10px] text-slate-400">07:45</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">Kuis singkat sudah bisa kamu kerjakan untuk mengumpulkan XP!</p>
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
      {/* SCREEN 8: PROFIL SISWA                                               */}
      {/* =================================================================== */}
      {activeTab === 'profil' && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('beranda')}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition"
              >
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <h3 className="text-sm font-black text-slate-800">Profil Saya</h3>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 text-center flex flex-col items-center">
            <div className="relative w-20 h-20 mb-3">
              <img
                src="https://illustrations.popertee.com/illustration-png/boy-waking-up-morning.png"
                onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/3048/3048122.png'; }}
                alt="Avatar"
                className="w-full h-full rounded-full object-cover border-4 border-amber-300 shadow-md"
              />
              <span className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xs shadow-xs">
                <i className="fa-solid fa-check"></i>
              </span>
            </div>
            <h3 className="text-base font-black text-slate-900">{currentUser?.nama || name}</h3>
            <p className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-0.5 rounded-full mt-1">
              {kelas} • NISN: {currentUser?.username || '-'}
            </p>

            <div className="grid grid-cols-3 gap-2 w-full mt-5 pt-4 border-t border-slate-100">
              <div className="text-center p-2 rounded-2xl bg-amber-50/60 border border-amber-100">
                <span className="text-amber-500 text-sm block mb-0.5"><i className="fa-solid fa-star"></i></span>
                <span className="text-sm font-black text-slate-800 block">{poinTotal}</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase">Poin</span>
              </div>
              <div className="text-center p-2 rounded-2xl bg-orange-50/60 border border-orange-100">
                <span className="text-orange-500 text-sm block mb-0.5"><i className="fa-solid fa-shield-halved"></i></span>
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

          {/* Settings list */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm divide-y divide-slate-100 overflow-hidden text-xs">
            <div
              onClick={() => showToast('Fitur data diri siswa', 'info')}
              className="p-3.5 flex items-center justify-between text-slate-700 hover:bg-slate-50 cursor-pointer font-bold transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center text-xs">
                  <i className="fa-solid fa-address-card"></i>
                </div>
                <span>Data Diri Siswa</span>
              </div>
              <i className="fa-solid fa-chevron-right text-slate-400 text-xs"></i>
            </div>

            <div
              onClick={() => showToast('LMS Educeria v2.5 - 7 Kebiasaan Anak Hebat', 'info')}
              className="p-3.5 flex items-center justify-between text-slate-700 hover:bg-slate-50 cursor-pointer font-bold transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center text-xs">
                  <i className="fa-solid fa-circle-info"></i>
                </div>
                <span>Tentang LMS Educeria</span>
              </div>
              <i className="fa-solid fa-chevron-right text-slate-400 text-xs"></i>
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

      {/* =================================================================== */}
      {/* CELEBRATION MODAL: MISI SELESAI! (SCREEN 5)                          */}
      {/* =================================================================== */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border-4 border-amber-300 relative text-center animate-scaleUp">
            <div className="relative w-28 h-28 mx-auto mb-2">
              <img
                src="https://illustrations.popertee.com/illustration-png/boy-waking-up-morning.png"
                onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/3048/3048122.png'; }}
                alt="Mascot Selesai"
                className="w-full h-full object-contain animate-bounce"
              />
            </div>

            <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-4 py-1 rounded-full text-xs font-black shadow-md uppercase tracking-wider mb-2">
              <i className="fa-solid fa-medal text-amber-100"></i>
              <span>Misi Selesai!</span>
            </div>

            <h3 className="text-lg font-black text-slate-800 mt-1">{celebrationData?.title || 'Misi Selesai'}</h3>
            <p className="text-xs text-slate-500 mt-1 italic">
              "Kamu hebat! Sekarang tubuhmu lebih segar, disiplin, dan siap meraih prestasi tinggi!"
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-2">Hadiah Misi</span>
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2 rounded-2xl bg-amber-50 border border-amber-200">
                  <span className="text-amber-500 text-sm block"><i className="fa-solid fa-star"></i></span>
                  <span className="text-xs font-black text-slate-800 block mt-0.5">+10</span>
                  <span className="text-[9px] font-bold text-slate-400">Poin</span>
                </div>
                <div className="p-2 rounded-2xl bg-orange-50 border border-orange-200">
                  <span className="text-orange-500 text-sm block"><i className="fa-solid fa-shield-halved"></i></span>
                  <span className="text-xs font-black text-slate-800 block mt-0.5">Level 2</span>
                  <span className="text-[9px] font-bold text-slate-400">Disiplin</span>
                </div>
                <div className="p-2 rounded-2xl bg-rose-50 border border-rose-200">
                  <span className="text-rose-500 text-sm block"><i className="fa-solid fa-gift"></i></span>
                  <span className="text-xs font-black text-slate-800 block mt-0.5">+1</span>
                  <span className="text-[9px] font-bold text-slate-400">Lencana</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onCloseCelebration}
              className="mt-5 w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-2xl text-xs font-black shadow-md shadow-orange-500/25 active:scale-95 transition"
            >
              Kembali ke Beranda
            </button>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* MODAL PIAGAM PENGHARGAAN                                             */}
      {/* =================================================================== */}
      {showPiagam && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border-4 border-amber-300 relative text-center">
            <button
              onClick={() => setShowPiagam(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center font-bold"
            >
              &times;
            </button>
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-500 mx-auto flex items-center justify-center text-3xl shadow-inner mb-2">
              <i className="fa-solid fa-medal"></i>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Piagam Karakter
            </span>
            <h3 className="text-base font-black text-slate-800 mt-2">PENGHARGAAN ANAK INDONESIA HEBAT</h3>
            
            <div className="my-3 py-2 bg-amber-50/70 rounded-2xl border border-amber-200/80">
              <h4 className="text-sm font-black text-slate-900">{currentUser?.nama || name}</h4>
              <p className="text-xs font-semibold text-emerald-700">{kelas}</p>
            </div>

            <p className="text-[11px] text-slate-600 leading-relaxed italic">
              "Konsisten menjalankan 7 Kebiasaan Anak Hebat setiap hari."
            </p>

            <div className="mt-4 flex justify-center gap-2">
              <button onClick={() => window.print()} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-md">
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