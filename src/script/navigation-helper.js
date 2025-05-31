export function createNavigation() {
  return `
    <div class="container">
      <a href="#main-content" class="skip-to-content" id="skip-link">Skip to content</a>      <div class="brand-name">
        <img src="/images/NUSABali.png" alt="NUSABali Logo" width="150">
      </div>
      <nav class="nav-container">
        <ul class="nav-list">
          <li><a href="#/home" class="nav-link" data-page="home">Home</a></li>
          <li><a href="#/destination" class="nav-link" data-page="destination">Destination</a></li>
          <li><a href="#/culture" class="nav-link" data-page="culture">Culture</a></li>
          <li><a href="#/about" class="nav-link" data-page="about">About Us</a></li>
        </ul>
      </nav>      <button class="drawer-button" aria-label="Open Menu">
        <i class="fas fa-bars"></i>
      </button>
    </div>
    
    <div class="navigation-drawer" role="dialog" aria-modal="false" tabindex="-1">
      <button class="drawer-close-button" aria-label="Close Menu">
        <i class="fas fa-times"></i>
      </button>
      
      <div class="drawer-top-content">        <div class="drawer-brand">
          <img src="/images/NUSABali.png" alt="NUSABali Logo" width="120">
        </div>
        
        <nav class="nav-container">
          <ul class="nav-list">
            <li><a href="#/home" class="nav-link" data-page="home">Home</a></li>
            <li><a href="#/destination" class="nav-link" data-page="destination">Destination</a></li>
            <li><a href="#/culture" class="nav-link" data-page="culture">Culture</a></li>
            <li><a href="#/about" class="nav-link" data-page="about">About Us</a></li>
          </ul>
        </nav>
      </div>
    </div>
    <div class="menu-backdrop" role="presentation"></div>
  `;
}

export function initNavigation() {
  const header = document.querySelector('.main-header');
  if (header) {
    header.innerHTML = createNavigation();
    
    // Menandai link aktif berdasarkan URL saat ini
    const setActiveNavLink = () => {
      const currentPath = window.location.hash.substring(2) || 'home'; // Hapus #/ dari hash
      const navLinks = document.querySelectorAll('.nav-link');
      
      navLinks.forEach(link => {
        const page = link.getAttribute('data-page');
        if (currentPath.startsWith(page)) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    };
    
    // Panggil sekali saat halaman dimuat
    setActiveNavLink();
    
    // Tambahkan event listener untuk perubahan URL
    window.addEventListener('hashchange', setActiveNavLink);
  }
}
