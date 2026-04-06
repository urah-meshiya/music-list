export class TableView {
  constructor(CONFIG, dom) {
    this.CONFIG = CONFIG;
    this.dom = dom;

    this.dom.tableContainer.innerHTML += `
      <table>
        <thead></thead>
        <tbody></tbody>
      </table>
    `;

    this.thead = this.dom.tableContainer.querySelector("thead");
    this.tbody = this.dom.tableContainer.querySelector("tbody");

    this.updateHeight();
    window.addEventListener("resize", () => {
      this.updateHeight();
    });
  }

  updateHeight() {
    const calculatedHeight = window.innerHeight * 0.70 + "px";
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
        td.textContent = row[col];
        tr.appendChild(td);
      });

      if (this.CONFIG.grayoutTargetColumn && this.CONFIG.grayoutTargetText&& (row[this.CONFIG.grayoutTargetColumn] == this.CONFIG.grayoutTargetText)) {
        tr.classList.add("grayout");
      }

      this.tbody.appendChild(tr);
    });

    // 1件も追加されていない場合
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
    td.textContent = `Googleスプレッドシートの取得に失敗しました。\n${err}`;
    td.colSpan = this.CONFIG.displayColumns.length;
    tr.appendChild(td);
    this.tbody.appendChild(tr);
  }
}