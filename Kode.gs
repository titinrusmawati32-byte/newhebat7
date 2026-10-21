/**
 * JURNAL 7 KEBIASAAN ANAK INDONESIA HEBAT
 * Backend Google Apps Script (High Performance & Cache-Accelerated)
 * File: Kode.gs
 */

// =========================================================================
// 0. CACHE ACCELERATOR (CacheService: Kecepatan Respon RAM < 50ms)
// =========================================================================

function getGasCache(key) {
  try {
    var cache = CacheService.getScriptCache();
    var cached = cache.get(key);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (err) {
    // Abaikan jika cache kosong atau parse gagal
  }
  return null;
}

function setGasCache(key, data, ttlSeconds) {
  try {
    var cache = CacheService.getScriptCache();
    var jsonStr = JSON.stringify(data);
    // Batas aman GAS cache adalah 100KB (102400 byte)
    if (jsonStr.length < 98000) {
      var ttl = ttlSeconds || 1800; // default 30 menit
      cache.put(key, jsonStr, ttl);
    }
  } catch (err) {
    // Abaikan jika melebihi kuota
  }
}

function clearGasCache(keys) {
  try {
    var cache = CacheService.getScriptCache();
    if (Array.isArray(keys)) {
      cache.removeAll(keys);
    } else if (typeof keys === 'string') {
      cache.remove(keys);
    }
  } catch (err) {
    // Abaikan error penghapusan
  }
}

// =========================================================================
// 1. ENTRY POINT WEB APP & REST API (UNTUK FRONTEND GITHUB & VITE)
// =========================================================================

function doPost(e) {
  try {
    var contents = (e && e.postData) ? e.postData.contents : '';
    var body = {};
    if (contents) {
      body = JSON.parse(contents);
    }
    var action = body.action || (e && e.parameter ? e.parameter.action : '');
    var data = body.data || body;
    var result = handleApiAction(action, data);
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  var action = (e && e.parameter) ? e.parameter.action : '';
  if (action) {
    var result = handleApiAction(action, e.parameter);
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  }

  // Jika dibuka langsung di browser sebagai Web App GAS bawaan
  try {
    var template = HtmlService.createTemplateFromFile('File13_Core');
    return template.evaluate()
      .setTitle('Jurnal 7 Kebiasaan Anak Indonesia Hebat')
      .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ status: 'API Online', message: 'LMS 7 Kebiasaan REST API siap digunakan (Cache-Enabled).' }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Router Aksi API Sentral untuk Frontend GitHub / Vite
function handleApiAction(action, data) {
  switch (action) {
    case 'login':
      return apiValidasiLogin(data.username, data.password);
    case 'getPengaturan':
      return apiGetPengaturan();
    case 'simpanPengaturan':
      return apiSimpanPengaturan(data.payload || data);
    case 'getMateriKuisAll':
      return apiGetMateriKuisAll();
    case 'simpanMateriKuis':
      return apiSimpanMateriKuis(data.habitId, data.payload || data);
    case 'getInitialSiswa':
      return apiGetInitialSiswaData(data.username, data.tanggal);
    case 'simpanHabit':
      return apiSimpanHabit(data.habitId, data.payload || data);
    case 'getMonitoringKelas':
      return apiGetMonitoringKelas(data.kelas, data.tanggal);
    case 'verifikasiHabit':
      return apiVerifikasiHabit(data.habitNum, data.rowId, data.status, data.catatan, data.kelas, data.tanggal, data.username);
    case 'getSiswaList':
      return apiGetSiswaList(data.kelasFilter);
    case 'simpanSiswa':
      return apiSimpanSiswa(data.payload || data);
    case 'hapusSiswa':
      return apiHapusSiswa(data.idOrNisn);
    case 'getGuruList':
      return apiGetGuruList();
    case 'simpanGuru':
      return apiSimpanGuru(data.payload || data);
    case 'hapusGuru':
      return apiHapusGuru(data.idOrUsername);
    case 'setupDatabase':
      return setupDatabase();
    default:
      return { success: false, message: 'Action API tidak dikenali: ' + action };
  }
}

// Helper untuk menyertakan file-file modular HTML ke dalam Core
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// Mendapatkan Spreadsheet aktif
function getSpreadsheet() {
  try {
    return SpreadsheetApp.getActiveSpreadsheet();
  } catch (err) {
    throw new Error('Spreadsheet aktif tidak ditemukan. Pastikan script ini terkait langsung dengan Google Spreadsheet.');
  }
}

// =========================================================================
// 2. OTOMASI INISIALISASI DATABASE SPREADSHEET (Jalankan sekali jika sheet masih kosong)
// =========================================================================
function setupDatabase() {
  var ss = getSpreadsheet();
  
  // Sheet Pengaturan
  var sheetPengaturan = ss.getSheetByName('Pengaturan');
  if (!sheetPengaturan) {
    sheetPengaturan = ss.insertSheet('Pengaturan');
    sheetPengaturan.appendRow(['Key', 'Value']);
    sheetPengaturan.appendRow(['namaSekolah', 'SD Generasi Indonesia Hebat']);
    sheetPengaturan.appendRow(['logoSekolah', 'https://cdn-icons-png.flaticon.com/512/2997/2997295.png']);
    sheetPengaturan.appendRow(['linkYoutube', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ']);
    sheetPengaturan.appendRow(['usernameKepsek', 'kepsek']);
    sheetPengaturan.appendRow(['passwordKepsek', '123456']);
  }

  // Sheet Guru
  var sheetGuru = ss.getSheetByName('Guru');
  if (!sheetGuru) {
    sheetGuru = ss.insertSheet('Guru');
    sheetGuru.appendRow(['id', 'username', 'nama', 'kelas', 'password', 'status']);
    sheetGuru.appendRow(['G-001', 'guru5a', 'Budi Santoso, S.Pd', 'Kelas 5A', '123456', 'Aktif']);
    sheetGuru.appendRow(['G-002', 'guru5b', 'Siti Rahma, S.Pd', 'Kelas 5B', '123456', 'Aktif']);
    sheetGuru.appendRow(['G-KEPSEK', 'kepsek', 'Drs. H. Mulyadi, M.Pd', 'Kepsek', '123456', 'Aktif']);
  }

  // Sheet Siswa
  var sheetSiswa = ss.getSheetByName('Siswa');
  if (!sheetSiswa) {
    sheetSiswa = ss.insertSheet('Siswa');
    sheetSiswa.appendRow(['id', 'nisn', 'nama', 'panggilan', 'kelas', 'tahunAjaran', 'password']);
    sheetSiswa.appendRow(['S-001', '0012345678', 'Ahmad Farhan', 'Farhan', 'Kelas 5A', '2026/2027', '123456']);
    sheetSiswa.appendRow(['S-002', '0012345679', 'Annisa Zahra', 'Zahra', 'Kelas 5A', '2026/2027', '123456']);
    sheetSiswa.appendRow(['S-003', '0012345680', 'Bima Sakti', 'Bima', 'Kelas 5B', '2026/2027', '123456']);
  }

  // Sheet Habit1 s/d Habit7
  var habitHeaders = ['id', 'tanggal', 'waktuSubmit', 'username', 'namaSiswa', 'kelas', 'detail', 'fotoBukti', 'statusVerifikasi', 'catatanGuru'];
  for (var i = 1; i <= 7; i++) {
    var sheetHabit = ss.getSheetByName('Habit' + i);
    if (!sheetHabit) {
      sheetHabit = ss.insertSheet('Habit' + i);
      sheetHabit.appendRow(habitHeaders);
    }
  }

  // Sheet MateriKuis (Dikelola oleh Guru)
  var sheetMK = ss.getSheetByName('MateriKuis');
  if (!sheetMK) {
    sheetMK = ss.insertSheet('MateriKuis');
    sheetMK.appendRow(['habitId', 'judulMateri', 'deskripsiMateri', 'linkYoutube', 'pertanyaan', 'opsiA', 'opsiB', 'opsiC', 'opsiD', 'kunciJawaban', 'penjelasan']);
    var defaultMK = [
      [1, 'Manfaat Bangun Pagi untuk Kesehatan', 'Bangun pagi membuat tubuh lebih sehat, pikiran lebih fokus, metabolisme aktif, dan semangat belajar meningkat.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Apa manfaat utama dari bangun pagi?', 'Menonton TV lebih lama', 'Menjaga kesehatan tubuh', 'Bermain game sepanjang hari', 'Tidur lebih banyak', 'B', 'Bangun pagi membantu tubuh lebih sehat, meningkatkan konsentrasi, dan membuat semangat belajar.'],
      [2, 'Indahnya Bersyukur dan Taat Beribadah', 'Ibadah dan rasa syukur mendidik hati menjadi tenang, sabar, dan selalu rendah hati kepada sesama manusia.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Mengapa kita harus selalu bersyukur kepada Tuhan setiap hari?', 'Agar dipuji orang lain', 'Karena Tuhan telah memberikan nikmat kesehatan dan kehidupan', 'Hanya saat mendapatkan uang jajan', 'Supaya terbebas dari tugas sekolah', 'B', 'Bersyukur atas kesehatan dan keluarga membuat hidup kita senantiasa damai dan bahagia.'],
      [3, 'Senam Ceria Anak Indonesia Hebat', 'Gerak aktif memperlancar aliran darah ke otak, meningkatkan daya ingat dan konsentrasi saat belajar di kelas.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Mengapa kita wajib melakukan pemanasan sebelum berolahraga?', 'Agar cepat lelah', 'Mencegah cedera otot dan menyiapkan tubuh', 'Hanya untuk bergaya', 'Agar waktu olahraga cepat selesai', 'B', 'Pemanasan meregangkan sendi dan menaikkan suhu tubuh sehingga terhindar dari kram atau cedera.'],
      [4, 'Petualangan Seru Membaca Buku', 'Semakin banyak membaca, semakin luas imajinasi dan pengetahuan yang kamu miliki untuk masa depan gemilang.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Mengapa buku sering disebut sebagai jendela dunia?', 'Karena bentuknya mirip jendela rumah', 'Karena melalui buku kita bisa mengetahui berbagai ilmu di seluruh dunia', 'Hanya untuk pajangan di perpustakaan', 'Karena terbuat dari kertas putih', 'B', 'Membaca buku membuka wawasan kita tentang sains, sejarah, budaya, dan teknologi dari berbagai penjuru dunia.'],
      [5, 'Pedoman Isi Piringku Gizi Seimbang', 'Sayur dan buah mengandung serat dan antioksidan yang melindungi tubuh dari berbagai virus dan penyakit.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Mengapa tubuh kita membutuhkan sayuran dan buah-buahan setiap hari?', 'Hanya agar piring terlihat penuh', 'Menyediakan vitamin, mineral, dan serat untuk daya tahan tubuh', 'Supaya cepat mengantuk di kelas', 'Karena rasanya seperti permen', 'B', 'Serat pada sayur melancarkan pencernaan, sedangkan vitamin pada buah menjaga tubuh tetap bugar.'],
      [6, 'Indahnya Gotong Royong dan Berbakti', 'Bantuan kecil seperti merapikan mainan atau mencuci piring sangat membahagiakan hati ayah dan ibu di rumah.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Apa manfaat membiasakan diri membantu orang tua di rumah?', 'Agar diberi upah banyak', 'Melatih kemandirian, tanggung jawab, dan meringankan beban orang tua', 'Supaya orang tua tidak menyuruh belajar', 'Hanya saat ada tamu yang datang', 'B', 'Membantu di rumah memupuk rasa bakti dan kasih sayang tulus serta membentuk pribadi yang mandiri dan peduli.'],
      [7, 'Rahasia Kekuatan Otak Saat Tidur Cukup', 'Saat tidur nyenyak, sel-sel otak membersihkan racun, menyimpan memori pelajaran, dan memproduksi hormon pertumbuhan.', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'Mengapa kita tidak boleh bermain gawai (HP) larut malam sebelum tidur?', 'Karena baterai HP bisa habis', 'Cahaya biru layar merusak mata dan menunda produksi hormon tidur (melatonin)', 'Agar game tidak bosan', 'Hanya mitos orang dewasa', 'B', 'Sinar biru layar gadget membuat otak mengira masih siang hari sehingga sulit tidur nyenyak.']
    ];
    for (var m = 0; m < defaultMK.length; m++) {
      sheetMK.appendRow(defaultMK[m]);
    }
  }

  // Bersihkan semua cache agar data baru terbaca
  clearGasCache(['pengaturan_sekolah', 'guru_list_all', 'siswa_list_all', 'materi_kuis_all']);

  return { success: true, message: 'Database Google Sheets berhasil disiapkan lengkap!' };
}

// =========================================================================
// 3. API OTENTIKASI & INITIAL LOAD (HIGH PERFORMANCE BATCH READ)
// =========================================================================

function apiValidasiLogin(username, password) {
  var u = (username || '').toString().trim().toLowerCase();
  var p = (password || '').toString().trim();
  var ss = getSpreadsheet();

  // 1. Cek Akun Guru & Kepsek
  var sheetGuru = ss.getSheetByName('Guru');
  if (sheetGuru) {
    var dataGuru = sheetGuru.getDataRange().getValues();
    for (var i = 1; i < dataGuru.length; i++) {
      var gUser = String(dataGuru[i][1] || '').trim().toLowerCase();
      var gPass = String(dataGuru[i][4] || '').trim();
      var gStatus = String(dataGuru[i][5] || 'Aktif').trim();
      if (gUser === u && gPass === p) {
        if (gStatus === 'Nonaktif') {
          return { success: false, message: 'Akun Anda dinonaktifkan oleh administrator.' };
        }
        var gKelas = String(dataGuru[i][3] || '').trim();
        var role = (gKelas.toLowerCase() === 'kepsek') ? 'Kepala Sekolah' : 'Guru';
        return {
          success: true,
          role: role,
          username: String(dataGuru[i][1]),
          nama: String(dataGuru[i][2]),
          kelas: gKelas
        };
      }
    }
  }

  // 2. Cek Akun Siswa (NISN)
  var sheetSiswa = ss.getSheetByName('Siswa');
  if (sheetSiswa) {
    var dataSiswa = sheetSiswa.getDataRange().getValues();
    for (var j = 1; j < dataSiswa.length; j++) {
      var sNisn = String(dataSiswa[j][1] || '').trim().toLowerCase();
      var sPass = String(dataSiswa[j][6] || '').trim();
      if (sNisn === u && sPass === p) {
        return {
          success: true,
          role: 'Siswa',
          username: String(dataSiswa[j][1]),
          nama: String(dataSiswa[j][2]),
          panggilan: String(dataSiswa[j][3]),
          kelas: String(dataSiswa[j][4]),
          tahunAjaran: String(dataSiswa[j][5])
        };
      }
    }
  }

  return { success: false, message: 'ID (NISN / Username) atau Kata Sandi salah!' };
}

// Mengambil seluruh data awal siswa (Habit hari ini + konfigurasi sekolah) sekaligus dengan RAM Cache
function apiGetInitialSiswaData(username, tanggal) {
  var targetUser = (username || '').toString().trim().toLowerCase();
  var targetTanggal = tanggal || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
  var cacheKey = 'init_siswa_' + targetUser + '_' + targetTanggal;

  // Cek RAM Cache GAS
  var cached = getGasCache(cacheKey);
  if (cached) {
    return cached;
  }

  var ss = getSpreadsheet();
  var result = {
    pengaturan: apiGetPengaturan(),
    habitsToday: {},
    allSubmissions: []
  };

  for (var h = 1; h <= 7; h++) {
    result.habitsToday[h] = null;
    var sheet = ss.getSheetByName('Habit' + h);
    if (!sheet) continue;
    var rows = sheet.getDataRange().getValues();
    for (var r = 1; r < rows.length; r++) {
      var rTgl = String(rows[r][1] || '');
      // Format tanggal jika Date object
      if (rows[r][1] instanceof Date) {
        rTgl = Utilities.formatDate(rows[r][1], Session.getScriptTimeZone(), 'yyyy-MM-dd');
      }
      var rUser = String(rows[r][3] || '').trim().toLowerCase();

      if (rUser === targetUser) {
        var item = {
          habitId: h,
          id: String(rows[r][0]),
          tanggal: rTgl,
          waktuSubmit: String(rows[r][2]),
          username: String(rows[r][3]),
          namaSiswa: String(rows[r][4]),
          kelas: String(rows[r][5]),
          detail: String(rows[r][6]),
          fotoBukti: String(rows[r][7]),
          statusVerifikasi: String(rows[r][8] || 'Disetujui'),
          catatanGuru: String(rows[r][9] || '')
        };
        result.allSubmissions.push(item);

        if (rTgl === targetTanggal) {
          result.habitsToday[h] = item;
        }
      }
    }
  }

  // Simpan di RAM Cache GAS selama 300 detik (5 menit)
  setGasCache(cacheKey, result, 300);
  return result;
}

// =========================================================================
// 4. API TRANSAKSI HABIT (SIMPAN, HAPUS, & VERIFIKASI)
// =========================================================================

function apiSimpanHabit(habitNumber, payload) {
  var ss = getSpreadsheet();
  var sheetName = 'Habit' + habitNumber;
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    sheet.appendRow(['id', 'tanggal', 'waktuSubmit', 'username', 'namaSiswa', 'kelas', 'detail', 'fotoBukti', 'statusVerifikasi', 'catatanGuru']);
  }

  var now = new Date();
  var tglStr = payload.tanggal || Utilities.formatDate(now, Session.getScriptTimeZone(), 'yyyy-MM-dd');
  var waktuStr = payload.waktuSubmit || Utilities.formatDate(now, Session.getScriptTimeZone(), 'HH:mm:ss');
  var userStr = (payload.username || '').toString().trim();
  var rowId = payload.id || ('H' + habitNumber + '-' + Date.now());

  var data = sheet.getDataRange().getValues();
  var existingRowIndex = -1;

  for (var i = 1; i < data.length; i++) {
    var rowTgl = String(data[i][1]);
    if (data[i][1] instanceof Date) {
      rowTgl = Utilities.formatDate(data[i][1], Session.getScriptTimeZone(), 'yyyy-MM-dd');
    }
    var rowUser = String(data[i][3]).trim();
    if (rowUser.toLowerCase() === userStr.toLowerCase() && rowTgl === tglStr) {
      existingRowIndex = i + 1; // 1-based index
      break;
    }
  }

  var rowValues = [
    rowId,
    tglStr,
    waktuStr,
    userStr,
    payload.namaSiswa || '',
    payload.kelas || '',
    payload.detail || '',
    payload.fotoBukti || '',
    payload.statusVerifikasi || 'Disetujui',
    payload.catatanGuru || ''
  ];

  if (existingRowIndex > 0) {
    sheet.getRange(existingRowIndex, 1, 1, rowValues.length).setValues([rowValues]);
  } else {
    sheet.appendRow(rowValues);
  }

  // Invalidate Cache Terkait (Siswa & Monitoring Guru)
  var kTarget = (payload.kelas || '').toString().trim().toLowerCase();
  clearGasCache([
    'init_siswa_' + userStr.toLowerCase() + '_' + tglStr,
    'mon_all_' + tglStr,
    'mon_' + kTarget + '_' + tglStr,
    'mon_kepsek_' + tglStr
  ]);

  return { success: true, message: 'Misi kebiasaan berhasil disimpan!', data: { id: rowId, tanggal: tglStr } };
}

function apiHapusHabit(habitNumber, id, username, tanggal) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName('Habit' + habitNumber);
  if (!sheet) return { success: false, message: 'Sheet tidak ditemukan.' };

  var data = sheet.getDataRange().getValues();
  var targetUser = (username || '').toString().trim().toLowerCase();

  for (var i = 1; i < data.length; i++) {
    var rId = String(data[i][0]);
    var rTgl = String(data[i][1]);
    if (data[i][1] instanceof Date) {
      rTgl = Utilities.formatDate(data[i][1], Session.getScriptTimeZone(), 'yyyy-MM-dd');
    }
    var rUser = String(data[i][3]).trim().toLowerCase();

    if ((id && rId === id) || (rUser === targetUser && rTgl === tanggal)) {
      sheet.deleteRow(i + 1);

      // Invalidate Cache
      clearGasCache([
        'init_siswa_' + targetUser + '_' + rTgl,
        'mon_all_' + rTgl,
        'mon_kepsek_' + rTgl
      ]);

      return { success: true, message: 'Data jurnal kebiasaan berhasil dihapus.' };
    }
  }

  return { success: false, message: 'Data jurnal tidak ditemukan.' };
}

function apiVerifikasiHabit(habitNumber, rowId, status, catatanGuru, kelas, tanggal, username) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName('Habit' + habitNumber);
  if (!sheet) return { success: false, message: 'Sheet tidak ditemukan.' };

  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    if (String(data[i][0]) === String(rowId)) {
      sheet.getRange(i + 1, 9).setValue(status);
      sheet.getRange(i + 1, 10).setValue(catatanGuru || '');

      var rTgl = String(data[i][1]);
      if (data[i][1] instanceof Date) {
        rTgl = Utilities.formatDate(data[i][1], Session.getScriptTimeZone(), 'yyyy-MM-dd');
      }
      var rUser = String(data[i][3] || '').trim().toLowerCase();
      var rKelas = String(data[i][5] || '').trim().toLowerCase();

      // Bersihkan cache terkait
      clearGasCache([
        'init_siswa_' + rUser + '_' + rTgl,
        'mon_all_' + rTgl,
        'mon_' + rKelas + '_' + rTgl,
        'mon_kepsek_' + rTgl
      ]);

      return { success: true, message: 'Verifikasi berhasil diperbarui.' };
    }
  }

  return { success: false, message: 'Data misi tidak ditemukan.' };
}

// =========================================================================
// 5. API MONITORING GURU & KEPALA SEKOLAH (BATCH AGGREGATION & CACHED)
// =========================================================================

function apiGetMonitoringKelas(kelasTarget, tanggalTarget) {
  var targetTgl = tanggalTarget || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
  var kTarget = (kelasTarget || '').toString().trim().toLowerCase();
  var cacheKey = 'mon_' + (kTarget || 'all') + '_' + targetTgl;

  // Cek RAM Cache
  var cached = getGasCache(cacheKey);
  if (cached) {
    return cached;
  }

  var ss = getSpreadsheet();

  // 1. Ambil daftar seluruh siswa di kelas ini
  var sheetSiswa = ss.getSheetByName('Siswa');
  var siswaList = [];
  if (sheetSiswa) {
    var rawS = sheetSiswa.getDataRange().getValues();
    for (var s = 1; s < rawS.length; s++) {
      var sKelas = String(rawS[s][4] || '').trim();
      if (!kTarget || sKelas.toLowerCase() === kTarget) {
        siswaList.push({
          id: String(rawS[s][0]),
          nisn: String(rawS[s][1]),
          nama: String(rawS[s][2]),
          panggilan: String(rawS[s][3] || ''),
          kelas: sKelas
        });
      }
    }
  }

  // 2. Kumpulkan submissions 7 habit pada tanggal tersebut
  var habitMap = {}; // key: nisn_habitId
  for (var h = 1; h <= 7; h++) {
    var sheetH = ss.getSheetByName('Habit' + h);
    if (!sheetH) continue;
    var rows = sheetH.getDataRange().getValues();
    for (var r = 1; r < rows.length; r++) {
      var rTgl = String(rows[r][1]);
      if (rows[r][1] instanceof Date) {
        rTgl = Utilities.formatDate(rows[r][1], Session.getScriptTimeZone(), 'yyyy-MM-dd');
      }
      if (rTgl === targetTgl) {
        var rUser = String(rows[r][3] || '').trim().toLowerCase();
        habitMap[rUser + '_' + h] = {
          id: String(rows[r][0]),
          detail: String(rows[r][6]),
          fotoBukti: String(rows[r][7]),
          statusVerifikasi: String(rows[r][8] || 'Disetujui'),
          catatanGuru: String(rows[r][9] || '')
        };
      }
    }
  }

  // 3. Gabungkan hasil
  var rowsSummary = siswaList.map(function(sw) {
    var uKey = sw.nisn.toLowerCase();
    var hData = {};
    var completedCount = 0;
    for (var n = 1; n <= 7; n++) {
      var entry = habitMap[uKey + '_' + n] || null;
      hData['h' + n] = entry;
      if (entry) completedCount++;
    }
    return {
      nisn: sw.nisn,
      nama: sw.nama,
      kelas: sw.kelas,
      habits: hData,
      completedCount: completedCount,
      percentage: Math.round((completedCount / 7) * 100)
    };
  });

  var result = {
    tanggal: targetTgl,
    kelas: kelasTarget,
    totalSiswa: siswaList.length,
    rows: rowsSummary
  };

  // Simpan di RAM Cache selama 180 detik (3 menit)
  setGasCache(cacheKey, result, 180);
  return result;
}

function apiGetMonitoringKepsek(tanggalTarget) {
  var targetTgl = tanggalTarget || Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd');
  var cacheKey = 'mon_kepsek_' + targetTgl;

  var cached = getGasCache(cacheKey);
  if (cached) {
    return cached;
  }

  var ss = getSpreadsheet();

  // Ambil semua siswa
  var sheetSiswa = ss.getSheetByName('Siswa');
  var totalSiswa = 0;
  var kelasSet = {};
  if (sheetSiswa) {
    var rawS = sheetSiswa.getDataRange().getValues();
    totalSiswa = Math.max(0, rawS.length - 1);
    for (var s = 1; s < rawS.length; s++) {
      var k = String(rawS[s][4] || '').trim();
      if (k) kelasSet[k] = (kelasSet[k] || 0) + 1;
    }
  }

  // Hitung jumlah pengisian masing-masing kebiasaan
  var habitCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };
  for (var h = 1; h <= 7; h++) {
    var sheetH = ss.getSheetByName('Habit' + h);
    if (!sheetH) continue;
    var rows = sheetH.getDataRange().getValues();
    for (var r = 1; r < rows.length; r++) {
      var rTgl = String(rows[r][1]);
      if (rows[r][1] instanceof Date) {
        rTgl = Utilities.formatDate(rows[r][1], Session.getScriptTimeZone(), 'yyyy-MM-dd');
      }
      if (rTgl === targetTgl) {
        habitCounts[h]++;
      }
    }
  }

  var result = {
    tanggal: targetTgl,
    totalSiswa: totalSiswa,
    kelasList: Object.keys(kelasSet),
    kelasDetail: kelasSet,
    habitCounts: habitCounts
  };

  setGasCache(cacheKey, result, 180);
  return result;
}

