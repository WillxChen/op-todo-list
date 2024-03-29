import TaskManager from "./task/TaskManager";

const List = (title, id = crypto.randomUUID().slice(0, 8)) => {
  let listTitle = title;
  const tasks = [];
  const taskManager = TaskManager(tasks);

  const getTitle = () => listTitle;
  const setTitle = (newTitle) => (listTitle = newTitle);
  const getId = () => id;
  const getTasks = () => tasks;

  const createTask = (title, taskId) => {
    return taskManager.createTask(title, taskId);
  };

  const getTaskById = (taskId) => {
    return taskManager.getTaskById(taskId);
  };

  const updateTask = (taskId, updatedEntry) => {
    return taskManager.updateTask(taskId, updatedEntry);
  };

  const removeTask = (taskId) => {
    return taskManager.removeTask(taskId);
  };

  return {
    getTitle,
    setTitle,
    getId,
    getTasks,
    createTask,
    getTaskById,
    updateTask,
    removeTask,
  };
};

export default List;
