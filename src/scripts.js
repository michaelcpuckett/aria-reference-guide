function calculateScrollbarWidth() {
  const divElement = window.document.createElement("div");
  divElement.style.width = "100px";
  divElement.style.height = "100px";
  divElement.style.overflow = "scroll";
  divElement.style.position = "absolute";
  divElement.style.top = "-9999px";
  window.document.body.appendChild(divElement);
  const scrollbarWidth = divElement.offsetWidth - divElement.clientWidth;
  divElement.remove();
  window.document.documentElement.style.setProperty(
    "--scrollbar-width",
    `${scrollbarWidth}px`
  );
}

calculateScrollbarWidth();

window.addEventListener("resize", calculateScrollbarWidth);

const aboutElement = window.document.querySelector("#about");
const clonedAboutElement = aboutElement.cloneNode(true);

let lastHash = window.location.hash.slice(1);

async function handleHashChange(shouldFocus) {
  const oldDialogElement = window.document.querySelector(
    "role-dialog, .dialog"
  );

  if (!oldDialogElement) {
    return;
  }

  const hash = window.location.hash.slice(1);

  if (!hash) {
    oldDialogElement.replaceWith(clonedAboutElement);

    if (shouldFocus) {
      if (window.matchMedia("(max-width: calc(48rem - 1px))").matches) {
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
  const newDialogElement = new DOMParser()
    .parseFromString(html, "text/html")
    .querySelector("role-dialog");

  if (!newDialogElement) {
    return;
  }

  const firstFocusableElement = newDialogElement.querySelector(
    ".dialog__close-button"
  );

  if (!firstFocusableElement) {
    return;
  }

  const menuElement = window.document.querySelector("menu-button button");

  if (!menuElement) {
    return;
  }

  oldDialogElement.replaceWith(newDialogElement);
  menuElement.setAttribute("aria-expanded", "false");

  if (shouldFocus) {
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

handleHashChange();

window.addEventListener("hashchange", () => handleHashChange(true));

window.customElements.define(
  "menu-button",
  class extends HTMLElement {
    constructor() {
      super();

      const buttonElement = this.querySelector("button");

      if (!buttonElement) {
        throw new Error("No button element found");
      }

      this.buttonElement = buttonElement;
    }

    connectedCallback() {
      this.buttonElement.addEventListener("click", this.handleClick);
    }

    disconnectedCallback() {
      this.buttonElement.removeEventListener("click", this.handleClick);
    }

    handleClick = () => {
      const isExpanded =
        this.buttonElement.getAttribute("aria-expanded") === "true";
      this.buttonElement.setAttribute(
        "aria-expanded",
        isExpanded ? "false" : "true"
      );
    };
  }
);

window.customElements.define(
  "close-button",
  class extends HTMLElement {
    constructor() {
      super();

      const buttonElement = this.querySelector("button");

      if (!buttonElement) {
        throw new Error("No button element found");
      }

      this.buttonElement = buttonElement;
    }

    connectedCallback() {
      this.buttonElement.addEventListener("click", this.handleClick);
      this.buttonElement.addEventListener("focus", this.handleFocus);
    }

    disconnectedCallback() {
      this.buttonElement.removeEventListener("click", this.handleClick);
      this.buttonElement.removeEventListener("focus", this.handleFocus);
    }

    handleClick = () => {
      window.location.hash = "";
    };

    handleFocus = () => {
      window.scrollTo(0, 0);
    };
  }
);

window.customElements.define(
  "role-dialog",
  class extends HTMLElement {
    constructor() {
      super();

      const dialogElement = this.querySelector("dialog");

      if (!dialogElement) {
        throw new Error("No dialog element found");
      }

      this.dialogElement = dialogElement;
    }

    connectedCallback() {
      this.dialogElement.addEventListener("keydown", this.handleKeydown);
    }

    disconnectedCallback() {
      this.dialogElement.removeEventListener("keydown", this.handleKeydown);
    }

    handleKeydown = (event) => {
      if (event.key === "Escape") {
        window.location.hash = "";
      }
    };
  }
);
