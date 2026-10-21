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
    jamPresets: ['04:30', '04:45', '05:00', '05:15', '05:30', '06:00'],
    defaultJam: '05:00',
    kegiatanOpsi: [
      { id: 'rapikan_kasur', text: 'Merapikan tempat tidur & melipat selimut', icon: 'fa-bed' },
      { id: 'buka_jendela', text: 'Membuka jendela & menghirup udara segar', icon: 'fa-window-maximize' },
      { id: 'air_hangat', text: 'Minum segelas air putih hangat', icon: 'fa-glass-water' },
      { id: 'gosok_gigi', text: 'Mencuci muka & menggosok gigi', icon: 'fa-tooth' },
      { id: 'mandi_pagi', text: 'Mandi pagi & memakai seragam sekolah', icon: 'fa-shower' }
    ]
  },
  2: {
    nama: 'Taat Beribadah',
    sub: 'Taat Beribadah & Berdoa',
    icon: 'fa-hands-praying',
    color: 'from-teal-500 via-emerald-500 to-green-500',
    quote: 'Ibadah dan rasa syukur mendidik hati menjadi tenang, sabar, dan selalu rendah hati kepada sesama.',
    img: 'https://illustrations.popertee.com/illustration-png/boy-praying.png',
    sholatList: [
      { id: 'subuh', nama: 'Sholat Subuh', defaultJam: '04:45', jamOpsi: ['04:30', '04:45', '05:00', '05:15'] },
      { id: 'dzuhur', nama: 'Sholat Dzuhur', defaultJam: '12:15', jamOpsi: ['11:45', '12:00', '12:15', '12:30'] },
      { id: 'ashar', nama: 'Sholat Ashar', defaultJam: '15:30', jamOpsi: ['15:15', '15:30', '15:45', '16:00'] },
      { id: 'maghrib', nama: 'Sholat Maghrib', defaultJam: '18:15', jamOpsi: ['18:00', '18:15', '18:30'] },
      { id: 'isya', nama: 'Sholat Isya', defaultJam: '19:30', jamOpsi: ['19:15', '19:30', '19:45', '20:00'] }
    ],
    kegiatanOpsi: [
      { id: 'tadarus', text: 'Membaca Al-Qur\'an / Juz \'Amma / Kitab Suci', icon: 'fa-book-quran' },
      { id: 'doa_ortu', text: 'Berdoa bersama orang tua & keluarga', icon: 'fa-hands-holding' },
      { id: 'dhuha', text: 'Sholat Dhuha / Doa Pagi', icon: 'fa-sun' },
      { id: 'infaq', text: 'Bersedekah / Infaq subuh', icon: 'fa-heart' }
    ]
  },
  3: {
    nama: 'Berolahraga',
    sub: 'Berolahraga Ceria',
    icon: 'fa-person-running',
    color: 'from-sky-500 via-blue-500 to-indigo-500',
    quote: 'Tubuh bugar melahirkan pikiran cerdas. Berolahraga melatih ketangkasan dan kekuatan fisik.',
    img: 'https://illustrations.popertee.com/illustration-png/boy-running.png',
    durasiPresets: ['15 Menit', '30 Menit', '45 Menit', '60 Menit'],
    defaultDurasi: '30 Menit',
    kegiatanOpsi: [
      { id: 'senam', text: 'Senam ceria / peregangan otot', icon: 'fa-child-reaching' },
      { id: 'jogging', text: 'Lari pagi / jogging di sekitar lingkungan', icon: 'fa-person-running' },
      { id: 'sepeda', text: 'Bersepeda santai keliling kompleks', icon: 'fa-person-biking' },
      { id: 'permainan', text: 'Bermain bulutangkis / lompat tali / bola', icon: 'fa-volleyball' },
      { id: 'jalan_sehat', text: 'Jalan sehat pagi bersama keluarga', icon: 'fa-person-walking' }
    ]
  },
  4: {
    nama: 'Gemar Belajar',
    sub: 'Gemar Belajar & Membaca',
    icon: 'fa-book-open',
    color: 'from-indigo-500 via-purple-500 to-pink-500',
    quote: 'Buku adalah jendela dunia. Belajar tekun setiap hari membuka jalan masa depan cerah.',
    img: 'https://illustrations.popertee.com/illustration-png/boy-reading-book.png',
    durasiPresets: ['20 Menit', '30 Menit', '45 Menit', '60 Menit'],
    defaultDurasi: '30 Menit',
    kegiatanOpsi: [
      { id: 'baca_buku', text: 'Membaca buku literasi (cerita / ensiklopedia)', icon: 'fa-book' },
      { id: 'kerjakan_pr', text: 'Mengerjakan tugas & PR sekolah', icon: 'fa-pen-to-square' },
      { id: 'ulang_materi', text: 'Mengulang materi pelajaran hari ini', icon: 'fa-graduation-cap' },
      { id: 'latihan_soal', text: 'Latihan soal berhitung / matematika', icon: 'fa-calculator' },
      { id: 'menggambar', text: 'Menggambar kreatif atau membuat prakarya', icon: 'fa-palette' }
    ]
  },
  5: {
    nama: 'Makan Sehat',
    sub: 'Makan Sehat Bergizi',
    icon: 'fa-apple-whole',
    color: 'from-rose-500 via-orange-500 to-amber-500',
    quote: 'Gizi seimbang menjaga imun tubuh kuat dan membantumu tumbuh tinggi serta cerdas.',
    img: 'https://illustrations.popertee.com/illustration-png/boy-eating-healthy-food.png',
    waktuPresets: ['Sarapan Pagi', 'Makan Siang', 'Makan Malam'],
    defaultWaktu: 'Sarapan Pagi',
    kegiatanOpsi: [
      { id: 'sayur', text: 'Makan sayur-sayuran hijau & bergizi', icon: 'fa-carrot' },
      { id: 'buah', text: 'Makan buah-buahan segar (pisang, jeruk, dll.)', icon: 'fa-apple-whole' },
      { id: 'air_putih', text: 'Minum air putih minimal 8 gelas hari ini', icon: 'fa-glass-water-droplet' },
      { id: 'lauk_protein', text: 'Makan lauk berprotein (telur, ikan, tempe, tahu)', icon: 'fa-egg' },
      { id: 'hindari_junk', text: 'Menghindari jajan sembarangan / makanan instan', icon: 'fa-ban' },
      { id: 'bekal_sehat', text: 'Membawa bekal makanan bergizi dari rumah', icon: 'fa-bowl-food' }
    ]
  },
  6: {
    nama: 'Membantu Ortu',
    sub: 'Membantu Orang Tua',
    icon: 'fa-hand-holding-heart',
    color: 'from-purple-500 via-fuchsia-500 to-pink-500',
    quote: 'Bakti kepada orang tua membukakan pintu kebaikan dan melatih kemandirian sejak dini.',
    img: 'https://illustrations.popertee.com/illustration-png/boy-helping-parents.png',
    kegiatanOpsi: [
      { id: 'sapu_pel', text: 'Menyapu & mengepel lantai rumah', icon: 'fa-broom' },
      { id: 'cuci_piring', text: 'Mencuci piring & gelas sehabis makan', icon: 'fa-sink' },
      { id: 'siap_makan', text: 'Membantu ibu menyiapkan hidangan & meja makan', icon: 'fa-utensils' },
      { id: 'jaga_adik', text: 'Menjaga & menemani adik bermain', icon: 'fa-children' },
      { id: 'rapikan_mainan', text: 'Merapikan mainan, rak buku, & meja belajar', icon: 'fa-box-archive' },
      { id: 'siram_tanaman', text: 'Menyiram tanaman di halaman rumah', icon: 'fa-plant-wilt' },
      { id: 'buang_sampah', text: 'Membuang sampah pada tempatnya', icon: 'fa-trash-can' }
    ]
  },
  7: {
    nama: 'Tidur Tepat',
    sub: 'Tidur Tepat Waktu',
    icon: 'fa-moon',
    color: 'from-cyan-600 via-blue-600 to-indigo-700',
    quote: 'Tidur nyenyak 8–9 jam membuat otak cerdas, tubuh pulih, dan bangun esok pagi penuh energi.',
    img: 'https://illustrations.popertee.com/illustration-png/boy-sleeping-peacefully.png',
    jamPresets: ['20:30', '21:00', '21:30', '22:00'],
    defaultJam: '21:00',
    kegiatanOpsi: [
      { id: 'gosok_gigi_malam', text: 'Menggosok gigi & mencuci kaki/tangan', icon: 'fa-tooth' },
      { id: 'bebas_hp', text: 'Mematikan HP / layar gadget sebelum tidur', icon: 'fa-mobile-screen-button' },
      { id: 'matikan_lampu', text: 'Mematikan lampu utama kamar tidur', icon: 'fa-lightbulb' },
      { id: 'doa_tidur', text: 'Membaca doa sebelum tidur', icon: 'fa-hands-praying' },
      { id: 'siap_seragam', text: 'Menyiapkan seragam & tas sekolah esok hari', icon: 'fa-shirt' }
    ]
  }
};

