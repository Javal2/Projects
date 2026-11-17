/**
 * Shrihari Tiffin - Core JavaScript
 * Handles component loading, scroll effects, filters, interactive UI, and form validations.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Load Header and Footer dynamically if placeholders exist
  loadComponent('header-placeholder', 'header.html', initNavbar);
  loadComponent('footer-placeholder', 'footer.html');

  // Initialize interactive components if present directly
  initNavbar();
  initCounters();
  initMenuFilters();
  initPlansToggle();
  initForms();
  initHeroSplineOrbitZoom();
  initMissionVisionInteractive();
});

/**
 * Spline-Style Orbit 3D Tilt, Hover Zoom & Scroll-Triggered Zoom Engine
 */
function initHeroSplineOrbitZoom() {
  const heroContainer = document.querySelector('.hero-image-container');
  const heroWrapper = document.getElementById('heroThaliWrapper');
  const heroFrame = document.querySelector('.hero-thali-frame');
  const heroSection = document.getElementById('hero');

  if (!heroWrapper || !heroSection || !heroContainer) return;

  // Target and current values for smooth spring lerping
  let targetRotateX = 0;
  let targetRotateY = 0;
  let currentRotateX = 0;
  let currentRotateY = 0;

  let isHovered = false;
  let hoverScale = 1.0;
  let targetHoverScale = 1.0;

  let scrollScale = 1.0;
  let scrollOpacity = 1.0;

  // Track mouse coordinates over container
  function handleMouseMove(e) {
    const rect = heroContainer.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = (e.clientX - centerX) / (rect.width / 2);
    const mouseY = (e.clientY - centerY) / (rect.height / 2);

    // Subtle 3D Orbit tilt (+/- 12 deg X, +/- 14 deg Y)
    targetRotateX = -mouseY * 12;
    targetRotateY = mouseX * 14;
  }

  function handleMouseEnter() {
    isHovered = true;
    targetHoverScale = 1.06; // Smooth 6% hover zoom-in
  }

  function handleMouseLeave() {
    isHovered = false;
    targetHoverScale = 1.0;
    targetRotateX = 0;
    targetRotateY = 0;
  }

  function handleTouchMove(e) {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      const rect = heroContainer.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const touchX = (touch.clientX - centerX) / (rect.width / 2);
      const touchY = (touch.clientY - centerY) / (rect.height / 2);

      targetRotateX = Math.max(-8, Math.min(8, -touchY * 8));
      targetRotateY = Math.max(-8, Math.min(8, touchX * 8));
    }
  }

  function handleTouchEnd() {
    targetRotateX = 0;
    targetRotateY = 0;
    targetHoverScale = 1.0;
  }

  function updateScrollState() {
    const scrollY = window.scrollY;
    const heroHeight = heroSection.offsetHeight || 600;

    if (scrollY <= heroHeight * 1.2) {
      const scrollRatio = Math.min(1, scrollY / heroHeight);
      scrollScale = 1 - scrollRatio * 0.28;
      scrollOpacity = 1 - scrollRatio * 0.15;
    } else {
      scrollScale = 0.72;
      scrollOpacity = 0.85;
    }
  }

  // Animation Loop using requestAnimationFrame
  function render() {
    // Lerp values for silky smooth spring movement (0.08 interpolation rate)
    currentRotateX += (targetRotateX - currentRotateX) * 0.08;
    currentRotateY += (targetRotateY - currentRotateY) * 0.08;
    hoverScale += (targetHoverScale - hoverScale) * 0.08;

    updateScrollState();

    const finalScale = scrollScale * hoverScale;

    // Apply combined 3D Orbit transform
    heroWrapper.style.transform = `perspective(1000px) rotateX(${currentRotateX.toFixed(2)}deg) rotateY(${currentRotateY.toFixed(2)}deg) scale(${finalScale.toFixed(3)})`;
    heroWrapper.style.opacity = Math.max(0.85, scrollOpacity).toFixed(2);

    // Dynamic 3D shadow shift for depth effect
    if (heroFrame) {
      const shadowX = (-currentRotateY * 1.5).toFixed(1);
      const shadowY = (20 + currentRotateX * 1.5).toFixed(1);
      const blur = isHovered ? 60 : 45;
      heroFrame.style.boxShadow = `${shadowX}px ${shadowY}px ${blur}px rgba(0, 0, 0, 0.18), 0 0 0 12px rgba(255, 255, 255, 0.9)`;
    }

    requestAnimationFrame(render);
  }

  // Attach event listeners to heroContainer
  heroContainer.addEventListener('mousemove', handleMouseMove, { passive: true });
  heroContainer.addEventListener('mouseenter', handleMouseEnter);
  heroContainer.addEventListener('mouseleave', handleMouseLeave);

  heroContainer.addEventListener('touchmove', handleTouchMove, { passive: true });
  heroContainer.addEventListener('touchend', handleTouchEnd);
  heroContainer.addEventListener('touchcancel', handleTouchEnd);

  // Start rendering loop
  render();
}

