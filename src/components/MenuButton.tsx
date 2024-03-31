import React from "react";
import { CustomElement } from "../types";

export function MenuButton() {
  return (
    <expansion-button hidden>
      <button
        aria-expanded="false"
        aria-controls="menu"
        type="button"
        className="menu-button"
      >
        <svg
          aria-hidden="true"
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
          aria-hidden="true"
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
    </expansion-button>
  );
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "expansion-button": CustomElement;
    }
  }
}
