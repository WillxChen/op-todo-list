import TaskManager from "./TaskManager";

const List = (title, id) => {
  const tasks = [{ title: 1 }, { title: 2 }];
  const taskManager = TaskManager();

  const getTitle = () => title;
  const getId = () => id;
  const getTasks = () => tasks;

  const createTask = (title) => {
    return taskManager.createTask(tasks, title);
  };

  return { getTitle, getId, getTasks, createTask };
};

export default List;
