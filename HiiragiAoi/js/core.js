import { CONFIG } from "./config.js";
import { App } from "../../components/js/app.js?v=142";

// ===== 一時デバッグ用（position: staticでbody先頭に強制表示） =====
(() => {
  const debugBox = document.createElement("div");
  debugBox.setAttribute("style",
    "position:static !important;" +
    "display:block !important;" +
    "background:#000 !important;" +
    "color:#0f0 !important;" +
    "font-size:12px !important;" +
    "line-height:1.5 !important;" +
    "padding:8px !important;" +
    "white-space:pre-wrap !important;" +
    "word-break:break-all !important;" +
    "z-index:2147483647 !important;"
  );
  debugBox.textContent = "DEBUG START\n";
  document.body.prepend(debugBox);

  const log = (msg) => { debugBox.textContent += msg + "\n"; };

  window.onerror = (msg, src, line, col) => {
    log(`[ERROR] ${msg} @${line}:${col}`);
  };

  log(`UA: ${navigator.userAgent}`);

  window.addEventListener("load", () => {
    setTimeout(() => {
      const el = document.querySelector("#tableContainer");
      const table = el?.querySelector("table");
      const tbody = el?.querySelector("tbody");

      log(`#tableContainer exists: ${!!el}`);
      log(`#tableContainer rect: ${el ? JSON.stringify(el.getBoundingClientRect()) : "N/A"}`);
      log(`#tableContainer computed display: ${el ? getComputedStyle(el).display : "N/A"}`);
      log(`table exists: ${!!table}`);
      log(`tbody rows: ${tbody?.rows?.length ?? "N/A"}`);
      log(`tbody innerHTML length: ${tbody?.innerHTML?.length ?? "N/A"}`);
      log(`body children count: ${document.body.children.length}`);
    }, 500);
  });
})();
// ===== ここまで =====

const app = new App(CONFIG);
await app.completed;
