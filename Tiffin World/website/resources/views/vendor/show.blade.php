@extends('layouts.app')

@section('title', ($vendor->name ?? 'Vendor Profile') . ' — TiffinWorld')

@push('styles')
  <link rel="stylesheet" href="{{ asset('assets/css/vendor-profile.css') }}">
@endpush

@section('content')
  <main>
    
    <!-- SECTION 1 — VENDOR HERO COVER -->
    <section class="vp-hero-section">
      <img src="{{ asset($vendor->cover_image ?? 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1600&auto=format&fit=crop') }}" 
           alt="{{ $vendor->name ?? 'Vendor Cover' }}" class="vp-hero-bg">
      <div class="vp-hero-overlay"></div>

      <div class="vp-hero-content">
        <div class="tw-container vp-grid-container">
          <div class="vp-identity-block">
            <div class="vp-logo-frame">
              <img src="{{ asset($vendor->logo ?? $vendor->image ?? 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=300&auto=format&fit=crop') }}" 
                   alt="{{ $vendor->name ?? 'Vendor Logo' }}" class="vp-logo-img">
            </div>

            <div class="vp-identity-info">
              @if(isset($vendor->tier) || isset($vendor->is_premium))
                <div>
                  <span class="vp-badge-tier"><i class="bi bi-shield-check"></i> {{ $vendor->tier ?? 'PREMIUM VENDOR' }}</span>
                </div>
              @else
                <div>
                  <span class="vp-badge-tier"><i class="bi bi-shield-check"></i> VERIFIED KITCHEN</span>
                </div>
              @endif

              <h1 class="vp-vendor-title">{{ $vendor->name ?? 'Unicrop It' }}</h1>
              <div class="vp-rating-row">
                <span class="vp-stars">★★★★★</span>
                <strong>{{ $vendor->rating ?? '4.8' }}</strong>
                <span class="vp-reviews-count">({{ $vendor->reviews_count ?? '120+' }} reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 2 — MAIN TWO-COLUMN LAYOUT -->
    <section class="vp-main-section">
      <div class="tw-container vp-grid-container">
        <div class="row g-4">
          
          <!-- LEFT SIDEBAR -->
          <div class="col-lg-4">
            
            <h2 class="vp-sidebar-title">
              <i class="bi bi-info-circle-fill vp-sidebar-icon"></i>
              About Our Business
            </h2>

            <div class="vp-about-card">
              <p class="vp-about-desc">
                {{ $vendor->description ?? 'At Unicrop It, we believe in the harmony of authentic home flavors, pure organic ingredients, and eco-friendly preparation to nourish your daily life.' }}
              </p>

              <div class="vp-highlights-list">
                @if(isset($vendor->features) && count($vendor->features) > 0)
                  @foreach($vendor->features as $feature)
                    <div class="vp-highlight-item">
                      <div class="vp-highlight-badge"><i class="bi bi-patch-check-fill"></i></div>
                      <span class="vp-highlight-text">{{ $feature->name ?? $feature }}</span>
                    </div>
                  @endforeach
                @else
                  <div class="vp-highlight-item">
                    <div class="vp-highlight-badge"><i class="bi bi-patch-check-fill"></i></div>
                    <span class="vp-highlight-text">100% Organic Ingredients</span>
                  </div>

                  <div class="vp-highlight-item">
                    <div class="vp-highlight-badge"><i class="bi bi-truck"></i></div>
                    <span class="vp-highlight-text">Zero-Emission Delivery</span>
                  </div>

                  <div class="vp-highlight-item">
                    <div class="vp-highlight-badge"><i class="bi bi-shield-check"></i></div>
                    <span class="vp-highlight-text">FSSAI Certified Kitchen</span>
                  </div>
                @endif
              </div>
            </div>

            <!-- Contact Details -->
            <h3 class="vp-section-subtitle">Contact Details</h3>

            <div class="vp-contact-list">
              <div class="vp-contact-item">
                <i class="bi bi-telephone-fill vp-contact-icon"></i>
                <div>
                  <div class="vp-contact-label">Phone</div>
                  <div class="vp-contact-value">
                    <a href="tel:{{ $vendor->phone ?? '+15550123456' }}">{{ $vendor->phone ?? '+1 (555) 012-3456' }}</a>
                  </div>
                </div>
              </div>

              <div class="vp-contact-item">
                <i class="bi bi-envelope-fill vp-contact-icon"></i>
                <div>
                  <div class="vp-contact-label">Email</div>
                  <div class="vp-contact-value">
                    <a href="mailto:{{ $vendor->email ?? 'hello@unicropit.com' }}">{{ $vendor->email ?? 'hello@unicropit.com' }}</a>
                  </div>
                </div>
              </div>

              <div class="vp-contact-item">
                <i class="bi bi-geo-alt-fill vp-contact-icon"></i>
                <div>
                  <div class="vp-contact-label">Address</div>
                  <div class="vp-contact-value">{{ $vendor->address ?? '42 Greenway Ave, Eco District' }}</div>
                </div>
              </div>
            </div>

            <!-- Delivery Locations -->
            <h3 class="vp-section-subtitle">Delivery Locations</h3>

            <div class="vp-locations-wrap">
              @if(isset($vendor->deliveryLocations) && count($vendor->deliveryLocations) > 0)
                @foreach($vendor->deliveryLocations as $loc)
                  <span class="vp-location-chip">{{ $loc->name ?? $loc }}</span>
                @endforeach
              @else
                <span class="vp-location-chip">Downtown</span>
                <span class="vp-location-chip">Green Valley</span>
                <span class="vp-location-chip">Harbor Bay</span>
                <span class="vp-location-chip">The Heights</span>
                <span class="vp-location-chip">Old Town</span>
              @endif
            </div>

          </div>

          <!-- RIGHT CONTENT AREA -->
          <div class="col-lg-8 ps-lg-4">
            
            <!-- Menu Section Header -->
            <div class="vp-menu-header">
              <h2 class="vp-menu-title">Next 2 Weeks Menu</h2>
              @if(Route::has('vendor.menu.pdf'))
                <a href="{{ route('vendor.menu.pdf', $vendor->id ?? 1) }}" class="vp-pdf-link"><i class="bi bi-file-earmark-pdf"></i> Download PDF</a>
              @else
                <a href="#" class="vp-pdf-link"><i class="bi bi-file-earmark-pdf"></i> Download PDF</a>
              @endif
            </div>

            <!-- Menu Table -->
            <div class="vp-table-wrapper">
              <table class="vp-menu-table">
                <thead>
                  <tr>
                    <th scope="col" style="width: 18%;">DATE</th>
                    <th scope="col" style="width: 18%;">DAY</th>
                    <th scope="col" style="width: 34%;">DISH</th>
                    <th scope="col" style="width: 30%;">NOTE</th>
                  </tr>
                </thead>
                <tbody>
                  @if(isset($menuItems) && count($menuItems) > 0)
                    @foreach($menuItems as $item)
                      <tr>
                        <td><span class="vp-date-badge">{{ $item->date ?? '01 Apr 2026' }}</span></td>
                        <td class="vp-day-text">{{ $item->day ?? 'Monday' }}</td>
                        <td class="vp-dish-text">{{ $item->dish ?? $item->name }}</td>
                        <td class="vp-note-text">{{ $item->note ?? $item->description ?? '' }}</td>
                      </tr>
                    @endforeach
                  @else
                    <tr>
                      <td><span class="vp-date-badge">01 Apr 2026</span></td>
                      <td class="vp-day-text">Monday</td>
                      <td class="vp-dish-text">Quinoa Buddha Bowl</td>
                      <td class="vp-note-text">Roasted Squash Risotto</td>
                    </tr>
                    <tr>
                      <td><span class="vp-date-badge">02 Apr 2026</span></td>
                      <td class="vp-day-text">Tuesday</td>
                      <td class="vp-dish-text">Heritage Gujarati Thali</td>
                      <td class="vp-note-text">Kathiyawadi Dal & Soft Phulka</td>
                    </tr>
                    <tr>
                      <td><span class="vp-date-badge">03 Apr 2026</span></td>
                      <td class="vp-day-text">Wednesday</td>
                      <td class="vp-dish-text">Punjabi Dal Makhani Feast</td>
                      <td class="vp-note-text">Laccha Paratha & Paneer Butter</td>
                    </tr>
                    <tr>
                      <td><span class="vp-date-badge">04 Apr 2026</span></td>
                      <td class="vp-day-text">Thursday</td>
                      <td class="vp-dish-text">South Indian Ghee Idli Combo</td>
                      <td class="vp-note-text">Crisp Masala Dosa & Sambar</td>
                    </tr>
                    <tr>
                      <td><span class="vp-date-badge">05 Apr 2026</span></td>
                      <td class="vp-day-text">Friday</td>
                      <td class="vp-dish-text">Maharashtrian Zunka Bhakri</td>
                      <td class="vp-note-text">Spicy Pithla & Solkadhi</td>
                    </tr>
                    <tr>
                      <td><span class="vp-date-badge">06 Apr 2026</span></td>
                      <td class="vp-day-text">Saturday</td>
                      <td class="vp-dish-text">High Protein Sprout Salad</td>
                      <td class="vp-note-text">Olive Oil Grilled Tofu</td>
                    </tr>
                    <tr>
                      <td><span class="vp-date-badge">07 Apr 2026</span></td>
                      <td class="vp-day-text">Sunday</td>
                      <td class="vp-dish-text">Jain Sattvik Thali</td>
                      <td class="vp-note-text">No Onion No Garlic Special</td>
                    </tr>
                  @endif
                </tbody>
              </table>
            </div>

            <!-- Table Controls -->
            <div class="vp-pagination-row">
              <button type="button" class="btn-vp-page"><i class="bi bi-chevron-left"></i> Previous</button>
              <button type="button" class="btn-vp-page">Next <i class="bi bi-chevron-right"></i></button>
            </div>

            <!-- Kitchen Gallery Section -->
            <div class="vp-gallery-header">
              <h2 class="vp-gallery-title">Kitchen Gallery</h2>
              <div class="vp-gallery-line"></div>
            </div>

            <!-- Asymmetric Gallery Mosaic -->
            <div class="vp-gallery-grid">
              
              <!-- Left Large Image -->
              <div class="vp-gallery-col-left">
                <div class="vp-gallery-item-wrapper">
                  <img src="{{ asset($vendor->gallery[0]->image ?? 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop') }}" 
                       alt="Kitchen Preparation" class="vp-gallery-img" loading="lazy">
                </div>
              </div>

              <!-- Right Column (Wide Top + 2 Small Bottom) -->
              <div class="vp-gallery-col-right">
                
                <!-- Wide Top Image -->
                <div class="vp-gallery-item-wrapper" style="height: 180px;">
                  <img src="{{ asset($vendor->gallery[1]->image ?? 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800&auto=format&fit=crop') }}" 
                       alt="Plated Dish" class="vp-gallery-img" loading="lazy">
                </div>

                <!-- Bottom Row (2 Small Images) -->
                <div class="vp-gallery-row-bottom">
                  <div class="vp-gallery-item-wrapper">
                    <img src="{{ asset($vendor->gallery[2]->image ?? 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=500&auto=format&fit=crop') }}" 
                         alt="Fresh Ingredients" class="vp-gallery-img" loading="lazy">
                  </div>
                  <div class="vp-gallery-item-wrapper">
                    <img src="{{ asset($vendor->gallery[3]->image ?? 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=500&auto=format&fit=crop') }}" 
                         alt="Artisanal Cooking" class="vp-gallery-img" loading="lazy">
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>

  </main>
@endsection
