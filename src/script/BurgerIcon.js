export function initBurgerIcon() {
  const drawerButton = document.querySelector('.drawer-button');
  const drawer = document.querySelector('.navigation-drawer');
  const closeButton = document.querySelector('.drawer-close-button');
  const backdrop = document.querySelector('.menu-backdrop');
    const navLinks = document.querySelectorAll('.navigation-drawer .nav-list a');

  if (!drawerButton || !drawer || !closeButton || !backdrop) {
    console.error('Error: Elemen menu burger tidak ditemukan.');
    return;
  }

  let isOpen = false;  const openMenu = () => {
    if (isOpen) return;
    console.log("Menu burger dibuka."); // Debugging
    drawer.classList.add('open');
    backdrop.classList.add('active');
    drawerButton.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-modal', 'true');
    
    // Sebagai pengganti aria-hidden, kita dapat menggunakan tabindex
    drawer.setAttribute('tabindex', '0');
    // Fokus pada drawer untuk aksesibilitas
    setTimeout(() => drawer.focus(), 100);
    isOpen = true;
  };

  const closeMenu = () => {
    if (!isOpen) return;
    console.log("Menu burger ditutup."); // Debugging
    drawer.classList.remove('open');
    backdrop.classList.remove('active');
    drawerButton.setAttribute('aria-expanded', 'false');
    // Fokus kembali ke tombol untuk aksesibilitas
    drawer.setAttribute('tabindex', '-1');
    isOpen = false;
  };

  drawerButton.addEventListener('click', openMenu);
  closeButton.addEventListener('click', closeMenu);
  backdrop.addEventListener('click', closeMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeMenu();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && isOpen) {
      closeMenu();
    }
  });

  // Touch gestures untuk navigasi mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);
  
  document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, false);
  
  const handleSwipe = () => {
    // Swipe right to open menu (jika berada di sisi kiri layar)
    if (touchEndX - touchStartX > 100 && touchStartX < 50) {
      openMenu();
    }
    
    // Swipe left to close menu
    if (touchStartX - touchEndX > 100 && isOpen) {
      closeMenu();
    }
  };

  console.log("initBurgerIcon() berhasil dijalankan."); // Debugging
}