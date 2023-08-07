import List from "./List/List";

const Project = (title, id = crypto.randomUUID().slice(0, 8)) => {
  const lists = [];

  const getTitle = () => title;
  const getId = () => id;
  const getLists = () => lists;

  const createList = (title, id) => {
    lists.push(List(title, id));
    return lists[lists.length - 1];
  };

  const removeList = (listId) => {
    const index = __getListIndex(listId);
    const entry = lists[index];
    lists.splice(index, 1);
    return entry;
  };

  const __getListIndex = (listId) => {
    const listIndex = lists.findIndex((list) => list.getId() === listId);

    return listIndex;
  };

  return { getTitle, getId, getLists, createList, removeList };
};

export default Project;