// =========================================================================
// 6. API MANAJEMEN SISWA & GURU (CRUD LENGKAP & CACHED)
// =========================================================================

function apiGetSiswaList(kelasFilter) {
  var filter = (kelasFilter || '').toString().trim().toLowerCase();
  var cacheKey = 'siswa_list_' + (filter || 'all');

  var cached = getGasCache(cacheKey);
  if (cached) {
    return cached;
  }

  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName('Siswa');
  if (!sheet) return [];
  var rows = sheet.getDataRange().getValues();
  var list = [];

  for (var i = 1; i < rows.length; i++) {
    var sKelas = String(rows[i][4] || '').trim();
    if (!filter || sKelas.toLowerCase() === filter) {
      list.push({
        id: String(rows[i][0]),
        nisn: String(rows[i][1]),
        nama: String(rows[i][2]),
        panggilan: String(rows[i][3]),
        kelas: sKelas,
        tahunAjaran: String(rows[i][5]),
        password: String(rows[i][6] || '')
      });
    }
  }

  setGasCache(cacheKey, list, 3600); // 1 jam
  return list;
}

function apiSimpanSiswa(payload) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName('Siswa');
  if (!sheet) {
    sheet = ss.insertSheet('Siswa');
    sheet.appendRow(['id', 'nisn', 'nama', 'panggilan', 'kelas', 'tahunAjaran', 'password']);
  }

  var data = sheet.getDataRange().getValues();
  var targetNisn = (payload.nisn || '').toString().trim();
  var rowIndex = -1;

  for (var i = 1; i < data.length; i++) {
    if (String(data[i][1]).trim() === targetNisn || (payload.id && String(data[i][0]) === payload.id)) {
      rowIndex = i + 1;
      break;
    }
  }

  var idVal = payload.id || ('S-' + Date.now());
  var rowVals = [
    idVal,
    targetNisn,
    payload.nama || '',
    payload.panggilan || '',
    payload.kelas || '',
    payload.tahunAjaran || '2026/2027',
    payload.password || '123456'
  ];

  if (rowIndex > 0) {
    sheet.getRange(rowIndex, 1, 1, rowVals.length).setValues([rowVals]);
  } else {
    sheet.appendRow(rowVals);
  }

  // Hapus cache siswa
  var kTarget = (payload.kelas || '').toString().trim().toLowerCase();
  clearGasCache(['siswa_list_all', 'siswa_list_' + kTarget]);

  return { success: true, message: 'Data siswa berhasil disimpan!' };
}

