<header class="tw-header">
  <div class="tw-container">
    <div class="tw-header-inner">
      <div class="tw-header-left">
        <a href="{{ route('home') }}" class="tw-brand-logo">
          <svg class="logo-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.46 3.9 3.45 4.38l-.95 7.62h2.5l.95-7.62C10.54 12.9 12 11.12 12 9V2h-1v7zm8.5-7h-1.5c-1.66 0-3 1.34-3 3v5c0 1.66 1.34 3 3 3v8h2V2z"/>
          </svg>
          <span class="logo-text">TiffinWorld</span>
        </a>
      </div>

      <div class="tw-header-center">
        <ul class="tw-desktop-nav">
          <li><a href="{{ route('home') }}" class="tw-nav-link {{ request()->routeIs('home') ? 'active' : '' }}">Home</a></li>
          <li><a href="{{ route('menu.index') }}" class="tw-nav-link {{ request()->routeIs('menu.*') ? 'active' : '' }}">Menu</a></li>
          <li><a href="{{ route('categories') }}" class="tw-nav-link {{ request()->routeIs('categories') ? 'active' : '' }}">Categories</a></li>
          <li><a href="{{ route('story') }}" class="tw-nav-link {{ request()->routeIs('story') ? 'active' : '' }}">Our Story</a></li>
          <li><a href="{{ route('contact') }}" class="tw-nav-link {{ request()->routeIs('contact') ? 'active' : '' }}">Contact</a></li>
        </ul>
      </div>

      <div class="tw-header-right">
        <div class="tw-header-actions">
          <a href="{{ route('login.customer') }}" class="tw-customer-login">Customer Login</a>
          <a href="{{ route('login.vendor') }}" class="tw-vendor-btn">Vendor Login</a>
        </div>

        <button class="tw-mobile-toggle" type="button" data-bs-toggle="offcanvas" data-bs-target="#twMobileNav">
          <i class="bi bi-list"></i>
        </button>
      </div>
    </div>
  </div>
</header>
