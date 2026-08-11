/**
 * Apex Brand Works — Dynamic Partials Loader
 * Fetches and injects shared header.html and footer.html (if not pre-rendered)
 */
document.addEventListener('DOMContentLoaded', async () => {
  const headerContainer = document.getElementById('site-header');
  const footerContainer = document.getElementById('site-footer');

  try {
    if (headerContainer && headerContainer.children.length === 0) {
      const headerRes = await fetch('/partials/header.html');
      if (headerRes.ok) {
        headerContainer.innerHTML = await headerRes.text();
      }
    }

    if (footerContainer && footerContainer.children.length === 0) {
      const footerRes = await fetch('/partials/footer.html');
      if (footerRes.ok) {
        footerContainer.innerHTML = await footerRes.text();
      }
    }

    // Highlight Active Link
    highlightActiveNav();

    // Trigger Main App Initialization
    if (window.initMainApp) {
      window.initMainApp();
    }
  } catch (err) {
    console.warn('Partials fetch fallback active.', err);
    if (window.initMainApp) {
      window.initMainApp();
    }
  }
});

function highlightActiveNav() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link, .mobile-service-link, .mega-menu-card');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.includes(href) && href !== '/' && href !== '/index') {
      link.classList.add('active');
    }
  });
}
