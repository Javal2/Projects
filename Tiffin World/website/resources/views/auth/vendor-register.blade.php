@extends('layouts.app')

@section('title', 'Vendor Partner Registration — TiffinWorld')

@push('styles')
  <link rel="stylesheet" href="{{ asset('assets/css/vendor-auth.css') }}">
@endpush

@section('content')
  <main class="vendor-auth-section">
    <div class="tw-container vendor-auth-container">
      <div class="row align-items-center">
        
        <!-- LEFT EDITORIAL SECTION -->
        <div class="col-lg-7 vendor-register-left">
          <div class="vendor-badge-excellence">
            PARTNER WITH EXCELLENCE
          </div>

          <h1 class="vendor-reg-title-green">Your kitchen,</h1>
          <h1 class="vendor-reg-title-orange">our conservatory.</h1>

          <p class="vendor-reg-desc">
            Join an exclusive network of artisanal chefs and premium kitchens delivering curated meal experiences to discerning palettes.
          </p>

          <!-- Benefit Cards Grid -->
          <div class="vendor-benefit-grid">
            <div class="vendor-benefit-card">
              <i class="bi bi-award vendor-benefit-icon"></i>
              <h5 class="vendor-benefit-title">Artisanal Focus</h5>
              <p class="vendor-benefit-text">Prioritize quality and taste above all else.</p>
            </div>

            <div class="vendor-benefit-card">
              <i class="bi bi-graph-up-arrow vendor-benefit-icon"></i>
              <h5 class="vendor-benefit-title">Sustainable Growth</h5>
              <p class="vendor-benefit-text">Built-in audience of premium subscribers.</p>
            </div>
          </div>
        </div>

        <!-- RIGHT FORM CARD -->
        <div class="col-lg-5">
          <div class="vendor-register-card">
            <h2 class="vendor-reg-form-title">Vendor Registration</h2>
            <p class="vendor-reg-form-subtitle">Begin your journey with Tiffinworld</p>

            <!-- SESSION STATUS / ALERTS -->
            @if (session('status'))
              <div class="alert alert-success py-2 px-3 mb-3 small rounded-3" role="alert">
                {{ session('status') }}
              </div>
            @endif

            @if ($errors->any())
              <div class="alert alert-danger py-2 px-3 mb-3 small rounded-3" role="alert">
                <ul class="mb-0 ps-3">
                  @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                  @endforeach
                </ul>
              </div>
            @endif

            <form id="vendorRegisterForm" action="{{ route('register.vendor') ?? '#' }}" method="POST">
              @csrf

              <div class="mb-3">
                <label for="regBusinessName" class="vendor-field-label">Business Name</label>
                <input type="text" id="regBusinessName" name="business_name" class="vendor-control vendor-control-noicon @error('business_name') is-invalid @enderror" 
                       placeholder="The Artisanal Kitchen" value="{{ old('business_name', old('name')) }}" required>
                @error('business_name')
                  <div class="auth-error-msg mt-1">{{ $message }}</div>
                @enderror
              </div>

              <div class="mb-3">
                <label for="regPhone" class="vendor-field-label">Phone Number</label>
                <div class="tw-phone-group">
                  <select name="country_code" class="tw-country-code-select" aria-label="Country Code">
                    <option value="+91" selected>🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+1">🇨🇦 +1</option>
                    <option value="+61">🇦🇺 +61</option>
                    <option value="+971">🇦🇪 +971</option>
                    <option value="+65">🇸🇬 +65</option>
                    <option value="+49">🇩🇪 +49</option>
                    <option value="+33">🇫🇷 +33</option>
                    <option value="+966">🇸🇦 +966</option>
                    <option value="+974">🇶🇦 +974</option>
                    <option value="+977">🇳🇵 +977</option>
                  </select>
                  <input type="tel" id="regPhone" name="phone" class="vendor-control vendor-control-noicon @error('phone') is-invalid @enderror" 
                         placeholder="000 000 0000" value="{{ old('phone') }}" required>
                </div>
                @error('phone')
                  <div class="auth-error-msg mt-1">{{ $message }}</div>
                @enderror
              </div>

              <div class="mb-3">
                <label for="regEmail" class="vendor-field-label">Email Address</label>
                <input type="email" id="regEmail" name="email" class="vendor-control vendor-control-noicon @error('email') is-invalid @enderror" 
                       placeholder="chef@kitchen.com" value="{{ old('email') }}" required>
                @error('email')
                  <div class="auth-error-msg mt-1">{{ $message }}</div>
                @enderror
              </div>

              <!-- Password & Confirm Row -->
              <div class="row g-2 mb-4">
                <div class="col-sm-6">
                  <label for="regPassword" class="vendor-field-label">Password</label>
                  <input type="password" id="regPassword" name="password" class="vendor-control vendor-control-noicon @error('password') is-invalid @enderror" 
                         placeholder="••••••••" required>
                  @error('password')
                    <div class="auth-error-msg mt-1">{{ $message }}</div>
                  @enderror
                </div>
                <div class="col-sm-6">
                  <label for="regPasswordConfirm" class="vendor-field-label">Confirm</label>
                  <input type="password" id="regPasswordConfirm" name="password_confirmation" class="vendor-control vendor-control-noicon" 
                         placeholder="••••••••" required>
                </div>
              </div>

              <button type="submit" class="btn-vendor-submit" id="btnVendorRegister">
                Register
              </button>
            </form>

            <div class="vendor-bottom-divider"></div>

            <p class="vendor-bottom-link-text">
              Already a partner? 
              <a href="{{ route('login.vendor') ?? 'vendor-login.html' }}" class="vendor-bottom-link">Vendor Login</a>
            </p>
          </div>
        </div>

      </div>
    </div>
  </main>
@endsection
