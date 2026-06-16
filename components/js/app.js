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
      shootingStarBtn: document.querySelector("#onShootingStar")
    };

    this.sheetService = new SheetService(this.CONFIG);
    this.sheetService.addEventListener("execPaging", (e) => {
      this.init(e.detail);
    });

    if (this.dom.tableContainer) {
      this.tableView = new TableView(this.CONFIG, this.dom);
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
    <div class="modal-overlay" id="modalOverlay">
      <div class="modal">
        <button class="close-btn" id="closeModal">×</button>
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
    const closeBtn = document.getElementById("closeModal");
    const overlay = document.getElementById("modalOverlay");

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
