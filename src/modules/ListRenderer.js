import {
  appendCustomElement,
  createCustomElement,
} from "./customElementHelper.js";
import { createTaskElements, renderTaskElements } from "./TaskRenderer.js";
import { handleCreateTaskInput } from "./EventHandler.js";

const ListRenderer = () => {
  const createTaskForm = (target, list) => {
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
      handleCreateTaskInput(e, target, list);
    });
    return taskForm;
  };

  const appendListContainer = (listId) => {
    appendCustomElement({
      target: ".list-container",
      tagName: "div",
      classList: ["list"],
      attributes: ["data-id", listId],
    });
  };

  const appendListAndTitleElements = (list, listId) => {
    const listElement = document.querySelector(`[data-id="${listId}"]`);
    appendCustomElement({
      target: `[data-id="${listId}"]`,
      tagName: "h2",
      textContent: list.getTitle(),
    });

    listElement.appendChild(createTaskForm(listElement, list, listId));
  };

  const appendTaskContainer = (listId) => {
    appendCustomElement({
      target: `[data-id="${listId}"]`,
      tagName: "div",
      classList: "tasks-container",
    });
  };

  const appendTaskElements = (list, listId) => {
    const listElement = document.querySelector(`[data-id="${listId}"]`);
    const taskContainer = listElement.querySelector(".tasks-container");
    const taskElements = createTaskElements(list.getTasks(), list);
    renderTaskElements(taskContainer, taskElements);
  };

  const renderListElements = (lists) => {
    lists.forEach((list) => {
      const listId = list.getId();

      appendListContainer(listId);
      appendListAndTitleElements(list, listId);
      appendTaskContainer(listId);
      appendTaskElements(list, listId);

      // Now render and append the task elements
    });
  };

  return { renderListElements };
};

export const { renderListElements } = ListRenderer();
