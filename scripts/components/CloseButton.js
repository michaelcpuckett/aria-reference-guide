/**
 * Close button component
 * 
 * @element close-button
 * 
 * Closes the current dialog and scrolls to the top of the page.
 */
window.customElements.define(
  "close-button",
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
      this.buttonElement.addEventListener("focus", this.handleFocus);
    }

    disconnectedCallback() {
      this.buttonElement.removeEventListener("click", this.handleClick);
      this.buttonElement.removeEventListener("focus", this.handleFocus);
    }

    handleClick = () => {
      window.location.hash = "";
    };

    handleFocus = () => {
      window.scrollTo(0, 0);
    };
  }
);