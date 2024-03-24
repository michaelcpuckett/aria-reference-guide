/**
 * Role Dialog component
 * 
 * @element role-dialog
 * 
 * Listens for the Escape key to close the dialog.
 */
window.customElements.define(
  "role-dialog",
  class extends HTMLElement {
    constructor() {
      super();

      const dialogElement = this.querySelector("dialog");

      if (!dialogElement) {
        throw new Error("No dialog element found");
      }

      this.dialogElement = dialogElement;
    }

    connectedCallback() {
      this.dialogElement.addEventListener("keydown", this.handleKeydown);
    }

    disconnectedCallback() {
      this.dialogElement.removeEventListener("keydown", this.handleKeydown);
    }

    handleKeydown = (event) => {
      if (event.key === "Escape") {
        window.location.hash = "";
      }
    };
  }
);
