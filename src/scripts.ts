export default `
  customElements.define('expansion-button', class extends HTMLElement {
    constructor() {
      super();

      const triggerElement = this.querySelector('a');

      if (!triggerElement) {
        throw new Error('No trigger element found');
      }

      this.triggerElement = triggerElement;
    }

    connectedCallback() {
      this.triggerElement.addEventListener('click', this.handletriggerClick);
    }

    disconnectedCallback() {
      this.triggerElement.removeEventListener('click', this.handletriggerClick);
    }

    handletriggerClick = (event) => {
      const windowY = window.scrollY;

      this.triggerElement.setAttribute('aria-expanded', 'false');

      window.requestAnimationFrame(() => {
        window.scrollTo(0, windowY);
      });
    }
  });

  customElements.define('close-dialog-button', class extends HTMLElement {
    constructor() {
      super();

      const buttonElement = this.querySelector('a');

      if (!buttonElement) {
        throw new Error('No button element found');
      }

      this.buttonElement = buttonElement;

      const dialogElement = this.closest('dialog');

      if (!dialogElement) {
        throw new Error('No dialog element found');
      }

      const dialogId = dialogElement.getAttribute('id');

      if (!dialogId) {
        throw new Error('Dialog element has no id');
      }

      const triggerElement = window.document.querySelector(\`a[href="#\${dialogId}"]\`);

      if (!triggerElement) {
        throw new Error('No trigger element found');
      }

      this.triggerElement = triggerElement;
    }

    connectedCallback() {
      this.buttonElement.addEventListener('click', this.handleTriggerClick);
    }

    disconnectedCallback() {
      this.buttonElement.removeEventListener('click', this.handleTriggerClick);
    }

    handleTriggerClick = (event) => {
      const windowY = window.scrollY;

      this.triggerElement.setAttribute('aria-expanded', 'false');

      window.requestAnimationFrame(() => {
        window.scrollTo(0, windowY);
      });
    }
  });
`;
