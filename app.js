const root = document.querySelector("#app");

const state = {
  screen: "login",
  history: [],
  mode: "dinein",
  canteen: "Kantin Fakultas Teknik (FT)",
  table: "14",
  tenantIndex: 0,
  canteenFilter: "Semua",
  menuFilter: "Semua",
  query: "",
  tenantChosen: false,
  tenantExpanded: false,
  menuExpanded: false,
  tenantQuery: "",
  menuQuery: "",
  flash: false,
  voucherActive: true,
  selectedRatings: [],
  cart: { paket: 1, teh: 1, tahu: 1 },
};

const canteens = [
  {
    name: "Kantin Fakultas Teknik (FT)",
    place: "Gedung FT · Selasar Barat",
    distance: "150 m",
    time: "2 mnt jalan",
    rating: "4.8",
    tenants: "12 tenan",
    status: "Ramai",
    tag: "Antrean pendek",
    image: "assets/kantin-ft.png",
    description: "Area terbuka, banyak pilihan makan siang, dekat gazebo kampus.",
    keywords: "teknik ft dekat populer ramai",
  },
  {
    name: "Kantin Fakultas Ekonomi & Bisnis",
    place: "Plaza FEB · Lantai 1",
    distance: "300 m",
    time: "4 mnt jalan",
    rating: "4.9",
    tenants: "15 tenan",
    status: "Buka",
    tag: "Banyak promo",
    image: "assets/kantin-feb.png",
    description: "Pilihan beragam, tersedia area ber-AC dan banyak tempat duduk.",
    keywords: "feb ekonomi bisnis promo populer",
  },
  {
    name: "Kantin Fakultas Kedokteran",
    place: "Gedung Pendidikan Terpadu FK",
    distance: "450 m",
    time: "6 mnt jalan",
    rating: "4.7",
    tenants: "8 tenan",
    status: "Buka",
    tag: "Menu seimbang",
    image: "assets/kantin-kedokteran.png",
    description: "Menu segar dan pilihan makanan yang lebih ringan.",
    keywords: "kedokteran sehat segar",
  },
  {
    name: "Kantin Fakultas Psikologi",
    place: "Gedung Psikologi Baru",
    distance: "500 m",
    time: "7 mnt jalan",
    rating: "4.9",
    tenants: "16 tenan",
    status: "Buka",
    tag: "Suasana nyaman",
    image: "assets/kantin-psikologi.png",
    description: "Tempat teduh dengan pilihan kopi, camilan, dan makanan berat.",
    keywords: "psikologi nyaman teduh kopi",
  },
];

const tenants = [
  { name: "Ayam Geprek Mas Agus", description: "Sambal uleg segar & ayam renyah", rating: "4.9", time: "10–15 mnt", price: "Rp14.000–25.000", image: "assets/geprek-komplit.png", tag: "Paling laris", status: "Buka" },
  { name: "Soto Seger Mbak Siti", description: "Soto ayam bening khas rumahan", rating: "4.8", time: "5–8 mnt", price: "Rp12.000–22.000", image: "assets/ayam-geprek.png", tag: "Favorit", status: "Buka" },
  { name: "Warung Nasi Padang Sabana", description: "Rendang, gulai kikil & sambal", rating: "4.9", time: "5–10 mnt", price: "Rp15.000–28.000", image: "assets/nasi-goreng.png", tag: "Menu berat", status: "Buka" },
  { name: "Kopi Mahasiswa & Toast", description: "Kopi susu gula aren dan roti bakar", rating: "4.7", time: "5–7 mnt", price: "Rp8.000–18.000", image: "assets/makan-di-kantin.png", tag: "Minuman", status: "Buka" },
];

const menuItems = [
  { id: "paket", name: "Paket Geprek Keju Mozarella", description: "Ayam renyah, sambal level 1–5, nasi hangat.", price: 22000, image: "assets/geprek-komplit.png", emoji: "🍗", category: "Paling laris" },
  { id: "teh", name: "Es Teh Kampul Jumbo", description: "Teh melati, jeruk segar, ukuran 500 ml.", price: 5000, image: "assets/es-teh-kampul.png", emoji: "🧋", category: "Minuman" },
  { id: "tahu", name: "Tahu Krispi Sambal Bawang", description: "Tahu goreng renyah dengan sambal gurih.", price: 6000, image: "assets/tahu-krispi.png", emoji: "🍢", category: "Camilan" },
  { id: "nasgor", name: "Nasi Goreng Padang", description: "Nasi berbumbu rempah dengan telur mata sapi.", price: 18000, image: "assets/nasi-goreng.png", emoji: "🍛", category: "Makanan berat" },
];

const ratingLabels = ["Porsi pas 👍", "Sambal mantap 🌶️", "Cepat & ramah ⚡", "Kemasan rapi 📦", "Harga mahasiswa 🎓"];

const paths = {
  back: '<path d="m15 18-6-6 6-6"/><path d="M20 12H9"/>',
  arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',
  shop: '<path d="M3 10h18l-1.4-6H4.4L3 10Z"/><path d="M5 10v10h14V10M9 20v-6h6v6"/><path d="M3 10a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0"/>',
  scan: '<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3"/><path d="M7 12h10M12 7v10"/>',
  receipt: '<path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z"/><path d="M9 8h6M9 12h6M9 16h3"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  bell: '<path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/>',
  pin: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  bowl: '<path d="M3 12h18l-2 7H5l-2-7Z"/><path d="M5 12a7 7 0 0 1 14 0M9 4l1 2M14 3l-1 3"/>',
  bag: '<path d="M5 8h14l1 13H4L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  search: '<circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 5 5"/>',
  star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z"/>',
  flash: '<path d="m13 2-9 12h7l-1 8 10-13h-7l1-7Z"/>',
  keypad: '<rect x="4" y="2.5" width="16" height="19" rx="2"/><path d="M8 7h.01M12 7h.01M16 7h.01M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M9 19h6"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  truck: '<path d="M3 6h11v12H3zM14 10h4l3 3v5h-7z"/><circle cx="7.5" cy="19" r="1.5"/><circle cx="17.5" cy="19" r="1.5"/>',
  shield: '<path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z"/><path d="m9 12 2 2 4-4"/>',
  cart: '<circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/><path d="M2 3h2l2.5 12h12L21 7H5"/>',
  ticket: '<path d="M3 7a2 2 0 0 0 0 4v6h18v-6a2 2 0 0 1 0-4V5H3v2Z"/><path d="M13 5v2M13 11v2M13 17v1"/>',
  location: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  clockfast: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2M3 3l2 2"/>',
  gift: '<rect x="3" y="9" width="18" height="12" rx="2"/><path d="M12 9v12M3 13h18M12 9H7.5a2.5 2.5 0 1 1 2.5-2.5V9ZM12 9h4.5A2.5 2.5 0 1 0 14 6.5V9Z"/>',
  phone: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/>',
  lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>',
  leaf: '<path d="M20 4c-8 0-14 3-14 10a6 6 0 0 0 6 6c7 0 10-6 8-16Z"/><path d="M4 21c3-5 7-8 12-11"/>',
};

