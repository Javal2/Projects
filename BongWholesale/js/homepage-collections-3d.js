/* ==========================================================================
   HOMEPAGE 3D COLLECTIONS ENGINE: STATIC SHOWCASE
   1. Architectural Glassware (#bong-collection-canvas): Static 3D Showcase
   2. Laboratory Grade Standard (#beaker-collection-canvas): Static 3D Showcase
   Both rendered at fixed ideal showcase angles with zero CPU/GPU animation loops
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. ARCHITECTURAL GLASSWARE SECTION (#bong-collection-canvas)
   -------------------------------------------------------------------------- */
let bong3DInitialized = false;
let beaker3DInitialized = false;

function initBongCollection3D() {
  const container = document.getElementById('bong-collection-canvas');
  if (!container || window.innerWidth < 992 || container.offsetParent === null) return;
  if (bong3DInitialized) return;
  bong3DInitialized = true;

  const width = container.clientWidth || 520;
  const height = container.clientHeight || 520;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
  camera.position.set(0, 0.35, 11.5);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // 360° Wrap-Around Balanced Soft Studio Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
  scene.add(ambientLight);

  const hemiLight = new THREE.HemisphereLight(0xfffbeb, 0x1e293b, 0.6);
  hemiLight.position.set(0, 20, 0);
  scene.add(hemiLight);

  const frontLight = new THREE.DirectionalLight(0xfff7ed, 0.85);
  frontLight.position.set(0, 4, 8);
  scene.add(frontLight);

  const backLight = new THREE.DirectionalLight(0xffedd5, 0.8);
  backLight.position.set(0, 4, -8);
  scene.add(backLight);

  const leftLight = new THREE.DirectionalLight(0xffedd5, 0.65);
  leftLight.position.set(-8, 3, 0);
  scene.add(leftLight);

  const rightLight = new THREE.DirectionalLight(0xffedd5, 0.65);
  rightLight.position.set(8, 3, 0);
  scene.add(rightLight);

  const topLight = new THREE.DirectionalLight(0xffffff, 0.5);
  topLight.position.set(0, 10, 0);
  scene.add(topLight);

  // Soft Radial Contact Shadow
  const shadowCanvas = document.createElement('canvas');
  shadowCanvas.width = 256; shadowCanvas.height = 256;
  const shadowCtx = shadowCanvas.getContext('2d');
  const shadowGrad = shadowCtx.createRadialGradient(128, 128, 0, 128, 128, 128);
  shadowGrad.addColorStop(0, 'rgba(15, 23, 42, 0.65)');
  shadowGrad.addColorStop(0.35, 'rgba(232, 127, 36, 0.2)');
  shadowGrad.addColorStop(0.7, 'rgba(168, 85, 247, 0.08)');
  shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  shadowCtx.fillStyle = shadowGrad; shadowCtx.fillRect(0, 0, 256, 256);
  const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
  const shadowGeo = new THREE.PlaneGeometry(6.2, 6.2);
  const shadowMat = new THREE.MeshBasicMaterial({ map: shadowTexture, transparent: true, opacity: 0.65, depthWrite: false });
  const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
  shadowMesh.rotation.x = -Math.PI / 2;
  shadowMesh.position.y = -3.2;
  scene.add(shadowMesh);

  // Fixed Showcase Angle (Rotated 180 degrees vertically around Y-axis)
  const modelGroup = new THREE.Group();
  modelGroup.position.set(0, -0.1, 0);
  modelGroup.rotation.set(0, Math.PI, 0);
  scene.add(modelGroup);

  function renderStatic() {
    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
  }

  function processModel(gltf) {
    const loadedModel = gltf.scene || gltf;
    loadedModel.traverse((child) => {
      if (child.isMesh) {
        if (child.geometry) child.geometry.computeVertexNormals();
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

    const box = new THREE.Box3().setFromObject(loadedModel);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    loadedModel.position.x = -center.x;
    loadedModel.position.y = -center.y;
    loadedModel.position.z = -center.z;

    const maxDim = Math.max(size.x, size.y, size.z);
    const targetScale = 6.2 / (maxDim || 1);
    loadedModel.scale.setScalar(targetScale);

    modelGroup.add(loadedModel);

    const updatedBox = new THREE.Box3().setFromObject(modelGroup);
    if (shadowMesh) {
      shadowMesh.position.y = updatedBox.min.y - 0.08;
    }

    renderStatic();
  }

  function base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) bytes[i] = binaryString.charCodeAt(i);
    return bytes.buffer;
  }

  if (typeof THREE.GLTFLoader !== 'undefined') {
    const loader = new THREE.GLTFLoader();
    if (window.BONG_GLB_BASE64) {
      try {
        const buffer = base64ToArrayBuffer(window.BONG_GLB_BASE64);
        loader.parse(buffer, '', (gltf) => processModel(gltf), (err) => {
          loader.load('images/3d/2dc46acf-c754-4945-b71d-c4809ea359b3.glb', (g) => processModel(g));
        });
      } catch (e) {
        loader.load('images/3d/2dc46acf-c754-4945-b71d-c4809ea359b3.glb', (g) => processModel(g));
      }
    } else {
      loader.load('images/3d/2dc46acf-c754-4945-b71d-c4809ea359b3.glb', (g) => processModel(g));
    }
  }

  window.addEventListener('resize', () => {
    const w = container.clientWidth || 520;
    const h = container.clientHeight || 520;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    renderStatic();
  });

  renderStatic();
}

/* --------------------------------------------------------------------------
   2. LABORATORY GRADE STANDARD SECTION (#beaker-collection-canvas)
   -------------------------------------------------------------------------- */
function initBeakerCollection3D() {
  const container = document.getElementById('beaker-collection-canvas');
  if (!container || window.innerWidth < 992 || container.offsetParent === null) return;
  if (beaker3DInitialized) return;
  beaker3DInitialized = true;

  const width = container.clientWidth || 520;
  const height = container.clientHeight || 520;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
  camera.position.set(0, 0.35, 11.5);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // 360° Wrap-Around Soft Studio Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
  scene.add(ambientLight);

  const hemiLight = new THREE.HemisphereLight(0xfff7ed, 0x1c1917, 0.6);
  hemiLight.position.set(0, 20, 0);
  scene.add(hemiLight);

  const frontLight = new THREE.DirectionalLight(0xfff7ed, 0.85);
  frontLight.position.set(0, 4, 8);
  scene.add(frontLight);

  const backLight = new THREE.DirectionalLight(0xffedd5, 0.8);
  backLight.position.set(0, 4, -8);
  scene.add(backLight);

  const leftLight = new THREE.DirectionalLight(0xffedd5, 0.65);
  leftLight.position.set(-8, 3, 0);
  scene.add(leftLight);

  const rightLight = new THREE.DirectionalLight(0xffedd5, 0.65);
  rightLight.position.set(8, 3, 0);
  scene.add(rightLight);

  const topLight = new THREE.DirectionalLight(0xffffff, 0.5);
  topLight.position.set(0, 10, 0);
  scene.add(topLight);

  // Soft Radial Contact Shadow
  const shadowCanvas = document.createElement('canvas');
  shadowCanvas.width = 256;
  shadowCanvas.height = 256;
  const shadowCtx = shadowCanvas.getContext('2d');
  const shadowGrad = shadowCtx.createRadialGradient(128, 128, 0, 128, 128, 128);
  shadowGrad.addColorStop(0, 'rgba(15, 23, 42, 0.65)');
  shadowGrad.addColorStop(0.35, 'rgba(245, 158, 11, 0.2)');
  shadowGrad.addColorStop(0.7, 'rgba(232, 127, 36, 0.08)');
  shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  shadowCtx.fillStyle = shadowGrad;
  shadowCtx.fillRect(0, 0, 256, 256);
  const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
  const shadowGeo = new THREE.PlaneGeometry(6.2, 6.2);
  const shadowMat = new THREE.MeshBasicMaterial({ map: shadowTexture, transparent: true, opacity: 0.65, depthWrite: false });
  const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
  shadowMesh.rotation.x = -Math.PI / 2;
  shadowMesh.position.y = -3.2;
  scene.add(shadowMesh);

  // Fixed Showcase Angle (Rotated 180 degrees vertically around Y-axis)
  const modelGroup = new THREE.Group();
  modelGroup.position.set(0, -0.1, 0);
  modelGroup.rotation.set(0, Math.PI, 0);
  scene.add(modelGroup);

  function renderStatic() {
    if (renderer && scene && camera) {
      renderer.render(scene, camera);
    }
  }

  function processBeakerModel(gltf) {
    const loadedModel = gltf.scene || gltf;
    loadedModel.traverse((child) => {
      if (child.isMesh) {
        if (child.geometry) child.geometry.computeVertexNormals();
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

    const box = new THREE.Box3().setFromObject(loadedModel);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    loadedModel.position.x = -center.x;
    loadedModel.position.y = -center.y;
    loadedModel.position.z = -center.z;

    const maxDim = Math.max(size.x, size.y, size.z);
    const targetScale = 6.2 / (maxDim || 1);
    loadedModel.scale.setScalar(targetScale);

    modelGroup.add(loadedModel);

    const updatedBox = new THREE.Box3().setFromObject(modelGroup);
    if (shadowMesh) {
      shadowMesh.position.y = updatedBox.min.y - 0.08;
    }

    renderStatic();
  }

  function base64ToArrayBuffer(base64) {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) bytes[i] = binaryString.charCodeAt(i);
    return bytes.buffer;
  }

  // Load bong.glb via Dual Engine
  if (typeof THREE.GLTFLoader !== 'undefined') {
    const loader = new THREE.GLTFLoader();
    if (window.BEAKER_GLB_BASE64) {
      try {
        const buffer = base64ToArrayBuffer(window.BEAKER_GLB_BASE64);
        loader.parse(buffer, '', (gltf) => processBeakerModel(gltf), (err) => {
          loader.load('images/3d/bong.glb', (g) => processBeakerModel(g));
        });
      } catch (e) {
        loader.load('images/3d/bong.glb', (g) => processBeakerModel(g));
      }
    } else {
      loader.load('images/3d/bong.glb', (g) => processBeakerModel(g));
    }
  }

  window.addEventListener('resize', () => {
    const w = container.clientWidth || 520;
    const h = container.clientHeight || 520;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    renderStatic();
  });

  renderStatic();
}

/* --------------------------------------------------------------------------
   LIFECYCLE INITIALIZATION (Desktop Only)
   -------------------------------------------------------------------------- */
function handleCollections3DSetup() {
  if (window.innerWidth >= 992) {
    initBongCollection3D();
    initBeakerCollection3D();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', handleCollections3DSetup);
} else {
  handleCollections3DSetup();
}

window.addEventListener('resize', () => {
  if (window.innerWidth >= 992) {
    if (!bong3DInitialized) initBongCollection3D();
    if (!beaker3DInitialized) initBeakerCollection3D();
  }
});
