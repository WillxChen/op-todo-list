import Project from "./Project.js";
import { checkForLists } from "./ListHandler.js";
import { handleCreateListInput } from "./EventHandler.js";

const currentProject = Project();
sessionStorage.setItem("currentProject", JSON.stringify(currentProject));
console.log(JSON.parse(sessionStorage.currentProject));

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
