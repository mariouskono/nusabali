export function initMap() {
  // Check if Leaflet is available
  if (typeof L === 'undefined') {
    console.error('Leaflet library not loaded');
    return;
  }
  
  // Wait for DOM to be loaded
  const mapContainer = document.getElementById('map');
  if (!mapContainer) {
    console.error('Map container not found');
    return;
  }

  try {
    // Check if a map instance already exists on this container
    if (mapContainer._leaflet_id) {
      console.log('Map already initialized on this container');
      return;
    }
    
    // Initialize the map centered on Denpasar, Bali, Indonesia
    const map = L.map('map').setView([-8.4095, 115.1889], 10);

    // Add OpenStreetMap tile layer with better styling
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
      className: 'map-tiles'
    }).addTo(map);

    // Add marker for Bali
    const baliMarker = L.marker([-8.4095, 115.1889])
      .addTo(map)
      .bindPopup(`
        <b>Bali, Indonesia</b><br>
        Pulau Dewata<br>
      `);
    
    // Open the popup by default
    baliMarker.openPopup();

  } catch (error) {
    console.error('Error initializing map:', error);
  }
}
