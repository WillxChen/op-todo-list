import appendCustomElement from "./appendCustomElement.js";
import List from "./List.js";
import Project from "./Project.js";
import { createTaskElements, renderTaskElements } from "./TaskRenderer.js";

// const { createTaskElements, renderTaskElements } = TaskRenderer();

const ListRenderer = () => {
  const createTaskForm = (target, list) => {
    // Create form and append input to List
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
        const taskElement = createTaskElements([newTask], list);
        renderTaskElements(
          target.querySelector(".task-container"),
          taskElement
        );

        taskInput.value = "";
      }
    });
    return taskForm;
  };

  // Create and append a list container element
  // append(target, tagName, classList, textContent, attributes)
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

    const listDataId = document.querySelector(`[data-id="${listId}"]`);
    listDataId.appendChild(createTaskForm(listElement, list, listId));
  };

  const appendTaskContainer = (listId) => {
    appendCustomElement({
      target: `[data-id="${listId}"]`,
      tagName: "div",
      classList: "task-container",
    });
  };

  const appendTaskElements = (list, listId) => {
    const listElement = document.querySelector(`[data-id="${listId}"]`);
    const taskContainer = listElement.querySelector(".task-container");
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

export default ListRenderer;
