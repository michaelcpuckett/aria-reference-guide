function detectCssSuport() {
  return (
    CSS.supports("selector(:has(div))") &&
    CSS.supports("selector(:popover-open)")
  );
}

if (!detectCssSuport()) {
  window.document.documentElement.classList.add("not-supported");

  const unsupportedBrowserNotice = window.document.querySelector(
    ".not-supported-notice"
  );

  if (unsupportedBrowserNotice instanceof HTMLDialogElement) {
    unsupportedBrowserNotice.showModal();
  }
}
