@extends('layouts.app')

@section('title', ($meal->name ?? 'The Artisan Taco') . ' — TiffinWorld')

@section('content')
<!-- Product Hero / Main Information -->
<section class="tw-detail-hero-section">
  <div class="tw-container">
    <div class="row g-4 align-items-start">
      <!-- Left Column: Large Product Image -->
      <div class="col-lg-7">
        <div class="tw-product-img-card">
          <span class="tw-farm-badge">
            <i class="bi bi-tree"></i> FARM-TO-TABLE
          </span>
          <img src="{{ asset($meal->image ?? 'assets/images/meal-placeholder.jpg') }}" 
               alt="{{ $meal->name ?? 'The Artisan Taco' }}" class="tw-main-detail-img">
        </div>
      </div>

      <!-- Right Column: Purchase & Vendor Controls -->
      <div class="col-lg-5">
        <div class="tw-product-eyebrow">
          <i class="bi bi-shop"></i> {{ strtoupper($meal->category->name ?? 'MEXICAN FUSION') }}
        </div>

        <h1 class="tw-product-h1">{{ $meal->name ?? 'The Artisan Taco' }}</h1>

        <div class="tw-detail-rating">
          <div class="stars">
            @for($s=1; $s<=5; $s++)
              <i class="bi bi-star-fill"></i>
            @endfor
          </div>
          <span class="count">({{ $meal->reviews_count ?? 128 }} reviews)</span>
        </div>

        <div class="tw-purchase-card">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <div class="tw-detail-price">
              ₹{{ number_format($meal->price ?? 120, 2) }} <span>/ meal</span>
            </div>
            <span class="tw-best-value-badge">Best Value</span>
          </div>

          <label class="tw-plan-label">CHOOSE YOUR PLAN</label>
          <div class="tw-plan-segmented">
            <div class="tw-plan-opt active">Daily</div>
            <div class="tw-plan-opt">Weekly</div>
            <div class="tw-plan-opt">Monthly</div>
          </div>

          <label class="tw-plan-label">AVAILABLE MEAL OPTIONS</label>
          <div class="tw-option-pills">
            <div class="tw-opt-pill active">Main Course</div>
            <div class="tw-opt-pill">Snacks</div>
            <div class="tw-opt-pill">Dessert</div>
          </div>

          <div class="tw-delivery-box">
            <i class="bi bi-geo-alt"></i>
            <div>
              <div class="label">DELIVERY COVERAGE</div>
              <div class="val">{{ $meal->locations ?? 'Downtown, Westside, Green Valley' }}</div>
            </div>
          </div>

          <button class="btn-product-inquiry tw-inquiry-btn" data-meal="{{ $meal->name ?? 'The Artisan Taco' }}" data-vendor="{{ $meal->vendor->name ?? 'The Green Kitchen' }}" data-image="{{ asset($meal->image ?? 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=400&auto=format&fit=crop') }}" data-location="{{ $meal->locations ?? 'Downtown Conservatory Hub, District 4' }}" data-product-id="{{ $meal->id ?? '' }}" data-vendor-id="{{ $meal->vendor_id ?? '' }}">
            Inquiry Now <i class="bi bi-arrow-right"></i>
          </button>
        </div>

        <a href="{{ route('vendor.show', $meal->vendor_id ?? 1) }}" class="tw-vendor-mini-card">
          <div class="d-flex align-items-center gap-3">
            <img src="{{ asset($meal->vendor->image ?? 'assets/images/vendor-avatar.jpg') }}" 
                 alt="{{ $meal->vendor->name ?? 'Jay\'s Kitchen' }}" class="tw-vendor-avatar-sm">
            <div>
              <div class="tw-vendor-label-sm">Vendor</div>
              <div class="tw-vendor-name-sm">{{ $meal->vendor->name ?? 'Jay\'s Kitchen' }}</div>
            </div>
          </div>
          <i class="bi bi-chevron-right text-success fs-5"></i>
        </a>
      </div>
    </div>

    <!-- Product Details Tabbed Card Component -->
    <x-product-details-tabs :meal="$meal" />


    <!-- Recommendations -->
    <div class="tw-recommend-section">
      <div class="d-flex align-items-end justify-content-between mb-4">
        <div>
          <span class="text-orange font-heading fw-semibold small text-uppercase letter-spacing-1 d-block mb-1">RECOMMENDATIONS</span>
          <h2 class="h2 font-heading fw-bold text-success mb-0">You Might Also Like</h2>
        </div>
        <a href="{{ route('menu.index') }}" class="text-orange font-heading fw-semibold text-decoration-none fs-6">View Full Menu ↗</a>
      </div>

      <div class="row g-4">
        @forelse($recommendations ?? [] as $rec)
          <div class="col-xl-3 col-md-6">
            <div class="tw-recommend-card">
              <img src="{{ asset($rec->image) }}" alt="{{ $rec->name }}" class="tw-rec-img">
              <h4 class="tw-rec-title">{{ $rec->name }}</h4>
              <p class="tw-rec-desc">{{ Str::limit($rec->description, 50) }}</p>
              <div class="d-flex align-items-center justify-content-between mt-auto">
                <span class="tw-rec-price">₹{{ number_format($rec->price, 2) }}</span>
                <a href="{{ route('menu.show', $rec->id) }}" class="btn-rec-view">View</a>
              </div>
            </div>
          </div>
        @empty
          <!-- Fallback Demo Recommendations -->
          <div class="col-xl-3 col-md-6">
            <div class="tw-recommend-card">
              <img src="https://images.unsplash.com/photo-1541544741938-0af808871cc0?q=80&w=600&auto=format&fit=crop" class="tw-rec-img" alt="Cheesy Quesadilla">
              <h4 class="tw-rec-title">Cheesy Quesadilla</h4>
              <p class="tw-rec-desc">Hand-folded with melted artisanal cheeses and salsa.</p>
              <div class="d-flex align-items-center justify-content-between mt-auto">
                <span class="tw-rec-price">₹150.00</span>
                <a href="#" class="btn-rec-view">View</a>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-md-6">
            <div class="tw-recommend-card">
              <img src="https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=600&auto=format&fit=crop" class="tw-rec-img" alt="Classic Burrito">
              <h4 class="tw-rec-title">Classic Burrito</h4>
              <p class="tw-rec-desc">Stuffed with seasoned rice, beans, and fresh guacamole.</p>
              <div class="d-flex align-items-center justify-content-between mt-auto">
                <span class="tw-rec-price">₹180.00</span>
                <a href="#" class="btn-rec-view">View</a>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-md-6">
            <div class="tw-recommend-card">
              <img src="https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=600&auto=format&fit=crop" class="tw-rec-img" alt="Street Corn Bowl">
              <h4 class="tw-rec-title">Street Corn Bowl</h4>
              <p class="tw-rec-desc">Charred corn, cotija cheese, lime chili glaze.</p>
              <div class="d-flex align-items-center justify-content-between mt-auto">
                <span class="tw-rec-price">₹90.00</span>
                <a href="#" class="btn-rec-view">View</a>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-md-6">
            <div class="tw-recommend-card">
              <img src="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=600&auto=format&fit=crop" class="tw-rec-img" alt="Agua Fresca">
              <h4 class="tw-rec-title">Agua Fresca</h4>
              <p class="tw-rec-desc">Refreshing hibiscus and fresh mint fruit water.</p>
              <div class="d-flex align-items-center justify-content-between mt-auto">
                <span class="tw-rec-price">₹60.00</span>
                <a href="#" class="btn-rec-view">View</a>
              </div>
            </div>
          </div>
        @endforelse
      </div>
    </div>
  </div>
</section>
@endsection
