export class RandomPicker {
  constructor(CONFIG, dom) {
    this.CONFIG = CONFIG;
    this.dom = dom;

    this.dom.dialog.innerHTML = `
      <div id="randomDialogInner" >
        <button id="closeDialogBtn">×</button>
        <button id="copyRandomInfoBtn">📋</button>
        <div id="randomDisplay">${this.CONFIG.randomDisplayDefaultText ?? "スタートをおしてね"}</div>
        <div id="randomButtonWrap">
          <button id="toggleRandomBtn">${this.CONFIG.startRandomText ?? "スタート"}</button>
        </div>
      </div>
    `;

    this.displayEl = this.dom.dialog.querySelector("#randomDisplay");
    this.toggleBtn = this.dom.dialog.querySelector("#toggleRandomBtn");
    this.copyBtn = this.dom.dialog.querySelector("#copyRandomInfoBtn");
  
    this.interval = null;
    this.running = false;
    this.data = [];

    this.setEventListener();
  }

  setEventListener() {
    this.dom.openDialogBtn.addEventListener("click", () => {
      this.dom.dialog.showModal();
    });

    this.dom.dialog.querySelector("#closeDialogBtn").addEventListener("click", () => {
      this.stop();
      this.dom.dialog.close();
    });

    this.toggleBtn.addEventListener("click", () => {
      this.toggle();
    });

    this.copyBtn.addEventListener("click", () => {
      this.copyInfo();
    });
  }

  setData(data) {
    this.data = data;
  }

  start() {
    if (this.running) return;

    this.running = true;
    this.toggleBtn.textContent = this.CONFIG.stopRandomText ?? "ストップ";

    this.interval = setInterval(() => {
      if (!this.data.length) return;

      const row = this.data[Math.floor(Math.random() * this.data.length)];

      // 表示内容クリア
      this.displayEl.innerHTML = "";

      const primary = this.CONFIG.primaryCol
        ? row[this.CONFIG.primaryCol]
        : row.D;

      const secondary = this.CONFIG.secondaryCol
        ? row[this.CONFIG.secondaryCol]
        : row.E;

      const url =
        this.CONFIG.urlSrcCol && row[this.CONFIG.urlSrcCol]
          ? row[this.CONFIG.urlSrcCol]
          : null;

      let primaryEl;
      if (url) {
        const a = document.createElement("a");
        a.href = url;
        a.textContent = primary ?? "";
        a.target = "_blank";
        a.style.color = "inherit";
        a.style.textDecoration = "underline";

        primaryEl = a;
      } else {
        const span = document.createElement("span");
        span.textContent = primary ?? "";
        primaryEl = span;
      }

      this.displayEl.appendChild(primaryEl);

      // secondaryがある場合
      if (secondary) {
        const sep = document.createTextNode(" / ");
        const secondaryEl = document.createElement("span");
        secondaryEl.textContent = secondary;

        this.displayEl.appendChild(sep);
        this.displayEl.appendChild(secondaryEl);
      }
    }, 100);
  }

  stop() {
    this.running = false;
    this.toggleBtn.textContent = this.CONFIG.startRandomText ?? "スタート";

    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  toggle() {
    this.running ? this.stop() : this.start();
  }

  copyInfo() {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(this.displayEl.innerHTML)
      .then(() => {
        const originalText = this.copyBtn.innerHTML;
        this.copyBtn.innerHTML = "✓";
        setTimeout(() => {
          this.copyBtn.innerHTML = originalText;
        }, 2000);
      })
      .catch(err => {
        console.error("コピー失敗:", err);
      });
    } else {
        alert("コピー失敗。手動でコピーしてね。");
    }
  }
}
