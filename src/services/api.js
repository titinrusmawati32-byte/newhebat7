/**
 * API Service untuk menghubungkan Frontend Vite / React ke Backend Google Apps Script
 */

const STORAGE_KEY_GAS_URL = 'GAS_API_URL_7KEBIASAAN';

// Default URL dari localStorage atau kosong untuk mode demo/fallback
export function getGasApiUrl() {
  return localStorage.getItem(STORAGE_KEY_GAS_URL) || '';
}

export function setGasApiUrl(url) {
  if (url) {
    localStorage.setItem(STORAGE_KEY_GAS_URL, url.trim());
  } else {
    localStorage.removeItem(STORAGE_KEY_GAS_URL);
  }
}

// Fallback Mock Data Default
const MOCK_PENGATURAN = {
  namaSekolah: 'SD Generasi Indonesia Hebat',
  logoSekolah: 'https://cdn-icons-png.flaticon.com/512/2997/2997295.png',
  linkYoutube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  usernameKepsek: 'kepsek',
  passwordKepsek: '123456'
};

const MOCK_MATERI_KUIS = {
  1: {
    habitId: 1,
    judulMateri: 'Manfaat Bangun Pagi untuk Kesehatan',
    deskripsiMateri: 'Bangun pagi membuat tubuh lebih sehat, pikiran lebih fokus, metabolisme aktif, dan semangat belajar meningkat.',
    linkYoutube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    pertanyaan: 'Apa manfaat utama dari bangun pagi?',
    opsiA: 'Menonton TV lebih lama',
    opsiB: 'Menjaga kesehatan tubuh',
    opsiC: 'Bermain game sepanjang hari',
    opsiD: 'Tidur lebih banyak',
    kunciJawaban: 'B',
    penjelasan: 'Bangun pagi membantu tubuh lebih sehat, meningkatkan konsentrasi, dan membuat semangat belajar.'
  },
  2: {
    habitId: 2,
    judulMateri: 'Indahnya Bersyukur dan Taat Beribadah',
    deskripsiMateri: 'Ibadah dan rasa syukur mendidik hati menjadi tenang, sabar, dan selalu rendah hati kepada sesama manusia.',
    linkYoutube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    pertanyaan: 'Mengapa kita harus selalu bersyukur kepada Tuhan setiap hari?',
    opsiA: 'Agar dipuji orang lain',
    opsiB: 'Karena Tuhan telah memberikan nikmat kesehatan dan kehidupan',
    opsiC: 'Hanya saat mendapatkan uang jajan',
    opsiD: 'Supaya terbebas dari tugas sekolah',
    kunciJawaban: 'B',
    penjelasan: 'Bersyukur atas kesehatan dan keluarga membuat hidup kita senantiasa damai dan bahagia.'
  },
  3: {
    habitId: 3,
    judulMateri: 'Senam Ceria Anak Indonesia Hebat',
    deskripsiMateri: 'Gerak aktif memperlancar aliran darah ke otak, meningkatkan daya ingat dan konsentrasi saat belajar di kelas.',
    linkYoutube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    pertanyaan: 'Mengapa kita wajib melakukan pemanasan sebelum berolahraga?',
    opsiA: 'Agar cepat lelah',
    opsiB: 'Mencegah cedera otot dan menyiapkan tubuh',
    opsiC: 'Hanya untuk bergaya',
    opsiD: 'Agar waktu olahraga cepat selesai',
    kunciJawaban: 'B',
    penjelasan: 'Pemanasan meregangkan sendi dan menaikkan suhu tubuh sehingga terhindar dari kram atau cedera.'
  },
  4: {
    habitId: 4,
    judulMateri: 'Petualangan Seru Membaca Buku',
    deskripsiMateri: 'Semakin banyak membaca, semakin luas imajinasi dan pengetahuan yang kamu miliki untuk masa depan gemilang.',
    linkYoutube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    pertanyaan: 'Mengapa buku sering disebut sebagai jendela dunia?',
    opsiA: 'Karena bentuknya mirip jendela rumah',
    opsiB: 'Karena melalui buku kita bisa mengetahui berbagai ilmu di seluruh dunia',
    opsiC: 'Hanya untuk pajangan di perpustakaan',
    opsiD: 'Karena terbuat dari kertas putih',
    kunciJawaban: 'B',
    penjelasan: 'Membaca buku membuka wawasan kita tentang sains, sejarah, budaya, dan teknologi dari berbagai penjuru dunia.'
  },
  5: {
    habitId: 5,
    judulMateri: 'Pedoman Isi Piringku Gizi Seimbang',
    deskripsiMateri: 'Sayur dan buah mengandung serat dan antioksidan yang melindungi tubuh dari berbagai virus dan penyakit.',
    linkYoutube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    pertanyaan: 'Mengapa tubuh kita membutuhkan sayuran dan buah-buahan setiap hari?',
    opsiA: 'Hanya agar piring terlihat penuh',
    opsiB: 'Menyediakan vitamin, mineral, dan serat untuk daya tahan tubuh',
    opsiC: 'Supaya cepat mengantuk di kelas',
    opsiD: 'Karena rasanya seperti permen',
    kunciJawaban: 'B',
    penjelasan: 'Serat pada sayur melancarkan pencernaan, sedangkan vitamin pada buah menjaga tubuh tetap bugar.'
  },
  6: {
    habitId: 6,
    judulMateri: 'Indahnya Gotong Royong dan Berbakti',
    deskripsiMateri: 'Bantuan kecil seperti merapikan mainan atau mencuci piring sangat membahagiakan hati ayah dan ibu di rumah.',
    linkYoutube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    pertanyaan: 'Apa manfaat membiasakan diri membantu orang tua di rumah?',
    opsiA: 'Agar diberi upah banyak',
    opsiB: 'Melatih kemandirian, tanggung jawab, dan meringankan beban orang tua',
    opsiC: 'Supaya orang tua tidak menyuruh belajar',
    opsiD: 'Hanya saat ada tamu yang datang',
    kunciJawaban: 'B',
    penjelasan: 'Membantu di rumah memupuk rasa bakti dan kasih sayang tulus serta membentuk pribadi yang mandiri dan peduli.'
  },
  7: {
    habitId: 7,
    judulMateri: 'Rahasia Kekuatan Otak Saat Tidur Cukup',
    deskripsiMateri: 'Saat tidur nyenyak, sel-sel otak membersihkan racun, menyimpan memori pelajaran, dan memproduksi hormon pertumbuhan.',
    linkYoutube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    pertanyaan: 'Mengapa kita tidak boleh bermain gawai (HP) larut malam sebelum tidur?',
    opsiA: 'Karena baterai HP bisa habis',
    opsiB: 'Cahaya biru layar merusak mata dan menunda produksi hormon tidur (melatonin)',
    opsiC: 'Agar game tidak bosan',
    opsiD: 'Hanya mitos orang dewasa',
    kunciJawaban: 'B',
    penjelasan: 'Sinar biru layar gadget membuat otak mengira masih siang hari sehingga sulit tidur nyenyak.'
  }
};

