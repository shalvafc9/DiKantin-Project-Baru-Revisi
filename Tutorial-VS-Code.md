# Tutorial revisi DiKantin di VS Code

## Revisi yang sudah masuk

- Tombol **Profil** sekarang membuka halaman profil pengguna demo Budi Santos (NIM 2504).
- Kartu **+30 Poin DiKantin** di halaman pesanan selesai dihapus.
- Tombol besar **Pilih tenant** dan **Pilih menu** diganti menjadi tombol kecil. Daftar tetap bisa dibuka dan dicari.
- Halaman tenant kini menampilkan kartu **Rekomendasi buat kamu** dengan foto menu dan tombol tambah.
- Tombol lokasi **Kantin Pusat** di bagian atas beranda dihilangkan.
- Halaman awal memiliki pintasan **Pemilik tenant** dan **Pengelola**.
- Dashboard pemilik tenant dapat menerima pesanan demo, mengubah status pesanan, serta melihat penjualan harian. Laporan bulanan terkunci sampai **Premium** diaktifkan lewat tombol simulasi.
- Dashboard pengelola menampilkan ringkasan transaksi demo lintas tenant dan dapat difilter per tenant.

## Melihat perubahan di VS Code

1. Buka folder **DiKantin-Project-Baru** yang terhubung ke GitHub.
2. Tekan **Ctrl + S** untuk menyimpan file yang terbuka.
3. Jika **Live Server** belum berjalan, buka **index.html** lalu klik **Go Live** di pojok kanan bawah.
4. Coba klik **Profil** di navigasi bawah. Di halaman awal, gunakan **Pemilik tenant** untuk mencoba pembaruan status pesanan dan aktivasi Premium demo, atau **Pengelola** untuk memfilter aktivitas tenant.

## Mengirim revisi ke GitHub

1. Klik ikon **Source Control** di sisi kiri VS Code.
2. Ketik pesan commit, misalnya `Tambah dashboard tenant dan pengelola`.
3. Klik **Commit**. Jika muncul pertanyaan untuk memasukkan semua perubahan ke commit, klik **Yes**.
4. Klik ikon **Sync Changes** (dua panah melingkar) di samping nama branch `main` pada bagian bawah VS Code. Jika ada konfirmasi sinkronisasi, klik **OK**.
5. Tunggu selesai. GitHub Pages akan menerbitkan perubahan; muat ulang halaman situs setelah beberapa menit.

## Jika ini pertama kali mengaktifkan GitHub Pages

Di repository GitHub, buka **Settings → Pages**. Pada **Build and deployment**, pilih **Deploy from a branch**, pilih **main** dan **/(root)**, lalu klik **Save**. Tautan situs akan muncul di bagian **GitHub Pages** setelah proses penerbitan selesai.

## Catatan

Login, profil, scan QR, pembayaran QRIS, dashboard tenant/pengelola, dan Premium adalah simulasi. Pesanan demo serta statusnya disimpan hanya di browser yang sama dan tidak tersinkron ke perangkat lain. Aktivasi Premium hanya membuka laporan contoh dan tidak memproses pembayaran. Untuk transaksi sungguhan, akun yang aman, transparansi lintas perangkat, dan laporan resmi diperlukan backend dan database.
