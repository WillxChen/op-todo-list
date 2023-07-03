import { editTask, toggleDetails } from "../../EventHandler.js";
import { createCustomElement } from "../../Helpers/customElementHelper.js";
import formatDate from "../../Helpers/formatDateHelper.js";
import Toolbar from "../../Toolbar/Toolbar.js";
import pubSub from "../../pubsub.js";

pubSub.subscribe("taskCreated", renderTask);

function renderTask(data) {
  const { list, task } = data;
  __appendTaskElements(list, task);
}

const __appendTaskElements = (list, task) => {
  const listContainer = document.querySelector(`[data-id="${list.getId()}"]`);
  const tasksContainer = listContainer.querySelector(".tasks-container");

  const taskElements = __createTaskElements(list, task);
  tasksContainer.prepend(taskElements);
};

const __createTaskElements = (currentList, task) => {
  // Div container
  const taskContainer = document.createElement("div");
  taskContainer.className = "task";
  taskContainer.dataset.id = task.id;

  // Toolbar
  const toolbarCreator = Toolbar(currentList, task);
  const toolbar = toolbarCreator.createToolbar(currentList, taskContainer);

  // Main details
  const mainDetails = __renderMainDetails(task);

  // Bottom Panel
  const bottomPanel = __renderBottomPanel(currentList, task.id);

  taskContainer.append(toolbar);
  taskContainer.append(mainDetails);
  taskContainer.append(bottomPanel);

  // Add onclick to change element to input on click
  taskContainer.addEventListener("dblclick", (e) => {
    editTask(e, task.id, currentList);
  });

  taskContainer.addEventListener("click", (e) => {
    toggleDetails(e, currentList, task.id);
  });

  taskContainer.addEventListener("mouseover", () => {
    toolbar.style.opacity = "1";
    toolbar.style.visibility = "visible";
  });

  taskContainer.addEventListener("mouseout", () => {
    toolbar.style.opacity = "0";
    toolbar.style.visibility = "hidden";
  });

  // toolbar.addEventListener("mouseover", (e) => {
  //   e.stopPropagation();
  //   toolbar.style.opacity = "1";
  //   toolbar.style.visibility = "visible";
  // });

  return taskContainer;
};

const __renderMainDetails = (task) => {
  const mainDetailsContainer = document.createElement("div");
  mainDetailsContainer.classList.add("main-details");
  mainDetailsContainer.appendChild(createMainDetailsElements(task));
  return mainDetailsContainer;
};

const createMainDetailsElements = (task) => {
  const fragment = document.createDocumentFragment();

  const title = createCustomElement({
    tagName: "p",
    classList: "task-title",
    textContent: task.title,
  });

  const description = task.description
    ? createCustomElement({
        tagName: "p",
        classList: "task-description",
        textContent: task.description,
      })
    : " ";

  fragment.append(title, description);
  return fragment;
};

const renderExpandedTask = (target, task) => {
  const expandedTask = __createExpandedTask(task);
  target.after(expandedTask);
  return expandedTask;
};

const __createExpandedTask = (task) => {
  const { dueDate, difficulty } = task;
  const fragment = document.createDocumentFragment();
  // Append children to fragment
  const expandedDiv = document.createElement("div");
  // Set toggle attribute to work with toggle event listener
  expandedDiv.classList.add("expanded-details");
  fragment.append(expandedDiv);

  // dueDate &&
  expandedDiv.append(
    createCustomElement({
      tagName: "p",
      classList: "due-date",
      textContent: formatDate(dueDate),
    })
  );
  console.log(dueDate);

  // difficulty &&
  expandedDiv.append(
    createCustomElement({
      tagName: "p",
      classList: "difficulty",
      textContent: difficulty,
    })
  );
  return fragment;
};

const __renderBottomPanel = (currentList, taskId) => {
  const task = currentList.getTaskById(taskId);
  const bottomPanel = createCustomElement({
    tagName: "div",
    classList: "bottom-panel",
  });
  bottomPanel.append(createBottomPanelElements(task));
  return bottomPanel;
};

const createBottomPanelElements = (task) => {
  const fragment = document.createDocumentFragment();

  const getTaskDifficulty = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "⚔️";
      case "Medium":
        return "⚔️⚔️";
      case "Hard":
        return "⚔️⚔️⚔️";
      default:
        return "";
    }
  };

  const difficultyEl = createCustomElement({
    tagName: "p",
    textContent: getTaskDifficulty(task.difficulty),
  });

  const dueDateEl = createCustomElement({
    tagName: "p",
    textContent: formatDate(task.dueDate) || "",
  });

  fragment.append(dueDateEl, difficultyEl);
  return fragment;
};

export {
  renderExpandedTask,
  createMainDetailsElements,
  createBottomPanelElements,
};
