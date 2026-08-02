import { CONFIG } from "./config.js";
import { App } from "../../components/js/app.js";

// ===== 一時デバッグ用（原因特定できたら削除） =====
(() => {
  const debugBox = document.createElement("div");
  debugBox.style.cssText = `
    position: fixed; top: 0; left: 0; right: 0; z-index: 99999;
    background: #000; color: #0f0; font-size: 11px; line-height: 1.4;
    padding: 6px; white-space: pre-wrap; word-break: break-all;
    max-height: 40vh; overflow-y: auto;
  `;
  document.body.appendChild(debugBox);

  const log = (msg) => {
    debugBox.textContent += msg + "\n";
  };

  window.onerror = (msg, src, line, col, err) => {
    log(`[JS ERROR] ${msg} @${src}:${line}:${col}`);
  };

  log(`UA: ${navigator.userAgent}`);
  log(`innerHeight: ${window.innerHeight}, visualViewport: ${window.visualViewport?.height}`);

  window.addEventListener("load", () => {
    setTimeout(() => {
      const el = document.querySelector("#tableContainer");
      const table = el?.querySelector("table");
      const thead = el?.querySelector("thead");
      const tbody = el?.querySelector("tbody");

      const rect = (n) => n ? JSON.stringify(n.getBoundingClientRect()) : "null";
      const cs = (n, prop) => n ? getComputedStyle(n)[prop] : "null";

      log(`--- after load+500ms ---`);
      log(`#tableContainer rect: ${rect(el)}`);
      log(`#tableContainer computed height: ${cs(el, "height")}, overflow-y: ${cs(el, "overflowY")}`);
      log(`table rect: ${rect(table)}`);
      log(`thead rect: ${rect(thead)}, tbody rect: ${rect(tbody)}`);
      log(`thead rows: ${thead?.rows?.length}, tbody rows: ${tbody?.rows?.length}`);
      log(`tbody first row html len: ${tbody?.rows?.[0]?.innerHTML?.length}`);
    }, 500);
  });
})();
// ===== ここまで =====

const app = new App(CONFIG);
await app.completed;
