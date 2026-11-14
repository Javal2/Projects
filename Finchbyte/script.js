/* ==========================================================================
   FINCHBYTE — MASTER HOMEPAGE ANIMATION & INTERACTION ENGINE
   Unified GSAP ScrollTrigger, Lenis Smooth Scroll, Matter.js 2D Physics,
   Three.js WebGL MagicRings, Canvas Particles, 3D Funnels & Interactive Simulators
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 0. Register GSAP Plugins
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // 1. Initialize Global Smooth Scrolling
  const lenis = initGlobalSmoothScroll();

  // 2. Initialize Navigation & Progress Rails
  initNavbarAndRail(lenis);

  // 3. Initialize All 15 Section Engines
  initHero();
  initProblem();
  initJourney();
  initSystem();
  initCreative();
  initAutomation();
  initTechnology();
  initPeople();
  initPipeline();
  initRevenueAndLearning();
  initResults();
  initPartnership();
  initMarketingFunnel();
  initSalesFunnel();
});

/* ==========================================================================
   01. GLOBAL SMOOTH SCROLL (LENIS + GSAP TICKER INTEGRATION)
   ========================================================================== */
function initGlobalSmoothScroll() {
  let lenis = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothTouch: false
    });

    if (typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }
  return lenis;
}

/* ==========================================================================
   02. NAVBAR & DESKTOP SECTION RAIL CONTROLLER
   ========================================================================== */
function initNavbarAndRail(lenis) {
  const header = document.getElementById('site-header');
  const railItems = document.querySelectorAll('.rail-item');
  const sections = document.querySelectorAll('.finch-section');

  // Sticky Navbar Scroll Listener
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // Smooth Anchor Scrolling for Navbar & Rail Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(targetElem, { offset: 0, duration: 1.4 });
        } else {
          targetElem.scrollIntoView({ behavior: 'smooth' });
        }

        // Close mobile navbar collapse if open
        const navCollapse = document.getElementById('navbarNav');
        if (navCollapse && navCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
          if (bsCollapse) bsCollapse.hide();
        }
      }
    });
  });

  // Sync Rail Active Indicator on Scroll
  if (typeof ScrollTrigger !== 'undefined' && sections.length && railItems.length) {
    sections.forEach((sec, idx) => {
      ScrollTrigger.create({
        trigger: sec,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => {
          if (self.isActive && railItems[idx]) {
            railItems.forEach((r) => r.classList.remove('active'));
            railItems[idx].classList.add('active');
          }
        }
      });
    });
  }
}

/* ==========================================================================
   03. SECTION 01 — HERO INTRO & LIVE SALES ENGINE
   ========================================================================== */
