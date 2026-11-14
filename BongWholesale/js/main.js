/* ==========================================================================
   MAIN APPLICATION ENGINE & INTERACTIVE CONTROLLERS
   Lenis Smooth Scroll + GSAP ScrollTrigger + Magnetic Cursor + UI Drawers
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  // initCustomCursor(); - Disabled as per user request
  initNavbarScroll();
  initGSAPAnimations();
  // init3DCardsTilt(); - Disabled as per user request to make all elements static
  initCounterStats();
  initCartAndQuickView();
  initFAQFilter();
  initB2BCalculator();
});

/* --------------------------------------------------------------------------
   1. PRELOADER LIFECYCLE
   -------------------------------------------------------------------------- */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  function dismissLoader() {
    if (preloader.classList.contains('hide-loader')) return;
    preloader.classList.add('hide-loader');
    preloader.style.opacity = '0';
    preloader.style.pointerEvents = 'none';
    setTimeout(() => {
      preloader.style.display = 'none';
      if (preloader.parentNode) {
        preloader.parentNode.removeChild(preloader);
      }
    }, 300);
    document.body.classList.add('loaded');
    if (typeof gsap !== 'undefined') {
      gsap.from('.hero-badge', { opacity: 0, y: 20, duration: 0.6 });
      gsap.from('.hero-title-line', { opacity: 0, y: 30, duration: 0.8, stagger: 0.15, ease: "power3.out" });
      gsap.from('.hero-desc', { opacity: 0, y: 20, duration: 0.6, delay: 0.3 });
      gsap.from('.hero-cta-group', { opacity: 0, y: 20, duration: 0.6, delay: 0.4 });
    }
  }

  // Fast GSAP dismiss
  if (typeof gsap !== 'undefined') {
    const tl = gsap.timeline({ onComplete: dismissLoader });
    tl.to('.preloader-ring', { scale: 1.1, opacity: 1, duration: 0.3 })
      .to('.preloader-logo img', { opacity: 1, scale: 1.05, duration: 0.2 }, "-=0.1")
      .to('#preloader', { opacity: 0, duration: 0.3, delay: 0.1 });
  }

  // Safety fallback: guaranteed dismiss in 400ms max
  setTimeout(dismissLoader, 400);
}

// Emergency global fallback timer (600ms)
setTimeout(() => {
  const p = document.getElementById('preloader');
  if (p) {
    p.classList.add('hide-loader');
    p.style.opacity = '0';
    p.style.pointerEvents = 'none';
    p.style.display = 'none';
    if (p.parentNode) {
      p.parentNode.removeChild(p);
    }
    document.body.classList.add('loaded');
  }
}, 600);

/* --------------------------------------------------------------------------
   3. MAGNETIC CURSOR & FOLLOW-SPOTLIGHT
   -------------------------------------------------------------------------- */
function initCustomCursor() {
  const dot = document.querySelector('.cursor-dot');
  const follower = document.querySelector('.cursor-follower');
  if (!dot || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
  });

  function renderCursor() {
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;

    follower.style.left = `${followerX}px`;
    follower.style.top = `${followerY}px`;

    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Magnetic hover effect on interactive elements
  const magnetics = document.querySelectorAll('.btn-glow-orange, .btn-glass, .nav-icon-btn, .category-card, .product-card');
  magnetics.forEach((el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-hover');
      gsap.to(el, { x: 0, y: 0, duration: 0.4, ease: 'power2.out' });
    });

    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, { x: relX * 0.15, y: relY * 0.15, duration: 0.2 });
    });
  });
}

/* --------------------------------------------------------------------------
   4. STICKY GLASS NAVBAR ON SCROLL
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar-glass');
  if (!navbar) return;

  // If the page has a dark hero banner, keep navbar always white
  const forceScrolled = navbar.dataset.forceScrolled === 'true';

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      if (!forceScrolled) {
        navbar.classList.remove('scrolled');
      }
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   5. GSAP SCROLLTRIGGER ANIMATIONS FOR SECTIONS
   -------------------------------------------------------------------------- */
function initGSAPAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Section Title Fade Ups
  gsap.utils.toArray('.section-title-reveal').forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      opacity: 0,
      y: 40,
      duration: 1,
      ease: 'power3.out'
    });
  });

  // Category Glass Cards Stagger Reveal
  if (document.querySelector('.cat-glass-card')) {
    gsap.from('.cat-glass-card', {
      scrollTrigger: {
        trigger: '.section-categories',
        start: 'top 85%'
      },
      opacity: 0,
      y: 45,
      scale: 0.92,
      stagger: 0.12,
      duration: 0.85,
      ease: 'back.out(1.3)',
      clearProps: 'opacity,transform'
    });
  }

  // Refresh ScrollTrigger positions cleanly
  setTimeout(() => {
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  }, 200);

  // Refresh ScrollTrigger positions after images and 3D assets settle
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 250);
}

/* --------------------------------------------------------------------------
   6. 3D CARD TILT ON MOUSE MOVEMENT
   -------------------------------------------------------------------------- */
function init3DCardsTilt() {
  const cards = document.querySelectorAll('.product-card, .category-card, .glass-panel');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

/* --------------------------------------------------------------------------
   7. LIVE COUNTER METRICS
   -------------------------------------------------------------------------- */
function initCounterStats() {
  const counters = document.querySelectorAll('.stat-number');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target') || '0', 10);
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';

        gsap.to({ count: 0 }, {
          count: target,
          duration: 2.5,
          ease: 'power2.out',
          onUpdate: function () {
            el.innerText = `${prefix}${Math.floor(this.targets()[0].count).toLocaleString()}${suffix}`;
          }
        });
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach((c) => observer.observe(c));
}

/* --------------------------------------------------------------------------
   8. CART & QUICK VIEW MODAL CONTROLLER
   -------------------------------------------------------------------------- */
const CART_STORAGE_KEY = 'bongws_wholesale_cart_items';

function getStoredCart() {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.warn('localStorage cart read failed', e);
  }
  return [
    { id: 1, title: 'Obsidian Beaker 14"', price: 42.00, qty: 10, img: 'images/beaker_bong.png' }
  ];
}

let cartItems = getStoredCart();

function saveCart() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  } catch (e) {
    console.warn('localStorage cart save failed', e);
  }
}

function initCartAndQuickView() {
  updateCartUI();

  // Product Card Click Navigation Handler
  document.querySelectorAll('.product-card').forEach((card) => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      // Do not navigate if clicking action buttons or modal triggers
      if (e.target.closest('button') || e.target.closest('a') || e.target.closest('.btn-quick-action') || e.target.closest('.btn-add-cart')) {
        return;
      }

      const title = card.querySelector('.product-title')?.innerText || 'Glassware Spec';
      const price = card.querySelector('.price-unit')?.innerText || '$42.00';
      const img = card.querySelector('.product-img-wrapper img')?.src || 'images/beaker_bong.png';
      const spec = card.querySelector('.spec-badge')?.innerText || '7mm Wall';

      window.location.href = `product-detail.html?name=${encodeURIComponent(title)}&price=${encodeURIComponent(price)}&img=${encodeURIComponent(img)}&spec=${encodeURIComponent(spec)}`;
    });
  });

  // Quick View Click Handlers
  document.querySelectorAll('.btn-quick-view').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.product-card');
      if (!card) return;

      const title = card.querySelector('.product-title')?.innerText || 'Glass Bong';
      const price = card.querySelector('.price-unit')?.innerText || '$45.00';
      const img = card.querySelector('.product-img-wrapper img')?.src || 'images/beaker_bong.png';

      const modalTitle = document.getElementById('quickViewModalTitle');
      const modalPrice = document.getElementById('quickViewModalPrice');
      const modalImg = document.getElementById('quickViewModalImg');

      if (modalTitle) modalTitle.innerText = title;
      if (modalPrice) modalPrice.innerText = price;
      if (modalImg) modalImg.src = img;

      const modalEl = document.getElementById('quickViewModal');
      if (modalEl && window.bootstrap) {
        const bsModal = new bootstrap.Modal(modalEl);
        bsModal.show();
      }
    });
  });

  // Add To Cart Handlers
  document.querySelectorAll('.btn-add-cart, .btn-fk-cart').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      
      let title = 'Obsidian Beaker 14" Dual Percolator';
      let price = 42.00;
      let qty = 10;
      let img = 'images/beaker_bong.png';

      const card = btn.closest('.product-card') || btn.closest('.fk-card');
      if (card) {
        const titleEl = card.querySelector('.product-title, .fk-card-name');
        if (titleEl) title = titleEl.innerText.trim();

        const priceEl = card.querySelector('.price-unit, .fk-price-ws');
        if (priceEl) {
          const match = priceEl.innerText.match(/[\d.]+/);
          if (match) price = parseFloat(match[0]);
        }

        const imgEl = card.querySelector('.product-img-wrapper img, .fk-card-img-wrap img');
        if (imgEl) img = imgEl.src;

        const moqEl = card.querySelector('.moq-indicator, .fk-card-tier');
        if (moqEl) {
          const moqMatch = moqEl.innerText.match(/\d+/);
          if (moqMatch) qty = parseInt(moqMatch[0], 10);
        }
      } else {
        // Product detail page context
        const detailTitle = document.getElementById('fkProductTitle');
        if (detailTitle) title = detailTitle.innerText.trim();

        const detailPrice = document.getElementById('fkPriceUnit');
        if (detailPrice) {
          const match = detailPrice.innerText.match(/[\d.]+/);
          if (match) price = parseFloat(match[0]);
        }

        const detailImg = document.getElementById('fkMainImg');
        if (detailImg) img = detailImg.src;
      }

      addToCart(title, price, qty, img);

      // Toast Notification
      showToast(`Added ${qty}x ${title} to Wholesale Order Cart!`);
    });
  });
}

