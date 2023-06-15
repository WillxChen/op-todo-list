export default function appendCustomElement(
  target,
  tagName,
  classList,
  textContent,
  attributes
) {
  const targetElement = document.querySelector(target);
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
  targetElement.appendChild(element);
}
