/* ==========================================================================
   LIGHT-MODE CINEMATIC SCROLL EXPERIENCE - FLEMMING PHARMA
   Horizontal Capsule Center Split | Morphing Scientific Particles
   100% Smooth Bidirectional Scrubbing (Scroll Up & Scroll Down)
   Runs on initial site visit or page refresh (F5), skipped when navigating back to Home
   ========================================================================== */

// Check if cinematic intro should run (Initial Visit OR Page Refresh (F5))
function checkShouldRunIntro() {
  if (document.documentElement.classList.contains('skip-cinematic-intro')) {
    return false;
  }
  try {
    if (sessionStorage.getItem('flemming_from_internal_nav') === 'true') {
      sessionStorage.removeItem('flemming_from_internal_nav');
      document.documentElement.classList.add('skip-cinematic-intro');
      return false;
    }
  } catch (e) {}

  return true; // Play intro on initial visit or explicit F5 refresh
}

const shouldRunIntro = checkShouldRunIntro();

// Immediately clear body class if skipping intro to avoid flash
if (!shouldRunIntro) {
  if (document.body) {
    document.body.classList.remove('has-cinematic-intro');
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.classList.remove('has-cinematic-intro');
    });
  }
} else {
  // Force manual scroll restoration when intro runs
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.addEventListener('beforeunload', () => window.scrollTo(0, 0));
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
      window.location.reload();
    }
  });
}

