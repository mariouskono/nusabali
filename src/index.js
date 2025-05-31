import { initBurgerIcon } from './script/BurgerIcon.js';
import { initNavigation } from './script/navigation-helper.js';
import { initMap } from './script/map.js';
import './script/animations.js'; // Import smooth animations
import "./styles/style.css";
import "./styles/culture.css";
import "./styles/about-us-responsive.css";
import "./styles/about-us.css";
import "./styles/destination.css";
import "./styles/navigation.css";
import { router } from './routes/route.js'; // Import router
import './pages/app.js'; // Import app.js to initialize router

// Import images
import NUSABaliLogo from './images/NUSABali.png';
import NUSABaliWhite from './images/NUSABali white.png';
import BackgroundAtasHome from './images/BackgroundAtasHome.png';

if ('serviceWorker' in navigator) {  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((reg) => console.log('Service Worker registered!', reg))
      .catch((err) => console.error('SW registration failed:', err));
  });
}

document.addEventListener('DOMContentLoaded', () => {
 // components yang penting
  initNavigation();
  initBurgerIcon();
  // Initialize router for first page load
  router();
  
  // Update image sources with null checking
  const backgroundImg = document.querySelector('.background img');
  if (backgroundImg) {
    backgroundImg.src = BackgroundAtasHome;
  }

  const headerLogo = document.querySelector('.main-header img');
  if (headerLogo) {
    headerLogo.src = NUSABaliLogo;
  }

  const footerLogo = document.querySelector('footer .container img');
  if (footerLogo) {
    footerLogo.src = NUSABaliWhite;
  }
});
