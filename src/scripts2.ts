export default `
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
`;
