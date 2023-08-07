import { createCustomElement } from "../Helpers/customElementHelper.js";

// Create toolbar will return a fragment container of three buttons
//

const Toolbar = (config) => {
  const tools = config;
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
        attributes: ["aria-label", `${name}`],
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
