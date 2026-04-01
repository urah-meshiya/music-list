export class ShootingStars {
  constructor(CONFIG = {}) {
    const DEFAULT_CONFIG = {
      ss_imageUrls: [],
      ss_interval: 100,
      ss_maxStars: 60,
      ss_spawnRate: 0.8,
      ss_size: { min: 20, max: 80 },
      ss_duration: { min: 1500, max: 3000 },
      ss_startXRange: { min: 0.1, max: 2.0 },
      ss_startYRange: { min: -100, max: 0 },
      ss_moveXRange: { min: 400, max: null },
      ss_moveYRange: { min: 0.5, max: 1.0 },
      ss_rotate: { min: 0, max: 360 },
      ss_buttonSelector: "#onShootingStar",
      ss_activeClass: "active"
    };

    this.config = this.mergeConfig(DEFAULT_CONFIG, CONFIG);

    if (CONFIG.ss_imageUrls && this.config.ss_imageUrls.length === 0) {
      this.config.ss_imageUrls = [CONFIG.ss_imageUrls];
    }

    this.isRunning = false;
    this.activeStars = 0;

    this.btn = document.querySelector(this.config.ss_buttonSelector); // 保持
    if (this.btn) {
      this.btn.addEventListener("click", () => this.toggle());
    }

    this.lastSpawn = 0;
    this.loop = this.loop.bind(this);
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    if (this.btn) {
      this.btn.classList.add(this.config.ss_activeClass);
    }
    requestAnimationFrame(this.loop);
  }

  stop() {
    this.isRunning = false;
    if (this.btn) {
      this.btn.classList.remove(this.config.ss_activeClass);
    }
  }

  toggle() {
    this.isRunning ? this.stop() : this.start();
  }

  loop(now) {
    if (!this.isRunning) return;
    if (now - this.lastSpawn >= this.config.ss_interval) {
      this.lastSpawn = now;
      if (this.activeStars < this.config.ss_maxStars) {
        if (Math.random() < this.config.ss_spawnRate) {
          this.createStar();
        }
      }
    }
    requestAnimationFrame(this.loop);
  }

  createStar() {
    this.activeStars++;

    const img = document.createElement("img");
    img.src = this.getRandomImage();
    img.className = "star";

    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const size = this.random(this.config.ss_size.min, this.config.ss_size.max);
    img.style.width = `${size}px`;

    const startX = this.random(
      vw * this.config.ss_startXRange.min,
      vw * this.config.ss_startXRange.max
    );
    const startY = this.random(
      this.config.ss_startYRange.min,
      this.config.ss_startYRange.max
    );

    img.style.left = `${startX}px`;
    img.style.top = `${startY}px`;

    document.body.appendChild(img);

    const moveXMax = this.config.ss_moveXRange.max ?? vw;
    const moveX = -this.random(this.config.ss_moveXRange.min, moveXMax);

    const moveY = this.random(
      vh * this.config.ss_moveYRange.min,
      vh * this.config.ss_moveYRange.max
    );

    const duration = this.random(
      this.config.ss_duration.min,
      this.config.ss_duration.max
    );

    const rotate = this.random(
      this.config.ss_rotate.min,
      this.config.ss_rotate.max
    );

    const animation = img.animate(
      [
        { transform: "translate(0, 0) rotate(0deg)", opacity: 1 },
        {
          transform: `translate(${moveX}px, ${moveY}px) rotate(${rotate}deg)`,
          opacity: 0
        }
      ],
      {
        duration: duration,
        easing: "linear",
        fill: "forwards"
      }
    );

    animation.onfinish = () => {
      img.remove();
      this.activeStars--;
    };
  }

  getRandomImage() {
    const list = this.config.ss_imageUrls;
    if (!list.length) return "";
    return list[Math.floor(Math.random() * list.length)];
  }

  random(min, max) {
    return Math.random() * (max - min) + min;
  }

  mergeConfig(defaults, custom) {
    const result = { ...defaults };

    for (const key in custom) {
      if (
        typeof custom[key] === "object" &&
        custom[key] !== null &&
        !Array.isArray(custom[key])
      ) {
        result[key] = { ...defaults[key], ...custom[key] };
      } else {
        result[key] = custom[key];
      }
    }

    return result;
  }
}