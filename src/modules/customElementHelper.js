const customElementHelper = () => {
  function appendCustomElement(options) {
    const { target } = options;
    const targetElement = document.querySelector(target);

    const element = createCustomElement(options);
    targetElement.appendChild(element);
  }

  function createCustomElement(options) {
    const { tagName, classList, textContent, attributes } = options;
    const element = document.createElement(tagName);

    if (typeof classList === "string") {
      element.classList.add(classList);
    } else if (Array.isArray(classList)) {
      element.classList.add(...classList);
    }
    if (textContent) {
      element.textContent = textContent;
    }
    if (Array.isArray(attributes)) {
      const [attr, value] = attributes;
      element.setAttribute(attr, value);
    }
    return element;
  }
  return { appendCustomElement, createCustomElement };
};

export const { appendCustomElement, createCustomElement } =
  customElementHelper();