function apiHapusSiswa(idOrNisn) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName('Siswa');
  if (!sheet) return { success: false, message: 'Sheet tidak ditemukan.' };

  var data = sheet.getDataRange().getValues();
  var target = (idOrNisn || '').toString().trim();

  for (var i = 1; i < data.length; i++) {
    if (String(data[i][0]) === target || String(data[i][1]) === target) {
      sheet.deleteRow(i + 1);
      clearGasCache(['siswa_list_all']);
      return { success: true, message: 'Data siswa berhasil dihapus.' };
    }
  }
  return { success: false, message: 'Data siswa tidak ditemukan.' };
}

function apiGetGuruList() {
  var cacheKey = 'guru_list_all';
  var cached = getGasCache(cacheKey);
  if (cached) {
    return cached;
  }

  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName('Guru');
  if (!sheet) return [];
  var rows = sheet.getDataRange().getValues();
  var list = [];

  for (var i = 1; i < rows.length; i++) {
    list.push({
      id: String(rows[i][0]),
      username: String(rows[i][1]),
      nama: String(rows[i][2]),
      kelas: String(rows[i][3]),
      password: String(rows[i][4] || ''),
      status: String(rows[i][5] || 'Aktif')
    });
  }

  setGasCache(cacheKey, list, 3600); // 1 jam
  return list;
}

