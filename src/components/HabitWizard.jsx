import React, { useState } from 'react';
import { callApi } from '../services/api';

const HABIT_CONFIGS = {
  1: {
    nama: 'Bangun Pagi',
    sub: 'Bangun Pagi Ceria',
    icon: 'fa-sun',
    color: 'from-amber-400 via-orange-400 to-amber-500',
    quote: 'Pagi yang cerah dimulai dari tekad anak hebat. Bangun pagi melatih disiplin dan menyegarkan raga.',
    img: 'https://illustrations.popertee.com/illustration-png/boy-waking-up-morning.png',
    label1: 'Pilih Waktu Bangun Tidur',
    desc1: 'Tentukan jam berapa kamu akan bangun hari ini.',
    presets: ['05:30', '06:00', '06:30', '07:00'],
    defaultVal: '05:30'
  },
  2: {
    nama: 'Taat Beribadah',
    sub: 'Taat Beribadah & Syukur',
    icon: 'fa-hands-praying',
    color: 'from-teal-500 via-emerald-500 to-green-500',
    quote: 'Ibadah dan rasa syukur mendidik hati menjadi tenang, sabar, dan selalu rendah hati kepada sesama.',
    img: 'https://illustrations.popertee.com/illustration-png/boy-praying.png',
    label1: 'Catat Ibadah Hari Ini',
    desc1: 'Pilih ibadah yang telah kamu laksanakan dengan sungguh-sungguh.',
    presets: ['Sholat 5 Waktu / Doa Pagi', 'Membaca Kitab Suci', 'Bersyukur & Berbuat Baik'],
    defaultVal: 'Sholat 5 Waktu / Doa Pagi'
  },
  3: {
    nama: 'Berolahraga',
    sub: 'Berolahraga Ceria',
    icon: 'fa-person-running',
    color: 'from-sky-500 via-blue-500 to-indigo-500',
    quote: 'Tubuh bugar melahirkan pikiran cerdas. Berolahraga melatih ketangkasan dan kekuatan fisik.',
    img: 'https://illustrations.popertee.com/illustration-png/boy-running.png',
    label1: 'Aktivitas Fisik Hari Ini',
    desc1: 'Pilih olahraga yang kamu jalankan minimal 15-30 menit.',
    presets: ['Senam Pagi / Peregangan', 'Lari Pagi / Jalan Santai', 'Bersepeda / Permainan Aktif'],
    defaultVal: 'Senam Pagi / Peregangan'
  },
  4: {
    nama: 'Gemar Belajar',
    sub: 'Gemar Belajar & Membaca',
    icon: 'fa-book-open',
    color: 'from-indigo-500 via-purple-500 to-pink-500',
    quote: 'Buku adalah jendela dunia. Belajar tekun setiap hari membuka jalan masa depan cerah.',
    img: 'https://illustrations.popertee.com/illustration-png/boy-reading-book.png',
    label1: 'Kegiatan Belajar Hari Ini',
    desc1: 'Pilih aktivitas literasi yang kamu selesaikan.',
    presets: ['Membaca Buku (Literasi 20 Menit)', 'Mengerjakan PR / Latihan Soal', 'Eksplorasi Sains & Pengetahuan'],
    defaultVal: 'Membaca Buku (Literasi 20 Menit)'
  },
  5: {
    nama: 'Makan Sehat',
    sub: 'Makan Sehat Bergizi',
    icon: 'fa-apple-whole',
    color: 'from-rose-500 via-orange-500 to-amber-500',
    quote: 'Gizi seimbang menjaga imun tubuh kuat dan membantumu tumbuh tinggi serta cerdas.',
    img: 'https://illustrations.popertee.com/illustration-png/boy-eating-healthy-food.png',
    label1: 'Menu Makan Sehat Hari Ini',
    desc1: 'Pilih menu gizi seimbang yang kamu konsumsi.',
    presets: ['Lengkap: Nasi, Lauk, Sayur & Buah', 'Minum Air Putih Cukup (8 Gelas)', 'Kurangi Gula & Makanan Cepat Saji'],
    defaultVal: 'Lengkap: Nasi, Lauk, Sayur & Buah'
  },
  6: {
    nama: 'Membantu Ortu',
    sub: 'Membantu Orang Tua',
    icon: 'fa-hand-holding-heart',
    color: 'from-purple-500 via-fuchsia-500 to-pink-500',
    quote: 'Bakti kepada orang tua membukakan pintu kebaikan dan melatih kemandirian sejak dini.',
    img: 'https://illustrations.popertee.com/illustration-png/boy-helping-parents.png',
    label1: 'Bantuan yang Kamu Berikan',
    desc1: 'Pilih bantuan nyata yang telah kamu lakukan di rumah.',
    presets: ['Rapikan Tempat Tidur & Mainan', 'Cuci Piring / Menyapu Rumah', 'Menjaga Adik / Menyiapkan Meja'],
    defaultVal: 'Rapikan Tempat Tidur & Mainan'
  },
  7: {
    nama: 'Tidur Tepat',
    sub: 'Tidur Tepat Waktu',
    icon: 'fa-moon',
    color: 'from-cyan-600 via-blue-600 to-indigo-700',
    quote: 'Tidur nyenyak 8–9 jam membuat otak cerdas, tubuh pulih, dan bangun esok pagi penuh energi.',
    img: 'https://illustrations.popertee.com/illustration-png/boy-sleeping-peacefully.png',
    label1: 'Target Waktu Tidur Malam',
    desc1: 'Tentukan jam berapa kamu akan mematikan lampu dan tidur.',
    presets: ['20:30', '21:00', '21:30', '22:00'],
    defaultVal: '21:00'
  }
};

