/**
 * Vise Organic - Products Catalog JavaScript
 * Flipkart-style real-time interactive search, filtering, and sorting
 */

document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('catalogSearchInput');
  const chipContainer = document.getElementById('quickFilterChips');
  const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
  const clearFilterBtn = document.getElementById('clearFiltersBtn');
  const clearFilterMobileBtn = document.getElementById('clearFiltersMobileBtn');
  const sortOptions = document.querySelectorAll('.sort-option');
  const productCards = document.querySelectorAll('.product-card-item');
  const visibleCountEl = document.getElementById('visibleProductCount');
  const totalCountEl = document.getElementById('totalProductCount');
  const noResultsEl = document.getElementById('noProductsFound');

  let activeCategory = 'all';
  let activeSort = 'popularity';
  let activeSearchQuery = '';

  // 1. Quick Filter Chips Event Listener
  if (chipContainer) {
    chipContainer.addEventListener('click', function(e) {
      const chip = e.target.closest('.filter-chip');
      if (!chip) return;

      document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeCategory = chip.getAttribute('data-filter') || 'all';

      applyFiltersAndSort();
    });
  }

  // 2. Real-time Search Input Listener
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      activeSearchQuery = e.target.value.toLowerCase().trim();
      applyFiltersAndSort();
    });
  }

  // 3. Checkbox Filter Listener
  filterCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      applyFiltersAndSort();
    });
  });

  // 4. Clear Filters Action
  function clearAllFilters() {
    if (searchInput) searchInput.value = '';
    activeSearchQuery = '';
    activeCategory = 'all';

    document.querySelectorAll('.filter-chip').forEach(c => {
      if (c.getAttribute('data-filter') === 'all') c.classList.add('active');
      else c.classList.remove('active');
    });

    filterCheckboxes.forEach(cb => cb.checked = false);
    applyFiltersAndSort();
  }

  if (clearFilterBtn) clearFilterBtn.addEventListener('click', clearAllFilters);
  if (clearFilterMobileBtn) clearFilterMobileBtn.addEventListener('click', clearAllFilters);

  // 5. Sorting Options Listener
  sortOptions.forEach(option => {
    option.addEventListener('click', function() {
      sortOptions.forEach(opt => opt.classList.remove('active'));
      this.classList.add('active');
      activeSort = this.getAttribute('data-sort');
      applyFiltersAndSort();
    });
  });

  // Main Filter & Sort Logic Function
  function applyFiltersAndSort() {
    // Gather selected checkbox filters
    const selectedCategories = Array.from(document.querySelectorAll('.filter-cb-category:checked')).map(cb => cb.value);
    const selectedCrops = Array.from(document.querySelectorAll('.filter-cb-crop:checked')).map(cb => cb.value);
    const selectedTypes = Array.from(document.querySelectorAll('.filter-cb-type:checked')).map(cb => cb.value);
    const selectedCertifications = Array.from(document.querySelectorAll('.filter-cb-cert:checked')).map(cb => cb.value);

    let visibleCount = 0;

    productCards.forEach(card => {
      const pTitle = card.getAttribute('data-name') ? card.getAttribute('data-name').toLowerCase() : '';
      const pCat = card.getAttribute('data-category') || '';
      const pCrop = card.getAttribute('data-crop') || '';
      const pType = card.getAttribute('data-type') || '';
      const pCert = card.getAttribute('data-cert') || '';

      // Check Search Query
      const matchesSearch = !activeSearchQuery || pTitle.includes(activeSearchQuery) || pCat.includes(activeSearchQuery);

      // Check Chip Filter
      const matchesChip = (activeCategory === 'all') || (pCat === activeCategory);

      // Check Checkbox Filters
      const matchesCategoryCb = selectedCategories.length === 0 || selectedCategories.includes(pCat);
      const matchesCropCb = selectedCrops.length === 0 || selectedCrops.includes(pCrop);
      const matchesTypeCb = selectedTypes.length === 0 || selectedTypes.includes(pType);
      const matchesCertCb = selectedCertifications.length === 0 || selectedCertifications.includes(pCert);

      const isVisible = matchesSearch && matchesChip && matchesCategoryCb && matchesCropCb && matchesTypeCb && matchesCertCb;

      if (isVisible) {
        card.style.display = 'block';
        card.classList.add('animate-fade-in');
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Update Live Count UI
    if (visibleCountEl) visibleCountEl.textContent = visibleCount;

    // Show/Hide No Results State
    if (noResultsEl) {
      if (visibleCount === 0) {
        noResultsEl.classList.remove('d-none');
      } else {
        noResultsEl.classList.add('d-none');
      }
    }

    // Sort Visible Product Cards
    const container = document.getElementById('productGridContainer');
    if (!container) return;

    const cardsArray = Array.from(productCards);

    cardsArray.sort((a, b) => {
      const priceA = parseFloat(a.getAttribute('data-price')) || 0;
      const priceB = parseFloat(b.getAttribute('data-price')) || 0;
      const popularityA = parseInt(a.getAttribute('data-popularity')) || 0;
      const popularityB = parseInt(b.getAttribute('data-popularity')) || 0;
      const dateA = parseInt(a.getAttribute('data-date')) || 0;
      const dateB = parseInt(b.getAttribute('data-date')) || 0;

      if (activeSort === 'price-low') return priceA - priceB;
      if (activeSort === 'price-high') return priceB - priceA;
      if (activeSort === 'newest') return dateB - dateA;
      if (activeSort === 'bestseller') return popularityB - popularityA;
      // Default: popularity
      return popularityB - popularityA;
    });

    cardsArray.forEach(card => container.appendChild(card));
  }
});
