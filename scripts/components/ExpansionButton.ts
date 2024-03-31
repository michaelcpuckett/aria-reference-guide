/**
 * Expansion Button component
 *
 * @element expansion-button
 *
 * Toggles the expanded state of the button when clicked.
 */
window.customElements.define(
  "expansion-button",
  class extends HTMLElement {
    buttonElement: HTMLButtonElement;
    popoverElement: HTMLElement | null = null;
    containerElement: HTMLElement | null = null;
    cleanupPopover: () => void = () => {};

    constructor() {
      super();

      const buttonElement = this.querySelector("button");

      if (!buttonElement) {
        throw new Error("No button element found");
      }

      this.buttonElement = buttonElement;

      const popoverElementId = buttonElement.getAttribute("popovertarget");

      if (popoverElementId) {
        const popoverElement = window.document.getElementById(popoverElementId);

        if (popoverElement) {
          this.popoverElement = popoverElement;

          const containerElement = this.closest(".tooltip__container");

          if (containerElement instanceof HTMLElement) {
            this.containerElement = containerElement;
          }
        }
      }
    }

    connectedCallback() {
      if (this.popoverElement) {
        this.popoverElement.addEventListener(
          "toggle",
          this.handlePopoverToggle
        );
      } else {
        this.buttonElement.addEventListener("click", this.handleButtonClick);
      }
    }

    disconnectedCallback() {
      if (this.popoverElement) {
        this.popoverElement.removeEventListener(
          "toggle",
          this.handlePopoverToggle
        );
      } else {
        this.buttonElement.removeEventListener("click", this.handleButtonClick);
      }

      if (this.cleanupPopover) {
        this.cleanupPopover();
      }
    }

    handleButtonClick = () => {
      const isOpen =
        this.buttonElement.getAttribute("aria-expanded") === "true";

      this.buttonElement.setAttribute("aria-expanded", String(!isOpen));
    };

    handlePopoverToggle = (event: Event) => {
      if (!(event instanceof ToggleEvent)) {
        return;
      }

      const { newState } = event;

      const isOpen = newState === "open";

      this.buttonElement.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

      if (this.popoverElement && this.containerElement) {
        if (isOpen) {
          this.cleanupPopover = window["FloatingUIDOM"].autoUpdate(
            this.containerElement,
            this.popoverElement,
            () => {
              window["FloatingUIDOM"]
                .computePosition(this.containerElement, this.popoverElement)
                .then(({ x, y }) => {
                  if (!this.popoverElement) {
                    return;
                  }

                  Object.assign(this.popoverElement.style, {
                    display: "block",
                    left: `${x}px`,
                    top: `${y}px`,
                  });
                });
            }
          );
        } else {
          if (!this.popoverElement) {
            return;
          }

          this.popoverElement.style.removeProperty("display");

          if (this.cleanupPopover) {
            this.cleanupPopover();
          }
        }
      }
    };
  }
);
