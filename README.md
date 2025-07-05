# 🕊️ MerpatiNews Aggregator

**MerpatiNews Aggregator** adalah aplikasi web sederhana yang menampilkan berita terkini dari berbagai kategori, dibuat dengan teknologi modern seperti **Next.js 15**, **Tailwind CSS**, dan **Lucide Icons**.

> Dibuat oleh [aslich86](https://github.com/aslich86) - KambingCoding.

---

## ✨ Fitur Utama

- 🔍 Pencarian berita berdasarkan kata kunci
- 🗂️ Filter berita berdasarkan kategori (teknologi, bisnis, olahraga, dsb)
- ⚡ Komponen UI modular dan responsif (dengan `shadcn/ui`)
- 💅 Styling modern dengan Tailwind CSS
- 📰 API berita dari [GNews.io](https://gnews.io/) atau data mock lokal

---

## 🧪 Tech Stack

- [Next.js 15 (App Router)](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)
- [GNews API](https://gnews.io/)

---

## 🚀 Jalankan secara lokal

### 1. Clone repo

```bash
git clone https://github.com/aslich86/MerpatiNews.git
cd MerpatiNews
```

### 2. Install dependensi

```bash
npm install
# atau
pnpm install
```

### 3. Buat file `.env.local`

```env
GNEWS_API_KEY=your_gnews_api_key_here
```

Jika kosong, akan fallback ke data mock.

### 4. Jalankan server dev

```bash
npm run dev
```

Aplikasi akan berjalan di [http://localhost:3000](http://localhost:3000)

---

## 📁 Struktur Direktori

```
.
├── app/                # Routing Next.js (App Router)
│   ├── api/news/       # API proxy ke GNews
│   ├── page.tsx        # Halaman utama
│   └── ...
├── components/ui/      # Komponen UI (dari shadcn/ui)
├── public/             # Aset statis (gambar placeholder)
├── styles/             # CSS global
├── .env.local          # API key (tidak di-commit)
├── package.json
└── README.md
```

---

## 📌 Roadmap (WIP)

- [ ] Tambah dark mode toggle
- [ ] Bookmark berita
- [ ] Komentar pengguna
- [ ] Deploy ke Vercel
- [ ] Tambah logo & favicon Merpati 🕊️

---

## 🫡 Lisensi

MIT License.  
Bebas digunakan dan dikembangkan kembali dengan tetap mencantumkan kredit.

---

> _"Dari kampung, untuk Indonesia. Merpati terbang membawa kabar baik."_  
> — **MerpatiNews**