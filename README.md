# Dapur Sabana — Website Bakery Artisan

Website statis empat halaman untuk **Dapur Sabana**, bakery artisan fiktif di Sleman,
Yogyakarta. Dibangun dari brief studi kasus desain: palet krem dan cokelat tua, foto
natural, target utama klien korporat yang memesan hampers, kue pernikahan, dan katering acara.

> **Catatan kejujuran:** ini website demo untuk portofolio. Bisnisnya fiktif, alamat,
> nomor telepon, harga, dan testimoni adalah contoh. Form tidak mengirim data ke mana pun.

**Live demo:** <https://compavel.github.io/dapur-sabana/>
**Repo:** <https://github.com/compavel/dapur-sabana>

---

## Latar belakang masalah

Bakery kecil biasanya menerima pesanan lewat WhatsApp dan Instagram. Untuk pesanan
korporat dalam jumlah besar, calon klien ingin melihat tiga hal sebelum menghubungi:
kualitas produk, rekam jejak acara sebelumnya, dan kejelasan harga serta alur pemesanan.

Website ini menjawab ketiganya lewat empat halaman yang saling terhubung, bukan satu
halaman panjang yang menumpuk semua informasi.

---

## Halaman

| Halaman | File | Isi |
| --- | --- | --- |
| Beranda | `index.html` | Hero, tentang, 3 produk andalan, teaser layanan, cuplikan galeri, testimoni, CTA |
| Galeri | `galeri.html` | Filter kategori, grid 8 proyek, lightbox, CTA |
| Layanan | `layanan.html` | 3 paket layanan, alur 4 langkah, 6 FAQ, form konsultasi |
| Kontak | `kontak.html` | Kartu kontak, peta ilustrasi, form pesan, info kunjungan, FAQ mini |

---

## Fitur teknis

- **Responsif** dari 1440px sampai 390px, diuji di kedua lebar tersebut.
- **Filter galeri** tanpa reload, dengan jumlah proyek yang ikut berubah dan status
  `aria-pressed` pada tombol.
- **Lightbox** memakai elemen native `<dialog>`: fokus kembali ke tombol pemicu saat ditutup,
  bisa ditutup lewat tombol, klik backdrop, atau `Esc`.
- **Navigasi mobile** dengan tombol hamburger, `aria-expanded`, tutup lewat `Esc`, dan reset
  otomatis saat layar dilebarkan.
- **Form demo** memakai validasi HTML (`required`, `type`, `pattern`) dan menampilkan pesan
  sukses yang menyatakan data tidak dikirim. Setelah submit, field direset.
- **Progressive enhancement**: animasi reveal hanya aktif kalau JavaScript jalan. Tanpa JS,
  semua konten tetap terlihat — bukan halaman kosong.
- **`prefers-reduced-motion`**: marquee berhenti dan animasi dimatikan.
- **Skip link**, `aria-current` pada navigasi aktif, label pada semua input, dan `alt`
  deskriptif pada setiap gambar.
- **Kontras**: warna tombol digelapkan ke `#7e4726` karena caramel `#c8956c` tidak lolos
  kontras teks putih.

---

## Tech stack

- HTML, CSS, dan JavaScript vanilla — tanpa framework, tanpa build step.
- Google Fonts: **Fraunces** (display) dan **DM Sans** (body), dengan fallback Georgia/system.
- Tailwind **tidak** dipakai; style ditulis sebagai satu stylesheet dengan CSS custom properties.
- `scripts/server.mjs` — server statis kecil berbasis Node untuk preview lokal (bukan bagian produksi).

---

## Menjalankan

Butuh Node.js 18+ (hanya untuk server preview).

```bash
node scripts/server.mjs
```

Buka <http://127.0.0.1:8123>. Port bisa diganti:

```powershell
$env:PORT=9000; node scripts/server.mjs
```

Bisa juga membuka `index.html` langsung di browser, tapi font Google butuh koneksi internet
dan beberapa browser membatasi `fetch` untuk file lokal.

---

## Deploy

Tanpa build step, jadi cukup dipublikasikan sebagai file statis:

- **GitHub Pages** — branch `main`, path `/`. File `.nojekyll` mencegah Jekyll memproses
  folder yang diawali garis bawah (mis. `_*`).
