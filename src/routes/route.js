import HomePage from '../pages/home-page.js';
import CulturePage from '../pages/culture-page.js';
import DestinationPage from '../pages/destination.js';
import AboutPage from '../pages/about-us.js';

// Routing configuration
const routes = {
  '/': HomePage,
  '/home': HomePage,
  '/culture': CulturePage,
  '/destination': DestinationPage,
  '/about': AboutPage,
  // Add empty hash route for Firebase hosting
  '': HomePage,
};

// Function to ensure footer renders properly without blur
const fixFooterRendering = () => {
  // Remove any transformations or animations from footer
  const footer = document.querySelector('footer');
  if (footer) {
    // Remove animation classes that might cause blur
    footer.classList.remove('animate-in', 'animate-out', 'parallax');
    
    // Reset any transform or filter styles
    footer.style.transform = 'none';
    footer.style.filter = 'none';
    footer.style.willChange = 'auto';
    
    // Apply the same to footer children
    const footerElements = footer.querySelectorAll('*');
    footerElements.forEach(el => {
      el.style.transform = 'none';
      el.style.filter = 'none';
      el.style.willChange = 'auto';
    });
  }
};

// Router function
const router = async () => {
  // Get the requested path from the URL hash
  let path = window.location.hash.substring(1).toLowerCase();
  
  // Default to home if no path or just '#'
  if (path === '' || path === '#') path = '/';
  
  // Remove trailing slash for consistency
  if (path !== '/' && path.endsWith('/')) {
    path = path.slice(0, -1);
  }
  
  console.log('Navigating to:', path); // Debugging
    // Get the page render function for this path
  const page = routes[path] || routes['/'];
  
  // Render the page content into the main content area
  const main = document.getElementById('main-content');
  if (main) {
    main.innerHTML = page();
    
    // Inisialisasi event handler untuk halaman tertentu
    if (path === '/destination') {
      // Import dan panggil fungsi inisialisasi event handler destinasi
      import('../pages/destination.js').then(module => {
        if (module.initDestinationEvents) {
          module.initDestinationEvents();
        }
      });
    }
    
    // Make sure footer renders properly
    setTimeout(fixFooterRendering, 300);
    
    // Reset scroll position
    window.scrollTo(0, 0);
  } else {
    console.error('Main content element not found');
  }
};

// Initialize router
window.addEventListener('hashchange', router);

// Export router for use in app.js
export { router };