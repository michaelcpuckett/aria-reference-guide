export default `
  customElements.define('expansion-button', class extends HTMLElement {
    constructor() {
      super();

      const dialogElement = window.document.querySelector(\`#\${this.getAttribute('data-role')}\`);

      if (!dialogElement) {
        throw new Error('No dialog element found');
      }

      this.dialogElement = dialogElement;

      const buttonElement = this.querySelector('a');

      if (!buttonElement) {
        throw new Error('No button element found');
      }

      this.buttonElement = buttonElement;

      window.addEventListener('hashchange', this.handleHashChange);
      this.buttonElement.addEventListener('click', this.handleButtonClick);
    }

    handleButtonClick = (event) => {
      event.preventDefault();
      this.buttonElement.setAttribute('aria-expanded', 'true');
      window.history.pushState({}, '', \`#\${this.dialogElement.id}\`);
      window.dispatchEvent(new Event('hashchange'));
    }

    openDialog = () => {
      const openDialogElements = Array.from(window.document.querySelectorAll('dialog[open]'));

      for (const openDialogElement of openDialogElements) {
        openDialogElement.close();
      }

      if (matchMedia('(min-width: 1024px)').matches) {
        this.dialogElement.show();
      } else {
        this.dialogElement.showModal();
      }
    }

    closeDialog = () => {
      if (!this.dialogElement.open) {
        return;
      }

      this.buttonElement.setAttribute('aria-expanded', 'false');

      this.dialogElement.close();
    }

    handleHashChange = (event) => {
      if (window.location.hash === '#' + this.dialogElement.id) {
        this.openDialog();
      } else {
        this.closeDialog();
      }
    }
  });

  customElements.define('close-dialog-button', class extends HTMLElement {
    constructor() {
      super();

      const buttonElement = this.querySelector('a');

      if (!buttonElement) {
        throw new Error('No button element found');
      }

      buttonElement.addEventListener('click', (event) => {
        event.preventDefault();
        window.history.pushState({}, '', window.location.pathname);
        window.dispatchEvent(new Event('hashchange'));
      });
    }
  });
`;
