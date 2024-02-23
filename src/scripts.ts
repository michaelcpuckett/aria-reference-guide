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
      const dialogElement = containerElement.querySelector('dialog');

      if (!dialogElement) {
        return;
      }

      dialogElement.showModal();
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
