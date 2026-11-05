# Kontrak backend mandiri

Semua endpoint mengembalikan JSON kecuali aset dan upgrade WebSocket. Endpoint tulis menggunakan POST dengan `Content-Type: application/json`. Maksimal body 2 MiB. Origin website harus diizinkan dalam `ALLOWED_ORIGINS`; origin Worker sendiri selalu diterima. Error memakai `{ "error": "pesan", "kode": "opsional" }` dan status HTTP yang sesuai.

## Identitas

- Guru: body `lic: {sess: "token sesi"}`. Token didapat dari daftar/masuk dan disimpan sebagai hash pada server. Sesi berlaku 30 hari; maksimal 10 sesi per guru.
- Operasi kelas guru: tambahkan `kode` kelas dan `pin` enam angka. Akun harus pemilik kelas.
- Murid: body `kode` dan `token` yang diperoleh dari `/murid/masuk`.
- Pendamping: body `kode` dan `lic: {pdp: "token pendamping"}`. Hanya endpoint dashboard yang memberikan akses baca.
- Admin: header `Authorization: Bearer ADMIN_TOKEN`. Kunci dibuat dengan secret Worker; tidak ditanam dalam kode publik.

## Endpoint

| Kelompok | Endpoint |
| --- | --- |
| Status publik | `GET /health`, `GET /`, `GET /setelan` |
| Akun guru | `POST /akun/daftar`, `/akun/masuk`, `/akun/google`, `/akun/saya`, `/akun/ubah`, `/akun/sandi`, `/akun/keluar` |
| Draft dan kelas guru | `POST /guru/soal/simpan`, `/guru/soal/ambil`, `/guru/kelas` |
| Paket pribadi | `POST /paket/simpan`, `/paket/daftar`, `/paket/ambil`, `/paket/publik`, `/paket/hapus`, `/paket/hasil` |
| Paket publik | `GET /paket/:kode` |
| Bank soal | `POST /bank/cari`, `/bank/ambil`, `/bank/terbit` |
| Kelas | `POST /kelas/buat`, `/kelas/paket`, `/kelas/paket/ambil`, `/kelas/ubah`, `/kelas/kunci`, `/kelas/rekap` |
| Info kelas/pembaruan | `GET /kelas/:kode`, opsional `?v=VERSI` |
| Murid | `POST /murid/masuk`, `/murid/blokir`, `/murid/hapus`, `/murid/riwayat` |
| Catatan belajar | `POST /catat` |
| Dashboard | `POST /dashboard` |
| Tantangan | `POST /tantangan/simpan`, `/tantangan/daftar`, `/tantangan/mulai`, `/tantangan/go`, `/tantangan/hapus`, `/tantangan/koreksi` |
| Kode main | `POST /main/cek` |
| Pendamping | `POST /pendamping/buat`, `/pendamping/masuk`, `/pendamping/cabut` |
| Admin | `POST /admin/guru`, `/admin/aktivasi`, `/admin/sandi` |
| Real-time | Upgrade `GET /kelas?kode=KODE&token=TOKEN` atau `&guru=1` diikuti pesan auth |

Struktur payload kelas, paket, nilai dan tantangan mengikuti pemanggilan dalam `docs/assets/game.js`. File test integrasi menyediakan contoh permintaan untuk alur utamanya.

## Pencatatan hasil

`/catat` menerima `cid`, `kode`, `token`, `sesi`, `jawaban` dan/atau `materi`. Kombinasi murid dan `cid` yang sudah diterima tidak ditulis lagi. Tantangan sekali kirim memakai kunci unik per murid dan putaran tantangan. Nilai tidak dipercaya hanya dari angka yang dikirim klien; jawaban yang dikenali diperiksa lagi terhadap paket.

Dashboard memakai array posisi yang dibaca frontend sumber: sesi 17 kolom, jawaban 11 kolom dan materi 4 kolom. Konversi terpusat pada `src/data.js`. Murid tidak memperoleh daftar nilai murid lain melalui API.

## WebSocket

Pesan frontend: `hi`, `z`, `p`, `o`, `e`, `sc`, `st`, `siap`; guru juga memakai `auth`, `ann`, `call`, `go`. Pesan server: `ok`, `all`, `join`, `left`, `p`, `o`, `e`, `roster`, `st`, `ev`, `go`, `ann`, `call`, `err`.

Murid diverifikasi saat handshake. Guru wajib mengirim `auth` berisi sesi dan PIN. Koneksi guru tanpa autentikasi ditutup setelah batas waktu. Role observer tidak menghasilkan avatar. Pesan gerakan hanya diteruskan pada zona yang sama; daftar kehadiran terbatas pada kelas terkait. Pesan emoji/frasa murid dibatasi ke daftar bawaan. Event nilai pada dashboard berasal dari pencatatan server.

Kelas dipisahkan memakai Durable Object berdasarkan kode. Tindakan mulai/akhiri tetap disimpan melalui API sebelum disiarkan, sehingga polling REST dapat memulihkan perubahan saat socket terputus.