/**
 * Loads header or footer dynamically with fallback handling
 */
function loadComponent(elementId, url, callback) {
  const placeholder = document.getElementById(elementId);
  if (!placeholder) return;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error(`Failed to load ${url}`);
      return response.text();
    })
    .then(html => {
      placeholder.innerHTML = html;
      if (callback) callback();
    })
    .catch(err => {
      console.warn(`Dynamic component fetch (${url}) warning:`, err);
      // Fallback renderer if fetch fails due to strict local CORS/file policy
      if (elementId === 'header-placeholder') {
        renderHeaderFallback(placeholder);
      } else if (elementId === 'footer-placeholder') {
        renderFooterFallback(placeholder);
      }
      if (callback) callback();
    });
}

/**
 * Initialize Sticky Header & Active Link
 */
function initNavbar() {
  const navbar = document.querySelector('.navbar-shrihari');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        navbar.classList.add('navbar-scrolled');
      } else {
        navbar.classList.remove('navbar-scrolled');
      }
    });

    // Highlight Active Link
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link-shrihari');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}

/**
 * Menu Category & Dietary Filter Logic
 */
function initMenuFilters() {
  const categoryButtons = document.querySelectorAll('[data-menu-category]');
  const dietaryFilters = document.querySelectorAll('[data-dietary-filter]');
  const menuCards = document.querySelectorAll('.menu-item-card');

  if (menuCards.length === 0) return;

  let activeCategory = 'all';
  let activeDiet = 'all';

  function filterItems() {
    menuCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const cardDiet = card.getAttribute('data-diet');

      const matchCategory = (activeCategory === 'all' || cardCategory === activeCategory);
      const matchDiet = (activeDiet === 'all' || cardDiet === activeDiet);

      if (matchCategory && matchDiet) {
        card.parentElement.style.display = 'block';
        card.classList.add('animate__fadeIn');
      } else {
        card.parentElement.style.display = 'none';
      }
    });
  }

  categoryButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      categoryButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-menu-category');
      filterItems();
    });
  });

  dietaryFilters.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      dietaryFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeDiet = btn.getAttribute('data-dietary-filter');
      filterItems();
    });
  });
}

/**
 * Plans Pricing Toggle (Weekly vs Monthly)
 */
function initPlansToggle() {
  const billingToggle = document.getElementById('billingToggle');
  const priceElements = document.querySelectorAll('.plan-price');

  if (!billingToggle) return;

  billingToggle.addEventListener('change', () => {
    const isMonthly = billingToggle.checked;
    priceElements.forEach(el => {
      const weeklyPrice = el.getAttribute('data-weekly');
      const monthlyPrice = el.getAttribute('data-monthly');
      if (isMonthly) {
        el.textContent = '₹' + monthlyPrice;
        const periodLabel = el.nextElementSibling;
        if (periodLabel) periodLabel.textContent = '/ month';
      } else {
        el.textContent = '₹' + weeklyPrice;
        const periodLabel = el.nextElementSibling;
        if (periodLabel) periodLabel.textContent = '/ week';
      }
    });
  });
}

/**
 * Counter Animation
 */