function initHero() {
  const heroWrapper = document.getElementById('hero-pin-wrapper');
  const logoElem = document.getElementById('typewriter-logo');
  const container = document.getElementById('matter-canvas-container');
  const revealElem = document.getElementById('hero-content-reveal');
  const card = document.getElementById('sales-journey-simulator');
  const cursor = document.getElementById('sim-cursor');

  if (!heroWrapper || !logoElem || !revealElem) return;

  const brandText = 'FINCHBYTE';
  const tag = document.getElementById('scroll-explore-tag');
  const isMobile = window.innerWidth < 992;

  if (isMobile) {
    // =========================================================================
    // MOBILE VIEW ONLY (STRICTLY PROHIBITED TO ALTER DESKTOP VIEW)
    // 1. Remove box dropping animation from intro on mobile view only
    // 2. Replace scroll down approach from FINCHBYTE text to apply auto type effect
    // =========================================================================
    if (container) container.style.display = 'none';
    if (tag) tag.style.display = 'none';

    logoElem.innerHTML = '';
    let currIdx = 0;

    const autoTypeInterval = setInterval(() => {
      currIdx++;
      let html = '';
      for (let i = 0; i < currIdx; i++) {
        html += `<span class="typewriter-char">${brandText[i]}</span>`;
      }
      html += `<span class="typewriter-cursor"></span>`;
      logoElem.innerHTML = html;

      if (currIdx >= brandText.length) {
        clearInterval(autoTypeInterval);

        setTimeout(() => {
          const typewriterContainer = document.getElementById('typewriter-container');
          if (typewriterContainer) {
            typewriterContainer.style.transition = 'opacity 0.6s ease';
            typewriterContainer.style.opacity = '0';
            setTimeout(() => { typewriterContainer.style.display = 'none'; }, 600);
          }
          if (tag) {
            tag.style.transition = 'opacity 0.6s ease';
            tag.style.opacity = '0';
          }

          revealElem.classList.add('active');
          revealElem.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
          revealElem.style.opacity = '1';
          revealElem.style.transform = 'translateY(0)';
        }, 600);
      }
    }, 110);

    return; // Exit hero initialization for mobile clean & early
  }

  logoElem.innerHTML = '';

  // 1. Initialize Typewriter Characters
  brandText.split('').forEach((char) => {
    const span = document.createElement('span');
    span.className = 'typewriter-char';
    span.innerText = char;
    logoElem.appendChild(span);
  });
  const cursorElem = document.createElement('span');
  cursorElem.className = 'typewriter-cursor';
  logoElem.appendChild(cursorElem);

  // 2. Matter.js 2D Rigid Body Physics Engine
  let engine, render, runner, bodiesList = [];
  let floor, leftWall, rightWall;

  if (typeof Matter !== 'undefined' && container) {
    const { Engine, Render, Runner, Bodies, Composite, Mouse, Events } = Matter;

    engine = Engine.create();
    engine.gravity.y = 0; // Disabled initially

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    render = Render.create({
      element: container,
      engine: engine,
      options: {
        width: width,
        height: height,
        wireframes: false,
        background: 'transparent'
      }
    });

    Render.run(render);
    runner = Runner.create();
    Runner.run(runner, engine);

    floor = Bodies.rectangle(width / 2, height + 30, width * 2, 60, { isStatic: true });
    leftWall = Bodies.rectangle(-30, height / 2, 60, height * 2, { isStatic: true });
    rightWall = Bodies.rectangle(width + 30, height / 2, 60, height * 2, { isStatic: true });

    Composite.add(engine.world, [floor, leftWall, rightWall]);

    const keywords = [
      'Sales', 'Marketing', 'Automation', 'Growth', 'CRM', 'Revenue',
      'Pipeline', 'Campaign', 'Lead', 'Customer', 'Conversion', 'Analytics',
      'AI', 'Workflow', 'Email', 'WhatsApp', 'Strategy', 'Performance',
      'Business', 'Follow-up', 'Opportunity', 'Scale', 'Retention',
      'Optimization', 'Funnels', 'Insights', 'Integration', 'Journey'
    ];

    const colors = ['#4f46e5', '#2563eb', '#059669', '#7c3aed', '#0f172a', '#d97706'];

    keywords.forEach((word, idx) => {
      const fontSize = Math.floor(Math.random() * 5 + 13);
      const boxWidth = word.length * (fontSize * 0.65) + 24;
      const boxHeight = fontSize + 16;

      const initX = (width / (keywords.length + 1)) * (idx + 1) + (Math.random() - 0.5) * 50;
      const initY = -120 - idx * 28 - Math.random() * 70;
      const color = colors[idx % colors.length];

      const body = Bodies.rectangle(initX, initY, boxWidth, boxHeight, {
        restitution: 0.5,
        friction: 0.1,
        angle: (Math.random() - 0.5) * 0.35,
        render: { fillStyle: 'transparent', strokeStyle: 'transparent', lineWidth: 0 }
      });

      body.initialX = initX;
      body.initialY = initY;
      body.customText = word;
      body.customColor = color;
      body.fontSize = fontSize;
      body.boxWidth = boxWidth;
      body.boxHeight = boxHeight;

      bodiesList.push(body);
    });

    Composite.add(engine.world, bodiesList);

    // Custom Canvas Render Loop for Rounded Keyword Pills
    Events.on(render, 'afterRender', () => {
      const ctx = render.context;
      bodiesList.forEach((body) => {
        const { position, angle } = body;
        ctx.save();
        ctx.translate(position.x, position.y);
        ctx.rotate(angle);

        ctx.fillStyle = '#ffffff';
        ctx.strokeStyle = body.customColor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(-body.boxWidth / 2, -body.boxHeight / 2, body.boxWidth, body.boxHeight, 8);
        } else {
          ctx.rect(-body.boxWidth / 2, -body.boxHeight / 2, body.boxWidth, body.boxHeight);
        }
        ctx.fill();
        ctx.stroke();

        ctx.font = `700 ${body.fontSize}px 'Space Grotesk', sans-serif`;
        ctx.fillStyle = body.customColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(body.customText, 0, 0);

        ctx.restore();
      });
    });

    // Mouse Repulsion Forcefield
    const mouse = Mouse.create(render.canvas);
    Events.on(engine, 'beforeUpdate', () => {
      const mousePos = mouse.position;
      if (!mousePos || mousePos.x === undefined) return;

      bodiesList.forEach((body) => {
        const dx = body.position.x - mousePos.x;
        const dy = body.position.y - mousePos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120 && dist > 0) {
          const forceMag = (120 - dist) * 0.00025;
          Matter.Body.applyForce(body, body.position, {
            x: (dx / dist) * forceMag,
            y: (dy / dist) * forceMag - 0.0001
          });
        }
      });
    });

    // Window Resize Handler
    window.addEventListener('resize', () => {
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;
      render.canvas.width = newW;
      render.canvas.height = newH;
      Matter.Body.setPosition(floor, { x: newW / 2, y: newH + 30 });
      Matter.Body.setPosition(rightWall, { x: newW + 30, y: newH / 2 });
    });
  }

  // 3. 3D Parallax Mouse Tilt on Simulator Card
  if (card) {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotX = (y / rect.height) * -6;
      const rotY = (x / rect.width) * 6;
      card.style.transform = `translateY(-4px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
    });
  }

  // 4. Simulator Scroll Milestone Controller
  function updateHeroSimulator(norm) {
    const landingCTA = document.getElementById('sim-landing-cta');
    const flowContainer = document.getElementById('sim-flow-container');
    const leadCard = document.getElementById('sim-lead-card');
    const aiDetails = document.getElementById('sim-ai-details');
    const scoreText = document.getElementById('sim-score-text');
    const notifEmail = document.getElementById('notif-email');
    const notifWhatsapp = document.getElementById('notif-whatsapp');
    const notifMeeting = document.getElementById('notif-meeting');
    const statusBadge = document.getElementById('sim-status-badge');
    const widgetRev = document.getElementById('sim-widget-revenue');
    const widgetLeads = document.getElementById('sim-widget-leads');
    const widgetConv = document.getElementById('sim-widget-conversion');
    const stages = document.querySelectorAll('.pipe-stage');
    const lines = document.querySelectorAll('.pipe-line');

    let stageIdx = 0;
    if (norm >= 0.15) stageIdx = 1;
    if (norm >= 0.35) stageIdx = 2;
    if (norm >= 0.52) stageIdx = 3;
    if (norm >= 0.72) stageIdx = 4;
    if (norm >= 0.90) stageIdx = 5;

    stages.forEach((st, i) => {
      if (i <= stageIdx) st.classList.add('active');
      else st.classList.remove('active');
    });

    lines.forEach((ln, i) => {
      if (i < stageIdx) ln.classList.add('active');
      else ln.classList.remove('active');
    });

    if (norm < 0.15) {
      if (landingCTA) { landingCTA.style.display = 'block'; landingCTA.style.opacity = '1'; }
      if (flowContainer) flowContainer.style.display = 'none';
      if (leadCard) leadCard.style.opacity = '0';
      if (aiDetails) aiDetails.style.opacity = '0';
      if (widgetRev) widgetRev.innerText = '$0';
      if (widgetLeads) widgetLeads.innerText = '1,284';
      if (widgetConv) widgetConv.innerText = '14.2%';
    } else if (norm >= 0.15 && norm < 0.35) {
      if (landingCTA) landingCTA.style.display = 'none';
      if (flowContainer) flowContainer.style.display = 'flex';
      if (leadCard) { leadCard.style.opacity = '1'; leadCard.style.transform = 'translateY(0)'; }
      if (statusBadge) statusBadge.innerText = 'Status: Lead Captured';
      if (notifEmail) { notifEmail.style.opacity = '0'; notifEmail.style.transform = 'translateX(20px)'; }
    } else if (norm >= 0.35 && norm < 0.52) {
      if (aiDetails) aiDetails.style.opacity = '1';
      if (scoreText) scoreText.innerText = '96%';
      if (statusBadge) statusBadge.innerText = 'Status: AI Qualified';
      if (notifEmail) { notifEmail.style.opacity = '1'; notifEmail.style.transform = 'translateX(0)'; }
      if (notifWhatsapp) { notifWhatsapp.style.opacity = '0'; notifWhatsapp.style.transform = 'translateX(20px)'; }
    } else if (norm >= 0.52 && norm < 0.72) {
      if (statusBadge) statusBadge.innerText = 'Status: WhatsApp Contacted';
      if (notifWhatsapp) { notifWhatsapp.style.opacity = '1'; notifWhatsapp.style.transform = 'translateX(0)'; }
      if (notifMeeting) { notifMeeting.style.opacity = '0'; notifMeeting.style.transform = 'translateX(20px)'; }
      if (widgetRev) widgetRev.innerText = '$28,400';
    } else if (norm >= 0.72 && norm < 0.90) {
      if (statusBadge) statusBadge.innerText = 'Status: Demo Scheduled';
      if (notifMeeting) { notifMeeting.style.opacity = '1'; notifMeeting.style.transform = 'translateX(0)'; }
      if (widgetRev) widgetRev.innerText = '$38,900';
    } else if (norm >= 0.90) {
      if (statusBadge) {
        statusBadge.className = 'badge bg-success-subtle text-success border border-success-subtle px-2 py-1 fs-8';
        statusBadge.innerText = 'Status: Deal Won';
      }
      if (widgetRev) widgetRev.innerText = '$48,500';
      if (widgetLeads) widgetLeads.innerText = '1,286';
      if (widgetConv) widgetConv.innerText = '18.6%';
    }
  }

  // 5. Pinned Master ScrollTrigger Sequence
  let hasDropped = false;
  let lastCharCount = -1;

  ScrollTrigger.create({
    trigger: heroWrapper,
    start: 'top top',
    end: '+=400%',
    pin: true,
    scrub: true,
    anticipatePin: 1,
    preventOverlaps: true,
    fastScrollEnd: true,
    onLeaveBack: () => {
      if (logoElem) logoElem.style.opacity = '1';
      if (container) container.style.opacity = '1';
      const tag = document.getElementById('scroll-explore-tag');
      if (tag) tag.style.opacity = '1';
      if (revealElem) {
        revealElem.classList.remove('active');
        revealElem.style.opacity = '0';
      }
      if (engine) engine.gravity.y = 0;
      hasDropped = false;
      bodiesList.forEach((body) => {
        Matter.Body.setPosition(body, { x: body.initialX, y: body.initialY });
        Matter.Body.setVelocity(body, { x: 0, y: 0 });
        Matter.Body.setAngularVelocity(body, 0);
      });
      updateHeroSimulator(0);
    },
    onUpdate: (self) => {
      const p = self.progress;
      const tag = document.getElementById('scroll-explore-tag');

      // Phase 1 (0.00 - 0.18): Typewriter Logo
      const rawProgress = Math.max(0, Math.min(1, p / 0.18));
      const charCount = Math.min(brandText.length, Math.floor(rawProgress * (brandText.length + 1)));

      if (charCount !== lastCharCount) {
        lastCharCount = charCount;
        let html = '';
        for (let i = 0; i < charCount; i++) {
          html += `<span class="typewriter-char">${brandText[i]}</span>`;
        }
        html += `<span class="typewriter-cursor"></span>`;
        logoElem.innerHTML = html;
      }

      // Phase 2 (0.18 - 0.45): Matter.js Physics Pills
      if (p < 0.18) {
        if (engine) engine.gravity.y = 0;
        hasDropped = false;
        bodiesList.forEach((body) => {
          Matter.Body.setPosition(body, { x: body.initialX, y: body.initialY });
          Matter.Body.setVelocity(body, { x: 0, y: 0 });
          Matter.Body.setAngularVelocity(body, 0);
        });
      } else if (p >= 0.18 && !hasDropped) {
        if (engine) engine.gravity.y = 1.2;
        hasDropped = true;
      }

      // Phase 3 (0.45 - 0.60): Crossfade Intro to Hero Content
      if (p >= 0.45 && p < 0.60) {
        const fadeP = 1 - (p - 0.45) / 0.15;
        logoElem.style.opacity = fadeP;
        if (container) container.style.opacity = fadeP;
        if (tag) tag.style.opacity = fadeP;

        revealElem.classList.add('active');
        revealElem.style.opacity = 1 - fadeP;
      } else if (p >= 0.60) {
        logoElem.style.opacity = 0;
        if (container) container.style.opacity = 0;
        if (tag) tag.style.opacity = 0;

        revealElem.classList.add('active');
        revealElem.style.opacity = 1;
        const simNorm = Math.max(0, Math.min(1, (p - 0.60) / 0.40));
        updateHeroSimulator(simNorm);
      } else {
        logoElem.style.opacity = 1;
        if (container) container.style.opacity = 1;
        if (tag) tag.style.opacity = 1;

        revealElem.classList.remove('active');
        revealElem.style.opacity = 0;
        updateHeroSimulator(0);
      }
    }
  });
}

/* ==========================================================================
   04. SECTION 02 — THE PROBLEM (3D STACKED DEPTH CAROUSEL & QUESTION BURST)
   ========================================================================== */
function initProblem() {
  const section = document.getElementById('prob-section');
  const heading = document.getElementById('prob-heading');
  const q = Array.from(document.querySelectorAll('#dc-3 .q-item'));
  const scoreFill = document.getElementById('score-fill');

  if (!section || !heading) return;

  const isMobile = window.innerWidth < 992;
  const offX = isMobile ? 88 : 260;
  const offY = isMobile ? 130 : 115;
  const exitX = -(window.innerWidth + 200);

  if (isMobile) {
    // =========================================================================
    // MOBILE VIEW ONLY (STRICTLY PROHIBITED TO ALTER DESKTOP VIEW)
    // Next Button & Swipe Gestures to cycle depth cards on mobile view
    // =========================================================================
    let currentCardIndex = 0;
    const nextBtn = document.getElementById('prob-next-btn');

    // Set initial card states on mobile view
    gsap.set(heading, { opacity: 1, y: 0 });
    gsap.set('#dc-1', { xPercent: -50, yPercent: -50, x: 0, y: 0, scale: 1, opacity: 1, zIndex: 30, rotation: 0 });
    gsap.set('#dc-2', { xPercent: -50, yPercent: -50, x: 0, y: 16, scale: 0.94, opacity: 0.7, zIndex: 20, rotation: 0 });
    gsap.set('#dc-3', { xPercent: -50, yPercent: -50, x: 0, y: 32, scale: 0.88, opacity: 0.4, zIndex: 10, rotation: 0 });
    gsap.set('.q-item', { xPercent: -50, yPercent: -50, scale: 0, opacity: 0, x: 0, y: 0, rotation: 0 });

    function showMobileCard(index) {
      currentCardIndex = index % 3;

      if (currentCardIndex === 0) {
        // Card 1 Active
        gsap.to('#dc-1', { x: 0, y: 0, scale: 1, opacity: 1, zIndex: 30, duration: 0.45, ease: 'power2.out' });
        gsap.to('#dc-2', { x: 0, y: 16, scale: 0.94, opacity: 0.7, zIndex: 20, duration: 0.45, ease: 'power2.out' });
        gsap.to('#dc-3', { x: 0, y: 32, scale: 0.88, opacity: 0.4, zIndex: 10, duration: 0.45, ease: 'power2.out' });
        gsap.to('.q-item', { scale: 0, opacity: 0, duration: 0.25 });
        if (scoreFill) scoreFill.style.width = '0%';
      } else if (currentCardIndex === 1) {
        // Card 2 Active
        gsap.to('#dc-1', { x: exitX, scale: 0.9, opacity: 0, zIndex: 10, duration: 0.45, ease: 'power2.inOut' });
        gsap.to('#dc-2', { x: 0, y: 0, scale: 1, opacity: 1, zIndex: 30, duration: 0.45, ease: 'power2.out' });
        gsap.to('#dc-3', { x: 0, y: 16, scale: 0.94, opacity: 0.7, zIndex: 20, duration: 0.45, ease: 'power2.out' });
        gsap.to('.q-item', { scale: 0, opacity: 0, duration: 0.25 });
        if (scoreFill) scoreFill.style.width = '78%';
      } else if (currentCardIndex === 2) {
        // Card 3 Active
        gsap.to('#dc-1', { x: exitX, scale: 0.9, opacity: 0, zIndex: 5, duration: 0.45 });
        gsap.to('#dc-2', { x: exitX, scale: 0.9, opacity: 0, zIndex: 10, duration: 0.45 });
        gsap.to('#dc-3', { x: 0, y: 0, scale: 1, opacity: 1, zIndex: 30, duration: 0.45, ease: 'power2.out' });

        if (q.length >= 4) {
          gsap.to(q[0], { scale: 1, opacity: 1, x: -offX, y: -offY, rotation: -6, duration: 0.4, ease: 'back.out(1.4)', delay: 0.1 });
          gsap.to(q[1], { scale: 1, opacity: 1, x: offX, y: -offY, rotation: 6, duration: 0.4, ease: 'back.out(1.4)', delay: 0.2 });
          gsap.to(q[2], { scale: 1, opacity: 1, x: -offX, y: offY, rotation: -4, duration: 0.4, ease: 'back.out(1.4)', delay: 0.3 });
          gsap.to(q[3], { scale: 1, opacity: 1, x: offX, y: offY, rotation: 4, duration: 0.4, ease: 'back.out(1.4)', delay: 0.4 });
        }
      }

      if (nextBtn) {
        if (isMobile) {
          const mobileLabels = ['Next →', 'Next →', 'Back to Start ↺'];
          const btnTextSpan = nextBtn.querySelector('span');
          if (btnTextSpan) btnTextSpan.innerText = mobileLabels[currentCardIndex];
        } else {
          const labels = ['Next: AI Lead Score →', 'Next: Manual Delay →', 'Back to Start ↺'];
          const btnTextSpan = nextBtn.querySelector('span');
          if (btnTextSpan) btnTextSpan.innerText = labels[currentCardIndex];
        }
      }
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        showMobileCard(currentCardIndex + 1);
      });
    }

    // Touch Swipe support on mobile
    const cardsStage = document.getElementById('cards-stage');
    if (cardsStage) {
      let touchStartX = 0;
      cardsStage.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });
      cardsStage.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 35) {
          showMobileCard(currentCardIndex + 1);
        } else if (touchEndX - touchStartX > 35 && currentCardIndex > 0) {
          showMobileCard(currentCardIndex - 1);
        }
      }, { passive: true });
    }

    return; // Exit initProblem clean & early for mobile
  }

  const FRONT = { y: 0, scale: 1, opacity: 1 };
  const MID   = { y: 22, scale: 0.94, opacity: 0.96 };
  const BACK  = { y: 44, scale: 0.88, opacity: 0.92 };
  const EXIT_L = { x: exitX, scale: 0.9, opacity: 0, rotate: -6 };

  // Set Initial State
  gsap.set(heading, { opacity: 1, y: 0 });
  gsap.set('#dc-1', { xPercent: -50, yPercent: -50, y: 400, scale: 1, opacity: 0 });
  gsap.set('#dc-2', { xPercent: -50, yPercent: -50, y: 400, scale: 0.94, opacity: 0 });
  gsap.set('#dc-3', { xPercent: -50, yPercent: -50, y: 400, scale: 0.88, opacity: 0 });
  gsap.set('.q-item', { xPercent: -50, yPercent: -50, scale: 0, opacity: 0, x: 0, y: 0, rotation: 0 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: '+=200%',
      pin: true,
      scrub: true,
      anticipatePin: 1,
      preventOverlaps: true,
      fastScrollEnd: true,
      onLeaveBack: () => {
        gsap.set('#dc-1', { xPercent: -50, yPercent: -50, y: 400, scale: 1, opacity: 0 });
        gsap.set('#dc-2', { xPercent: -50, yPercent: -50, y: 400, scale: 0.94, opacity: 0 });
        gsap.set('#dc-3', { xPercent: -50, yPercent: -50, y: 400, scale: 0.88, opacity: 0 });
        gsap.set('.q-item', { scale: 0, opacity: 0 });
      },
      onUpdate: (self) => {
        const p = self.progress;
        const d1 = document.getElementById('dot-1');
        const d2 = document.getElementById('dot-2');
        const d3 = document.getElementById('dot-3');

        if (d1 && d2 && d3) {
          if (p < 0.38) {
            d1.classList.add('active'); d2.classList.remove('active'); d3.classList.remove('active');
          } else if (p < 0.68) {
            d1.classList.remove('active'); d2.classList.add('active'); d3.classList.remove('active');
          } else {
            d1.classList.remove('active'); d2.classList.remove('active'); d3.classList.add('active');
          }
        }

        if (scoreFill) {
          scoreFill.style.width = p >= 0.35 ? '78%' : '0%';
        }
      }
    }
  });

  // Timeline Sequence
  tl.to('#card-dots', { opacity: 1, duration: 0.05 }, 0)
    // 0.05 -> 0.22: Entrance of Card Stack
    .to('#dc-1', { ...FRONT, duration: 0.18, ease: 'power2.out' }, 0.05)
    .to('#dc-2', { ...MID, duration: 0.18, ease: 'power2.out' }, 0.05)
    .to('#dc-3', { ...BACK, duration: 0.18, ease: 'power2.out' }, 0.05)

    // 0.22 -> 0.36: Hold Card 1
    .to({}, { duration: 0.14 }, 0.22)

    // 0.36 -> 0.50: Card 1 exits left, Card 2 is FRONT
    .to('#dc-1', { ...EXIT_L, duration: 0.14, ease: 'power2.in' }, 0.36)
    .to('#dc-2', { ...FRONT, duration: 0.14, ease: 'power2.out' }, 0.36)
    .to('#dc-3', { ...MID, duration: 0.14, ease: 'power2.out' }, 0.36)

    // 0.50 -> 0.64: Hold Card 2
    .to({}, { duration: 0.14 }, 0.50)

    // 0.64 -> 0.78: Card 2 exits left, Card 3 is FRONT
    .to('#dc-2', { ...EXIT_L, duration: 0.14, ease: 'power2.in' }, 0.64)
    .to('#dc-3', { ...FRONT, duration: 0.14, ease: 'power2.out' }, 0.64);

  // 0.78 -> 0.90: Pop-up Question Items Burst Outward Around Card 3
  if (q.length >= 4) {
    tl.to(q[0], { scale: 1, opacity: 1, x: -offX, y: -offY, rotation: -6, duration: 0.08, ease: 'back.out(1.4)' }, 0.76)
      .to(q[1], { scale: 1, opacity: 1, x: offX, y: -offY, rotation: 6, duration: 0.08, ease: 'back.out(1.4)' }, 0.78)
      .to(q[2], { scale: 1, opacity: 1, x: -offX, y: offY, rotation: -4, duration: 0.08, ease: 'back.out(1.4)' }, 0.80)
      .to(q[3], { scale: 1, opacity: 1, x: offX, y: offY, rotation: 4, duration: 0.08, ease: 'back.out(1.4)' }, 0.82)
      // Hold at complete burst state
      .to({}, { duration: 0.14 }, 0.86);
  }
}

/* ==========================================================================
   05. SECTION 03 — THE JOURNEY (7 MOMENTS 3D PERSPECTIVE STEPPER)
   ========================================================================== */
function initJourney() {
  const section = document.getElementById('journey-section');
  if (!section) return;

  const isMobile = window.innerWidth < 992;
  const TOTAL = 7;
  const cards = Array.from({ length: TOTAL }, (_, i) => document.getElementById('mc-' + (i + 1))).filter(Boolean);
  const dots = Array.from({ length: TOTAL }, (_, i) => document.getElementById('jd-' + (i + 1))).filter(Boolean);
  const stepDisplay = document.getElementById('step-num-display');
  const progressFill = document.getElementById('journey-progress-fill');

  let currentStep = 0;

  if (isMobile) {
    const mobileLabels = ['Ad', 'Landing Page', 'WhatsApp', 'Setu CRM', 'Follow-Up', 'Meeting', 'Customer Won'];
    dots.forEach((d, i) => {
      const lbl = d.querySelector('.j-dot-label');
      if (lbl && mobileLabels[i]) {
        lbl.textContent = mobileLabels[i];
      }
    });
    cards.forEach((c, i) => {
      c.classList.remove('active-mobile-card');
      gsap.set(c, {
        x: 0,
        y: 0,
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        opacity: i === 0 ? 1 : 0,
        clearProps: 'transform'
      });
      if (i === 0) {
        c.classList.add('active-mobile-card');
        c.style.display = 'block';
      } else {
        c.style.display = 'none';
      }
    });

    function showMobileJourneyStep(step) {
      step = Math.max(0, Math.min(TOTAL - 1, step));
      currentStep = step;

      if (stepDisplay) stepDisplay.textContent = String(step + 1).padStart(2, '0');

      dots.forEach((d, i) => {
        d.classList.remove('active', 'done');
        if (i < step) d.classList.add('done');
        else if (i === step) d.classList.add('active');
      });

      cards.forEach((c, i) => {
        if (i === step) {
          c.classList.add('active-mobile-card');
          c.style.display = 'block';
          c.style.opacity = '1';
          c.style.transform = 'none';
        } else {
          c.classList.remove('active-mobile-card');
          c.style.display = 'none';
          c.style.opacity = '0';
        }
      });
    }

    // Add click listeners to horizontal step pills on mobile
    dots.forEach((d, idx) => {
      d.addEventListener('click', (e) => {
        e.preventDefault();
        showMobileJourneyStep(idx);
      });
    });

    // Touch Swipe support across moment cards on mobile
    const stage = document.getElementById('journey-right-stage');
    if (stage) {
      let startX = 0;
      stage.addEventListener('touchstart', (e) => {
        startX = e.changedTouches[0].screenX;
      }, { passive: true });
      stage.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].screenX;
        if (startX - endX > 35 && currentStep < TOTAL - 1) {
          showMobileJourneyStep(currentStep + 1);
        } else if (endX - startX > 35 && currentStep > 0) {
          showMobileJourneyStep(currentStep - 1);
        }
      }, { passive: true });
    }

    // Initial trigger to ensure Card 1 (#mc-1) is 100% visible on mobile load
    showMobileJourneyStep(0);
    return; // Exit initJourney clean & early for mobile
  }

  cards.forEach((c, i) => {
    gsap.set(c, {
      opacity: i === 0 ? 1 : 0,
      x: i === 0 ? 0 : 120,
      rotateY: i === 0 ? 0 : 15,
      rotateX: i === 0 ? 0 : -5,
      scale: i === 0 ? 1 : 0.9,
      zIndex: i === 0 ? 10 : 1
    });

    // 3D Mouse Tilt
    c.addEventListener('mousemove', (e) => {
      if (i !== currentStep) return;
      const rect = c.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(c, { rotateY: x * 0.03, rotateX: -y * 0.03, duration: 0.2, ease: 'power1.out' });
    });

    c.addEventListener('mouseleave', () => {
      if (i !== currentStep) return;
      gsap.to(c, { rotateY: 0, rotateX: 0, duration: 0.4, ease: 'power2.out' });
    });
  });

  function showStep(step) {
    if (step === currentStep || !cards[step] || !cards[currentStep]) return;
    const prev = currentStep;
    currentStep = step;

    if (stepDisplay) stepDisplay.textContent = String(step + 1).padStart(2, '0');
    if (progressFill) progressFill.style.height = `${((step + 1) / TOTAL) * 100}%`;

    dots.forEach((d, i) => {
      d.classList.remove('active', 'done');
      if (i < step) d.classList.add('done');
      else if (i === step) d.classList.add('active');
    });

    gsap.to(cards[prev], {
      opacity: 0,
      x: step > prev ? -90 : 90,
      rotateY: step > prev ? -10 : 10,
      rotateX: step > prev ? 4 : -4,
      scale: 0.92,
      zIndex: 1,
      duration: 0.32,
      ease: 'power2.in'
    });

    gsap.fromTo(
      cards[step],
      { opacity: 0, x: step > prev ? 90 : -90, rotateY: step > prev ? 10 : -10, rotateX: step > prev ? -4 : 4, scale: 0.92, zIndex: 10 },
      { opacity: 1, x: 0, rotateY: 0, rotateX: 0, scale: 1, duration: 0.38, ease: 'power2.out', delay: 0.03 }
    );
  }

  const stInstance = ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: '+=320%',
    pin: true,
    anticipatePin: 1,
    preventOverlaps: true,
    fastScrollEnd: true,
    onLeaveBack: () => {
      showStep(0);
    },
    onUpdate: (self) => {
      const step = Math.min(Math.floor(self.progress * TOTAL), TOTAL - 1);
      showStep(step);
    }
  });

  dots.forEach((d, idx) => {
    d.addEventListener('click', () => {
      if (!stInstance) return;
      const totalScroll = stInstance.end - stInstance.start;
      const targetScroll = stInstance.start + (idx / (TOTAL - 1)) * totalScroll;
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    });
  });
}

/* ==========================================================================
   06. SECTION 04 — THE SYSTEM (ORBIT CAROUSEL, SILK CANVAS & MAGIC RINGS)
   ========================================================================== */
function initSystem() {
  const section = document.getElementById('system-section');
  const canvas = document.getElementById('silk-canvas');
  if (!section) return;

  // 1. 2D Silk Wave Harmonic Canvas
  // 1. Interactive 3D Liquid Mesh Silk Wave Engine
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height, t = 0;

    function resizeSilk() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = (window.innerWidth < 992) ? (section.offsetHeight || 380) : window.innerHeight;
    }
    window.addEventListener('resize', resizeSilk);
    resizeSilk();

    const mouse = { x: -1000, y: -1000, active: false };
    section.addEventListener('mousemove', (e) => {
      const rect = section.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    });
    section.addEventListener('mouseleave', () => {
      mouse.active = false;
    });

    const ribbons = [
      {
        yBase: height * 0.28,
        amp1: 75, freq1: 0.0016, speed1: 0.8,
        amp2: 40, freq2: 0.0030, speed2: 1.2,
        thickBase: 90, thickAmp: 40, thickFreq: 0.0020,
        h1: 245, h2: 275, alpha: 0.26, lines: 6
      },
      {
        yBase: height * 0.44,
        amp1: 90, freq1: 0.0012, speed1: -1.0,
        amp2: 50, freq2: 0.0024, speed2: 0.9,
        thickBase: 110, thickAmp: 50, thickFreq: 0.0015,
        h1: 195, h2: 245, alpha: 0.24, lines: 7
      },
      {
        yBase: height * 0.58,
        amp1: 80, freq1: 0.0022, speed1: 1.1,
        amp2: 45, freq2: 0.0016, speed2: -0.8,
        thickBase: 95, thickAmp: 35, thickFreq: 0.0026,
        h1: 320, h2: 270, alpha: 0.22, lines: 6
      },
      {
        yBase: height * 0.38,
        amp1: 100, freq1: 0.0014, speed1: -0.7,
        amp2: 45, freq2: 0.0033, speed2: 1.3,
        thickBase: 80, thickAmp: 40, thickFreq: 0.0018,
        h1: 260, h2: 310, alpha: 0.20, lines: 5
      },
      {
        yBase: height * 0.68,
        amp1: 85, freq1: 0.0019, speed1: 0.9,
        amp2: 35, freq2: 0.0027, speed2: -1.1,
        thickBase: 100, thickAmp: 45, thickFreq: 0.0022,
        h1: 165, h2: 210, alpha: 0.22, lines: 6
      }
    ];

    function drawSilk() {
      t += 0.007;
      ctx.clearRect(0, 0, width, height);

      ribbons.forEach((r) => {
        const topPts = [];
        const botPts = [];

        for (let x = -30; x <= width + 30; x += 10) {
          const wave1 = Math.sin(x * r.freq1 + t * r.speed1) * r.amp1;
          const wave2 = Math.cos(x * r.freq2 + t * r.speed2) * r.amp2;
          const yTop = r.yBase + wave1 + wave2;
          const thickness = r.thickBase + Math.sin(x * r.thickFreq + t * r.speed1 * 1.4) * r.thickAmp;
          const yBot = yTop + thickness;

          topPts.push({ x, y: yTop });
          botPts.push({ x, y: yBot });
        }

        // 1. Draw smooth ribbon body fill
        ctx.beginPath();
        ctx.moveTo(topPts[0].x, topPts[0].y);
        for (let i = 1; i < topPts.length; i++) ctx.lineTo(topPts[i].x, topPts[i].y);
        for (let i = botPts.length - 1; i >= 0; i--) ctx.lineTo(botPts[i].x, botPts[i].y);
        ctx.closePath();

        const grad = ctx.createLinearGradient(0, r.yBase - 80, width, r.yBase + 120);
        const shiftHue1 = (r.h1 + Math.sin(t * 0.4) * 20) % 360;
        const shiftHue2 = (r.h2 + Math.cos(t * 0.4) * 20) % 360;
        grad.addColorStop(0, `hsla(${shiftHue1}, 85%, 62%, ${r.alpha})`);
        grad.addColorStop(1, `hsla(${shiftHue2}, 85%, 62%, ${r.alpha * 0.85})`);
        ctx.fillStyle = grad;
        ctx.fill();

        // 2. Draw 3D inner silk fiber contour lines
        for (let l = 1; l < r.lines; l++) {
          const factor = l / r.lines;
          ctx.beginPath();
          for (let i = 0; i < topPts.length; i++) {
            const lx = topPts[i].x;
            const ly = topPts[i].y + (botPts[i].y - topPts[i].y) * factor;
            if (i === 0) ctx.moveTo(lx, ly);
            else ctx.lineTo(lx, ly);
          }
          const lineAlpha = (1 - Math.abs(factor - 0.5) * 1.6) * 0.35;
          ctx.strokeStyle = `hsla(${shiftHue1}, 90%, 65%, ${lineAlpha})`;
          ctx.lineWidth = 1.0;
          ctx.stroke();
        }
      });

      requestAnimationFrame(drawSilk);
    }
    drawSilk();
  }

  // 2. MagicRings WebGL Integration
  const magicWrapper = document.getElementById('magic-rings-wrapper');
  if (magicWrapper && typeof createMagicRings === 'function') {
    createMagicRings(magicWrapper, {
      color: '#b44fff',
      colorTwo: '#42ccff',
      ringCount: 3,
      speed: 0.8,
      attenuation: 14,
      lineThickness: 2.5,
      baseRadius: 0.22,
      radiusStep: 0.12,
      scaleRate: 0.08,
      opacity: 1
    });
  }

  // 3. GSAP Circular Orbit Rotation Engine (Responsive Mobile & Desktop)
  const TOTAL_NODES = 5;
  const nodes = Array.from({ length: TOTAL_NODES }, (_, i) => document.getElementById('sn-' + (i + 1))).filter(Boolean);
  const isMobile = window.innerWidth < 992;
  const RADIUS = isMobile ? 105 : 260;
  const initialAngles = [-90, -18, 54, 126, 198];
  let currentRotationVal = 0;

  function setOrbitRotation(rotationOffset) {
    currentRotationVal = rotationOffset;
    nodes.forEach((node, i) => {
      const currentAngle = initialAngles[i] - rotationOffset;
      const rad = (currentAngle * Math.PI) / 180;
      let x = RADIUS * Math.cos(rad);
      const y = RADIUS * Math.sin(rad);

      let dist = Math.abs((currentAngle - -90) % 360);
      if (dist > 180) dist = 360 - dist;

      const isActive = dist < 25;

      if (isMobile && isActive) {
        x = 0;
      }

      gsap.set(node, {
        x: x,
        y: y,
        scale: isActive ? (isMobile ? 1.05 : 1) : isMobile ? 0.75 : 0.88,
        opacity: isActive ? 1 : dist < 80 ? (isMobile ? 0.5 : 0.75) : (isMobile ? 0.25 : 0.5),
        zIndex: isActive ? 30 : 5
      });

      if (isActive) {
        node.classList.add('active-spotlight');
        const indicators = document.querySelectorAll('.system-ind-item');
        indicators.forEach((ind, indIdx) => {
          if (indIdx === i) ind.classList.add('active');
          else ind.classList.remove('active');
        });
      } else {
        node.classList.remove('active-spotlight');
      }
    });
  }

  setOrbitRotation(0);

  if (!isMobile) {
    // Desktop View Only: GSAP ScrollTrigger Pinned Timeline
    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=180%',
      pin: true,
      scrub: true,
      anticipatePin: 1,
      preventOverlaps: true,
      fastScrollEnd: true,
      onLeaveBack: () => {
        setOrbitRotation(0);
      },
      onUpdate: (self) => {
        const currentRotation = self.progress * (TOTAL_NODES - 1) * 72;
        setOrbitRotation(currentRotation);
      }
    });
  } else {
    // Mobile View Touch Swipe Navigation
    const orbitStage = document.getElementById('orbit-stage');
    if (orbitStage) {
      let startX = 0;
      let activeIndex = 0;
      orbitStage.addEventListener('touchstart', (e) => {
        startX = e.changedTouches[0].screenX;
      }, { passive: true });
      orbitStage.addEventListener('touchend', (e) => {
        const endX = e.changedTouches[0].screenX;
        if (startX - endX > 35 && activeIndex < TOTAL_NODES - 1) {
          activeIndex++;
          rotateToStage(activeIndex);
        } else if (endX - startX > 35 && activeIndex > 0) {
          activeIndex--;
          rotateToStage(activeIndex);
        }
      }, { passive: true });
    }
  }

  const stageLabels = [
    'ENGAGE — Show Interest',
    'CAPTURE — Become a Lead',
    'NURTURE — Keep Moving',
    'CLOSE — Talk to Sales',
    'ATTRACT — Get Found'
  ];

  let currentMobileStage = 0;

  function updateMobileNextBtn(idx) {
    currentMobileStage = idx;
    const nextBtn = document.getElementById('system-next-btn');
    if (nextBtn) {
      if (window.innerWidth < 992) {
        nextBtn.innerHTML = `<span>Next</span> <i class="bi bi-arrow-right ms-1"></i>`;
      } else {
        const nextTitle = stageLabels[idx] || 'Next Stage';
        nextBtn.innerHTML = `<span>Next: ${nextTitle}</span> <i class="bi bi-arrow-right ms-1"></i>`;
      }
    }
  }

  function rotateToStage(idx) {
    const targetRotation = idx * 72;
    updateMobileNextBtn(idx);
    gsap.to({ val: currentRotationVal }, {
      val: targetRotation,
      duration: 0.6,
      ease: 'power2.out',
      onUpdate: function () {
        setOrbitRotation(this.targets()[0].val);
      }
    });
  }

  const sysNextBtn = document.getElementById('system-next-btn');
  if (sysNextBtn) {
    sysNextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const nextIdx = (currentMobileStage + 1) % TOTAL_NODES;
      rotateToStage(nextIdx);
    });
  }

  nodes.forEach((node, idx) => {
    node.addEventListener('click', () => {
      rotateToStage(idx);
    });
  });

  const indicators = document.querySelectorAll('.system-ind-item');
  indicators.forEach((ind) => {
    ind.addEventListener('click', function () {
      const stageIdx = parseInt(this.getAttribute('data-stage'));
      if (!isNaN(stageIdx)) {
        rotateToStage(stageIdx);
      }
    });
  });
}

/* ==========================================================================
   07. SECTION 05 — CREATIVE MARKETING (CLOCKS & PROGRESSIVE TAGS)
   ========================================================================== */
function initCreative() {
  const section = document.getElementById('creative');
  if (!section) return;

  const DATA = [
    { slide: 'slide-1', step: 'step-0', dot: 'dot-0', type: 'FB / IG CREATIVE' },
    { slide: 'slide-2', step: 'step-1', dot: 'dot-1', type: 'GOOGLE SEARCH AD' },
    { slide: 'slide-3', step: 'step-2', dot: 'dot-2', type: 'LANDING PAGE' }
  ];

  const REVEAL_MAP = [
    ['vtag-strategy', 'vtag-creative', 'vtag-social'],
    ['vtag-search'],
    ['vtag-paid']
  ];

  let maxStepReached = -1;

  function revealTagsForStep(idx) {
    if (idx <= maxStepReached) return;
    for (let step = maxStepReached + 1; step <= idx; step++) {
      const tags = REVEAL_MAP[step] || [];
      tags.forEach((tagId, tagIdx) => {
        const el = document.getElementById(tagId);
        if (el && !el.classList.contains('revealed')) {
          setTimeout(() => el.classList.add('revealed'), tagIdx * 140);
        }
      });
    }
    maxStepReached = idx;
  }

  function goTo(idx) {
    DATA.forEach((d, i) => {
      const slideEl = document.getElementById(d.slide);
      const stepEl = document.getElementById(d.step);
      const dotEl = document.getElementById(d.dot);
      if (slideEl) slideEl.classList.toggle('active', i === idx);
      if (stepEl) stepEl.classList.toggle('active', i === idx);
      if (dotEl) dotEl.classList.toggle('active', i === idx);
    });
    revealTagsForStep(idx);
    const cardType = document.getElementById('card-type');
    if (cardType) cardType.textContent = DATA[idx].type;
  }

  function updateClock(prog) {
    let mins = prog <= 0.5 ? 581 + (prog / 0.5) * 4 : 585 + ((prog - 0.5) / 0.5) * 2;
    const hh = String(Math.floor(mins / 60)).padStart(2, '0');
    const mm = String(Math.floor(mins % 60)).padStart(2, '0');

    const hoursEl = document.getElementById('flip-hours-num');
    const minutesEl = document.getElementById('flip-minutes-num');
    const cardTime = document.getElementById('card-time');

    if (hoursEl && hoursEl.textContent !== hh) hoursEl.textContent = hh;
    if (minutesEl && minutesEl.textContent !== mm) minutesEl.textContent = mm;
    if (cardTime) cardTime.textContent = `${hh}:${mm}`;

    const hourHand = document.getElementById('analog-hour');
    const minuteHand = document.getElementById('analog-minute');
    const secondHand = document.getElementById('analog-second');

    if (hourHand) hourHand.style.transform = `rotate(${((mins / 60) % 12) * 30}deg)`;
    if (minuteHand) minuteHand.style.transform = `rotate(${(mins % 60) * 6}deg)`;
    if (secondHand) secondHand.style.transform = `rotate(${(prog * 360 * 12) % 360}deg)`;
  }

  const isMobile = window.innerWidth < 992;
  if (isMobile) {
    ['vtag-strategy', 'vtag-creative', 'vtag-social', 'vtag-search', 'vtag-paid'].forEach((tagId) => {
      const el = document.getElementById(tagId);
      if (el) el.classList.add('revealed');
    });
  }

  function onScroll() {
    if (window.innerWidth < 992) return;

    const top = section.getBoundingClientRect().top;
    const h = section.offsetHeight;
    const vh = window.innerHeight;
    const p = Math.max(0, Math.min(1, -top / Math.max(h - vh, 1)));

    updateClock(p);
    if (p < 0.34) goTo(0);
    else if (p < 0.67) goTo(1);
    else goTo(2);
  }

  if (!isMobile) {
    DATA.forEach((d, i) => {
      const stepEl = document.getElementById(d.step);
      if (stepEl) stepEl.addEventListener('click', () => goTo(i));
    });

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }
}

/* ==========================================================================
   08. SECTION 06 — AUTOMATION ENGINE & IN-PLACE LOG SIMULATOR
   ========================================================================== */
function initAutomation() {
  const playBtn = document.getElementById('play-automation-btn');
  const logContainer = document.getElementById('automation-log');
  if (!playBtn || !logContainer) return;

  let autoTimeouts = [];

  playBtn.onclick = function (e) {
    e.preventDefault();
    autoTimeouts.forEach(clearTimeout);
    autoTimeouts = [];

    const nodeCards = document.querySelectorAll('.workflow-node-card');
    const logItems = logContainer.querySelectorAll('.workflow-log-item');
    const statusText = document.getElementById('scroll-status-text');

    playBtn.disabled = true;
    playBtn.innerHTML = '<i class="bi bi-arrow-repeat spin me-1"></i> RUNNING FLOW...';

    logItems.forEach((item) => { item.style.display = 'none'; });
    nodeCards.forEach((node) => { node.classList.remove('active'); });

    logItems.forEach((item, index) => {
      const t = setTimeout(() => {
        item.style.display = 'flex';
        const activeNode = document.getElementById(`wf-node-${index + 1}`);
        if (activeNode) activeNode.classList.add('active');
        if (statusText) statusText.textContent = `STEP 0${index + 1} EXECUTED`;
        logContainer.scrollTop = logContainer.scrollHeight;

        if (index === logItems.length - 1) {
          const finalT = setTimeout(() => {
            playBtn.disabled = false;
            playBtn.innerHTML = '<i class="bi bi-play-fill fs-5 me-1"></i> REPLAY AUTOMATION';
            if (statusText) statusText.textContent = 'AUTOMATION COMPLETE';
            if (typeof confetti !== 'undefined') {
              confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
            }
          }, 400);
          autoTimeouts.push(finalT);
        }
      }, index * 750);
      autoTimeouts.push(t);
    });
  };
}

/* ==========================================================================
   09. SECTION 07 — FINCHBYTE TECHNOLOGY (KANBAN DRAG & DROP & PARTICLES)
   ========================================================================== */
function initTechnology() {
  const canvas = document.getElementById('antigravity-canvas');
  const section = document.getElementById('technology');
  const cards = document.querySelectorAll('#technology .kanban-card');
  const cols = document.querySelectorAll('#technology .kanban-col');

  // 1. Antigravity Particle Engine
  if (canvas && section) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = section.offsetWidth);
    let height = (canvas.height = section.offsetHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = section.offsetWidth;
      height = canvas.height = section.offsetHeight;
    });

    const mouse = { x: -1000, y: -1000 };
    section.addEventListener('mousemove', (e) => {
      const rect = section.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });
    section.addEventListener('mouseleave', () => {
      mouse.x = -1000;
      mouse.y = -1000;
    });

    const particles = [];
    const count = Math.min(50, Math.floor((width * height) / 15000));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -(Math.random() * 0.6 + 0.2),
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.4 + 0.3
      });
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (1 - dist / 120) * 2.5;
          const angle = Math.atan2(dy, dx);
          p.x += Math.cos(angle) * force;
          p.y += Math.sin(angle) * force;
        }

        if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(79, 70, 229, ${p.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const ldx = p.x - p2.x;
          const ldy = p.y - p2.y;
          const ldist = Math.sqrt(ldx * ldx + ldy * ldy);
          if (ldist < 80) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(79, 70, 229, ${(1 - ldist / 80) * 0.2})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // 2. HTML5 Drag & Drop CRM Pipeline
  let draggedCard = null;
  cards.forEach((c) => {
    c.setAttribute('draggable', 'true');
    c.addEventListener('dragstart', (e) => {
      draggedCard = c;
      c.classList.add('dragging');
      e.dataTransfer.setData('text/plain', '');
    });
    c.addEventListener('dragend', () => {
      draggedCard = null;
      c.classList.remove('dragging');
      cols.forEach((col) => col.classList.remove('drag-over'));
    });
  });

  cols.forEach((col) => {
    col.addEventListener('dragover', (e) => {
      e.preventDefault();
      col.classList.add('drag-over');
    });
    col.addEventListener('dragleave', () => col.classList.remove('drag-over'));
    col.addEventListener('drop', (e) => {
      e.preventDefault();
      col.classList.remove('drag-over');
      if (draggedCard) {
        col.appendChild(draggedCard);
        const stage = col.getAttribute('data-stage') || '';
        draggedCard.classList.remove('qualified', 'won');
        if (stage === 'QUALIFIED') draggedCard.classList.add('qualified');
        else if (stage === 'WON') {
          draggedCard.classList.add('won');
          if (typeof confetti !== 'undefined') {
            confetti({ particleCount: 65, spread: 75, origin: { y: 0.7 } });
          }
        }
      }
    });
  });
}

/* ==========================================================================
   10. SECTION 08 — PEOPLE (2x2 PUZZLE ASSEMBLY & SEQUENTIAL TAG WAVE)
   ========================================================================== */
function initPeople() {
  const section = document.getElementById('people');
  const badges = document.querySelectorAll('#team-drift-badges .drift-badge');
  const tiles = document.querySelectorAll('.puzzle-tile');
  if (!section || !tiles.length) return;

  function assemblePuzzle() {
    gsap.fromTo('.tile-tl', { x: -280, y: -240, rotate: -35, scale: 0.5, opacity: 0 }, { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, duration: 1.2, ease: 'back.out(1.2)' });
    gsap.fromTo('.tile-tr', { x: 280, y: -240, rotate: 35, scale: 0.5, opacity: 0 }, { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, duration: 1.2, ease: 'back.out(1.2)', delay: 0.05 });
    gsap.fromTo('.tile-bl', { x: -280, y: 240, rotate: -40, scale: 0.5, opacity: 0 }, { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, duration: 1.2, ease: 'back.out(1.2)', delay: 0.1 });
    gsap.fromTo('.tile-br', { x: 280, y: 240, rotate: 40, scale: 0.5, opacity: 0 }, { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, duration: 1.2, ease: 'back.out(1.2)', delay: 0.15 });
  }

  ScrollTrigger.create({
    trigger: section,
    start: 'top 80%',
    once: true,
    onEnter: assemblePuzzle
  });

  // Sequential Tag Wave Loop
  if (badges.length) {
    let activeTag = 0;
    let isHovering = false;

    section.addEventListener('mouseenter', () => { isHovering = true; });
    section.addEventListener('mouseleave', () => { isHovering = false; });

    setInterval(() => {
      if (isHovering) return;
      badges.forEach((b) => b.classList.remove('active-wave'));
      badges[activeTag].classList.add('active-wave');
      activeTag = (activeTag + 1) % badges.length;
    }, 900);
  }
}

/* ==========================================================================
   11. SECTION 09 — PIPELINE (VELOCITY METRIC RECALCULATOR & KANBAN)
   ========================================================================== */
function initPipeline() {
  const filterBtns = document.querySelectorAll('#pipeline .filter-pill-btn');
  const cards = document.querySelectorAll('#pipeline .kanban-deal-card');
  const valPipeline = document.getElementById('val-pipeline');
  const valWinRate = document.getElementById('val-win-rate');
  const valCycle = document.getElementById('val-cycle-time');
  const valActive = document.getElementById('val-active-deals');

  if (!filterBtns.length || !cards.length) return;

  function filterKanban(source) {
    let totalVal = 0, totalCount = 0, wonCount = 0, totalCycle = 0;

    cards.forEach((c) => {
      const cSource = c.getAttribute('data-source');
      const cVal = parseFloat(c.getAttribute('data-value')) || 0;
      const cCycle = parseFloat(c.getAttribute('data-cycle')) || 0;
      const isWon = c.getAttribute('data-stage') === 'won';

      if (source === 'all' || cSource === source) {
        c.classList.remove('filtered-out');
        totalCount++;
        totalVal += cVal;
        totalCycle += cCycle;
        if (isWon) wonCount++;
      } else {
        c.classList.add('filtered-out');
      }
    });

    if (valPipeline) {
      valPipeline.textContent = `₹${(totalVal / 100000).toFixed(1)}L`;
      valPipeline.classList.add('animate-pulse-update');
      setTimeout(() => valPipeline.classList.remove('animate-pulse-update'), 450);
    }
    if (valWinRate) valWinRate.textContent = totalCount ? `${((wonCount / totalCount) * 100).toFixed(1)}%` : '0.0%';
    if (valCycle) valCycle.textContent = totalCount ? `${(totalCycle / totalCount).toFixed(1)} Days` : '0 Days';
    if (valActive) valActive.textContent = `${totalCount} Leads`;
  }

  // Dynamic Section Grid Canvas Engine for #pipeline
  const pipeCanvas = document.getElementById('pipeline-grid-canvas');
  const pipeSection = document.getElementById('pipeline');
  if (pipeCanvas && pipeSection) {
    const ctx = pipeCanvas.getContext('2d');
    let w = (pipeCanvas.width = pipeSection.offsetWidth);
    let h = (pipeCanvas.height = pipeSection.offsetHeight);

    function resizePipeCanvas() {
      if (!pipeSection) return;
      w = pipeCanvas.width = pipeSection.offsetWidth;
      h = pipeCanvas.height = pipeSection.offsetHeight;
    }
    window.addEventListener('resize', resizePipeCanvas);

    const mouse = { x: -1000, y: -1000, active: false };
    pipeSection.addEventListener('mousemove', (e) => {
      const rect = pipeSection.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    });
    pipeSection.addEventListener('mouseleave', () => {
      mouse.active = false;
    });

    let t = 0;
    const GRID_SIZE = 44;

    function drawPipeGrid() {
      t += 0.012;
      ctx.clearRect(0, 0, w, h);

      const cols = Math.ceil(w / GRID_SIZE) + 1;
      const rows = Math.ceil(h / GRID_SIZE) + 1;

      // Draw glowing intersection nodes on mouse hover
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const px = c * GRID_SIZE;
          const py = r * GRID_SIZE;

          if (mouse.active) {
            const dx = mouse.x - px;
            const dy = mouse.y - py;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 180) {
              const alpha = (1 - dist / 180) * 0.65;
              ctx.save();
              ctx.beginPath();
              ctx.arc(px, py, 2.5, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(79, 70, 229, ${alpha})`;
              ctx.shadowColor = '#4f46e5';
              ctx.shadowBlur = 8;
              ctx.fill();
              ctx.restore();
            }
          }
        }
      }

      // Dynamic light beam scan line moving vertically across grid
      const scanY = ((t * 80) % (h + 100)) - 50;
      const scanGrad = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
      scanGrad.addColorStop(0, 'rgba(79, 70, 229, 0)');
      scanGrad.addColorStop(0.5, 'rgba(79, 70, 229, 0.12)');
      scanGrad.addColorStop(1, 'rgba(79, 70, 229, 0)');
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 30, w, 60);

      requestAnimationFrame(drawPipeGrid);
    }
    drawPipeGrid();
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', function () {
      filterBtns.forEach((b) => b.classList.remove('active'));
      this.classList.add('active');
      filterKanban(this.getAttribute('data-source'));
    });
  });
}