function icon(name, extraClass = "") {
  return `<span class="icon ${extraClass}" aria-hidden="true"><svg viewBox="0 0 24 24">${paths[name] || paths.check}</svg></span>`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
}

function money(value) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value).replace(/\u00a0/g, " ");
}

function subtotal() {
  return menuItems.reduce((sum, item) => sum + item.price * (state.cart[item.id] || 0), 0);
}

function totalItems() {
  return Object.values(state.cart).reduce((sum, qty) => sum + qty, 0);
}

function totalPayable() {
  return Math.max(0, subtotal() + 1000 - (state.voucherActive ? 3000 : 0));
}

function go(screen) {
  if (state.screen !== screen) state.history.push(state.screen);
  state.screen = screen;
  render();
  window.scrollTo(0, 0);
}

function goBack() {
  state.screen = state.history.pop() || "home";
  render();
  window.scrollTo(0, 0);
}

function header(title = "", showBack = true, right = "") {
  return `<header class="topbar ${title ? "compact" : ""}">
    ${showBack ? `<button class="icon-button" type="button" data-action="back" aria-label="Kembali">${icon("back")}</button>` : ""}
    ${title ? `<div class="topbar-title">${title}</div>` : `<div class="brand"><span class="brand-mark brand-logo" role="img" aria-label="Logo DiKantin"></span><span class="brand-name">Di<span>Kantin</span></span></div>`}
    ${right || `<span class="topbar-space"></span>`}
  </header>`;
}

function navBar(active) {
  const items = [
    ["home", "Beranda", "home"],
    ["profile", "Profil", "user"],
  ];
  return `<nav class="bottom-nav" aria-label="Navigasi utama">${items.map(([action, label, glyph]) => `
    <button class="nav-item ${active === action ? "active" : ""}" type="button" data-action="nav-${action}">${icon(glyph)}<span>${label}</span></button>`).join("")}
  </nav>`;
}

function pageLogin() {
  return `<main class="page login-page">
    <div class="brand login-brand"><span class="brand-mark brand-logo" role="img" aria-label="Logo DiKantin"></span><span class="brand-name">Di<span>Kantin</span></span></div>
    <div class="login-hero">
      <div class="intro"><div class="eyebrow">Pesan makan di kantin, tanpa ribet</div><h1>Selamat datang<br />di kantin!</h1><p>Masuk dengan akun mahasiswa untuk pesan makanan dan bebas antre.</p></div>
    </div>
    <form class="card login-card" data-form="login">
      <div class="field"><label for="nim">Nomor Induk Mahasiswa (NIM)</label><div class="input-wrap">${icon("user")}<input id="nim" name="nim" inputmode="numeric" placeholder="Contoh: 2110512001" autocomplete="username" /></div><span class="field-hint">Gunakan NIM yang terdaftar di portal akademik.</span></div>
      <div class="field"><label for="password">Kata sandi akun</label><div class="input-wrap">${icon("lock")}<input id="password" name="password" type="password" placeholder="Masukkan kata sandi portal" autocomplete="current-password" /></div></div>
      <div class="checkbox-row"><label><input type="checkbox" checked /> Ingat NIM di perangkat ini</label><button class="text-link" type="button" data-action="forgot">Lupa kata sandi?</button></div>
      <button class="button" type="submit">Masuk dengan NIM &amp; Password ${icon("arrow")}</button>
      <div class="or-divider">OPSI MASUK LAINNYA</div>
      <button class="button outline-button" type="button" data-action="login-phone">${icon("phone")} Masuk dengan nomor HP / WhatsApp</button>
      <button class="button soft-button" type="button" data-action="login-guest">Lanjut jelajah sebagai tamu</button>
    </form>
    <div class="feature-note">${icon("bell")}<div><strong>Fitur siap diambil</strong><span>Dapat notifikasi saat makanan selesai dimasak.</span></div></div>
    <p class="login-footnote">Dengan masuk, kamu menyetujui <strong>Ketentuan Layanan</strong> &amp; <strong>Kebijakan Privasi</strong> DiKantin.<br />Dibuat untuk ekosistem kantin kampus yang hemat waktu.</p>
  </main>`;
}