/**
 * Panggil API Google Apps Script melalui POST (CORS-friendly dengan text/plain)
 */
export async function callApi(action, payload = {}) {
  const gasUrl = getGasApiUrl();

  if (gasUrl) {
    try {
      const response = await fetch(gasUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8' // Menghindari CORS Preflight OPTIONS di GAS
        },
        body: JSON.stringify({ action, data: payload })
      });
      const res = await response.json();
      return res;
    } catch (err) {
      console.warn(`[API GAS] Request '${action}' gagal, menggunakan fallback lokal:`, err);
    }
  }

  // Fallback simulator jika belum connect ke URL GAS atau offline
  return handleMockApi(action, payload);
}

function handleMockApi(action, data) {
  if (action === 'login') {
    const { username, password } = data;
    if (username === '0012345678' && password === '123456') {
      return { success: true, role: 'Siswa', username: '0012345678', nama: 'Ahmad Farhan', panggilan: 'Farhan', kelas: 'Kelas 5A' };
    }
    if (username === 'guru5a' && password === '123456') {
      return { success: true, role: 'Guru', username: 'guru5a', nama: 'Budi Santoso, S.Pd', panggilan: 'Pak Budi', kelas: 'Kelas 5A' };
    }
    if (username === 'kepsek' && password === '123456') {
      return { success: true, role: 'Kepsek', username: 'kepsek', nama: 'Drs. H. Mulyadi, M.Pd', panggilan: 'Pak Mulyadi', kelas: 'Kepsek' };
    }
    return { success: false, message: 'NISN / Username atau Kata Sandi salah (Demo: 0012345678 / 123456)' };
  }

  if (action === 'getPengaturan') {
    return MOCK_PENGATURAN;
  }

  if (action === 'getMateriKuisAll') {
    return MOCK_MATERI_KUIS;
  }

  if (action === 'simpanMateriKuis') {
    const { habitId, payload } = data;
    if (MOCK_MATERI_KUIS[habitId]) {
      MOCK_MATERI_KUIS[habitId] = { ...MOCK_MATERI_KUIS[habitId], ...payload };
    }
    return { success: true, message: `Materi & Kuis Misi ${habitId} berhasil diperbarui!` };
  }

  if (action === 'getInitialSiswa') {
    return {
      habitsToday: {
        1: { id: 'H1-demo', detail: 'Bangun pukul 05:30 WIB', statusVerifikasi: 'Disetujui' }
      }
    };
  }

  if (action === 'simpanHabit') {
    return { success: true, message: 'Kebiasaan berhasil disimpan!' };
  }

  if (action === 'getMonitoringKelas') {
    return {
      rows: [
        { nisn: '0012345678', nama: 'Ahmad Farhan', completedCount: 5, percentage: 71, habits: { h1: { statusVerifikasi: 'Disetujui', detail: 'Bangun 05:30' } } },
        { nisn: '0012345679', nama: 'Annisa Zahra', completedCount: 7, percentage: 100, habits: { h1: { statusVerifikasi: 'Disetujui', detail: 'Bangun 05:00' } } }
      ]
    };
  }

  return { success: true, message: 'OK' };
}