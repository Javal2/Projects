@extends('layouts.app')

@section('title', ($blog->title ?? 'The Royal Flavors of Jaipur') . ' — TiffinWorld Blog')

@section('content')
<!-- Article Hero -->
<section class="tw-blog-detail-hero">
  <img src="{{ asset($blog->image ?? 'assets/images/blog-placeholder.jpg') }}" 
       alt="{{ $blog->title ?? 'The Royal Flavors of Jaipur' }}" class="tw-detail-hero-img">
  
  <div class="tw-detail-hero-overlay">
    <div class="tw-container">
      <span class="tw-detail-badge">{{ strtoupper($blog->category ?? 'REGIONAL CLASSICS') }}</span>
      <h1 class="tw-detail-h1">
        {{ $blog->title ?? 'The Royal Flavors of Jaipur: A Journey through Veg Jaipuri' }}
      </h1>
      <div class="tw-detail-meta-text d-flex align-items-center gap-3">
        <span><i class="bi bi-calendar3 text-warning me-1"></i> {{ $blog->published_at ? $blog->published_at->format('F d, Y') : 'OCTOBER 24, 2024' }}</span>
        <span>•</span>
        <span><i class="bi bi-person me-1"></i> By {{ $blog->author ?? 'Chef Aarav Mehta' }}</span>
      </div>
    </div>
  </div>
</section>

