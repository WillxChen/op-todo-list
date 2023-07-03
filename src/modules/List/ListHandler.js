import renderList from "./ListRenderer.js";
import pubSub from "../pubsub.js";

/*
  Flow:
  Retrieve localStorage
  If no storage is available, then create the default list.
  Else, render the stored List.
    Then, render the stored tasks if there are tasks

*/

const ListHandler = () => {
  const createDefaultList = (currentProject) => {
    const habitList = currentProject.createList("Habits");
    const firstTask = habitList.createTask("Create your first habit!");
    pubSub.publish("listCreated", habitList);
    pubSub.publish("taskCreated", { list: habitList, task: firstTask });
  };

  const checkForLists = (currentProject) => {
    const lists = currentProject.getLists();
    if (lists.length) {
      // This is rendering every task within the list right now even if there are none.
      lists.forEach((list) => renderList(list));
    } else {
      createDefaultList(currentProject);
    }
  };
  return { checkForLists };
};

export const { checkForLists } = ListHandler();
