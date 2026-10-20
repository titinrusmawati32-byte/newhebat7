import React, { useState } from 'react';
import { callApi } from '../services/api';

export default function DashboardGuru({
  currentUser,
  materiKuisMap,
  onUpdateMateriKuis,
  onLogout,
  showToast
}) {
  const [selectedKelas, setSelectedKelas] = useState(currentUser?.kelas || 'Kelas 5A');
  const [selectedTanggal, setSelectedTanggal] = useState(new Date().toISOString().split('T')[0]);
  const [showModalMateriKuis, setShowModalMateriKuis] = useState(false);
  const [activeHabitTab, setActiveHabitTab] = useState(1);
  const [editingMk, setEditingMk] = useState(materiKuisMap[1] || {});
  const [savingMk, setSavingMk] = useState(false);

  // Mock / Loaded Monitoring Data
  const [monitoringData, setMonitoringData] = useState([
    { nisn: '0012345678', nama: 'Ahmad Farhan', completedCount: 5, percentage: 71, habits: { h1: true, h2: true, h3: true, h4: true, h5: true, h6: false, h7: false } },
    { nisn: '0012345679', nama: 'Annisa Zahra', completedCount: 7, percentage: 100, habits: { h1: true, h2: true, h3: true, h4: true, h5: true, h6: true, h7: true } },
    { nisn: '0012345680', nama: 'Bima Sakti', completedCount: 3, percentage: 43, habits: { h1: true, h2: true, h3: false, h4: true, h5: false, h6: false, h7: false } }
  ]);

  const handleOpenMateriKuisModal = (hid) => {
    const id = hid || 1;
    setActiveHabitTab(id);
    setEditingMk(materiKuisMap[id] || {
      judulMateri: '',
      deskripsiMateri: '',
      linkYoutube: '',
      pertanyaan: '',
      opsiA: '',
      opsiB: '',
      opsiC: '',
      opsiD: '',
      kunciJawaban: 'B',
      penjelasan: ''
    });
    setShowModalMateriKuis(true);
  };

  const handleSwitchHabitTab = (id) => {
    setActiveHabitTab(id);
    setEditingMk(materiKuisMap[id] || {});
  };

  const handleSaveMateriKuis = async (e) => {
    e.preventDefault();
    setSavingMk(true);
    try {
      const res = await callApi('simpanMateriKuis', { habitId: activeHabitTab, payload: editingMk });
      onUpdateMateriKuis(activeHabitTab, editingMk);
      showToast(`Materi & Kuis Misi ${activeHabitTab} berhasil disimpan & terhubung ke Siswa!`, 'success');
      setShowModalMateriKuis(false);
    } catch (err) {
      showToast('Gagal menyimpan: ' + err.message, 'error');
    }
    setSavingMk(false);
  };

  return (
    <div className="max-w-6xl w-full mx-auto p-4 sm:p-6 pb-24 space-y-6">
      {/* Top Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-teal-700 via-emerald-700 to-green-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <i className="fa-solid fa-chalkboard-user"></i>
              <span>Panel Wali Kelas / Guru</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Monitoring Jurnal: {currentUser?.nama || 'Bapak/Ibu Guru'}
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm font-medium mt-1">
              Pantau kepatuhan pembiasaan 7 karakter hebat siswa kelas Anda secara real-time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleOpenMateriKuisModal(1)}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md active:scale-95 transition flex items-center gap-1.5"
            >
              <i className="fa-solid fa-film"></i> Kelola Materi & Kuis
            </button>
            <button
              onClick={onLogout}
              className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-md active:scale-95 transition flex items-center gap-1.5"
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i> Keluar
            </button>
          </div>
        </div>
      </div>

      {/* Filter and stats */}
      <div className="bg-white rounded-3xl p-5 shadow-xs border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Pilih Kelas</label>
            <select
              value={selectedKelas}
              onChange={(e) => setSelectedKelas(e.target.value)}
              className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Kelas 5A">Kelas 5A</option>
              <option value="Kelas 5B">Kelas 5B</option>
              <option value="Kelas 6">Kelas 6</option>
            </select>
          </div>
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Tanggal</label>
            <input
              type="date"
              value={selectedTanggal}
              onChange={(e) => setSelectedTanggal(e.target.value)}
              className="px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <div className="text-center px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100 min-w-[90px]">
            <span className="text-base font-black text-slate-800 block">{monitoringData.length}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Siswa</span>
          </div>
          <div className="text-center px-4 py-2 bg-emerald-50 rounded-2xl border border-emerald-100 min-w-[90px]">
            <span className="text-base font-black text-emerald-700 block">
              {monitoringData.filter(m => m.completedCount === 7).length}
            </span>
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Lengkap 7</span>
          </div>
        </div>
      </div>

      {/* Monitoring Table */}
      <div className="bg-white rounded-3xl shadow-xs border border-slate-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">
                <th className="py-3.5 px-4 text-left">No</th>
                <th className="py-3.5 px-4 text-left">Nama Siswa</th>
                <th className="py-3.5 px-2" title="Misi 1: Bangun Pagi">H1</th>
                <th className="py-3.5 px-2" title="Misi 2: Taat Beribadah">H2</th>
                <th className="py-3.5 px-2" title="Misi 3: Berolahraga">H3</th>
                <th className="py-3.5 px-2" title="Misi 4: Gemar Belajar">H4</th>
                <th className="py-3.5 px-2" title="Misi 5: Makan Sehat">H5</th>
                <th className="py-3.5 px-2" title="Misi 6: Membantu Ortu">H6</th>
                <th className="py-3.5 px-2" title="Misi 7: Tidur Tepat">H7</th>
                <th className="py-3.5 px-4">Progres</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {monitoringData.map((row, idx) => (
                <tr key={row.nisn} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-4 font-semibold text-slate-500 text-left">{idx + 1}</td>
                  <td className="py-3 px-4 text-left">
                    <div className="font-bold text-slate-800">{row.nama}</div>
                    <div className="text-[10px] text-slate-400">{row.nisn}</div>
                  </td>
                  {[1, 2, 3, 4, 5, 6, 7].map((h) => (
                    <td key={h} className="py-2.5 px-2 text-center">
                      {row.habits[`h${h}`] ? (
                        <i className="fa-solid fa-circle-check text-emerald-500 text-base"></i>
                      ) : (
                        <i className="fa-solid fa-minus text-slate-300"></i>
                      )}
                    </td>
                  ))}
                  <td className="py-3 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded-full font-black text-[11px] ${
                      row.percentage === 100 ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {row.completedCount}/7 ({row.percentage}%)
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Kelola Materi Video YouTube & Kuis */}
      {showModalMateriKuis && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                  Pengaturan Edukasi Guru
                </span>
                <h3 className="text-base font-black text-slate-800 mt-1">Kelola Materi YouTube & Kuis Singkat</h3>
              </div>
              <button
                onClick={() => setShowModalMateriKuis(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-500"
              >
                &times;
              </button>
            </div>

            {/* 7 Tabs Misi */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-4">
              {[1, 2, 3, 4, 5, 6, 7].map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleSwitchHabitTab(id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition ${
                    activeHabitTab === id
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Misi {id}
                </button>
              ))}
            </div>

            <form onSubmit={handleSaveMateriKuis} className="space-y-4">
              {/* YouTube Details */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                <h4 className="text-xs font-black text-slate-800 flex items-center gap-2">
                  <i className="fa-brands fa-youtube text-red-600 text-sm"></i>
                  <span>Materi Video YouTube (Misi {activeHabitTab})</span>
                </h4>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Judul Video Materi</label>
                  <input
                    type="text"
                    required
                    value={editingMk.judulMateri || ''}
                    onChange={(e) => setEditingMk({ ...editingMk, judulMateri: e.target.value })}
                    placeholder="Contoh: Manfaat Bangun Pagi untuk Kesehatan"
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Link URL YouTube</label>
                  <input
                    type="url"
                    required
                    value={editingMk.linkYoutube || ''}
                    onChange={(e) => setEditingMk({ ...editingMk, linkYoutube: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Deskripsi Singkat</label>
                  <textarea
                    rows="2"
                    value={editingMk.deskripsiMateri || ''}
                    onChange={(e) => setEditingMk({ ...editingMk, deskripsiMateri: e.target.value })}
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  ></textarea>
                </div>
              </div>

              {/* Quiz Details */}
              <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-3">
                <h4 className="text-xs font-black text-indigo-900 flex items-center gap-2">
                  <i className="fa-solid fa-clipboard-question text-indigo-600 text-sm"></i>
                  <span>Kuis Singkat Edukatif</span>
                </h4>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">Pertanyaan Soal</label>
                  <input
                    type="text"
                    required
                    value={editingMk.pertanyaan || ''}
                    onChange={(e) => setEditingMk({ ...editingMk, pertanyaan: e.target.value })}
                    placeholder="Tuliskan soal pilihan ganda di sini..."
                    className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {['A', 'B', 'C', 'D'].map((lettr) => (
                    <div key={lettr}>
                      <label className="block text-[10px] font-bold text-slate-500 mb-1">Opsi {lettr}</label>
                      <input
                        type="text"
                        required
                        value={editingMk[`opsi${lettr}`] || ''}
                        onChange={(e) => setEditingMk({ ...editingMk, [`opsi${lettr}`]: e.target.value })}
                        className="w-full p-2 bg-white border border-slate-200 rounded-xl text-xs font-medium"
                      />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">Kunci Jawaban Benar</label>
                    <select
                      value={editingMk.kunciJawaban || 'B'}
                      onChange={(e) => setEditingMk({ ...editingMk, kunciJawaban: e.target.value })}
                      className="w-full p-2 bg-white border border-slate-200 rounded-xl text-xs font-bold text-emerald-700"
                    >
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-bold text-slate-500 mb-1">Penjelasan / Pembahasan</label>
                    <input
                      type="text"
                      value={editingMk.penjelasan || ''}
                      onChange={(e) => setEditingMk({ ...editingMk, penjelasan: e.target.value })}
                      placeholder="Penjelasan kenapa jawaban tersebut benar..."
                      className="w-full p-2 bg-white border border-slate-200 rounded-xl text-xs font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModalMateriKuis(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={savingMk}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-2"
                >
                  {savingMk ? (
                    <span><i className="fa-solid fa-spinner fa-spin mr-1"></i>Menyimpan...</span>
                  ) : (
                    <>
                      <i className="fa-solid fa-floppy-disk"></i>
                      <span>Simpan & Hubungkan ke Siswa</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}