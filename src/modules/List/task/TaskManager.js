const TaskManager = (taskList) => {
  const getTaskById = (taskId) => {
    return taskList.find((task) => task.id === taskId);
  };

  const getTaskByIndex = (taskId) => {
    return taskList.findIndex((task) => task.id === taskId);
  };

  const createTask = (title, taskId = crypto.randomUUID().slice(0, 8)) => {
    taskList.push({
      id: taskId,
      title,
    });
    return taskList[taskList.length - 1];
  };

  const updateTask = (taskId, updatedEntry) => {
    const taskIndex = getTaskByIndex(taskId);
    taskList[taskIndex] = { ...taskList[taskIndex], ...updatedEntry };
    return taskList[taskIndex];
  };

  const removeTask = (taskId) => {
    const taskIndex = getTaskByIndex(taskId);
    taskList.splice(taskIndex, 1);
  };

  return { getTaskById, createTask, updateTask, removeTask };
};

export default TaskManager;
