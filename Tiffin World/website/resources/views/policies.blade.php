@extends('layouts.app')

@section('title', 'Our Policies — The Standards of Governing Authority — TiffinWorld')

@section('content')
<!-- Hero Section -->
<section class="tw-policies-hero text-center">
  <div class="tw-container">
    <span class="tw-legal-badge">LEGAL FRAMEWORK</span>
    
    <h1 class="tw-policies-h1">
      The Standards of<br>Governing Authority.
    </h1>

    <p class="tw-policies-lead">
      Our commitment to transparency and legal excellence is reflected in the following foundational policies. These documents govern our operational integrity and protect your digital sovereignty.
    </p>
  </div>
</section>

<!-- Policy Cards Grid -->
<section class="bg-white pb-5">
  <div class="tw-container">
    <div class="row g-4">
      @forelse($policies ?? [] as $index => $policy)
        <div class="col-lg-4 col-md-6">
          <div class="tw-policy-card">
            <div class="tw-policy-art">
              <span class="tw-policy-num">{{ sprintf('%02d', $index + 1) }}</span>
              <img src="{{ asset($policy->image ?? 'assets/images/policy-placeholder.jpg') }}" alt="{{ $policy->title }}">
            </div>
            <div class="tw-policy-body">
              <h3 class="tw-policy-title">{{ $policy->title }}</h3>
              <p class="tw-policy-desc">{{ Str::limit($policy->summary ?? $policy->description, 140) }}</p>
              <a href="{{ route('policies.show', $policy->slug ?? $policy->id) }}" class="btn-policy-read">READ MORE</a>
              <div class="tw-policy-meta">
                <span>{{ $policy->updated_date ?? 'OCT 2024' }}</span>
                <span>{{ $policy->version ?? 'V.2.4.0' }}</span>
              </div>
            </div>
          </div>
        </div>
      @empty
        <!-- Fallback Demo Cards -->
        <div class="col-lg-4 col-md-6">
          <div class="tw-policy-card">
            <div class="tw-policy-art">
              <span class="tw-policy-num">01</span>
              <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop" alt="Privacy Policy">
            </div>
            <div class="tw-policy-body">
              <h3 class="tw-policy-title">Privacy Policy</h3>
              <p class="tw-policy-desc">We treat your data as a sacred trust. Our privacy framework is designed to exceed global compliance standards.</p>
              <a href="#" class="btn-policy-read">READ MORE</a>
              <div class="tw-policy-meta">
                <span>OCT 2024</span>
                <span>V.2.4.0</span>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-4 col-md-6">
          <div class="tw-policy-card">
            <div class="tw-policy-art" style="background-color: #EBF3FA;">
              <span class="tw-policy-num">02</span>
              <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop" alt="Shipping Policy">
            </div>
            <div class="tw-policy-body">
              <h3 class="tw-policy-title">Shipping Policy</h3>
              <p class="tw-policy-desc">Precision logistics for pristine freshness. Learn about our thermal-insulated packaging and strict delivery windows.</p>
              <a href="#" class="btn-policy-read">READ MORE</a>
              <div class="tw-policy-meta">
                <span>TIER 1</span>
                <span>GLOBAL</span>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-4 col-md-6">
          <div class="tw-policy-card">
            <div class="tw-policy-art" style="background-color: #FFF4EB;">
              <span class="tw-policy-num">03</span>
              <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop" alt="Refund Policy">
            </div>
            <div class="tw-policy-body">
              <h3 class="tw-policy-title">Refund Policy</h3>
              <p class="tw-policy-desc">Your culinary satisfaction is guaranteed. Explore our hassle-free resolution policy and meal quality pledge.</p>
              <a href="#" class="btn-policy-read">READ MORE</a>
              <div class="tw-policy-meta">
                <span>ACTIVE</span>
                <span>30-DAY</span>
              </div>
            </div>
          </div>
        </div>
      @endforelse
    </div>
  </div>
</section>
@endsection
