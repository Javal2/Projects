@extends('layouts.app')

@section('title', 'Contact Us — TiffinWorld')

@section('content')
<!-- Contact Hero Intro -->
<section class="tw-contact-hero">
  <div class="tw-container">
    <div class="d-flex align-items-start justify-content-between flex-wrap gap-3">
      <div>
        <h1 class="tw-contact-h1">Contact Us</h1>
        <p class="tw-contact-lead">
          Whether you have a question about our curated meal plans or you're a vendor looking to join the harvest, we're here to help you savor every moment.
        </p>
      </div>
      <div class="tw-response-badge">
        <i class="bi bi-clock-history"></i>
        <span>AVG. REPLY TIME: 2 HOURS</span>
      </div>
    </div>
    <div class="tw-orange-divider"></div>
  </div>
</section>

<!-- Main Contact Section -->
<section class="tw-contact-section">
  <div class="tw-container">
    <div class="row g-4">
      <!-- Left Column: Form Card -->
      <div class="col-lg-7">
        <div class="tw-contact-form-card">
          <h2 class="tw-contact-form-title">Send us a message</h2>

          <form action="{{ route('contact.submit') }}" method="POST">
            @csrf
            <div class="row g-3 mb-3">
              <div class="col-md-6">
                <label class="tw-field-label">FULL NAME</label>
                <input type="text" class="tw-contact-input" name="name" placeholder="Julian Casablancas" required>
              </div>
              <div class="col-md-6">
                <label class="tw-field-label">EMAIL ADDRESS</label>
                <input type="email" class="tw-contact-input" name="email" placeholder="julian@tiffin.world" required>
              </div>
            </div>

            <div class="row g-3 mb-3">
              <div class="col-md-6">
                <label class="tw-field-label">PHONE NUMBER</label>
                <div class="tw-phone-group">
                  <select name="country_code" class="tw-contact-phone-select" aria-label="Country Code">
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
                  <input type="tel" class="tw-contact-input" name="phone" placeholder="000 000 0000" required>
                </div>
              </div>
              <div class="col-md-6">
                <label class="tw-field-label">SUBJECT</label>
                <select class="tw-contact-select" name="subject" required>
                  <option>General Inquiry</option>
                  <option>Meal Subscription Question</option>
                  <option>Kitchen Partner Onboarding</option>
                </select>
              </div>
            </div>

            <div class="mb-4">
              <label class="tw-field-label">YOUR MESSAGE</label>
              <textarea class="tw-contact-textarea" name="message" placeholder="Tell us how we can help..." required></textarea>
            </div>

            <div>
              <button type="submit" class="btn-send-message">
                Send Message <i class="bi bi-send"></i>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Right Column: Info Card & Image -->
      <div class="col-lg-5">
        <div class="tw-reach-card">
          <h2 class="tw-reach-title">Other ways to reach us</h2>

          <div class="tw-reach-item">
            <div class="tw-reach-icon-circle"><i class="bi bi-envelope"></i></div>
            <div>
              <div class="tw-reach-label">EMAIL</div>
              <div class="tw-reach-value">hello@tiffinworld.com</div>
              <div class="tw-reach-sub">General Support & Feedback</div>
            </div>
          </div>

          <div class="tw-reach-item">
            <div class="tw-reach-icon-circle"><i class="bi bi-telephone"></i></div>
            <div>
              <div class="tw-reach-label">PHONE</div>
              <div class="tw-reach-value">+1 (888) TIFFIN-0</div>
              <div class="tw-reach-sub">Mon - Fri, 9am - 6pm EST</div>
            </div>
          </div>

          <div class="tw-reach-item">
            <div class="tw-reach-icon-circle"><i class="bi bi-geo-alt"></i></div>
            <div>
              <div class="tw-reach-label">OFFICE</div>
              <div class="tw-reach-value">124 Harvest Lane, Suite 400</div>
              <div class="tw-reach-sub">New York, NY 10013</div>
            </div>
          </div>

          <div class="tw-reach-item">
            <div class="tw-reach-icon-circle"><i class="bi bi-clock"></i></div>
            <div>
              <div class="tw-reach-label">BUSINESS HOURS</div>
              <div class="tw-reach-value">Mon - Fri 09:00 AM - 06:00 PM</div>
              <div class="tw-reach-sub">Sat - Sun 10:00 AM - 04:00 PM</div>
            </div>
          </div>
        </div>

        <div class="tw-contact-img-card">
          <img src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop" 
               alt="Tiffin box on office desk" class="tw-contact-desk-img">
          <div class="tw-contact-img-overlay">
            <p class="tw-contact-img-text">A taste of home, delivered to your doorstep.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Newsletter Banner -->
    <div class="tw-newsletter-section">
      <div class="tw-newsletter-banner">
        <div class="row align-items-center g-4">
          <div class="col-lg-6">
            <h2 class="tw-newsletter-title">Want the latest from our kitchen?</h2>
            <p class="tw-newsletter-desc">
              Join our newsletter for weekly menu updates, chef spotlights, and seasonal harvest stories.
            </p>
          </div>
          <div class="col-lg-6">
            <form class="tw-newsletter-form" action="{{ route('newsletter.subscribe') }}" method="POST">
              @csrf
              <input type="email" class="tw-newsletter-input" name="email" placeholder="Enter your email" required>
              <button type="submit" class="tw-newsletter-btn">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
@endsection
