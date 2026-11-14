@props(['meal' => null])

@php
  $mealName = $meal->name ?? 'The Artisan Taco';
  $description = $meal->description ?? "Our Artisan Taco isn't just a meal; it's a curated experience. We source our corn from local heritage farms, hand-pressing every tortilla to order. The filling features slow-braised proteins marinated for 24 hours in a secret blend of twelve spices, finished with garden-fresh microgreens.";
  $reviewsCount = $meal->reviews_count ?? 128;
  $avgRating = number_format($meal->average_rating ?? 4.8, 1);
  
  // Ingredients list (Relationship, Array, or Fallback Reference Data)
  if (isset($meal->ingredients) && is_iterable($meal->ingredients) && count($meal->ingredients) > 0) {
      $ingredientsList = $meal->ingredients;
  } elseif (isset($meal->ingredients) && is_string($meal->ingredients) && !empty($meal->ingredients)) {
      $ingredientsList = explode(',', $meal->ingredients);
  } else {
      $ingredientsList = [
          'Pasture-raised chicken breast',
          'Organic tri-color quinoa',
          'Wild-harvested kale',
          'Artisan lemon zest',
          'Heirloom cherry tomatoes',
          'Maldon sea salt',
          'Napa Valley extra virgin olive oil',
          'Fresh wild rosemary',
          'Organic garlic bulbs',
          'Cracked peppercorns'
      ];
  }

  $deliveryTime = $meal->delivery_time ?? '30–40 mins';
  $qualityGuarantee = '100% Fresh';
  $serviceArea = $meal->service_area ?? '5 km Radius';
@endphp

