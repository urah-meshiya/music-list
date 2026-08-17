import { common } from "./common.js";
import { SheetService } from "./sheetService.js";
import { TableView } from "./tableView.js";
import { Tab } from "./tab.js";
import { Search } from "./search.js";
import { RandomPicker } from "./randomPicker.js";
import { RequestHistory } from "./requestHistory.js";
import { Counter } from "./counter.js";
import { ShootingStars } from "./shootingStars.js";

export class App {
  constructor(CONFIG) {
    this.CONFIG = CONFIG;
    this.data = [];

    this.dom = {
      title: document.querySelector("#title"),
      tableContainer: document.querySelector("#tableContainer"),
      tabArea: document.querySelector("#tabArea"),
      tabs: document.querySelectorAll("#tabArea button"),
      search: document.querySelector("#search"),
      dialog: document.querySelector("#randomDialog"),
      openDialogBtn: document.querySelector("#openModalBtn"),
      openHistoryModalBtn: document.querySelector("#openHistoryModalBtn"),
      counter: document.querySelector("#counter"),
      shootingStarBtn: document.querySelector("#onShootingStar"),
      pagingBtn: document.querySelector("#pagingBtn")
    };

    this.sheetService = new SheetService(this.CONFIG);
    this.sheetService.addEventListener("execPaging", (e) => {
      this.handlePaging(e.detail);
    });

    if (this.dom.tableContainer) {
      this.tableView = new TableView(this.CONFIG, this.dom);
      this.tableView.setupHeaderDescription();
    }
    
    if (this.dom.tabArea) {
      this.tab = new Tab(this.CONFIG, this.dom);
      this.tab.addEventListener("execSort", (e) => {
        this.tableView?.renderBody(e.detail);
        this.counter?.setData(e.detail);
        this.search?.applyFilter();
      });
    }

    if (this.dom.search) {
      this.search = new Search(this.CONFIG, this.dom);
      this.search.addEventListener("execSearch", (e) => {
        this.tableView?.renderBody(e.detail);
        this.counter?.setData(e.detail);
      });
    }

    if (this.dom.dialog && this.dom.openDialogBtn) {
      this.randomPicker = new RandomPicker(this.CONFIG, this.dom);
    }

    if (this.dom.dialog && this.dom.openHistoryModalBtn) {
      this.openHistoryModalBtn = new RequestHistory(this.CONFIG, this.dom);
    }
      
    if (this.dom.counter) {
      this.counter = new Counter(this.CONFIG, this.dom);
    }

    if (this.dom.shootingStarBtn) {
      this.shootingStars = new ShootingStars(this.CONFIG);
    }

    this.completed = this.init();
    this.addInformation();
  }

  init(index = 0) {
    return (async () => {
      this.setupTitle();

      try {
        const result = await this.sheetService.fetch(index);
        this.header = result.header;
        this.data = result.data;

        this.tableView?.render(this.header, this.data);
        this.tab?.setData(this.data);
        this.search?.setData(this.data);
        this.randomPicker?.setData(this.data);
        this.counter?.setData(this.data);

      } catch (err) {
        console.error("init fetch error:", err);
        this.data = [];
        this.tableView?.errFetch(err);
      } finally {
        // 最新のスピナーDOMを取得して削除
        document.querySelector("#tableSpinner")?.remove();
      }
    })();
  }

  // 切替ボタン押下時の一連の処理（ローディング表示 → 再取得 → ソートリセット）
  async handlePaging(index) {
    // 連打対策：処理中は以降の呼び出しを無視
    if (this._isPaging) return;
    this._isPaging = true;

    const btn = this.dom.pagingBtn;
    let originalHtml;

    if (btn) {
      originalHtml = btn.innerHTML;

      // 差し替え前の横幅を固定しておく（スピナーだけになって縮むのを防ぐ）
      const rect = btn.getBoundingClientRect();
      btn.style.width = `${rect.width}px`;

      // #pagingBtnはdiv要素のためdisabledは効かない → pointer-eventsでクリックを物理的にブロック
      btn.classList.add("is-disabled");
      btn.innerHTML = `<span class="btn-spinner"></span>`;
    }

    this.showTableSpinner();

    try {
      await this.init(index);
    } finally {
      this.hideTableSpinner();

      if (btn) {
        btn.classList.remove("is-disabled");
        btn.innerHTML = originalHtml;
        btn.style.width = ""; // 固定幅解除、元のautoレイアウトに戻す
      }

      // ソートタブの選択を1番左に戻す
      this.tab?.resetToFirst();

      this._isPaging = false;
    }
  }

  showTableSpinner() {
    if (!this.dom.tableContainer) return;

    // 切替元のテーブルを隠す
    this.dom.tableContainer.classList.add("loading");

    if (document.querySelector("#tableSpinner")) return;

    this.dom.tableContainer.insertAdjacentHTML(
      "afterbegin",
      `
      <div id="tableSpinner">
        <div class="spinner" aria-label="nowloading"></div>
        <p>読込中...</p>
      </div>
      `
    );
  }

  showTableSpinner() {
    if (!this.dom.tableContainer) return;

    // 切替元のテーブルを隠す
    this.dom.tableContainer.classList.add("loading");

    if (document.querySelector("#tableSpinner")) return;

    this.dom.tableContainer.insertAdjacentHTML(
      "afterbegin",
      `
      <div id="tableSpinner">
        <div class="spinner" aria-label="nowloading"></div>
        <p>読込中...</p>
      </div>
      `
    );
  }

  hideTableSpinner() {
    this.dom.tableContainer?.classList.remove("loading");
  }

  setupTitle() {
    document.title = this.CONFIG.title;
    this.dom.title.innerHTML = this.CONFIG.title;
  }

  addInformation = () => {
    // =========================
    // HTML追加
    // =========================
    document.body.insertAdjacentHTML(
    "beforeend",
    `
    <!-- 右下ボタン -->
    <button class="info-corner-btn" id="openInfoModal">
      <span class="material-symbols-outlined">
        ≡
      </span>
    </button>

    <!-- モーダル -->
    <div class="modal-overlay" id="infoModalOverlay">
      <div class="modal">
        <button class="close-btn" id="closeInfoModal">×</button>
        <h3>Information</h3>
        <div>
          歌リクくん (ver.${common.version}) <br>
          このシステムの詳細は<b><a href="https://urah-meshiya.github.io/music-list/overview.html" target="__blank">こちら</a></b>
        </div>
      </div>
    </div>
    `
    );

    const openBtn = document.getElementById("openInfoModal");
    const closeBtn = document.getElementById("closeInfoModal");
    const overlay = document.getElementById("infoModalOverlay");

    openBtn.addEventListener("click", () => {
      overlay.classList.add("open");
    });

    closeBtn.addEventListener("click", () => {
      overlay.classList.remove("open");
    });

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.classList.remove("open");
      }
    });
  }

}