function pageHome() {
  return `<main class="page">
    <header class="topbar">
      <div class="brand"><span class="brand-mark brand-logo" role="img" aria-label="Logo DiKantin"></span><span class="brand-name">Di<span>Kantin</span></span></div>
      <button class="icon-button small home-notifications" type="button" data-action="notifications" aria-label="Notifikasi">${icon("bell")}</button>
    </header>
    <div class="greeting"><div><p>Halo, Budi Santos 👋</p><h1>Mau makan di mana<br />hari ini?</h1></div><span class="avatar">BS</span></div>
    <section class="promo-card"><div class="promo-content"><span class="promo-badge">PROMO SPESIAL KAMPUS</span><h2>Paket kenyang<br />hemat ujian!</h2><p>Makan siang hemat di kantin fakultas pilihanmu.</p><span class="promo-code">DISKON S/D 40% · KAMPUSHEMAT</span></div></section>
    <section class="section"><div class="section-head"><h2>Pilih cara menikmati</h2><span class="tiny-text muted">2 layanan</span></div>
      <div class="service-grid">
        <button class="service-card primary-service" type="button" data-action="choose-mode" data-mode="dinein"><span class="service-illustration">${icon("bowl")}</span><strong>Makan di tempat</strong><small>Duduk santai, pesanan diantar ke meja.</small><span class="service-arrow">${icon("arrow")}</span></button>
        <button class="service-card pickup" type="button" data-action="choose-mode" data-mode="pickup"><span class="service-illustration">${icon("bag")}</span><strong>Ambil sendiri</strong><small>Pesan dulu, ambil tanpa antre.</small><span class="service-arrow">${icon("arrow")}</span></button>
      </div>
    </section>
    <section class="section tip-card">${icon("clockfast", "tip-icon")}<div><strong>Tips: pesan sebelum jam 12.00</strong><span>Ambil makanan saat jeda kelas tanpa perlu mengantre.</span></div></section>
  </main>`;
}

function filteredCanteens() {
  const query = state.query.trim().toLowerCase();
  return canteens.filter((item) => {
    const matchesText = !query || `${item.name} ${item.place} ${item.keywords}`.toLowerCase().includes(query);
    const matchesFilter = state.canteenFilter === "Semua" || (state.canteenFilter === "Terdekat" ? item.distance === "150 m" || item.distance === "300 m" : state.canteenFilter === "Populer" ? item.rating >= "4.8" : item.status === "Buka");
    return matchesText && matchesFilter;
  });
}

function resetTenantPicker() {
  state.tenantChosen = false;
  state.tenantExpanded = false;
  state.menuExpanded = false;
  state.tenantQuery = "";
  state.menuQuery = "";
}

function pageCanteens() {
  const list = filteredCanteens();
  const filters = ["Semua", "Terdekat", "Populer", "Buka sekarang"];
  return `<main class="page">
    ${header("Pilih kantin", true, `<span class="session-pill">${state.mode === "dinein" ? "Makan di tempat" : "Ambil sendiri"}</span>`)}
    <div class="intro"><div class="eyebrow">Area kampus</div><h1>Pilih kantin fakultas<br />favoritmu</h1><p>Lokasi kantin dipakai untuk menampilkan tenant dan memperkirakan waktu pesanan.</p></div>
    <div class="search-box">${icon("search")}<input class="search-input" data-search="canteen" type="search" placeholder="Cari kantin, fakultas, atau gedung..." value="${escapeHtml(state.query)}" /></div>
    <div class="filter-row">${filters.map((filter) => `<button class="chip ${state.canteenFilter === filter ? "active" : ""}" type="button" data-action="canteen-filter" data-filter="${filter}">${filter}</button>`).join("")}</div>
    <div class="section-head"><h2>Daftar kantin fakultas</h2><span class="tiny-text muted">${list.length} lokasi</span></div>
    <div class="canteen-list">${list.length ? list.map((canteen) => {
      const index = canteens.indexOf(canteen);
      return `<article class="card canteen-card" data-canteen-card data-searchable="${escapeHtml(`${canteen.name} ${canteen.place} ${canteen.keywords}`.toLowerCase())}">
        <div class="canteen-image"><img src="${canteen.image}" alt="Hidangan di ${escapeHtml(canteen.name)}" /><span class="image-tag">${canteen.tag}</span></div>
        <div class="canteen-body"><div class="canteen-title-row"><h3>${escapeHtml(canteen.name)}</h3><span class="rating"><span class="rating-star">★</span>${canteen.rating}</span></div>
          <div class="canteen-meta"><span>${icon("pin")} ${canteen.distance} · ${canteen.time}</span><span><i class="open-dot"></i>${canteen.status}</span><span>${canteen.tenants}</span></div>
          <p class="canteen-desc">${escapeHtml(canteen.place)} · ${escapeHtml(canteen.description)}</p>
          <button class="button green-button" type="button" data-action="choose-canteen" data-index="${index}">${state.mode === "dinein" ? "Pilih &amp; lanjut scan meja" : "Pilih kantin &amp; lanjut"} ${icon("arrow")}</button>
        </div>
      </article>`;
    }).join("") : `<div class="card empty-state"><span class="icon">${icon("search")}</span><strong>Kantin belum ditemukan</strong><span>Coba kata kunci atau filter yang berbeda.</span></div>`}</div>
  </main>`;
}

function pageScan() {
  return `<main class="page">
    ${header("Scan meja", true, `<span class="session-pill">Kantin Teknik</span>`)}
    <div class="intro"><div class="eyebrow">Langkah 1 dari 2</div><h1>Scan QR<br />meja kantin</h1><p>Arahkan kamera ke stiker QR yang ada di meja kantin.</p></div>
    <div class="scan-context"><div><strong>${escapeHtml(state.canteen)}</strong><span>Mode ${state.mode === "dinein" ? "dine-in" : "pick up"} · Radius aktif</span></div>${icon("location", "green")}</div>
    <div class="scanner" role="img" aria-label="Simulasi tampilan pemindai QR"><span class="camera-label">KAMERA ${state.flash ? "· SENTER AKTIF" : "AKTIF"}</span><div class="finder"><span class="scan-line"></span><span class="scan-mark">${icon("scan")}</span></div></div>
    <p class="scan-instructions">Posisikan QR meja di dalam bingkai. Untuk tutorial ini, tombol simulasi akan membuka konfirmasi meja.</p>
    <div class="scan-controls"><button class="button outline-button" type="button" data-action="toggle-flash">${icon("flash")} ${state.flash ? "Matikan senter" : "Nyalakan senter"}</button></div>
    <button class="button green-button scan-success-button" type="button" data-action="scan-success">Simulasikan QR terdeteksi ${icon("arrow")}</button>
    <div class="notice">${icon("shield", "green")}<span>Pastikan kamu berada di meja yang sesuai agar pesanan dapat diantar oleh tenant.</span></div>
  </main>`;
}

