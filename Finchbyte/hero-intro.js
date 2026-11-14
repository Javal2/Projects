/* ==========================================================================
   HERO INTRO ANIMATION & SCROLLING EFFECT (INDIVIDUAL SCRIPT FOR SECTION 01)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Register GSAP Plugins
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Lenis Smooth Scroll & ScrollTrigger sync
  let lenis;
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

  // Navbar Scroll Behavior
  const navbar = document.querySelector('.navbar-finch');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Initialize Hero Flow & Live Sales Engine Simulator
  initCinematicHeroFlow();
  initLiveSalesSimulator();
});

/* ==========================================================================
   CINEMATIC HERO ENGINE: TYPEWRITER, MATTER.JS PHYSICS & SCROLLING EFFECT
   ========================================================================== */
function initCinematicHeroFlow() {
  const logoElem = document.getElementById('typewriter-logo');
  const container = document.getElementById('matter-canvas-container');
  const revealElem = document.getElementById('hero-content-reveal');
  const heroWrapper = document.getElementById('hero-pin-wrapper');

  if (!logoElem || !revealElem) return;

  const brandText = "FINCHBYTE";
  const isMobile = window.innerWidth < 992;

  if (isMobile) {
    if (container) container.style.display = 'none';

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

          revealElem.classList.add('active');
          revealElem.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
          revealElem.style.opacity = '1';
          revealElem.style.transform = 'translateY(0)';
        }, 600);
      }
    }, 110);

    return;
  }

  logoElem.innerHTML = '';

  // Append characters
  brandText.split('').forEach((char) => {
    const span = document.createElement('span');
    span.className = 'typewriter-char';
    span.innerText = char;
    logoElem.appendChild(span);
  });

  // Append glowing typewriter cursor
  const cursor = document.createElement('span');
  cursor.className = 'typewriter-cursor';
  logoElem.appendChild(cursor);

  const chars = logoElem.querySelectorAll('.typewriter-char');

  // SplitType words for headline if available
  const headline = document.querySelector('#hero-headline');
  if (headline && typeof SplitType !== 'undefined') {
    new SplitType(headline, { types: 'words' });
    const words = headline.querySelectorAll('.word');
    words.forEach((w) => w.classList.add('word-anim'));
  }

  // Set initial states
  gsap.set(chars, { opacity: 0, y: 20, scale: 0.8, filter: 'blur(6px)' });
  if (container) gsap.set(container, { opacity: 0 });

  // 1. Initialize Matter.js Physics Container
  let engine, render, runner, bodiesList = [];
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

    const floor = Bodies.rectangle(width / 2, height + 30, width * 2, 60, { isStatic: true });
    const leftWall = Bodies.rectangle(-30, height / 2, 60, height * 2, { isStatic: true });
    const rightWall = Bodies.rectangle(width + 30, height / 2, 60, height * 2, { isStatic: true });

    Composite.add(engine.world, [floor, leftWall, rightWall]);

    const keywords = [
      'Sales', 'Marketing', 'Automation', 'Growth', 'CRM', 'Revenue',
      'Pipeline', 'Campaign', 'Lead', 'Customer', 'Conversion', 'Analytics',
      'AI', 'Workflow', 'Email', 'WhatsApp', 'Strategy', 'Performance',
      'Business', 'Follow-up', 'Opportunity', 'Scale', 'Retention',
      'Optimization', 'Funnels', 'Insights', 'Integration', 'Customer Journey'
    ];

    const colors = ['#4f46e5', '#2563eb', '#059669', '#7c3aed', '#0f172a', '#d97706'];

    keywords.forEach((word, idx) => {
      const fontSize = Math.floor(Math.random() * 6 + 14);
      const boxWidth = word.length * (fontSize * 0.65) + 26;
      const boxHeight = fontSize + 18;

      const initX = (width / (keywords.length + 1)) * (idx + 1) + (Math.random() - 0.5) * 60;
      const initY = -150 - (idx * 30) - Math.random() * 80;

      const color = colors[Math.floor(Math.random() * colors.length)];

      const body = Bodies.rectangle(initX, initY, boxWidth, boxHeight, {
        restitution: 0.5,
        friction: 0.1,
        angle: (Math.random() - 0.5) * 0.4,
        render: {
          fillStyle: 'transparent',
          strokeStyle: 'transparent',
          lineWidth: 0
        }
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

    // Custom Canvas Renderer with roundRect polyfill fallback
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
          const w = body.boxWidth, h = body.boxHeight, x = -w / 2, y = -h / 2, r = 8;
          ctx.moveTo(x + r, y);
          ctx.lineTo(x + w - r, y);
          ctx.quadraticCurveTo(x + w, y, x + w, y + r);
          ctx.lineTo(x + w, y + h - r);
          ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
          ctx.lineTo(x + r, y + h);
          ctx.quadraticCurveTo(x, y + h, x, y + h - r);
          ctx.lineTo(x, y + r);
          ctx.quadraticCurveTo(x, y, x + r, y);
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

    // Mouse Hover Repulsion Force
    const mouse = Mouse.create(render.canvas);
    render.mouse = mouse;

    Events.on(engine, 'beforeUpdate', () => {
      const mousePos = mouse.position;
      if (!mousePos || mousePos.x === undefined) return;

      bodiesList.forEach((body) => {
        const dx = body.position.x - mousePos.x;
        const dy = body.position.y - mousePos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120 && dist > 0) {
          const forceMag = (120 - dist) * 0.00025;
          const fx = (dx / dist) * forceMag;
          const fy = (dy / dist) * forceMag - 0.0001;
          Matter.Body.applyForce(body, body.position, { x: fx, y: fy });
        }
      });
    });

    // Handle Window Resize
    window.addEventListener('resize', () => {
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;
      render.canvas.width = newW;
      render.canvas.height = newH;
      Matter.Body.setPosition(floor, { x: newW / 2, y: newH + 30 });
      Matter.Body.setPosition(rightWall, { x: newW + 30, y: newH / 2 });
    });
  }

  // 2. 100% PURE SCROLL-DRIVEN SEQUENTIAL TIMELINE:
  // Phase 1 (0.00 - 0.20): Typewriter "FINCHBYTE" letter-by-letter with cursor moving dynamically
  // Phase 2 (0.20 - 0.60): Falling Physics Keyword Pills drop into canvas with extended scroll time
  // Phase 3 (0.60 - 0.75): Direct smooth fade to invisible (NO zoom/scale effect)
  // Phase 4 (0.75 - 1.00): Hero Content Reveal Overlay (Headline, CTAs, Dashboard) appears

  gsap.set(revealElem, { opacity: 0, y: 40 });

  let hasDropped = false;
  let lastCharCount = -1;

  function updateTypewriter(p) {
    const rawProgress = Math.max(0, Math.min(1, p / 0.20));
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
  }

  // Initial render at 0 scroll
  updateTypewriter(0);

  // 100% CONTINUOUS SCROLL-DRIVEN SIMULATOR CURSOR CONTROLLER
  function updateSimulatorOnScroll(p) {
    const card = document.getElementById('sales-journey-simulator');
    const cursor = document.getElementById('sim-cursor');
    const stepper = document.querySelector('.pipeline-stepper');
    const stages = document.querySelectorAll('.pipe-stage');
    const lines = document.querySelectorAll('.pipe-line');

    if (!card || !stepper || stages.length === 0) return;

    // Simulator starts AFTER hero overlay is fully revealed (p >= 0.82)
    // Reset to initial state if before that point
    if (p < 0.82) {
      const landingCTA = document.getElementById('sim-landing-cta');
      const flowContainer = document.getElementById('sim-flow-container');
      const leadCard = document.getElementById('sim-lead-card');
      const aiDetails = document.getElementById('sim-ai-details');
      const notifEmail = document.getElementById('notif-email');
      const notifWhatsapp = document.getElementById('notif-whatsapp');
      const notifMeeting = document.getElementById('notif-meeting');
      const successCard = document.getElementById('sim-success-card');
      const statusBadge = document.getElementById('sim-status-badge');
      const widgetRev = document.getElementById('sim-widget-revenue');
      const widgetLeads = document.getElementById('sim-widget-leads');
      const widgetConv = document.getElementById('sim-widget-conversion');

      if (landingCTA) { landingCTA.style.display = 'block'; landingCTA.style.opacity = '1'; }
      if (flowContainer) flowContainer.style.display = 'none';
      if (leadCard) { leadCard.style.opacity = '0'; leadCard.style.transform = 'translateY(20px)'; }
      if (aiDetails) { aiDetails.style.opacity = '0'; aiDetails.style.visibility = 'hidden'; }
      if (notifEmail) { notifEmail.style.opacity = '0'; notifEmail.style.transform = 'translateX(20px)'; }
      if (notifWhatsapp) { notifWhatsapp.style.opacity = '0'; notifWhatsapp.style.transform = 'translateX(20px)'; }
      if (notifMeeting) { notifMeeting.style.opacity = '0'; notifMeeting.style.transform = 'translateX(20px)'; }
      if (successCard) { successCard.style.opacity = '0'; successCard.style.transform = 'translate(-50%, -50%) scale(0.8)'; }
      if (statusBadge) { statusBadge.className = 'badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1 fs-8'; statusBadge.innerText = 'Status: Lead Captured'; }
      if (widgetRev) widgetRev.innerText = '$0';
      if (widgetLeads) widgetLeads.innerText = '1,284';
      if (widgetConv) widgetConv.innerText = '14.2%';
      stages.forEach((st, i) => { if (i === 0) st.classList.add('active'); else st.classList.remove('active'); });
      lines.forEach(ln => ln.classList.remove('active'));
      return;
    }

    cursor.style.opacity = '1';

    // Normalize 0.82 → 1.00 into norm 0.0 → 1.0
    const norm = Math.max(0, Math.min(1, (p - 0.82) / 0.18));

    // Calculate continuous cursor X position across pipeline stages
    const numStages = stages.length; // 6
    const exactStage = norm * (numStages - 1); // 0.0 to 5.0 continuously
    const floorIdx = Math.floor(exactStage);
    const ceilIdx = Math.min(numStages - 1, Math.ceil(exactStage));
    const frac = exactStage - floorIdx;

    const cardRect = card.getBoundingClientRect();
    const stepperRect = stepper.getBoundingClientRect();

    const stage0Rect = stages[floorIdx].getBoundingClientRect();
    const stage1Rect = stages[ceilIdx].getBoundingClientRect();

    const startX = stage0Rect.left - cardRect.left + stage0Rect.width / 2;
    const endX = stage1Rect.left - cardRect.left + stage1Rect.width / 2;

    const currentX = startX + (endX - startX) * frac;
    const currentY = stepperRect.bottom - cardRect.top + 4;

    cursor.style.left = `${currentX}px`;
    cursor.style.top = `${currentY}px`;

    // Highlight pipeline stages using same thresholds as content (so Won lights up at norm>=0.90)
    let highlightIdx = 0;
    if (norm >= 0.15) highlightIdx = 1;
    if (norm >= 0.35) highlightIdx = 2;
    if (norm >= 0.52) highlightIdx = 3;
    if (norm >= 0.72) highlightIdx = 4;
    if (norm >= 0.90) highlightIdx = 5;

    stages.forEach((st, i) => {
      if (i <= highlightIdx) st.classList.add('active');
      else st.classList.remove('active');
    });
    lines.forEach((ln, i) => {
      if (i < highlightIdx) ln.classList.add('active');
      else ln.classList.remove('active');
    });

    // Dedicated Scroll-Time Thresholds for Cards & Widgets:
    const landingCTA = document.getElementById('sim-landing-cta');
    const flowContainer = document.getElementById('sim-flow-container');
    const leadCard = document.getElementById('sim-lead-card');
    const aiDetails = document.getElementById('sim-ai-details');
    const scoreText = document.getElementById('sim-score-text');
    const ringPath = document.getElementById('sim-ring-path');
    const statusBadge = document.getElementById('sim-status-badge');
    const notifEmail = document.getElementById('notif-email');
    const notifWhatsapp = document.getElementById('notif-whatsapp');
    const notifMeeting = document.getElementById('notif-meeting');
    const successCard = document.getElementById('sim-success-card');
    const widgetRev = document.getElementById('sim-widget-revenue');
    const widgetLeads = document.getElementById('sim-widget-leads');
    const widgetConv = document.getElementById('sim-widget-conversion');

    // Threshold 0: Initial Visitor CTA (norm < 0.15)
    if (norm < 0.15) {
      if (landingCTA) { landingCTA.style.display = 'block'; landingCTA.style.opacity = '1'; }
      if (flowContainer) flowContainer.style.display = 'none';
      if (leadCard) leadCard.style.opacity = '0';
      if (aiDetails) { aiDetails.style.opacity = '0'; aiDetails.style.visibility = 'hidden'; }
      if (notifEmail) { notifEmail.style.opacity = '0'; notifEmail.style.transform = 'translateX(20px)'; }
      if (notifWhatsapp) { notifWhatsapp.style.opacity = '0'; notifWhatsapp.style.transform = 'translateX(20px)'; }
      if (notifMeeting) { notifMeeting.style.opacity = '0'; notifMeeting.style.transform = 'translateX(20px)'; }
      if (successCard) { successCard.style.opacity = '0'; successCard.style.transform = 'translate(-50%, -50%) scale(0.8)'; }
      if (widgetRev) widgetRev.innerText = '$0';
      if (widgetLeads) widgetLeads.innerText = '1,284';
      if (widgetConv) widgetConv.innerText = '14.2%';
    }
    // Threshold 1: Lead Inquiry Card Appears (norm >= 0.15)
    else if (norm >= 0.15 && norm < 0.35) {
      if (landingCTA) landingCTA.style.display = 'none';
      if (flowContainer) flowContainer.style.display = 'flex';
      if (leadCard) { leadCard.style.opacity = '1'; leadCard.style.transform = 'translateY(0)'; }
      if (aiDetails) { aiDetails.style.opacity = '0'; aiDetails.style.visibility = 'hidden'; }
      if (statusBadge) { statusBadge.className = 'badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1 fs-8'; statusBadge.innerText = 'Status: Lead Captured'; }
      if (notifEmail) { notifEmail.style.opacity = '0'; notifEmail.style.transform = 'translateX(20px)'; }
      if (notifWhatsapp) { notifWhatsapp.style.opacity = '0'; notifWhatsapp.style.transform = 'translateX(20px)'; }
      if (notifMeeting) { notifMeeting.style.opacity = '0'; notifMeeting.style.transform = 'translateX(20px)'; }
      if (successCard) { successCard.style.opacity = '0'; successCard.style.transform = 'translate(-50%, -50%) scale(0.8)'; }
      if (widgetRev) widgetRev.innerText = '$5,200';
    }
    // Threshold 2: AI Qualification Badge & Score (norm >= 0.35)
    else if (norm >= 0.35 && norm < 0.52) {
      if (landingCTA) landingCTA.style.display = 'none';
      if (flowContainer) flowContainer.style.display = 'flex';
      if (leadCard) leadCard.style.opacity = '1';
      if (aiDetails) { aiDetails.style.visibility = 'visible'; aiDetails.style.opacity = '1'; }
      if (scoreText) scoreText.innerText = '96%';
      if (ringPath) ringPath.setAttribute('stroke-dasharray', '96, 100');
      if (statusBadge) { statusBadge.className = 'badge bg-primary-subtle text-primary border border-primary-subtle px-2 py-1 fs-8'; statusBadge.innerText = 'Status: AI Qualified'; }
      if (notifEmail) { notifEmail.style.opacity = '1'; notifEmail.style.transform = 'translateX(0)'; }
      if (notifWhatsapp) { notifWhatsapp.style.opacity = '0'; notifWhatsapp.style.transform = 'translateX(20px)'; }
      if (notifMeeting) { notifMeeting.style.opacity = '0'; notifMeeting.style.transform = 'translateX(20px)'; }
      if (successCard) { successCard.style.opacity = '0'; successCard.style.transform = 'translate(-50%, -50%) scale(0.8)'; }
      if (widgetRev) widgetRev.innerText = '$14,800';
      if (widgetLeads) widgetLeads.innerText = '1,285';
    }
    // Threshold 3: WhatsApp AI Reply Toast (norm >= 0.52)
    else if (norm >= 0.52 && norm < 0.72) {
      if (landingCTA) landingCTA.style.display = 'none';
      if (flowContainer) flowContainer.style.display = 'flex';
      if (leadCard) leadCard.style.opacity = '1';
      if (aiDetails) { aiDetails.style.visibility = 'visible'; aiDetails.style.opacity = '1'; }
      if (statusBadge) { statusBadge.className = 'badge bg-indigo-subtle text-indigo border border-indigo-subtle px-2 py-1 fs-8'; statusBadge.innerText = 'Status: WhatsApp Contacted'; }
      if (notifEmail) { notifEmail.style.opacity = '1'; notifEmail.style.transform = 'translateX(0)'; }
      if (notifWhatsapp) { notifWhatsapp.style.opacity = '1'; notifWhatsapp.style.transform = 'translateX(0)'; }
      if (notifMeeting) { notifMeeting.style.opacity = '0'; notifMeeting.style.transform = 'translateX(20px)'; }
      if (successCard) { successCard.style.opacity = '0'; successCard.style.transform = 'translate(-50%, -50%) scale(0.8)'; }
      if (widgetRev) widgetRev.innerText = '$28,400';
      if (widgetConv) widgetConv.innerText = '15.6%';
    }
    // Threshold 4: Demo Meeting Booked Toast (norm >= 0.72)
    else if (norm >= 0.72 && norm < 0.90) {
      if (landingCTA) landingCTA.style.display = 'none';
      if (flowContainer) flowContainer.style.display = 'flex';
      if (leadCard) leadCard.style.opacity = '1';
      if (aiDetails) { aiDetails.style.visibility = 'visible'; aiDetails.style.opacity = '1'; }
      if (statusBadge) { statusBadge.className = 'badge bg-warning-subtle text-warning-emphasis border border-warning-subtle px-2 py-1 fs-8'; statusBadge.innerText = 'Status: Demo Scheduled'; }
      if (notifEmail) { notifEmail.style.opacity = '1'; notifEmail.style.transform = 'translateX(0)'; }
      if (notifWhatsapp) { notifWhatsapp.style.opacity = '1'; notifWhatsapp.style.transform = 'translateX(0)'; }
      if (notifMeeting) { notifMeeting.style.opacity = '1'; notifMeeting.style.transform = 'translateX(0)'; }
      if (successCard) { successCard.style.opacity = '0'; successCard.style.transform = 'translate(-50%, -50%) scale(0.8)'; }
      if (widgetRev) widgetRev.innerText = '$38,900';
      if (widgetConv) widgetConv.innerText = '16.8%';
    }
    // Threshold 5: Deal Won Success Card (norm >= 0.90)
    else if (norm >= 0.90) {
      if (landingCTA) landingCTA.style.display = 'none';
      if (flowContainer) flowContainer.style.display = 'flex';
      if (leadCard) leadCard.style.opacity = '1';
      if (aiDetails) { aiDetails.style.visibility = 'visible'; aiDetails.style.opacity = '1'; }
      if (statusBadge) { statusBadge.className = 'badge bg-success-subtle text-success border border-success-subtle px-2 py-1 fs-8'; statusBadge.innerText = 'Status: Deal Won'; }
      if (notifEmail) { notifEmail.style.opacity = '1'; notifEmail.style.transform = 'translateX(0)'; }
      if (notifWhatsapp) { notifWhatsapp.style.opacity = '1'; notifWhatsapp.style.transform = 'translateX(0)'; }
      if (notifMeeting) { notifMeeting.style.opacity = '1'; notifMeeting.style.transform = 'translateX(0)'; }
      if (successCard) { successCard.style.opacity = '1'; successCard.style.transform = 'translate(-50%, -50%) scale(1)'; }
      if (widgetRev) widgetRev.innerText = '$48,500';
      if (widgetLeads) widgetLeads.innerText = '1,286';
      if (widgetConv) widgetConv.innerText = '18.6%';
    }
  }

  const scrollTl = gsap.timeline({
    scrollTrigger: {
      trigger: heroWrapper,
      start: 'top top',
      end: '+=700%',
      pin: true,
      scrub: 0.6,
      onUpdate: (self) => {
        const p = self.progress;

        // Dynamic Typewriter + Moving Cursor driven by scroll progress!
        updateTypewriter(p);

        // Dynamic SaaS Simulator Cursor driven by scroll progress!
        updateSimulatorOnScroll(p);

        // Reset physics bodies when scrolling back to Phase 1 (p < 0.20)
        if (p < 0.20) {
          if (engine) engine.gravity.y = 0;
          hasDropped = false;
          bodiesList.forEach((body) => {
            Matter.Body.setPosition(body, { x: body.initialX, y: body.initialY });
            Matter.Body.setVelocity(body, { x: 0, y: 0 });
            Matter.Body.setAngularVelocity(body, 0);
          });
        } 
        // Activate gravity in Phase 2 (p >= 0.20)
        else if (p >= 0.20 && !hasDropped) {
          if (engine) engine.gravity.y = 1.2;
          hasDropped = true;
        }

        // Toggle active class on revealElem
        if (p > 0.70) {
          revealElem.classList.add('active');
        } else {
          revealElem.classList.remove('active');
        }
      }
    }
  });

  // Phase 1: Scroll duration reserved for Typewriter (0.00 -> 0.20)
  scrollTl.to({}, { duration: 0.20 });

  // Phase 2: Fade in Physics Canvas & Drop keyword pills with extended scroll time (0.20 -> 0.60)
  scrollTl.to(container, {
    opacity: 1,
    duration: 0.15,
    ease: 'none'
  }, ">");
  scrollTl.to({}, { duration: 0.25 }, ">");

  // Phase 3: Direct smooth fade to invisible (0.60 -> 0.75) — NO zoom out or scaling!
  scrollTl.to([logoElem, container], {
    opacity: 0,
    duration: 0.15,
    ease: 'power1.inOut'
  }, ">");

  // Phase 4: Reveal Hero Content Overlay (0.75 -> 0.82)
  scrollTl.to(revealElem, {
    opacity: 1,
    y: 0,
    duration: 0.07,
    ease: 'power2.out'
  }, ">");

  // Phase 5: Hold — Simulator plays through Lead -> Won over a long scroll distance (0.82 -> 1.00)
  scrollTl.to({}, { duration: 0.18 }, ">");

  // Word heading animations disabled — words display statically
}

/* Live SaaS Dashboard Sales Journey Simulator (Scoped to Hero) */
function initLiveSalesSimulator() {
  // Static click fallback handlers if user clicks manually
  const card = document.getElementById('sales-journey-simulator');
  const cursor = document.getElementById('sim-cursor');
  const getStartedBtn = document.getElementById('sim-get-started-btn');
  if (!card || !cursor || !getStartedBtn) return;
}
