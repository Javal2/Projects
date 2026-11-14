/**
 * MagicRings.js — Vanilla JS port of React Bits MagicRings component
 * Original: https://reactbits.dev/animations/magic-rings
 * Requires: Three.js loaded globally as `THREE`
 */

const MAGIC_RINGS_VERTEX_SHADER = `
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const MAGIC_RINGS_FRAGMENT_SHADER = `
precision highp float;

uniform float uTime, uAttenuation, uLineThickness;
uniform float uBaseRadius, uRadiusStep, uScaleRate;
uniform float uOpacity, uNoiseAmount, uRotation, uRingGap;
uniform float uFadeIn, uFadeOut;
uniform float uMouseInfluence, uHoverAmount, uHoverScale, uParallax, uBurst;
uniform vec2 uResolution, uMouse;
uniform vec3 uColor, uColorTwo;
uniform int uRingCount;

const float HP = 1.5707963;
const float CYCLE = 3.45;

float fade(float t) {
  return t < uFadeIn ? smoothstep(0.0, uFadeIn, t) : 1.0 - smoothstep(uFadeOut, CYCLE - 0.2, t);
}

float ring(vec2 p, float ri, float cut, float t0, float px) {
  float t = mod(uTime + t0, CYCLE);
  float r = ri + t / CYCLE * uScaleRate;
  float d = abs(length(p) - r);
  float a = atan(abs(p.y), abs(p.x)) / HP;
  float th = max(1.0 - a, 0.5) * px * uLineThickness;
  float h = (1.0 - smoothstep(th, th * 1.5, d));
  d += pow(cut * a, 3.0) * r;
  return h * exp(-uAttenuation * d) * fade(t);
}