function pageConfirm() {
  return `<main class="page">
    ${header("Konfirmasi meja", true)}
    <div class="intro"><div class="eyebrow">Meja berhasil dipindai</div><h1>Sudah duduk<br />di sini?</h1><p>Pastikan nomor meja benar sebelum memilih makanan.</p></div>
    <div class="confirm-illustration"><div class="table-number">${escapeHtml(state.table)}</div></div>
    <div class="confirm-table-title">Meja No. ${escapeHtml(state.table)} <span class="success-check">${icon("check")}</span></div>
    <p class="small-text muted" style="margin:0 0 13px">Kantin terhubung dan siap menerima pesananmu.</p>
    <div class="card confirm-card">
      <div class="confirm-data"><span>Lokasi</span><strong>${escapeHtml(state.canteen)}</strong></div>
      <div class="confirm-data"><span>Area</span><strong>Selasar Barat · dekat gazebo</strong></div>
      <div class="confirm-data"><span>Status QR</span><strong style="color:var(--green)">Terverifikasi ✓</strong></div>
    </div>
    <div style="margin-top:18px"><button class="button green-button" type="button" data-action="confirm-table">Ya, lanjut pilih tenant ${icon("arrow")}</button><button class="button outline-button" type="button" data-action="rescan">Bukan meja saya / scan ulang</button></div>
    <div class="notice">${icon("pin", "green")}<span>Nomor meja masih bisa diganti dari keranjang sebelum pembayaran.</span></div>
  </main>`;
}

function pageTenants() {
  const tenant = state.tenantChosen ? tenants[state.tenantIndex] : null;
  const tenantSearch = state.tenantQuery.trim().toLowerCase();
  const menuSearch = state.menuQuery.trim().toLowerCase();
  const tenantMatches = tenants.filter((item) => [item.name, item.description, item.tag].join(" ").toLowerCase().includes(tenantSearch));
  const menuMatches = menuItems.filter((item) => [item.name, item.description, item.category].join(" ").toLowerCase().includes(menuSearch));
  const tableSummary = state.mode === "dinein" ? ` · Meja ${escapeHtml(state.table)}` : "";
  const pickupSummary = state.mode === "dinein" ? `Meja ${escapeHtml(state.table)}` : "Ambil sendiri";
  return `<main class="page">
    ${header("Pilih tenant & menu", true)}
    <div class="session-pill">${icon("bowl")} ${escapeHtml(state.canteen)}${tableSummary}</div>
    <div class="intro" style="margin-top:16px"><div class="eyebrow">Pilih sesuai seleramu</div><h1>Mau makan<br />apa hari ini?</h1><p>Buka pilihan tenant dan menu, lalu cari nama warung atau makanan.</p></div>
    <div class="selector-shortcuts" role="group" aria-label="Pilihan tenant dan menu">
      <button class="chip ${state.tenantExpanded ? "active" : ""}" type="button" data-action="toggle-tenant-picker" aria-expanded="${state.tenantExpanded}">Pilih tenant</button>
      <button class="chip ${state.menuExpanded ? "active" : ""} ${!state.tenantChosen ? "chip-disabled" : ""}" type="button" data-action="toggle-menu-picker" aria-expanded="${state.menuExpanded}" aria-disabled="${!state.tenantChosen}">Pilih menu</button>
    </div>
    ${tenant ? `<div class="selected-tenant-note">Tenant dipilih: <strong>${escapeHtml(tenant.name)}</strong></div>` : `<p class="picker-note">Pilih tenant dahulu, lalu pilih menu yang kamu suka.</p>`}

    ${state.tenantExpanded ? `<section class="selector-panel card picker-panel">
      <div class="section-head"><h2>Pilih tenant</h2><span class="tiny-text muted">${tenantMatches.length} warung</span></div>
      <div class="search-box">${icon("search")}<input class="search-input" data-search="tenant" type="search" placeholder="Cari nama warung..." aria-label="Cari tenant" value="${escapeHtml(state.tenantQuery)}" /></div>
      <div class="selector-options">${tenantMatches.length ? tenantMatches.map((item) => {
        const index = tenants.indexOf(item);
        const selected = state.tenantChosen && state.tenantIndex === index;
        return `<button class="selector-option ${selected ? "selected" : ""}" type="button" data-action="select-tenant" data-index="${index}" data-tenant-option data-searchable="${escapeHtml([item.name, item.description, item.tag].join(" ").toLowerCase())}">
          <span class="selector-option-photo"><img src="${item.image}" alt="" /></span><span class="selector-option-copy"><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(item.description)} · ${item.time}</small></span><span class="selector-option-status">${selected ? "Dipilih ✓" : "Pilih"}</span>
        </button>`;
      }).join("") : `<div class="empty-state selector-empty"><strong>Warung tidak ditemukan</strong><span>Coba kata pencarian lain.</span></div>`}</div>
    </section>` : ""}

    ${state.menuExpanded && tenant ? `<section class="selector-panel card picker-panel">
      <div class="section-head"><h2>Menu ${escapeHtml(tenant.name)}</h2><span class="tiny-text muted">${menuMatches.length} menu</span></div>
      <div class="search-box">${icon("search")}<input class="search-input" data-search="menu" type="search" placeholder="Cari nama menu..." aria-label="Cari menu" value="${escapeHtml(state.menuQuery)}" /></div>
      <div class="selector-menu-list">${menuMatches.length ? menuMatches.map((item) => `<article class="card menu-item selector-menu-item" data-menu-option data-searchable="${escapeHtml([item.name, item.description, item.category].join(" ").toLowerCase())}">
        <span class="menu-item-image"><img src="${item.image}" alt="${escapeHtml(item.name)}" /></span>
        <div class="menu-item-main"><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.description)}</p><div class="menu-item-foot"><span class="price">${money(item.price)}</span><button class="add-button" type="button" data-action="add-item" data-id="${item.id}" aria-label="Tambah ${escapeHtml(item.name)}">+</button></div></div>
      </article>`).join("") : `<div class="empty-state selector-empty"><strong>Menu tidak ditemukan</strong><span>Coba kata pencarian lain.</span></div>`}</div>
    </section>` : ""}

    <section class="section recommendation-section">
      <div class="section-head"><h2>Rekomendasi buat kamu</h2><span class="tiny-text muted">${menuItems.length} menu</span></div>
      <div class="menu-recommendations">${menuItems.map((item) => `<article class="card recommendation-card">
        <img class="recommendation-photo" src="${item.image}" alt="${escapeHtml(item.name)}" />
        <div class="recommendation-copy"><span class="recommendation-category">${escapeHtml(item.category)}</span><h3>${escapeHtml(item.name)}</h3><div class="recommendation-foot"><span class="price">${money(item.price)}</span><button class="add-button" type="button" data-action="add-item" data-id="${item.id}" aria-label="Tambah ${escapeHtml(item.name)}">+</button></div></div>
      </article>`).join("")}</div>
    </section>
  </main>
  ${state.tenantChosen && totalItems() > 0 ? `<div class="cart-dock"><div class="cart-dock-inner"><div class="cart-dock-copy"><strong>${totalItems()} item di keranjang</strong><span>${money(subtotal())} · ${pickupSummary}</span></div><button class="button" type="button" data-action="open-cart">Lihat pesanan ${icon("arrow")}</button></div></div>` : ""}`;
}

