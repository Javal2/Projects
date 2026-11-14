/* ==================================================
   TIFFINWORLD — SAAS ADMIN DASHBOARD INTERACTION LOGIC
   ================================================== */
document.addEventListener('DOMContentLoaded', function () {
  
  // 1. Mobile Sidebar Toggle
  const mobileToggle = document.getElementById('mobileSidebarToggle');
  const sidebar = document.getElementById('adminSidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  if (mobileToggle && sidebar) {
    mobileToggle.addEventListener('click', function () {
      sidebar.classList.toggle('show');
      if (sidebarOverlay) sidebarOverlay.classList.toggle('show');
    });
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', function () {
      sidebar.classList.remove('show');
      sidebarOverlay.classList.remove('show');
    });
  }

  // 1b. Sidebar Scroll State Persistence & Auto-Scroll Active Item into View
  if (sidebar) {
    // Save scroll position on scroll
    sidebar.addEventListener('scroll', function () {
      sessionStorage.setItem('sidebarScrollPos', sidebar.scrollTop);
    });

    // Save scroll position when clicking any link
    sidebar.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        sessionStorage.setItem('sidebarScrollPos', sidebar.scrollTop);
      });
    });

    // Restore scroll position
    const savedPos = sessionStorage.getItem('sidebarScrollPos');
    if (savedPos !== null) {
      sidebar.scrollTop = parseInt(savedPos, 10);
    }

    // Ensure active link is scrolled into view smoothly
    const activeLink = sidebar.querySelector('.sidebar-menu-link.active, .sidebar-submenu-link.active');
    if (activeLink) {
      const linkRect = activeLink.getBoundingClientRect();
      const sidebarRect = sidebar.getBoundingClientRect();

      if (linkRect.top < sidebarRect.top || linkRect.bottom > sidebarRect.bottom) {
        activeLink.scrollIntoView({ block: 'center', behavior: 'instant' });
      }
    }
  }

  // 2. Animated KPI Counters
  const counterElements = document.querySelectorAll('.animate-counter');
  counterElements.forEach(function (counter) {
    const target = parseFloat(counter.getAttribute('data-target') || '0');
    const prefix = counter.getAttribute('data-prefix') || '';
    const suffix = counter.getAttribute('data-suffix') || '';
    const duration = 1200; // ms
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(easedProgress * target);

      counter.textContent = prefix + currentValue.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = prefix + target.toLocaleString() + suffix;
      }
    }

    requestAnimationFrame(updateCounter);
  });

  // 3. Global Search Input Table Filter
  const tableSearch = document.getElementById('tableSearchInput');
  if (tableSearch) {
    tableSearch.addEventListener('keyup', function () {
      const query = this.value.toLowerCase();
      const rows = document.querySelectorAll('.saas-table tbody tr');

      rows.forEach(function (row) {
        const text = row.textContent.toLowerCase();
        row.style.display = text.indexOf(query) > -1 ? '' : 'none';
      });
    });
  }

  // 4. Toast Notification Trigger Helper
  window.showToast = function (message, title = 'Notification', type = 'info') {
    let toastContainer = document.getElementById('adminToastContainer');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'adminToastContainer';
      toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
      toastContainer.style.zIndex = '1090';
      document.body.appendChild(toastContainer);
    }

    const toastId = 'toast_' + Date.now();
    const toastHtml = `
      <div id="${toastId}" class="toast align-items-center text-bg-white border-0 shadow-lg" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body d-flex align-items-center gap-2">
            <i class="bi bi-check-circle-fill text-success fs-5"></i>
            <div>
              <strong>${title}</strong><br>
              <small class="text-muted">${message}</small>
            </div>
          </div>
          <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    `;

    toastContainer.insertAdjacentHTML('beforeend', toastHtml);
    const toastEl = document.getElementById(toastId);
    const bsToast = new bootstrap.Toast(toastEl, { delay: 3500 });
    bsToast.show();
  };

  // 5. Chart.js Dashboard Charts matching exact layout
  initDashboardCharts();

});

function initDashboardCharts() {
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { padding: 10, cornerRadius: 6 }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { family: 'Poppins', size: 10 }, color: '#9CA3AF' }
      },
      y: {
        display: false
      }
    }
  };

  // Chart 1: Inquiry Trend
  const inquiryChartCanvas = document.getElementById('inquiryTrendChart');
  if (inquiryChartCanvas && typeof Chart !== 'undefined') {
    const ctx = inquiryChartCanvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, 'rgba(59, 105, 42, 0.18)');
    gradient.addColorStop(1, 'rgba(59, 105, 42, 0.0)');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['WEEK 01', 'WEEK 02', 'WEEK 03', 'WEEK 04'],
        datasets: [{
          data: [25, 45, 38, 85, 30, 68],
          borderColor: '#3B692A',
          backgroundColor: gradient,
          fill: true,
          tension: 0.45,
          borderWidth: 3,
          pointRadius: 0
        }]
      },
      options: chartOptions
    });
  }

  // Chart 2: Product Approval Stats
  const approvalChartCanvas = document.getElementById('productApprovalChart');
  if (approvalChartCanvas && typeof Chart !== 'undefined') {
    const ctx = approvalChartCanvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, 'rgba(59, 105, 42, 0.18)');
    gradient.addColorStop(1, 'rgba(59, 105, 42, 0.0)');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['WEEK 01', 'WEEK 02', 'WEEK 03', 'WEEK 04'],
        datasets: [{
          data: [30, 52, 42, 88, 35, 72],
          borderColor: '#3B692A',
          backgroundColor: gradient,
          fill: true,
          tension: 0.45,
          borderWidth: 3,
          pointRadius: 0
        }]
      },
      options: chartOptions
    });
  }
}
