const TaskManager = (taskList) => {
  const getTaskById = (taskId) => {
    return taskList.find((task) => task.id === taskId);
  };

  const getTaskByIndex = (taskId) => {
    return taskList.findIndex((task) => task.id === taskId);
  };

  const createTask = (title) => {
    taskList.push({
      id: crypto.randomUUID().slice(0, 8),
      title,
    });
    return taskList[taskList.length - 1];
  };

  const updateTask = (taskId, updatedEntry) => {
    const taskIndex = getTaskByIndex(taskId);
    taskList[taskIndex] = { ...taskList[taskIndex], ...updatedEntry };
  };

  const removeTask = (taskId) => {
    const taskIndex = getTaskByIndex(taskId);
    taskList.splice(taskIndex, 1);
  };

  return { getTaskById, createTask, updateTask, removeTask };
};

export default TaskManager;
