// Smooth animations and transitions for enhanced user experience
export class SmoothAnimations {
  constructor() {
    this.init();
  }

  init() {
    // Initialize all animation features when an instance is created
    this.setupIntersectionObserver();
    this.setupScrollAnimations();
    this.setupHoverEffects();
    this.setupParallaxEffects();
  }

  // Intersection Observer for scroll-based animations
  setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          entry.target.classList.remove('animate-out');
        }
      });
    }, observerOptions);

  // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll(
      '.slider-card, .info-card, .map-display, .hero-text, .photoAtas-kiri, .photoAtas-kanan'
    );
    // Menghapus .footer-container dari elemen yang dianimasikan untuk mencegah blur

    animateElements.forEach(el => {
      observer.observe(el);
    });
  }

  // Smooth scroll animations
  setupScrollAnimations() {
    let ticking = false;

    const updateScrollAnimations = () => {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelectorAll('.parallax');
      const speed = 0.5;

      parallax.forEach(element => {
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });

      ticking = false;
    };

    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollAnimations);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick);
  }

  // Enhanced hover effects
  setupHoverEffects() {
    // Add magnetic effect to buttons
    const buttons = document.querySelectorAll('button, .nav-list a, .slider-card');
    
    buttons.forEach(button => {
      button.addEventListener('mouseenter', this.addMagneticEffect);
      button.addEventListener('mouseleave', this.removeMagneticEffect);
    });
  }

  addMagneticEffect(e) {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px) scale(1.02)`;
    button.style.transition = 'transform 0.3s ease';
  }

  removeMagneticEffect(e) {
    const button = e.currentTarget;
    button.style.transform = 'translate(0px, 0px) scale(1)';
  }
  // Parallax effects for background elements
  setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero-text, .background');
    
    // Menghapus efek parallax dari footer atau elemen lain yang tidak perlu
    parallaxElements.forEach(element => {
      // Memastikan element bukan bagian dari footer
      if (!element.closest('footer')) {
        element.classList.add('parallax');
      }
    });
  }

  // Stagger animations for multiple elements
  staggerAnimation(elements, delay = 100) {
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('animate-in');
      }, index * delay);
    });
  }

  // Loading animations
  setupLoadingAnimations() {
    // Add loading states to images
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      img.classList.add('loading');
      
      img.addEventListener('load', () => {
        img.classList.remove('loading');
        img.classList.add('loaded');
      });
    });
  }

  // Page transition effects
  pageTransition(direction = 'in') {
    const main = document.querySelector('.main-content');
    
    if (direction === 'in') {
      main.style.opacity = '0';
      main.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        main.style.transition = 'all 0.6s ease';
        main.style.opacity = '1';
        main.style.transform = 'translateY(0)';
      }, 50);
    }
  }

  // Smooth reveal animations for text
  revealText(element) {
    const text = element.textContent;
    element.innerHTML = '';
    
    [...text].forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      span.style.transition = `all 0.5s ease ${index * 0.05}s`;
      element.appendChild(span);
      
      setTimeout(() => {
        span.style.opacity = '1';
        span.style.transform = 'translateY(0)';
      }, 100);
    });
  }
}

// CSS classes for animations (to be added via JavaScript)
export const animationStyles = `
  .animate-in {
    animation: slideInFade 0.8s ease forwards;
  }

  .animate-out {
    opacity: 0.5;
    transform: translateY(30px);
  }

  @keyframes slideInFade {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .loading {
    opacity: 0.8;
    /* Menghapus filter blur yang menyebabkan masalah pada beberapa browser */
    filter: none;
    transition: opacity 0.4s ease;
  }

  .loaded {
    opacity: 1;
    filter: none;
    transition: opacity 0.4s ease;
  }

  .parallax {
    will-change: transform;
  }
  
  /* Hindari efek parallax di footer */
  footer .parallax {
    will-change: auto;
    transform: none !important;
  }

  /* Smooth focus states */
  *:focus {
    outline: 2px solid #4475f2;
    outline-offset: 2px;
    transition: outline 0.3s ease;
  }
  /* Enhanced transitions for better performance */
  .slider-card,
  .info-card,
  .nav-list a,
  button {
    will-change: transform;
    backface-visibility: hidden;
  }
  
  /* Hindari akan-change pada elemen footer untuk mencegah blur */
  footer *,
  footer img,
  footer a,
  footer .social-links a {
    will-change: auto;
    backface-visibility: visible;
    perspective: none;
    transform: none;
    filter: none;
  }
`;

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Add animation styles to head
  const style = document.createElement('style');
  style.textContent = animationStyles;
  document.head.appendChild(style);

  // Initialize smooth animations
  const smoothAnimations = new SmoothAnimations();
  
  // Setup loading animations
  smoothAnimations.setupLoadingAnimations();
  
  // Page transition effect
  smoothAnimations.pageTransition('in');
});
