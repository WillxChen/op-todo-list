import { renderExpandedTask } from "./List/task/TaskRenderer.js";
import pubsub from "./pubSub.js";

const createList = (e, currentProject) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const title = e.target.value;
    const newList = currentProject.createList(title);
    e.target.value = "";

    pubsub.publish("listCreated", newList);
  }
};

const createTask = (e, list) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const title = e.target.value;
    const newTask = list.createTask(title);

    e.target.value = "";

    pubsub.publish("taskCreated", { list, task: newTask });
  }
};

function autoResize() {
  this.style.height = "auto";
  this.style.height = this.scrollHeight + "px";
}

// Refactor this mess later
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
  // Do not toggle if task is in Edit Mode or if the target is not the task
  if (
    e.target.classList.contains("isEditable") ||
    !e.target.classList.contains("task")
  ) {
    return;
  }

  const taskContainer = e.target;
  const mainDetails = taskContainer.querySelector(".main-details");

  const expandedDetails = taskContainer.querySelector(".expanded-details");

  if (!expandedDetails) {
    const task = currentList.getTaskById(taskId);
    renderExpandedTask(mainDetails, task);
    taskContainer.classList.add("expanded");
  } else {
    expandedDetails.remove();
    taskContainer.classList.remove("expanded");
  }
};

export { createList, createTask, editTask, toggleDetails };