function addToCart(title, price, qty, img) {
  const existing = cartItems.find((item) => item.title === title);
  if (existing) {
    existing.qty += qty;
  } else {
    cartItems.push({ id: Date.now(), title, price, qty: qty || 10, img: img || 'images/beaker_bong.png' });
  }
  saveCart();
  updateCartUI();
}

window.addToCart = addToCart;

function updateCartUI() {
  const cartList = document.getElementById('cartItemsList');
  const cartCountBadges = document.querySelectorAll('.badge-cart-count');
  const cartSubtotal = document.getElementById('cartSubtotal');
  const checkoutContainer = document.getElementById('checkoutCartItems');
  const checkoutSubtotal = document.getElementById('checkoutSubtotal');
  const checkoutTotal = document.getElementById('checkoutTotal');

  let totalPacks = cartItems.length;
  let totalPrice = 0;

  // Offcanvas Drawer List
  if (cartList) {
    cartList.innerHTML = '';
    if (cartItems.length === 0) {
      cartList.innerHTML = '<div class="text-center text-muted py-5"><i class="bi bi-cart-x fs-1 d-block mb-2 text-warning opacity-50"></i>Your wholesale order cart is empty.</div>';
    } else {
      cartItems.forEach((item, index) => {
        totalPrice += item.price * item.qty;

        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
          <img src="${item.img}" class="cart-item-img" alt="${item.title}">
          <div class="cart-item-info">
            <h6 class="mb-1 text-dark fw-bold text-truncate" style="font-size: 0.88rem;" title="${item.title}">${item.title}</h6>
            <div class="text-gradient-orange fw-bold" style="font-size: 0.92rem;">$${item.price.toFixed(2)} / unit</div>
            <small class="text-muted d-block text-truncate">Pack: ${item.qty} units ($${(item.price * item.qty).toFixed(2)})</small>
          </div>
          <button class="cart-del-btn" onclick="removeCartItem(${index})" title="Remove from Order Cart" aria-label="Remove item">
            <i class="bi bi-trash3-fill"></i>
          </button>
        `;
        cartList.appendChild(div);
      });
    }
  } else {
    cartItems.forEach((item) => {
      totalPrice += item.price * item.qty;
    });
  }

  // Checkout Page Order Summary (if present)
  if (checkoutContainer) {
    checkoutContainer.innerHTML = '';
    if (cartItems.length === 0) {
      checkoutContainer.innerHTML = '<div class="text-muted text-center py-4"><i class="bi bi-cart-x fs-2 d-block mb-2 text-warning"></i>No items in wholesale order. <a href="shop.html" class="text-warning fw-bold text-decoration-none">Browse Catalog</a></div>';
      if (checkoutSubtotal) checkoutSubtotal.innerText = '$0.00';
      if (checkoutTotal) checkoutTotal.innerText = '$0.00';
    } else {
      cartItems.forEach((item, index) => {
        const itemTotal = item.price * item.qty;
        const row = document.createElement('div');
        row.className = 'cart-item';
        row.innerHTML = `
          <img src="${item.img}" class="cart-item-img" alt="${item.title}">
          <div class="cart-item-info">
            <h6 class="mb-1 text-dark fw-bold text-truncate" style="font-size: 0.9rem;" title="${item.title}">${item.title}</h6>
            <div class="text-gradient-orange fw-bold" style="font-size: 0.95rem;">$${item.price.toFixed(2)} / unit</div>
            <small class="text-muted d-block">${item.qty} Units Pack</small>
          </div>
          <span class="text-dark font-heading fw-bold px-2 flex-shrink-0">$${itemTotal.toFixed(2)}</span>
          <button class="cart-del-btn" onclick="removeCartItem(${index})" title="Remove from Order" aria-label="Remove item">
            <i class="bi bi-trash3-fill"></i>
          </button>
        `;
        checkoutContainer.appendChild(row);
      });
      if (checkoutSubtotal) checkoutSubtotal.innerText = `$${totalPrice.toFixed(2)}`;
      if (checkoutTotal) checkoutTotal.innerText = `$${totalPrice.toFixed(2)}`;
    }
  }

  cartCountBadges.forEach((b) => {
    b.innerText = totalPacks;
  });

  if (cartSubtotal) {
    cartSubtotal.innerText = `$${totalPrice.toFixed(2)}`;
  }
}

window.updateCartUI = updateCartUI;

window.removeCartItem = function (index) {
  const removedItem = cartItems[index];
  cartItems.splice(index, 1);
  saveCart();
  updateCartUI();
  if (removedItem && typeof showToast === 'function') {
    showToast(`Removed "${removedItem.title}" from Wholesale Cart`);
  }
};

function showToast(msg) {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.style.position = 'fixed';
    toastContainer.style.bottom = '30px';
    toastContainer.style.right = '30px';
    toastContainer.style.zIndex = '10500';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'glass-panel p-3 shadow-lg d-flex align-items-center gap-3 bg-white text-dark';
  toast.style.borderColor = '#E87F24';
  toast.style.minWidth = '300px';
  toast.style.maxWidth = '400px';
  toast.innerHTML = `
    <i class="bi bi-check-circle-fill text-warning fs-3 flex-shrink-0"></i>
    <div>
      <strong class="d-block font-heading text-dark">Wholesale Cart</strong>
      <small class="text-muted">${msg}</small>
    </div>
  `;

  toastContainer.appendChild(toast);
  if (typeof gsap !== 'undefined') {
    gsap.from(toast, { opacity: 0, x: 50, duration: 0.4 });
    setTimeout(() => {
      gsap.to(toast, { opacity: 0, x: 50, duration: 0.4, onComplete: () => toast.remove() });
    }, 3500);
  } else {
    setTimeout(() => toast.remove(), 3500);
  }
}
window.showToast = showToast;

/* --------------------------------------------------------------------------
   9. FAQ ACCORDION FILTER SEARCH
   -------------------------------------------------------------------------- */
function initFAQFilter() {
  const input = document.getElementById('faqSearchInput');
  if (!input) return;

  input.addEventListener('input', (e) => {
    const val = e.target.value.toLowerCase();
    const items = document.querySelectorAll('.accordion-glass .accordion-item');

    items.forEach((item) => {
      const text = item.innerText.toLowerCase();
      if (text.includes(val)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   10. B2B MARGIN & QUOTE CALCULATOR (WHOLESALE PAGE)
   -------------------------------------------------------------------------- */
function initB2BCalculator() {
  const rangeInput = document.getElementById('unitsRangeInput');
  const unitVal = document.getElementById('calcUnitsVal');
  const marginVal = document.getElementById('calcMarginVal');
  const profitVal = document.getElementById('calcProfitVal');

  if (!rangeInput) return;

  rangeInput.addEventListener('input', (e) => {
    const units = parseInt(e.target.value, 10);
    if (unitVal) unitVal.innerText = `${units} Units`;

    // Tier pricing discounts
    let unitCost = 35;
    if (units >= 100) unitCost = 25;
    if (units >= 250) unitCost = 20;
    if (units >= 500) unitCost = 16;

    const msrp = 65; // Estimated retail price
    const profitPerUnit = msrp - unitCost;
    const marginPct = Math.round((profitPerUnit / msrp) * 100);
    const totalEstProfit = profitPerUnit * units;

    if (marginVal) marginVal.innerText = `${marginPct}%`;
    if (profitVal) profitVal.innerText = `$${totalEstProfit.toLocaleString()}`;
  });
}
