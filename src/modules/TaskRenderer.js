import { editTask, toggleDetails } from "./EventHandler.js";
import {
  createCustomElement,
  appendCustomElement,
} from "./customElementHelper.js";
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

      // Paragraph element
      const title = createCustomElement({
        tagName: "p",
        classList: "task-title",
        textContent: task.title,
      });
      taskContainer.append(title);

      const toolbar = Toolbar(currentList, task);
      taskContainer.append(toolbar.createToolbar(currentList, taskContainer));

      // Add onclick to change element to input on click
      taskContainer.addEventListener("dblclick", (e) => {
        editTask(e, task.id, currentList);
      });

      taskContainer.addEventListener("click", (e) => {
        toggleDetails(e, task);
      });

      return taskContainer;
    });
  };

  const renderExpandedTask = (target, task) => {
    const expandedTask = __createExpandedTask(task);
    target.append(expandedTask);
    return expandedTask;
  };

  const __createExpandedTask = (task) => {
    const { description, dueDate, difficulty } = task;

    const fragment = document.createDocumentFragment();
    // Append children to fragment
    const expandedDiv = document.createElement("div");
    // Set toggle attribute to work with toggle event listener
    expandedDiv.classList.add("expanded-details");
    fragment.append(expandedDiv);

    // description &&
    expandedDiv.append(
      createCustomElement({
        tagName: "p",
        classList: "description",
        textContent: "description",
      })
    );

    // dueDate &&
    expandedDiv.append(
      createCustomElement({
        tagName: "p",
        classList: "due-date",
        textContent: "dueDate",
      })
    );

    // difficulty &&
    expandedDiv.append(
      createCustomElement({
        tagName: "p",
        classList: "difficulty",
        textContent: "difficulty",
      })
    );

    return fragment;
  };

  return { createTaskElements, renderTaskElements, renderExpandedTask };
};

export const { createTaskElements, renderTaskElements, renderExpandedTask } =
  TaskRenderer();
