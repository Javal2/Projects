<footer class="tw-footer">
  <div class="tw-container tw-footer-main">
    <div class="row g-4">
      <div class="col-lg-4 col-md-6">
        <a href="{{ route('home') }}" class="tw-brand-logo">
          <svg class="logo-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.46 3.9 3.45 4.38l-.95 7.62h2.5l.95-7.62C10.54 12.9 12 11.12 12 9V2h-1v7zm8.5-7h-1.5c-1.66 0-3 1.34-3 3v5c0 1.66 1.34 3 3 3v8h2V2z"/>
          </svg>
          <span class="logo-text">TiffinWorld</span>
        </a>
        <p class="tw-footer-brand-text">
          The Curated Harvest. High-end editorial food delivery service for the discerning palate.
        </p>
        <div class="tw-footer-socials">
          <a href="#" class="tw-social-btn" aria-label="Instagram"><i class="bi bi-instagram"></i></a>
          <a href="#" class="tw-social-btn" aria-label="Facebook"><i class="bi bi-facebook"></i></a>
          <a href="#" class="tw-social-btn" aria-label="Twitter"><i class="bi bi-twitter-x"></i></a>
        </div>
      </div>

      <div class="col-lg-2 col-md-6">
        <h4 class="tw-footer-col-title">Company</h4>
        <ul class="tw-footer-links">
          <li><a href="{{ route('home') }}" class="{{ request()->routeIs('home') ? 'active-link' : '' }}">Home</a></li>
          <li><a href="{{ route('menu.index') }}">Menu</a></li>
          <li><a href="{{ route('categories') }}">Categories</a></li>
          <li><a href="{{ route('story') }}">Our Story</a></li>
          <li><a href="{{ route('contact') }}">Contact</a></li>
          <li><a href="{{ route('blog.index') }}">Blog</a></li>
        </ul>
      </div>

      <div class="col-lg-3 col-md-6">
        <h4 class="tw-footer-col-title">Account</h4>
        <ul class="tw-footer-links">
          <li><a href="{{ route('login.customer') }}">Customer Login</a></li>
          <li><a href="{{ route('login.vendor') }}">Vendor Login</a></li>
          <li><a href="{{ route('legal.terms') }}">Terms & Conditions</a></li>
          <li><a href="{{ route('legal.policies') }}">Our Policies</a></li>
        </ul>
      </div>

      <div class="col-lg-3 col-md-6">
        <h4 class="tw-footer-col-title">Subscribe</h4>
        <p class="tw-subscribe-text">Get latest updates directly.</p>
        <form class="tw-subscribe-form" action="#" method="POST">
          @csrf
          <input type="email" name="email" placeholder="Your email" required>
          <button type="submit">Join Us</button>
        </form>
      </div>
    </div>
  </div>

  <div class="tw-footer-bottom">
    <div class="tw-container">
      <div class="tw-footer-bottom-inner">
        <div>© 2026 TiffinWorld.com - All rights reserved.</div>
        <div class="tw-footer-icons">
          <a href="#" class="tw-footer-icon-btn"><i class="bi bi-share-fill"></i></a>
          <a href="#" class="tw-footer-icon-btn"><i class="bi bi-globe"></i></a>
        </div>
      </div>
    </div>
  </div>
</footer>
