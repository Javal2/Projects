/* ==========================================================================
   BULKPHARMACHEM - DYNAMIC INTERACTION ENGINE & SEARCH AUTOCOMPLETE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initDynamicPreloader();
    initMoleculesCanvas();
    initProductCardRenderers();
    initScrollRevealEngine();
    initGlobalSearchAutocomplete();
    initAnimatedCounters();
    initBackToTopButton();
});

/* 0. DYNAMIC PRELOADER ANIMATION ENGINE (3 Seconds Duration) */
function initDynamicPreloader() {
    const preloader = document.getElementById('b2b-preloader');
    if (!preloader) return;

    const fillBar = document.getElementById('preloader-bar-fill');
    const percentText = document.getElementById('preloader-percent');
    const statusText = document.getElementById('preloader-status');

    const statuses = [
        "Synthesizing Monograph Quality Spectrum...",
        "Verifying ISO 17025 Batch CoA Certificates...",
        "Calibrating Global Bulk Logistics Engine...",
        "System Monograph Ready"
    ];

    let progress = 0;
    const totalTimeMs = 3000;
    const tickRateMs = 20; // 150 steps x 20ms = 3000ms (exactly 3.0s)
    const increment = 100 / (totalTimeMs / tickRateMs);

    const interval = setInterval(() => {
        progress += increment;
        if (progress >= 100) progress = 100;

        const roundedProgress = Math.floor(progress);

        if (fillBar) fillBar.style.width = roundedProgress + '%';
        if (percentText) percentText.textContent = roundedProgress + '%';

        if (statusText) {
            if (roundedProgress < 30) statusText.textContent = statuses[0];
            else if (roundedProgress < 60) statusText.textContent = statuses[1];
            else if (roundedProgress < 85) statusText.textContent = statuses[2];
            else statusText.textContent = statuses[3];
        }

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                preloader.classList.add('fade-out');
                setTimeout(() => {
                    if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
                }, 600);
            }, 200);
        }
    }, tickRateMs);
}

/* 1. MOLECULAR CANVAS ANIMATION - BOND BREAKING POINTER EFFECT */
function initMoleculesCanvas() {
    const canvas = document.getElementById('molecules-canvas');
    if (!canvas) return;

    const heroSection = canvas.closest('.hero-section') || canvas.parentElement;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = heroSection.offsetWidth;
    let height = canvas.height = heroSection.offsetHeight;

    window.addEventListener('resize', () => {
        if (!heroSection) return;
        width = canvas.width = heroSection.offsetWidth;
        height = canvas.height = heroSection.offsetHeight;
    });

    const mouse = {
        x: null,
        y: null,
        cutRadius: 80 // Radius within which bonds break
    };

    heroSection.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });

    heroSection.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    const numMolecules = 45;
    const molecules = [];

    for (let i = 0; i < numMolecules; i++) {
        const radius = Math.random() * 3 + 2.5;
        molecules.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: radius,
            vx: (Math.random() - 0.5) * 0.9,
            vy: (Math.random() - 0.5) * 0.9,
            color: Math.random() > 0.4 ? 'rgba(82, 180, 237, 0.85)' : 'rgba(243, 156, 18, 0.85)'
        });
    }

    // Helper: Distance from point (px, py) to line segment (x1, y1)-(x2, y2)
    function distToSegment(px, py, x1, y1, x2, y2) {
        const l2 = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
        if (l2 === 0) return Math.hypot(px - x1, py - y1);
        let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
        t = Math.max(0, Math.min(1, t));
        const projX = x1 + t * (x2 - x1);
        const projY = y1 + t * (y2 - y1);
        return Math.hypot(px - projX, py - projY);
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Update positions & push molecules away from mouse
        for (let i = 0; i < numMolecules; i++) {
            const m = molecules[i];

            if (mouse.x !== null && mouse.y !== null) {
                const dx = m.x - mouse.x;
                const dy = m.y - mouse.y;
                const dist = Math.hypot(dx, dy);

                // Push molecule away if cursor gets close
                if (dist < mouse.cutRadius) {
                    const force = (mouse.cutRadius - dist) / mouse.cutRadius;
                    const angle = Math.atan2(dy, dx);
                    m.x += Math.cos(angle) * force * 3.5;
                    m.y += Math.sin(angle) * force * 3.5;
                }
            }

            m.x += m.vx;
            m.y += m.vy;

            // Bounce off boundaries
            if (m.x < 0 || m.x > width) m.vx *= -1;
            if (m.y < 0 || m.y > height) m.vy *= -1;

            // Draw molecule node
            ctx.beginPath();
            ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2);
            ctx.fillStyle = m.color;
            ctx.fill();
        }

        // Draw chemical bonds between molecules (unless severed by pointer)
        for (let i = 0; i < numMolecules; i++) {
            const m1 = molecules[i];

            for (let j = i + 1; j < numMolecules; j++) {
                const m2 = molecules[j];
                const dx = m1.x - m2.x;
                const dy = m1.y - m2.y;
                const dist = Math.hypot(dx, dy);

                if (dist < 140) {
                    // Check if mouse pointer breaks this chemical bond
                    let isBroken = false;
                    if (mouse.x !== null && mouse.y !== null) {
                        const dMouseToBond = distToSegment(mouse.x, mouse.y, m1.x, m1.y, m2.x, m2.y);
                        if (dMouseToBond < 45) {
                            isBroken = true;
                        }
                    }

                    if (!isBroken) {
                        // Draw intact chemical bond
                        ctx.beginPath();
                        ctx.moveTo(m1.x, m1.y);
                        ctx.lineTo(m2.x, m2.y);
                        ctx.strokeStyle = `rgba(82, 180, 237, ${0.4 - dist / 350})`;
                        ctx.lineWidth = 1.1;
                        ctx.stroke();
                    } else {
                        // Render broken bond visual (disintegrating spark dots at cut point)
                        ctx.beginPath();
                        const midX = (m1.x + m2.x) / 2;
                        const midY = (m1.y + m2.y) / 2;
                        ctx.arc(midX, midY, 1.5, 0, Math.PI * 2);
                        ctx.fillStyle = 'rgba(243, 156, 18, 0.6)';
                        ctx.fill();
                    }
                }
            }
        }

        requestAnimationFrame(animate);
    }
    animate();
}

