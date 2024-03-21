import { CustomElement } from "./types";

interface DialogProps {
  heading: string;
  headingLabel?: string;
  eyebrows?: string[];
  classes: string;
  id: string;
  hasCloseButton?: boolean;
  children: JSX.Element;
}

export function Dialog({
  heading,
  headingLabel,
  eyebrows,
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
                <svg
                  width="1rem"
                  height="1rem"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </close-button>
          ) : null}
          <div className="dialog__header__info">
            {eyebrows ? (
              <div className="dialog__eyebrows">
                {eyebrows.map((eyebrow) => (
                  <span key={eyebrow} className="dialog__eyebrow">
                    {eyebrow}
                  </span>
                ))}
              </div>
            ) : null}
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
