@extends('layouts.app')

@section('title', 'Customer Login — TiffinWorld')

@push('styles')
  <link rel="stylesheet" href="{{ asset('assets/css/auth.css') }}">
@endpush

@section('content')
  <main class="tw-auth-page">
    
    <!-- Atmospheric Organic Background Shapes -->
    <div class="auth-orb auth-orb-top"></div>
    <div class="auth-orb auth-orb-bottom"></div>
    <div class="auth-orb auth-orb-center"></div>

    <div class="customer-auth-wrapper">
      
      <!-- Main Login Card -->
      <div class="customer-login-card">
        
        <!-- Brand Culinary Icon -->
        <div class="auth-brand-icon-wrapper">
          <i class="bi bi-fork-knife auth-brand-icon"></i>
        </div>

        <!-- Heading & Subheading -->
        <div class="auth-heading-group">
          <h1 class="auth-heading-title">Welcome Back</h1>
          <p class="auth-heading-subtitle">Experience the art of mindful dining.</p>
        </div>

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

        <!-- Login Form -->
        <form id="customerLoginForm" action="{{ route('login.customer') ?? '#' }}" method="POST">
          @csrf

          <!-- Email Input Section -->
          <div class="mb-4" id="emailInputSection">
            <label for="customerEmail" class="auth-field-label">EMAIL ADDRESS</label>
            <div class="auth-input-wrapper">
              <i class="bi bi-envelope auth-input-icon"></i>
              <input type="email" id="customerEmail" name="email" class="auth-control @error('email') is-invalid @enderror" 
                     placeholder="name@domain.com" value="{{ old('email', 'j.doe@conservatory.com') }}" autocomplete="email" required>
            </div>
            @error('email')
              <div class="auth-error-msg">{{ $message }}</div>
            @enderror
          </div>

          <!-- Phone Input Section (Active in Phone Login mode) -->
          <div class="mb-4 d-none" id="phoneInputSection">
            <label for="customerPhone" class="auth-field-label">PHONE NUMBER</label>
            <div class="auth-phone-group">
              <select name="country_code" class="auth-phone-prefix-select" aria-label="Country Code">
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
              <input type="tel" id="customerPhone" name="phone" class="auth-control auth-control-noicon @error('phone') is-invalid @enderror" 
                     placeholder="000 000 0000" value="{{ old('phone') }}" autocomplete="tel">
            </div>
            @error('phone')
              <div class="auth-error-msg">{{ $message }}</div>
            @enderror
          </div>

          <!-- OTP Section -->
          <div class="mb-4" id="otpSection">
            <label class="auth-field-label">OTP</label>
            <div class="auth-otp-wrapper">
              <input type="text" class="auth-otp-box" maxlength="1" inputmode="numeric" autocomplete="one-time-code" aria-label="OTP digit 1">
              <input type="text" class="auth-otp-box" maxlength="1" inputmode="numeric" aria-label="OTP digit 2">
              <input type="text" class="auth-otp-box" maxlength="1" inputmode="numeric" aria-label="OTP digit 3">
              <input type="text" class="auth-otp-box" maxlength="1" inputmode="numeric" aria-label="OTP digit 4">
              <input type="text" class="auth-otp-box" maxlength="1" inputmode="numeric" aria-label="OTP digit 5">
              <input type="text" class="auth-otp-box" maxlength="1" inputmode="numeric" aria-label="OTP digit 6">
            </div>
            <input type="hidden" name="otp" id="otpCombined" value="{{ old('otp') }}">
            @error('otp')
              <div class="auth-error-msg text-center mt-2">{{ $message }}</div>
            @enderror
          </div>

          <!-- Keep Me Logged In Checkbox -->
          <div class="auth-remember-row">
            <input type="checkbox" id="rememberCustomer" name="remember" class="auth-custom-checkbox" {{ old('remember', true) ? 'checked' : '' }}>
            <label for="rememberCustomer" class="auth-remember-label">Keep me logged in</label>
          </div>

          <!-- Primary Sign In Button -->
          <button type="submit" class="btn-auth-submit" id="btnCustomerSignIn">
            Sign In
          </button>
        </form>

        <!-- Secure Join Divider -->
        <div class="auth-divider-row">
          <div class="auth-divider-line"></div>
          <div class="auth-divider-text">OR SECURELY JOIN WITH</div>
          <div class="auth-divider-line"></div>
        </div>

        <!-- Secondary Phone / Email Toggle Button -->
        <div class="auth-phone-btn-wrapper">
          <button type="button" class="btn-phone-login" id="btnToggleAuthMode">
            <i class="bi bi-phone me-2"></i><span id="toggleModeText">Login with phone number</span>
          </button>
        </div>

      </div>

      <!-- Bottom Trust Strip -->
      <div class="auth-trust-strip">
        <div class="auth-trust-item">
          <i class="bi bi-shield-check"></i>
          <span>SECURE ENTRY</span>
        </div>
        <div class="auth-trust-item">
          <i class="bi bi-leaf"></i>
          <span>ORGANIC CHOICE</span>
        </div>
        <div class="auth-trust-item">
          <i class="bi bi-truck"></i>
          <span>FARM-TO-DOOR</span>
        </div>
      </div>

    </div>

  </main>
@endsection