function pageMenu() {
  const tenant = tenants[state.tenantIndex];
  const categories = ["Semua", "Paling laris", "Makanan berat", "Camilan", "Minuman"];
  const items = menuItems.filter((item) => state.menuFilter === "Semua" || item.category === state.menuFilter);
  return `<main class="page">
    ${header("Menu tenant", true, `<button class="icon-button small" type="button" data-action="open-cart" aria-label="Keranjang">${icon("cart")}</button>`)}
    <div class="menu-hero"><img src="${tenant.image}" alt="${escapeHtml(tenant.name)}" /><div class="menu-hero-caption"><h2>${escapeHtml(tenant.name)}</h2><p>${escapeHtml(tenant.description)} · ${tenant.rating} ★</p></div></div>
    <div class="menu-meta"><span class="session-pill">${icon("clock")} 10–15 menit</span><span class="session-pill">${icon("shield")} Higienis</span>${state.mode === "dinein" ? `<span class="session-pill">${icon("pin")} Meja ${escapeHtml(state.table)}</span>` : ""}</div>
    <div class="section-head"><h2>Menu favorit</h2><button class="text-link" type="button" data-action="open-cart">Lihat keranjang (${totalItems()})</button></div>
    <div class="filter-row">${categories.map((category) => `<button class="chip ${state.menuFilter === category ? "active" : ""}" type="button" data-action="menu-filter" data-filter="${category}">${category}</button>`).join("")}</div>
    <div>${items.map((item) => `<article class="card menu-item"><span class="menu-item-image">${item.image ? `<img src="${item.image}" alt="${escapeHtml(item.name)}" />` : `<span class="food-emoji">${item.emoji}</span>`}</span>
      <div class="menu-item-main"><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.description)}</p><div class="menu-item-foot"><span class="price">${money(item.price)}</span><button class="add-button" type="button" data-action="add-item" data-id="${item.id}" aria-label="Tambah ${escapeHtml(item.name)}">+</button></div></div>
    </article>`).join("")}</div>
  </main>
  <div class="cart-dock"><div class="cart-dock-inner"><div class="cart-dock-copy"><strong>${totalItems()} item di keranjang</strong><span>${money(subtotal())} · ${state.mode === "dinein" ? `Meja ${escapeHtml(state.table)}` : "Ambil sendiri"}</span></div><button class="button" type="button" data-action="open-cart">Lihat pesanan ${icon("arrow")}</button></div></div>`;
}

function pageCart() {
  const items = menuItems.filter((item) => (state.cart[item.id] || 0) > 0);
  return `<main class="page">
    ${header("Rincian pesanan", true)}
    <div class="intro"><div class="eyebrow">Canteen checkout</div><h1>Periksa pesananmu</h1><p>Satu langkah lagi, lalu makananmu mulai disiapkan tenant.</p></div>
    <div class="card order-location"><div class="order-location-top">${icon("pin", "green")}<div><strong>${escapeHtml(state.canteen)}${state.mode === "dinein" ? ` · Meja ${escapeHtml(state.table)}` : ""}</strong><p>Selasar Barat, dekat gazebo<br />${state.mode === "dinein" ? "Makan di tempat" : "Ambil sendiri"}</p></div><button class="text-link" type="button" data-action="rescan">Ubah</button></div><div class="eta-line">${icon("clock")} Estimasi siap saji 10–15 menit</div></div>
    <section class="section"><div class="section-head"><h2>Pesananmu (${totalItems()} item)</h2><button class="text-link" type="button" data-action="nav-canteens">Tambah menu</button></div>
      <div class="card card-pad">${items.length ? items.map((item) => `<div class="checkout-item"><span class="checkout-thumb">${item.image ? `<img src="${item.image}" alt="" />` : `<span class="food-emoji">${item.emoji}</span>`}</span><div class="checkout-copy"><strong>${escapeHtml(item.name)}</strong><span>${item.id === "paket" ? "Pedas level 3 · Nasi pulen" : item.id === "teh" ? "Es normal · manis sedang" : "Pedas gurih"}</span><div class="quantity" style="margin-top:7px"><button type="button" data-action="quantity" data-id="${item.id}" data-delta="-1" aria-label="Kurangi">−</button><span>${state.cart[item.id]}</span><button type="button" data-action="quantity" data-id="${item.id}" data-delta="1" aria-label="Tambah">+</button></div></div><div><div class="checkout-price">${money(item.price * state.cart[item.id])}</div></div></div>`).join("") : `<div class="empty-state"><strong>Keranjang masih kosong</strong><span>Tambahkan menu untuk melanjutkan pesanan.</span></div>`}</div>
    </section>
    <section class="section"><div class="section-head"><h2>Catatan untuk tenant</h2><span class="tiny-text muted">Opsional</span></div><div class="field" style="margin:0"><textarea placeholder="Contoh: sambalnya dipisah sedikit ya, terima kasih!" aria-label="Catatan untuk tenant"></textarea></div></section>
    <section class="section"><div class="section-head"><h2>Voucher kampus</h2></div><div class="card voucher">${icon("ticket")}<div class="voucher-copy"><strong>HEMAT MAHASISWA</strong><span>Potongan langsung Rp3.000</span></div><button class="text-link" type="button" data-action="toggle-voucher">${state.voucherActive ? "Terpasang ✓" : "Pakai"}</button></div></section>
    <section class="section"><div class="section-head"><h2>Metode pembayaran</h2><span class="tiny-text muted">Bebas biaya admin</span></div><div class="payment-choice"><span class="payment-logo">QRIS</span><div class="payment-choice-copy"><strong>QRIS otomatis</strong><span>Verifikasi instan, pesan langsung diteruskan</span></div><span class="radio-dot"></span></div></section>
    <section class="section"><div class="section-head"><h2>Rincian pembayaran</h2></div><div class="card card-pad">
      <div class="receipt-row"><span>Subtotal menu (${totalItems()} item)</span><strong>${money(subtotal())}</strong></div><div class="receipt-row"><span>Biaya layanan kampus</span><strong>${money(1000)}</strong></div><div class="receipt-row discount"><span>Diskon mahasiswa</span><strong>− ${money(state.voucherActive ? 3000 : 0)}</strong></div><div class="receipt-row total"><span>Total pembayaran</span><strong>${money(totalPayable())}</strong></div><p class="tiny-text muted" style="text-align:right">Termasuk pajak &amp; layanan</p>
    </div></section>
  </main><div class="sticky-pay"><button class="button ${items.length ? "" : "outline-button"}" type="button" data-action="pay">Bayar sekarang · ${money(totalPayable())} ${icon("arrow")}</button></div>`;
}

