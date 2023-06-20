/* 
  Each List will have a button that expands a Task input field
  Tasks will then be pushed to the List Task array
  CRUD
*/

const TaskManager = () => {
  const getTaskById = (taskList, taskId) => {
    return taskList.find((task) => task.id === taskId);
  };

  const createTask = (taskList, title) => {
    taskList.push({
      id: crypto.randomUUID().slice(0, 8),
      title,
    });
    return taskList[taskList.length - 1];
  };

  const updateTask = (taskList, taskId, updatedEntry) => {
    const taskIndex = taskList.findIndex((task) => task.id === taskId);
    taskList[taskIndex] = { ...taskList[taskIndex], ...updatedEntry };
  };

  return { getTaskById, createTask, updateTask };
};

export default TaskManager;
