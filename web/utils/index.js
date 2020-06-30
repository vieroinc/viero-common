
export class VieroWebUtils {

  static createElement(tagName, attributes, styles, properties, container) {
    const element = document.createElement(tagName);
    Object.keys(attributes || {}).forEach((key) => element.setAttribute(key, attributes[key]));
    Object.keys(styles || {}).forEach((key) => element.style[key] = styles[key]);
    Object.keys(properties || {}).forEach((key) => element[key] = properties[key]);
    if (container) {
      container.appendChild(element);
    }
    return element;
  }

  static remToPx(rem) {
    return rem * Number.parseFloat(getComputedStyle(document.documentElement).fontSize);
  }

  static pxToRem(px) {
    return px / Number.parseFloat(getComputedStyle(document.documentElement).fontSize);
  }

}