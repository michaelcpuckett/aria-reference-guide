interface DialogProps {
  heading: string;
  headingLabel?: string;
  classes: string;
  id: string;
  children: JSX.Element;
}

export function Dialog({
  heading,
  headingLabel,
  classes,
  id,
  children,
}: DialogProps) {
  return (
    <dialog
      open
      className={classes}
      aria-modal="false"
      aria-labelledby={`dialog__heading--${id}`}
    >
      <div className="dialog__content">
        <h2
          className="dialog__heading"
          id={`dialog__heading--${id}`}
          aria-label={headingLabel}
          tabIndex={-1}
          dangerouslySetInnerHTML={{
            __html: heading,
          }}
        ></h2>
        <div className="aria-role__details">{children}</div>
      </div>
    </dialog>
  );
}
