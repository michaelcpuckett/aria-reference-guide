export default `
  function calculateScrollbarWidth() {
    const divElement = window.document.createElement('div');
    divElement.style.width = '100px';
    divElement.style.height = '100px';
    divElement.style.overflow = 'scroll';
    divElement.style.position = 'absolute';
    divElement.style.top = '-9999px';
    window.document.body.appendChild(divElement);
    const scrollbarWidth = divElement.offsetWidth - divElement.clientWidth;
    divElement.remove();
    window.document.documentElement.style.setProperty('--scrollbar-width', \`\${scrollbarWidth}px\`);
  }

  calculateScrollbarWidth();

  window.addEventListener('resize', calculateScrollbarWidth);

  const aboutDialog = window.document.querySelector('#about');
  const clonedAboutDialog = aboutDialog.cloneNode(true);

  async function handleHashChange(shouldFocus) {
    const hash = window.location.hash.slice(1);

    if (!hash) {
      window.document.querySelector('dialog').replaceWith(clonedAboutDialog);
      return;
    }

    const html = await fetch(\`/role/\${hash}\`).then(res => res.text());
    const newDialogElement = new DOMParser().parseFromString(html, 'text/html').querySelector('dialog');
    
    if (!newDialogElement) {
      return;
    }
    const firstFocusableElement = newDialogElement.querySelector('[tabindex]');

    if (!firstFocusableElement) {
      return;
    }

    const menuElement = window.document.querySelector('menu-button button');

    if (!menuElement) {
      return;
    }

    window.document.querySelector('dialog').replaceWith(newDialogElement);
    menuElement.setAttribute('aria-expanded', 'false');

    if (shouldFocus) {
      window.scrollTo(0, 0);
      firstFocusableElement.focus();
    }
  }

  handleHashChange();

  window.addEventListener('hashchange', () => handleHashChange(true));

  window.customElements.define('menu-button', class extends HTMLElement {
    constructor() {
      super();

      const buttonElement = this.querySelector('button');

      if (!buttonElement) {
        throw new Error('No button element found');
      }

      this.buttonElement = buttonElement;
    }

    connectedCallback() {
      this.buttonElement.addEventListener('click', this.handleClick);
    }

    disconnectedCallback() {
      this.buttonElement.removeEventListener('click', this.handleClick);
    }

    handleClick = () => {
      const isExpanded = this.buttonElement.getAttribute('aria-expanded') === 'true';
      this.buttonElement.setAttribute('aria-expanded', isExpanded ? 'false' : 'true');
    };
  });
`;
