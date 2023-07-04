import Project from "./Project.js";
import { checkForLists } from "./List/ListHandler.js";
import { createList } from "./EventHandler.js";
import store from "./store.js";
import pubSub from "./pubSub.js";
import { retrieveItem, reconstructProjects } from "./localStorageHelper.js";

const UserInterface = (() => {
  const input = document.querySelector("#list-input");

  const init = () => {
    const currentProject = store.getCurrentProject();

    input.addEventListener("keydown", (e) => {
      createList(e, currentProject);
    });
  };

  return { init };
})();

export default UserInterface;
