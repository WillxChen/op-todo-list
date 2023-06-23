import { renderListElements } from "./ListRenderer";

const ListHandler = () => {
  const createDefaultList = (currentProject) => {
    const habitList = currentProject.createList("Habits");
    habitList.createTask("Create your first task!");
  };

  const checkForLists = (currentProject) => {
    const currentLists = currentProject.getLists();
    if (currentLists.length) {
      renderListElements(currentLists);
    } else {
      createDefaultList(currentProject);
      renderListElements(currentProject.getLists());
    }
  };
  return { checkForLists };
};

export const { checkForLists } = ListHandler();