function qrMarkup() {
  const cells = [];
  const finderAt = (x, y, ox, oy) => {
    const dx = x - ox, dy = y - oy;
    if (dx < 0 || dy < 0 || dx > 6 || dy > 6) return null;
    return dx === 0 || dy === 0 || dx === 6 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4);
  };
  for (let y = 0; y < 25; y++) {
    for (let x = 0; x < 25; x++) {
      let dark = (Math.imul(x + 7, y + 13) + x * 3 + y * 11) % 7 < 3;
      for (const [fx, fy] of [[0, 0], [18, 0], [0, 18]]) {
        const finder = finderAt(x, y, fx, fy);
        if (finder !== null) dark = finder;
      }
      cells.push(`<span class="qr-cell ${dark ? "dark" : ""}"></span>`);
    }
  }
  return cells.join("");
}

function pagePayment() {
  return `<main class="page">
    ${header("Pembayaran QRIS", true)}
    <div class="payment-status"><span class="timer-dot"></span> Selesaikan dalam <strong>09:44</strong></div>
    <div class="card amount-card"><div class="eyebrow">Total pembayaran</div><strong>${money(totalPayable())}</strong><p>#DKT-2026-98124 · Kantin F. Teknik${state.mode === "dinein" ? ` · Meja ${escapeHtml(state.table)}` : " · Ambil sendiri"}</p></div>
    <section class="section card qris-card"><span class="qris-wordmark">QRIS</span><div class="qr-code" role="img" aria-label="Kode QR simulasi, tidak dapat dipindai">${qrMarkup()}</div><span class="qr-label">KODE DEMO · TIDAK DAPAT DIPINDAI</span><p class="small-text muted" style="text-align:center">Pembayaran ini hanya simulasi untuk melihat alur prototype.</p>
      <div class="bank-logos"><span>GoPay</span><span>OVO</span><span>DANA</span><span>ShopeePay</span><span>Mobile banking</span></div>
    </section>
    <section class="section card payment-instructions"><h3>Panduan pembayaran cepat</h3><div class="instruction-row"><span class="step-num">1</span><span>Buka aplikasi bank atau dompet digital yang mendukung QRIS.</span></div><div class="instruction-row"><span class="step-num">2</span><span>Pindai kode lalu pastikan nominalnya sesuai.</span></div><div class="instruction-row"><span class="step-num">3</span><span>Tekan tombol simulasi di bawah untuk lanjut melihat pelacakan pesanan.</span></div></section>
    <div class="payment-actions"><button class="button green-button" type="button" data-action="payment-success">Simulasikan pembayaran berhasil ${icon("check")}</button><button class="button outline-button" type="button" data-action="back">Kembali ke checkout</button></div>
  </main>`;
}

