import pubSub from "../pubSub.js";
import store from "../store.js";

const listbarEventHandler = (list) => {
  const deleteList = (e) => {
    const currentProject = store.getCurrentProject();
    const removedList = currentProject.removeList(list.getId());
    pubSub.publish("listDeleted", removedList);
    e.target.closest(".list").remove();
  };

  return { deleteList };
};

export default listbarEventHandler;
