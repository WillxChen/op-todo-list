import { createCustomElement } from "./customElementHelper.js";
import ToolbarEventHandler from "./ToolbarEventHandler.js";

// Create toolbar will return a fragment container of three buttons
//

const Toolbar = (currentList, task) => {
  const eventHandler = ToolbarEventHandler(currentList, task);

  const tools = [
    {
      name: "Edit",
      imgSrc: "../src/imgs/noun-quill-4626718.svg",
      className: "filter-gray",
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

  const createToolbar = () => {
    const toolbarContainer = createCustomElement({
      tagName: "div",
      classList: "toolbar",
    });
    toolbarContainer.append(__createBtns(tools));
    return toolbarContainer;
  };
  const __createBtns = (tools) => {
    const fragment = document.createDocumentFragment();
    tools.forEach((tool) => {
      const { name, imgSrc, className, onClick } = tool;
      // Toolbar will consist of:
      // Edit
      // Set Priority - isPriority
      // Delete
      const btn = createCustomElement({
        tagName: "button",
        attribute: ["aria-label", `${name}`],
      });
      const img = createCustomElement({
        tagName: "img",
        attributes: ["src", `${imgSrc}`],
        classList: className,
      });
      btn.onclick = onClick;
      btn.append(img);
      fragment.append(btn);
    });
    return fragment;
  };

  return { createToolbar };
};

export default Toolbar;
