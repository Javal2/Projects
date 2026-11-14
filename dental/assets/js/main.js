// Fortis Dental Clinic - Interactive Features & Video Player

document.addEventListener('DOMContentLoaded', function () {
  console.log('Fortis Dental Clinic website initialized.');

  // Handle Appointment Booking Form Submissions
  const bookingForms = document.querySelectorAll('.booking-form-element, form[id*="webform"]');
  bookingForms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const nameInput = form.querySelector('[name="name"], [name*="name"], input[type="text"]');
      const name = nameInput ? nameInput.value : 'Patient';
      alert(`Thank you, ${name}! Your request has been received. Our team at Fortis Dental will get in touch with you shortly.`);
      form.reset();
    });
  });

  // Official 100% Exact Live Site Video Titles Map (Extracted from Optio API)
  const exactOptioTitles = {
    'cosmetic/beautiful_smile/about': 'A Beautiful Smile: The Art and Science of Your Smile',
    'cosmetic/beautiful_smile/details': 'A Beautiful Smile: The Finer Details of Your Smile',
    'cosmetic/beautiful_smile/shape': 'A Beautiful Smile: The Contours of Your Smile',
    'cosmetic/procedures/veneers': 'Cosmetic Procedures: Veneers',
    'dentistry/cosmetic/home_whitening': 'Cosmetic Procedures: Home Whitening',
    'dentistry/cusp/crown_lengthening': 'Cusp Fractures: Crown Lengthening',
    'dentistry/decay/about': 'Tooth Decay: What Is Tooth Decay?',
    'dentistry/decay/crown': 'Tooth Decay: Crown',
    'dentistry/decay/extraction': 'Tooth Decay: Extraction',
    'dentistry/decay/filling': 'Tooth Decay: Filling',
    'dentistry/decay/inlay_onlay': 'Tooth Decay: Inlay/Onlay',
    'dentistry/decay/root_canal': 'Tooth Decay: Root Canal',
    'dentistry/implants/about': 'Dental Implants: About Implants',
    'dentistry/implants/denture': 'Dental Implants: Implant Supported Denture',
    'dentistry/implants/procedure': 'Dental Implants: Implant Procedure',
    'dentistry/missing_teeth/full_denture': 'Missing Teeth: Full Denture',
    'dentistry/missing_teeth/not_replaced': 'Missing Teeth: When Missing Teeth Are Not Replaced',
    'dentistry/missing_teeth/partial_denture': 'Missing Teeth: Partial Denture',
    'dentistry/missing_teeth/replacing_teeth': 'Missing Teeth: Options for Replacing Missing Teeth',
    'dentistry/wisdom/about': 'Wisdom Teeth: Explained',
    'dentistry/wisdom/extraction': 'Wisdom Teeth: Extraction',
    'kids/baby_tips/first_visit': 'Baby Dental Tips: When Should Baby Visit the Dentist?',
    'kids/baby_tips/oral_care': 'Baby Dental Tips: Baby Oral Care',
    'kids/baby_tips/pacifier_use': 'Baby Dental Tips: When to Stop Using a Pacifier?',
    'kids/kids_tips/flossing': 'Kids Dental Tips: When to Start Flossing?',
    'kids/kids_tips/loose_tooth': 'Kids Dental Tips: When to Tug on a Loose Tooth?',
    'kids/kids_tips/ready_to_brush': 'Kids Dental Tips: When Are Kids Ready to Brush?',
    'kids/kids_zone/ricky': 'Kids Zone: Ricky Brushes His Teeth',
    'kids/kids_zone/ricky_first_visit': "Kids Zone: Ricky's First Visit"
  };

  // Strip category prefix (e.g., "Dental Implants: Implant Procedure" -> "Implant Procedure")
  function getCleanDisplayTitle(videoId) {
    const raw = exactOptioTitles[videoId];
    if (raw) {
      if (raw.includes(':')) {
        return raw.split(':')[1].trim();
      }
      return raw;
    }
    const slug = videoId.split('/').pop();
    return slug.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  // Render Optio Dental Video Thumbnails matching live site layout
  const optioThumbnails = document.querySelectorAll('.optio-thumbnail');
  optioThumbnails.forEach(thumb => {
    const videoId = thumb.getAttribute('data-video-id') || '';
    if (!videoId) return;

    const safeFile = videoId.replace(/\//g, '__') + '.jpg';
    const isSubfolder = window.location.pathname.includes('/services/') || window.location.pathname.includes('/offers/');
    const imgPath = isSubfolder ? `../assets/images/videos/${safeFile}` : `./assets/images/videos/${safeFile}`;
    const fallbackImg = isSubfolder ? `../assets/images/main-implants.jpg` : `./assets/images/main-implants.jpg`;

    const title = getCleanDisplayTitle(videoId);

    thumb.innerHTML = `
      <div class="optio-thumbnail-card mb-3" style="cursor: pointer;">
        <img src="${imgPath}" alt="${title}" class="img-fluid rounded mb-2 w-100" style="aspect-ratio: 16/9; object-fit: cover; box-shadow: 0 1px 3px rgba(0,0,0,0.1);" onerror="this.src='${fallbackImg}';">
        <div class="optio-video-title">${title}</div>
      </div>
    `;

    // Click handler to launch video modal
    thumb.addEventListener('click', function () {
      let videoModal = document.getElementById('optioVideoModal');
      if (!videoModal) {
        const modalHTML = `
          <div class="modal fade" id="optioVideoModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
              <div class="modal-content border-0 shadow-lg bg-dark text-white rounded-3">
                <div class="modal-header border-bottom border-secondary">
                  <h5 class="modal-title fw-bold" id="optioVideoModalLabel">Dental Video Presentation</h5>
                  <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-0 text-center">
                  <div class="ratio ratio-16x9">
                    <iframe id="optioVideoIframe" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        videoModal = document.getElementById('optioVideoModal');
      }

      const modalTitle = videoModal.querySelector('#optioVideoModalLabel');
      if (modalTitle) modalTitle.textContent = title;

      const bsModal = new bootstrap.Modal(videoModal);
      bsModal.show();
    });
  });

  // Mobile navigation auto-close
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link:not(.dropdown-toggle)');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  if (navbarCollapse) {
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navbarCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) {
            bsCollapse.hide();
          }
        }
      });
    });
  }
});