function initCounters() {
  const counters = document.querySelectorAll('.counter-val');
  if (counters.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = +entry.target.getAttribute('data-target');
        let count = 0;
        const speed = target / 50;
        const updateCount = () => {
          count += speed;
          if (count < target) {
            entry.target.innerText = Math.ceil(count).toLocaleString() + '+';
            setTimeout(updateCount, 30);
          } else {
            entry.target.innerText = target.toLocaleString() + '+';
          }
        };
        updateCount();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

/**
 * Form Submission Toast Feedback
 */
function initForms() {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status"></span> Submitting...`;
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `<i class="bi bi-check-circle-fill me-2"></i> Sent Successfully!`;
          submitBtn.classList.remove('btn-orange');
          submitBtn.classList.add('btn-success');
        }
        form.reset();

        setTimeout(() => {
          if (submitBtn) {
            submitBtn.innerHTML = originalText;
            submitBtn.classList.remove('btn-success');
            submitBtn.classList.add('btn-orange');
          }
        }, 3000);
      }, 1200);
    });
  });
}

/**
 * Header Component Fallback (Ensures header displays even without HTTP server)
 */
function renderHeaderFallback(container) {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  container.innerHTML = `
    <nav class="navbar navbar-expand-lg fixed-top navbar-shrihari navbar-scrolled">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center" href="index.html">
          <img src="assets/images/logo.png" alt="Shree Hari Tiffin Logo" class="brand-logo-img">
        </a>
        <button class="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarMain">
          <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
            <li class="nav-item"><a class="nav-link nav-link-shrihari ${currentPath === 'index.html' || currentPath === '' ? 'active' : ''}" href="index.html">Home</a></li>
            <li class="nav-item"><a class="nav-link nav-link-shrihari ${currentPath === 'about.html' ? 'active' : ''}" href="about.html">About</a></li>
            <li class="nav-item"><a class="nav-link nav-link-shrihari ${currentPath === 'menu.html' ? 'active' : ''}" href="menu.html">Menu</a></li>
            <li class="nav-item"><a class="nav-link nav-link-shrihari ${currentPath === 'plans.html' ? 'active' : ''}" href="plans.html">Plans</a></li>
            <li class="nav-item"><a class="nav-link nav-link-shrihari ${currentPath === 'services.html' ? 'active' : ''}" href="services.html">Services</a></li>
            <li class="nav-item"><a class="nav-link nav-link-shrihari ${currentPath === 'blog.html' || currentPath === 'blog-details.html' ? 'active' : ''}" href="blog.html">Blog</a></li>
            <li class="nav-item"><a class="nav-link nav-link-shrihari ${currentPath === 'contact.html' ? 'active' : ''}" href="contact.html">Contact</a></li>
          </ul>
          <a href="plans.html" class="btn btn-orange btn-pulse ms-lg-3"><i class="bi bi-bag-check-fill me-1"></i> Order Now</a>
        </div>
      </div>
    </nav>
  `;
}

/**
 * Footer Component Fallback
 */
