/* ==================================================
   TIFFINWORLD — INTERACTIVE JAVASCRIPT
   ================================================== */
document.addEventListener("DOMContentLoaded", () => {
  // 1. Sticky Header Scroll Shadow
  const header = document.querySelector(".tw-header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  // 2. Search & Inquiry Form Feedback
  const searchForms = document.querySelectorAll(".tw-search-form, .tw-subscribe-form");
  searchForms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input");
      if (input && input.value.trim() !== "") {
        alert(`Searching TiffinWorld for: "${input.value.trim()}"`);
      }
    });
  });

  // 3. Set default preferred date to tomorrow
  const dateInput = document.getElementById("inquiryDate");
  if (dateInput && !dateInput.value) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().split("T")[0];
  }

  // 4. Global Event Delegation for Inquiry Modal Triggers
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".tw-inquiry-btn, .btn-menu-inquiry, .btn-product-inquiry");
    if (!btn) return;

    e.preventDefault();

    const modalEl = document.getElementById("inquiryModal");
    if (!modalEl) {
      console.warn("Inquiry Modal (#inquiryModal) container not found.");
      return;
    }

    // Try finding card container to extract metadata dynamically if attributes missing
    const card = btn.closest(".meal-menu-card, .tw-card, .tw-detail-hero, .tw-product-card, .col-lg-4, .col-md-6");

    let mealName = btn.getAttribute("data-meal");
    if (!mealName && card) {
      const titleEl = card.querySelector(".meal-card-title, .tw-card-title, h1, h2, h3");
      if (titleEl) mealName = titleEl.textContent.trim();
    }
    if (!mealName) mealName = "Artisan Taco";

    let vendorName = btn.getAttribute("data-vendor");
    if (!vendorName && card) {
      const vendorEl = card.querySelector(".meal-meta-value, .tw-vendor-name-sm, .tw-vendor-name");
      if (vendorEl) vendorName = vendorEl.textContent.trim();
    }
    if (!vendorName) vendorName = "The Green Kitchen";

    let mealThumb = btn.getAttribute("data-image");
    if (!mealThumb && card) {
      const imgEl = card.querySelector("img");
      if (imgEl) mealThumb = imgEl.src;
    }
    if (!mealThumb) mealThumb = "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=200&auto=format&fit=crop";

    let location = btn.getAttribute("data-location");
    if (!location && card) {
      const locEl = card.querySelector(".meal-location-chip, .val, .tw-location");
      if (locEl) location = locEl.textContent.trim();
    }
    if (!location) location = "Downtown Conservatory Hub, District 4";

    const productId = btn.getAttribute("data-product-id") || "";
    const vendorId = btn.getAttribute("data-vendor-id") || "";
    const planId = btn.getAttribute("data-plan-id") || "";

    // Populate Modal Fields
    const mealNameEl = document.getElementById("inquiryModalMealName");
    const vendorNameEl = document.getElementById("inquiryModalVendorName");
    const thumbEl = document.getElementById("inquiryModalThumb");
    const locationEl = document.getElementById("inquiryModalLocation");
    const prodIdInput = document.getElementById("inquiryProductId");
    const vendIdInput = document.getElementById("inquiryVendorId");
    const planIdInput = document.getElementById("inquiryPlanId");

    if (mealNameEl) mealNameEl.textContent = mealName;
    if (vendorNameEl) vendorNameEl.textContent = vendorName;
    if (thumbEl) thumbEl.src = mealThumb;
    if (locationEl) locationEl.textContent = location;
    if (prodIdInput && productId) prodIdInput.value = productId;
    if (vendIdInput && vendorId) vendIdInput.value = vendorId;
    if (planIdInput && planId) planIdInput.value = planId;

    // Reset Form & Success Box
    const formEl = document.getElementById("inquiryForm");
    const successEl = document.getElementById("inquirySuccessState");
    if (formEl) formEl.classList.remove("d-none");
    if (successEl) successEl.classList.add("d-none");

    // Open Modal
    if (typeof bootstrap !== "undefined" && bootstrap.Modal) {
      const bsModal = bootstrap.Modal.getOrCreateInstance(modalEl);
      bsModal.show();
    } else {
      modalEl.classList.add("show");
      modalEl.style.display = "block";
      document.body.classList.add("modal-open");
    }
  });

  // Quantity Stepper Logic
  let currentQty = 2;
  const qtyDisplay = document.getElementById("inquiryQtyDisplay");
  const qtyInput = document.getElementById("inquiryQuantityInput");
  const btnMinus = document.getElementById("btnQtyMinus");
  const btnPlus = document.getElementById("btnQtyPlus");

  const updateQty = (newQty) => {
    if (newQty < 1) newQty = 1;
    if (newQty > 99) newQty = 99;
    currentQty = newQty;
    const formatted = currentQty < 10 ? `0${currentQty}` : `${currentQty}`;
    if (qtyDisplay) qtyDisplay.textContent = formatted;
    if (qtyInput) qtyInput.value = currentQty;
  };

  if (btnMinus) {
    btnMinus.addEventListener("click", (e) => {
      e.preventDefault();
      updateQty(currentQty - 1);
    });
  }

  if (btnPlus) {
    btnPlus.addEventListener("click", (e) => {
      e.preventDefault();
      updateQty(currentQty + 1);
    });
  }

  // Inquiry Form Validation & Submission
  const inquiryForm = document.getElementById("inquiryForm");
  if (inquiryForm) {
    inquiryForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const requiredInputs = inquiryForm.querySelectorAll("[required]");
      let isValid = true;

      requiredInputs.forEach(input => {
        if (!input.value || input.value.trim() === "") {
          input.classList.add("is-invalid");
          isValid = false;
        } else {
          input.classList.remove("is-invalid");
        }
      });

      if (!isValid) return;

      const submitBtn = document.getElementById("btnSubmitInquiry");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending... <span class="spinner-border spinner-border-sm ms-1" role="status" aria-hidden="true"></span>';
      }

      // Simulate submission loading state then display in-modal success message
      setTimeout(() => {
        inquiryForm.classList.add("d-none");
        const successEl = document.getElementById("inquirySuccessState");
        if (successEl) successEl.classList.remove("d-none");

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Send Inquiry <i class="bi bi-send-fill ms-1"></i>';
        }
      }, 750);
    });
  }

  // 5. Customer Auth — OTP 6-Box Interaction Logic
  const otpBoxes = document.querySelectorAll(".auth-otp-box");
  const hiddenOtpInput = document.getElementById("otpCombined");

  if (otpBoxes.length > 0) {
    const updateCombinedOtp = () => {
      let combined = "";
      otpBoxes.forEach(box => {
        combined += box.value;
      });
      if (hiddenOtpInput) hiddenOtpInput.value = combined;
    };

    otpBoxes.forEach((box, index) => {
      // Advance on input
      box.addEventListener("input", (e) => {
        const val = e.target.value;
        if (val.length > 1) {
          e.target.value = val.slice(-1);
        }
        updateCombinedOtp();

        if (e.target.value && index < otpBoxes.length - 1) {
          otpBoxes[index + 1].focus();
        }
      });

      // Keydown navigation (Backspace, ArrowLeft, ArrowRight)
      box.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
          otpBoxes[index - 1].focus();
        } else if (e.key === "ArrowLeft" && index > 0) {
          otpBoxes[index - 1].focus();
        } else if (e.key === "ArrowRight" && index < otpBoxes.length - 1) {
          otpBoxes[index + 1].focus();
        }
      });

      // Paste handler
      box.addEventListener("paste", (e) => {
        e.preventDefault();
        const clipboardData = (e.clipboardData || window.clipboardData).getData("text");
        const digits = clipboardData.replace(/\D/g, "").slice(0, 6);

        digits.split("").forEach((digit, i) => {
          if (otpBoxes[i]) {
            otpBoxes[i].value = digit;
          }
        });
        updateCombinedOtp();

        const lastFilledIndex = Math.min(digits.length, otpBoxes.length - 1);
        if (otpBoxes[lastFilledIndex]) {
          otpBoxes[lastFilledIndex].focus();
        }
      });
    });
  }

  // 5b. Vendor Auth — OTP 6-Box Interaction Logic
  const vendorOtpBoxes = document.querySelectorAll(".vendor-otp-box");
  const hiddenVendorOtpInput = document.getElementById("vendorOtpCombined");

  if (vendorOtpBoxes.length > 0) {
    const updateCombinedVendorOtp = () => {
      let combined = "";
      vendorOtpBoxes.forEach(box => {
        combined += box.value;
      });
      if (hiddenVendorOtpInput) hiddenVendorOtpInput.value = combined;
    };

    vendorOtpBoxes.forEach((box, index) => {
      box.addEventListener("input", (e) => {
        const val = e.target.value;
        if (val.length > 1) {
          e.target.value = val.slice(-1);
        }
        updateCombinedVendorOtp();

        if (e.target.value && index < vendorOtpBoxes.length - 1) {
          vendorOtpBoxes[index + 1].focus();
        }
      });

      box.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
          vendorOtpBoxes[index - 1].focus();
        } else if (e.key === "ArrowLeft" && index > 0) {
          vendorOtpBoxes[index - 1].focus();
        } else if (e.key === "ArrowRight" && index < vendorOtpBoxes.length - 1) {
          vendorOtpBoxes[index + 1].focus();
        }
      });

      box.addEventListener("paste", (e) => {
        e.preventDefault();
        const clipboardData = (e.clipboardData || window.clipboardData).getData("text");
        const digits = clipboardData.replace(/\D/g, "").slice(0, 6);

        digits.split("").forEach((digit, i) => {
          if (vendorOtpBoxes[i]) {
            vendorOtpBoxes[i].value = digit;
          }
        });
        updateCombinedVendorOtp();

        const lastFilledIndex = Math.min(digits.length, vendorOtpBoxes.length - 1);
        if (vendorOtpBoxes[lastFilledIndex]) {
          vendorOtpBoxes[lastFilledIndex].focus();
        }
      });
    });
  }

  // 6. Customer Auth — Email / Phone Mode Toggle
  const toggleAuthBtn = document.getElementById("btnToggleAuthMode");
  const emailSec = document.getElementById("emailInputSection");
  const phoneSec = document.getElementById("phoneInputSection");
  const toggleText = document.getElementById("toggleModeText");

  if (toggleAuthBtn && emailSec && phoneSec) {
    let isPhoneMode = false;
    toggleAuthBtn.addEventListener("click", () => {
      isPhoneMode = !isPhoneMode;
      if (isPhoneMode) {
        emailSec.classList.add("d-none");
        phoneSec.classList.remove("d-none");
        const icon = toggleAuthBtn.querySelector("i");
        if (icon) icon.className = "bi bi-envelope me-2";
        if (toggleText) toggleText.textContent = "Login with email address";
      } else {
        phoneSec.classList.add("d-none");
        emailSec.classList.remove("d-none");
        const icon = toggleAuthBtn.querySelector("i");
        if (icon) icon.className = "bi bi-phone me-2";
        if (toggleText) toggleText.textContent = "Login with phone number";
      }
    });
  }

  // 7. Customer Auth — Form Submit Loading State
  const customerLoginForm = document.getElementById("customerLoginForm");
  const btnCustomerSignIn = document.getElementById("btnCustomerSignIn");

  if (customerLoginForm) {
    customerLoginForm.addEventListener("submit", (e) => {
      if (btnCustomerSignIn) {
        btnCustomerSignIn.disabled = true;
        btnCustomerSignIn.innerHTML = 'Signing In... <span class="spinner-border spinner-border-sm ms-1" role="status" aria-hidden="true"></span>';
      }

      const action = customerLoginForm.getAttribute("action");
      if (!action || action === "#") {
        e.preventDefault();
        setTimeout(() => {
          window.location.href = "../customer/index.html";
        }, 600);
      }
    });
  }

  // 8. Vendor Auth — Segmented Control Tab Switch (Password vs OTP)
  const tabPassword = document.getElementById("tabVendorPassword");
  const tabOtp = document.getElementById("tabVendorOtp");
  const secPassword = document.getElementById("vendorPasswordSection");
  const secOtp = document.getElementById("vendorOtpSection");

  if (tabPassword && tabOtp && secPassword && secOtp) {
    tabPassword.addEventListener("click", () => {
      tabPassword.classList.add("active");
      tabOtp.classList.remove("active");
      secPassword.classList.remove("d-none");
      secOtp.classList.add("d-none");
    });

    tabOtp.addEventListener("click", () => {
      tabOtp.classList.add("active");
      tabPassword.classList.remove("active");
      secOtp.classList.remove("d-none");
      secPassword.classList.add("d-none");
    });
  }

  // 9. Vendor Auth — Password Visibility Toggle
  const togglePassBtn = document.getElementById("toggleVendorPassword");
  const vendorPassInput = document.getElementById("vendorPassword");

  if (togglePassBtn && vendorPassInput) {
    togglePassBtn.addEventListener("click", () => {
      const type = vendorPassInput.getAttribute("type") === "password" ? "text" : "password";
      vendorPassInput.setAttribute("type", type);
      togglePassBtn.classList.toggle("bi-eye");
      togglePassBtn.classList.toggle("bi-eye-slash");
    });
  }

  // 10. Vendor Auth — Form Submission Loading States
  const vendorLoginForm = document.getElementById("vendorLoginForm");
  const btnVendorSubmit = document.getElementById("btnVendorSubmit");

  if (vendorLoginForm) {
    vendorLoginForm.addEventListener("submit", (e) => {
      if (btnVendorSubmit) {
        btnVendorSubmit.disabled = true;
        btnVendorSubmit.innerHTML = 'Signing In to Dashboard... <span class="spinner-border spinner-border-sm ms-1" role="status" aria-hidden="true"></span>';
      }

      const action = vendorLoginForm.getAttribute("action");
      if (!action || action === "#") {
        e.preventDefault();
        setTimeout(() => {
          window.location.href = "../vendor/index.html";
        }, 600);
      }
    });
  }

  const vendorRegisterForm = document.getElementById("vendorRegisterForm");
  const btnVendorRegister = document.getElementById("btnVendorRegister");

  if (vendorRegisterForm) {
    vendorRegisterForm.addEventListener("submit", (e) => {
      if (btnVendorRegister) {
        btnVendorRegister.disabled = true;
        btnVendorRegister.innerHTML = 'Registering... <span class="spinner-border spinner-border-sm ms-1" role="status" aria-hidden="true"></span>';
      }

      const action = vendorRegisterForm.getAttribute("action");
      if (!action || action === "#") {
        e.preventDefault();
        setTimeout(() => {
          window.location.href = "vendor-login.html";
        }, 600);
      }
    });
  }

  // 11. Categories Page — Search & Chip Filtering
  const catSearchInput = document.getElementById("catSearchInput");
  const catChips = document.querySelectorAll(".cat-chip");
  const catCardItems = document.querySelectorAll(".cat-card-item");

  if (catSearchInput || catChips.length > 0) {
    const filterCategoryCards = () => {
      const query = catSearchInput ? catSearchInput.value.toLowerCase().trim() : "";
      const activeChip = document.querySelector(".cat-chip.active");
      const activeFilter = activeChip ? activeChip.getAttribute("data-filter") : "all";

      catCardItems.forEach(card => {
        const catData = card.getAttribute("data-category") || "";
        const cardText = card.textContent.toLowerCase();

        const matchesQuery = !query || cardText.includes(query);
        const matchesFilter = activeFilter === "all" || catData.includes(activeFilter);

        if (matchesQuery && matchesFilter) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });
    };

    if (catSearchInput) {
      catSearchInput.addEventListener("input", filterCategoryCards);
    }

    catChips.forEach(chip => {
      chip.addEventListener("click", () => {
        catChips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        filterCategoryCards();
      });
    });
  }

  // 12. Hero Vegetable Scroll Parallax & Desktop Mouse Depth
  const heroSection = document.querySelector(".tw-hero-section");

  if (heroSection) {
    let ticking = false;

    // Scroll Parallax Handler (updates --hero-scroll CSS variable)
    const updateScrollParallax = () => {
      const rect = heroSection.getBoundingClientRect();
      const heroHeight = rect.height || 700;

      // Calculate progress between 0 and 1 as user scrolls down
      let progress = -rect.top / heroHeight;
      progress = Math.max(0, Math.min(1, progress));

      document.documentElement.style.setProperty("--hero-scroll", progress.toFixed(3));
      ticking = false;
    };

    window.addEventListener("scroll", () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollParallax);
        ticking = true;
      }
    }, { passive: true });

    updateScrollParallax(); // Initial run

    // Desktop Mouse Depth Effect (Only >992px)
    const spinachWrap = document.querySelector(".tw-veggie-spinach-wrap");
    const broccoliWrap = document.querySelector(".tw-veggie-broccoli-wrap");
    const heroOrbit = document.querySelector(".hero-orbit");

    if (window.innerWidth > 992 && (spinachWrap || broccoliWrap)) {
      heroSection.addEventListener("mousemove", (e) => {
        window.requestAnimationFrame(() => {
          const rect = heroSection.getBoundingClientRect();
          const relX = (e.clientX - rect.left) / rect.width - 0.5;
          const relY = (e.clientY - rect.top) / rect.height - 0.5;

          // Spinach shift: max +-8px
          if (spinachWrap) {
            heroSection.style.setProperty("--mouse-spinach-x", `${(relX * 16).toFixed(1)}px`);
            heroSection.style.setProperty("--mouse-spinach-y", `${(relY * 16).toFixed(1)}px`);
          }

          // Broccoli shift: max +-12px
          if (broccoliWrap) {
            heroSection.style.setProperty("--mouse-broccoli-x", `${(-relX * 24).toFixed(1)}px`);
            heroSection.style.setProperty("--mouse-broccoli-y", `${(-relY * 24).toFixed(1)}px`);
          }

          // Orbit circle: max +-4px
          if (heroOrbit) {
            heroSection.style.setProperty("--mouse-circle-x", `${(relX * 8).toFixed(1)}px`);
            heroSection.style.setProperty("--mouse-circle-y", `${(relY * 8).toFixed(1)}px`);
          }
        });
      });

      heroSection.addEventListener("mouseleave", () => {
        heroSection.style.setProperty("--mouse-spinach-x", "0px");
        heroSection.style.setProperty("--mouse-spinach-y", "0px");
        heroSection.style.setProperty("--mouse-broccoli-x", "0px");
        heroSection.style.setProperty("--mouse-broccoli-y", "0px");
        heroSection.style.setProperty("--mouse-circle-x", "0px");
        heroSection.style.setProperty("--mouse-circle-y", "0px");
      });
    }
  }

  // 13. Product Details — Interactive Review Star Rating Widget
  const ratingWidgets = document.querySelectorAll(".tw-star-rating-widget");
  ratingWidgets.forEach(widget => {
    const stars = widget.querySelectorAll("i");
    const hiddenRatingInput = widget.querySelector("input[name='rating'], #reviewRatingInput");
    let currentRating = parseInt(widget.getAttribute("data-rating") || "5", 10);

    const renderStars = (rating) => {
      stars.forEach((star, index) => {
        if (index < rating) {
          star.className = "bi bi-star-fill";
        } else {
          star.className = "bi bi-star";
        }
      });
    };

    renderStars(currentRating);

    stars.forEach((star, index) => {
      const starValue = index + 1;
      
      star.addEventListener("mouseenter", () => {
        renderStars(starValue);
      });

      star.addEventListener("mouseleave", () => {
        renderStars(currentRating);
      });

      star.addEventListener("click", () => {
        currentRating = starValue;
        widget.setAttribute("data-rating", currentRating);
        if (hiddenRatingInput) {
          hiddenRatingInput.value = currentRating;
        }
        renderStars(currentRating);
      });
    });
  });

  // 14. Plan Selector & Option Pills Interactive Click Switching
  const planOpts = document.querySelectorAll(".tw-plan-opt");
  planOpts.forEach(opt => {
    opt.addEventListener("click", () => {
      const parent = opt.closest(".tw-plan-segmented");
      if (parent) {
        parent.querySelectorAll(".tw-plan-opt").forEach(o => o.classList.remove("active"));
      }
      opt.classList.add("active");
    });
  });

  const optPills = document.querySelectorAll(".tw-opt-pill");
  optPills.forEach(pill => {
    pill.addEventListener("click", () => {
      const parent = pill.closest(".tw-option-pills");
      if (parent) {
        parent.querySelectorAll(".tw-opt-pill").forEach(p => p.classList.remove("active"));
      }
      pill.classList.add("active");
    });
  });
});



