import { abstractAriaRolesByType } from "../data";

const colorsCss = Object.values(abstractAriaRolesByType)
  .flat()
  .sort()
  .map((abstractRole, index, { length }) => {
    return `
      .content__tag--abstract-aria-role--${abstractRole},
      .nav__list-item--${abstractRole} {
        --base-hue: ${((index + 1) / length) * 360}deg;
      }
    `;
  })
  .join("")
  .trim();

export default `
  .content__tag,
  .nav__list-item {
    --base-saturation: 100%;
    --lightest-color-lightness: 95%;
    --lighter-color-lightness: 90;
    --light-color-lightness: 85%;
    --medium-color-lightness: 33.3%;
    --dark-color-lightness: 15%;
    --darker-color-lightness: 10%;
    --darkest-color-lightness: 5%;
    --lightest-color: hsl(
      var(--base-hue),
      var(--base-saturation),
      var(--lightest-color-lightness)
    );
    --lighter-color: hsl(
      var(--base-hue),
      var(--base-saturation),
      var(--lighter-color-lightness)
    );
    --light-color: hsl(
      var(--base-hue),
      var(--base-saturation),
      var(--light-color-lightness)
    );
    --medium-color: hsl(
      var(--base-hue),
      var(--base-saturation),
      var(--medium-color-lightness)
    );
    --dark-color: hsl(
      var(--base-hue),
      var(--base-saturation),
      var(--dark-color-lightness)
    );
    --darker-color: hsl(
      var(--base-hue),
      var(--base-saturation),
      var(--darker-color-lightness)
    );
    --darkest-color: hsl(
      var(--base-hue),
      var(--base-saturation),
      var(--darkest-color-lightness)
    );
  }

  ${colorsCss}
`;
