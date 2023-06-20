const Project = () => {
  const lists = [];

  const getLists = () => lists;
  const addList = (list) => lists.push(list);
  const findList = (listId) => {
    const listIndex = lists.findIndex((list) => list.id === listId);
    return lists[listIndex];
  };

  return { getLists, addList, findList };
};

export default Project;
