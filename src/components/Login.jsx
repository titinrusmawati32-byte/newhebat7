import React, { useState } from 'react';
import { callApi, getGasApiUrl, setGasApiUrl } from '../services/api';

export default function Login({ onLoginSuccess, showToast, pengaturan }) {
  const [role, setRole] = useState('Siswa');
  const [username, setUsername] = useState('0012345678');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [gasUrlInput, setGasUrlInput] = useState(getGasApiUrl());

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

  const handleSaveGasUrl = () => {
    setGasApiUrl(gasUrlInput);
    setShowSettingsModal(false);
    showToast('URL Google Apps Script berhasil disimpan!', 'success');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between items-center p-4 sm:p-6 select-none max-w-md mx-auto">
      {/* Top Setting Icon */}
      <div className="w-full flex justify-end">
        <button
          onClick={() => setShowSettingsModal(true)}
          title="Pengaturan Backend Google Apps Script"
          className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-white/80 transition"
        >
          <i className="fa-solid fa-server text-base"></i>
        </button>
      </div>

      {/* Main Login Card */}
      <div className="w-full my-auto py-2">
        {/* Branding */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-500 to-amber-400 p-1 shadow-lg shadow-emerald-500/20 mb-3">
            <div className="w-full h-full bg-white rounded-[22px] flex items-center justify-center overflow-hidden">
              <img
                src={pengaturan?.logoSekolah || 'https://cdn-icons-png.flaticon.com/512/2997/2997295.png'}
                alt="Logo Sekolah"
                className="w-12 h-12 object-contain"
              />
            </div>
          </div>
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1 rounded-full border border-emerald-100 shadow-xs mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[11px] font-black text-emerald-800 uppercase tracking-wider">
              7 Kebiasaan Anak Indonesia Hebat
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Portal Jurnal Karakter</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            {pengaturan?.namaSekolah || 'SD Generasi Indonesia Hebat'}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/95 backdrop-blur-xl rounded-[32px] p-6 sm:p-8 shadow-xl border border-white/60 relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400"></div>

          {/* Role Tabs */}
          <div className="flex items-center p-1 bg-slate-100 rounded-2xl mb-6">
            <button
              type="button"
              onClick={() => handleRoleChange('Siswa')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                role === 'Siswa' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <i className="fa-solid fa-graduation-cap mr-1"></i> Siswa
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('Guru')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                role === 'Guru' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <i className="fa-solid fa-chalkboard-user mr-1"></i> Guru
            </button>
            <button
              type="button"
              onClick={() => handleRoleChange('Kepsek')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                role === 'Kepsek' ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <i className="fa-solid fa-user-tie mr-1"></i> Kepsek
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                {role === 'Siswa' ? 'NISN Siswa' : 'Username'}
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <i className={`fa-solid ${role === 'Siswa' ? 'fa-id-card' : role === 'Guru' ? 'fa-chalkboard-user' : 'fa-user-tie'}`}></i>
                </span>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder={role === 'Siswa' ? 'Masukkan 10 digit NISN...' : 'Masukkan username...'}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Kata Sandi / PIN
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <i className="fa-solid fa-lock"></i>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan kata sandi..."
                  className="w-full pl-10 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-slate-400 hover:text-slate-600"
                >
                  <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
            </div>

            {errorText && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-600 font-semibold flex items-center gap-2">
                <i className="fa-solid fa-circle-exclamation text-rose-500"></i>
                <span>{errorText}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/25 active:scale-98 transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <span><i className="fa-solid fa-spinner fa-spin mr-2"></i>Memverifikasi...</span>
              ) : (
                <>
                  <span>Masuk ke Portal</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Accounts */}
          <div className="mt-6 pt-5 border-t border-slate-100">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center mb-2.5">
              Akun Uji Coba Cepat
            </p>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => { handleRoleChange('Siswa'); setUsername('0012345678'); setPassword('123456'); }}
                className="p-2 text-center bg-slate-50 hover:bg-emerald-50 border border-slate-100 hover:border-emerald-200 rounded-xl text-[11px] font-medium text-slate-600 transition"
              >
                Siswa 5A
              </button>
              <button
                type="button"
                onClick={() => { handleRoleChange('Guru'); setUsername('guru5a'); setPassword('123456'); }}
                className="p-2 text-center bg-slate-50 hover:bg-emerald-50 border border-slate-100 hover:border-emerald-200 rounded-xl text-[11px] font-medium text-slate-600 transition"
              >
                Guru 5A
              </button>
              <button
                type="button"
                onClick={() => { handleRoleChange('Kepsek'); setUsername('kepsek'); setPassword('123456'); }}
                className="p-2 text-center bg-slate-50 hover:bg-emerald-50 border border-slate-100 hover:border-emerald-200 rounded-xl text-[11px] font-medium text-slate-600 transition"
              >
                Kepsek
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6 font-medium">
          &copy; 2026 Kemdikbudristek - Generasi Emas Anak Indonesia Hebat
        </p>
      </div>

      {/* Modal Settings Google Apps Script Endpoint */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-black text-slate-800">Hubungkan Google Sheets</h3>
              <button onClick={() => setShowSettingsModal(false)} className="text-slate-400 hover:text-slate-700">
                &times;
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-3 leading-relaxed">
              Masukkan Web App URL dari deployment Google Apps Script Anda (yang berakhiran <code className="text-emerald-600">/exec</code>).
            </p>
            <input
              type="url"
              value={gasUrlInput}
              onChange={(e) => setGasUrlInput(e.target.value)}
              placeholder="https://script.google.com/macros/s/.../exec"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowSettingsModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveGasUrl}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition"
              >
                Simpan URL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}