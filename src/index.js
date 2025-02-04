import { initializeDOM } from "./modules/dom.js";
import { initializeForms  } from "./modules/forms.js";
import { initializeStorage } from "./modules/localStorage.js";
import "./style.css";


alert('Left click to select a task/project. Right click to modify it.');
initializeStorage();
initializeDOM();
initializeForms();