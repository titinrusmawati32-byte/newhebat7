import React from 'react';

export default function BottomNav({ activeTab, setActiveTab, onLogout }) {
  return (
    <nav className="fixed bottom-0 inset-x-0 max-w-md mx-auto z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 shadow-lg px-2 py-1 flex items-center justify-around">
      {/* 1. Beranda */}
      <button
        type="button"
        onClick={() => setActiveTab('beranda')}
        className={`relative flex flex-col items-center py-1.5 px-3 text-[10px] transition active:scale-95 ${
          activeTab === 'beranda' ? 'text-amber-500 font-black scale-105' : 'text-slate-400 font-semibold hover:text-slate-600'
        }`}
      >
        <i className="fa-solid fa-house text-base mb-0.5"></i>
        <span>Beranda</span>
      </button>

      {/* 2. Kelas */}
      <button
        type="button"
        onClick={() => setActiveTab('kelas')}
        className={`relative flex flex-col items-center py-1.5 px-3 text-[10px] transition active:scale-95 ${
          activeTab === 'kelas' ? 'text-amber-500 font-black scale-105' : 'text-slate-400 font-semibold hover:text-slate-600'
        }`}
      >
        <i className="fa-solid fa-shapes text-base mb-0.5"></i>
        <span>Kelas</span>
      </button>

      {/* 3. Notifikasi */}
      <button
        type="button"
        onClick={() => setActiveTab('notif')}
        className={`relative flex flex-col items-center py-1.5 px-3 text-[10px] transition active:scale-95 ${
          activeTab === 'notif' ? 'text-amber-500 font-black scale-105' : 'text-slate-400 font-semibold hover:text-slate-600'
        }`}
      >
        <div className="relative">
          <i className="fa-solid fa-bell text-base mb-0.5"></i>
          <span className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-rose-500 text-white rounded-full text-[8px] font-black flex items-center justify-center shadow-xs">
            3
          </span>
        </div>
        <span>Notifikasi</span>
      </button>

      {/* 4. Lainnya / Profil */}
      <button
        type="button"
        onClick={() => setActiveTab('profil')}
        className={`relative flex flex-col items-center py-1.5 px-3 text-[10px] transition active:scale-95 ${
          activeTab === 'profil' ? 'text-amber-500 font-black scale-105' : 'text-slate-400 font-semibold hover:text-slate-600'
        }`}
      >
        <i className="fa-solid fa-bars text-base mb-0.5"></i>
        <span>Lainnya</span>
      </button>
    </nav>
  );
}