import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import DashboardSiswa from './components/DashboardSiswa';
import HabitWizard from './components/HabitWizard';
import DashboardGuru from './components/DashboardGuru';
import BottomNav from './components/BottomNav';
import { callApi, getCachedData } from './services/api';

export default function App() {
  // Session Persistence: Mengingat login dan halaman terakhir saat browser di-refresh
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('AUTH_USER_7KEBIASAAN');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [currentView, setCurrentView] = useState(() => {
    try {
      const savedUser = localStorage.getItem('AUTH_USER_7KEBIASAAN');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        const savedView = localStorage.getItem('AUTH_VIEW_7KEBIASAAN');
        if (savedView && savedView !== 'landing') return savedView;
        return user.role === 'Siswa' ? 'dashboard' : 'guru';
      }
    } catch (e) {}
    return 'landing';
  });

  const [activeTabSiswa, setActiveTabSiswa] = useState(() => {
    return localStorage.getItem('ACTIVE_TAB_SISWA') || 'beranda';
  });

  const [activeHabitId, setActiveHabitId] = useState(1);
  const [pengaturan, setPengaturan] = useState(null);
  const [materiKuisMap, setMateriKuisMap] = useState({});
  const [habitsToday, setHabitsToday] = useState(() => {
    try {
      const saved = localStorage.getItem('HABITS_TODAY_CACHE');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  // Toast
  const [toasts, setToasts] = useState([]);

  // Video Modal
  const [videoModal, setVideoModal] = useState({ open: false, title: '', url: '', desc: '', habitId: 1 });

  // Celebration Modal
  const [celebration, setCelebration] = useState({ open: false, title: '' });

  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  useEffect(() => {
    // 1. Muat dari Cache Lokal seketika (0 ms - anti lemot)
    const cachedPengaturan = getCachedData('getPengaturan');
    if (cachedPengaturan) setPengaturan(cachedPengaturan);

    const cachedMateri = getCachedData('getMateriKuisAll');
    if (cachedMateri) setMateriKuisMap(cachedMateri);

    // 2. Sinkronisasi latar belakang dengan Google Apps Script (tanpa mengunci UI)
    callApi('getPengaturan').then((res) => {
      if (res) setPengaturan(res);
    });
    callApi('getMateriKuisAll').then((res) => {
      if (res) setMateriKuisMap(res);
    });
  }, []);

  // Simpan & Sinkronkan status autentikasi ke localStorage agar refresh tidak mental ke login
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('AUTH_USER_7KEBIASAAN', JSON.stringify(currentUser));
      localStorage.setItem('AUTH_VIEW_7KEBIASAAN', currentView);
      localStorage.setItem('ACTIVE_TAB_SISWA', activeTabSiswa);

      // Revalidasi data habit siswa jika sedang login sebagai siswa
      if (currentUser.role === 'Siswa' && currentUser.username) {
        callApi('getInitialSiswa', { username: currentUser.username }).then((init) => {
          if (init && init.habitsToday) {
            setHabitsToday(init.habitsToday);
            localStorage.setItem('HABITS_TODAY_CACHE', JSON.stringify(init.habitsToday));
          }
        });
      }
    } else {
      localStorage.removeItem('AUTH_USER_7KEBIASAAN');
      localStorage.removeItem('AUTH_VIEW_7KEBIASAAN');
      localStorage.removeItem('ACTIVE_TAB_SISWA');
      localStorage.removeItem('HABITS_TODAY_CACHE');
    }
  }, [currentUser, currentView, activeTabSiswa]);

  const handleLoginSuccess = async (user) => {
    setCurrentUser(user);
    localStorage.setItem('AUTH_USER_7KEBIASAAN', JSON.stringify(user));
    showToast(`Selamat datang, ${user.panggilan || user.nama}!`, 'success');

    if (user.role === 'Siswa') {
      const init = await callApi('getInitialSiswa', { username: user.username });
      if (init && init.habitsToday) {
        setHabitsToday(init.habitsToday);
        localStorage.setItem('HABITS_TODAY_CACHE', JSON.stringify(init.habitsToday));
      }
      setCurrentView('dashboard');
      setActiveTabSiswa('beranda');
    } else if (user.role === 'Guru') {
      setCurrentView('guru');
    } else {
      setCurrentView('guru'); // Panel monitoring kepsek / guru
    }
  };

  const handleLogout = () => {
    if (window.confirm('Apakah Anda yakin ingin keluar dari akun?')) {
      setCurrentUser(null);
      setCurrentView('landing');
      localStorage.removeItem('AUTH_USER_7KEBIASAAN');
      localStorage.removeItem('AUTH_VIEW_7KEBIASAAN');
      localStorage.removeItem('ACTIVE_TAB_SISWA');
      localStorage.removeItem('HABITS_TODAY_CACHE');
      showToast('Anda telah keluar dari aplikasi.', 'info');
    }
  };

  const handleOpenHabit = (hid) => {
    setActiveHabitId(hid);
    setCurrentView('habit');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteHabit = (hid, namaMisi) => {
    setHabitsToday((prev) => {
      const updated = {
        ...prev,
        [hid]: { detail: 'Selesai', statusVerifikasi: 'Disetujui' }
      };
      localStorage.setItem('HABITS_TODAY_CACHE', JSON.stringify(updated));
      return updated;
    });
    setCelebration({ open: true, title: namaMisi || `Misi ${hid} Selesai` });
    setCurrentView('dashboard');
    setActiveTabSiswa('beranda');
  };

  const handleOpenVideoModal = (hid, mk) => {
    const url = mk?.linkYoutube || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
    const videoId = match ? match[1] : '';

    if (videoId) {
      setVideoModal({
        open: true,
        habitId: hid,
        title: mk?.judulMateri || `Materi Video Misi ${hid}`,
        desc: mk?.deskripsiMateri || '',
        url: `https://www.youtube.com/embed/${videoId}?autoplay=1`,
        rawUrl: url
      });
    } else {
      window.open(url, '_blank');
    }
  };

  const handleUpdateMateriKuis = (hid, newMk) => {
    setMateriKuisMap((prev) => ({
      ...prev,
      [hid]: newMk
    }));
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans antialiased text-slate-800">
      {/* Toast Notification Container */}
      <div className="fixed top-4 right-4 z-[99999] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto px-4 py-3 rounded-2xl shadow-xl text-xs font-bold transition flex items-center gap-2 ${
              t.type === 'success'
                ? 'bg-emerald-600 text-white'
                : t.type === 'error'
                ? 'bg-rose-600 text-white'
                : 'bg-slate-900 text-white'
            }`}
          >
            <i className={`fa-solid ${t.type === 'success' ? 'fa-circle-check' : t.type === 'error' ? 'fa-circle-exclamation' : 'fa-circle-info text-amber-400'}`}></i>
            <span>{t.message}</span>
          </div>
        ))}
      </div>

      {/* Main View Router */}
      <main className={`flex-1 w-full ${(currentView === 'guru' || currentView === 'landing') ? 'p-0 max-w-none' : 'p-3 sm:p-6 max-w-7xl mx-auto'}`}>
        {currentView === 'landing' && (
          <Login
            onLoginSuccess={handleLoginSuccess}
            showToast={showToast}
            pengaturan={pengaturan}
          />
        )}

        {currentView === 'dashboard' && currentUser?.role === 'Siswa' && (
          <DashboardSiswa
            currentUser={currentUser}
            activeTab={activeTabSiswa}
            setActiveTab={setActiveTabSiswa}
            habitsToday={habitsToday}
            onOpenHabit={handleOpenHabit}
            onLogout={handleLogout}
            showCelebration={celebration.open}
            celebrationData={celebration}
            onCloseCelebration={() => setCelebration({ open: false, title: '' })}
            showToast={showToast}
          />
        )}

        {currentView === 'habit' && (
          <HabitWizard
            habitId={activeHabitId}
            materiKuis={materiKuisMap[activeHabitId]}
            currentUser={currentUser}
            onComplete={handleCompleteHabit}
            onBack={() => { setCurrentView('dashboard'); setActiveTabSiswa('beranda'); }}
            onOpenVideoModal={handleOpenVideoModal}
            showToast={showToast}
          />
        )}

        {currentView === 'guru' && (
          <DashboardGuru
            currentUser={currentUser}
            materiKuisMap={materiKuisMap}
            onUpdateMateriKuis={handleUpdateMateriKuis}
            onLogout={handleLogout}
            showToast={showToast}
          />
        )}
      </main>

      {/* Mobile Bottom Navigation for Siswa */}
      {currentUser?.role === 'Siswa' && (currentView === 'dashboard' || currentView === 'habit') && (
        <BottomNav
          activeTab={currentView === 'habit' ? 'kelas' : activeTabSiswa}
          setActiveTab={(tab) => {
            setCurrentView('dashboard');
            setActiveTabSiswa(tab);
          }}
          onLogout={handleLogout}
        />
      )}

      {/* Video Modal Player */}
      {videoModal.open && (
        <div className="fixed inset-0 z-[9999] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl max-w-2xl w-full p-4 sm:p-6 shadow-2xl border border-slate-800 relative">
            <button
              onClick={() => setVideoModal({ ...videoModal, open: false })}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center font-bold text-base transition"
            >
              &times;
            </button>
            <div className="mb-3 pr-10">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-600 text-white">
                YouTube Edukasi Misi {videoModal.habitId}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white mt-1">{videoModal.title}</h3>
            </div>
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-inner border border-slate-800">
              <iframe
                className="w-full h-full"
                src={videoModal.url}
                title="YouTube Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <p className="text-xs text-slate-400 line-clamp-2 max-w-lg">{videoModal.desc}</p>
              <a
                href={videoModal.rawUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-auto"
              >
                <i className="fa-brands fa-youtube"></i> Buka di YouTube
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}