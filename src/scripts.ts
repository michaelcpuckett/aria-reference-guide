export default `
  customElements.define('expansion-button', class extends HTMLElement {
    constructor() {
      super();

      const triggerElement = this.querySelector('a');

      if (!triggerElement) {
        throw new Error('No trigger element found');
      }

      this.triggerElement = triggerElement;

      this.triggerElement.addEventListener('click', this.handletriggerClick);
    }

    handletriggerClick = (event) => {
      const windowScrollY = window.scrollY;
      this.triggerElement.setAttribute('aria-expanded', 'true');
      window.requestAnimationFrame(() => {
        window.scrollTo(0, windowScrollY);
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

      const triggerElement = window.document.querySelector(\`a[href="#\${this.closest('dialog').getAttribute('id')}"]\`);

      if (!triggerElement) {
        throw new Error('No trigger element found');
      }

      this.triggerElement = triggerElement;

      this.buttonElement.addEventListener('click', this.handleTriggerClick);
    }

    handleTriggerClick = (event) => {
      this.triggerElement.setAttribute('aria-expanded', 'false');
    }
  });
`;
