/**
 * Vise Organic - Product Detail Page Dynamic Router & Controller
 * Loads product data from viseProductsData based on URL parameter ?id=<product-id>
 */

document.addEventListener('DOMContentLoaded', function() {
  // 1. Parse URL Parameter ?id=
  const urlParams = new URLSearchParams(window.location.search);
  let productId = urlParams.get('id') || 'psb-multiplier';

  // Fallback if productId does not exist in dataset
  if (typeof viseProductsData === 'undefined' || !viseProductsData[productId]) {
    productId = 'psb-multiplier';
  }

  const product = viseProductsData[productId];
  if (!product) return;

  // 2. Render Page Title & Meta
  document.title = `${product.title} | Vise Organic Agriculture`;

  // 3. Render Breadcrumbs
  const bCat = document.getElementById('breadcrumbCategory');
  const bTitle = document.getElementById('breadcrumbTitle');
  if (bCat) bCat.textContent = product.category;
  if (bTitle) bTitle.textContent = product.title;

  // 4. Render Main Gallery & Thumbnails
  const mainImg = document.getElementById('primaryProductImage');
  const thumbContainer = document.getElementById('thumbnailContainer');

  if (mainImg) {
    mainImg.src = product.mainImage;
    mainImg.alt = product.title;
  }

  if (thumbContainer && product.thumbnails) {
    thumbContainer.innerHTML = product.thumbnails.map((src, idx) => `
      <img src="${src}" alt="Thumbnail ${idx + 1}" class="thumb-img ${idx === 0 ? 'active' : ''}" data-img="${src}">
    `).join('');

    // Re-attach click listeners to generated thumbnails
    document.querySelectorAll('.thumb-img').forEach(thumb => {
      thumb.addEventListener('click', function() {
        document.querySelectorAll('.thumb-img').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        const newSrc = this.getAttribute('data-img');
        if (mainImg && newSrc) {
          mainImg.style.opacity = '0.4';
          setTimeout(() => {
            mainImg.src = newSrc;
            mainImg.style.opacity = '1';
          }, 150);
        }
      });
    });
  }

  // 5. Render Title, Badge, Item Code, Short Description
  const titleEl = document.getElementById('productTitleEl');
  const itemCodeEl = document.getElementById('productItemCodeEl');
  const descEl = document.getElementById('productShortDescEl');

  if (titleEl) titleEl.textContent = product.title;
  if (itemCodeEl) itemCodeEl.textContent = `Item Code: ${product.itemCode}`;
  if (descEl) descEl.innerHTML = product.shortDesc;

  // 6. Update WhatsApp Inquiry Buttons with pre-filled text
  const waMessage = encodeURIComponent(`Hello Vise Organic, I want price details & agronomy advice for ${product.title}.`);
  const waUrl = `https://wa.me/919876543210?text=${waMessage}`;
  document.querySelectorAll('.whatsapp-inquiry-link').forEach(link => {
    link.href = waUrl;
  });

  // 7. Render Quick Specs Box
  const qs = product.quickSpecs;
  if (qs) {
    const qsEl = document.getElementById('quickSpecsGrid');
    if (qsEl) {
      qsEl.innerHTML = `
        <div class="col-6 col-sm-4"><span class="text-vo-muted">Category:</span><div class="fw-bold text-vo-primary">${qs.category}</div></div>
        <div class="col-6 col-sm-4"><span class="text-vo-muted">Form:</span><div class="fw-bold text-vo-primary">${qs.form}</div></div>
        <div class="col-6 col-sm-4"><span class="text-vo-muted">Shelf Life:</span><div class="fw-bold text-vo-primary">${qs.shelfLife}</div></div>
        <div class="col-6 col-sm-4"><span class="text-vo-muted">Usage:</span><div class="fw-bold text-vo-primary">${qs.usage}</div></div>
        <div class="col-6 col-sm-4"><span class="text-vo-muted">Packing:</span><div class="fw-bold text-vo-primary">${qs.packing}</div></div>
        <div class="col-6 col-sm-4"><span class="text-vo-muted">Suitable Crops:</span><div class="fw-bold text-vo-primary">${qs.crops}</div></div>
      `;
    }
  }

  // 8. Render Key Features Grid
  const kfEl = document.getElementById('keyFeaturesGrid');
  if (kfEl && product.keyFeatures) {
    kfEl.innerHTML = product.keyFeatures.map(feat => `
      <div class="col-sm-4 col-6">
        <div class="p-3 bg-vo-light rounded-3 text-center h-100">
          <i class="bi ${feat.icon} fs-3 mb-1 d-block"></i>
          <div class="fw-bold font-poppins text-vo-primary small">${feat.title}</div>
          <div class="small text-vo-muted" style="font-size: 11px;">${feat.desc}</div>
        </div>
      </div>
    `).join('');
  }

  // 9. Render Product Specifications Table
  const tableEl = document.getElementById('specificationsTableBody');
  if (tableEl && product.specsTable) {
    tableEl.innerHTML = product.specsTable.map(row => `
      <tr>
        <td class="fw-bold text-vo-muted">${row.param}</td>
        <td class="text-vo-primary">${row.value}</td>
      </tr>
    `).join('');
  }

  // 10. Render Usage Process Stepper
  const stepperEl = document.getElementById('usageStepperWrapper');
  if (stepperEl && product.stepperSteps) {
    stepperEl.innerHTML = product.stepperSteps.map(step => `
      <div class="stepper-item active">
        <div class="stepper-icon">${step.step}</div>
        <div class="stepper-content">
          <div class="stepper-title">${step.title}</div>
          <div class="stepper-desc">${step.desc}</div>
        </div>
      </div>
    `).join('');
  }

  // 11. Render Product Benefits Grid
  const benEl = document.getElementById('productBenefitsGrid');
  if (benEl && product.benefits) {
    benEl.innerHTML = product.benefits.map(b => `
      <div class="col-md-6">
        <div class="card-vo p-3 h-100 border-start border-4 border-success">
          <div class="d-flex align-items-center gap-2 mb-2">
            <i class="bi ${b.icon} fs-4"></i>
            <h3 class="h6 font-poppins fw-bold text-vo-primary mb-0">${b.title}</h3>
          </div>
          <p class="small text-vo-muted mb-0">${b.desc}</p>
        </div>
      </div>
    `).join('');
  }

  // 12. Render Accordions (FAQ & Overview)
  const faqEl = document.getElementById('faqAccordionContent');
  if (faqEl && product.faq) {
    faqEl.innerHTML = product.faq.map(item => `
      <p class="mb-2"><strong>Q: ${item.q}</strong><br>
      A: ${item.a}</p>
    `).join('');
  }

  // 13. Render Related Products
  const relatedEl = document.getElementById('relatedProductsGrid');
  if (relatedEl && typeof viseProductsData !== 'undefined') {
    const keys = Object.keys(viseProductsData).filter(k => k !== productId).slice(0, 4);
    relatedEl.innerHTML = keys.map(k => {
      const rp = viseProductsData[k];
      return `
        <div class="col-lg-3 col-md-6">
          <div class="card-vo h-100 d-flex flex-column shadow-sm">
            <div class="card-img-wrapper">
              <img src="${rp.mainImage}" alt="${rp.title}" class="card-img-zoom">
            </div>
            <div class="card-body p-3 d-flex flex-column flex-grow-1 text-center">
              <h3 class="h6 font-poppins fw-bold text-vo-primary mb-2">${rp.title}</h3>
              <p class="small text-vo-muted mb-3 flex-grow-1" style="font-size: 12px;">${rp.category} • ${rp.quickSpecs ? rp.quickSpecs.form : 'Bio-Formulation'}</p>
              <a href="product-detail.html?id=${rp.id}" class="btn btn-vo-primary btn-sm mt-auto">View Details</a>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Copy Link Action Toast Trigger
  const copyBtn = document.getElementById('copyLinkBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const currentUrl = window.location.href;
      navigator.clipboard.writeText(currentUrl).then(() => {
        showToast('Product link copied to clipboard!');
      }).catch(() => {
        showToast('Link ready to share!');
      });
    });
  }

  function showToast(message) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;

    const toastEl = document.createElement('div');
    toastEl.className = 'toast align-items-center text-bg-success border-0 show shadow-lg';
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');
    toastEl.innerHTML = `
      <div class="d-flex">
        <div class="toast-body font-poppins fw-semibold">
          <i class="bi bi-check-circle-fill me-2"></i> ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;

    toastContainer.appendChild(toastEl);
    setTimeout(() => {
      toastEl.classList.remove('show');
      setTimeout(() => toastEl.remove(), 300);
    }, 3000);
  }
});
