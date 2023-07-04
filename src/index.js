import renderList from "./modules/List/ListRenderer.js";
import UserInterface from "./modules/UserInterface.js";

import { checkForProjects } from "./modules/localStorageHelper.js";

checkForProjects();
const UI = UserInterface;
UI.init();
