import { post } from "./sendRequest.js";

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
  }

  updateHeight() {
    const calculatedHeight =
      window.innerHeight * (this.CONFIG.tableHeightRatio ?? 0.70) + "px";

    this.dom.tableContainer.style.height = calculatedHeight;
    this.dom.tableContainer.style.minHeight = calculatedHeight;
    this.dom.tableContainer.style.maxHeight = calculatedHeight;
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
              alert("ごめん、この機能まだできてない");
              return;

              e.stopPropagation();

              const musicInfo =
                `${row[this.CONFIG.primaryCol]}${row[this.CONFIG.secondaryCol] ? " / " + row[this.CONFIG.secondaryCol] : ""}`;

              if (!confirm(`${musicInfo} をリクエストしますか？`)) {
                return;
              }

              post(musicInfo, this.CONFIG);
            });

            td.appendChild(btn);
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

            icon.addEventListener("click", (e) => {
              e.stopPropagation();

              this.tooltip.textContent = row[this.CONFIG.infoSrcCol];

              const rect = icon.getBoundingClientRect();

              this.tooltip.style.left =
                rect.left + window.scrollX + "px";

              this.tooltip.style.top =
                rect.bottom + window.scrollY + "px";

              this.tooltip.classList.add("visible");
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