/* 2. SCROLL REVEAL ENGINE */
let scrollObserver;
function initScrollRevealEngine() {
    const elements = document.querySelectorAll('.reveal-on-scroll');
    if (!elements.length) return;

    if ('IntersectionObserver' in window) {
        if (!scrollObserver) {
            scrollObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('appear');
                    }
                });
            }, { threshold: 0.01, rootMargin: '0px 0px 100px 0px' });
        }

        elements.forEach(el => {
            if (!el.classList.contains('appear')) {
                scrollObserver.observe(el);
            }
        });
    } else {
        elements.forEach(el => el.classList.add('appear'));
    }
}

/* 3. GLOBAL INSTANT SEARCH AUTOCOMPLETE */
function initGlobalSearchAutocomplete() {
    const searchInputs = document.querySelectorAll('.global-search-input');
    if (!searchInputs.length || typeof PRODUCTS === 'undefined') return;

    searchInputs.forEach(input => {
        let dropdown = document.createElement('div');
        dropdown.className = 'search-dropdown-menu';
        input.parentElement.appendChild(dropdown);

        input.addEventListener('input', (e) => {
            const val = e.target.value.trim().toLowerCase();
            if (val.length < 2) {
                dropdown.classList.remove('show');
                return;
            }

            const matches = PRODUCTS.filter(p => 
                p.name.toLowerCase().includes(val) || 
                p.cas.includes(val) || 
                p.category.toLowerCase().includes(val)
            ).slice(0, 5);

            if (matches.length > 0) {
                dropdown.innerHTML = matches.map(m => `
                    <div class="search-result-item" onclick="location.href='product-detail.html?id=${m.id}'">
                        <div class="d-flex align-items-center gap-2">
                            <img src="${m.image}" alt="${m.name}" style="width: 32px; height: 32px; object-fit: cover; border-radius: 4px;">
                            <div>
                                <strong class="text-primary small d-block mb-0">${m.name}</strong>
                                <span class="badge-cas">CAS: ${m.cas}</span>
                            </div>
                        </div>
                        <span class="font-mono text-muted small">${m.priceRange.split(' ')[0]}</span>
                    </div>
                `).join('');
                dropdown.classList.add('show');
            } else {
                dropdown.innerHTML = `<div class="p-3 text-muted small">No bulk ingredients matching "${val}"</div>`;
                dropdown.classList.add('show');
            }
        });

        document.addEventListener('click', (e) => {
            if (!input.contains(e.target) && !dropdown.contains(e.target)) {
                dropdown.classList.remove('show');
            }
        });
    });
}

