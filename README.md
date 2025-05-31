
# NUSA BALI 🌴

Proyek Capstone yang bertujuan untuk mempromosikan pariwisata dan budaya Bali melalui aplikasi berbasis web. Aplikasi ini menyediakan informasi tentang destinasi wisata, budaya lokal, dan rekomendasi destinasi berdasarkan preferensi pengguna menggunakan model machine learning.

---

## ✨ Fitur Utama

- Informasi destinasi wisata populer di Bali
- Konten edukatif tentang budaya dan tradisi Bali
- Rekomendasi destinasi berdasarkan preferensi pengguna
- UI responsif dan interaktif
- Backend API dengan Node.js + Firebase
- Integrasi model machine learning (TensorFlow) untuk rekomendasi

---

## 🛠️ Teknologi yang Digunakan

### Frontend
- HTML, CSS, JavaScript
- Webpack
- Firebase Hosting

### Backend
- Node.js + Express
- TensorFlow (untuk model rekomendasi)
- Python (preprocessing dan training model)
- Firebase Functions

---

## 🚀 Cara Menjalankan

### 1. Clone repository
```bash
git clone https://github.com/mariouskono/nusabali.git
cd nusabali
````

### 2. Jalankan backend

```bash
cd backend
npm install
node server.js
```

### 3. Jalankan frontend (build)

```bash
npm install
npm run build
```

### 4. Deploy ke Firebase

Pastikan sudah login:

```bash
firebase login
firebase deploy
```

---

## 📁 Struktur Folder

```
nusabali/
├── backend/            # Backend API dan ML model
├── dist/               # Build output frontend
├── src/                # Source code frontend
├── firebase.json       # Konfigurasi Firebase
├── .gitignore
├── package.json
└── webpack.*.js        # Konfigurasi Webpack
```

---
