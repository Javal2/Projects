/* ==========================================================================
   MAIN JAVASCRIPT - FLEMMING PHARMA
   Features:
   - Sticky Glass Navbar Scroll Controller
   - GSAP ScrollTrigger Entrance & Reveal Animations
   - Number Counter Up Animation for Stats
   - Product Catalog Filter & Search Logic
   - Global Interactive Map Hotspot Tooltips
   - Animated 5-Step Quality Assurance Workflow Stepper
   - Contact & Brochure Request Modal Handlers
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------------------------------
  // 1. NAVBAR SCROLL EFFECT (Seamless locked header across all pages)
  // --------------------------------------------------------------------------
  const navbar = document.querySelector('.navbar-pharma');
  const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');

  if (navbar) {
    if (!isHomePage) {
      navbar.classList.add('scrolled');
    } else {
      const updateNavbarState = () => {
        if (window.scrollY > 30 || document.documentElement.classList.contains('skip-cinematic-intro')) {
          navbar.classList.add('scrolled');
        } else if (document.body.classList.contains('has-cinematic-intro')) {
          navbar.classList.remove('scrolled');
        }
      };
      window.addEventListener('scroll', updateNavbarState);
      updateNavbarState();
    }
  }

  // --------------------------------------------------------------------------
  // 2. NUMBER COUNTER ANIMATION
  // --------------------------------------------------------------------------
  const counters = document.querySelectorAll('.counter-val');
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target') || '0', 10);
          const suffix = el.getAttribute('data-suffix') || '';
          let count = 0;
          const duration = 1800;
          const stepTime = 20;
          const increment = Math.ceil(target / (duration / stepTime));

          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              el.innerText = target + suffix;
              clearInterval(timer);
            } else {
              el.innerText = count + suffix;
            }
          }, stepTime);

          observer.unobserve(el);
        }
      });
    }, { threshold: 0.2 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  // --------------------------------------------------------------------------
  // 3. REVEAL ON SCROLL (INTERSECTION OBSERVER)
  // --------------------------------------------------------------------------
  const cardElements = document.querySelectorAll('.hover-card, .process-step-card, .cert-card, .product-card');
  if (cardElements.length > 0) {
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    cardElements.forEach(card => {
      card.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      cardObserver.observe(card);
    });
  }

  // --------------------------------------------------------------------------
  // 4. PRODUCT FILTER & SEARCH SYSTEM (MODERN MULTI-CRITERIA)
  // --------------------------------------------------------------------------
  const dosageBtns = document.querySelectorAll('.dosage-card-btn');
  const categoryLinks = document.querySelectorAll('.pharma-category-link');
  const categorySearchInput = document.getElementById('category-filter-search');
  const alphabetPills = document.querySelectorAll('.alphabet-pill');
  const searchInput = document.getElementById('product-search');
  const btnClearSearch = document.getElementById('btn-clear-search');
  const productCards = document.querySelectorAll('.product-item-col');
  const catalogTitle = document.getElementById('catalog-section-title');
  const catalogCountBadge = document.getElementById('catalog-count-badge');
  const noResultsMsg = document.getElementById('no-results-message');
  const btnResetFilters = document.getElementById('btn-reset-filters');

  if (productCards.length > 0) {
    let currentDosage = 'tablet';
    let currentCategory = 'all';
    let currentLetter = 'all';
    let searchQuery = '';

    const filterProducts = () => {
      let visibleCount = 0;

      productCards.forEach(col => {
        const dosage = col.getAttribute('data-dosage') || '';
        const cat = col.getAttribute('data-category') || '';
        const letter = col.getAttribute('data-letter') || '';
        const title = col.getAttribute('data-title') || '';
        
        const matchesDosage = (currentDosage === 'all' || dosage === currentDosage);
        const matchesCategory = (currentCategory === 'all' || cat === currentCategory);
        const matchesLetter = (currentLetter === 'all' || letter === currentLetter);
        const matchesSearch = searchQuery === '' || title.toLowerCase().includes(searchQuery.toLowerCase());

        if (matchesDosage && matchesCategory && matchesLetter && matchesSearch) {
          col.style.display = 'block';
          visibleCount++;
        } else {
          col.style.display = 'none';
        }
      });

      // Color Theme System matching dosage cards
      const themeColors = {
        'tablet':    { color: '#d97706', bg: 'rgba(245, 158, 11, 0.15)', border: 'rgba(217, 119, 6, 0.3)' },
        'capsule':   { color: '#0284c7', bg: 'rgba(2, 132, 199, 0.15)', border: 'rgba(2, 132, 199, 0.3)' },
        'drops':     { color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)', border: 'rgba(16, 185, 129, 0.3)' },
        'injection': { color: '#e11d48', bg: 'rgba(225, 29, 72, 0.15)', border: 'rgba(225, 29, 72, 0.3)' },
        'creams':    { color: '#7c3aed', bg: 'rgba(124, 58, 237, 0.15)', border: 'rgba(124, 58, 237, 0.3)' },
        'syrup':     { color: '#1e293b', bg: 'rgba(30, 41, 59, 0.15)', border: 'rgba(30, 41, 59, 0.3)' },
        'other':     { color: '#ca8a04', bg: 'rgba(202, 138, 4, 0.15)', border: 'rgba(202, 138, 4, 0.3)' },
        'all':       { color: '#004683', bg: 'rgba(0, 70, 131, 0.12)', border: 'rgba(0, 70, 131, 0.3)' }
      };

      const activeTheme = themeColors[currentDosage] || themeColors['all'];

      // Update Section Header Title & Badge Count
      if (catalogTitle) {
        catalogTitle.style.color = activeTheme.color;
        if (currentDosage !== 'all') {
          const dosageNames = {
            'tablet': 'Tablet',
            'capsule': 'Capsule',
            'drops': 'Eye / Ear Drops',
            'injection': 'Injection',
            'creams': 'Creams & Topicals',
            'syrup': 'Suspension & Syrup',
            'other': 'Infusions & Other'
          };
          catalogTitle.innerText = dosageNames[currentDosage] || 'Formulations';
        } else if (currentCategory !== 'all') {
          catalogTitle.innerText = currentCategory.toUpperCase() + ' Formulations';
        } else {
          catalogTitle.innerText = 'All Formulations';
        }
      }

      if (catalogCountBadge) {
        catalogCountBadge.style.backgroundColor = activeTheme.bg;
        catalogCountBadge.style.color = activeTheme.color;
        catalogCountBadge.style.borderColor = activeTheme.border;
        catalogCountBadge.innerText = `${visibleCount} Formulations`;
      }

      if (noResultsMsg) {
        if (visibleCount === 0) {
          noResultsMsg.classList.remove('d-none');
        } else {
          noResultsMsg.classList.add('d-none');
        }
      }
    };

    // 1. Top Dosage Card Buttons Handler
    dosageBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        dosageBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        currentDosage = btn.getAttribute('data-dosage') || 'all';
        filterProducts();
      });
    });

    // 2. Left Category Links Handler
    categoryLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        categoryLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        currentCategory = link.getAttribute('data-category') || 'all';
        filterProducts();
      });
    });

    // 3. Left Category Filter Input Handler
    if (categorySearchInput) {
      categorySearchInput.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase();
        const catItems = document.querySelectorAll('.pharma-category-item');
        catItems.forEach(item => {
          const text = item.innerText.toLowerCase();
          if (text.includes(q)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    }

    // 4. A-Z Alphabetic Jump Bar Handler
    alphabetPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        e.preventDefault();
        alphabetPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        currentLetter = pill.getAttribute('data-letter') || 'all';
        filterProducts();
      });
    });

    // 5. Main Search Input Handler
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        filterProducts();
      });
    }

    if (btnClearSearch && searchInput) {
      btnClearSearch.addEventListener('click', () => {
        searchInput.value = '';
        searchQuery = '';
        filterProducts();
      });
    }

    // 6. Reset Filters Handler
    if (btnResetFilters) {
      btnResetFilters.addEventListener('click', () => {
        currentDosage = 'all';
        currentCategory = 'all';
        currentLetter = 'all';
        searchQuery = '';

        if (searchInput) searchInput.value = '';
        if (categorySearchInput) categorySearchInput.value = '';

        dosageBtns.forEach(b => b.classList.remove('active'));
        categoryLinks.forEach(l => l.classList.remove('active'));
        alphabetPills.forEach(p => p.classList.remove('active'));

        const defaultCat = document.querySelector('.pharma-category-link[data-category="all"]');
        if (defaultCat) defaultCat.classList.add('active');

        const defaultAlpha = document.querySelector('.alphabet-pill[data-letter="all"]');
        if (defaultAlpha) defaultAlpha.classList.add('active');

        filterProducts();
      });
    }

    // Initial trigger
    filterProducts();
  }

  // --------------------------------------------------------------------------
  // 5. MAP TOOLTIP INTERACTION
  // --------------------------------------------------------------------------
  const mapHotspots = document.querySelectorAll('.map-hotspot');
  const mapTooltip = document.getElementById('map-tooltip');

  if (mapHotspots.length > 0 && mapTooltip) {
    mapHotspots.forEach(spot => {
      spot.addEventListener('mouseenter', () => {
        const country = spot.getAttribute('data-country');
        const exports = spot.getAttribute('data-exports');
        const certs = spot.getAttribute('data-certs');

        mapTooltip.innerHTML = `
          <div class="fw-bold text-gradient mb-1">${country}</div>
          <div class="small text-secondary mb-1"><i class="bi bi-box-seam me-1"></i> Formulations: ${exports}</div>
          <div class="small text-primary fw-semibold"><i class="bi bi-patch-check-fill me-1"></i> ${certs}</div>
        `;
        mapTooltip.style.display = 'block';
      });

      spot.addEventListener('mousemove', (e) => {
        const rect = spot.parentElement.getBoundingClientRect();
        const x = e.clientX - rect.left + 15;
        const y = e.clientY - rect.top - 70;
        mapTooltip.style.left = `${x}px`;
        mapTooltip.style.top = `${y}px`;
      });

      spot.addEventListener('mouseleave', () => {
        mapTooltip.style.display = 'none';
      });
    });
  }

  // --------------------------------------------------------------------------
  // 6. ANIMATED 5-STEP QUALITY WORKFLOW STEPPER & DETAIL SHOWCASE
  // --------------------------------------------------------------------------
  const stepNodes = document.querySelectorAll('.pipeline-stream-step');
  const stageNum = document.getElementById('qa-stage-num');
  const stageCat = document.getElementById('qa-step-category');
  const stageIcon = document.getElementById('qa-step-icon');
  const stepTitle = document.getElementById('qa-step-title');
  const stepDesc = document.getElementById('qa-step-desc');
  const stepBadges = document.getElementById('qa-step-badges');

  if (stepNodes.length > 0) {
    const stepData = [
      {
        num: 'STAGE 01 OF 05',
        category: 'Raw Material Protocol',
        icon: 'bi-patch-check-fill',
        title: 'Raw Material QC & Identity Verification',
        desc: 'Every incoming API and excipient undergoes 100% identity testing using non-destructive Near-Infrared (NIR) spectroscopy inside ISO Class 7 cleanroom sampling booths.',
        badges: '<span class="badge bg-white text-dark border p-2"><i class="bi bi-shield-check text-primary me-1"></i> ISO Class 7 Booths</span><span class="badge bg-white text-dark border p-2"><i class="bi bi-lightning-charge-fill text-warning me-1"></i> NIR Spectroscopy</span><span class="badge bg-white text-dark border p-2"><i class="bi bi-check-circle-fill text-success me-1"></i> 100% Identity Verified</span>'
      },
      {
        num: 'STAGE 02 OF 05',
        category: 'Granulation Protocol',
        icon: 'bi-gear-wide-connected',
        title: 'Fluid Bed Processing & Granulation',
        desc: 'Precision binder addition, high-shear wet granulation, and fluid-bed drying ensure uniform particle size distribution and optimal granule compressibility.',
        badges: '<span class="badge bg-white text-dark border p-2"><i class="bi bi-gear-fill text-primary me-1"></i> High-Shear Mixer</span><span class="badge bg-white text-dark border p-2"><i class="bi bi-wind text-info me-1"></i> Fluid Bed Dryer</span><span class="badge bg-white text-dark border p-2"><i class="bi bi-sliders text-success me-1"></i> SCADA Granule Control</span>'
      },
      {
        num: 'STAGE 03 OF 05',
        category: 'Compression Protocol',
        icon: 'bi-cpu-fill',
        title: 'High-Speed Rotary Tableting',
        desc: 'High-speed double-sided rotary presses with continuous automatic weight regulation, inline hardness monitoring, and friability testing guarantee zero-defect tablet dosage forms.',
        badges: '<span class="badge bg-white text-dark border p-2"><i class="bi bi-speedometer text-primary me-1"></i> Double-Sided Rotary Press</span><span class="badge bg-white text-dark border p-2"><i class="bi bi-bounding-box text-warning me-1"></i> Auto Weight Control</span><span class="badge bg-white text-dark border p-2"><i class="bi bi-check-circle-fill text-success me-1"></i> Zero-Defect Guarantee</span>'
      },
      {
        num: 'STAGE 04 OF 05',
        category: 'Aseptic Filling Protocol',
        icon: 'bi-droplet-half',
        title: 'Aseptic Liquid & BFS Sterile Filling',
        desc: 'Sterile liquid injections, lyophilized vials, and Blow-Fill-Seal (BFS) ampoules are filled under ISO Class 5 laminar airflow isolators with continuous particle counting.',
        badges: '<span class="badge bg-white text-dark border p-2"><i class="bi bi-shield-lock-fill text-primary me-1"></i> ISO Class 5 Isolator</span><span class="badge bg-white text-dark border p-2"><i class="bi bi-diagram-3-fill text-info me-1"></i> BFS Sterile Technology</span><span class="badge bg-white text-dark border p-2"><i class="bi bi-activity text-success me-1"></i> Continuous Particle Count</span>'
      },
      {
        num: 'STAGE 05 OF 05',
        category: 'Serialization & Release',
        icon: 'bi-qr-code-scan',
        title: '2D DataMatrix Track & Trace Serialization',
        desc: 'Every unit carton receives unique 2D DataMatrix serialization for global track & trace compliance prior to final Quality Assurance batch certificate release.',
        badges: '<span class="badge bg-white text-dark border p-2"><i class="bi bi-qr-code text-primary me-1"></i> 2D DataMatrix Coding</span><span class="badge bg-white text-dark border p-2"><i class="bi bi-globe text-info me-1"></i> Global Track & Trace</span><span class="badge bg-white text-dark border p-2"><i class="bi bi-award-fill text-success me-1"></i> QA Batch Certificate</span>'
      }
    ];

    let currentStepIdx = 0;
    let stepInterval = null;

    const setActiveStep = (idx) => {
      stepNodes.forEach((node, i) => {
        if (i === idx) {
          node.classList.add('active');
        } else {
          node.classList.remove('active');
        }
      });

      const d = stepData[idx];
      if (d) {
        if (stageNum) stageNum.innerText = d.num;
        if (stageCat) stageCat.innerText = d.category;
        if (stageIcon) stageIcon.className = `bi ${d.icon}`;
        if (stepTitle) stepTitle.innerText = d.title;
        if (stepDesc) stepDesc.innerText = d.desc;
        if (stepBadges) stepBadges.innerHTML = d.badges;
      }
      currentStepIdx = idx;
    };

    const startStepCycle = () => {
      stopStepCycle();
      stepInterval = setInterval(() => {
        currentStepIdx = (currentStepIdx + 1) % stepNodes.length;
        setActiveStep(currentStepIdx);
      }, 2800);
    };

    const stopStepCycle = () => {
      if (stepInterval) clearInterval(stepInterval);
    };

    stepNodes.forEach((node, i) => {
      node.addEventListener('mouseenter', () => {
        stopStepCycle();
        setActiveStep(i);
      });
      node.addEventListener('mouseleave', () => {
        startStepCycle();
      });
      node.addEventListener('click', () => {
        stopStepCycle();
        setActiveStep(i);
      });
    });

    startStepCycle();
  }

  // --------------------------------------------------------------------------
  // 7. INQUIRY FORM SUBMISSION FEEDBACK
  // --------------------------------------------------------------------------
  const forms = document.querySelectorAll('.pharma-inquiry-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2"></span> Transmitting...`;
        submitBtn.disabled = true;

        setTimeout(() => {
          submitBtn.innerHTML = `<i class="bi bi-check-circle-fill me-2"></i> Inquiry Submitted!`;
          submitBtn.classList.remove('btn-pharma-primary');
          submitBtn.classList.add('btn-pharma-accent');

          form.reset();

          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('btn-pharma-accent');
            submitBtn.classList.add('btn-pharma-primary');
          }, 4000);
        }, 1200);
      }
    });
  });

  // --------------------------------------------------------------------------
  // 8. GALLERY PAGE FILTER & LIGHTBOX MODAL HANDLER
  // --------------------------------------------------------------------------
  const galleryFilterSelect = document.getElementById('gallery-filter-select');
  const galleryItems = document.querySelectorAll('.gallery-item-col');

  if (galleryItems.length > 0 && galleryFilterSelect) {
    galleryFilterSelect.addEventListener('change', (e) => {
      const selected = e.target.value;
      galleryItems.forEach(col => {
        const cat = col.getAttribute('data-category') || '';
        if (selected === 'all' || cat === selected) {
          col.style.display = 'block';
        } else {
          col.style.display = 'none';
        }
      });
    });
  }

  // Lightbox Modal Populate
  const galleryCards = document.querySelectorAll('.gallery-card');
  const modalImgBox = document.getElementById('modal-img-box');
  const modalBadge = document.getElementById('modal-dosage-badge');
  const modalTitle = document.getElementById('modal-product-title');
  const modalDosageText = document.getElementById('modal-dosage-text');
  const modalSpecText = document.getElementById('modal-spec-text');

  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.getAttribute('data-img');
      const title = card.getAttribute('data-title') || '';
      const dosage = card.getAttribute('data-dosage') || '';
      const spec = card.getAttribute('data-spec') || '';
      const svg = card.getAttribute('data-svg');

      if (modalImgBox) {
        if (img) {
          modalImgBox.innerHTML = `<img src="${img}" class="img-fluid rounded max-h-250" alt="${title}">`;
        } else if (svg) {
          const cardSvg = card.querySelector('svg');
          if (cardSvg) {
            modalImgBox.innerHTML = cardSvg.outerHTML;
          }
        }
      }

      if (modalTitle) modalTitle.innerText = title;
      if (modalDosageText) modalDosageText.innerText = dosage;
      if (modalSpecText) modalSpecText.innerText = spec;
      if (modalBadge) modalBadge.innerText = dosage;
    });
  });

  // --------------------------------------------------------------------------
  // 12. FIXED NAVBAR SCROLL OFFSET FOR ANCHOR LINKS
  // --------------------------------------------------------------------------
  const scrollToHashTarget = () => {
    if (window.location.hash) {
      const targetEl = document.querySelector(window.location.hash);
      if (targetEl) {
        setTimeout(() => {
          const navbarHeight = document.querySelector('.navbar-pharma')?.offsetHeight || 95;
          const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
          window.scrollTo({
            top: targetPos,
            behavior: 'smooth'
          });
        }, 120);
      }
    }
  };

  // Adjust scroll position on initial load if hash is present
  if (window.location.hash) {
    scrollToHashTarget();
  }

  // Adjust scroll position when hash changes
  window.addEventListener('hashchange', scrollToHashTarget);

  // Mark internal navigation when clicking links so returning to Home skips intro
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (link && link.href && !link.href.startsWith('javascript:') && !link.href.startsWith('#')) {
      try {
        sessionStorage.setItem('flemming_from_internal_nav', 'true');
      } catch (err) {}
    }
  });

  // --------------------------------------------------------------------------
  // 13. BROCHURE DOWNLOAD FORM SUBMISSION
  // --------------------------------------------------------------------------
  const brochureForm = document.getElementById('brochureForm');
  if (brochureForm) {
    brochureForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = brochureForm.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Preparing PDF Download...';
        submitBtn.disabled = true;
      }
      setTimeout(() => {
        alert('Thank you! Flemming Pharma Product Brochure 2026 is downloading.');
        if (submitBtn) {
          submitBtn.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>Downloaded Successfully!';
          submitBtn.classList.remove('btn-pharma-primary');
          submitBtn.classList.add('btn-success');
        }
      }, 1200);
    });
  }

});


