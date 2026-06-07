export class RequestHistory {
  constructor(CONFIG, dom) {
    this.CONFIG = CONFIG;
    this.dom = dom;

    this.historyModal = document.createElement("dialog");

    this.historyModal.innerHTML = `
      <iframe
        src="https://sing-request.ponzu946.workers.dev/?user=${this.CONFIG.twicasName ?? "https://www.google.com/"}"
        style="width:100%; height:80vh; border:none;"
      ></iframe>
    `;

    document.body.appendChild(this.historyModal);

    this.historyModal.addEventListener("click", (e) => {
      const rect = this.historyModal.getBoundingClientRect();

      const isInDialog =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width;

      if (!isInDialog) {
        this.historyModal.close();
      }
    });

    this.dom.openHistoryModalBtn.addEventListener("click", () => {
      this.historyModal.showModal();
    });
  }
}