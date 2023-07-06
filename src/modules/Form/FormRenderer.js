import { createCustomElement } from "../Helpers/customElementHelper.js";
import { submitForm, cancelForm } from "./FormEventHandlers.js";

const FormRenderer = (currentList, taskId) => {
  const appendEditTaskForm = (target) => {
    const editForm = __createEditTaskForm();
    target.append(editForm);
    return editForm;
  };

  const __createEditTaskForm = () => {
    const form = document.createElement("form");
    const task = currentList.getTaskById(taskId);
    form.id = "edit-task";
    form.append(__createFormElements(task));

    form.addEventListener("submit", (e) => {
      submitForm(e, currentList, task);
    });
    return form;
  };

  const __createFormElements = (task) => {
    // Title
    const fragment = document.createDocumentFragment();

    const title = createCustomElement({
      tagName: "textarea",
      classList: "edit-title",
    });
    title.value = task.title;
    title.name = "title";

    //Description
    const description = createCustomElement({
      tagName: "textarea",
      classList: "edit-description",
      attributes: ["placeholder", "Add a description"],
    });
    description.value = task.description || "";
    description.name = "description";

    // Due Date
    const dueDate = createCustomElement({
      tagName: "input",
      attributes: ["type", "date"],
      classList: "edit-date",
    });
    const date = new Date();
    task.dueDate ? (dueDate.value = task.dueDate) : (dueDate.value = "");
    dueDate.name = "dueDate";
    dueDate.onclick = () => {
      dueDate.valueAsDate = dueDate.valueAsDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        12
      );
    };

    // Difficulty
    const difficulty = createCustomElement({
      tagName: "select",
      classList: "edit-difficulty",
    });
    difficulty.name = "difficulty";
    const difficultyOptions = [
      { name: "Select a Difficulty", value: "" },
      { name: "Easy", value: "Easy" },
      { name: "Medium", value: "Medium" },
      { name: "Hard", value: "Hard" },
    ];

    // Difficulty Options
    const optionElements = difficultyOptions.map((option) => {
      const { name, value } = option;
      const optionElement = createCustomElement({
        tagName: "option",
        textContent: name,
        attributes: ["value", `${value}`],
      });
      if (task.difficulty === value) {
        optionElement.selected = true;
      }
      return optionElement;
    });
    difficulty.append(...optionElements);

    // Form Buttons
    const formButtons = __createFormButtons(task);
    fragment.append(title, description, dueDate, difficulty, formButtons);

    return fragment;
  };

  const __createFormButtons = () => {
    const div = createCustomElement({
      tagName: "div",
      classList: "form-controls",
    });
    const submitBtn = createCustomElement({
      tagName: "button",
      classList: "submit-btn",
      textContent: "Submit",
    });

    const cancelBtn = createCustomElement({
      tagName: "button",
      classList: "cancel-btn",
      textContent: "Cancel",
    });
    cancelBtn.onclick = (e) => cancelForm(e, currentList.getTaskById(taskId));

    div.append(cancelBtn, submitBtn);
    return div;
  };

  return { appendEditTaskForm };
};

export default FormRenderer;