function resetScrollTop() {
  window.scrollTo(0, 0);
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.refresh();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const triggerContainer = document.getElementById('cinematic-scroll-trigger');
  const canvasContainer = document.getElementById('cinematic-canvas-container');
  const introTextOverlay = document.getElementById('cinematic-intro-text');
  const logoAssemblyOverlay = document.getElementById('cinematic-logo-assembly');
  const mainSiteNav = document.querySelector('.navbar-pharma');
  const mainHeroSection = document.querySelector('.hero-section');
  const mainWrapper = document.getElementById('main-website-wrapper');

  if (!triggerContainer || !canvasContainer) return;

  // Check prefers-reduced-motion or if intro should be skipped
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !shouldRunIntro) {
    // Hide intro canvas/trigger elements and reveal main homepage directly
    triggerContainer.style.display = 'none';
    canvasContainer.style.display = 'none';
    if (introTextOverlay) introTextOverlay.style.display = 'none';
    if (logoAssemblyOverlay) logoAssemblyOverlay.style.display = 'none';
    document.body.classList.remove('has-cinematic-intro');

    if (mainSiteNav) {
      mainSiteNav.style.opacity = '1';
      mainSiteNav.style.pointerEvents = 'auto';
      mainSiteNav.classList.add('scrolled');
    }
    if (mainHeroSection) {
      mainHeroSection.style.opacity = '1';
      mainHeroSection.style.pointerEvents = 'auto';
      mainHeroSection.style.transform = 'none';
    }
    if (mainWrapper) {
      mainWrapper.style.opacity = '1';
      mainWrapper.style.pointerEvents = 'auto';
    }
    return;
  }

  // Ensure intro container is visible when intro runs
  resetScrollTop();
  triggerContainer.style.display = 'block';
  canvasContainer.style.display = 'block';

  // --------------------------------------------------------------------------
  // 1. THREE.JS LIGHT-MODE SCENE SETUP
  // --------------------------------------------------------------------------
  const scene = new THREE.Scene();

  let width = window.innerWidth;
  let height = window.innerHeight;

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 0, 14);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  const canvas = renderer.domElement;
  canvas.id = 'cinematic-canvas';
  canvasContainer.appendChild(canvas);

  const mainGroup = new THREE.Group();
  scene.add(mainGroup);

  // --------------------------------------------------------------------------
  // 2. PRISTINE LABORATORY LIGHTING
  // --------------------------------------------------------------------------
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0x0066BE, 2.2);
  keyLight.position.set(12, 15, 12);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0x004683, 1.8);
  fillLight.position.set(-12, -10, 10);
  scene.add(fillLight);

  const energyLineLight = new THREE.PointLight(0x16C6E5, 0, 10);
  energyLineLight.position.set(0, 0, 0);
  scene.add(energyLineLight);

  // --------------------------------------------------------------------------
  // 3. HORIZONTAL 3D CAPSULE (CENTER SPLIT SYSTEM)
  // --------------------------------------------------------------------------
  const capsuleGroup = new THREE.Group();
  mainGroup.add(capsuleGroup);

  const whiteMat = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    roughness: 0.15,
    metalness: 0.1,
    clearcoat: 1.0
  });

  const blueMat = new THREE.MeshStandardMaterial({
    color: 0x004683,
    roughness: 0.15,
    metalness: 0.2,
    clearcoat: 1.0
  });

  const radius = 1.4;
  const halfLength = 1.8;

  // LEFT HALF GROUP (White)
  const leftHalfGroup = new THREE.Group();
  capsuleGroup.add(leftHalfGroup);

  const leftCylGeom = new THREE.CylinderGeometry(radius, radius, halfLength, 32, 1, true);
  const leftCyl = new THREE.Mesh(leftCylGeom, whiteMat);
  leftCyl.rotation.z = Math.PI / 2;
  leftCyl.position.x = -halfLength / 2;
  leftHalfGroup.add(leftCyl);

  const leftSphereGeom = new THREE.SphereGeometry(radius, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  const leftCap = new THREE.Mesh(leftSphereGeom, whiteMat);
  leftCap.rotation.z = Math.PI / 2;
  leftCap.position.x = -halfLength;
  leftHalfGroup.add(leftCap);

  // RIGHT HALF GROUP (Deep Blue)
  const rightHalfGroup = new THREE.Group();
  capsuleGroup.add(rightHalfGroup);

  const rightCylGeom = new THREE.CylinderGeometry(radius, radius, halfLength, 32, 1, true);
  const rightCyl = new THREE.Mesh(rightCylGeom, blueMat);
  rightCyl.rotation.z = Math.PI / 2;
  rightCyl.position.x = halfLength / 2;
  rightHalfGroup.add(rightCyl);

  const rightSphereGeom = new THREE.SphereGeometry(radius, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
  const rightCap = new THREE.Mesh(rightSphereGeom, blueMat);
  rightCap.rotation.z = Math.PI / 2;
  rightCap.position.x = halfLength;
  rightHalfGroup.add(rightCap);

  // --------------------------------------------------------------------------
  // 4. MORPHING SCIENTIFIC PARTICLES
  // --------------------------------------------------------------------------
  const particleCount = 1600;
  const particleGeom = new THREE.BufferGeometry();
  const currentPositions = new Float32Array(particleCount * 3);
  const powderPositions = new Float32Array(particleCount * 3);
  const moleculePositions = new Float32Array(particleCount * 3);
  const logoPositions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const rx = (Math.random() - 0.5) * halfLength * 2;
    const ry = (Math.random() - 0.5) * radius * 1.2;
    const rz = (Math.random() - 0.5) * radius * 1.2;

    powderPositions[i * 3] = rx;
    powderPositions[i * 3 + 1] = ry;
    powderPositions[i * 3 + 2] = rz;

    currentPositions[i * 3] = rx;
    currentPositions[i * 3 + 1] = ry;
    currentPositions[i * 3 + 2] = rz;

    const t = (i / particleCount) * Math.PI * 10;
    const strand = (i % 2 === 0) ? 1 : -1;
    const helixR = 3.5;
    moleculePositions[i * 3] = (i / particleCount) * 12 - 6;
    moleculePositions[i * 3 + 1] = Math.cos(t) * helixR * strand;
    moleculePositions[i * 3 + 2] = Math.sin(t) * helixR;

    const angleLogo = (i / particleCount) * Math.PI * 2;
    const ringR = 3.0 + (i % 3) * 0.4;
    logoPositions[i * 3] = Math.cos(angleLogo) * ringR;
    logoPositions[i * 3 + 1] = Math.sin(angleLogo) * ringR;
    logoPositions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
  }

  particleGeom.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));

  const particleMaterial = new THREE.PointsMaterial({
    color: 0x0066BE,
    size: 0.13,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending
  });

  const scientificParticles = new THREE.Points(particleGeom, particleMaterial);
  mainGroup.add(scientificParticles);

  // Helper clamp function
  const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

  // --------------------------------------------------------------------------
  // 5. SMOOTH BIDIRECTIONAL SCROLL SCRUB (SCROLL DOWN & SCROLL UP)
  // --------------------------------------------------------------------------
  function updateScrollState(progress) {
    const p = clamp(progress, 0, 1);

    // --- Stage 1 & 2: Capsule Visibility & Movement ---
    if (p <= 0.45) {
      capsuleGroup.visible = true;
      mainGroup.rotation.y = 0;

      if (p <= 0.25) {
        // Stage 1: Pressure build & subtle float (0.0 -> 0.25)
        const p1 = p / 0.25;
        leftHalfGroup.position.x = 0;
        rightHalfGroup.position.x = 0;
        leftHalfGroup.rotation.y = 0;
        rightHalfGroup.rotation.y = 0;
        capsuleGroup.rotation.y = Math.sin(p1 * Math.PI) * 0.05;
        energyLineLight.intensity = p1 * 6.0;

        if (introTextOverlay) introTextOverlay.style.opacity = clamp(1 - p1 * 2.2, 0, 1).toString();
        if (logoAssemblyOverlay) logoAssemblyOverlay.style.opacity = '0';

        const posAttr = particleGeom.attributes.position;
        for (let i = 0; i < particleCount; i++) {
          posAttr.setXYZ(i, powderPositions[i * 3], powderPositions[i * 3 + 1], powderPositions[i * 3 + 2]);
        }
        posAttr.needsUpdate = true;
      } else {
        // Stage 2: Center split (0.25 -> 0.45)
        const p2 = (p - 0.25) / 0.20;
        const splitDist = p2 * 4.5;
        leftHalfGroup.position.x = -splitDist;
        rightHalfGroup.position.x = splitDist;
        leftHalfGroup.rotation.y = -p2 * 0.4;
        rightHalfGroup.rotation.y = p2 * 0.4;
        capsuleGroup.rotation.y = 0;

        if (introTextOverlay) introTextOverlay.style.opacity = '0';
        if (logoAssemblyOverlay) logoAssemblyOverlay.style.opacity = '0';

        const posAttr = particleGeom.attributes.position;
        for (let i = 0; i < particleCount; i++) {
          const px = powderPositions[i * 3] * (1 + p2 * 2);
          const py = powderPositions[i * 3 + 1] * (1 + p2 * 2);
          const pz = powderPositions[i * 3 + 2] * (1 + p2 * 2);
          posAttr.setXYZ(i, px, py, pz);
        }
        posAttr.needsUpdate = true;
      }
    } else {
      capsuleGroup.visible = false;
      if (introTextOverlay) introTextOverlay.style.opacity = '0';
    }

    // --- Stage 3 & 4: Scientific Particle Morphing (0.45 -> 0.75) ---
    if (p > 0.45 && p <= 0.75) {
      const p3 = (p - 0.45) / 0.30;
      if (logoAssemblyOverlay) logoAssemblyOverlay.style.opacity = '0';

      const posAttr = particleGeom.attributes.position;
      for (let i = 0; i < particleCount; i++) {
        const startX = powderPositions[i * 3] * 3;
        const startY = powderPositions[i * 3 + 1] * 3;
        const startZ = powderPositions[i * 3 + 2] * 3;

        const targetX = moleculePositions[i * 3];
        const targetY = moleculePositions[i * 3 + 1];
        const targetZ = moleculePositions[i * 3 + 2];

        posAttr.setXYZ(
          i,
          startX + (targetX - startX) * p3,
          startY + (targetY - startY) * p3,
          startZ + (targetZ - startZ) * p3
        );
      }
      posAttr.needsUpdate = true;
      mainGroup.rotation.y = p3 * Math.PI;
    }

    // --- Stage 5: Logo Formation (0.75 -> 0.90) ---
    if (p > 0.75 && p <= 0.90) {
      const p5 = (p - 0.75) / 0.15;
      mainGroup.rotation.y = Math.PI;

      const posAttr = particleGeom.attributes.position;
      for (let i = 0; i < particleCount; i++) {
        const startX = moleculePositions[i * 3];
        const startY = moleculePositions[i * 3 + 1];
        const startZ = moleculePositions[i * 3 + 2];

        const targetX = logoPositions[i * 3];
        const targetY = logoPositions[i * 3 + 1];
        const targetZ = logoPositions[i * 3 + 2];

        posAttr.setXYZ(
          i,
          startX + (targetX - startX) * p5,
          startY + (targetY - startY) * p5,
          startZ + (targetZ - startZ) * p5
        );
      }
      posAttr.needsUpdate = true;

      if (logoAssemblyOverlay) logoAssemblyOverlay.style.opacity = p5.toString();
    }

    // --- Stage 6: Seamless Navigation & Homepage Reveal (0.90 -> 1.0) ---
    if (p <= 0.90) {
      canvasContainer.style.opacity = '1';
      if (mainSiteNav) { mainSiteNav.style.opacity = '0'; mainSiteNav.style.pointerEvents = 'none'; }
      if (mainHeroSection) { mainHeroSection.style.opacity = '0'; mainHeroSection.style.pointerEvents = 'none'; }
    } else {
      const p6 = (p - 0.90) / 0.10;
      canvasContainer.style.opacity = clamp(1 - p6 * 1.5, 0, 1).toString();
      if (logoAssemblyOverlay) logoAssemblyOverlay.style.opacity = clamp(1 - p6 * 1.5, 0, 1).toString();

      if (mainSiteNav) {
        mainSiteNav.style.opacity = p6.toString();
        mainSiteNav.style.pointerEvents = (p6 > 0.5) ? 'auto' : 'none';
      }
      if (mainHeroSection) {
        mainHeroSection.style.opacity = p6.toString();
        mainHeroSection.style.pointerEvents = (p6 > 0.5) ? 'auto' : 'none';
      }
    }
  }

  // --------------------------------------------------------------------------
  // GSAP SCROLLTRIGGER BINDING
  // --------------------------------------------------------------------------
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.create({
      trigger: triggerContainer,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      pin: canvasContainer,
      anticipatePin: 1,
      fastScrollEnd: false,
      onUpdate: (self) => {
        updateScrollState(self.progress);
      }
    });

    // Force refresh top scroll
    setTimeout(resetScrollTop, 100);
  }

  // --------------------------------------------------------------------------
  // 6. RENDER LOOP & RESPONSIVE RESIZING
  // --------------------------------------------------------------------------
  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
  render();

  window.addEventListener('resize', () => {
    width = window.innerWidth;
    height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
});
