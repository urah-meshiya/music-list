import { SheetService } from "./sheetService.js";
import { TableView } from "./tableView.js";
import { Tab } from "./tab.js";
import { Search } from "./search.js";
import { RandomPicker } from "./randomPicker.js";
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
      shootingStarBtn: document.querySelector("#onShootingStar")
    };

    this.sheetService = new SheetService(this.CONFIG);

    if (this.dom.tableContainer) {
      this.tableView = new TableView(this.CONFIG, this.dom);

      if (this.dom.tabArea) {
        this.tab = new Tab(this.CONFIG, this.dom);
        this.tab.addEventListener("execSort", (e) => {
          this.tableView.renderBody(e.detail);
        });
      }

      if (this.dom.search) {
        this.search = new Search(this.CONFIG, this.dom);
        this.search.addEventListener("execSearch", (e) => {this.tableView.renderBody(e.detail);});
      }

      if (this.dom.dialog && this.dom.openDialogBtn) {
        this.randomPicker = new RandomPicker(this.CONFIG, this.dom);
      }
    }

    if (this.dom.shootingStarBtn) {
      this.shootingStars = new ShootingStars(this.CONFIG);
    }

    this.completed = this.init();
  }

  async init() {
    this.setupTitle();

    const { header, data } = await this.sheetService.fetch();
    this.data = data;

    this.tableView ? this.tableView.render(header, this.data) : '';
    this.tab ? this.tab.setData(this.data) : '';
    this.search ? this.search.setData(this.data) : '';
    this.randomPicker ? this.randomPicker.setData(this.data) : '';
  }

  setupTitle() {
    document.title = this.CONFIG.title;
    this.dom.title.innerHTML = this.CONFIG.title;
  }

}
