import List from "./List";

const Project = () => {
  const lists = [];

  const getLists = () => lists;

  const createList = (title) => {
    lists.push(List(title));
    return lists[lists.length - 1];
  };
  const findList = (listId) => {
    const listIndex = lists.findIndex((list) => list.id === listId);
    return lists[listIndex];
  };

  return { getLists, createList, findList };
};

export default Project;
