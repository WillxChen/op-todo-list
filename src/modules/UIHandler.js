import List from "./List.js";
import Project from "./Project.js";
import ListRenderer from "./ListRenderer.js";

const currentProject = Project();
const listRenderer = ListRenderer();

const listElementsHandler = (() => {
  const input = document.querySelector("#list-input");

  const init = () => {
    const currentList = currentProject.getLists();
    if (currentList.length) {
      listRenderer.renderListElements(currentList);
    }
    // Replace with render function later
    // Bind list input
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();

        const title = e.target.value;
        const id = crypto.randomUUID().slice(0, 8);
        const newList = List(title, id);

        // Push list into database and update DOM
        currentProject.addList(newList);
        listRenderer.renderListElements([newList]);

        input.value = "";
      }
    });
  };

  return { init };
})();

export default listElementsHandler;
