import { CustomElement } from "./types";

export function MenuButton() {
  return (
    <menu-button>
      <button
        aria-expanded="false"
        aria-controls="menu"
        type="button"
        className="menu-button"
      >
        <svg
          data-show="off"
          data-icon="menu"
          width="1rem"
          height="1rem"
          fill="none"
        >
          <use href="#menu-icon"></use>
        </svg>
        <span data-show="off">Menu</span>
        <svg
          data-show="on"
          data-icon="close"
          width="1rem"
          height="1rem"
          fill="none"
        >
          <use href="#close-icon"></use>
        </svg>
        <span data-show="on">Close</span>
      </button>
    </menu-button>
  );
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "menu-button": CustomElement;
    }
  }
}