function apiSimpanGuru(payload) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName('Guru');
  if (!sheet) {
    sheet = ss.insertSheet('Guru');
    sheet.appendRow(['id', 'username', 'nama', 'kelas', 'password', 'status']);
  }

  var data = sheet.getDataRange().getValues();
  var targetUser = (payload.username || '').toString().trim();
  var rowIndex = -1;

  for (var i = 1; i < data.length; i++) {
    if (String(data[i][1]).trim().toLowerCase() === targetUser.toLowerCase() || (payload.id && String(data[i][0]) === payload.id)) {
      rowIndex = i + 1;
      break;
    }
  }

  var idVal = payload.id || ('G-' + Date.now());
  var rowVals = [
    idVal,
    targetUser,
    payload.nama || '',
    payload.kelas || '',
    payload.password || '123456',
    payload.status || 'Aktif'
  ];

  if (rowIndex > 0) {
    sheet.getRange(rowIndex, 1, 1, rowVals.length).setValues([rowVals]);
  } else {
    sheet.appendRow(rowVals);
  }

  clearGasCache(['guru_list_all']);
  return { success: true, message: 'Data guru berhasil disimpan!' };
}

function apiHapusGuru(idOrUsername) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName('Guru');
  if (!sheet) return { success: false, message: 'Sheet tidak ditemukan.' };

  var data = sheet.getDataRange().getValues();
  var target = (idOrUsername || '').toString().trim().toLowerCase();

  for (var i = 1; i < data.length; i++) {
    if (String(data[i][0]).toLowerCase() === target || String(data[i][1]).toLowerCase() === target) {
      if (String(data[i][3]).toLowerCase() === 'kepsek') {
        return { success: false, message: 'Akun Kepala Sekolah utama tidak boleh dihapus.' };
      }
      sheet.deleteRow(i + 1);
      clearGasCache(['guru_list_all']);
      return { success: true, message: 'Data guru berhasil dihapus.' };
    }
  }
  return { success: false, message: 'Data guru tidak ditemukan.' };
}

