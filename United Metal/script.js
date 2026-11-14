// United Metal Interactive JavaScript

document.addEventListener('DOMContentLoaded', () => {
  console.log('United Metal Homepage loaded successfully.');

  // Smooth Scroll for Navbar Links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });

          // Close mobile navbar if open
          const navCollapse = document.getElementById('navMenu');
          if (navCollapse && navCollapse.classList.contains('show')) {
            const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
            if (bsCollapse) bsCollapse.hide();
          }
        }
      }
    });
  });

  // Handle Form Submission
  const enquireForm = document.getElementById('enquireForm');
  if (enquireForm) {
    enquireForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const modalElement = document.getElementById('enquireModal');
      const bsModal = bootstrap.Modal.getInstance(modalElement);
      
      alert('Thank you for reaching out to United Metal! Our sales team will get back to you shortly.');
      
      if (bsModal) {
        bsModal.hide();
      }
      enquireForm.reset();
    });
  }

  // Handle Video Modal Stop on Close
  const videoModal = document.getElementById('videoModal');
  if (videoModal) {
    videoModal.addEventListener('hidden.bs.modal', () => {
      const iframe = videoModal.querySelector('iframe');
      if (iframe) {
        const iframeSrc = iframe.src;
        iframe.src = iframeSrc; // Resets video on close
      }
    });
  }
});
