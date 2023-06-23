import List from "./List.js";
import { renderListElements } from "./ListRenderer.js";
import {
  createTaskElements,
  renderTaskElements,
  renderExpandedTask,
} from "./TaskRenderer.js";

const EventHandler = () => {
  const handleCreateListInput = (e, currentProject) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const title = e.target.value;

      const newList = currentProject.createList(title);
      renderListElements([newList]);

      e.target.value = "";
    }
  };

  const handleCreateTaskInput = (e, target, list) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const title = e.target.value;
      // Create a new task entry in list array
      const newTask = list.createTask(title);
      // Create and render task elements
      const taskElement = createTaskElements([newTask], list);
      renderTaskElements(target.querySelector(".task-container"), taskElement);

      e.target.value = "";
    }
  };

  const editTask = (e, taskId, currentList) => {
    const el = e.target;
    const previous = el.cloneNode(true);
    const input = document.createElement("input");

    const currentTask = currentList.getTaskById(taskId);
    input.value = currentTask.title;
    el.replaceWith(input);

    const save = () => {
      // Save the input value into the selected task
      currentList.updateTask(taskId, { title: input.value });
      previous.textContent = input.value;
      input.replaceWith(previous);
    };

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        input.blur();
      }
    });

    input.addEventListener("blur", save, {
      once: true,
    });
    input.focus();
  };

  const toggleDetails = (e, task) => {
    const taskContainer = e.target.closest(".task");
    const expandedDetails = taskContainer.querySelector(".expanded-details");
    taskContainer.classList.toggle("expanded");
    if (!expandedDetails) {
      renderExpandedTask(taskContainer, task);
    } else {
      expandedDetails.remove();
    }
  };

  return {
    handleCreateListInput,
    handleCreateTaskInput,
    editTask,
    toggleDetails,
  };
};

export const {
  handleCreateListInput,
  handleCreateTaskInput,
  editTask,
  toggleDetails,
} = EventHandler();
