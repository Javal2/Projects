/* ==========================================================================
   THREE.JS 3D HERO ANIMATION - FLEMMING PHARMA
   Updated Palette:
   - Primary: #004683
   - Secondary: #0066BE
   - Dark Accent: #1A1A1A
   - Neutral Gray: #6A6A6A
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('hero-3d-container');
  if (!container) return;

  // Scene, Camera, Renderer Setup
  const scene = new THREE.Scene();
  
  const width = container.clientWidth;
  const height = container.clientHeight || 600;
  
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 0, 14);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  
  // Attach canvas
  const canvas = renderer.domElement;
  canvas.id = 'hero-3d-canvas';
  container.appendChild(canvas);

  // Main Group for smooth mouse movement
  const mainGroup = new THREE.Group();
  scene.add(mainGroup);

  // --------------------------------------------------------------------------
  // 1. LIGHTING SETUP
  // --------------------------------------------------------------------------
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0x0066BE, 2.0);
  keyLight.position.set(10, 15, 10);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0x004683, 1.6);
  fillLight.position.set(-10, -10, 10);
  scene.add(fillLight);

  const accentLight = new THREE.PointLight(0x004683, 2.5, 20);
  accentLight.position.set(0, 0, 8);
  scene.add(accentLight);

  // --------------------------------------------------------------------------
  // 2. PHARMACEUTICAL CAPSULE (TRANSLUCENT GLASS)
  // --------------------------------------------------------------------------
  const capsuleGroup = new THREE.Group();
  mainGroup.add(capsuleGroup);

  // Capsule Glass Material
  const capsuleMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.1,
    roughness: 0.12,
    transmission: 0.88, // Glass transparency
    thickness: 1.2,
    opacity: 0.7,
    transparent: true,
    reflectivity: 0.9,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    ior: 1.4,
    side: THREE.DoubleSide
  });

  // Top Cap (#0066BE Tint Glass)
  const topMaterial = capsuleMaterial.clone();
  topMaterial.color = new THREE.Color(0x0066BE);
  topMaterial.opacity = 0.55;

  // Bottom Cap (#004683 Tint Glass)
  const bottomMaterial = capsuleMaterial.clone();
  bottomMaterial.color = new THREE.Color(0x004683);
  bottomMaterial.opacity = 0.65;

  // Geometry: Cylinder + 2 Hemispheres
  const radius = 1.6;
  const cylinderHeight = 2.2;

  const cylGeom = new THREE.CylinderGeometry(radius, radius, cylinderHeight, 32, 1, true);
  const capsuleCyl = new THREE.Mesh(cylGeom, capsuleMaterial);
  capsuleGroup.add(capsuleCyl);

  const topSphereGeom = new THREE.SphereGeometry(radius, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
  const topCap = new THREE.Mesh(topSphereGeom, topMaterial);
  topCap.position.y = cylinderHeight / 2;
  capsuleGroup.add(topCap);

  const bottomSphereGeom = new THREE.SphereGeometry(radius, 32, 16, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
  const bottomCap = new THREE.Mesh(bottomSphereGeom, bottomMaterial);
  bottomCap.position.y = -cylinderHeight / 2;
  capsuleGroup.add(bottomCap);

  // Capsule accent band ring (#004683)
  const bandGeom = new THREE.TorusGeometry(radius + 0.02, 0.05, 16, 64);
  const bandMat = new THREE.MeshStandardMaterial({
    color: 0x004683,
    emissive: 0x004683,
    emissiveIntensity: 0.5,
    roughness: 0.2
  });
  const band = new THREE.Mesh(bandGeom, bandMat);
  band.rotation.x = Math.PI / 2;
  capsuleGroup.add(band);

  // Tilt capsule slightly
  capsuleGroup.rotation.z = Math.PI / 6;

  // --------------------------------------------------------------------------
  // 3. DNA DOUBLE HELIX (INSIDE THE CAPSULE)
  // --------------------------------------------------------------------------
  const dnaGroup = new THREE.Group();
  capsuleGroup.add(dnaGroup);

  const strandPoints = 30;
  const helixRadius = 0.75;
  const helixHeight = 3.6;
  const nodeGeom = new THREE.SphereGeometry(0.09, 12, 12);

  const matPrimary = new THREE.MeshStandardMaterial({ color: 0x004683, emissive: 0x004683, emissiveIntensity: 0.6 });
  const matSecondary = new THREE.MeshStandardMaterial({ color: 0x0066BE, emissive: 0x0066BE, emissiveIntensity: 0.6 });
  const matDark = new THREE.MeshStandardMaterial({ color: 0x1A1A1A, emissive: 0x1A1A1A, emissiveIntensity: 0.4 });

  for (let i = 0; i < strandPoints; i++) {
    const t = (i / strandPoints) * Math.PI * 4;
    const y = (i / strandPoints) * helixHeight - helixHeight / 2;
    
    // Strand A (#0066BE)
    const x1 = Math.cos(t) * helixRadius;
    const z1 = Math.sin(t) * helixRadius;
    const nodeA = new THREE.Mesh(nodeGeom, matSecondary);
    nodeA.position.set(x1, y, z1);
    dnaGroup.add(nodeA);

    // Strand B (#004683)
    const x2 = Math.cos(t + Math.PI) * helixRadius;
    const z2 = Math.sin(t + Math.PI) * helixRadius;
    const nodeB = new THREE.Mesh(nodeGeom, matPrimary);
    nodeB.position.set(x2, y, z2);
    dnaGroup.add(nodeB);

    // Rung connection (every 2 steps)
    if (i % 2 === 0) {
      const distance = new THREE.Vector3(x1, y, z1).distanceTo(new THREE.Vector3(x2, y, z2));
      const rungGeom = new THREE.CylinderGeometry(0.025, 0.025, distance, 8);
      const rung = new THREE.Mesh(rungGeom, matDark);
      
      rung.position.set((x1 + x2) / 2, y, (z1 + z2) / 2);
      rung.lookAt(new THREE.Vector3(x1, y, z1));
      rung.rotateX(Math.PI / 2);
      dnaGroup.add(rung);
    }
  }

  // --------------------------------------------------------------------------
  // 4. FLOATING ORBITAL RINGS & MOLECULES
  // --------------------------------------------------------------------------
  const orbitGroup = new THREE.Group();
  mainGroup.add(orbitGroup);

  // Outer Ring 1 (#004683)
  const ring1Geom = new THREE.TorusGeometry(3.5, 0.03, 16, 100);
  const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x004683, opacity: 0.6, transparent: true });
  const ring1 = new THREE.Mesh(ring1Geom, ring1Mat);
  ring1.rotation.x = Math.PI / 3;
  orbitGroup.add(ring1);

  // Outer Ring 2 (#0066BE)
  const ring2Geom = new THREE.TorusGeometry(4.2, 0.02, 16, 100);
  const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x0066BE, opacity: 0.4, transparent: true });
  const ring2 = new THREE.Mesh(ring2Geom, ring2Mat);
  ring2.rotation.y = Math.PI / 4;
  orbitGroup.add(ring2);

  // Floating Chemical Molecule Clusters
  const moleculeCount = 5;
  for (let m = 0; m < moleculeCount; m++) {
    const mol = new THREE.Group();
    const centerSphere = new THREE.Mesh(new THREE.SphereGeometry(0.2, 16, 16), matSecondary);
    mol.add(centerSphere);
    
    for (let a = 0; a < 3; a++) {
      const angle = (a / 3) * Math.PI * 2;
      const subAtom = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 12), matPrimary);
      subAtom.position.set(Math.cos(angle) * 0.45, Math.sin(angle) * 0.45, 0);
      mol.add(subAtom);
    }
    
    const angleOrbit = (m / moleculeCount) * Math.PI * 2;
    mol.position.set(Math.cos(angleOrbit) * 4.8, (Math.random() - 0.5) * 3, Math.sin(angleOrbit) * 4.8);
    orbitGroup.add(mol);
  }

  // --------------------------------------------------------------------------
  // 5. AMBIENT PARTICLE FIELD
  // --------------------------------------------------------------------------
  const particleCount = 200;
  const particleGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);

  for (let p = 0; p < particleCount * 3; p += 3) {
    positions[p] = (Math.random() - 0.5) * 20;
    positions[p + 1] = (Math.random() - 0.5) * 15;
    positions[p + 2] = (Math.random() - 0.5) * 15;
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const particleMaterial = new THREE.PointsMaterial({
    color: 0x0066BE,
    size: 0.12,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending
  });

  const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
  mainGroup.add(particleSystem);

  // --------------------------------------------------------------------------
  // 6. MOUSE INTERACTION & PARALLAX TRACKING
  // --------------------------------------------------------------------------
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  const windowHalfX = window.innerWidth / 2;
  const windowHalfY = window.innerHeight / 2;

  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX) * 0.0008;
    mouseY = (event.clientY - windowHalfY) * 0.0008;
  });

  // --------------------------------------------------------------------------
  // 7. ANIMATION LOOP
  // --------------------------------------------------------------------------
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();

    // Smooth Mouse Interpolation
    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    mainGroup.rotation.y = targetX * 1.5;
    mainGroup.rotation.x = targetY * 1.5;

    // Continuous Capsule Motion
    capsuleGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.35;
    capsuleGroup.rotation.y = elapsedTime * 0.3;

    // DNA Inner Rotation
    dnaGroup.rotation.y = elapsedTime * 0.8;

    // Ring & Orbital Rotations
    orbitGroup.rotation.y = -elapsedTime * 0.2;
    ring1.rotation.z = elapsedTime * 0.15;
    ring2.rotation.z = -elapsedTime * 0.25;

    // Floating Particles Motion
    particleSystem.rotation.y = elapsedTime * 0.05;

    renderer.render(scene, camera);
  }

  animate();

  // --------------------------------------------------------------------------
  // 8. RESPONSIVE RESIZING
  // --------------------------------------------------------------------------
  window.addEventListener('resize', () => {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight || 600;
    
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(newWidth, newHeight);
  });
});