<!-- Content & Sidebar -->
<section class="tw-section-padding bg-white">
  <div class="tw-container">
    <div class="row g-4">
      <!-- Left Sticky Sidebar -->
      <div class="col-lg-3">
        <div class="tw-detail-sidebar">
          <div class="tw-toc-card">
            <h4 class="tw-toc-title">On This Page</h4>
            <ul class="tw-toc-list">
              <li><a href="#origin" class="tw-toc-link active">01. The Origin Story</a></li>
              <li><a href="#spices" class="tw-toc-link">02. Essential Spices</a></li>
              <li><a href="#technique" class="tw-toc-link">03. The Secret Technique</a></li>
              <li><a href="#pairing" class="tw-toc-link">04. The Perfect Pairing</a></li>
              <li><a href="#savor" class="tw-toc-link">05. Savor it Tonight</a></li>
            </ul>
          </div>

          <div class="tw-quote-sidebar-card">
            <p class="tw-sidebar-quote-text">
              “{{ $blog->sidebar_quote ?? 'The taste of Rajasthan is the taste of resilience.' }}”
            </p>
            <div class="tw-sidebar-quote-author">— {{ $blog->sidebar_author ?? 'CHEF ARUN RATHORE' }}</div>
          </div>
        </div>
      </div>

      <!-- Right Main Article -->
      <div class="col-lg-9">
        <div class="tw-article-card">
          <div class="tw-article-body">
            @if(isset($blog->content))
              {!! $blog->content !!}
            @else
              <p id="origin" class="lead mb-4" style="font-size: 1.15rem; color: #2D3748; line-height: 1.8;">
                Jaipur, the Pink City of India, is not just known for its majestic palaces and vibrant culture, but also for its rich culinary heritage. Among its many culinary treasures, <strong>Veg Jaipuri</strong> stands out as a dish that perfectly encapsulates the regal essence of Rajasthani cuisine.
              </p>
              
              <p class="mb-4">
                Rooted in the royal kitchens of Rajputana rulers, Veg Jaipuri is a rich, aromatic, and colorful curry that combines seasonal garden vegetables with a velvety cashew and tomato gravy. What makes this dish truly extraordinary is the careful layering of roasted spices and the crunch of roasted papad woven into the finished curry.
              </p>

              <!-- Embedded Featured Dish Card -->
              <div class="tw-embedded-dish-card">
                <div class="row g-0 align-items-center">
                  <div class="col-md-5">
                    <img src="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=800&auto=format&fit=crop" 
                         alt="Veg Jaipuri Royale" class="tw-embedded-dish-img">
                  </div>
                  <div class="col-md-7 p-4">
                    <span class="text-orange font-heading fw-semibold small text-uppercase letter-spacing-1 d-block mb-1">SIGNATURE SELECTION</span>
                    <h3 class="h4 font-heading fw-bold text-success mb-2">Veg Jaipuri Royale</h3>
                    <p class="font-body small text-muted mb-3">Fresh mixed vegetables cooked in a royal Rajasthani cashew gravy, topped with crispy papad shards.</p>
                    <div class="d-flex align-items-center justify-content-between">
                      <span class="fs-4 font-heading fw-bold text-success">₹180.00</span>
                      <button class="btn-tw-green tw-inquiry-btn px-4 py-2" data-meal="Veg Jaipuri Royale">Inquiry Now</button>
                    </div>
                  </div>
                </div>
              </div>

              <h3 id="spices" class="h3 font-heading fw-bold text-success mt-4 mb-3">The Architecture of Spice</h3>
              <p class="mb-4">
                In traditional Rajasthani cooking, spices serve dual purposes: enhancing flavor and preserving food in the desert climate. The foundation of Veg Jaipuri relies on a freshly ground blend of dry red Mathania chilies, coriander seeds, cumin, and green cardamom simmered slowly in pure ghee.
              </p>

              <div class="tw-article-quote">
                “Culinary art in Jaipur is about finding balance between the arid landscape and the vibrant palette of its people.”
              </div>

              <p id="technique" class="mb-4">
                The secret technique lies in flame-roasting the spices before grinding them, releasing volatile oils that impart a signature smoky finish to the curry.
              </p>
            @endif
          </div>
        </div>

        <!-- Related Dishes -->
        <div class="mt-5">
          <div class="d-flex align-items-end justify-content-between mb-4">
            <div>
              <span class="text-orange font-heading fw-semibold small text-uppercase letter-spacing-1 d-block mb-1">CURATED PAIRINGS</span>
              <h2 class="h2 font-heading fw-bold text-success mb-0">Explore More Dishes</h2>
            </div>
            <a href="{{ route('menu.index') }}" class="text-orange font-heading fw-semibold text-decoration-none fs-6">View Full Menu ↗</a>
          </div>

          <div class="row g-3">
            @forelse($related_meals ?? [] as $meal)
              <div class="col-xl-3 col-md-6">
                <div class="bg-white p-3 rounded-3 border border-light-blue h-100 d-flex flex-column">
                  <img src="{{ asset($meal->image) }}" alt="{{ $meal->name }}" class="w-100 rounded-2 mb-3" style="height: 140px; object-fit: cover;">
                  <h4 class="h6 font-heading fw-bold text-success mb-1">{{ $meal->name }}</h4>
                  <p class="font-body small text-muted mb-3" style="font-size: 0.8rem;">{{ Str::limit($meal->description, 40) }}</p>
                  <a href="{{ route('menu.show', $meal->id) }}" class="btn-tw-outline-green btn-sm w-100 text-center mt-auto">View Details</a>
                </div>
              </div>
            @empty
              <div class="col-xl-3 col-md-6">
                <div class="bg-white p-3 rounded-3 border border-light-blue h-100 d-flex flex-column">
                  <img src="https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=500&auto=format&fit=crop" class="w-100 rounded-2 mb-3" style="height: 140px; object-fit: cover;" alt="Paneer Masala">
                  <h4 class="h6 font-heading fw-bold text-success mb-1">Paneer Butter Masala</h4>
                  <p class="font-body small text-muted mb-3" style="font-size: 0.8rem;">Cottage cheese in rich tomato gravy.</p>
                  <a href="#" class="btn-tw-outline-green btn-sm w-100 text-center mt-auto">View Details</a>
                </div>
              </div>
              <div class="col-xl-3 col-md-6">
                <div class="bg-white p-3 rounded-3 border border-light-blue h-100 d-flex flex-column">
                  <img src="https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=500&auto=format&fit=crop" class="w-100 rounded-2 mb-3" style="height: 140px; object-fit: cover;" alt="Garlic Kulcha">
                  <h4 class="h6 font-heading fw-bold text-success mb-1">Garlic Kulcha</h4>
                  <p class="font-body small text-muted mb-3" style="font-size: 0.8rem;">Oven-baked flatbread with garlic butter.</p>
                  <a href="#" class="btn-tw-outline-green btn-sm w-100 text-center mt-auto">View Details</a>
                </div>
              </div>
              <div class="col-xl-3 col-md-6">
                <div class="bg-white p-3 rounded-3 border border-light-blue h-100 d-flex flex-column">
                  <img src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=500&auto=format&fit=crop" class="w-100 rounded-2 mb-3" style="height: 140px; object-fit: cover;" alt="Panchmel Dal">
                  <h4 class="h6 font-heading fw-bold text-success mb-1">Panchmel Dal</h4>
                  <p class="font-body small text-muted mb-3" style="font-size: 0.8rem;">Traditional 5-lentil Rajasthani dal.</p>
                  <a href="#" class="btn-tw-outline-green btn-sm w-100 text-center mt-auto">View Details</a>
                </div>
              </div>
              <div class="col-xl-3 col-md-6">
                <div class="bg-white p-3 rounded-3 border border-light-blue h-100 d-flex flex-column">
                  <img src="https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=500&auto=format&fit=crop" class="w-100 rounded-2 mb-3" style="height: 140px; object-fit: cover;" alt="Zaffrani Pulao">
                  <h4 class="h6 font-heading fw-bold text-success mb-1">Zaffrani Pulao</h4>
                  <p class="font-body small text-muted mb-3" style="font-size: 0.8rem;">Fragrant saffron basmati rice with nuts.</p>
                  <a href="#" class="btn-tw-outline-green btn-sm w-100 text-center mt-auto">View Details</a>
                </div>
              </div>
            @endforelse
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
@endsection
