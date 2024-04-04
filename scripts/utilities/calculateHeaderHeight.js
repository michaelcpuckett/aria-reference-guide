function calculateHeaderHeight() {
  const headerElement = document.querySelector("header");
  const headerHeight = headerElement.offsetHeight;
  window.document.documentElement.style.setProperty(
    "--header-height",
    `${headerHeight}px`
  );
}

calculateHeaderHeight();

window.addEventListener("resize", calculateHeaderHeight);
