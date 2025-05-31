import { router } from '../routes/route.js';

// Jalankan router saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
  // Inisialisasi router untuk pertama kali
  router();

  // Tambahkan event listener untuk perubahan hash
  window.addEventListener('hashchange', router);
});

// Fungsi untuk mengambil preferensi dari API ML
async function getPreferenceFromML(input) {
  try {
    const response = await fetch('http://localhost:3000/predict', { // Pastikan ini adalah URL yang benar sesuai backend yang berjalan
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(input)
    });

    const data = await response.json();

    // Cek apakah response sukses
    if (response.ok) {
      return data.preferensi;  // Pastikan key preferensi ada di respons
    } else {
      throw new Error(data.error || 'Error dari ML API');
    }
  } catch (error) {
    console.error('Terjadi kesalahan saat mengambil data dari ML API:', error);
    return null;  // Bisa sesuaikan error handling dengan yang diinginkan
  }
}
