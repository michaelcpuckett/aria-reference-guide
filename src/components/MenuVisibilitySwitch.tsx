export function MenuVisibilitySwitch() {
  return (
    <div className="contents">
      <label
        className="flex w-auto cursor-pointer p-2 text-center leading-none border-4 border-[canvas] rounded-[5px] text-[canvas] aspect-square focus-within:outline-4 focus-within:outline-dashed focus-within:outline-offset-1 hover:bg-[canvastext] has-[:checked]:bg-[canvastext] min-[721px]:hidden"
        id="menu-visibility-switch-label"
        htmlFor="menu-visibility-switch"
      >
        <input
          id="menu-visibility-switch"
          type="checkbox"
          className="peer sr-only print:hidden"
          aria-controls="nav"
          aria-label="Toggle menu"
        />
        <svg
          aria-hidden="true"
          className="peer-checked:hidden"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <use href="#icon--open-menu"></use>
        </svg>
        <svg
          aria-hidden="true"
          className="hidden peer-checked:block"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <use href="#icon--close-menu"></use>
        </svg>
      </label>
    </div>
  );
}
