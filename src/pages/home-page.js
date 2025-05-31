import { initMap } from '../script/map.js';

export default function HomePage() {
  // Add an initialization function to be called after the page is rendered
  const initializePage = () => {
    // Using setTimeout to ensure the map container is fully rendered in the DOM
    setTimeout(() => {
      // Initialize map
      const mapContainer = document.getElementById('map');
      if (mapContainer) {
        try {
          initMap();
        } catch (error) {
          console.error('Error initializing map:', error);
        }
      } else {
        console.warn('Map container not available yet. Map initialization postponed.');
      }
      
      // Setup smooth scrolling for explore button
      const exploreBtn = document.querySelector('.explore-btn');
      if (exploreBtn) {
        exploreBtn.addEventListener('click', function(event) {
          event.preventDefault();
          const targetSection = document.getElementById('top-destinations');
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
          }
        });
      }
    }, 100); // Small delay to ensure DOM is ready
  };

  // Call initializePage after the content is rendered
  setTimeout(initializePage, 100);
  
  return `
  <main class="home-container">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-content">
        <h1>Discover the Magic of Bali</h1>
        <p>Experience the perfect blend of breathtaking landscapes, rich culture, and unforgettable adventures.</p>
        <a href="#top-destinations" class="explore-btn">Explore Destinations</a>
      </div>
    </section>
    
    <!-- Top Destinations Section -->
    <section class="top-destinations" id="top-destinations">
      <h2>Top Destinations in Bali</h2>
      <p class="section-description">Explore the most beautiful and captivating locations across the island of gods.</p>
      
      <div class="destination-cards">
        <div class="destination-card">
          <div class="destination-image">
            <img src="https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg" alt="Ubud Rice Terraces">
          </div>
          <div class="destination-info">
            <h3>Ubud Rice Terraces</h3>
            <p>Explore the iconic emerald green rice paddies that cascade down hillsides like giant steps.</p>
          </div>
        </div>

        <div class="destination-card">
          <div class="destination-image">
            <img src="https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg" alt="Uluwatu Temple">
          </div>
          <div class="destination-info">
            <h3>Uluwatu Temple</h3>
            <p>Perched on a steep cliff 70 meters above the roaring ocean, this temple offers breathtaking sunset views.</p>
          </div>
        </div>

        <div class="destination-card">
          <div class="destination-image">
            <img src="https://images.pexels.com/photos/2413238/pexels-photo-2413238.jpeg" alt="Nusa Penida">
          </div>
          <div class="destination-info">
            <h3>Nusa Penida</h3>
            <p>Discover dramatic cliffs, pristine beaches, and the famous Kelingking Beach on this beautiful island.</p>
          </div>
        </div>      </div>
        <div class="details-button-container">
        <a href="#/destination" class="view-details-btn">View Destination Details</a>
      </div>
    </section>  </div>
  
    <!-- Interactive Map Section -->
    <section class="map-section">
      <div class="map-header">
        <img src="./images/NUSABali.png" alt="Map Icon" class="map-icon">
        <h2>Tempat Wisata Populer Didekatmu</h2>
      </div>
      <p class="map-description">Fitur ini menunjukkan kamu untuk mencari tempat wisata atau tempat yang jarang/populer di daerah kamu dengan berdasarkan Destinasi atas.</p>
        <div class="map-container">
        <div id="map" class="map-display" style="min-height: 400px;"></div>
        <div class="map-info-sidebar">
          <div class="info-card">
            <i class="fas fa-map-marker-alt"></i>
            <div class="info-content">
              <h3>Populer di dekatmu</h3>
              <p>Tempat-tempat yang populer dan pasti ramai untuk dikunjungi</p>
            </div>
          </div>
          <div class="info-card">
            <i class="fas fa-heart"></i>
            <div class="info-content">
              <h3>Favorit di dekatmu</h3>
              <p>Tempat favorit dari hasil review tempat yang paling di rekomendasikan</p>
            </div>
          </div>
          <div class="info-card">
            <i class="fas fa-users"></i>
            <div class="info-content">
              <h3>Ramai di dekatmu</h3>
              <p>Spot yang paling sering dikunjungi oleh wisatawan untuk berlibur/rekreasi</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials-section">
      <h2><span>💬 •</span> Apa Kata Mereka Tentang Kami</h2>
      <p class="subheading" style="font-size: 20px;">Penasaran apa saja review dari pengguna yang memakai aplikasi dan website NUSABali buat nentuin kemana liburan mereka selanjutnya? Yuk cek dibawah!</p>

      <div class="testimonial-cards">
        <!-- Card 1 -->
        <div class="card">
          <img src="./images/review1.png" alt="Avatar Sandhika" class="avatar">
          <p>Destinize membantu saya Mencari spot tempat wisata baru di Bali dengan Mudah</p>
          <div class="stars">⭐️⭐️⭐️⭐️☆</div>
          <p class="name">Mario Pelapon</p>
          <p class="role">Warga BKKBN</p>
        </div>

        <!-- Card 2 -->
        <div class="card">
          <img src="./images/review2.png" alt="Avatar Syauqi" class="avatar">
          <p>Hebat! Ini sangat membantu saya mendapatkan jodoh, tidak disangka bahwa jodoh saya adalah CS nya</p>
          <div class="stars">⭐️⭐️⭐️⭐️☆</div>
          <p class="name">Acah Botol Yakult</p>
          <p class="role">Mahasiswa UBJ</p>
        </div>

        <!-- Card 3 -->
        <div class="card">
          <img src="./images/review3.png" alt="Avatar Petrik" class="avatar">
          <p>Bikini Bottom menjadi sangat ramai dikunjungi saat saya memasukkannya di NusaBali ini</p>
          <div class="stars">⭐️⭐️⭐️⭐️☆</div>
          <p class="name">Daniel Fernando</p>
          <p class="role">Warga di Bikini Bottom</p>
        </div>
      </div>
    </section>
  `;
}