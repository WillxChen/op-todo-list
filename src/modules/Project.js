const Project = () => {
  const lists = [];

  const getLists = () => lists;
  const addList = (list) => lists.push(list);

  return { getLists, addList };
};

export default Project;
