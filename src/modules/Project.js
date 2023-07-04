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

  const getListById = (listId) => {
    const listIndex = lists.findIndex((list) => list.getId() === listId);

    return lists[listIndex];
  };

  return { getTitle, getId, getLists, createList, getListById };
};

export default Project;
