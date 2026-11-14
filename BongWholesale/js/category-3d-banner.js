/* ==========================================================================
   UNIFIED 3D CATEGORY BANNER ENGINE (Static Showcase)
   Fixed Ideal Angles, Zero Animation Loops & Instant Static Rendering
   ========================================================================== */

class Category3DBanner {
  constructor() {
    this.banner = document.querySelector('.premium-category-banner');
    if (!this.banner) return;

    this.category = this.banner.getAttribute('data-category') || 'beakers';
    this.canvas = document.getElementById('category-3d-canvas');
    if (!this.canvas) return;

    this.initThree();
    this.createCategoryModel();
    this.bindEvents();
    this.renderStatic();
  }

  initThree() {
    const container = this.canvas.parentElement;
    this.width = container.clientWidth || 500;
    this.height = container.clientHeight || 450;

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(42, this.width / this.height, 0.1, 1000);
    this.camera.position.set(0, 0, 13.5);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    this.scene.add(ambientLight);

    // Key Light (Warm Orange)
    this.keyLight = new THREE.DirectionalLight(0xE87F24, 1.8);
    this.keyLight.position.set(5, 8, 6);
    this.scene.add(this.keyLight);

    // Fill Light (Cool Blue)
    this.fillLight = new THREE.DirectionalLight(0x025492, 1.4);
    this.fillLight.position.set(-6, -4, -4);
    this.scene.add(this.fillLight);

    // Point Light (Specular Sparkle)
    this.pointLight = new THREE.PointLight(0xffffff, 1.5, 20);
    this.pointLight.position.set(0, 3, 5);
    this.scene.add(this.pointLight);

    // Root Group (Rotated 180 degrees vertically around Y-axis)
    this.modelGroup = new THREE.Group();
    this.modelGroup.rotation.set(0, Math.PI, 0);
    this.scene.add(this.modelGroup);
  }

  getGlassMaterial(colorHex = 0xffffff, opacity = 0.85) {
    return new THREE.MeshPhysicalMaterial({
      color: colorHex,
      transparent: true,
      opacity: opacity,
      roughness: 0.08,
      metalness: 0.08,
      transmission: 0.9,
      thickness: 1.5,
      ior: 1.52,
      reflectivity: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      side: THREE.DoubleSide
    });
  }

  getAccentMaterial(colorHex = 0xE87F24) {
    return new THREE.MeshStandardMaterial({
      color: colorHex,
      roughness: 0.25,
      metalness: 0.8,
      envMapIntensity: 1.2
    });
  }

  createCategoryModel() {
    const glassMat = this.getGlassMaterial(0xffffff, 0.88);
    const orangeMat = this.getAccentMaterial(0xE87F24);
    const blueMat = this.getAccentMaterial(0x025492);

    switch (this.category) {
      case 'beakers':
        this.createBeaker(glassMat, orangeMat, blueMat);
        break;
      case 'bongs':
        this.createStraightBong(glassMat, orangeMat, blueMat);
        break;
      case 'pipes':
        this.createSherlockPipe(glassMat, orangeMat, blueMat);
        break;
      case 'accessories':
        this.createGrinderBowl(glassMat, orangeMat, blueMat);
        break;
      default:
        this.createBeaker(glassMat, orangeMat, blueMat);
    }
  }

  createBeaker(glass, orange, blue) {
    const beakerMesh = new THREE.Group();

    // Beaker Flask Base Cone
    const baseGeo = new THREE.CylinderGeometry(0.8, 3.2, 4.2, 32);
    const baseMesh = new THREE.Mesh(baseGeo, glass);
    baseMesh.position.y = -1.2;
    beakerMesh.add(baseMesh);

    // Bottom Base Plate
    const plateGeo = new THREE.CylinderGeometry(3.3, 3.3, 0.3, 32);
    const plateMesh = new THREE.Mesh(plateGeo, orange);
    plateMesh.position.y = -3.3;
    beakerMesh.add(plateMesh);

    // Neck Tube
    const neckGeo = new THREE.CylinderGeometry(0.8, 0.8, 4.5, 32);
    const neckMesh = new THREE.Mesh(neckGeo, glass);
    neckMesh.position.y = 2.4;
    beakerMesh.add(neckMesh);

    // Mouthpiece Lip
    const lipGeo = new THREE.TorusGeometry(0.82, 0.14, 16, 32);
    const lipMesh = new THREE.Mesh(lipGeo, orange);
    lipMesh.rotation.x = Math.PI / 2;
    lipMesh.position.y = 4.65;
    beakerMesh.add(lipMesh);

    // Downstem & Bowl
    const stemGeo = new THREE.CylinderGeometry(0.18, 0.18, 2.8, 16);
    const stemMesh = new THREE.Mesh(stemGeo, blue);
    stemMesh.position.set(1.4, -0.9, 0);
    stemMesh.rotation.z = -Math.PI / 3.8;
    beakerMesh.add(stemMesh);

    const bowlGeo = new THREE.ConeGeometry(0.5, 0.65, 16);
    const bowlMesh = new THREE.Mesh(bowlGeo, orange);
    bowlMesh.position.set(2.4, 0.1, 0);
    bowlMesh.rotation.z = Math.PI;
    beakerMesh.add(bowlMesh);

    this.modelGroup.add(beakerMesh);
  }

