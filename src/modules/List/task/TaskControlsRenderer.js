import { createCustomElement } from "../../Helpers/customElementHelper";

const 

const createSidePanel = (listType) => {
  const sidePanel = createCustomElement({
  // tagName, classList, textContent, attributes
  tagName: "div",
  classList: "side-panel",
});
  switch (listType) {
    case "Habit": 
      return sidePanel.appendChild(createHabitButton());
    case "Daily":
      return sidePanel.appendChild(createDailyBox());
    case "ToDo":
      return sidePanel.appendChild(createToDoBox());
  }
}

const createHabitButton = () => {
  const habitButton = createCustomElement({
  tagName: "button",
  classList: "habit-btn",
});

  habitButton.addEventListener("click", // taskEventHandler);
  return habitButton;
}

const createDailyBox = () => {
  const dailyBox = createCustomElement({
    tagName: "input",
    classList: "task-checkbox",
    attributes: ["type", "checkbox"],
  });
  dailyBox.addEventListener("click", // taskEventHandler);
} 

const createToDoBox = () => {
  const todoBox = createCustomElement({
    tagName: "input",
    classList: "task-checkbox",
    attributes: ["type", "checkbox"],
  });
  todoBox.addEventListener("click", // taskEventHandler);
} 