/* 4. ANIMATED STATS COUNTERS */
function initAnimatedCounters() {
    const counters = document.querySelectorAll('.counter-val');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-count');
                let count = 0;
                const speed = target / 50;

                const updateCount = () => {
                    count += speed;
                    if (count < target) {
                        entry.target.innerText = Math.ceil(count).toLocaleString();
                        setTimeout(updateCount, 25);
                    } else {
                        entry.target.innerText = target.toLocaleString();
                    }
                };
                updateCount();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}

/* 5. UNIFIED MODERN HOME PAGE PRODUCT CARD COMPONENT */
function createModernHomeProductCard(p, badgeConfig = {}) {
    const hideBadges = badgeConfig.hideBadges || badgeConfig.type === 'none';

    let topLeftBadgeHtml = '';
    if (!hideBadges) {
        if (badgeConfig.type === 'bestseller') {
            topLeftBadgeHtml = `<span class="badge-bestseller"><i class="bi ${badgeConfig.icon || 'bi-fire'} me-1"></i>${badgeConfig.label}</span>`;
        } else if (badgeConfig.type === 'trending') {
            topLeftBadgeHtml = `<span class="badge-trending"><i class="bi ${badgeConfig.icon || 'bi-graph-up-arrow'} me-1"></i>${badgeConfig.label}</span>`;
        } else if (badgeConfig.type === 'highdemand') {
            topLeftBadgeHtml = `<span class="badge-highdemand"><i class="bi ${badgeConfig.icon || 'bi-truck'} me-1"></i>${badgeConfig.label}</span>`;
        } else if (badgeConfig.type === 'cas') {
            topLeftBadgeHtml = `<span class="badge-cas"><i class="bi bi-patch-check-fill me-1 text-warning"></i>CAS: ${p.cas}</span>`;
        }
    }

    return `
        <div class="col-md-6 col-lg-4 mb-4 reveal-on-scroll">
            <div class="home-product-card h-100">
                <div class="home-product-card-img-box">
                    <img src="${p.image}" alt="${p.name}" class="home-product-card-img" onerror="this.onerror=null;this.src='assets/images/bcaa-amino-acid.jpg';">
                    ${!hideBadges && topLeftBadgeHtml ? `
                    <div class="position-absolute top-0 start-0 m-3 z-2">
                        ${topLeftBadgeHtml}
                    </div>` : ''}
                    ${!hideBadges ? `
                    <div class="position-absolute top-0 end-0 m-3 z-2">
                        <span class="badge-purity"><span class="pulse-dot me-1"></span>${p.purity}</span>
                    </div>` : ''}
                    <div class="home-card-img-overlay"></div>
                </div>
                
                <div class="home-product-card-body">
                    <div class="d-flex align-items-center justify-content-between mb-2">
                        <span class="home-card-category-tag">${p.category}</span>
                        <div class="star-rating text-warning small">
                            <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i> 
                            <span class="text-muted font-mono ms-1">(${p.reviewsCount || 42})</span>
                        </div>
                    </div>
                    
                    <h3 class="home-product-title">
                        <a href="product-detail.html?id=${p.id}">${p.name}</a>
                    </h3>

                    <div class="home-card-spec-strip">
                        <span><i class="bi bi-hash text-primary me-1"></i>${p.cas}</span>
                        <span><i class="bi bi-award-fill text-success me-1"></i>${p.grade ? p.grade.split(' ')[0] : 'USP'}</span>
                    </div>

                    <p class="home-card-desc">${p.description.substring(0, 78)}...</p>

                    <div class="d-flex align-items-center justify-content-between mt-auto pt-2">
                        <span class="badge-moq"><i class="bi bi-box-seam me-1"></i>MOQ: ${p.moq}</span>
                        <span class="badge bg-light text-dark font-mono small border"><i class="bi bi-check2-circle text-success me-1"></i>${p.stockStatus ? p.stockStatus.split(' ')[0] : 'In Stock'}</span>
                    </div>
                </div>

                <div class="home-product-card-footer">
                    <div>
                        <div class="small text-muted font-mono" style="font-size: 0.68rem; letter-spacing: 0.5px;">EST. WHOLESALE</div>
                        <div class="home-card-price">${p.priceRange.split(' ')[0]}</div>
                    </div>
                    <div class="d-flex gap-2">
                        <a href="product-detail.html?id=${p.id}" class="btn btn-home-specs" title="View Product Details">
                            <i class="bi bi-eye-fill me-1"></i> View
                        </a>
                        <a href="quote.html?product=${encodeURIComponent(p.name)}" class="btn btn-b2b-accent btn-sm font-heading fw-bold" title="Request Bulk Quote">
                            <i class="bi bi-file-earmark-text-fill me-1"></i> Request Quote
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function initProductCardRenderers() {
    if (typeof PRODUCTS === 'undefined') return;

    // 1. BEST SELLING PRODUCTS (Keeps #1 Best Seller badge)
    const bestGrid = document.getElementById('bestselling-products-grid');
    if (bestGrid) {
        function renderBestSelling(cat = 'all') {
            const bestItems = PRODUCTS.filter(p => [
                'BPC-API-008', // Caffeine Anhydrous
                'BPC-API-002', // Creatine Monohydrate
                'BPC-FOD-003', // Sucralose
                'BPC-NUT-012', // WPI 90
                'BPC-API-001', // BCAA 2:1:1
                'BPC-API-013'  // Vitamin B12
            ].includes(p.id));

            const filtered = cat === 'all' ? bestItems : bestItems.filter(p => p.category.toLowerCase().includes(cat.toLowerCase()));

            bestGrid.innerHTML = filtered.map((p, idx) => createModernHomeProductCard(p, {
                type: 'bestseller',
                label: `#${idx + 1} Best Seller`,
                icon: 'bi-fire'
            })).join('');
            initScrollRevealEngine();
        }
        renderBestSelling('all');

        document.querySelectorAll('.bestselling-filter-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.bestselling-filter-tab').forEach(t => t.className = 'btn btn-b2b-outline btn-sm bestselling-filter-tab');
                e.target.className = 'btn btn-b2b-primary btn-sm bestselling-filter-tab active';
                renderBestSelling(e.target.getAttribute('data-category'));
            });
        });
    }

    // 2. TRENDING PRODUCTS (No Top Image Badges)
    const trendGrid = document.getElementById('trending-products-grid');
    if (trendGrid) {
        const trendItems = PRODUCTS.filter(p => [
            'BPC-API-013', // Vitamin B12
            'BPC-IND-010', // Enzyme Blend
            'BPC-NUT-009', // Organic Moringa Leaf
            'BPC-NUT-006', // Soya Protein Isolate
            'BPC-NUT-011', // WPC 80
            'BPC-FOD-003'  // Sucralose
        ].includes(p.id));

        trendGrid.innerHTML = trendItems.map((p) => createModernHomeProductCard(p, {
            hideBadges: true
        })).join('');
        initScrollRevealEngine();
    }

    // 3. HIGH DEMAND INGREDIENTS (No Top Image Badges)
    const demandGrid = document.getElementById('highdemand-products-grid');
    if (demandGrid) {
        const demandItems = PRODUCTS.filter(p => [
            'BPC-IND-015', // TiO2 Rutile
            'BPC-AGR-014', // Potassium Humate
            'BPC-FOD-004', // Skimmed Milk Powder
            'BPC-FOD-007', // Soya Lecithin
            'BPC-FOD-005', // Whole Milk Powder
            'BPC-API-008'  // Caffeine Anhydrous
        ].includes(p.id));

        demandGrid.innerHTML = demandItems.map((p) => createModernHomeProductCard(p, {
            hideBadges: true
        })).join('');
        initScrollRevealEngine();
    }

    // 4. FEATURED CATALOG SHOWCASE (No Top Image Badges)
    const grid = document.getElementById('featured-products-grid');
    if (grid) {
        function renderFeatured(category = 'all') {
            const filtered = category === 'all' ? PRODUCTS.slice(0, 6) : PRODUCTS.filter(p => p.category.toLowerCase().includes(category.toLowerCase())).slice(0, 6);
            
            grid.innerHTML = filtered.map(p => createModernHomeProductCard(p, {
                hideBadges: true
            })).join('');

            initScrollRevealEngine();
        }

        renderFeatured();

        document.querySelectorAll('.product-filter-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                document.querySelectorAll('.product-filter-tab').forEach(t => t.className = 'btn btn-b2b-outline btn-sm product-filter-tab');
                e.target.className = 'btn btn-b2b-primary btn-sm product-filter-tab active';
                renderFeatured(e.target.getAttribute('data-category'));
            });
        });
    }
}

/* 6. BACK TO TOP BUTTON */
function initBackToTopButton() {
    const btn = document.getElementById('backToTopBtn');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
