export class Tab extends EventTarget {
  constructor(CONFIG, dom) {
    super();
    
    this.CONFIG = CONFIG;
    this.dom = dom;
    this.collator = new Intl.Collator("ja", {
      numeric: true,
      sensitivity: "base"
    });

    this.setupTabs();
  }
  
  setData(data) {
    this.data = data;
  }

  setupTabs() {
    let html = "";
    let isFirst = true;

    Object.entries(this.CONFIG.sortTab).forEach(([key, label]) => {
      html += `<button data-sort-by="${key}" class="tab${isFirst ? " selected" : ""}">${label}</button>`;
      isFirst = false;
    });

    this.dom.tabArea.insertAdjacentHTML('afterbegin', html);

    this.dom.tabs = this.dom.tabArea.querySelectorAll("button");

    this.dom.tabArea.addEventListener("click", (e) => {
      const tab = e.target.closest("button");
      if (!tab) return;

      this.dom.tabs.forEach(b => b.classList.remove("selected"));
      tab.classList.add("selected");
      this.sortBy(tab.dataset.sortBy);
    });
  }

  sortBy(column) {
    this.data.sort((a, b) => this.compare(a[column], b[column]));
    this.dispatchEvent(new CustomEvent("execSort", {detail: this.data}));
  }

  compare(a, b) {
    if (!a && !b) return 0;
    if (!a) return 1;
    if (!b) return -1;

    const numA = Number(a);
    const numB = Number(b);

    if (!isNaN(numA) && !isNaN(numB)) {
      return numA - numB;
    }

    return this.collator.compare(a, b);
  }
}