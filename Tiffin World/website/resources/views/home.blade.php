@extends('layouts.app')

@section('title', 'TiffinWorld — Authentic Homemade Tiffins Delivered')

@section('content')
<!-- ==================================================
     SECTION 01 — HERO (TIFFINWORLD REFERENCE LAYOUT)
     ================================================== -->
<section class="tw-hero-section-new">
  <!-- Background Ambient Glow -->
  <div class="tw-hero-ambient-glow" aria-hidden="true"></div>

  <!-- Vegetable Background SVG Icons -->
  <div class="tw-tiffin-bg-icons" aria-hidden="true">
    <div class="tw-bg-icon tw-bg-icon-1"><svg viewBox="0 0 64 64" fill="none"><circle cx="32" cy="36" r="22" stroke="#3B692A" stroke-width="2.5" fill="none"/><path d="M32 14c-2 4-6 6-10 4 2 4 6 4 10 4s8 0 10-4c-4 2-8 0-10-4z" fill="#3B692A"/><path d="M32 14v-6" stroke="#3B692A" stroke-width="2.5" stroke-linecap="round"/></svg></div>
    <div class="tw-bg-icon tw-bg-icon-2"><svg viewBox="0 0 64 64" fill="none"><path d="M48 16L18 52c-2 2-5 2-7 0s-2-5 0-7L41 9c2-2 5-2 7 0s2 5 0 7z" stroke="#FF7900" stroke-width="2.5" fill="none"/><path d="M44 12l8-6M48 16l8-2M42 8l4-6" stroke="#3B692A" stroke-width="2" stroke-linecap="round"/></svg></div>
    <div class="tw-bg-icon tw-bg-icon-3"><svg viewBox="0 0 64 64" fill="none"><path d="M48 16C54 26 52 40 40 48S16 54 16 48c-6-10-4-24 8-32s24-8 24 0z" stroke="#FF7900" stroke-width="2.5" fill="none"/><path d="M16 48l-4 4M48 16l4-4" stroke="#3B692A" stroke-width="2" stroke-linecap="round"/></svg></div>
    <div class="tw-bg-icon tw-bg-icon-4"><svg viewBox="0 0 64 64" fill="none"><path d="M52 12C32 12 12 32 12 52c20 0 40-20 40-40z" stroke="#3B692A" stroke-width="2.5" fill="none"/><path d="M12 52L52 12M32 32l-10 6M42 22l-6 10" stroke="#3B692A" stroke-width="1.8" stroke-linecap="round"/></svg></div>
    <div class="tw-bg-icon tw-bg-icon-5"><svg viewBox="0 0 64 64" fill="none"><path d="M46 14c-8 0-22 10-26 22-4 12 0 20 6 20 8 0 22-18 24-34 0-4-2-8-4-8z" stroke="#FF7900" stroke-width="2.5" fill="none"/><path d="M46 14c2-4 6-6 10-6" stroke="#3B692A" stroke-width="2.5" stroke-linecap="round"/></svg></div>
    <div class="tw-bg-icon tw-bg-icon-6"><svg viewBox="0 0 64 64" fill="none"><path d="M28 40v16h8V40" stroke="#3B692A" stroke-width="2.5"/><circle cx="22" cy="28" r="12" stroke="#3B692A" stroke-width="2" fill="none"/><circle cx="42" cy="28" r="12" stroke="#3B692A" stroke-width="2" fill="none"/><circle cx="32" cy="20" r="14" stroke="#3B692A" stroke-width="2" fill="none"/></svg></div>
    <div class="tw-bg-icon tw-bg-icon-7"><svg viewBox="0 0 64 64" fill="none"><path d="M18 24c-4 0-6 4-6 10 0 14 6 22 20 22s20-8 20-22c0-6-2-10-6-10-4 0-8 4-14 4s-10-4-14-4z" stroke="#3B692A" stroke-width="2.5" fill="none"/><path d="M32 24V14c0-2 2-4 4-4" stroke="#3B692A" stroke-width="2.5" stroke-linecap="round"/></svg></div>
    <div class="tw-bg-icon tw-bg-icon-8"><svg viewBox="0 0 64 64" fill="none"><path d="M32 12c-4 8-16 14-16 28 0 10 7 16 16 16s16-6 16-16c0-14-12-20-16-28z" stroke="#3B692A" stroke-width="2.5" fill="none"/><path d="M32 12v40M22 24c4 8 4 18 0 24M42 24c-4 8-4 18 0 24" stroke="#3B692A" stroke-width="1.5"/><path d="M32 12V6" stroke="#FF7900" stroke-width="2" stroke-linecap="round"/></svg></div>
  </div>

  <div class="container-fluid tw-hero-container">
    <div class="row align-items-center g-4 g-lg-5 tw-hero-main-row">

      <!-- LEFT COLUMN: Content & Search -->
      <div class="col-lg-5 col-xl-5 tw-hero-left-col">
        <div class="tw-hero-left-content">
          
          <!-- Eyebrow Pill -->
          <div class="tw-hero-eyebrow-pill mb-3">
            <i class="bi bi-patch-check-fill text-success me-2"></i>
            <span>GOOD FOOD. JUST LIKE HOME.</span>
          </div>

          <!-- Main Heading -->
          <h1 class="tw-hero-heading-editorial mb-3">
            <span class="tw-word-green">Fresh Homemade</span><br>
            <span class="tw-word-orange">Tiffins,</span>
            <span class="tw-word-green">Delivered.</span>
          </h1>

          <!-- Description -->
          <p class="tw-hero-subdescription mb-4">
            Discover fresh homemade meals from trusted local tiffin kitchens, prepared with care and delivered right to your doorstep.
          </p>

          <!-- Search Bar Form -->
          <form class="tw-hero-search-wrapper mb-3" action="{{ Route::has('menu.index') ? route('menu.index') : 'menu.html' }}" method="GET">
            <div class="tw-hero-search-bar">
              <i class="bi bi-search tw-search-icon-left"></i>
              <input type="text" class="tw-search-input" placeholder="Choose Your Tiffin" name="search" aria-label="Choose Your Tiffin">
              <button type="submit" class="tw-search-submit-btn" aria-label="Search">
                <i class="bi bi-arrow-right"></i>
              </button>
            </div>
          </form>

          <!-- Trust Line -->
          <div class="tw-hero-trust-line mb-4">
            <i class="bi bi-check-circle-fill text-success me-1.5"></i>
            <span>Fresh meals</span>
            <span class="tw-dot-separator">•</span>
            <span>Local kitchens</span>
            <span class="tw-dot-separator">•</span>
            <span>Made with care</span>
          </div>

          <!-- 3-Benefit Feature Strip (Below Left Content) -->
          <div class="tw-hero-benefit-strip">
            <div class="tw-benefit-item">
              <div class="tw-benefit-icon-bg bg-green-light">
                <i class="bi bi-leaf-fill text-success"></i>
              </div>
              <div class="tw-benefit-text">
                <h4 class="tw-benefit-title">Fresh Meals</h4>
                <p class="tw-benefit-sub">Prepared Daily</p>
              </div>
            </div>
            <div class="tw-benefit-divider"></div>
            <div class="tw-benefit-item">
              <div class="tw-benefit-icon-bg bg-orange-light">
                <i class="bi bi-heart-fill text-orange"></i>
              </div>
              <div class="tw-benefit-text">
                <h4 class="tw-benefit-title">Homemade</h4>
                <p class="tw-benefit-sub">Made with Care</p>
              </div>
            </div>
            <div class="tw-benefit-divider"></div>
            <div class="tw-benefit-item">
              <div class="tw-benefit-icon-bg bg-green-light">
                <i class="bi bi-shield-check text-success"></i>
              </div>
              <div class="tw-benefit-text">
                <h4 class="tw-benefit-title">Trusted Kitchens</h4>
                <p class="tw-benefit-sub">Quality First</p>
              </div>
            </div>
          </div>

        </div><!-- /.tw-hero-left-content -->
      </div><!-- /.col-lg-5 -->

      <!-- RIGHT COLUMN: Large Tiffin Visual Composition -->
      <div class="col-lg-7 col-xl-7 tw-hero-right-col">
        <div class="tw-hero-food-visual">

          <!-- Floating On-Time Delivery Badge -->
          <div class="tw-delivery-badge-floating">
            <div class="tw-badge-inner">
              <i class="bi bi-clock-history badge-icon"></i>
              <span class="badge-line-1">ON-TIME</span>
              <span class="badge-line-2">DELIVERY</span>
            </div>
          </div>

          <!-- Main Realistic Indian Tiffin Food Image -->
          <img src="{{ asset('assets/images/tiffin_hero_meal.png') }}" 
               alt="Authentic Homemade Indian Tiffin Meal" 
               class="tw-hero-food-img"
               loading="eager">

        </div><!-- /.tw-hero-food-visual -->
      </div><!-- /.col-lg-7 -->

    </div><!-- /.row -->
  </div><!-- /.container-fluid -->

  <!-- Bottom Hero Wave Transition -->
  <div class="tw-hero-bottom-wave" aria-hidden="true">
    <svg viewBox="0 0 1440 120" fill="none" preserveAspectRatio="none">
      <path d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,48C840,43,960,53,1080,58.7C1200,64,1320,64,1380,64L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,480,120,360,120C240,120,120,120,60,120L0,120Z" fill="#F1F4F9"></path>
    </svg>
  </div>

</section>

<!-- Popular Tiffin Options -->
<section class="tw-section-bg tw-section-padding">
  <div class="tw-container">
    <div class="d-flex align-items-end justify-content-between mb-5">
      <h2 class="tw-heading-underline mb-0">Popular Tiffin Options</h2>
      <a href="{{ route('menu.index') }}" class="fw-semibold text-success d-inline-flex align-items-center gap-1">
        View All Menu <i class="bi bi-arrow-right"></i>
      </a>
    </div>
    <div class="row g-4">
      <!-- Card items render from meal component -->
    </div>
  </div>
</section>
@endsection