// =========================================================================
// 7. API PENGATURAN SEKOLAH (CACHED)
// =========================================================================

function apiGetPengaturan() {
  var cacheKey = 'pengaturan_sekolah';
  var cached = getGasCache(cacheKey);
  if (cached) {
    return cached;
  }

  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName('Pengaturan');
  var config = {
    namaSekolah: 'SD Generasi Indonesia Hebat',
    logoSekolah: 'https://cdn-icons-png.flaticon.com/512/2997/2997295.png',
    linkYoutube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    usernameKepsek: 'kepsek',
    passwordKepsek: '123456'
  };

  if (!sheet) {
    setGasCache(cacheKey, config, 21600); // 6 jam
    return config;
  }

  var rows = sheet.getDataRange().getValues();
  for (var i = 1; i < rows.length; i++) {
    var k = String(rows[i][0] || '').trim();
    var v = String(rows[i][1] || '').trim();
    if (k) config[k] = v;
  }

  setGasCache(cacheKey, config, 21600); // Cache 6 jam
  return config;
}

function apiSimpanPengaturan(payload) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName('Pengaturan');
  if (!sheet) {
    sheet = ss.insertSheet('Pengaturan');
    sheet.appendRow(['Key', 'Value']);
  }

  var existing = sheet.getDataRange().getValues();
  var mapRows = {};
  for (var i = 1; i < existing.length; i++) {
    mapRows[String(existing[i][0]).trim()] = i + 1;
  }

  for (var key in payload) {
    if (payload.hasOwnProperty(key)) {
      var val = String(payload[key]);
      if (mapRows[key]) {
        sheet.getRange(mapRows[key], 2).setValue(val);
      } else {
        sheet.appendRow([key, val]);
      }
    }
  }

  clearGasCache(['pengaturan_sekolah']);
  return { success: true, message: 'Pengaturan sekolah berhasil diperbarui!' };
}

