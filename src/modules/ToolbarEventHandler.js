const ToolbarEventHandler = (currentList, task) => {
  const setEditMode = (e) => {
    e.target.closest(".expanded-details");
  };

  const setPriority = (e) => {
    const currentTask = currentList.getTaskById(task.id);
    if (currentTask.priority) {
      currentList.updateTask(task.id, { priority: false });
      e.target.closest("img").src = "../src/imgs/noun-star-4485746.svg";
    } else {
      currentList.updateTask(task.id, { priority: true });
      e.target.closest("img").src = "../src/imgs/noun-star-4485827.svg";
    }
    e.target.closest(".task").classList.toggle("isPriority");
    e.target.closest("img").classList.toggle("filter-gray");
    e.target.closest("img").classList.toggle("filter-yellow");
  };

  const deleteTask = (e) => {
    currentList.removeTask(task.id);
    e.target.closest(".task").remove();
  };

  return { setEditMode, setPriority, deleteTask };
};

export default ToolbarEventHandler;
