import Project from "./Project.js";
import { handleCreateListInput } from "./EventHandler.js";
import { checkForLists } from "./ListHandler.js";

const currentProject = Project();

const UserInterface = (() => {
  const input = document.querySelector("#list-input");

  const init = () => {
    checkForLists(currentProject);

    input.addEventListener("keydown", (e) => {
      handleCreateListInput(e, currentProject);
    });
  };

  return { init };
})();

export default UserInterface;
