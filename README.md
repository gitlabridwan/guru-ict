# ZuperVerse lengkap — GitHub Pages + server mandiri

Frontend berdasarkan halaman publik ZuperVerse, dilengkapi implementasi backend mandiri. Frontend mempertahankan tampilan dan mesin game sumber. Backend ditulis untuk kontrak API yang dipanggil frontend; ini bukan salinan kode server privat, database, akun, atau layanan pembayaran situs asal.

**Mulai dari [PANDUAN_LANGKAH_DEMI_LANGKAH.md](PANDUAN_LANGKAH_DEMI_LANGKAH.md).** Versi panduan yang dapat dibuka langsung di browser: `BUKA_PANDUAN.html`.

## Isi paket

| Folder/berkas | Fungsi |
| --- | --- |
| `docs/` | Seluruh website yang diunggah ke GitHub Pages |
| `docs/admin.html` | Aktivasi akun guru, batas kelas, status, reset sandi |
| `docs/setup.html` | Pemeriksaan koneksi server dan unduhan konfigurasi |
| `backend/src/` | API akun, paket, kelas, murid, nilai dan server WebSocket |
| `backend/migrations/` | Struktur database D1 |
| `backend/tests/` | Pengujian API dan WebSocket dengan database lokal |
| `backend/wrangler.jsonc` | Pengaturan deploy server Cloudflare |
| `scripts/configure.mjs` | Mengisi alamat server dan izin origin website |
| `STATUS_FITUR.md` | Fitur, hasil verifikasi dan batas implementasi |

## Perbedaan dengan ZIP sebelumnya

Sekarang kode frontend berada di **`docs/`**. Pada GitHub Pages pilih **main → /docs**, bukan `/(root)`. Folder backend tidak dijalankan oleh GitHub Pages; deploy secara terpisah ke Cloudflare Workers.

Frontend dapat dipakai dalam mode lokal tanpa server. Fitur akun, kelas dan live memerlukan pemasangan backend sesuai panduan. Tidak ada kredensial produksi atau kata sandi bawaan di dalam paket.

## Perintah pengembang

```bash
cd backend
npm ci
npm run db:local
npm run dev
```

Buka `http://localhost:8787/`. Untuk pengujian terisolasi: `npm test`. Test menggunakan database sementara, bukan database produksi. `npm test` melakukan build dry-run terlebih dahulu.

## Atribusi

Identitas ZuperVerse / Zuper Guru dipertahankan dari situs sumber. Atribusi aset, Three.js, serta font terdapat pada `docs/NOTICE.md` dan `docs/licenses/`. Penambahan backend, admin dan panduan tidak memberikan lisensi baru atas karya sumber.