function pageTracking() {
  return `<main class="page">
    ${header("Pelacakan pesanan", true)}
    <section class="card tracking-hero"><div class="eyebrow">Live order tracker</div><h1>Makan siangmu<br />sedang disiapkan!</h1><p>Ayam Geprek Mas Agus sedang meracik bumbu sedap.</p><div class="tracking-hero-bottom"><div><span class="queue-label">NOMOR ANTREAN</span><span class="queue-number">#07</span></div><div class="eta-bubble"><strong>8–12 mnt</strong><span>Estimasi siap: 12.15 WIB</span></div></div></section>
    <section class="section"><div class="section-head"><h2>Alur pengerjaan</h2><span class="session-pill">Sedang dimasak</span></div>
      <div class="card timeline">
        <div class="timeline-step done"><span class="timeline-dot">${icon("check")}</span><div class="timeline-copy"><strong>Pesanan diterima &amp; dibayar</strong><span>Pembayaran QRIS berhasil dikonfirmasi.</span></div><span class="timeline-time">12.02</span></div>
        <div class="timeline-step current"><span class="timeline-dot">2</span><div class="timeline-copy"><strong>Sedang dimasak oleh tenant</strong><span>Chef menyiapkan ayam dan sambal level 3.</span></div><span class="timeline-time">12.05</span></div>
        <div class="timeline-step"><span class="timeline-dot">3</span><div class="timeline-copy"><strong>${state.mode === "dinein" ? "Pesanan siap diantar" : "Pesanan siap diambil"}</strong><span>${state.mode === "dinein" ? `Pesanan akan dikirim ke meja ${escapeHtml(state.table)}.` : "Pesanan dapat diambil di tenant kantin."}</span></div><span class="timeline-time">--:--</span></div>
        <div class="timeline-step"><span class="timeline-dot">4</span><div class="timeline-copy"><strong>Pesanan selesai</strong><span>Selamat menikmati kuliner kampus!</span></div><span class="timeline-time">--:--</span></div>
      </div>
    </section>
    <section class="section"><div class="section-head"><h2>${state.mode === "dinein" ? "Lokasi meja kamu" : "Lokasi pengambilan"}</h2>${state.mode === "dinein" ? `<button class="text-link" type="button" data-action="rescan">Ubah</button>` : ""}</div><div class="card order-location"><div class="order-location-top">${icon("pin", "green")}<div><strong>${state.mode === "dinein" ? `Meja ${escapeHtml(state.table)}` : "Ambil sendiri"}</strong><p>Area tengah · ${escapeHtml(state.canteen)}<br />Tenant: ${escapeHtml(tenants[state.tenantIndex].name)}</p></div></div></div></section>
    <section class="section"><div class="section-head"><h2>Ringkasan pesanan</h2><span class="tiny-text muted">3 item</span></div><div class="card order-summary-mini"><span class="summary-food">🍗</span><div class="order-summary-mini-copy"><strong>Paket ayam geprek komplit</strong><span>Pedas level 3 · Nasi pulen · +2 menu</span></div><span class="price">${money(totalPayable())}</span></div></section>
    <div class="section"><button class="button green-button" type="button" data-action="complete-order">Tandai pesanan selesai ${icon("check")}</button><button class="button outline-button" type="button" data-action="support">Chat tenant / bantuan</button></div>
  </main>`;
}

function pageSuccess() {
  return `<main class="page success-page">
    ${header("DiKantin", false, `<button class="icon-button small" type="button" data-action="nav-home" aria-label="Beranda">${icon("home")}</button>`)}
    <div class="success-top"><div class="success-burst">${icon("check")}</div><div class="eyebrow">Transaksi sukses</div><h1>Pesanan selesai!<br />Selamat menikmati 🎉</h1><p>Makananmu sudah diambil dari ${escapeHtml(tenants[state.tenantIndex].name)}. Terima kasih sudah mendukung tenant kantin kampus.</p></div>
    <div class="card receipt-card"><div class="receipt-title"><strong>Ringkasan transaksi</strong><span>#DKT-2026-98124</span></div><div class="receipt-row"><span>Waktu selesai</span><strong>12:18 WIB</strong></div><div class="receipt-row"><span>${state.mode === "dinein" ? "Meja" : "Metode"}</span><strong>${state.mode === "dinein" ? `${escapeHtml(state.table)} · Kantin FT` : "Ambil sendiri · Kantin FT"}</strong></div><div class="receipt-row"><span>Pembayaran QRIS</span><strong>${money(totalPayable())}</strong></div></div>
    <section class="section card card-pad"><div class="section-head" style="margin:0"><h2>Bagaimana makanannya?</h2></div><p class="small-text muted" style="margin-top:5px">Bantu tenant dan teman kampus lainnya.</p>
      <div class="rating-options">${ratingLabels.map((label) => `<button class="rating-chip ${state.selectedRatings.includes(label) ? "selected" : ""}" type="button" data-action="rating" data-rating="${escapeHtml(label)}">${label}</button>`).join("")}</div>
      <div class="review-label">Tulis ulasan singkat</div><textarea class="review-input" maxlength="150" placeholder="Ceritakan pengalamanmu di sini..." aria-label="Tulis ulasan"></textarea>
      <div style="display:flex;justify-content:flex-end;margin-top:5px"><span class="tiny-text muted">Maks. 150 karakter</span></div>
      <button class="button green-button" style="margin-top:10px" type="button" data-action="submit-review">Kirim ulasan</button>
    </section>
    <div class="success-actions"><button class="button" type="button" data-action="nav-home">Kembali ke beranda</button><button class="button outline-button" type="button" data-action="receipt">Lihat e-receipt</button></div>
    <p class="thanks">Terima kasih telah mendukung UMKM kantin kampus 🌱</p>
  </main>`;
}

function pageProfile() {
  return `<main class="page profile-page">
    ${header("Profil pengguna", true)}
    <section class="card profile-summary">
      <span class="profile-avatar" aria-hidden="true">BS</span>
      <div class="profile-identity"><span class="profile-label">Mahasiswa DiKantin</span><h1>Budi Santos</h1><p>Profil pengguna</p></div>
    </section>
    <section class="section">
      <div class="section-head"><h2>Informasi akun</h2><span class="tiny-text muted">Data demo</span></div>
      <div class="card profile-details">
        <div class="profile-row"><span>Nama lengkap</span><strong>Budi Santos</strong></div>
        <div class="profile-row"><span>Nomor Induk Mahasiswa</span><strong>2504</strong></div>
        <div class="profile-row"><span>Status</span><strong class="profile-status"><i class="open-dot"></i> Mahasiswa aktif</strong></div>
      </div>
    </section>
    <section class="section">
      <div class="section-head"><h2>Akun saya</h2></div>
      <button class="card profile-link-card" type="button" data-action="profile-orders">
        <span class="profile-link-icon">${icon("receipt")}</span><span><strong>Riwayat pesanan</strong><small>Lihat status pesanan kantinmu</small></span>${icon("arrow", "green")}
      </button>
    </section>
    <button class="button outline-button profile-logout" type="button" data-action="profile-logout">Keluar dari akun</button>
  </main>`;
}

