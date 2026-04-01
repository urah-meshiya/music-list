import { CONFIG } from "./config.js";
import { App } from "../../components/js/app.js";

const app = new App(CONFIG);
await app.completed;

// ユーザ毎のカスタムJS
const th = app.dom.tableContainer.querySelector("thead th:first-child");
const tooltip = document.querySelector("#tooltip");
const DESCRIPTION = "＜オススメ度＞\n×＜▲＜(空欄)＜○＜◎＜★";

let isOpen = false;

function show(x, y) {
  tooltip.textContent = DESCRIPTION;
  tooltip.style.display = "block";

  const offset = 8;
  tooltip.style.left = x + offset + "px";
  tooltip.style.top = y - tooltip.offsetHeight - offset + "px";

  isOpen = true;
}

function hide() {
  tooltip.style.display = "none";
  isOpen = false;
}

th.addEventListener("mouseenter", () => {
  tooltip.textContent = DESCRIPTION;
  tooltip.style.display = "block";
});

th.addEventListener("mousemove", (e) => {
  show(e.clientX, e.clientY);
});

th.addEventListener("mouseleave", hide);

th.addEventListener("click", (e) => {
  e.stopPropagation();
  const rect = th.getBoundingClientRect();
  show(rect.right, rect.top);
});

document.addEventListener("click", hide);
