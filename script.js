/**
 * ============================================================================
 * Portofolio Personal - Mahasiswa Sistem Informasi
 * File: script.js
 * Deskripsi: Interaksi Vanilla JavaScript untuk navigasi mobile, aksesibilitas
 *            keyboard, dan inisialisasi Lucide Icons.
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inisialisasi Lucide Icons saat DOM siap
  if (typeof lucide !== 'undefined' && lucide.createIcons) {
    lucide.createIcons();
  }

  // Element selectors untuk Menu Mobile (FR-02)
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    /**
     * Mengubah status menu navigasi mobile
     * @param {boolean} shouldOpen - true untuk membuka, false untuk menutup
     */
    const toggleMobileMenu = (shouldOpen) => {
      const isExpanded = shouldOpen !== undefined 
        ? shouldOpen 
        : mobileMenuBtn.getAttribute('aria-expanded') === 'true';

      const newState = !isExpanded;

      // Update atribut aksesibilitas ARIA
      mobileMenuBtn.setAttribute('aria-expanded', String(newState));
      mobileMenuBtn.setAttribute('aria-label', newState ? 'Tutup menu navigasi' : 'Buka menu navigasi');

      if (newState) {
        mobileMenu.classList.remove('hidden');
        if (menuIcon) menuIcon.setAttribute('data-lucide', 'x');
      } else {
        mobileMenu.classList.add('hidden');
        if (menuIcon) menuIcon.setAttribute('data-lucide', 'menu');
      }

      // Render ulang ikon Lucide
      if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
      }
    };

    // Event listener tombol hamburger
    mobileMenuBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleMobileMenu();
    });

    // Menutup menu mobile saat salah satu anchor dipilih (FR-02)
    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        toggleMobileMenu(false);
      });
    });

    // Aksesibilitas keyboard: tutup menu dengan tombol Escape (Esc)
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
        if (isExpanded) {
          toggleMobileMenu(false);
          mobileMenuBtn.focus();
        }
      }
    });

    // Menutup menu saat klik di luar area menu
    document.addEventListener('click', (event) => {
      const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        const isClickInside = mobileMenu.contains(event.target) || mobileMenuBtn.contains(event.target);
        if (!isClickInside) {
          toggleMobileMenu(false);
        }
      }
    });
  }
});