// =========================================================================
// 8. API MATERI & KUIS MISI (DIKELOLA OLEH GURU & CACHED)
// =========================================================================

function apiGetMateriKuisAll() {
  var cacheKey = 'materi_kuis_all';
  var cached = getGasCache(cacheKey);
  if (cached) {
    return cached;
  }

  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName('MateriKuis');
  var map = {};

  // Default fallback jika sheet belum ada
  for (var h = 1; h <= 7; h++) {
    map[h] = {
      habitId: h,
      judulMateri: 'Materi Pembiasaan Misi ' + h,
      deskripsiMateri: 'Tonton video panduan pembiasaan kebaikan ini agar kamu semakin hebat.',
      linkYoutube: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      pertanyaan: 'Apa manfaat dari menjalankan kebiasaan baik pada misi ' + h + '?',
      opsiA: 'Menonton TV seharian',
      opsiB: 'Menjaga kesehatan tubuh & membentuk karakter hebat',
      opsiC: 'Bermain game tanpa henti',
      opsiD: 'Hanya agar dipuji teman',
      kunciJawaban: 'B',
      penjelasan: 'Menjalankan kebiasaan baik secara teratur membangun disiplin dan tubuh yang sehat.'
    };
  }

  if (!sheet) {
    setGasCache(cacheKey, map, 21600);
    return map;
  }

  var rows = sheet.getDataRange().getValues();
  for (var i = 1; i < rows.length; i++) {
    var hid = Number(rows[i][0] || 0);
    if (hid >= 1 && hid <= 7) {
      map[hid] = {
        habitId: hid,
        judulMateri: String(rows[i][1] || ''),
        deskripsiMateri: String(rows[i][2] || ''),
        linkYoutube: String(rows[i][3] || ''),
        pertanyaan: String(rows[i][4] || ''),
        opsiA: String(rows[i][5] || ''),
        opsiB: String(rows[i][6] || ''),
        opsiC: String(rows[i][7] || ''),
        opsiD: String(rows[i][8] || ''),
        kunciJawaban: String(rows[i][9] || 'B').toUpperCase(),
        penjelasan: String(rows[i][10] || '')
      };
    }
  }

  setGasCache(cacheKey, map, 21600); // 6 jam
  return map;
}

