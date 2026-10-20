# 🌟 LMS Educeria - 7 Kebiasaan Anak Indonesia Hebat
### Frontend Modern (Vite + React + Tailwind CSS) & Backend Google Apps Script (Google Sheets)

Aplikasi Web modern berbasis **Vite + React** yang dirancang khusus untuk pembiasaan 7 Karakter Anak Indonesia Hebat dengan tampilan **Mobile-First Glassmorphism** (sesuai referensi desain UI 8 layar HP), terhubung ke database **Google Sheets** melalui REST API **Google Apps Script**.

---

## 🚀 Fitur Utama Frontend

1. **Mobile-First Experience (Prioritas Tampilan HP)**:
   - Didesain pas di layar smartphone (`max-w-md`) dengan navigasi bawah mengambang 4 tab: **Beranda**, **Kelas**, **Notifikasi**, dan **Lainnya (Profil)**.
2. **3-Step Habit Wizard**:
   - **Langkah 1**: Pilihan jam / aktivitas kebiasaan (Jam melingkar & preset cepat).
   - **Langkah 2**: Video YouTube materi edukasi yang dikelola guru + modal player in-app.
   - **Langkah 3**: Kuis singkat interaktif pilihan ganda A–D dengan pembahasan dan umpan balik otomatis.
3. **Modal Perayaan Misi Selesai**:
   - Animasi maskot melompat, medali emas, +10 XP, Level 2, dan lencana pencapaian.
4. **Panel Monitoring Guru & Kepsek**:
   - Matriks 7 kebiasaan siswa per kelas harian.
   - Form pengelolaan materi video YouTube & soal kuis per kebiasaan yang langsung terhubung ke layar siswa.
5. **Koneksi REST API Google Apps Script**:
   - Menggunakan format `fetch()` teks/JSON bebas hambatan CORS (*Cross-Origin Resource Sharing*).

---

## 📦 Struktur Repositori

```text
├── src/
│   ├── components/
│   │   ├── BottomNav.jsx         # Navigasi bawah 4 tab mobile
│   │   ├── DashboardSiswa.jsx    # Beranda siswa, notifikasi, aktivitas & profil
│   │   ├── HabitWizard.jsx       # Alur 3-langkah habit (1 s/d 7)
│   │   ├── DashboardGuru.jsx     # Monitoring kelas & kelola materi kuis guru
│   │   └── Login.jsx             # Halaman login multi-peran & set URL backend
│   ├── services/
│   │   └── api.js                # Layanan REST API fetch ke Google Apps Script
│   ├── App.jsx                   # Router & shell aplikasi utama
│   ├── main.jsx                  # Entry point React
│   └── index.css                 # Konfigurasi Tailwind CSS & font
├── index.html                    # HTML root Vite
├── package.json                  # Dependensi React & Vite
├── vite.config.js                # Konfigurasi build (base path './' untuk GitHub Pages)
├── tailwind.config.js            # Tema & warna Tailwind
├── Kode.gs                       # Backend REST API Google Apps Script
└── README.md
```

---

## 🛠️ Cara Menjalankan di Komputer Lokal

1. **Buka Terminal / Command Prompt** di folder ini:
   ```bash
   cd c:\Users\freza\Music\new
   ```

2. **Pasang Dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan Server Lokal**:
   ```bash
   npm run dev
   ```
   Buka alamat yang muncul (biasanya `http://localhost:5173`) di browser Anda.

---

## 🌐 Cara Menghubungkan ke Backend Google Apps Script

1. Buka [Google Sheets](https://sheets.new) dan buka editor **Apps Script** (`Ekstensi > Apps Script`).
2. Salin isi file [`Kode.gs`](./Kode.gs) ke editor Apps Script Anda.
3. Jalankan fungsi **`setupDatabase`** sekali untuk membuat seluruh sheet (`Pengaturan`, `Guru`, `Siswa`, `Habit1` s/d `Habit7`, dan `MateriKuis`).
4. Klik **Deploy (Terapkan)** > **New deployment (Penerapan baru)**:
   - Pilih jenis: **Web app (Aplikasi web)**.
   - Execute as: **Me (email Anda)**.
   - Who has access: **Anyone (Siapa saja)**.
   - Klik **Deploy** dan salin **Web App URL** (yang berakhiran `/exec`).
5. Pada aplikasi React (di halaman Login), klik ikon **Server** di pojok kanan atas, lalu tempelkan Web App URL tersebut. Klik **Simpan URL**.

---

## 🐙 Cara Migrasi / Unggah ke GitHub

1. **Inisialisasi Repositori Git**:
   ```bash
   git init
   git add .
   git commit -m "feat: migrasi frontend ke Vite React dengan REST API GAS"
   ```

2. **Buat Repositori Baru di GitHub**:
   - Buka [GitHub](https://github.com/new) dan buat repositori baru (misal: `lms-7kebiasaan-react`).

3. **Hubungkan & Push ke GitHub**:
   ```bash
   git remote add origin https://github.com/USERNAME_ANDA/lms-7kebiasaan-react.git
   git branch -M main
   git push -u origin main
   ```

4. **Deploy Gratis ke GitHub Pages / Vercel**:
   - **Vercel / Netlify**: Cukup *import* repositori GitHub Anda di Vercel, klik **Deploy**. Otomatis aktif dalam 1 menit!
   - **GitHub Pages**: Jalankan `npm run build`, lalu unggah isi folder `dist/` ke branch `gh-pages`.
