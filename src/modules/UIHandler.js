import appendCustomElement from "./appendCustomElement.js";
import List from "./List.js";
import Project from "./Project.js";

const currentProject = Project();
const listStorage = currentProject.getLists();

const listElementsHandler = (() => {
  const input = document.querySelector("#list-input");

  const init = () => {
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
        renderListElements([newList]);

        input.value = "";
      }
    });
  };

  const renderListElements = (lists) => {
    lists.forEach((list) => {
      const id = list.getId();
      const listDataId = `[data-id="${id}"]`;

      // Create and append all list elements
      // append(target, tagName, classList, textContent, attributes)
      appendCustomElement(".list-container", "div", ["list"], undefined, [
        "data-id",
        id,
      ]);
      const listElement = document.querySelector(`[data-id="${id}"]`);
      appendCustomElement(listDataId, "h2", undefined, list.getTitle());
      document
        .querySelector(listDataId)
        .appendChild(createTaskForm(listElement, list));
      appendCustomElement(listDataId, "div", "task-container");
      const taskContainer = listElement.querySelector(".task-container");
      const taskElements = createTaskElements(list.getTasks());
      renderTaskElements(taskContainer, taskElements);
    });
  };

  const createTaskForm = (target, list) => {
    // Create form and append input
    const taskForm = document.createElement("form");
    taskForm.className = "task-form";
    const taskInput = document.createElement("input");
    taskInput.className = "task-input";
    taskForm.appendChild(taskInput);

    // Bind input listener to monitor task entries
    taskInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const title = e.target.value;
        // Create a new task entry
        const newTask = list.createTask(title);
        // Create and render task elements
        const taskElement = createTaskElements([newTask]);
        renderTaskElements(target, taskElement);

        taskInput.value = "";
      }
    });
    return taskForm;
  };

  const renderTaskElements = (target, tasks) => {
    tasks.forEach((task) => {
      target.appendChild(task);
    });
  };

  const createTaskElements = (tasks) => {
    return tasks.map((task) => {
      const div = document.createElement("div");
      div.className = "task";
      const p = document.createElement("p");
      p.textContent = task.title;
      div.appendChild(p);
      return div;
    });
  };

  return { init, renderListElements };
})();

export default listElementsHandler;
