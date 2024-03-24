/**
 * Menu Button component
 * 
 * @element menu-button
 * 
 * Toggles the expanded state of the nav on mobile.
 */
window.customElements.define(
  "menu-button",
  class extends HTMLElement {
    constructor() {
      super();

      const buttonElement = this.querySelector("button");

      if (!buttonElement) {
        throw new Error("No button element found");
      }

      this.buttonElement = buttonElement;
    }

    connectedCallback() {
      this.buttonElement.addEventListener("click", this.handleClick);
    }

    disconnectedCallback() {
      this.buttonElement.removeEventListener("click", this.handleClick);
    }

    handleClick = () => {
      const isExpanded =
        this.buttonElement.getAttribute("aria-expanded") === "true";
      this.buttonElement.setAttribute(
        "aria-expanded",
        isExpanded ? "false" : "true"
      );
    };
  }
);