export default function HabitWizard({
  habitId,
  materiKuis,
  currentUser,
  onComplete,
  onBack,
  onOpenVideoModal,
  showToast
}) {
  const config = HABIT_CONFIGS[habitId] || HABIT_CONFIGS[1];
  const [step, setStep] = useState(1);
  const [selectedVal, setSelectedVal] = useState(config.defaultVal);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [saving, setSaving] = useState(false);

  // YouTube Thumbnail URL helper
  const extractYtId = (url) => {
    if (!url) return '';
    const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
    return m ? m[1] : '';
  };

  const ytId = extractYtId(materiKuis?.linkYoutube);
  const thumbUrl = ytId
    ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
    : 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80';

  const keyChar = (materiKuis?.kunciJawaban || 'B').toUpperCase();
  const options = [
    { letter: 'A', text: materiKuis?.opsiA || 'Opsi A' },
    { letter: 'B', text: materiKuis?.opsiB || 'Opsi B' },
    { letter: 'C', text: materiKuis?.opsiC || 'Opsi C' },
    { letter: 'D', text: materiKuis?.opsiD || 'Opsi D' },
  ];

  const handleSimpanStep1 = async () => {
    setSaving(true);
    const todayStr = new Date().toISOString().split('T')[0];
    const payload = {
      id: `H${habitId}-${Date.now()}`,
      tanggal: todayStr,
      username: currentUser?.username || 'siswa',
      namaSiswa: currentUser?.nama || 'Siswa',
      kelas: currentUser?.kelas || 'Kelas 5A',
      detail: habitId === 1 ? `Bangun pukul ${selectedVal} WIB` : habitId === 7 ? `Tidur pukul ${selectedVal} WIB` : selectedVal,
      fotoBukti: '',
      statusVerifikasi: 'Disetujui',
      catatanGuru: ''
    };

    try {
      await callApi('simpanHabit', { habitId, payload });
      showToast(`${config.nama}: Catatan tersimpan!`, 'success');
    } catch (e) {
      console.warn(e);
    }
    setSaving(false);
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePilihJawaban = (letter) => {
    setSelectedAnswer(letter);
    if (letter === keyChar) {
      showToast('Hebat! Jawaban kamu benar! (+15 XP)', 'success');
    } else {
      showToast('Kurang tepat, pelajari pembahasannya ya!', 'info');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto pb-24 select-none space-y-4">
      {/* ===================================================================== */}
      {/* STEP 1: PILIH AKTIVITAS / JAM                                         */}
      {/* ===================================================================== */}
      {step === 1 && (
        <div className="space-y-4 animate-fadeIn">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onBack}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition"
              >
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <h3 className="text-sm font-black text-slate-800">{config.nama}</h3>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
              Step 1/3
            </span>
          </div>

          {/* Motivational Banner */}
          <div className={`relative overflow-hidden bg-gradient-to-r ${config.color} rounded-3xl p-5 text-white shadow-md`}>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-white/25 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-2">
                  <i className={`fa-solid ${config.icon}`}></i>
                  <span>Misi {habitId}</span>
                </div>
                <h2 className="text-lg font-black tracking-tight">{config.sub}</h2>
                <p className="text-[11px] text-white/90 italic mt-1 leading-snug max-w-[210px]">
                  "{config.quote}"
                </p>
              </div>
              <div className="w-20 h-20 shrink-0">
                <img
                  src={config.img}
                  alt={config.nama}
                  className="w-full h-full object-contain drop-shadow-md"
                  onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/3048/3048122.png'; }}
                />
              </div>
            </div>
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/15 rounded-full blur-xl pointer-events-none"></div>
          </div>

          {/* Card 1: Input / Presets */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-black">
                1
              </span>
              <h4 className="text-xs font-black text-slate-800">{config.label1}</h4>
            </div>
            <p className="text-[11px] text-slate-400 ml-8">{config.desc1}</p>

            {/* Circular Clock for Habit 1 & 7 */}
            {(habitId === 1 || habitId === 7) && (
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col items-center justify-center mb-3">
                <div className="relative w-36 h-36 rounded-full border-4 border-dashed border-amber-300 flex items-center justify-center bg-white shadow-inner">
                  <span className="absolute top-1 text-[9px] font-black text-slate-400">12</span>
                  <span className="absolute right-2 text-[9px] font-black text-slate-400">03</span>
                  <span className="absolute bottom-1 text-[9px] font-black text-slate-400">06</span>
                  <span className="absolute left-2 text-[9px] font-black text-slate-400">09</span>
                  <div className="text-center">
                    <div className="text-amber-500 text-base mb-0.5"><i className={`fa-solid ${config.icon}`}></i></div>
                    <div className="text-2xl font-black text-slate-800 tracking-tight">{selectedVal}</div>
                    <div className="text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md inline-block mt-0.5">
                      {habitId === 1 ? 'AM (Pagi)' : 'PM (Malam)'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Presets List */}
            <div className={`gap-2 pt-1 ${habitId === 1 || habitId === 7 ? 'grid grid-cols-2' : 'space-y-2'}`}>
              {config.presets.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedVal(p)}
                  className={`w-full p-3 rounded-2xl border text-xs font-bold transition flex items-center justify-between ${
                    selectedVal === p
                      ? 'bg-amber-50 text-amber-900 border-amber-300 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <i className={`fa-solid ${habitId === 1 || habitId === 7 ? config.icon : 'fa-circle-check'} ${selectedVal === p ? 'text-amber-500' : 'text-slate-300'}`}></i>
                    <span>{p}</span>
                  </span>
                  {selectedVal === p && <i className="fa-solid fa-check text-amber-600"></i>}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Next */}
          <button
            type="button"
            disabled={saving}
            onClick={handleSimpanStep1}
            className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-2xl text-xs font-black shadow-md shadow-orange-500/25 active:scale-95 transition flex items-center justify-center gap-2"
          >
            <span>{saving ? 'Menyimpan...' : 'Lanjut ke Materi'}</span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      )}

      {/* ===================================================================== */}
      {/* STEP 2: VIDEO EDUKASI (YOUTUBE MATERI DARI GURU)                      */}
      {/* ===================================================================== */}
      {step === 2 && (
        <div className="space-y-4 animate-fadeIn">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition"
              >
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <h3 className="text-sm font-black text-slate-800">{config.nama}</h3>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">
              Step 2/3
            </span>
          </div>

          {/* Video Materi Card */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center text-sm font-black">
                <i className="fa-solid fa-circle-play"></i>
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-800">Materi Edukasi Guru</h4>
                <p className="text-[10px] text-slate-400">Tonton video edukasi kebiasaan baik di bawah ini.</p>
              </div>
            </div>

            {/* YouTube Thumbnail + Modal Trigger */}
            <div
              className="relative w-full rounded-2xl overflow-hidden bg-slate-900 aspect-video group cursor-pointer shadow-sm"
              onClick={() => onOpenVideoModal(habitId, materiKuis)}
            >
              <img
                src={thumbUrl}
                alt="Video Thumbnail"
                className="w-full h-full object-cover opacity-85 group-hover:opacity-95 transition"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-red-600 group-hover:bg-red-700 text-white flex items-center justify-center text-lg shadow-xl shadow-red-600/40 group-hover:scale-110 transition">
                  <i className="fa-solid fa-play ml-1"></i>
                </div>
              </div>
              <div className="absolute bottom-2.5 inset-x-3 text-white">
                <span className="text-[9px] font-black uppercase tracking-wider bg-red-600 px-2 py-0.5 rounded-md inline-block mb-1">
                  <i className="fa-brands fa-youtube mr-1"></i>YouTube
                </span>
                <div className="text-xs font-bold truncate">
                  {materiKuis?.judulMateri || `Materi Video Misi ${habitId}`}
                </div>
              </div>
            </div>

            {/* Title & Desc */}
            <div>
              <h4 className="text-xs font-black text-slate-800 mb-1">
                {materiKuis?.judulMateri || `Materi Misi ${habitId}`}
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                {materiKuis?.deskripsiMateri || 'Tonton dan pahami penjelasan materi di atas untuk menjawab kuis singkat.'}
              </p>
            </div>

            <a
              href={materiKuis?.linkYoutube || 'https://www.youtube.com'}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold border border-rose-200 transition flex items-center justify-center gap-2"
            >
              <i className="fa-brands fa-youtube text-red-600"></i>
              <span>Tonton di YouTube</span>
            </a>
          </div>

          {/* Quick Quiz Shortcut Card */}
          <div className="space-y-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider px-1">Alternatif Materi</span>
            <div
              onClick={() => setStep(3)}
              className="bg-white rounded-2xl p-3 border border-slate-100 shadow-xs hover:border-amber-300 cursor-pointer transition flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-xs">
                  <i className="fa-solid fa-circle-question"></i>
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-800">Kuis Singkat</h5>
                  <span className="text-[10px] text-slate-400">Uji pemahaman materi ini sekarang</span>
                </div>
              </div>
              <i className="fa-solid fa-chevron-right text-slate-400 text-xs"></i>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setStep(3)}
            className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-2xl text-xs font-black shadow-md shadow-orange-500/25 active:scale-95 transition flex items-center justify-center gap-2"
          >
            <span>Lanjut ke Kuis Singkat</span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      )}

      {/* ===================================================================== */}
      {/* STEP 3: KUIS SINGKAT & FEEDBACK INSTAN                                 */}
      {/* ===================================================================== */}
      {step === 3 && (
        <div className="space-y-4 animate-fadeIn">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition"
              >
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <h3 className="text-sm font-black text-slate-800">Kuis Singkat</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-slate-600">1/3</span>
              <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="bg-purple-600 h-full rounded-full" style={{ width: '33%' }}></div>
              </div>
            </div>
          </div>

          {/* Quiz Mascot Illustration */}
          <div className="flex items-center justify-center py-2">
            <div className="relative w-28 h-28">
              <img
                src={config.img}
                alt="Quiz Mascot"
                className="w-full h-full object-contain"
                onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/3048/3048122.png'; }}
              />
              <span className="absolute top-1 right-2 w-7 h-7 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-black shadow-sm">
                ?
              </span>
            </div>
          </div>

          {/* Question Box */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-3">
            <h4 className="text-xs sm:text-sm font-extrabold text-slate-800 leading-snug">
              1. {materiKuis?.pertanyaan?.replace(/^\d+\.\s*/, '') || 'Apa manfaat utama dari misi ini?'}
            </h4>

            {/* Options A, B, C, D */}
            <div className="space-y-2">
              {options.map((opt) => {
                const isSelected = selectedAnswer === opt.letter;
                const isCorrect = opt.letter === keyChar;
                let btnStyle = "w-full p-3 rounded-2xl border text-left text-xs font-semibold transition flex items-center justify-between ";

                if (isSelected) {
                  btnStyle += isCorrect
                    ? "border-2 border-emerald-500 bg-emerald-50 text-emerald-900 font-bold"
                    : "border-2 border-rose-400 bg-rose-50 text-rose-800 font-bold";
                } else {
                  btnStyle += "border-slate-200 text-slate-700 hover:bg-slate-50";
                }

                return (
                  <button
                    key={opt.letter}
                    type="button"
                    onClick={() => handlePilihJawaban(opt.letter)}
                    className={btnStyle}
                  >
                    <span className="flex items-center gap-3">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        isSelected && isCorrect
                          ? 'bg-emerald-600 text-white'
                          : isSelected && !isCorrect
                          ? 'bg-rose-500 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        {opt.letter}
                      </span>
                      <span>{opt.text}</span>
                    </span>
                    <i className={`fa-solid fa-circle-check text-base ${
                      isSelected && isCorrect ? 'text-emerald-600' : isSelected && !isCorrect ? 'text-rose-500' : 'text-transparent'
                    }`}></i>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback Card - ONLY VISIBLE ONCE ANSWERED */}
          {selectedAnswer && (
            <div className={`p-4 rounded-3xl border space-y-2 animate-fadeIn ${
              selectedAnswer === keyChar
                ? 'bg-emerald-50/90 border-emerald-200 text-emerald-900'
                : 'bg-amber-50/90 border-amber-200 text-amber-900'
            }`}>
              <div className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full text-white flex items-center justify-center text-xs ${
                  selectedAnswer === keyChar ? 'bg-emerald-500' : 'bg-amber-500'
                }`}>
                  <i className={`fa-solid ${selectedAnswer === keyChar ? 'fa-check' : 'fa-info'}`}></i>
                </div>
                <span className="text-xs font-black">
                  {selectedAnswer === keyChar ? 'Jawaban kamu benar! 🎉' : 'Jawaban kurang tepat!'}
                </span>
              </div>
              <p className="text-[11px] font-medium leading-relaxed">
                {selectedAnswer === keyChar
                  ? (materiKuis?.penjelasan || 'Bagus sekali! Kamu sudah memahami materi dengan sangat baik.')
                  : 'Coba baca penjelasan materi dan pilih kembali jawaban yang paling tepat ya!'}
              </p>

              <button
                type="button"
                onClick={() => onComplete(habitId, config.sub)}
                className="w-full mt-2 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-black shadow-md shadow-emerald-600/20 active:scale-95 transition flex items-center justify-center gap-2"
              >
                <span>Lanjut ke Hasil Misi</span>
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}