function apiSimpanMateriKuis(habitId, payload) {
  var ss = getSpreadsheet();
  var sheet = ss.getSheetByName('MateriKuis');
  if (!sheet) {
    setupDatabase();
    sheet = ss.getSheetByName('MateriKuis');
  }

  var hid = Number(habitId);
  var data = sheet.getDataRange().getValues();
  var rowIndex = -1;

  for (var i = 1; i < data.length; i++) {
    if (Number(data[i][0]) === hid) {
      rowIndex = i + 1;
      break;
    }
  }

  var rowVals = [
    hid,
    payload.judulMateri || '',
    payload.deskripsiMateri || '',
    payload.linkYoutube || '',
    payload.pertanyaan || '',
    payload.opsiA || '',
    payload.opsiB || '',
    payload.opsiC || '',
    payload.opsiD || '',
    (payload.kunciJawaban || 'B').toUpperCase(),
    payload.penjelasan || ''
  ];

  if (rowIndex > 0) {
    sheet.getRange(rowIndex, 1, 1, rowVals.length).setValues([rowVals]);
  } else {
    sheet.appendRow(rowVals);
  }

  clearGasCache(['materi_kuis_all']);
  return { success: true, message: 'Materi & Kuis Misi ' + hid + ' berhasil disimpan oleh Guru!' };
}