function renderFooterFallback(container) {
  container.innerHTML = `
    <footer class="pt-5 pb-4">
      <div class="container">
        <div class="row g-4 mb-5">
          <div class="col-lg-4 col-md-6">
            <a class="d-inline-block mb-3" href="index.html">
              <img src="assets/images/logo.png" alt="Shree Hari Tiffin Logo" class="brand-logo-img footer-logo-img">
            </a>
            <p class="text-secondary pe-lg-4">Fresh, hygienic, homestyle meals delivered daily — so you can enjoy the comfort of home-cooked food without the hassle of cooking.</p>
            <div class="d-flex gap-2 mt-3">
              <a href="#" class="social-icon-btn"><i class="bi bi-facebook"></i></a>
              <a href="#" class="social-icon-btn"><i class="bi bi-instagram"></i></a>
              <a href="https://wa.me/919876543210" class="social-icon-btn"><i class="bi bi-whatsapp"></i></a>
              <a href="#" class="social-icon-btn"><i class="bi bi-twitter-x"></i></a>
            </div>
          </div>
          <div class="col-lg-2 col-md-6">
            <h5 class="footer-heading">Quick Links</h5>
            <ul class="footer-links">
              <li><a href="index.html"><i class="bi bi-chevron-right me-1 text-orange"></i> Home</a></li>
              <li><a href="about.html"><i class="bi bi-chevron-right me-1 text-orange"></i> About Us</a></li>
              <li><a href="menu.html"><i class="bi bi-chevron-right me-1 text-orange"></i> Daily Menu</a></li>
              <li><a href="plans.html"><i class="bi bi-chevron-right me-1 text-orange"></i> Meal Plans</a></li>
              <li><a href="services.html"><i class="bi bi-chevron-right me-1 text-orange"></i> Services</a></li>
              <li><a href="contact.html"><i class="bi bi-chevron-right me-1 text-orange"></i> Contact Us</a></li>
            </ul>
          </div>
          <div class="col-lg-3 col-md-6">
            <h5 class="footer-heading">Service Areas</h5>
            <div class="d-flex flex-wrap gap-1 text-secondary text-small">
              <span class="badge bg-dark border border-secondary text-light mb-1">Navrangpura</span>
              <span class="badge bg-dark border border-secondary text-light mb-1">Satellite</span>
              <span class="badge bg-dark border border-secondary text-light mb-1">SG Highway</span>
              <span class="badge bg-dark border border-secondary text-light mb-1">Prahlad Nagar</span>
              <span class="badge bg-dark border border-secondary text-light mb-1">Vastrapur</span>
              <span class="badge bg-dark border border-secondary text-light mb-1">Bodakdev</span>
              <span class="badge bg-dark border border-secondary text-light mb-1">Bopal</span>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <h5 class="footer-heading">Stay Connected</h5>
            <p class="text-secondary text-small mb-3">Subscribe to get weekly menu updates & special homestyle promo codes.</p>
            <form class="mb-3">
              <div class="premium-newsletter-group">
                <input type="email" class="form-control newsletter-input" placeholder="Enter your email address" required aria-label="Email address">
                <button class="btn btn-newsletter-send" type="submit" aria-label="Subscribe"><i class="bi bi-send-fill"></i></button>
              </div>
            </form>
            <p class="text-secondary text-small"><i class="bi bi-telephone-fill text-orange me-2"></i> +91 98765 43210</p>
          </div>
        </div>
        <hr class="border-secondary opacity-25">
        <div class="row align-items-center pt-3">
          <div class="col-md-6 text-center text-md-start text-secondary text-small">
            © 2026 Shrihari Tiffin Services. All rights reserved. Built with Bootstrap 5.
          </div>
          <div class="col-md-6 text-center text-md-end text-secondary text-small mt-2 mt-md-0">
            <a href="#" class="text-secondary text-decoration-none me-3">Privacy Policy</a>
            <a href="#" class="text-secondary text-decoration-none me-3">Terms of Service</a>
            <a href="#" class="text-secondary text-decoration-none">Hygiene Guidelines</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}

/**
 * Mission & Vision Interactive Controller
 * Native IntersectionObserver for scroll animations & JS 3D Tilt micro-interactions
 */
function initMissionVisionInteractive() {
  const mvSection = document.getElementById('mission-vision');
  if (!mvSection) return;

  // 1. Intersection Observer for Scroll Animations (triggers once when entering viewport)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        mvSection.classList.add('mv-section-active');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  observer.observe(mvSection);

  // 2. 3D Tilt & Light Follow Micro-interactions
  const tiltCards = mvSection.querySelectorAll('[data-mv-tilt]');
  tiltCards.forEach(card => {
    const lightGlow = card.querySelector('.mv-card-light-glow');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate center offset (-1 to +1)
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6; // max 6deg tilt
      const rotateY = ((x - centerX) / centerX) * 6;  // max 6deg tilt

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;

      if (lightGlow) {
        lightGlow.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(249, 93, 2, 0.16), transparent 60%)`;
        lightGlow.style.opacity = '1';
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      if (lightGlow) {
        lightGlow.style.opacity = '0';
      }
    });
  });
}
