import TaskManager from "./TaskManager";

const List = (title, id) => {
  const tasks = [
    { title: 1234, id: 1 },
    { title: 45687, id: 2 },
  ];
  const taskManager = TaskManager();

  const getTitle = () => title;
  const getId = () => id;
  const getTasks = () => tasks;

  const getTaskById = (taskId) => {
    return taskManager.getTaskById(tasks, taskId);
  };

  const createTask = (title) => {
    return taskManager.createTask(tasks, title);
  };

  const updateTask = (taskId, updatedEntry) => {
    return taskManager.updateTask(tasks, taskId, updatedEntry);
  };

  const removeTask = () => {};

  return { getTitle, getId, getTasks, createTask, updateTask, getTaskById };
};

export default List;
