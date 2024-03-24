// The `about` element is cloned to replace the current dialog element when
// the hash is empty.
const aboutElement = window.document.querySelector("#about");
const clonedAboutElement = aboutElement.cloneNode(true);

const smallMediaQuery = window.matchMedia("(max-width: calc(48rem - 1px)");

// Keep track of the last hash to get the current dialog's target link element.
let lastHash = window.location.hash.slice(1);

/**
 * Handle changes to `window.location.hash`.
 * 
 * @param {boolean} shouldMoveFocus - Whether to move focus to the dialog or its
 * target link element. This will be `false` when the page is first loaded.
 */
async function handleHashChange(shouldMoveFocus) {
  const currentDialogElement = window.document.querySelector(
    ".dialog"
  );

  if (!currentDialogElement) {
    return;
  }

  const hash = window.location.hash.slice(1);

  if (!hash) {
    currentDialogElement.replaceWith(clonedAboutElement);

    if (shouldMoveFocus) {
      if (smallMediaQuery.matches) {
        const headingElement = clonedAboutElement.querySelector("h1");

        if (!headingElement) {
          return;
        }

        headingElement.focus();
      } else {
        const targetLinkElement = window.document.querySelector(
          `[href="#${lastHash}"]`
        );

        if (!targetLinkElement) {
          return;
        }

        const closestDetailsElement = targetLinkElement.closest("details");

        if (!closestDetailsElement) {
          return;
        }

        closestDetailsElement.open = true;

        targetLinkElement.focus();
      }
    }

    return;
  }

  const html = await fetch(`/role/${hash}.html`).then((res) => res.text());
  const nextDialogElement = new DOMParser()
    .parseFromString(html, "text/html")
    .querySelector("role-dialog");

  if (!nextDialogElement) {
    return;
  }

  const firstFocusableElement = nextDialogElement.querySelector(
    ".dialog__close-button"
  );

  if (!firstFocusableElement) {
    return;
  }

  const menuElement = window.document.querySelector("menu-button button");

  if (!menuElement) {
    return;
  }

  currentDialogElement.replaceWith(nextDialogElement);
  menuElement.setAttribute("aria-expanded", "false");

  if (shouldMoveFocus) {
    window.scrollTo(0, 0);
    firstFocusableElement.focus();
  }

  const targetLinkElement = window.document.querySelector(`[href="#${hash}"]`);

  if (!targetLinkElement) {
    return;
  }

  const closestDetailsElement = targetLinkElement.closest("details");

  if (!closestDetailsElement) {
    return;
  }

  closestDetailsElement.open = true;

  lastHash = hash;
}

handleHashChange(false);

window.addEventListener("hashchange", () => handleHashChange(true));