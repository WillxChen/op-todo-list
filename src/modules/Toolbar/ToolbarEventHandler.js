import FormRenderer from "../Form/FormRenderer";

const ToolbarEventHandler = (currentList, task) => {
  const setEditMode = (e) => {
    const taskElement = e.target.closest(".task");
    // Escape if already in edit mode
    if (taskElement.classList.contains("isEditable")) return;
    const mainDetails = taskElement.querySelector(".main-details");
    taskElement.classList.add("isEditable");

    // Clear all children in main details
    mainDetails.replaceChildren();

    if (taskElement.classList.contains("expanded")) {
      taskElement.querySelector(".expanded-details").remove();
      taskElement.classList.remove("expanded");
    }

    const formRenderer = FormRenderer(currentList, task.id);
    const editForm = formRenderer.appendEditTaskForm(taskElement);
    const textareas = editForm.getElementsByTagName("textarea");

    [...textareas].forEach((textarea) => {
      textarea.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          // Programatically trigger form submission
          const submitEvent = new Event("submit", {
            bubbles: true,
            cancelable: true,
          });
          editForm.dispatchEvent(submitEvent);
        }
      });
    });
    // editForm
    //   .getElementsByTagName("textarea")
    //   .addEventListener("keydown", submitForm);
  };

  const setPriority = (e) => {
    const currentTask = currentList.getTaskById(task.id);
    if (currentTask.priority) {
      currentList.updateTask(task.id, { priority: false });
      e.target.closest("img").src = "../src/imgs/noun-star-4485746.svg";
    } else {
      currentList.updateTask(task.id, { priority: true });
      e.target.closest("img").src = "../src/imgs/noun-star-4485827.svg";
    }
    e.target.closest(".task").classList.toggle("isPriority");
    e.target.closest("img").classList.toggle("filter-gray");
    e.target.closest("img").classList.toggle("filter-yellow");
  };

  const deleteTask = (e) => {
    currentList.removeTask(task.id);
    e.target.closest(".task").remove();
  };

  return { setEditMode, setPriority, deleteTask };
};

export default ToolbarEventHandler;
