export default `
  customElements.define('expansion-button', class extends HTMLElement {
    constructor() {
      super();

      const buttonElement = this.querySelector('button');

      if (!buttonElement) {
        throw new Error('No button element found');
      }

      buttonElement.addEventListener('click', this.clickHandler);
    }

    clickHandler = () => {
      const containerElement = this.closest('.aria-role');
      const dialogElement = window.document.querySelector(\`#dialog-for-\${this.getAttribute('data-role')}\`);

      if (!dialogElement) {
        return;
      }

      const openDialogElements = window.document.querySelectorAll('dialog[open]');

      for (const openDialogElement of openDialogElements) {
        openDialogElement.close();
      }

      if (matchMedia('(min-width: 600px)').matches) {
        dialogElement.show();
      } else {
        dialogElement.showModal();
      }
    };
  });

  customElements.define('close-dialog-button', class extends HTMLElement {
    constructor() {
      super();

      const buttonElement = this.querySelector('button');

      console.log(this, buttonElement);

      if (!buttonElement) {
        throw new Error('No button element found');
      }

      buttonElement.addEventListener('click', () => {
        const dialogElement = this.closest('dialog');

        if (!dialogElement) {
          return;
        }

        dialogElement.close();
      });
    }
  });
`;
