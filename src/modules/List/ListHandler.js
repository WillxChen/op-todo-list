import renderList from "./ListRenderer.js";
import pubSub from "../pubSub.js";

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

export { createDefaultList };
