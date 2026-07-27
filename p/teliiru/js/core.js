import { CONFIG } from "./config.js";
import { App } from "../../../components/js/app.js";

const app = new App(CONFIG);
await app.completed;
