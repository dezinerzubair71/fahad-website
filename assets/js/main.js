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
  initHeroInteractive();
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => window.initMainApp());
} else {
  window.initMainApp();
}


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

/* Delegated Mobile Services Accordion Toggle */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('#mobile-services-btn');
  if (btn) {
    e.preventDefault();
    e.stopPropagation();
    const content = document.getElementById('mobile-services-content');
    if (content) {
      const isOpen = content.classList.contains('is-open');
      if (isOpen) {
        content.classList.remove('is-open');
        btn.classList.remove('is-active');
        btn.setAttribute('aria-expanded', 'false');
      } else {
        content.classList.add('is-open');
        btn.classList.add('is-active');
        btn.setAttribute('aria-expanded', 'true');
      }
    }
  }
});

/* Interactive Showcase Hero Section */
function initHeroInteractive() {
  const heroSection = document.getElementById('hero-section');
  if (!heroSection) return;

  function animateCounter(el, target, suffix, duration) {
    if (!el) return;
    const isDecimal = String(target).includes('.');
    const step = isDecimal ? 0.1 : 1;
    const totalSteps = Math.abs(target / step);
    const stepTime = Math.max(Math.floor(duration / totalSteps), 14);
    let current = 0;
    
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { 
        current = target; 
        clearInterval(timer); 
      }
      el.textContent = (isDecimal ? current.toFixed(1) : Math.round(current)) + suffix;
    }, stepTime);
  }

  function startAllAnimations() {
    animateCounter(document.getElementById('counter-satisfaction'), 98, '%', 1200);
    animateCounter(document.getElementById('counter-leads'), 285, '%', 1200);
    animateCounter(document.getElementById('counter-roas'), 3.8, 'X', 1000);
    animateCounter(document.getElementById('counter-roas-badge'), 3.8, 'X', 1200);
    animateCounter(document.getElementById('counter-conv'), 42, '%', 1000);

    const growthBar = document.getElementById('growth-bar');
    const growthPct = document.getElementById('growth-pct');
    if (growthBar) growthBar.style.width = '87%';
    if (growthPct) {
      let p = 0;
      const pt = setInterval(() => {
        p += 2; 
        if (p >= 87) { p = 87; clearInterval(pt); }
        growthPct.textContent = p + '%';
      }, 20);
    }

    const ascentLine = document.getElementById('ascent-line');
    const ascentArea = document.getElementById('ascent-area');
    const chartValue = document.getElementById('chart-value');
    const dots = document.querySelectorAll('.ascent-dot');

    if (ascentLine) ascentLine.classList.add('drawn');
    if (ascentArea) ascentArea.classList.add('visible');
    if (chartValue) chartValue.classList.add('visible');

    dots.forEach((dot, i) => {
      setTimeout(() => { dot.classList.add('visible'); }, 200 + i * 100);
    });
  }

  // Start immediately
  startAllAnimations();

  // Interactive SVG Graph Dot Hover & Tooltip Handler
  const chartArea = document.getElementById('dash-chart-area');
  const tooltip = document.getElementById('chart-hover-tooltip');
  const ttMonth = document.getElementById('tt-month');
  const ttVal = document.getElementById('tt-val');
  const ttPct = document.getElementById('tt-pct');
  const trackerLine = document.getElementById('tracker-line');
  const dots = document.querySelectorAll('.ascent-dot');

  if (chartArea && tooltip && dots.length > 0) {
    dots.forEach((dot) => {
      dot.addEventListener('mouseenter', () => {
        dots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');

        const month = dot.getAttribute('data-month');
        const val = dot.getAttribute('data-val');
        const pct = dot.getAttribute('data-pct');
        const cx = dot.getAttribute('cx');

        if (ttMonth) ttMonth.textContent = month;
        if (ttVal) ttVal.textContent = val;
        if (ttPct) ttPct.textContent = pct;

        if (trackerLine) {
          trackerLine.setAttribute('x1', cx);
          trackerLine.setAttribute('x2', cx);
          trackerLine.style.opacity = '1';
        }

        tooltip.classList.add('active');
      });

      dot.addEventListener('mouseleave', () => {
        if (trackerLine) trackerLine.style.opacity = '0';
      });
    });

    chartArea.addEventListener('mouseleave', () => {
      tooltip.classList.remove('active');
      if (trackerLine) trackerLine.style.opacity = '0';
      dots.forEach(d => d.classList.remove('active'));
      if (dots[dots.length - 1]) dots[dots.length - 1].classList.add('active');
    });
  }

  // Dashboard Hover Re-trigger
  const dashMain = document.getElementById('dashboard-main');
  const ascentLine = document.getElementById('ascent-line');
  const ascentArea = document.getElementById('ascent-area');

  if (dashMain && ascentLine) {
    dashMain.addEventListener('mouseenter', () => {
      ascentLine.classList.remove('drawn');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ascentLine.classList.add('drawn');
        });
      });
    });
  }

  const scene = document.getElementById('showcase-scene');
  if (scene && window.innerWidth > 768) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const ry = ((mx - cx) / cx) * 5;
      const rx = ((cy - my) / cy) * 3;
      scene.style.transform = 'rotateY(' + ry + 'deg) rotateX(' + rx + 'deg)';
    });
    heroSection.addEventListener('mouseleave', () => {
      scene.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
  }
}