<div class="product-details-panel">
  <!-- Tab Navigation -->
  <ul class="nav tw-detail-nav-tabs" id="productDetailsTab" role="tablist">
    <li class="nav-item" role="presentation">
      <button class="nav-link active" id="desc-tab" data-bs-toggle="tab" data-bs-target="#desc-tab-pane" type="button" role="tab" aria-controls="desc-tab-pane" aria-selected="true">
        Description
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" id="ingredients-tab" data-bs-toggle="tab" data-bs-target="#ingredients-tab-pane" type="button" role="tab" aria-controls="ingredients-tab-pane" aria-selected="false">
        Ingredients
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" id="delivery-tab" data-bs-toggle="tab" data-bs-target="#delivery-tab-pane" type="button" role="tab" aria-controls="delivery-tab-pane" aria-selected="false">
        Delivery Info
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" id="reviews-tab" data-bs-toggle="tab" data-bs-target="#reviews-tab-pane" type="button" role="tab" aria-controls="reviews-tab-pane" aria-selected="false">
        Reviews ({{ $reviewsCount }})
      </button>
    </li>
  </ul>

  <!-- Tab Content Panels -->
  <div class="tab-content tw-details-tab-content" id="productDetailsTabContent">
    
    <!-- 1. Description Tab -->
    <div class="tab-pane fade show active" id="desc-tab-pane" role="tabpanel" aria-labelledby="desc-tab" tabindex="0">
      <h2 class="tw-tab-heading">About This Meal</h2>
      <p class="tw-description-body">
        {{ $description }}
      </p>

      <div class="row g-2">
        <div class="col-md-6">
          <div class="tw-benefit-item">
            <i class="bi bi-check-circle-fill"></i>
            <span>Freshly prepared home-style recipe</span>
          </div>
        </div>
        <div class="col-md-6">
          <div class="tw-benefit-item">
            <i class="bi bi-check-circle-fill"></i>
            <span>No unnecessary preservatives</span>
          </div>
        </div>
        <div class="col-md-6">
          <div class="tw-benefit-item">
            <i class="bi bi-check-circle-fill"></i>
            <span>Sourced from verified local kitchens</span>
          </div>
        </div>
        <div class="col-md-6">
          <div class="tw-benefit-item">
            <i class="bi bi-check-circle-fill"></i>
            <span>Strict hygienic preparation standards</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 2. Ingredients Tab (Reference 01) -->
    <div class="tab-pane fade" id="ingredients-tab-pane" role="tabpanel" aria-labelledby="ingredients-tab" tabindex="0">
      <h2 class="tw-ingredients-heading">Full Ingredient List</h2>
      <div class="tw-ingredients-divider"></div>

      @if(count($ingredientsList) > 0)
        <div class="tw-ingredients-wrapper">
          @foreach($ingredientsList as $ingredient)
            <div class="tw-ingredient-chip">
              {{ is_object($ingredient) ? ($ingredient->name ?? $ingredient) : trim($ingredient) }}
            </div>
          @endforeach
        </div>
      @else
        <p class="tw-no-ingredients-msg">Ingredient details are not available for this meal yet.</p>
      @endif
    </div>

    <!-- 3. Delivery Info Tab (Reference 02) -->
    <div class="tab-pane fade" id="delivery-tab-pane" role="tabpanel" aria-labelledby="delivery-tab" tabindex="0">
      <h2 class="tw-delivery-heading">Delivery Info.</h2>
      
      <p class="tw-delivery-desc">
        Delivered hot and fresh within your selected window. We offer flexible delivery options to suit your schedule.
      </p>

      <div class="row tw-delivery-features-row g-4">
        <div class="col-lg-4 col-md-6">
          <div class="tw-delivery-feature-item">
            <span class="tw-delivery-check-icon"><i class="bi bi-check-lg"></i></span>
            <div>
              <span class="tw-delivery-feature-label">Delivery Time</span>
              <span class="tw-delivery-feature-val">{{ $deliveryTime }}</span>
            </div>
          </div>
        </div>

        <div class="col-lg-4 col-md-6">
          <div class="tw-delivery-feature-item">
            <span class="tw-delivery-check-icon"><i class="bi bi-check-lg"></i></span>
            <div>
              <span class="tw-delivery-feature-label">Quality Guarantee</span>
              <span class="tw-delivery-feature-val">{{ $qualityGuarantee }}</span>
            </div>
          </div>
        </div>

        <div class="col-lg-4 col-md-6">
          <div class="tw-delivery-feature-item">
            <span class="tw-delivery-check-icon"><i class="bi bi-check-lg"></i></span>
            <div>
              <span class="tw-delivery-feature-label">Service Area</span>
              <span class="tw-delivery-feature-val">{{ $serviceArea }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 4. Reviews Tab (References 03 & 04) -->
    <div class="tab-pane fade" id="reviews-tab-pane" role="tabpanel" aria-labelledby="reviews-tab" tabindex="0">
      <div class="row g-4 g-lg-5 align-items-start">
        
        <!-- Left: Customer Review Summary Card -->
        <div class="col-lg-5">
          <div class="tw-review-summary-card">
            <span class="tw-summary-label">CUSTOMER REVIEWS</span>
            <div class="tw-summary-score">{{ $avgRating }}</div>
            <div class="tw-summary-stars">
              @for($i = 1; $i <= 5; $i++)
                @if($i <= floor($avgRating))
                  <i class="bi bi-star-fill"></i>
                @elseif($i - $avgRating < 1)
                  <i class="bi bi-star-half"></i>
                @else
                  <i class="bi bi-star"></i>
                @endif
              @endfor
            </div>
            <div class="tw-summary-count">{{ $reviewsCount }} reviews</div>
          </div>

          {{-- Logged-Out Customer Login CTA (Reference 04) --}}
          @if(!auth()->guard('customer')->check() && !auth()->check())
            <div class="tw-logged-out-review-cta">
              <h3 class="tw-login-prompt-title">LOGIN TO LEAVE REVIEW</h3>
              <a href="{{ route('customer.login') }}" class="btn-customer-login-cta">Customer Login</a>
            </div>
          @endif
        </div>

        <!-- Right: Review Intro & Overall Quality -->
        <div class="col-lg-7">
          <h2 class="tw-review-intro-title">Leave a Review</h2>
          <p class="tw-review-intro-sub">
            Share your culinary experience with our community. Your feedback helps us maintain the editorial standard.
          </p>

          <span class="tw-quality-label">OVERALL QUALITY</span>
          
          <div class="tw-star-rating-widget" data-rating="5">
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <i class="bi bi-star-fill"></i>
            <input type="hidden" name="rating" id="reviewRatingInput" value="5">
          </div>
        </div>

      </div>

      {{-- Logged-in Customer Comment Form (Reference 03) --}}
      @if(auth()->guard('customer')->check() || auth()->check())
        <div class="tw-comments-wrapper">
          <form action="{{ route('reviews.store') }}" method="POST">
            @csrf
            <input type="hidden" name="product_id" value="{{ $meal->id ?? '' }}">
            <input type="hidden" name="rating" value="5">

            <label for="reviewComments" class="tw-comments-label">COMMENTS</label>
            <textarea id="reviewComments" name="comments" class="tw-review-textarea @error('comments') is-invalid @enderror" placeholder="Describe the flavors, texture, and your overall thoughts..." required>{{ old('comments') }}</textarea>
            
            @error('comments')
              <div class="invalid-feedback d-block mt-2">{{ $message }}</div>
            @enderror

            <div class="tw-submit-review-wrap">
              <button type="submit" class="btn-submit-review">
                Submit Review
              </button>
            </div>
          </form>
        </div>
      @endif

      <!-- Existing Customer Reviews List (If available) -->
      @if(isset($meal->reviews) && count($meal->reviews) > 0)
        <div class="tw-reviews-list">
          @foreach($meal->reviews as $rev)
            <div class="tw-review-item">
              <div class="d-flex align-items-center justify-content-between">
                <span class="tw-review-author">{{ $rev->user->name ?? $rev->customer_name ?? 'Customer' }}</span>
                <span class="tw-review-date">{{ $rev->created_at ? $rev->created_at->format('M d, Y') : 'Recent' }}</span>
              </div>
              <div class="text-warning small my-1">
                @for($s=1; $s<=5; $s++)
                  <i class="bi bi-star{{ $s <= ($rev->rating ?? 5) ? '-fill' : '' }}"></i>
                @endfor
              </div>
              <p class="tw-review-text">{{ $rev->comment ?? $rev->content }}</p>
            </div>
          @endforeach
        </div>
      @endif

    </div>

  </div>
</div>
