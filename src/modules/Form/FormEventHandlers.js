import {
  createMainDetailsElements,
  createBottomPanelElements,
} from "../List/task/TaskRenderer";
import pubSub from "../pubSub";

const submitForm = (e, list, task) => {
  e.preventDefault();

  const form = e.target;
  const taskContainer = form.parentNode;
  const mainDetails = taskContainer.querySelector(".main-details");
  const bottomPanel = taskContainer.querySelector(".bottom-panel");

  const data = new FormData(form);
  const newValues = {};
  for (const [name, value] of data) {
    newValues[name] = value;
  }
  const updatedTask = list.updateTask(task.id, newValues);
  pubSub.publish("taskUpdated", { list, task: updatedTask });

  form.remove();
  const mainDetailsElements = createMainDetailsElements(updatedTask);
  mainDetails.append(mainDetailsElements);

  bottomPanel.replaceChildren();
  const bottomPanelElements = createBottomPanelElements(updatedTask);
  bottomPanel.append(bottomPanelElements);

  taskContainer.classList.remove("isEditable");
};

const cancelForm = (e, task) => {
  e.preventDefault();

  const form = e.target.closest("form");
  const taskContainer = form.parentNode;
  const mainDetails = taskContainer.querySelector(".main-details");

  form.remove();
  taskContainer.classList.remove("isEditable");

  const mainDetailsElements = createMainDetailsElements(task);
  mainDetails.append(mainDetailsElements);
};

export { submitForm, cancelForm };
