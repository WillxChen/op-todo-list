import renderList from "./ListRenderer.js";
import pubSub from "../pubSub.js";
import { autoResize } from "../EventHandler.js";

/*
  Flow:
  Retrieve localStorage
  If no storage is available, then create the default list.
  Else, render the stored List.
    Then, render the stored tasks if there are tasks

*/

const createDefaultList = (defaultProject) => {
  const habitList = defaultProject.createList("Habits");
  const firstTask = habitList.createTask("Create your first habit!");
  pubSub.publish("listCreated", habitList);
  pubSub.publish("taskCreated", { list: habitList, task: firstTask });
};

const editTitle = (e, list) => {
  const el = e.target;

  const previous = el.cloneNode(true);
  const input = document.createElement("textarea");

  input.classList.add("temp-input");
  input.value = list.getTitle();
  // input.style.wrap = "soft";
  input.style.wordBreak = "break-word";

  el.replaceWith(input);
  input.style.height = "auto";
  input.style.height = input.scrollHeight + "px";

  const save = () => {
    // Save the input value into the selected List object
    const title = list.setTitle(input.value);
    pubSub.publish("listUpdated", { list, title });
    previous.textContent = input.value;
    input.replaceWith(previous);
    // Recursively recall the event handler
    previous.addEventListener("dblclick", (e) => {
      editTitle(e, list);
    });
  };

  input.addEventListener("input", autoResize, false);
  input.focus();

  input.addEventListener("blur", save, {
    once: true,
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      input.blur();
    }
    if (e.key === "Escape") {
      input.removeEventListener("blur", save);
      input.replaceWith(previous);

      previous.addEventListener("dblclick", (e) => {
        editTitle(e, list);
      });
    }
  });
};

// May be useless now

// const checkForLists = (currentProject) => {
//   console.log(currentProject);
//   const lists = currentProject.getLists();
//   if (lists.length) {
//     // This is rendering every task within the list right now even if there are none.
//     lists.forEach((list) => renderList(list));
//   } else {
//     createDefaultList(currentProject);
//   }
// };

export { createDefaultList, editTitle };
