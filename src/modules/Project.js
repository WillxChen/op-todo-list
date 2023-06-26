import List from "./List";

const Project = (id = crypto.randomUUID().slice(0, 8)) => {
  const lists = [];

  const getId = () => id;

  const getLists = () => lists;

  const createList = (title) => {
    lists.push(List(title));
    return lists[lists.length - 1];
  };

  const findList = (listId) => {
    const listIndex = lists.findIndex((list) => list.id === listId);
    return lists[listIndex];
  };

  return { getId, getLists, createList, findList };
};

export default Project;
