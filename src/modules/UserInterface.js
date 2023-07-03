import Project from "./Project.js";
import { checkForLists } from "./List/ListHandler.js";
import { createList } from "./EventHandler.js";
import store from "./store.js";

store.addProject(Project("Default"));
const currentProject = store.getProjects()[0];

const UserInterface = (() => {
  const input = document.querySelector("#list-input");

  const init = () => {
    checkForLists(currentProject);

    input.addEventListener("keydown", (e) => {
      createList(e, currentProject);
    });
  };

  return { init };
})();

export default UserInterface;
