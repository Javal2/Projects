@extends('layouts.app')

@section('title', 'Delicious Menu — TiffinWorld')

@section('content')
<!-- Menu Hero & Location Search Panel -->
<section class="tw-menu-hero-section">
  <div class="tw-container">
    <div class="row align-items-center">
      <div class="col-lg-5">
        <h1 class="tw-menu-h1">Delicious Menu</h1>
        <p class="tw-menu-lead">
          Discover the art of the curated harvest. Authentic, home-cooked tiffins delivered from local artisans directly to your doorstep.
        </p>
      </div>

      <div class="col-lg-7">
        <div class="tw-location-card">
          <button class="tw-current-loc-btn mb-3" type="button">
            <i class="bi bi-crosshair"></i> Use my current location
          </button>

          <div class="row g-2 mb-2">
            <div class="col-md-4 col-12">
              <div class="tw-panel-control">
                <i class="bi bi-geo-alt icon-prefix"></i>
                <select class="tw-pill-select">
                  <option>Select City</option>
                  <option>Mumbai</option>
                  <option>Jersey City</option>
                  <option>Pune</option>
                  <option>Bangalore</option>
                </select>
              </div>
            </div>
            <div class="col-md-4 col-6">
              <div class="tw-panel-control">
                <i class="bi bi-globe icon-prefix"></i>
                <select class="tw-pill-select">
                  <option>All Countries</option>
                  <option>India</option>
                  <option>USA</option>
                </select>
              </div>
            </div>
            <div class="col-md-4 col-6">
              <div class="tw-panel-control">
                <i class="bi bi-map icon-prefix"></i>
                <select class="tw-pill-select">
                  <option>Select State</option>
                  <option>Maharashtra</option>
                  <option>New Jersey</option>
                  <option>Gujarat</option>
                </select>
              </div>
            </div>
          </div>

          <div class="row g-2">
            <div class="col-md-6 col-6">
              <div class="tw-panel-control">
                <input type="text" class="tw-pill-input" placeholder="Pincode" style="padding-left: 18px;">
              </div>
            </div>
            <div class="col-md-6 col-6">
              <div class="tw-panel-control">
                <i class="bi bi-geo-alt icon-prefix"></i>
                <select class="tw-pill-select">
                  <option>Radius: 50km</option>
                  <option>Radius: 10km</option>
                  <option>Radius: 25km</option>
                  <option>Radius: 100km</option>
                </select>
              </div>
            </div>
          </div>

          <div class="tw-text-search-wrapper">
            <i class="bi bi-search"></i>
            <input type="text" class="tw-text-search-input" placeholder="Search for boxes or flavors...">
            <button class="tw-search-cta-btn" type="button">
              <i class="bi bi-search"></i> Search
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Categories Strip -->
<section class="bg-white">
  <div class="tw-container">
    <div class="tw-category-bar">
      <div class="tw-category-title-wrap">
        <i class="bi bi-grid-fill"></i>
        <span>Categories</span>
      </div>
      <ul class="tw-category-pills">
        <li><span class="tw-cat-pill active">All</span></li>
        <li><span class="tw-cat-pill">Veg</span></li>
        <li><span class="tw-cat-pill">Non-Veg</span></li>
        <li><span class="tw-cat-pill">Combo</span></li>
        <li><span class="tw-cat-pill">Diet</span></li>
      </ul>
    </div>
    <div class="tw-category-divider"></div>
  </div>
</section>

<!-- Product Grid -->
<section class="tw-section-padding bg-white pt-0">
  <div class="tw-container">
    <div class="row g-4">
      @forelse($meals ?? [] as $meal)
        <div class="col-lg-4 col-md-6">
          <div class="meal-menu-card">
            <img src="{{ asset($meal->image ?? 'assets/images/meal-placeholder.jpg') }}" alt="{{ $meal->name }}" class="meal-card-img">
            <div class="meal-card-header">
              <div class="meal-card-title-group">
                <i class="bi bi-shop"></i>
                <h3 class="meal-card-title">{{ $meal->name }}</h3>
              </div>
              <span class="{{ $meal->is_veg ? 'badge-veg' : 'badge-non-veg' }}">{{ $meal->is_veg ? 'VEG' : 'NON-VEG' }}</span>
            </div>
            <div class="meal-card-meta-row">
              <div class="meal-meta-left"><i class="bi bi-shop"></i> Vendor:</div>
              <div class="meal-meta-value">{{ $meal->vendor_name ?? 'Amma\'s Secret' }}</div>
            </div>
            <div class="meal-card-meta-row mb-2">
              <div class="meal-meta-left"><i class="bi bi-geo-alt"></i> Locations:</div>
              <span class="meal-location-chip">{{ $meal->location ?? 'Jersey City' }}</span>
            </div>
            <div class="meal-card-price">₹ {{ number_format($meal->price ?? 180, 2) }}</div>
            <div class="meal-card-actions">
              <a href="{{ route('menu.show', $meal->id ?? 1) }}" class="btn-menu-details"><i class="bi bi-eye"></i> View Details</a>
              <button class="btn-menu-inquiry tw-inquiry-btn" data-meal="{{ $meal->name ?? 'Meal' }}" data-vendor="{{ $meal->vendor_name ?? $meal->vendor->name ?? 'Amma\'s Secret' }}" data-image="{{ asset($meal->image ?? 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop') }}" data-location="{{ $meal->location ?? 'Jersey City' }}" data-product-id="{{ $meal->id ?? '' }}" data-vendor-id="{{ $meal->vendor_id ?? '' }}">Inquiry Now</button>
            </div>
          </div>
        </div>
      @empty
        <!-- Fallback Demo Grid -->
        @for($i=1; $i<=6; $i++)
          <div class="col-lg-4 col-md-6">
            <div class="meal-menu-card">
              <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop" class="meal-card-img" alt="Burger">
              <div class="meal-card-header">
                <div class="meal-card-title-group">
                  <i class="bi bi-shop"></i>
                  <h3 class="meal-card-title">Burger</h3>
                </div>
                <span class="badge-veg">VEG</span>
              </div>
              <div class="meal-card-meta-row">
                <div class="meal-meta-left"><i class="bi bi-shop"></i> Vendor:</div>
                <div class="meal-meta-value">Amma's Secret</div>
              </div>
              <div class="meal-card-meta-row mb-2">
                <div class="meal-meta-left"><i class="bi bi-geo-alt"></i> Locations:</div>
                <span class="meal-location-chip">Jersey City</span>
              </div>
              <div class="meal-card-price">₹ 180.00</div>
              <div class="meal-card-actions">
                <a href="#" class="btn-menu-details"><i class="bi bi-eye"></i> View Details</a>
                <button class="btn-menu-inquiry tw-inquiry-btn" data-meal="Burger">Inquiry Now</button>
              </div>
            </div>
          </div>
        @endfor
      @endforelse
    </div>

    <!-- Centered Pagination -->
    <div class="tw-menu-pagination">
      <a href="#" class="tw-page-btn"><i class="bi bi-chevron-left"></i></a>
      <a href="#" class="tw-page-btn">1</a>
      <a href="#" class="tw-page-btn">2</a>
      <a href="#" class="tw-page-btn active">3</a>
      <a href="#" class="tw-page-btn">4</a>
      <a href="#" class="tw-page-btn">5</a>
      <a href="#" class="tw-page-btn">6</a>
      <a href="#" class="tw-page-btn">7</a>
      <span class="px-1 text-muted">...</span>
      <a href="#" class="tw-page-btn"><i class="bi bi-chevron-right"></i></a>
    </div>
  </div>
</section>
@endsection
