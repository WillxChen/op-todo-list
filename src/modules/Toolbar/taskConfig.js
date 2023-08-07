import taskbarEventHandler from "./taskbarEventHandler.js";

const taskConfig = (currentList, task) => {
  const eventHandler = taskbarEventHandler(currentList, task);
  const tools = [
    {
      name: "Edit",
      imgSrc: "../src/imgs/noun-quill-4626718.svg",
      className: "filter-gray",
      onClick: (e) => eventHandler.setEditMode(e),
    },
    {
      name: "Set Priority",
      imgSrc: "../src/imgs/noun-star-4485746.svg",
      className: "filter-gray",
      onClick: (e) => eventHandler.setPriority(e),
    },
    {
      name: "Delete",
      imgSrc: "../src/imgs/noun-skull-4485674.svg",
      className: "filter-red",
      onClick: (e) => eventHandler.deleteTask(e),
    },
  ];

  return tools;
};

export default taskConfig;
