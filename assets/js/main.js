/**
 * Apex Brand Works — Main Application Logic
 */

window.initMainApp = function () {
  initStickyHeader();
  initMegaMenu();
  initMobileDrawer();
  initScrollReveals();
  initAscentLineAnimation();
  initFAQAccordions();
  initFormValidations();
};

document.addEventListener('DOMContentLoaded', () => {
  window.initMainApp();
});


/* Sticky Header Scroll Observer */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* Mega Menu Toggle & Focus Trapping */
function initMegaMenu() {
  const toggleBtn = document.getElementById('mega-menu-toggle');
  const megaMenu = document.getElementById('mega-menu');
  if (!toggleBtn || !megaMenu) return;

  let hoverTimer = null;

  const openMenu = () => {
    toggleBtn.setAttribute('aria-expanded', 'true');
    megaMenu.setAttribute('aria-hidden', 'false');
    megaMenu.classList.add('is-open');
  };

  const closeMenu = () => {
    toggleBtn.setAttribute('aria-expanded', 'false');
    megaMenu.setAttribute('aria-hidden', 'true');
    megaMenu.classList.remove('is-open');
  };

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = megaMenu.classList.contains('is-open');
    if (isOpen) closeMenu();
    else openMenu();
  });

  // Desktop Hover with delay
  toggleBtn.addEventListener('mouseenter', () => {
    if (window.innerWidth > 1024) {
      clearTimeout(hoverTimer);
      openMenu();
    }
  });

  megaMenu.addEventListener('mouseenter', () => {
    if (window.innerWidth > 1024) {
      clearTimeout(hoverTimer);
    }
  });

  toggleBtn.addEventListener('mouseleave', () => {
    if (window.innerWidth > 1024) {
      hoverTimer = setTimeout(closeMenu, 250);
    }
  });

  megaMenu.addEventListener('mouseleave', () => {
    if (window.innerWidth > 1024) {
      hoverTimer = setTimeout(closeMenu, 250);
    }
  });

  // Close on Escape or Outside Click
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  document.addEventListener('click', (e) => {
    if (!megaMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
      closeMenu();
    }
  });
}

/* Mobile Drawer */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const closeBtn = document.getElementById('mobile-drawer-close');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('drawer-backdrop');

  if (!drawer || !backdrop) return;

  const openDrawer = () => {
    drawer.classList.add('is-open');
    backdrop.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('is-open');
    backdrop.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (toggleBtn) toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);
}

/* Scroll Reveal Animations */
function initScrollReveals() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  reveals.forEach((el) => observer.observe(el));
}

/* Signature Ascent Line SVG Stroke Animation */
function initAscentLineAnimation() {
  const svgs = document.querySelectorAll('.ascent-line-svg');
  if (!svgs.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  svgs.forEach((svg) => observer.observe(svg));
}

/* FAQ Accordion Toggle (Delegated & Idempotent) */
function initFAQAccordions() {
  if (window._faqInitialized) return;
  window._faqInitialized = true;

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.faq-button');
    if (!btn) return;

    e.preventDefault();
    const item = btn.closest('.faq-item');
    if (!item) return;

    const container = item.closest('.faq-list');
    const isOpen = item.classList.contains('is-open');

    // Accordion mode: Close all sibling items in the same container
    if (container) {
      container.querySelectorAll('.faq-item').forEach((i) => {
        i.classList.remove('is-open');
      });
    }

    // Toggle current item
    if (!isOpen) {
      item.classList.add('is-open');
    }
  });
}

/* Form Validation with Specific Inline Messages */
function initFormValidations() {
  const forms = document.querySelectorAll('form[data-validate="true"]');
  forms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
      inputs.forEach((input) => {
        const group = input.closest('.form-group') || input.parentElement;
        let errorMsg = group.querySelector('.form-error');

        if (!errorMsg) {
          errorMsg = document.createElement('div');
          errorMsg.className = 'form-error';
          group.appendChild(errorMsg);
        }

        if (!input.value.trim()) {
          isValid = false;
          group.classList.add('has-error');
          errorMsg.textContent = `Please enter your ${input.name || 'information'}.`;
        } else if (input.type === 'email' && !validateEmail(input.value)) {
          isValid = false;
          group.classList.add('has-error');
          errorMsg.textContent = 'Please enter a valid business email address.';
        } else {
          group.classList.remove('has-error');
          errorMsg.textContent = '';
        }
      });

      if (isValid) {
        // Show success state
        const successBanner = document.createElement('div');
        successBanner.className = 'eyebrow eyebrow--teal';
        successBanner.style.padding = '16px';
        successBanner.style.backgroundColor = 'var(--color-teal-tint)';
        successBanner.style.borderRadius = 'var(--radius-sm)';
        successBanner.style.marginTop = '16px';
        successBanner.style.width = '100%';
        successBanner.textContent = 'Thank you! Your request has been received. Our strategy team will be in touch within 24 business hours.';

        form.reset();
        form.appendChild(successBanner);
      }
    });
  });
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
