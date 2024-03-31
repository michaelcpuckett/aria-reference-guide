/**
 * Calculate the scrollbar width and set it as a CSS variable.
 * 
 * Used to hide the scrollbar without causing layout shifts.
 */
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