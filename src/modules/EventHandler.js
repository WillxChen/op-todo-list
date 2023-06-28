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
      renderTaskElements(target.querySelector(".tasks-container"), taskElement);

      e.target.value = "";
    }
  };

  // Refactor this mess later
  function autoResize() {
    this.style.height = "auto";
    this.style.height = this.scrollHeight + "px";
  }

  const editTask = (e, taskId, currentList) => {
    const el = e.target;
    if (!el.classList.contains("task-title")) {
      return;
    }
    const previous = el.cloneNode(true);
    const input = document.createElement("textarea");
    const currentTask = currentList.getTaskById(taskId);

    input.classList.add("temp-input");
    input.value = currentTask.title;
    // input.style.wrap = "soft";
    input.style.wordBreak = "break-word";

    el.replaceWith(input);
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";

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

    input.addEventListener("input", autoResize, false);
    input.focus();
  };

  const toggleDetails = (e, currentList, taskId) => {
    const task = currentList.getTaskById(taskId);

    if (
      e.target.tagName === "IMG" ||
      e.target.tagName === "P" ||
      e.target.tagName === "TEXTAREA"
    ) {
      return;
    }
    const taskContainer = e.target.closest(".task");
    const expandedDetails = taskContainer.querySelector(".expanded-details");
    if (taskContainer.classList.contains("isEditable")) {
      return;
    }

    if (!expandedDetails) {
      renderExpandedTask(taskContainer, task);
      taskContainer.classList.add("expanded");
    } else {
      expandedDetails.remove();
      taskContainer.classList.remove("expanded");
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
