@extends('layouts.app')

@section('title', 'Food Categories — TiffinWorld')

@push('styles')
  <link rel="stylesheet" href="{{ asset('assets/css/categories.css') }}">
@endpush

@section('content')
  <main>
    
    <!-- SECTION 1 — COMPACT INTRO HEADER -->
    <section class="cat-intro-section">
      <div class="tw-container">
        <div class="cat-eyebrow">EXPLORE CUISINES</div>
        <h1 class="cat-intro-title">Browse Meal Categories</h1>
        <p class="cat-intro-desc">
          Find authentic regional thalis, healthy meal plans, snacks and home-cooked favourites from local kitchens.
        </p>
      </div>
    </section>

    <!-- SECTION 2 — TOP CATEGORY NAVIGATION STRIP (FLIPKART-INSPIRED) -->
    <section class="cat-top-strip">
      <div class="tw-container">
        <div class="cat-top-strip-inner">
          
          @if(isset($topCategories) && count($topCategories) > 0)
            @foreach($topCategories as $topCat)
              <a href="{{ route('menu', ['category' => $topCat->slug ?? $topCat->id]) }}" class="cat-top-tile">
                <img src="{{ asset($topCat->image ?? 'assets/images/category-placeholder.jpg') }}" alt="{{ $topCat->name }}" class="cat-top-thumb">
                <span class="cat-top-label">{{ $topCat->name }}</span>
              </a>
            @endforeach
          @else
            <!-- Static Fallback Items -->
            <a href="{{ route('menu', ['category' => 'gujarati']) }}" class="cat-top-tile">
              <img src="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=200&auto=format&fit=crop" alt="Gujarati" class="cat-top-thumb">
              <span class="cat-top-label">Gujarati</span>
            </a>

            <a href="{{ route('menu', ['category' => 'punjabi']) }}" class="cat-top-tile">
              <img src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=200&auto=format&fit=crop" alt="Punjabi" class="cat-top-thumb">
              <span class="cat-top-label">Punjabi</span>
            </a>

            <a href="{{ route('menu', ['category' => 'south-indian']) }}" class="cat-top-tile">
              <img src="https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?q=80&w=200&auto=format&fit=crop" alt="South Indian" class="cat-top-thumb">
              <span class="cat-top-label">South Indian</span>
            </a>

            <a href="{{ route('menu', ['category' => 'maharashtrian']) }}" class="cat-top-tile">
              <img src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=200&auto=format&fit=crop" alt="Maharashtrian" class="cat-top-thumb">
              <span class="cat-top-label">Maharashtrian</span>
            </a>

            <a href="{{ route('menu', ['category' => 'jain']) }}" class="cat-top-tile">
              <img src="https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=200&auto=format&fit=crop" alt="Jain Sattvik" class="cat-top-thumb">
              <span class="cat-top-label">Jain Sattvik</span>
            </a>

            <a href="{{ route('menu', ['category' => 'healthy']) }}" class="cat-top-tile">
              <img src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=200&auto=format&fit=crop" alt="Healthy Bowls" class="cat-top-thumb">
              <span class="cat-top-label">Healthy Bowls</span>
            </a>

            <a href="{{ route('menu', ['category' => 'keto']) }}" class="cat-top-tile">
              <img src="https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=200&auto=format&fit=crop" alt="Diet & Keto" class="cat-top-thumb">
              <span class="cat-top-label">Diet & Keto</span>
            </a>

            <a href="{{ route('menu', ['category' => 'breakfast']) }}" class="cat-top-tile">
              <img src="https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=200&auto=format&fit=crop" alt="Breakfast" class="cat-top-thumb">
              <span class="cat-top-label">Breakfast</span>
            </a>

            <a href="{{ route('menu', ['category' => 'snacks']) }}" class="cat-top-tile">
              <img src="https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=200&auto=format&fit=crop" alt="Snacks" class="cat-top-thumb">
              <span class="cat-top-label">Snacks</span>
            </a>

            <a href="{{ route('menu', ['category' => 'sweets']) }}" class="cat-top-tile">
              <img src="https://images.unsplash.com/photo-1587314168485-3236d6710814?q=80&w=200&auto=format&fit=crop" alt="Sweets" class="cat-top-thumb">
              <span class="cat-top-label">Sweets</span>
            </a>
          @endif

        </div>
      </div>
    </section>

    <!-- SECTION 3 — CATEGORY SEARCH & QUICK FILTER BAR -->
    <section class="cat-search-section">
      <div class="tw-container">
        <div class="cat-search-wrapper">
          <h2 class="cat-search-title">Browse All Categories</h2>

          <div class="cat-search-input-group">
            <i class="bi bi-search cat-search-icon"></i>
            <input type="text" id="catSearchInput" class="cat-search-control" placeholder="Search cuisines, meal types or categories...">
          </div>
        </div>

        <div class="cat-chip-group">
          <button type="button" class="cat-chip active" data-filter="all">All Categories</button>
          <button type="button" class="cat-chip" data-filter="regional">Regional Cuisines</button>
          <button type="button" class="cat-chip" data-filter="healthy">Healthy & Diet</button>
          <button type="button" class="cat-chip" data-filter="jain">Jain Sattvik</button>
          <button type="button" class="cat-chip" data-filter="snacks">Snacks & Combos</button>
        </div>
      </div>
    </section>

    <!-- SECTION 4 — MAIN 4-COLUMN MARKETPLACE GRID -->
    <section class="cat-grid-section">
      <div class="tw-container">
        
        <!-- GROUP 1: REGIONAL CUISINES -->
        <div class="mb-5">
          <div class="cat-group-header">
            <h3 class="cat-group-title">Regional Cuisines</h3>
            <a href="{{ route('menu') }}" class="cat-group-link">Explore All Cuisines <i class="bi bi-arrow-right"></i></a>
          </div>

          <div class="row g-4" id="catGridRegional">
            
            @if(isset($regionalCategories) && count($regionalCategories) > 0)
              @foreach($regionalCategories as $cat)
                <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 cat-card-item" data-category="{{ strtolower($cat->name) }}">
                  <a href="{{ route('menu', ['category' => $cat->slug ?? $cat->id]) }}" class="cat-market-card">
                    <div class="cat-card-img-wrapper">
                      <img src="{{ asset($cat->image ?? 'assets/images/category-placeholder.jpg') }}" alt="{{ $cat->name }}" class="cat-card-img" loading="lazy">
                    </div>
                    <div class="cat-card-body">
                      <div class="cat-card-header">
                        <h4 class="cat-card-name">{{ $cat->name }}</h4>
                        <span class="cat-kitchen-badge">{{ $cat->kitchens_count ?? rand(15,45) }} Kitchens</span>
                      </div>

                      @if(isset($cat->subcategories) && count($cat->subcategories) > 0)
                        <ul class="cat-sub-links">
                          @foreach($cat->subcategories->take(3) as $sub)
                            <li class="cat-sub-item"><i class="bi bi-circle-fill"></i> {{ $sub->name }}</li>
                          @endforeach
                        </ul>
                      @endif

                      <div class="cat-card-footer">
                        <span class="cat-view-link">View Menu <i class="bi bi-chevron-right"></i></span>
                      </div>
                    </div>
                  </a>
                </div>
              @endforeach
            @else
              <!-- Static Fallback Grid -->
              <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 cat-card-item" data-category="regional gujarati">
                <a href="{{ route('menu', ['category' => 'gujarati']) }}" class="cat-market-card">
                  <div class="cat-card-img-wrapper">
                    <img src="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=600&auto=format&fit=crop" alt="Gujarati Thalis" class="cat-card-img" loading="lazy">
                  </div>
                  <div class="cat-card-body">
                    <div class="cat-card-header">
                      <h4 class="cat-card-name">Gujarati Thalis</h4>
                      <span class="cat-kitchen-badge">42 Kitchens</span>
                    </div>

                    <ul class="cat-sub-links">
                      <li class="cat-sub-item"><i class="bi bi-circle-fill"></i> Kathiyawadi Special Thali</li>
                      <li class="cat-sub-item"><i class="bi bi-circle-fill"></i> Soft Phulka Roti Tiffin</li>
                      <li class="cat-sub-item"><i class="bi bi-circle-fill"></i> Gujarati Dal Rice Meal</li>
                    </ul>

                    <div class="cat-card-footer">
                      <span class="cat-view-link">View Menu <i class="bi bi-chevron-right"></i></span>
                    </div>
                  </div>
                </a>
              </div>

              <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 cat-card-item" data-category="regional punjabi">
                <a href="{{ route('menu', ['category' => 'punjabi']) }}" class="cat-market-card">
                  <div class="cat-card-img-wrapper">
                    <img src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=600&auto=format&fit=crop" alt="Punjabi Feast" class="cat-card-img" loading="lazy">
                  </div>
                  <div class="cat-card-body">
                    <div class="cat-card-header">
                      <h4 class="cat-card-name">Punjabi Feasts</h4>
                      <span class="cat-kitchen-badge">38 Kitchens</span>
                    </div>

                    <ul class="cat-sub-links">
                      <li class="cat-sub-item"><i class="bi bi-circle-fill"></i> Dal Makhani & Paratha</li>
                      <li class="cat-sub-item"><i class="bi bi-circle-fill"></i> Paneer Butter Masala</li>
                      <li class="cat-sub-item"><i class="bi bi-circle-fill"></i> Aromatic Jeera Rice</li>
                    </ul>

                    <div class="cat-card-footer">
                      <span class="cat-view-link">View Menu <i class="bi bi-chevron-right"></i></span>
                    </div>
                  </div>
                </a>
              </div>

              <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 cat-card-item" data-category="regional south-indian">
                <a href="{{ route('menu', ['category' => 'south-indian']) }}" class="cat-market-card">
                  <div class="cat-card-img-wrapper">
                    <img src="https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?q=80&w=600&auto=format&fit=crop" alt="South Indian" class="cat-card-img" loading="lazy">
                  </div>
                  <div class="cat-card-body">
                    <div class="cat-card-header">
                      <h4 class="cat-card-name">South Indian</h4>
                      <span class="cat-kitchen-badge">29 Kitchens</span>
                    </div>

                    <ul class="cat-sub-links">
                      <li class="cat-sub-item"><i class="bi bi-circle-fill"></i> Ghee Idli & Sambar</li>
                      <li class="cat-sub-item"><i class="bi bi-circle-fill"></i> Crisp Masala Dosa</li>
                      <li class="cat-sub-item"><i class="bi bi-circle-fill"></i> Coconut Chutney Meal</li>
                    </ul>

                    <div class="cat-card-footer">
                      <span class="cat-view-link">View Menu <i class="bi bi-chevron-right"></i></span>
                    </div>
                  </div>
                </a>
              </div>

              <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 cat-card-item" data-category="regional maharashtrian">
                <a href="{{ route('menu', ['category' => 'maharashtrian']) }}" class="cat-market-card">
                  <div class="cat-card-img-wrapper">
                    <img src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=600&auto=format&fit=crop" alt="Maharashtrian" class="cat-card-img" loading="lazy">
                  </div>
                  <div class="cat-card-body">
                    <div class="cat-card-header">
                      <h4 class="cat-card-name">Maharashtrian</h4>
                      <span class="cat-kitchen-badge">31 Kitchens</span>
                    </div>

                    <ul class="cat-sub-links">
                      <li class="cat-sub-item"><i class="bi bi-circle-fill"></i> Zunka Bhakri Tiffin</li>
                      <li class="cat-sub-item"><i class="bi bi-circle-fill"></i> Spicy Pithla Roti</li>
                      <li class="cat-sub-item"><i class="bi bi-circle-fill"></i> Green Chili Thecha Meal</li>
                    </ul>

                    <div class="cat-card-footer">
                      <span class="cat-view-link">View Menu <i class="bi bi-chevron-right"></i></span>
                    </div>
                  </div>
                </a>
              </div>
            @endif

          </div>
        </div>

        <!-- GROUP 2: DIET & LIFESTYLE -->
        <div>
          <div class="cat-group-header">
            <h3 class="cat-group-title">Diet, Health & Specialities</h3>
            <a href="{{ route('menu') }}" class="cat-group-link">Explore Healthy Meals <i class="bi bi-arrow-right"></i></a>
          </div>

          <div class="row g-4" id="catGridHealthy">
            <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 cat-card-item" data-category="healthy diet">
              <a href="{{ route('menu', ['category' => 'healthy']) }}" class="cat-market-card">
                <div class="cat-card-img-wrapper">
                  <img src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=600&auto=format&fit=crop" alt="Healthy Bowls" class="cat-card-img" loading="lazy">
                </div>
                <div class="cat-card-body">
                  <div class="cat-card-header">
                    <h4 class="cat-card-name">Healthy Bowls</h4>
                    <span class="cat-kitchen-badge">25 Kitchens</span>
                  </div>

                  <ul class="cat-sub-links">
                    <li class="cat-sub-item"><i class="bi bi-circle-fill"></i> High Protein Sprout Bowl</li>
                    <li class="cat-sub-item"><i class="bi bi-circle-fill"></i> Low Carb Keto Thali</li>
                    <li class="cat-sub-item"><i class="bi bi-circle-fill"></i> Olive Oil Grilled Tofu</li>
                  </ul>

                  <div class="cat-card-footer">
                    <span class="cat-view-link">View Menu <i class="bi bi-chevron-right"></i></span>
                  </div>
                </div>
              </a>
            </div>

            <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 cat-card-item" data-category="jain sattvik">
              <a href="{{ route('menu', ['category' => 'jain']) }}" class="cat-market-card">
                <div class="cat-card-img-wrapper">
                  <img src="https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=600&auto=format&fit=crop" alt="Jain Sattvik Meals" class="cat-card-img" loading="lazy">
                </div>
                <div class="cat-card-body">
                  <div class="cat-card-header">
                    <h4 class="cat-card-name">Jain Sattvik</h4>
                    <span class="cat-kitchen-badge">20 Kitchens</span>
                  </div>

                  <ul class="cat-sub-links">
                    <li class="cat-sub-item"><i class="bi bi-circle-fill"></i> No Onion No Garlic Thali</li>
                    <li class="cat-sub-item"><i class="bi bi-circle-fill"></i> Pure Veg Sattvik Meals</li>
                    <li class="cat-sub-item"><i class="bi bi-circle-fill"></i> Hygienic Home Tiffins</li>
                  </ul>

                  <div class="cat-card-footer">
                    <span class="cat-view-link">View Menu <i class="bi bi-chevron-right"></i></span>
                  </div>
                </div>
              </a>
            </div>

            <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 cat-card-item" data-category="snacks office">
              <a href="{{ route('menu', ['category' => 'office']) }}" class="cat-market-card">
                <div class="cat-card-img-wrapper">
                  <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop" alt="Office Lunch Combos" class="cat-card-img" loading="lazy">
                </div>
                <div class="cat-card-body">
                  <div class="cat-card-header">
                    <h4 class="cat-card-name">Office Combos</h4>
                    <span class="cat-kitchen-badge">36 Kitchens</span>
                  </div>

                  <ul class="cat-sub-links">
                    <li class="cat-sub-item"><i class="bi bi-circle-fill"></i> Executive Lunch Tiffin</li>
                    <li class="cat-sub-item"><i class="bi bi-circle-fill"></i> Express Mini Meal Box</li>
                    <li class="cat-sub-item"><i class="bi bi-circle-fill"></i> Corporate Meal Plans</li>
                  </ul>

                  <div class="cat-card-footer">
                    <span class="cat-view-link">View Menu <i class="bi bi-chevron-right"></i></span>
                  </div>
                </div>
              </a>
            </div>

            <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6 cat-card-item" data-category="snacks breakfast">
              <a href="{{ route('menu', ['category' => 'breakfast']) }}" class="cat-market-card">
                <div class="cat-card-img-wrapper">
                  <img src="https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=600&auto=format&fit=crop" alt="Breakfast & Snacks" class="cat-card-img" loading="lazy">
                </div>
                <div class="cat-card-body">
                  <div class="cat-card-header">
                    <h4 class="cat-card-name">Snacks & Tiffins</h4>
                    <span class="cat-kitchen-badge">24 Kitchens</span>
                  </div>

                  <ul class="cat-sub-links">
                    <li class="cat-sub-item"><i class="bi bi-circle-fill"></i> Indori Poha & Upma</li>
                    <li class="cat-sub-item"><i class="bi bi-circle-fill"></i> Stuffed Aloo Parathas</li>
                    <li class="cat-sub-item"><i class="bi bi-circle-fill"></i> Masala Chai Combos</li>
                  </ul>

                  <div class="cat-card-footer">
                    <span class="cat-view-link">View Menu <i class="bi bi-chevron-right"></i></span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- SECTION 5 — POPULAR RIGHT NOW STRIP -->
    <section class="cat-popular-section">
      <div class="tw-container">
        <div class="cat-group-header">
          <h3 class="cat-group-title">Popular Right Now</h3>
          <a href="{{ route('menu') }}" class="cat-group-link">See All Trending <i class="bi bi-arrow-right"></i></a>
        </div>

        <div class="row g-3">
          <div class="col-lg-2 col-md-4 col-6">
            <a href="{{ route('menu', ['category' => 'gujarati']) }}" class="cat-mini-tile">
              <img src="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=150&auto=format&fit=crop" alt="Gujarati" class="cat-mini-thumb">
              <div>
                <h5 class="cat-mini-name">Gujarati</h5>
                <p class="cat-mini-count">42 Kitchens</p>
              </div>
            </a>
          </div>

          <div class="col-lg-2 col-md-4 col-6">
            <a href="{{ route('menu', ['category' => 'punjabi']) }}" class="cat-mini-tile">
              <img src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=150&auto=format&fit=crop" alt="Punjabi" class="cat-mini-thumb">
              <div>
                <h5 class="cat-mini-name">Punjabi</h5>
                <p class="cat-mini-count">38 Kitchens</p>
              </div>
            </a>
          </div>

          <div class="col-lg-2 col-md-4 col-6">
            <a href="{{ route('menu', ['category' => 'south-indian']) }}" class="cat-mini-tile">
              <img src="https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?q=80&w=150&auto=format&fit=crop" alt="South Indian" class="cat-mini-thumb">
              <div>
                <h5 class="cat-mini-name">South Indian</h5>
                <p class="cat-mini-count">29 Kitchens</p>
              </div>
            </a>
          </div>

          <div class="col-lg-2 col-md-4 col-6">
            <a href="{{ route('menu', ['category' => 'healthy']) }}" class="cat-mini-tile">
              <img src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=150&auto=format&fit=crop" alt="Healthy" class="cat-mini-thumb">
              <div>
                <h5 class="cat-mini-name">Keto Bowls</h5>
                <p class="cat-mini-count">25 Kitchens</p>
              </div>
            </a>
          </div>

          <div class="col-lg-2 col-md-4 col-6">
            <a href="{{ route('menu', ['category' => 'jain']) }}" class="cat-mini-tile">
              <img src="https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=150&auto=format&fit=crop" alt="Jain" class="cat-mini-thumb">
              <div>
                <h5 class="cat-mini-name">Jain Thali</h5>
                <p class="cat-mini-count">20 Kitchens</p>
              </div>
            </a>
          </div>

          <div class="col-lg-2 col-md-4 col-6">
            <a href="{{ route('menu', ['category' => 'office']) }}" class="cat-mini-tile">
              <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=150&auto=format&fit=crop" alt="Office Tiffin" class="cat-mini-thumb">
              <div>
                <h5 class="cat-mini-name">Office Tiffin</h5>
                <p class="cat-mini-count">36 Kitchens</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 6 — DISCOVERY SECTION (BROWSE BY NEED) -->
    <section class="cat-discovery-section">
      <div class="tw-container">
        <div class="cat-group-header">
          <h3 class="cat-group-title">Browse by Need</h3>
          <a href="{{ route('menu') }}" class="cat-group-link">Explore All Filters <i class="bi bi-arrow-right"></i></a>
        </div>

        <div class="row g-3">
          <div class="col-lg-2 col-md-4 col-6">
            <a href="{{ route('menu', ['filter' => 'daily']) }}" class="cat-discovery-card">
              <i class="bi bi-calendar-check cat-discovery-icon"></i>
              <h5 class="cat-discovery-title">Daily Tiffin</h5>
              <p class="cat-discovery-subtitle">Monthly plans</p>
            </a>
          </div>

          <div class="col-lg-2 col-md-4 col-6">
            <a href="{{ route('menu', ['filter' => 'office']) }}" class="cat-discovery-card">
              <i class="bi bi-briefcase cat-discovery-icon"></i>
              <h5 class="cat-discovery-title">Office Lunch</h5>
              <p class="cat-discovery-subtitle">Express corporate delivery</p>
            </a>
          </div>

          <div class="col-lg-2 col-md-4 col-6">
            <a href="{{ route('menu', ['filter' => 'family']) }}" class="cat-discovery-card">
              <i class="bi bi-people cat-discovery-icon"></i>
              <h5 class="cat-discovery-title">Family Meals</h5>
              <p class="cat-discovery-subtitle">Larger thali portions</p>
            </a>
          </div>

          <div class="col-lg-2 col-md-4 col-6">
            <a href="{{ route('menu', ['filter' => 'diet']) }}" class="cat-discovery-card">
              <i class="bi bi-heart-pulse cat-discovery-icon"></i>
              <h5 class="cat-discovery-title">Diet Plans</h5>
              <p class="cat-discovery-subtitle">Low carb & protein</p>
            </a>
          </div>

          <div class="col-lg-2 col-md-4 col-6">
            <a href="{{ route('menu', ['filter' => 'budget']) }}" class="cat-discovery-card">
              <i class="bi bi-piggy-bank cat-discovery-icon"></i>
              <h5 class="cat-discovery-title">Budget Meals</h5>
              <p class="cat-discovery-subtitle">Affordable student plans</p>
            </a>
          </div>

          <div class="col-lg-2 col-md-4 col-6">
            <a href="{{ route('menu', ['filter' => 'weekend']) }}" class="cat-discovery-card">
              <i class="bi bi-stars cat-discovery-icon"></i>
              <h5 class="cat-discovery-title">Weekend Special</h5>
              <p class="cat-discovery-subtitle">Artisanal delicacies</p>
            </a>
          </div>
        </div>
      </div>
    </section>

  </main>
@endsection
