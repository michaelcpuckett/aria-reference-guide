// The `overview` dialog is cloned to replace future dialogs when the hash is
// empty.
const overviewElement = window.document.querySelector(".dialog");
const clonedOverviewElement = overviewElement.cloneNode(true);

const smallMediaQuery = window.matchMedia("(max-width: calc(48rem - 1px)");

const titleElement = window.document.querySelector("title");
const originalTitle = titleElement.textContent;

// Keep track of the last hash to get the current dialog's target link element.
let lastHash = window.location.hash.slice(1);

/**
 * Handle changes to `window.location.hash`.
 *
 * @param {boolean} shouldMoveFocus - Whether to move focus to the dialog. This
 * will be `false` when the page is first loaded.
 */
async function handleHashChange(shouldMoveFocus) {
  const currentDialogElement = window.document.querySelector(".dialog");

  if (!currentDialogElement) {
    return;
  }

  const hash = window.location.hash.slice(1);

  if (!hash) {
    currentDialogElement.replaceWith(clonedOverviewElement);
    titleElement.textContent = originalTitle;

    if (shouldMoveFocus) {
      const headingElement = clonedOverviewElement.querySelector("h1");

      if (!headingElement) {
        return;
      }

      headingElement.focus();
    }

    return;
  }

  const html = await fetch(`/role/${hash}.html`).then((res) => res.text());
  const nextDialogElement = new DOMParser()
    .parseFromString(html, "text/html")
    .querySelector(".dialog");

  if (!nextDialogElement) {
    return;
  }

  titleElement.textContent =
    nextDialogElement.querySelector("h1").getAttribute("aria-label") +
    " - " +
    originalTitle;

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

  lastHash = hash;
}

handleHashChange(false);

window.addEventListener("hashchange", () => handleHashChange(true));
