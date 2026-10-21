import React, { useState, useEffect } from 'react';
import { callApi, getGasApiUrl } from '../services/api';

const HABIT_TITLES = [
  'Bangun Pagi & Merapikan Tempat Tidur',
  'Beribadah Tepat Waktu',
  'Olahraga / Senam Kebugaran',
  'Makan Sehat & Gemar Belajar',
  'Membantu Orang Tua & Bermasyarakat',
  'Gemar Menabung & Hemat Energi',
  'Tidur Cepat Maksimal Pukul 21.00'
];

const HABIT_ICONS = [
  'fa-sun',
  'fa-hands-praying',
  'fa-person-running',
  'fa-apple-whole',
  'fa-hand-holding-heart',
  'fa-piggy-bank',
  'fa-moon'
];

const INITIAL_STUDENTS = [
  {
    id: 1,
    nisn: '0012345678',
    nama: 'Ahmad Farhan Pratama',
    panggilan: 'Farhan',
    username: 'farhan',
    password: 'password123',
    kelas: 'Kelas 5A',
    gender: 'L',
    completedCount: 6,
    percentage: 86,
    habits: { h1: true, h2: true, h3: true, h4: true, h5: true, h6: true, h7: false },
    statusVerif: 'Menunggu',
    detailMisi: {
      1: { selesai: true, jam: '05:15 WIB', jawabanKuis: 'B', kuisBenar: true, nilaiKuis: 100, catatan: 'Bangun pagi pukul 05:00 WIB. Kegiatan: Merapikan tempat tidur & melipat selimut, Minum segelas air putih hangat.', fotoBukti: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=600&q=80' },
      2: { selesai: true, jam: '05:30 WIB', jawabanKuis: 'B', kuisBenar: true, nilaiKuis: 100, catatan: 'Sholat: Subuh (04:45 WIB), Dzuhur (12:15 WIB). Ibadah lainnya: Membaca Al-Qur\'an / Kitab Suci, Berdoa bersama keluarga.', fotoBukti: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80' },
      3: { selesai: true, jam: '06:05 WIB', jawabanKuis: 'B', kuisBenar: true, nilaiKuis: 100, catatan: 'Durasi: 30 Menit. Olahraga: Senam ceria / peregangan otot, Jalan sehat pagi bersama keluarga.' },
      4: { selesai: true, jam: '06:35 WIB', jawabanKuis: 'B', kuisBenar: true, nilaiKuis: 100, catatan: 'Belum Belajar: [IPA Tata Surya] (30 Menit). Aktivitas: Membaca buku literasi, Mengerjakan tugas & PR sekolah.' },
      5: { selesai: true, jam: '16:00 WIB', jawabanKuis: 'B', kuisBenar: true, nilaiKuis: 100, catatan: 'Waktu: Sarapan Pagi. Menu & kebiasaan sehat: Makan sayur-sayuran hijau, Makan buah segar, Minum air putih 8 gelas.' },
      6: { selesai: true, jam: '17:20 WIB', jawabanKuis: 'B', kuisBenar: true, nilaiKuis: 100, catatan: 'Bantuan di rumah: Menyapu & mengepel lantai rumah, Mencuci piring & gelas sehabis makan.' },
      7: { selesai: false, jam: '-', jawabanKuis: '-', kuisBenar: false, nilaiKuis: 0, catatan: 'Belum mengisi jurnal tidur malam.' }
    }
  },
  {
    id: 2,
    nisn: '0012345679',
    nama: 'Annisa Zahra Kirana',
    panggilan: 'Zahra',
    username: 'zahra',
    password: 'password123',
    kelas: 'Kelas 5A',
    gender: 'P',
    completedCount: 7,
    percentage: 100,
    habits: { h1: true, h2: true, h3: true, h4: true, h5: true, h6: true, h7: true },
    statusVerif: 'Disetujui',
    detailMisi: {
      1: { selesai: true, jam: '05:00 WIB', jawabanKuis: 'B', kuisBenar: true, nilaiKuis: 100, catatan: 'Bangun pukul 05:00 WIB. Kegiatan: Merapikan tempat tidur, Membuka jendela kamar.', fotoBukti: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80' },
      2: { selesai: true, jam: '05:25 WIB', jawabanKuis: 'B', kuisBenar: true, nilaiKuis: 100, catatan: 'Sholat: Subuh (04:45 WIB), Dzuhur (12:15 WIB), Ashar (15:30 WIB). Ibadah: Tadarus Al-Qur\'an.' },
      3: { selesai: true, jam: '06:00 WIB', jawabanKuis: 'B', kuisBenar: true, nilaiKuis: 100, catatan: 'Durasi: 30 Menit. Olahraga: Senam SKJ ceria bersama adik di teras.' },
      4: { selesai: true, jam: '06:30 WIB', jawabanKuis: 'B', kuisBenar: true, nilaiKuis: 100, catatan: 'Belajar: [Bahasa Indonesia] (30 Menit). Aktivitas: Membaca buku dongeng & kosa kata.' },
      5: { selesai: true, jam: '15:30 WIB', jawabanKuis: 'B', kuisBenar: true, nilaiKuis: 100, catatan: 'Waktu: Sarapan Pagi. Menu sehat: Makan sayur bayam, telur rebus, buah pisang.' },
      6: { selesai: true, jam: '17:00 WIB', jawabanKuis: 'B', kuisBenar: true, nilaiKuis: 100, catatan: 'Bantuan di rumah: Mencuci piring & gelas sehabis makan, Menyiram tanaman.' },
      7: { selesai: true, jam: '20:45 WIB', jawabanKuis: 'B', kuisBenar: true, nilaiKuis: 100, catatan: 'Target tidur pukul 20:45 WIB. Persiapan: Menggosok gigi, Mematikan HP, Berdoa.' }
    }
  },
  {
    id: 3,
    nisn: '0012345680',
    nama: 'Bima Sakti Wicaksono',
    panggilan: 'Bima',
    username: 'bima',
    password: 'password123',
    kelas: 'Kelas 5A',
    gender: 'L',
    completedCount: 4,
    percentage: 57,
    habits: { h1: true, h2: true, h3: false, h4: true, h5: true, h6: false, h7: false },
    statusVerif: 'Menunggu',
    detailMisi: {
      1: { selesai: true, jam: '05:20 WIB', jawabanKuis: 'B', kuisBenar: true, nilaiKuis: 100, catatan: 'Bangun pagi dan langsung merapikan tempat tidur.' },
      2: { selesai: true, jam: '05:40 WIB', jawabanKuis: 'B', kuisBenar: true, nilaiKuis: 100, catatan: 'Berdoa dan beribadah sebelum berangkat sekolah.' },
      3: { selesai: false, jam: '-', jawabanKuis: '-', kuisBenar: false, nilaiKuis: 0, catatan: 'Hari ini tidak sempat olahraga pagi.' },
      4: { selesai: true, jam: '06:45 WIB', jawabanKuis: 'B', kuisBenar: true, nilaiKuis: 100, catatan: 'Sarapan bersama keluarga dan membaca rangkuman PKn.' },
      5: { selesai: true, jam: '16:30 WIB', jawabanKuis: 'B', kuisBenar: true, nilaiKuis: 100, catatan: 'Makan sayur & buah-buahan segar.' },
      6: { selesai: false, jam: '-', jawabanKuis: '-', kuisBenar: false, nilaiKuis: 0, catatan: 'Belum membantu orang tua hari ini.' },
      7: { selesai: false, jam: '-', jawabanKuis: '-', kuisBenar: false, nilaiKuis: 0, catatan: 'Belum mengisi jam tidur malam.' }
    }
  },
  {
    id: 4,
    nisn: '0012345681',
    nama: 'Cantika Putri Lestari',
    panggilan: 'Cantika',
    username: 'cantika',
    password: 'password123',
    kelas: 'Kelas 5A',
    gender: 'P',
    completedCount: 7,
    percentage: 100,
    habits: { h1: true, h2: true, h3: true, h4: true, h5: true, h6: true, h7: true },
    statusVerif: 'Disetujui',
    detailMisi: {
      1: { selesai: true, jam: '04:55 WIB', jawabanKuis: 'B', kuisBenar: true, nilaiKuis: 100, catatan: 'Bangun jam 04:55, merapikan sprei dan bantal boneka.' },
      2: { selesai: true, jam: '05:15 WIB', jawabanKuis: 'B', kuisBenar: true, nilaiKuis: 100, catatan: 'Ibadah subuh tepat waktu dan hafalan surat pendek.' },
      3: { selesai: true, jam: '06:00 WIB', jawabanKuis: 'B', kuisBenar: true, nilaiKuis: 100, catatan: 'Lompat tali 10 menit di halaman depan.' },
      4: { selesai: true, jam: '06:30 WIB', jawabanKuis: 'B', kuisBenar: true, nilaiKuis: 100, catatan: 'Sarapan oatmeal dan pisang, membaca buku cerita.' },
      5: { selesai: true, jam: '16:15 WIB', jawabanKuis: 'B', kuisBenar: true, nilaiKuis: 100, catatan: 'Membantu ibu menyiapkan bumbu masak di dapur.' },
      6: { selesai: true, jam: '17:30 WIB', jawabanKuis: 'B', kuisBenar: true, nilaiKuis: 100, catatan: 'Merapikan meja makan dan mencuci sendok piring.' },
      7: { selesai: true, jam: '20:50 WIB', jawabanKuis: 'B', kuisBenar: true, nilaiKuis: 100, catatan: 'Tidur cepat pukul 20:50 setelah minum air putih.' }
    }
  },
  {
    id: 5,
    nisn: '0012345682',
    nama: 'Dimas Arya Raditya',
    panggilan: 'Dimas',
    username: 'dimas',
    password: 'password123',
    kelas: 'Kelas 5A',
    gender: 'L',
    completedCount: 5,
    percentage: 71,
    habits: { h1: true, h2: true, h3: true, h4: true, h5: false, h6: true, h7: false },
    statusVerif: 'Menunggu',
    detailMisi: {
      1: { selesai: true, jam: '05:10 WIB', jawabanKuis: 'B', kuisBenar: true, nilaiKuis: 100, catatan: 'Bangun pagi dan membersihkan kamar.' },
      2: { selesai: true, jam: '05:30 WIB', jawabanKuis: 'B', kuisBenar: true, nilaiKuis: 100, catatan: 'Beribadah tepat waktu dan bersiap sekolah.' },
      3: { selesai: true, jam: '06:10 WIB', jawabanKuis: 'B', kuisBenar: true, nilaiKuis: 100, catatan: 'Push-up 10 kali dan peregangan tubuh.' },
      4: { selesai: true, jam: '06:40 WIB', jawabanKuis: 'B', kuisBenar: true, nilaiKuis: 100, catatan: 'Makan roti telur dan susu cokelat, belajar matematika.' },
      5: { selesai: false, jam: '-', jawabanKuis: '-', kuisBenar: false, nilaiKuis: 0, catatan: 'Belum mengisi kegiatan makan sehat.' },
      6: { selesai: true, jam: '17:00 WIB', jawabanKuis: 'B', kuisBenar: true, nilaiKuis: 100, catatan: 'Menyapu halaman rumah dan membuang sampah.' },
      7: { selesai: false, jam: '-', jawabanKuis: '-', kuisBenar: false, nilaiKuis: 0, catatan: 'Belum tidur saat jurnal dibuat.' }
    }
  },
  {
    id: 6,
    nisn: '0012345683',
    nama: 'Evelyn Nathania',
    panggilan: 'Evelyn',
    username: 'evelyn',
    password: 'password123',
    kelas: 'Kelas 5A',
    gender: 'P',
    completedCount: 6,
    percentage: 86,
    habits: { h1: true, h2: true, h3: true, h4: true, h5: true, h6: false, h7: true },
    statusVerif: 'Disetujui',
    detailMisi: {
      1: { selesai: true, jam: '05:05 WIB', jawabanKuis: 'B', kuisBenar: true, nilaiKuis: 100, catatan: 'Bangun tidur dan langsung menata sprei ranjang.' },
      2: { selesai: true, jam: '05:20 WIB', jawabanKuis: 'B', kuisBenar: true, nilaiKuis: 100, catatan: 'Berdoa pagi dan membaca kitab suci bersama keluarga.' },
      3: { selesai: true, jam: '06:00 WIB', jawabanKuis: 'B', kuisBenar: true, nilaiKuis: 100, catatan: 'Jalan santai mengelilingi komplek 15 menit.' },
      4: { selesai: true, jam: '06:30 WIB', jawabanKuis: 'B', kuisBenar: true, nilaiKuis: 100, catatan: 'Sarapan salad buah dan telur rebus, belajar bahasa inggris.' },
      5: { selesai: true, jam: '16:00 WIB', jawabanKuis: 'B', kuisBenar: true, nilaiKuis: 100, catatan: 'Membantu melipat pakaian yang sudah kering.' },
      6: { selesai: false, jam: '-', jawabanKuis: '-', kuisBenar: false, nilaiKuis: 0, catatan: 'Belum mencatat bantuan hari ini.' },
      7: { selesai: true, jam: '20:55 WIB', jawabanKuis: 'B', kuisBenar: true, nilaiKuis: 100, catatan: 'Tidur cepat pukul 20:55.' }
    }
  }
];

export default function DashboardGuru({
  currentUser,
  materiKuisMap = {},
  onUpdateMateriKuis,
  onLogout,
  showToast
}) {
  // Navigation State
  const [activeMenu, setActiveMenu] = useState('dashboard'); // 'dashboard' | 'materi' | 'quis' | 'siswa' | 'rekap' | 'pengumuman' | 'pengaturan'
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Class & Date State
  const [selectedKelas, setSelectedKelas] = useState(currentUser?.kelas || 'Kelas 5A');
  const [selectedTanggal, setSelectedTanggal] = useState(new Date().toISOString().split('T')[0]);

  // Materi & Kuis Editor State
  const [activeHabitTab, setActiveHabitTab] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingMk, setEditingMk] = useState(materiKuisMap[1] || {});
  const [isSavingMk, setIsSavingMk] = useState(false);

  // Student Detail Modal State (Rekap Siswa)
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentDetailModal, setShowStudentDetailModal] = useState(false);
  const [detailFilter, setDetailFilter] = useState('all'); // 'all' | 'done' | 'pending'

  // Student Management & Excel Import States
  const [showImportModal, setShowImportModal] = useState(false);
  const [importParsedStudents, setImportParsedStudents] = useState([]);
  const [isImporting, setIsImporting] = useState(false);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [isEditingStudent, setIsEditingStudent] = useState(false);
  const [studentFormData, setStudentFormData] = useState({
    id: '',
    nama: '',
    nisn: '',
    username: '',
    password: '',
    kelas: selectedKelas,
    gender: 'L',
    panggilan: ''
  });
  const [showPasswordMap, setShowPasswordMap] = useState({});
  const [studentSearchQuery, setStudentSearchQuery] = useState('');
  const [lightboxImage, setLightboxImage] = useState({ open: false, url: '', title: '', subtitle: '', mission: '' });

  // Student Monitoring Data with Rich Mission & Quiz Details (Persisted in localStorage)
  const [hasInitialLoaded, setHasInitialLoaded] = useState(false);
  const [monitoringData, setMonitoringData] = useState(() => {
    try {
      const cached = localStorage.getItem('GURU_MONITORING_DATA_CACHE');
      if (cached !== null) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading cached student data:', e);
    }
    // Jika ada koneksi backend Google Apps Script, jangan fallback ke dummy data INITIAL_STUDENTS
    // agar data yang sudah dihapus tidak muncul kembali di perangkat baru
    return getGasApiUrl() ? [] : INITIAL_STUDENTS;
  });

  // Sync monitoringData to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem('GURU_MONITORING_DATA_CACHE', JSON.stringify(monitoringData));
    } catch (e) {
      console.warn('Error saving student cache:', e);
    }
  }, [monitoringData]);

  const [isSyncing, setIsSyncing] = useState(false);

  // Fetch real-time monitoring and student list from Google Sheets database
  const fetchStudentsAndMonitoring = async (showToastNotice = false) => {
    setIsSyncing(true);
    try {
      const res = await callApi('getMonitoringKelas', {
        kelas: selectedKelas,
        tanggal: selectedTanggal
      });
      if (res && Array.isArray(res.rows)) {
        setMonitoringData(res.rows);
        try {
          localStorage.setItem('GURU_MONITORING_DATA_CACHE', JSON.stringify(res.rows));
        } catch (e) {}
        if (showToastNotice) {
          showToast(`Data realtime berhasil disinkronkan (${res.rows.length} siswa)!`, 'success');
        }
      }
    } catch (err) {
      console.warn('Gagal memuat monitoring realtime:', err);
    } finally {
      setIsSyncing(false);
      setHasInitialLoaded(true);
    }
  };

  // Run on mount and whenever class or date changes
  useEffect(() => {
    fetchStudentsAndMonitoring();
  }, [selectedKelas, selectedTanggal]);

  // Announcements List
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      type: 'ujian',
      title: 'Jadwal Ujian Harian',
      desc: 'Pelaksanaan Penilaian Harian Bab 3 dimulai Senin depan.',
      date: '21 Okt 2025',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300'
    },
    {
      id: 2,
      type: 'tugas',
      title: 'Pengumpulan Tugas Portofolio',
      desc: 'Batas akhir pengumpulan proyek sains dan dokumentasi kebiasaan esok 17:00.',
      date: '20 Okt 2025',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-300'
    },
    {
      id: 3,
      type: 'sekolah',
      title: 'Kegiatan Pembiasaan Sekolah',
      desc: 'Senam bersama & gerakan literasi 7 kebiasaan hebat di lapangan serbaguna.',
      date: '19 Okt 2025',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300'
    }
  ]);

  // Handle Edit Materi & Kuis
  const handleOpenEdit = (hid) => {
    const id = hid || 1;
    setActiveHabitTab(id);
    const existing = materiKuisMap[id] || {};
    setEditingMk({
      judulMateri: existing.judulMateri || `Materi Kebiasaan ${id}: ${HABIT_TITLES[id - 1] || ''}`,
      deskripsiMateri: existing.deskripsiMateri || 'Simak video edukasi berikut dan pahami maknanya dalam kehidupan sehari-hari.',
      linkYoutube: existing.linkYoutube || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      pertanyaan: existing.pertanyaan || 'Apa manfaat utama dari menerapkan kebiasaan hebat ini setiap hari?',
      opsiA: existing.opsiA || 'Membentuk kedisiplinan dan karakter diri yang unggul',
      opsiB: existing.opsiB || 'Hanya untuk mendapatkan nilai bagus di sekolah',
      opsiC: existing.opsiC || 'Mengisi waktu kosong saat tidak ada hiburan',
      opsiD: existing.opsiD || 'Supaya tidak ditegur oleh orang tua dan guru',
      kunciJawaban: existing.kunciJawaban || 'A',
      penjelasan: existing.penjelasan || 'Kebiasaan positif yang konsisten membentuk disiplin dan karakter unggul anak hebat.'
    });
    setShowEditModal(true);
  };

  const handleSaveMateriKuis = async (e) => {
    e.preventDefault();
    setIsSavingMk(true);
    try {
      await callApi('simpanMateriKuis', { habitId: activeHabitTab, payload: editingMk });
      if (onUpdateMateriKuis) {
        onUpdateMateriKuis(activeHabitTab, editingMk);
      }
      showToast(`Materi & Kuis Misi ${activeHabitTab} berhasil diperbarui & terhubung ke Siswa!`, 'success');
      setShowEditModal(false);
    } catch (err) {
      if (onUpdateMateriKuis) {
        onUpdateMateriKuis(activeHabitTab, editingMk);
      }
      showToast(`Tersimpan lokal: Materi Misi ${activeHabitTab} terupdate untuk siswa!`, 'success');
      setShowEditModal(false);
    }
    setIsSavingMk(false);
  };

  // Quick Verification handler
  const handleVerifyStudent = (id, newStatus) => {
    setMonitoringData(prev =>
      prev.map(s => s.id === id ? { ...s, statusVerif: newStatus } : s)
    );
    if (selectedStudent && selectedStudent.id === id) {
      setSelectedStudent(prev => ({ ...prev, statusVerif: newStatus }));
    }
    showToast(`Status jurnal siswa telah diubah menjadi: ${newStatus}`, 'info');
  };

  // Open Student Detail Modal
  const handleOpenStudentDetail = (student) => {
    setSelectedStudent(student);
    setDetailFilter('all');
    setShowStudentDetailModal(true);
  };

  // Open Lightbox Photo Modal
  const handleOpenPhotoLightbox = (url, title, subtitle, mission) => {
    if (!url) return;
    setLightboxImage({
      open: true,
      url,
      title: title || 'Bukti Foto Kegiatan Siswa',
      subtitle: subtitle || `${selectedStudent?.nama || 'Siswa'} • ${selectedKelas}`,
      mission: mission || ''
    });
  };

  // 1. Download Template Excel (.xlsx / .csv)
  const handleDownloadTemplateExcel = () => {
    if (typeof window !== 'undefined' && window.XLSX) {
      try {
        const wsData = [
          ['Nama Lengkap', 'NISN', 'Username', 'Password', 'Kelas', 'Jenis Kelamin (L/P)', 'Panggilan'],
          ['Ahmad Farhan Pratama', '0012345678', 'farhan', '123456', selectedKelas || 'Kelas 5A', 'L', 'Farhan'],
          ['Annisa Zahra Kirana', '0012345679', 'zahra', '123456', selectedKelas || 'Kelas 5A', 'P', 'Zahra'],
          ['Bima Sakti Wicaksono', '0012345680', 'bima', '123456', selectedKelas || 'Kelas 5A', 'L', 'Bima'],
          ['Cantika Putri Lestari', '0012345681', 'cantika', '123456', selectedKelas || 'Kelas 5A', 'P', 'Cantika'],
          ['Dimas Arya Raditya', '0012345682', 'dimas', '123456', selectedKelas || 'Kelas 5A', 'L', 'Dimas']
        ];
        const ws = window.XLSX.utils.aoa_to_sheet(wsData);
        ws['!cols'] = [
          { wch: 25 },
          { wch: 15 },
          { wch: 15 },
          { wch: 15 },
          { wch: 12 },
          { wch: 20 },
          { wch: 15 }
        ];
        const wb = window.XLSX.utils.book_new();
        window.XLSX.utils.book_append_sheet(wb, ws, 'Template Siswa');
        window.XLSX.writeFile(wb, 'Template_Impor_Siswa_7Kebiasaan.xlsx');
        showToast('Template Excel (.xlsx) berhasil diunduh! 📥', 'success');
        return;
      } catch (e) {
        console.warn('XLSX export fallback to CSV:', e);
      }
    }

    // Fallback CSV (UTF-8 BOM untuk Excel)
    const csvContent = '\uFEFF' + [
      'Nama Lengkap,NISN,Username,Password,Kelas,Jenis Kelamin (L/P),Panggilan',
      `Ahmad Farhan Pratama,0012345678,farhan,123456,${selectedKelas || 'Kelas 5A'},L,Farhan`,
      `Annisa Zahra Kirana,0012345679,zahra,123456,${selectedKelas || 'Kelas 5A'},P,Zahra`,
      `Bima Sakti Wicaksono,0012345680,bima,123456,${selectedKelas || 'Kelas 5A'},L,Bima`,
      `Cantika Putri Lestari,0012345681,cantika,123456,${selectedKelas || 'Kelas 5A'},P,Cantika`,
      `Dimas Arya Raditya,0012345682,dimas,123456,${selectedKelas || 'Kelas 5A'},L,Dimas`
    ].join('\r\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'Template_Impor_Siswa_7Kebiasaan.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Template CSV (Excel) berhasil diunduh! 📥', 'success');
  };

  // Helper pembersih data baris dari Excel/CSV
  const normalizeParsedRows = (rawRows) => {
    return rawRows.map((row, idx) => {
      const keys = Object.keys(row);
      const findVal = (...targets) => {
        for (const t of targets) {
          const k = keys.find(key => key.toLowerCase().replace(/[^a-z0-9]/g, '').includes(t));
          if (k && row[k] !== undefined && row[k] !== '') return String(row[k]).trim();
        }
        return '';
      };

      const nama = findVal('nama', 'name') || `Siswa ${idx + 1}`;
      const nisn = findVal('nisn', 'nomorinduk', 'nis') || `0012345${100 + idx}`;
      const username = findVal('username', 'user', 'akun') || nisn;
      const password = findVal('password', 'sandi', 'pass') || '123456';
      const kelas = findVal('kelas', 'class') || selectedKelas;
      let gender = findVal('gender', 'jeniskelamin', 'jk', 'lp').toUpperCase();
      if (!['L', 'P'].includes(gender)) gender = 'L';
      const panggilan = findVal('panggilan', 'nick') || nama.split(' ')[0];

      return {
        id: `S-${Date.now()}-${idx}`,
        nisn,
        nama,
        username,
        password,
        kelas,
        gender,
        panggilan
      };
    }).filter(s => s.nama.trim() !== '' && s.nisn.trim() !== '');
  };

  // 2. Upload Handler (.xlsx, .xls, .csv)
  const handleFileUploadExcel = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    if (typeof window !== 'undefined' && window.XLSX && !file.name.endsWith('.csv')) {
      reader.onload = (evt) => {
        try {
          const data = evt.target.result;
          const workbook = window.XLSX.read(data, { type: 'binary' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonRows = window.XLSX.utils.sheet_to_json(worksheet, { defval: '' });

          const parsed = normalizeParsedRows(jsonRows);
          if (parsed.length === 0) {
            showToast('File Excel tidak berisi data siswa yang valid.', 'error');
            return;
          }
          setImportParsedStudents(parsed);
          setShowImportModal(true);
          showToast(`${parsed.length} data siswa berhasil dibaca dari Excel!`, 'success');
        } catch (err) {
          console.error(err);
          showToast('Gagal membaca file Excel: ' + err.message, 'error');
        }
      };
      reader.readAsBinaryString(file);
    } else {
      // CSV Reader fallback
      reader.onload = (evt) => {
        try {
          const text = evt.target.result;
          const lines = text.split(/\r?\n/).filter(line => line.trim() !== '');
          if (lines.length < 2) {
            showToast('File CSV tidak memiliki data.', 'error');
            return;
          }
          const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/[^a-z0-9]/g, ''));
          const jsonRows = [];
          for (let i = 1; i < lines.length; i++) {
            const cells = lines[i].split(',').map(c => c.trim().replace(/^["']|["']$/g, ''));
            const rowObj = {};
            headers.forEach((h, idx) => {
              rowObj[h] = cells[idx] || '';
            });
            jsonRows.push(rowObj);
          }
          const parsed = normalizeParsedRows(jsonRows);
          if (parsed.length === 0) {
            showToast('Data siswa tidak ditemukan di file CSV.', 'error');
            return;
          }
          setImportParsedStudents(parsed);
          setShowImportModal(true);
          showToast(`${parsed.length} data siswa terbaca dari CSV!`, 'success');
        } catch (err) {
          console.error(err);
          showToast('Gagal memproses file: ' + err.message, 'error');
        }
      };
      reader.readAsText(file);
    }

    e.target.value = '';
  };

  // 3. Konfirmasi Impor Siswa Massal ke Database
  const handleConfirmImport = async () => {
    if (importParsedStudents.length === 0) return;
    setIsImporting(true);

    try {
      await callApi('batchSimpanSiswa', { siswaList: importParsedStudents });

      setMonitoringData(prev => {
        const updated = [...prev];
        importParsedStudents.forEach(item => {
          const existingIdx = updated.findIndex(s => s.nisn === item.nisn);
          const studentObj = {
            id: item.id || Date.now(),
            nisn: item.nisn,
            nama: item.nama,
            panggilan: item.panggilan || item.nama.split(' ')[0],
            username: item.username || item.nisn,
            password: item.password || '123456',
            kelas: item.kelas || selectedKelas,
            gender: item.gender || 'L',
            completedCount: 0,
            percentage: 0,
            habits: { h1: false, h2: false, h3: false, h4: false, h5: false, h6: false, h7: false },
            statusVerif: 'Menunggu',
            detailMisi: {}
          };
          if (existingIdx >= 0) {
            updated[existingIdx] = { ...updated[existingIdx], ...studentObj };
          } else {
            updated.push(studentObj);
          }
        });
        return updated;
      });

      showToast(`Berhasil mengimpor ${importParsedStudents.length} siswa ke database! 🎉`, 'success');
      setShowImportModal(false);
      setImportParsedStudents([]);
      // Sinkronkan ulang dengan database Google Sheets
      fetchStudentsAndMonitoring();
    } catch (e) {
      console.warn(e);
      showToast('Gagal menyimpan impor: ' + e.message, 'error');
    }
    setIsImporting(false);
  };

  // 4. Modal Tambah / Edit Siswa Manual
  const handleOpenAddModal = () => {
    setIsEditingStudent(false);
    setStudentFormData({
      id: '',
      nama: '',
      nisn: '',
      username: '',
      password: 'password123',
      kelas: selectedKelas,
      gender: 'L',
      panggilan: ''
    });
    setShowAddEditModal(true);
  };

  const handleOpenEditModal = (student) => {
    setIsEditingStudent(true);
    setStudentFormData({
      id: student.id,
      nama: student.nama,
      nisn: student.nisn,
      username: student.username || student.nisn,
      password: student.password || 'password123',
      kelas: student.kelas || selectedKelas,
      gender: student.gender || 'L',
      panggilan: student.panggilan || student.nama.split(' ')[0]
    });
    setShowAddEditModal(true);
  };

  const handleSaveStudentForm = async () => {
    if (!studentFormData.nama.trim() || !studentFormData.nisn.trim()) {
      showToast('Nama Lengkap dan NISN wajib diisi!', 'error');
      return;
    }

    const payload = {
      ...studentFormData,
      id: studentFormData.id || `S-${Date.now()}`,
      username: studentFormData.username.trim() || studentFormData.nisn.trim(),
      password: studentFormData.password.trim() || 'password123'
    };

    try {
      await callApi('simpanSiswa', { payload });
      setMonitoringData(prev => {
        let updated;
        if (isEditingStudent) {
          updated = prev.map(s => s.id === payload.id || s.nisn === payload.nisn ? { ...s, ...payload } : s);
        } else {
          updated = [
            ...prev,
            {
              ...payload,
              completedCount: 0,
              percentage: 0,
              habits: { h1: false, h2: false, h3: false, h4: false, h5: false, h6: false, h7: false },
              statusVerif: 'Menunggu',
              detailMisi: {}
            }
          ];
        }
        try {
          localStorage.setItem('GURU_MONITORING_DATA_CACHE', JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
      showToast(`Data siswa ${payload.nama} berhasil disimpan!`, 'success');
      setShowAddEditModal(false);
      // Sinkronkan ulang dengan database Google Sheets
      fetchStudentsAndMonitoring();
    } catch (e) {
      console.warn(e);
      showToast('Gagal menyimpan siswa: ' + e.message, 'error');
    }
  };

  const handleDeleteStudent = async (studentOrId, maybeNama) => {
    let studentId, studentNisn, studentNama;
    if (typeof studentOrId === 'object' && studentOrId !== null) {
      studentId = studentOrId.id;
      studentNisn = studentOrId.nisn;
      studentNama = studentOrId.nama || 'Siswa';
    } else {
      studentId = studentOrId;
      studentNama = maybeNama || 'Siswa';
      const found = monitoringData.find(s => s.id === studentId || s.nisn === studentId);
      studentNisn = found?.nisn || studentId;
    }

    if (!window.confirm(`Yakin ingin menghapus siswa "${studentNama}" dari database? Data akan terhapus permanen di SEMUA perangkat.`)) return;

    // 1. Optimistic removal di UI & LocalStorage saat ini
    setMonitoringData(prev => {
      const updated = prev.filter(s => s.id !== studentId && s.nisn !== studentNisn);
      try {
        localStorage.setItem('GURU_MONITORING_DATA_CACHE', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    // 2. Kirim perintah hapus ke database Google Spreadsheet
    try {
      await callApi('hapusSiswa', { idOrNisn: studentNisn || studentId });
      showToast(`Siswa "${studentNama}" berhasil dihapus permanen dari database Google!`, 'success');
    } catch (e) {
      console.warn(e);
      showToast('Gagal menghapus siswa dari database: ' + e.message, 'error');
    } finally {
      // 3. Re-fetch agar data di memori 100% identik dengan database Google
      fetchStudentsAndMonitoring();
    }
  };

  const togglePasswordVisibility = (nisn) => {
    setShowPasswordMap(prev => ({
      ...prev,
      [nisn]: !prev[nisn]
    }));
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB] text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* 1. TOP NAVBAR HEADER */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 py-3 shadow-xs">
        <div className="flex items-center justify-between gap-4">
          {/* Left Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="lg:hidden w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition active:scale-95"
              title="Menu Navigasi"
            >
              <i className="fa-solid fa-bars text-lg"></i>
            </button>

            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center shadow-md shadow-blue-500/20 text-lg font-black">
                <i className="fa-solid fa-graduation-cap"></i>
              </div>
              <div className="leading-tight">
                <div className="text-sm font-black tracking-tight text-slate-900 flex items-center gap-1.5">
                  <span>LMS EDU CERIA</span>
                  <span className="text-[10px] bg-blue-100 text-blue-700 font-extrabold px-1.5 py-0.5 rounded-md uppercase">PRO</span>
                </div>
                <p className="text-[11px] font-semibold text-slate-500">Portal Guru & Wali Kelas</p>
              </div>
            </div>
          </div>

          {/* Center Search Input */}
          <div className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
              <input
                type="text"
                placeholder="Cari materi, kelas, siswa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-100/90 hover:bg-slate-100 focus:bg-white text-xs font-medium text-slate-800 rounded-full border border-transparent focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-hidden transition"
              />
            </div>
          </div>

          {/* Right Profile Pill & Notifications */}
          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <div className="relative">
              <button className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200/80 text-slate-600 flex items-center justify-center transition active:scale-95">
                <i className="fa-regular fa-bell text-sm"></i>
              </button>
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center shadow-xs animate-pulse">
                8
              </span>
            </div>

            {/* Profile Pill */}
            <div className="flex items-center gap-2.5 pl-2 py-1 pr-3 bg-slate-50 hover:bg-slate-100 rounded-full border border-slate-200/80 transition cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Teacher Avatar"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-blue-500"
              />
              <div className="hidden sm:block text-left leading-tight pr-1">
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1">
                  <span>{currentUser?.nama || 'Budi Santoso, S.Pd'}</span>
                </div>
                <div className="text-[10px] font-semibold text-slate-500">Guru • {selectedKelas}</div>
              </div>
              <i className="fa-solid fa-chevron-down text-[10px] text-slate-400 hidden sm:block"></i>
            </div>
          </div>
        </div>
      </header>

      {/* 2. BODY LAYOUT (SIDEBAR + MAIN + RIGHT WIDGETS) */}
      <div className="flex-1 flex overflow-hidden">
        {/* MOBILE SIDEBAR BACKDROP */}
        {mobileSidebarOpen && (
          <div
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden"
          />
        )}

        {/* LEFT NAVIGATION SIDEBAR (DARK NAVY THEME) */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0F172A] text-slate-200 flex flex-col justify-between p-4 transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
            mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="space-y-6">
            {/* Teacher Profile Widget in Sidebar */}
            <div className="p-3 bg-slate-800/80 rounded-2xl border border-slate-700/60 flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Teacher"
                  className="w-11 h-11 rounded-xl object-cover border border-blue-400"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#0F172A]"></span>
              </div>
              <div className="overflow-hidden leading-tight">
                <h4 className="text-xs font-black text-white truncate">{currentUser?.nama || 'Budi Santoso, S.Pd'}</h4>
                <p className="text-[11px] font-medium text-slate-400">Guru Kelas 5A</p>
                <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-[9px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Online Active
                </span>
              </div>
            </div>

            {/* Menu Items */}
            <nav className="space-y-1.5">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: 'fa-solid fa-house' },
                { id: 'materi', label: 'Materi', icon: 'fa-solid fa-book-open' },
                { id: 'quis', label: 'Quis', icon: 'fa-solid fa-clipboard-question' },
                { id: 'siswa', label: 'Kelola Siswa', icon: 'fa-solid fa-users' },
                { id: 'rekap', label: 'Rekap Siswa', icon: 'fa-solid fa-square-poll-vertical' },
                { id: 'pengumuman', label: 'Pengumuman', icon: 'fa-solid fa-bullhorn' },
                { id: 'pengaturan', label: 'Pengaturan', icon: 'fa-solid fa-gear' }
              ].map((menu) => {
                const isActive = activeMenu === menu.id;
                return (
                  <button
                    key={menu.id}
                    onClick={() => {
                      setActiveMenu(menu.id);
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30 translate-x-1'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <i className={`${menu.icon} text-sm ${isActive ? 'text-white' : 'text-slate-400'}`}></i>
                    <span>{menu.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Mascot Card & Logout */}
          <div className="space-y-3 pt-4">
            <div className="p-3.5 rounded-2xl bg-gradient-to-b from-blue-950/40 to-indigo-950/60 border border-blue-500/30 text-center relative overflow-hidden group">
              <div className="w-14 h-14 mx-auto mb-2 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition duration-300">
                <i className="fa-solid fa-person-chalkboard"></i>
              </div>
              <h5 className="text-[11px] font-black text-white leading-tight">Guru Hebat Membentuk Generasi Hebat</h5>
              <p className="text-[9px] text-blue-200/80 mt-1">LMS Edu Ceria Pembiasaan Karakter Unggul</p>
            </div>

            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-rose-300 hover:text-white bg-rose-500/10 hover:bg-rose-600 border border-rose-500/20 transition active:scale-95"
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              <span>Keluar Akun</span>
            </button>
          </div>
        </aside>

        {/* CENTER MAIN COLUMN */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7 space-y-6">
          {/* ============================================================== */}
          {/* VIEW: DASHBOARD (EXACT REFERENCE SCREENSHOT) */}
          {/* ============================================================== */}
          {activeMenu === 'dashboard' && (
            <>
              {/* HERO WELCOME BANNER */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-sky-600 to-indigo-700 p-6 sm:p-8 text-white shadow-xl shadow-blue-500/10">
                <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-sky-400/20 rounded-full blur-xl pointer-events-none"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="max-w-xl space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-black uppercase tracking-wider text-sky-100">
                      <span>👑</span>
                      <span>Selamat Datang, {currentUser?.nama?.split(' ')[0] || 'Pak Budi'}</span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
                      Jadikan setiap pembelajaran bermakna dan menyenangkan!
                    </h1>

                    <p className="text-xs sm:text-sm text-sky-100 font-medium leading-relaxed">
                      LMS EDU CERIA siap membantu Anda dalam mengelola kelas, mengunggah materi YouTube, dan memantau pembiasaan karakter 7 kebiasaan siswa.
                    </p>

                    <div className="pt-2">
                      <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-white/95 shadow-xs">
                        <i className="fa-solid fa-quote-left text-sky-300 text-xs"></i>
                        <span>"Pendidikan adalah kunci untuk membuka pintu masa depan."</span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center justify-center">
                    <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-3xl bg-white/10 backdrop-blur-md p-3 border border-white/20 flex flex-col items-center justify-center text-center shadow-lg transform rotate-1 hover:rotate-0 transition duration-300">
                      <div className="w-20 h-20 rounded-2xl bg-white text-blue-600 flex items-center justify-center text-4xl shadow-md mb-2">
                        👨‍🏫
                      </div>
                      <div className="text-xs font-black text-white">Wali Kelas 5A</div>
                      <div className="text-[10px] text-sky-200">Tahun Ajaran 2026/2027</div>
                      <button
                        onClick={() => handleOpenEdit(1)}
                        className="mt-2.5 px-3 py-1 rounded-xl bg-white text-blue-700 text-[10px] font-black shadow-sm hover:bg-sky-50 transition active:scale-95"
                      >
                        + Update Materi
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 STAT SUMMARY CARDS */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Total Siswa</span>
                    <div className="w-9 h-9 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold">
                      <i className="fa-solid fa-users"></i>
                    </div>
                  </div>
                  <div className="mt-2 text-2xl sm:text-3xl font-black text-slate-900">32</div>
                  <p className="mt-1 text-[11px] font-medium text-slate-500">Siswa aktif dalam kelas</p>
                </div>

                <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Materi</span>
                    <div className="w-9 h-9 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-sm font-bold">
                      <i className="fa-solid fa-book-open"></i>
                    </div>
                  </div>
                  <div className="mt-2 text-2xl sm:text-3xl font-black text-slate-900">12</div>
                  <p className="mt-1 text-[11px] font-medium text-slate-500">Materi telah dipublikasikan</p>
                </div>

                <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Tugas</span>
                    <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-sm font-bold">
                      <i className="fa-solid fa-clipboard-check"></i>
                    </div>
                  </div>
                  <div className="mt-2 text-2xl sm:text-3xl font-black text-slate-900">8</div>
                  <p className="mt-1 text-[11px] font-medium text-slate-500">Tugas aktif & menunggu</p>
                </div>

                <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Penilaian</span>
                    <div className="w-9 h-9 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-sm font-bold">
                      <i className="fa-solid fa-star"></i>
                    </div>
                  </div>
                  <div className="mt-2 text-2xl sm:text-3xl font-black text-slate-900">5</div>
                  <p className="mt-1 text-[11px] font-medium text-slate-500">Penilaian minggu ini</p>
                </div>
              </div>

              {/* AKTIVITAS KELAS 5A CHART CARD */}
              <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-black text-slate-900">Aktivitas Kelas 5A</h3>
                    <p className="text-xs text-slate-500 font-medium">Ringkasan aktivitas pembelajaran minggu ini</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200/80 rounded-xl text-xs font-bold text-slate-700 border-none outline-hidden cursor-pointer">
                      <option>7 Hari Terakhir</option>
                      <option>Bulan Ini</option>
                      <option>Semester Ini</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-bold pt-1">
                  <span className="inline-flex items-center gap-1.5 text-blue-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Materi
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-amber-500">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Tugas
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-emerald-500">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Kuis
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-purple-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Siswa Aktif
                  </span>
                </div>

                <div className="relative w-full h-56 pt-2">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 700 200" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="blueGlow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {[0, 50, 100, 150].map((y, idx) => (
                      <line
                        key={idx}
                        x1="0"
                        y1={y}
                        x2="700"
                        y2={y}
                        stroke="#f1f5f9"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                      />
                    ))}

                    <polygon
                      points="0,200 0,140 116,110 233,130 350,90 466,60 583,80 700,40 700,200"
                      fill="url(#blueGlow)"
                    />

                    <polyline
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points="0,140 116,110 233,130 350,90 466,60 583,80 700,40"
                    />

                    <polyline
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points="0,170 116,150 233,140 350,110 466,95 583,120 700,75"
                    />

                    <polyline
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points="0,160 116,145 233,105 350,130 466,70 583,60 700,50"
                    />

                    <polyline
                      fill="none"
                      stroke="#a855f7"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points="0,180 116,160 233,120 350,100 466,50 583,40 700,30"
                    />

                    <circle cx="700" cy="40" r="5" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
                    <circle cx="700" cy="75" r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
                    <circle cx="700" cy="50" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                    <circle cx="700" cy="30" r="5" fill="#a855f7" stroke="#ffffff" strokeWidth="2" />
                  </svg>

                  <div className="flex justify-between text-[11px] font-bold text-slate-400 mt-2 px-1">
                    <span>15 Okt</span>
                    <span>16 Okt</span>
                    <span>17 Okt</span>
                    <span>18 Okt</span>
                    <span>19 Okt</span>
                    <span>20 Okt</span>
                    <span>21 Okt</span>
                  </div>
                </div>
              </div>

              {/* DUAL BOTTOM GRID: MATERI TERBARU & TUGAS TERBARU */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* MATERI TERBARU */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-black text-slate-900">Materi Terbaru</h4>
                      <p className="text-[11px] text-slate-500 font-medium">Bahan ajar video & modul terpublikasi</p>
                    </div>
                    <button
                      onClick={() => setActiveMenu('materi')}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition"
                    >
                      Lihat Semua <i className="fa-solid fa-arrow-right text-[10px]"></i>
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/60 flex items-center justify-between gap-3 transition">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-lg shrink-0">
                          <i className="fa-brands fa-youtube"></i>
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-slate-800 line-clamp-1">
                            {materiKuisMap[1]?.judulMateri || 'Manfaat Energi Matahari (Misi 1)'}
                          </h5>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-red-50 text-red-600">Video YouTube</span>
                            <span className="text-[10px] text-slate-400">20 Okt 2025</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleOpenEdit(1)}
                        className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-blue-600 text-xs font-bold shadow-2xs"
                      >
                        Edit
                      </button>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/60 flex items-center justify-between gap-3 transition">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-lg shrink-0">
                          <i className="fa-brands fa-google-drive"></i>
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-slate-800 line-clamp-1">
                            {materiKuisMap[2]?.judulMateri || 'Siklus Air di Alam & Ibadah (Misi 2)'}
                          </h5>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-600">Link Drive</span>
                            <span className="text-[10px] text-slate-400">18 Okt 2025</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleOpenEdit(2)}
                        className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-blue-600 text-xs font-bold shadow-2xs"
                      >
                        Edit
                      </button>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/60 flex items-center justify-between gap-3 transition">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-lg shrink-0">
                          <i className="fa-solid fa-file-pdf"></i>
                        </div>
                        <div>
                          <h5 className="text-xs font-bold text-slate-800 line-clamp-1">
                            {materiKuisMap[3]?.judulMateri || 'Kebugaran & Olahraga Pagi (Misi 3)'}
                          </h5>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 text-purple-600">Dokumen PDF</span>
                            <span className="text-[10px] text-slate-400">16 Okt 2025</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleOpenEdit(3)}
                        className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-blue-600 text-xs font-bold shadow-2xs"
                      >
                        Edit
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => handleOpenEdit(1)}
                    className="w-full py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs transition flex items-center justify-center gap-2"
                  >
                    <i className="fa-solid fa-plus"></i> Tambah Materi Baru
                  </button>
                </div>

                {/* TUGAS TERBARU */}
                <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-black text-slate-900">Tugas Terbaru</h4>
                      <p className="text-[11px] text-slate-500 font-medium">Batas pengumpulan & progres siswa</p>
                    </div>
                    <button
                      onClick={() => setActiveMenu('quis')}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition"
                    >
                      Lihat Semua <i className="fa-solid fa-arrow-right text-[10px]"></i>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {[
                      { title: 'Menulis Cerita Pendek', mapel: 'Bahasa Indonesia • Kelas 5A', badge: '2 hari lagi', badgeStyle: 'bg-rose-50 text-rose-600 border-rose-200' },
                      { title: 'Operasi Hitung Pecahan', mapel: 'Matematika • Kelas 5A', badge: '3 hari lagi', badgeStyle: 'bg-amber-50 text-amber-600 border-amber-200' },
                      { title: 'Proyek Ekosistem & Lingkungan', mapel: 'IPA • Kelas 5A', badge: '5 hari lagi', badgeStyle: 'bg-blue-50 text-blue-600 border-blue-200' },
                      { title: 'Gambar Flora Nusantara', mapel: 'Seni Budaya • Kelas 5A', badge: '7 hari lagi', badgeStyle: 'bg-emerald-50 text-emerald-600 border-emerald-200' }
                    ].map((t, idx) => (
                      <div key={idx} className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/60 flex items-center justify-between gap-3 transition">
                        <div>
                          <h5 className="text-xs font-bold text-slate-800 line-clamp-1">{t.title}</h5>
                          <span className="text-[10px] text-slate-500 font-medium">{t.mapel}</span>
                        </div>
                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${t.badgeStyle}`}>
                          {t.badge}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveMenu('quis')}
                    className="w-full py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs transition flex items-center justify-center gap-2"
                  >
                    <i className="fa-solid fa-plus"></i> Buat Kuis / Tugas Baru
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ============================================================== */}
          {/* VIEW: KELOLA MATERI (CONNECTED TO STUDENTS' YOUTUBE & HABITS) */}
          {/* ============================================================== */}
          {activeMenu === 'materi' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Kelola Video Materi YouTube</h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Atur URL YouTube untuk 7 Kebiasaan Anak Hebat. Materi ini akan langsung muncul dan dipelajari oleh Siswa.
                  </p>
                </div>
                <button
                  onClick={() => handleOpenEdit(1)}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 transition active:scale-95 flex items-center gap-2"
                >
                  <i className="fa-solid fa-pen-to-square"></i> Edit Materi Misi
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {[1, 2, 3, 4, 5, 6, 7].map((hid) => {
                  const mk = materiKuisMap[hid] || {};
                  const ytUrl = mk.linkYoutube || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
                  const match = ytUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
                  const videoId = match ? match[1] : '';
                  const thumb = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;

                  return (
                    <div
                      key={hid}
                      className="rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition overflow-hidden flex flex-col justify-between"
                    >
                      <div className="relative aspect-video bg-slate-900 group">
                        {thumb ? (
                          <img src={thumb} alt={mk.judulMateri} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-500 text-3xl">
                            <i className="fa-brands fa-youtube"></i>
                          </div>
                        )}
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-black bg-blue-600 text-white shadow-md">
                          Misi {hid}
                        </span>
                        <a
                          href={ytUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition"
                        >
                          <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center text-xl shadow-lg">
                            <i className="fa-solid fa-play ml-1"></i>
                          </div>
                        </a>
                      </div>

                      <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-black text-slate-800 line-clamp-2">
                            {mk.judulMateri || `Materi Kebiasaan ${hid}: ${HABIT_TITLES[hid - 1]}`}
                          </h4>
                          <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                            {mk.deskripsiMateri || 'Materi video inspirasi untuk pembiasaan karakter anak hebat.'}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-[10px] font-bold text-slate-400 truncate max-w-[150px]">
                            {videoId ? `ID: ${videoId}` : 'Belum diisi'}
                          </span>
                          <button
                            onClick={() => handleOpenEdit(hid)}
                            className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition flex items-center gap-1.5"
                          >
                            <i className="fa-solid fa-gear text-[10px]"></i> Kelola
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* VIEW: QUIS & PENILAIAN */}
          {/* ============================================================== */}
          {activeMenu === 'quis' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Kelola Soal Kuis Kebiasaan</h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Tentukan pertanyaan evaluasi pemahaman siswa untuk masing-masing misi habit.
                  </p>
                </div>
                <button
                  onClick={() => handleOpenEdit(activeHabitTab)}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-500/20 transition active:scale-95 flex items-center gap-2"
                >
                  <i className="fa-solid fa-plus"></i> Tambah / Edit Kuis
                </button>
              </div>

              {/* Habit Tab Selector */}
              <div className="flex overflow-x-auto gap-2 pb-2">
                {[1, 2, 3, 4, 5, 6, 7].map((hid) => (
                  <button
                    key={hid}
                    onClick={() => setActiveHabitTab(hid)}
                    className={`shrink-0 px-4 py-2 rounded-2xl text-xs font-bold transition ${
                      activeHabitTab === hid
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                        : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
                    }`}
                  >
                    Misi {hid}: {HABIT_TITLES[hid - 1]?.split(' ')[0]}
                  </button>
                ))}
              </div>

              {/* Active Quiz Card */}
              {(() => {
                const mk = materiKuisMap[activeHabitTab] || {};
                return (
                  <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          Soal Aktif Misi {activeHabitTab}
                        </span>
                        <h3 className="text-base font-black text-slate-900 mt-1">
                          {HABIT_TITLES[activeHabitTab - 1]}
                        </h3>
                      </div>
                      <button
                        onClick={() => handleOpenEdit(activeHabitTab)}
                        className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-1.5"
                      >
                        <i className="fa-solid fa-pen-to-square"></i> Edit Soal Ini
                      </button>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Pertanyaan Siswa:</p>
                      <p className="text-sm font-black text-slate-800">
                        {mk.pertanyaan || 'Apa manfaat utama dari menerapkan kebiasaan hebat ini setiap hari?'}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        { key: 'A', text: mk.opsiA || 'Membentuk kedisiplinan dan karakter diri yang unggul' },
                        { key: 'B', text: mk.opsiB || 'Hanya untuk mendapatkan nilai bagus di sekolah' },
                        { key: 'C', text: mk.opsiC || 'Mengisi waktu kosong saat tidak ada hiburan' },
                        { key: 'D', text: mk.opsiD || 'Supaya tidak ditegur oleh orang tua dan guru' }
                      ].map((opt) => {
                        const isCorrect = (mk.kunciJawaban || 'A').toUpperCase() === opt.key;
                        return (
                          <div
                            key={opt.key}
                            className={`p-3.5 rounded-2xl border flex items-center gap-3 transition ${
                              isCorrect
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-900 ring-2 ring-emerald-500/20'
                                : 'bg-white border-slate-200/80 text-slate-700'
                            }`}
                          >
                            <span
                              className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                                isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                              }`}
                            >
                              {opt.key}
                            </span>
                            <span className="text-xs font-medium">{opt.text}</span>
                            {isCorrect && (
                              <span className="ml-auto text-[10px] font-black uppercase text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                                Kunci
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/60 text-xs text-blue-900">
                      <span className="font-bold">Penjelasan Edukatif: </span>
                      {mk.penjelasan || 'Kebiasaan positif yang konsisten membentuk kedisiplinan dan akhlak mulia siswa.'}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* ============================================================== */}
          {/* VIEW: KELOLA SISWA (LENGKAP IMPOR EXCEL & KELOLA AKUN)         */}
          {/* ============================================================== */}
          {activeMenu === 'siswa' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Header Card with Actions */}
              <div className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-700">
                      {selectedKelas}
                    </span>
                    <span className="text-xs text-slate-400 font-bold">• {monitoringData.length} Siswa Terdaftar</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">Kelola Data Siswa</h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Unduh template Excel, impor data siswa massal, atau kelola akun login siswa.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Hidden File Input for Excel/CSV */}
                  <input
                    type="file"
                    id="excelUploadInput"
                    accept=".xlsx, .xls, .csv"
                    onChange={handleFileUploadExcel}
                    className="hidden"
                  />

                  {/* Tombol Sinkron Realtime */}
                  <button
                    type="button"
                    onClick={() => fetchStudentsAndMonitoring(true)}
                    disabled={isSyncing}
                    className="px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition border border-slate-300 flex items-center gap-2 active:scale-95 disabled:opacity-50 shadow-xs"
                    title="Sinkronkan data siswa dari database Google Sheets secara realtime"
                  >
                    <i className={`fa-solid fa-rotate ${isSyncing ? 'fa-spin text-blue-600' : ''}`}></i>
                    <span>{isSyncing ? 'Menyinkronkan...' : 'Sinkron Realtime'}</span>
                  </button>

                  {/* Download Template Excel Button */}
                  <button
                    type="button"
                    onClick={handleDownloadTemplateExcel}
                    className="px-3.5 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-bold transition border border-emerald-200 flex items-center gap-2 active:scale-95 shadow-xs"
                    title="Unduh format template Excel untuk diisi"
                  >
                    <i className="fa-solid fa-file-excel text-emerald-600 text-sm"></i>
                    <span>Template Excel</span>
                  </button>

                  {/* Upload / Impor Excel Button */}
                  <label
                    htmlFor="excelUploadInput"
                    className="px-3.5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer active:scale-95 shadow-md shadow-amber-500/20"
                    title="Upload file Excel yang sudah diisi"
                  >
                    <i className="fa-solid fa-cloud-arrow-up text-sm"></i>
                    <span>Impor Siswa Excel</span>
                  </label>

                  {/* Tambah Siswa Manual Button */}
                  <button
                    type="button"
                    onClick={handleOpenAddModal}
                    className="px-3.5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-md shadow-blue-500/20 flex items-center gap-2 active:scale-95"
                  >
                    <i className="fa-solid fa-user-plus text-sm"></i>
                    <span>Tambah Siswa</span>
                  </button>
                </div>
              </div>

              {/* Search & Filter Bar */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-80">
                  <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i>
                  <input
                    type="text"
                    value={studentSearchQuery}
                    onChange={(e) => setStudentSearchQuery(e.target.value)}
                    placeholder="Cari nama, NISN, atau username..."
                    className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-blue-500 bg-slate-50/50"
                  />
                  {studentSearchQuery && (
                    <button
                      onClick={() => setStudentSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      &times;
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end text-xs font-bold text-slate-500">
                  <span>Filter:</span>
                  <select
                    value={selectedKelas}
                    onChange={(e) => setSelectedKelas(e.target.value)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white"
                  >
                    <option value="Kelas 5A">Kelas 5A</option>
                    <option value="Kelas 5B">Kelas 5B</option>
                    <option value="Kelas 6A">Kelas 6A</option>
                    <option value="Kelas 4">Kelas 4</option>
                  </select>
                </div>
              </div>

              {/* Table of Students */}
              <div className="rounded-3xl bg-white border border-slate-200/80 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        <th className="py-3.5 px-4 text-center">No</th>
                        <th className="py-3.5 px-4">NISN</th>
                        <th className="py-3.5 px-4">Nama Lengkap Siswa</th>
                        <th className="py-3.5 px-4">Akun Login (Username & Password)</th>
                        <th className="py-3.5 px-3 text-center">L/P</th>
                        <th className="py-3.5 px-4 text-center">Misi Selesai</th>
                        <th className="py-3.5 px-3 text-center">Status</th>
                        <th className="py-3.5 px-4 text-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {monitoringData
                        .filter(s => {
                          if (!studentSearchQuery) return true;
                          const q = studentSearchQuery.toLowerCase();
                          return (
                            s.nama?.toLowerCase().includes(q) ||
                            s.nisn?.toLowerCase().includes(q) ||
                            s.username?.toLowerCase().includes(q)
                          );
                        })
                        .map((s, idx) => {
                          const showPass = showPasswordMap[s.nisn];
                          return (
                            <tr key={s.id || idx} className="hover:bg-slate-50/80 transition">
                              <td className="py-3.5 px-4 font-bold text-slate-400 text-center">{idx + 1}</td>
                              <td className="py-3.5 px-4 font-mono font-bold text-slate-700">{s.nisn}</td>
                              <td className="py-3.5 px-4">
                                <button
                                  type="button"
                                  onClick={() => handleOpenStudentDetail(s)}
                                  className="text-left font-bold text-slate-800 hover:text-blue-600 transition flex items-center gap-2.5 group cursor-pointer"
                                  title="Klik untuk melihat rekapitulasi jurnal & kuis"
                                >
                                  <span className="w-7 h-7 rounded-xl bg-blue-100 text-blue-700 font-black flex items-center justify-center text-xs group-hover:bg-blue-600 group-hover:text-white transition shadow-xs">
                                    {s.nama?.charAt(0) || 'S'}
                                  </span>
                                  <div>
                                    <span className="group-hover:underline block leading-tight">{s.nama}</span>
                                    <span className="text-[10px] text-slate-400 font-normal">{s.kelas || selectedKelas}</span>
                                  </div>
                                </button>
                              </td>
                              <td className="py-3.5 px-4">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-1.5 text-slate-700 font-medium text-[11px]">
                                    <span className="text-slate-400 text-[10px]">User:</span>
                                    <span className="font-mono font-bold text-blue-700 bg-blue-50/60 px-1.5 py-0.5 rounded">
                                      {s.username || s.nisn}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1.5 text-slate-700 font-medium text-[11px]">
                                    <span className="text-slate-400 text-[10px]">Pass:</span>
                                    <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded font-bold">
                                      {showPass ? (s.password || '123456') : '••••••'}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => togglePasswordVisibility(s.nisn)}
                                      className="text-slate-400 hover:text-slate-600 text-[10px] ml-0.5"
                                      title={showPass ? 'Sembunyikan password' : 'Lihat password'}
                                    >
                                      <i className={`fa-solid ${showPass ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                    </button>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3.5 px-3 text-center">
                                <span className={`inline-block px-2 py-0.5 rounded-md font-bold text-[10px] ${s.gender === 'P' ? 'bg-pink-50 text-pink-600 border border-pink-200' : 'bg-blue-50 text-blue-600 border border-blue-200'}`}>
                                  {s.gender || 'L'}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-center">
                                <span className="font-bold text-slate-700">{s.completedCount || 0}/7</span>
                                <div className="w-16 h-1.5 bg-slate-200 rounded-full mx-auto mt-1 overflow-hidden">
                                  <div
                                    className="h-full bg-emerald-500 rounded-full"
                                    style={{ width: `${s.percentage || 0}%` }}
                                  ></div>
                                </div>
                              </td>
                              <td className="py-3.5 px-3 text-center">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                                  s.statusVerif === 'Disetujui' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                                }`}>
                                  {s.statusVerif || 'Menunggu'}
                                </span>
                              </td>
                              <td className="py-3.5 px-4 text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => handleOpenStudentDetail(s)}
                                    className="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-[10px] font-bold transition flex items-center gap-1"
                                    title="Lihat Rekap Jurnal & Foto"
                                  >
                                    <i className="fa-solid fa-clipboard-check"></i> Rekap
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleOpenEditModal(s)}
                                    className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[10px] font-bold transition"
                                    title="Edit data siswa"
                                  >
                                    <i className="fa-solid fa-pen-to-square"></i>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteStudent(s)}
                                    className="px-2 py-1 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg text-[10px] font-bold transition"
                                    title="Hapus siswa dari sistem"
                                  >
                                    <i className="fa-solid fa-trash-can"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>

                {monitoringData.length === 0 && (
                  <div className="py-12 text-center text-slate-400 space-y-2">
                    <i className={`fa-solid ${isSyncing ? 'fa-circle-notch fa-spin text-blue-500' : 'fa-user-graduate'} text-3xl`}></i>
                    <p className="text-xs font-bold text-slate-600">
                      {isSyncing ? 'Sedang menyinkronkan data siswa dari Google Sheets...' : 'Belum ada siswa di kelas ini.'}
                    </p>
                    {!isSyncing && (
                      <button
                        type="button"
                        onClick={handleDownloadTemplateExcel}
                        className="text-xs font-bold text-blue-600 hover:text-blue-700 underline block mx-auto"
                      >
                        Unduh template Excel & impor siswa sekarang
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* VIEW: REKAP 7 KEBIASAAN SISWA (WITH CLICKABLE STUDENT DETAIL) */}
          {/* ============================================================== */}
          {activeMenu === 'rekap' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Rekap Pembiasaan 7 Karakter Hebat</h2>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Matrix kepatuhan harian: Tanggal {selectedTanggal} • {selectedKelas}.
                    <span className="text-blue-600 font-bold ml-1.5 inline-flex items-center gap-1">
                      <i className="fa-solid fa-circle-info text-[11px]"></i> Klik pada nama siswa untuk melihat rincian jam & hasil kuis Misi 1 - 7.
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={selectedTanggal}
                    onChange={(e) => setSelectedTanggal(e.target.value)}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fetchStudentsAndMonitoring(true)}
                    disabled={isSyncing}
                    className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
                    title="Sinkronkan data rekapitulasi terbaru dari Google Sheets"
                  >
                    <i className={`fa-solid fa-rotate ${isSyncing ? 'fa-spin text-blue-600' : ''}`}></i>
                    <span>{isSyncing ? 'Menyinkronkan...' : 'Sinkron'}</span>
                  </button>
                  <button
                    onClick={() => showToast('Data rekapitulasi berhasil dicetak!', 'success')}
                    className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5"
                  >
                    <i className="fa-solid fa-print"></i> Cetak PDF
                  </button>
                </div>
              </div>

              {/* 7 Habit Matrix Table */}
              <div className="rounded-3xl bg-white border border-slate-200/80 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        <th className="py-3.5 px-3">No</th>
                        <th className="py-3.5 px-3">Nama Siswa (Klik untuk Detail)</th>
                        <th className="py-3.5 px-2 text-center" title="Bangun Pagi">H1</th>
                        <th className="py-3.5 px-2 text-center" title="Beribadah">H2</th>
                        <th className="py-3.5 px-2 text-center" title="Olahraga">H3</th>
                        <th className="py-3.5 px-2 text-center" title="Makan Sehat & Belajar">H4</th>
                        <th className="py-3.5 px-2 text-center" title="Bantu Orang Tua">H5</th>
                        <th className="py-3.5 px-2 text-center" title="Menabung">H6</th>
                        <th className="py-3.5 px-2 text-center" title="Tidur Cepat">H7</th>
                        <th className="py-3.5 px-3 text-center">Skor (%)</th>
                        <th className="py-3.5 px-3 text-center">Verifikasi</th>
                        <th className="py-3.5 px-3 text-center">Rincian & Foto</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {monitoringData.map((s, idx) => (
                        <tr key={s.id} className="hover:bg-blue-50/40 transition">
                          <td className="py-3 px-3 font-bold text-slate-400">{idx + 1}</td>
                          <td className="py-3 px-3 font-bold text-slate-800">
                            {/* Clickable Student Name */}
                            <button
                              type="button"
                              onClick={() => handleOpenStudentDetail(s)}
                              className="text-left font-bold text-slate-800 hover:text-blue-600 transition flex items-center gap-2.5 group cursor-pointer"
                              title="Klik untuk melihat hasil isian & kuis siswa"
                            >
                              <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white font-black flex items-center justify-center text-xs shadow-xs group-hover:scale-105 transition">
                                {s.nama.charAt(0)}
                              </div>
                              <div className="leading-tight">
                                <span className="underline decoration-slate-300 group-hover:decoration-blue-600 group-hover:text-blue-600 transition">
                                  {s.nama}
                                </span>
                                <span className="block text-[10px] text-slate-400 font-normal">NISN: {s.nisn}</span>
                              </div>
                            </button>
                          </td>
                          {['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'h7'].map((hk, i) => {
                            const isDone = s.habits[hk];
                            const detail = s.detailMisi?.[i + 1];
                            const hasPhoto = Boolean(detail?.fotoBukti);
                            return (
                              <td key={i} className="py-3 px-2 text-center">
                                {isDone ? (
                                  <button
                                    type="button"
                                    onClick={() => handleOpenStudentDetail(s)}
                                    className="w-7 h-7 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-700 inline-flex items-center justify-center text-[10px] font-black transition cursor-pointer relative"
                                    title={`Misi ${i + 1} Selesai: ${detail?.jam || '-'}${hasPhoto ? ' (Ada Foto Bukti)' : ''}`}
                                  >
                                    <span>✓</span>
                                    {hasPhoto && (
                                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-blue-600 text-white rounded-full flex items-center justify-center text-[7px] shadow-2xs" title="Ada Foto Bukti">
                                        <i className="fa-solid fa-camera"></i>
                                      </span>
                                    )}
                                  </button>
                                ) : (
                                  <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-300 inline-flex items-center justify-center text-xs">
                                    -
                                  </span>
                                )}
                              </td>
                            );
                          })}
                          <td className="py-3 px-3 text-center font-bold text-slate-800">
                            <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 font-black">
                              {s.percentage}%
                            </span>
                          </td>
                          <td className="py-3 px-3 text-center">
                            <button
                              type="button"
                              onClick={() => handleVerifyStudent(s.id, s.statusVerif === 'Disetujui' ? 'Menunggu' : 'Disetujui')}
                              className={`px-3 py-1 rounded-full text-[10px] font-black transition cursor-pointer ${
                                s.statusVerif === 'Disetujui'
                                  ? 'bg-emerald-100 hover:bg-rose-100 text-emerald-800 hover:text-rose-800'
                                  : 'bg-amber-100 hover:bg-emerald-100 text-amber-800 hover:text-emerald-800'
                              }`}
                            >
                              {s.statusVerif === 'Disetujui' ? 'Disetujui ✓' : 'Setujui ?'}
                            </button>
                          </td>
                          <td className="py-3 px-3 text-center">
                            <button
                              type="button"
                              onClick={() => handleOpenStudentDetail(s)}
                              className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-[10px] font-bold transition flex items-center gap-1.5 mx-auto active:scale-95 shadow-2xs"
                              title="Buka Rekapitulasi Isian Misi & Foto Siswa"
                            >
                              <i className="fa-solid fa-clipboard-check text-[10px]"></i>
                              <span>Rekap</span>
                              {Object.values(s.detailMisi || {}).some(d => d?.fotoBukti) && (
                                <i className="fa-solid fa-camera text-blue-600 text-[9px]" title="Ada foto bukti"></i>
                              )}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {monitoringData.length === 0 && (
                  <div className="py-12 text-center text-slate-400 space-y-2">
                    <i className={`fa-solid ${isSyncing ? 'fa-circle-notch fa-spin text-blue-500' : 'fa-clipboard-list'} text-3xl`}></i>
                    <p className="text-xs font-bold text-slate-600">
                      {isSyncing ? 'Sedang memuat data rekapitulasi dari database Google Sheets...' : 'Belum ada data rekapitulasi siswa untuk kelas dan tanggal ini.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* VIEW: PENGUMUMAN */}
          {/* ============================================================== */}
          {activeMenu === 'pengumuman' && (
            <div className="space-y-6">
              <div className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900">Pengumuman & Siaran Kelas</h2>
                  <p className="text-xs text-slate-500 font-medium">Kirim pengumuman penting langsung ke dashboard seluruh siswa.</p>
                </div>
                <button
                  onClick={() => showToast('Fitur buat pengumuman baru siap digunakan!', 'info')}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-md shadow-blue-500/20 flex items-center gap-2"
                >
                  <i className="fa-solid fa-bullhorn"></i> Buat Pengumuman Baru
                </button>
              </div>

              <div className="space-y-4">
                {announcements.map((a) => (
                  <div key={a.id} className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${a.badgeColor}`}>
                        {a.title}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">{a.date}</span>
                    </div>
                    <p className="text-sm font-medium text-slate-700">{a.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* VIEW: PENGATURAN */}
          {/* ============================================================== */}
          {activeMenu === 'pengaturan' && (
            <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-6 max-w-2xl">
              <div>
                <h2 className="text-xl font-black text-slate-900">Pengaturan Kelas & Akun Guru</h2>
                <p className="text-xs text-slate-500 font-medium">Konfigurasi kelas dan data akun pengajar.</p>
              </div>

              <div className="space-y-4 text-xs font-bold">
                <div>
                  <label className="block text-slate-600 mb-1">Nama Lengkap Guru & Gelar</label>
                  <input
                    type="text"
                    defaultValue={currentUser?.nama || 'Budi Santoso, S.Pd'}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 mb-1">Kelas yang Diampu</label>
                  <select
                    value={selectedKelas}
                    onChange={(e) => setSelectedKelas(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 outline-hidden"
                  >
                    <option value="Kelas 5A">Kelas 5A</option>
                    <option value="Kelas 5B">Kelas 5B</option>
                    <option value="Kelas 6A">Kelas 6A</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 mb-1">Tahun Pelajaran</label>
                  <input
                    type="text"
                    defaultValue="2026/2027"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 outline-hidden"
                  />
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => showToast('Pengaturan berhasil diperbarui!', 'success')}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-md shadow-blue-500/20 transition active:scale-95"
                  >
                    Simpan Perubahan
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* 3. RIGHT COLUMN WIDGETS (EXACT REFERENCE SCREENSHOT) */}
        <aside className="w-80 bg-white border-l border-slate-200/80 p-5 space-y-6 hidden xl:block overflow-y-auto shrink-0">
          {/* Top Date & Class Info Card */}
          <div className="p-4 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-800">Selasa, 21 Oktober 2025</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Hari Ini
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-2xl bg-white border border-slate-200/60 shadow-2xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-sm font-bold">
                  <i className="fa-solid fa-chalkboard"></i>
                </div>
                <div>
                  <div className="text-xs font-black text-slate-800">{selectedKelas}</div>
                  <div className="text-[10px] text-slate-400 font-medium">Tahun Pelajaran 2026/2027</div>
                </div>
              </div>
              <i className="fa-solid fa-chevron-right text-xs text-slate-400"></i>
            </div>

            {/* 3 Mini Counters */}
            <div className="grid grid-cols-3 gap-2 pt-1 text-center">
              <div className="p-2 rounded-xl bg-white border border-slate-100">
                <div className="text-sm font-black text-blue-600">32</div>
                <div className="text-[9px] font-bold text-slate-400">Siswa</div>
              </div>
              <div className="p-2 rounded-xl bg-white border border-slate-100">
                <div className="text-sm font-black text-amber-500">5</div>
                <div className="text-[9px] font-bold text-slate-400">Tugas</div>
              </div>
              <div className="p-2 rounded-xl bg-white border border-slate-100">
                <div className="text-sm font-black text-purple-600">3</div>
                <div className="text-[9px] font-bold text-slate-400">Materi</div>
              </div>
            </div>
          </div>

          {/* Jadwal Hari Ini Card */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-slate-800">Jadwal Hari Ini</h4>
              <button className="text-[11px] font-bold text-blue-600 hover:text-blue-700">Lihat Semua →</button>
            </div>

            <div className="space-y-2.5">
              {[
                { time: '07:00 - 08:30', mapel: 'Bahasa Indonesia', topik: 'Membaca Cerita Pendek', badge: 'Materi', badgeStyle: 'bg-blue-50 text-blue-700' },
                { time: '09:00 - 10:30', mapel: 'Matematika', topik: 'Operasi Hitung Pecahan', badge: 'Materi', badgeStyle: 'bg-blue-50 text-blue-700' },
                { time: '11:00 - 12:00', mapel: 'PPKn', topik: 'Tugas: Sikap Saling Menghargai', badge: 'Tugas', badgeStyle: 'bg-amber-50 text-amber-700' },
                { time: '13:00 - 14:00', mapel: 'IPA', topik: 'Kuis: Ekosistem & Lingkungan', badge: 'Kuis', badgeStyle: 'bg-emerald-50 text-emerald-700' },
                { time: '15:00 - 16:00', mapel: 'Seni Budaya', topik: 'Menggambar Flora Nusantara', badge: 'Materi', badgeStyle: 'bg-blue-50 text-blue-700' }
              ].map((j, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100/70 border border-slate-200/60 space-y-1 transition">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400">{j.time}</span>
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-md ${j.badgeStyle}`}>{j.badge}</span>
                  </div>
                  <div className="text-xs font-bold text-slate-800">{j.mapel}</div>
                  <div className="text-[11px] text-slate-500">{j.topik}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Pengumuman Terbaru Card */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-slate-800">Pengumuman Terbaru</h4>
              <button onClick={() => setActiveMenu('pengumuman')} className="text-[11px] font-bold text-blue-600 hover:text-blue-700">Lihat Semua →</button>
            </div>

            <div className="space-y-2.5">
              {announcements.map((a) => (
                <div key={a.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-md border ${a.badgeColor}`}>
                      {a.title}
                    </span>
                    <span className="text-[9px] text-slate-400">{a.date}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-2">{a.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Inspiring Promo Card */}
          <div className="p-4 rounded-3xl bg-gradient-to-tr from-amber-50 to-orange-50 border border-amber-200/70 text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-400/20 text-amber-600 flex items-center justify-center text-2xl">
              ☀️
            </div>
            <h5 className="text-xs font-black text-amber-900 leading-tight">Belajar Hari Ini Untuk Masa Depan Esok</h5>
            <p className="text-[10px] text-amber-700">Terus bimbing anak bangsa menuju masa depan gemilang.</p>
          </div>
        </aside>
      </div>

      {/* ========================================================================= */}
      {/* 4. MODAL DETAIL SISWA & HASIL KUIS MISI 1 - MISI 7 (INTERACTIVE) */}
      {/* ========================================================================= */}
      {showStudentDetailModal && selectedStudent && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-5 sm:p-7 shadow-2xl border border-slate-200 space-y-5 my-6 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3.5">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black flex items-center justify-center text-xl shadow-md shadow-blue-500/25">
                  {selectedStudent.nama.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-black text-slate-900">{selectedStudent.nama}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      selectedStudent.statusVerif === 'Disetujui' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {selectedStudent.statusVerif}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    NISN: <span className="font-mono text-slate-700">{selectedStudent.nisn}</span> • {selectedKelas} • Tanggal: <span className="font-bold text-slate-700">{selectedTanggal}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowStudentDetailModal(false)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-xl font-bold transition"
              >
                &times;
              </button>
            </div>

            {/* Score & Verification Summary Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-sky-50 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Capaian Pembiasaan Harian</div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-black text-blue-700">{selectedStudent.completedCount} dari 7 Misi Selesai</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-xs font-black shadow-xs">
                    {selectedStudent.percentage}%
                  </span>
                </div>
                <div className="w-48 h-2 bg-blue-200/70 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${selectedStudent.percentage}%` }}></div>
                </div>
              </div>

              {/* Action Verifikasi Langsung */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleVerifyStudent(selectedStudent.id, selectedStudent.statusVerif === 'Disetujui' ? 'Menunggu' : 'Disetujui')}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black transition active:scale-95 shadow-md flex items-center gap-2 ${
                    selectedStudent.statusVerif === 'Disetujui'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20'
                  }`}
                >
                  <i className={`fa-solid ${selectedStudent.statusVerif === 'Disetujui' ? 'fa-rotate-left' : 'fa-circle-check'}`}></i>
                  <span>{selectedStudent.statusVerif === 'Disetujui' ? 'Batalkan Persetujuan' : 'Setujui Jurnal Ini'}</span>
                </button>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center justify-between gap-2 pt-1 border-b border-slate-100 pb-3">
              <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                <i className="fa-solid fa-list-check text-blue-600"></i> Rincian Misi 1 sampai Misi 7:
              </span>
              <div className="flex items-center gap-1 text-xs">
                {[
                  { id: 'all', label: 'Semua (7)' },
                  { id: 'done', label: 'Selesai' },
                  { id: 'pending', label: 'Belum Selesai' }
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => setDetailFilter(f.id)}
                    className={`px-3 py-1 rounded-xl text-[11px] font-bold transition ${
                      detailFilter === f.id ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Habit Mission List Cards */}
            <div className="space-y-3 max-h-[52vh] overflow-y-auto pr-1">
              {[1, 2, 3, 4, 5, 6, 7].map((hid) => {
                const habitKey = `h${hid}`;
                const isDone = selectedStudent.habits[habitKey];
                const detail = selectedStudent.detailMisi?.[hid] || {
                  selesai: isDone,
                  jam: isDone ? '06:00 WIB' : '-',
                  jawabanKuis: isDone ? 'A' : '-',
                  kuisBenar: isDone,
                  nilaiKuis: isDone ? 100 : 0,
                  catatan: isDone ? 'Telah melaksanakan misi pembiasaan ini dengan baik.' : 'Belum mengisi pembiasaan.'
                };
                const mk = materiKuisMap[hid] || {};

                // Filter logic
                if (detailFilter === 'done' && !isDone) return null;
                if (detailFilter === 'pending' && isDone) return null;

                return (
                  <div
                    key={hid}
                    className={`p-4 rounded-2xl border transition ${
                      isDone
                        ? 'bg-white border-slate-200/90 shadow-2xs hover:border-emerald-300'
                        : 'bg-slate-50/70 border-dashed border-slate-200 opacity-75'
                    }`}
                  >
                    {/* Mission Header */}
                    <div className="flex items-center justify-between gap-3 mb-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                          isDone ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-400'
                        }`}>
                          <i className={`fa-solid ${HABIT_ICONS[hid - 1] || 'fa-star'}`}></i>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-blue-100 text-blue-800">
                              Misi {hid}
                            </span>
                            <h4 className="text-xs font-black text-slate-800">{HABIT_TITLES[hid - 1]}</h4>
                          </div>
                        </div>
                      </div>

                      {/* Status & Jam Pill */}
                      <div>
                        {isDone ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <i className="fa-solid fa-clock text-[10px]"></i>
                            <span>{detail.jam}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-400">
                            <i className="fa-regular fa-circle-xmark"></i> Belum Dikerjakan
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Mission Details (Kuis, Jam, Refleksi) */}
                    {isDone ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
                        {/* Box 1: Hasil Kuis */}
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                              <i className="fa-solid fa-clipboard-question text-emerald-600"></i> Hasil Kuis Misi {hid}
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800">
                              Nilai: {detail.nilaiKuis}/100 ✓
                            </span>
                          </div>

                          <div className="text-[11px] font-bold text-slate-700">
                            {mk.pertanyaan || 'Pertanyaan pemahaman materi kebiasaan.'}
                          </div>

                          <div className="text-[11px] text-slate-600 bg-white p-2 rounded-lg border border-slate-100 flex items-center justify-between">
                            <span>Jawaban Siswa: <strong className="text-emerald-700 font-extrabold">Pilihan {detail.jawabanKuis}</strong></span>
                            <span className="text-emerald-600 font-black text-[10px]">BENAR ✓</span>
                          </div>
                        </div>

                        {/* Box 2: Catatan / Refleksi Siswa & Foto Bukti */}
                        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                              <i className="fa-solid fa-pen-fancy text-blue-600"></i> Catatan Pelaksanaan Siswa
                            </span>
                            <span className="text-[10px] text-slate-400 font-semibold">{detail.jam}</span>
                          </div>

                          <div className="text-[11px] font-medium text-slate-700 bg-white p-2.5 rounded-lg border border-slate-100 italic leading-relaxed">
                            "{detail.catatan}"
                          </div>

                          {/* Foto Bukti Unggahan Siswa */}
                          {detail.fotoBukti ? (
                            <div className="pt-2 border-t border-slate-200/60 space-y-1.5">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                                  <i className="fa-solid fa-camera text-blue-600"></i> Foto Bukti Unggahan Siswa:
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleOpenPhotoLightbox(detail.fotoBukti, `Foto Bukti Misi ${hid}: ${HABIT_TITLES[hid - 1]}`, `${selectedStudent.nama} (${selectedStudent.nisn}) • ${detail.jam}`, `Misi ${hid}`)}
                                  className="text-[10px] font-bold text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1"
                                >
                                  <i className="fa-solid fa-expand text-[9px]"></i> Perbesar Foto
                                </button>
                              </div>

                              <div
                                onClick={() => handleOpenPhotoLightbox(detail.fotoBukti, `Foto Bukti Misi ${hid}: ${HABIT_TITLES[hid - 1]}`, `${selectedStudent.nama} (${selectedStudent.nisn}) • ${detail.jam}`, `Misi ${hid}`)}
                                className="relative group rounded-xl overflow-hidden border border-slate-200 bg-slate-900 cursor-pointer shadow-xs max-h-44 flex items-center justify-center"
                                title="Klik untuk memperbesar foto bukti"
                              >
                                <img
                                  src={detail.fotoBukti}
                                  alt={`Bukti Misi ${hid}`}
                                  className="w-full h-40 object-cover group-hover:scale-105 transition duration-300 opacity-95 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2 text-white">
                                  <span className="px-3 py-1 bg-slate-900/80 rounded-lg text-[11px] font-bold flex items-center gap-1.5 backdrop-blur-xs">
                                    <i className="fa-solid fa-magnifying-glass-plus"></i> Klik untuk Perbesar
                                  </span>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="pt-2 border-t border-slate-200/60 flex items-center gap-1.5 text-[10px] text-slate-400 italic">
                              <i className="fa-regular fa-image"></i>
                              <span>Siswa tidak mengunggah foto bukti untuk misi ini.</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <p className="text-[11px] text-slate-400 italic pt-1 pl-10">
                        Siswa belum menyelesaikan misi ini pada tanggal yang dipilih.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <span className="text-xs text-slate-400 font-medium">
                Siswa: <strong className="text-slate-700">{selectedStudent.nama}</strong> ({selectedKelas})
              </span>
              <button
                type="button"
                onClick={() => setShowStudentDetailModal(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition active:scale-95 shadow-md"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. MODAL EDIT MATERI & KUIS (CONNECTED TO STUDENTS REALTIME) */}
      {/* ========================================================================= */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  Pengaturan Materi & Kuis Siswa
                </span>
                <h3 className="text-base font-black text-slate-900 mt-1">
                  Misi {activeHabitTab}: {HABIT_TITLES[activeHabitTab - 1]}
                </h3>
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-lg font-bold"
              >
                &times;
              </button>
            </div>

            <div className="flex overflow-x-auto gap-2 pb-1">
              {[1, 2, 3, 4, 5, 6, 7].map((hid) => (
                <button
                  key={hid}
                  type="button"
                  onClick={() => handleOpenEdit(hid)}
                  className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    activeHabitTab === hid ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Misi {hid}
                </button>
              ))}
            </div>

            <form onSubmit={handleSaveMateriKuis} className="space-y-4 text-xs font-bold">
              {/* SECTION A: MATERI YOUTUBE */}
              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-3">
                <div className="flex items-center gap-2 text-blue-900 text-xs font-black">
                  <i className="fa-brands fa-youtube text-red-600 text-base"></i>
                  <span>1. Materi Video YouTube</span>
                </div>

                <div>
                  <label className="block text-slate-600 mb-1">Judul Video Materi</label>
                  <input
                    type="text"
                    required
                    value={editingMk.judulMateri || ''}
                    onChange={(e) => setEditingMk({ ...editingMk, judulMateri: e.target.value })}
                    placeholder="Contoh: Video Edukasi Bangun Pagi Anak Juara"
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-800 outline-hidden focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 mb-1">Link URL YouTube (Watch / Shorts / Embed)</label>
                  <input
                    type="text"
                    required
                    value={editingMk.linkYoutube || ''}
                    onChange={(e) => setEditingMk({ ...editingMk, linkYoutube: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-800 outline-hidden focus:border-blue-500 font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 mb-1">Deskripsi Singkat / Arahan</label>
                  <textarea
                    rows={2}
                    value={editingMk.deskripsiMateri || ''}
                    onChange={(e) => setEditingMk({ ...editingMk, deskripsiMateri: e.target.value })}
                    placeholder="Jelaskan ringkasan materi dan apa yang harus dipelajari siswa..."
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-800 outline-hidden focus:border-blue-500"
                  ></textarea>
                </div>
              </div>

              {/* SECTION B: KUIS & EVALUASI */}
              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-3">
                <div className="flex items-center gap-2 text-emerald-900 text-xs font-black">
                  <i className="fa-solid fa-clipboard-question text-emerald-600 text-base"></i>
                  <span>2. Kuis Evaluasi Misi</span>
                </div>

                <div>
                  <label className="block text-slate-600 mb-1">Pertanyaan Soal</label>
                  <input
                    type="text"
                    required
                    value={editingMk.pertanyaan || ''}
                    onChange={(e) => setEditingMk({ ...editingMk, pertanyaan: e.target.value })}
                    placeholder="Tuliskan pertanyaan pemahaman..."
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-800 outline-hidden focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-600 mb-1">Pilihan A</label>
                    <input
                      type="text"
                      required
                      value={editingMk.opsiA || ''}
                      onChange={(e) => setEditingMk({ ...editingMk, opsiA: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Pilihan B</label>
                    <input
                      type="text"
                      required
                      value={editingMk.opsiB || ''}
                      onChange={(e) => setEditingMk({ ...editingMk, opsiB: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Pilihan C</label>
                    <input
                      type="text"
                      required
                      value={editingMk.opsiC || ''}
                      onChange={(e) => setEditingMk({ ...editingMk, opsiC: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1">Pilihan D</label>
                    <input
                      type="text"
                      required
                      value={editingMk.opsiD || ''}
                      onChange={(e) => setEditingMk({ ...editingMk, opsiD: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-slate-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-slate-600 mb-1">Kunci Jawaban Benar</label>
                    <select
                      value={editingMk.kunciJawaban || 'A'}
                      onChange={(e) => setEditingMk({ ...editingMk, kunciJawaban: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-800 outline-hidden font-bold"
                    >
                      <option value="A">Pilihan A</option>
                      <option value="B">Pilihan B</option>
                      <option value="C">Pilihan C</option>
                      <option value="D">Pilihan D</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-600 mb-1">Penjelasan Singkat</label>
                    <input
                      type="text"
                      value={editingMk.penjelasan || ''}
                      onChange={(e) => setEditingMk({ ...editingMk, penjelasan: e.target.value })}
                      placeholder="Penjelasan edukasi..."
                      className="w-full px-3.5 py-2 rounded-xl bg-white border border-slate-300 text-slate-800"
                    />
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSavingMk}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black shadow-lg shadow-blue-500/25 transition active:scale-95 flex items-center gap-2"
                >
                  {isSavingMk ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin"></i> Menyimpan...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-cloud-arrow-up"></i> Simpan & Hubungkan ke Siswa
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. MODAL PRATINJAU IMPOR DATA SISWA DARI EXCEL                            */}
      {/* ========================================================================= */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-5 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl shadow-xs">
                  <i className="fa-solid fa-file-excel"></i>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900">
                    Pratinjau Impor Data Siswa
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Periksa kembali data siswa hasil pembacaan template Excel sebelum disimpan ke sistem.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowImportModal(false)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-lg font-bold transition"
              >
                &times;
              </button>
            </div>

            {/* Info Badge */}
            <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200/80 flex items-center justify-between text-xs text-emerald-900">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-circle-check text-emerald-600 text-sm"></i>
                <span className="font-bold">
                  {importParsedStudents.length} calon siswa terdeteksi dan siap diimpor ke {selectedKelas}.
                </span>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-200">
                Format Valid ✓
              </span>
            </div>

            {/* Preview Table */}
            <div className="max-h-72 overflow-y-auto rounded-2xl border border-slate-200 overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider sticky top-0">
                    <th className="py-2.5 px-3 text-center">No</th>
                    <th className="py-2.5 px-3">Nama Lengkap Siswa</th>
                    <th className="py-2.5 px-3">NISN</th>
                    <th className="py-2.5 px-3">Username</th>
                    <th className="py-2.5 px-3">Password</th>
                    <th className="py-2.5 px-3">Kelas</th>
                    <th className="py-2.5 px-2 text-center">L/P</th>
                    <th className="py-2.5 px-3 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {importParsedStudents.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition">
                      <td className="py-2.5 px-3 text-center font-bold text-slate-400">{idx + 1}</td>
                      <td className="py-2.5 px-3 font-bold text-slate-800">{item.nama}</td>
                      <td className="py-2.5 px-3 font-mono text-slate-600">{item.nisn}</td>
                      <td className="py-2.5 px-3 font-mono text-blue-700 font-bold">{item.username}</td>
                      <td className="py-2.5 px-3 font-mono text-slate-600">{item.password}</td>
                      <td className="py-2.5 px-3 text-slate-600">{item.kelas}</td>
                      <td className="py-2.5 px-2 text-center">
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${item.gender === 'P' ? 'bg-pink-50 text-pink-600' : 'bg-blue-50 text-blue-600'}`}>
                          {item.gender}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <button
                          type="button"
                          onClick={() => setImportParsedStudents(prev => prev.filter((_, i) => i !== idx))}
                          className="w-6 h-6 rounded bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs inline-flex items-center justify-center transition"
                          title="Hapus baris ini"
                        >
                          <i className="fa-solid fa-trash-can text-[10px]"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <span className="text-xs text-slate-400 font-medium">
                Pastikan NISN dan nama sudah sesuai dengan buku induk siswa.
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowImportModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition"
                >
                  Batal
                </button>
                <button
                  type="button"
                  disabled={isImporting || importParsedStudents.length === 0}
                  onClick={handleConfirmImport}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-lg shadow-emerald-500/25 transition active:scale-95 flex items-center gap-2 disabled:bg-slate-300"
                >
                  {isImporting ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin"></i>
                      <span>Menyimpan ke Database...</span>
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-check"></i>
                      <span>Simpan & Terapkan Semua Siswa ({importParsedStudents.length})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. MODAL FORM TAMBAH / EDIT SISWA MANUAL                                  */}
      {/* ========================================================================= */}
      {showAddEditModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-lg">
                  <i className={`fa-solid ${isEditingStudent ? 'fa-user-pen' : 'fa-user-plus'}`}></i>
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    {isEditingStudent ? 'Edit Data Siswa' : 'Tambah Siswa Baru'}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-medium">Lengkapi rincian data dan akun login siswa</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddEditModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center font-bold"
              >
                &times;
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Nama Lengkap Siswa *</label>
                <input
                  type="text"
                  value={studentFormData.nama}
                  onChange={(e) => setStudentFormData({ ...studentFormData, nama: e.target.value })}
                  placeholder="Contoh: Muhammad Rizky Pratama"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">NISN *</label>
                  <input
                    type="text"
                    value={studentFormData.nisn}
                    onChange={(e) => setStudentFormData({ ...studentFormData, nisn: e.target.value, username: studentFormData.username || e.target.value })}
                    placeholder="0012345678"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Jenis Kelamin</label>
                  <select
                    value={studentFormData.gender}
                    onChange={(e) => setStudentFormData({ ...studentFormData, gender: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 font-bold bg-white"
                  >
                    <option value="L">Laki-Laki (L)</option>
                    <option value="P">Perempuan (P)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Username Login</label>
                  <input
                    type="text"
                    value={studentFormData.username}
                    onChange={(e) => setStudentFormData({ ...studentFormData, username: e.target.value })}
                    placeholder="Username siswa"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Password</label>
                  <input
                    type="text"
                    value={studentFormData.password}
                    onChange={(e) => setStudentFormData({ ...studentFormData, password: e.target.value })}
                    placeholder="Password akun"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Kelas</label>
                  <select
                    value={studentFormData.kelas}
                    onChange={(e) => setStudentFormData({ ...studentFormData, kelas: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 font-bold bg-white"
                  >
                    <option value="Kelas 5A">Kelas 5A</option>
                    <option value="Kelas 5B">Kelas 5B</option>
                    <option value="Kelas 6A">Kelas 6A</option>
                    <option value="Kelas 4">Kelas 4</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Nama Panggilan</label>
                  <input
                    type="text"
                    value={studentFormData.panggilan}
                    onChange={(e) => setStudentFormData({ ...studentFormData, panggilan: e.target.value })}
                    placeholder="Panggilan akrab"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowAddEditModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveStudentForm}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black shadow-md shadow-blue-500/20 transition active:scale-95"
              >
                {isEditingStudent ? 'Perbarui Data Siswa' : 'Simpan Siswa Baru'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. MODAL LIGHTBOX FULLSCREEN ZOOM FOTO BUKTI SISWA                        */}
      {/* ========================================================================= */}
      {lightboxImage.open && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
          onClick={() => setLightboxImage({ open: false, url: '', title: '', subtitle: '', mission: '' })}
        >
          <div
            className="bg-slate-900 border border-slate-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative text-white space-y-3 p-4 sm:p-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-600/30 text-blue-400 flex items-center justify-center text-sm font-bold border border-blue-500/30">
                  <i className="fa-solid fa-camera"></i>
                </div>
                <div>
                  <h4 className="text-sm font-black text-white">{lightboxImage.title}</h4>
                  <p className="text-[11px] text-slate-400 font-medium">{lightboxImage.subtitle}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setLightboxImage({ open: false, url: '', title: '', subtitle: '', mission: '' })}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center font-bold transition"
              >
                &times;
              </button>
            </div>

            {/* High-Res Image Container */}
            <div className="rounded-2xl overflow-hidden bg-black flex items-center justify-center max-h-[65vh] border border-slate-800 shadow-inner">
              <img
                src={lightboxImage.url}
                alt={lightboxImage.title}
                className="w-full h-full object-contain max-h-[62vh]"
              />
            </div>

            {/* Lightbox Footer Actions */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-400 font-medium">
                Bukti asli pelaksanaan pembiasaan karakter peserta didik.
              </span>
              <div className="flex items-center gap-2">
                <a
                  href={lightboxImage.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                >
                  <i className="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
                  <span>Buka Gambar Penuh</span>
                </a>
                <button
                  type="button"
                  onClick={() => setLightboxImage({ open: false, url: '', title: '', subtitle: '', mission: '' })}
                  className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