void main() {
  float px = 1.0 / min(uResolution.x, uResolution.y);
  vec2 p = (gl_FragCoord.xy - 0.5 * uResolution.xy) * px;
  float cr = cos(uRotation), sr = sin(uRotation);
  p = mat2(cr, -sr, sr, cr) * p;
  p -= uMouse * uMouseInfluence;
  float sc = mix(1.0, uHoverScale, uHoverAmount) + uBurst * 0.3;
  p /= sc;
  vec3 c = vec3(0.0);
  float rcf = max(float(uRingCount) - 1.0, 1.0);
  for (int i = 0; i < 10; i++) {
    if (i >= uRingCount) break;
    float fi = float(i);
    vec2 pr = p - fi * uParallax * uMouse;
    vec3 rc = mix(uColor, uColorTwo, fi / rcf);
    c = mix(c, rc, vec3(ring(pr, uBaseRadius + fi * uRadiusStep, pow(uRingGap, fi), i == 0 ? 0.0 : 2.95 * fi, px)));
  }
  c *= 1.0 + uBurst * 2.0;
  float n = fract(sin(dot(gl_FragCoord.xy + uTime * 100.0, vec2(12.9898, 78.233))) * 43758.5453);
  c += (n - 0.5) * uNoiseAmount;
  float alpha = max(c.r, max(c.g, c.b));
  alpha = smoothstep(0.04, 0.25, alpha) * uOpacity;
  gl_FragColor = vec4(c, alpha);
}
`;

function createMagicRings(container, options) {
  options = options || {};
  var cfg = Object.assign({
    color: '#fc42ff',
    colorTwo: '#42fcff',
    ringCount: 6,
    speed: 1,
    attenuation: 10,
    lineThickness: 2,
    baseRadius: 0.35,
    radiusStep: 0.1,
    scaleRate: 0.1,
    opacity: 1,
    blur: 0,
    noiseAmount: 0.1,
    rotation: 0,
    ringGap: 1.5,
    fadeIn: 0.7,
    fadeOut: 0.5,
    followMouse: false,
    mouseInfluence: 0.2,
    hoverScale: 1.2,
    parallax: 0.05,
    clickBurst: false
  }, options);

  if (cfg.blur > 0) container.style.filter = 'blur(' + cfg.blur + 'px)';

  var renderer;
  try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); }
  catch(e) { console.warn('MagicRings: WebGL unavailable.', e); return { destroy: function(){} }; }

  if (!renderer.capabilities.isWebGL2) {
    renderer.dispose();
    console.warn('MagicRings: WebGL2 required.');
    return { destroy: function(){} };
  }

  renderer.setClearColor(0x000000, 0);
  renderer.domElement.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;';
  container.appendChild(renderer.domElement);

  var scene = new THREE.Scene();
  var camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 10);
  camera.position.z = 1;

  var uniforms = {
    uTime:           { value: 0 },
    uAttenuation:    { value: cfg.attenuation },
    uResolution:     { value: new THREE.Vector2() },
    uColor:          { value: new THREE.Color(cfg.color) },
    uColorTwo:       { value: new THREE.Color(cfg.colorTwo) },
    uLineThickness:  { value: cfg.lineThickness },
    uBaseRadius:     { value: cfg.baseRadius },
    uRadiusStep:     { value: cfg.radiusStep },
    uScaleRate:      { value: cfg.scaleRate },
    uRingCount:      { value: cfg.ringCount },
    uOpacity:        { value: cfg.opacity },
    uNoiseAmount:    { value: cfg.noiseAmount },
    uRotation:       { value: (cfg.rotation * Math.PI) / 180 },
    uRingGap:        { value: cfg.ringGap },
    uFadeIn:         { value: cfg.fadeIn },
    uFadeOut:        { value: cfg.fadeOut },
    uMouse:          { value: new THREE.Vector2(0, 0) },
    uMouseInfluence: { value: cfg.followMouse ? cfg.mouseInfluence : 0 },
    uHoverAmount:    { value: 0 },
    uHoverScale:     { value: cfg.hoverScale },
    uParallax:       { value: cfg.parallax },
    uBurst:          { value: 0 }
  };

  var material = new THREE.ShaderMaterial({
    vertexShader: MAGIC_RINGS_VERTEX_SHADER,
    fragmentShader: MAGIC_RINGS_FRAGMENT_SHADER,
    uniforms: uniforms,
    transparent: true
  });
  var quad = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
  scene.add(quad);

  var mouse = [0, 0], smoothMouse = [0, 0];
  var hoverAmount = 0, isHovered = false, burst = 0;
  var frameId = 0, elapsed = 0, lastT = 0;
  var isVisible = false, isPageVisible = !document.hidden;

  function resize() {
    var w = container.clientWidth, h = container.clientHeight;
    var dpr = Math.min(window.devicePixelRatio, 2);
    renderer.setSize(w, h);
    renderer.setPixelRatio(dpr);
    uniforms.uResolution.value.set(w * dpr, h * dpr);
  }
  resize();
  window.addEventListener('resize', resize);

  var ro = new ResizeObserver(resize);
  ro.observe(container);

  function onMouseMove(e) {
    var rect = container.getBoundingClientRect();
    mouse[0] = (e.clientX - rect.left) / rect.width - 0.5;
    mouse[1] = -((e.clientY - rect.top) / rect.height - 0.5);
  }
  function onMouseEnter() { isHovered = true; }
  function onMouseLeave() { isHovered = false; mouse[0] = 0; mouse[1] = 0; }
  function onClick() { if (cfg.clickBurst) burst = 1; }

  container.addEventListener('mousemove', onMouseMove);
  container.addEventListener('mouseenter', onMouseEnter);
  container.addEventListener('mouseleave', onMouseLeave);
  container.addEventListener('click', onClick);

  function animate(t) {
    frameId = requestAnimationFrame(animate);
    var dt = lastT === 0 ? 0 : Math.min(t - lastT, 100);
    lastT = t;
    elapsed += dt * 0.001 * cfg.speed;

    smoothMouse[0] += (mouse[0] - smoothMouse[0]) * 0.08;
    smoothMouse[1] += (mouse[1] - smoothMouse[1]) * 0.08;
    hoverAmount += ((isHovered ? 1 : 0) - hoverAmount) * 0.08;
    burst *= 0.95;
    if (burst < 0.001) burst = 0;

    uniforms.uTime.value = elapsed;
    uniforms.uMouse.value.set(smoothMouse[0], smoothMouse[1]);
    uniforms.uHoverAmount.value = hoverAmount;
    uniforms.uBurst.value = cfg.clickBurst ? burst : 0;

    renderer.render(scene, camera);
  }

  function tryStart() {
    if (isVisible && isPageVisible && frameId === 0) {
      lastT = 0;
      frameId = requestAnimationFrame(animate);
    }
  }
  function tryStop() {
    if (frameId !== 0) { cancelAnimationFrame(frameId); frameId = 0; }
  }

  var io = new IntersectionObserver(function(entries) {
    isVisible = entries[0].isIntersecting;
    isVisible ? tryStart() : tryStop();
  }, { threshold: 0 });
  io.observe(container);

  function onVisibility() {
    isPageVisible = !document.hidden;
    isPageVisible ? tryStart() : tryStop();
  }
  document.addEventListener('visibilitychange', onVisibility);
  tryStart();

  return {
    destroy: function() {
      tryStop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
      container.removeEventListener('click', onClick);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      renderer.dispose();
      material.dispose();
    }
  };
}
