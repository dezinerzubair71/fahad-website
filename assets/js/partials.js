/**
 * Apex Brand Works — Dynamic Partials Loader
 * Fetches and injects shared header.html and footer.html (if not pre-rendered)
 */
document.addEventListener('DOMContentLoaded', async () => {
  const headerContainer = document.getElementById('site-header');
  const footerContainer = document.getElementById('site-footer');

  // Determine root relative path for services subfolder vs root
  const isSubfolder = window.location.pathname.includes('/services/');
  const partialBasePath = isSubfolder ? '../partials/' : 'partials/';

  try {
    if (headerContainer && headerContainer.children.length === 0) {
      const headerRes = await fetch(partialBasePath + 'header.html');
      if (headerRes.ok) {
        let headerHtml = await headerRes.text();
        if (isSubfolder) {
          headerHtml = headerHtml.replace(/href="services\//g, 'href="../services/');
          headerHtml = headerHtml.replace(/href="index"/g, 'href="../index.html"');
          headerHtml = headerHtml.replace(/href="about"/g, 'href="../about.html"');
          headerHtml = headerHtml.replace(/href="careers"/g, 'href="../careers.html"');
          headerHtml = headerHtml.replace(/href="contact"/g, 'href="../contact.html"');
        }
        headerContainer.innerHTML = headerHtml;
      }
    }

    if (footerContainer && footerContainer.children.length === 0) {
      const footerRes = await fetch(partialBasePath + 'footer.html');
      if (footerRes.ok) {
        let footerHtml = await footerRes.text();
        if (isSubfolder) {
          footerHtml = footerHtml.replace(/href="services\//g, 'href="../services/');
          footerHtml = footerHtml.replace(/href="index"/g, 'href="../index.html"');
          footerHtml = footerHtml.replace(/href="about"/g, 'href="../about.html"');
          footerHtml = footerHtml.replace(/href="careers"/g, 'href="../careers.html"');
          footerHtml = footerHtml.replace(/href="contact"/g, 'href="../contact.html"');
        }
        footerContainer.innerHTML = footerHtml;
      }
    }

    // Highlight Active Link
    highlightActiveNav();

    // Trigger Main App Initialization
    if (window.initMainApp) {
      window.initMainApp();
    }
  } catch (err) {
    console.warn('Partials fetch fallback active (opening directly via file:// protocol). Pre-rendered HTML in use.', err);
    if (window.initMainApp) {
      window.initMainApp();
    }
  }
});

function highlightActiveNav() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link, .mega-item');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.endsWith(href.replace('../', '').replace('/', ''))) {
      link.classList.add('active');
    }
  });
}
