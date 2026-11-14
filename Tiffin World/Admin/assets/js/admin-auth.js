/* ==================================================
   TIFFINWORLD — ADMIN AUTHENTICATION INTERACTION LOGIC
   ================================================== */
document.addEventListener('DOMContentLoaded', function () {
  
  // 1. Sticky Header Scroll Effect
  const header = document.querySelector('.tw-header');
  if (header) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // 2. Toggle Password Visibility
  const togglePassword = document.getElementById('toggleAdminPassword');
  const passwordInput = document.getElementById('adminPassword');

  if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', function () {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      this.classList.toggle('bi-eye');
      this.classList.toggle('bi-eye-slash');
    });
  }

  // 3. Admin Form Submission Handler
  const adminForm = document.getElementById('adminLoginForm');
  const alertContainer = document.getElementById('adminAlertContainer');

  if (adminForm) {
    adminForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const emailInput = document.getElementById('adminEmail');
      const passwordInput = document.getElementById('adminPassword');
      const submitBtn = document.getElementById('btnAdminSubmit');

      const email = emailInput ? emailInput.value.trim() : '';
      const password = passwordInput ? passwordInput.value : '';

      if (!email || !password) {
        showAlert('Please fill in both Email and Password.', 'danger');
        return;
      }

      // Simulate loading state
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Authenticating...';

      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        showAlert('Welcome Admin! Redirecting to Dashboard...', 'success');

        // Perform redirect to Admin Dashboard
        setTimeout(function () {
          window.location.href = 'index.html';
        }, 1000);
      }, 1200);
    });
  }

  // 4. Google Sign In Handler
  const googleBtn = document.getElementById('btnGoogleLogin');
  if (googleBtn) {
    googleBtn.addEventListener('click', function () {
      showAlert('Initiating Google Single Sign-On for Admin...', 'success');
      setTimeout(function () {
        window.location.href = 'index.html';
      }, 1200);
    });
  }

  // Helper Function for Displaying Alert Banners
  function showAlert(message, type) {
    if (!alertContainer) return;

    const iconClass = type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill';
    alertContainer.innerHTML = `
      <div class="admin-alert admin-alert-${type} animate__animated animate__fadeIn" role="alert">
        <i class="bi ${iconClass}"></i>
        <div>${message}</div>
      </div>
    `;

    setTimeout(function () {
      const alert = alertContainer.querySelector('.admin-alert');
      if (alert) {
        alert.style.opacity = '0';
        alert.style.transition = 'opacity 300ms ease';
        setTimeout(() => alertContainer.innerHTML = '', 300);
      }
    }, 4000);
  }

});