  createStraightBong(glass, orange, blue) {
    const bongMesh = new THREE.Group();

    // Straight Cylinder Tube
    const tubeGeo = new THREE.CylinderGeometry(1.2, 1.2, 8.5, 32);
    const tubeMesh = new THREE.Mesh(tubeGeo, glass);
    tubeMesh.position.y = 0.5;
    bongMesh.add(tubeMesh);

    // Heavy Round Base Foot
    const footGeo = new THREE.CylinderGeometry(2.8, 2.8, 0.4, 32);
    const footMesh = new THREE.Mesh(footGeo, blue);
    footMesh.position.y = -3.8;
    bongMesh.add(footMesh);

    // Mouthpiece Lip
    const lipGeo = new THREE.TorusGeometry(1.22, 0.16, 16, 32);
    const lipMesh = new THREE.Mesh(lipGeo, orange);
    lipMesh.rotation.x = Math.PI / 2;
    lipMesh.position.y = 4.75;
    bongMesh.add(lipMesh);

    // Tree Perc Assembly inside
    for (let i = 0; i < 4; i++) {
      const armGeo = new THREE.CylinderGeometry(0.1, 0.1, 1.4, 12);
      const armMesh = new THREE.Mesh(armGeo, orange);
      const angle = (i / 4) * Math.PI * 2;
      armMesh.position.set(Math.cos(angle) * 0.5, -0.6, Math.sin(angle) * 0.5);
      bongMesh.add(armMesh);
    }

    this.modelGroup.add(bongMesh);
  }

  createSherlockPipe(glass, orange, blue) {
    const pipeMesh = new THREE.Group();

    // Deep Bowl Chamber
    const bowlGeo = new THREE.SphereGeometry(1.6, 32, 32);
    const bowlMesh = new THREE.Mesh(bowlGeo, glass);
    bowlMesh.position.set(-1.8, -1.2, 0);
    pipeMesh.add(bowlMesh);

    // Amber Bowl Inset
    const rimGeo = new THREE.TorusGeometry(1.0, 0.18, 16, 32);
    const rimMesh = new THREE.Mesh(rimGeo, orange);
    rimMesh.rotation.x = Math.PI / 2;
    rimMesh.position.set(-1.8, 0.4, 0);
    pipeMesh.add(rimMesh);

    // Ergonomic Curved Stem
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.4, -1.4, 0),
      new THREE.Vector3(0.5, -2.4, 0),
      new THREE.Vector3(2.5, 0.2, 0),
      new THREE.Vector3(3.2, 2.2, 0)
    ]);
    const stemGeo = new THREE.TubeGeometry(curve, 32, 0.35, 16, false);
    const stemMesh = new THREE.Mesh(stemGeo, glass);
    pipeMesh.add(stemMesh);

    // Mouthpiece Ring
    const mouthGeo = new THREE.TorusGeometry(0.38, 0.12, 16, 32);
    const mouthMesh = new THREE.Mesh(mouthGeo, blue);
    mouthMesh.position.set(3.2, 2.2, 0);
    mouthMesh.rotation.z = Math.PI / 4;
    pipeMesh.add(mouthMesh);

    pipeMesh.scale.set(0.9, 0.9, 0.9);
    this.modelGroup.add(pipeMesh);
  }

  createGrinderBowl(glass, orange, blue) {
    const accMesh = new THREE.Group();

    // 4-Piece CNC Grinder Base
    const gTopGeo = new THREE.CylinderGeometry(2.2, 2.2, 0.8, 32);
    const gTopMesh = new THREE.Mesh(gTopGeo, orange);
    gTopMesh.position.y = 0.5;
    accMesh.add(gTopMesh);

    const gMidGeo = new THREE.CylinderGeometry(2.1, 2.1, 0.6, 32);
    const gMidMesh = new THREE.Mesh(gMidGeo, blue);
    gMidMesh.position.y = -0.3;
    accMesh.add(gMidMesh);

    const gBotGeo = new THREE.CylinderGeometry(2.2, 2.2, 0.8, 32);
    const gBotMesh = new THREE.Mesh(gBotGeo, orange);
    gBotMesh.position.y = -1.1;
    accMesh.add(gBotMesh);

    // Diamond Cut Grip Knurling
    const gripGeo = new THREE.TorusGeometry(2.22, 0.08, 12, 48);
    const gripMesh = new THREE.Mesh(gripGeo, blue);
    gripMesh.rotation.x = Math.PI / 2;
    gripMesh.position.y = 0.7;
    accMesh.add(gripMesh);

    // Static Orbit Accessories
    const orb1Geo = new THREE.DodecahedronGeometry(0.7, 1);
    const orb1Mesh = new THREE.Mesh(orb1Geo, blue);
    orb1Mesh.position.set(2.8, 0.8, 1.2);
    accMesh.add(orb1Mesh);

    const orb2Geo = new THREE.OctahedronGeometry(0.65, 0);
    const orb2Mesh = new THREE.Mesh(orb2Geo, orange);
    orb2Mesh.position.set(-2.8, -0.6, -1.2);
    accMesh.add(orb2Mesh);

    this.modelGroup.add(accMesh);
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      if (!this.canvas) return;
      const container = this.canvas.parentElement;
      this.width = container.clientWidth || 500;
      this.height = container.clientHeight || 450;
      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.width, this.height);
      this.renderStatic();
    });
  }

  renderStatic() {
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    new Category3DBanner();
  }, 100);
});
