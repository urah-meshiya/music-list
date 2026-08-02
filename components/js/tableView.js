import { showRequestModal, sendRequest } from "./sendRequest.js";

export class TableView {
  constructor(CONFIG, dom) {
    this.CONFIG = CONFIG;
    this.dom = dom;

    this.dom.tableContainer.innerHTML += `
      <table>
        <thead></thead>
        <tbody></tbody>
      </table>
      <div id="tooltip"></div>
    `;

    this.thead = this.dom.tableContainer.querySelector("thead");
    this.tbody = this.dom.tableContainer.querySelector("tbody");
    this.tooltip = this.dom.tableContainer.querySelector("#tooltip");

    document.addEventListener("click", () => {
      this.tooltip.classList.remove("visible");
    });

    this.updateHeight();

    window.addEventListener("resize", () => {
      this.updateHeight();
    });

    // WebViewのビューポート確定が遅れるケースの保険
    window.addEventListener("load", () => this.updateHeight());
    setTimeout(() => this.updateHeight(), 300);

    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", () => this.updateHeight());
    }
  }

  updateHeight() {
    const vh =
      window.visualViewport?.height ||
      document.documentElement.clientHeight ||
      window.innerHeight;

    if (!vh || vh < 200) { return;}

    const calculatedHeight = vh * (this.CONFIG.tableHeightRatio ?? 0.70) + "px";

    this.dom.tableContainer.style.height = calculatedHeight;
    this.dom.tableContainer.style.minHeight = calculatedHeight;
    this.dom.tableContainer.style.maxHeight = calculatedHeight;
  }

  // ツールチップを表示する共通処理（対象要素の直下に配置）
  showTooltipFor(targetEl, text) {
    this.tooltip.textContent = text;

    const targetRect = targetEl.getBoundingClientRect();
    const containerRect = this.dom.tableContainer.getBoundingClientRect();
    this.tooltip.style.left = (targetRect.left - containerRect.left + this.dom.tableContainer.scrollLeft + 20) + "px";
    this.tooltip.style.top = (targetRect.bottom - containerRect.top + this.dom.tableContainer.scrollTop - 20) + "px";

    this.tooltip.classList.add("visible");
  }

  // thead th:first-child にマウスオーバー/クリックで説明を表示（CONFIG.theadDescription がある場合のみ）
  setupHeaderDescription() {
    if (!this.CONFIG.theadDescription) return;

    const getFirstTh = () => this.thead.querySelector("th:first-child");

    // PC: ホバーで表示/非表示
    this.thead.addEventListener("mouseover", (e) => {
      const th = e.target.closest("th");
      if (!th || th !== getFirstTh()) return;
      this.showTooltipFor(th, this.CONFIG.theadDescription);
    });

    this.thead.addEventListener("mouseout", (e) => {
      const th = e.target.closest("th");
      if (!th || th !== getFirstTh()) return;
      if (th.contains(e.relatedTarget)) return;
      this.tooltip.classList.remove("visible");
    });

    // スマホ/タップ対応: クリックで表示（外側クリックでの非表示は既存のdocumentリスナーに委任）
    this.thead.addEventListener("click", (e) => {
      const th = e.target.closest("th");
      if (!th || th !== getFirstTh()) return;
      e.stopPropagation();
      this.showTooltipFor(th, this.CONFIG.theadDescription);
    });
  }

  render(header, data) {
    this.renderHeader(header);
    this.renderBody(data);
  }

  renderHeader(header) {
    this.thead.innerHTML = "";

    const tr = document.createElement("tr");

    this.CONFIG.displayColumns.forEach(col => {
      const th = document.createElement("th");
      th.textContent = header[this.CONFIG.columnIndex[col]] || "";
      tr.appendChild(th);
    });

    this.thead.appendChild(tr);
  }

  renderBody(data) {
    this.tbody.innerHTML = "";

    data.forEach(row => {
      const tr = document.createElement("tr");

      this.CONFIG.displayColumns.forEach(col => {
        const td = document.createElement("td");

        const isRequestCol =
          this.CONFIG.requestButtonColumn &&
          col === this.CONFIG.requestButtonColumn;

        const isCopyCol =
          this.CONFIG.copyButtonColumn &&
          col === this.CONFIG.copyButtonColumn;

        if (isRequestCol || isCopyCol) {

          if (isRequestCol) {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "requestBtn";
            btn.textContent = "ﾘｸ";

            btn.addEventListener("click", async (e) => {
              e.stopPropagation();

              const musicInfo = `${row[this.CONFIG.primaryCol]}${row[this.CONFIG.secondaryCol] ? " / " + row[this.CONFIG.secondaryCol] : ""}`;
              let movieUrl = null;
              if (this.CONFIG.urlSrcCol && row[this.CONFIG.urlSrcCol] != "") {
                movieUrl = row[this.CONFIG.urlSrcCol];
              }

              showRequestModal(
                `『${musicInfo}』<br> をリクエストしますか？`,
                this.CONFIG,
                async () => {
                  const requestBtns = document.querySelectorAll(".requestBtn");

                  requestBtns.forEach(btn => {btn.disabled = true;});
                  try {
                    return await sendRequest(musicInfo, movieUrl, this.CONFIG);
                  } finally {
                    requestBtns.forEach(btn => {btn.disabled = false;});
                  }
                }
              );
            });
            // グレーアウト行にはリクボタンを表示しない
            if (!td.parentElement?.classList.contains('grayout')) {
              td.appendChild(btn);
            }
          }

          if (isCopyCol) {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "copyBtn";
            btn.textContent = "📋";

            btn.addEventListener("click", async (e) => {
              e.stopPropagation();

              const musicInfo =
                `${row[this.CONFIG.primaryCol]}${row[this.CONFIG.secondaryCol] ? " / " + row[this.CONFIG.secondaryCol] : ""}`;

              try {
                await navigator.clipboard.writeText(musicInfo);

                btn.textContent = "✓";
                btn.disabled = true;

                setTimeout(() => {
                  btn.textContent = "📋";
                  btn.disabled = false;
                }, 2000);
              } catch (err) {
                console.error(err);
              }
            });

            td.appendChild(btn);
          }

        } else {
          const span = document.createElement("span");
          span.textContent = row[col] ?? "";

          // リンクの追加
          if (
            this.CONFIG.urlSrcCol &&
            this.CONFIG.urlTargetCol &&
            col === this.CONFIG.urlTargetCol &&
            row[this.CONFIG.urlSrcCol]
          ) {
            const a = document.createElement("a");
            a.href = row[this.CONFIG.urlSrcCol];
            a.target = "_blank";
            a.rel = "noopener noreferrer";
            a.appendChild(span);
            td.appendChild(a);
          } else {
            td.appendChild(span);
          }

          // 情報アイコンの追加
          if (
            this.CONFIG.infoIconCol &&
            this.CONFIG.infoSrcCol &&
            col === this.CONFIG.infoIconCol &&
            row[this.CONFIG.infoSrcCol]
          ) {
            const icon = document.createElement("span");
            icon.classList.add("info-icon");
            icon.textContent = "ⓘ";

            // PC: ホバーで表示/非表示
            icon.addEventListener("mouseover", (e) => {
              this.showTooltipFor(icon, row[this.CONFIG.infoSrcCol]);
            });

            icon.addEventListener("mouseout", (e) => {
              if (icon.contains(e.relatedTarget)) return;
              this.tooltip.classList.remove("visible");
            });

            // スマホ/タップ対応: クリックで表示
            icon.addEventListener("click", (e) => {
              e.stopPropagation();
              this.showTooltipFor(icon, row[this.CONFIG.infoSrcCol]);
            });

            td.appendChild(icon);
          }
        }

        tr.appendChild(td);
      });

      // グレーアウトする行の設定
      if (
        this.CONFIG.grayoutTargetColumn &&
        this.CONFIG.grayoutTargetText &&
        row[this.CONFIG.grayoutTargetColumn] == this.CONFIG.grayoutTargetText
      ) {
        tr.classList.add("grayout");
      }

      this.tbody.appendChild(tr);
    });

    if (this.tbody.children.length === 0) {
      const tr = document.createElement("tr");
      const td = document.createElement("td");

      td.textContent = "条件にあてはまる曲はありません。";
      td.colSpan = this.CONFIG.displayColumns.length;

      tr.appendChild(td);
      this.tbody.appendChild(tr);
    }
  }

  errFetch(err) {
    const tr = document.createElement("tr");
    const td = document.createElement("td");

    td.textContent =
      `Googleスプレッドシートの取得に失敗しました。\n${err}`;

    td.colSpan = this.CONFIG.displayColumns.length;

    tr.appendChild(td);
    this.tbody.appendChild(tr);
  }
}