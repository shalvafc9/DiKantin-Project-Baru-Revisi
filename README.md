# DiKantin — web mobile

Prototipe web pemesanan makanan kantin kampus dengan tampilan khusus ponsel, warna lembut, oranye hangat, dan hijau tua.

## Menjalankan di VS Code

1. Buka folder proyek melalui **File → Open Folder...**.
2. Pasang ekstensi **Live Server** jika belum terpasang.
3. Buka **index.html**, lalu klik **Go Live** di pojok kanan bawah.
4. Untuk melihat ukuran ponsel di Chrome atau Edge, tekan **F12**, lalu **Ctrl + Shift + M**. Pilih ukuran sekitar 390 × 844.

Tidak perlu memasang npm atau server backend.

## Alur prototipe

1. Masuk dengan NIM atau pilih **Lanjut jelajah sebagai tamu**.
2. Pilih **Makan di tempat** atau **Ambil sendiri**.
3. Pilih kantin fakultas. Mode dine-in membuka simulasi scan meja; mode ambil sendiri langsung ke tenant.
4. Pilih tenant dan menu memakai tombol kecil **Pilih tenant** dan **Pilih menu**. Daftar menu juga tersedia melalui kartu rekomendasi bergambar.
5. Tambahkan menu ke keranjang, lalu lanjutkan ke pembayaran QRIS demo.
6. Simulasikan pembayaran, lihat pelacakan, dan isi ulasan.
7. Tombol **Profil** di navigasi bawah membuka profil demo Budi Santos.

Navigasi bawah hanya menampilkan **Beranda** dan **Profil**. Tombol lokasi Kantin Pusat di header beranda sudah dihilangkan.

## Struktur file

- **index.html** — halaman awal dan pemanggil CSS/JavaScript.
- **style.css** — warna, komponen, tata letak, dan tampilan ponsel.
- **app.js** — data contoh, halaman profil, dan interaksi prototipe.
- **assets/** — foto makanan, suasana kantin, dan logo DiKantin.
- **Tutorial-VS-Code.md** — panduan menyimpan dan menerbitkan revisi.

## Batasan demo

Login, scan QR, pembayaran QRIS, pelacakan, dan ulasan hanya simulasi di browser. Profil menggunakan data contoh Budi Santos dan NIM 2504. Kode QR pada halaman pembayaran tidak dapat dipindai dan tidak melakukan transaksi.
