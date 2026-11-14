/**
 * Vise Organic - R&D Page Interactive Controller
 * Animated Counters, Publication Category Filter, and Gallery Lightbox
 */

document.addEventListener('DOMContentLoaded', function() {

  // 1. ANIMATED COUNTER CONTROLLER
  const counterElements = document.querySelectorAll('.counter-number');
  let animated = false;

  function animateCounters() {
    counterElements.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'), 10);
      const suffix = counter.getAttribute('data-suffix') || '+';
      let current = 0;
      const duration = 1800; // ms
      const stepTime = 30;
      const increment = Math.ceil(target / (duration / stepTime));

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target + suffix;
          clearInterval(timer);
        } else {
          counter.textContent = current + suffix;
        }
      }, stepTime);
    });
  }

  // Trigger counters when scrolled into view
  const statsSection = document.getElementById('research-statistics');
  if (statsSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          animateCounters();
        }
      });
    }, { threshold: 0.2 });
    observer.observe(statsSection);
  } else {
    animateCounters();
  }

  // 2. SCIENTIFIC PUBLICATION CATEGORY FILTER
  const filterBtns = document.querySelectorAll('.pub-filter-btn');
  const pubItems = document.querySelectorAll('.pub-item-card-wrapper');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const category = this.getAttribute('data-filter');

      pubItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (category === 'all' || itemCat === category) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 3. IMAGE GALLERY LIGHTBOX MODAL HANDLER
  const galleryCards = document.querySelectorAll('.gallery-hover-card');
  const modalImg = document.getElementById('galleryModalImg');
  const modalTitle = document.getElementById('galleryModalTitle');

  galleryCards.forEach(card => {
    card.addEventListener('click', function() {
      const imgSrc = this.getAttribute('data-img');
      const title = this.getAttribute('data-title');

      if (modalImg && imgSrc) modalImg.src = imgSrc;
      if (modalTitle && title) modalTitle.textContent = title;

      const galleryModal = new bootstrap.Modal(document.getElementById('galleryLightboxModal'));
      galleryModal.show();
    });
  });

});
