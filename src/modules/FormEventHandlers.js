import { createMainDetailsElements } from "./TaskRenderer";

const submitForm = (e, list, task) => {
  e.preventDefault();

  const form = e.target;
  const taskContainer = form.parentNode;
  const mainDetails = taskContainer.querySelector(".main-details");

  const data = new FormData(form);
  const obj = {};
  for (const [name, value] of data) {
    obj[name] = value;
  }
  const updatedTask = list.updateTask(task.id, obj);

  form.remove();
  const mainDetailsElements = createMainDetailsElements(updatedTask);
  mainDetails.append(mainDetailsElements);
  taskContainer.classList.remove("isEditable");
};

const cancelForm = (e, list, taskId) => {
  e.preventDefault();

  const mainDetails = taskContainer.querySelector(".main-details");

  const form = e.target.closest("form");
  form.remove();
  taskContainer.classList.remove("isEditable");

  const task = list.updateTask(taskId, obj);
  const mainDetailsElements = createMainDetailsElements(task);
  mainDetails.append(mainDetailsElements);
};

export { submitForm, cancelForm };
