/* ==========================================================================
   THREE.JS HERO 3D MODEL: 360° INTERACTIVE & AUTO-ROTATIONAL VIEWER
   Dual-Engine: Embedded Zero-CORS Binary Data + Fallback File Fetch
   Smooth 360° Auto-Spin + Non-Blocking Drag-to-Rotate Orbit Controls
   ========================================================================== */

let heroScene, heroCamera, heroRenderer, heroControls, heroModelGroup, heroShadowMesh, heroShadowMat;
let hero3DInitialized = false;

function initHero3D() {
  const container = document.getElementById('hero-3d-canvas');
  if (!container || window.innerWidth < 992 || container.offsetParent === null) {
    // If on mobile or container is hidden, defer until desktop resize
    return;
  }
  if (hero3DInitialized) return;
  hero3DInitialized = true;

  const width = container.clientWidth || 550;
  const height = container.clientHeight || 580;

  // 1. Scene Setup
  heroScene = new THREE.Scene();

  // 2. Camera Setup
  heroCamera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
  heroCamera.position.set(0, 0.35, 11.5);

  // 3. Renderer with High Dynamic Range & Color Calibration
  heroRenderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  heroRenderer.setSize(width, height);
  heroRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  heroRenderer.outputEncoding = THREE.sRGBEncoding;
  heroRenderer.toneMapping = THREE.ACESFilmicToneMapping;
  heroRenderer.toneMappingExposure = 1.0;
  heroRenderer.shadowMap.enabled = true;
  heroRenderer.shadowMap.type = THREE.PCFSoftShadowMap;

  container.innerHTML = '';
  container.appendChild(heroRenderer.domElement);

  // 4. Interactive Orbit Controls (Smooth 360° grab & rotate without hijacking scroll)
  if (typeof THREE.OrbitControls !== 'undefined') {
    heroControls = new THREE.OrbitControls(heroCamera, heroRenderer.domElement);
    heroControls.enableDamping = true;
    heroControls.dampingFactor = 0.06;
    heroControls.enableZoom = false; // Prevent wheel hijacking so page scroll is uninterrupted
    heroControls.enablePan = false;
    heroControls.autoRotate = true;
    heroControls.autoRotateSpeed = 1.6;
    heroControls.maxPolarAngle = Math.PI / 2 + 0.15;
    heroControls.minPolarAngle = Math.PI / 8;
  }

  // 5. 360° Balanced Soft Studio Lighting Rig
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
  heroScene.add(ambientLight);

  const hemiLight = new THREE.HemisphereLight(0xfffbeb, 0x1e293b, 0.6);
  hemiLight.position.set(0, 20, 0);
  heroScene.add(hemiLight);

  const frontLight = new THREE.DirectionalLight(0xfff7ed, 0.85);
  frontLight.position.set(0, 4, 8);
  heroScene.add(frontLight);

  const backLight = new THREE.DirectionalLight(0xffedd5, 0.8);
  backLight.position.set(0, 4, -8);
  heroScene.add(backLight);

  const leftLight = new THREE.DirectionalLight(0xffedd5, 0.65);
  leftLight.position.set(-8, 3, 0);
  heroScene.add(leftLight);

  const rightLight = new THREE.DirectionalLight(0xffedd5, 0.65);
  rightLight.position.set(8, 3, 0);
  heroScene.add(rightLight);

  const topLight = new THREE.DirectionalLight(0xffffff, 0.5);
  topLight.position.set(0, 10, 0);
  heroScene.add(topLight);

  // 6. Realistic 3D Radial Contact Shadow Plane
  const shadowCanvas = document.createElement('canvas');
  shadowCanvas.width = 256;
  shadowCanvas.height = 256;
  const shadowCtx = shadowCanvas.getContext('2d');

  const shadowGrad = shadowCtx.createRadialGradient(128, 128, 0, 128, 128, 128);
  shadowGrad.addColorStop(0, 'rgba(15, 23, 42, 0.65)');
  shadowGrad.addColorStop(0.35, 'rgba(232, 127, 36, 0.2)');
  shadowGrad.addColorStop(0.7, 'rgba(168, 85, 247, 0.08)');
  shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

  shadowCtx.fillStyle = shadowGrad;
  shadowCtx.fillRect(0, 0, 256, 256);

  const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
  const shadowGeo = new THREE.PlaneGeometry(6.2, 6.2);
  heroShadowMat = new THREE.MeshBasicMaterial({
    map: shadowTexture,
    transparent: true,
    opacity: 0.65,
    depthWrite: false
  });

  heroShadowMesh = new THREE.Mesh(shadowGeo, heroShadowMat);
  heroShadowMesh.rotation.x = -Math.PI / 2;
  heroShadowMesh.position.y = -3.2;
  heroScene.add(heroShadowMesh);

  // 7. Model Container Group
  heroModelGroup = new THREE.Group();
  heroModelGroup.position.set(0, -0.1, 0);
  heroModelGroup.rotation.set(0, -Math.PI / 2, 0);
  heroScene.add(heroModelGroup);

  // 8. Model Processing & Setup Helper
  function processLoadedModel(gltf) {
    const loadedModel = gltf.scene || gltf;

    loadedModel.traverse((child) => {
      if (child.isMesh) {
        if (child.geometry) {
          child.geometry.computeVertexNormals();
        }

        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          child.material.side = THREE.DoubleSide;

          if (child.material.map) {
            child.material.map.encoding = THREE.sRGBEncoding;
            child.material.map.flipY = false;
            child.material.map.generateMipmaps = true;
            child.material.map.minFilter = THREE.LinearMipmapLinearFilter;
            child.material.map.magFilter = THREE.LinearFilter;
            child.material.map.needsUpdate = true;
          }

          child.material.color = new THREE.Color(0xffe8ba);
          child.material.roughness = 0.32;
          child.material.metalness = 0.08;
          child.material.emissive.setHex(0x000000);
          child.material.needsUpdate = true;
        }
      }
    });

    // Auto-center and normalize dimensions
    const box = new THREE.Box3().setFromObject(loadedModel);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    loadedModel.position.x = -center.x;
    loadedModel.position.y = -center.y;
    loadedModel.position.z = -center.z;

    const maxDim = Math.max(size.x, size.y, size.z);
    const targetScale = 6.2 / (maxDim || 1);
    loadedModel.scale.setScalar(targetScale);

    heroModelGroup.add(loadedModel);

    const updatedBox = new THREE.Box3().setFromObject(heroModelGroup);
    if (heroShadowMesh) {
      heroShadowMesh.position.y = updatedBox.min.y - 0.08;
    }
  }

  // 9. Base64 ArrayBuffer Decoder (Guarantees zero-CORS offline execution)
  function base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  // 10. Load "hero model.glb" via Dual Engine
  if (typeof THREE.GLTFLoader !== 'undefined') {
    const loader = new THREE.GLTFLoader();

    if (window.HERO_GLB_BASE64) {
      try {
        const buffer = base64ToArrayBuffer(window.HERO_GLB_BASE64);
        loader.parse(
          buffer,
          '',
          (gltf) => {
            processLoadedModel(gltf);
          },
          (error) => {
            console.error('Error parsing embedded hero model GLB:', error);
            loadFromFile(loader);
          }
        );
      } catch (err) {
        console.error('Error decoding embedded hero model GLB base64:', err);
        loadFromFile(loader);
      }
    } else {
      loadFromFile(loader);
    }

    function loadFromFile(gltfLoader) {
      const modelUrl = 'images/3d/hero%20model.glb';
      gltfLoader.load(
        modelUrl,
        (gltf) => {
          processLoadedModel(gltf);
        },
        undefined,
        (error) => {
          console.error('Error loading 3D hero model GLB from file:', error);
        }
      );
    }
  }

  // 11. Window Resize Handler
  window.addEventListener('resize', () => {
    if (!hero3DInitialized || !heroCamera || !heroRenderer) return;
    if (window.innerWidth < 992 || container.offsetParent === null) return;
    const w = container.clientWidth || 550;
    const h = container.clientHeight || 580;
    heroCamera.aspect = w / h;
    heroCamera.updateProjectionMatrix();
    heroRenderer.setSize(w, h);
  });

  // 12. 360° Continuous Animation & Interaction Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    if (window.innerWidth < 992 || container.offsetParent === null) {
      return; // Pause rendering loop on mobile to preserve battery & performance
    }
    const elapsedTime = clock.getElapsedTime();

    const floatOffset = Math.sin(elapsedTime * 1.6);
    if (heroModelGroup) {
      heroModelGroup.position.y = -0.1 + floatOffset * 0.08;
    }

    if (heroShadowMesh && heroShadowMat) {
      heroShadowMesh.scale.setScalar(1.0 - floatOffset * 0.05);
      heroShadowMat.opacity = 0.65 - floatOffset * 0.1;
    }

    if (heroControls) {
      heroControls.update();
    } else if (heroModelGroup) {
      heroModelGroup.rotation.y += 0.014;
    }

    if (heroRenderer && heroScene && heroCamera) {
      heroRenderer.render(heroScene, heroCamera);
    }
  }

  animate();
}

function handleHero3DSetup() {
  if (window.innerWidth >= 992) {
    initHero3D();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', handleHero3DSetup);
} else {
  handleHero3DSetup();
}

window.addEventListener('resize', () => {
  if (window.innerWidth >= 992 && !hero3DInitialized) {
    initHero3D();
  }
});
