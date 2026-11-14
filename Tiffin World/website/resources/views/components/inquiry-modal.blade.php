<!-- ==================================================
     TIFFINWORLD — REDESIGNED INQUIRY MODAL COMPONENT
     ================================================== -->
<div class="modal fade tw-inquiry-modal" id="inquiryModal" tabindex="-1" aria-labelledby="inquiryModalTitle" aria-hidden="true" role="dialog" aria-modal="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="row g-0">
        
        <!-- LEFT VISUAL PANEL -->
        <div class="col-lg-4 col-md-5 inquiry-image-panel d-none d-md-flex">
          <img src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop" 
               alt="Premium Culinary Experience" class="inquiry-bg-img" id="inquiryModalBgImg">
          <div class="inquiry-gradient-overlay"></div>
          <div class="inquiry-left-content">
            <div class="inquiry-left-eyebrow">PREMIUM CONSERVATORY</div>
            <h4 class="inquiry-left-title">Elevating your<br>culinary journey.</h4>
          </div>
        </div>

        <!-- RIGHT FORM PANEL -->
        <div class="col-lg-8 col-md-7 inquiry-form-panel">
          
          <!-- FORM HEADER -->
          <div class="inquiry-form-header">
            <h2 class="inquiry-form-title" id="inquiryModalTitle">Place Your Inquiry</h2>
            <p class="inquiry-form-subtitle">Request a personalized booking for your selected plan</p>
            <button type="button" class="inquiry-close-btn" data-bs-dismiss="modal" aria-label="Close inquiry form">
              <i class="bi bi-x-lg"></i>
            </button>
          </div>

          <!-- SUCCESS STATE (Hidden by default) -->
          <div id="inquirySuccessState" class="inquiry-success-box d-none">
            <i class="bi bi-check-circle-fill inquiry-success-icon"></i>
            <h3 class="inquiry-success-title">Inquiry Sent Successfully</h3>
            <p class="inquiry-success-text">Your request has been delivered to the kitchen host. We will contact you shortly with personalized plan details and scheduling.</p>
            <button type="button" class="inquiry-btn-submit mx-auto" data-bs-dismiss="modal">Done</button>
          </div>

          <!-- MAIN INQUIRY FORM -->
          <form id="inquiryForm" action="{{ route('inquiry.store') ?? '#' }}" method="POST" novalidate>
            @csrf
            <input type="hidden" name="product_id" id="inquiryProductId" value="{{ $meal->id ?? '' }}">
            <input type="hidden" name="vendor_id" id="inquiryVendorId" value="{{ $meal->vendor_id ?? '' }}">
            <input type="hidden" name="plan_id" id="inquiryPlanId" value="{{ $selectedPlan->id ?? '' }}">
            <input type="hidden" name="quantity" id="inquiryQuantityInput" value="2">

            <!-- SELECTED PLAN SUMMARY CARD -->
            <div class="inquiry-plan-card">
              <div class="d-flex align-items-center gap-3">
                <img src="https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=200&auto=format&fit=crop" 
                     alt="Selected Plan" class="inquiry-plan-thumb" id="inquiryModalThumb">
                <div>
                  <span class="inquiry-card-tag">SELECTED PLAN</span>
                  <h5 class="inquiry-plan-name" id="inquiryModalMealName">Artisan Taco</h5>
                </div>
              </div>
              <div class="text-md-end text-start">
                <span class="inquiry-card-tag">VENDOR</span>
                <h5 class="inquiry-vendor-name" id="inquiryModalVendorName">The Green Kitchen</h5>
              </div>
            </div>

            <!-- SECTION 1 — PERSONAL DETAILS -->
            <div class="inquiry-section-title">PERSONAL DETAILS</div>
            <div class="row g-2 mb-1">
              <div class="col-md-6">
                <label for="inquiryFullName" class="inquiry-label">Full Name</label>
                <div class="inquiry-input-wrapper">
                  <i class="bi bi-person inquiry-input-icon"></i>
                  <input type="text" id="inquiryFullName" name="full_name" class="inquiry-control" 
                         placeholder="Johnathan Doe" value="{{ auth()->user()->name ?? '' }}" required>
                </div>
              </div>
              <div class="col-md-6">
                <label for="inquiryPhone" class="inquiry-label">Phone Number</label>
                <div class="inquiry-phone-group">
                  <select name="country_code" class="inquiry-phone-prefix-select" aria-label="Country Code">
                    <option value="+91" selected>🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+1">🇨🇦 +1</option>
                    <option value="+61">🇦🇺 +61</option>
                    <option value="+971">🇦🇪 +971</option>
                    <option value="+65">🇸🇬 +65</option>
                    <option value="+49">🇩🇪 +49</option>
                    <option value="+33">🇫🇷 +33</option>
                    <option value="+966">🇸🇦 +966</option>
                    <option value="+974">🇶🇦 +974</option>
                    <option value="+977">🇳🇵 +977</option>
                  </select>
                  <input type="tel" id="inquiryPhone" name="phone" class="inquiry-control inquiry-control-noicon" 
                         placeholder="000 000 0000" value="{{ auth()->user()->phone ?? '' }}" required>
                </div>
              </div>
              <div class="col-12">
                <label for="inquiryEmail" class="inquiry-label">Email Address</label>
                <div class="inquiry-input-wrapper">
                  <i class="bi bi-envelope inquiry-input-icon"></i>
                  <input type="email" id="inquiryEmail" name="email" class="inquiry-control" 
                         placeholder="j.doe@conservatory.com" value="{{ auth()->user()->email ?? '' }}" required>
                </div>
              </div>
            </div>

            <!-- SECTION 2 — ORDER LOGISTICS -->
            <div class="inquiry-section-title">ORDER LOGISTICS</div>
            <div class="row g-2 mb-1">
              <div class="col-md-4">
                <label class="inquiry-label">Quantity</label>
                <div class="inquiry-qty-stepper">
                  <button type="button" class="inquiry-qty-btn" id="btnQtyMinus" aria-label="Decrease quantity">
                    <i class="bi bi-dash-lg"></i>
                  </button>
                  <span class="inquiry-qty-val" id="inquiryQtyDisplay">02</span>
                  <button type="button" class="inquiry-qty-btn" id="btnQtyPlus" aria-label="Increase quantity">
                    <i class="bi bi-plus-lg"></i>
                  </button>
                </div>
              </div>
              <div class="col-md-4">
                <label for="inquiryDate" class="inquiry-label">Preferred Date</label>
                <div class="inquiry-input-wrapper">
                  <i class="bi bi-calendar3 inquiry-input-icon"></i>
                  <input type="date" id="inquiryDate" name="preferred_date" class="inquiry-control" required>
                </div>
              </div>
              <div class="col-md-4">
                <label for="inquiryTime" class="inquiry-label">Time Window</label>
                <div class="inquiry-input-wrapper inquiry-select-wrapper">
                  <i class="bi bi-clock inquiry-input-icon"></i>
                  <select id="inquiryTime" name="time_window" class="inquiry-control inquiry-select" required>
                    <option value="Morning" selected>Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                  </select>
                  <i class="bi bi-chevron-down inquiry-select-chevron"></i>
                </div>
              </div>
            </div>

            <!-- SECTION 3 — LOCATION & DIRECTIONS -->
            <div class="inquiry-section-title">LOCATION & DIRECTIONS</div>
            <div class="inquiry-location-card mb-2">
              <i class="bi bi-geo-alt-fill inquiry-location-icon"></i>
              <div>
                <span class="inquiry-card-tag" style="font-size: 10px;">DELIVERY LOCATION</span>
                <h6 class="inquiry-location-val" id="inquiryModalLocation">Downtown Conservatory Hub, District 4</h6>
              </div>
            </div>

            <div class="mb-2">
              <label for="inquiryAddress" class="inquiry-label">Address & Landmarks</label>
              <textarea id="inquiryAddress" name="address" class="inquiry-control inquiry-control-noicon" 
                        placeholder="Specific apartment number, building floor, or gate instructions..." required></textarea>
            </div>

            <!-- FOOTER DIVIDER & ACTIONS -->
            <div class="inquiry-footer-divider"></div>
            <div class="d-flex align-items-center justify-content-end inquiry-footer-actions gap-3">
              <button type="button" class="inquiry-btn-cancel" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" class="inquiry-btn-submit" id="btnSubmitInquiry">
                Send Inquiry <i class="bi bi-send-fill ms-1"></i>
              </button>
            </div>

          </form>

        </div>
      </div>
    </div>
  </div>
</div>
