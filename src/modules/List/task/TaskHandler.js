/* This will be used for expanding the selected task
  Unminized, the task will show:
    Title
    Priority
    Checkbox

  Expanded, the task will show:
    Description
    Due Date
    Difficultly Multiplier
*/

const expandTask = (taskId) => {
  // On focus
  // classList.addClass("expanded");
  const task = currentList.getTaskbyId(taskId);

  // On blur
  // classList.remove("expanded")

  // Grab the task info and populate it into elements
  // Expand the div size
  // Show extra details
};
