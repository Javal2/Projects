/**
 * Vise Organic - Modern Homepage Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Sticky Navbar Shadow on Scroll
  // ==========================================
  const navbar = document.querySelector('.navbar-vo');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // ==========================================
  // 2. Animated Counter for Field Results Statistics
  // ==========================================
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const animateCounters = () => {
    const section = document.getElementById('field-results');
    if (!section) return;

    const sectionPos = section.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.2;

    if (sectionPos < screenPos && !animated) {
      animated = true;
      statNumbers.forEach(stat => {
        const target = parseFloat(stat.getAttribute('data-target'));
        const prefix = stat.getAttribute('data-prefix') || '';
        const suffix = stat.getAttribute('data-suffix') || '';
        const isDecimal = target % 1 !== 0;
        let count = 0;
        const duration = 2000;
        const step = target / (duration / 16);

        const updateCount = () => {
          count += step;
          if (count < target) {
            stat.innerText = prefix + (isDecimal ? count.toFixed(1) : Math.floor(count)) + suffix;
            requestAnimationFrame(updateCount);
          } else {
            stat.innerText = prefix + (isDecimal ? target.toFixed(1) : target) + suffix;
          }
        };
        updateCount();
      });
    }
  };

  window.addEventListener('scroll', animateCounters);
  animateCounters(); // Initial check

  // ==========================================
  // 3. Interactive Crop ROI & Soil Health Calculator
  // ==========================================
  const farmSizeInput = document.getElementById('calc-farm-size');
  const farmSizeVal = document.getElementById('calc-farm-size-val');
  const cropTypeSelect = document.getElementById('calc-crop-type');
  const currentCostInput = document.getElementById('calc-current-cost');

  const resYieldGain = document.getElementById('calc-res-yield');
  const resSavings = document.getElementById('calc-res-savings');
  const resTotalGain = document.getElementById('calc-res-total');

  const calculateROI = () => {
    if (!farmSizeInput || !cropTypeSelect || !currentCostInput) return;

    const acres = parseFloat(farmSizeInput.value) || 5;
    if (farmSizeVal) farmSizeVal.innerText = acres + ' Acres';

    const cropFactor = parseFloat(cropTypeSelect.value) || 1.2;
    const costPerAcre = parseFloat(currentCostInput.value) || 12000;

    // Formulas:
    // Chemical cost savings ~ 40% reduction
    const savings = Math.round(acres * costPerAcre * 0.40);
    // Yield value boost ~ 25% * crop multiplier * estimated harvest value
    const yieldBoost = Math.round(acres * costPerAcre * 1.8 * 0.25 * cropFactor);
    const totalNetGain = savings + yieldBoost;

    if (resYieldGain) resYieldGain.innerText = '₹ ' + yieldBoost.toLocaleString('en-IN');
    if (resSavings) resSavings.innerText = '₹ ' + savings.toLocaleString('en-IN');
    if (resTotalGain) resTotalGain.innerText = '₹ ' + totalNetGain.toLocaleString('en-IN');
  };

  farmSizeInput?.addEventListener('input', calculateROI);
  cropTypeSelect?.addEventListener('change', calculateROI);
  currentCostInput?.addEventListener('input', calculateROI);
  calculateROI();

  // ==========================================
  // 4. Before / After Crop Image Slider
  // ==========================================
  const baSlider = document.getElementById('ba-slider');
  const baOverlay = document.getElementById('ba-overlay');

  if (baSlider && baOverlay) {
    baSlider.addEventListener('input', (e) => {
      const val = e.target.value;
      baOverlay.style.width = `${val}%`;
    });
  }

  // ==========================================
  // 5. Product Quick View Modal Handler
  // ==========================================
  const productData = {
    biofertilizers: {
      title: "Science-Backed Biofertilizers",
      category: "Soil Microflora & Nutrition",
      description: "Vise Organic Biofertilizers enrich the soil microbiome with specialized nitrogen-fixing bacteria, phosphate solubilizers, and mycorrhizal fungi. Accelerates root establishment and nutrient absorption.",
      benefits: [
        "Increases soil microbial activity by over 300%",
        "Replaces up to 45% of synthetic Chemical N-P-K fertilizers",
        "Improves moisture retention and drought resistance",
        "100% NPOP & Organic Certified"
      ],
      dosages: "2-3 kg per acre mixing with organic compost or via drip fertigation."
    },
    biopesticides: {
      title: "Botanical & Microbial Biopesticides",
      category: "Natural Crop Protection",
      description: "Targeted botanical extracts and entomopathogenic fungi formulations that neutralize chewing and sucking pests without harming beneficial pollinators or earthworms.",
      benefits: [
        "Zero chemical residue on harvested produce",
        "Broad-spectrum control for bollworms, aphids, and whiteflies",
        "Prevents pest resistance buildup",
        "Safe for farmers, bees, and soil micro-fauna"
      ],
      dosages: "3-5 ml per liter of water during early pest emergence stage."
    },
    growth_regulators: {
      title: "Plant Growth Regulators & Biostimulants",
      category: "Yield & Stress Optimization",
      description: "Advanced phyto-hormones, amino acid complexes, and sea-kelp extracts engineered to trigger profuse flowering, fruit setting, and abiotic stress recovery.",
      benefits: [
        "Boosts photosynthetic efficiency by up to 28%",
        "Prevents flower dropping and increases fruit size",
        "Enhances crop recovery after heat stress or flood shock",
        "Enhances crop color, shine, and market value"
      ],
      dosages: "1-2 ml per liter of water as foliar spray during flowering/fruiting phase."
    },
    adjuvants: {
      title: "Agricultural Bio-Adjuvants",
      category: "Spraying Efficiency & Spreading",
      description: "Non-ionic organo-silicone surfactant that drastically lowers surface tension, allowing sprays to spread evenly and penetrate deep into foliage cuticles.",
      benefits: [
        "Super-spreading & rapid cuticle penetration within 15 minutes",
        "Prevents rain wash-off of sprays",
        "Reduces total spray volume needed by 25-30%",
        "Compatible with all bio-formulations and fertilizers"
      ],
      dosages: "0.3 - 0.5 ml per liter of spray water."
    }
  };

  const productModal = document.getElementById('productQuickViewModal');
  if (productModal) {
    productModal.addEventListener('show.bs.modal', (event) => {
      const button = event.relatedTarget;
      const prodKey = button.getAttribute('data-product');
      const data = productData[prodKey];

      if (data) {
        document.getElementById('modalProdTitle').innerText = data.title;
        document.getElementById('modalProdCategory').innerText = data.category;
        document.getElementById('modalProdDesc').innerText = data.description;
        document.getElementById('modalProdDosage').innerText = data.dosages;

        const listContainer = document.getElementById('modalProdBenefits');
        listContainer.innerHTML = '';
        data.benefits.forEach(b => {
          const li = document.createElement('li');
          li.className = 'mb-2 text-vo-muted';
          li.innerHTML = `<i class="bi bi-check-circle-fill text-vo-accent me-2"></i> ${b}`;
          listContainer.appendChild(li);
        });
      }
    });
  }

  // ==========================================
  // 6. Generic Form Submission Toast Handler
  // ==========================================
  const handleFormSubmit = (formId, successMessage) => {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Basic HTML5 validation check
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
      }

      // Close modal if inside one
      const modalEl = form.closest('.modal');
      if (modalEl) {
        const modalInstance = bootstrap.Modal.getInstance(modalEl);
        modalInstance?.hide();
      }

      // Show alert/toast
      const toastContainer = document.getElementById('toast-container');
      if (toastContainer) {
        const toastId = 'toast-' + Date.now();
        const toastHTML = `
          <div id="${toastId}" class="toast align-items-center text-white bg-vo-primary border-0 shadow-lg" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
              <div class="toast-body d-flex align-items-center gap-2 font-poppins fs-6">
                <i class="bi bi-check-circle-fill text-vo-accent fs-4"></i>
                <div>${successMessage}</div>
              </div>
              <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
          </div>
        `;
        toastContainer.insertAdjacentHTML('beforeend', toastHTML);
        const newToast = document.getElementById(toastId);
        const bsToast = new bootstrap.Toast(newToast, { delay: 4500 });
        bsToast.show();
      } else {
        alert(successMessage);
      }

      form.reset();
      form.classList.remove('was-validated');
    });
  };

  handleFormSubmit('expertConsultationForm', 'Thank you! A Vise Organic Agriculture Agronomist will contact you within 24 hours.');
  handleFormSubmit('distributorForm', 'Distributor application received! Our commercial partnerships team will reach out to you shortly.');
  handleFormSubmit('newsletterForm', 'Successfully subscribed to Vise Organic Agronomy Updates!');

});
