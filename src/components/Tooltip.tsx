import React from "react";
import { CustomElement } from "../types";
import { InfoIcon } from "./Icons";

export function Tooltip({
  name,
  children,
}: {
  name: string;
  children: JSX.Element[];
}) {
  const tooltipId = name.toLowerCase().replace(" ", "-") + "-tooltip";

  return (
    <div className="tooltip__container">
      <expansion-button>
        <button
          className="tooltip-toggle-button"
          type="button"
          popovertarget={tooltipId}
          aria-expanded="false"
          aria-controls={tooltipId}
          aria-label={`Definition of ${name}`}
        >
          <InfoIcon />
        </button>
      </expansion-button>
      <div
        popover="auto"
        id={tooltipId}
        className="tooltip"
        role="group"
        hidden
      >
        {children}
      </div>
    </div>
  );
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "expansion-button": CustomElement;
    }
  }
}

declare module "react" {
  export interface HTMLAttributes<T> {
    popovertarget?: string;
    popover?: "auto" | "top" | "right" | "bottom" | "left";
  }
}
