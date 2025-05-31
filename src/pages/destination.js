function createCard(item) {
  return `
    <div class="card">
      <div class="card-image-container">
        <img loading="lazy" src="${item.link_gambar || 'https://via.placeholder.com/300x180?text=No+Image'}" alt="${item.nama}" />
        <div class="image-overlay"></div>
      </div>
      <div class="card-body">
        <h3>${item.nama}</h3>
        <p>${item.kabupaten_kota || ''}</p>
        <div class="card-footer">
          <div class="rating-badge">⭐ ${item.rating.toFixed(1)}</div>
          <a href="${item.link_lokasi}" target="_blank" class="btn-rute">Rute</a>
        </div>
      </div>
    </div>
  `;
}

// Fungsi untuk Capitalize huruf pertama
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Destination() {
  return `
    <div class="destination-container">
      <h2>Filter Wisata</h2>
      <div class="filter-group">
        <label for="kategori">Kategori:</label>
        <select id="kategori">
          <option value="rekreasi">Rekreasi</option>
          <option value="alam">Alam</option>
          <option value="umum">Umum</option>
          <option value="budaya">Budaya</option>
        </select>

        <label for="lokasi">Kabupaten/Kota:</label>
        <select id="lokasi">
          <option value="Kabupaten Badung">Kabupaten Badung</option>
          <option value="Kabupaten Bangli">Kabupaten Bangli</option>
          <option value="Kabupaten Buleleng">Kabupaten Buleleng</option>
          <option value="Kabupaten Gianyar">Kabupaten Gianyar</option>
          <option value="Kabupaten Jembrana">Kabupaten Jembrana</option>
          <option value="Kabupaten Karangasem">Kabupaten Karangasem</option>
          <option value="Kabupaten Klungkung">Kabupaten Klungkung</option>
          <option value="Kabupaten Tabanan">Kabupaten Tabanan</option>
          <option value="Kota Denpasar">Kota Denpasar</option>
        </select>

        <label for="rating">Rating Minimal:</label>
        <div class="slider-container">
          <span class="rating-value" id="ratingValue">3.0</span>
          <input type="range" id="rating" min="1" max="5" step="0.1" value="3.0" oninput="document.getElementById('ratingValue').textContent = this.value" />
        </div>

        <button id="btn-tampilkan">Tampilkan Rekomendasi</button>
      </div>
      
      <div id="hasil-rekomendasi"></div>
    </div>
  `;
}

export function initDestinationEvents() {
  const btn = document.getElementById('btn-tampilkan');
  if (!btn) return;

  btn.addEventListener('click', async () => {
    const kategori = document.getElementById('kategori').value;
    const kabupaten_kota = document.getElementById('lokasi').value;
    const rating_min = parseFloat(document.getElementById('rating').value);

    const filterData = { kategori, kabupaten_kota, rating_min };
    console.log('Data yang dikirim:', filterData);

    const hasilDiv = document.getElementById('hasil-rekomendasi');
    hasilDiv.innerHTML = '<div class="loading-container"><div class="preloader"></div><p>Memuat rekomendasi...</p></div>';

    try {
      const response = await fetch('http://localhost:3000/rekomendasi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filterData)
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        const kategoriCapitalized = capitalizeFirstLetter(kategori);
        
        hasilDiv.innerHTML = `
          <div class="destination-results-section">
            <h2 class="recommendation-title">Tempat Wisata ${kategoriCapitalized} di ${kabupaten_kota}</h2>
            <div class="card-container-wrapper">
              <div class="card-container">
                ${data.map(createCard).join('')}
              </div>
            </div>
          </div>
        `;
      } else {
        hasilDiv.innerHTML = '<p>Tidak ada rekomendasi yang sesuai.</p>';
      }
    } catch (error) {
      hasilDiv.innerHTML = `<p>Error: ${error.message}</p>`;
      console.error(error);
    }
  });
}