/**
 * Kompres file gambar dari kamera/galeri ke JPEG Base64 (< 30KB)
 * Agar ringan, instan, dan muat di kolom Google Sheets tanpa error.
 */
function compressImageFile(file, maxWidth = 480, quality = 0.65) {
  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      return reject(new Error('File yang dipilih bukan berkas gambar'));
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedBase64);
      };
      img.onerror = () => reject(new Error('Gagal memproses gambar'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('Gagal membaca file dari perangkat'));
    reader.readAsDataURL(file);
  });
}

export default function HabitWizard({
  habitId = 1,
  mode = 'misi', // 'misi' (khusus jurnal) | 'materi' (khusus video youtube & kuis) | 'kuis' (khusus kuis)
  materiKuis,
  currentUser,
  onComplete,
  onBack,
  onOpenVideoModal,
  showToast
}) {
  const config = HABIT_CONFIGS[habitId] || HABIT_CONFIGS[1];

  // Inisialisasi step berdasarkan mode:
  // - mode 'materi': langsung ke Video (step 2)
  // - mode 'kuis': langsung ke Kuis (step 3)
  // - mode 'misi': form isian jurnal harian (step 1)
  const initialStep = mode === 'materi' ? 2 : mode === 'kuis' ? 3 : 1;
  const [step, setStep] = useState(initialStep);

  // State Pengisian Misi Jurnal
  const [selectedJam, setSelectedJam] = useState(config.defaultJam || '05:00');
  const [selectedDurasi, setSelectedDurasi] = useState(config.defaultDurasi || '30 Menit');
  const [selectedWaktuMakan, setSelectedWaktuMakan] = useState(config.defaultWaktu || 'Sarapan Pagi');
  const [topikBelajar, setTopikBelajar] = useState('');
  const [catatanSiswa, setCatatanSiswa] = useState('');

  // State Khusus Sholat 5 Waktu (Misi 2)
  const [sholatStatus, setSholatStatus] = useState({
    subuh: { aktif: true, jam: '04:45' },
    dzuhur: { aktif: true, jam: '12:15' },
    ashar: { aktif: true, jam: '15:30' },
    maghrib: { aktif: true, jam: '18:15' },
    isya: { aktif: true, jam: '19:30' }
  });

  // State Checklist Kegiatan (Misi 1-7)
  const [selectedKegiatan, setSelectedKegiatan] = useState(
    config.kegiatanOpsi ? [config.kegiatanOpsi[0].text] : []
  );

  // State Foto Bukti dari Kamera / Galeri
  const [fotoBukti, setFotoBukti] = useState('');
  const [compressing, setCompressing] = useState(false);

  // State Kuis
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [saving, setSaving] = useState(false);

  // Helper YouTube ID
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
    { letter: 'A', text: materiKuis?.opsiA || 'Menonton TV seharian' },
    { letter: 'B', text: materiKuis?.opsiB || 'Menjaga kesehatan tubuh & membentuk karakter hebat' },
    { letter: 'C', text: materiKuis?.opsiC || 'Bermain game tanpa henti' },
    { letter: 'D', text: materiKuis?.opsiD || 'Hanya agar dipuji teman' },
  ];

  // Handler Pilih Foto dari Perangkat
  const handlePilihFoto = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setCompressing(true);
      const base64 = await compressImageFile(file, 480, 0.65);
      setFotoBukti(base64);
      showToast('Foto bukti berhasil diunggah! 📸', 'success');
    } catch (err) {
      console.error(err);
      showToast(err.message || 'Gagal memproses foto', 'error');
    } finally {
      setCompressing(false);
      // Reset input agar bisa pilih file yang sama jika perlu
      e.target.value = '';
    }
  };

  // Toggle Pilihan Kegiatan Checklist
  const toggleKegiatan = (text) => {
    setSelectedKegiatan((prev) => {
      if (prev.includes(text)) {
        return prev.filter((item) => item !== text);
      } else {
        return [...prev, text];
      }
    });
  };

  // Toggle Sholat 5 Waktu (Misi 2)
  const toggleSholat = (sholatKey) => {
    setSholatStatus((prev) => ({
      ...prev,
      [sholatKey]: {
        ...prev[sholatKey],
        aktif: !prev[sholatKey].aktif
      }
    }));
  };

  // Update Jam Sholat Tertentu (Misi 2)
  const changeJamSholat = (sholatKey, jamBaru) => {
    setSholatStatus((prev) => ({
      ...prev,
      [sholatKey]: {
        ...prev[sholatKey],
        jam: jamBaru
      }
    }));
  };

  // Bangun String Rangkuman Detail Pelaksanaan
  const buildDetailString = () => {
    let summary = '';
    if (habitId === 1) {
      summary = `Bangun pukul ${selectedJam} WIB. Kegiatan: ${selectedKegiatan.length > 0 ? selectedKegiatan.join(', ') : 'Bangun pagi tepat waktu'}`;
    } else if (habitId === 2) {
      const sholatDone = config.sholatList
        .filter((s) => sholatStatus[s.id]?.aktif)
        .map((s) => `${s.nama.replace('Sholat ', '')} (${sholatStatus[s.id]?.jam} WIB)`);
      const sholatSummary = sholatDone.length > 0 ? `Sholat: ${sholatDone.join(', ')}.` : 'Belum sholat fardhu.';
      const extraIbadah = selectedKegiatan.length > 0 ? ` Ibadah lainnya: ${selectedKegiatan.join(', ')}.` : '';
      summary = `${sholatSummary}${extraIbadah}`;
    } else if (habitId === 3) {
      summary = `Durasi: ${selectedDurasi}. Olahraga: ${selectedKegiatan.length > 0 ? selectedKegiatan.join(', ') : 'Olahraga fisik'}`;
    } else if (habitId === 4) {
      const judul = topikBelajar.trim() ? `[${topikBelajar.trim()}] ` : '';
      summary = `Belajar: ${judul}(${selectedDurasi}). Aktivitas: ${selectedKegiatan.length > 0 ? selectedKegiatan.join(', ') : 'Membaca & belajar'}`;
    } else if (habitId === 5) {
      summary = `Waktu: ${selectedWaktuMakan}. Menu & kebiasaan sehat: ${selectedKegiatan.length > 0 ? selectedKegiatan.join(', ') : 'Gizi seimbang'}`;
    } else if (habitId === 6) {
      summary = `Bantuan di rumah: ${selectedKegiatan.length > 0 ? selectedKegiatan.join(', ') : 'Membantu orang tua'}`;
    } else if (habitId === 7) {
      summary = `Target tidur pukul ${selectedJam} WIB. Persiapan: ${selectedKegiatan.length > 0 ? selectedKegiatan.join(', ') : 'Tidur tepat waktu'}`;
    }

    if (catatanSiswa.trim()) {
      summary += ` | Catatan: "${catatanSiswa.trim()}"`;
    }

    return summary;
  };

  // Simpan Jurnal Misi ke Backend Google Apps Script
  const handleSimpanMisiJurnal = async () => {
    // Validasi sederhana: pastikan minimal 1 kegiatan dipilih
    if (habitId === 2) {
      const hasAnySholat = config.sholatList.some((s) => sholatStatus[s.id]?.aktif);
      if (!hasAnySholat && selectedKegiatan.length === 0) {
        showToast('Pilih minimal 1 waktu sholat atau ibadah yang telah dilaksanakan!', 'info');
        return;
      }
    } else if (selectedKegiatan.length === 0) {
      showToast('Pilih minimal 1 kegiatan yang kamu lakukan ya!', 'info');
      return;
    }

    setSaving(true);
    const todayStr = new Date().toISOString().split('T')[0];
    const detailText = buildDetailString();

    const payload = {
      id: `H${habitId}-${Date.now()}`,
      tanggal: todayStr,
      username: currentUser?.username || 'siswa',
      namaSiswa: currentUser?.nama || 'Siswa',
      kelas: currentUser?.kelas || 'Kelas 5A',
      detail: detailText,
      fotoBukti: fotoBukti || '',
      statusVerifikasi: 'Disetujui',
      catatanGuru: ''
    };

    try {
      await callApi('simpanHabit', { habitId, payload });
      showToast(`${config.nama}: Jurnal misi berhasil disimpan! 🌟`, 'success');
      onComplete(habitId, config.sub, { detail: detailText, fotoBukti });
    } catch (e) {
      console.warn(e);
      showToast('Gagal menyimpan misi: ' + e.message, 'error');
    }
    setSaving(false);
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
      {/* KHUSUS MODE MISI: FORM PENGISIAN JURNAL MISI HARIAN (LENGKAP FOTO)   */}
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
              <div>
                <h3 className="text-sm font-black text-slate-800">Isi Misi: {config.nama}</h3>
                <p className="text-[10px] text-slate-400 font-medium">Unggah foto & pilih kegiatan yang dilakukan</p>
              </div>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              Menu Misi
            </span>
          </div>

          {/* Motivational Banner */}
          <div className={`relative overflow-hidden bg-gradient-to-r ${config.color} rounded-3xl p-5 text-white shadow-md`}>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <div className="inline-flex items-center gap-1.5 bg-white/25 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider mb-2">
                  <i className={`fa-solid ${config.icon}`}></i>
                  <span>Misi {habitId} dari 7</span>
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

          {/* ================================================================= */}
          {/* BAGIAN 1: UPLOAD FOTO BUKTI DARI KAMERA / PERANGKAT SISWA         */}
          {/* ================================================================= */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black">
                  1
                </span>
                <h4 className="text-xs font-black text-slate-800">Foto Bukti Kegiatan</h4>
              </div>
              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                {fotoBukti ? '✓ Foto Ada' : 'Kamera / Galeri'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Ambil foto selfie/kegiatanmu atau pilih dari galeri HP/laptop sebagai bukti misi.
            </p>

            {/* Input File Tersembunyi */}
            <input
              type="file"
              id="fotoInputPicker"
              accept="image/*"
              capture="environment"
              onChange={handlePilihFoto}
              className="hidden"
            />

            {compressing ? (
              <div className="py-8 bg-blue-50/50 rounded-2xl border border-blue-200 border-dashed flex flex-col items-center justify-center gap-2 text-blue-600">
                <i className="fa-solid fa-spinner fa-spin text-2xl"></i>
                <span className="text-xs font-bold">Sedang memproses foto bukti...</span>
              </div>
            ) : fotoBukti ? (
              /* Preview Foto Terunggah */
              <div className="space-y-2">
                <div className="relative rounded-2xl overflow-hidden border-2 border-emerald-400 bg-slate-900 group shadow-sm max-h-56 flex items-center justify-center">
                  <img
                    src={fotoBukti}
                    alt="Bukti Misi Siswa"
                    className="w-full h-52 object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-emerald-600/90 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                    <i className="fa-solid fa-circle-check"></i>
                    <span>Foto Siap Disimpan</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-1">
                  <label
                    htmlFor="fotoInputPicker"
                    className="flex-1 py-2.5 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold rounded-xl border border-blue-200 flex items-center justify-center gap-2 cursor-pointer transition active:scale-95"
                  >
                    <i className="fa-solid fa-camera-rotate"></i>
                    <span>Ganti Foto</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setFotoBukti('')}
                    className="px-3.5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl border border-rose-200 flex items-center justify-center gap-1.5 transition active:scale-95"
                    title="Hapus foto ini"
                  >
                    <i className="fa-solid fa-trash-can"></i>
                    <span>Hapus</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Tombol Ambil / Pilih Foto */
              <label
                htmlFor="fotoInputPicker"
                className="w-full py-6 px-4 bg-slate-50 hover:bg-blue-50/60 border-2 border-dashed border-slate-300 hover:border-blue-400 rounded-2xl flex flex-col items-center justify-center gap-2.5 cursor-pointer transition group"
              >
                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl group-hover:scale-110 transition shadow-xs">
                  <i className="fa-solid fa-camera"></i>
                </div>
                <div className="text-center">
                  <span className="text-xs font-black text-slate-800 group-hover:text-blue-600 block">
                    Ambil Foto / Pilih dari Galeri
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Bisa langsung dari kamera HP atau file perangkat
                  </span>
                </div>
              </label>
            )}
          </div>

          {/* ================================================================= */}
          {/* BAGIAN 2: PILIHAN KEGIATAN & JAM (DINAMIS SESUAI MISI 1 - 7)      */}
          {/* ================================================================= */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-black">
                  2
                </span>
                <h4 className="text-xs font-black text-slate-800">
                  {habitId === 2 ? 'Waktu 5 Sholat & Ibadah' : 'Kegiatan yang Dilakukan'}
                </h4>
              </div>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                Pilih yang Selesai
              </span>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* MISI 1 (BANGUN PAGI): PILIHAN JAM BANGUN + CHECKLIST KEGIATAN  */}
            {/* ------------------------------------------------------------- */}
            {habitId === 1 && (
              <div className="space-y-3">
                <label className="text-[11px] font-bold text-slate-600 block">
                  Jam berapa kamu bangun pagi ini?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {config.jamPresets.map((jam) => (
                    <button
                      key={jam}
                      type="button"
                      onClick={() => setSelectedJam(jam)}
                      className={`py-2 px-3 rounded-xl border text-xs font-extrabold transition flex items-center justify-center gap-1.5 ${
                        selectedJam === jam
                          ? 'bg-amber-500 text-white border-amber-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      <i className="fa-regular fa-clock text-[10px]"></i>
                      <span>{jam} WIB</span>
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  <label className="text-[11px] font-bold text-slate-600 block mb-2">
                    Kegiatan yang kamu lakukan setelah bangun:
                  </label>
                  <div className="space-y-2">
                    {config.kegiatanOpsi.map((item) => {
                      const isChecked = selectedKegiatan.includes(item.text);
                      return (
                        <div
                          key={item.id}
                          onClick={() => toggleKegiatan(item.text)}
                          className={`p-3 rounded-2xl border text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                            isChecked
                              ? 'bg-blue-50 text-blue-900 border-blue-400 shadow-xs'
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <span className="flex items-center gap-2.5">
                            <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${
                              isChecked ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                            }`}>
                              <i className={`fa-solid ${item.icon}`}></i>
                            </span>
                            <span>{item.text}</span>
                          </span>
                          <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] border ${
                            isChecked ? 'bg-blue-600 text-white border-blue-600' : 'border-slate-300'
                          }`}>
                            {isChecked && <i className="fa-solid fa-check"></i>}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* MISI 2 (TAAT BERIBADAH): MENU 5 WAKTU SHOLAT DENGAN PILIHAN JAM */}
            {/* ------------------------------------------------------------- */}
            {habitId === 2 && (
              <div className="space-y-3.5">
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3 text-[11px] text-emerald-900 leading-snug">
                  <i className="fa-solid fa-circle-info text-emerald-600 mr-1.5"></i>
                  Centang sholat fardhu yang telah kamu tunaikan dan tentukan jam pelaksanaannya.
                </div>

                {/* 5 Waktu Sholat */}
                <div className="space-y-2.5">
                  {config.sholatList.map((s) => {
                    const st = sholatStatus[s.id] || { aktif: false, jam: s.defaultJam };
                    return (
                      <div
                        key={s.id}
                        className={`p-3 rounded-2xl border transition space-y-2 ${
                          st.aktif
                            ? 'bg-emerald-50/60 border-emerald-300 shadow-xs'
                            : 'bg-slate-50/80 border-slate-200 opacity-70'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <label
                            onClick={() => toggleSholat(s.id)}
                            className="flex items-center gap-2.5 cursor-pointer font-extrabold text-xs text-slate-800"
                          >
                            <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] border ${
                              st.aktif ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-300 bg-white'
                            }`}>
                              {st.aktif && <i className="fa-solid fa-check"></i>}
                            </span>
                            <span>{s.nama}</span>
                          </label>

                          {st.aktif && (
                            <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                              Selesai ✓
                            </span>
                          )}
                        </div>

                        {/* Pilihan Jam Sholat */}
                        {st.aktif && (
                          <div className="pl-7 flex items-center gap-2 pt-0.5">
                            <span className="text-[10px] font-bold text-slate-500 whitespace-nowrap">
                              Jam Sholat:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {s.jamOpsi.map((j) => (
                                <button
                                  key={j}
                                  type="button"
                                  onClick={() => changeJamSholat(s.id, j)}
                                  className={`px-2 py-1 rounded-lg text-[10px] font-extrabold border transition ${
                                    st.jam === j
                                      ? 'bg-emerald-600 text-white border-emerald-700'
                                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                                  }`}
                                >
                                  {j} WIB
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Kegiatan Ibadah Lainnya / Inklusif */}
                <div className="pt-2 border-t border-slate-100">
                  <label className="text-[11px] font-bold text-slate-600 block mb-2">
                    Ibadah & Kebaikan Lainnya Hari Ini:
                  </label>
                  <div className="space-y-2">
                    {config.kegiatanOpsi.map((item) => {
                      const isChecked = selectedKegiatan.includes(item.text);
                      return (
                        <div
                          key={item.id}
                          onClick={() => toggleKegiatan(item.text)}
                          className={`p-3 rounded-2xl border text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                            isChecked
                              ? 'bg-emerald-50 text-emerald-900 border-emerald-400 shadow-xs'
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <span className="flex items-center gap-2.5">
                            <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${
                              isChecked ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'
                            }`}>
                              <i className={`fa-solid ${item.icon}`}></i>
                            </span>
                            <span>{item.text}</span>
                          </span>
                          <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] border ${
                            isChecked ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-300'
                          }`}>
                            {isChecked && <i className="fa-solid fa-check"></i>}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* MISI 3 (BEROLAHRAGA): DURASI & CHECKLIST OLAHRAGA              */}
            {/* ------------------------------------------------------------- */}
            {habitId === 3 && (
              <div className="space-y-3">
                <label className="text-[11px] font-bold text-slate-600 block">
                  Berapa lama kamu berolahraga hari ini?
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {config.durasiPresets.map((durasi) => (
                    <button
                      key={durasi}
                      type="button"
                      onClick={() => setSelectedDurasi(durasi)}
                      className={`py-2 px-1 rounded-xl border text-[11px] font-extrabold transition text-center ${
                        selectedDurasi === durasi
                          ? 'bg-sky-600 text-white border-sky-700 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {durasi}
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  <label className="text-[11px] font-bold text-slate-600 block mb-2">
                    Olahraga apa yang kamu lakukan?
                  </label>
                  <div className="space-y-2">
                    {config.kegiatanOpsi.map((item) => {
                      const isChecked = selectedKegiatan.includes(item.text);
                      return (
                        <div
                          key={item.id}
                          onClick={() => toggleKegiatan(item.text)}
                          className={`p-3 rounded-2xl border text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                            isChecked
                              ? 'bg-sky-50 text-sky-900 border-sky-400 shadow-xs'
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <span className="flex items-center gap-2.5">
                            <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${
                              isChecked ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-500'
                            }`}>
                              <i className={`fa-solid ${item.icon}`}></i>
                            </span>
                            <span>{item.text}</span>
                          </span>
                          <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] border ${
                            isChecked ? 'bg-sky-600 text-white border-sky-600' : 'border-slate-300'
                          }`}>
                            {isChecked && <i className="fa-solid fa-check"></i>}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* MISI 4 (GEMAR BELAJAR): JUDUL BUKU + DURASI + CHECKLIST       */}
            {/* ------------------------------------------------------------- */}
            {habitId === 4 && (
              <div className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">
                    Judul Buku / Pelajaran yang Dipelajari:
                  </label>
                  <input
                    type="text"
                    value={topikBelajar}
                    onChange={(e) => setTopikBelajar(e.target.value)}
                    placeholder="Contoh: Buku Cerita Kancil / Matematika Bab 2"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1.5">
                    Durasi Belajar / Membaca:
                  </label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {config.durasiPresets.map((durasi) => (
                      <button
                        key={durasi}
                        type="button"
                        onClick={() => setSelectedDurasi(durasi)}
                        className={`py-2 px-1 rounded-xl border text-[11px] font-extrabold transition text-center ${
                          selectedDurasi === durasi
                            ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {durasi}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <label className="text-[11px] font-bold text-slate-600 block mb-2">
                    Aktivitas belajar yang kamu lakukan:
                  </label>
                  <div className="space-y-2">
                    {config.kegiatanOpsi.map((item) => {
                      const isChecked = selectedKegiatan.includes(item.text);
                      return (
                        <div
                          key={item.id}
                          onClick={() => toggleKegiatan(item.text)}
                          className={`p-3 rounded-2xl border text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                            isChecked
                              ? 'bg-indigo-50 text-indigo-900 border-indigo-400 shadow-xs'
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <span className="flex items-center gap-2.5">
                            <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${
                              isChecked ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
                            }`}>
                              <i className={`fa-solid ${item.icon}`}></i>
                            </span>
                            <span>{item.text}</span>
                          </span>
                          <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] border ${
                            isChecked ? 'bg-indigo-600 text-white border-indigo-600' : 'border-slate-300'
                          }`}>
                            {isChecked && <i className="fa-solid fa-check"></i>}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* MISI 5 (MAKAN SEHAT): WAKTU MAKAN + CHECKLIST MENU GIZI        */}
            {/* ------------------------------------------------------------- */}
            {habitId === 5 && (
              <div className="space-y-3">
                <label className="text-[11px] font-bold text-slate-600 block">
                  Pilih Waktu Makan yang Dicatat:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {config.waktuPresets.map((waktu) => (
                    <button
                      key={waktu}
                      type="button"
                      onClick={() => setSelectedWaktuMakan(waktu)}
                      className={`py-2 px-2 rounded-xl border text-xs font-extrabold transition text-center ${
                        selectedWaktuMakan === waktu
                          ? 'bg-rose-500 text-white border-rose-600 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {waktu}
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  <label className="text-[11px] font-bold text-slate-600 block mb-2">
                    Menu & Kebiasaan Makan Sehat Hari Ini:
                  </label>
                  <div className="space-y-2">
                    {config.kegiatanOpsi.map((item) => {
                      const isChecked = selectedKegiatan.includes(item.text);
                      return (
                        <div
                          key={item.id}
                          onClick={() => toggleKegiatan(item.text)}
                          className={`p-3 rounded-2xl border text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                            isChecked
                              ? 'bg-rose-50 text-rose-900 border-rose-400 shadow-xs'
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <span className="flex items-center gap-2.5">
                            <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${
                              isChecked ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-500'
                            }`}>
                              <i className={`fa-solid ${item.icon}`}></i>
                            </span>
                            <span>{item.text}</span>
                          </span>
                          <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] border ${
                            isChecked ? 'bg-rose-500 text-white border-rose-500' : 'border-slate-300'
                          }`}>
                            {isChecked && <i className="fa-solid fa-check"></i>}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* MISI 6 (MEMBANTU ORANG TUA): CHECKLIST BANTUAN DI RUMAH        */}
            {/* ------------------------------------------------------------- */}
            {habitId === 6 && (
              <div className="space-y-3">
                <label className="text-[11px] font-bold text-slate-600 block">
                  Bantuan nyata apa yang kamu lakukan di rumah hari ini?
                </label>
                <div className="space-y-2">
                  {config.kegiatanOpsi.map((item) => {
                    const isChecked = selectedKegiatan.includes(item.text);
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleKegiatan(item.text)}
                        className={`p-3 rounded-2xl border text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                          isChecked
                            ? 'bg-purple-50 text-purple-900 border-purple-400 shadow-xs'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${
                            isChecked ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-500'
                          }`}>
                            <i className={`fa-solid ${item.icon}`}></i>
                          </span>
                          <span>{item.text}</span>
                        </span>
                        <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] border ${
                          isChecked ? 'bg-purple-600 text-white border-purple-600' : 'border-slate-300'
                        }`}>
                          {isChecked && <i className="fa-solid fa-check"></i>}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* MISI 7 (TIDUR TEPAT WAKTU): TARGET JAM TIDUR + CHECKLIST       */}
            {/* ------------------------------------------------------------- */}
            {habitId === 7 && (
              <div className="space-y-3">
                <label className="text-[11px] font-bold text-slate-600 block">
                  Jam berapa target kamu tidur malam ini?
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {config.jamPresets.map((jam) => (
                    <button
                      key={jam}
                      type="button"
                      onClick={() => setSelectedJam(jam)}
                      className={`py-2 px-1 rounded-xl border text-[11px] font-extrabold transition text-center ${
                        selectedJam === jam
                          ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {jam} WIB
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  <label className="text-[11px] font-bold text-slate-600 block mb-2">
                    Persiapan sebelum tidur yang kamu lakukan:
                  </label>
                  <div className="space-y-2">
                    {config.kegiatanOpsi.map((item) => {
                      const isChecked = selectedKegiatan.includes(item.text);
                      return (
                        <div
                          key={item.id}
                          onClick={() => toggleKegiatan(item.text)}
                          className={`p-3 rounded-2xl border text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                            isChecked
                              ? 'bg-indigo-50 text-indigo-900 border-indigo-400 shadow-xs'
                              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <span className="flex items-center gap-2.5">
                            <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${
                              isChecked ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
                            }`}>
                              <i className={`fa-solid ${item.icon}`}></i>
                            </span>
                            <span>{item.text}</span>
                          </span>
                          <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] border ${
                            isChecked ? 'bg-indigo-600 text-white border-indigo-600' : 'border-slate-300'
                          }`}>
                            {isChecked && <i className="fa-solid fa-check"></i>}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Catatan Tambahan Siswa (Opsional) */}
            <div className="pt-2 border-t border-slate-100">
              <label className="text-[11px] font-bold text-slate-600 block mb-1">
                Catatan / Cerita Tambahan Siswa (Opsional):
              </label>
              <textarea
                rows={2}
                value={catatanSiswa}
                onChange={(e) => setCatatanSiswa(e.target.value)}
                placeholder="Tuliskan pengalaman seru atau ceritamu hari ini..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>
          </div>

          {/* Tombol Simpan Jurnal Misi */}
          <button
            type="button"
            disabled={saving || compressing}
            onClick={handleSimpanMisiJurnal}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white rounded-2xl text-xs font-black shadow-lg shadow-blue-600/30 active:scale-95 transition flex items-center justify-center gap-2"
          >
            {saving ? (
              <span><i className="fa-solid fa-spinner fa-spin mr-2"></i>Menyimpan Misi ke Jurnal...</span>
            ) : (
              <>
                <i className="fa-solid fa-cloud-arrow-up"></i>
                <span>Simpan & Selesaikan Misi {habitId}</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* ===================================================================== */}
      {/* KHUSUS MENU MATERI: VIDEO YOUTUBE & MATERI PEMBELAJARAN (STEP 2)      */}
      {/* ===================================================================== */}
      {step === 2 && (
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
              <div>
                <h3 className="text-sm font-black text-slate-800">Materi Edukasi: {config.nama}</h3>
                <p className="text-[10px] text-slate-400 font-medium">Tonton video & pelajari materi kebiasaan</p>
              </div>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">
              Menu Materi
            </span>
          </div>

          {/* Video Materi Card */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-base font-black">
                <i className="fa-brands fa-youtube"></i>
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-800">Video Panduan YouTube</h4>
                <p className="text-[10px] text-slate-400">Klik video di bawah untuk memutar pembelajaran.</p>
              </div>
            </div>

            {/* YouTube Thumbnail + Trigger Modal Video Player */}
            <div
              className="relative w-full rounded-2xl overflow-hidden bg-slate-900 aspect-video group cursor-pointer shadow-md border border-slate-800"
              onClick={() => onOpenVideoModal(habitId, materiKuis)}
            >
              <img
                src={thumbUrl}
                alt="Video Thumbnail"
                className="w-full h-full object-cover opacity-85 group-hover:opacity-95 transition"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-red-600 group-hover:bg-red-700 text-white flex items-center justify-center text-xl shadow-xl shadow-red-600/40 group-hover:scale-110 transition">
                  <i className="fa-solid fa-play ml-1"></i>
                </div>
              </div>
              <div className="absolute bottom-2.5 inset-x-3 text-white">
                <span className="text-[9px] font-black uppercase tracking-wider bg-red-600 px-2 py-0.5 rounded-md inline-block mb-1">
                  <i className="fa-brands fa-youtube mr-1"></i>Tonton Sekarang
                </span>
                <div className="text-xs font-bold truncate">
                  {materiKuis?.judulMateri || `Materi Video Misi ${habitId}: ${config.nama}`}
                </div>
              </div>
            </div>

            {/* Title & Description */}
            <div className="pt-1">
              <h4 className="text-sm font-black text-slate-800 mb-1">
                {materiKuis?.judulMateri || `Materi Misi ${habitId}: ${config.sub}`}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {materiKuis?.deskripsiMateri || 'Tonton dan pahami penjelasan materi di atas untuk mengasah wawasan dan menjawab kuis.'}
              </p>
            </div>

            <a
              href={materiKuis?.linkYoutube || 'https://www.youtube.com'}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold border border-rose-200 transition flex items-center justify-center gap-2"
            >
              <i className="fa-brands fa-youtube text-red-600"></i>
              <span>Buka di Aplikasi YouTube</span>
            </a>
          </div>

          {/* Tombol Lanjut ke Kuis Pemahaman */}
          <button
            type="button"
            onClick={() => { setStep(3); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="w-full py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-2xl text-xs font-black shadow-lg shadow-purple-600/25 active:scale-95 transition flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-clipboard-check"></i>
            <span>Lanjut Mengerjakan Kuis Materi Ini</span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      )}

      {/* ===================================================================== */}
      {/* KHUSUS MENU KUIS: SOAL PEMAHAMAN & FEEDBACK LANGSUNG (STEP 3)         */}
      {/* ===================================================================== */}
      {step === 3 && (
        <div className="space-y-4 animate-fadeIn">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-2 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => mode === 'kuis' ? onBack() : setStep(2)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 transition"
              >
                <i className="fa-solid fa-arrow-left"></i>
              </button>
              <div>
                <h3 className="text-sm font-black text-slate-800">Kuis: {config.nama}</h3>
                <p className="text-[10px] text-slate-400 font-medium">Uji pemahaman materi kebiasaan</p>
              </div>
            </div>
            <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-200">
              Menu Kuis
            </span>
          </div>

          {/* Quiz Mascot Illustration */}
          <div className="flex items-center justify-center py-1">
            <div className="relative w-24 h-24">
              <img
                src={config.img}
                alt="Quiz Mascot"
                className="w-full h-full object-contain"
                onError={(e) => { e.target.src = 'https://cdn-icons-png.flaticon.com/512/3048/3048122.png'; }}
              />
              <span className="absolute top-0 right-1 w-7 h-7 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-black shadow-sm">
                ?
              </span>
            </div>
          </div>

          {/* Question Box */}
          <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-3.5">
            <div className="flex items-center gap-2 text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1 rounded-full inline-block">
              <i className="fa-solid fa-circle-question"></i>
              <span>Pertanyaan Soal:</span>
            </div>
            <h4 className="text-xs sm:text-sm font-extrabold text-slate-800 leading-snug">
              {materiKuis?.pertanyaan?.replace(/^\d+\.\s*/, '') || `Apa manfaat utama dari kebiasaan ${config.nama}?`}
            </h4>

            {/* Options A, B, C, D */}
            <div className="space-y-2 pt-1">
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
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
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
                    <i className={`fa-solid fa-circle-check text-base shrink-0 ${
                      isSelected && isCorrect ? 'text-emerald-600' : isSelected && !isCorrect ? 'text-rose-500' : 'text-transparent'
                    }`}></i>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback Card */}
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
                  {selectedAnswer === keyChar ? 'Jawaban kamu benar! 🎉' : 'Jawaban belum tepat!'}
                </span>
              </div>
              <p className="text-[11px] font-medium leading-relaxed">
                {selectedAnswer === keyChar
                  ? (materiKuis?.penjelasan || 'Bagus sekali! Kamu sudah memahami materi pembiasaan ini dengan sangat baik.')
                  : 'Pelajari kembali video materi untuk mendapatkan pemahaman yang lengkap ya!'}
              </p>

              <button
                type="button"
                onClick={onBack}
                className="w-full mt-2 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-black shadow-md shadow-blue-600/20 active:scale-95 transition flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-house"></i>
                <span>Selesai & Kembali ke Dashboard</span>
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
