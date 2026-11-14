@extends('layouts.app')

@section('title', 'The Gastronome\'s Collection — TiffinWorld Blog')

@section('content')
<!-- Editorial Blog Hero -->
<section class="tw-blog-hero-section">
  <div class="tw-container">
    <span class="tw-archive-eyebrow">THE CURATED ARCHIVE</span>
    
    <h1 class="tw-blog-h1">
      The<br>Gastronome's<br>Collection
    </h1>

    <p class="tw-blog-lead">
      A meticulous gathering of culinary wisdom, cultural narratives, and technical mastery. Designed for those who treat the kitchen as a studio and the plate as a canvas.
    </p>
  </div>
</section>

<!-- Featured Editorial Asymmetrical Grid -->
<section class="bg-white pb-5">
  <div class="tw-container">
    @if(isset($featured_blogs) && count($featured_blogs) >= 2)
      <div class="row g-4 mb-5">
        <!-- Main Featured Left -->
        <div class="col-lg-8">
          <article class="h-100">
            <a href="{{ route('blog.show', $featured_blogs[0]->id) }}">
              <img src="{{ asset($featured_blogs[0]->image) }}" alt="{{ $featured_blogs[0]->title }}" class="tw-blog-card-img" style="height: 380px;">
            </a>
            <div class="d-flex align-items-center gap-2 mb-2">
              <span class="tw-cat-pill-sm">{{ strtoupper($featured_blogs[0]->category ?? 'REGIONAL CLASSICS') }}</span>
              <span class="tw-meta-date">• {{ $featured_blogs[0]->published_at ? $featured_blogs[0]->published_at->diffForHumans() : '12 months ago' }}</span>
            </div>
            <a href="{{ route('blog.show', $featured_blogs[0]->id) }}" class="tw-featured-title">
              {{ $featured_blogs[0]->title }}
            </a>
            <p class="tw-blog-excerpt mb-0">
              {{ $featured_blogs[0]->excerpt }}
            </p>
          </article>
        </div>

        <!-- Secondary Featured Right -->
        <div class="col-lg-4">
          <article class="h-100">
            <a href="{{ route('blog.show', $featured_blogs[1]->id) }}">
              <img src="{{ asset($featured_blogs[1]->image) }}" alt="{{ $featured_blogs[1]->title }}" class="tw-blog-card-img" style="height: 380px;">
            </a>
            <div class="d-flex align-items-center gap-2 mb-2">
              <span class="tw-cat-pill-sm">{{ strtoupper($featured_blogs[1]->category ?? 'TECHNIQUES') }}</span>
              <span class="tw-meta-date">• {{ $featured_blogs[1]->published_at ? $featured_blogs[1]->published_at->diffForHumans() : '12 months ago' }}</span>
            </div>
            <a href="{{ route('blog.show', $featured_blogs[1]->id) }}" class="tw-featured-title" style="font-size: 1.6rem;">
              {{ $featured_blogs[1]->title }}
            </a>
            <p class="tw-blog-excerpt mb-0">
              {{ $featured_blogs[1]->excerpt }}
            </p>
          </article>
        </div>
      </div>
    @else
      <!-- Fallback Demo Featured Grid -->
      <div class="row g-4 mb-5">
        <div class="col-lg-8">
          <article class="h-100">
            <a href="#">
              <img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?q=80&w=1200&auto=format&fit=crop" class="tw-blog-card-img" style="height: 380px;" alt="Saffron Route">
            </a>
            <div class="d-flex align-items-center gap-2 mb-2">
              <span class="tw-cat-pill-sm">REGIONAL CLASSICS</span>
              <span class="tw-meta-date">• 12 months ago</span>
            </div>
            <a href="#" class="tw-featured-title">
              The Saffron Route: A Journey Through Ancient Spices
            </a>
            <p class="tw-blog-excerpt mb-0">
              Trace the historical trade paths of Kashmir's red gold, examining how slow-infused saffron crocus threads transform everyday rice and royal broths into aromatic masterworks.
            </p>
          </article>
        </div>
        <div class="col-lg-4">
          <article class="h-100">
            <a href="#">
              <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=600&auto=format&fit=crop" class="tw-blog-card-img" style="height: 380px;" alt="Carbon Steel Blade">
            </a>
            <div class="d-flex align-items-center gap-2 mb-2">
              <span class="tw-cat-pill-sm">TECHNIQUES</span>
              <span class="tw-meta-date">• 12 months ago</span>
            </div>
            <a href="#" class="tw-featured-title" style="font-size: 1.6rem;">
              Mastering the Carbon Steel Blade
            </a>
            <p class="tw-blog-excerpt mb-0">
              Understanding edge geometry, patina development, and daily maintenance techniques for artisanal Japanese and Indian chef knives.
            </p>
          </article>
        </div>
      </div>
    @endif

    <!-- Secondary Article Grid -->
    <div class="row g-4">
      @forelse($blogs ?? [] as $blog)
        <div class="col-lg-4 col-md-6">
          <article>
            <a href="{{ route('blog.show', $blog->id) }}">
              <img src="{{ asset($blog->image) }}" alt="{{ $blog->title }}" class="tw-blog-card-img" style="height: 240px;">
            </a>
            <div class="d-flex align-items-center gap-2 mb-2">
              <span class="tw-cat-pill-sm">{{ strtoupper($blog->category ?? 'STORIES') }}</span>
              <span class="tw-meta-date">• {{ $blog->published_at ? $blog->published_at->diffForHumans() : '12 months ago' }}</span>
            </div>
            <a href="{{ route('blog.show', $blog->id) }}" class="tw-blog-card-title">
              {{ $blog->title }}
            </a>
            <p class="tw-blog-excerpt">
              {{ $blog->excerpt }}
            </p>
          </article>
        </div>
      @empty
        <!-- Fallback Demo Cards -->
        <div class="col-lg-4 col-md-6">
          <article>
            <a href="#">
              <img src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop" class="tw-blog-card-img" style="height: 240px;" alt="Vessels of Memory">
            </a>
            <div class="d-flex align-items-center gap-2 mb-2">
              <span class="tw-cat-pill-sm">STORIES</span>
              <span class="tw-meta-date">• 12 months ago</span>
            </div>
            <a href="#" class="tw-blog-card-title">Vessels of Memory: The Clay Pot Revival</a>
            <p class="tw-blog-excerpt">Why modern kitchens are returning to unglazed earthenware to lock in moisture and natural minerals.</p>
          </article>
        </div>
        <div class="col-lg-4 col-md-6">
          <article>
            <a href="#">
              <img src="https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=800&auto=format&fit=crop" class="tw-blog-card-img" style="height: 240px;" alt="Marrakech">
            </a>
            <div class="d-flex align-items-center gap-2 mb-2">
              <span class="tw-cat-pill-sm">TRAVEL</span>
              <span class="tw-meta-date">• 12 months ago</span>
            </div>
            <a href="#" class="tw-blog-card-title">The Fragrant Labyrinths of Marrakech</a>
            <p class="tw-blog-excerpt">An immersive exploration into the spice markets of Morocco, studying Ras el Hanout blends.</p>
          </article>
        </div>
        <div class="col-lg-4 col-md-6">
          <article>
            <a href="#">
              <img src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=800&auto=format&fit=crop" class="tw-blog-card-img" style="height: 240px;" alt="Equinox">
            </a>
            <div class="d-flex align-items-center gap-2 mb-2">
              <span class="tw-cat-pill-sm">SEASONAL</span>
              <span class="tw-meta-date">• 12 months ago</span>
            </div>
            <a href="#" class="tw-blog-card-title">Equinox Flavors: Root, Seed, and Soil</a>
            <p class="tw-blog-excerpt">Embracing the autumn harvest with heirloom root vegetables and toasted seeds.</p>
          </article>
        </div>
      @endforelse
    </div>

    <!-- Centered Blog Pagination -->
    <div class="tw-blog-pagination">
      <a href="#" class="tw-blog-page-btn"><i class="bi bi-chevron-left"></i></a>
      <a href="#" class="tw-blog-page-btn">1</a>
      <a href="#" class="tw-blog-page-btn">2</a>
      <a href="#" class="tw-blog-page-btn active">3</a>
      <a href="#" class="tw-blog-page-btn">4</a>
      <a href="#" class="tw-blog-page-btn"><i class="bi bi-chevron-right"></i></a>
    </div>
  </div>
</section>
@endsection
