/* 
  Each List will have a button that expands a Task input field
  Tasks will then be pushed to the List Task array
  CRUD
*/

const TaskManager = () => {
  const createTask = (taskList, title) => {
    taskList.push({
      id: crypto.randomUUID().slice(0, 8),
      title,
    });
    return taskList[taskList.length - 1];
  };

  return { createTask };
};

export default TaskManager;
