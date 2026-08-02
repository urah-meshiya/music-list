import { CONFIG } from "./config.js";
import { App } from "../../components/js/app.js?v=142";

const app = new App(CONFIG);
await app.completed;
