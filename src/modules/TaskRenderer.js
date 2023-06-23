import { editTask, toggleDetails } from "./EventHandler.js";
import { createCustomElement } from "./customElementHelper.js";

const TaskRenderer = () => {
  const renderTaskElements = (target, tasks) => {
    target.prepend(...tasks);
  };

  const createTaskElements = (tasks, currentList) => {
    return tasks.map((task) => {
      // Div container
      const div = document.createElement("div");
      div.className = "task";
      div.dataset.id = task.id;

      // Paragraph element
      const p = document.createElement("p");
      p.textContent = task.title;
      div.appendChild(p);

      // Add onclick to change element to input on click
      div.addEventListener("dblclick", (e) => {
        editTask(e, task.id, currentList);
      });

      div.addEventListener("click", (e) => {
        toggleDetails(e, task);
      });

      return div;
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
        target: expandedDiv,
        tagName: "p",
        classList: "description",
        textContent: "description",
      })
    );

    // dueDate &&
    expandedDiv.append(
      createCustomElement({
        target: expandedDiv,
        tagName: "p",
        classList: "due-date",
        textContent: "dueDate",
      })
    );

    // difficulty &&
    expandedDiv.append(
      createCustomElement({
        target: expandedDiv,
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
