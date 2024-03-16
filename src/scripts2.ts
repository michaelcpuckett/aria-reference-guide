export default `
  function calculateScrollbarWidth() {
    const scrollbarWidth = window.innerWidth - window.document.documentElement.clientWidth;
    window.document.documentElement.style.setProperty('--scrollbar-width', \`\${scrollbarWidth}px\`);
  }

  calculateScrollbarWidth();

  window.addEventListener('resize', calculateScrollbarWidth);

  async function handleHashChange() {
    const hash = window.location.hash.slice(1);

    if (!hash) {
      return;
    }

    const html = await fetch(\`/role/\${hash}\`).then(res => res.text());
    window.document.querySelector('dialog').replaceWith(new DOMParser().parseFromString(html, 'text/html').querySelector('dialog'));
  }

  handleHashChange();

  window.addEventListener('hashchange', handleHashChange);

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
