import { editTask, toggleDetails } from "./EventHandler.js";
import { createCustomElement } from "./customElementHelper.js";
import formatDate from "./formatDateHelper.js";
import Toolbar from "./Toolbar.js";

const TaskRenderer = () => {
  const renderTaskElements = (target, tasks) => {
    target.prepend(...tasks);
  };

  const createTaskElements = (tasks, currentList) => {
    return tasks.map((task) => {
      // Div container
      const taskContainer = document.createElement("div");
      taskContainer.className = "task";
      taskContainer.dataset.id = task.id;

      // Toolbar
      const toolbarCreator = Toolbar(currentList, task);
      const toolbar = toolbarCreator.createToolbar(currentList, taskContainer);

      // Main details
      const mainDetails = renderMainDetails(task);

      taskContainer.append(toolbar);
      taskContainer.append(mainDetails);

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
    });
  };

  const renderMainDetails = (task) => {
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
    target.append(expandedTask);
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

  return {
    createTaskElements,
    renderTaskElements,
    renderExpandedTask,
    createMainDetailsElements,
  };
};

export const {
  createTaskElements,
  renderTaskElements,
  renderExpandedTask,
  createMainDetailsElements,
} = TaskRenderer();
