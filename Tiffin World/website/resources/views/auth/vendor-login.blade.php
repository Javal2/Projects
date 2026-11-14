@extends('layouts.app')

@section('title', 'Vendor Partner Login — TiffinWorld')

@push('styles')
  <link rel="stylesheet" href="{{ asset('assets/css/vendor-auth.css') }}">
@endpush

@section('content')
  <main class="vendor-auth-section">
    <div class="tw-container vendor-auth-container">
      
      <div class="vendor-login-card">
        <div class="row g-0">
          
          <!-- LEFT IMAGE PANEL -->
          <div class="col-lg-6 vendor-login-image-panel d-none d-lg-flex">
            <div class="vendor-login-overlay"></div>
            
            <div class="vendor-login-image-content">
              <div class="vendor-badge-pill">
                <i class="bi bi-leaf-fill"></i> PARTNER PORTAL
              </div>
              
              <h2 class="vendor-hero-title-light">Fueling the</h2>
              <h2 class="vendor-hero-title-orange">Modern Kitchen</h2>
            </div>

            <div class="vendor-login-image-content">
              <p class="vendor-hero-desc">
                Join our community of culinary artisans. Manage your menu, track deliveries, and grow your brand with Tiffinworld.
              </p>
            </div>
          </div>

          <!-- RIGHT FORM PANEL -->
          <div class="col-lg-6 vendor-login-form-panel">
            <h1 class="vendor-form-title">Vendor Login</h1>
            <p class="vendor-form-subtitle">Welcome back! Please enter your details.</p>

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

            <!-- Segmented Control Switch -->
            <div class="vendor-segmented-control">
              <button type="button" class="vendor-seg-tab active" id="tabVendorPassword">Password</button>
              <button type="button" class="vendor-seg-tab" id="tabVendorOtp">OTP Login</button>
            </div>

            <!-- Main Form -->
            <form id="vendorLoginForm" action="{{ route('login.vendor') ?? '#' }}" method="POST">
              @csrf

              <!-- Password Mode Section -->
              <div id="vendorPasswordSection">
                <div class="mb-4">
                  <label for="vendorEmailPhone" class="vendor-field-label">Email or Phone Number</label>
                  <div class="vendor-input-wrapper">
                    <i class="bi bi-envelope vendor-input-icon"></i>
                    <input type="text" id="vendorEmailPhone" name="login_id" class="vendor-control @error('login_id') is-invalid @enderror" 
                           placeholder="vendor@kitchen.com" value="{{ old('login_id', 'vendor@kitchen.com') }}" required>
                  </div>
                  @error('login_id')
                    <div class="auth-error-msg mt-1">{{ $message }}</div>
                  @enderror
                </div>

                <div class="mb-3">
                  <div class="vendor-password-label-row">
                    <label for="vendorPassword" class="vendor-field-label">Password</label>
                    @if (Route::has('password.request'))
                      <a href="{{ route('password.request') }}" class="vendor-forgot-link">Forgot password?</a>
                    @else
                      <a href="#" class="vendor-forgot-link">Forgot password?</a>
                    @endif
                  </div>
                  <div class="vendor-input-wrapper">
                    <i class="bi bi-lock vendor-input-icon"></i>
                    <input type="password" id="vendorPassword" name="password" class="vendor-control vendor-control-password @error('password') is-invalid @enderror" 
                           placeholder="••••••••" required>
                    <i class="bi bi-eye vendor-eye-toggle" id="toggleVendorPassword"></i>
                  </div>
                  @error('password')
                    <div class="auth-error-msg mt-1">{{ $message }}</div>
                  @enderror
                </div>

                <div class="vendor-remember-row">
                  <input type="checkbox" id="rememberVendor" name="remember" class="vendor-custom-checkbox" {{ old('remember', true) ? 'checked' : '' }}>
                  <label for="rememberVendor" class="vendor-remember-label">Keep me logged in</label>
                </div>
              </div>

              <!-- OTP Mode Section (Hidden by default) -->
              <div id="vendorOtpSection" class="d-none">
                <div class="mb-4">
                  <label for="vendorOtpEmailPhone" class="vendor-field-label">Email or Phone Number</label>
                  <div class="vendor-input-wrapper">
                    <i class="bi bi-phone vendor-input-icon"></i>
                    <input type="text" id="vendorOtpEmailPhone" name="otp_login_id" class="vendor-control" 
                           placeholder="vendor@kitchen.com or 9876543210">
                  </div>
                </div>

                <div class="mb-4">
                  <label class="vendor-field-label">Enter 6-Digit OTP</label>
                  <div class="auth-otp-wrapper" style="background-color: var(--tw-section-bg); height: 72px;">
                    <input type="text" class="auth-otp-box vendor-otp-box" maxlength="1" inputmode="numeric" autocomplete="one-time-code" aria-label="OTP digit 1">
                    <input type="text" class="auth-otp-box vendor-otp-box" maxlength="1" inputmode="numeric" aria-label="OTP digit 2">
                    <input type="text" class="auth-otp-box vendor-otp-box" maxlength="1" inputmode="numeric" aria-label="OTP digit 3">
                    <input type="text" class="auth-otp-box vendor-otp-box" maxlength="1" inputmode="numeric" aria-label="OTP digit 4">
                    <input type="text" class="auth-otp-box vendor-otp-box" maxlength="1" inputmode="numeric" aria-label="OTP digit 5">
                    <input type="text" class="auth-otp-box vendor-otp-box" maxlength="1" inputmode="numeric" aria-label="OTP digit 6">
                  </div>
                  <input type="hidden" name="vendor_otp" id="vendorOtpCombined" value="">
                </div>
              </div>

              <!-- Primary Submit Button -->
              <button type="submit" class="btn-vendor-submit" id="btnVendorSubmit">
                Sign In to Dashboard
              </button>
            </form>

            <div class="vendor-bottom-divider"></div>

            <p class="vendor-bottom-link-text">
              New to Tiffinworld? 
              <a href="{{ route('register.vendor') ?? 'vendor-register.html' }}" class="vendor-bottom-link">Register as a Vendor</a>
            </p>
          </div>

        </div>
      </div>

    </div>
  </main>
@endsection
