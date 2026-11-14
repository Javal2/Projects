/* ==========================================================================
   CONTINUOUS AMBIENT FLUID SMOKE WAVE SIMULATION (ZERO CIRCULAR DOTS/POINTS)
   ========================================================================== */

class SmokeSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.time = 0;

    this.resize();
    this.bindEvents();
    this.animate();
  }

  resize() {
    if (!this.canvas) return;
    this.width = this.canvas.width = this.canvas.parentElement.clientWidth || window.innerWidth;
    this.height = this.canvas.height = this.canvas.parentElement.clientHeight || window.innerHeight;
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize());
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.time += 0.008;

    // Draw Smooth Continuous Fluid Ambient Smoke Waves (No circular dots/points)
    for (let i = 0; i < 3; i++) {
      this.ctx.save();
      const waveGradient = this.ctx.createLinearGradient(0, 0, this.width, this.height);
      const isAmber = i % 2 === 0;
      const alpha = 0.07 + i * 0.02;

      if (isAmber) {
        waveGradient.addColorStop(0, `rgba(232, 127, 36, 0)`);
        waveGradient.addColorStop(0.5, `rgba(232, 127, 36, ${alpha})`);
        waveGradient.addColorStop(1, `rgba(232, 127, 36, 0)`);
      } else {
        waveGradient.addColorStop(0, `rgba(168, 85, 247, 0)`);
        waveGradient.addColorStop(0.5, `rgba(168, 85, 247, ${alpha})`);
        waveGradient.addColorStop(1, `rgba(168, 85, 247, 0)`);
      }

      this.ctx.fillStyle = waveGradient;
      this.ctx.beginPath();
      this.ctx.moveTo(0, this.height);

      const waveFrequency = 0.003 + i * 0.001;
      const waveAmplitude = 35 + i * 20;
      const speed = this.time * (0.8 + i * 0.4);

      for (let x = 0; x <= this.width; x += 15) {
        const y = Math.sin(x * waveFrequency + speed) * waveAmplitude + (this.height * 0.45) + Math.cos(x * 0.002 + speed * 0.8) * 25;
        this.ctx.lineTo(x, y);
      }

      this.ctx.lineTo(this.width, this.height);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.restore();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    new SmokeSystem('hero-smoke-canvas');
    new SmokeSystem('preloader-smoke-canvas');
    new SmokeSystem('beaker-banner-smoke');
    new SmokeSystem('bongs-banner-smoke');
    new SmokeSystem('pipes-banner-smoke');
    new SmokeSystem('acc-banner-smoke');
  }, 100);
});
