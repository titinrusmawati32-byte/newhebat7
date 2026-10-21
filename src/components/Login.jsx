import React, { useState } from 'react';
import { callApi } from '../services/api';

const HABIT_BADGES = [
  { id: 1, name: 'Bangun Pagi', icon: 'fa-sun', color: 'bg-amber-400' },
  { id: 2, name: 'Beribadah', icon: 'fa-hands-praying', color: 'bg-emerald-500' },
  { id: 3, name: 'Berolahraga', icon: 'fa-person-running', color: 'bg-rose-500' },
  { id: 4, name: 'Makan Sehat', icon: 'fa-utensils', color: 'bg-purple-500' },
  { id: 5, name: 'Gemar Belajar', icon: 'fa-book-open', color: 'bg-sky-500' },
  { id: 6, name: 'Bermasyarakat', icon: 'fa-users', color: 'bg-orange-500' },
  { id: 7, name: 'Tidur Cepat', icon: 'fa-moon', color: 'bg-teal-500' }
];

export default function Login({ onLoginSuccess, showToast, pengaturan }) {
  const [role, setRole] = useState('Siswa'); // 'Siswa' | 'Guru' | 'Admin'
  const [username, setUsername] = useState('0012345678');
  const [password, setPassword] = useState('123456');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setErrorText('');
    if (newRole === 'Siswa') {
      setUsername('0012345678');
      setPassword('123456');
    } else if (newRole === 'Guru') {
      setUsername('guru5a');
      setPassword('123456');
    } else {
      setUsername('kepsek');
      setPassword('123456');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setErrorText('Harap isi ID / Username dan Kata Sandi!');
      return;
    }

    setErrorText('');
    setLoading(true);

    try {
      const res = await callApi('login', { username: username.trim(), password: password.trim() });
      setLoading(false);

      if (res && res.success) {
        onLoginSuccess(res);
      } else {
        setErrorText(res?.message || 'NISN / Username atau Kata Sandi salah!');
      }
    } catch (err) {
      setLoading(false);
      setErrorText('Gagal menghubungkan ke server: ' + err.message);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-100 via-blue-50 to-emerald-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 relative overflow-hidden select-none">
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3"></div>

      {/* Main Two-Column Container */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center justify-center relative z-10 my-auto">
        
        {/* ========================================================================= */}
        {/* LEFT COLUMN: BANNER 7 KEBIASAAN ANAK INDONESIA HEBAT                      */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full space-y-4 sm:space-y-6">
          {/* Main Visual Banner Card */}
          <div className="relative rounded-[32px] overflow-hidden bg-white/60 backdrop-blur-md shadow-2xl shadow-blue-500/10 border border-white/80 p-2 sm:p-3 group">
            <img
              src="/banner-login.jpg"
              alt="Banner 7 Kebiasaan Anak Indonesia Hebat"
              className="w-full h-auto object-cover rounded-[26px] shadow-sm transition-transform duration-700 group-hover:scale-[1.01]"
              onError={(e) => {
                // Fallback jika file lokal belum ter-load
                e.target.onerror = null;
                e.target.src = '/login-reference.jpg';
              }}
            />
          </div>

          {/* Interactive 7 Habit Ribbon Badges Bar */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 rounded-3xl p-3 sm:p-4 shadow-xl shadow-blue-500/15 text-white">
            <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center">
              {HABIT_BADGES.map((h) => (
                <div key={h.id} className="flex flex-col items-center group cursor-pointer">
                  <div
                    className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full ${h.color} text-white flex items-center justify-center shadow-md text-xs sm:text-sm font-bold mb-1 transition-all transform group-hover:scale-115 group-hover:-translate-y-0.5`}
                  >
                    <i className={`fa-solid ${h.icon}`}></i>
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-bold leading-tight line-clamp-1 opacity-95">
                    {h.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: LOGIN CARD                                                 */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 w-full">
          <div className="bg-white/95 backdrop-blur-2xl rounded-[36px] p-6 sm:p-8 lg:p-9 shadow-2xl shadow-blue-900/15 border border-white max-w-md w-full mx-auto relative overflow-hidden">
            {/* Top Header School Branding */}
            <div className="flex items-center gap-3 pb-5 border-b border-slate-100">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xl shadow-lg shadow-blue-500/25 shrink-0">
                <i className="fa-solid fa-school"></i>
              </div>
              <div className="leading-tight">
                <h2 className="text-sm sm:text-base font-extrabold text-slate-800 tracking-tight">
                  7 Kebiasaan Anak Indonesia Hebat
                </h2>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                  Sistem Pembelajaran Digital
                </p>
              </div>
            </div>

            {/* Title & Description */}
            <div className="mt-5 mb-6">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Masuk ke Akun Anda
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1.5 leading-relaxed">
                Gunakan username dan password untuk mengakses sistem 7 Kebiasaan Anak Indonesia Hebat.
              </p>
            </div>

            {/* 3 Role Selection Tabs */}
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100/80 rounded-2xl mb-6">
              <button
                type="button"
                onClick={() => handleRoleChange('Siswa')}
                className={`py-2.5 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
                  role === 'Siswa'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <i className="fa-solid fa-user"></i> Siswa
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange('Guru')}
                className={`py-2.5 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
                  role === 'Guru'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <i className="fa-solid fa-chalkboard-user"></i> Guru
              </button>
              <button
                type="button"
                onClick={() => handleRoleChange('Admin')}
                className={`py-2.5 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 ${
                  role === 'Admin'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <i className="fa-solid fa-shield-halved"></i> Admin
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {role === 'Siswa' ? 'NISN Siswa' : 'Username'}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                    <i className="fa-regular fa-user"></i>
                  </span>
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={role === 'Siswa' ? 'Masukkan 10 digit NISN Anda' : 'Masukkan username Anda'}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:bg-white transition"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
                    <i className="fa-regular fa-lock"></i>
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password Anda"
                    className="w-full pl-11 pr-11 py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 focus:bg-white transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600 transition"
                  >
                    <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 transition"
                  />
                  <span>Ingat saya</span>
                </label>

                <button
                  type="button"
                  onClick={() => showToast('Silakan hubungi Guru Kelas atau Admin Sekolah untuk mereset kata sandi.', 'info')}
                  className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Lupa password?
                </button>
              </div>

              {/* Error Message */}
              {errorText && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-600 font-semibold flex items-center gap-2 animate-shake">
                  <i className="fa-solid fa-circle-exclamation text-rose-500"></i>
                  <span>{errorText}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2 text-sm sm:text-base mt-2"
              >
                {loading ? (
                  <span><i className="fa-solid fa-spinner fa-spin mr-2"></i>Memverifikasi...</span>
                ) : (
                  <>
                    <i className="fa-solid fa-arrow-right-to-bracket"></i>
                    <span>Masuk ke Portal</span>
                  </>
                )}
              </button>
            </form>

            {/* Quick Login Section ("Atau masuk dengan cepat") */}
            <div className="mt-6 pt-5 border-t border-slate-100">
              <p className="text-[11px] font-bold text-slate-400 text-center mb-3">
                Atau masuk dengan cepat
              </p>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => { handleRoleChange('Siswa'); setUsername('0012345678'); setPassword('123456'); }}
                  className="py-2 px-1 text-center bg-blue-50 hover:bg-blue-100/80 border border-blue-200/80 rounded-xl text-xs font-bold text-blue-700 transition flex items-center justify-center gap-1.5"
                >
                  <i className="fa-solid fa-graduation-cap text-blue-600"></i>
                  <span>Siswa</span>
                </button>
                <button
                  type="button"
                  onClick={() => { handleRoleChange('Guru'); setUsername('guru5a'); setPassword('123456'); }}
                  className="py-2 px-1 text-center bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/80 rounded-xl text-xs font-bold text-emerald-700 transition flex items-center justify-center gap-1.5"
                >
                  <i className="fa-solid fa-chalkboard-user text-emerald-600"></i>
                  <span>Guru</span>
                </button>
                <button
                  type="button"
                  onClick={() => { handleRoleChange('Admin'); setUsername('kepsek'); setPassword('123456'); }}
                  className="py-2 px-1 text-center bg-purple-50 hover:bg-purple-100/80 border border-purple-200/80 rounded-xl text-xs font-bold text-purple-700 transition flex items-center justify-center gap-1.5"
                >
                  <i className="fa-solid fa-shield-halved text-purple-600"></i>
                  <span>Admin</span>
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 text-center text-[11px] text-slate-400 space-y-1">
              <p className="font-medium">&copy; 2025 7 Kebiasaan Anak Indonesia Hebat</p>
              <p className="font-semibold text-slate-500 flex items-center justify-center gap-1">
                <i className="fa-solid fa-heart text-rose-500 text-[10px]"></i> Anak Hebat, Indonesia Kuat
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