- URL: <https://compavel.github.io/dapur-sabana/>

Setiap push ke `main` memicu rebuild otomatis (±1 menit). Kalau halaman masih 404 setelah
push, cek status build di *Settings → Pages* atau lewat
`gh api repos/compavel/dapur-sabana/pages/builds/latest`.

---

## Struktur

```
dapur-sabana/
├─ index.html
├─ galeri.html
├─ layanan.html
├─ kontak.html
├─ .nojekyll                # matikan pemrosesan Jekyll di GitHub Pages
├─ assets/
│  ├─ css/style.css        # design tokens, komponen, responsive, print
│  ├─ js/main.js           # header, nav, reveal, filter, lightbox, form
│  └─ img/                 # 16 foto + favicon.svg
├─ docs/screenshots/       # tangkapan layar untuk dokumentasi
├─ scripts/server.mjs      # server statis lokal
└─ mockup-suite.html       # mockup, wireframe, dan style guide sebelum coding
```

`mockup-suite.html` adalah arsip proses desain: moodboard, palet, tipografi, wireframe
desktop dan mobile, plus mockup tiap halaman sebelum dijadikan HTML.

---

## Foto

Semua foto berasal dari [Unsplash](https://unsplash.com) dan dipakai sesuai lisensi Unsplash.
Kredit tercantum di footer setiap halaman. Ukuran sudah dikompres: 16 foto, total ±3 MB,
sisi terpanjang maksimal 1400px, kualitas JPEG 72–80.

Sesuai brief asli, seharusnya memakai foto milik klien. Karena kliennya fiktif, foto Unsplash
dipakai sebagai pengganti dan tidak diklaim sebagai hasil produksi Dapur Sabana.

---

## Yang sudah diverifikasi

Diuji dengan Chrome headless (Playwright) terhadap server lokal:

- 4 halaman × 2 viewport (1440px dan 390px): semua `200 OK`.
- 0 error console, 0 request gagal (≥400), 0 gambar gagal dimuat.
- 0 horizontal overflow di semua kombinasi halaman dan viewport.
- Filter galeri: "Hampers" menampilkan 2 dari 8 proyek, teks penghitung ikut berubah.
- Lightbox: terbuka, gambar termuat, judul benar, tertutup lewat tombol.
- Form layanan dan kontak: pesan sukses muncul, field ter-reset, tanpa error console.
- Navigasi mobile: `aria-expanded` berubah `true`/`false`, panel terlihat saat dibuka.
- Semua tautan internal mengarah ke halaman yang ada (status 200).
- Galeri: 8 tile berukuran identik (aspect ratio 4:3) di 1440px, 1280px, 700px, dan 390px —
  tidak ada tile yang lebih tinggi atau lebih lebar dari yang lain.
- Situs live di GitHub Pages: halaman utama, `galeri.html`, dan `assets/css/style.css`
  membalas `200 OK` dan berisi versi terbaru.

Yang **belum** diuji: pembaca layar sungguhan, Safari/Firefox, dan perangkat fisik.
Kontras dicek manual, bukan dengan alat otomatis.

---

## Keterbatasan yang diketahui

- Tidak ada backend. Form hanya menampilkan pesan sukses di sisi klien.
- Peta masih ilustrasi CSS, bukan embed Google Maps.
- Data produk, harga, dan testimoni ditulis langsung di HTML.
- Tautan Instagram mengarah ke `instagram.com` umum, bukan akun nyata.
- Belum ada `srcset`/WebP/AVIF; foto masih JPEG satu ukuran.
- Lightbox belum punya navigasi geser antarproyek.

---

## Pengembangan berikutnya

1. Ganti foto Unsplash dengan foto produk asli dan tambahkan `srcset` + WebP.
2. Pisahkan data produk ke file JSON supaya halaman katalog lebih mudah dirawat.
3. Tambah halaman detail produk dengan schema.org `Product`.
4. Sambungkan form ke endpoint nyata (mis. Formspree atau backend Laravel) plus proteksi spam.
5. Embed peta sungguhan dan tombol "Buka di Maps" dengan koordinat tepat.
6. Audit aksesibilitas dengan pembaca layar dan uji lintas browser.

---

## Penulis

**Tegar Raditya Permana Putra**
Studi kasus desain + implementasi front-end.
