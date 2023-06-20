const TaskRenderer = () => {
  const renderTaskElements = (target, tasks) => {
    target.append(...tasks);
  };

  const createTaskElements = (tasks, currentList) => {
    return tasks.map((task) => {
      // Div container
      const div = document.createElement("div");
      div.className = "task";
      div.dataset.id = task.id;

      // Paragraph element
      const p = document.createElement("p");
      p.textContent = task.title;
      div.appendChild(p);

      // Add onclick to change element to input on click
      div.addEventListener("click", (e) => {
        editTask(e, task.id, currentList);
      });

      return div;
    });
  };

  const editTask = (e, taskId, currentList) => {
    const el = e.target;
    const previous = el.cloneNode(true);
    const input = document.createElement("input");

    const currentTask = currentList.getTaskById(taskId);
    input.value = currentTask.title;
    el.replaceWith(input);

    const save = () => {
      // Save the input value into the selected task
      currentList.updateTask(taskId, { title: input.value });
      previous.textContent = input.value;
      input.replaceWith(previous);
    };

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        input.blur();
      }
    });

    input.addEventListener("blur", save, {
      once: true,
    });
    input.focus();
  };

  return { createTaskElements, renderTaskElements };
};

export const { createTaskElements, renderTaskElements } = TaskRenderer();