/* ==========================================================================
   12. SECTIONS 10 & 11 — REVENUE VIEW & INTELLIGENCE LOOP
   ========================================================================== */
function initRevenueAndLearning() {
  const countUpElements = document.querySelectorAll('.count-up');
  countUpElements.forEach((el) => {
    const target = parseInt(el.getAttribute('data-target') || '0', 10);
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        let obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power1.out',
          onUpdate: () => {
            el.innerText = prefix + Math.floor(obj.val).toLocaleString() + suffix;
          }
        });
      }
    });
  });
}

/* ==========================================================================
   13. SECTION 12 — REAL RESULTS (3D ARC CAROUSEL & WHEEL CONTROLLER)
   ========================================================================== */
function initResults() {
  const section = document.getElementById('results');
  const arcStage = document.getElementById('arcStage');
  const arcCards = document.querySelectorAll('.arc-card-item');
  if (!arcStage || !arcCards.length) return;

  // Dynamic Light-Theme Glowing Laser Thread Wave Engine
  const webCanvas = document.getElementById('web-thread-canvas');
  if (webCanvas && section) {
    const ctx = webCanvas.getContext('2d');
    let w = (webCanvas.width = section.offsetWidth);
    let h = (webCanvas.height = section.offsetHeight);

    function resize() {
      if (!section) return;
      w = webCanvas.width = section.offsetWidth;
      h = webCanvas.height = section.offsetHeight;
    }
    window.addEventListener('resize', resize);

    const mouse = { x: -1000, y: -1000, active: false, targetX: -1000, targetY: -1000 };
    section.addEventListener('mousemove', (e) => {
      const rect = section.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    });
    section.addEventListener('mouseleave', () => {
      mouse.active = false;
    });

    let time = 0;
    const HEX_RADIUS = 32;
    const HEX_WIDTH = Math.sqrt(3) * HEX_RADIUS;
    const HEX_VERT_SPACING = 1.5 * HEX_RADIUS;

    function drawHexagon(cx, cy, r) {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const x = cx + r * Math.sin(angle);
        const y = cy + r * Math.cos(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
    }

    function drawHexagonGrid() {
      ctx.clearRect(0, 0, w, h);
      time += 0.012;

      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;
      }

      const cols = Math.ceil(w / HEX_WIDTH) + 2;
      const rows = Math.ceil(h / HEX_VERT_SPACING) + 2;

      ctx.lineWidth = 1.0;

      for (let row = -1; row <= rows; row++) {
        for (let col = -1; col <= cols; col++) {
          const cx = col * HEX_WIDTH + (row % 2 === 0 ? 0 : HEX_WIDTH / 2);
          const cy = row * HEX_VERT_SPACING;

          // 1. Crisp light hexagon outline
          drawHexagon(cx, cy, HEX_RADIUS);
          ctx.strokeStyle = `rgba(129, 140, 248, 0.16)`;
          ctx.stroke();

          // 2. Interactive cursor glow highlight
          if (mouse.active) {
            const dx = mouse.x - cx;
            const dy = mouse.y - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 180) {
              const alpha = (1 - dist / 180) * 0.35;
              ctx.fillStyle = `rgba(79, 70, 229, ${alpha})`;
              ctx.fill();

              // Glowing center node point
              ctx.save();
              ctx.beginPath();
              ctx.arc(cx, cy, 2.2, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(79, 70, 229, ${alpha * 2})`;
              ctx.shadowColor = '#4f46e5';
              ctx.shadowBlur = 8;
              ctx.fill();
              ctx.restore();
            }
          }
        }
      }

      requestAnimationFrame(drawHexagonGrid);
    }

    drawHexagonGrid();
  }

  let activeIndex = 0;
  const totalCards = arcCards.length;
  const angleStep = 20;

  function updateArc(targetIndex) {
    activeIndex = Math.max(0, Math.min(totalCards - 1, targetIndex));
    arcCards.forEach((card, index) => {
      const offset = index - activeIndex;
      const angle = offset * 22;
      const absOffset = Math.abs(offset);

      if (absOffset === 0) {
        // Active center card
        card.classList.remove('is-hidden');
        card.classList.add('is-active');
        card.classList.remove('is-inactive');
        card.style.transform = `rotate(0deg) scale(1.05) translateY(0px)`;
        card.style.zIndex = '10';
        card.style.opacity = '1';
        card.style.pointerEvents = 'all';
      } else if (absOffset === 1) {
        // 1 Card preview on left or right
        card.classList.remove('is-hidden');
        card.classList.remove('is-active');
        card.classList.add('is-inactive');
        card.style.transform = `rotate(${angle}deg) scale(0.88) translateY(16px)`;
        card.style.zIndex = '4';
        card.style.opacity = '0.85';
        card.style.pointerEvents = 'all';
      } else {
        // All other cards hidden to prevent overlap and duplicate appearance
        card.classList.add('is-hidden');
        card.classList.remove('is-active');
        card.classList.remove('is-inactive');
        card.style.transform = `rotate(${angle}deg) scale(0.65) translateY(30px)`;
        card.style.zIndex = '1';
        card.style.opacity = '0';
        card.style.pointerEvents = 'none';
      }
    });
  }

  // Sticky scroll driver progression (zero pin-spacer or white blank gap)
  function onScroll() {
    if (window.innerWidth < 992) return;
    const top = section.getBoundingClientRect().top;
    const maxScroll = section.offsetHeight - window.innerHeight;
    if (maxScroll <= 0) return;
    const p = Math.max(0, Math.min(1, -top / maxScroll));
    const idx = Math.min(Math.floor(p * totalCards), totalCards - 1);
    if (idx !== activeIndex) {
      updateArc(idx);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Click card directly to center it
  arcCards.forEach((card) => {
    card.addEventListener('click', function () {
      const idx = parseInt(this.getAttribute('data-index'));
      if (!isNaN(idx)) {
        updateArc(idx);
      }
    });
  });

  // Wheel interaction
  let isWheelScrolling = false;
  arcStage.addEventListener('wheel', (e) => {
    if (isWheelScrolling) return;
    if (e.deltaY > 20 || e.deltaX > 20) {
      if (activeIndex < totalCards - 1) {
        updateArc(activeIndex + 1);
        isWheelScrolling = true;
        setTimeout(() => { isWheelScrolling = false; }, 300);
      }
    } else if (e.deltaY < -20 || e.deltaX < -20) {
      if (activeIndex > 0) {
        updateArc(activeIndex - 1);
        isWheelScrolling = true;
        setTimeout(() => { isWheelScrolling = false; }, 300);
      }
    }
  }, { passive: true });

  updateArc(0);
}

/* ==========================================================================
   14. SECTION 13 — PARTNERSHIP (ROADMAP HOVER DYNAMICS)
   ========================================================================== */
function initPartnership() {
  // Built with CSS transitions
}

/* ==========================================================================
   15. SECTION 14 — MARKETING FUNNEL (3D CONE FUNNEL)
   ========================================================================== */
function initMarketingFunnel() {
  const driver = document.getElementById('sd-mktg');
  const slices = document.querySelectorAll('.mktg-slice');
  const statsEl = document.getElementById('fst-mktg');
  const glowEl = document.getElementById('fBaseGlow-mktg');
  if (!driver || !slices.length) return;

  if (window.innerWidth < 992) {
    slices.forEach((sl) => {
      sl.style.opacity = '1';
      sl.style.transform = 'none';
    });
    if (statsEl) {
      statsEl.style.opacity = '1';
      statsEl.style.transform = 'none';
    }
    if (glowEl) glowEl.style.opacity = '1';
    return;
  }

  const N = slices.length; // 8

  function tick() {
    const top = driver.getBoundingClientRect().top;
    const maxSc = driver.offsetHeight - window.innerHeight;
    const scrolled = Math.max(0, -top);
    const prog = maxSc > 0 ? Math.min(1, scrolled / maxSc) : 0;
    const sp = prog * (N + 0.6);

    slices.forEach((sl, i) => {
      const lp = Math.min(1, Math.max(0, (sp - i) / 0.5));
      sl.style.opacity = lp;
      sl.style.transform = `translateY(${(1 - lp) * -24}px)`;
    });

    const stp = Math.min(1, Math.max(0, (sp - N + 0.4) / 0.5));
    if (statsEl) {
      statsEl.style.opacity = stp;
      statsEl.style.transform = `translateY(${(1 - stp) * 12}px)`;
    }
    if (glowEl) glowEl.style.opacity = stp;
  }

  window.addEventListener('scroll', tick, { passive: true });
  tick();
}

/* ==========================================================================
   16. SECTION 15 — SALES FUNNEL (3D CYAN-TO-EMERALD FUNNEL)
   ========================================================================== */
function initSalesFunnel() {
  const driver = document.getElementById('sd-sales');
  const slices = document.querySelectorAll('.sales-slice');
  const statsEl = document.getElementById('fst-sales');
  const glowEl = document.getElementById('fBaseGlow-sales');
  const closedWon = document.getElementById('closedWonSlice');
  if (!driver || !slices.length) return;

  if (window.innerWidth < 992) {
    slices.forEach((sl) => {
      sl.style.opacity = '1';
      sl.style.transform = 'none';
    });
    if (closedWon) closedWon.classList.add('won-active');
    if (statsEl) {
      statsEl.style.opacity = '1';
      statsEl.style.transform = 'none';
    }
    if (glowEl) glowEl.style.opacity = '1';
    return;
  }

  const N = slices.length; // 8

  function tick() {
    const top = driver.getBoundingClientRect().top;
    const maxSc = driver.offsetHeight - window.innerHeight;
    const scrolled = Math.max(0, -top);
    const prog = maxSc > 0 ? Math.min(1, scrolled / maxSc) : 0;
    const sp = prog * (N + 0.6);

    slices.forEach((sl, i) => {
      const lp = Math.min(1, Math.max(0, (sp - i) / 0.5));
      sl.style.opacity = lp;
      sl.style.transform = `translateY(${(1 - lp) * -24}px)`;
    });

    if (closedWon) {
      const wonP = Math.min(1, Math.max(0, (sp - 5) / 0.5));
      closedWon.classList.toggle('won-active', wonP >= 1);
    }

    const stp = Math.min(1, Math.max(0, (sp - N + 0.4) / 0.5));
    if (statsEl) {
      statsEl.style.opacity = stp;
      statsEl.style.transform = `translateY(${(1 - stp) * 12}px)`;
    }
    if (glowEl) glowEl.style.opacity = stp;
  }

  window.addEventListener('scroll', tick, { passive: true });
  tick();
}
