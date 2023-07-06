import {
  appendCustomElement,
  createCustomElement,
} from "../Helpers/customElementHelper.js";
import { createTask } from "../EventHandler.js";
import { editTitle } from "../List/ListHandler.js";
import pubSub from "../pubSub.js";

pubSub.subscribe("listCreated", renderList);
pubSub.subscribe("listReconstructed", renderList);

function renderList(list) {
  console.log("Rendering List");
  // List Elements
  __appendListContainer(list);
  __appendTitleElement(list);

  // Task Element
  __appendTaskContainer(list);
}

const __appendListContainer = (list) => {
  appendCustomElement({
    target: ".lists-container",
    tagName: "div",
    classList: ["list"],
    attributes: ["data-id", list.getId()],
  });
};

const __appendTitleElement = (list) => {
  const listElement = document.querySelector(`[data-id="${list.getId()}"]`);
  const title = createCustomElement({
    tagName: "h2",
    classList: "list-title",
    textContent: list.getTitle(),
  });
  title.addEventListener("dblclick", (e) => {
    editTitle(e, list);
  });
  listElement.append(title, __createTaskForm(list));
};

const __createTaskForm = (list) => {
  // Create form and append input to List
  const taskForm = document.createElement("form");
  taskForm.className = "task-form";
  const taskInput = createCustomElement({
    tagName: "input",
    classList: "task-input",
    attributes: ["placeholder", "Add a task"],
  });
  taskForm.appendChild(taskInput);

  // Bind input listener to monitor new task entries
  taskInput.addEventListener("keydown", (e) => {
    createTask(e, list);
  });
  return taskForm;
};

const __appendTaskContainer = (list) => {
  appendCustomElement({
    target: `[data-id="${list.getId()}"]`,
    tagName: "div",
    classList: "tasks-container",
  });
};

export default renderList;