function render() {
  let page = "";
  let activeNav = "";
  let hasNav = true;
  switch (state.screen) {
    case "login": page = pageLogin(); hasNav = false; break;
    case "home": page = pageHome(); activeNav = "home"; break;
    case "canteens": page = pageCanteens(); activeNav = "canteens"; break;
    case "scan": page = pageScan(); activeNav = "scan"; break;
    case "confirm": page = pageConfirm(); activeNav = "scan"; break;
    case "tenants": page = pageTenants(); activeNav = "canteens"; break;
    case "menu": page = pageMenu(); activeNav = "canteens"; break;
    case "cart": page = pageCart(); activeNav = "tracking"; break;
    case "payment": page = pagePayment(); activeNav = "tracking"; break;
    case "tracking": page = pageTracking(); activeNav = "tracking"; break;
    case "profile": page = pageProfile(); activeNav = "profile"; break;
    case "success": page = pageSuccess(); hasNav = false; break;
    default: page = pageLogin(); hasNav = false;
  }
  root.innerHTML = `<div class="app-shell">${page}${hasNav ? navBar(activeNav) : ""}</div>`;
  bindSearch();
}

function bindSearch() {
  root.querySelectorAll("[data-search]").forEach((input) => {
    input.addEventListener("input", () => {
      const kind = input.dataset.search;
      const query = input.value.trim().toLowerCase();
      if (kind === "canteen") state.query = input.value;
      if (kind === "tenant") state.tenantQuery = input.value;
      if (kind === "menu") state.menuQuery = input.value;
      const selector = kind === "canteen" ? "[data-canteen-card]" : `[data-${kind}-option]`;
      root.querySelectorAll(selector).forEach((card) => {
        card.hidden = Boolean(query) && !card.dataset.searchable.includes(query);
      });
    });
  });
}

function showToast(message) {
  root.querySelector(".toast")?.remove();
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.setAttribute("role", "status");
  toast.textContent = message;
  root.querySelector(".app-shell")?.append(toast);
  window.setTimeout(() => toast.remove(), 2300);
}

root.addEventListener("submit", (event) => {
  if (event.target.matches('[data-form="login"]')) {
    event.preventDefault();
    go("home");
  }
});

root.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const action = button.dataset.action;
  switch (action) {
    case "back": goBack(); break;
    case "login-guest": go("home"); break;
    case "login-phone": showToast("Demo: masuk dengan nomor HP akan tersedia di aplikasi penuh."); break;
    case "forgot": showToast("Demo: hubungi pengelola kampus untuk mengatur ulang kata sandi."); break;
    case "choose-mode": state.mode = button.dataset.mode; resetTenantPicker(); go("canteens"); break;
    case "nav-home": go("home"); break;
    case "nav-canteens": go("canteens"); break;
    case "nav-scan": go("scan"); break;
    case "nav-tracking": go("tracking"); break;
    case "nav-profile": go("profile"); break;
    case "profile-orders": go("tracking"); break;
    case "profile-logout": state.history = []; state.screen = "login"; render(); window.scrollTo(0, 0); break;
    case "notifications": showToast("Belum ada notifikasi baru."); break;
    case "choose-canteen": {
      const canteen = canteens[Number(button.dataset.index)];
      if (canteen) state.canteen = canteen.name;
      if (state.mode === "pickup") {
        resetTenantPicker();
        go("tenants");
      } else {
        go("scan");
      }
      break;
    }
    case "canteen-filter": state.canteenFilter = button.dataset.filter; render(); break;
    case "toggle-flash": state.flash = !state.flash; render(); break;
    case "scan-success": {
      state.table = String(Math.max(1, Math.min(99, Number(state.table) || 14)));
      go("confirm");
      break;
    }
    case "confirm-table": resetTenantPicker(); go("tenants"); break;
    case "rescan": state.mode === "pickup" ? go("canteens") : go("scan"); break;
    case "toggle-tenant-picker":
      state.tenantExpanded = !state.tenantExpanded;
      if (state.tenantExpanded) state.menuExpanded = false;
      render();
      break;
    case "select-tenant":
      state.tenantIndex = Number(button.dataset.index) || 0;
      state.tenantChosen = true;
      state.tenantExpanded = false;
      state.menuExpanded = false;
      state.menuQuery = "";
      render();
      break;
    case "toggle-menu-picker":
      if (!state.tenantChosen) { showToast("Pilih tenant terlebih dahulu."); break; }
      state.menuExpanded = !state.menuExpanded;
      if (state.menuExpanded) state.tenantExpanded = false;
      render();
      break;
    case "open-menu":
      state.tenantIndex = Number(button.dataset.index) || 0;
      state.tenantChosen = true;
      state.tenantExpanded = false;
      state.menuExpanded = true;
      state.menuQuery = "";
      go("tenants");
      break;
    case "menu-filter": state.menuFilter = button.dataset.filter; render(); break;
    case "add-item": {
      const id = button.dataset.id;
      state.cart[id] = (state.cart[id] || 0) + 1;
      render();
      showToast("Menu ditambahkan ke keranjang.");
      break;
    }
    case "open-cart": go("cart"); break;
    case "quantity": {
      const id = button.dataset.id;
      const qty = (state.cart[id] || 0) + Number(button.dataset.delta);
      if (qty <= 0) delete state.cart[id]; else state.cart[id] = qty;
      render();
      break;
    }
    case "toggle-voucher": state.voucherActive = !state.voucherActive; render(); break;
    case "pay":
      if (totalItems() === 0) { showToast("Tambahkan minimal satu menu sebelum membayar."); break; }
      go("payment");
      break;
    case "payment-success": go("tracking"); break;
    case "complete-order": go("success"); break;
    case "rating": {
      const rating = button.dataset.rating;
      state.selectedRatings = state.selectedRatings.includes(rating) ? state.selectedRatings.filter((item) => item !== rating) : [...state.selectedRatings, rating];
      render();
      break;
    }
    case "submit-review": showToast("Terima kasih, ulasanmu tersimpan di demo ini."); break;
    case "receipt": showToast("E-receipt demo: #DKT-2026-98124 · " + money(totalPayable())); break;
    case "support": showToast("Demo: tenant dapat dihubungi melalui fitur bantuan aplikasi."); break;
    default: break;
  }
});

render();
