export class Search extends EventTarget {
  constructor(CONFIG, dom) {
    super();

    this.CONFIG = CONFIG;
    this.dom = dom;

    this.dom.search.innerHTML = `
      <div id="searchInner">
        <button id="searchTargetBtn" class="searchTargetBtn"></button>
        <input id="inputSearch" placeholder="">
        <button id="clearSearchBtn">ｸﾘｱ</button>
      </div>
    `;

    this.searchTargetBtn = this.dom.search.querySelector("#searchTargetBtn");

    this.inputSearch = this.dom.search.querySelector("#inputSearch");
    this.clearSearchBtn = this.dom.search.querySelector("#clearSearchBtn");

    this._debounceTimer = null;
    this.targetNum = 0;

    this.setupSearchTarget();
    this.renderSearch();
    this.bindEvents();
  }

  setData(data) {
    this.data = data;
  }

  setupSearchTarget() {
    this.searchTargetBtn.addEventListener("click", () => {
      this.renderSearch();
    });
  }
  
  renderSearch() {
    const target = Object.values(this.CONFIG.searchTargets)[this.targetNum];
    this.searchTargetBtn.dataset.searchTarget = target.col;
    this.searchTargetBtn.dataset.type = target.type;
    this.searchTargetBtn.innerHTML = target.icon;
    if ( this.targetNum < Object.keys(this.CONFIG.searchTargets).length - 1) {
      this.targetNum++;
    } else {
      this.targetNum = 0;
    }

    if (!this.searchTargetBtn) {
      this.inputSearch.placeholder = "";
      return;
    }
    this.inputSearch.placeholder = target.type + "で検索";
    this.applyFilter();
  }

  bindEvents() {
    this.inputSearch.addEventListener("input", (e) => {
      const value = e.target.value;
      clearTimeout(this._debounceTimer);
      this._debounceTimer = setTimeout(() => {
        this.applyFilter(value);
      }, 300);
    });

    this.clearSearchBtn.addEventListener("click", () => {
      this.clearInput();
      if (!this.data) return;
      this.dispatchEvent(new CustomEvent("execSearch", { detail: this.data }));
    });
  }

  applyFilter(keyword = this.inputSearch.value) {
    if (!this.data) return;

    const key = this.searchTargetBtn.dataset.searchTarget ?? 'A';
    const normalizedKeyword = keyword.trim().toLowerCase();
    const appendCol = Object.values(this.CONFIG.searchTargets).find(t => t.col === key)?.appendCol;
    const matchConditions = this.CONFIG.matchingConditions ?? "include";

    const filtered = this.data.filter((row) => {
      const col = row[key];

      if (col == null) return false;
      
      const targets = (appendCol === "" ? [col] : [col, row[appendCol]]);
      let match = false;
      const matcher = matchConditions === "startsWith"
        ? (v) => String(v).toLowerCase().startsWith(normalizedKeyword)
        : (v) => String(v).toLowerCase().includes(normalizedKeyword);

      match = targets.some(v => v != null && matcher(v));
      return normalizedKeyword === "" || match;
    });

    this.dispatchEvent(new CustomEvent("execSearch", { detail: filtered }));
  }

  clearInput() {
    this.inputSearch.value = "";
  }
}