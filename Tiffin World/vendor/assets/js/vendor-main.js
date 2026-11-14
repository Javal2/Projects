/* ==========================================================================
   TiffinWorld Vendor Panel - Core JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCountUpCounters();
  initThemeToggle();
  initLiveProductPreview();
  initTableSearch();
  initReplyTemplates();
});

/* Count-Up Numbers Animation */
function initCountUpCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  counters.forEach(counter => {
    const target = parseFloat(counter.getAttribute('data-counter'));
    const prefix = counter.getAttribute('data-prefix') || '';
    const suffix = counter.getAttribute('data-suffix') || '';
    const decimals = parseInt(counter.getAttribute('data-decimals')) || 0;
    
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out quad
      const easeProgress = 1 - (1 - progress) * (1 - progress);
      const currentVal = start + (target - start) * easeProgress;

      counter.textContent = prefix + currentVal.toFixed(decimals) + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }

    requestAnimationFrame(updateCounter);
  });
}

/* Dark Mode Theme Switcher */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (!themeToggleBtn) return;

  const currentTheme = localStorage.getItem('vendorTheme') || 'light';
  document.documentElement.setAttribute('data-bs-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    const activeTheme = document.documentElement.getAttribute('data-bs-theme');
    const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-bs-theme', newTheme);
    localStorage.setItem('vendorTheme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#themeToggleBtn i');
  if (!icon) return;
  if (theme === 'dark') {
    icon.className = 'bi bi-sun-fill text-warning';
  } else {
    icon.className = 'bi bi-moon-stars';
  }
}

/* Add Product Live Website Preview Sync */
function initLiveProductPreview() {
  const titleInput = document.getElementById('productTitleInput');
  const priceInput = document.getElementById('productPriceInput');
  const catInput = document.getElementById('productCatInput');
  const descInput = document.getElementById('productDescInput');
  const tagInput = document.getElementById('productTagInput');

  const previewTitle = document.getElementById('previewTitle');
  const previewPrice = document.getElementById('previewPrice');
  const previewCat = document.getElementById('previewCat');
  const previewDesc = document.getElementById('previewDesc');
  const previewTag = document.getElementById('previewTag');

  if (titleInput && previewTitle) {
    titleInput.addEventListener('input', (e) => {
      previewTitle.textContent = e.target.value.trim() || 'Deluxe Gujarati Thali Tiffin';
      updateQualityScore();
    });
  }

  if (priceInput && previewPrice) {
    priceInput.addEventListener('input', (e) => {
      previewPrice.textContent = e.target.value ? '₹' + e.target.value : '₹140';
      updateQualityScore();
    });
  }

  if (catInput && previewCat) {
    catInput.addEventListener('change', (e) => {
      previewCat.textContent = e.target.options[e.target.selectedIndex].text;
    });
  }

  if (descInput && previewDesc) {
    descInput.addEventListener('input', (e) => {
      previewDesc.textContent = e.target.value.trim() || 'Freshly cooked authentic home meal with 4 Phulkas, Sabzi, Dal, and Sweet.';
      updateQualityScore();
    });
  }

  if (tagInput && previewTag) {
    tagInput.addEventListener('input', (e) => {
      previewTag.textContent = e.target.value.trim() || 'Pure Veg';
    });
  }
}

function updateQualityScore() {
  const bar = document.getElementById('qualityMeterBar');
  const text = document.getElementById('qualityScoreText');
  if (!bar || !text) return;

  let score = 20;
  if (document.getElementById('productTitleInput')?.value.length > 5) score += 20;
  if (document.getElementById('productPriceInput')?.value > 0) score += 20;
  if (document.getElementById('productDescInput')?.value.length > 20) score += 20;
  if (document.getElementById('productTagInput')?.value) score += 20;

  bar.style.width = score + '%';
  text.textContent = score + '% Excellent';
}

/* Live Table & List Search Filter */
function initTableSearch() {
  const searchInput = document.getElementById('headerSearchInput') || document.getElementById('tableSearchInput');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('table tbody tr, .searchable-card');

    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      if (text.includes(term)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });
}

/* Quick Response Template Injector for Inquiry Detail */
function initReplyTemplates() {
  const select = document.getElementById('replyTemplateSelect');
  const textarea = document.getElementById('replyTextarea');
  if (!select || !textarea) return;

  const templates = {
    pricing: "Hello! Thank you for inquiring about our Tiffin Services. Our monthly subscription starts at ₹3,200 for 26 days (Lunch/Dinner), including free delivery.",
    menu: "Hello! Our daily menu features a healthy mix of North Indian & Gujarati dishes cooked in low oil. We provide 4 Roti, 2 Sabzi, Dal, Rice, and Salad.",
    custom: "Hi there! Yes, we accommodate special dietary requests such as Jain food, low salt, or extra rotis. Let us know your preferred start date!"
  };

  select.addEventListener('change', (e) => {
    const val = e.target.value;
    if (templates[val]) {
      textarea.value = templates[val];
    }
  });
}

/* Glassmorphic Toast Notification Helper */
function showToast(message, type = 'success', title = '') {
  const container = document.getElementById('toastGlassContainer') || createToastGlassContainer();
  
  const toastCard = document.createElement('div');
  toastCard.className = 'toast-glass-card';

  let iconClass = 'bi-check-circle-fill';
  let displayTitle = title || (type === 'danger' ? 'Notice' : (type === 'info' ? 'Update' : 'Success'));
  
  if (type === 'danger') {
    iconClass = 'bi-trash-fill';
  } else if (type === 'info') {
    iconClass = 'bi-pencil-square';
  }

  toastCard.innerHTML = `
    <div class="toast-icon-badge ${type}">
      <i class="bi ${iconClass}"></i>
    </div>
    <div class="pe-2">
      <div class="toast-glass-title">${displayTitle}</div>
      <div class="toast-glass-msg">${message}</div>
    </div>
    <button class="toast-glass-close" onclick="this.parentElement.remove()" title="Close"><i class="bi bi-x-lg"></i></button>
    <div class="toast-progress-bar ${type}"></div>
  `;

  container.appendChild(toastCard);

  setTimeout(() => {
    toastCard.style.opacity = '0';
    toastCard.style.transform = 'translateY(-10px) scale(0.96)';
    setTimeout(() => toastCard.remove(), 300);
  }, 4000);
}

function createToastGlassContainer() {
  const container = document.createElement('div');
  container.id = 'toastGlassContainer';
  container.className = 'toast-glass-container';
  document.body.appendChild(container);
  return container;
}

