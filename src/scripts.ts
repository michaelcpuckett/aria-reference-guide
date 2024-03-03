export default `
  customElements.define('expansion-button', class extends HTMLElement {
    constructor() {
      super();

      const dialogElement = window.document.querySelector(\`role-dialog[data-role=\${this.getAttribute('data-role')}]\`);

      if (!dialogElement) {
        throw new Error('No dialog element found');
      }

      this.dialogElement = dialogElement;

      const buttonElement = this.querySelector('a');

      if (!buttonElement) {
        throw new Error('No button element found');
      }

      this.buttonElement = buttonElement;

      this.buttonElement.addEventListener('click', this.handleButtonClick);
    }

    handleButtonClick = (event) => {
      event.preventDefault();
      window.history.pushState({}, '', '#' + this.dialogElement.getAttribute('data-role'));
      window.dispatchEvent(new Event('hashchange'));
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

  customElements.define('role-dialog', class extends HTMLElement {
    constructor() {
      super();

      const dialogElement = this.querySelector('dialog');

      if (!dialogElement) {
        throw new Error('No dialog element found');
      }

      this.dialogElement = dialogElement;

      const buttonElement = window.document.querySelector(\`expansion-button[data-role=\${this.getAttribute('data-role')}]\`);

      if (!buttonElement) {
        throw new Error('No button element found');
      }

      this.buttonElement = buttonElement;


      const roleAttr = this.getAttribute('data-role');

      if (!roleAttr) {
        throw new Error('No role attribute found');
      }

      this.roleAttr = roleAttr;

      window.addEventListener('hashchange', this.handleHashChange);
    }

    connectedCallback() {
      if (window.location.hash === '#' + this.roleAttr) {
        this.openDialog();
      }
    }
    
    openDialog = () => {
        const openDialogElements = Array.from(window.document.querySelectorAll('dialog[open]'));

        window.requestAnimationFrame(() => {
          for (const openDialogElement of openDialogElements) {
            console.log({
              openDialogElement,
            });

            openDialogElement.close();
          }

          window.requestAnimationFrame(() => {
            if (matchMedia('(min-width: 960px)').matches) {
              this.dialogElement.show();
            } else {
              this.dialogElement.showModal();
            }

            window.requestAnimationFrame(() => {
              this.buttonElement.setAttribute('aria-expanded', 'true');
            });
          });
        });
    }

    closeDialog = () => {
      if (!this.dialogElement.open) {
        return;
      }

      window.requestAnimationFrame(() => {
        this.buttonElement.setAttribute('aria-expanded', 'false');
        
        window.requestAnimationFrame(() => {
          this.dialogElement.close();
        });
      });
    }

    handleHashChange = () => {
      if (window.location.hash === '#' + this.roleAttr) {
        this.openDialog();
      } else {
        this.closeDialog();
      }
    }
  });
`;
