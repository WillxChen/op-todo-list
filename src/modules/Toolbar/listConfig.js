import listbarEventHandler from "./listbarEventHandler";

const listConfig = (list) => {
  const eventHandler = listbarEventHandler(list);
  const tools = [
    {
      name: "Delete",
      imgSrc: "../src/imgs/noun-skull-4485674.svg",
      className: "filter-red",
      onClick: (e) => eventHandler.deleteList(e),
    },
  ];

  return tools;
};

export default listConfig;
