export default `
  function handleHashChange() {
    const targetElement = window.document.querySelector(window.location.hash);

    if (!targetElement) {
      return;
    }

    const currentDialogElement = window.document.querySelector('dialog[open]');
      
    if (currentDialogElement) {
      currentDialogElement.close();
    }

    const isSmall = window.matchMedia('(max-width: 1092px)').matches;

    if (targetElement instanceof HTMLDialogElement) {
      if (isSmall) {
        targetElement.setAttribute('aria-modal', 'true');
        targetElement.showModal();
      } else {
        targetElement.removeAttribute('aria-modal');
        targetElement.show();
      }
    } else {
      targetElement.focus();
    }
  }

  window.addEventListener('DOMContentLoadeds', handleHashChange);
  window.addEventListener('hashchange', handleHashChange);

  window.matchMedia('(max-width: 1092px)').addEventListener('change', (event) => {
    const dialogElement = window.document.querySelector('dialog[open]');

    if (!dialogElement) {
      return;
    }

    if (event.matches) {
      dialogElement.setAttribute('aria-modal', 'true');
      dialogElement.close();
      dialogElement.showModal();
    } else {
      dialogElement.removeAttribute('aria-modal');
      dialogElement.close();
      dialogElement.show();
    }
  });

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

  window.customElements.define('role-dialog', class extends HTMLElement {
    constructor() {
      super();

      const dialogElement = this.querySelector('dialog');

      if (!dialogElement) {
        throw new Error('No dialog element found');
      }

      this.dialogElement = dialogElement;
    }

    connectedCallback() {
      this.dialogElement.addEventListener('click', this.handleBackdropClick);
    }

    disconnectedCallback() {
      this.dialogElement.removeEventListener('click', this.handleBackdropClick);
    }

    handleBackdropClick = (event) => {
      if (event.target === this.dialogElement) {
        const windowY = window.scrollY;

        this.dialogElement.close();

        window.requestAnimationFrame(() => {
          window.scrollTo(0, windowY);
        });
      }
    }
  });
`;
