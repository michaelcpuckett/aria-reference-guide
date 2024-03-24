import { ExternalLinkIcon } from "./Icons";
import { CustomElement } from "./types";
import { links } from "../data";

interface DialogProps {
  role: string;
  heading: string;
  headingLabel?: string;
  tags?: [string, string][];
  classes: string;
  id: string;
  hasCloseButton?: boolean;
  children: JSX.Element;
}

export function Dialog({
  role,
  heading,
  headingLabel,
  tags,
  classes,
  id,
  children,
  hasCloseButton,
}: DialogProps) {
  return (
    <dialog
      open
      className={classes}
      aria-modal="false"
      aria-labelledby={`dialog__heading--${id}`}
      id={id}
    >
      <div className="dialog__content">
        <div className="dialog__header">
          {hasCloseButton ? (
            <close-button>
              <button
                type="button"
                className="dialog__close-button"
                aria-label="Close dialog"
              >
                <svg fill="none" width="1rem" height="1rem">
                  <use href="#close-icon"></use>
                </svg>
              </button>
            </close-button>
          ) : null}
          <div className="dialog__header__info">
            <div className="dialog__heading__container">
              <h1
                className="dialog__heading"
                id={`dialog__heading--${id}`}
                aria-label={headingLabel}
                tabIndex={-1}
                dangerouslySetInnerHTML={{
                  __html: `<span aria-hidden="true">${heading}</span>`,
                }}
              ></h1>
            </div>
            <div className="dialog__links">
              {Object.entries(links).map(([name, link]) => (
                <a key={link} href={link + role} target="_blank">
                  {name}
                  <span className="visually-hidden">(opens in new window)</span>
                  <ExternalLinkIcon />
                </a>
              ))}
            </div>
            {tags ? (
              <p className="dialog__tags">
                {tags.map(([tagName, url]) => (
                  <a
                    key={tagName}
                    href={url}
                    target="_blank"
                    className="dialog__tag"
                  >
                    {tagName}
                    <ExternalLinkIcon />
                  </a>
                ))}
              </p>
            ) : null}
          </div>
        </div>
        <div className="aria-role__details">{children}</div>
      </div>
    </dialog>
  );
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "close-button": CustomElement;
    }
  }
}
