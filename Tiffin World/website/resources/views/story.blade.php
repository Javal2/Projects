@extends('layouts.app')

@section('title', 'Our Story — TiffinWorld')

@section('content')
<!-- Hero Section -->
<section class="tw-story-hero-section">
  <div class="tw-container">
    <div class="row align-items-center">
      <div class="col-lg-6">
        <span class="tw-established-badge">ESTABLISHED 2018</span>
        
        <h1 class="tw-story-h1">
          <span class="text-green d-block">Nourishing the</span>
          <span class="text-orange d-block">Modern Soul</span>
          <span class="text-green d-block">Through</span>
          <span class="text-green d-block">Tradition.</span>
        </h1>

        <p class="tw-story-lead">
          What began as a small kitchen project has blossomed into a movement. TiffinWorld was founded on the belief that home-cooked, nutritious meals shouldn't be a luxury of the few, but a daily right for the many.
        </p>

        <div>
          <a href="{{ route('menu.index') }}" class="btn-start-journey">Start Journey</a>
        </div>
      </div>

      <div class="col-lg-6">
        <div class="tw-story-hero-img-wrap">
          <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1000&auto=format&fit=crop" 
               alt="Authentic Indian Home Cooking" class="tw-story-hero-img">
          
          <div class="tw-chef-stat-card">
            <div class="stat-number">120+</div>
            <div class="stat-label">CERTIFIED HOME CHEFS</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Promise Section -->
<section class="tw-promise-section">
  <div class="tw-container">
    <div class="tw-promise-card">
      <div class="row g-0 align-items-stretch">
        <div class="col-lg-6">
          <div class="tw-promise-content">
            <div class="tw-leaf-circle">
              <i class="bi bi-tree"></i>
            </div>
            <h2 class="tw-promise-title">
              The Fresh & Natural<br>Promise
            </h2>
            <p class="tw-promise-text">
              We don't believe in preservatives, frozen ingredients, or shortcuts. Every TiffinWorld meal is prepared using locally sourced, organic produce and cold-pressed oils. Our harvest is curated daily to ensure your body gets exactly what it needs to thrive.
            </p>
            <div class="d-flex flex-column gap-2">
              <div class="tw-promise-bullet">
                <i class="bi bi-check-circle-fill text-success"></i>
                <span>Zero Artificial Additives</span>
              </div>
              <div class="tw-promise-bullet">
                <i class="bi bi-check-circle-fill text-success"></i>
                <span>Daily Sourced Farm Produce</span>
              </div>
              <div class="tw-promise-bullet">
                <i class="bi bi-check-circle-fill text-success"></i>
                <span>Traditional slow-cooking methods</span>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-6">
          <img src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=1000&auto=format&fit=crop" 
               alt="Fresh Meal Prep Cooking" class="tw-promise-img">
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Values Mosaic Section -->
<section class="tw-values-section">
  <div class="tw-container">
    <div class="text-center mb-5">
      <h2 class="tw-values-h2">Values that Drive Us</h2>
      <p class="tw-values-sub">
        Integrity is the secret ingredient in everything we serve. These are the pillars of TiffinWorld.
      </p>
    </div>

    <div class="row g-4">
      <div class="col-lg-8">
        <div class="tw-val-card-community">
          <div class="fs-2 mb-3"><i class="bi bi-people-fill"></i></div>
          <h3 class="h3 font-heading fw-bold mb-3">Community Empowerment</h3>
          <p class="font-body fs-6 mb-0 opacity-90" style="line-height:1.65;">
            We provide a platform for hundreds of local artisans and home chefs to turn their passion into a sustainable livelihood, preserving regional culinary heritage.
          </p>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="tw-val-card-sustainability">
          <div class="fs-2 mb-3"><i class="bi bi-recycle"></i></div>
          <h3 class="h4 font-heading fw-bold mb-3">Sustainability</h3>
          <p class="font-body small mb-0" style="line-height:1.6;">
            From biodegradable packaging to optimized delivery routes, we are committed to leaving the smallest footprint possible on our earth.
          </p>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="tw-val-card-trust">
          <div class="fs-2 mb-3"><i class="bi bi-shield-check"></i></div>
          <h3 class="h4 font-heading fw-bold mb-3">Absolute Trust</h3>
          <p class="font-body small mb-0" style="line-height:1.6;">
            We maintain rigorous hygiene audits and transparent sourcing. If we wouldn't serve it to our families, we won't serve it to you.
          </p>
        </div>
      </div>

      <div class="col-lg-8">
        <div class="tw-val-card-innovation">
          <div>
            <h3 class="h3 font-heading fw-bold mb-3">Innovation in Tradition</h3>
            <p class="font-body fs-6 mb-0 text-secondary" style="line-height:1.65; max-width: 480px;">
              Using data-driven nutrition science to enhance traditional recipes, ensuring your meals are as balanced as they are flavorful.
            </p>
          </div>
          <div class="tw-val-icon-circle-lg">
            <i class="bi bi-lightbulb"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Final Story CTA -->
<section class="tw-story-cta-section text-center">
  <div class="tw-container">
    <h2 class="tw-story-cta-h2">
      Ready to taste the<br>Curated Harvest?
    </h2>
    <p class="text-secondary max-w-600 mx-auto mb-4" style="max-width: 620px;">
      Join thousands of others who have reclaimed their health and their time through authentic home-cooked meals.
    </p>
    <div class="d-flex align-items-center justify-content-center gap-3 flex-wrap">
      <a href="{{ route('menu.index') }}" class="btn-tw-green px-4 py-3">Start Your Tiffin Journey</a>
      <a href="{{ route('menu.index') }}" class="btn-tw-outline-green px-4 py-3">Browse Menus</a>
    </div>
  </div>
</section>
@endsection
