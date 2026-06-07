import { CONFIG } from "./config.js";
import { App } from "../../../components/js/app.js";

const app = new App(CONFIG);
await app.completed;

const openHistoryModalBtn = document.querySelector('#openHistoryModalBtn');

const historyModal = document.createElement('dialog');
historyModal.innerHTML = `
    <iframe
        src="https://sing-request.ponzu946.workers.dev/?user=ao_2h5"
        style="width:100%; height:80vh; border:none;"
    ></iframe>
`;

document.body.appendChild(historyModal);

openHistoryModalBtn.addEventListener('click', () => {
    historyModal.showModal();
});

historyModal.addEventListener('click', (e) => {
    const rect = historyModal.getBoundingClientRect();

    const isInDialog =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width;

    if (!isInDialog) {
        historyModal.close();
    }
});